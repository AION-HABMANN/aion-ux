"use client";

import clsx from "clsx";
import { useId, useState } from "react";
import type { ReactNode } from "react";
import { AppScreen, TaskLab } from "@/components/sim/TaskLab";
import type { LabCtx } from "@/components/sim/TaskLab";
import { tt } from "@/lib/lang";

/**
 * Day 6 · the working products of the study cards (UX-STANDARD 2.16): Seabird Ferries, a made-up ferry operator, so no task is answered here. Each lab gives one task
 * and versions of the same screen to use, with time, wrong taps and stress tests (components/sim/TaskLab.tsx). No prices are shown.
 */
const ACC = "#0369A1";
const Brand = "Seabird Ferries";
const Done = ({ text }: { text: string }) => <AppScreen brand={Brand} color={ACC}><p className="text-[15px] font-bold">{tt("✓ Done")}</p><p>{text}</p></AppScreen>;

/* ------------------------------------------------------------------ A1 · proximity, similarity, common region */

type G = { proximity: boolean; similarity: boolean; region: boolean };
function Links({ ctx, g }: { ctx: LabCtx; g: G }) {
  if (ctx.finished) return <Done text={tt("Luggage rules: 2 bags per passenger, up to 20 kg each, plus one hand bag")} />;
  const tickets = [tt("Book a ticket"), tt("Change a booking"), tt("Cancel")];
  const info = [tt("Timetable"), tt("Luggage rules"), tt("Getting to the port")];
  const mixed = ["#DBEAFE", "#FEF3C7", "#DCFCE7", "#FCE7F3", "#EDE9FE", "#FFEDD5"];
  const link = (x: string, i: number, grp: "t" | "i") => (
    <button key={x} type="button" onClick={() => (x === tt("Luggage rules") ? ctx.done(tt("Found the luggage rules")) : ctx.miss(tt(`Opened ${x}`)))} className="block w-full rounded px-2 py-2 text-left text-[12.5px]" style={{ background: g.similarity ? (grp === "t" ? "#E0F2FE" : "#F1F5F9") : mixed[(i * 2 + (grp === "i" ? 1 : 0)) % 6] }}>{x}</button>
  );
  const T = tickets.map((x, i) => link(x, i, "t"));
  const I = info.map((x, i) => link(x, i, "i"));
  const group = (label: string, items: ReactNode[]) => g.region ? <div className="space-y-1 rounded-lg border border-[#94A3B8] p-2"><p className="text-[11px] font-semibold uppercase text-[#475569]">{label}</p>{items}</div> : <div className="space-y-1">{items}</div>;
  return (
    <AppScreen brand={Brand} color={ACC}>
      <p className="text-[14px] font-bold">{tt("Plan your crossing")}</p>
      {g.proximity ? (
        <div className="space-y-4">{group(tt("Tickets"), T)}{group(tt("Travel information"), I)}</div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">{[T[0], I[2], T[2], I[0], I[1], T[1]].map((x, i) => <div key={i}>{x}</div>)}</div>
      )}
    </AppScreen>
  );
}

export function GestaltLab() {
  const v = (id: string, label: string, g: G, insight: string) => ({ id, label, render: (ctx: LabCtx) => <Links ctx={ctx} g={g} />, insight });
  return (
    <TaskLab
      label={tt("A Seabird Ferries page: proximity, similarity and common region · a working product · Case assumption, example company")}
      point={tt("People see groups, not pieces. What is close together, looks alike or sits in one frame is read as belonging together. A layout that follows these laws lets people find a group at a glance; one that breaks them makes related things look unrelated.")}
      task={tt("You are Elif. Find the luggage rules before you pack.")}
      versions={[
        v("none", tt("No grouping"), { proximity: false, similarity: false, region: false }, tt("In plain words: six links scattered in mixed colours. Elif reads each one alone; a colour tells her nothing.")),
        v("prox", tt("Proximity only"), { proximity: true, similarity: false, region: false }, tt("In plain words: the ticket links stand together and the travel information stands together, so she sees two groups, though the colours still mix.")),
        v("all", tt("All three laws"), { proximity: true, similarity: true, region: true }, tt("In plain words: two groups, one colour each, each in a labelled frame. Elif knows at once that the luggage rules are under travel information.")),
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · visual hierarchy */

function Step({ ctx, clear }: { ctx: LabCtx; clear: boolean }) {
  const [saved, setSaved] = useState(false);
  if (ctx.finished) return <Done text={tt("On to payment · Harbour to Isle, Friday 08:15")} />;
  const opt = (label: string, ok: boolean, main = false) => (
    <button type="button" onClick={() => (ok ? ctx.done(tt("Continued to payment")) : (label === tt("Save for later") && setSaved(true), ctx.miss(tt(`Pressed ${label}`))))} className={clsx(clear ? (main ? "w-full rounded-lg py-3 text-[15px] font-bold text-white" : "text-[12px] underline") : "rounded-lg border-2 border-[#0F172A] py-2.5 text-[13px] font-bold")} style={clear && main ? { background: ACC } : undefined}>{label}</button>
  );
  return (
    <AppScreen brand={Brand} color={ACC}>
      {clear ? (
        <>
          <p className="text-[15px] font-bold">{tt("Harbour → Isle · Friday 08:15")}</p>
          <p className="text-[11.5px] text-[#475569]">{tt("1 adult · foot passenger · Note: check-in closes 30 minutes before departure.")}</p>
          {opt(tt("Continue to payment"), true, true)}
          <p className="flex justify-center gap-3">{opt(tt("Save for later"), false)}{opt(tt("Change crossing"), false)}{opt(tt("Add a cabin"), false)}</p>
          <p className="rounded bg-[#F1F5F9] p-2 text-[11.5px]">{tt("Offer: breakfast on board.")}</p>
        </>
      ) : (
        <>
          <p className="rounded-lg bg-[#F59E0B] p-2 text-[14px] font-bold text-[#111827]">{tt("OFFER: BREAKFAST ON BOARD!")}</p>
          <p className="rounded-lg bg-[#B91C1C] p-2 text-[13px] font-bold text-white">{tt("NOTE: CHECK-IN CLOSES 30 MINUTES BEFORE DEPARTURE")}</p>
          <p className="text-[14px] font-bold">{tt("Harbour → Isle · Friday 08:15")}</p>
          <div className="grid grid-cols-2 gap-2">{opt(tt("Save for later"), false)}{opt(tt("Add a cabin"), false)}{opt(tt("Change crossing"), false)}{opt(tt("Continue to payment"), true)}</div>
        </>
      )}
      {saved && <p className="text-[11.5px] text-[#475569]">{tt("Saved. You can continue later from My trips.")}</p>}
    </AppScreen>
  );
}

export function HierarchyLab() {
  return (
    <TaskLab
      label={tt("The same Seabird booking step: every element equally strong, and a clear hierarchy · a working product · Case assumption, example company")}
      point={tt("A visual hierarchy is an order of importance the eye can follow. The primary action is the strongest thing; secondary actions are quieter; notices and promotions take their place. Arranging everything side by side is not steering.")}
      task={tt("You are Noah. Go on with your booking.")}
      versions={[
        { id: "flat", label: tt("Everything equally strong"), render: (ctx) => <Step ctx={ctx} clear={false} />, insight: tt("In plain words: an offer, a notice and four buttons, all equally bold. Noah's eye jumps between them and he is not sure which button takes him on. Many press “Save for later”.") },
        { id: "clear", label: tt("A clear hierarchy"), render: (ctx) => <Step ctx={ctx} clear />, insight: tt("In plain words: his crossing first, the notice small below it, one strong Continue button, the other options as quiet links, the offer last. Noah sees the next step at once.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · progressive disclosure, or hiding */

function Form({ ctx, kind }: { ctx: LabCtx; kind: "all" | "steps" | "hidden" }) {
  const [bags, setBags] = useState(3);
  const [extra, setExtra] = useState(false);
  const [help, setHelp] = useState(false);
  const [step, setStep] = useState(1);
  const id = useId();
  if (ctx.finished) return <Done text={extra ? tt("Booked · 14 June · 1 adult · 3 bags, one extra bag paid in advance") : tt("Booked · 14 June · 1 adult")} />;
  const book = () => {
    if (bags > 2 && !extra) { ctx.miss(tt("At the port: the third bag is charged at the counter")); ctx.done(tt("Booked, but the third bag was not covered")); return; }
    ctx.done(tt("Booked with all bags covered"));
  };
  const bagField = (rule: boolean) => (
    <div className="space-y-1">
      <label htmlFor={id} className="text-[12px] font-semibold">{tt("Bags")}</label>
      <input id={id} type="number" min={0} max={6} value={bags} onChange={(e) => setBags(Number(e.target.value))} className="w-20 rounded border border-[#94A3B8] px-2 py-1" />
      {rule && <p className="text-[11.5px] text-[#334155]">{tt("2 bags included, up to 20 kg each.")} {bags > 2 && <label className="ml-1 inline-flex items-center gap-1"><input type="checkbox" checked={extra} onChange={() => { setExtra((v) => !v); ctx.hit(tt("Added an extra bag")); }} />{tt("add an extra bag")}</label>}</p>}
    </div>
  );
  if (kind === "all")
    return (
      <AppScreen brand={Brand} color={ACC}>
        <p className="text-[14px] font-bold">{tt("Booking")}</p>
        <div className="grid grid-cols-2 gap-1 text-[10.5px]">
          {[tt("Departure"), tt("Return"), tt("Adults"), tt("Children"), tt("Vehicle type"), tt("Vehicle length"), tt("Freight weight"), tt("Group leader"), tt("Pet passport"), tt("Cabin"), tt("Promo code")].map((f) => (
            <label key={f} className="block">{f}<input onFocus={() => ctx.miss(tt(`Looked at ${f}`))} className="mt-0.5 w-full rounded border border-[#CBD5E1] px-1" /></label>
          ))}
        </div>
        {bagField(false)}
        <p className="text-[10.5px] text-[#475569]">{tt("Terms: 2 bags included per passenger. Extra bags must be added in advance")} <label className="inline-flex items-center gap-1"><input type="checkbox" checked={extra} onChange={() => { setExtra((v) => !v); ctx.hit(tt("Added an extra bag")); }} />{tt("(extra bag)")}</label></p>
        <button type="button" onClick={book} className="w-full rounded-lg py-2 font-bold text-white" style={{ background: ACC }}>{tt("Book")}</button>
      </AppScreen>
    );
  if (kind === "hidden")
    return (
      <AppScreen brand={Brand} color={ACC}>
        <p className="text-[14px] font-bold">{tt("Book in seconds")}</p>
        <p className="rounded border border-[#CBD5E1] px-2 py-1">{tt("Elif Kaya · 14 June")}</p>
        {bagField(false)}
        <button type="button" onClick={book} className="w-full rounded-lg py-2 font-bold text-white" style={{ background: ACC }}>{tt("Book")}</button>
        <button type="button" onClick={() => { setHelp((h) => !h); ctx.miss(tt("Searched the help pages")); }} className="text-[11px] underline">{tt("Help")}</button>
        {help && <p className="text-[11px] text-[#475569]">{tt("Help › Travel › Luggage: 2 bags included. Extra bags can only be added by calling us.")}</p>}
      </AppScreen>
    );
  return (
    <AppScreen brand={Brand} color={ACC}>
      <p className="text-[11px] text-[#475569]">{tt(`Step ${step} of 3`)}</p>
      {step === 1 && <><p className="text-[14px] font-bold">{tt("Who travels, and when?")}</p><p className="rounded border border-[#CBD5E1] px-2 py-1">{tt("1 adult · 14 June · on foot")}</p><p className="text-[11px]"><button type="button" onClick={() => ctx.miss(tt("Opened Add a vehicle"))} className="underline">{tt("+ Add a vehicle")}</button> · <button type="button" onClick={() => ctx.miss(tt("Opened Add a pet"))} className="underline">{tt("+ Add a pet")}</button></p><button type="button" onClick={() => { setStep(2); ctx.hit(tt("Step 1 done")); }} className="w-full rounded-lg py-2 font-bold text-white" style={{ background: ACC }}>{tt("Continue")}</button></>}
      {step === 2 && <><p className="text-[14px] font-bold">{tt("Luggage")}</p>{bagField(true)}<button type="button" onClick={() => { setStep(3); ctx.hit(tt("Step 2 done")); }} className="w-full rounded-lg py-2 font-bold text-white" style={{ background: ACC }}>{tt("Continue")}</button></>}
      {step === 3 && <><p className="text-[14px] font-bold">{tt("Check and book")}</p><p>{tt(`1 adult · 14 June · ${bags} bags${extra ? " (1 extra)" : ""}`)}</p><button type="button" onClick={book} className="w-full rounded-lg py-2 font-bold text-white" style={{ background: ACC }}>{tt("Book")}</button></>}
    </AppScreen>
  );
}

export function DisclosureLab() {
  return (
    <TaskLab
      label={tt("One Seabird booking form: every field at once, step by step, and hidden too deep · a working product · Case assumption, example company")}
      point={tt("Progressive disclosure shows what is relevant now and keeps the rest one clear step away. It lowers the load. When information people need to decide is buried too deep, reduction turns into hiding: the screen is calm and the decision is unsafe.")}
      task={tt("You are Elif, travelling alone on foot on 14 June with three bags. Book, and make sure all three bags are covered.")}
      versions={[
        { id: "all", label: tt("Every field at once"), render: (ctx) => <Form ctx={ctx} kind="all" />, insight: tt("In plain words: twelve fields, including freight weight, group leader and pet passport. Elif reads them all and wonders which she must fill in; the extra-bag option hides in the small print.") },
        { id: "steps", label: tt("Step by step"), render: (ctx) => <Form ctx={ctx} kind="steps" />, insight: tt("In plain words: step 1 asks only who travels and when; the luggage rule sits next to the bag field, with the extra bag right there. A vehicle or a pet can be added if needed.") },
        { id: "hidden", label: tt("Hidden too deep"), render: (ctx) => <Form ctx={ctx} kind="hidden" />, insight: tt("In plain words: a name, a date and Book. It looks easy, but the luggage rule is only in the help pages. Elif books, brings three bags and is charged at the port.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · one pattern for similar tasks */

function Areas({ ctx, same }: { ctx: LabCtx; same: boolean }) {
  const [area, setArea] = useState<"tickets" | "freight">("tickets");
  if (ctx.finished) return <Done text={tt("Ticket and freight space for the van booked")} />;
  const bottomBtn = (label: string, onClick: () => void) => <button type="button" onClick={onClick} className="w-full rounded-lg py-3 font-bold text-white" style={{ background: ACC }}>{label}</button>;
  return (
    <AppScreen brand={Brand} color={ACC}>
      {area === "freight" && !same && <div className="flex justify-end"><button type="button" onClick={() => ctx.done(tt("Found Next in the freight area"))} className="rounded border border-[#64748B] px-2 text-[11px]">{tt("Next ›")}</button></div>}
      <p className="text-[11px] uppercase text-[#475569]">{area === "tickets" ? tt("Tickets") : tt("Freight")}</p>
      {area === "tickets" ? (
        <>
          <p className="text-[14px] font-bold">{tt("Harbour → Isle · Friday 08:15 · 1 adult")}</p>
          <div className="h-24" />
          {bottomBtn(tt("Continue"), () => { setArea("freight"); ctx.hit(tt("Ticket booked, now freight")); })}
        </>
      ) : (
        <>
          <p className={same ? "text-[14px] font-bold" : "text-[12px] italic"}>{tt("Van · 5.2 m · same crossing")}</p>
          {!same && <p className="text-[11px] text-[#475569]">{tt("Freight declaration and loading slot are assigned after submission.")}</p>}
          <div className="h-24" onClick={() => ctx.miss(tt("Looked for the button at the bottom"))} />
          {same && bottomBtn(tt("Continue"), () => ctx.done(tt("Continued in the freight area")))}
        </>
      )}
    </AppScreen>
  );
}

export function PatternLab() {
  return (
    <TaskLab
      label={tt("Two Seabird areas, tickets and freight, with different patterns and with the same pattern · a working product · Case assumption, example company")}
      point={tt("When similar tasks follow the same pattern, people learn once and then predict. Each new pattern for a similar task costs a fresh orientation, even when each page on its own is well designed.")}
      task={tt("You are Noah. Book your ticket, then book space for your van on the same crossing.")}
      versions={[
        { id: "diff", label: tt("Different patterns"), render: (ctx) => <Areas ctx={ctx} same={false} />, insight: tt("In plain words: in tickets Noah continues with a large button at the bottom; in freight there is a small “Next” at the top right. He looks at the bottom of the freight page and waits.") },
        { id: "same", label: tt("The same pattern"), render: (ctx) => <Areas ctx={ctx} same />, insight: tt("In plain words: both areas have the same layout and the Continue button in the same place. What Noah learnt in tickets works in freight at once.") },
      ]}
    />
  );
}
