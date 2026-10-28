import type { Config } from "tailwindcss";

const config: Config = {
  content: ['./app/(original-16)/**/*.{ts,tsx}', './original/components/day16/**/*.{ts,tsx}', './original/data/day16/**/*.{ts,tsx}', './original/lib/day16/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: "#231A45",
        purple: "#5624D0",
        lilac: "#EEE9F9",
        muted: "#6B6785",
        hairline: "#E4E1EE",
        ok: "#1E7A4D",
        warn: "#A76500", // was #B26B00 (4.2:1 on white); now 4.7:1
        bad: "#B02A37",
      },
      fontFamily: {
        sans: ["Calibri", '"Segoe UI"', "system-ui", "-apple-system", "sans-serif"],
        mono: ["Consolas", '"SF Mono"', "Menlo", "monospace"],
      },
      fontSize: {
        d1: ["30px", { lineHeight: "1.25" }],
        d2: ["22px", { lineHeight: "1.3" }],
        d3: ["17px", { lineHeight: "1.4" }],
        body: ["15px", { lineHeight: "1.55" }],
        small: ["13px", { lineHeight: "1.5" }],
      },
      borderRadius: {
        card: "10px",
        chip: "6px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(35,26,69,.08)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
};

export default config;
