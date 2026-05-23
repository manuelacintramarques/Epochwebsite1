"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import {
  LayoutDashboard,
  TrendingUp,
  Calendar,
  BookOpen,
  Users,
  Trophy,
  Settings,
  LogOut,
  type LucideIcon,
} from "lucide-react";

const mainNav = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/progress", label: "My progress", icon: TrendingUp },
  { href: "/portal/calendar", label: "Calendar", icon: Calendar },
  { href: "/portal/resources", label: "Links & resources", icon: BookOpen },
];

const cohortNav = [
  { href: "/portal/cohort", label: "Cohort 1", icon: Users },
  { href: "/portal/competitions", label: "Competitions", icon: Trophy },
];

function NavItem({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[12px] transition-all ${
        active
          ? "bg-[#7b61ff1a] text-[#c4bcff]"
          : "text-[#555] hover:text-[#888] hover:bg-[#ffffff08]"
      }`}
    >
      <Icon size={15} className="shrink-0" />
      {label}
    </Link>
  );
}

export default function Sidebar() {
  const { data: session } = useSession();
  const user = (session as Session | null)?.user;

  const initials =
    user?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "EP";

  return (
    <aside className="w-[200px] fixed left-0 top-0 bottom-0 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col z-30">
      {/* Logo */}
      <div className="px-4 h-12 flex items-center border-b border-[#1a1a1a]">
        <span className="text-white font-medium text-[14px]">Epoch</span>
      </div>

      {/* User info */}
      <div className="px-3 py-3 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#7b61ff] flex items-center justify-center text-white text-[11px] font-medium shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-white text-[13px] font-medium truncate">
              {user?.name || "Member"}
            </p>
            <p className="text-[#555] text-[11px] truncate">
              {user?.track === "foundations" ? "Foundations" : "Advanced"} &middot; Cohort {user?.cohort_number || 1}
            </p>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {mainNav.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}

        <div className="pt-3 pb-1">
          <p className="px-3 text-[10px] font-medium tracking-[0.08em] uppercase text-[#333]">
            My Cohort
          </p>
        </div>

        {cohortNav.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-3 border-t border-[#1a1a1a] space-y-0.5">
        <NavItem href="/portal/settings" label="Settings" icon={Settings} />
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[12px] text-[#555] hover:text-[#888] hover:bg-[#ffffff08] transition-all"
        >
          <LogOut size={15} className="shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
