"use client";

import { useId, useState } from "react";
import { DelayMock, DepthMock, MeasureThumb, PERSONAL_LEVELS, PersonalMock, RebookMock, WaysMock } from "@/components/day10/mocks";
import { StateFig, SwitchFig } from "@/components/dayFree/figs";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { tt } from "@/lib/lang";

/**
 * Day 10 · the teaching diagrams of Materi A and B. Example: Northline Rail, a made-up rail company with an app, with Ilka and Mats (passengers), Saskia (UX designer)
 * and Bram (product owner); never SmartAssist, CareerNavigator or CareGuide, so no task is answered here. Interactive ones carry "The point" and an always-visible
 * "What this shows"; the story of each card is its pixel comic (data/day10/comics.ts); the static ones are drawn pictures (CLAUDE.md #20, #36, #51, #52). Ideas from
 * the original Day 10 kept here: "which type is this?" for rule-based, adaptive and learning behaviour (A1) and the three-question test of transparency, control and
 * recoverability (A4).
 */

/* ------------------------------------------------------------------ A1 · rule, situation or learning (interactive) */

export function KindsFig() {
  return (
    <StateFig
      label={tt("One Northline delay handled by a rule, by the situation and by what the app has learned · Exploratory · Case assumption")}
      point={tt("Three kinds of system can stand behind a smart-looking screen. A rule gives everyone the same answer and can be said in one sentence. An adaptive system reacts to the situation now. A learning system uses what it has learned about a person over time, so its answer can change next month. Which kind it is decides what it can know, and what it can get wrong.")}
      states={[
        { id: "rule", button: tt("A rule"), picture: <DelayMock kind="rule" />, insight: tt("In plain words: “if a train is more than 15 minutes late, tell everyone with a ticket”. Ilka gets the same message as every other passenger. It is predictable and easy to explain, but it does not know she has a connection.") },
        { id: "adaptive", button: tt("The situation"), picture: <DelayMock kind="adaptive" />, insight: tt("In plain words: the app knows where Ilka is now and that her ticket includes a connection, so it offers the next train and the way to its platform. It stores nothing about her; tomorrow it starts fresh.") },
        { id: "learning", button: tt("What it learned"), picture: <DelayMock kind="learning" />, insight: tt("In plain words: from months of trips the app has learned Ilka's Tuesday meeting and has already picked a train for her. Helpful when it is right; but she cannot see what it learned, and on the Tuesday she is on holiday it will be confidently wrong.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · three ways to adapt (interactive) */

export function WaysFig() {
  return (
    <StateFig
      label={tt("The Northline app adapting to context, personalising from data and steering the interaction · Exploratory · Case assumption")}
      point={tt("AI can guide, recommend, help and shorten an interaction in three different ways. Adapting to context uses the situation now and needs no data about the person. Personalising uses what is known about the person and needs consent and good data. Steering the interaction changes the course itself, skips steps and, by voice, must say back what it understood.")}
      states={[
        { id: "context", button: tt("Context: the situation now"), picture: <WaysMock kind="context" />, insight: tt("In plain words: Mats opens the app at the station and sees the departures from there. It uses only his place and the time. Low risk: if it guesses the station wrong, he sees it at once.") },
        { id: "personal", button: tt("Personal data: what is known"), picture: <WaysMock kind="personal" />, insight: tt("In plain words: the app knows Mats goes home every Friday at 18:19 and offers to book it again. Very convenient, and it needs his history. If he moves house, it keeps suggesting the old trip until it learns.") },
        { id: "steer", button: tt("Steering, here by voice"), picture: <WaysMock kind="steer" />, insight: tt("In plain words: the voice assistant asks only what it does not know and fills in the rest from his habits. Because there is no screen to check, it says back what it heard. Shorter, but every guess it fills in is one he did not see.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · from not personal to far too personal (interactive slider) */

export function PersonalFig() {
  const [n, setN] = useState(1);
  const id = useId();
  const names = PERSONAL_LEVELS();
  const insight = [
    tt("In plain words: a service notice for everyone. Ilka has to work out herself whether it affects her. Safe, and of little use."),
    tt("In plain words: the message fits her trip today. Relevant, saves her checking, and uses only her booking. This is where relevance and relief come from."),
    tt("In plain words: it also knows where she likes to sit. Still helpful, and now it uses what it learned about her habits. Some people like this; some begin to wonder what else it knows."),
    tt("In plain words: it counts her late starts and knows about her gym class from another booking. Each fact may be true; together they feel like being watched. One message like this, and she doubts every message after it: loss of trust."),
    tt("In plain words: it now hides everything she does not usually do. The screen is tidy and her world got smaller: over-personalisation. The day she needs a different trip, the app makes it hard to find."),
  ][n];
  return (
    <Diagram label={tt("One Northline message from not personal at all to far too personal · Exploratory · Case assumption")}>
      <div className="space-y-3">
        <ThePoint>{tt("The same feature can help and harm. Relevance rises as a message fits the trip; past a point, more personal does not mean more helpful. It starts to feel like being watched, and it narrows what people see. Misadaptation, over-personalisation and loss of trust are the price of going too far.")}</ThePoint>
        <div className="space-y-1">
          <label htmlFor={id} className="text-caption font-semibold text-ink">{tt(`How personal: ${names[n]}`)}</label>
          <input id={id} type="range" min={0} max={4} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-[#1750A8]" aria-valuetext={names[n]} />
          <div className="flex justify-between text-micro text-ash"><span>{names[0]}</span><span>{names[4]}</span></div>
        </div>
        <PersonalMock level={n} />
        <Insight>{insight}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A4 · why, change, undo (interactive) */

export function ThreeQuestionsFig() {
  return (
    <SwitchFig
      label={tt("Northline's automatic rebooking with a reason, a way to change it and an undo · Exploratory · Case assumption")}
      point={tt("Ask three questions of every automatic suggestion or action. Can the person see why (transparency)? Can they change or steer it (control)? Can they undo it if it is wrong (recoverability)? If all three answers are no, the feature needs redesign before it ships, however clever the system behind it.")}
      switches={[
        { id: "why", label: tt("Why: a reason") },
        { id: "change", label: tt("Change: other options") },
        { id: "undo", label: tt("Undo: back to before") },
      ]}
      start={{ why: false, change: false, undo: false }}
      picture={(on) => <RebookMock why={!!on.why} change={!!on.change} undo={!!on.undo} />}
      insight={(on) => {
        const n = [on.why, on.change, on.undo].filter(Boolean).length;
        if (n === 0) return tt("In plain words: 0 of 3. The app rebooked Ilka and says only that it did. She cannot tell why, cannot pick the later train she would prefer, and cannot go back. Even if the choice was good, she feels it was done to her.");
        return tt(
          `In plain words: ${n} of 3. ${on.why ? "She sees why: her train was cancelled, and this one keeps her connection." : "She still does not know why."} ${on.change ? "She can pick another train, so the system proposes and she decides." : "She cannot choose another train."} ${on.undo ? "She can undo it, so a wrong guess costs her nothing." : "If it is wrong, she has to call the hotline."} ${n === 3 ? "Now the same automation feels like help: the feeling of control matches real control." : ""}`.replace(/\s+/g, " ").trim(),
        );
      }}
    />
  );
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
  return (
    <StateFig
      label={tt("Three Northline journeys and how deep personalisation should go in each · Exploratory · Case assumption")}
      point={tt("Personalisation is not one setting for the whole company. Decide it per journey: deep where the data is good and a mistake is harmless, shallow where it is costly or the data is poor, none where a person must decide. Each choice has someone who wants more and someone who wants less.")}
      states={[
        { id: "reminder", button: tt("Departure reminders: deep"), picture: <DepthMock kind="reminder" />, insight: tt("In plain words: the app may use bookings and walking time, because both are reliable and a wrong reminder costs a minute. Product wants it; data protection accepts it with an off switch.") },
        { id: "offer", button: tt("Price offers: medium"), picture: <DepthMock kind="offer" />, insight: tt("In plain words: offers by route, not by person: sales would like to use more, data protection and the brand say no to prices that differ by who you are. A reason and an off switch make it acceptable.") },
        { id: "assist", button: tt("Travel assistance: none"), picture: <DepthMock kind="assist" />, insight: tt("In plain words: here a wrong guess strands a person. The passenger says what is needed, a member of staff confirms. Efficiency would like automation; the risk says a person decides.") },
      ]}
    />
  );
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
