import Link from "next/link";
import type { ReactNode } from "react";
import { Mark } from "./Logo";
import AnimatedTitle from "./AnimatedTitle";

export function PageHero({
  label,
  title,
  accent,
  lede,
  children,
  art,
}: {
  label: string;
  title: string;
  accent?: string;
  lede?: ReactNode;
  children?: ReactNode;
  art?: ReactNode;
}) {
  return (
    <section className="page-hero" data-spotlight>
      <div className="glow" aria-hidden="true" />
      <div className={`wrap hero-grid ${art ? "has-art" : ""}`}>
        <div className="hero-copy">
          <span className="label">{label}</span>
          <AnimatedTitle text={title} accent={accent} />
          {lede && <p className="lede">{lede}</p>}
          {children}
        </div>
        {art && <div className="hero-art">{art}</div>}
      </div>
    </section>
  );
}

export function Sheet({ n, title, right }: { n: string; title: string; right?: string }) {
  return (
    <div className="sheet">
      <span className="label">
        {n} · {title}
      </span>
      {right && <span className="label">{right}</span>}
    </div>
  );
}

export function ToConfirm({ children = "To confirm" }: { children?: ReactNode }) {
  return (
    <span className="confirm" title="Placeholder: replace before launch">
      {children}
    </span>
  );
}

export function CtaBand({ title, text, href, cta, secondary }: { title: string; text?: string; href: string; cta: string; secondary?: { href: string; label: string } }) {
  return (
    <section className="cta-band">
      <Mark className="mark bg-mark" />
      <div className="wrap">
        <div>
          <h2>{title}</h2>
          {text && <p>{text}</p>}
        </div>
        <div className="btn-row">
          <Link href={href} className="btn btn-primary">
            {cta} <span className="arrow" aria-hidden="true">→</span>
          </Link>
          {secondary && (
            <Link href={secondary.href} className="btn btn-ghost">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
