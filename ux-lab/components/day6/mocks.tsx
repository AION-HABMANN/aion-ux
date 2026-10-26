"use client";

import type { ReactNode } from "react";
import { LINE, LITE, MID, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Day 6 · the drawn screens of the study cards (CLAUDE.md #52): Seabird Ferries, a made-up ferry operator, so no task is answered here. Each mock is the same screen in
 * different states; the figure around it (components/day6/diagrams.tsx) says what changes and what it does to the person. Own greys and one accent only.
 */

const W = 320;
const H = 220;
const ACC = "#1B5E8C";

function Page({ children, label }: { children: ReactNode; label: string }) {
  return (
    <Svg viewBox={`0 0 ${W} ${H}`} label={label} className="mx-auto h-auto w-full max-w-[440px]">
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="8" fill="#FFFFFF" stroke={LINE} strokeWidth="2" />
      <rect x="1" y="1" width={W - 2} height="22" rx="8" fill={ACC} />
      <Txt x={12} y={16} size={10} bold fill="#FFFFFF">Seabird Ferries</Txt>
      {children}
    </Svg>
  );
}

function Box({ x, y, w, h, text, fill = LITE, tc = "#1B1B1F", bold, size = 8.5 }: { x: number; y: number; w: number; h: number; text: string; fill?: string; tc?: string; bold?: boolean; size?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill={fill} />
      <Txt x={x + 6} y={y + h / 2 + 3} size={size} bold={bold} fill={tc}>{text}</Txt>
    </g>
  );
}

/* ------------------------------------------------------------------ A1 · proximity, similarity and common region */

export function GestaltMock({ proximity, similarity, region }: { proximity: boolean; similarity: boolean; region: boolean }) {
  const tickets = [tt("Book a crossing"), tt("My bookings"), tt("Timetable")];
  const info = [tt("Luggage rules"), tt("Pets on board"), tt("Accessibility")];
  const col = (g: number, i: number) => (proximity ? { x: 14 + g * 156, y: 52 + i * 34 } : { x: [14, 168, 92, 230, 40, 150][g * 3 + i] ?? 14, y: [40, 70, 100, 130, 160, 190][(g * 3 + i) % 6] });
  const fill = (g: number, i: number) => (similarity ? (g === 0 ? "#DCE9F3" : "#F1EDE3") : ["#DCE9F3", "#F1EDE3", "#E5E5E5", "#DCE9F3", "#E9DCF3", "#F1EDE3"][g * 3 + i]);
  return (
    <Page label={tt("A Seabird Ferries page with three ticket links and three travel-information links; the switches put each group close together, give each group one look, and frame each group")}>
      {region && (
        <g>
          <rect x="8" y="34" width="150" height="118" rx="8" fill="none" stroke={MID} strokeWidth="1.5" />
          <rect x="162" y="34" width="150" height="118" rx="8" fill="none" stroke={MID} strokeWidth="1.5" />
          <Txt x={16} y={46} size={8} bold fill="#555555">{tt("Tickets")}</Txt>
          <Txt x={170} y={46} size={8} bold fill="#555555">{tt("Before you travel")}</Txt>
        </g>
      )}
      {tickets.map((l, i) => { const p = col(0, i); return <Box key={l} x={p.x} y={p.y} w={136} h={24} text={l} fill={fill(0, i)} />; })}
      {info.map((l, i) => { const p = col(1, i); return <Box key={l} x={p.x} y={p.y} w={136} h={24} text={l} fill={fill(1, i)} />; })}
    </Page>
  );
}

/* ------------------------------------------------------------------ A2 · flat against a clear hierarchy */

export function HierarchyMock({ kind }: { kind: "flat" | "clear" }) {
  return (
    <Page label={kind === "flat" ? tt("A Seabird booking step where the Continue button, three other buttons, a notice and a promotion are all equally strong") : tt("The same step with one strong Continue button, quieter secondary links, a small notice and the promotion moved below")}>
      {kind === "flat" ? (
        <g>
          <Box x={14} y={34} w={292} h={26} text={tt("Summer offer for cars")} fill="#F6D6D6" bold />
          <Box x={14} y={68} w={292} h={26} text={tt("Notice: check-in closes earlier in August")} fill="#F6EDC9" bold />
          <Txt x={14} y={114} size={10} bold>{tt("Your crossing: Harbour Town to Gull Island")}</Txt>
          {[tt("Continue"), tt("Add a cabin"), tt("Save for later"), tt("Change date")].map((b, i) => <Box key={b} x={14 + (i % 2) * 150} y={128 + Math.floor(i / 2) * 34} w={142} h={26} text={b} fill={MID} bold />)}
        </g>
      ) : (
        <g>
          <Txt x={14} y={48} size={12} bold>{tt("Your crossing: Harbour Town to Gull Island")}</Txt>
          <Txt x={14} y={66} size={8.5} fill="#555555">{tt("Check-in closes earlier in August.")}</Txt>
          <rect x="14" y="80" width="292" height="34" rx="6" fill={ACC} />
          <Txt x={160} y={102} size={12} bold anchor="middle" fill="#FFFFFF">{tt("Continue")}</Txt>
          <Txt x={14} y={134} size={9} fill={ACC}>{tt("Add a cabin · Save for later · Change date")}</Txt>
          <Box x={14} y={170} w={292} h={24} text={tt("Summer offer for cars")} fill="#F3F3F3" />
        </g>
      )}
    </Page>
  );
}

/* ------------------------------------------------------------------ A3 · every field, step by step, or hidden too deep */

export function DisclosureMock({ kind }: { kind: "all" | "staged" | "hidden" }) {
  const label = kind === "all" ? tt("A Seabird booking form showing every field at once, including those for freight, groups and pets") : kind === "staged" ? tt("The same form showing only the fields for this step, with clearly labelled links to add a vehicle or a pet and the luggage rules next to the luggage field") : tt("A very reduced form with two fields and no sign of the luggage rules, which are only in the help pages");
  return (
    <Page label={label}>
      {kind === "all" && (
        <g>
          {[tt("Name"), tt("Date"), tt("Vehicle type"), tt("Vehicle length"), tt("Trailer"), tt("Freight weight"), tt("Group size"), tt("Group leader"), tt("Pet type"), tt("Pet passport"), tt("Cabin"), tt("Luggage")].map((f, i) => (
            <g key={f}>
              <Txt x={14 + (i % 2) * 154} y={40 + Math.floor(i / 2) * 30} size={7.5} fill="#555555">{f}</Txt>
              <rect x={14 + (i % 2) * 154} y={44 + Math.floor(i / 2) * 30} width="140" height="14" rx="2" fill="#FFFFFF" stroke={MID} />
            </g>
          ))}
        </g>
      )}
      {kind === "staged" && (
        <g>
          <Txt x={14} y={42} size={9} bold>{tt("Step 1 of 3 · Who travels")}</Txt>
          {[tt("Name"), tt("Date")].map((f, i) => (
            <g key={f}>
              <Txt x={14} y={60 + i * 34} size={8} fill="#555555">{f}</Txt>
              <rect x="14" y={64 + i * 34} width="292" height="16" rx="2" fill="#FFFFFF" stroke={MID} />
            </g>
          ))}
          <Txt x={14} y={140} size={8} fill="#555555">{tt("Luggage")}</Txt>
          <rect x="14" y="144" width="140" height="16" rx="2" fill="#FFFFFF" stroke={MID} />
          <Txt x={164} y={156} size={7.5} fill={ACC}>{tt("Luggage rules ›")}</Txt>
          <Txt x={14} y={186} size={8.5} fill={ACC}>{tt("+ Add a vehicle   + Add a pet")}</Txt>
        </g>
      )}
      {kind === "hidden" && (
        <g>
          {[tt("Name"), tt("Date")].map((f, i) => (
            <g key={f}>
              <Txt x={14} y={60 + i * 40} size={9} fill="#555555">{f}</Txt>
              <rect x="14" y={64 + i * 40} width="292" height="18" rx="2" fill="#FFFFFF" stroke={MID} />
            </g>
          ))}
          <rect x="14" y="160" width="292" height="30" rx="6" fill={ACC} />
          <Txt x={160} y={180} size={11} bold anchor="middle" fill="#FFFFFF">{tt("Book")}</Txt>
        </g>
      )}
    </Page>
  );
}

/* ------------------------------------------------------------------ A4 · two areas with different or the same pattern */

export function PatternMock({ kind }: { kind: "different" | "same" }) {
  const area = (x: number, title: string, variant: number) => (
    <g>
      <Txt x={x} y={44} size={9} bold>{title}</Txt>
      {variant === 0 && (
        <g>
          <rect x={x} y={52} width="140" height="60" rx="4" fill={LITE} />
          <rect x={x} y={122} width="140" height="26" rx="6" fill={ACC} />
          <Txt x={x + 70} y={139} size={9} bold anchor="middle" fill="#FFFFFF">{tt("Continue")}</Txt>
        </g>
      )}
      {variant === 1 && (
        <g>
          <rect x={x + 100} y={52} width="40" height="18" rx="9" fill={ACC} />
          <Txt x={x + 120} y={64} size={7} bold anchor="middle" fill="#FFFFFF">{tt("Next")}</Txt>
          {[0, 1, 2].map((i) => <rect key={i} x={x} y={78 + i * 22} width="140" height="16" rx="2" fill={LITE} />)}
        </g>
      )}
    </g>
  );
  return (
    <Page label={kind === "different" ? tt("Two Seabird areas side by side: tickets with a large Continue button at the bottom, freight with a small Next button at the top right") : tt("The same two areas, both with the same layout and a large Continue button at the bottom")}>
      {area(14, tt("Tickets"), 0)}
      {area(166, tt("Freight"), kind === "same" ? 0 : 1)}
    </Page>
  );
}

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
