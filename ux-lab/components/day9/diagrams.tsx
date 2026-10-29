"use client";

import clsx from "clsx";
import { useState } from "react";
import { MeasureThumb } from "@/components/day9/mocks";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { tt } from "@/lib/lang";
import { LayersLab, LeverLab, PositionLab, SignalsLab, StagesLab } from "@/components/day9/labs";

/**
 * Day 9 · the teaching diagrams of Materi A and B. Example: Brightwater Savings, a made-up savings bank with an app, with Vera and Kaspar (customers), Rhea (UX
 * designer) and Dominik (product owner); never SkillRise, HealthJourney or MoveWell, so no task is answered here. Interactive ones carry "The point" and an
 * always-visible "What this shows"; the story of each card is its pixel comic (data/day9/comics.ts); the static ones are drawn pictures (CLAUDE.md #20, #36, #51, #52).
 * Ideas from the original Day 9 kept here: the three layers (A1), "information about your own position" (A2), "stacking does not stack" (A3), "MECHANICS: unchanged"
 * and "the reporting window chooses the winner" (A4), the four questions before a mechanic ships (A5).
 */

/* ------------------------------------------------------------------ A1 · structure, tone or a game (interactive) */

export function LayersFig() {
  return <LayersLab />;
}

/* ------------------------------------------------------------------ A2 · five kinds of information about one's own position (interactive) */

export function PositionFig() {
  return <PositionLab />;
}

/* ------------------------------------------------------------------ A3 · one signal or eight (interactive slider) */

export function SignalsFig() {
  return <SignalsLab />;
}

/* ------------------------------------------------------------------ A4 · numbered steps or named stages (interactive) */

export function StagesFig() {
  return <StagesLab />;
}

/* ------------------------------------------------------------------ A4 · the reporting window chooses the winner (interactive, a pattern, not data) */

type Design = { id: string; name: string; curve: [number, number, number] };
export function WindowFig() {
  const designs: Design[] = [
    { id: "loud", name: tt("Loud rewards: points, ranking, daily bonus"), curve: [3, 2, 1] },
    { id: "progress", name: tt("Progress and honest feedback"), curve: [2, 2, 2] },
    { id: "stages", name: tt("Named stages towards the customer's goal"), curve: [1, 2, 3] },
  ];
  const periods = [tt("After 1 week"), tt("After 1 month"), tt("After 3 months")];
  const [p, setP] = useState(0);
  const best = Math.max(...designs.map((d) => d.curve[p]));
  const insight = [
    tt("In plain words: after one week the loud design looks like the clear winner. Anyone who reports this week's activity will choose it."),
    tt("In plain words: after a month the three are close: the loud rewards are wearing off."),
    tt("In plain words: after three months the named stages lead and the loud design is last. For anything people should keep doing, this is the period that matters."),
  ][p];
  return (
    <Diagram label={tt("Three Brightwater designs and the period you look at · a typical pattern, not data · Case assumption")}>
      <div className="space-y-3">
        <ThePoint>{tt("Activation and retention are different results. The levers that rise fastest wear off fastest, so the period you measure decides which design looks best: one week crowns the loudest rewards, three months the design people keep using.")}</ThePoint>
        <div role="radiogroup" aria-label={tt("Choose the period")} className="flex flex-wrap gap-2">
          {periods.map((x, i) => (
            <button key={x} type="button" role="radio" aria-checked={p === i} onClick={() => setP(i)} className={clsx("btn btn-sm min-h-[40px] border", p === i ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>{x}</button>
          ))}
        </div>
        <ul className="space-y-2">
          {designs.map((d) => (
            <li key={d.id} className="grid grid-cols-[minmax(0,1fr)_7rem] items-center gap-2 text-caption">
              <span className={clsx("text-ink", d.curve[p] === best && "font-semibold")}>{d.name}{d.curve[p] === best ? tt(" · looks best") : ""}</span>
              <span role="img" aria-label={tt(["Low", "Medium", "High"][d.curve[p] - 1])} className="flex gap-1">
                {[1, 2, 3].map((k) => <span key={k} className={clsx("h-3 flex-1 rounded", k <= d.curve[p] ? "bg-accent" : "bg-mist")} />)}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-micro text-ash">{tt("A typical pattern to think with, not measured data: the bars show low, medium or high share of customers still active.")}</p>
        <Insight>{insight}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A5 · the four questions before a mechanic ships (static) */

export function FourQuestionsFig() {
  const qs = [tt("Explained in one plain sentence, would it still work?"), tt("Whom does it quietly put last?"), tt("How does it read to someone in a bad moment?"), tt("Who can remove it next year?")];
  const rows: [string, string[]][] = [
    [tt("A ranking of the city's top savers"), [tt("“We show you who saves more than you, so you feel behind.” It works only unexplained."), tt("People with low incomes, who need a cushion most."), tt("After losing a job: shaming."), tt("Nobody: marketing launched it, nobody owns it.")]],
    [tt("“Four months in a row: that is a habit now.”"), [tt("“We tell you when you have kept going.” Still works."), tt("Nobody is ranked; a missed month just restarts the count."), tt("After a hard month: neutral, no blame."), tt("The UX lead, as part of the feedback patterns.")]],
  ];
  return (
    <Diagram label={tt("Four questions asked of two Brightwater mechanics · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("In a serious field, ask four questions before any mechanic ships. A mechanic that only works if nobody explains it, that puts the most vulnerable last, that hurts in a bad moment or that nobody can remove, is not credible gamification.")}</ThePoint>
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[36rem] border-collapse text-caption">
            <thead>
              <tr className="bg-mist text-left text-micro uppercase text-ash">
                <th scope="col" className="px-2 py-2">{tt("Mechanic")}</th>
                {qs.map((q) => <th key={q} scope="col" className="px-2 py-2 normal-case">{q}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(([m, a]) => (
                <tr key={m} className="border-t border-line align-top">
                  <th scope="row" className="px-2 py-2 text-left font-semibold text-ink">{m}</th>
                  {a.map((x) => <td key={x} className="px-2 py-2 text-ink">{x}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A5 · three measures weighed (interactive) */

export function WeighFig() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    {
      id: "stages",
      name: tt("A savings plan in named stages"),
      cells: {
        effect: { level: 3, reason: tt("Customers see where they stand and what each stage covers, so fewer stop in the middle.") },
        feasibility: { level: 2, reason: tt("The app must know each customer's plan; a few weeks for the developers.") },
        risk: { level: 1, reason: tt("Low: nothing is ranked or pushed.") },
        time: { level: 2, reason: tt("It takes two releases.") },
      },
    },
    {
      id: "words",
      name: tt("Honest monthly feedback in plain words"),
      cells: {
        effect: { level: 2, reason: tt("Each deposit is noticed and given a meaning; it builds self-efficacy over months.") },
        feasibility: { level: 3, reason: tt("Words, written by Rhea and checked by the advisors.") },
        risk: { level: 1, reason: tt("Low, as long as it never praises what did not happen.") },
        time: { level: 3, reason: tt("It fits the next release.") },
      },
    },
    {
      id: "league",
      name: tt("A savings league for the city"),
      cells: {
        effect: { level: 2, reason: tt("Some top savers love it; most customers are shown that others save more.") },
        feasibility: { level: 2, reason: tt("Rankings need data rules and privacy checks.") },
        risk: { level: 3, reason: tt("High: it shames those who need a cushion most and makes money look like a game.") },
        time: { level: 2, reason: tt("Two releases, plus the privacy review.") },
      },
    },
  ];
  return (
    <Diagram label={tt("Brightwater weighs three measures on effect on users, feasibility, risk and time pressure · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("Named stages and honest words are small changes with a large effect; a league is a large change with a high risk for a serious provider. Weigh each measure on the same four questions, with the reason next to each rating.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {(["stages", "words", "league"] as const).map((k, i) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{rows[i].name}</p>
            </div>
          ))}
        </div>
        <OptionGrid
          label={tt("Brightwater · three measures for the app")}
          caption={tt("Three measures for Brightwater Savings (Case assumption, example company)")}
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

/* ------------------------------------------------------------------ B1 · a game layer or an activation architecture (static) */

export function ArchitectureFig() {
  return (
    <CompareFig
      label={tt("Brightwater adding mechanics one request at a time, or building an activation architecture")}
      left={tt("Mechanics, one request at a time")}
      right={tt("An activation architecture")}
      rows={[
        [tt("Marketing asks for badges; the app gets badges."), tt("A guiding vision says what customers should feel and do, and what the bank will not do.")],
        [tt("Each team adds its own streak, points or pop-up."), tt("Principles say which levers the bank uses (progress, honest feedback) and which not (rankings, fake urgency).")],
        [tt("Nobody removes a mechanic that no longer helps."), tt("Patterns for progress, feedback and recognition are built once, with an owner who also removes.")],
        [tt("The screen gets louder every year."), tt("Every product uses the same calm patterns; the brand stays credible.")],
      ]}
      caption={tt("At senior level, gamification is part of the activation and experience architecture. It steers behaviour, so it is a matter of responsibility.")}
    />
  );
}

export function LayersChainFig() {
  return (
    <ChainFig
      label={tt("The layers of an activation architecture, from a guiding vision to every touchpoint")}
      steps={[
        { h: tt("A guiding vision"), b: tt("“Customers keep saving because they see their cushion grow, not because we push them.”"), kind: "m" },
        { h: tt("Principles"), b: tt("Progress and honest feedback yes; rankings, fake urgency and rewards for logins no."), kind: "a" },
        { h: tt("Patterns"), b: tt("The savings plan in stages, the monthly feedback, the milestone message; built once."), kind: "a" },
        { h: tt("Every touchpoint"), b: tt("The app, online banking, the branch adviser's screen, the yearly letter."), kind: "s" },
      ]}
      caption={tt("Leaders steer at the left: the vision, the principles and who owns them. Teams build at the right, from the patterns.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · three levers and what they cost (interactive) */

export function LeverFig() {
  return <LeverLab />;
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for Brightwater (static) */

export function DecisionFig() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for Brightwater Savings")}
      boxes={[
        [tt("What we decide"), tt("We build the savings plan in named stages and honest monthly feedback first, and we do not launch the city ranking.")],
        [tt("What we do not know"), tt("Why customers stop saving after a few months; the app does not record it.")],
        [tt("When we would reverse it"), tt("If no more customers are still saving after six months, or they say the stages feel patronising.")],
        [tt("What we give up"), tt("Sales' ranking campaign, and the first-week activity a loud launch would have shown.")],
      ]}
      rule={[
        [tt("Who owns activation"), tt("The head of customer experience owns the principles and the patterns; the advisers check every message; a new mechanic needs a written reason and a yearly review.")],
        [tt("How a conflict is decided"), tt("The customer's interest first, then the bank's credibility, then the business case; the board settles a tie.")],
      ]}
      caption={tt("Adding a mechanic needs only a champion; removing one needs a business case. A written owner and a yearly review correct that.")}
    />
  );
}
