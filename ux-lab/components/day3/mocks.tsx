"use client";

import { LINE, LITE, Thumb } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Day 3 · the drawn screens of the study cards (CLAUDE.md #52): Kettle & Co, a made-up online grocery shop, so no task is answered here. Each mock is the same screen in
 * different states; the figure around it (components/day3/diagrams.tsx) says what changes and what it does to the person. The shop's own colours are used on purpose,
 * because colour is the subject; text in the mocks keeps a readable contrast except where a state shows low contrast as the problem.
 */

const ACTION = "#1F5FA8";
const WARN = "#B3261E";
const OK = "#2E7D32";

/* ------------------------------------------------------------------ A1 · three colour switches on one order page */

/* ------------------------------------------------------------------ A2 · decorative against functional colour */

/* ------------------------------------------------------------------ A3 · four levers of readable type */

/* ------------------------------------------------------------------ A4 · a help page flat, with a hierarchy, or with too many styles */

/* ------------------------------------------------------------------ A5 · the thumbnails of Kettle & Co's three measures */

export function MeasureThumb({ kind }: { kind: "status" | "action" | "size" }) {
  const label = kind === "status" ? tt("A word and a symbol next to every status colour") : kind === "action" ? tt("One action colour for every button that does something") : tt("Larger body text with more line spacing");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "status" && (
        <g>
          {[OK, "#8A6D00", WARN].map((c, i) => (
            <g key={c}>
              <circle cx="22" cy={24 + i * 28} r="7" fill={c} />
              <rect x="36" y={20 + i * 28} width="70" height="8" rx="2" fill={c} />
            </g>
          ))}
        </g>
      )}
      {kind === "action" && (
        <g>
          {[0, 1, 2].map((i) => <rect key={i} x="14" y={14 + i * 30} width="110" height="20" rx="5" fill={ACTION} />)}
          {[0, 1, 2].map((i) => <rect key={`t${i}`} x="134" y={20 + i * 30} width="50" height="6" rx="2" fill={LITE} />)}
        </g>
      )}
      {kind === "size" && (
        <g>
          {[0, 1, 2, 3].map((i) => <rect key={i} x="14" y={16 + i * 22} width={170 - (i % 2) * 30} height="9" rx="2" fill="#555555" />)}
        </g>
      )}
    </Thumb>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the thumbnails of the three HealthConnect designs */

export function HealthThumb({ kind }: { kind: "A" | "B" | "C" }) {
  const label = kind === "A" ? tt("Variant A: strong brand colours, white text on a light brand colour") : kind === "B" ? tt("Variant B: black text on white, plain and high in contrast") : tt("Variant C: an elegant thin typeface, small text and faint navigation");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "A" && (
        <g>
          <rect x="8" y="8" width="184" height="94" rx="4" fill="#7FD1C7" />
          {[0, 1, 2].map((i) => <rect key={i} x="18" y={22 + i * 22} width={150 - i * 20} height="8" rx="2" fill="#E8FAF7" />)}
        </g>
      )}
      {kind === "B" && (
        <g>
          <rect x="14" y="14" width="110" height="11" rx="2" fill="#111111" />
          {[0, 1, 2].map((i) => <rect key={i} x="14" y={38 + i * 18} width="170" height="8" rx="2" fill="#333333" />)}
        </g>
      )}
      {kind === "C" && (
        <g>
          <rect x="14" y="14" width="120" height="6" rx="1" fill="#555555" />
          {[0, 1, 2, 3].map((i) => <rect key={i} x="14" y={34 + i * 12} width="170" height="2.5" rx="1" fill="#777777" />)}
          {[0, 1, 2].map((i) => <rect key={`n${i}`} x={130 + i * 20} y="94" width="14" height="3" rx="1" fill="#DDDDDD" />)}
        </g>
      )}
    </Thumb>
  );
}
