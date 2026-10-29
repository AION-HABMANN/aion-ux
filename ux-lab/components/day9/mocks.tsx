"use client";

import type { ReactNode } from "react";
import { tt } from "@/lib/lang";

/**
 * Day 9 · the drawn screens of the study cards (CLAUDE.md #52): Brightwater Savings, a made-up savings bank with an app, so no task is answered here. Each mock is the
 * same screen in different states; the figure around it (components/day9/diagrams.tsx) says what changes and what it does to the person.
 *
 * Shown for real (user rule 2026-10-28): the screens are drawn as a real phone app would look, in HTML rather than as grey wireframes, so that a playful tone on a
 * money task, a quest, or eight competing reward signals look like the thing itself. Brightwater's own colours only; amounts and counters are interface labels of a
 * made-up app, not figures about users.
 */

const BRAND = "#0E5E6F";
const INK = "#1D2733";

export function Phone({ children, label, bg = "#F5F8FA", bar = BRAND, title = "Brightwater" }: { children: ReactNode; label: string; bg?: string; bar?: string; title?: string }) {
  return (
    <div role="img" aria-label={label} className="mx-auto w-full max-w-[300px] select-none">
      <div className="overflow-hidden rounded-[28px] border-[6px] border-[#1F2730] shadow-md" style={{ background: bg }}>
        <div className="flex items-center justify-between px-4 pt-1.5 text-[10px] font-semibold text-white" style={{ background: bar }}>
          <span>9:41</span>
          <span aria-hidden>▂▄▆ ◔</span>
        </div>
        <div className="px-4 pb-2.5 pt-1 text-[13px] font-bold text-white" style={{ background: bar }}>{title}</div>
        <div className="min-h-[300px] space-y-2 p-3 text-[12px] leading-snug" style={{ color: INK }}>{children}</div>
      </div>
    </div>
  );
}

const Btn = ({ children, bg = BRAND, fg = "#fff", round = 8 }: { children: ReactNode; bg?: string; fg?: string; round?: number }) => (
  <div className="py-2 text-center text-[12px] font-semibold" style={{ background: bg, color: fg, borderRadius: round }}>{children}</div>
);
const Card = ({ children, bg = "#fff", border = "#DCE4EA" }: { children: ReactNode; bg?: string; border?: string }) => (
  <div className="rounded-lg border p-2.5" style={{ background: bg, borderColor: border }}>{children}</div>
);
const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-[10px] text-[#5A6B78]">{label}</div>
    <div className="rounded border border-[#C9D4DC] bg-white px-2 py-1.5">{value}</div>
  </div>
);

/* ------------------------------------------------------------------ A1 · one task in three versions: structure, tone, a game */

/* ------------------------------------------------------------------ A2 · after a deposit: five kinds of information about one's own position */

/* ------------------------------------------------------------------ A3 · one home screen with 1 to 8 reward signals */

const SIGNALS = (): { node: ReactNode; name: string }[] => [
  { name: tt("a progress bar"), node: <div key="p"><div className="h-2 rounded bg-[#CFDBE2]"><div className="h-2 w-2/3 rounded" style={{ background: BRAND }} /></div><div className="mt-0.5 text-[10px]">{tt("Cushion: 2 of 3 months")}</div></div> },
  { name: tt("a streak"), node: <div key="s" className="inline-block rounded-full bg-[#FFE4D6] px-2 py-0.5 text-[11px] font-bold text-[#B23A00]">🔥 {tt("12-week streak")}</div> },
  { name: tt("points"), node: <div key="x" className="inline-block rounded-full bg-[#EDE4FF] px-2 py-0.5 text-[11px] font-bold text-[#5B21B6]">⭐ 2,450 {tt("coins")}</div> },
  { name: tt("a badge pop-up"), node: <div key="b" className="rounded-lg border-2 border-[#F4C542] bg-[#FFF8DD] p-1.5 text-[11px] font-bold">🏅 {tt("NEW BADGE: Super Saver!")}</div> },
  { name: tt("a ranking"), node: <div key="r" className="rounded bg-[#E8EEF7] px-2 py-1 text-[11px]">🏆 {tt("You are #38 in your city. 12 savers passed you this week!")}</div> },
  { name: tt("a countdown"), node: <div key="c" className="rounded bg-[#FDE2E2] px-2 py-1 text-[11px] font-bold text-[#B91C1C] motion-safe:animate-pulse">⏰ {tt("Bonus interest ends in 02:14:09!")}</div> },
  { name: tt("a mystery chest"), node: <div key="m" className="rounded bg-[#F3E8FF] px-2 py-1 text-[11px]">🎁 {tt("Mystery chest ready! Tap to open")}</div> },
  { name: tt("a red notification dot"), node: <div key="n" className="flex items-center gap-1 text-[11px]"><span className="inline-block h-4 w-4 rounded-full bg-[#DC2626] text-center text-[9px] font-bold leading-4 text-white">9</span>{tt("new rewards waiting")}</div> },
];
export const signalNames = () => SIGNALS().map((s) => s.name);

/* ------------------------------------------------------------------ A4 · numbered steps or named stages, same mechanics */

/* ------------------------------------------------------------------ A5 · thumbnails of three measures */

export function MeasureThumb({ kind }: { kind: "stages" | "words" | "league" }) {
  const label = kind === "stages" ? tt("A savings plan in named stages") : kind === "words" ? tt("Honest monthly feedback") : tt("A city savings league");
  return (
    <div role="img" aria-label={label} className="rounded-lg border border-[#DCE4EA] bg-white p-2 text-[11px]" style={{ color: INK }}>
      {kind === "stages" && (<div className="space-y-1">{[0, 1, 2].map((i) => <div key={i} className="flex items-center gap-1"><span className="h-3 w-3 rounded-full" style={{ background: i < 2 ? BRAND : "#CFDBE2" }} /><span className="h-1.5 flex-1 rounded bg-[#E3EAF0]" /></div>)}</div>)}
      {kind === "words" && <div className="rounded bg-[#E6F2F4] p-1.5">{tt("“That covers a month of your cushion.”")}</div>}
      {kind === "league" && <div className="space-y-0.5">{["#1", "#2", "#38"].map((r) => <div key={r} className="flex justify-between rounded bg-[#E8EEF7] px-1.5"><span>{r}</span><span>🏆</span></div>)}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ B2 · three levers */

