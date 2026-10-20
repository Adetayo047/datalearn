import type { Metadata } from "next";
import { PageHero, ToConfirm } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Privacy and consent",
  description: "What information DataLearn collects, why, and how you control it.",
};

const sections: [string, string[]][] = [
  ["What we collect", [
    "The details you enter in our forms: your name, email, country and answers to the questions.",
    "For participants, assessment scores, project work and mentor feedback created during the programme.",
    "We do not use advertising trackers. This site stores your theme choice and unsent form drafts only in your own browser.",
  ]],
  ["Why we collect it", [
    "To reply to you, assess applications and run the programme.",
    "To produce anonymised, aggregate outcome reports. Individuals are never named in them without permission.",
  ]],
  ["Who sees it", [
    "Only the DataLearn programme team, by default.",
    "Employers see a participant's profile only after that participant gives explicit consent. You can withdraw consent at any time.",
    "We never sell personal data.",
  ]],
  ["Your rights", [
    "You can ask to see, correct or delete your information, or withdraw consent, by contacting us.",
    "We follow the data protection law that applies where you live, such as the GDPR in the UK and EU or the NDPA in Nigeria.",
  ]],
  ["How long we keep it", [
    "Enquiries: up to 12 months. Applications: up to 24 months. Programme records: as long as needed to verify your portfolio, or until you ask us to delete them.",
  ]],
];

export default function Privacy() {
  return (
    <>
      <PageHero label="Privacy and consent" title="Your information, your choice." accent="your choice." lede="A plain-language summary of how we handle personal data." />
      <section className="section">
        <div className="wrap narrow" style={{ display: "grid", gap: 40 }}>
          <div className="notice">
            <strong>Draft for review.</strong> This notice must be checked by a qualified adviser in each country where DataLearn operates before
            launch. <ToConfirm>Legal review</ToConfirm>
          </div>
          {sections.map(([h, items]) => (
            <div key={h} style={{ display: "grid", gap: 14 }}>
              <h2 style={{ fontSize: "var(--step-2)" }}>{h}</h2>
              <ul className="list-check">
                {items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
