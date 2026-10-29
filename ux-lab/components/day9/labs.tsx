"use client";

import clsx from "clsx";
import { useState } from "react";
import { AppScreen, TaskLab } from "@/components/sim/TaskLab";
import type { LabCtx } from "@/components/sim/TaskLab";
import { tt } from "@/lib/lang";

/**
 * Day 9 · the working products of the study cards (UX-STANDARD 2.16): Brightwater Savings, a made-up savings bank with an app, so no task is answered here. Each lab
 * gives one task and versions of the same app to use, with time, wrong taps, stress tests and a "how did that feel?" after each run (components/sim/TaskLab.tsx).
 * Amounts are written without a currency; anything loud is a labelled demonstration that counts nothing.
 */
const ACC = "#1E40AF";
const Brand = "Brightwater Savings";
const Done = ({ text }: { text: string }) => <AppScreen brand={Brand} color={ACC}><p className="text-[15px] font-bold">{tt("✓ Done")}</p><p>{text}</p></AppScreen>;
const Btn = ({ onClick, children, quiet, color = ACC }: { onClick: () => void; children: React.ReactNode; quiet?: boolean; color?: string }) => (
  <button type="button" onClick={onClick} className={clsx("w-full rounded-lg py-2", quiet ? "border border-[#CBD5E1] text-[#334155]" : "font-bold text-white")} style={quiet ? undefined : { background: color }}>{children}</button>
);

/* ------------------------------------------------------------------ A1 · structure, tone or a game */

function Goal({ ctx, kind }: { ctx: LabCtx; kind: "structure" | "tone" | "game" }) {
  const [step, setStep] = useState(kind === "game" ? 0 : 1);
  if (ctx.finished) return <Done text={tt("Savings goal set: a cushion of 3 months' rent, 150 a month")} />;
  if (kind === "game" && step === 0)
    return (
      <AppScreen brand={Brand} color="#7C2D12">
        <p className="text-[16px] font-black">{tt("🏴‍☠️ Captain Coin's Treasure Quest")}</p>
        <p className="text-[12px]">{tt("Ahoy! Your ship has three lives. Sail past the Isle of Impulse and the Bay of Bills to reach Treasure Island.")}</p>
        <div className="flex gap-1" aria-hidden>{["🏝️", "🌊", "🏝️", "🌊", "💰"].map((x, i) => <span key={i} className="text-[22px]">{x}</span>)}</div>
        <Btn color="#7C2D12" onClick={() => { setStep(1); ctx.miss(tt("Read the quest intro")); }}>{tt("Begin chapter 1")}</Btn>
      </AppScreen>
    );
  const fields = (
    <div className="space-y-1 text-[12.5px]">
      <p className={kind === "tone" ? "font-bold text-[#BE185D]" : "font-semibold"}>{kind === "tone" ? tt("✨ What's your money magic for? ✨") : kind === "game" ? tt("Chapter 1: name your treasure") : tt("What are you saving for?")}</p>
      <p className="rounded border border-[#CBD5E1] px-2 py-1">{tt("A cushion of 3 months' rent")}</p>
      <p className={kind === "tone" ? "font-bold text-[#BE185D]" : "font-semibold"}>{kind === "tone" ? tt("🐷 Feed your piggy how much a month?") : tt("How much a month?")}</p>
      <p className="rounded border border-[#CBD5E1] px-2 py-1">{tt("150")}</p>
    </div>
  );
  return (
    <AppScreen brand={Brand} color={kind === "tone" ? "#BE185D" : kind === "game" ? "#7C2D12" : ACC}>
      {kind === "structure" && <p className="text-[11px] text-[#475569]">{tt(`Step ${step} of 3 · ${["Goal", "Amount", "Check"][step - 1]}`)}</p>}
      {kind === "tone" && <p className="text-center text-[30px]" aria-hidden>🐷✨💖</p>}
      {kind === "game" && <p className="text-[11px]">{tt("❤️❤️❤️ · Chapter 1 of 5")}</p>}
      {fields}
      <Btn color={kind === "tone" ? "#BE185D" : kind === "game" ? "#7C2D12" : ACC} onClick={() => ctx.done(tt("Saved the goal"))}>{kind === "tone" ? tt("Make it rain! 💸") : kind === "game" ? tt("Set sail ⛵") : tt("Save the goal")}</Btn>
      {kind === "structure" && <p className="text-[11.5px] text-[#475569]">{tt("Next: we'll show you the date you reach it.")}</p>}
    </AppScreen>
  );
}

export function LayersLab() {
  return (
    <TaskLab
      label={tt("One Brightwater task, “set up your savings goal”, as structure, as playful tone and as a game · a working product · Case assumption, example company")}
      point={tt("“Make it more like a game” can mean three things. Structure (a goal, a visible step, a confirmation) helps almost any product and takes days. A playful tone changes only the look and can make a serious provider seem careless. A game builds a world and a story, and needs months.")}
      task={tt("You are Vera. Set up a savings goal: a cushion of three months' rent, 150 a month.")}
      feel={[tt("not taken seriously"), tt("in good hands")]}
      versions={[
        { id: "structure", label: tt("Structure: gamification"), render: (ctx) => <Goal ctx={ctx} kind="structure" />, insight: tt("In plain words: three steps, where Vera is, and a line saying what comes next. Nothing looks like a game, yet she knows her position and her goal. One designer, a few days; little risk.") },
        { id: "tone", label: tt("Tone: playful design"), render: (ctx) => <Goal ctx={ctx} kind="tone" />, insight: tt("In plain words: the same two fields with a pink piggy, sparkles and “money magic”. Vera knows no more about where she is. For a bank, the tone says “we don't take your money seriously”.") },
        { id: "game", label: tt("Fiction: a game"), render: (ctx) => <Goal ctx={ctx} kind="game" />, insight: tt("In plain words: a pirate quest with lives and islands; the actual task waits in chapter 1. Memorable once, but it needs writers, artists and months, and grown-ups planning their savings may find it childish.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · information about one's own position */

type Pos = { progress: boolean; feedback: boolean; recognition: boolean; challenge: boolean; goal: boolean };
function Deposit({ ctx, p }: { ctx: LabCtx; p: Pos }) {
  const [paid, setPaid] = useState(false);
  if (ctx.finished) return <Done text={tt("Deposit made · month 7 of 12")} />;
  if (!paid)
    return (
      <AppScreen brand={Brand} color={ACC}>
        <p className="font-bold">{tt("Monthly deposit")}</p>
        <p className="rounded border border-[#CBD5E1] px-2 py-1">{tt("150 to “Rent cushion”")}</p>
        <Btn onClick={() => { setPaid(true); ctx.hit(tt("Deposited")); }}>{tt("Deposit")}</Btn>
      </AppScreen>
    );
  return (
    <AppScreen brand={Brand} color={ACC}>
      {p.feedback ? <p className="rounded bg-[#ECFDF5] p-2 font-semibold">{tt("✓ 150 added to your rent cushion.")}</p> : <p className="font-mono text-[12px]">{tt("Transaction OK.")}</p>}
      {p.progress && (
        <div>
          <div className="h-2.5 overflow-hidden rounded bg-[#E2E8F0]"><div className="h-full w-[58%] rounded bg-[#1E40AF]" /></div>
          <p className="text-[11.5px] text-[#475569]">{tt("7 of 12 months · 1,050 of 1,800")}</p>
        </div>
      )}
      {p.goal && <p className="text-[12px]">{tt("That's two months' rent covered if work stops.")}</p>}
      {p.recognition && <p className="text-[12px]">{tt("Seven months in a row, Vera. That takes discipline.")}</p>}
      {p.challenge && <p className="text-[12px]">{tt("Next: month 8 on 1 August. Want to round up to 160?")}</p>}
      <Btn onClick={() => ctx.done(tt("Saw the result"))} quiet>{tt("Close")}</Btn>
    </AppScreen>
  );
}

export function PositionLab() {
  const v = (id: string, label: string, p: Pos, insight: string) => ({ id, label, render: (ctx: LabCtx) => <Deposit ctx={ctx} p={p} />, insight });
  return (
    <TaskLab
      label={tt("Brightwater after a deposit: progress, feedback, recognition, a challenge and a goal · a working product · Case assumption, example company")}
      point={tt("People do not react to rewards as such; they react to information about their own position: how far they have come, whether this step counted, what they can do now. Progress, feedback, recognition, a challenge and a goal are five ways of giving that information.")}
      task={tt("You are Vera. Make this month's deposit and see where you stand.")}
      feel={[tt("I don't know where I stand"), tt("I know exactly where I stand")]}
      versions={[
        v("bare", tt("Bare"), { progress: false, feedback: false, recognition: false, challenge: false, goal: false }, tt("In plain words: “Transaction OK.” The money moved; Vera learns nothing about her position.")),
        v("two", tt("Progress and feedback"), { progress: true, feedback: true, recognition: false, challenge: false, goal: false }, tt("In plain words: what this deposit did and how far she is. Already most of what she needs.")),
        v("all", tt("All five"), { progress: true, feedback: true, recognition: true, challenge: true, goal: true }, tt("In plain words: what it did, how far, what it means for her life, that it was noticed, and a next step she can take or ignore. No points, no badges.")),
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · stacking signals (opt-in demonstration) */

function Home({ ctx, n }: { ctx: LabCtx; n: 2 | 5 | 8 }) {
  const [closed, setClosed] = useState<string[]>([]);
  if (ctx.finished) return <Done text={tt("July's deposit: received on 1 July")} />;
  const sig = [
    [tt("🔥 Streak: 7 months"), "#FEF3C7"], [tt("📈 58 % of your goal"), "#DBEAFE"], [tt("🏅 New badge: Steady Saver!"), "#FCE7F3"], [tt("⭐ +120 points"), "#FEF9C3"],
    [tt("🏆 You're #412 in your city"), "#EDE9FE"], [tt("⏰ Bonus ends in 3 h!"), "#FEE2E2"], [tt("🎁 Spin the wheel!"), "#DCFCE7"], [tt("👥 Mia saved more than you"), "#FFEDD5"],
  ].slice(0, n);
  return (
    <AppScreen brand={Brand} color={ACC}>
      {sig.filter(([s]) => !closed.includes(s)).map(([s, c], i) => (
        <div key={s} className={clsx("flex items-center justify-between rounded px-2 text-[12px]", i % 3 === 2 ? "py-2 font-bold" : "py-1")} style={{ background: c }}>
          <button type="button" onClick={() => ctx.miss(tt(`Tapped “${s}”`))} className="text-left">{s}</button>
          {n > 2 && <button type="button" aria-label={tt("Dismiss")} onClick={() => setClosed((c2) => [...c2, s])} className="px-1">×</button>}
        </div>
      ))}
      <p className="pt-1 text-[12px] font-semibold">{tt("Rent cushion")}</p>
      <button type="button" onClick={() => ctx.done(tt("Found July's deposit"))} className="block w-full rounded border border-[#CBD5E1] px-2 py-1 text-left text-[12px]">{tt("Activity: 1 July · deposit 150 ✓")}</button>
    </AppScreen>
  );
}

export function SignalsLab() {
  return (
    <TaskLab
      label={tt("Brightwater's home screen with two, five or eight reward signals · a working product · demonstration · Case assumption, example company")}
      point={tt("Stacking mechanics does not stack motivation. Past a few signals, each new one makes the others mean less, and the screen turns from information into pressure. That is overstimulation, and it slides into reward inflation and manipulation. The loud versions are a demonstration and count nothing.")}
      task={tt("You are Kaspar. Check that July's deposit went through.")}
      feel={[tt("pressured"), tt("informed")]}
      versions={[
        { id: "two", label: tt("Two signals"), render: (ctx) => <Home ctx={ctx} n={2} />, insight: tt("In plain words: a streak and progress. Both say something about Kaspar's own saving; the deposit he looks for is easy to see.") },
        { id: "five", label: tt("Five signals"), render: (ctx) => <Home ctx={ctx} n={5} />, insight: tt("In plain words: badges, points and a city ranking join in. Each means less; Kaspar starts dismissing them to get to his deposit.") },
        { id: "eight", label: tt("Eight signals"), render: (ctx) => <Home ctx={ctx} n={8} />, insight: tt("In plain words: a countdown, a wheel and a comparison with a friend. The screen is pressure, not information; the deposit is at the bottom.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · numbered steps or named stages */

function Plan({ ctx, named }: { ctx: LabCtx; named: boolean }) {
  const [ask, setAsk] = useState(false);
  if (ctx.finished) return <Done text={tt("Month 7 kept · next deposit on 1 August")} />;
  return (
    <AppScreen brand={Brand} color={ACC}>
      <p className="font-bold">{tt("Your savings plan")}</p>
      <div className="h-2.5 overflow-hidden rounded bg-[#E2E8F0]"><div className="h-full w-1/2 rounded bg-[#1E40AF]" /></div>
      <p className="text-[13px]">{named ? tt("Month 6: a month's rent, if work stops") : tt("Step 6 of 12")}</p>
      {named && <p className="text-[11.5px] text-[#475569]">{tt("Next: month 9, two months' rent · month 12, the full cushion")}</p>}
      <p className="pt-2 text-[12px]">{tt("Money is tight this month. Skip month 7?")}</p>
      <div className="grid grid-cols-2 gap-2">
        <Btn quiet onClick={() => { setAsk(true); ctx.hit(tt("Thought about skipping")); }}>{tt("Skip month 7")}</Btn>
        <Btn onClick={() => ctx.done(tt("Kept the plan"))}>{tt("Keep going")}</Btn>
      </div>
      {ask && <div className="rounded bg-[#F1F5F9] p-2 text-[12px]">{named ? tt("If you skip, the cushion covers one month of rent until September.") : tt("Step 7 will be skipped.")} <button type="button" onClick={() => ctx.done(tt("Skipped month 7"))} className="underline">{tt("Skip anyway")}</button></div>}
    </AppScreen>
  );
}

export function StagesLab() {
  return (
    <TaskLab
      label={tt("The same Brightwater savings plan with numbered steps or with named stages · a working product · Case assumption, example company")}
      point={tt("Progress logic says where you are; a story says why that place matters. Named stages make the same mechanics mean more, and nothing new had to be built. The story is the real process told well. Decide in each version, and notice what made you decide.")}
      task={tt("You are Vera. Money is tight this month. Decide whether to keep or skip month 7.")}
      feel={[tt("it's only a number"), tt("it means something to me")]}
      versions={[
        { id: "numbered", label: tt("Numbered steps"), render: (ctx) => <Plan ctx={ctx} named={false} />, insight: tt("In plain words: “Step 6 of 12”. Vera knows her position, but not what it is worth; skipping costs “a step”.") },
        { id: "named", label: tt("Named stages"), render: (ctx) => <Plan ctx={ctx} named />, insight: tt("In plain words: “a month's rent, if work stops”. The same position, now with a meaning from her own life; skipping has a consequence she can picture. The mechanics underneath did not change.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B · three levers at 23:50 (opt-in demonstration) */

function Night({ ctx, lever }: { ctx: LabCtx; lever: "streak" | "rank" | "milestone" }) {
  const [step, setStep] = useState(0);
  if (ctx.finished) return <Done text={tt("App closed without saving today")} />;
  const close = () => {
    if (lever === "streak" && step < 2) { setStep(step + 1); ctx.miss(step === 0 ? tt("“Don't lose your streak!”") : tt("“Are you sure? 41 days gone forever.”")); return; }
    ctx.done(tt("Closed the app"));
  };
  return (
    <AppScreen brand={Brand} color={ACC} status="23:50">
      {lever === "streak" && (
        <>
          <p className="rounded bg-[#FEE2E2] p-2 text-[13px] font-bold text-[#991B1B]">{tt("🔥 Your 41-day streak ends at midnight!")}</p>
          <Btn color="#B91C1C" onClick={() => { ctx.miss(tt("Saved 1 just to keep the streak")); ctx.done(tt("Saved a token amount at 23:51")); }}>{tt("Save 1 now and keep it")}</Btn>
          {step >= 1 && <p className="text-[12px] text-[#991B1B]">{step === 1 ? tt("Don't lose your streak! You've worked so hard.") : tt("Are you sure? 41 days, gone forever.")}</p>}
          <button type="button" onClick={close} className="text-[11px] text-[#4B5563] underline">{step === 0 ? tt("Not today") : step === 1 ? tt("I don't care about the streak") : tt("Yes, lose my streak")}</button>
        </>
      )}
      {lever === "rank" && (
        <>
          <p className="rounded bg-[#EDE9FE] p-2 text-[13px] font-bold">{tt("🏆 You're #412 in Linden · 3 people passed you today")}</p>
          <button type="button" onClick={() => ctx.miss(tt("Opened the ranking"))} className="text-[12px] underline">{tt("See who passed you")}</button>
          <Btn quiet onClick={close}>{tt("Close the app")}</Btn>
        </>
      )}
      {lever === "milestone" && (
        <>
          <p className="rounded bg-[#ECFDF5] p-2 text-[13px]">{tt("Your cushion now covers a broken boiler.")}</p>
          <Btn quiet onClick={close}>{tt("Close the app")}</Btn>
        </>
      )}
    </AppScreen>
  );
}

export function LeverLab() {
  return (
    <TaskLab
      label={tt("Three Brightwater levers at 23:50: a streak warning, a city ranking, a milestone · a working product · demonstration · Case assumption, example company")}
      point={tt("Every lever buys activation with something: a streak warning uses loss aversion and costs autonomy, a ranking uses comparison and costs dignity and trust, a milestone uses progress and costs little. Try to leave without saving and feel what each lever does. The loud versions are a demonstration and count nothing.")}
      task={tt("You are Kaspar. It is 23:50 and you do not want to save today. Close the app without saving.")}
      feel={[tt("pushed"), tt("free")]}
      stresses={["hurry", "eyes"]}
      versions={[
        { id: "streak", label: tt("A streak warning"), render: (ctx) => <Night ctx={ctx} lever="streak" />, insight: tt("In plain words: “Don't lose your streak!” works through loss aversion, with two more screens of guilt before you may leave. Many save a token amount at midnight to protect a number; when the streak breaks, many stop altogether.") },
        { id: "rank", label: tt("A city ranking"), render: (ctx) => <Night ctx={ctx} lever="rank" />, insight: tt("In plain words: number 412, and people passing you. It motivates the few at the top and tells everyone else they are behind, about money. Sales likes the attention; the advisers fear for the bank's credibility.") },
        { id: "milestone", label: tt("A milestone"), render: (ctx) => <Night ctx={ctx} lever="milestone" />, insight: tt("In plain words: “Your cushion now covers a broken boiler.” Progress and meaning; nobody is compared, nobody is pushed, and leaving is one tap. It pulls less in the first week and more over a year.") },
      ]}
    />
  );
}
