import type { Metadata } from "next";
import FormWizard from "@/components/FormWizard";
import { PageHero, ToConfirm } from "@/components/Blocks";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with DataLearn about joining, mentoring, partnering or sponsoring.",
};

export default function Contact() {
  return (
    <>
      <PageHero label="Contact" title="Talk to us." accent="Talk to us." lede="Learners, employers, mentors, sponsors and advisers are all welcome. We reply to every message within 5 working days." />
      <section className="section">
        <div className="wrap split" style={{ gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)" }}>
          <FormWizard kind="contact" />
          <aside style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <div className="card">
              <span className="label">Email</span>
              <p style={{ color: "var(--ink)", fontWeight: 600, userSelect: "all" }}>
                {site.email} {site.emailToConfirm && <ToConfirm />}
              </p>
            </div>
            <div className="card">
              <span className="label">Want to mentor?</span>
              <p>Choose &ldquo;Mentoring&rdquo; as the topic. Mentors give about one hour a week for four to six weeks, fully online.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
