"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  {
    name: "Manuela Cintra",
    role: "Founder & President",
    country: "Brazil",
    bio: [
      "I'm a high school student from Brazil, and I started Epoch because I spent a year trying to learn AI alone and getting nowhere. Not because the resources were bad — because I had no one to build with.",
      "As Founder & President, I run the day-to-day, design the curriculum structure, and handle everything that doesn't belong to a specific role yet. Epoch is the club I wish had existed when I started.",
    ],
  },
  {
    name: "TBD",
    role: "Curriculum Director",
    country: "—",
    bio: [
      "Bio coming soon.",
      "Owns the Foundations curriculum, manages the Notion workspace, and makes sure the weekly modules are clear, useful, and actually teach something.",
    ],
  },
  {
    name: "TBD",
    role: "Community Manager",
    country: "—",
    bio: [
      "Bio coming soon.",
      "Owns the Discord — keeps it active, welcoming, and useful. Runs weekly check-ins, manages show-your-work posts, and makes sure no member falls off.",
    ],
  },
  {
    name: "TBD",
    role: "Competitions Lead",
    country: "—",
    bio: [
      "Bio coming soon.",
      "Sources competitions, tracks deadlines, helps members find the right fit, and organises team formation for hackathons.",
    ],
  },
  {
    name: "TBD",
    role: "Growth & Socials",
    country: "—",
    bio: [
      "Bio coming soon.",
      "Runs Epoch's public presence — Instagram, Twitter, LinkedIn. Recruits new members and builds Epoch's reputation outside the club.",
    ],
  },
];

function TeamRow({ person }: { person: typeof team[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border-b border-[#1e1e1e]`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full grid grid-cols-[1fr_1fr_120px] items-center py-5 group hover:bg-[#111] -mx-4 px-4 transition-colors rounded text-left"
      >
        <h3 className="text-white text-[20px] font-medium">
          {person.name}
        </h3>
        <p className="text-[#555] text-[13px]">{person.role}</p>
        <div className="flex items-center justify-end gap-3">
          <p
            className="text-[#555] text-[13px] font-mono"
            style={{ fontFamily: "var(--font-label)" }}
          >
            {person.country}
          </p>
          <span
            className="text-[#444] text-[11px] transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ↓
          </span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-6 pt-2 space-y-3 max-w-[600px]">
              {person.bio.map((para, i) => (
                <p key={i} className="text-[#888] text-[14px] leading-[1.75]">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="bg-[#080808] min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.10) 0%, rgba(236,72,153,0.05) 50%, transparent 70%)",
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
              fontFamily: "var(--font-hero)",
            }}
          >
            Built by students,
            <br />
            for students.
          </motion.h1>
        </div>
      </section>

      {/* Leadership */}
      <section className="border-t border-[#1e1e1e]">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <SectionReveal className="mb-10">
            <p
              className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#444]"
              style={{ fontFamily: "var(--font-label)" }}
            >
              Leadership
            </p>
          </SectionReveal>

          <div className="space-y-0">
            {team.map((person, i) => (
              <SectionReveal key={i}>
                <TeamRow person={person} />
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
              href="/apply/lead"
              className="inline-block text-[14px] font-medium text-black bg-white px-6 py-2.5 rounded-[6px] hover:bg-[#e0e0e0] transition-colors"
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
