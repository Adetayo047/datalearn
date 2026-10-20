import Link from "next/link";
import { site } from "@/content/site";
import { Mark, Wordmark } from "./Logo";

const cols = [
  {
    title: "Programme",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/tracks", label: "Career tracks" },
      { href: "/portfolio/sample", label: "Sample portfolio" },
      { href: "/outcomes", label: "Outcomes" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { href: "/apply", label: "Apply as a learner" },
      { href: "/employers", label: "Partner as an employer" },
      { href: "/sponsors", label: "Sponsor places" },
      { href: "/contact", label: "Become a mentor" },
    ],
  },
  {
    title: "Organisation",
    links: [
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy and consent" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <div className="brand" style={{ ["--mark-a" as string]: "#fff" }}>
              <Mark />
              <Wordmark />
            </div>
            <p style={{ maxWidth: "34ch", color: "#b8c8c3" }}>{site.tagline} A global programme bridging education and employment.</p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4>{c.title}</h4>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} DataLearn. Working name; organisation in formation.</span>
          <span className="mono">Learn · Practise · Prove · Work</span>
        </div>
      </div>
    </footer>
  );
}
