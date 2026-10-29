"use client";

import type { ReactNode } from "react";
import { tt } from "@/lib/lang";

/**
 * Day 11 · the drawn screens of the study cards (CLAUDE.md #52): Ladle, a made-up cooking app with a voice mode, so no task is answered here. Each mock is the same
 * screen in different states; the figure around it (components/day11/diagrams.tsx) says what changes and what it does to the person, and voice lines can be heard
 * with the browser's own speech ("Hear it").
 *
 * Shown for real (user rule 2026-10-28): a voice dialogue is drawn as the transcript a real kitchen speaker would produce, and the busy version really is busy, so
 * the learner meets an overloaded answer rather than reading about one. Quantities and times are recipe labels of a made-up app, not figures about users.
 */
const BRAND = "#B23A0A";
const INK = "#1D2733";

export function Phone({ children, label, title = "Ladle" }: { children: ReactNode; label: string; title?: string }) {
  return (
    <div role="img" aria-label={label} className="mx-auto w-full max-w-[300px] select-none">
      <div className="overflow-hidden rounded-[28px] border-[6px] border-[#1F2730] bg-[#FBF7F4] shadow-md">
        <div className="flex items-center justify-between px-4 pt-1.5 text-[10px] font-semibold text-white" style={{ background: BRAND }}>
          <span>18:42</span>
          <span aria-hidden>▂▄▆ ◔</span>
        </div>
        <div className="px-4 pb-2.5 pt-1 text-[13px] font-bold text-white" style={{ background: BRAND }}>{title}</div>
        <div className="min-h-[260px] space-y-2 p-3 text-[12px] leading-snug" style={{ color: INK }}>{children}</div>
      </div>
    </div>
  );
}

const You = ({ children }: { children: ReactNode }) => <div className="ml-auto max-w-[85%] rounded-lg bg-[#F1E4DC] px-2 py-1.5">{children}</div>;
const It = ({ children, warn }: { children: ReactNode; warn?: boolean }) => (
  <div className="max-w-[92%] rounded-lg border px-2 py-1.5" style={{ background: warn ? "#FFF1F1" : "#fff", borderColor: warn ? "#F3B4B4" : "#E7DCD5" }}>
    <span aria-hidden>🔊 </span>
    {children}
  </div>
);
const Small = ({ children }: { children: ReactNode }) => <div className="text-[10.5px] text-[#5D6670]">{children}</div>;

/* ------------------------------------------------------------------ A1 · one task on a screen, in a chat, by voice */

export const MODE_LINES = {
  voice: () => tt("Six servings: 600 grams of flour, 3 eggs, 450 millilitres of milk. Timer for 12 minutes started."),
};

/* ------------------------------------------------------------------ A2 · one dialogue, six requirements */

export type Req = { logic: boolean; expect: boolean; feedback: boolean; errors: boolean; repeat: boolean; control: boolean };
export const dialogueLines = (r: Req): { who: "you" | "it"; text: string; warn?: boolean }[] => [
  ...(r.expect ? [{ who: "it" as const, text: tt("Voice mode is on. You can say: next step, repeat, set a timer, or stop.") }] : []),
  { who: "you", text: tt("Next.") },
  { who: "it", text: r.logic ? tt("Step 3: fold in the egg whites. Say next when you are ready.") : tt("Step 3: fold in the egg whites, preheat the oven to 180 degrees, grease the tin, and would you like to rate this recipe?") },
  { who: "you", text: tt("Timer for the nuts.") },
  r.errors
    ? { who: "it", text: tt("I did not catch how long. Five minutes, or ten?") }
    : { who: "it", text: tt("Sorry, I didn't understand that. Sorry, I didn't understand that."), warn: true },
  { who: "you", text: r.errors ? tt("Five.") : tt("…") },
  ...(r.errors ? [{ who: "it" as const, text: r.feedback ? tt("Timer for 5 minutes, for the nuts, started.") : tt("Okay.") }] : []),
  { who: "you", text: tt("What was step 3 again?") },
  { who: "it", text: r.repeat ? tt("Step 3: fold in the egg whites.") : tt("We are at step 4: pour into the tin."), warn: !r.repeat },
  { who: "you", text: tt("Stop the timer.") },
  { who: "it", text: r.control ? tt("Timer stopped. Say: start timer, to start it again.") : tt("Timer cannot be changed while running."), warn: !r.control },
];

/* ------------------------------------------------------------------ A3 · calm or busy */

export const LOAD_NAMES = () => [tt("Calm"), tt("A tip added"), tt("Offers added"), tt("Busy")];
export const loadReply = (level: number) =>
  [
    tt("Step 4: bake for 20 minutes."),
    tt("Step 4: bake for 20 minutes. Tip: put the tin on the middle shelf."),
    tt("Step 4: bake for 20 minutes. Tip: put the tin on the middle shelf. By the way, Ladle Premium has 300 more cake recipes. Want to hear about this week's offer?"),
    tt("Great job, Noor! You're on a 4-day cooking streak! Step 4 of 9: bake for 20 minutes at 180 degrees, or 160 if your oven has a fan, unless it's a gas oven, then mark 4. Tip: middle shelf. Did you know 3 of your friends also baked this? Ladle Premium has 300 more cake recipes. Shall I also order baking paper? Say yes, no, more, repeat, skip, or help."),
  ][level];

/* ------------------------------------------------------------------ A4 · three prototypes */

export function ProtoMock({ kind }: { kind: "function" | "interaction" | "test" }) {
  if (kind === "function")
    return (
      <Phone label={tt("A functional prototype: a bare screen that shows what the speech recognition heard in a noisy kitchen, word by word")} title="Ladle · Lab build">
        <Small>{tt("Recognition test · extractor fan on")}</Small>
        <div className="rounded border border-[#E7DCD5] bg-white p-2 font-mono text-[11px]">
          <div>said: “add a pinch of nutmeg”</div>
          <div>heard: “add a pinch of <span className="bg-[#FDE2E2]">nut meg</span>”</div>
          <div>said: “thirty grams of butter”</div>
          <div>heard: “<span className="bg-[#FDE2E2]">thirteen</span> grams of butter”</div>
        </div>
        <Small>{tt("Answers: does the technology hear well enough? Not: does the dialogue feel right.")}</Small>
      </Phone>
    );
  if (kind === "interaction")
    return (
      <Phone label={tt("An interaction prototype, Wizard of Oz: Noor talks to a speaker while Freya, behind a screen, types the replies Ladle would give")} title="Ladle · Wizard of Oz">
        <You>{tt("“Can I use oat milk instead?”")}</You>
        <It>{tt("“Yes, the same amount. The pancakes will be a little sweeter.”")}</It>
        <div className="rounded border border-dashed border-[#B23A0A] p-1.5 text-[10.5px] text-[#7A2A08]">{tt("Behind the screen: Freya types each reply. No speech technology is built yet.")}</div>
        <Small>{tt("Answers: what do people say, and does the dialogue work? Before anything is built.")}</Small>
      </Phone>
    );
  return (
    <Phone label={tt("A test prototype: the near-real app in eight home kitchens, with a list of tasks, including an allergy question and a noisy moment")} title="Ladle · Test build">
      <div className="font-bold">{tt("Test plan · 8 home cooks")}</div>
      <ul className="space-y-0.5">
        <li>☐ {tt("Cook a recipe hands-free")}</li>
        <li>☐ {tt("Change a timer while it runs")}</li>
        <li>☐ {tt("Ask for a nut-free substitute")} <span className="font-semibold text-[#B42318]">{tt("· high risk")}</span></li>
        <li>☐ {tt("Talk with the fan and radio on")}</li>
      </ul>
      <Small>{tt("Answers: do real people manage real tasks, including the risky ones?")}</Small>
    </Phone>
  );
}

/* ------------------------------------------------------------------ A5 · three measures, as thumbnails */

export function MeasureThumb({ kind }: { kind: "hint" | "screen" | "free" }) {
  return (
    <div aria-hidden className="mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border border-line bg-white text-[9px] leading-tight text-[#26323F]">
      <div className="px-2 py-1 font-bold text-white" style={{ background: BRAND }}>Ladle · Voice</div>
      <div className="space-y-1 p-1.5">
        {kind === "hint" && <div className="rounded bg-[#F1E4DC] px-1">🔊 You can say: next, repeat, timer, stop.</div>}
        {kind === "screen" && (
          <>
            <div className="rounded bg-[#FFF1F1] px-1">🔊 Not sure: 5 or 15 min?</div>
            <div className="rounded border border-line px-1">📱 [5 min] [15 min]</div>
          </>
        )}
        {kind === "free" && <div className="rounded bg-[#F1E4DC] px-1">🔊 Ask me anything about cooking! 🤖</div>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ B2 · how free the dialogue may be, per journey */

