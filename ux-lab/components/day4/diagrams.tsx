"use client";

import { useState } from "react";
import { ExpectMock, MeasureThumb, MemoryMock, PassMock, SimpleMock } from "@/components/day4/mocks";
import { MatrixStory, StateFig, SwitchFig } from "@/components/dayFree/figs";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { tt } from "@/lib/lang";

/**
 * Day 4 · the teaching diagrams of Materi A and B. Example: Pedalo, a made-up bike-sharing app, with Nina and Sam (riders), Yusuf (UX lead) and Clara (product owner);
 * never ServicePoint, WorkFlow Hub or MyEnergy, so no task is answered here. Interactive ones carry "The point" and an always-visible "What this shows"; the story of each
 * card is its pixel comic (data/day4/comics.ts); the static ones are drawn pictures (CLAUDE.md #20, #36, #51, #52).
 */

/* ------------------------------------------------------------------ A1 · from seeing to acting (static) and simple against intuitive (interactive) */

export function StepsFig() {
  return (
    <ChainFig
      label={tt("From seeing to acting: four steps, each with a limit")}
      steps={[
        { h: tt("1 · Perceive"), b: tt("What is on the screen is taken in; what is too small, pale or far away is missed."), kind: "m" },
        { h: tt("2 · Attend"), b: tt("Only a part is looked at closely; many equal elements split attention."), kind: "a" },
        { h: tt("3 · Remember"), b: tt("Only a few things are held at once; what must be remembered can be lost."), kind: "a" },
        { h: tt("4 · Act"), b: tt("The person chooses, taps and checks what happened; without feedback they guess."), kind: "s" },
      ]}
      caption={tt("Friction appears where a design asks too much of one of the four steps. Intuitive use keeps each step within its limit.")}
    />
  );
}

export function SimpleFig() {
  return (
    <StateFig
      label={tt("The same Pedalo map screen, designed to look simple and designed to be intuitive · Exploratory · Case assumption")}
      point={tt("Looking simple is not the same as being intuitive. Few elements and much white space can still leave people guessing what an icon means or what to do next.")}
      states={[
        { id: "simple", button: tt("Looks simple"), picture: <SimpleMock kind="simple" />, insight: tt("In plain words: a map and four round icons without labels. It looks clean, but Nina has to guess which icon unlocks a bike, and nothing tells her what happens after that.") },
        { id: "intuitive", button: tt("Is intuitive"), picture: <SimpleMock kind="intuitive" />, insight: tt("In plain words: the nearest bike is named, one labelled button says “Scan to unlock”, and one line says what comes next. Nina knows what to do without thinking about the app.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · Hick's law on a pass page (interactive) */

export function ChoiceFig() {
  return (
    <StateFig
      label={tt("One Pedalo pass page with twelve equal passes and with three recommended passes · Exploratory · Case assumption")}
      point={tt("The more equally weighted options there are, the longer a decision takes (Hick's law). It is worst when the options are unfamiliar and look alike. Giving the frequent choices priority and grouping the rest one step deeper cuts the time without deleting anything.")}
      states={[
        { id: "many", button: tt("Twelve equal passes"), picture: <PassMock kind="many" />, insight: tt("In plain words: twelve buttons of the same size. Sam reads them all, goes back to compare Day, Flex and Tourist, and still is not sure which one suits a single ride. Some people give up here.") },
        { id: "few", button: tt("Three recommended passes"), picture: <PassMock kind="few" />, insight: tt("In plain words: three passes, each with one line on who it is for, and “All passes” below. Sam sees “Single ride: for one trip now” and chooses in a second. The other passes are still one tap away.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · expectations, Fitts and the same pattern (interactive) */

export function ExpectFig() {
  return (
    <SwitchFig
      label={tt("A Pedalo ride screen: the End ride button where people expect it, large and near the thumb, and the same pattern on every screen · Exploratory · Case assumption")}
      point={tt("People act on their mental model: they look where other apps put the main action and expect the same element to work the same everywhere. A target that is large and close is reached faster and missed less often (Fitts's law).")}
      switches={[
        { id: "expect", label: tt("A clear End ride button") },
        { id: "near", label: tt("Large and near the thumb") },
        { id: "same", label: tt("The same pattern as other screens") },
      ]}
      start={{ expect: false, near: false, same: false }}
      picture={(on) => <ExpectMock expect={!!on.expect} near={!!on.near} same={!!on.same} />}
      insight={(on) => {
        const n = [on.expect, on.near, on.same].filter(Boolean).length;
        return tt(
          `In plain words: ${n} of the 3 are met. ${on.expect ? "A labelled “End ride” button says exactly what it does." : "Only a faint word “finish” in a corner; Nina does not see it as the way to end the ride."} ${on.near ? "It sits large at the bottom, where her thumb is, so she hits it first time." : "It sits small at the top, far from her thumb, so she has to stretch and sometimes misses."} ${on.same ? "It looks and works like the main button on every other screen." : "A red round “Stop” button elsewhere looks like the end, but pauses the ride instead."}`,
        );
      }}
    />
  );
}

/* ------------------------------------------------------------------ A4 · memory and load (interactive) */

export function MemoryFig() {
  return (
    <StateFig
      label={tt("The same Pedalo unlock step: Sam remembers the code, or the system carries it · Exploratory · Case assumption")}
      point={tt("Working memory holds only a few things at once (Miller's rule; later research says nearer four chunks). Asking people to carry information from one screen to the next raises the load, and with it errors, abandonment and uncertainty.")}
      states={[
        { id: "remember", button: tt("Sam has to remember"), picture: <MemoryMock kind="remember" />, insight: tt("In plain words: the bike code was on the previous screen. Sam has to remember six characters, types one wrongly, gets an error and starts again. Some riders walk away.") },
        { id: "carried", button: tt("The system remembers"), picture: <MemoryMock kind="carried" />, insight: tt("In plain words: the code comes from the scan and is already filled in, with a tick that says so. Sam only confirms. Nothing to remember, nothing to mistype.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A5 · three measures weighed on four criteria (interactive) */

export function WeighFig() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    {
      id: "few",
      name: tt("Three recommended passes, the rest under “All passes”"),
      cells: {
        effect: { level: 3, reason: tt("Every new rider chooses a pass; most need one of the three.") },
        feasibility: { level: 3, reason: tt("One page is reordered; no pass is removed.") },
        risk: { level: 2, reason: tt("Riders of a rare pass need one more tap; the sales team must agree.") },
        time: { level: 3, reason: tt("It fits the next release.") },
      },
    },
    {
      id: "carry",
      name: tt("Carry the bike code over from the scan"),
      cells: {
        effect: { level: 3, reason: tt("Every unlock gets faster, and mistyped codes disappear.") },
        feasibility: { level: 2, reason: tt("The scan and the unlock step have to share data; the developers need a few weeks.") },
        risk: { level: 1, reason: tt("A typed code stays possible when the scan fails.") },
        time: { level: 2, reason: tt("It takes two releases.") },
      },
    },
    {
      id: "big",
      name: tt("A large End ride button at the bottom"),
      cells: {
        effect: { level: 2, reason: tt("Every rider ends a ride; fewer miss the button or end it by accident.") },
        feasibility: { level: 3, reason: tt("One button moves and grows.") },
        risk: { level: 2, reason: tt("A large button near the thumb could be tapped by accident; it needs a confirmation.") },
        time: { level: 3, reason: tt("It fits the next release.") },
      },
    },
  ];
  return (
    <Diagram label={tt("Pedalo weighs three measures on effect on users, feasibility, risk and time pressure · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("Each UX law points to a kind of fix: fewer equal choices (Hick), less to remember (Miller), larger, closer targets (Fitts). Weigh each fix on the same four questions and write the reason next to each rating.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {(["few", "carry", "big"] as const).map((k, i) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{rows[i].name}</p>
            </div>
          ))}
        </div>
        <OptionGrid
          label={tt("Pedalo · three measures for the app")}
          caption={tt("Three measures for Pedalo (Case assumption, example company)")}
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

/* ------------------------------------------------------------------ B1 · new functions against less friction (static) */

export function FrictionFig() {
  return (
    <CompareFig
      label={tt("Pedalo answering problems with new functions, or reducing friction first")}
      left={tt("Answer with new functions")}
      right={tt("Reduce friction first")}
      rows={[
        [tt("Riders cannot find the right pass: add a pass finder quiz."), tt("Show the three passes most riders need first.")],
        [tt("Riders mistype the bike code: add a help video."), tt("Carry the code over from the scan.")],
        [tt("Riders end rides by accident: add a new “resume ride” feature."), tt("Make End ride one clear, confirmed button.")],
        [tt("Each fix adds options and load; support stays busy."), tt("Each fix removes a step or a choice; support gets quieter.")],
      ]}
      caption={tt("A new function is also a new option, a new word and a new place to look. Reducing friction first often solves the problem the function was meant to solve.")}
    />
  );
}

export function SystemChainFig() {
  return (
    <ChainFig
      label={tt("From one screen to the whole product system")}
      steps={[
        { h: tt("The screen"), b: tt("A button, a label, a layout."), kind: "m" },
        { h: tt("The process"), b: tt("The steps of a task, from start to confirmation."), kind: "a" },
        { h: tt("The product system"), b: tt("The same task across app, website and service, with the same logic."), kind: "a" },
        { h: tt("The priorities"), b: tt("What is improved first, and whether a new function may be added."), kind: "s" },
      ]}
      caption={tt("UX laws become strategic when they change the right-hand side: what the organisation works on first.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · conflicts in a matrix (interactive) */

export function ConflictFig() {
  return (
    <MatrixStory
      label={tt("Five Pedalo designs by functions shown at once and how easily riders finish their task · Exploratory · Case assumption")}
      point={tt("Showing every function at once does not mean riders finish their tasks; past a point it means the opposite. The aim is every function available, the frequent ones first, so that new and experienced riders both finish quickly.")}
      title={tt("Pedalo designs")}
      xLabel={tt("Functions shown at once")}
      yLabel={tt("Riders finish their task easily")}
      quads={[tt("Calm, but things are missing"), tt("Complete and easy: the aim"), tt("Neither"), tt("Complete, but hard")]}
      points={[
        { id: "p1", letter: "A", name: tt("Every function on the start screen"), x: 0.9, y: 0.25, reading: tt("The product team sees all its functions; new riders do not know where to start. Completeness against efficiency.") },
        { id: "p2", letter: "B", name: tt("Frequent tasks first, “All functions” below"), x: 0.65, y: 0.82, reading: tt("Every function is reachable, the frequent ones at once. Close to the aim.") },
        { id: "p3", letter: "C", name: tt("Only unlock, nothing else"), x: 0.12, y: 0.55, reading: tt("Very calm, but riders who want a pass or a receipt cannot find it. Simplicity against scope.") },
        { id: "p4", letter: "D", name: tt("Expert mode with shortcuts"), x: 0.75, y: 0.5, reading: tt("Fast for daily riders who learnt it, confusing for newcomers. Experienced against new users.") },
        { id: "p5", letter: "E", name: tt("A rebuild of everything, ready next year"), x: 0.5, y: 0.35, reading: tt("It could be ideal, but nothing improves for a year. The ideal against time pressure and feasibility.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for Pedalo (static) */

export function DecisionFig() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for Pedalo")}
      boxes={[
        [tt("What we decide"), tt("We pause new features for one quarter and rebuild unlocking and choosing a pass first, in the app and on the website.")],
        [tt("What we do not know"), tt("Where exactly riders give up; the app records crashes, not abandoned steps.")],
        [tt("When we would reverse it"), tt("If the support contacts about unlocking and passes do not drop within the quarter.")],
        [tt("What we give up"), tt("The pass finder quiz the sales team wanted this quarter.")],
      ]}
      rule={[
        [tt("Who owns the interaction logic"), tt("The head of UX owns the order of tasks and the steps of each process in every channel; each team owns its content and rules.")],
        [tt("How a conflict is decided"), tt("How often riders need a task and how much support it causes decide first; the product owner settles a tie.")],
      ]}
      caption={tt("Poor intuitive use becomes an economic and organisational risk when it shows up as support costs, abandoned processes and frustrated customers. That is why the decision says when it will be checked.")}
    />
  );
}
