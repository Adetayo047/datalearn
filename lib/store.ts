import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const DIR = path.join(process.cwd(), "data", "submissions");

// Each form kind gets its own JSON Lines file: one submission per line.
export async function saveSubmission(kind: string, data: Record<string, unknown>) {
  await mkdir(DIR, { recursive: true });
  const record = { id: randomUUID(), kind, receivedAt: new Date().toISOString(), data };
  await appendFile(path.join(DIR, `${kind}.jsonl`), JSON.stringify(record) + "\n", "utf8");
  return record;
}

export async function notify(kind: string, record: { id: string; data: Record<string, unknown> }) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL_TO;
  const from = process.env.NOTIFY_EMAIL_FROM;
  if (!key || !to || !from) return;
  const lines = Object.entries(record.data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`);
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject: `New ${kind} submission (${record.id.slice(0, 8)})`, text: lines.join("\n") }),
    });
  } catch {
    // The submission is already saved; a failed email must not fail the request.
  }
}

const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > limit;
}
