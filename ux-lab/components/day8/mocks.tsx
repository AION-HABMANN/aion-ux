"use client";

import { LINE, LITE, MID, Thumb } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Day 8 · the drawn screens of the study cards (CLAUDE.md #52): Lantern Kitchens, a made-up kitchen maker with an online planner and an app, so no task is answered
 * here. Each mock is the same screen in different states; the figure around it (components/day8/diagrams.tsx) says what changes and what it does to the person. Own
 * greys and one accent only.
 */

const ACC = "#8A4B1F";
const SOFT = "#F6EDE4";

/* ------------------------------------------------------------------ A1 · a list of functions and a journey */

/* ------------------------------------------------------------------ A2 · a goal, visible progress and a resolution */

/* ------------------------------------------------------------------ A3 · the moment between two steps, three ways */

/* ------------------------------------------------------------------ B2 · three journeys of different weight */

/* ------------------------------------------------------------------ A5 · the thumbnails of Lantern Kitchens's three measures */

export function MeasureThumb({ kind }: { kind: "goal" | "path" | "film" }) {
  const label = kind === "goal" ? tt("A start screen that shows the goal and the first step") : kind === "path" ? tt("A path of four stages with the current one marked") : tt("A brand film before the planner starts");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "goal" && (
        <g>
          <rect x="12" y="14" width="176" height="40" rx="5" fill={SOFT} />
          <rect x="22" y="24" width="120" height="8" rx="2" fill="#333333" />
          <rect x="22" y="38" width="90" height="5" rx="2" fill={MID} />
          <rect x="12" y="70" width="90" height="18" rx="5" fill={ACC} />
        </g>
      )}
      {kind === "path" && (
        <g>
          <line x1="24" y1="55" x2="176" y2="55" stroke={MID} strokeWidth="3" />
          {[0, 1, 2, 3].map((i) => <circle key={i} cx={24 + i * 50.6} cy="55" r="9" fill={i < 2 ? ACC : i === 2 ? "#FFFFFF" : LITE} stroke={ACC} strokeWidth={i === 2 ? 3 : 1} />)}
        </g>
      )}
      {kind === "film" && (
        <g>
          <rect x="20" y="14" width="160" height="80" rx="4" fill="#3A2A1E" />
          <polygon points="90,38 90,70 116,54" fill="#FFFFFF" />
        </g>
      )}
    </Thumb>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the thumbnails of the three FutureSkills journeys */

export function JourneyThumb({ kind }: { kind: "A" | "B" | "C" }) {
  const label = kind === "A" ? tt("Variant A: a short list of clear numbered steps") : kind === "B" ? tt("Variant B: long story text with pictures between the steps") : tt("Variant C: clear steps with a short motivating line and a progress bar");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "A" && [0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="22" cy={22 + i * 22} r="7" fill={MID} />
          <rect x="36" y={18 + i * 22} width="140" height="8" rx="2" fill={LITE} />
        </g>
      ))}
      {kind === "B" && (
        <g>
          <rect x="12" y="10" width="70" height="44" rx="4" fill="#D9C6E8" />
          {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="90" y={12 + i * 9} width="98" height="5" rx="2" fill={MID} />)}
          {[0, 1, 2, 3].map((i) => <rect key={`b${i}`} x="12" y={62 + i * 9} width="176" height="5" rx="2" fill={MID} />)}
        </g>
      )}
      {kind === "C" && (
        <g>
          <rect x="12" y="12" width="176" height="8" rx="4" fill={LITE} />
          <rect x="12" y="12" width="96" height="8" rx="4" fill="#2E7D5B" />
          <rect x="12" y="32" width="130" height="8" rx="2" fill="#333333" />
          <rect x="12" y="46" width="100" height="5" rx="2" fill={MID} />
          <rect x="12" y="70" width="90" height="18" rx="5" fill="#2E7D5B" />
        </g>
      )}
    </Thumb>
  );
}
