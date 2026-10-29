"use client";

import clsx from "clsx";
import { useEffect, useId, useState } from "react";
import { AppScreen, TaskLab } from "@/components/sim/TaskLab";
import type { LabCtx } from "@/components/sim/TaskLab";
import { speak } from "@/components/sim/VoiceSim";
import { tt } from "@/lib/lang";

/**
 * Day 13 · the working products of the study cards (UX-STANDARD 2.16): Hearth Energy, a made-up energy supplier, so no task is answered here. Each lab gives one
 * task and versions of the same pages to use, with time, wrong taps, stress tests and a "how did that feel?" after each run (components/sim/TaskLab.tsx). Moving
 * elements stop under reduced motion; loud versions are demonstrations and count nothing. No prices are shown.
 */
const ACC = "#9A3412";
const Brand = "Hearth Energy";
const Done = ({ text }: { text: string }) => <AppScreen brand={Brand} color={ACC}><p className="text-[15px] font-bold">{tt("✓ Done")}</p><p>{text}</p></AppScreen>;
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function useTick(ms: number, on: boolean) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!on || reduced()) return;
    const id = window.setInterval(() => setT((x) => x + 1), ms);
    return () => window.clearInterval(id);
  }, [ms, on]);
  return t;
}

/* ------------------------------------------------------------------ A1 · one start page, three lenses, and designed for all three */

function Reading({ ctx }: { ctx: LabCtx }) {
  const id = useId();
  const [v, setV] = useState("");
  return (
    <div className="space-y-1 rounded bg-[#FFF7ED] p-2">
      <label htmlFor={id} className="text-[12px] font-semibold">{tt("Meter reading (kWh)")}</label>
      <input id={id} value={v} onChange={(e) => setV(e.target.value)} inputMode="numeric" className="w-full rounded border border-[#94A3B8] px-2 py-1" />
      <button type="button" onClick={() => (/^\d{4,6}$/.test(v) ? ctx.done(tt("Reading sent")) : ctx.miss(tt("Reading needs 4 to 6 digits")))} className="w-full rounded py-1.5 font-bold text-white" style={{ background: ACC }}>{tt("Send meter reading")}</button>
      <p className="text-[11px] text-[#475569]">{tt("Your meter shows 48213.")}</p>
    </div>
  );
}

function Start({ ctx, lens }: { ctx: LabCtx; lens: "ayo" | "mirko" | "tilda" | "all" }) {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState(false);
  const [wall, setWall] = useState(false);
  const t = useTick(700, lens === "ayo");
  useEffect(() => {
    if (lens !== "ayo") return;
    const id = window.setTimeout(() => setChat(true), 2500);
    return () => window.clearTimeout(id);
  }, [lens]);
  if (ctx.finished) return <Done text={tt("Meter reading 48213 sent · thank you")} />;
  if (lens === "all")
    return (
      <AppScreen brand={Brand} color={ACC}>
        <p className="text-[15px] font-bold">{tt("What would you like to do?")}</p>
        {!open ? (
          <>
            <button type="button" onClick={() => { setOpen(true); ctx.hit(tt("Send meter reading")); }} className="block w-full rounded border border-[#9A3412] px-2 py-2 text-left font-semibold">{tt("📟 Send meter reading · due by 31 May")}</button>
            <button type="button" onClick={() => ctx.miss(tt("Opened My bills"))} className="block w-full rounded border border-[#CBD5E1] px-2 py-2 text-left">{tt("🧾 My bills")}</button>
            <button type="button" onClick={() => ctx.miss(tt("Opened Moving house"))} className="block w-full rounded border border-[#CBD5E1] px-2 py-2 text-left">{tt("🏠 Moving house")}</button>
          </>
        ) : <Reading ctx={ctx} />}
      </AppScreen>
    );
  return (
    <AppScreen brand={Brand} color={ACC}>
      {lens === "ayo" && (
        <>
          <div className="overflow-hidden whitespace-nowrap rounded bg-[#FEF3C7] py-1 text-[11px]"><span style={{ marginLeft: `${-(t % 30) * 8}px` }}>{tt("⚡ NEW: Smart thermostat offer · Refer a friend · Green tariff 2.0 · Win a heat pump · ⚡ NEW: Smart thermostat offer · Refer a friend")}</span></div>
          <div className="grid grid-cols-3 gap-1">{[tt("Offers"), tt("Win!"), tt("Green"), tt("Blog"), tt("App"), tt("Refer")].map((x, i) => <button key={x} type="button" onClick={() => ctx.miss(tt(`Opened ${x}`))} className="rounded py-2 text-[11px] text-white" style={{ background: ["#9A3412", "#1D4ED8", "#15803D", "#7E22CE", "#BE185D", "#B45309"][i] }}>{x}</button>)}</div>
          <p className="text-[10.5px] text-[#6B7280]"><button type="button" onClick={() => { setOpen(true); ctx.hit(tt("Found the small line")); }} className="underline">{tt("Meter reading due")}</button></p>
          {chat && <div className="rounded-lg bg-[#1D4ED8] p-2 text-[12px] text-white">{tt("💬 Hi! I'm Sparky. Can I help you save money today?")} <button type="button" onClick={() => { setChat(false); ctx.miss(tt("Closed the chat bubble")); }} className="ml-1 underline">{tt("close")}</button></div>}
        </>
      )}
      {lens === "mirko" && (
        <>
          <div className="flex justify-around">{["⚡", "📈", "🔔", "⚙"].map((x) => <button key={x} type="button" aria-label={tt(`Icon ${x}`)} onClick={() => (x === "📈" ? (setOpen(true), ctx.hit(tt("Guessed the icon"))) : ctx.miss(tt(`Icon ${x}: not what it seemed`)))} className="h-11 w-11 rounded-full border border-[#CBD5E1] text-[18px]">{x}</button>)}</div>
          <p className="text-center text-[22px] font-bold">{tt("3")}</p>
          <p className="text-center text-[10.5px] text-[#6B7280]">{tt("(three what? It doesn't say.)")}</p>
        </>
      )}
      {lens === "tilda" && (
        <>
          <p className="text-[10px] text-[#6B7280]"><button type="button" onClick={() => { setWall(true); ctx.hit(tt("Opened the small grey line")); }} className="underline">{tt("Information about your meter reading obligations")}</button></p>
          {wall && <p className="text-justify text-[10.5px] leading-tight">{tt("Pursuant to the supply conditions, the customer is obliged to provide meter readings at the request of the supplier within the period specified in the request; failing this, consumption will be estimated in accordance with the applicable regulations, and the submission can be made via the online customer area, by post or by telephone, whereby the online submission is recommended, for which purpose please")} <button type="button" onClick={() => { setOpen(true); ctx.hit(tt("Found the link in the text")); }} className="underline">{tt("click here")}</button>.</p>}
        </>
      )}
      {open && <Reading ctx={ctx} />}
    </AppScreen>
  );
}

export function LensLab() {
  const v = (id: "ayo" | "mirko" | "tilda" | "all", label: string, insight: string) => ({ id, label, render: (ctx: LabCtx) => <Start ctx={ctx} lens={id} />, insight });
  return (
    <TaskLab
      label={tt("Hearth Energy's start page seen through three lenses, and designed for all three · a working product · demonstration · Case assumption, example company")}
      point={tt("Neurodivergent people meet the same page differently: what overloads one confuses another and exhausts a third. Each lens shows the barrier that hits hardest; a page designed for all three is calmer, labelled and plain, and it is better for everyone.")}
      task={tt("Send your meter reading. The meter shows 48213.")}
      feel={[tt("exhausted"), tt("easy")]}
      versions={[
        v("ayo", tt("Ayo · ADHD"), tt("In plain words: a moving ticker, six loud tiles and a chat bubble that pops up, while the task is the smallest line. Ayo starts three things and finishes none.")),
        v("mirko", tt("Mirko · autism"), tt("In plain words: icons without words and a number without meaning. Mirko cannot predict what a tap will do, so he does not tap.")),
        v("tilda", tt("Tilda · dyslexia"), tt("In plain words: the key line is tiny and grey and leads to a wall of justified text with “click here” at its end. Tilda reads slowly and gives the task to someone else.")),
        v("all", tt("Designed for all three"), tt("In plain words: one question, three labelled choices, the due date in words, no motion. Nothing special for anyone, and calmer for everyone.")),
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · a dial from calm to overloaded (demonstration) */

function Busy({ ctx, level }: { ctx: LabCtx; level: 0 | 1 | 2 }) {
  const t = useTick(600, level === 2);
  if (ctx.finished) return <Done text={tt("Next bill: 14 June")} />;
  return (
    <AppScreen brand={Brand} color={ACC}>
      {level >= 1 && <div className="rounded py-1 text-center text-[12px] font-bold text-white" style={{ background: level === 2 && t % 2 ? "#1D4ED8" : "#B91C1C" }}>{tt("🔥 WINTER DEAL · ENDS SOON")}</div>}
      {level === 2 && <div className="grid grid-cols-3 gap-1">{[tt("Win"), tt("Refer"), tt("Quiz"), tt("App"), tt("Blog"), tt("Shop")].map((x, i) => <button key={x} type="button" onClick={() => ctx.miss(tt(`Opened ${x}`))} className="rounded py-1.5 text-[10.5px] text-white" style={{ background: ["#7E22CE", "#15803D", "#B45309", "#1D4ED8", "#BE185D", "#0F766E"][i] }}>{x}</button>)}</div>}
      <p className="font-bold">{tt("Hello, Pia")}</p>
      <div className={clsx("grid gap-1", level === 2 ? "grid-cols-3" : "grid-cols-1")}>
        {[tt("Your usage"), tt("Your tariff"), tt("Your bill")].map((x) => <button key={x} type="button" onClick={() => (x === tt("Your bill") ? ctx.done(tt("Found the next bill date")) : ctx.miss(tt(`Opened ${x}`)))} className={clsx("rounded border px-2 text-left", level === 2 ? "py-1 text-[10.5px]" : "py-2")}>{x}{x === tt("Your bill") && level < 2 ? tt(" · next on 14 June") : ""}</button>)}
      </div>
      {level >= 1 && <p className="text-[11px] text-[#475569]">{tt("Tip: switch to paperless billing and plant a tree 🌳")}</p>}
      {level === 2 && <div className="rounded-full bg-[#1D4ED8] px-3 py-1 text-[11px] text-white">{tt("💬 Need help? Chat now!")}</div>}
    </AppScreen>
  );
}

export function StimulusLab() {
  return (
    <TaskLab
      label={tt("The Hearth Energy start page from calm to overloaded · a working product · demonstration · Case assumption, example company")}
      point={tt("Every colour, movement, banner and bubble is a stimulus that competes for attention. For people who filter stimuli less, a busy page is not just untidy but exhausting. Turn the dial and do the same small task. The overloaded version is a demonstration.")}
      task={tt("You are Pia. Find out when your next bill comes.")}
      feel={[tt("overwhelmed"), tt("calm")]}
      versions={[
        { id: "calm", label: tt("Calm"), render: (ctx) => <Busy ctx={ctx} level={0} />, insight: tt("In plain words: a greeting and three labelled tasks, one with the date. Pia sees it at once.") },
        { id: "some", label: tt("Some stimuli"), render: (ctx) => <Busy ctx={ctx} level={1} />, insight: tt("In plain words: a red banner and a tip join in. Still usable, but the eye goes to the banner first.") },
        { id: "over", label: tt("Overloaded"), render: (ctx) => <Busy ctx={ctx} level={2} />, insight: tt("In plain words: a flashing banner, six coloured tiles, small tasks and a chat bubble. The date is no longer on the start page at all.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · one long form or three steps */

function Move({ ctx, steps }: { ctx: LabCtx; steps: boolean }) {
  const [vals, setVals] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);
  const ids = { date: useId(), addr: useId(), meter: useId() };
  if (ctx.finished) return <Done text={tt("Move registered · we'll send your final bill")} />;
  const need: [keyof typeof ids, string, string][] = [["date", tt("Moving date"), tt("e.g. 30 June")], ["addr", tt("New address"), tt("street, number, town")], ["meter", tt("Final meter reading"), tt("from your meter")]];
  const field = ([k, l, ph]: [keyof typeof ids, string, string]) => (
    <div key={k}>
      <label htmlFor={ids[k]} className="block text-[12px] font-semibold">{l} *</label>
      <input id={ids[k]} value={vals[k] ?? ""} placeholder={ph} onChange={(e) => setVals((v) => ({ ...v, [k]: e.target.value }))} className="w-full rounded border border-[#94A3B8] px-2 py-1" />
    </div>
  );
  const filled = (k: string) => (vals[k] ?? "").trim().length > 1;
  const submit = () => (need.every(([k]) => filled(k)) ? ctx.done(tt("All required fields filled")) : ctx.miss(tt(`Missing: ${need.filter(([k]) => !filled(k)).map(([, l]) => l).join(", ")}`)));
  if (!steps) {
    const filler = [tt("Customer number"), tt("Title"), tt("First name"), tt("Last name"), tt("Old address"), tt("E-mail"), tt("Phone"), tt("Meter number"), tt("Bank details")];
    return (
      <AppScreen brand={Brand} color={ACC}>
        <p className="font-bold">{tt("Moving house · all fields marked * are required")}</p>
        <div className="max-h-64 space-y-1 overflow-y-auto pr-1 text-[11.5px]">
          {filler.slice(0, 3).map((f) => <p key={f} className="rounded bg-[#F1F5F9] px-2 py-1">{tt(`${f}: (filled in)`)}</p>)}
          {field(need[0])}
          {filler.slice(3, 6).map((f) => <p key={f} className="rounded bg-[#F1F5F9] px-2 py-1">{tt(`${f}: (filled in)`)}</p>)}
          {field(need[1])}
          {filler.slice(6).map((f) => <p key={f} className="rounded bg-[#F1F5F9] px-2 py-1">{tt(`${f}: (filled in)`)}</p>)}
          {field(need[2])}
        </div>
        <button type="button" onClick={submit} className="w-full rounded-lg py-2 font-bold text-white" style={{ background: ACC }}>{tt("Submit")}</button>
      </AppScreen>
    );
  }
  return (
    <AppScreen brand={Brand} color={ACC}>
      <p className="text-[11px] text-[#475569]">{tt(`Step ${step} of 3`)}</p>
      {field(need[step - 1])}
      <button type="button" onClick={() => { if (!filled(need[step - 1][0])) return ctx.miss(tt("Empty field")); ctx.hit(tt(`${need[step - 1][1]} entered`)); if (step < 3) setStep(step + 1); else submit(); }} className="w-full rounded-lg py-2 font-bold text-white" style={{ background: ACC }}>{step < 3 ? tt(`Next: ${need[step][1].toLowerCase()}`) : tt("Send")}</button>
    </AppScreen>
  );
}

export function StepsLab() {
  return (
    <TaskLab
      label={tt("Moving house at Hearth Energy as one long form or as three steps · a working product · Case assumption, example company")}
      point={tt("A long form asks people to hold their place while they search for what is still missing. In steps, the same fields come one at a time, with a position and a button that says what comes next. Try both with “interrupted by a message”.")}
      task={tt("You are Ayo, moving on 30 June to 4 Mill Lane, Linden. Your meter shows 48213. Register the move.")}
      feel={[tt("lost my place"), tt("easy to follow")]}
      versions={[
        { id: "long", label: tt("One long form"), render: (ctx) => <Move ctx={ctx} steps={false} />, insight: tt("In plain words: twelve fields at once and the three that still need him scattered between them. Ayo starts at the top, gets distracted at field five, and cannot find where he was.") },
        { id: "steps", label: tt("Three steps"), render: (ctx) => <Move ctx={ctx} steps />, insight: tt("In plain words: one question at a time, a position (step 1 of 3) and a button that says what comes next. The same information, in pieces anyone can hold.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · consistent or inconsistent pages */

function Pages({ ctx, same }: { ctx: LabCtx; same: boolean }) {
  const [page, setPage] = useState(0);
  if (ctx.finished) return <Done text={tt("Reading sent · bill downloaded · move reported")} />;
  const tasks = [tt("Send meter reading"), tt("Download bill"), tt("Report your move")];
  const odd = [[tt("Go"), "top"], [tt("OK"), "left"], [tt("Let's go!"), "bottom"]];
  const next = () => { ctx.hit(tt(`Done: ${tasks[page]}`)); if (page < 2) setPage(page + 1); else ctx.done(tt("All three pages done")); };
  const menu = <div className="flex gap-2 text-[11px] text-[#475569]">{[tt("Home"), tt("Bills"), tt("Help")].map((m) => <button key={m} type="button" onClick={() => ctx.miss(tt(`Opened ${m}`))}>{m}</button>)}</div>;
  const decoy = <button type="button" onClick={() => ctx.miss(tt("Tapped the wrong button"))} className="rounded border border-[#CBD5E1] px-2 py-1 text-[12px]">{tt("Back")}</button>;
  if (same)
    return (
      <AppScreen brand={Brand} color={ACC}>
        {menu}
        <p className="font-bold">{tasks[page]}</p>
        <p className="text-[11.5px] text-[#475569]">{tt(`Page ${page + 1} of 3`)}</p>
        <div className="flex justify-between">{decoy}<button type="button" onClick={next} className="rounded px-3 py-1 font-bold text-white" style={{ background: ACC }}>{tasks[page]}</button></div>
      </AppScreen>
    );
  const [label, pos] = odd[page];
  const main = <button type="button" onClick={next} className="rounded border border-[#64748B] px-3 py-1 text-[12px]">{label}</button>;
  return (
    <AppScreen brand={Brand} color={ACC}>
      <div className={clsx("flex gap-2", pos === "left" ? "flex-row" : "flex-col")}>
        {pos !== "bottom" && <div className={pos === "left" ? "w-16 shrink-0" : ""}>{menu}</div>}
        <div className="flex-1 space-y-2">
          {pos === "top" && <div className="flex justify-end">{main}</div>}
          <p className="font-bold">{tasks[page]}</p>
          <div className="flex gap-2">{decoy}{pos === "left" && main}</div>
        </div>
      </div>
      {pos === "bottom" && <div className="pt-8">{menu}{main}</div>}
    </AppScreen>
  );
}

export function PredictLab() {
  return (
    <TaskLab
      label={tt("Three Hearth Energy pages built inconsistently and consistently · a working product · Case assumption, example company")}
      point={tt("Predictability lets people act without checking every page again. When the menu moves and the main button changes name and place, each page has to be learned anew, which costs everyone time and stops some people altogether.")}
      task={tt("You are Mirko. On three pages in a row: send your meter reading, download your bill, report your move.")}
      feel={[tt("unpredictable"), tt("I knew what to expect")]}
      versions={[
        { id: "odd", label: tt("Inconsistent"), render: (ctx) => <Pages ctx={ctx} same={false} />, insight: tt("In plain words: the menu moves from top to left to bottom; the main button says “Go”, “OK” and “Let's go!” and moves too. Mirko has to relearn every page.") },
        { id: "same", label: tt("Consistent"), render: (ctx) => <Pages ctx={ctx} same />, insight: tt("In plain words: the menu always at the top, the main button always on the right, and it says what it does. What Mirko learnt on the first page works on the next two.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A5 · five assistive technologies on one notice */

function Notice({ ctx }: { ctx: LabCtx }) {
  const [at, setAt] = useState<string[]>([]);
  const has = (k: string) => at.includes(k);
  const toggle = (k: string) => { setAt((a) => (a.includes(k) ? a.filter((x) => x !== k) : [...a, k])); ctx.hit(tt(`Switched ${k}`)); };
  const text = tt("Meter exchange. Our technician will replace your meter on Tuesday 10 June between 8 and 12. Please make sure the meter is accessible. The power will be off for about 30 minutes.");
  return (
    <AppScreen brand={Brand} color={ACC}>
      <div className="flex flex-wrap gap-1 text-[11px]">
        {[["sr", tt("Screen reader")], ["tts", tt("Read aloud")], ["reader", tt("Reader view")], ["zoom", tt("Text 200 %")], ["calm", tt("Stimulus filter")]].map(([k, l]) => <button key={k} type="button" aria-pressed={has(k)} onClick={() => { toggle(k); if (k === "tts" && !has("tts")) speak(text); }} className={clsx("rounded border px-1.5 py-0.5", has(k) ? "border-[#9A3412] bg-[#FFEDD5] font-semibold" : "border-[#CBD5E1]")}>{l}</button>)}
      </div>
      {has("sr") ? (
        <ul className="space-y-0.5 rounded bg-[#0F172A] p-2 font-mono text-[11.5px] text-white">
          <li>{tt("“Heading level 1: Meter exchange”")}</li>
          <li>{tt("“Our technician will replace your meter on Tuesday 10 June between 8 and 12 …”")}</li>
          <li>{tt("“Button: Change the appointment”")}</li>
        </ul>
      ) : (
        <div className={clsx("space-y-2", has("calm") && "saturate-50")}>
          {!has("reader") && !has("calm") && <div className="rounded bg-gradient-to-r from-[#C2410C] to-[#BE185D] p-2 text-[12px] font-bold text-white">{tt("🔥 Switch to Green Tariff 2.0 and save!")}</div>}
          <p className={clsx("font-bold", has("zoom") ? "text-[22px]" : "text-[14px]")}>{tt("Meter exchange")}</p>
          <p className={has("zoom") ? "text-[20px] leading-snug" : "text-[12px]"} style={has("reader") ? { fontFamily: "Georgia, serif" } : undefined}>{text}</p>
          {!has("reader") && !has("calm") && <div className="grid grid-cols-3 gap-1">{[tt("Blog"), tt("Quiz"), tt("App")].map((x) => <span key={x} className="rounded bg-[#E0E7FF] py-1 text-center text-[10.5px]">{x}</span>)}</div>}
        </div>
      )}
      <p className="pt-1 text-[12px] font-semibold">{tt("When does the technician come?")}</p>
      <div className="grid grid-cols-2 gap-1">
        {[tt("Mon 9 June, 8 to 12"), tt("Tue 10 June, 8 to 12"), tt("Tue 10 June, 12 to 16"), tt("Wed 11 June, 8 to 12")].map((o) => <button key={o} type="button" onClick={() => (o === tt("Tue 10 June, 8 to 12") ? ctx.done(tt(`Answered with: ${at.join(", ") || "no technology"}`)) : ctx.miss(tt(`Answered ${o}`)))} className="rounded border border-[#CBD5E1] py-1 text-[11.5px]">{o}</button>)}
      </div>
    </AppScreen>
  );
}

export function ATLab() {
  return (
    <TaskLab
      label={tt("The same Hearth Energy notice through five assistive technologies · a working product · Case assumption, example company")}
      point={tt("Assistive technologies only work if the content is built for them: real headings and named buttons for a screen reader, real text for reading aloud, reader view and zoom, and a calm core for a stimulus filter. Switch them on one by one and answer the question.")}
      task={tt("You are Tilda. Using any of the tools, find out when the technician comes.")}
      stresses={["eyes", "sun", "ping"]}
      versions={[{ id: "at", label: tt("The notice with its tools"), render: (ctx) => <Notice ctx={ctx} />, insight: tt("In plain words: the screen reader lists the heading and the named button; read-aloud speaks the notice; reader view and the stimulus filter remove the advert and the tiles; text at 200 % still wraps. Each works because the notice is real, structured text.") }]}
    />
  );
}
