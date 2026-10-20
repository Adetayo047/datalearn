import { marquee } from "@/content/site";
import s from "./Marquee.module.css";

export default function Marquee({ items = marquee }: { items?: string[] }) {
  const row = (hidden: boolean) => (
    <ul className={s.row} aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={t}>
          <span className={i % 4 === 3 ? s.amberMark : s.mark} aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={s.band}>
      <div className={s.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
