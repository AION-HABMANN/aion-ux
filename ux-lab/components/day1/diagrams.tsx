"use client";

import { useState } from "react";
import { MeasureThumb } from "@/components/day1/mocks";
import { MatrixStory } from "@/components/dayFree/figs";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { tt } from "@/lib/lang";
import { AimsLab, AttentionLab, LooksWorksLab, ToneLab } from "@/components/day1/labs";

/**
 * Day 1 · the teaching diagrams of Materi A and B. Example company: Nordwind, a made-up travel-booking app, with Mia and Tom (customers), Jana (UX lead) and Ben
 * (product owner); never CarePath, SkillFlow or SafeHome, so no task is answered here. Interactive ones carry "The point" and an always-visible "What this shows";
 * the story of each card is its pixel comic (data/day1/comics.ts) (CLAUDE.md #20, #36, #51); the static ones are drawn pictures (#52).
 */

/* ------------------------------------------------------------------ A1 · looks good against works well (interactive) */

export function LooksWorksFig() {
  return <LooksWorksLab />;
}

/* ------------------------------------------------------------------ A2 · from stimulus to decision (static) and where the eye goes (interactive) */

export function SeeChainFig() {
  return (
    <ChainFig
      label={tt("From what the eye takes in to a decision: four steps")}
      steps={[
        { h: tt("1 · Taking in"), b: tt("The eye collects light; the brain detects edges, colour, size and movement."), kind: "m" },
        { h: tt("2 · Steering attention"), b: tt("What differs from its surroundings is processed first."), kind: "a" },
        { h: tt("3 · Recognising patterns"), b: tt("The brain groups what it sees and matches it to what it knows: a row of boxes is a menu."), kind: "a" },
        { h: tt("4 · Making sense and deciding"), b: tt("Meaning is built, options are compared, and the person acts."), kind: "s" },
      ]}
      caption={tt("Each step can go wrong in an interface: a weak signal is missed, a strong one steals attention, an unfamiliar pattern is not recognised, and too much at once leaves no room to decide.")}
    />
  );
}

export function AttentionFig() {
  return <AttentionLab />;
}

/* ------------------------------------------------------------------ A3 · three aims switched on one at a time (interactive) */

export function AimsFig() {
  return <AimsLab />;
}

/* ------------------------------------------------------------------ A4 · the same payment step in three tones (interactive) */

export function ToneFig() {
  return <ToneLab />;
}

/* ------------------------------------------------------------------ A5 · three measures weighed on four criteria (interactive) */

export function WeighFig4() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    {
      id: "button",
      name: tt("One clear Book button on the trip page"),
      cells: {
        effect: { level: 3, reason: tt("Most people who reach the trip page want to book, and today they hesitate between three equal buttons.") },
        feasibility: { level: 3, reason: tt("It changes one element on one page; the design team can do it without the app developers.") },
        risk: { level: 1, reason: tt("It removes nothing; “Details” and “Share” stay as quieter links.") },
        time: { level: 3, reason: tt("It fits the next release and shows its effect in the first week.") },
      },
    },
    {
      id: "steps",
      name: tt("A step line in the check-in (Step 2 of 3)"),
      cells: {
        effect: { level: 2, reason: tt("It helps everyone who checks in to see how far they are, and fewer give up halfway.") },
        feasibility: { level: 2, reason: tt("The three check-in screens need a shared header; the developers have to touch each of them.") },
        risk: { level: 1, reason: tt("It adds information and takes nothing away.") },
        time: { level: 2, reason: tt("It fits within the next two releases.") },
      },
    },
    {
      id: "photos",
      name: tt("Large photos at the top of every page"),
      cells: {
        effect: { level: 1, reason: tt("It makes the app more attractive but helps no one find or do anything faster.") },
        feasibility: { level: 2, reason: tt("Photos have to be chosen and licensed for every destination.") },
        risk: { level: 3, reason: tt("It pushes the dates and the main button down, the very thing people come for.") },
        time: { level: 1, reason: tt("Finding photos for every destination takes longer than the next release.") },
      },
    },
  ];
  return (
    <Diagram label={tt("Nordwind weighs three measures on effect on users, feasibility, risk and time pressure · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("Weigh every measure on the same four questions and write the reason next to each rating. The order follows from the reasons: a measure with a high effect that can be done quickly and safely comes first.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {(["button", "steps", "photos"] as const).map((k, i) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{rows[i].name}</p>
            </div>
          ))}
        </div>
        <OptionGrid
          label={tt("Nordwind · three measures for the booking app")}
          caption={tt("Three measures for Nordwind (Case assumption, example company)")}
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

/* ------------------------------------------------------------------ B1 · design steers perception, behaviour and decision (static) */

export function SteerChainFig() {
  return (
    <ChainFig
      label={tt("What a design steers, from left to right")}
      steps={[
        { h: tt("Perception"), b: tt("What people notice first, and what they miss."), kind: "m" },
        { h: tt("Understanding"), b: tt("Whether they can tell what something is and what it does."), kind: "a" },
        { h: tt("Behaviour"), b: tt("What they do: tap, read on, call, give up."), kind: "a" },
        { h: tt("Decision"), b: tt("Whether they book, report, sign or stay with the company."), kind: "s" },
      ]}
      caption={tt("A Neuro-UX strategy chooses the effect at each link on purpose, for every channel, instead of letting each screen decide by accident.")}
    />
  );
}

export function ChannelsFig() {
  return (
    <CompareFig
      label={tt("Nordwind's journey across website, app and chatbot: a different logic in each channel, or one shared logic")}
      left={tt("Each channel its own logic")}
      right={tt("One shared effect logic")}
      rows={[
        [tt("The website calls it “booking”, the app “trip”, the chatbot “order”."), tt("One word for one thing in every channel.")],
        [tt("Red means a sale on the website and an error in the app."), tt("A colour means the same everywhere; red only for a real problem.")],
        [tt("Mia starts on the website and does not find her trip in the app."), tt("She finds the same next step wherever she continues.")],
        [tt("Each team improves its own screens."), tt("Every team serves the same chosen effect: orientation and trust.")],
      ]}
      caption={tt("People are lost at the changeovers when every channel follows its own logic. The strategy is the shared effect, not a shared look.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · conflicting goals in a matrix (interactive) */

export function ConflictFig() {
  return (
    <MatrixStory
      label={tt("Five Nordwind designs by clarity and activation · Exploratory · Case assumption")}
      point={tt("Goals pull against each other: the most activating design is rarely the clearest, and the clearest can be dull. The aim is the top right: clear enough to act on and activating enough to want to. Every move away from it gives something up.")}
      title={tt("Nordwind start screens")}
      xLabel={tt("Clarity: people can tell what to do")}
      yLabel={tt("Activation: people want to start")}
      quads={[tt("Exciting but confusing"), tt("The aim"), tt("Neither"), tt("Clear but dull")]}
      points={[
        { id: "p1", letter: "A", name: tt("Animated deals wall"), x: 0.18, y: 0.86, reading: tt("Many moving offers make people curious, but nobody can tell where to book. Activation without clarity.") },
        { id: "p2", letter: "B", name: tt("Plain list of trips"), x: 0.86, y: 0.2, reading: tt("Everyone finds their trip at once, but nothing invites them to plan the next one. Clarity without activation.") },
        { id: "p3", letter: "C", name: tt("Next trip first, one inspiring tip"), x: 0.8, y: 0.78, reading: tt("The trip and its next step are clear, and one tip invites the next journey. Close to the aim.") },
        { id: "p4", letter: "D", name: tt("New gesture-based menu"), x: 0.3, y: 0.55, reading: tt("New and impressive, but unfamiliar: people do not know where the menu went. Innovation against familiarity.") },
        { id: "p5", letter: "E", name: tt("Large photos, small buttons"), x: 0.4, y: 0.65, reading: tt("Beautiful, but the dates and the button are pushed down. Aesthetics against clarity.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for Nordwind (static) */

export function DecisionFig() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for Nordwind")}
      boxes={[
        [tt("What we decide"), tt("The app and the website use one word and one next step for a booking, starting with the change-booking path.")],
        [tt("What we do not know"), tt("Whether most people lost between channels come from the website or from e-mail links.")],
        [tt("When we would reverse it"), tt("If the calls about bookings do not drop within the first months.")],
        [tt("What we give up"), tt("The app team's own naming, and a new look for the website this year.")],
      ]}
      rule={[
        [tt("Who decides"), tt("The head of customer experience decides across channels; legal and IT may object with a reason; the board settles a tie.")],
        [tt("How to decide next time"), tt("Name the effect, the conflict and the risk, decide, and say when you will look again.")],
      ]}
      caption={tt("A decision you can answer for is not one without doubt; it is one that says what is not known and when it will be checked.")}
    />
  );
}
