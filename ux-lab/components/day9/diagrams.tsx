"use client";

import clsx from "clsx";
import { useId, useState } from "react";
import { DepositMock, GoalSetupMock, LeverMock, MeasureThumb, SignalsMock, StagesMock, signalNames } from "@/components/day9/mocks";
import { StateFig, SwitchFig } from "@/components/dayFree/figs";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { tt } from "@/lib/lang";

/**
 * Day 9 · the teaching diagrams of Materi A and B. Example: Brightwater Savings, a made-up savings bank with an app, with Vera and Kaspar (customers), Rhea (UX
 * designer) and Dominik (product owner); never SkillRise, HealthJourney or MoveWell, so no task is answered here. Interactive ones carry "The point" and an
 * always-visible "What this shows"; the story of each card is its pixel comic (data/day9/comics.ts); the static ones are drawn pictures (CLAUDE.md #20, #36, #51, #52).
 * Ideas from the original Day 9 kept here: the three layers (A1), "information about your own position" (A2), "stacking does not stack" (A3), "MECHANICS: unchanged"
 * and "the reporting window chooses the winner" (A4), the four questions before a mechanic ships (A5).
 */

/* ------------------------------------------------------------------ A1 · structure, tone or a game (interactive) */

export function LayersFig() {
  return (
    <StateFig
      label={tt("One Brightwater task, “set up your savings goal”, as structure, as playful tone and as a game · Exploratory · Case assumption")}
      point={tt("“Make it more like a game” can mean three things. Structure (a goal, a visible step, a confirmation) helps almost any product and takes days. A playful tone changes only the look and can make a serious provider seem careless. A game builds a world and a story; it takes months, and a game that does not convince is worse than none.")}
      states={[
        { id: "structure", button: tt("Structure: gamification"), picture: <GoalSetupMock kind="structure" />, insight: tt("In plain words: three steps, where Vera is, and a line saying what was saved and what comes next. Nothing looks like a game, yet she knows her position and her goal. One designer, a few days; little risk.") },
        { id: "tone", button: tt("Tone: playful design"), picture: <GoalSetupMock kind="tone" />, insight: tt("In plain words: the same two fields, now with a pink piggy, sparkles and “money magic”. Vera knows no more than before about where she is. For a bank, the tone says “we don't take your money seriously”. Pretty, and no more useful.") },
        { id: "game", button: tt("Fiction: a game"), picture: <GoalSetupMock kind="game" />, insight: tt("In plain words: a pirate quest with a captain, islands and lives; the actual task is hidden in chapter 1. It is memorable once, but it needs writers, artists and months, and grown-ups planning their savings may find it childish.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · five kinds of information about one's own position (interactive) */

export function PositionFig() {
  return (
    <SwitchFig
      label={tt("Brightwater after a deposit: progress, feedback, recognition, a challenge and a goal · Exploratory · Case assumption")}
      point={tt("People do not react to rewards as such; they react to information about their own position: how far they have come, whether this step counted, what they can do now. Progress, feedback, recognition, a challenge and a goal are five ways of giving that information.")}
      switches={[
        { id: "progress", label: tt("Progress: how far") },
        { id: "feedback", label: tt("Feedback: what it did") },
        { id: "recognition", label: tt("Recognition: it was noticed") },
        { id: "challenge", label: tt("Challenge: a next step") },
        { id: "goal", label: tt("Goal: what for") },
      ]}
      start={{ progress: false, feedback: false, recognition: false, challenge: false, goal: false }}
      picture={(on) => <DepositMock progress={!!on.progress} feedback={!!on.feedback} recognition={!!on.recognition} challenge={!!on.challenge} goal={!!on.goal} />}
      insight={(on) => {
        const n = [on.progress, on.feedback, on.recognition, on.challenge, on.goal].filter(Boolean).length;
        return tt(
          `In plain words: ${n} of 5 kinds of information. ${on.goal ? "Kaspar knows what he is saving for." : "Kaspar does not see what the money is for."} ${on.progress ? "He sees two of three months done." : "He sees a balance, not a position."} ${on.feedback ? "He learns what this deposit did." : "“Transaction completed” tells him nothing."} ${on.recognition ? "His regularity is noticed: that builds self-efficacy." : ""} ${on.challenge ? "An optional next step invites him; he can ignore it." : ""}`.replace(/\s+/g, " ").trim(),
        );
      }}
    />
  );
}

/* ------------------------------------------------------------------ A3 · one signal or eight (interactive slider) */

export function SignalsFig() {
  const [n, setN] = useState(2);
  const id = useId();
  const names = signalNames();
  const insight =
    n <= 2
      ? tt("In plain words: one or two signals. Kaspar sees his cushion grow and, perhaps, his streak. Each signal means something.")
      : n <= 4
        ? tt("In plain words: points and a badge join in. Each new signal makes the others count a little less: is the badge worth more than the streak? The progress bar, the one that says the most, is now easy to miss.")
        : tt("In plain words: a ranking, a countdown, a mystery chest and a red dot. The screen is loud, the countdown pushes, the ranking tells Kaspar 12 people passed him. He can no longer see his cushion, and the message he receives is pressure, not progress. Removing signals later will feel like taking rewards away.");
  return (
    <Diagram label={tt("Brightwater's home screen with one to eight reward signals · Exploratory · Case assumption")}>
      <div className="space-y-3">
        <ThePoint>{tt("Stacking mechanics does not stack motivation. Past a few signals, each new one makes the others mean less, and the screen turns from information into pressure. That is overstimulation, and it slides into reward inflation and manipulation.")}</ThePoint>
        <div className="space-y-1">
          <label htmlFor={id} className="text-caption font-semibold text-ink">{tt(`Reward signals on the screen: ${n}`)}</label>
          <input id={id} type="range" min={1} max={8} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-[#1750A8]" aria-valuetext={tt(`${n}: ${names.slice(0, n).join(", ")}`)} />
          <p className="text-caption text-ash">{tt(`Showing: ${names.slice(0, n).join(", ")}`)}</p>
        </div>
        <div className="mx-auto max-w-[440px]"><SignalsMock n={n} /></div>
        <Insight>{insight}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A4 · numbered steps or named stages (interactive) */

export function StagesFig() {
  return (
    <StateFig
      label={tt("The same Brightwater savings plan with numbered steps or with named stages · Exploratory · Case assumption")}
      point={tt("Progress logic says where you are; a story says why that place matters. Named stages make the same mechanics mean more, and nothing new had to be built: the progress bar and the monthly confirmation are unchanged. The story is the real process told well, not an invented quest.")}
      states={[
        { id: "steps", button: tt("Numbered steps"), picture: <StagesMock named={false} />, insight: tt("In plain words: “Step 6 of 12”. Vera knows her position, but not what it is worth. Halfway through a year, step 6 feels like a long way still to go.") },
        { id: "stages", button: tt("Named stages"), picture: <StagesMock named />, insight: tt("In plain words: “Month 6: a month's rent, if work stops”. The same position, now with a meaning Vera recognises from her own life. The mechanics underneath did not change.") },
      ]}
    />
  );
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
  return (
    <StateFig
      label={tt("Three Brightwater levers, each with what it gives and what it costs · Exploratory · Case assumption")}
      point={tt("Every lever buys activation with something: a streak warning uses loss aversion and costs autonomy, a ranking uses comparison and costs dignity and trust, a milestone uses progress and costs little. A decision names the lever, says who stands for each side and what is given up.")}
      states={[
        { id: "streak", button: tt("A streak warning"), picture: <LeverMock kind="streak" />, insight: tt("In plain words: “Don't lose your streak!” works through loss aversion: Kaspar saves a token amount at midnight to protect a number. Marketing sees more activity; Kaspar feels pushed, and when the streak breaks, many stop altogether.") },
        { id: "ranking", button: tt("A city ranking"), picture: <LeverMock kind="ranking" />, insight: tt("In plain words: Vera is number 412. The ranking motivates the few at the top and tells everyone else they are behind, about money. Sales likes the attention; the advisers fear for the bank's credibility.") },
        { id: "milestone", button: tt("A milestone"), picture: <LeverMock kind="milestone" />, insight: tt("In plain words: “Your cushion now covers a broken boiler.” It uses progress and meaning; nobody is compared, nobody is pushed. It pulls less in the first week and more over a year.") },
      ]}
    />
  );
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
