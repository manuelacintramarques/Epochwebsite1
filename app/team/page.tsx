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

const team = [
  { name: "Manuela", role: "Founder & President", country: "Brazil" },
  { name: "TBD", role: "Curriculum Director", country: "—" },
  { name: "TBD", role: "Community Manager", country: "—" },
  { name: "TBD", role: "Competitions Lead", country: "—" },
  { name: "TBD", role: "Growth & Socials", country: "—" },
];

export default function TeamPage() {
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
          The Team
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-white font-medium leading-tight"
          style={{
            fontSize: "clamp(36px, 5.5vw, 64px)",
            letterSpacing: "-1px",
          }}
        >
          Built by students,
          <br />
          for students.
        </motion.h1>
      </section>

      {/* Leadership */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <SectionReveal className="mb-10">
            <p
              className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#444]"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Leadership
            </p>
          </SectionReveal>

          <div className="space-y-0">
            {team.map((person, i) => (
              <SectionReveal key={i}>
                <div className="grid grid-cols-[1fr_1fr_120px] items-center py-5 border-b border-[#1e1e1e] group hover:bg-[#111] -mx-4 px-4 transition-colors rounded">
                  <h3 className="text-white text-[20px] font-medium">
                    {person.name}
                  </h3>
                  <p className="text-[#555] text-[13px]">{person.role}</p>
                  <p
                    className="text-[#555] text-[13px] text-right font-mono"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {person.country}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join the team */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <SectionReveal>
            <h2 className="text-white text-[18px] font-medium mb-4">
              We&apos;re building the leadership team now.
            </h2>
            <p className="text-[#888] text-[15px] leading-[1.7] max-w-[500px] mb-8">
              We&apos;re looking for a Curriculum Director, Community Manager,
              Competitions Lead, and Growth Lead. Each role is real — it goes on
              your university application, you get a formal title, and you help
              shape what Epoch becomes.
            </p>
            <Link
              href="/apply"
              className="inline-block text-[14px] font-medium text-white bg-[#7b61ff] px-6 py-2.5 rounded-[6px] hover:bg-[#6a51ee] transition-colors"
            >
              Apply to lead →
            </Link>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
