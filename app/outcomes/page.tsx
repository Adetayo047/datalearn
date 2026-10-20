import type { Metadata } from "next";
import { PageHero, Sheet } from "@/components/Blocks";
import { metrics } from "@/content/site";
import s from "./outcomes.module.css";

export const metadata: Metadata = {
  title: "Outcomes",
  description: "How DataLearn measures and reports results: interviews, offers, placements and long-term employment, reported separately for every cohort.",
};

const funnel = ["Applied", "Started", "Completed", "Interviewed", "Offered", "Placed at 3 months", "Employed at 12 months"];

export default function Outcomes() {
  const areas = Array.from(new Set(metrics.map((m) => m.area)));
  return (
    <>
      <PageHero
        label="Outcomes"
        title="What we promise to measure, before we have any results." accent="before we have any results."
        lede="Programmes like ours often report one flattering number. We will report every step separately, for every cohort, using the definitions on this page."
      />

      <section className="section">
        <div className="wrap">
          <Sheet n="01" title="Cohort 01 dashboard" right="Awaiting data" />
          <div className={s.dash}>
            <div className={s.dashHead}>
              <div>
                <span className="label">Cohort</span>
                <strong>01 · Data analysis</strong>
              </div>
              <span className={s.status}>
                <i aria-hidden="true" /> Not started. Results publish after the cohort completes.
              </span>
            </div>
            <ol className={s.funnel} aria-label="Outcome funnel, no data yet">
              {funnel.map((f, i) => (
                <li key={f}>
                  <span className={s.fbar} style={{ height: `${100 - i * 11}%` }} aria-hidden="true" />
                  <span className={`${s.fval} tnum`}>—</span>
                  <span className={s.flabel}>{f}</span>
                </li>
              ))}
            </ol>
            <p className="mono muted">Each bar will show a count and the share of participants who started. Empty until real data exists.</p>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <Sheet n="02" title="Definitions" right="Fixed before the pilot" />
          <div className="head">
            <h2>How each number is defined</h2>
            <p className="lede">We publish these definitions now so that we can&apos;t quietly change them later.</p>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Measure</th>
                  <th>Definition</th>
                </tr>
              </thead>
              <tbody>
                {areas.flatMap((a) =>
                  metrics
                    .filter((m) => m.area === a)
                    .map((m) => (
                      <tr key={m.name}>
                        <td className="mono muted">{a}</td>
                        <td style={{ fontWeight: 600 }}>{m.name}</td>
                        <td>{m.definition}</td>
                      </tr>
                    )),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Sheet n="03" title="Our reporting rules" right="Commitments" />
          <div className="grid g3">
            {[
              ["Every step separately", "Interviews, offers, placements and sustained employment are never merged into one 'success rate'."],
              ["Everyone counts", "Rates are calculated against everyone who started, not just those who finished."],
              ["Real and simulated apart", "Projects for real partners and simulated briefs are counted separately."],
              ["Follow-up at 3 and 12 months", "We contact participants after the programme to see whether the work lasted."],
              ["Costs in the open", "Cost per participant and cost per completion are published with each report."],
              ["Bad news included", "If a cohort underperforms, we publish that and what we changed."],
            ].map(([t, d]) => (
              <div key={t} className="card">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
