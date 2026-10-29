"use client";

import clsx from "clsx";
import { useState } from "react";
import { SPEC } from "@/data/day16/free";
import { MATERIALS } from "@/data/day16/materials";
import { blockKey } from "@/lib/dayFree/model";
import { freeTaskBlocks } from "@/lib/dayFree/progress";
import { tt } from "@/lib/lang";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated } from "@/store/useStore";

/**
 * Day 16 · the day practises what it teaches (UX-STANDARD 2.15), and closes the course. At the top of each route: the lab's own experiments from Days 9 to 15 (the
 * page tools each day added) on the ladder and the portfolio board, with their honest status: built and checked automatically, not yet tested with learners, so
 * all of them stand on the prototype rung. The learner sorts each into scale, test further, pause or stop, picks one to plan a test with the six aspects of card
 * A2, and ends with the plan's closing question. Choices stay in this tab; nothing is stored, counted or marked.
 */
type Route = 1 | 2;
type Move = "" | "scale" | "test" | "pause" | "stop";

const FEATURES = () => [
  { day: 9, name: tt("A gamified journey and an Inspector"), what: tt("Progress as a journey, and a panel that names the design patterns of the page, with an opt-in loud demo.") },
  { day: 10, name: tt("A rule-based study assistant"), what: tt("An assistant on the page that answers by fixed rules, and says so.") },
  { day: 11, name: tt("A voice guide for the page"), what: tt("Typed or spoken questions, answers read aloud; the browser may send speech to its maker.") },
  { day: 12, name: tt("Access settings and barrier glasses"), what: tt("Larger text, contrast and motion settings, and opt-in glasses that simulate barriers.") },
  { day: 13, name: tt("Focus and reading tools, and a test kit"), what: tt("A quiet page, a reading font, a reading ruler, and a five-minute usability test.") },
  { day: 14, name: tt("Flat or spatial"), what: tt("The day as a list or as a tilted map you can turn, with a self-timed find test.") },
  { day: 15, name: tt("An attention trace"), what: tt("An opt-in trace of the pointer and reading time, behind a designed consent screen.") },
];
const ASPECTS = () => [tt("Orientation"), tt("Presence"), tt("Overload"), tt("Error robustness"), tt("Acceptance"), tt("Transfer to real use")];

export function Day16Experience({ route }: { route: Route }) {
  const hydrated = useHydrated();
  const p = usePersisted();
  const blocks = freeTaskBlocks(p, SPEC);
  const cards = MATERIALS.filter((m) => (route === 1 ? m.block === "A" : m.block === "B"));
  const bl = route === 1 ? SPEC.blocks1 : [SPEC.block2];
  const total = cards.length + bl.length;
  const done = hydrated ? cards.filter((m) => p.ui.sectionsRead[`d16:${m.id}`]).length + bl.filter((b) => blocks[blockKey(b.id)]).length : 0;
  const feats = FEATURES();
  const [moves, setMoves] = useState<Move[]>(feats.map(() => ""));
  const [pick, setPick] = useState<number | null>(null);
  const [aspects, setAspects] = useState<boolean[]>(ASPECTS().map(() => false));
  const sorted = moves.filter(Boolean).length;
  const opts: [Move, string][] = [
    ["scale", tt("Scale")],
    ["test", tt("Test further")],
    ["pause", tt("Pause")],
    ["stop", tt("Stop")],
  ];

  return (
    <section aria-labelledby="ladder-h" className="card space-y-3 p-4">
      <div>
        <p className="smallcaps text-accent">{tt("Today you decide about this lab's own experiments")}</p>
        <h2 id="ladder-h" className="text-h3">{tt(`This lab on the ladder · ${done} of ${total} done`)}</h2>
      </div>
      <p className="text-caption text-ink">
        {tt("Days 9 to 15 each added an experiment to these pages. Here is their honest status: all were built and checked automatically (types, accessibility rules, a phone-width test), none has yet been tested with a class. On the ladder of card A1 they all stand on the prototype rung. Sort them as card A4 does.")}
      </p>
      <div className="space-y-1.5">
        {feats.map((f, i) => (
          <div key={f.day} className={clsx("rounded-lg border p-2", pick === i ? "border-accent bg-accentSoft" : "border-line bg-paper")}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0 flex-1 text-caption text-ink">
                <p className="font-semibold">
                  <a href={`/day/${f.day}/route-1/`} className="underline">{tt(`Day ${f.day}`)}</a> · {f.name}
                </p>
                <p className="text-ash">{f.what}</p>
                <p className="text-micro text-ash">{tt("Rung: prototype · evidence: automated checks only")}</p>
              </div>
              <div role="radiogroup" aria-label={tt(`Your move for ${f.name}`)} className="flex flex-wrap gap-1">
                {opts.map(([k, l]) => (
                  <button key={k} type="button" role="radio" aria-checked={moves[i] === k} onClick={() => setMoves((m) => m.map((v, j) => (j === i ? k : v)))} className={clsx("min-h-[36px] rounded border px-2 text-[12px] font-semibold", moves[i] === k ? "border-[#1E3A5F] bg-[#1E3A5F] text-white" : "border-line bg-white text-ink")}>{l}</button>
                ))}
                <button type="button" aria-pressed={pick === i} onClick={() => setPick(pick === i ? null : i)} className="min-h-[36px] rounded border border-dashed border-line bg-white px-2 text-[12px] text-ink">{tt("Plan a test")}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {sorted === feats.length && (
        <p className="rounded bg-mist px-3 py-2 text-caption text-ink">
          {tt(`You scaled ${moves.filter((m) => m === "scale").length}, tested further ${moves.filter((m) => m === "test").length}, paused ${moves.filter((m) => m === "pause").length} and stopped ${moves.filter((m) => m === "stop").length}. With evidence from automated checks only, card A5 would ask: what tells you a feature is ready to scale? There is no right sort; the reasons are the point.`)}
        </p>
      )}
      {pick !== null && (
        <fieldset className="space-y-2 rounded-lg border border-dashed border-line p-3 text-caption text-ink">
          <legend className="px-1 font-semibold">{tt(`Plan a test for “${feats[pick].name}”: which aspects matter most?`)}</legend>
          <div className="flex flex-wrap gap-2">
            {ASPECTS().map((a, i) => (
              <label key={a} className={clsx("flex min-h-[36px] cursor-pointer items-center gap-2 rounded border px-2", aspects[i] ? "border-accent bg-accentSoft" : "border-line bg-paper")}>
                <input type="checkbox" checked={aspects[i]} onChange={() => setAspects((x) => x.map((v, j) => (j === i ? !v : v)))} />
                {a}
              </label>
            ))}
          </div>
          {aspects.some(Boolean) && <p>{tt(`For each aspect you ticked, write one task for a learner and one thing to watch. Test it with someone unlike you, in a real lesson, not in a quiet room: that is transfer (card A2).${aspects[5] ? "" : " You did not tick transfer; most tests forget it."}`)}</p>}
        </fieldset>
      )}
      <div className="rounded-lg border border-line bg-paper p-3 text-caption text-ink">
        <p className="font-semibold">{tt("The closing question of the course · talk it through, nothing is written down")}</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-5">
          <li>{tt("What makes a UX strategy sustainable in the long run?")}</li>
          <li>{tt("Which of your decisions from Days 9 to 16 would you still defend in three years, and why?")}</li>
          <li>{tt("Which experiment of your own work would you stop tomorrow, and who would you have to tell?")}</li>
        </ul>
      </div>
      <p className="text-micro text-ash">{tt(`Your choices stay in this tab only; nothing is stored or counted. Route ${route}.`)}</p>
    </section>
  );
}
