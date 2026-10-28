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

export function GoalSetupMock({ kind }: { kind: "structure" | "tone" | "game" }) {
  if (kind === "structure")
    return (
      <Phone label={tt("Brightwater's savings goal set-up with a three-step indicator and a line saying what was saved and what comes next")}>
        <div className="flex gap-1" aria-hidden>
          {[0, 1, 2].map((i) => <div key={i} className="h-1.5 flex-1 rounded" style={{ background: i < 2 ? BRAND : "#CFDBE2" }} />)}
        </div>
        <div className="text-[10px] font-semibold text-[#3E5566]">{tt("Step 2 of 3 · Amount")}</div>
        <div className="rounded bg-[#E6F2F4] px-2 py-1.5 text-[11px]">{tt("✓ Your goal is named: “A cushion for emergencies”. Next: how much per month.")}</div>
        <Field label={tt("How much per month")} value={tt("The same amount every payday")} />
        <Btn>{tt("Continue to step 3")}</Btn>
      </Phone>
    );
  if (kind === "tone")
    return (
      <Phone label={tt("The same task in a playful tone: pastel gradient, a piggy bank, sparkles and cheerful words, the same two fields")} bg="linear-gradient(160deg,#FFE3F1,#E4E9FF 60%,#E2FFF4)" bar="#FF6FB1" title="Brightwater ✨">
        <div className="text-center text-[34px] leading-none" aria-hidden>🐷💖</div>
        <div className="text-center text-[16px] font-extrabold text-[#C2186B]">{tt("Yay! Let’s make some money magic!")}</div>
        <div className="text-center text-[11px] text-[#6B3A57]">{tt("Your piggy is SO hungry 🍬 Feed it every month and watch it grow!!")}</div>
        <div className="rounded-2xl border-2 border-dashed border-[#FF9FCB] bg-white/80 p-2">
          <div className="text-[10px] font-bold text-[#C2186B]">{tt("How many coins for Piggy? 💰")}</div>
          <div className="mt-1 rounded-full bg-white px-3 py-1.5">{tt("The same amount every payday")}</div>
        </div>
        <Btn bg="#FF6FB1" round={999}>{tt("Feed my piggy! 🎉")}</Btn>
      </Phone>
    );
  return (
    <Phone label={tt("The same task as a game: Captain Coin's treasure voyage, a map with islands, a character with lives, and the task hidden as chapter 1")} bg="#0B2340" bar="#0B2340" title="Brightwater Quest">
      <div className="text-[10px] font-bold uppercase tracking-wide text-[#F4C542]">{tt("Chapter 1 · The Island of Saving")}</div>
      <div className="rounded-lg bg-[#123B66] p-2 text-[11px] text-white">
        <span aria-hidden>🏴‍☠️ </span>
        {tt("“Ahoy! I am Captain Coin. Pirates stole the Treasure of Tomorrow. Only a brave saver can win it back!”")}
      </div>
      <div className="relative h-[86px] rounded-lg bg-[#1F6FA8]" aria-hidden>
        <span className="absolute left-3 top-3 text-[22px]">🏝️</span>
        <span className="absolute left-[45%] top-8 text-[18px]">⛵</span>
        <span className="absolute right-4 top-2 text-[22px]">🏰</span>
        <span className="absolute bottom-1 left-3 text-[10px] font-bold text-white">❤️❤️❤️ · 💰 0</span>
      </div>
      <div className="text-[11px] text-[#CFE3F5]">{tt("Choose your monthly gold to set sail:")}</div>
      <div className="rounded bg-white px-2 py-1.5 text-[#0B2340]">{tt("The same amount every payday")}</div>
      <Btn bg="#F4C542" fg="#0B2340">{tt("⚔️ Set sail!")}</Btn>
    </Phone>
  );
}

/* ------------------------------------------------------------------ A2 · after a deposit: five kinds of information about one's own position */

export function DepositMock({ progress, feedback, recognition, challenge, goal }: { progress: boolean; feedback: boolean; recognition: boolean; challenge: boolean; goal: boolean }) {
  return (
    <Phone label={tt("Brightwater after a deposit; the switches add progress, feedback, recognition, a challenge and a reached goal")}>
      <div className="rounded bg-[#EEF2F5] px-2 py-1.5 text-[11px]">{feedback ? tt("Saved. That covers another month of your cushion.") : tt("Transaction completed.")}</div>
      {goal && <div className="text-[11px] font-semibold" style={{ color: BRAND }}>{tt("Goal: an emergency cushion of three months' rent")}</div>}
      {progress ? (
        <div>
          <div className="h-2 rounded bg-[#CFDBE2]"><div className="h-2 rounded" style={{ width: "66%", background: BRAND }} /></div>
          <div className="mt-0.5 text-[10px] text-[#3E5566]">{tt("2 of 3 months saved · one to go")}</div>
        </div>
      ) : (
        <div className="text-[10px] text-[#4E5E6A]">{tt("Balance updated.")}</div>
      )}
      {recognition && <Card bg="#FFF8E6" border="#F2D99B"><span aria-hidden>🌟 </span>{tt("Four months in a row. That is a habit now.")}</Card>}
      {challenge && <Card><span className="font-semibold">{tt("Optional: ")}</span>{tt("round up every card payment this month?")}</Card>}
      <Btn bg="#fff" fg={BRAND}>{tt("Back to overview")}</Btn>
    </Phone>
  );
}

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

export function SignalsMock({ n }: { n: number }) {
  const s = SIGNALS().slice(0, n);
  return (
    <Phone label={tt(`Brightwater's home screen with ${n} reward signal${n === 1 ? "" : "s"}: ${s.map((x) => x.name).join(", ")}`)}>
      <div className="text-[10px] text-[#5A6B78]">{tt("Your emergency cushion")}</div>
      <div className="text-[20px] font-bold">{tt("2 of 3 months")}</div>
      <div className="space-y-1.5">{s.map((x) => x.node)}</div>
      <Btn>{tt("Save now")}</Btn>
    </Phone>
  );
}

/* ------------------------------------------------------------------ A4 · numbered steps or named stages, same mechanics */

export function StagesMock({ named }: { named: boolean }) {
  const steps = named
    ? [tt("Month 1 · A cushion for a broken phone"), tt("Month 3 · A cushion for a broken boiler"), tt("Month 6 · A month's rent, if work stops"), tt("Month 9 · Three months of calm")]
    : [tt("Step 1 of 12"), tt("Step 3 of 12"), tt("Step 6 of 12"), tt("Step 9 of 12")];
  return (
    <Phone label={named ? tt("The savings plan with named stages that say what each stage covers") : tt("The same savings plan with numbered steps")}>
      <div className="font-semibold">{tt("Your emergency cushion")}</div>
      <ol className="space-y-1.5">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: i < 2 ? BRAND : "#9FB3BF" }}>{i < 2 ? "✓" : i + 1}</span>
            <span className={i === 2 ? "font-semibold" : ""}>{s}</span>
          </li>
        ))}
      </ol>
      <div className="mt-1 rounded border border-dashed border-[#9FB3BF] px-2 py-1 font-mono text-[10px] text-[#3E5566]">{tt("MECHANICS: progress bar · monthly confirmation · unchanged")}</div>
    </Phone>
  );
}

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

export function LeverMock({ kind }: { kind: "streak" | "ranking" | "milestone" }) {
  if (kind === "streak")
    return (
      <Phone label={tt("A push message: your 12-week saving streak ends tonight, do not lose it")}>
        <Card bg="#fff"><div className="text-[10px] text-[#5A6B78]">{tt("Brightwater · now")}</div><div className="font-semibold">{tt("🔥 Don’t lose your 12-week streak!")}</div><div>{tt("Save something before midnight or your streak resets to 0.")}</div></Card>
        <Btn>{tt("Save something now")}</Btn>
      </Phone>
    );
  if (kind === "ranking")
    return (
      <Phone label={tt("A ranking of savers in the city, with the user near the bottom")}>
        <div className="font-semibold">{tt("🏆 Top savers in Lindenau")}</div>
        {[["1", "M. K.", tt("14 months")], ["2", "S. T.", tt("13 months")], ["…", "…", "…"], ["412", tt("You"), tt("2 months")]].map(([a, b, c]) => (
          <div key={a + b} className="flex justify-between rounded bg-[#E8EEF7] px-2 py-1"><span>{a}. {b}</span><span>{c}</span></div>
        ))}
      </Phone>
    );
  return (
    <Phone label={tt("A milestone message: your cushion now covers a broken boiler")}>
      <Card bg="#E6F2F4" border="#B8D9DF"><div className="font-semibold">{tt("Milestone: three months saved")}</div><div>{tt("Your cushion now covers a broken boiler. Next stage: a month's rent.")}</div></Card>
      <Btn bg="#fff" fg={BRAND}>{tt("See my plan")}</Btn>
    </Phone>
  );
}
