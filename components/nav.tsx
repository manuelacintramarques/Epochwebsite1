"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { href: "/about", label: "About" },
    { href: "/curriculum", label: "Curriculum" },
    { href: "/team", label: "Team" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[#1e1e1e] backdrop-blur-md bg-[#080808]/90"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-white font-medium text-[18px] tracking-tight hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Epoch
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[14px] transition-colors no-underline ${
                  pathname === l.href
                    ? "text-white"
                    : "text-[#888] hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/portal"
              className="text-[13px] text-[#888] hover:text-white transition-colors px-3 py-1.5"
            >
              Member portal
            </Link>
            <Link
              href="/apply"
              className="text-[13px] font-medium text-white bg-[#7b61ff] px-5 py-1.5 rounded-[6px] hover:bg-[#6a51ee] transition-colors"
            >
              Apply now
            </Link>
          </div>

          <button
            className="md:hidden text-[#888] hover:text-white transition-colors p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-[#080808] flex flex-col pt-14">
          <div className="flex flex-col items-center justify-center flex-1 gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[28px] font-medium text-white hover:text-[#888] transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="w-16 h-px bg-[#1e1e1e] my-2" />
            <Link
              href="/portal"
              className="text-[20px] text-[#888] hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              Member portal
            </Link>
            <Link
              href="/apply"
              className="text-[18px] font-medium text-white bg-[#7b61ff] px-8 py-3 rounded-[6px] hover:bg-[#6a51ee] transition-colors"
              onClick={() => setOpen(false)}
            >
              Apply now
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
