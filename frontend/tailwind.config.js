/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#07070f",
        surface: "#0d0d1a",
        "surface-up": "#13131f",
        "surface-lift": "#1a1a2e",
        accent: "#818cf8",
        "accent-dim": "rgba(129, 140, 248, 0.12)",
        green: "#34d399",
        amber: "#fbbf24",
        sky: "#38bdf8",
        "text-primary": "#e8eaf0",
        "text-dim": "#94a3b8",
        "text-muted": "#6b7280",
        border: "rgba(255, 255, 255, 0.06)",
        "border-up": "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.03em",
        tight: "-0.02em",
        wide: "0.08em",
      },
    },
  },
  plugins: [],
};
