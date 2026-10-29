"use client";

import { LINE, LITE, MID, Thumb } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Day 6 · the drawn screens of the study cards (CLAUDE.md #52): Seabird Ferries, a made-up ferry operator, so no task is answered here. Each mock is the same screen in
 * different states; the figure around it (components/day6/diagrams.tsx) says what changes and what it does to the person. Own greys and one accent only.
 */

const ACC = "#1B5E8C";

/* ------------------------------------------------------------------ A1 · proximity, similarity and common region */

/* ------------------------------------------------------------------ A2 · flat against a clear hierarchy */

/* ------------------------------------------------------------------ A3 · every field, step by step, or hidden too deep */

/* ------------------------------------------------------------------ A4 · two areas with different or the same pattern */

/* ------------------------------------------------------------------ A5 · the thumbnails of Seabird's three measures */

export function MeasureThumb({ kind }: { kind: "groups" | "form" | "component" }) {
  const label = kind === "groups" ? tt("The booking page in two framed groups with one look each") : kind === "form" ? tt("A booking form that shows only the current step") : tt("One shared booking-form component used in tickets and freight");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "groups" && (
        <g>
          <rect x="10" y="10" width="84" height="90" rx="6" fill="none" stroke={MID} strokeWidth="2" />
          <rect x="106" y="10" width="84" height="90" rx="6" fill="none" stroke={MID} strokeWidth="2" />
          {[0, 1, 2].map((i) => <rect key={i} x="18" y={20 + i * 24} width="68" height="16" rx="3" fill="#DCE9F3" />)}
          {[0, 1, 2].map((i) => <rect key={`b${i}`} x="114" y={20 + i * 24} width="68" height="16" rx="3" fill="#F1EDE3" />)}
        </g>
      )}
      {kind === "form" && (
        <g>
          <rect x="12" y="12" width="90" height="8" rx="2" fill="#333333" />
          {[0, 1].map((i) => <rect key={i} x="12" y={30 + i * 22} width="176" height="14" rx="2" fill="#FFFFFF" stroke={MID} />)}
          <rect x="12" y="82" width="100" height="18" rx="5" fill={ACC} />
        </g>
      )}
      {kind === "component" && (
        <g>
          <rect x="70" y="10" width="60" height="30" rx="5" fill={ACC} />
          <line x1="100" y1="40" x2="45" y2="66" stroke={MID} strokeWidth="2" />
          <line x1="100" y1="40" x2="155" y2="66" stroke={MID} strokeWidth="2" />
          <rect x="14" y="66" width="62" height="34" rx="4" fill={LITE} />
          <rect x="124" y="66" width="62" height="34" rx="4" fill={LITE} />
        </g>
      )}
    </Thumb>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the thumbnails of the three CareAssist structures */

export function CareThumb({ kind }: { kind: "A" | "B" | "C" }) {
  const label = kind === "A" ? tt("Variant A: every piece of information and option on one dense page") : kind === "B" ? tt("Variant B: the central content first, with clearly labelled sections to open") : tt("Variant C: a very reduced page; context sits several levels deep");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "A" && Array.from({ length: 16 }, (_, i) => <rect key={i} x={8 + (i % 4) * 47} y={8 + Math.floor(i / 4) * 24} width="43" height="20" rx="2" fill={[MID, LITE][i % 2]} />)}
      {kind === "B" && (
        <g>
          <rect x="12" y="10" width="176" height="36" rx="5" fill="#DCE9F3" />
          {[0, 1, 2].map((i) => <rect key={i} x="12" y={54 + i * 16} width="176" height="12" rx="2" fill={LITE} />)}
        </g>
      )}
      {kind === "C" && (
        <g>
          <rect x="60" y="34" width="80" height="20" rx="10" fill={ACC} />
          {[0, 1, 2].map((i) => <rect key={i} x={150 + i * 12} y="94" width="8" height="3" rx="1" fill={MID} />)}
        </g>
      )}
    </Thumb>
  );
}
