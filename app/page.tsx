"use client";

import { motion } from "framer-motion";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Link from "next/link";

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

export default function HomePage() {
  return (
    <div className="bg-[#080808] min-h-screen">
      <Nav />

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-14">
        {/* Gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(123,97,255,0.15) 0%, rgba(0,204,112,0.05) 50%, transparent 70%)",
          }}
        />

        {/* Watermark */}
        <span
          aria-hidden="true"
          className="absolute left-[-2%] top-1/2 -translate-y-1/2 select-none pointer-events-none text-white font-medium leading-none"
          style={{
            fontSize: "clamp(120px, 22vw, 320px)",
            opacity: 0.025,
            letterSpacing: "-4px",
          }}
        >
          Epoch
        </span>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center py-24 lg:py-0">
          {/* Left */}
          <div className="max-w-[600px]">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#444] mb-6"
              style={{ fontFamily: "var(--font-label)" }}
            >
              Epoch — Cohort 1 Open
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="text-[#888] italic mb-3"
              style={{ fontSize: "clamp(18px, 2.5vw, 26px)" }}
            >
              The international club for high school students
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="text-white font-medium leading-[0.95]"
              style={{
                fontSize: "clamp(56px, 7.5vw, 96px)",
                letterSpacing: "-2px",
                fontFamily: "var(--font-hero)",
              }}
            >
              learning AI, building real projects, and competing globally.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="text-[#888] mt-8 leading-[1.7]"
              style={{ fontSize: "15px", maxWidth: "400px" }}
            >
              Epoch is where ambitious high school students learn AI, build real
              projects, and find the community that actually pushes them.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.75 }}
              className="flex flex-wrap items-center gap-3 mt-8"
            >
              <Link
                href="/apply"
                className="text-[14px] font-medium text-black bg-white px-6 py-2.5 rounded-[6px] hover:bg-[#e0e0e0] transition-colors"
              >
                Apply to Cohort 1
              </Link>
              <Link
                href="/about"
                className="text-[14px] text-[#888] border border-[#333] px-6 py-2.5 rounded-[6px] hover:border-[#555] hover:text-white transition-colors"
              >
                Read the story
              </Link>
            </motion.div>
          </div>

          {/* Right — stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="lg:flex lg:flex-col lg:items-end lg:justify-center space-y-6 hidden"
          >
            {[
              { number: "8-week", label: "cohorts" },
              { number: "2", label: "tracks" },
              { number: "Free,", label: "always" },
            ].map((stat) => (
              <div key={stat.number} className="text-right">
                <p
                  className="text-white font-medium leading-none"
                  style={{
                    fontSize: "clamp(40px, 5vw, 64px)",
                    letterSpacing: "-1px",
                    fontFamily: "var(--font-hero)",
                  }}
                >
                  {stat.number}
                </p>
                <p className="text-[#555] text-[14px] mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── THE GAP ──────────────────────────────────────────────── */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <SectionReveal>
            <p
              className="text-white font-medium leading-tight"
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "-0.5px",
                maxWidth: "720px",
                fontFamily: "var(--font-hero)",
              }}
            >
              Tutorials are everywhere. Community, accountability, and real
              projects aren&apos;t.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ─── TRACKS ───────────────────────────────────────────────── */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <SectionReveal className="mb-14">
            <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#444] mb-3" style={{ fontFamily: "var(--font-label)" }}>
              Tracks
            </p>
            <p className="text-white font-medium" style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.5px", fontFamily: "var(--font-hero)" }}>
              Pick the track that fits where you are now.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#1e1e1e]">
            {/* Foundations */}
            <SectionReveal className="pr-0 lg:pr-16 pb-12 lg:pb-0">
              <p className="text-[11px] font-mono tracking-[0.1em] uppercase text-[#7b61ff] mb-6" style={{ fontFamily: "var(--font-label)" }}>
                Foundations Track
              </p>
              <p
                className="text-white font-medium leading-none mb-2"
                style={{ fontSize: "clamp(56px, 7vw, 96px)", letterSpacing: "-2px", fontFamily: "var(--font-hero)" }}
              >
                8
              </p>
              <p className="text-[#888] text-[15px] mb-6">weeks of structured curriculum</p>
              <p className="text-[#888] text-[15px] leading-[1.7] max-w-[420px]">
                Start from zero or build on what you know. Weeks 1–4 cover
                Python, data cleaning, and your first ML model — the core skills
                every track builds on. In weeks 5–8 you choose a focus: ML &
                Modelling, Data Science, or AI Applications. The cohort ends
                with a real project you&apos;ve shipped.
              </p>
            </SectionReveal>

            {/* Advanced */}
            <SectionReveal className="pl-0 lg:pl-16 pt-12 lg:pt-0">
              <p className="text-[11px] font-mono tracking-[0.1em] uppercase text-[#e05555] mb-6" style={{ fontFamily: "var(--font-label)" }}>
                Advanced Track
              </p>
              <p
                className="text-white font-medium leading-none mb-2"
                style={{ fontSize: "clamp(56px, 7vw, 96px)", letterSpacing: "-2px", fontFamily: "var(--font-hero)" }}
              >
                1
              </p>
              <p className="text-[#888] text-[15px] mb-6">project. shipped. real.</p>
              <p className="text-[#888] text-[15px] leading-[1.7] max-w-[420px]">
                You&apos;ve already built things. Now build something that
                matters. Eight weeks of focused, self-directed work — you define
                the goal, pick the competition, and own the output. The club
                gives you structure, accountability, and people who are doing the
                same.
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <SectionReveal className="mb-16">
            <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#444] mb-3" style={{ fontFamily: "var(--font-label)" }}>
              How it works
            </p>
          </SectionReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-3 bottom-3 w-px bg-[#1e1e1e]" />

            <div className="space-y-12">
              {[
                {
                  num: "01",
                  title: "Apply",
                  desc: "A short form. We're looking for curiosity and commitment, not experience. Beginners are welcome in Foundations.",
                },
                {
                  num: "02",
                  title: "Join your track",
                  desc: "Foundations or Advanced. Join the Discord, meet your cohort, and get access to the Notion workspace.",
                },
                {
                  num: "03",
                  title: "Build for 8 weeks",
                  desc: "Weekly modules, Friday show-your-work posts, optional live sessions. Async-first — works across every time zone.",
                },
                {
                  num: "04",
                  title: "Ship & showcase",
                  desc: "Every member ships something real. Present at the Cohort Showcase, earn your certificate, and optionally mentor the next cohort.",
                },
              ].map((step) => (
                <SectionReveal key={step.num} className="flex gap-8 pl-12 relative">
                  <div className="absolute left-0 top-1 w-11 h-11 rounded-full bg-[#0f0f0f] border border-[#1e1e1e] flex items-center justify-center shrink-0">
                    <span
                      className="text-[#444] text-[11px] font-medium"
                      style={{ fontFamily: "var(--font-label)" }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white text-[22px] font-medium mb-2" style={{ letterSpacing: "-0.3px" }}>
                      {step.title}
                    </h3>
                    <p className="text-[#888] text-[15px] leading-[1.7] max-w-[420px]">
                      {step.desc}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1200px] mx-auto px-6 py-32 text-center">
          <SectionReveal>
            <p
              className="text-white font-medium leading-tight mb-3"
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-1.5px",
                fontFamily: "var(--font-hero)",
              }}
            >
              Cohort 1 is open.
            </p>
            <p className="text-[#555] text-[16px] mb-8">
              30 Foundations spots. 15 Advanced spots.
            </p>
            <Link
              href="/apply"
              className="inline-block text-[16px] font-medium text-black bg-white px-10 py-4 hover:bg-[#e0e0e0] transition-colors"
            >
              Apply now — it&apos;s free
            </Link>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
