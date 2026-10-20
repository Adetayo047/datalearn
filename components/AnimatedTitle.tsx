import type { ElementType } from "react";

// Splits a headline into words that rise in one after another. `accent` must be a substring of `text`.
export default function AnimatedTitle({ text, accent, as: Tag = "h1", className }: { text: string; accent?: string; as?: ElementType; className?: string }) {
  const at = accent ? text.indexOf(accent) : -1;
  const parts = at >= 0 ? [text.slice(0, at), accent!, text.slice(at + accent!.length)] : [text, "", ""];
  let i = 0;
  const words = (s: string) =>
    s
      .split(/(\s+)/)
      .filter(Boolean)
      .map((w, k) =>
        /^\s+$/.test(w) ? (
          " "
        ) : (
          <span key={`${i}-${k}`} className="w" style={{ ["--i" as string]: i++ }}>
            <span>{w}</span>
          </span>
        ),
      );
  return (
    <Tag className={`atitle ${className ?? ""}`} aria-label={text}>
      <span aria-hidden="true">
        {words(parts[0])}
        {parts[1] && <span className="accent">{words(parts[1])}</span>}
        {words(parts[2])}
      </span>
    </Tag>
  );
}
