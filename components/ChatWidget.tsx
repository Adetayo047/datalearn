"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { BARS } from "./Logo";
import s from "./ChatWidget.module.css";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = ["Who can apply?", "How much does it cost?", "Is a job guaranteed?", "How can my company take part?"];
const ROUTES = ["/apply", "/employers", "/sponsors", "/how-it-works", "/outcomes", "/about", "/faq", "/contact", "/privacy", "/tracks", "/portfolio/sample", "/learners"];
const STORE = "chat:history";

// Turns page paths mentioned in an answer into links.
function linkify(text: string): ReactNode[] {
  const re = new RegExp(`(${ROUTES.map((r) => r.replace("/", "\\/")).join("|")})(?![\\w/-])`, "g");
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index! > last) out.push(text.slice(last, m.index));
    out.push(
      <Link key={m.index} href={m[0]} className={s.inlineLink}>
        {m[0]}
      </Link>,
    );
    last = m.index! + m[0].length;
  }
  out.push(text.slice(last));
  return out;
}

export function openChat(question?: string) {
  window.dispatchEvent(new CustomEvent("datalearn:chat", { detail: question }));
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const msgsRef = useRef<Msg[]>([]);
  msgsRef.current = msgs;

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORE);
      if (saved) setMsgs(JSON.parse(saved));
    } catch {}
    const onOpen = (e: Event) => {
      setOpen(true);
      const q = (e as CustomEvent<string | undefined>).detail;
      if (q) setTimeout(() => send(q), 50);
    };
    window.addEventListener("datalearn:chat", onOpen);
    return () => window.removeEventListener("datalearn:chat", onOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE, JSON.stringify(msgs.slice(-16)));
    } catch {}
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setError(null);
    setInput("");
    const next: Msg[] = [...msgsRef.current, { role: "user", content: q.slice(0, 1000) }];
    setMsgs([...next, { role: "assistant", content: "" }]);
    setBusy(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-12) }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        const msg = await res.text().catch(() => "");
        setMsgs(next);
        setError(msg || "Something went wrong. Please try again.");
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let answer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        answer += dec.decode(value, { stream: true });
        setMsgs([...next, { role: "assistant", content: answer }]);
      }
      if (!answer.trim()) {
        setMsgs(next);
        setError("The assistant didn't return an answer. Please try rephrasing your question.");
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        setMsgs(next);
        setError("We couldn't reach the assistant. Check your connection and try again.");
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function reset() {
    abortRef.current?.abort();
    setMsgs([]);
    setError(null);
    setBusy(false);
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className={s.fab}
        data-open={open}
        aria-expanded={open}
        aria-controls="dl-chat"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={s.fabIcon} aria-hidden="true">
          {open ? (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 5h16v11H9l-5 4z" strokeLinejoin="round" />
              <path d="M8 10h8M8 13h5" />
            </svg>
          )}
        </span>
        <span className={s.fabText}>{open ? "Close" : "Ask a question"}</span>
      </button>

      <section id="dl-chat" className={s.panel} data-open={open} aria-label="DataLearn assistant" hidden={!open}>
        <header className={s.head}>
          <svg viewBox="0 0 96 96" className={s.logo} aria-hidden="true">
            {BARS.map((d, i) => (
              <path key={i} d={d} fill={i === 3 ? "var(--ascent)" : "#fff"} />
            ))}
          </svg>
          <div className={s.title}>
            <strong>Ask DataLearn</strong>
            <span>AI assistant · answers from this website</span>
          </div>
          {msgs.length > 0 && (
            <button type="button" className={s.reset} onClick={reset}>
              New chat
            </button>
          )}
        </header>

        <div ref={listRef} className={s.list} aria-live="polite">
          <div className={`${s.msg} ${s.bot}`}>
            <p>Hi! I can answer questions about the programme, applying, costs, employers and sponsorship. What would you like to know?</p>
          </div>
          {msgs.length === 0 && (
            <div className={s.suggest}>
              {SUGGESTIONS.map((q) => (
                <button key={q} type="button" onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}
          {msgs.map((m, i) => (
            <div key={i} className={`${s.msg} ${m.role === "user" ? s.user : s.bot}`}>
              {m.content ? (
                m.content.split(/\n{2,}/).map((para, k) => <p key={k}>{m.role === "assistant" ? linkify(para) : para}</p>)
              ) : (
                <span className={s.typing} aria-label="Assistant is typing">
                  <i />
                  <i />
                  <i />
                </span>
              )}
            </div>
          ))}
          {error && (
            <div className={s.error} role="alert">
              {linkify(error)}
            </div>
          )}
        </div>

        <form className={s.form} onSubmit={onSubmit}>
          <label htmlFor="dl-chat-input" className="sr-only">
            Your question
          </label>
          <textarea
            id="dl-chat-input"
            ref={inputRef}
            rows={1}
            maxLength={1000}
            value={input}
            placeholder="Type your question…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
          />
          <button type="submit" className={s.send} disabled={busy || !input.trim()} aria-label="Send question">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M5 12h13M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>
        <p className={s.note}>
          AI answers can be wrong. Don&apos;t share personal details here. For anything important, <Link href="/contact">contact us</Link>.
        </p>
      </section>
    </>
  );
}
