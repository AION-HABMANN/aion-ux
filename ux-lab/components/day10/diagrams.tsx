"use client";

import { useState } from "react";
import { MeasureThumb } from "@/components/day10/mocks";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { tt } from "@/lib/lang";
import { DepthLab, KindsLab, PersonalLab, ThreeQuestionsLab, WaysLab } from "@/components/day10/labs";

/**
 * Day 10 · the teaching diagrams of Materi A and B. Example: Northline Rail, a made-up rail company with an app, with Ilka and Mats (passengers), Saskia (UX designer)
 * and Bram (product owner); never SmartAssist, CareerNavigator or CareGuide, so no task is answered here. Interactive ones carry "The point" and an always-visible
 * "What this shows"; the story of each card is its pixel comic (data/day10/comics.ts); the static ones are drawn pictures (CLAUDE.md #20, #36, #51, #52). Ideas from
 * the original Day 10 kept here: "which type is this?" for rule-based, adaptive and learning behaviour (A1) and the three-question test of transparency, control and
 * recoverability (A4).
 */

/* ------------------------------------------------------------------ A1 · rule, situation or learning (interactive) */

export function KindsFig() {
  return <KindsLab />;
}

/* ------------------------------------------------------------------ A2 · three ways to adapt (interactive) */

export function WaysFig() {
  return <WaysLab />;
}

/* ------------------------------------------------------------------ A3 · from not personal to far too personal (interactive slider) */

export function PersonalFig() {
  return <PersonalLab />;
}

/* ------------------------------------------------------------------ A4 · why, change, undo (interactive) */

export function ThreeQuestionsFig() {
  return <ThreeQuestionsLab />;
}

/* ------------------------------------------------------------------ A5 · from data to a suggestion, and where it breaks (static) */

export function DataChainFig() {
  return (
    <ChainFig
      label={tt("From data to a suggestion in the Northline app, and where it breaks")}
      steps={[
        { h: tt("Data"), b: tt("Bookings, trips, the station Ilka is at. Old or missing data: she moved, but her trips still say Hamburg."), kind: "m" },
        { h: tt("The situation"), b: tt("A weekday morning, a delay. A wrong reading: she is on holiday, not commuting."), kind: "a" },
        { h: tt("The suggestion"), b: tt("“We picked the 8:12 for you.” Confident, and only as good as the two steps before."), kind: "a" },
        { h: tt("The person"), b: tt("Expects it to be right, trusts it less after each miss."), kind: "s" },
      ]}
      caption={tt("Incomplete data and a misread situation produce confident mistakes. Start where the data is good and the situation is clear: the frequent, simple cases.")}
    />
  );
}

/* ------------------------------------------------------------------ A5 · three measures weighed (interactive) */

export function WeighFig() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    {
      id: "reason",
      name: tt("A reason and “not for me” on every suggestion"),
      cells: {
        effect: { level: 3, reason: tt("Passengers see why and can dismiss it; trust in the good suggestions grows.") },
        feasibility: { level: 3, reason: tt("The rules already know why; the app has to show it. Words and one button.") },
        risk: { level: 1, reason: tt("Low, as long as the reasons are true and in plain words.") },
        time: { level: 3, reason: tt("It fits the next release.") },
      },
    },
    {
      id: "board",
      name: tt("A personal departure board from trip history"),
      cells: {
        effect: { level: 2, reason: tt("Frequent travellers save a tap; occasional ones see little difference.") },
        feasibility: { level: 2, reason: tt("Needs the trip history to be clean; a few weeks of work.") },
        risk: { level: 2, reason: tt("Medium: wrong after a move or a change of job, until it relearns.") },
        time: { level: 2, reason: tt("Two releases.") },
      },
    },
    {
      id: "chat",
      name: tt("An AI chat assistant for every question"),
      cells: {
        effect: { level: 2, reason: tt("Quick for simple questions; refunds and lost bags often still need a person.") },
        feasibility: { level: 1, reason: tt("Needs every policy as data and a review process; months.") },
        risk: { level: 3, reason: tt("High: a confident wrong answer about a refund is worse than none.") },
        time: { level: 1, reason: tt("It does not fit the time.") },
      },
    },
  ];
  return (
    <Diagram label={tt("Northline weighs three measures on effect on users, feasibility, risk and time pressure · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("A reason and a way to dismiss are small changes with a large effect on trust; an assistant for everything is a large change with a high risk. Weigh each measure on the same four questions, with the reason next to each rating.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {(["reason", "board", "chat"] as const).map((k, i) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{rows[i].name}</p>
            </div>
          ))}
        </div>
        <OptionGrid
          label={tt("Northline · three measures for the app")}
          caption={tt("Three measures for Northline Rail (Case assumption, example company)")}
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

/* ------------------------------------------------------------------ B1 · AI features or an intelligent UX architecture (static) */

export function ArchitectureFig() {
  return (
    <CompareFig
      label={tt("Northline adding AI features to look modern, or building an intelligent UX architecture")}
      left={tt("AI features, to look modern")}
      right={tt("An intelligent UX architecture")}
      rows={[
        [tt("The board wants “AI in the app”; a chatbot is launched."), tt("A guiding vision says what help passengers get, how personal it may be, and what stays their decision.")],
        [tt("Each team adds its own recommender, each with its own logic."), tt("Principles: every suggestion says why, can be dismissed, and is personal only where the data is good.")],
        [tt("Nobody can say why a passenger saw a suggestion."), tt("One pattern for suggestions (reason, not for me, undo), built once, with an owner.")],
        [tt("Trust falls with every confident mistake."), tt("Fewer, reliable suggestions in the journeys where they help most; the rest later.")],
      ]}
      caption={tt("At senior level, an intelligent interface is a decision architecture for guidance, service quality and differentiation, not a technology trend.")}
    />
  );
}

export function LayersChainFig() {
  return (
    <ChainFig
      label={tt("The layers of an intelligent UX architecture, from a guiding vision to every touchpoint")}
      steps={[
        { h: tt("A guiding vision"), b: tt("“Northline helps passengers make the next good decision on their trip, says why, and leaves the choice to them.”"), kind: "m" },
        { h: tt("Principles"), b: tt("Personal only where the data is good and a mistake is harmless; every suggestion explains itself; a person in one step."), kind: "a" },
        { h: tt("Patterns"), b: tt("The suggestion card with its reason, “not for me” and undo; the voice assistant's read-back; built once."), kind: "a" },
        { h: tt("Every touchpoint"), b: tt("The app, the website, the station screens, the voice assistant, the staff's handhelds."), kind: "s" },
      ]}
      caption={tt("Leaders decide on the left: the support, the depth of personalisation and who owns it. Teams build on the right, from the patterns.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · the depth of personalisation per journey (interactive) */

export function DepthFig() {
  return <DepthLab />;
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for Northline (static) */

export function DecisionFig() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for Northline Rail")}
      boxes={[
        [tt("What we decide"), tt("Every suggestion in the app gets a reason, “not for me” and an undo first; the chat assistant for every question waits.")],
        [tt("What we do not know"), tt("How often suggestions are wrong; the app records clicks, not whether a suggestion fitted.")],
        [tt("When we would reverse it"), tt("If passengers rarely use the controls and ask for more automation, or if the reasons confuse more than they help.")],
        [tt("What we give up"), tt("The board's chatbot announcement this year, and some screen space.")],
      ]}
      rule={[
        [tt("Who owns intelligent UX"), tt("The head of customer experience owns the principles; data protection may veto any new use of data; each new intelligent function needs a short record of what it suggests, from which data, and how it is switched off.")],
        [tt("How a conflict is decided"), tt("Passenger trust and data protection first, then the passenger's benefit, then economics; the board settles a tie.")],
      ]}
      caption={tt("An intelligent feature is easy to switch on and hard to explain afterwards. A written owner and a record per function correct that.")}
    />
  );
}
