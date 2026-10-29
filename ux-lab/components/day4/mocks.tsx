"use client";

import { LINE, LITE, MID, Thumb } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Day 4 · the drawn screens of the study cards (CLAUDE.md #52): Pedalo, a made-up bike-sharing app, so no task is answered here. Each mock is the same phone screen in
 * different states; the figure around it (components/day4/diagrams.tsx) says what changes and what it does to the person. Own greys and one accent only.
 */

const ACC = "#1D6F42";

/* ------------------------------------------------------------------ A1 · looking simple against being intuitive */

/* ------------------------------------------------------------------ A2 · twelve equal passes against three recommended ones */

/* ------------------------------------------------------------------ A3 · expectation, a large near target, the same pattern */

/* ------------------------------------------------------------------ A4 · remember the code, or the system remembers */

/* ------------------------------------------------------------------ A5 · the thumbnails of Pedalo's three measures */

export function MeasureThumb({ kind }: { kind: "few" | "carry" | "big" }) {
  const label = kind === "few" ? tt("Three recommended passes and a link to all passes") : kind === "carry" ? tt("The bike code carried over from the scan") : tt("A large End ride button at the bottom of the screen");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "few" && (
        <g>
          {[0, 1, 2].map((i) => <rect key={i} x="14" y={10 + i * 26} width="170" height="20" rx="4" fill={i === 0 ? "#E7F3EC" : LITE} />)}
          <rect x="120" y="92" width="64" height="6" rx="2" fill={ACC} />
        </g>
      )}
      {kind === "carry" && (
        <g>
          <rect x="14" y="20" width="170" height="26" rx="4" fill="#FFFFFF" stroke={ACC} strokeWidth="2" />
          <rect x="24" y="29" width="70" height="8" rx="2" fill="#333333" />
          <rect x="14" y="70" width="170" height="24" rx="5" fill={ACC} />
        </g>
      )}
      {kind === "big" && (
        <g>
          <rect x="14" y="10" width="170" height="54" rx="4" fill={LITE} />
          <rect x="14" y="72" width="170" height="28" rx="6" fill={ACC} />
        </g>
      )}
    </Thumb>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the thumbnails of the three WorkFlow Hub navigation variants */

export function NavThumb({ kind }: { kind: "A" | "B" | "C" }) {
  const label = kind === "A" ? tt("Variant A: a long sidebar with many equal entries") : kind === "B" ? tt("Variant B: five main entries and an All functions entry") : tt("Variant C: cards and tabs that look different in each area");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "A" && (
        <g>
          {Array.from({ length: 14 }, (_, i) => <rect key={i} x="8" y={6 + i * 7} width="52" height="5" rx="1" fill={MID} />)}
          <rect x="70" y="8" width="120" height="94" rx="3" fill={LITE} />
        </g>
      )}
      {kind === "B" && (
        <g>
          {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="8" y={10 + i * 16} width="52" height="10" rx="2" fill={i === 0 ? ACC : MID} />)}
          <rect x="8" y="94" width="52" height="6" rx="1" fill={LITE} />
          <rect x="70" y="8" width="120" height="94" rx="3" fill={LITE} />
        </g>
      )}
      {kind === "C" && (
        <g>
          <rect x="8" y="8" width="88" height="40" rx="8" fill="#DDE7F7" />
          <rect x="104" y="8" width="88" height="14" rx="2" fill={MID} />
          <rect x="104" y="26" width="40" height="22" rx="11" fill="#F7E3DD" />
          <rect x="8" y="56" width="184" height="10" rx="5" fill={LITE} />
          <circle cx="30" cy="88" r="12" fill="#E3F7DD" />
          <rect x="52" y="78" width="140" height="20" rx="2" fill="#F1F1F1" />
        </g>
      )}
    </Thumb>
  );
}
