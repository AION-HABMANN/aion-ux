"use client";

import { DARK, LINE, LITE, MID, Thumb } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Day 1 · the drawn screens of the study cards (CLAUDE.md #52): Nordwind, a made-up travel-booking app, so no task is answered here. The working screens of the
 * cards are in components/day1/labs.tsx; these are the thumbnails of the task options and measures. Own greys only.
 */

const ACC = "#2F5D8A";

/* ------------------------------------------------------------------ Block 1.2 · the thumbnails of the three SkillFlow start pages */

export function VariantThumb({ kind }: { kind: "A" | "B" | "C" }) {
  const label = kind === "A" ? tt("Variant A: many moving, colourful elements packed together") : kind === "B" ? tt("Variant B: a plain page with a short list of links") : tt("Variant C: one large image and few navigation items");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "A" && (
        <g>
          <rect x="10" y="10" width="180" height="22" rx="4" fill="#8E44AD" />
          {[0, 1, 2, 3].map((i) => <rect key={i} x={10 + i * 46} y="38" width="40" height="12" rx="6" fill={["#F39C12", "#E74C3C", "#16A085", "#3498DB"][i]} />)}
          {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={10 + (i % 3) * 61} y={56 + Math.floor(i / 3) * 24} width="55" height="20" rx="3" fill={LITE} />)}
        </g>
      )}
      {kind === "B" && (
        <g>
          <rect x="10" y="12" width="110" height="8" rx="2" fill={DARK} />
          {[0, 1, 2, 3].map((i) => <rect key={i} x="10" y={30 + i * 16} width="150" height="10" rx="2" fill={LITE} />)}
          <rect x="10" y="96" width="120" height="5" rx="2" fill={MID} />
        </g>
      )}
      {kind === "C" && (
        <g>
          <rect x="10" y="10" width="180" height="62" rx="4" fill="#34495E" />
          <rect x="24" y="30" width="90" height="10" rx="2" fill="#FFFFFF" />
          {[0, 1, 2].map((i) => <rect key={i} x={10 + i * 61} y="80" width="55" height="22" rx="3" fill={MID} />)}
        </g>
      )}
    </Thumb>
  );
}

/* ------------------------------------------------------------------ A5 · the thumbnails of Nordwind's three measures */

export function MeasureThumb({ kind }: { kind: "button" | "steps" | "photos" }) {
  const label = kind === "button" ? tt("One large Book button on the trip page") : kind === "steps" ? tt("A step line, Step 2 of 3, at the top of the check-in") : tt("Large photos at the top of every page");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "button" && (
        <g>
          {[0, 1, 2].map((i) => <rect key={i} x="12" y={14 + i * 12} width="150" height="6" rx="2" fill={LITE} />)}
          <rect x="12" y="64" width="176" height="28" rx="6" fill={ACC} />
        </g>
      )}
      {kind === "steps" && (
        <g>
          {[0, 1, 2].map((i) => <circle key={i} cx={40 + i * 60} cy="30" r="10" fill={i < 2 ? ACC : LITE} />)}
          <line x1="50" y1="30" x2="90" y2="30" stroke={ACC} strokeWidth="3" />
          <line x1="110" y1="30" x2="150" y2="30" stroke={LITE} strokeWidth="3" />
          {[0, 1, 2].map((i) => <rect key={i} x="12" y={56 + i * 12} width="176" height="6" rx="2" fill={LITE} />)}
        </g>
      )}
      {kind === "photos" && (
        <g>
          <rect x="10" y="10" width="180" height="58" rx="4" fill={MID} />
          {[0, 1].map((i) => <rect key={i} x="12" y={78 + i * 12} width="176" height="6" rx="2" fill={LITE} />)}
        </g>
      )}
    </Thumb>
  );
}
