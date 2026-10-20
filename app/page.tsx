import Link from "next/link";
import BridgeScroll from "@/components/BridgeScroll";
import VerifiedBadge from "@/components/VerifiedBadge";
import DayRuler from "@/components/DayRuler";
import { CtaBand, Sheet } from "@/components/Blocks";
import { BARS } from "@/components/Logo";
import AnimatedTitle from "@/components/AnimatedTitle";
import BlueprintArt from "@/components/BlueprintArt";
import Marquee from "@/components/Marquee";
import Founders from "@/components/Founders";
import { metrics, values } from "@/content/site";
import s from "./home.module.css";

export default function Home() {
  return (
    <>
      <section className={s.hero} data-spotlight>
        <div className="glow" aria-hidden="true" />
        <div className={`wrap ${s.heroGrid}`}>
          <div className={`hero-copy ${s.heroCopy}`}>
            <span className="label">A global programme · Bridging education and employment</span>
            <AnimatedTitle text="From learning to proven work." accent="proven work." className={s.h1} />
            <p className="lede">
              Graduates have certificates. Employers want proof. DataLearn gives capable people supervised projects, verified evidence of their
              skills, and introductions to employers who have already seen them work.
            </p>
            <div className="btn-row">
              <Link href="/apply" className="btn btn-primary">
                Apply as a learner <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link href="/employers" className="btn btn-ghost">
                I&apos;m hiring
              </Link>
            </div>
            <p className={s.pilot}>
              <span className={s.dot} aria-hidden="true" /> Pilot cohort forming now · Data analysis track · 10–15 places
            </p>
          </div>

          <div className={s.heroArt}>
            <BlueprintArt
              chips={[
                { text: "Project brief received", sub: "Partner business · week 5", top: "4%", left: "-2%", delay: 0 },
                { text: "Mentor review", sub: "4 of 4 criteria met", tone: "green", top: "42%", right: "-4%", delay: 250 },
                { text: "Interview booked", sub: "Employer · week 12", tone: "amber", top: "58%", left: "-6%", delay: 500 },
              ]}
            />
          </div>
        </div>
      </section>

      <Marquee />

      <BridgeScroll />

      <section className="section">
        <div className="wrap">
          <Sheet n="01" title="The experience trap" right="Why DataLearn exists" />
          <div className="split">
            <div className="head" style={{ marginBottom: 0 }}>
              <h2>No experience, no job. No job, no experience.</h2>
              <p className="lede">
                Entry-level jobs ask for experience that new graduates have had no fair chance to get. Employers can&apos;t judge talent from a CV
                and a certificate. Capable people wait outside, and roles stay empty.
              </p>
            </div>
            <div className={s.loop}>
              <svg viewBox="0 0 320 230" role="img" aria-label="A loop: no experience leads to no job, which leads back to no experience. DataLearn breaks the loop with supervised projects and verified proof.">
                <defs>
                  <marker id="arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M0 0L10 5L0 10z" fill="var(--muted)" />
                  </marker>
                </defs>
                <path d="M86 64 Q160 4 234 64" fill="none" stroke="var(--muted)" strokeWidth="2" markerEnd="url(#arr)" />
                <path d="M234 128 Q160 188 86 128" fill="none" stroke="var(--muted)" strokeWidth="2" strokeDasharray="6 5" markerEnd="url(#arr)" />
                <rect x="10" y="72" width="136" height="48" rx="4" fill="var(--card)" stroke="var(--line)" strokeWidth="1.5" />
                <text x="78" y="101" textAnchor="middle" className={s.loopText}>No experience</text>
                <rect x="174" y="72" width="136" height="48" rx="4" fill="var(--card)" stroke="var(--line)" strokeWidth="1.5" />
                <text x="242" y="101" textAnchor="middle" className={s.loopText}>No job</text>
                <g transform="translate(136 134)">
                  <rect width="48" height="48" rx="4" fill="var(--span)" />
                  <g transform="translate(6 4) scale(.38)">
                    {BARS.map((d, i) => (
                      <path key={i} d={d} fill={i === 3 ? "var(--ascent)" : "#fff"} />
                    ))}
                  </g>
                </g>
                <text x="160" y="206" textAnchor="middle" className={s.loopLabel}>DATALEARN BREAKS THE LOOP</text>
              </svg>
              <p className="mono muted">Supervised work creates the experience. Verified evidence makes it count.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <Sheet n="02" title="Who it's for" right="Three ways in" />
          <div className="grid g3">
            <Link href="/learners" className={`card link-card ${s.aud}`}>
              <span className="chip green">Learners</span>
              <h3>Turn what you&apos;ve learned into work you can prove.</h3>
              <p>Practical training, real projects with a mentor, a verified portfolio, and introductions to employers.</p>
              <span className="more">
                For learners <span aria-hidden="true">→</span>
              </span>
            </Link>
            <Link href="/employers" className={`card link-card ${s.aud}`}>
              <span className="chip amber">Employers</span>
              <h3>Meet candidates you&apos;ve already seen at work.</h3>
              <p>Share a real problem, mentor, review the work, then interview the people who solved it best.</p>
              <span className="more">
                For employers <span aria-hidden="true">→</span>
              </span>
            </Link>
            <Link href="/sponsors" className={`card link-card ${s.aud}`}>
              <span className="chip">Sponsors</span>
              <h3>Fund a place. Track the outcome.</h3>
              <p>Sponsor participants, a cohort or a career track, and get honest reporting on what your money achieved.</p>
              <span className="more">
                For sponsors <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Sheet n="03" title="Proof over promises" right="The verified portfolio" />
          <div className="split" style={{ alignItems: "center" }}>
            <div className="head" style={{ marginBottom: 0 }}>
              <h2>A certificate says you attended. A verified skill shows what you did.</h2>
              <p className="lede">
                Every project is assessed against criteria set before it starts. The result is a portfolio entry an employer can check: the
                brief, the work, the mentor&apos;s review, and whether the brief was real or simulated.
              </p>
              <div className="btn-row">
                <Link href="/portfolio/sample" className="btn btn-green">
                  See a sample portfolio <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className={s.badgeStage}>
              <VerifiedBadge
                skill="Data cleaning and dashboarding"
                evidence="Supervised project on a simulated retail brief. Mentor-reviewed, presented to two employers."
                criteria={[
                  { name: "Cleans and documents a messy data set", met: true },
                  { name: "Chooses the right chart for each question", met: true },
                  { name: "Explains findings to a non-technical audience", met: true },
                  { name: "Delivers on time with version history", met: true },
                ]}
                id="DL-C01-0142"
                cohort="Cohort 01 · Sample"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <Sheet n="04" title="For employers" right="What you get" />
          <div className="head">
            <h2>Hire on evidence, not on guesswork.</h2>
          </div>
          <div className="grid g3">
            {[
              ["Pre-assessed candidates", "Everyone you meet has a baseline score, a final score and mentor feedback you can read."],
              ["Work you've already seen", "Set the project, review the output, then interview the people whose work impressed you."],
              ["Low-risk first step", "Start with a single project brief. It is free, takes a few hours to scope, and commits you to nothing."],
            ].map(([t, d], i) => (
              <div key={t} className={s.darkItem}>
                <span className="mono">0{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: 40 }}>
            <Link href="/employers#brief" className="btn btn-primary">
              Submit a project brief <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Sheet n="05" title="The pilot" right="90 days, to scale" />
          <div className="head">
            <h2>Start small. Measure everything. Then grow.</h2>
            <p className="lede">One career track, one cohort, one honest report. The pilot proves the model before anything scales.</p>
          </div>
          <DayRuler />
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <Sheet n="06" title="Outcomes" right="Published for every cohort" />
          <div className="split">
            <div className="head" style={{ marginBottom: 0 }}>
              <h2>We will publish our results, including the bad ones.</h2>
              <p className="lede">
                Interviews, offers, placements and long-term employment are reported separately, so nobody has to guess what &ldquo;success&rdquo;
                means.
              </p>
              <Link href="/outcomes" className="link">
                How we measure outcomes
              </Link>
            </div>
            <ul className={s.metricList}>
              {metrics
                .filter((m) => ["Completion rate", "Interviews", "Offers", "Placed at 3 months", "Still employed at 12 months"].includes(m.name))
                .map((m) => (
                  <li key={m.name}>
                    <span>{m.name}</span>
                    <span className="mono muted">Reported after Cohort 01</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Sheet n="07" title="What we stand for" right="Six values" />
          <ul className={s.values}>
            {values.map((v) => (
              <li key={v.name}>
                <h3>{v.name}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <Sheet n="08" title="The founders" right="Who's building the bridge" />
          <div className="split" style={{ alignItems: "end", marginBottom: 40 }}>
            <h2>Built by people who believe talent deserves a fair chance.</h2>
            <p className="lede">
              DataLearn was co-founded by Lara Onuwa-Abiamuwe and Adetunji Philip to close the gap between what people learn and the work they are
              trusted to do.{" "}
              <Link href="/about#founders" className="link">
                Meet the founders
              </Link>
            </p>
          </div>
          <Founders compact />
        </div>
      </section>

      <CtaBand
        title="Ready to cross?"
        text="Applications for the pilot cohort are open. It takes about 15 minutes."
        href="/apply"
        cta="Start your application"
        secondary={{ href: "/how-it-works", label: "How it works" }}
      />
    </>
  );
}
