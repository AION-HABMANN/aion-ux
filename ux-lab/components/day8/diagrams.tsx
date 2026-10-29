"use client";

import { useState } from "react";
import { MeasureThumb } from "@/components/day8/mocks";
import { MatrixStory } from "@/components/dayFree/figs";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { tt } from "@/lib/lang";
import { ElementsLab, StoryLab, TransitionLab, WeightLab } from "@/components/day8/labs";

/**
 * Day 8 · the teaching diagrams of Materi A and B. Example: Lantern Kitchens, a made-up kitchen maker with an online planner and an app, with Iris and Pavel
 * (customers), June (content designer) and Arne (product owner); never StartSmart, FutureSkills or GreenHome, so no task is answered here. Interactive ones carry "The
 * point" and an always-visible "What this shows"; the story of each card is its pixel comic (data/day8/comics.ts); the static ones are drawn pictures (CLAUDE.md #20,
 * #36, #51, #52).
 */

/* ------------------------------------------------------------------ A1 · a list of functions and a journey (interactive) */

export function StoryFig() {
  return <StoryLab />;
}

/* ------------------------------------------------------------------ A2 · goal, progress and resolution (interactive) */

export function ElementsFig() {
  return <ElementsLab />;
}

/* ------------------------------------------------------------------ A3 · the moment between two steps (interactive) */

export function TransitionFig() {
  return <TransitionLab />;
}

/* ------------------------------------------------------------------ A4 · how much story against clarity (interactive) */

export function OverloadFig() {
  return (
    <MatrixStory
      label={tt("Five Lantern Kitchens journeys by how much story they carry and how clear and quick they stay · Exploratory · Case assumption")}
      point={tt("More story is not the aim; a clear story is. A journey with a goal, a path and short transitions raises orientation, motivation and memorability. A journey with staged scenes and long texts turns into overload and costs time and trust.")}
      title={tt("Lantern Kitchens journeys")}
      xLabel={tt("Clear and quick")}
      yLabel={tt("Carries much story")}
      quads={[tt("Overloaded"), tt("A clear story: the aim"), tt("Neither"), tt("Clear, but no story")]}
      points={[
        { id: "p1", letter: "A", name: tt("A brand film and a long scene before every step"), x: 0.14, y: 0.88, reading: tt("Much story, little clarity: people wait, scroll and lose the steps. Narrative overload.") },
        { id: "p2", letter: "B", name: tt("Goal, path of four stages, short transitions, a real ending"), x: 0.8, y: 0.74, reading: tt("A story that serves the task: people know where they are going and get there quickly. Close to the aim.") },
        { id: "p3", letter: "C", name: tt("Clear numbered steps, nothing else"), x: 0.86, y: 0.2, reading: tt("Quick and clear, but no goal and no sense of progress: correct and forgettable.") },
        { id: "p4", letter: "D", name: tt("A list of functions"), x: 0.32, y: 0.12, reading: tt("Neither a story nor a clear path: people do not know where to start.") },
        { id: "p5", letter: "E", name: tt("A progress bar and a cheerful line on every screen"), x: 0.58, y: 0.5, reading: tt("Some story, mostly clear; the lines repeat and start to feel like padding.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A5 · from an action to its meaning (static) and three measures (interactive) */

export function MeaningChainFig() {
  return (
    <ChainFig
      label={tt("From an action to its meaning for the user")}
      steps={[
        { h: tt("An action"), b: tt("For example: entering the room's measurements."), kind: "m" },
        { h: tt("Its context"), b: tt("“So your cabinets fit to the centimetre.”"), kind: "a" },
        { h: tt("Its place in the journey"), b: tt("“Your room is in. Next: your style.”"), kind: "a" },
        { h: tt("A meaning"), b: tt("Not a form filled in, but a step towards her own kitchen."), kind: "s" },
      ]}
      caption={tt("Storytelling activates, gives context and embeds an action in a meaning. It works in one line, not in a scene.")}
    />
  );
}

export function WeighFig() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    {
      id: "goal",
      name: tt("A start screen with the goal and the first step"),
      cells: {
        effect: { level: 3, reason: tt("Every customer knows at once where the planner leads and how to begin.") },
        feasibility: { level: 3, reason: tt("One screen and a few lines, written by June.") },
        risk: { level: 1, reason: tt("Low, as long as the promise of the goal is kept.") },
        time: { level: 3, reason: tt("It fits the next release.") },
      },
    },
    {
      id: "path",
      name: tt("A path of four stages through the planner"),
      cells: {
        effect: { level: 3, reason: tt("Customers see how far they have come and how much is left, so fewer give up.") },
        feasibility: { level: 2, reason: tt("The planner has to know which stage a customer is in; the developers need some weeks.") },
        risk: { level: 1, reason: tt("Low; the steps stay as they are.") },
        time: { level: 2, reason: tt("It takes two releases.") },
      },
    },
    {
      id: "film",
      name: tt("A brand film before the planner starts"),
      cells: {
        effect: { level: 1, reason: tt("Some enjoy it once; most skip it to get to their kitchen.") },
        feasibility: { level: 1, reason: tt("A film needs a production team and marketing's time.") },
        risk: { level: 3, reason: tt("It delays everyone and tells the brand's story, not the customer's.") },
        time: { level: 1, reason: tt("It takes the whole season.") },
      },
    },
  ];
  return (
    <Diagram label={tt("Lantern Kitchens weighs three measures on effect on users, feasibility, risk and time pressure · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("A goal on the first screen and a visible path are small changes with a large effect; a staged film is a large change with a small effect and a high risk. Weigh each measure on the same four questions, with the reason next to each rating.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {(["goal", "path", "film"] as const).map((k, i) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{rows[i].name}</p>
            </div>
          ))}
        </div>
        <OptionGrid
          label={tt("Lantern Kitchens · three measures for the planner")}
          caption={tt("Three measures for Lantern Kitchens (Case assumption, example company)")}
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

/* ------------------------------------------------------------------ B1 · storytelling as communication against narrative UX (static) */

export function ArchitectureFig() {
  return (
    <CompareFig
      label={tt("Lantern Kitchens treating storytelling as communication, or building it into the experience architecture")}
      left={tt("Storytelling as communication")}
      right={tt("Narrative UX in the experience architecture")}
      rows={[
        [tt("Marketing tells the brand story on the website."), tt("A guiding vision says how every journey begins, carries people and ends.")],
        [tt("The planner is built step by step from the order of the data."), tt("Every journey is built around the customer's goal and its stages.")],
        [tt("Each team writes its own steps and messages."), tt("Patterns for entries, progress, transitions and endings are built once.")],
        [tt("The website promises a journey the planner does not give."), tt("The product keeps the promise in every step.")],
      ]}
      caption={tt("The journey people experience is built by product teams every day. That is why storytelling belongs in the experience architecture, not only in communication.")}
    />
  );
}

export function NarrativeLayersFig() {
  return (
    <ChainFig
      label={tt("The layers of narrative UX, from a guiding vision to every step")}
      steps={[
        { h: tt("A guiding vision"), b: tt("“In every journey customers know where it leads, see how far they are, and finish with something in hand.”"), kind: "m" },
        { h: tt("Principles"), b: tt("Start with the goal; show the path; story only where it serves the task."), kind: "a" },
        { h: tt("Patterns"), b: tt("The entry, the progress display, the transition, the ending; built once."), kind: "a" },
        { h: tt("Every journey"), b: tt("The planner, the fitting booking, the reorder, the app."), kind: "s" },
      ]}
      caption={tt("Leaders steer at the left: the vision, the principles and who owns them. Teams build at the right, from the patterns.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · three journeys of different weight (interactive) */

export function WeightFig() {
  return <WeightLab />;
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for Lantern Kitchens (static) */

export function DecisionFig() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for Lantern Kitchens")}
      boxes={[
        [tt("What we decide"), tt("We give the planner a goal on its first screen and a path of four stages first, before any other journey.")],
        [tt("What we do not know"), tt("At which stage most customers stop; the planner does not record it.")],
        [tt("When we would reverse it"), tt("If no more customers reach the offer, or they say the new first screen slows them down.")],
        [tt("What we give up"), tt("Marketing's brand film at the start, and the developers' time for the fitting-day booking this quarter.")],
      ]}
      rule={[
        [tt("Who owns narrative UX"), tt("The head of customer experience owns the principles and the patterns; the planning experts check every line for accuracy; marketing owns the brand story.")],
        [tt("How a conflict is decided"), tt("Clarity first, then the customer's experience in that step, then the brand; the product owner settles a tie.")],
      ]}
      caption={tt("An entry, a progress display and a transition are cheap to change and quick to check: a safe start when nobody can see where people stop.")}
    />
  );
}
