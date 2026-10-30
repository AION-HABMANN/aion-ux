"use client";

import clsx from "clsx";
import { useEffect, useId, useState } from "react";
import { AppScreen, TaskLab } from "@/components/sim/TaskLab";
import type { LabCtx } from "@/components/sim/TaskLab";
import { tt } from "@/lib/lang";

/**
 * Day 4 · the working products of the study cards (UX-STANDARD 2.16): Pedalo, a made-up bike-sharing app, so no task is answered here. Each lab gives one task and
 * versions of the same screen to use, with time, wrong taps and stress tests (components/sim/TaskLab.tsx). No prices are shown.
 */
const ACC = "#15803D";
const Brand = "Pedalo";
const Done = ({ text }: { text: string }) => <AppScreen brand={Brand} color={ACC}><p className="text-[15px] font-bold">{tt("✓ Done")}</p><p>{text}</p></AppScreen>;
const Map = () => (
  <div aria-hidden className="relative h-36 overflow-hidden rounded-lg bg-[#DCFCE7]">
    <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-white" />
    <div className="absolute inset-y-0 left-1/3 w-3 bg-white" />
    {[[20, 30], [60, 70], [75, 25]].map(([x, y], i) => <span key={i} className="absolute text-[16px]" style={{ left: `${x}%`, top: `${y}%` }}>🚲</span>)}
    <span className="absolute left-[45%] top-[45%] h-3 w-3 rounded-full border-2 border-white bg-[#2563EB]" />
  </div>
);

/* ------------------------------------------------------------------ A1 · looks simple or is intuitive */

function Unlock({ ctx, intuitive }: { ctx: LabCtx; intuitive: boolean }) {
  const [scan, setScan] = useState(false);
  if (ctx.finished) return <Done text={tt("Bike 214 unlocked · ride started")} />;
  const camera = (
    <div className="space-y-1">
      <div className="flex h-32 items-center justify-center rounded-lg bg-[#111827] text-[11px] text-white">{intuitive ? tt("Point the camera at the QR code on the handlebar") : ""}</div>
      <button type="button" onClick={() => ctx.done(tt("Scanned the code"))} className="w-full rounded border border-[#111827] py-1.5">{tt("▣ (hold the phone over the code)")}</button>
    </div>
  );
  return (
    <AppScreen brand={Brand} color={ACC}>
      {scan ? camera : intuitive ? (
        <>
          <Map />
          <p className="text-[13px] font-semibold">{tt("Nearest bike: Pedalo 214 · 80 m · battery 90 %")}</p>
          <button type="button" onClick={() => { setScan(true); ctx.hit(tt("Scan to unlock")); }} className="w-full rounded-lg py-2.5 font-bold text-white" style={{ background: ACC }}>{tt("Scan to unlock")}</button>
          <p className="text-[11.5px] text-[#475569]">{tt("Then point your camera at the QR code on the handlebar.")}</p>
        </>
      ) : (
        <>
          <Map />
          <div className="flex justify-around pt-2">
            {[["⚙", tt("settings")], ["◎", tt("locate me")], ["⊕", tt("unlock")], ["☰", tt("menu")]].map(([icon, what]) => (
              <button key={icon} type="button" aria-label={tt(`Round icon ${icon}`)} onClick={() => (what === tt("unlock") ? (setScan(true), ctx.hit(tt("Guessed the unlock icon"))) : ctx.miss(tt(`The icon was ${what}`)))} className="h-11 w-11 rounded-full border border-[#D1D5DB] text-[18px] text-[#4B5563]">{icon}</button>
            ))}
          </div>
        </>
      )}
    </AppScreen>
  );
}

export function SimpleLab() {
  return (
    <TaskLab
      label={tt("The same Pedalo map screen, designed to look simple and designed to be intuitive · a working product · Case assumption, example company")}
      point={tt("Looking simple is not the same as being intuitive. Few elements and much white space can still leave people guessing what an icon means or what to do next.")}
      task={tt("You are Nina. Unlock the nearest bike.")}
      versions={[
        { id: "simple", label: tt("Looks simple"), render: (ctx) => <Unlock ctx={ctx} intuitive={false} />, insight: tt("In plain words: a map and four round icons without labels. It looks clean, but Nina has to guess which icon unlocks a bike, and the camera opens without a word about what to do.") },
        { id: "intuitive", label: tt("Is intuitive"), render: (ctx) => <Unlock ctx={ctx} intuitive />, insight: tt("In plain words: the nearest bike is named, one labelled button says “Scan to unlock”, and one line says what comes next. Nina knows what to do without thinking about the app.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · twelve equal passes or three recommended (Hick) */

const PASSES = () => [
  [tt("Single ride"), tt("one trip, up to 30 minutes")], [tt("Day pass"), tt("unlimited rides until midnight")], [tt("Week pass"), tt("7 days")], [tt("Month pass"), tt("30 days")],
  [tt("Flex 10"), tt("10 rides, any time")], [tt("Flex 20"), tt("20 rides, any time")], [tt("Tourist 24 h"), tt("24 hours from first ride")], [tt("Tourist 72 h"), tt("72 hours")],
  [tt("Student"), tt("with a student card")], [tt("Senior"), tt("from 65")], [tt("Night"), tt("22:00 to 06:00")], [tt("Weekend"), tt("Saturday and Sunday")],
];
function Passes({ ctx, rec }: { ctx: LabCtx; rec: boolean }) {
  const [all, setAll] = useState(!rec);
  const [sel, setSel] = useState<string | null>(null);
  if (ctx.finished) return <Done text={tt("Single ride bought · unlock any bike in the next 10 minutes")} />;
  const list = PASSES();
  const show = all ? list : list.filter(([n]) => [tt("Single ride"), tt("Day pass"), tt("Month pass")].includes(n));
  return (
    <AppScreen brand={Brand} color={ACC}>
      <p className="text-[14px] font-bold">{tt("Choose a pass")}</p>
      <div className={clsx("grid gap-1", all && !rec ? "grid-cols-3" : "grid-cols-1")}>
        {show.map(([n, d]) => (
          <button key={n} type="button" onClick={() => { setSel(n); ctx.hit(tt(`Looked at ${n}`)); }} className={clsx("rounded border px-2 py-1.5 text-left", sel === n ? "border-[#15803D] bg-[#F0FDF4]" : "border-[#CBD5E1]")}>
            <span className="block font-semibold">{n}</span>
            {(rec || sel === n) && <span className="block text-[11px] text-[#475569]">{rec && !all ? tt(`For you if: ${d}`) : d}</span>}
          </button>
        ))}
      </div>
      {rec && !all && <button type="button" onClick={() => { setAll(true); ctx.miss(tt("Opened all passes")); }} className="text-[12px] underline">{tt("All passes (12)")}</button>}
      <button type="button" disabled={!sel} onClick={() => (sel === tt("Single ride") ? ctx.done(tt("Bought a single ride")) : ctx.miss(tt(`Bought ${sel} instead of a single ride`)))} className="w-full rounded-lg py-2 font-bold text-white disabled:opacity-50" style={{ background: ACC }}>{tt("Buy")}</button>
    </AppScreen>
  );
}

export function ChoiceLab() {
  return (
    <TaskLab
      label={tt("One Pedalo pass page with twelve equal passes and with three recommended passes · a working product · Case assumption, example company")}
      point={tt("The more equally weighted options there are, the longer a decision takes (Hick's law). It is worst when the options are unfamiliar and look alike. Giving the frequent choices priority and grouping the rest one step deeper cuts the time without deleting anything.")}
      task={tt("You are Sam, a visitor. Buy the right pass for one ride, now.")}
      versions={[
        { id: "twelve", label: tt("Twelve equal passes"), render: (ctx) => <Passes ctx={ctx} rec={false} />, insight: tt("In plain words: twelve buttons of the same size with names only. Sam opens several to compare Day, Flex and Tourist, and still is not sure which one suits a single ride. Some people give up here.") },
        { id: "three", label: tt("Three recommended passes"), render: (ctx) => <Passes ctx={ctx} rec />, insight: tt("In plain words: three passes, each with one line on who it is for, and “All passes” below. Sam sees “Single ride: for one trip” and chooses in a second. The other passes are still one tap away.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · where people expect it, near the thumb, the same pattern (Fitts) */

type Exp = { expect: boolean; near: boolean; same: boolean };
function Ride({ ctx, e }: { ctx: LabCtx; e: Exp }) {
  const [secs, setSecs] = useState(754);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || ctx.finished) return;
    const id = window.setInterval(() => setSecs((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [paused, ctx.finished]);
  if (ctx.finished) return <Done text={tt(`Ride ended after ${Math.floor(secs / 60)} min · bike locked`)} />;
  const end = e.expect ? (
    <button type="button" onClick={() => ctx.done(tt("Ended the ride"))} className={clsx("rounded-lg font-bold text-white", e.near ? "w-full py-3 text-[15px]" : "px-2 py-0.5 text-[10px]")} style={{ background: ACC }}>{tt("End ride")}</button>
  ) : (
    <button type="button" onClick={() => ctx.done(tt("Found “finish”"))} className="text-[10px] text-[#6B7280] underline">{tt("finish")}</button>
  );
  return (
    <AppScreen brand={Brand} color={ACC} status={tt("Riding")}>
      {!e.near && <div className="flex justify-end">{end}</div>}
      <p className="text-center text-[28px] font-bold tabular-nums">{`${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`}</p>
      <p className="text-center text-[12px] text-[#475569]">{paused ? tt("Paused · the bike is locked while you shop") : tt("Pedalo 214 · 2.4 km")}</p>
      <div className="flex justify-center">
        {e.same ? (
          <button type="button" onClick={() => { setPaused((p) => !p); ctx.miss(paused ? tt("Resumed") : tt("Paused the ride")); }} className="rounded border border-[#94A3B8] px-3 py-1 text-[12px]">{paused ? tt("Resume") : tt("Pause ride")}</button>
        ) : (
          <button type="button" onClick={() => { setPaused((p) => !p); ctx.miss(tt("“Stop” paused the ride, it did not end it")); }} className="h-16 w-16 rounded-full bg-[#B91C1C] text-[13px] font-bold text-white">{tt("Stop")}</button>
        )}
      </div>
      <div className="h-16" />
      {e.near && end}
    </AppScreen>
  );
}

export function ExpectLab() {
  const v = (id: string, label: string, e: Exp, insight: string) => ({ id, label, render: (ctx: LabCtx) => <Ride ctx={ctx} e={e} />, insight });
  return (
    <TaskLab
      label={tt("A Pedalo ride screen: the End ride button where people expect it, large and near the thumb, and the same pattern on every screen · a working product · Case assumption, example company")}
      point={tt("People act on their mental model: they look where other apps put the main action and expect the same element to work the same everywhere. A target that is large and close is reached faster and missed less often (Fitts's law). Try it with “a small phone” on.")}
      task={tt("You are Nina, at your destination. End the ride.")}
      versions={[
        v("none", tt("None of the three"), { expect: false, near: false, same: false }, tt("In plain words: only a faint word “finish” in a corner, far from the thumb, and a big red round “Stop” that looks like the end but pauses the ride. Nina pays for minutes she did not ride.")),
        v("label", tt("Labelled, but small and far"), { expect: true, near: false, same: true }, tt("In plain words: a labelled “End ride” says what it does, but it is small and at the top. She has to stretch, and sometimes misses.")),
        v("all", tt("All three met"), { expect: true, near: true, same: true }, tt("In plain words: a large labelled “End ride” at the bottom, where her thumb is, looking like the main button on every other screen. She hits it first time.")),
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · remember the code, or the system carries it (working memory) */

function Code({ ctx, carry }: { ctx: LabCtx; carry: boolean }) {
  const [step, setStep] = useState(1);
  const [val, setVal] = useState("");
  const id = useId();
  const CODE = "K7Q4M2";
  if (ctx.finished) return <Done text={tt("Bike K7Q4M2 unlocked")} />;
  return (
    <AppScreen brand={Brand} color={ACC}>
      {step === 1 ? (
        <>
          <p className="text-[13px] font-semibold">{tt("Bike found")}</p>
          <p className="rounded bg-[#F0FDF4] p-2 text-center font-mono text-[20px] tracking-widest">K7Q4M2</p>
          <p className="text-[11.5px] text-[#475569]">{carry ? tt("We will fill in the code for you.") : tt("You will need this code on the next screen.")}</p>
          <button type="button" onClick={() => { setStep(2); ctx.hit(tt("Next")); }} className="w-full rounded-lg py-2 font-bold text-white" style={{ background: ACC }}>{tt("Next")}</button>
        </>
      ) : (
        <>
          <p className="text-[13px] font-semibold">{tt("Unlock")}</p>
          {carry ? (
            <p className="rounded border border-[#15803D] bg-[#F0FDF4] px-2 py-1.5 font-mono">{tt("✓ K7Q4M2 · from your scan")}</p>
          ) : (
            <>
              <label htmlFor={id} className="text-[12px]">{tt("Enter the bike code")}</label>
              <input id={id} value={val} onChange={(e) => setVal(e.target.value.toUpperCase())} autoComplete="off" className="w-full rounded border border-[#94A3B8] px-2 py-1.5 font-mono tracking-widest" />
            </>
          )}
          <button type="button" onClick={() => {
            if (carry || val.replace(/\s|-/g, "") === CODE) ctx.done(tt("Unlocked"));
            else { ctx.miss(tt(`Code “${val || "(empty)"}” is wrong`)); setVal(""); }
          }} className="w-full rounded-lg py-2 font-bold text-white" style={{ background: ACC }}>{tt("Unlock")}</button>
          {!carry && <button type="button" onClick={() => { setStep(1); ctx.miss(tt("Went back to look at the code")); }} className="text-[12px] underline">{tt("← Back")}</button>}
        </>
      )}
    </AppScreen>
  );
}

export function MemoryLab() {
  return (
    <TaskLab
      label={tt("The same Pedalo unlock step: you remember the code, or the system carries it · a working product · Case assumption, example company")}
      point={tt("Working memory holds only a few things at once (Miller's rule; later research says nearer four chunks). Asking people to carry information from one screen to the next raises the load, and with it errors and abandonment. Really try it: read the code once, then type it. Then try with “interrupted by a message”.")}
      task={tt("You are Sam. Unlock the bike with its code.")}
      versions={[
        { id: "remember", label: tt("You have to remember"), render: (ctx) => <Code ctx={ctx} carry={false} />, insight: tt("In plain words: the code was on the previous screen. Six characters without a break, one interruption, and the code is gone; people mistype, go back, or walk away.") },
        { id: "carry", label: tt("The system remembers"), render: (ctx) => <Code ctx={ctx} carry />, insight: tt("In plain words: the code comes from the scan and is already filled in, with a tick that says so. Sam only confirms. Nothing to remember, nothing to mistype.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · the same help topics in three structures */

type Node = { label: string; kids?: Node[] };
const TOPICS = (): Node[] => {
  const g = (label: string, kids: string[]): Node => ({ label, kids: kids.map((k) => ({ label: k })) });
  const riding = g(tt("Riding"), [tt("Unlock a bike"), tt("Lock a bike"), tt("Pause a ride"), tt("Ride too long")]);
  const problems = g(tt("Problems"), [tt("Report a broken bike"), tt("Report a stolen bike"), tt("Bike will not lock"), tt("Report an accident")]);
  const account = g(tt("Account"), [tt("Change email"), tt("Payment method"), tt("Delete account"), tt("Ride history")]);
  const plans = g(tt("Plans"), [tt("Day pass"), tt("Monthly plan"), tt("Student plan"), tt("Pause my plan")]);
  return [riding, problems, account, plans];
};
const leaves = (n: Node): Node[] => (n.kids ? n.kids.flatMap(leaves) : [n]);

function Help({ ctx, kind }: { ctx: LabCtx; kind: "flat" | "two" | "three" }) {
  const [path, setPath] = useState<number[]>([]);
  const groups = TOPICS();
  const root: Node =
    kind === "flat"
      ? { label: "", kids: [0, 2, 1, 3].flatMap((i) => leaves(groups[i])).sort((a, b) => (a.label.length * 7) % 5 - (b.label.length * 7) % 5 || a.label.localeCompare(b.label)) }
      : kind === "two"
        ? { label: "", kids: groups }
        : { label: "", kids: [{ label: tt("Using a bike"), kids: [groups[0], groups[1]] }, { label: tt("My account"), kids: [groups[2], groups[3]] }] };
  let node = root;
  for (const i of path) node = node.kids![i];
  if (ctx.finished) return <Done text={tt(`Found “Report a broken bike” in ${path.length} step(s)`)} />;
  return (
    <AppScreen brand={Brand} color={ACC}>
      <p className="text-[14px] font-bold">{tt("Help")}</p>
      {path.length > 0 && <button type="button" onClick={() => { setPath(path.slice(0, -1)); ctx.hit(tt("Went back")); }} className="text-[12px] underline">{tt("← Back")}</button>}
      <div className="space-y-1">
        {node.kids!.map((k, i) => (
          <button
            key={k.label + i}
            type="button"
            onClick={() => {
              if (k.kids) { setPath([...path, i]); ctx.hit(tt(`Opened ${k.label}`)); }
              else if (k.label === tt("Report a broken bike")) ctx.done(tt("Opened Report a broken bike"));
              else ctx.miss(tt(`Opened ${k.label}`));
            }}
            className="block w-full rounded border border-[#CBD5E1] bg-white px-2 py-1.5 text-left text-[12.5px]"
          >
            {k.label}{k.kids ? " ›" : ""}
          </button>
        ))}
      </div>
    </AppScreen>
  );
}

export function StructureLab() {
  return (
    <TaskLab
      label={tt("The same sixteen Pedalo help topics in three structures · a working product · Case assumption, example company")}
      point={tt("More options cost decision time, and more levels cost steps and the chance to lose the way. In a study of web structures, a medium structure beat both the broadest, shallowest one and a deeper one. Find the same topic in each structure and compare the time and the wrong taps.")}
      task={tt("You are Sam. Your bike has a broken brake. Find “Report a broken bike”.")}
      stresses={["hurry", "ping", "small"]}
      versions={[
        { id: "flat", label: tt("One list of sixteen"), render: (ctx) => <Help ctx={ctx} kind="flat" />, insight: tt("In plain words: no steps, but sixteen topics in no useful order. Sam reads down the list and compares each line with what he needs.") },
        { id: "two", label: tt("Four groups of four"), render: (ctx) => <Help ctx={ctx} kind="two" />, insight: tt("In plain words: four clear group names, then four topics each. Sam decides twice among four things and finds the topic in two steps.") },
        { id: "three", label: tt("Three levels"), render: (ctx) => <Help ctx={ctx} kind="three" />, insight: tt("In plain words: two choices, then two, then four. Every choice is easy, but the extra level adds a step and one more place to take a wrong turn.") },
      ]}
    />
  );
}
