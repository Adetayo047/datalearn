"use client";

import { openChat } from "./ChatWidget";

export default function AskButton({ label = "Ask the assistant", question }: { label?: string; question?: string }) {
  return (
    <button type="button" className="btn btn-green" onClick={() => openChat(question)}>
      {label} <span className="arrow" aria-hidden="true">→</span>
    </button>
  );
}
