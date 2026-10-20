import { Mark } from "./Logo";
import s from "./CandidateStack.module.css";

// Illustration for employers: a fanned stack of candidate files. Initials and scores are illustrative.
const cards = [
  { initials: "TK", skill: "SQL reporting", score: [1, 1, 1, 0] },
  { initials: "MA", skill: "Dashboard design", score: [1, 1, 1, 1] },
  { initials: "AS", skill: "Data cleaning", score: [1, 1, 1, 1] },
];

export default function CandidateStack() {
  return (
    <div className={s.stack} aria-hidden="true">
      {cards.map((c, i) => (
        <div key={c.initials} className={s.card} style={{ ["--n" as string]: i }}>
          <div className={s.top}>
            <span className={s.avatar}>{c.initials}</span>
            <div className={s.who}>
              <strong>Candidate file</strong>
              <span>{c.skill}</span>
            </div>
            <Mark />
          </div>
          <div className={s.rows}>
            <span>Baseline → final</span>
            <i className={s.prog} style={{ ["--w" as string]: `${62 + i * 12}%` }} />
            <span>Mentor criteria</span>
            <div className={s.meter}>
              {c.score.map((m, k) => (
                <b key={k} data-on={m === 1} />
              ))}
            </div>
          </div>
          <div className={s.foot}>
            <span>Verified · sample</span>
            <span className={s.stamp}>Seen at work</span>
          </div>
        </div>
      ))}
    </div>
  );
}
