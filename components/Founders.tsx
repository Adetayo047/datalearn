import Image from "next/image";
import { founders } from "@/content/site";
import { ToConfirm } from "./Blocks";
import s from "./Founders.module.css";

export default function Founders({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${s.grid} ${compact ? s.compact : ""}`}>
      {founders.map((f, i) => (
        <article key={f.name} className={s.card} data-reveal style={{ ["--d" as string]: `${i * 120}ms` }}>
          <div className={s.photo}>
            <Image src={f.photo} alt={`Portrait of ${f.name}`} fill sizes="(max-width: 700px) 100vw, 520px" style={{ objectFit: "cover", objectPosition: f.photoPosition }} />
            <span className={s.corner} data-c="tl" aria-hidden="true" />
            <span className={s.corner} data-c="br" aria-hidden="true" />
            <span className={s.tag}>{f.role}</span>
          </div>
          <div className={s.body}>
            <span className="label">0{i + 1} · Founder</span>
            <h3 className={s.name}>{f.name}</h3>
            {!compact && (
              <p className={s.bio}>
                {f.bio} {f.bioToConfirm && <ToConfirm>Bio to confirm</ToConfirm>}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
