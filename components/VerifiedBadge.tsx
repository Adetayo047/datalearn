import { Mark } from "./Logo";
import s from "./VerifiedBadge.module.css";

type Props = {
  skill: string;
  evidence: string;
  criteria: { name: string; met: boolean }[];
  id: string;
  cohort: string;
  sample?: boolean;
};

export default function VerifiedBadge({ skill, evidence, criteria, id, cohort, sample = true }: Props) {
  const met = criteria.filter((c) => c.met).length;
  return (
    <figure className={s.badge} aria-label={`Verified skill: ${skill}`}>
      <div className={s.top}>
        <Mark />
        <span className="label">Verified skill</span>
        {sample && <span className={s.sample}>Sample</span>}
      </div>
      <div className={s.body}>
        <strong className={s.skill}>{skill}</strong>
        <p className={s.evidence}>{evidence}</p>
        <ul className={s.criteria}>
          {criteria.map((c) => (
            <li key={c.name} data-met={c.met}>
              <span aria-hidden="true">{c.met ? "✓" : "–"}</span> {c.name}
            </li>
          ))}
        </ul>
        <div className={s.meter} aria-label={`${met} of ${criteria.length} criteria met`}>
          {criteria.map((c, i) => (
            <i key={i} data-met={c.met} data-last={i === criteria.length - 1} />
          ))}
        </div>
      </div>
      <figcaption className={s.foot}>
        <span className="mono">ID {id}</span>
        <span className="mono">{cohort}</span>
      </figcaption>
    </figure>
  );
}
