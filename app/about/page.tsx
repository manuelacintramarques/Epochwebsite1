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
      <section className="pt-32 pb-20 max-w-[1200px] mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#444] mb-6"
          style={{ fontFamily: "var(--font-geist-mono)" }}
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
            maxWidth: "600px",
          }}
        >
          We noticed the most transformative AI breakthroughs aren&apos;t built
          alone.
        </motion.h1>
      </section>

      {/* Story + Stats */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1200px] mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">
          <SectionReveal>
            <div className="space-y-5 text-[#888] text-[15px] leading-[1.8] max-w-[560px]">
              <p>
                Epoch was founded on a simple observation: the most
                transformative breakthroughs in AI aren&apos;t built alone.
              </p>
              <p>
                We are a global community of high school students who build AI
                projects, tackle real-world problems, and compete in
                international hackathons — together. Every cohort is a new
                epoch: a defined cycle where members learn, create, and level
                up.
              </p>
              <p>
                The name is intentional. In machine learning, an epoch is one
                full pass through the data — each iteration, the model gets
                sharper. We believe the same is true for people. Every project
                you ship, every competition you enter, every problem you help
                solve makes you better than the last cycle.
              </p>
              <p className="text-white">
                Epoch isn&apos;t a place to watch AI happen. It&apos;s where
                you come to build it.
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
                  style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-1px" }}
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
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Values
            </p>
          </SectionReveal>

          <div className="space-y-0">
            {[
              {
                num: "01",
                title: "Build, don't just learn",
                desc: "Every cohort ends with a shipped project. Not a tutorial certificate. Something deployed and real.",
              },
              {
                num: "02",
                title: "Open to everyone",
                desc: "No cost. No geography. No experience gate on Foundations.",
              },
              {
                num: "03",
                title: "Community over content",
                desc: "Tutorials are everywhere. The accountability, feedback, and friendships are what solo learning can't give you.",
              },
              {
                num: "04",
                title: "Real-world impact",
                desc: "AI applied to real problems — health, climate, education, access. Not toy projects.",
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
                    style={{ fontFamily: "var(--font-geist-mono)" }}
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
