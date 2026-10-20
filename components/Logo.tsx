import Link from "next/link";

export const BARS = [
  "M6 48H24V88H6Z",
  "M28 36H46V64.08A24 24 0 0 0 28 74.73Z",
  "M50 24H68V74.73A24 24 0 0 0 50 64.08Z",
  "M72 12H90V88H72Z",
];

export function Mark({ className = "mark", title }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {BARS.map((d, i) => (
        <path key={i} className={i === 3 ? "b" : "a"} d={d} />
      ))}
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="wordmark">
      <b>data</b>learn
    </span>
  );
}

export function BrandLink() {
  return (
    <Link href="/" className="brand" aria-label="DataLearn home">
      <Mark />
      <Wordmark />
    </Link>
  );
}
