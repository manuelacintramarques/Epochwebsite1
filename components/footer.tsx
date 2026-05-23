import Link from "next/link";

const socialLinks = [
  { label: "Discord", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e1e] bg-[#080808]">
      <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-white font-medium text-[15px]">Epoch</span>

        <div className="flex items-center gap-6">
          {socialLinks.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="text-[13px] text-[#444] hover:text-[#888] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.label}
            </Link>
          ))}
        </div>

        <span className="text-[13px] text-[#444]">
          &copy; 2025 Epoch. Free forever.
        </span>
      </div>
    </footer>
  );
}
