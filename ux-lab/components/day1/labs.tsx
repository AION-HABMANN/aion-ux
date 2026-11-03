"use client";

import clsx from "clsx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AppScreen, TaskLab } from "@/components/sim/TaskLab";
import type { LabCtx } from "@/components/sim/TaskLab";
import { tt } from "@/lib/lang";

/**
 * Day 1 · the working products of the study cards (UX-STANDARD 2.16): Nordwind, a made-up travel-booking app, so no task is answered here. Each lab gives the
 * learner one task and two to four versions of the same screen to use, with time, wrong taps and stress tests (components/sim/TaskLab.tsx). The insight of each
 * version is the card's own text. Prices and real card numbers are left out; nothing is stored.
 */
const ACC = "#2F5D8A";
const Brand = "Nordwind";

function Stepper({ n, set, faint }: { n: number; set: (n: number) => void; faint?: boolean }) {
  return (
    <div className={clsx("flex items-center gap-2", faint ? "text-[10px] text-[#767676]" : "text-[13px] font-semibold")}>
      <span>{tt("Travellers")}</span>
      <button type="button" aria-label={tt("One traveller fewer")} onClick={() => set(Math.max(1, n - 1))} className={clsx("rounded border", faint ? "h-5 w-5 border-[#E5E5E5]" : "h-8 w-8 border-[#94A3B8]")}>−</button>
      <span aria-live="polite">{n}</span>
      <button type="button" aria-label={tt("One traveller more")} onClick={() => set(n + 1)} className={clsx("rounded border", faint ? "h-5 w-5 border-[#E5E5E5]" : "h-8 w-8 border-[#94A3B8]")}>+</button>
    </div>
  );
}

/* ------------------------------------------------------------------ A1 · designed to look good, or to work */

function Booking({ ctx, looks }: { ctx: LabCtx; looks: boolean }) {
  const [n, setN] = useState(1);
  const [sheet, setSheet] = useState<"" | "details" | "share">("");
  const book = () => {
    if (n !== 2) return ctx.miss(tt(`Booked for ${n} traveller(s), not two`, `Für ${n} Reisende gebucht, nicht für zwei`));
    ctx.done(tt("Booked: Lisbon, 12 to 15 May, two travellers"));
  };
  if (ctx.finished) return <AppScreen brand={Brand} color={ACC}><p className="text-[15px] font-bold">{tt("✓ Booking received")}</p><p>{tt("Lisbon · 12 to 15 May · two travellers")}</p></AppScreen>;
  return (
    <AppScreen brand={Brand} color={ACC}>
      {looks ? (
        <>
          <button type="button" onClick={() => ctx.miss(tt("Tapped the photo"))} className="relative flex h-40 w-full items-end overflow-hidden rounded-lg bg-gradient-to-br from-[#F59E0B] via-[#EA580C] to-[#7C2D12] p-3 text-left">
            <span className="absolute right-3 top-2 text-[34px]" aria-hidden>🌇</span>
            <span className="text-[24px] font-black leading-none text-white drop-shadow">{tt("Discover Lisbon")}</span>
          </button>
          <p className="text-[9.5px] text-[#767676]">{tt("3 nights · 12 to 15 May · free cancellation until 1 May")}</p>
          <Stepper n={n} set={(v) => { setN(v); ctx.hit(tt(`Travellers: ${v}`, `Reisende: ${v}`)); }} faint />
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[tt("Details"), tt("Book"), tt("Share")].map((l) => (
              <button key={l} type="button" onClick={() => (l === tt("Book") ? book() : (setSheet(l === tt("Details") ? "details" : "share"), ctx.miss(tt(`Opened ${l}`, `${l} geöffnet`))))} className="rounded-full border border-[#D4D4D4] py-1.5 text-[11px] text-[#737373]">{l}</button>
            ))}
          </div>
          {sheet && <div className="rounded-lg bg-[#F5F5F5] p-2 text-[11px] text-[#525252]">{sheet === "details" ? tt("Hotel Alfama · breakfast · flight from your city · transfer") : tt("Share via message, mail or link")}<button type="button" onClick={() => setSheet("")} className="ml-2 underline">{tt("Close")}</button></div>}
        </>
      ) : (
        <>
          <div className="rounded-lg bg-[#EEF2F7] p-3">
            <p className="text-[17px] font-bold">{tt("Lisbon · 3 nights")}</p>
            <p className="text-[13px]">{tt("12 to 15 May · free cancellation until 1 May")}</p>
            <p className="text-[12px] text-[#475569]">{tt("Hotel and flight")}</p>
          </div>
          <Stepper n={n} set={(v) => { setN(v); ctx.hit(tt(`Travellers: ${v}`, `Reisende: ${v}`)); }} />
          <button type="button" onClick={book} className="w-full rounded-lg py-3 text-[15px] font-bold text-white" style={{ background: ACC }}>{tt("Book now")}</button>
          <p className="text-center text-[11px] text-[#475569]">
            <button type="button" onClick={() => ctx.miss(tt("Opened Details"))} className="underline">{tt("Details")}</button> · <button type="button" onClick={() => ctx.miss(tt("Opened Share"))} className="underline">{tt("Share")}</button>
          </p>
        </>
      )}
    </AppScreen>
  );
}

export function LooksWorksLab() {
  return (
    <TaskLab
      label={tt("The same Nordwind booking page, designed to look good or to work · a working product · Case assumption, example company")}
      point={tt("Good design is not decoration. A page designed only to look good can be beautiful and still slow people down; a page designed to work leads the eye to what matters. Use both and feel the difference.")}
      task={tt("You are Mia. Book the Lisbon trip, 12 to 15 May, for two travellers.")}
      versions={[
        { id: "looks", label: tt("Designed to look good"), render: (ctx) => <Booking ctx={ctx} looks />, insight: tt("In plain words: Mia's eye goes to the big photo first. The dates are in thin grey type, the traveller count is a tiny grey control, and “Book” is one of three equal pale buttons. She has to search before she can act.") },
        { id: "works", label: tt("Designed to work"), render: (ctx) => <Booking ctx={ctx} looks={false} />, insight: tt("In plain words: Mia sees the trip, the dates and the traveller count at once, and one strong button. She knows what to do in a second. The page is still pleasant; it just puts the task first.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · the strongest signal against the goal */

function TripPage({ ctx, mode }: { ctx: LabCtx; mode: "loud" | "goal" | "both" }) {
  const [blink, setBlink] = useState(false);
  const [picker, setPicker] = useState(false);
  useEffect(() => {
    if (mode === "goal" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setBlink((b) => !b), 600);
    return () => window.clearInterval(id);
  }, [mode]);
  if (ctx.finished) return <AppScreen brand={Brand} color={ACC}><p className="text-[15px] font-bold">{tt("✓ Date changed")}</p><p>{tt("Lisbon · now from 13 May")}</p></AppScreen>;
  const banner = (big: boolean) => (
    <button type="button" onClick={() => ctx.miss(tt("Tapped the sale banner"))} className={clsx("w-full rounded font-black text-white", big ? "py-4 text-[17px]" : "py-2 text-[12px]")} style={{ background: blink ? "#B91C1C" : "#C2410C" }}>
      {tt("FLASH SALE · 2 HOURS LEFT · TAP NOW")}
    </button>
  );
  return (
    <AppScreen brand={Brand} color={ACC}>
      {mode !== "goal" && banner(mode === "loud")}
      <p className="text-[14px] font-bold">{tt("Your trip: Lisbon, 12 May")}</p>
      <p className="text-[11.5px] text-[#475569]">{tt("Hotel Alfama · 3 nights · two travellers")}</p>
      {mode === "goal" || mode === "both" ? (
        <div className="space-y-1 rounded-lg border border-[#CBD5E1] p-2">
          <p className="text-[12px] font-semibold">{tt("Manage your booking")}</p>
          <button type="button" onClick={() => { setPicker(true); ctx.hit(tt("Found “Change booking”")); }} className="w-full rounded border border-[#2F5D8A] py-1.5 font-semibold text-[#2F5D8A]">{tt("Change booking")}</button>
          <div className="grid grid-cols-2 gap-1"><button type="button" onClick={() => ctx.miss(tt("Opened Cancel"))} className="rounded border border-[#CBD5E1] py-1">{tt("Cancel")}</button><button type="button" onClick={() => ctx.miss(tt("Opened Help"))} className="rounded border border-[#CBD5E1] py-1">{tt("Help")}</button></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            {[tt("Extras"), tt("Upgrade your room"), tt("Rent a car"), tt("Tours")].map((l) => <button key={l} type="button" onClick={() => ctx.miss(tt(`Opened ${l}`, `${l} geöffnet`))} className="rounded bg-[#F1F5F9] py-3 text-[12px]">{l}</button>)}
          </div>
          <p className="text-[10px] text-[#64748B]">
            <button type="button" onClick={() => { setPicker(true); ctx.hit(tt("Found “Change booking”")); }} className="text-[#2F5D8A] underline">{tt("Change booking")}</button> · <button type="button" onClick={() => ctx.miss(tt("Opened Cancel"))}>{tt("Cancel")}</button> · <button type="button" onClick={() => ctx.miss(tt("Opened Help"))}>{tt("Help")}</button>
          </p>
        </>
      )}
      {picker && (
        <div className="space-y-1 rounded-lg bg-[#EEF2F7] p-2">
          <p className="font-semibold">{tt("New start date")}</p>
          <div className="flex gap-1">{[12, 13, 14].map((d) => <button key={d} type="button" onClick={() => (d === 13 ? ctx.done(tt("Changed to 13 May")) : ctx.miss(tt(`Picked ${d} May`, `${d}. Mai gewählt`)))} className="flex-1 rounded border border-[#94A3B8] bg-white py-1.5">{tt(`${d} May`, `${d}. Mai`)}</button>)}</div>
        </div>
      )}
    </AppScreen>
  );
}

export function AttentionLab() {
  return (
    <TaskLab
      label={tt("One Nordwind trip page in three versions: the strongest signal, the goal, or both · a working product · Case assumption, example company")}
      point={tt("Two forces steer attention at once. A strong signal pulls the eye by itself (bottom-up); the person's goal pulls it too (top-down). When they point to different places, the person is slowed down or led astray. Do the task and feel both pulls.")}
      task={tt("You are Mia. Move the start of your Lisbon trip to 13 May.")}
      versions={[
        { id: "loud", label: tt("The strongest signal wins"), render: (ctx) => <TripPage ctx={ctx} mode="loud" />, insight: tt("In plain words: the red, flashing sale banner differs most from everything around it, so the eye lands on it first, whether or not Mia wants a sale. The small link she needs sits at the bottom among other small words. This is bottom-up attention working against her.") },
        { id: "goal", label: tt("Mia's goal leads"), render: (ctx) => <TripPage ctx={ctx} mode="goal" />, insight: tt("In plain words: Mia came to change her booking, and the page has a “Manage your booking” box with that exact word on a clear button. Her goal and the page point to the same place. This is top-down attention, supported.") },
        { id: "both", label: tt("Both pull at once"), render: (ctx) => <TripPage ctx={ctx} mode="both" />, insight: tt("In plain words: the clear button is there, but the banner keeps pulling her eye. She needs a little longer, and some people tap the banner by mistake. When the strongest signal is not the task, it competes with the task.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · where am I, one main action, the menu where people expect it */

type Aims = { where: boolean; one: boolean; menu: boolean };
function CheckIn({ ctx, aims }: { ctx: LabCtx; aims: Aims }) {
  const [step, setStep] = useState(2);
  const [seat, setSeat] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const seats = ["11A", "11B", "11C", "11D", "11E", "11F"];
  const next = () => {
    if (!seat) return ctx.miss(tt("Continued without a seat"));
    setStep(3);
    ctx.hit(tt(`Seat ${seat} chosen`, `Sitz ${seat} gewählt`));
  };
  return (
    <AppScreen brand={Brand} color={ACC} status={aims.menu ? undefined : ""}>
      {aims.menu && (
        <div className="-mt-1 flex justify-end">
          <button type="button" onClick={() => { setMenuOpen((m) => !m); ctx.hit(tt("Opened the menu")); }} aria-expanded={menuOpen} className="rounded border border-[#CBD5E1] px-2 text-[16px]">☰</button>
        </div>
      )}
      {menuOpen && (
        <div className="rounded border border-[#CBD5E1] bg-white p-1">
          {[tt("My trips"), tt("Profile"), tt("Help")].map((l) => <button key={l} type="button" onClick={() => (l === tt("My trips") && step === 3 ? ctx.done(tt("Back in My trips with a boarding pass")) : ctx.miss(tt(`Opened ${l}`, `${l} geöffnet`)))} className="block w-full px-2 py-1 text-left">{l}</button>)}
        </div>
      )}
      <p className={clsx("text-[11px]", aims.where ? "text-[#475569]" : "text-[#64748B]")}>{aims.where ? tt(`Check-in · Step ${step} of 3 · ${step === 2 ? "Seats" : "Boarding pass"}`, `Check-in · Schritt ${step} von 3 · ${step === 2 ? "Sitze" : "Bordkarte"}`) : tt("Check-in")}</p>
      {step === 2 ? (
        <>
          <p className="text-[14px] font-bold">{tt("Choose your seat")}</p>
          <p className="text-[11px] text-[#64748B]">{tt("A and F are window seats.")}</p>
          <div className="grid grid-cols-6 gap-1">
            {seats.map((s) => <button key={s} type="button" aria-pressed={seat === s} onClick={() => { setSeat(s); (s.endsWith("A") || s.endsWith("F") ? ctx.hit : ctx.miss)(tt(`Tapped seat ${s}`, `Sitz ${s} getippt`)); }} className={clsx("h-10 rounded text-[10px]", seat === s ? "bg-[#2F5D8A] text-white" : "bg-[#E2E8F0]")}>{s}</button>)}
          </div>
          {aims.one ? (
            <>
              <button type="button" onClick={next} className="w-full rounded-lg py-2.5 font-bold text-white" style={{ background: ACC }}>{tt("Continue to boarding pass")}</button>
              <p className="text-center text-[11px] text-[#64748B]"><button type="button" onClick={() => ctx.miss(tt("Tapped Skip"))}>{tt("Skip")}</button> · <button type="button" onClick={() => ctx.miss(tt("Tapped Change flight"))}>{tt("Change flight")}</button></p>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-1">
              {[tt("Extras"), tt("Skip"), tt("Change flight"), tt("Continue")].map((l) => <button key={l} type="button" onClick={() => (l === tt("Continue") ? next() : ctx.miss(tt(`Tapped ${l}`, `${l} getippt`)))} className="rounded border border-[#334155] py-2 text-[12px]">{l}</button>)}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="rounded-lg border-2 border-dashed border-[#2F5D8A] p-2">
            <p className="font-bold">{tt("Boarding pass · NW 482")}</p>
            <p>{tt(`Seat ${seat} · Gate B12 · boarding 07:40`, `Sitz ${seat} · Gate B12 · Boarding 07:40`)}</p>
          </div>
          <p className="text-[11px] text-[#64748B]">{tt("Now go back to My trips.")}</p>
        </>
      )}
      {!aims.menu && (
        <p className="border-t border-[#E2E8F0] pt-2 text-center text-[10px] text-[#64748B]">
          <button type="button" onClick={() => (step === 3 ? ctx.done(tt("Found My trips in the footer")) : ctx.miss(tt("Opened My trips too early")))}>{tt("My trips")}</button> · <button type="button" onClick={() => ctx.miss(tt("Opened Profile"))}>{tt("Profile")}</button> · {tt("Imprint")}
        </p>
      )}
    </AppScreen>
  );
}

export function AimsLab() {
  const v = (id: string, label: string, aims: Aims, insight: string) => ({ id, label, render: (ctx: LabCtx) => <CheckIn ctx={ctx} aims={aims} />, insight });
  return (
    <TaskLab
      label={tt("A Nordwind check-in: where am I, one main action, the menu where people expect it · a working product · Case assumption, example company")}
      point={tt("People bring expectations and habits: they look for the menu where other apps put it and expect the next step to stand out. An interface that uses this gives orientation, causes less confusion and steers attention to what matters. Try the check-in with all three aims met, then with one missing.")}
      task={tt("You are Tom. Choose a window seat, get your boarding pass, then go back to My trips.")}
      versions={[
        v("all", tt("All three aims met"), { where: true, one: true, menu: true }, tt("In plain words: Tom sees that he is at step 2 of 3, one button clearly continues, and the menu sits at the top right, where he expects it. He never has to think about the interface.")),
        v("nowhere", tt("No “where am I”"), { where: false, one: true, menu: true }, tt("In plain words: Tom cannot tell how far he is or how much is left. Each new screen could be the last, or not.")),
        v("four", tt("Four equal buttons"), { where: true, one: false, menu: true }, tt("In plain words: four equal buttons make Tom read and compare before he can go on, and “Skip” looks as important as “Continue”.")),
        v("footer", tt("Menu in the footer"), { where: true, one: true, menu: false }, tt("In plain words: Tom looks for the menu at the top and finds “My trips” only in small grey type in the footer.")),
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · the same payment step in three tones */

function Pay({ ctx, tone }: { ctx: LabCtx; tone: "alarm" | "pressure" | "calm" }) {
  const [ins, setIns] = useState(tone === "pressure");
  const [secs, setSecs] = useState(299);
  const [warn, setWarn] = useState(tone === "alarm");
  useEffect(() => {
    if (tone !== "pressure") return;
    const id = window.setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [tone]);
  if (ctx.finished) return <AppScreen brand={Brand} color={ACC}><p className="text-[15px] font-bold">{tt("✓ Paid")}</p><p>{ins ? tt("Lisbon · with travel insurance") : tt("Lisbon · no extras")}</p></AppScreen>;
  const pay = () => {
    if (warn) return ctx.miss(tt("The warning blocked the button"));
    if (ins) ctx.miss(tt("Paid for an insurance you did not want"));
    ctx.done(ins ? tt("Paid, with an extra") : tt("Paid, no extras"));
  };
  return (
    <AppScreen brand={Brand} color={ACC}>
      <p className="text-[15px] font-bold">{tt("Payment")}</p>
      {tone === "alarm" && (
        <>
          <p className="rounded bg-[#C0392B] px-2 py-1 text-[12px] font-bold text-white">{tt("⚠ WARNING: check all data carefully!")}</p>
          <p className="rounded bg-[#F5B7B1] px-2 py-1 text-[11.5px] text-[#7B241C]">{tt("⚠ Errors may lead to cancellation")}</p>
        </>
      )}
      {tone === "pressure" && (
        <>
          <p className="rounded bg-[#B45309] px-2 py-1 text-[12px] font-bold text-white">{tt(`⏱ Your seat is held for ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`, `⏱ Ihr Sitzplatz ist reserviert für ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`)}</p>
          <p className="text-[12px] font-bold text-[#C0392B]">{tt("Only 1 seat left! 14 people are looking right now.")}</p>
        </>
      )}
      {tone === "calm" && (
        <>
          <p className="text-[11.5px] text-[#475569]">{tt("Step 3 of 3 · you can still change everything")}</p>
          <p className="text-[11.5px] text-[#1E8449]">{tt("🔒 Secure payment · free cancellation until 1 May")}</p>
        </>
      )}
      <div className="rounded border border-[#CBD5E1] px-2 py-1.5 text-[12px] text-[#475569]">{tt("Saved card •••• (demo)")}</div>
      <label className="flex items-center gap-2 text-[12px]">
        <input type="checkbox" checked={ins} onChange={() => { setIns((v) => !v); ctx.hit(ins ? tt("Removed the insurance") : tt("Added the insurance")); }} />
        <span className={tone === "pressure" ? "text-[10px] text-[#64748B]" : ""}>{tt("Add travel insurance")}</span>
      </label>
      {warn && (
        <div className="rounded border border-[#C0392B] p-2 text-[11.5px]">
          <p>{tt("Are you sure all your data is correct? Wrong data can cancel your booking.")}</p>
          <button type="button" onClick={() => { setWarn(false); ctx.hit(tt("Confirmed the warning")); }} className="mt-1 rounded border border-[#C0392B] px-2 py-0.5 text-[#C0392B]">{tt("Yes, I checked")}</button>
        </div>
      )}
      <button type="button" onClick={pay} className="w-full rounded-lg py-2.5 font-bold text-white" style={{ background: tone === "pressure" ? "#C2410C" : ACC }}>{tone === "pressure" ? tt("PAY NOW!") : tt("Pay")}</button>
    </AppScreen>
  );
}

export function ToneLab() {
  return (
    <TaskLab
      label={tt("The Nordwind payment step in three tones · a working product · Case assumption, example company")}
      point={tt("People feel a screen before they read it. The same step can make them feel unsafe, pushed or at ease, and that first feeling decides whether they go on. Pay in each tone and notice what you feel, and what you nearly did.")}
      task={tt("You are Mia. Pay for the Lisbon trip, with no extras.")}
      versions={[
        { id: "alarm", label: tt("Alarm"), render: (ctx) => <Pay ctx={ctx} tone="alarm" />, insight: tt("In plain words: two red warnings and a confirmation at a step where nothing is wrong. Mia feels something might go wrong before she has read a word, and starts to doubt the app. Warnings that do not match a real risk cost trust and a sense of safety.") },
        { id: "pressure", label: tt("Pressure"), render: (ctx) => <Pay ctx={ctx} tone="pressure" />, insight: tt("In plain words: a countdown, “only 1 seat left” and an insurance ticked in small grey type push Mia to hurry. Some people pay faster and pay for something they did not want; others feel manipulated and close the app. Pressure can trigger reactance, the urge to resist being pushed.") },
        { id: "calm", label: tt("Calm"), render: (ctx) => <Pay ctx={ctx} tone="calm" />, insight: tt("In plain words: Mia sees that this is the last step, that she can still change everything and that the payment is secure. Nothing is ticked for her. She feels safe and in control, and she pays.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · what the fovea takes in */

const R = 46; // the sharp spot: about 2° of the visual field on a phone held at reading distance (Rayner 1998)
type Dep = { to: string; time: string; gate: string; ad?: boolean };
const BOARD = (ordered: boolean): Dep[] => {
  const rows: Dep[] = [
    { to: tt("Oslo"), time: "09:10", gate: "B4" },
    { to: tt("Kiel"), time: "09:25", gate: "A2" },
    { to: tt("Bergen"), time: "09:40", gate: "C7" },
    { to: tt("Gdańsk"), time: "09:55", gate: "A5" },
    { to: tt("Tallinn"), time: "10:05", gate: "B1" },
    { to: tt("Aarhus"), time: "10:20", gate: "C2" },
    { to: tt("Visby"), time: "10:35", gate: "A9" },
    { to: tt("Riga"), time: "10:50", gate: "B6" },
  ];
  if (ordered) return [...rows].sort((a, b) => a.to.localeCompare(b.to));
  const mixed = [rows[6], rows[0], rows[4], rows[7], rows[2], rows[5], rows[1], rows[3]];
  mixed.splice(2, 0, { to: tt("Duty-free 20% off"), time: "", gate: "", ad: true });
  mixed.splice(7, 0, { to: tt("Lounge access"), time: "", gate: "", ad: true });
  return mixed;
};

function Board({ rows, ordered, onRow }: { rows: Dep[]; ordered: boolean; onRow?: (d: Dep) => void }) {
  return (
    <div className="space-y-1 p-2">
      <p data-title className="text-[13px] font-bold">{tt("Ferry departures · today")}</p>
      {ordered && <p data-head className="grid grid-cols-[1fr_auto_auto] gap-3 px-2 text-[10.5px] font-semibold text-[#475569]"><span>{tt("To")}</span><span>{tt("Time")}</span><span>{tt("Gate")}</span></p>}
      {rows.map((d, i) => (
        <button
          key={i}
          data-row={i}
          type="button"
          tabIndex={onRow ? 0 : -1}
          onClick={() => onRow?.(d)}
          className={clsx(
            "w-full rounded px-2 py-1 text-left text-[12px]",
            d.ad ? "bg-[#FDE68A] font-bold text-[#78350F]" : ordered ? "grid grid-cols-[1fr_auto_auto] gap-3 bg-[#EEF2F7]" : "block bg-[#F1F5F9] text-[11.5px]",
          )}
        >
          {d.ad ? d.to : ordered ? (<><span className="font-bold">{d.to}</span><span>{d.time}</span><span className="font-bold">{d.gate}</span></>) : tt(`${d.time} · gate ${d.gate} · ${d.to}`, `${d.time} · Gate ${d.gate} · ${d.to}`)}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ A2 · a model path, played slowly */

type At = "title" | "head" | { row: number; cell?: number };
type Step = { at: At; say: string };
const STEP_MS = 2800;

/** The model path of a reader who looks for Bergen: scripted from the layout, one fixation per line or cell. An illustration, not measured data. */
function modelSteps(ordered: boolean, rows: Dep[]): Step[] {
  const bi = rows.findIndex((d) => d.to === tt("Bergen"));
  if (ordered) {
    return [
      { at: "title", say: tt("The eye lands on the title first. Nothing yet says where Bergen is.") },
      { at: "head", say: tt("The bold header says what each column is, and the destination comes first. Now the eye knows where to look.") },
      { at: { row: 0, cell: 0 }, say: tt(`${rows[0].to}: the first name in the destination column, in bold. Bergen starts with B, so it must be very close.`, `${rows[0].to}: der erste Name in der Zielspalte, fett. Bergen beginnt mit B, also muss es ganz nah sein.`) },
      { at: { row: bi, cell: 0 }, say: tt("Bergen: found. Prior knowledge of the alphabet steered the jump: B comes right after A.") },
      { at: { row: bi, cell: 2 }, say: tt(`The gate sits in the same row, in bold: ${rows[bi].gate}. One more fixation, and the search is over.`, `Das Gate steht in derselben Zeile, fett: ${rows[bi].gate}. Noch eine Fixation, und die Suche ist vorbei.`) },
    ];
  }
  const steps: Step[] = [{ at: "title", say: tt("The eye lands on the title, the biggest and boldest thing. Nothing here says where Bergen is.") }];
  for (let i = 0; i <= bi; i++) {
    const d = rows[i];
    steps.push({
      at: { row: i },
      say: i === bi
        ? tt(`Bergen: found, with its gate in the same line (${d.gate}). The destination came last in the line, so every line had to be read to its end.`, `Bergen: gefunden, mit seinem Gate in derselben Zeile (${d.gate}). Das Ziel kam am Ende der Zeile, also musste jede Zeile bis zum Ende gelesen werden.`)
        : d.ad
          ? tt(`The yellow advert “${d.to}” pulls the eye: colour and contrast stand out before any thinking. One fixation spent on something that is not a ferry.`, `Die gelbe Anzeige „${d.to}“ zieht das Auge an: Farbe und Kontrast fallen auf, bevor irgendein Denken einsetzt. Eine Fixation, verbraucht für etwas, das keine Fähre ist.`)
          : tt(`${d.to}: not Bergen. The line starts with a time, so the eye had to read to the end of the line to learn the destination.`, `${d.to}: nicht Bergen. Die Zeile beginnt mit einer Zeit, also musste das Auge bis zum Zeilenende lesen, um das Ziel zu erfahren.`),
    });
  }
  return steps;
}

function ModelPath({ ordered, yours, tried }: { ordered: boolean; yours: number; tried: boolean }) {
  const rows = BOARD(ordered);
  const steps = modelSteps(ordered, rows);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [slow, setSlow] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [pts, setPts] = useState<{ x: number; y: number }[]>([]);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => { setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);
  useLayoutEffect(() => {
    const w = wrap.current;
    if (!w || !open) return;
    const wb = w.getBoundingClientRect();
    setPts(steps.map((st) => {
      let el: HTMLElement | null = null;
      if (st.at === "title") el = w.querySelector("[data-title]");
      else if (st.at === "head") el = w.querySelector("[data-head]");
      else {
        const r = w.querySelector<HTMLElement>(`[data-row="${st.at.row}"]`);
        el = st.at.cell !== undefined && r ? (r.children[st.at.cell] as HTMLElement) : r;
      }
      if (!el) return { x: 0, y: 0 };
      const b = el.getBoundingClientRect();
      return { x: b.left - wb.left + (b.width > 120 ? 64 : b.width / 2), y: b.top - wb.top + b.height / 2 };
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, ordered]);
  useEffect(() => {
    if (!playing) return;
    if (step >= steps.length - 1) { setPlaying(false); return; }
    const id = window.setTimeout(() => setStep((k) => k + 1), (slow ? 2 : 1) * STEP_MS);
    return () => window.clearTimeout(id);
  }, [playing, step, slow, steps.length]);

  const last = steps.length - 1;
  const play = () => {
    if (playing) return setPlaying(false);
    if (step >= last) setStep(0);
    else if (step < 0) setStep(0);
    setPlaying(true);
  };
  const spot = step >= 0 ? pts[step] : undefined;
  const btn = "btn btn-sm min-h-[40px] border border-line bg-paper text-ink hover:border-ash disabled:opacity-40";

  if (!tried) {
    return <p className="mt-3 text-caption text-ash">{tt("Try the task first. After your first tap you can watch a model path and compare it with yours.")}</p>;
  }
  if (!open) {
    return (
      <div className="mt-3">
        <button type="button" onClick={() => setOpen(true)} className="btn btn-sm min-h-[40px] border border-accent bg-accent text-white hover:bg-accentHi">
          {tt("Watch a model path")}
        </button>
      </div>
    );
  }
  return (
    <div className="mt-3 space-y-2 rounded-lg border border-line bg-paper p-3">
      <p className="smallcaps text-ash">{tt("Model path · an illustration, not measured data")}</p>
      <AppScreen brand={Brand} color={ACC} status={step >= 0 ? tt(`fixations: ${step + 1}`, `Fixationen: ${step + 1}`) : undefined}>
        <div ref={wrap} aria-hidden className="relative select-none">
          <div style={{ filter: "blur(3.5px)" }}><Board rows={rows} ordered={ordered} /></div>
          <div
            className="absolute inset-0"
            style={{ clipPath: spot ? `circle(${R}px at ${spot.x}px ${spot.y}px)` : "circle(0px at 0 0)", transition: reduce ? undefined : "clip-path 600ms ease" }}
          >
            <Board rows={rows} ordered={ordered} />
          </div>
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            {step >= 1 && <polyline points={pts.slice(0, step + 1).map((q) => `${q.x},${q.y}`).join(" ")} fill="none" stroke="#1750A8" strokeWidth="1.6" strokeDasharray="4 3" />}
            {pts.slice(0, step + 1).map((q, i) => (
              <g key={i}>
                <circle cx={q.x} cy={q.y} r="3.5" fill="#1750A8" stroke="#fff" strokeWidth="1" />
                <circle cx="-3" cy={q.y} r="7" fill="#1750A8" stroke="#fff" strokeWidth="1.2" />
                <text x="-3" y={q.y + 3.4} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff">{i + 1}</text>
              </g>
            ))}
          </svg>
        </div>
      </AppScreen>
      <p className="text-caption font-semibold text-ash" aria-live="polite">
        {step < 0 ? tt("Press Play or Step to start.") : tt(`Fixation ${step + 1} of ${steps.length}`, `Fixation ${step + 1} von ${steps.length}`)}
      </p>
      <p className="min-h-[3.5rem] max-w-prose text-body text-ink" aria-live="polite">
        {step >= 0 ? steps[step].say : tt("The model looks for Bergen the way the card describes: one sharp spot, one jump at a time.")}
      </p>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={btn} onClick={() => { setPlaying(false); setStep((k) => Math.max(0, k - 1)); }} disabled={step <= 0}>{tt("◀ Back")}</button>
        <button type="button" className={btn} onClick={play} disabled={reduce} aria-pressed={playing}>{playing ? tt("Pause") : step >= last ? tt("Replay") : tt("Play")}</button>
        <button type="button" className={btn} onClick={() => { setPlaying(false); setStep((k) => Math.min(last, k + 1)); }} disabled={step >= last}>{tt("Step ▶")}</button>
        <button type="button" className={btn} onClick={() => setSlow((v) => !v)} aria-pressed={slow} disabled={reduce}>{tt("Slow")}</button>
        <button type="button" className={btn} onClick={() => { setPlaying(false); setStep(-1); setOpen(false); }}>{tt("Close")}</button>
      </div>
      {reduce && <p className="text-caption text-ash">{tt("Your device asks for reduced motion, so nothing plays by itself: use Step.")}</p>}
      {step >= last && (
        <p className="max-w-prose rounded bg-accentSoft p-2 text-caption text-ink">
          {tt(`The model needs ${steps.length} fixations to find Bergen and its gate on this board${yours > 0 ? `; you used ${yours}` : ""}. It is a scripted illustration with one fixation per line or cell; real eyes vary. With only eight rows the gap is small. On a longer board the mixed search would grow row by row while the alphabetical lookup stays short (reasoning, not a measurement). Basis: a fixation takes in only about 2° (Rayner 1998).`, `Das Modell braucht ${steps.length} Fixationen, um Bergen und sein Gate auf dieser Tafel zu finden${yours > 0 ? `; Sie brauchten ${yours}` : ""}. Es ist eine geskriptete Veranschaulichung mit einer Fixation pro Zeile oder Zelle; echte Augen variieren. Bei nur acht Zeilen ist der Abstand klein. Auf einer längeren Tafel würde die gemischte Suche Zeile für Zeile wachsen, während das alphabetische Nachschlagen kurz bleibt (eine Überlegung, keine Messung). Grundlage: Eine Fixation nimmt nur etwa 2° auf (Rayner 1998).`)}
        </p>
      )}
    </div>
  );
}

function Fovea({ ctx, ordered, blur }: { ctx: LabCtx; ordered: boolean; blur: boolean }) {
  const [spot, setSpot] = useState<{ x: number; y: number } | null>(null);
  const [n, setN] = useState(0);
  const rows = BOARD(ordered);
  const player = blur ? <ModelPath ordered={ordered} yours={n} tried={n > 0 || ctx.finished} /> : null;
  if (ctx.finished) return <><AppScreen brand={Brand} color={ACC}><p className="text-[15px] font-bold">{tt("✓ Found it")}</p><p>{tt(`Bergen · 09:40 · gate C7 · ${n} fixation(s)`, `Bergen · 09:40 · Gate C7 · ${n} Fixation(en)`)}</p></AppScreen>{player}</>;
  const fixate = (x: number, y: number) => { setSpot({ x, y }); setN((k) => k + 1); ctx.hit(tt(`Fixation ${n + 1}`)); };
  const centre = (el: HTMLElement) => {
    const box = el.offsetParent?.getBoundingClientRect(), r = el.getBoundingClientRect();
    return box ? { x: r.left - box.left + Math.min(r.width / 2, 60), y: r.top - box.top + r.height / 2 } : { x: 0, y: 0 };
  };
  const onRow = (d: Dep) => {
    if (d.to === tt("Bergen")) ctx.done(tt(`Found Bergen, gate C7, after ${n} fixation(s)`, `Bergen gefunden, Gate C7, nach ${n} Fixation(en)`));
    else ctx.miss(tt(d.ad ? `Tapped “${d.to}”` : `Read ${d.to}, not Bergen`));
  };
  const clip = spot ? `circle(${R}px at ${spot.x}px ${spot.y}px)` : "circle(0px at 0 0)";
  return (
    <>
    <AppScreen brand={Brand} color={ACC} status={blur ? tt(`fixations: ${n}`, `Fixationen: ${n}`) : undefined}>
      {blur ? (
        <div
          className="relative cursor-crosshair"
          onClick={(e) => { if ((e.target as HTMLElement).closest("button")) return; const b = e.currentTarget.getBoundingClientRect(); fixate(e.clientX - b.left, e.clientY - b.top); }}
          onFocusCapture={(e) => { const t = e.target as HTMLElement; if (t.tagName === "BUTTON") { const c = centre(t); fixate(c.x, c.y); } }}
        >
          <div aria-hidden className="pointer-events-none select-none" style={{ filter: "blur(3.5px)" }}><Board rows={rows} ordered={ordered} /></div>
          <div className="absolute inset-0" style={{ clipPath: clip }}><Board rows={rows} ordered={ordered} onRow={onRow} /></div>
          {!spot && <p className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-[11px] font-semibold text-[#1E293B]">{tt("Tap where you want to look")}</p>}
        </div>
      ) : (
        <Board rows={rows} ordered={ordered} onRow={onRow} />
      )}
    </AppScreen>
    {player}
    </>
  );
}

export function FoveaLab() {
  return (
    <TaskLab
      label={tt("The Nordwind ferry board as you feel it and as the fovea takes it in · a working product · Case assumption, example company")}
      point={tt("Only a spot of about 2° is sharp, roughly a thumbnail at arm's length; the brain fills in the rest. To read anything else, the eyes have to jump there. Each tap here is one fixation: the spot jumps to where you tap, and only there can you read. Count how many jumps the same search costs on a mixed board and on an ordered one.")}
      task={tt("You are Tom. Find the gate of the ferry to Bergen, then tap its row.")}
      stresses={["small", "hurry", "ping"]}
      versions={[
        { id: "feel", label: tt("How it feels: the mixed board"), render: (ctx) => <Fovea ctx={ctx} ordered={false} blur={false} />, insight: tt("In plain words: the whole board seems sharp at once, so the search feels quick. It is not: the eyes still jumped from row to row, you only did not notice.") },
        { id: "mixed", label: tt("What the eye takes in: mixed"), render: (ctx) => <Fovea ctx={ctx} ordered={false} blur />, insight: tt("In plain words: times first, destinations last and two adverts in between. Tom has to land on row after row, because nothing in the blur tells him where Bergen is.") },
        { id: "ordered", label: tt("What the eye takes in: ordered"), render: (ctx) => <Fovea ctx={ctx} ordered blur />, insight: tt("In plain words: destinations first, in bold and in alphabetical order. Even in the blur, Tom knows Bergen sits near the top: prior knowledge of the alphabet steers the jump, and two or three fixations are enough.") },
      ]}
    />
  );
}
