import type { Metadata } from "next";
import Link from "next/link";
import VerifiedBadge from "@/components/VerifiedBadge";
import { Sheet } from "@/components/Blocks";
import s from "./portfolio.module.css";

export const metadata: Metadata = {
  title: "Sample portfolio",
  description: "An example of a DataLearn verified portfolio: the brief, the work, the assessment criteria and the mentor review.",
};

const scores = [
  { skill: "Data cleaning", before: 38, after: 82 },
  { skill: "SQL queries", before: 22, after: 71 },
  { skill: "Visualisation", before: 45, after: 86 },
  { skill: "Presenting findings", before: 30, after: 78 },
];

export default function SamplePortfolio() {
  return (
    <>
      <div className={s.banner} role="note">
        <div className="wrap">
          <strong>Sample profile.</strong> This page shows the format of a DataLearn portfolio. The person, scores and project are illustrative, not real.
        </div>
      </div>

      <section className={s.head}>
        <div className={`wrap ${s.headGrid}`}>
          <div className={s.avatar} aria-hidden="true">
            AS
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            <span className="label">Verified portfolio · Data analysis · Cohort 01</span>
            <h1 className={s.name}>Amara S.</h1>
            <p className="lede">Economics graduate. Finds the story in messy data and explains it so a manager can act on it the same day.</p>
            <div className="btn-row">
              <span className="chip green">Open to work</span>
              <span className="chip">Remote or hybrid</span>
              <span className="chip">Profile shared with consent</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Sheet n="01" title="Skills: baseline to final" right="Assessed scores out of 100" />
          <div className={s.scores}>
            {scores.map((x) => (
              <div key={x.skill} className={s.row}>
                <span className={s.skill}>{x.skill}</span>
                <div className={s.track} role="img" aria-label={`${x.skill}: ${x.before} at baseline, ${x.after} at final assessment`}>
                  <span className={s.before} style={{ width: `${x.before}%` }} />
                  <span className={s.after} style={{ left: `${x.before}%`, width: `${x.after - x.before}%` }} />
                </div>
                <span className={`${s.val} tnum`}>
                  {x.before} → <b>{x.after}</b>
                </span>
              </div>
            ))}
            <div className={s.legend}>
              <span><i className={s.lb} /> Baseline</span>
              <span><i className={s.la} /> Gain by final assessment</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <Sheet n="02" title="Projects" right="2 assessed" />
          <div className="grid g2">
            <article className="card">
              <div className="btn-row">
                <span className="chip">Simulated brief</span>
                <span className="chip green">Verified</span>
              </div>
              <h3>Why are repeat customers falling?</h3>
              <p>
                Cleaned 18 months of anonymised retail sales data, built a dashboard of repeat-purchase rates by region, and found that delivery
                delays in two regions explained most of the drop.
              </p>
              <dl className={s.meta}>
                <div><dt className="label">Role</dt><dd>Lead analyst, team of 3</dd></div>
                <div><dt className="label">Tools</dt><dd>SQL, spreadsheets, dashboard tool</dd></div>
                <div><dt className="label">Duration</dt><dd>4 weeks</dd></div>
              </dl>
              <blockquote className={s.quote}>
                &ldquo;Amara asked the right questions before touching the data, and her final presentation was the clearest in the cohort.&rdquo;
                <footer className="mono muted">Mentor review · Senior analyst (sample)</footer>
              </blockquote>
            </article>
            <article className="card">
              <div className="btn-row">
                <span className="chip amber">Real partner brief</span>
                <span className="chip green">Verified</span>
              </div>
              <h3>Weekly reporting for a logistics team</h3>
              <p>
                Replaced a manual weekly spreadsheet with an automated report. The partner&apos;s team now spends about two hours less on reporting
                each week.
              </p>
              <dl className={s.meta}>
                <div><dt className="label">Role</dt><dd>Analyst, paired project</dd></div>
                <div><dt className="label">Tools</dt><dd>Python, spreadsheets</dd></div>
                <div><dt className="label">Duration</dt><dd>3 weeks</dd></div>
              </dl>
              <blockquote className={s.quote}>
                &ldquo;Delivered on time, documented everything, and asked for feedback twice before handover.&rdquo;
                <footer className="mono muted">Partner review · Operations manager (sample)</footer>
              </blockquote>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split" style={{ alignItems: "center" }}>
          <div className="head" style={{ marginBottom: 0 }}>
            <Sheet n="03" title="Verified skills" right="Checkable by employers" />
            <h2>Every badge links back to the work.</h2>
            <p className="lede">
              Each verified skill has an ID. An employer can check that ID with us to confirm the criteria, the assessor and whether the brief was
              real or simulated.
            </p>
            <Link href="/employers" className="link">
              Hiring? See how employers take part
            </Link>
          </div>
          <div style={{ display: "grid", placeItems: "center" }}>
            <VerifiedBadge
              skill="Data cleaning and dashboarding"
              evidence="Simulated retail brief. Mentor-reviewed, presented to two employers."
              criteria={[
                { name: "Cleans and documents a messy data set", met: true },
                { name: "Chooses the right chart for each question", met: true },
                { name: "Explains findings to a non-technical audience", met: true },
                { name: "Delivers on time with version history", met: true },
              ]}
              id="DL-C01-0142"
              cohort="Cohort 01 · Sample"
            />
          </div>
        </div>
      </section>
    </>
  );
}
