import { BARS } from "./Logo";
import s from "./BlueprintArt.module.css";

type Label = { x: number; y: number; text: string; anchor?: "start" | "middle" | "end" };
type Chip = { text: string; sub?: string; tone?: "green" | "amber" | "plain"; top: string; left?: string; right?: string; delay?: number };

const DEFAULT_LABELS: Label[] = [
  { x: -12, y: 100, text: "EDUCATION" },
  { x: 104, y: 100, text: "EMPLOYMENT", anchor: "end" },
  { x: 48, y: 82, text: "THE GAP", anchor: "middle" },
  { x: 103, y: 19.5, text: "+12" },
];

// The participant's route: a hop from the top of each bar to the next, then a pause at the top.
const ROUTE = "M15 41 Q26 26 37 29 Q48 14 59 17 Q70 2 81 5";

export default function BlueprintArt({ labels = DEFAULT_LABELS, chips = [], loop = true }: { labels?: Label[]; chips?: Chip[]; loop?: boolean }) {
  return (
    <div className={s.wrap} aria-hidden="true">
      <svg viewBox="-16 -12 128 122" className={s.svg}>
        <defs>
          <pattern id="bp-grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M4 0H0V4" fill="none" stroke="var(--line-soft)" strokeWidth=".3" />
          </pattern>
          <radialGradient id="bp-fade" cx="50%" cy="55%" r="60%">
            <stop offset="55%" stopColor="#fff" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
          <mask id="bp-mask">
            <rect x="-16" y="-12" width="128" height="122" fill="url(#bp-fade)" />
          </mask>
        </defs>
        <rect x="-16" y="-12" width="128" height="122" fill="url(#bp-grid)" mask="url(#bp-mask)" />

        <g fill="none" stroke="var(--blueprint)" strokeWidth=".4" className={s.lines}>
          <line x1="-12" y1="88" x2="108" y2="88" pathLength={1} className={s.draw} style={{ ["--t" as string]: "0ms" }} />
          <circle cx="48" cy="88" r="24" pathLength={1} className={s.draw} style={{ ["--t" as string]: "500ms" }} />
          <line x1="6" y1="48" x2="90" y2="12" pathLength={1} className={s.draw} style={{ ["--t" as string]: "900ms" }} />
          <path d="M100 12V24M98 12H102M98 24H102" pathLength={1} className={s.draw} style={{ ["--t" as string]: "1300ms" }} />
        </g>

        {BARS.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="var(--line)" strokeWidth=".5" pathLength={1} className={s.draw} style={{ ["--t" as string]: `${200 + i * 120}ms` }} />
            <path d={d} className={`${s.bar} ${i === 3 ? s.amber : s.green}`} style={{ ["--t" as string]: `${700 + i * 140}ms` }} />
          </g>
        ))}

        <g className={s.labels}>
          {labels.map((l) => (
            <text key={l.text} x={l.x} y={l.y} textAnchor={l.anchor}>
              {l.text}
            </text>
          ))}
        </g>

        {loop && (
          <g className={s.walker}>
            <circle r="5.5" className={s.halo}>
              <animateMotion dur="7s" repeatCount="indefinite" path={ROUTE} keyPoints="0;0;0.34;0.34;0.67;0.67;1;1" keyTimes="0;0.12;0.27;0.38;0.53;0.64;0.79;1" calcMode="linear" />
            </circle>
            <circle r="3" fill="var(--ascent)" stroke="var(--paper)" strokeWidth="1">
              <animateMotion dur="7s" repeatCount="indefinite" path={ROUTE} keyPoints="0;0;0.34;0.34;0.67;0.67;1;1" keyTimes="0;0.12;0.27;0.38;0.53;0.64;0.79;1" calcMode="linear" />
            </circle>
          </g>
        )}
        <circle cx="81" cy="5" r="3" fill="var(--ascent)" stroke="var(--paper)" strokeWidth="1" className={s.still} />
      </svg>

      {chips.map((c) => (
        <div
          key={c.text}
          className={`${s.chip} ${c.tone === "green" ? s.chipGreen : c.tone === "amber" ? s.chipAmber : ""}`}
          style={{ top: c.top, left: c.left, right: c.right, ["--cd" as string]: `${c.delay ?? 0}ms` }}
        >
          <strong>{c.text}</strong>
          {c.sub && <span>{c.sub}</span>}
        </div>
      ))}
    </div>
  );
}
