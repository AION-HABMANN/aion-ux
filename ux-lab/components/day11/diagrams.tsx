"use client";

import clsx from "clsx";
import { useEffect, useId, useRef, useState } from "react";
import { MeasureThumb, ProtoMock } from "@/components/day11/mocks";
import { StateFig } from "@/components/dayFree/figs";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { canSpeak, speak } from "@/components/sim/VoiceSim";
import { tt } from "@/lib/lang";
import { FreedomLab, LoadLab, ModesLab, RequirementsLab } from "@/components/day11/labs";

/**
 * Day 11 · the teaching diagrams of Materi A and B. Example: Ladle, a made-up cooking app with a voice mode, with Noor and Ole (home cooks), Freya (UX designer) and
 * Piet (product owner); never HomeAssist Voice, CareVoice or CityHelp Voice, so no task is answered here. Interactive ones carry "The point" and an always-visible
 * "What this shows"; the story of each card is its pixel comic (data/day11/comics.ts). Ideas from the original Day 11 kept here: "feel it before anyone explains it"
 * (the phones speak, and A3 is a real memory test), the predictability and cognitive-load demonstrations, and choosing a prototype by its question (A4).
 */

/* ------------------------------------------------------------------ A1 · screen, chat or voice (interactive) */

export function ModesFig() {
  return <ModesLab />;
}

/* ------------------------------------------------------------------ A2 · six requirements of a good voice dialogue (interactive) */

export function RequirementsFig() {
  return <RequirementsLab />;
}

/* ------------------------------------------------------------------ A3 · a spoken menu and working memory (interactive, a real test) */

const LONG = () => [tt("scale the recipe"), tt("set a timer"), tt("find a substitute"), tt("read the shopping list"), tt("rate the recipe"), tt("convert units"), tt("share with a friend"), tt("show the video")];
const SHORT = () => [tt("next step"), tt("repeat"), tt("set a timer")];

export function MemoryFig() {
  const [which, setWhich] = useState<"long" | "short" | null>(null);
  const [shown, setShown] = useState(false);
  const [asked, setAsked] = useState(false);
  const [pick, setPick] = useState<string | null>(null);
  const [tts, setTts] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const name = useId();
  useEffect(() => {
    setTts(canSpeak());
    return () => window.clearTimeout(timer.current);
  }, []);
  const items = which === "short" ? SHORT() : LONG();
  const target = which === "short" ? 1 : 5;
  const play = (w: "long" | "short") => {
    const list = w === "short" ? SHORT() : LONG();
    setWhich(w);
    setPick(null);
    setAsked(false);
    setShown(true);
    const text = tt(`You can say: ${list.map((x, i) => `${i + 1}, ${x}`).join("; ")}.`);
    if (tts) speak(text, 1.05);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setShown(false);
      setAsked(true);
    }, w === "short" ? 4500 : 9000);
  };
  return (
    <Diagram label={tt("A memory test with a Ladle voice menu: a long menu and a short one · Exploratory · Case assumption")}>
      <div className="space-y-3">
        <ThePoint>{tt("Everything a voice interface says must be held in working memory, and working memory holds only a few things at once. A spoken menu of eight options is far harder than the same menu on a screen; three options are easy. Shorter, predictable answers are cognitive relief.")}</ThePoint>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => play("long")} className="btn btn-sm min-h-[40px] border border-line bg-paper">{tt("Play the long menu (8 options)")}</button>
          <button type="button" onClick={() => play("short")} className="btn btn-sm min-h-[40px] border border-line bg-paper">{tt("Play the short menu (3 options)")}</button>
        </div>
        <p className="text-caption text-ash">{tts ? tt("You will hear the menu; it is also shown for a few seconds, then hidden. Then answer from memory.") : tt("Your browser cannot speak here, so the menu is shown for a few seconds, then hidden. Then answer from memory.")}</p>
        <div aria-live="polite" className="min-h-[3rem] rounded-lg border border-line bg-white p-3 text-body text-ink">
          {shown && which && <p>🔊 {tt(`You can say: ${items.map((x, i) => `${i + 1}, ${x}`).join("; ")}.`)}</p>}
          {asked && which && (
            <fieldset>
              <legend className="font-semibold">{tt(`Which number was “${items[target]}”?`)}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {items.map((_, i) => (
                  <label key={i} className={clsx("inline-flex min-h-[40px] min-w-[44px] cursor-pointer items-center justify-center rounded border px-2", pick === String(i) ? "border-accent bg-accentSoft" : "border-line")}>
                    <input type="radio" name={name} value={i} className="sr-only" checked={pick === String(i)} onChange={() => setPick(String(i))} />
                    {i + 1}
                  </label>
                ))}
              </div>
              {pick !== null && <p className="mt-2">{tt(`It was number ${target + 1}. Nothing is counted; notice how sure you felt.`)}</p>}
            </fieldset>
          )}
          {!shown && !asked && <p className="text-ash">{tt("Choose a menu to start.")}</p>}
        </div>
        <Insight>{which === "long" ? tt("In plain words: with eight options, most people lose track after the fourth, and a cook stirring a pot loses it sooner. A screen would let Noor look again; voice does not.") : which === "short" ? tt("In plain words: three options fit in working memory, even while cooking. Fewer, predictable options are what lets a voice interface relieve the mind instead of loading it.") : tt("In plain words: try both menus, then compare how sure you felt.")}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A3 · calm or busy (interactive slider) */

export function LoadFig() {
  return <LoadLab />;
}

/* ------------------------------------------------------------------ A4 · three prototypes (interactive) */

export function PrototypesFig() {
  return (
    <StateFig
      label={tt("Three Ladle questions, each answered by a different prototype · Exploratory · Case assumption")}
      point={tt("Choose the prototype by the question. A functional prototype answers “does the technology work?”, an interaction prototype “does the dialogue work?”, often with a person playing the system, and a test prototype “do real people manage real tasks?”. Test the risky and ambiguous situations on purpose.")}
      states={[
        { id: "function", button: tt("Functional prototype"), picture: <ProtoMock kind="function" />, insight: tt("In plain words: a bare lab build that only shows what the recognition heard. It finds that “thirty” is heard as “thirteen” with the fan on. It says nothing about whether cooks like the dialogue.") },
        { id: "interaction", button: tt("Interaction prototype"), picture: <ProtoMock kind="interaction" />, insight: tt("In plain words: Freya plays Ladle from behind a screen. In an afternoon they learn what cooks actually say (“instead”, “swap”, “without”), before anyone builds speech technology.") },
        { id: "test", button: tt("Test prototype"), picture: <ProtoMock kind="test" />, insight: tt("In plain words: the near-real app in eight kitchens, with a task list that includes the allergy question and a noisy moment on purpose. It shows comprehensibility, robustness and acceptance where they matter.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A5 · does a task suit voice? (static) */

export function FitFig() {
  const qs = [tt("Hands or eyes busy?"), tt("Frequent?"), tt("Few, known choices?"), tt("Short answer?"), tt("Cheap if wrong?")];
  const rows: [string, string[], string][] = [
    [tt("Set a timer while cooking"), [tt("yes"), tt("yes"), tt("yes"), tt("yes"), tt("yes")], tt("Voice")],
    [tt("Find a substitute for an allergy"), [tt("yes"), tt("sometimes"), tt("no"), tt("no"), tt("no")], tt("Voice with a screen and a checked list")],
    [tt("Choose and pay for a week of groceries"), [tt("no"), tt("weekly"), tt("no: hundreds"), tt("no"), tt("no: money")], tt("Screen")],
  ];
  return (
    <Diagram label={tt("Five questions that decide whether a Ladle task suits voice · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("Voice belongs where tasks are simple, frequent and clear, where hands or eyes are busy, and where a mistake is cheap. Leaders keep it there, so the technology supports reliably instead of impressing.")}</ThePoint>
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[36rem] border-collapse text-caption">
            <thead>
              <tr className="bg-mist text-left text-micro uppercase text-ash">
                <th scope="col" className="px-2 py-2">{tt("Task")}</th>
                {qs.map((q) => <th key={q} scope="col" className="px-2 py-2 normal-case">{q}</th>)}
                <th scope="col" className="px-2 py-2 normal-case">{tt("So")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([m, a, so]) => (
                <tr key={m} className="border-t border-line align-top">
                  <th scope="row" className="px-2 py-2 text-left font-semibold text-ink">{m}</th>
                  {a.map((x, i) => <td key={i} className="px-2 py-2 text-ink">{x}</td>)}
                  <td className="px-2 py-2 font-semibold text-ink">{so}</td>
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
      id: "hint",
      name: tt("Say what is possible when voice mode starts"),
      cells: {
        effect: { level: 3, reason: tt("Cooks know what to say; fewer dead ends from the first minute.") },
        feasibility: { level: 3, reason: tt("One spoken line, written by Freya and tested in a day.") },
        risk: { level: 1, reason: tt("Low, if it stays short and is not repeated every time.") },
        time: { level: 3, reason: tt("It fits the next release.") },
      },
    },
    {
      id: "screen",
      name: tt("After a second miss, show the choices on the screen"),
      cells: {
        effect: { level: 3, reason: tt("A misunderstanding ends in a choice, not a loop.") },
        feasibility: { level: 2, reason: tt("The app already has the screen; the hand-over takes a few weeks.") },
        risk: { level: 1, reason: tt("Low: it only appears when voice has already failed.") },
        time: { level: 2, reason: tt("Two releases.") },
      },
    },
    {
      id: "free",
      name: tt("A free AI conversation about everything in cooking"),
      cells: {
        effect: { level: 2, reason: tt("Impressive in a demo; in the kitchen most questions are timers and steps.") },
        feasibility: { level: 1, reason: tt("Needs checked answers for allergies and food safety; months.") },
        risk: { level: 3, reason: tt("High: a confident wrong answer about an allergy can harm someone.") },
        time: { level: 1, reason: tt("It does not fit the time.") },
      },
    },
  ];
  return (
    <Diagram label={tt("Ladle weighs three measures on effect on users, feasibility, risk and time pressure · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("Saying what is possible and catching a second miss on the screen are small changes with a large effect; a free conversation about everything is a large change with a high risk. Weigh each measure on the same four questions, with the reason next to each rating.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {(["hint", "screen", "free"] as const).map((k, i) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{rows[i].name}</p>
            </div>
          ))}
        </div>
        <OptionGrid
          label={tt("Ladle · three measures for the voice mode")}
          caption={tt("Three measures for Ladle (Case assumption, example company)")}
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

/* ------------------------------------------------------------------ B1 · voice everywhere or a voice service architecture (static) */

export function ArchitectureFig() {
  return (
    <CompareFig
      label={tt("Ladle adding voice everywhere to look modern, or building a voice service architecture")}
      left={tt("Voice everywhere, to look modern")}
      right={tt("A voice service architecture")}
      rows={[
        [tt("The board wants “talk to Ladle about anything”; a voice button appears on every screen."), tt("A guiding vision says which relief voice gives (hands-free cooking), how people stay in control, and where voice is not used.")],
        [tt("Each team writes its own prompts and error messages."), tt("Shared voice principles: say what is possible, one question at a time, read back, after a second miss show the screen.")],
        [tt("Nothing is tested beyond the demo recipes."), tt("Test standards by risk level: allergies and payment are tested on purpose before launch.")],
        [tt("Trust falls with every confident wrong answer."), tt("Robust core uses first (steps, timers), broad coverage later.")],
      ]}
      caption={tt("At senior level, voice and AI interaction are part of the service architecture: decided once, tested, and answered for.")}
    />
  );
}

export function LayersChainFig() {
  return (
    <ChainFig
      label={tt("The layers of a voice service architecture, from a guiding vision to every touchpoint")}
      steps={[
        { h: tt("A guiding vision"), b: tt("“Ladle lets you cook with your hands full: short, clear, and you are always in charge.”"), kind: "m" },
        { h: tt("Principles"), b: tt("Where voice is used and where not; how it speaks, confirms, fails and hands over."), kind: "a" },
        { h: tt("Patterns and tests"), b: tt("The read-back, the second-miss screen, the allergy check; test scenarios by risk level."), kind: "a" },
        { h: tt("Every touchpoint"), b: tt("The phone app, the kitchen speaker, the smart oven, customer support."), kind: "s" },
      ]}
      caption={tt("Leaders decide on the left: the relief, the fields of use and who owns the principles and tests. Teams build on the right.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · how free the dialogue may be per journey (interactive) */

export function FreedomFig() {
  return <FreedomLab />;
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for Ladle (static) */

export function DecisionFig() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for Ladle")}
      boxes={[
        [tt("What we decide"), tt("Voice mode launches for steps, timers and amounts only, with the shared principles; allergy questions go to the screen and the checked list.")],
        [tt("What we do not know"), tt("How often voice mishears in real kitchens; we tested eight cooks.")],
        [tt("When we would reverse it"), tt("If more than a few sessions end on the second-miss screen, or cooks ask for substitutes by voice and tests show it is safe.")],
        [tt("What we give up"), tt("The “talk to Ladle about anything” launch the board wanted this year.")],
      ]}
      rule={[
        [tt("Who owns voice"), tt("The head of product experience owns the voice principles; a test board of UX research, the nutrition team and support signs off each new use by risk level and may stop a launch.")],
        [tt("How a conflict is decided"), tt("Safety and trust first, then the cook's comfort, then effort and speed; the board settles a tie.")],
      ]}
      caption={tt("A voice feature is easy to demo and hard to make robust. A written owner, test standards and a stop right correct that.")}
    />
  );
}
