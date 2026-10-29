"use client";

import { useState } from "react";
import { MeasureThumb } from "@/components/day5/mocks";
import { MatrixStory } from "@/components/dayFree/figs";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { tt } from "@/lib/lang";
import { FittsLab, HickLab, LawsLab, MillerLab } from "@/components/day5/labs";

/**
 * Day 5 · the teaching diagrams of Materi A and B. Example: Ticketo, a made-up cinema and event ticket app, with Leon and Mara (customers), Priya (UX lead) and Tobias
 * (product owner); never BankDirect, AdminFlow or MoveEasy, so no task is answered here. Interactive ones carry "The point" and an always-visible "What this shows"; the
 * story of each card is its pixel comic (data/day5/comics.ts); the static ones are drawn pictures (CLAUDE.md #20, #36, #51, #52).
 */

/* ------------------------------------------------------------------ A1 · Fitts on a phone checkout (interactive) */

export function FittsFig() {
  return <FittsLab />;
}

/* ------------------------------------------------------------------ A2 · Hick: all at once against staged (interactive) */

export function HickFig() {
  return <HickLab />;
}

/* ------------------------------------------------------------------ A3 · Miller: long against chunked (interactive) */

export function MillerFig() {
  return <MillerLab />;
}

/* ------------------------------------------------------------------ A4 · the three laws together (interactive) */

export function LawsFig() {
  return <LawsLab />;
}

/* ------------------------------------------------------------------ A5 · three measures weighed on four criteria (interactive) */

export function WeighFig() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    {
      id: "pay",
      name: tt("A large Pay button within the thumb's reach"),
      cells: {
        effect: { level: 3, reason: tt("Every buyer pays; most buy on a phone; mis-taps on Cancel stop.") },
        feasibility: { level: 3, reason: tt("One screen, two buttons change size and place.") },
        risk: { level: 1, reason: tt("Nothing is removed; Cancel stays, with space around it.") },
        time: { level: 3, reason: tt("It fits the next release.") },
      },
    },
    {
      id: "stage",
      name: tt("The showing chosen in three small steps"),
      cells: {
        effect: { level: 3, reason: tt("Choosing a showing is the slowest part of buying today.") },
        feasibility: { level: 2, reason: tt("The choice is rebuilt as three screens; developers and the cinema data team are needed.") },
        risk: { level: 2, reason: tt("Regulars who know their film may find three steps slower; a shortcut keeps them fast.") },
        time: { level: 2, reason: tt("It takes two releases.") },
      },
    },
    {
      id: "chunk",
      name: tt("The booking code chunked, the details in one box"),
      cells: {
        effect: { level: 2, reason: tt("Fewer people misread their code or look for their seats at the door.") },
        feasibility: { level: 3, reason: tt("One screen and one e-mail template.") },
        risk: { level: 1, reason: tt("The code stays the same; only its layout changes.") },
        time: { level: 3, reason: tt("It fits the next release.") },
      },
    },
  ];
  return (
    <Diagram label={tt("Ticketo weighs three measures on effect on users, feasibility, risk and time pressure · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("Each law points to a measure: a larger, reachable target (Fitts), fewer options at a time (Hick), chunked information (Miller). Weigh each on the same four questions and write the reason next to each rating.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {(["pay", "stage", "chunk"] as const).map((k, i) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{rows[i].name}</p>
            </div>
          ))}
        </div>
        <OptionGrid
          label={tt("Ticketo · three measures for the app")}
          caption={tt("Three measures for Ticketo (Case assumption, example company)")}
          rows={rows}
          cols={[
            { id: "effect", label: tt("Effect on users") },
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

/* ------------------------------------------------------------------ B1 · details against standards (static) */

export function StandardsFig() {
  return (
    <CompareFig
      label={tt("Ticketo fixing details one screen at a time, or deciding interaction standards once")}
      left={tt("Details, screen by screen")}
      right={tt("Interaction standards, once")}
      rows={[
        [tt("The Pay button is enlarged on the checkout; the gift-card team keeps a small one."), tt("Every main action has a minimum size and sits within the thumb's reach.")],
        [tt("The films menu is shortened; the events menu grows to fifteen items."), tt("No menu shows more than a few equal items; the rest are one step deeper.")],
        [tt("The booking code is chunked in the app, not in the e-mail."), tt("Every code, number and detail is chunked and grouped, in every channel.")],
        [tt("The same problems come back with every new feature."), tt("New features follow the standards from the start.")],
      ]}
      caption={tt("A detail fixed on one screen helps one screen. A standard decided once helps every screen, including the ones not built yet.")}
    />
  );
}

export function BusinessChainFig() {
  return (
    <ChainFig
      label={tt("From a button to the business")}
      steps={[
        { h: tt("An element"), b: tt("The size of a button, the number of options in a menu, the grouping of a code."), kind: "m" },
        { h: tt("A pattern"), b: tt("The same element used on every screen and in every channel."), kind: "a" },
        { h: tt("The product"), b: tt("How fast and safely thousands of people finish their tasks."), kind: "a" },
        { h: tt("The business"), b: tt("Support contacts, abandoned purchases, customers who stay or leave."), kind: "s" },
      ]}
      caption={tt("A small interaction problem becomes a strategic business problem when it repeats on every visit: then it shows up on the right-hand side.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · conflicts in a matrix (interactive) */

export function ConflictFig() {
  return (
    <MatrixStory
      label={tt("Five Ticketo designs by options shown at once and how fast and safely people finish · Exploratory · Case assumption")}
      point={tt("More options at once is not more speed, and fewer is not always faster: hiding everything behind many steps slows people down too. The aim is the main actions large and first, the rest reachable.")}
      title={tt("Ticketo designs")}
      xLabel={tt("Options shown at once")}
      yLabel={tt("Fast and safe to finish")}
      quads={[tt("Few options, fast"), tt("Many options, still fast: the aim"), tt("Few options, slow"), tt("Many options, slow")]}
      points={[
        { id: "p1", letter: "A", name: tt("Every film, event and offer on one screen"), x: 0.9, y: 0.2, reading: tt("Everything is visible, but nobody finds their showing fast. Feature richness against speed.") },
        { id: "p2", letter: "B", name: tt("Large main actions, the rest one step deeper"), x: 0.62, y: 0.82, reading: tt("Buying is fast and safe; everything else is one tap away. Close to the aim.") },
        { id: "p3", letter: "C", name: tt("One button and six steps"), x: 0.1, y: 0.3, reading: tt("Very calm, but every purchase takes six screens. Reduction becomes a hurdle.") },
        { id: "p4", letter: "D", name: tt("A minimal brand look with thin, small buttons"), x: 0.35, y: 0.42, reading: tt("It looks elegant, but the buttons are hard to hit on a phone. Brand against reachability.") },
        { id: "p5", letter: "E", name: tt("Shortcuts for regulars, a guided path for newcomers"), x: 0.7, y: 0.65, reading: tt("Fast for both groups, but harder to build. Speed against technical feasibility.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for Ticketo (static) */

export function DecisionFig() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for Ticketo")}
      boxes={[
        [tt("What we decide"), tt("A minimum size and a thumb-reachable position for every main action, starting with checkout and choosing a showing on the phone.")],
        [tt("What we do not know"), tt("How many purchases fail because of mis-taps; the app records finished purchases, not wrong taps.")],
        [tt("When we would reverse it"), tt("If the support contacts about wrong tickets and accidental cancellations do not drop in the first months.")],
        [tt("What we give up"), tt("The thin, minimal buttons of the brand look on the purchase screens.")],
      ]}
      rule={[
        [tt("Who owns the interaction standards"), tt("The head of UX owns the minimum sizes, the limit on equal options and the chunking rule for every channel; each team owns its content.")],
        [tt("How an exception is decided"), tt("A team that wants more visible options shows how often they are used and what the error data says; the product owner settles a tie.")],
      ]}
      caption={tt("A small interaction problem becomes a business problem when it repeats on every visit. That is why the decision says when it will be checked.")}
    />
  );
}
