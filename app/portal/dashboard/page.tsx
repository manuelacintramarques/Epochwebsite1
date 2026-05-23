"use client";

import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { ExternalLink, MessageSquare, Calendar, Trophy } from "lucide-react";
import Topbar from "@/components/portal/topbar";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.05 },
  }),
};

const weekModules: Record<number, { title: string; desc: string }> = {
  1: { title: "Python for Data", desc: "NumPy, Pandas, real datasets. Load, inspect, filter, describe." },
  2: { title: "Data Cleaning & Visualization", desc: "Handle missing values, fix types, charts, correlation." },
  3: { title: "Your First ML Model", desc: "scikit-learn, train/test split, confusion matrix, accuracy." },
  4: { title: "Feature Engineering & Kaggle", desc: "Your first Kaggle submission. Score doesn't matter — shipping does." },
  5: { title: "Focus Track Begins", desc: "You're now in your chosen focus track. Check Notion for your module." },
  6: { title: "Deep Work Week", desc: "No new concepts — build, iterate, and get feedback." },
  7: { title: "Ship & Document", desc: "Deploy your project. Write your showcase description." },
  8: { title: "Cohort Showcase", desc: "Present your project. Celebrate. Optionally become a mentor." },
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = (session as Session | null)?.user;

  const currentWeek = user?.current_week || 1;
  const weeksRemaining = 8 - currentWeek;
  const progressPercent = Math.round((currentWeek / 8) * 100);
  const currentModule = weekModules[currentWeek] || weekModules[1];

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const trackLabel = user?.track === "advanced" ? "Advanced" : "Foundations";
  const cohortNum = user?.cohort_number ?? 1;

  return (
    <div>
      <Topbar
        title="Dashboard"
        subtitle={`Week ${currentWeek} of 8 · ${trackLabel} track · Cohort ${cohortNum}`}
      />

      <div className="p-6 max-w-[860px] space-y-5">
        {/* Greeting */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
          <h1 className="text-white text-[20px] font-medium">
            {greeting}, {user?.name?.split(" ")[0] || "there"}
          </h1>
          <p className="text-[#555] text-[12px] mt-0.5">
            Week {currentWeek} of 8 &middot; {trackLabel} track &middot; Cohort {user?.cohort_number || 1}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-3"
        >
          {[
            { label: "Current week", value: currentWeek },
            { label: "Weeks remaining", value: weeksRemaining },
            { label: "Deliverables done", value: Math.max(0, currentWeek - 1) },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-4"
            >
              <p className="text-white text-[24px] font-medium leading-none">{stat.value}</p>
              <p className="text-[#555] text-[11px] mt-1.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-[13px] font-medium">
              Week {currentWeek} of 8
            </span>
            <span className="text-[#7b61ff] text-[12px] font-medium">{progressPercent}%</span>
          </div>
          <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-full bg-[#7b61ff] rounded-full"
            />
          </div>
          <p className="text-[#555] text-[12px] mt-2.5">
            Showcase in {weeksRemaining} week{weeksRemaining !== 1 ? "s" : ""} &middot; Cohort ends September 1, 2025
          </p>
        </motion.div>

        {/* This week's module */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="bg-[#0f0f0f] rounded-lg p-5"
          style={{ border: "1px solid #1e1e1e", borderLeft: "3px solid #7b61ff" }}
        >
          <p className="text-[#555] text-[11px] font-medium tracking-[0.08em] uppercase mb-2">
            This week
          </p>
          <h2 className="text-white text-[15px] font-medium mb-1">
            Week {currentWeek}: {currentModule.title}
          </h2>
          <p className="text-[#666] text-[13px] mb-4">{currentModule.desc}</p>
          <div className="flex flex-wrap gap-2">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-[12px] text-[#888] hover:text-white border border-[#2a2a2a] hover:border-[#444] px-3 py-1.5 rounded transition-colors"
            >
              <ExternalLink size={12} />
              View on Notion
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-[12px] text-[#888] hover:text-white border border-[#2a2a2a] hover:border-[#444] px-3 py-1.5 rounded transition-colors"
            >
              <MessageSquare size={12} />
              Post deliverable in Discord
            </a>
          </div>
        </motion.div>

        {/* Two-column row */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={13} className="text-[#555]" />
              <p className="text-[#555] text-[11px] font-medium tracking-[0.08em] uppercase">
                Next event
              </p>
            </div>
            <p className="text-white text-[14px] font-medium">Friday Show & Tell</p>
            <p className="text-[#555] text-[12px] mt-1">Every Friday &middot; 5 PM EST</p>
            <p className="text-[#444] text-[11px] mt-3">Optional — will be recorded</p>
          </div>

          <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={13} className="text-[#555]" />
              <p className="text-[#555] text-[11px] font-medium tracking-[0.08em] uppercase">
                Active competition
              </p>
            </div>
            <p className="text-white text-[14px] font-medium">Kaggle Titanic</p>
            <p className="text-[#555] text-[12px] mt-1">Deadline: Week 4</p>
            <div className="mt-3">
              <span className="text-[11px] font-medium bg-[#00cc7018] text-[#00cc70] px-2 py-0.5 rounded">
                In progress
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
