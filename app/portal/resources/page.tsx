"use client";

import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { ExternalLink, MessageCircle, FileText, Code2, type LucideIcon } from "lucide-react";
import Topbar from "@/components/portal/topbar";
import { motion } from "framer-motion";

const coreLinks: {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    icon: MessageCircle,
    iconBg: "#7b61ff18",
    iconColor: "#c4bcff",
    title: "Discord server",
    description: "Main hub for announcements, help, and show-your-work.",
    href: "#",
  },
  {
    icon: FileText,
    iconBg: "#EF9F2718",
    iconColor: "#EF9F27",
    title: "Epoch Notion workspace",
    description: "All weekly modules, guides, and resources live here.",
    href: "#",
  },
  {
    icon: Code2,
    iconBg: "#00cc7018",
    iconColor: "#00cc70",
    title: "Epoch GitHub organization",
    description: "Starter repos, project templates, and member showcase.",
    href: "#",
  },
];

const trackResources: Record<
  string,
  { week: number; title: string; href: string }[]
> = {
  foundations: [
    { week: 1, title: "Python for Data Science — Kaggle Learn", href: "#" },
    { week: 1, title: "Pandas documentation (getting started)", href: "#" },
    { week: 2, title: "Matplotlib cheat sheet", href: "#" },
    { week: 3, title: "scikit-learn Quickstart", href: "#" },
    { week: 4, title: "Kaggle Titanic competition page", href: "#" },
  ],
  advanced: [
    { week: 1, title: "Project brief template (Notion)", href: "#" },
    { week: 1, title: "Devpost — browse active competitions", href: "#" },
    { week: 2, title: "Kaggle competition list", href: "#" },
    { week: 3, title: "Vercel deployment guide", href: "#" },
    { week: 3, title: "Writing a technical project writeup", href: "#" },
  ],
};

const competitionLinks = [
  {
    title: "Kaggle Titanic Challenge",
    description: "Foundations: your Week 4 competition entry.",
    href: "#",
    badge: "Active",
    badgeClass: "bg-[#00cc7018] text-[#00cc70]",
  },
  {
    title: "Devpost — student competitions",
    description: "Browse hackathons and AI challenges open to students.",
    href: "#",
    badge: "Browse",
    badgeClass: "bg-[#1a1a1a] text-[#888]",
  },
];

function LinkRow({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  description,
  href,
  index,
}: {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  href: string;
  index: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="flex items-center gap-4 py-4 border-b border-[#1a1a1a] last:border-0 group hover:bg-[#0d0d0d] -mx-5 px-5 transition-colors rounded"
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={15} style={{ color: iconColor }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-[13px] font-medium">{title}</p>
        <p className="text-[#555] text-[12px] mt-0.5">{description}</p>
      </div>
      <ExternalLink size={13} className="text-[#333] group-hover:text-[#888] transition-colors shrink-0" />
    </motion.a>
  );
}

export default function ResourcesPage() {
  const { data: session } = useSession();
  const user = (session as Session | null)?.user;
  const track = user?.track ?? "foundations";
  const currentWeek = user?.current_week ?? 1;

  const relevantResources = (trackResources[track] || trackResources.foundations).filter(
    (r) => r.week <= currentWeek + 1
  );

  return (
    <div>
      <Topbar title="Links & resources" subtitle="Everything you need in one place" />
      <div className="p-6 max-w-[700px] space-y-10">
        {/* Core links */}
        <section>
          <p className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#444] mb-1">
            Core links
          </p>
          <div className="mt-3">
            {coreLinks.map((link, i) => (
              <LinkRow key={i} {...link} index={i} />
            ))}
          </div>
        </section>

        {/* Track resources */}
        <section>
          <p className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#444] mb-1">
            Your track resources
          </p>
          <p className="text-[#555] text-[12px] mt-1 mb-3">
            Relevant for where you are now — Week {currentWeek}.
          </p>
          <div className="border border-[#1a1a1a] rounded-lg overflow-hidden bg-[#0d0d0d]">
            {relevantResources.map((resource, i) => (
              <motion.a
                key={i}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="flex items-center gap-4 px-4 py-3.5 border-b border-[#1a1a1a] last:border-0 group hover:bg-[#111] transition-colors"
              >
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded shrink-0"
                  style={{
                    backgroundColor: "#7b61ff12",
                    color: "#c4bcff",
                    fontFamily: "var(--font-label)",
                  }}
                >
                  W{resource.week}
                </span>
                <span className="text-white text-[13px] flex-1">{resource.title}</span>
                <ExternalLink
                  size={12}
                  className="text-[#333] group-hover:text-[#888] transition-colors shrink-0"
                />
              </motion.a>
            ))}
          </div>
        </section>

        {/* Competition links */}
        <section>
          <p className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#444] mb-3">
            Competitions
          </p>
          <div className="border border-[#1a1a1a] rounded-lg overflow-hidden bg-[#0d0d0d]">
            {competitionLinks.map((comp, i) => (
              <motion.a
                key={i}
                href={comp.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className="flex items-center gap-4 px-4 py-3.5 border-b border-[#1a1a1a] last:border-0 group hover:bg-[#111] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[13px] font-medium">{comp.title}</p>
                  <p className="text-[#555] text-[12px] mt-0.5">{comp.description}</p>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded shrink-0 ${comp.badgeClass}`}>
                  {comp.badge}
                </span>
                <ExternalLink
                  size={12}
                  className="text-[#333] group-hover:text-[#888] transition-colors shrink-0"
                />
              </motion.a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
