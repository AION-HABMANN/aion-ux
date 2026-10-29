"use client";

import clsx from "clsx";
import { useId, useState } from "react";
import { AppScreen, TaskLab } from "@/components/sim/TaskLab";
import type { LabCtx } from "@/components/sim/TaskLab";
import { tt } from "@/lib/lang";

/**
 * Day 5 · the working products of the study cards (UX-STANDARD 2.16): Ticketo, a made-up cinema and event ticket app, so no task is answered here. Each lab gives
 * one task and versions of the same screen to use, with time, wrong taps and stress tests (components/sim/TaskLab.tsx). No prices are shown.
 */
const ACC = "#B91C1C";
const Brand = "Ticketo";
const Done = ({ text }: { text: string }) => <AppScreen brand={Brand} color="#111827"><p className="text-[15px] font-bold">{tt("✓ Done")}</p><p>{text}</p></AppScreen>;

/* ------------------------------------------------------------------ A1 · Fitts: size, thumb, space */

type Fit = { large: boolean; thumb: boolean; space: boolean };
function Checkout({ ctx, f }: { ctx: LabCtx; f: Fit }) {
  const [cancelled, setCancelled] = useState(false);
  if (ctx.finished) return <Done text={tt("Paid · 2 tickets, The Long Summer, Saturday 20:00")} />;
  const buttons = (
    <div className={clsx("flex", f.space ? "justify-between gap-6" : "gap-0", f.thumb ? "" : "justify-end")}>
      <button type="button" onClick={() => { setCancelled(true); ctx.miss(tt("Hit Cancel: order cancelled")); }} className={clsx("rounded border border-[#6B7280] text-[#374151]", f.large ? "px-3 py-2 text-[12px]" : "px-1.5 py-0.5 text-[10px]")}>{tt("Cancel")}</button>
      <button type="button" onClick={() => (cancelled ? ctx.miss(tt("The order was cancelled; restart")) : ctx.done(tt("Paid")))} className={clsx("rounded font-bold text-white", f.large ? "flex-1 py-3 text-[15px]" : "px-2 py-0.5 text-[10px]")} style={{ background: ACC }}>{tt("Pay")}</button>
    </div>
  );
  return (
    <AppScreen brand={Brand} color="#111827">
      {!f.thumb && buttons}
      <p className="text-[14px] font-bold">{tt("Checkout")}</p>
      <p>{tt("The Long Summer · Saturday 20:00 · Hall 3 · 2 tickets")}</p>
      <p className="text-[11.5px] text-[#475569]">{tt("Seats F7, F8 · tickets in the app")}</p>
      {cancelled && <p className="rounded bg-[#FEF2F2] p-2 text-[12px]">{tt("Your order was cancelled.")} <button type="button" onClick={() => setCancelled(false)} className="underline">{tt("Start again")}</button></p>}
      <div className="h-24" />
      {f.thumb && buttons}
    </AppScreen>
  );
}

export function FittsLab() {
  const v = (id: string, label: string, f: Fit, insight: string) => ({ id, label, render: (ctx: LabCtx) => <Checkout ctx={ctx} f={f} />, insight });
  return (
    <TaskLab
      label={tt("A Ticketo checkout: a larger Pay button, where the thumb reaches, with space between the buttons · a working product · Case assumption, example company")}
      point={tt("The time to hit a target grows with its distance and shrinks with its size (Fitts's law). On a phone held in one hand, the thumb reaches the lower middle easily and the top corners badly; targets close together are easily confused. Try it with “a small phone” and “in a hurry”.")}
      task={tt("You are Leon, holding the phone in one hand. Pay for the two tickets.")}
      versions={[
        v("none", tt("Small, at the top, touching"), { large: false, thumb: false, space: false }, tt("In plain words: Pay is small and sits at the top right, touching Cancel. Leon stretches his thumb, aims, and a slightly wrong tap cancels the order.")),
        v("large", tt("Larger, still at the top"), { large: true, thumb: false, space: false }, tt("In plain words: a larger Pay is easier to hit, but it is still far from the thumb and right next to Cancel.")),
        v("all", tt("Large, near the thumb, with space"), { large: true, thumb: true, space: true }, tt("In plain words: a large Pay in the lower part of the screen, where the thumb already is, with room between it and Cancel. Leon hits it without aiming.")),
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · Hick: everything at once or staged */

const DAYS = () => [tt("Friday"), tt("Saturday"), tt("Sunday")];
const FILMS = () => [tt("The Long Summer"), tt("Night Train"), tt("Paper Moons")];
const TIMES = ["14:30", "17:15", "20:00", "22:30"];
function Showings({ ctx, staged }: { ctx: LabCtx; staged: boolean }) {
  const [day, setDay] = useState<string | null>(null);
  const [film, setFilm] = useState<string | null>(null);
  if (ctx.finished) return <Done text={tt("Booked: The Long Summer, Saturday 20:00")} />;
  const pick = (d: string, fl: string, t: string) => (d === tt("Saturday") && fl === tt("The Long Summer") && t === "20:00" ? ctx.done(tt("Picked the right showing")) : ctx.miss(tt(`Picked ${d} ${t}, ${fl}`)));
  if (!staged)
    return (
      <AppScreen brand={Brand} color="#111827">
        <p className="text-[14px] font-bold">{tt("All showings this week")}</p>
        <div className="space-y-1">
          {DAYS().map((d) => FILMS().map((fl) => (
            <div key={d + fl} className="flex flex-wrap items-center gap-1">
              <span className="w-full text-[9.5px] text-[#4B5563]">{`${d.slice(0, 3)} · ${fl}`}</span>
              {TIMES.map((t) => <button key={t} type="button" onClick={() => pick(d, fl, t)} className="rounded border border-[#D1D5DB] px-1.5 text-[10.5px]">{t}</button>)}
            </div>
          )))}
        </div>
      </AppScreen>
    );
  return (
    <AppScreen brand={Brand} color="#111827">
      <p className="text-[11px] text-[#475569]">{tt(`Step ${!day ? 1 : !film ? 2 : 3} of 3`)}</p>
      {!day && <><p className="font-bold">{tt("Which day?")}</p>{DAYS().map((d) => <button key={d} type="button" onClick={() => { setDay(d); (d === tt("Saturday") ? ctx.hit : ctx.miss)(tt(`Day: ${d}`)); }} className="block w-full rounded border border-[#CBD5E1] px-2 py-2 text-left">{d}</button>)}</>}
      {day && !film && <><p className="font-bold">{tt(`Films on ${day}`)}</p>{FILMS().map((fl) => <button key={fl} type="button" onClick={() => { setFilm(fl); (fl === tt("The Long Summer") ? ctx.hit : ctx.miss)(tt(`Film: ${fl}`)); }} className="block w-full rounded border border-[#CBD5E1] px-2 py-2 text-left">{fl}</button>)}<button type="button" onClick={() => setDay(null)} className="text-[12px] underline">{tt("← Day")}</button></>}
      {day && film && <><p className="font-bold">{tt(`${film} · ${day}`)}</p><div className="grid grid-cols-2 gap-1">{TIMES.map((t) => <button key={t} type="button" onClick={() => pick(day, film, t)} className={clsx("rounded border px-2 py-2", t === "20:00" ? "border-[#B91C1C] font-semibold" : "border-[#CBD5E1]")}>{t}{t === "20:00" ? tt(" · popular") : ""}</button>)}</div><button type="button" onClick={() => setFilm(null)} className="text-[12px] underline">{tt("← Film")}</button></>}
    </AppScreen>
  );
}

export function HickLab() {
  return (
    <TaskLab
      label={tt("The same Ticketo choice: every showing of the week at once, and staged by day, film and time · a working product · Case assumption, example company")}
      point={tt("The more equal options at once, the longer the choice (Hick's law). Fewer options, a clear priority and staged choices cut decision effort; each stage, though, is a step, and too many steps become a hurdle of their own.")}
      task={tt("You are Mara. Book The Long Summer on Saturday at 20:00.")}
      versions={[
        { id: "all", label: tt("Everything at once"), render: (ctx) => <Showings ctx={ctx} staged={false} />, insight: tt("In plain words: thirty-six small time buttons for every film and every day, with tiny labels. Mara scans them all and is not sure which film each time belongs to.") },
        { id: "staged", label: tt("Staged: day, film, time"), render: (ctx) => <Showings ctx={ctx} staged />, insight: tt("In plain words: first three days, then three films, then four times. At each stage Mara chooses between only a few options, and the popular time stands out. Three short steps instead of one long search.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · Miller: chunking and grouping */

function Confirmation({ ctx, chunked }: { ctx: LabCtx; chunked: boolean }) {
  const [code, setCode] = useState("");
  const [seats, setSeats] = useState("");
  const a = useId();
  const b = useId();
  if (ctx.finished) return <Done text={tt("Let in · Hall 3, seats F7 and F8")} />;
  const check = () => {
    const okCode = code.replace(/[\s·.-]/g, "").toUpperCase() === "TK7QM2X9PL4R";
    const okSeats = seats === "F7-F8";
    if (okCode && okSeats) ctx.done(tt("Told the staff the code and the seats"));
    else ctx.miss(tt(okCode ? "Wrong seats" : "Wrong code"));
  };
  return (
    <AppScreen brand={Brand} color="#111827">
      <p className="text-[14px] font-bold">{tt("Your booking")}</p>
      {chunked ? (
        <>
          <p className="rounded bg-[#F3F4F6] p-2 text-center font-mono text-[18px] tracking-wider">TK7Q · M2X9 · PL4R</p>
          <div className="rounded border border-[#D1D5DB] p-2">
            <p><b>{tt("The Long Summer")}</b></p>
            <p>{tt("Saturday 20:00 · Hall 3 · Seats F7, F8")}</p>
          </div>
        </>
      ) : (
        <>
          <p className="text-[12px]">{tt("Hall 3")} · {tt("Booking reference")}: <span className="font-mono">TK7QM2X9PL4R</span></p>
          <p className="text-[11px] text-[#4B5563]">{tt("Thank you for booking with Ticketo! Snacks can be pre-ordered in the app. Parking is available behind the cinema. Saturday 20:00, The Long Summer.")}</p>
          <div className="rounded bg-[#FEF3C7] p-2 text-[11px]">{tt("Rate your booking experience ⭐⭐⭐⭐⭐")}</div>
          <p className="text-[11px] text-[#4B5563]">{tt("Your seats: F7, F8")}</p>
        </>
      )}
      <div className="space-y-1 rounded-lg border-2 border-dashed border-[#9CA3AF] p-2">
        <p className="text-[12px] font-semibold">{tt("At the door, the staff asks:")}</p>
        <label htmlFor={a} className="block text-[11.5px]">{tt("Your booking code")}</label>
        <input id={a} value={code} onChange={(e) => setCode(e.target.value)} autoComplete="off" className="w-full rounded border border-[#9CA3AF] px-2 py-1 font-mono" />
        <label htmlFor={b} className="block text-[11.5px]">{tt("Your seats")}</label>
        <select id={b} value={seats} onChange={(e) => setSeats(e.target.value)} className="w-full rounded border border-[#9CA3AF] px-2 py-1">
          <option value="">{tt("choose")}</option>
          <option value="E7-E8">E7, E8</option>
          <option value="F7-F8">F7, F8</option>
          <option value="F8-F9">F8, F9</option>
        </select>
        <button type="button" onClick={check} className="w-full rounded py-1.5 font-bold text-white" style={{ background: ACC }}>{tt("Show the staff")}</button>
      </div>
    </AppScreen>
  );
}

export function MillerLab() {
  return (
    <TaskLab
      label={tt("The same Ticketo confirmation: a long code and scattered details, or a chunked code with the details in one box · a working product · Case assumption, example company")}
      point={tt("People hold only a few items in mind at once (Miller's rule; later research says nearer four). Chunking and structure make information easier to take in and remember. Read the code and type it for the staff, as you would at a noisy cinema door.")}
      task={tt("You are Leon, at the door. Give the staff your booking code and your seats.")}
      versions={[
        { id: "long", label: tt("A long code, scattered details"), render: (ctx) => <Confirmation ctx={ctx} chunked={false} />, insight: tt("In plain words: twelve characters in one string, and the hall, the time and the seats in three places between thanks, parking and a rating. Leon reads the code twice and loses his place.") },
        { id: "chunked", label: tt("Chunked and grouped"), render: (ctx) => <Confirmation ctx={ctx} chunked />, insight: tt("In plain words: the code in three blocks of four, and the film, the time, the hall and the seats in one box. Leon reads the code out in three parts and sees everything he needs at once.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · the three laws on one menu */

type Laws = { fitts: boolean; hick: boolean; miller: boolean };
const ITEMS = () => [tt("Home"), tt("Films"), tt("Events"), tt("My tickets"), tt("Snacks"), tt("Gift cards"), tt("Cinemas"), tt("Offers"), tt("Settings"), tt("Help"), tt("Account"), tt("Newsletter")];
function Menu({ ctx, l }: { ctx: LabCtx; l: Laws }) {
  const [more, setMore] = useState(false);
  if (ctx.finished) return <Done text={tt("My tickets · Saturday 20:00, The Long Summer")} />;
  const all = ITEMS();
  const top = [tt("Films"), tt("My tickets"), tt("Snacks"), tt("Cinemas")];
  const shown = l.hick && !more ? top : all;
  const btn = (x: string) => <button key={x} type="button" onClick={() => (x === tt("My tickets") ? ctx.done(tt("Opened My tickets")) : ctx.miss(tt(`Opened ${x}`)))} className={clsx("block w-full border-b border-[#E5E7EB] px-2 text-left", l.fitts ? "py-2.5 text-[14px]" : "py-0 text-[10.5px] leading-tight")}>{x}</button>;
  const groups: [string, string[]][] = [[tt("Going to the cinema"), shown.filter((x) => [tt("Films"), tt("Events"), tt("My tickets"), tt("Snacks"), tt("Cinemas")].includes(x))], [tt("Your account"), shown.filter((x) => ![tt("Films"), tt("Events"), tt("My tickets"), tt("Snacks"), tt("Cinemas")].includes(x))]];
  return (
    <AppScreen brand={Brand} color="#111827">
      <p className="text-[14px] font-bold">{tt("Menu")}</p>
      {l.miller ? groups.filter(([, xs]) => xs.length).map(([g, xs]) => <div key={g}><p className="mt-1 text-[11px] font-semibold uppercase text-[#4B5563]">{g}</p>{xs.map(btn)}</div>) : shown.map(btn)}
      {l.hick && !more && <button type="button" onClick={() => { setMore(true); ctx.miss(tt("Opened More")); }} className="text-[12px] underline">{tt("More (8)")}</button>}
    </AppScreen>
  );
}

export function LawsLab() {
  const v = (id: string, label: string, l: Laws, insight: string) => ({ id, label, render: (ctx: LabCtx) => <Menu ctx={ctx} l={l} />, insight });
  return (
    <TaskLab
      label={tt("A Ticketo menu: larger items (Fitts), the four most used (Hick), grouped by meaning (Miller) · a working product · Case assumption, example company")}
      point={tt("Fitts is about the hand, Hick about the decision, Miller about memory. On a real menu they add up: small, many and ungrouped items each add reaction time and each raise the chance of an error. Fixing one law helps; fixing all three changes the menu.")}
      task={tt("You are Mara. Open your tickets.")}
      versions={[
        v("none", tt("None of the laws"), { fitts: false, hick: false, miller: false }, tt("In plain words: twelve thin strips of equal weight and no groups. Mara reads them all and her thumb sometimes opens the one below.")),
        v("fitts", tt("Fitts only"), { fitts: true, hick: false, miller: false }, tt("In plain words: the items are large, so her thumb hits the one she wants, but she still reads twelve of them.")),
        v("all", tt("All three"), { fitts: true, hick: true, miller: true }, tt("In plain words: four large items people use most, in two labelled groups, and the rest one step deeper. She sees “My tickets” at once.")),
      ]}
    />
  );
}
