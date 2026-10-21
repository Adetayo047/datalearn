import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Sheet } from "@/components/Blocks";
import { faqs } from "@/content/site";
import AskButton from "@/components/AskButton";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions from learners, employers and partners.",
};

export default function Faq() {
  const groups = ["Learners", "Employers", "General"] as const;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        label="FAQ"
        title="Questions, answered plainly."
        accent="answered plainly."
        lede="Browse the common questions below, or ask our AI assistant anything about the programme. It answers from the information on this website."
      >
        <div className="btn-row">
          <AskButton />
        </div>
      </PageHero>
      {groups.map((g, i) => (
        <section key={g} className={`section ${i % 2 ? "tint" : ""}`}>
          <div className="wrap narrow">
            <Sheet n={`0${i + 1}`} title={g} />
            <div style={{ display: "grid", gap: 8 }}>
              {faqs
                .filter((f) => f.group === g)
                .map((f) => (
                  <details key={f.q} className="card" style={{ gap: 0 }}>
                    <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "1.1rem" }}>{f.q}</summary>
                    <p style={{ marginTop: 12 }}>{f.a}</p>
                  </details>
                ))}
            </div>
          </div>
        </section>
      ))}
      <section className="section">
        <div className="wrap narrow">
          <p className="lede">
            Didn&apos;t find your answer? Ask the assistant using the button at the bottom of the screen, or{" "}
            <Link href="/contact" className="link">
              contact the team directly
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
