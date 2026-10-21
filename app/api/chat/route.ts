import { z } from "zod";
import { buildSystemPrompt } from "@/lib/knowledge";
import { rateLimited } from "@/lib/store";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = process.env.OPENAI_MODEL || "gpt-5-mini";
const SYSTEM = buildSystemPrompt();

const Body = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(1000) }))
    .min(1)
    .max(16),
});

function textError(message: string, status: number) {
  return new Response(message, { status, headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

export async function POST(req: Request) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return textError("The assistant isn't switched on yet. Please use the contact form at /contact and we'll reply within 5 working days.", 503);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(`chat:${ip}`, 20, 10 * 60_000)) return textError("You've asked a lot of questions in a short time. Please wait a few minutes and try again.", 429);

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await req.json());
  } catch {
    return textError("Please keep each message under 1,000 characters.", 400);
  }

  // Only the last 10 turns go to the model, to keep answers focused and costs low.
  const history = body.messages.slice(-10);
  if (history[history.length - 1].role !== "user") return textError("Please type a question.", 400);

  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      max_completion_tokens: 1200,
      messages: [{ role: "system", content: SYSTEM }, ...history],
    }),
    signal: req.signal,
  }).catch(() => null);

  if (!upstream || !upstream.ok || !upstream.body) {
    const detail = upstream ? await upstream.text().catch(() => "") : "network error";
    console.error(`[chat] OpenAI request failed (${upstream?.status ?? "no response"}): ${detail.slice(0, 500)}`);
    return textError("Sorry, the assistant is unavailable right now. Please try again shortly, or use /contact.", 502);
  }

  // Turn OpenAI's server-sent events into a plain text stream of the answer.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const data = line.startsWith("data:") ? line.slice(5).trim() : "";
            if (!data || data === "[DONE]") continue;
            try {
              const delta = JSON.parse(data).choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // Ignore keep-alive or partial lines.
            }
          }
        }
      } catch (e) {
        console.error("[chat] stream interrupted", e);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
