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

export default function CurriculumPage() {
  return (
    <div className="bg-[#080808] min-h-screen">
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-20 max-w-[1200px] mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#444] mb-6"
          style={{ fontFamily: "var(--font-label)" }}
        >
          Curriculum
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-white font-medium leading-tight"
          style={{
            fontSize: "clamp(36px, 5.5vw, 64px)",
            letterSpacing: "-1px",
            fontFamily: "var(--font-hero)",
          }}
        >
          Two tracks.
          <br />
          Eight weeks.
          <br />
          Real projects, real competitions, real growth.
        </motion.h1>
      </section>

      {/* Foundations Track */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <SectionReveal className="mb-10">
            <p
              className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#7b61ff] mb-4"
              style={{ fontFamily: "var(--font-label)" }}
            >
              Foundations Track
            </p>
            <p className="text-[#888] text-[15px] leading-[1.7] max-w-[600px]">
              Weeks 1–4 are core — every Foundations member completes them. In
              week 5 you choose your focus for the final four weeks.
            </p>
          </SectionReveal>

          {/* Core weeks */}
          <SectionReveal className="mb-16">
            <p className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#444] mb-6">
              Weeks 1–4 — Core
            </p>
            <div className="space-y-0">
              {[
                {
                  num: "01",
                  title: "Python for Data",
                  desc: "NumPy, Pandas, real datasets. Load, inspect, filter, describe. Why: everything in ML is data manipulation first.",
                },
                {
                  num: "02",
                  title: "Data Cleaning & Visualization",
                  desc: "Handle missing values, fix types, Matplotlib, Seaborn, correlation. Why: clean data is the hardest part of any real project.",
                },
                {
                  num: "03",
                  title: "Your First ML Model",
                  desc: "scikit-learn, train/test split, confusion matrix, accuracy. Why: the first model you ship matters more than a perfect one you never finish.",
                },
                {
                  num: "04",
                  title: "Feature Engineering & Kaggle",
                  desc: "First real Kaggle submission. Score doesn't matter — shipping does. Why: competing teaches you things tutorials don't.",
                },
              ].map((week, i) => (
                <div
                  key={week.num}
                  className={`flex items-start gap-6 py-5 ${
                    i < 3 ? "border-b border-[#1e1e1e]" : ""
                  }`}
                >
                  <div
                    className="w-12 h-12 bg-[#111] flex items-center justify-center shrink-0 rounded"
                    style={{ border: "1px solid #1e1e1e" }}
                  >
                    <span
                      className="text-[#333] text-[13px] font-mono"
                      style={{ fontFamily: "var(--font-label)" }}
                    >
                      {week.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white text-[17px] font-medium mb-1">
                      {week.title}
                    </h3>
                    <p className="text-[#888] text-[14px]">{week.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Focus tracks — Weeks 5–8 */}
          <SectionReveal>
            <p className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#444] mb-6">
              Weeks 5–8 — Choose your focus
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#1e1e1e]">
              {[
                {
                  color: "#7b61ff",
                  title: "ML & Modelling",
                  weeks: [
                    "Random Forests & XGBoost",
                    "Model Evaluation",
                    "Neural Network Basics",
                    "Final Project & Showcase",
                  ],
                },
                {
                  color: "#2563eb",
                  title: "Data Science",
                  weeks: [
                    "Exploratory Data Analysis",
                    "SQL & Real Data",
                    "Storytelling with Data",
                    "Final Project & Showcase",
                  ],
                },
                {
                  color: "#00cc70",
                  title: "AI Applications",
                  weeks: [
                    "LLM APIs & Prompt Engineering",
                    "Building AI-Powered Apps",
                    "RAG Systems",
                    "Final Project & Showcase",
                  ],
                },
              ].map((track) => (
                <div key={track.title} className="pt-5 pb-5 md:px-6 first:pl-0 last:pr-0">
                  <div
                    className="h-0.5 w-12 mb-5"
                    style={{ backgroundColor: track.color }}
                  />
                  <h3 className="text-white text-[15px] font-medium mb-4">
                    {track.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {track.weeks.map((w) => (
                      <li key={w} className="text-[#888] text-[13px] flex items-start gap-2">
                        <span className="text-[#333] mt-1">—</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Deliverable system */}
          <SectionReveal className="mt-16 pt-12 border-t border-[#1e1e1e]">
            <p className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#444] mb-3">
              Weekly deliverables
            </p>
            <p className="text-[#888] text-[15px] leading-[1.7] max-w-[560px]">
              Every week has one deliverable — something members post in the
              Discord #show-your-work channel on Friday. Not for grading. For
              accountability, momentum, and building a public record of your
              work.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Advanced Track */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <SectionReveal className="mb-10">
            <p
              className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#e05555] mb-4"
              style={{ fontFamily: "var(--font-label)" }}
            >
              Advanced Track
            </p>
            <p className="text-[#888] text-[15px] leading-[1.7] max-w-[600px]">
              Self-directed. You set the goal, the project, the competition. The
              club provides structure, accountability, and peers who are doing
              the same.
            </p>
          </SectionReveal>

          {/* Phase timeline */}
          <SectionReveal className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#1e1e1e] border border-[#1e1e1e] rounded-lg overflow-hidden">
              {[
                { weeks: "WK 1–2", phase: "Define & Plan", desc: "Write your project brief. Get sign-off." },
                { weeks: "WK 3–6", phase: "Build", desc: "Deep work. Weekly check-ins." },
                { weeks: "WK 6–7", phase: "Ship & Write", desc: "Deploy it. Publish your writeup." },
                { weeks: "WK 8", phase: "Showcase", desc: "Present to the community." },
              ].map((phase) => (
                <div key={phase.phase} className="p-5 bg-[#0d0d0d]">
                  <p
                    className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#444] mb-2"
                    style={{ fontFamily: "var(--font-label)" }}
                  >
                    {phase.weeks}
                  </p>
                  <h3 className="text-white text-[14px] font-medium mb-2">{phase.phase}</h3>
                  <p className="text-[#555] text-[12px] leading-[1.6]">{phase.desc}</p>
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Required outputs */}
          <SectionReveal>
            <p className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#444] mb-8">
              Three required outputs
            </p>
            <div className="space-y-8">
              {[
                {
                  num: "01",
                  title: "One deployed project",
                  desc: "A real product, live on the internet, that anyone can use. Not a notebook. Not a demo — something deployed.",
                },
                {
                  num: "02",
                  title: "One competition entry",
                  desc: "At least one Kaggle, Devpost, or equivalent competition submitted before week 6. The score doesn't matter. The entry does.",
                },
                {
                  num: "03",
                  title: "One published writeup",
                  desc: "What you built, why, what results you got, what you learned. Posted publicly. This is your record.",
                },
              ].map((output) => (
                <div key={output.num} className="flex gap-6 items-start">
                  <span
                    className="text-[#222] font-mono text-[32px] font-medium leading-none shrink-0 pt-1"
                    style={{
                      fontFamily: "var(--font-label)",
                      WebkitTextStroke: "1px #333",
                    }}
                  >
                    {output.num}
                  </span>
                  <div>
                    <h3 className="text-white text-[18px] font-medium mb-1.5">
                      {output.title}
                    </h3>
                    <p className="text-[#888] text-[15px] leading-[1.7]">
                      {output.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
