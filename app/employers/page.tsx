import type { Metadata } from "next";
import Link from "next/link";
import FormWizard from "@/components/FormWizard";
import CandidateStack from "@/components/CandidateStack";
import { PageHero, Sheet } from "@/components/Blocks";
import { faqs } from "@/content/site";

export const metadata: Metadata = {
  title: "For employers",
  description: "Meet entry-level candidates you've already seen at work. Share a project brief, mentor, review work and interview the people who impressed you.",
};

const ways = [
  { t: "Provide a project brief", time: "2–4 hours to scope, then ~1 hour a week", cost: "Free", d: "Give participants a real question from your business. We help shape it into a supervised project of the right size." },
  { t: "Mentor a participant", time: "1 hour a week for 4–6 weeks", cost: "Free", d: "Review work, answer questions and give the kind of feedback only a practitioner can give." },
  { t: "Review and interview", time: "Half a day per cohort", cost: "Free", d: "Join the final demonstrations, read verified portfolios and interview the candidates whose work stood out." },
  { t: "Offer a placement or paid project", time: "Agreed per role", cost: "You pay the participant", d: "Internships, apprenticeships or scoped paid projects, with pay, hours and supervision agreed in writing first." },
  { t: "Recruitment service", time: "Per hire", cost: "Paid", d: "We shortlist, prepare and introduce candidates for your open roles, using the evidence from their projects." },
  { t: "Tailored training", time: "Per programme", cost: "Paid", d: "Use the same practical model to develop your own early-career staff." },
];

export default function Employers() {
  return (
    <>
      <PageHero
        label="For employers"
        title="Meet candidates you've already seen at work."
        accent="already seen at work."
        art={<CandidateStack />}
        lede="CVs and certificates tell you little about an entry-level candidate. DataLearn lets you set the work, watch how people handle it, and then hire on evidence."
      >
        <div className="btn-row">
          <a href="#brief" className="btn btn-primary">
            Submit a project brief <span className="arrow" aria-hidden="true">→</span>
          </a>
          <Link href="/portfolio/sample" className="btn btn-ghost">
            See a sample portfolio
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <Sheet n="01" title="Ways to take part" right="Start small" />
          <div className="head">
            <h2>Pick the level of involvement that suits you.</h2>
            <p className="lede">Most partners start with a single project brief. It costs nothing and commits you to nothing.</p>
          </div>
          <div className="grid g3">
            {ways.map((w) => (
              <div key={w.t} className="card">
                <span className={`chip ${w.cost === "Free" ? "green" : ""}`}>{w.cost}</span>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
                <span className="mono muted" style={{ marginTop: "auto" }}>
                  {w.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap split">
          <div className="head" style={{ marginBottom: 0 }}>
            <Sheet n="02" title="What a candidate file contains" right="Evidence, not claims" />
            <h2>Everything you need to judge a candidate is in one place.</h2>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Evidence</th>
                  <th>What it tells you</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Baseline and final scores</td><td>How much the person improved, not just where they ended.</td></tr>
                <tr><td>Project briefs and outputs</td><td>The actual work, labelled as a real or simulated brief.</td></tr>
                <tr><td>Assessment criteria</td><td>Exactly what the work was judged against, set before it started.</td></tr>
                <tr><td>Mentor reviews</td><td>A practitioner&apos;s view of reliability, communication and teamwork.</td></tr>
                <tr><td>Consent record</td><td>Confirmation the candidate chose to share their profile with you.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" id="brief">
        <div className="wrap split" style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.5fr)" }}>
          <div className="head" style={{ marginBottom: 0, alignContent: "start" }}>
            <Sheet n="03" title="Submit a brief" right="About 5 minutes" />
            <h2>Have a question your team never has time to answer?</h2>
            <p className="lede">Tell us about it. We&apos;ll call you to scope it into a project participants can deliver under supervision.</p>
            <div className="notice">
              <strong>No personal data, please.</strong> Describe the data you have; don&apos;t attach it. We agree data handling in writing before any project starts.
            </div>
          </div>
          <FormWizard kind="brief" />
        </div>
      </section>

      <section className="section tint">
        <div className="wrap narrow">
          <Sheet n="04" title="Questions employers ask" right="FAQ" />
          <div style={{ display: "grid", gap: 8 }}>
            {faqs
              .filter((f) => f.group === "Employers")
              .map((f) => (
                <details key={f.q} className="card" style={{ gap: 0 }}>
                  <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "1.1rem" }}>{f.q}</summary>
                  <p style={{ marginTop: 12 }}>{f.a}</p>
                </details>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
