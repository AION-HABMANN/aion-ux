"use client";

import { DARK, LINE, LITE, MID, Thumb } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Day 2 · the drawn screens of the study cards (CLAUDE.md #52): Brightwater, a made-up leisure centre with a pool, a gym and courses, so no task is answered here.
 * The working screens of the cards are in components/day2/labs.tsx (UX-STANDARD 2.16); these are thumbnails. Own greys only.
 */

const ACC = "#1F6F8B";

/** A numbered orange dot: where the eye goes, in order. */

const bar = (x: number, y: number, w: number, fill = LITE, h = 5) => <rect x={x} y={y} width={w} height={h} rx="2" fill={fill} />;
/** `bar` inside a list, with its key. */

/* ------------------------------------------------------------------ A1 · the same start page from the provider's side or the user's side */

/* ------------------------------------------------------------------ A2 · where the scan lands: a dense block or a page built for scanning */

/* ------------------------------------------------------------------ A3 · contrast, grouping and structure switched on one at a time */

/* ------------------------------------------------------------------ A4 · one start page at three densities */

/* ------------------------------------------------------------------ A5 · the thumbnails of Brightwater's three measures */

export function MeasureThumb({ kind }: { kind: "tasks" | "search" | "hours" }) {
  const label = kind === "tasks" ? tt("Three large task buttons at the top of the start page") : kind === "search" ? tt("A search box at the top of every page") : tt("Opening hours as a short list instead of a paragraph");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "tasks" && (
        <g>
          {[0, 1, 2].map((i) => <rect key={i} x={10 + i * 62} y="14" width="56" height="34" rx="5" fill={i === 0 ? ACC : LITE} />)}
          {[0, 1, 2].map((i) => <rect key={i} x="10" y={62 + i * 12} width="176" height="6" rx="2" fill={LITE} />)}
        </g>
      )}
      {kind === "search" && (
        <g>
          <rect x="10" y="12" width="150" height="20" rx="10" fill="#FFFFFF" stroke={ACC} strokeWidth="2" />
          <circle cx="174" cy="22" r="8" fill={ACC} />
          {[0, 1, 2, 3].map((i) => <rect key={i} x="10" y={46 + i * 14} width="176" height="7" rx="2" fill={LITE} />)}
        </g>
      )}
      {kind === "hours" && (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="12" y={16 + i * 20} width="50" height="9" rx="2" fill={DARK} />
              <rect x="74" y={16 + i * 20} width="80" height="9" rx="2" fill={MID} />
            </g>
          ))}
        </g>
      )}
    </Thumb>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the thumbnails of the three EduFlex start pages */

export function EduThumb({ kind }: { kind: "A" | "B" | "C" }) {
  const label = kind === "A" ? tt("Variant A: many boxes, lists and banners directly visible") : kind === "B" ? tt("Variant B: a short, clearly structured page with three entry points") : tt("Variant C: one large image, a slogan and small, faded links");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "A" && (
        <g>
          <rect x="8" y="8" width="184" height="12" rx="2" fill="#E9B7B7" />
          {Array.from({ length: 9 }, (_, i) => <rect key={i} x={8 + (i % 3) * 62} y={24 + Math.floor(i / 3) * 22} width="58" height="18" rx="2" fill={["#D6E4F6", "#F6EDC9", "#D6F0E0"][i % 3]} />)}
          {[0, 1].map((i) => <rect key={i} x="8" y={94 + i * 6} width="184" height="3" rx="1" fill={MID} />)}
        </g>
      )}
      {kind === "B" && (
        <g>
          <rect x="12" y="12" width="100" height="9" rx="2" fill={DARK} />
          {[0, 1, 2].map((i) => <rect key={i} x={12 + i * 60} y="34" width="54" height="34" rx="4" fill="#FFFFFF" stroke={ACC} strokeWidth="1.5" />)}
          <rect x="12" y="82" width="120" height="5" rx="2" fill={LITE} />
        </g>
      )}
      {kind === "C" && (
        <g>
          <rect x="8" y="8" width="184" height="80" rx="4" fill="#5D6D7E" />
          <rect x="24" y="40" width="100" height="10" rx="2" fill="#FFFFFF" />
          {[0, 1, 2].map((i) => <rect key={i} x={120 + i * 24} y="96" width="20" height="4" rx="1" fill={LITE} />)}
        </g>
      )}
    </Thumb>
  );
}
