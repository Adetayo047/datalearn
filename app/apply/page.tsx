import type { Metadata } from "next";
import FormWizard from "@/components/FormWizard";
import { PageHero } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply for the DataLearn pilot cohort in the data analysis track. It takes about 15 minutes.",
};

export default function Apply() {
  return (
    <>
      <PageHero
        label="Apply · Pilot cohort · Data analysis"
        title="Apply for the pilot cohort" accent="pilot cohort"
        lede="Three short steps, about 15 minutes. There are no trick questions and no CV upload. We want to know where you are and where you want to go."
      />
      <section className="section">
        <div className="wrap split" style={{ gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)" }}>
          <FormWizard kind="apply" />
          <aside style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <div className="card">
              <span className="label">What happens next</span>
              <ol style={{ paddingLeft: 18, display: "grid", gap: 8 }}>
                <li>We reply within 10 working days.</li>
                <li>Shortlisted applicants take a 30-minute online skills check.</li>
                <li>A 20-minute video conversation with our team.</li>
                <li>We confirm your place, cost and start date in writing.</li>
              </ol>
            </div>
            <div className="notice">
              <strong>Your data:</strong> only the programme team sees your application. Nothing is shared with employers unless you choose to share
              your profile later.
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
