"use client";

import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const { data: session } = useSession();
  const user = (session as Session | null)?.user;
  const isAdvanced = user?.track === "advanced";
  const trackLabel = isAdvanced ? "Advanced" : "Foundations";

  return (
    <header className="h-12 border-b border-[#1a1a1a] flex items-center justify-between px-6">
      <div>
        <h1 className="text-[15px] font-medium text-white leading-none">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[12px] text-[#555] mt-0.5">{subtitle}</p>
        )}
      </div>
      <div
        className={`text-[11px] font-medium px-2.5 py-1 rounded ${
          isAdvanced
            ? "bg-[#e0555520] text-[#e05555]"
            : "bg-[#7b61ff20] text-[#c4bcff]"
        }`}
      >
        {trackLabel} Track
      </div>
    </header>
  );
}
