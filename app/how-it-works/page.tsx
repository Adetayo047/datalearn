import type { Metadata } from "next";
import Link from "next/link";
import JourneyExplorer from "@/components/JourneyExplorer";
import BlueprintArt from "@/components/BlueprintArt";
import { CtaBand, PageHero, Sheet } from "@/components/Blocks";
import { phases, safeguards } from "@/content/site";

export const metadata: Metadata = {
  title: "How it works",
  description: "Eight stages in four phases: learn, practise, prove and work. See what participants do and how employers take part at each step.",
};

export default function HowItWorks() {
  return (
    <>
      <PageHero
        label="How it works"
        title="Eight stages. Four phases. One bridge."
        accent="One bridge."
        art={<BlueprintArt labels={[{ x: 15, y: 100, text: "LEARN", anchor: "middle" }, { x: 37, y: 100, text: "PRACTISE", anchor: "middle" }, { x: 59, y: 100, text: "PROVE", anchor: "middle" }, { x: 81, y: 100, text: "WORK", anchor: "middle" }, { x: 48, y: 82, text: "THE GAP", anchor: "middle" }]} />}
        lede="DataLearn is a supervised route from learning to work. Every participant follows the same structure, with clear criteria at each step."
      />

      <section className="section">
        <div className="wrap">
          <Sheet n="01" title="The four phases" right="One per bar of the logo" />
          <div className="grid g4">
            {phases.map((p, i) => (
              <div key={p.key} className="card" style={i === 3 ? { borderColor: "var(--ascent)", borderWidth: 2 } : undefined}>
                <span className="mono muted">
                  Phase {i + 1} · stages {p.stages.join(" & ")}
                </span>
                <h3>{p.verb}.</h3>
                <p>{p.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <Sheet n="02" title="Stage by stage" right="Choose a stage" />
          <div className="head">
            <h2>Explore the journey</h2>
            <p className="lede">Pick a stage to see what happens, how long it takes and what you leave with. Switch to the employer view to see how businesses take part.</p>
          </div>
          <JourneyExplorer />
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="head" style={{ marginBottom: 0 }}>
            <Sheet n="03" title="Safeguards" right="Non-negotiable" />
            <h2>Rules we hold ourselves to</h2>
            <p className="lede">
              A programme that places people in work has a duty of care. These rules apply to every cohort, every project and every partner.
            </p>
            <Link href="/about#safeguards" className="link">
              Read more about how we work
            </Link>
          </div>
          <ul className="list-check">
            {safeguards.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="See yourself on the bridge?" text="Applications for the pilot cohort are open." href="/apply" cta="Apply now" secondary={{ href: "/learners", label: "Learner details" }} />
    </>
  );
}
