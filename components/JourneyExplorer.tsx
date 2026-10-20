"use client";

import { useState, type KeyboardEvent } from "react";
import { phases, stages } from "@/content/site";
import s from "./JourneyExplorer.module.css";

export default function JourneyExplorer() {
  const [active, setActive] = useState(0);
  const [view, setView] = useState<"learner" | "employer">("learner");
  const st = stages[active];
  const phaseIdx = phases.findIndex((p) => p.stages.includes(st.n));

  function onKey(e: KeyboardEvent) {
    const next = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (e.key === "Home") return select(0, e);
    if (e.key === "End") return select(stages.length - 1, e);
    if (next) select((active + next + stages.length) % stages.length, e);
  }
  function select(i: number, e?: KeyboardEvent) {
    e?.preventDefault();
    setActive(i);
    document.getElementById(`stage-tab-${i}`)?.focus();
  }

  return (
    <div className={s.root}>
      <div className={s.toolbar}>
        <span className="label">Show the journey for</span>
        <div className={s.toggle} role="group" aria-label="Perspective">
          <button type="button" aria-pressed={view === "learner"} onClick={() => setView("learner")}>
            Learners
          </button>
          <button type="button" aria-pressed={view === "employer"} onClick={() => setView("employer")}>
            Employers
          </button>
        </div>
      </div>

      <div className={s.layout}>
        <div role="tablist" aria-label="Programme stages" aria-orientation="vertical" className={s.tabs} onKeyDown={onKey}>
          {stages.map((x, i) => {
            const pi = phases.findIndex((p) => p.stages.includes(x.n));
            return (
              <button
                key={x.n}
                id={`stage-tab-${i}`}
                role="tab"
                aria-selected={i === active}
                aria-controls="stage-panel"
                tabIndex={i === active ? 0 : -1}
                className={s.tab}
                data-phase={pi}
                onClick={() => setActive(i)}
              >
                <span className={s.bar} style={{ height: `${46 + pi * 18}%` }} aria-hidden="true" />
                <span className="mono">{String(x.n).padStart(2, "0")}</span>
                <span className={s.tabTitle}>{x.short}</span>
              </button>
            );
          })}
        </div>

        <div id="stage-panel" role="tabpanel" aria-labelledby={`stage-tab-${active}`} className={s.panel} key={`${active}-${view}`}>
          <div className={s.panelHead}>
            <span className={`chip ${phaseIdx === 3 ? "amber" : "green"}`}>
              Phase {phaseIdx + 1} · {phases[phaseIdx].name}
            </span>
            <span className="mono muted">{st.duration}</span>
          </div>
          <h3 className={s.panelTitle}>
            {String(st.n).padStart(2, "0")}. {st.title}
          </h3>
          {view === "learner" ? (
            <dl className={s.dl}>
              <div>
                <dt className="label">What you do</dt>
                <dd>{st.you}</dd>
              </div>
              <div>
                <dt className="label">What you leave with</dt>
                <dd>{st.youGet}</dd>
              </div>
            </dl>
          ) : (
            <dl className={s.dl}>
              <div>
                <dt className="label">How employers take part</dt>
                <dd>{st.employer}</dd>
              </div>
              <div>
                <dt className="label">What participants are doing</dt>
                <dd>{st.you}</dd>
              </div>
            </dl>
          )}
          <div className={s.nav}>
            <button type="button" className="btn btn-ghost" onClick={() => setActive((a) => Math.max(0, a - 1))} disabled={active === 0}>
              ← Previous
            </button>
            <button type="button" className="btn btn-green" onClick={() => setActive((a) => Math.min(stages.length - 1, a + 1))} disabled={active === stages.length - 1}>
              Next stage →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
