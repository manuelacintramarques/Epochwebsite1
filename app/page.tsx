"use client";

import { motion } from "framer-motion";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Link from "next/link";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const wordFade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

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
  const heroWords = ["high", "school", "students", "building", "AI."];

  return (
    <div className="bg-[#080808] min-h-screen">
      <Nav />

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-14">
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
              style={{ fontFamily: "var(--font-geist-mono)" }}
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
              The global club for
            </motion.p>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-x-4 gap-y-0"
            >
              {heroWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordFade}
                  className="text-white font-medium leading-[0.95] block"
                  style={{
                    fontSize: "clamp(56px, 7.5vw, 96px)",
                    letterSpacing: "-2px",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="text-[#888] mt-8 leading-[1.7]"
              style={{ fontSize: "15px", maxWidth: "400px" }}
            >
              Epoch is where ambitious students learn, build real AI projects,
              compete in international hackathons, and find a community that
              actually pushes them.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.75 }}
              className="flex flex-wrap items-center gap-3 mt-8"
            >
              <Link
                href="/apply"
                className="text-[14px] font-medium text-white bg-[#7b61ff] px-6 py-2.5 rounded-[6px] hover:bg-[#6a51ee] transition-colors"
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
              }}
            >
              Tutorials are everywhere. Community, accountability, and real
              projects aren&apos;t.
            </p>
            <p className="text-[#555] text-[15px] mt-4">
              That&apos;s the gap Epoch fills.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ─── TRACKS ───────────────────────────────────────────────── */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <SectionReveal className="mb-14">
            <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#444] mb-3" style={{ fontFamily: "var(--font-geist-mono)" }}>
              Tracks
            </p>
            <p className="text-white font-medium" style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.5px" }}>
              Pick the track that fits where you are now.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#1e1e1e]">
            {/* Foundations */}
            <SectionReveal className="pr-0 lg:pr-16 pb-12 lg:pb-0">
              <p className="text-[11px] font-mono tracking-[0.1em] uppercase text-[#7b61ff] mb-6" style={{ fontFamily: "var(--font-geist-mono)" }}>
                Foundations Track
              </p>
              <p
                className="text-white font-medium leading-none mb-2"
                style={{ fontSize: "clamp(56px, 7vw, 96px)", letterSpacing: "-2px" }}
              >
                8
              </p>
              <p className="text-[#888] text-[15px] mb-6">weeks of structured curriculum</p>
              <p className="text-[#888] text-[15px] leading-[1.7] mb-8 max-w-[420px]">
                Python, ML, data science, AI applications. Weeks 1–4 are
                core — weeks 5–8 you pick your focus. Everyone ships a project
                at the end.
              </p>
              <ul className="space-y-2">
                {[
                  "Structured weekly modules on Notion",
                  "First Kaggle competition entry",
                  "Cohort showcase project",
                ].map((item) => (
                  <li key={item} className="text-[#666] text-[14px]">
                    <span className="text-[#333] mr-3">&mdash;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </SectionReveal>

            {/* Advanced */}
            <SectionReveal className="pl-0 lg:pl-16 pt-12 lg:pt-0">
              <p className="text-[11px] font-mono tracking-[0.1em] uppercase text-[#e05555] mb-6" style={{ fontFamily: "var(--font-geist-mono)" }}>
                Advanced Track
              </p>
              <p
                className="text-white font-medium leading-none mb-2"
                style={{ fontSize: "clamp(56px, 7vw, 96px)", letterSpacing: "-2px" }}
              >
                1
              </p>
              <p className="text-[#888] text-[15px] mb-6">project. shipped. real.</p>
              <p className="text-[#888] text-[15px] leading-[1.7] mb-8 max-w-[420px]">
                Self-directed. You define the project, pick the competition, and
                build for 8 weeks. The club provides accountability, peers, and
                resources.
              </p>
              <ul className="space-y-2">
                {[
                  "Deployed app anyone can use",
                  "Real competition entry",
                  "Published writeup",
                ].map((item) => (
                  <li key={item} className="text-[#666] text-[14px]">
                    <span className="text-[#333] mr-3">&mdash;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <SectionReveal className="mb-16">
            <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#444] mb-3" style={{ fontFamily: "var(--font-geist-mono)" }}>
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
                  desc: "A short form. We're looking for curiosity and commitment, not experience. Beginners are welcome.",
                },
                {
                  num: "02",
                  title: "Join your track",
                  desc: "Pick Foundations or Advanced. Join the Discord. Start Week 1 at your own pace.",
                },
                {
                  num: "03",
                  title: "Build for 8 weeks",
                  desc: "Weekly modules, Friday show-your-work posts, optional live sessions. Async-first — works across every time zone.",
                },
                {
                  num: "04",
                  title: "Ship & showcase",
                  desc: "Present your project at the Cohort Showcase. Receive your certificate. Optionally become a mentor for the next cohort.",
                },
              ].map((step) => (
                <SectionReveal key={step.num} className="flex gap-8 pl-12 relative">
                  <div className="absolute left-0 top-1 w-11 h-11 rounded-full bg-[#0f0f0f] border border-[#1e1e1e] flex items-center justify-center shrink-0">
                    <span
                      className="text-[#444] text-[11px] font-medium"
                      style={{ fontFamily: "var(--font-geist-mono)" }}
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
              }}
            >
              Cohort 1 is open.
            </p>
            <p className="text-[#555] text-[16px] mb-8">
              25 Foundations spots. 10 Advanced spots.
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
