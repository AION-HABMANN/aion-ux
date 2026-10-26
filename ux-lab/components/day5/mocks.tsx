"use client";

import type { ReactNode } from "react";
import { LINE, LITE, MID, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Day 5 · the drawn screens of the study cards (CLAUDE.md #52): Ticketo, a made-up cinema and event ticket app, so no task is answered here. Each mock is the same phone
 * screen in different states; the figure around it (components/day5/diagrams.tsx) says what changes and what it does to the person. Own greys and one accent only.
 */

const W = 220;
const H = 300;
const ACC = "#B3261E";

function Phone({ children, label, title = "Ticketo" }: { children: ReactNode; label: string; title?: string }) {
  return (
    <Svg viewBox={`0 0 ${W} ${H}`} label={label} className="mx-auto h-auto w-full max-w-[240px]">
      <rect x="2" y="2" width={W - 4} height={H - 4} rx="18" fill="#FFFFFF" stroke={LINE} strokeWidth="2" />
      <rect x="2" y="2" width={W - 4} height="30" rx="18" fill={ACC} />
      <Txt x={18} y={22} size={11} bold fill="#FFFFFF">{title}</Txt>
      {children}
    </Svg>
  );
}

function Btn({ x, y, w, h = 28, label, strong, size = 10 }: { x: number; y: number; w: number; h?: number; label: string; strong?: boolean; size?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="7" fill={strong ? ACC : "#FFFFFF"} stroke={strong ? ACC : MID} strokeWidth="1.5" />
      <Txt x={x + w / 2} y={y + h / 2 + size * 0.38} size={size} bold={strong} anchor="middle" fill={strong ? "#FFFFFF" : "#333333"}>{label}</Txt>
    </g>
  );
}

/** The thumb's easy reach on a phone held in one hand: a soft band over the lower middle. */
function ThumbZone() {
  return <ellipse cx="150" cy="250" rx="110" ry="80" fill="#E8F5E9" opacity="0.8" />;
}

/* ------------------------------------------------------------------ A1 · Fitts on a phone checkout */

export function FittsMock({ large, thumb, space }: { large: boolean; thumb: boolean; space: boolean }) {
  const gap = space ? 14 : 3;
  const h = large ? 38 : 18;
  const y = thumb ? 232 : 44;
  return (
    <Phone label={tt("A Ticketo checkout on a phone with a Pay button and a Cancel button; the switches make the Pay button larger, move both to where the thumb reaches, and add space between them; a green band shows the thumb's easy reach")} title={tt("Checkout")}>
      <ThumbZone />
      <Txt x={18} y={thumb ? 70 : 110} size={10} bold>{tt("2 tickets · Saturday 20:15")}</Txt>
      <Txt x={18} y={thumb ? 88 : 128} size={9} fill="#555555">{tt("Row 7, seats 12 and 13")}</Txt>
      <Btn x={18} y={y} w={large ? 184 : 80} h={h} label={tt("Pay")} strong size={large ? 12 : 8} />
      <Btn x={large ? 18 : 18 + 80 + gap} y={large ? y + h + gap : y} w={large ? 184 : 80} h={large ? 30 : h} label={tt("Cancel")} size={large ? 10 : 8} />
    </Phone>
  );
}

/* ------------------------------------------------------------------ A2 · Hick: all showings at once, or staged */

export function HickMock({ kind }: { kind: "all" | "staged" }) {
  return (
    <Phone label={kind === "all" ? tt("A Ticketo page listing every film and every showing of the week as equal small buttons") : tt("The same choice staged: first a row of days, then a short list of films for that day, then the times of one film")} title={tt("Choose a showing")}>
      {kind === "all" ? (
        Array.from({ length: 30 }, (_, i) => <Btn key={i} x={12 + (i % 5) * 40} y={42 + Math.floor(i / 5) * 40} w={36} h={30} label={["18:00", "20:15", "22:30", "16:45", "19:30"][i % 5]} size={7} />)
      ) : (
        <g>
          <Txt x={14} y={52} size={9} bold>{tt("1 · Day")}</Txt>
          {[tt("Today"), tt("Sat"), tt("Sun")].map((d, i) => <Btn key={d} x={14 + i * 66} y={58} w={60} h={26} label={d} strong={i === 1} size={9} />)}
          <Txt x={14} y={106} size={9} bold>{tt("2 · Film")}</Txt>
          {[tt("The Lighthouse Keeper"), tt("Night Market"), tt("Small Hours")].map((f, i) => <Btn key={f} x={14} y={112 + i * 32} w={192} h={26} label={f} strong={i === 0} size={9} />)}
          <Txt x={14} y={222} size={9} bold>{tt("3 · Time")}</Txt>
          {["18:00", "20:15", "22:30"].map((tm, i) => <Btn key={tm} x={14 + i * 66} y={228} w={60} h={28} label={tm} size={10} />)}
        </g>
      )}
    </Phone>
  );
}

/* ------------------------------------------------------------------ A3 · Miller: a long code and scattered details, or chunked */

export function MillerMock({ kind }: { kind: "long" | "chunked" }) {
  return (
    <Phone label={kind === "long" ? tt("A Ticketo confirmation with a twelve-character booking code in one string and the seat, time and hall spread over the screen") : tt("The same confirmation with the code in three blocks of four and the seat, time and hall together in one box")} title={tt("Your tickets")}>
      {kind === "long" ? (
        <g>
          <Txt x={14} y={56} size={9} fill="#555555">{tt("Booking code")}</Txt>
          <Txt x={14} y={74} size={13} bold>TKX7Q2MR84LZ</Txt>
          <Txt x={14} y={110} size={8} fill="#555555">{tt("Hall 3 is on the first floor.")}</Txt>
          <Txt x={14} y={160} size={8} fill="#555555">{tt("Seats: row 7, 12 and 13.")}</Txt>
          <Txt x={14} y={210} size={8} fill="#555555">{tt("Starts at 20:15; doors open shortly before.")}</Txt>
        </g>
      ) : (
        <g>
          <Txt x={14} y={56} size={9} fill="#555555">{tt("Booking code")}</Txt>
          <Txt x={14} y={76} size={15} bold>TKX7 · Q2MR · 84LZ</Txt>
          <rect x="14" y="96" width="192" height="76" rx="8" fill="#F5F5F5" stroke={MID} />
          <Txt x={26} y={118} size={10} bold>{tt("Saturday 20:15")}</Txt>
          <Txt x={26} y={138} size={10}>{tt("Hall 3 · first floor")}</Txt>
          <Txt x={26} y={158} size={10}>{tt("Row 7 · seats 12, 13")}</Txt>
        </g>
      )}
    </Phone>
  );
}

/* ------------------------------------------------------------------ A4 · one menu, one switch per law */

export function LawsMock({ fitts, hick, miller }: { fitts: boolean; hick: boolean; miller: boolean }) {
  const all = [tt("Tickets"), tt("Films"), tt("Events"), tt("Gift cards"), tt("Snacks"), tt("Offers"), tt("Cinemas"), tt("Account"), tt("Help"), tt("Settings"), tt("News"), tt("Jobs")];
  const items = hick ? all.slice(0, 4) : all;
  // Two columns when large items would not fit in one (Fitts on, Hick off); the first group is "go to the cinema", the second "your account".
  const cols = fitts && !hick ? 2 : 1;
  const h = fitts ? 30 : 15;
  const gap = fitts ? 6 : 4;
  const w = cols === 2 ? 93 : 192;
  const split = hick ? 3 : 6;
  const top = miller ? 58 : 42;
  const pos = (i: number) => {
    const g = miller && i >= split ? 1 : 0;
    const k = g ? i - split : i;
    const row = Math.floor(k / cols);
    const firstRows = Math.ceil(split / cols);
    return { x: 14 + (k % cols) * (w + 6), y: top + (g ? firstRows * (h + gap) + 18 : 0) + row * (h + gap) };
  };
  return (
    <Phone label={tt("A Ticketo menu; the switches make its items larger, show only the four most used, and group the labels by meaning")} title={tt("Menu")}>
      {miller && <Txt x={14} y={52} size={8.5} bold fill="#555555">{tt("Go to the cinema")}</Txt>}
      {items.map((l, i) => {
        const p = pos(i);
        return <Btn key={l} x={p.x} y={p.y} w={w} h={h} label={l} size={fitts ? 10 : 7.5} />;
      })}
      {miller && <Txt x={14} y={pos(split).y - 6} size={8.5} bold fill="#555555">{tt("Your account")}</Txt>}
    </Phone>
  );
}

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
