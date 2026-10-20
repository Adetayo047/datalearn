"use client";

import { useEffect, useRef, useState } from "react";
import { phases, stages } from "@/content/site";
import { BARS } from "./Logo";
import s from "./BridgeScroll.module.css";

const TOPS = [
  { x: 15, y: 48 },
  { x: 37, y: 36 },
  { x: 59, y: 24 },
  { x: 81, y: 12 },
];
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export default function BridgeScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(1);
  const [still, setStill] = useState(true);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    setStill(false);
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setP(clamp(-r.top / (total || 1)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Progress runs 0..1 over the section. Each bar builds in its own quarter.
  const t = p * 4;
  const active = Math.min(3, Math.floor(t));
  const grow = BARS.map((_, i) => ease(clamp((t - i) * 1.6, 0, 1)));
  const archDraw = clamp((t - 1) * 1.2);

  // The participant travels along the tops of the bars.
  const seg = clamp(t - 0.5, 0, 3);
  const k = Math.floor(Math.min(seg, 2.999));
  const f = ease(seg - k);
  const a = TOPS[k];
  const b = TOPS[Math.min(k + 1, 3)];
  const dot = { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f - 7 - Math.sin(f * Math.PI) * 6 };

  return (
    <section className={s.outer} data-still={still} aria-labelledby="crossing-title">
      <div ref={ref} className={s.track}>
        <div className={s.sticky}>
          <div className={`wrap ${s.grid}`}>
            <div className={s.copy}>
              <span className="label">The crossing · 8 stages, 4 phases</span>
              <h2 id="crossing-title" className={s.title}>
                Every participant crosses the same bridge.
              </h2>
              <ol className={s.phases}>
                {phases.map((ph, i) => (
                  <li key={ph.key} className={s.phase} data-active={still || i === active} data-done={!still && i < active}>
                    <span className={s.num}>0{i + 1}</span>
                    <div>
                      <h3>{ph.verb}.</h3>
                      <p>{ph.summary}</p>
                      <span className="mono muted">
                        Stages {ph.stages.join(" & ")}: {ph.stages.map((n) => stages[n - 1].title).join(", ")}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className={s.stage} aria-hidden="true">
              <div className={s.canvas}>
              <div
                className={s.callout}
                data-phase={active}
                style={{ left: `${(((still ? 81 : dot.x) + 8) / 112) * 100}%`, top: `${(((still ? 5 : dot.y) + 10) / 116) * 100}%` }}
              >
                <span className="mono">
                  Stage {phases[still ? 3 : active].stages[0]}–{phases[still ? 3 : active].stages[1]} of 8
                </span>
                <strong>{phases[still ? 3 : active].verb}</strong>
              </div>
              <svg viewBox="-8 -10 112 116" className={s.svg}>
                <defs>
                  <pattern id="bgrid" width="4" height="4" patternUnits="userSpaceOnUse">
                    <path d="M4 0H0V4" fill="none" stroke="var(--line-soft)" strokeWidth=".3" />
                  </pattern>
                </defs>
                <rect x="-8" y="-10" width="112" height="116" fill="url(#bgrid)" />
                <line x1="-8" y1="88" x2="104" y2="88" stroke="var(--line)" strokeWidth=".5" />
                {BARS.map((d, i) => (
                  <path key={`ghost${i}`} d={d} fill="none" stroke="var(--line)" strokeWidth=".4" strokeDasharray="1.2 1" />
                ))}
                {BARS.map((d, i) => (
                  <path
                    key={`glow${i}`}
                    d={d}
                    className={s.glowBar}
                    style={{ opacity: still ? 0 : i === active ? 0.9 : 0, transform: `scaleY(${still ? 1 : Math.max(0.0001, grow[i])})` }}
                  />
                ))}
                {BARS.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    className={i === 3 ? s.barB : s.barA}
                    style={{ transform: `scaleY(${still ? 1 : Math.max(0.0001, grow[i])})` }}
                  />
                ))}
                <path
                  d="M24 88A24 24 0 0 1 72 88"
                  fill="none"
                  stroke="var(--blueprint)"
                  strokeWidth=".6"
                  strokeDasharray="1.6 1.2"
                  pathLength={1}
                  style={{ opacity: still ? 0.9 : archDraw, strokeDashoffset: 0 }}
                />
                <g style={{ transform: `translate(${still ? 81 : dot.x}px, ${still ? 5 : dot.y}px)` }} className={s.person}>
                  <circle r="3.4" fill="var(--ascent)" stroke="var(--paper)" strokeWidth="1.2" />
                </g>
                {phases.map((ph, i) => (
                  <text key={ph.key} x={TOPS[i].x} y="97" textAnchor="middle" className={s.tick} data-on={still || i <= active}>
                    {ph.name.toUpperCase()}
                  </text>
                ))}
                <text x="48" y="82" textAnchor="middle" className={s.gap} style={{ opacity: still ? 1 : archDraw }}>
                  THE GAP
                </text>
              </svg>
              </div>
              <div className={s.rail}>
                <span style={{ transform: `scaleX(${still ? 1 : p})` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
