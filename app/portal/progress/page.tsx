"use client";

import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { Check, Clock, Lock } from "lucide-react";
import Topbar from "@/components/portal/topbar";
import { motion } from "framer-motion";

type WeekStatus = "done" | "in-progress" | "upcoming";

const coreWeeks = [
  { num: 1, title: "Python for Data" },
  { num: 2, title: "Data Cleaning & Visualization" },
  { num: 3, title: "Your First ML Model" },
  { num: 4, title: "Feature Engineering & Kaggle" },
];

const focusTracks = {
  ml: [
    { num: 5, title: "Random Forests & XGBoost" },
    { num: 6, title: "Model Evaluation" },
    { num: 7, title: "Neural Network Basics" },
    { num: 8, title: "Final Project & Showcase" },
  ],
  data_science: [
    { num: 5, title: "Exploratory Data Analysis" },
    { num: 6, title: "SQL & Real Data" },
    { num: 7, title: "Storytelling with Data" },
    { num: 8, title: "Final Project & Showcase" },
  ],
  ai_apps: [
    { num: 5, title: "LLM APIs & Prompt Engineering" },
    { num: 6, title: "Building AI-Powered Apps" },
    { num: 7, title: "RAG Systems" },
    { num: 8, title: "Final Project & Showcase" },
  ],
};

const advancedPhases = [
  { label: "Define & Plan", weeks: "WK 1–2" },
  { label: "Build", weeks: "WK 3–6" },
  { label: "Ship & Write", weeks: "WK 6–7" },
  { label: "Showcase", weeks: "WK 8" },
];

function StatusBadge({ status }: { status: WeekStatus }) {
  if (status === "done")
    return (
      <span className="text-[11px] font-medium bg-[#00cc7018] text-[#00cc70] px-2 py-0.5 rounded">
        Done
      </span>
    );
  if (status === "in-progress")
    return (
      <span className="text-[11px] font-medium bg-[#7b61ff18] text-[#c4bcff] px-2 py-0.5 rounded">
        In progress
      </span>
    );
  return (
    <span className="text-[11px] font-medium bg-[#1a1a1a] text-[#444] px-2 py-0.5 rounded">
      Upcoming
    </span>
  );
}

function WeekRow({
  weekNum,
  title,
  currentWeek,
  index,
}: {
  weekNum: number;
  title: string;
  currentWeek: number;
  index: number;
}) {
  const status: WeekStatus =
    weekNum < currentWeek ? "done" : weekNum === currentWeek ? "in-progress" : "upcoming";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="flex items-center gap-4 py-3.5 border-b border-[#1a1a1a] last:border-0"
    >
      <div className="shrink-0">
        {status === "done" ? (
          <div className="w-5 h-5 rounded-full bg-[#00cc7020] flex items-center justify-center">
            <Check size={11} className="text-[#00cc70]" />
          </div>
        ) : status === "in-progress" ? (
          <div className="w-5 h-5 rounded-full bg-[#7b61ff20] flex items-center justify-center">
            <Clock size={11} className="text-[#7b61ff]" />
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full bg-[#1a1a1a] flex items-center justify-center">
            <Lock size={11} className="text-[#444]" />
          </div>
        )}
      </div>
      <span
        className="text-[#555] text-[11px] font-mono w-8 shrink-0"
        style={{ fontFamily: "var(--font-label)" }}
      >
        W{weekNum}
      </span>
      <span className={`text-[14px] flex-1 ${status === "upcoming" ? "text-[#555]" : "text-white"}`}>
        {title}
      </span>
      <StatusBadge status={status} />
    </motion.div>
  );
}

export default function ProgressPage() {
  const { data: session } = useSession();
  const user = (session as Session | null)?.user;
  const currentWeek = user?.current_week ?? 1;
  const track = user?.track ?? "foundations";
  const focusTrack = (user as { focus_track?: keyof typeof focusTracks } | undefined)?.focus_track;

  if (track === "advanced") {
    const currentPhase =
      currentWeek <= 2 ? 0 : currentWeek <= 6 ? 1 : currentWeek === 7 ? 2 : 3;

    return (
      <div>
        <Topbar title="My progress" subtitle="Advanced track" />
        <div className="p-6 max-w-[700px] space-y-8">
          {/* Phase stepper */}
          <div>
            <p className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#444] mb-5">
              Phase progress
            </p>
            <div className="flex items-start gap-0">
              {advancedPhases.map((phase, i) => (
                <div key={i} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium transition-colors ${
                        i < currentPhase
                          ? "bg-[#00cc70] text-black"
                          : i === currentPhase
                          ? "bg-[#7b61ff] text-white"
                          : "bg-[#1a1a1a] text-[#444]"
                      }`}
                    >
                      {i < currentPhase ? <Check size={14} /> : i + 1}
                    </div>
                    <p className="text-[#555] text-[10px] mt-1.5 text-center whitespace-nowrap">
                      {phase.label}
                    </p>
                    <p
                      className="text-[#333] text-[9px] font-mono"
                      style={{ fontFamily: "var(--font-label)" }}
                    >
                      {phase.weeks}
                    </p>
                  </div>
                  {i < advancedPhases.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-2 mb-5 ${
                        i < currentPhase ? "bg-[#00cc70]" : "bg-[#1e1e1e]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Required outputs */}
          <div>
            <p className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#444] mb-4">
              Required outputs
            </p>
            <div className="border border-[#1a1a1a] rounded-lg overflow-hidden">
              {[
                { label: "Project brief submitted", done: currentWeek > 1 },
                { label: "Competition entry submitted", done: currentWeek > 5 },
                { label: "Published writeup", done: currentWeek > 6 },
                { label: "Project deployed", done: currentWeek > 6 },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-4 py-3.5 border-b border-[#1a1a1a] last:border-0 bg-[#0d0d0d]"
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                      item.done ? "bg-[#00cc70]" : "border border-[#2a2a2a]"
                    }`}
                  >
                    {item.done && <Check size={10} className="text-black" />}
                  </div>
                  <span
                    className={`text-[14px] flex-1 ${item.done ? "text-white" : "text-[#555]"}`}
                  >
                    {item.label}
                  </span>
                  <span className={`text-[11px] ${item.done ? "text-[#00cc70]" : "text-[#444]"}`}>
                    {item.done ? "Done" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Topbar title="My progress" subtitle="Foundations track" />
      <div className="p-6 max-w-[700px] space-y-8">
        {/* Core weeks */}
        <div>
          <p className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#444] mb-4">
            Core weeks — 1 to 4
          </p>
          <div className="border border-[#1a1a1a] rounded-lg overflow-hidden bg-[#0d0d0d] px-4">
            {coreWeeks.map((week, i) => (
              <WeekRow
                key={week.num}
                weekNum={week.num}
                title={week.title}
                currentWeek={currentWeek}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Focus track */}
        <div>
          <p className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#444] mb-4">
            Focus track — weeks 5 to 8
          </p>
          {!focusTrack || currentWeek < 5 ? (
            <div className="border border-[#1a1a1a] rounded-lg bg-[#0d0d0d] p-5">
              <p className="text-[#555] text-[14px] mb-4">Choose your focus in Week 5.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { key: "ml", label: "ML & Modelling", color: "#7b61ff" },
                  { key: "data_science", label: "Data Science", color: "#2563eb" },
                  { key: "ai_apps", label: "AI Applications", color: "#00cc70" },
                ].map((t) => (
                  <div
                    key={t.key}
                    className="border border-[#2a2a2a] rounded p-3 opacity-50 cursor-not-allowed"
                  >
                    <div className="h-0.5 w-8 mb-2" style={{ backgroundColor: t.color }} />
                    <p className="text-[#555] text-[13px]">{t.label}</p>
                    <p className="text-[#333] text-[11px] mt-1">Choose in Week 5</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border border-[#1a1a1a] rounded-lg overflow-hidden bg-[#0d0d0d] px-4">
              {(focusTracks[focusTrack] || focusTracks.ml).map((week, i) => (
                <WeekRow
                  key={week.num}
                  weekNum={week.num}
                  title={week.title}
                  currentWeek={currentWeek}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>

        {/* Deliverables */}
        <div>
          <p className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#444] mb-4">
            Deliverables
          </p>
          <div className="border border-[#1a1a1a] rounded-lg overflow-hidden bg-[#0d0d0d] px-4">
            {Array.from({ length: 8 }, (_, i) => i + 1).map((weekNum) => {
              const status: WeekStatus =
                weekNum < currentWeek
                  ? "done"
                  : weekNum === currentWeek
                  ? "in-progress"
                  : "upcoming";
              return (
                <div
                  key={weekNum}
                  className="flex items-center gap-4 py-3.5 border-b border-[#1a1a1a] last:border-0"
                >
                  <div className="shrink-0">
                    {status === "done" ? (
                      <div className="w-5 h-5 rounded-full bg-[#00cc7020] flex items-center justify-center">
                        <Check size={11} className="text-[#00cc70]" />
                      </div>
                    ) : status === "in-progress" ? (
                      <div className="w-5 h-5 rounded-full bg-[#7b61ff20] flex items-center justify-center">
                        <Clock size={11} className="text-[#7b61ff]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                        <Lock size={11} className="text-[#444]" />
                      </div>
                    )}
                  </div>
                  <span
                    className="text-[#555] text-[11px] font-mono w-8 shrink-0"
                    style={{ fontFamily: "var(--font-label)" }}
                  >
                    W{weekNum}
                  </span>
                  <span
                    className={`text-[14px] flex-1 ${
                      status === "upcoming" ? "text-[#555]" : "text-white"
                    }`}
                  >
                    Week {weekNum} deliverable
                  </span>
                  <StatusBadge status={status} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Competition */}
        <div>
          <p className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#444] mb-4">
            Competition
          </p>
          <div className="border border-[#1a1a1a] rounded-lg bg-[#0d0d0d] p-4 flex items-center gap-4">
            <span className="text-white text-[14px] flex-1">Kaggle Titanic Challenge</span>
            <span className="text-[#888] text-[12px]">Due Week 4</span>
            <span className="text-[11px] font-medium bg-[#7b61ff18] text-[#c4bcff] px-2 py-0.5 rounded">
              In progress
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
