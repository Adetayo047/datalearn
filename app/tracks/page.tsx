import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, Sheet } from "@/components/Blocks";
import { tracks } from "@/content/site";

export const metadata: Metadata = {
  title: "Career tracks",
  description: "DataLearn starts with one career track, data analysis, and adds more as each is proven.",
};

export default function Tracks() {
  const pilot = tracks.find((t) => t.status === "pilot")!;
  const later = tracks.filter((t) => t.status !== "pilot");
  return (
    <>
      <PageHero
        label="Career tracks"
        title="One track first. Done properly." accent="Done properly."
        lede="We start with a single career track so we can measure it honestly. New tracks open only when employers ask for them and the first one is working."
      />

      <section className="section">
        <div className="wrap">
          <Sheet n="01" title="Open now" right="Pilot" />
          <div className="card" style={{ borderColor: "var(--span)", borderWidth: 2, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
              <span className="chip green">Pilot · applications open</span>
              <h2>{pilot.name}</h2>
              <p>{pilot.summary}</p>
              <div className="btn-row">
                <Link href="/apply" className="btn btn-primary">
                  Apply <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div>
              <span className="label">Tools</span>
              <ul className="list-check" style={{ marginTop: 12 }}>
                {pilot.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="label">Roles</span>
              <ul className="list-check" style={{ marginTop: 12 }}>
                {pilot.roles.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <Sheet n="02" title="Coming later" right="Shaped by employer demand" />
          <div className="grid g4">
            {later.map((t) => (
              <div key={t.slug} className="card">
                <span className="chip">Later</span>
                <h3>{t.name}</h3>
                <p>{t.summary}</p>
                <span className="mono muted" style={{ marginTop: "auto" }}>
                  {t.roles.join(" · ")}
                </span>
              </div>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 24 }}>
            Want a track for your industry?{" "}
            <Link href="/employers#brief" className="link">
              Tell us what roles you&apos;re hiring for
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand title="Data analysis is open now." href="/apply" cta="Apply for the pilot" />
    </>
  );
}
