import type { Metadata } from "next";
import Link from "next/link";
import DayRuler from "@/components/DayRuler";
import BlueprintArt from "@/components/BlueprintArt";
import { CtaBand, PageHero, Sheet, ToConfirm } from "@/components/Blocks";
import { faqs, tracks } from "@/content/site";

export const metadata: Metadata = {
  title: "For learners",
  description: "Turn what you've learned into work you can prove. Practical training, mentored projects, a verified portfolio and introductions to employers.",
};

const pilotTrack = tracks.find((t) => t.status === "pilot")!;

export default function Learners() {
  return (
    <>
      <PageHero
        label="For learners"
        title="You've done the learning. Now build the proof."
        accent="build the proof."
        art={
          <BlueprintArt
            chips={[
              { text: "Baseline check", sub: "Week 1", top: "6%", left: "0%" },
              { text: "Mentor feedback", sub: "Every project", tone: "green", top: "46%", right: "-2%", delay: 250 },
              { text: "Portfolio verified", sub: "Ready to share", tone: "amber", top: "58%", left: "-6%", delay: 500 },
            ]}
          />
        }
        lede="DataLearn is for capable people who have had no fair chance to show what they can do. You'll work on supervised projects, get honest feedback, and leave with evidence employers can trust."
      >
        <div className="btn-row">
          <Link href="/apply" className="btn btn-primary">
            Apply for the pilot <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/how-it-works" className="btn btn-ghost">
            How it works
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <Sheet n="01" title="Is this for you?" right="Who should apply" />
          <div className="grid g2">
            <div className="card">
              <h3>You&apos;re a good fit if you</h3>
              <ul className="list-check">
                <li>Graduated recently, are in your final year, or are changing career</li>
                <li>Can commit 10–15 hours a week for about 12 weeks</li>
                <li>Have reliable internet access and a laptop, or can use one at a partner venue</li>
                <li>Want feedback on your work, even when it&apos;s hard to hear</li>
              </ul>
            </div>
            <div className="card">
              <h3>You don&apos;t need</h3>
              <ul className="list-check">
                <li>Previous work experience. That is what the programme gives you</li>
                <li>A degree in a technical subject</li>
                <li>To live in a particular country. Training and most projects are online</li>
                <li>Professional contacts. Building them is part of the programme</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <Sheet n="02" title="The pilot track" right="Cohort 01" />
          <div className="split">
            <div className="head" style={{ marginBottom: 0 }}>
              <span className="chip green">Pilot track</span>
              <h2>{pilotTrack.name}</h2>
              <p className="lede">{pilotTrack.summary}</p>
              <Link href="/tracks" className="link">
                See all career tracks
              </Link>
            </div>
            <div className="grid g2">
              <div className="card">
                <span className="label">Tools you&apos;ll use</span>
                <ul className="list-check">
                  {pilotTrack.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <span className="label">Roles it leads to</span>
                <ul className="list-check">
                  {pilotTrack.roles.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Sheet n="03" title="Your 90 days" right="Pilot schedule" />
          <div className="head">
            <h2>What the pilot looks like</h2>
            <p className="lede">
              Participants join from day 31. Start dates <ToConfirm>Dates to confirm</ToConfirm> will be announced to applicants first.
            </p>
          </div>
          <DayRuler />
        </div>
      </section>

      <section className="section tint">
        <div className="wrap split">
          <div className="head" style={{ marginBottom: 0 }}>
            <Sheet n="04" title="What it costs" right="Plain answer" />
            <h2>Money shouldn&apos;t decide who gets a chance.</h2>
          </div>
          <div className="prose">
            <p>
              We are raising sponsorship so that pilot places can be free for the participants who need them. The application asks whether you would
              need a sponsored place. Your answer does not affect whether you are selected.
            </p>
            <p>
              We will confirm the cost of your place in writing before you commit to anything. <ToConfirm>Fees to confirm</ToConfirm>
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <Sheet n="05" title="Questions learners ask" right="FAQ" />
          <div style={{ display: "grid", gap: 8 }}>
            {faqs
              .filter((f) => f.group === "Learners")
              .map((f) => (
                <details key={f.q} className="card" style={{ gap: 0 }}>
                  <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "1.1rem" }}>{f.q}</summary>
                  <p style={{ marginTop: 12 }}>{f.a}</p>
                </details>
              ))}
          </div>
        </div>
      </section>

      <CtaBand title="Applications take about 15 minutes." text="We read every one and reply within 10 working days." href="/apply" cta="Start your application" />
    </>
  );
}
