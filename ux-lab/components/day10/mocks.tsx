"use client";

import type { ReactNode } from "react";
import { tt } from "@/lib/lang";

/**
 * Day 10 · the drawn screens of the study cards (CLAUDE.md #52): Northline Rail, a made-up rail company with an app, so no task is answered here. Each mock is the
 * same screen in different states; the figure around it (components/day10/diagrams.tsx) says what changes and what it does to the person.
 *
 * Shown for real (user rule 2026-10-28): the screens are drawn as a real phone app would look, in HTML rather than as grey wireframes, so that a message that knows
 * too much, a rebooking nobody can question, or a confident black-box suggestion look like the thing itself. Northline's own colours only; times, train numbers and
 * percentages are interface labels of a made-up app, not figures about users.
 */

const BRAND = "#7A1E3A";
const INK = "#1D2733";

export function Phone({ children, label, bg = "#F7F5F6", bar = BRAND, title = "Northline" }: { children: ReactNode; label: string; bg?: string; bar?: string; title?: string }) {
  return (
    <div role="img" aria-label={label} className="mx-auto w-full max-w-[300px] select-none">
      <div className="overflow-hidden rounded-[28px] border-[6px] border-[#1F2730] shadow-md" style={{ background: bg }}>
        <div className="flex items-center justify-between px-4 pt-1.5 text-[10px] font-semibold text-white" style={{ background: bar }}>
          <span>7:31</span>
          <span aria-hidden>▂▄▆ ◔</span>
        </div>
        <div className="px-4 pb-2.5 pt-1 text-[13px] font-bold text-white" style={{ background: bar }}>{title}</div>
        <div className="min-h-[280px] space-y-2 p-3 text-[12px] leading-snug" style={{ color: INK }}>{children}</div>
      </div>
    </div>
  );
}

const Btn = ({ children, bg = BRAND, fg = "#fff" }: { children: ReactNode; bg?: string; fg?: string }) => (
  <div className="rounded-lg py-2 text-center text-[12px] font-semibold" style={{ background: bg, color: fg }}>{children}</div>
);
const Card = ({ children, bg = "#fff", border = "#E2D9DD" }: { children: ReactNode; bg?: string; border?: string }) => (
  <div className="rounded-lg border p-2.5" style={{ background: bg, borderColor: border }}>{children}</div>
);
const Train = ({ time, to, note, late }: { time: string; to: string; note?: string; late?: string }) => (
  <div className="flex items-baseline justify-between border-b border-[#EEE6E9] py-1">
    <span className="font-semibold">{time} <span className="font-normal">{to}</span></span>
    <span className="text-[10.5px]" style={{ color: late ? "#B42318" : "#5D6670" }}>{late ?? note}</span>
  </div>
);

/* ------------------------------------------------------------------ A1 · one delay, handled by a rule, by the situation and by what was learned */

/* ------------------------------------------------------------------ A2 · context, personal data and steering the interaction */

/* ------------------------------------------------------------------ A3 · from not personal to far too personal */

export const PERSONAL_LEVELS = () => [tt("Not personal"), tt("Fits the trip"), tt("Fits the person"), tt("Knows too much"), tt("Narrows the world")];

/* ------------------------------------------------------------------ A4 · an automatic rebooking with or without why, change and undo */

/* ------------------------------------------------------------------ A5 · three measures, as thumbnails */

export function MeasureThumb({ kind }: { kind: "reason" | "board" | "chat" }) {
  return (
    <div aria-hidden className="mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border border-line bg-white text-[9px] leading-tight text-[#26323F]">
      <div className="px-2 py-1 font-bold text-white" style={{ background: BRAND }}>Northline</div>
      <div className="space-y-1 p-1.5">
        {kind === "reason" && (
          <>
            <div className="font-semibold">8:12 → Bremen</div>
            <div className="rounded bg-[#F3E9ED] px-1">ⓘ because your 7:42 is late</div>
            <div className="text-[#5D6670]">Not for me · Undo</div>
          </>
        )}
        {kind === "board" && (
          <>
            <div className="font-semibold">Your departures</div>
            <div>7:42 Bremen ★</div>
            <div>18:19 Hamburg ★</div>
          </>
        )}
        {kind === "chat" && (
          <>
            <div className="rounded bg-[#F3E9ED] px-1">Ask me anything 🤖</div>
            <div className="rounded border border-line px-1">Refund? Bike? Lost bag?</div>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ B2 · how deep to personalise, per journey */

