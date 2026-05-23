"use client";

import Topbar from "@/components/portal/topbar";
import { motion } from "framer-motion";

type EventType = "deadline" | "session" | "showcase" | "milestone";

interface CohortEvent {
  date: string;
  month: string;
  day: number;
  title: string;
  description: string;
  type: EventType;
  isOptional?: boolean;
  isToday?: boolean;
}

const events: CohortEvent[] = [
  {
    date: "2025-07-07",
    month: "JUL",
    day: 7,
    title: "Cohort 1 Kickoff",
    description: "Welcome session + track orientation. Meet your cohort.",
    type: "milestone",
  },
  {
    date: "2025-07-11",
    month: "JUL",
    day: 11,
    title: "Week 1 Deliverable Due",
    description: "Post your Week 1 work in #show-your-work on Discord.",
    type: "deadline",
  },
  {
    date: "2025-07-11",
    month: "JUL",
    day: 11,
    title: "Friday Show & Tell",
    description: "Optional live session — share what you built this week.",
    type: "session",
    isOptional: true,
  },
  {
    date: "2025-07-18",
    month: "JUL",
    day: 18,
    title: "Week 2 Deliverable Due",
    description: "Post your Week 2 work in #show-your-work on Discord.",
    type: "deadline",
  },
  {
    date: "2025-07-18",
    month: "JUL",
    day: 18,
    title: "Friday Show & Tell",
    description: "Optional live session — share what you built this week.",
    type: "session",
    isOptional: true,
  },
  {
    date: "2025-07-25",
    month: "JUL",
    day: 25,
    title: "Week 3 Deliverable Due",
    description: "Post your Week 3 work in #show-your-work on Discord.",
    type: "deadline",
  },
  {
    date: "2025-08-01",
    month: "AUG",
    day: 1,
    title: "Week 4 Deliverable + Kaggle Submission Due",
    description: "Submit your Kaggle entry and post Week 4 deliverable.",
    type: "deadline",
  },
  {
    date: "2025-08-08",
    month: "AUG",
    day: 8,
    title: "Focus Track Selection Deadline",
    description: "Foundations members: choose ML & Modelling, Data Science, or AI Applications.",
    type: "milestone",
  },
  {
    date: "2025-08-15",
    month: "AUG",
    day: 15,
    title: "Week 6 Check-in",
    description: "Optional mid-cohort sync — share progress, get feedback.",
    type: "session",
    isOptional: true,
  },
  {
    date: "2025-08-22",
    month: "AUG",
    day: 22,
    title: "Project Submission Deadline",
    description: "All projects must be deployed and submitted for showcase consideration.",
    type: "deadline",
  },
  {
    date: "2025-08-29",
    month: "AUG",
    day: 29,
    title: "Cohort 1 Showcase",
    description: "Present your project to the community. Certificates awarded.",
    type: "showcase",
  },
  {
    date: "2025-09-01",
    month: "SEP",
    day: 1,
    title: "Cohort 1 Ends",
    description: "Official end of Cohort 1. Mentor applications open.",
    type: "milestone",
  },
];

const badgeConfig: Record<EventType | "optional" | "today", { label: string; className: string }> = {
  deadline: { label: "Deadline", className: "bg-[#e0555518] text-[#e05555]" },
  session: { label: "Session", className: "bg-[#1a1a1a] text-[#888]" },
  showcase: { label: "Big event", className: "bg-[#EF9F2718] text-[#EF9F27]" },
  milestone: { label: "Milestone", className: "bg-[#1a1a1a] text-[#888]" },
  optional: { label: "Optional", className: "bg-[#00cc7018] text-[#00cc70]" },
  today: { label: "Today", className: "bg-[#7b61ff18] text-[#c4bcff]" },
};

export default function CalendarPage() {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <Topbar title="Calendar" subtitle="Cohort 1 events" />
      <div className="p-6 max-w-[700px]">
        <div className="space-y-0">
          {events.map((event, i) => {
            const isToday = event.date === today;
            const isPast = event.date < today;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className={`flex items-start gap-5 py-5 border-b border-[#1a1a1a] last:border-0 ${
                  isPast ? "opacity-40" : ""
                }`}
              >
                {/* Date block */}
                <div className="shrink-0 w-12 bg-[#0f0f0f] border border-[#1e1e1e] rounded-md px-2 py-2 text-center">
                  <p className="text-[#555] text-[9px] font-medium tracking-[0.1em] uppercase leading-none mb-1">
                    {event.month}
                  </p>
                  <p className="text-white text-[18px] font-medium leading-none">
                    {event.day}
                  </p>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[13px] font-medium leading-snug">
                    {event.title}
                  </p>
                  <p className="text-[#555] text-[12px] mt-0.5 leading-snug">
                    {event.description}
                  </p>
                </div>

                {/* Badge */}
                <div className="shrink-0 flex flex-col items-end gap-1">
                  {isToday && (
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded ${badgeConfig.today.className}`}
                    >
                      Today
                    </span>
                  )}
                  {event.isOptional ? (
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded ${badgeConfig.optional.className}`}
                    >
                      Optional
                    </span>
                  ) : (
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded ${badgeConfig[event.type].className}`}
                    >
                      {badgeConfig[event.type].label}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
