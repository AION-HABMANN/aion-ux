import type { Config } from "tailwindcss";

/**
 * Learning UX Lab tokens — the DL "Ocean" palette (CLAUDE.md #15). The token NAMES are the CS ones so shared components copy over
 * unchanged; only the values differ. `accent` is blue (attention / selection), `signal` is teal (structure / an OK state, never
 * "correct"), `rust` is the warning. Blue and teal are close in lightness, so colour is never the only channel: every state that uses
 * one also carries a label, a glyph or a pattern.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17212E",
        slate: "#1B2736",
        slateHi: "#2A3849",
        ash: "#556274",
        paper: "#FFFFFF",
        canvas: "#F3F6FA",
        mist: "#E6ECF4",
        line: "#D5DEE9",

        accent: "#1750A8", // blue, AA text and button fills
        accentHi: "#123E85",
        gold: "#4C8BE0", // blue for graphics and outlines only, never text
        accentSoft: "#E3ECFA",

        signal: "#0B6F69", // teal — structure, an OK-state
        signalSoft: "#DCF0EE",

        rust: "#AD3F26", // warning
        rustSoft: "#F8E4DE",
      },
      fontFamily: {
        sans: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      fontSize: {
        display: ["38px", { lineHeight: "44px", fontWeight: "600", letterSpacing: "-0.01em" }],
        h1: ["30px", { lineHeight: "38px", fontWeight: "600", letterSpacing: "-0.01em" }],
        h2: ["22px", { lineHeight: "30px", fontWeight: "600" }],
        h3: ["17px", { lineHeight: "24px", fontWeight: "600" }],
        body: ["16px", { lineHeight: "25px" }],
        caption: ["13px", { lineHeight: "19px" }],
        micro: ["11px", { lineHeight: "15px", letterSpacing: "0.05em" }],
      },
      boxShadow: {
        sm: "0 1px 2px rgba(23,33,46,0.06)",
        md: "0 4px 14px rgba(23,33,46,0.08)",
        lg: "0 16px 40px rgba(23,33,46,0.16)",
      },
      maxWidth: { prose: "46rem" },
    },
  },
  plugins: [],
};

export default config;
