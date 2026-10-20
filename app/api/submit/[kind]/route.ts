import { NextResponse } from "next/server";
import { forms, type FormKind } from "@/lib/forms";
import { errorsFor } from "@/lib/validate";
import { saveSubmission, notify, rateLimited } from "@/lib/store";

const MIN_FILL_MS = 3000;

export async function POST(req: Request, ctx: { params: Promise<{ kind: string }> }) {
  const { kind } = await ctx.params;
  if (!(kind in forms)) return NextResponse.json({ error: "Unknown form." }, { status: 404 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(`${kind}:${ip}`)) {
    return NextResponse.json({ error: "Too many submissions. Please wait a minute and try again." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The form could not be read. Please try again." }, { status: 400 });
  }

  const { _hp, _t, ...data } = body;
  // Spam checks: a hidden field people never fill, and a minimum time on the form.
  if (typeof _hp === "string" && _hp.length > 0) return NextResponse.json({ ok: true });
  if (typeof _t !== "number" || Date.now() - _t < MIN_FILL_MS) {
    return NextResponse.json({ error: "That was very fast. Please check your answers and submit again." }, { status: 400 });
  }

  const errors = errorsFor(kind as FormKind, data);
  if (errors) return NextResponse.json({ error: "Some answers need attention.", fields: errors }, { status: 422 });

  const record = await saveSubmission(kind, data);
  await notify(kind, record);
  return NextResponse.json({ ok: true, id: record.id });
}
