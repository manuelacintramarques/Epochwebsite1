"use client";

import { motion } from "framer-motion";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

function SectionReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-[#080808] min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#444] mb-6"
            style={{ fontFamily: "var(--font-label)" }}
          >
            About Epoch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-white font-medium leading-tight"
            style={{
              fontSize: "clamp(36px, 5.5vw, 64px)",
              letterSpacing: "-1px",
              maxWidth: "700px",
              fontFamily: "var(--font-hero)",
            }}
          >
            Finding other students who love AI shouldn&apos;t be this hard. So
            we built what we wished existed. Great resources, real projects, and
            a community that gets it. That&apos;s Epoch.
          </motion.h1>
        </div>
      </section>

      {/* Story + Stats */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1200px] mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">
          <SectionReveal>
            <div className="space-y-5 text-[#888] text-[15px] leading-[1.8] max-w-[560px]">
              <p>
                I spent a year trying to learn AI on my own. Watching YouTube
                videos, doing Coursera courses, starting and abandoning projects.
                I made some progress — but I felt stuck in a loop. Learning the
                same concepts, building the same toy examples, going nowhere.
              </p>
              <p>
                The thing I was missing wasn&apos;t content. There&apos;s more
                content than anyone could ever consume. What I was missing was
                people. Other students who were as obsessed with this as I was.
                A place to show my work, get feedback, and actually be held
                accountable.
              </p>
              <p>
                I looked for that community and couldn&apos;t find it. Every
                club I found was either too casual — just watching videos
                together — or too exclusive, where you already needed to be
                good. There was nothing for someone who was serious but still
                learning.
              </p>
              <p className="text-white">
                So I built it. Epoch is what I wished had existed when I started.
                Structured enough to make real progress. Open enough that you
                don&apos;t need to already be an expert. Community-first, because
                the people are the point.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal className="space-y-8">
            {[
              { value: "20+", label: "Countries represented" },
              { value: "Free", label: "Always, for everyone" },
              { value: "8wk", label: "Cohort cycles" },
              { value: "100%", label: "Student-run" },
            ].map((stat) => (
              <div key={stat.value} className="border-b border-[#1e1e1e] pb-6 last:border-0 last:pb-0">
                <p
                  className="text-white font-medium leading-none"
                  style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-1px", fontFamily: "var(--font-hero)" }}
                >
                  {stat.value}
                </p>
                <p className="text-[#555] text-[13px] mt-1.5">{stat.label}</p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <SectionReveal className="mb-14">
            <p
              className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#444]"
              style={{ fontFamily: "var(--font-label)" }}
            >
              Values
            </p>
          </SectionReveal>

          <div className="space-y-0">
            {[
              {
                num: "01",
                title: "Build, don't just learn",
                desc: "Every cohort ends with something shipped. Not a certificate, not a completed tutorial. A real project, deployed, that anyone can use or read.",
              },
              {
                num: "02",
                title: "Open to everyone",
                desc: "Free, always. No cost, no geography, no experience gate on the Foundations track. The only requirement is that you show up.",
              },
              {
                num: "03",
                title: "Community over content",
                desc: "Tutorials are everywhere. The accountability, the feedback loop, and the people who push you to actually finish — that's what solo learning can't give you.",
              },
              {
                num: "04",
                title: "Real projects, real competitions",
                desc: "Kaggle, Devpost, and whatever comes next. Building for real stakes — with a deadline and a leaderboard — is how you actually get better.",
              },
            ].map((val, i) => (
              <SectionReveal key={val.num}>
                <div
                  className={`grid grid-cols-[48px_1fr_1fr] lg:grid-cols-[80px_1fr_1fr] items-start gap-6 py-8 ${
                    i < 3 ? "border-b border-[#1e1e1e]" : ""
                  }`}
                >
                  <span
                    className="text-[#333] text-[13px] font-mono pt-0.5"
                    style={{ fontFamily: "var(--font-label)" }}
                  >
                    {val.num}
                  </span>
                  <h3 className="text-white text-[20px] font-medium leading-snug" style={{ letterSpacing: "-0.3px" }}>
                    {val.title}
                  </h3>
                  <p className="text-[#888] text-[15px] leading-[1.7]">
                    {val.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
