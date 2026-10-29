"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
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
    if (n !== 2) return ctx.miss(tt(`Booked for ${n} traveller(s), not two`));
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
          <Stepper n={n} set={(v) => { setN(v); ctx.hit(tt(`Travellers: ${v}`)); }} faint />
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[tt("Details"), tt("Book"), tt("Share")].map((l) => (
              <button key={l} type="button" onClick={() => (l === tt("Book") ? book() : (setSheet(l === tt("Details") ? "details" : "share"), ctx.miss(tt(`Opened ${l}`))))} className="rounded-full border border-[#D4D4D4] py-1.5 text-[11px] text-[#737373]">{l}</button>
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
          <Stepper n={n} set={(v) => { setN(v); ctx.hit(tt(`Travellers: ${v}`)); }} />
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
            {[tt("Extras"), tt("Upgrade your room"), tt("Rent a car"), tt("Tours")].map((l) => <button key={l} type="button" onClick={() => ctx.miss(tt(`Opened ${l}`))} className="rounded bg-[#F1F5F9] py-3 text-[12px]">{l}</button>)}
          </div>
          <p className="text-[10px] text-[#64748B]">
            <button type="button" onClick={() => { setPicker(true); ctx.hit(tt("Found “Change booking”")); }} className="text-[#2F5D8A] underline">{tt("Change booking")}</button> · <button type="button" onClick={() => ctx.miss(tt("Opened Cancel"))}>{tt("Cancel")}</button> · <button type="button" onClick={() => ctx.miss(tt("Opened Help"))}>{tt("Help")}</button>
          </p>
        </>
      )}
      {picker && (
        <div className="space-y-1 rounded-lg bg-[#EEF2F7] p-2">
          <p className="font-semibold">{tt("New start date")}</p>
          <div className="flex gap-1">{[12, 13, 14].map((d) => <button key={d} type="button" onClick={() => (d === 13 ? ctx.done(tt("Changed to 13 May")) : ctx.miss(tt(`Picked ${d} May`)))} className="flex-1 rounded border border-[#94A3B8] bg-white py-1.5">{tt(`${d} May`)}</button>)}</div>
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
    ctx.hit(tt(`Seat ${seat} chosen`));
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
          {[tt("My trips"), tt("Profile"), tt("Help")].map((l) => <button key={l} type="button" onClick={() => (l === tt("My trips") && step === 3 ? ctx.done(tt("Back in My trips with a boarding pass")) : ctx.miss(tt(`Opened ${l}`)))} className="block w-full px-2 py-1 text-left">{l}</button>)}
        </div>
      )}
      <p className={clsx("text-[11px]", aims.where ? "text-[#475569]" : "text-[#64748B]")}>{aims.where ? tt(`Check-in · Step ${step} of 3 · ${step === 2 ? "Seats" : "Boarding pass"}`) : tt("Check-in")}</p>
      {step === 2 ? (
        <>
          <p className="text-[14px] font-bold">{tt("Choose your seat")}</p>
          <p className="text-[11px] text-[#64748B]">{tt("A and F are window seats.")}</p>
          <div className="grid grid-cols-6 gap-1">
            {seats.map((s) => <button key={s} type="button" aria-pressed={seat === s} onClick={() => { setSeat(s); (s.endsWith("A") || s.endsWith("F") ? ctx.hit : ctx.miss)(tt(`Tapped seat ${s}`)); }} className={clsx("h-10 rounded text-[10px]", seat === s ? "bg-[#2F5D8A] text-white" : "bg-[#E2E8F0]")}>{s}</button>)}
          </div>
          {aims.one ? (
            <>
              <button type="button" onClick={next} className="w-full rounded-lg py-2.5 font-bold text-white" style={{ background: ACC }}>{tt("Continue to boarding pass")}</button>
              <p className="text-center text-[11px] text-[#64748B]"><button type="button" onClick={() => ctx.miss(tt("Tapped Skip"))}>{tt("Skip")}</button> · <button type="button" onClick={() => ctx.miss(tt("Tapped Change flight"))}>{tt("Change flight")}</button></p>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-1">
              {[tt("Extras"), tt("Skip"), tt("Change flight"), tt("Continue")].map((l) => <button key={l} type="button" onClick={() => (l === tt("Continue") ? next() : ctx.miss(tt(`Tapped ${l}`)))} className="rounded border border-[#334155] py-2 text-[12px]">{l}</button>)}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="rounded-lg border-2 border-dashed border-[#2F5D8A] p-2">
            <p className="font-bold">{tt("Boarding pass · NW 482")}</p>
            <p>{tt(`Seat ${seat} · Gate B12 · boarding 07:40`)}</p>
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
          <p className="rounded bg-[#B45309] px-2 py-1 text-[12px] font-bold text-white">{tt(`⏱ Your seat is held for ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`)}</p>
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
