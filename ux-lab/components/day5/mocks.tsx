"use client";

import { LINE, LITE, MID, Thumb } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Day 5 · the drawn screens of the study cards (CLAUDE.md #52): Ticketo, a made-up cinema and event ticket app, so no task is answered here. Each mock is the same phone
 * screen in different states; the figure around it (components/day5/diagrams.tsx) says what changes and what it does to the person. Own greys and one accent only.
 */

const ACC = "#B3261E";

/** The thumb's easy reach on a phone held in one hand: a soft band over the lower middle. */

/* ------------------------------------------------------------------ A1 · Fitts on a phone checkout */

/* ------------------------------------------------------------------ A2 · Hick: all showings at once, or staged */

/* ------------------------------------------------------------------ A3 · Miller: a long code and scattered details, or chunked */

/* ------------------------------------------------------------------ A4 · one menu, one switch per law */

/* ------------------------------------------------------------------ A5 · the thumbnails of Ticketo's three measures */

export function MeasureThumb({ kind }: { kind: "pay" | "stage" | "chunk" }) {
  const label = kind === "pay" ? tt("A large Pay button at the bottom of the screen") : kind === "stage" ? tt("The showing chosen in three small steps") : tt("The booking code in three blocks with the details in one box");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "pay" && (
        <g>
          <rect x="14" y="12" width="170" height="48" rx="4" fill={LITE} />
          <rect x="14" y="70" width="170" height="30" rx="6" fill={ACC} />
        </g>
      )}
      {kind === "stage" && (
        <g>
          {[0, 1, 2].map((i) => <rect key={i} x={14 + i * 58} y="14" width="50" height="16" rx="3" fill={i === 1 ? ACC : LITE} />)}
          {[0, 1, 2].map((i) => <rect key={`f${i}`} x="14" y={40 + i * 20} width="170" height="14" rx="3" fill={LITE} />)}
        </g>
      )}
      {kind === "chunk" && (
        <g>
          {[0, 1, 2].map((i) => <rect key={i} x={14 + i * 58} y="14" width="50" height="16" rx="2" fill="#333333" />)}
          <rect x="14" y="44" width="170" height="54" rx="6" fill="#F5F5F5" stroke={MID} />
        </g>
      )}
    </Thumb>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the thumbnails of the three AdminFlow variants */

export function AdminThumb({ kind }: { kind: "A" | "B" | "C" }) {
  const label = kind === "A" ? tt("Variant A: every function as a small entry on one screen") : kind === "B" ? tt("Variant B: four large central tasks and a More entry") : tt("Variant C: a minimal screen with one entry and several steps to the action");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "A" && Array.from({ length: 24 }, (_, i) => <rect key={i} x={10 + (i % 6) * 31} y={10 + Math.floor(i / 6) * 24} width="26" height="18" rx="2" fill={MID} />)}
      {kind === "B" && (
        <g>
          {[0, 1, 2, 3].map((i) => <rect key={i} x={12 + (i % 2) * 90} y={10 + Math.floor(i / 2) * 40} width="84" height="34" rx="6" fill={i === 0 ? ACC : LITE} />)}
          <rect x="12" y="92" width="60" height="8" rx="2" fill={MID} />
        </g>
      )}
      {kind === "C" && (
        <g>
          <rect x="70" y="40" width="60" height="22" rx="11" fill={LITE} />
          {[0, 1, 2, 3].map((i) => <circle key={i} cx={70 + i * 20} cy="88" r="4" fill={i === 0 ? ACC : MID} />)}
        </g>
      )}
    </Thumb>
  );
}
