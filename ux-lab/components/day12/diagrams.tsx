"use client";

import clsx from "clsx";
import { useId, useState } from "react";
import { MeasureThumb } from "@/components/day12/mocks";
import { StateFig } from "@/components/dayFree/figs";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { tt } from "@/lib/lang";
import { PeopleLab, PlainLab, StockLab } from "@/components/day12/labs";

/**
 * Day 12 · the teaching diagrams of Materi A and B. Example: Greenway, a made-up online grocer, with Kofi (a blind customer who uses a screen reader), Liv (a
 * customer with dyslexia), Sanne (UX designer) and Henrik (product owner); never PublicAccess, LearnAccess or CitizenConnect, so no task is answered here.
 * Interactive ones carry "The point" and an always-visible "What this shows". Ideas from the original Day 12 kept here: the contrast slider (now computing the real
 * contrast ratio), the focus order demonstration (now a form you tab through yourself), plain language and error tolerance before and after, and "modern against
 * accessible" (B2). The deliberate barriers in A3's first two versions are labelled as such and stay inside that figure.
 */

/* ------------------------------------------------------------------ A1 · one checkout, four people (interactive) */

export function PeopleFig() {
  return <PeopleLab />;
}

/* ------------------------------------------------------------------ A2 · contrast, computed (interactive) */

const lum = (v: number) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const ratio = (grey: number) => {
  const L = lum(grey);
  return (1.05) / (L + 0.05);
};

export function ContrastFig() {
  const [g, setG] = useState(170);
  const id = useId();
  const r = ratio(g);
  const hex = `#${g.toString(16).padStart(2, "0").repeat(3)}`;
  const ok = r >= 4.5;
  const large = r >= 3;
  return (
    <Diagram label={tt("A Greenway price label on white, with the contrast ratio computed as you move the slider · Exploratory · Case assumption")}>
      <div className="space-y-3">
        <ThePoint>{tt("Contrast can be measured. The standard asks for a ratio of at least 4.5 to 1 between normal text and its background, and 3 to 1 for large text. Light grey on white looks elegant on a designer's screen and fails people with poor eyesight, older eyes and anyone in sunlight.")}</ThePoint>
        <div className="space-y-1">
          <label htmlFor={id} className="text-caption font-semibold text-ink">{tt(`Text colour: ${hex}`)}</label>
          <input id={id} type="range" min={0} max={230} step={1} value={g} onChange={(e) => setG(Number(e.target.value))} className="w-full accent-[#1750A8]" aria-valuetext={tt(`${hex}, contrast ${r.toFixed(1)} to 1`)} />
        </div>
        {/* SVG text: the label is meant to be faint at low settings, and the lab's own contrast check reads HTML text only. */}
        <svg role="img" aria-label={tt(`A price label: “Oat milk 1.79, offer until Sunday” in ${hex} on white, contrast ${r.toFixed(1)} to 1`)} viewBox="0 0 360 72" className="mx-auto block w-full max-w-[360px] rounded-lg border border-line bg-white">
          <text x="16" y="30" fontSize="16" fontWeight="600" fill={hex} fontFamily="inherit">{tt("Oat milk · 1.79")}</text>
          <text x="16" y="54" fontSize="13" fill={hex} fontFamily="inherit">{tt("Offer until Sunday · 1 litre · organic")}</text>
        </svg>
        <p className="text-center text-body font-semibold text-ink" aria-live="polite">
          {tt(`Contrast ${r.toFixed(1)} : 1 · ${ok ? "meets 4.5 : 1 for normal text" : large ? "only enough for large text (3 : 1)" : "below 3 : 1, too low even for large text"}`)}
        </p>
        <Insight>{ok ? tt("In plain words: readable for most people, also outside. Darker is not uglier; it is what lets the label do its job.") : large ? tt("In plain words: fine for a big headline, too faint for the small line. People with poor eyesight and anyone in sunlight start to lose it.") : tt("In plain words: elegant on a good screen in a dark room, and gone for many customers. This is the colour many brand guides choose for secondary text.")}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A2 · colour only, and text alternatives (interactive) */

export function StockFig() {
  return <StockLab />;
}

/* ------------------------------------------------------------------ A3 · try it with the keyboard (interactive, real) */

function DemoForm({ kind }: { kind: "mouse" | "hidden" | "good" }) {
  const [msg, setMsg] = useState("");
  const field = "w-full rounded border border-[#B9C6BE] px-2 py-1.5 text-[14px]";
  if (kind === "mouse")
    return (
      <div className="space-y-2">
        <div className="text-[13px]">{tt("Delivery slot")}</div>
        <div className="flex flex-wrap gap-2">
          {["Thu 18–20", "Fri 08–10", "Fri 18–20"].map((s) => (
            <div key={s} onClick={() => setMsg(tt(`Slot ${s} chosen.`))} className="cursor-pointer rounded border border-[#B9C6BE] bg-white px-3 py-2 text-[13px]">{s}</div>
          ))}
        </div>
        <div onClick={() => setMsg(tt("Order placed."))} className="inline-block cursor-pointer rounded bg-[#1F6F43] px-4 py-2 text-[13px] font-semibold text-white">{tt("Place order")}</div>
        <p aria-live="polite" className="text-[13px]">{msg}</p>
      </div>
    );
  if (kind === "hidden")
    return (
      <div className="flex flex-col gap-2">
        <button type="button" onClick={() => setMsg(tt("Order placed."))} className="order-3 self-start rounded bg-[#1F6F43] px-4 py-2 text-[13px] font-semibold text-white" style={{ outline: "none" }}>{tt("Place order")}</button>
        <input aria-label={tt("Voucher code")} placeholder={tt("Voucher code")} className={clsx(field, "order-2")} style={{ outline: "none" }} />
        <input aria-label={tt("Delivery note")} placeholder={tt("Delivery note")} className={clsx(field, "order-1")} style={{ outline: "none" }} />
        <p aria-live="polite" className="order-4 text-[13px]">{msg}</p>
      </div>
    );
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[13px]">{tt("Delivery note")}<input className={field} /></label>
      <label className="text-[13px]">{tt("Voucher code")}<input className={field} /></label>
      <button type="button" onClick={() => setMsg(tt("Order placed."))} className="self-start rounded bg-[#1F6F43] px-4 py-2 text-[13px] font-semibold text-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]">{tt("Place order")}</button>
      <p aria-live="polite" className="text-[13px]">{msg}</p>
    </div>
  );
}

export function KeyboardFig() {
  const [v, setV] = useState<"mouse" | "hidden" | "good">("mouse");
  const insight = {
    mouse: tt("In plain words: the slots and the order button are pictures that react to a mouse click. Press Tab: the focus skips them all. Kofi, Arjun and anyone with a switch or voice control cannot order."),
    hidden: tt("In plain words: these are real controls, so Tab reaches them, but the focus marker was removed and the order on screen differs from the order in the code. Press Tab and try to tell where you are: the focus starts on the button at the bottom, then jumps up through the fields in reverse."),
    good: tt("In plain words: real labelled fields and a real button, in the order you see them, with a strong focus marker. Tab, type, Tab, Enter: done, without a mouse."),
  }[v];
  return (
    <Diagram label={tt("A Greenway checkout form in three versions; click into it and press Tab · Exploratory · Case assumption")}>
      <div className="space-y-3">
        <ThePoint>{tt("Many people do not use a mouse: keyboard users, screen-reader users, switch and voice-control users. Everything must work by keyboard, the focus must be visible, and it must move in the order people read. You can test it in ten seconds: put the mouse away and press Tab.")}</ThePoint>
        <div role="radiogroup" aria-label={tt("Choose a version")} className="flex flex-wrap gap-2">
          {(
            [
              ["mouse", tt("Mouse only")],
              ["hidden", tt("Hidden focus, wrong order")],
              ["good", tt("Keyboard done right")],
            ] as ["mouse" | "hidden" | "good", string][]
          ).map(([k, l]) => (
            <button key={k} type="button" role="radio" aria-checked={v === k} onClick={() => setV(k)} className={clsx("btn btn-sm min-h-[40px] border", v === k ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>{l}</button>
          ))}
        </div>
        <div role="group" aria-label={v === "good" ? tt("Demonstration form") : tt("Demonstration form with deliberate barriers")} className="mx-auto max-w-[380px] rounded-lg border border-line bg-[#F7FAF8] p-4">
          <DemoForm key={v} kind={v} />
        </div>
        {v !== "good" && <p className="text-micro text-ash">{tt("These barriers are deliberate and stay inside this demonstration.")}</p>}
        <Insight>{insight}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A4 · plain words and helpful errors (interactive) */

export function PlainFig() {
  return <PlainLab />;
}

export function ErrorFig() {
  const [val, setVal] = useState("31/02");
  const [shown, setShown] = useState(false);
  const id = useId();
  const valid = /^\d{1,2}\.\d{1,2}\.\d{4}$/.test(val.trim());
  return (
    <Diagram label={tt("The same mistake in the Greenway form with two error messages · Exploratory · Case assumption")}>
      <div className="space-y-3">
        <ThePoint>{tt("Everyone makes mistakes in forms. Error tolerance means the form says what went wrong, where, and how to fix it, keeps what was typed, and does not blame the person. “Invalid input” does none of it.")}</ThePoint>
        <div className="mx-auto flex max-w-[460px] flex-wrap items-end gap-2">
          <div className="min-w-0 flex-1">
            <label htmlFor={id} className="text-caption font-semibold text-ink">{tt("Delivery date")}</label>
            <input id={id} value={val} onChange={(e) => { setVal(e.target.value); setShown(false); }} className="w-full rounded border border-line px-2 py-1.5 text-body" />
          </div>
          <button type="button" onClick={() => setShown(true)} className="btn btn-sm min-h-[40px] border border-line bg-paper">{tt("Check")}</button>
        </div>
        {shown && (
          <div aria-live="polite" className="grid gap-2 sm:grid-cols-2">
            {valid ? (
              <p className="rounded border border-line bg-paper p-2 text-caption sm:col-span-2">{tt("No error: both versions accept it. Type something like 31/02 to see the two messages.")}</p>
            ) : (
              <>
                <div className="rounded border border-[#E08C8C] bg-[#FDF2F2] p-2 text-caption">
                  <p className="font-semibold">{tt("Unhelpful")}</p>
                  <p>{tt("Invalid input.")}</p>
                </div>
                <div className="rounded border border-[#7CC48D] bg-[#F2FAF4] p-2 text-caption">
                  <p className="font-semibold">{tt("Helpful")}</p>
                  <p>{tt(`“${val}” is not a date we can read. Please write day, month and year with dots, for example 14.11.2026. Deliveries are possible Monday to Saturday.`)}</p>
                </div>
              </>
            )}
          </div>
        )}
        <Insight>{tt("In plain words: the helpful message repeats what was typed, says the format with an example, and adds the rule the person could not know. It costs one sentence.")}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A5 · the four principles (static) */

export function PourFig() {
  return (
    <ChainFig
      label={tt("The four principles of the accessibility standard, each with a Greenway example")}
      steps={[
        { h: tt("Perceivable"), b: tt("Everyone can perceive it: contrast, text alternatives for images, nothing by colour alone."), kind: "m" },
        { h: tt("Operable"), b: tt("Everyone can operate it: keyboard, visible focus, enough time, no flashing."), kind: "a" },
        { h: tt("Understandable"), b: tt("Everyone can understand it: plain words, predictable pages, helpful errors."), kind: "a" },
        { h: tt("Robust"), b: tt("It works with assistive technology: proper buttons, labels and structure in the code."), kind: "s" },
      ]}
      caption={tt("WCAG 2.2 groups its requirements under these four principles; level AA is the usual target. In the EU, public bodies must meet it, and since 28 June 2025 the European Accessibility Act covers many private services such as online shops and banking.")}
    />
  );
}

/* ------------------------------------------------------------------ A5 · three measures weighed (interactive) */

export function WeighFig() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    {
      id: "components",
      name: tt("Fix contrast, focus and labels in the shared components"),
      cells: {
        effect: { level: 3, reason: tt("Every page uses the buttons, fields and tiles: one repair reaches all customers.") },
        legal: { level: 3, reason: tt("It removes the most common failures of the standard at once.") },
        feasibility: { level: 2, reason: tt("A few weeks for the design system team.") },
        risk: { level: 1, reason: tt("Low; the brand colours stay, only shades change.") },
        time: { level: 3, reason: tt("It fits this quarter.") },
      },
    },
    {
      id: "alt",
      name: tt("Write text alternatives for 4,000 product images"),
      cells: {
        effect: { level: 2, reason: tt("Blind customers can tell products apart; most product names already say a lot.") },
        legal: { level: 2, reason: tt("It closes one failure across many pages.") },
        feasibility: { level: 1, reason: tt("Months of writing, unless the product data already holds a description.") },
        risk: { level: 1, reason: tt("Low.") },
        time: { level: 1, reason: tt("It does not fit this quarter in full.") },
      },
    },
    {
      id: "overlay",
      name: tt("Buy an “accessibility overlay” widget that promises compliance"),
      cells: {
        effect: { level: 1, reason: tt("It adds a menu of settings on top; the missing labels and the keyboard trap underneath stay.") },
        legal: { level: 1, reason: tt("It does not make the site meet the standard, whatever the sales page says.") },
        feasibility: { level: 3, reason: tt("One line of code.") },
        risk: { level: 3, reason: tt("High: disabled customers and the press have criticised such widgets; it signals that nobody fixed the site.") },
        time: { level: 3, reason: tt("Today.") },
      },
    },
  ];
  return (
    <Diagram label={tt("Greenway weighs three measures on effect on users, legal certainty, feasibility, risk and time pressure · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("Fixing where barriers are made (the shared components) is a moderate change with a large effect; a widget on top is a tiny change with almost no effect and a real risk. Weigh each measure on the same criteria, with the reason next to each rating.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {(["components", "alt", "overlay"] as const).map((k, i) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{rows[i].name}</p>
            </div>
          ))}
        </div>
        <OptionGrid
          label={tt("Greenway · three measures for the shop")}
          caption={tt("Three measures for Greenway (Case assumption, example company)")}
          rows={rows}
          cols={[
            { id: "effect", label: tt("Effect on users") },
            { id: "legal", label: tt("Legal certainty") },
            { id: "feasibility", label: tt("Feasibility") },
            { id: "risk", label: tt("Risk") },
            { id: "time", label: tt("Time pressure: fits the time") },
          ]}
          selected={sel}
          onSelect={setSel}
        />
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B1 · compliance task or quality (static) */

export function ArchitectureFig() {
  return (
    <CompareFig
      label={tt("Greenway treating accessibility as a launch check, or building it into how products are made")}
      left={tt("A compliance task at the end")}
      right={tt("Part of quality from the start")}
      rows={[
        [tt("An audit before launch finds 140 failures; a few are fixed, the rest wait."), tt("A guiding vision: every customer can shop on their own; a page that excludes someone is not finished.")],
        [tt("Each team repairs its own pages afterwards."), tt("Barriers are fixed where they are made: the components, the templates, the writing rules.")],
        [tt("New pages bring the same barriers back."), tt("WCAG 2.2 AA is part of “done” for every release and every purchase.")],
        [tt("An accessibility statement says “partially compliant” every year."), tt("Testing with disabled customers; an owner who can stop a release.")],
      ]}
      caption={tt("At senior level, accessibility is a dimension of quality and responsibility, built into the product system, not a check that comes too late.")}
    />
  );
}

export function LayersChainFig() {
  return (
    <ChainFig
      label={tt("The layers of an accessibility architecture, from a guiding vision to every page")}
      steps={[
        { h: tt("A guiding vision"), b: tt("“Every customer can find, choose and pay on their own, with any device or assistive technology.”"), kind: "m" },
        { h: tt("Principles and target"), b: tt("WCAG 2.2 AA; plain language; nothing by colour alone; tested with disabled customers."), kind: "a" },
        { h: tt("Components and rules"), b: tt("Accessible buttons, fields and tiles in the design system; writing rules for product texts."), kind: "a" },
        { h: tt("Every page and channel"), b: tt("The shop, the app, the newsletter, the customer service chat, the PDFs."), kind: "s" },
      ]}
      caption={tt("Leaders decide on the left: the vision, the target and who owns it. Teams build on the right, from components that are already accessible.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · three conflicts (interactive) */

export function ConflictFig() {
  const box = (title: string, body: string, who: string) => (
    <div role="img" aria-label={`${title}. ${body}. ${who}`} className="mx-auto max-w-[360px] space-y-2 rounded-lg border border-line bg-white p-3 text-caption text-ink">
      <p className="font-semibold">{title}</p>
      <p>{body}</p>
      <p className="text-ash">{who}</p>
    </div>
  );
  return (
    <StateFig
      label={tt("Three Greenway decisions, each a conflict between goals · Exploratory · Case assumption")}
      point={tt("Effort, one standard, the diversity of users, the brand and legal certainty pull apart. Decide where to fix once, where to give people options, and where the law sets the minimum, and say what you give up.")}
      states={[
        { id: "brand", button: tt("The brand green"), picture: box(tt("The brand green against legibility"), tt("The light brand green fails on white text. Decision: keep it for large shapes and the logo, use a darker shade for text and buttons."), tt("Brand team for the light green; accessibility and legal for the darker shade.")), insight: tt("In plain words: the brand stays recognisable, and every text passes. Giving up the light green on buttons is the price; most customers will not notice, those who could not read it will.") },
        { id: "options", button: tt("A settings panel"), picture: box(tt("Good defaults against options"), tt("A panel with larger text and more spacing is tempting. Decision: first make the defaults work for most people, then add a few options later."), tt("Product wants the panel as a visible signal; UX wants the defaults fixed first.")), insight: tt("In plain words: options help some people, but most never open them, and they do not repair a broken default. Good defaults first, options second.") },
        { id: "order", button: tt("The order of repairs"), picture: box(tt("Everything at once against what matters most"), tt("The audit lists 140 failures. Decision: checkout, search and the components first; old recipe PDFs last, with an accessible contact route meanwhile."), tt("Legal wants everything; finance wants the minimum; customers want to pay.")), insight: tt("In plain words: key tasks and the things every page uses come first. Saying which failures wait, and why, is part of the decision.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for Greenway (static) */

export function DecisionFig() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for Greenway")}
      boxes={[
        [tt("What we decide"), tt("The components, checkout and search are repaired first; WCAG 2.2 AA becomes part of “done”; no overlay widget.")],
        [tt("What we do not know"), tt("Which barrier loses the most customers; complaints are not sorted by barrier.")],
        [tt("When we would reverse it"), tt("If tests with disabled customers show another journey stops more people than checkout.")],
        [tt("What we give up"), tt("A quick “we are compliant” announcement this quarter.")],
      ]}
      rule={[
        [tt("Who owns accessibility"), tt("The head of UX owns the principles and the target; an accessibility lead may stop a release; legal keeps the statement; the brand team chooses colours within the contrast rule.")],
        [tt("How a conflict is decided"), tt("The customer's ability to complete the task and the legal minimum first, then the brand, then effort; the board settles a tie.")],
      ]}
      caption={tt("A release that excludes someone is not finished. A check in every definition of done, and an owner who can say no, make that hold.")}
    />
  );
}
