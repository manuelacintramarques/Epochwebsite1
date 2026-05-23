import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#080808",
        "bg-secondary": "#111111",
        "bg-tertiary": "#161616",
        "border-default": "#1e1e1e",
        "border-hover": "#2e2e2e",
        "text-primary": "#ffffff",
        "text-secondary": "#888888",
        "text-muted": "#444444",
        "accent-purple": "#7b61ff",
        "accent-green": "#00cc70",
        "accent-amber": "#EF9F27",
        "accent-red": "#e05555",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-label)", "monospace"],
        hero: ["var(--font-hero)", "sans-serif"],
      },
      fontSize: {
        "hero": ["96px", { lineHeight: "0.95", letterSpacing: "-2px", fontWeight: "500" }],
        "section": ["48px", { lineHeight: "1.1", letterSpacing: "-1px", fontWeight: "500" }],
        "sub": ["24px", { lineHeight: "1.4", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
export default config;
