import type { Metadata } from "next";
import { CtaBand, PageHero, Sheet, ToConfirm } from "@/components/Blocks";
import { Mark } from "@/components/Logo";
import BlueprintArt from "@/components/BlueprintArt";
import Founders from "@/components/Founders";
import { safeguards, values } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Why DataLearn exists, what we believe, and the rules we hold ourselves to.",
};

const meaning = [
  ["First bar", "Education: where everyone starts."],
  ["The arch", "The gap between education and employment. The whole structure exists to span it."],
  ["Equal steps", "Progress that is structured and measured. The 'data' in DataLearn."],
  ["Amber bar", "Meaningful work. The only part in colour, because it is the point."],
];

export default function About() {
  return (
    <>
      <PageHero
        label="About DataLearn"
        title="Talent is everywhere. The proof of it isn't."
        accent="The proof of it isn't."
        art={<BlueprintArt />}
        lede="DataLearn is a new organisation bridging the gap between education and employment, in any country where capable people are locked out of their first role."
      />

      <section className="section" id="founders">
        <div className="wrap">
          <Sheet n="01" title="The founders" right="Co-founders" />
          <div className="head">
            <h2>The people building the bridge.</h2>
            <p className="lede">DataLearn was co-founded by Lara Onuwa-Abiamuwe and Adetunji Philip.</p>
          </div>
          <Founders />
        </div>
      </section>

      <section className="section tint">
        <div className="wrap split">
          <div className="head" style={{ marginBottom: 0 }}>
            <Sheet n="02" title="Vision and mission" right="Concept note §3" />
            <h2>A fair chance to show what you can do.</h2>
          </div>
          <div className="prose">
            <p>
              <strong>Our vision</strong> is a world where every capable person has a fair opportunity to gain practical experience, demonstrate
              their abilities and access meaningful work, regardless of where they started.
            </p>
            <p>
              <strong>Our mission</strong> is to bridge the gap between education and employment by equipping people with practical skills,
              real-world experience, mentorship, professional networks and pathways to work, through partnerships with businesses and institutions.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split" style={{ alignItems: "center" }}>
          <div style={{ display: "grid", placeItems: "center", padding: "clamp(16px, 4vw, 48px)" }}>
            <div style={{ width: "min(260px, 70%)" }}>
              <Mark className="mark" />
            </div>
          </div>
          <div className="head" style={{ marginBottom: 0 }}>
            <Sheet n="03" title="Our mark" right="The bridge" />
            <h2>A bridge built from a bar chart.</h2>
            <dl style={{ margin: 0, display: "grid", gap: 14 }}>
              {meaning.map(([t, d]) => (
                <div key={t} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 16 }}>
                  <dt className="label" style={{ paddingTop: 4 }}>{t}</dt>
                  <dd style={{ margin: 0 }}>{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <Sheet n="04" title="Values" right="Six commitments" />
          <div className="grid g3">
            {values.map((v) => (
              <div key={v.name} className="card">
                <h3>{v.name}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="safeguards">
        <div className="wrap split">
          <div className="head" style={{ marginBottom: 0 }}>
            <Sheet n="05" title="Safeguards" right="Concept note §9" />
            <h2>How we protect participants and partners.</h2>
          </div>
          <ul className="list-check">
            {safeguards.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap split">
          <div className="head" style={{ marginBottom: 0 }}>
            <Sheet n="06" title="Organisation" right="In formation" />
            <h2>Small team, honest status.</h2>
          </div>
          <div className="prose">
            <p>
              DataLearn is at pilot stage. We are designing it as a social enterprise: earning enough to sustain itself while measuring its impact in
              the open. The legal structure is being finalised with qualified advisers. <ToConfirm>Legal form</ToConfirm>
            </p>
            <p>
              The founders are joined by advisers in training, employer partnerships, programme operations, technology and finance. We will
              introduce advisers and mentors here as their roles are confirmed. <ToConfirm>Advisers</ToConfirm>
            </p>
          </div>
        </div>
      </section>

      <CtaBand title="Help shape the pilot." text="We're looking for mentors, employers and advisers." href="/contact" cta="Get in touch" />
    </>
  );
}
