import type { Metadata } from "next";
import FormWizard from "@/components/FormWizard";
import BlueprintArt from "@/components/BlueprintArt";
import { PageHero, Sheet, ToConfirm } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "For sponsors",
  description: "Fund a place, a cohort or a career track, and get honest reporting on what your support achieved.",
};

const options = [
  { t: "Sponsor a place", d: "Cover one participant's training, mentoring and project costs from application to placement." },
  { t: "Sponsor a cohort", d: "Fund a full cohort of 10–15 participants. Your organisation can provide project briefs and mentors too." },
  { t: "Sponsor a track", d: "Help launch a new career track, such as software or creative skills, based on employer demand." },
  { t: "Equipment and access", d: "Laptops, data plans, software licences or learning platforms for participants who lack them." },
];

const report = [
  ["Cost per participant", "Total delivery cost divided by participants who started."],
  ["Cost per completion", "Total delivery cost divided by participants who finished."],
  ["Skills gain", "Average change between baseline and final assessment."],
  ["Employment at 3 and 12 months", "Placed and still employed, reported separately from interviews and offers."],
];

export default function Sponsors() {
  return (
    <>
      <PageHero
        label="For sponsors and partners"
        title="Fund a place. Track the outcome."
        accent="Track the outcome."
        art={
          <BlueprintArt
            chips={[
              { text: "Place sponsored", sub: "Fees, data, laptop", tone: "green", top: "6%", left: "0%" },
              { text: "Cohort report", sub: "Same public definitions", top: "46%", right: "-2%", delay: 250 },
              { text: "12-month follow-up", sub: "Did the work last?", tone: "amber", top: "58%", left: "-6%", delay: 500 },
            ]}
          />
        }
        lede="Your support pays for the things that keep capable people out: fees, equipment, data and time. In return, you get clear, honest reporting on what it achieved."
      >
        <div className="btn-row">
          <a href="#enquire" className="btn btn-primary">
            Talk to us <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <Sheet n="01" title="Ways to give" right="Choose a scale" />
          <div className="grid g4">
            {options.map((o, i) => (
              <div key={o.t} className="card">
                <span className="mono muted">0{i + 1}</span>
                <h3>{o.t}</h3>
                <p>{o.d}</p>
              </div>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 20 }}>
            Cost per participant will be published once the pilot budget is final. <ToConfirm>Pilot budget</ToConfirm>
          </p>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap split">
          <div className="head" style={{ marginBottom: 0 }}>
            <Sheet n="02" title="What you'll see" right="Every cohort" />
            <h2>Reporting you can take to your board.</h2>
            <p className="lede">Sponsors receive a cohort report with the same definitions we use publicly. No cherry-picked case studies in place of numbers.</p>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Measure</th>
                  <th>Definition</th>
                </tr>
              </thead>
              <tbody>
                {report.map(([m, d]) => (
                  <tr key={m}>
                    <td style={{ fontWeight: 600 }}>{m}</td>
                    <td>{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" id="enquire">
        <div className="wrap split" style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.5fr)" }}>
          <div className="head" style={{ marginBottom: 0, alignContent: "start" }}>
            <Sheet n="03" title="Enquire" right="No commitment" />
            <h2>Start a conversation.</h2>
            <p className="lede">Tell us what you&apos;d like to support. We&apos;ll send options and costs, and answer every question before you decide.</p>
          </div>
          <FormWizard kind="sponsor" />
        </div>
      </section>
    </>
  );
}
