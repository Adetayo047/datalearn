import { pilot } from "@/content/site";
import s from "./DayRuler.module.css";

// A 90-day ruler: each segment is drawn to scale from its day range.
const ranges = [
  [1, 30],
  [31, 45],
  [46, 75],
  [76, 90],
];

export default function DayRuler() {
  return (
    <div className={s.ruler}>
      <div className={s.bar} aria-hidden="true">
        {ranges.map(([a, b], i) => (
          <span key={i} style={{ flexGrow: b - a + 1 }} data-last={i === ranges.length - 1}>
            <em>
              {a}–{b}
            </em>
          </span>
        ))}
      </div>
      <div className={s.ticks} aria-hidden="true">
        {[1, 15, 30, 45, 60, 75, 90].map((d) => (
          <span key={d} style={{ left: `${((d - 1) / 89) * 100}%` }}>
            {d}
          </span>
        ))}
      </div>
      <ol className={s.list}>
        {pilot.map((p, i) => (
          <li key={p.title} style={{ flexGrow: ranges[i][1] - ranges[i][0] + 1 }}>
            <span className="label">{p.days}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
