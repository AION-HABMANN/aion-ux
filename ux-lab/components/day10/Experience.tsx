"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ASSIST } from "@/data/day10/experience";
import { SPEC } from "@/data/day10/free";
import { MATERIALS } from "@/data/day10/materials";
import { blockKey } from "@/lib/dayFree/model";
import { freeTaskBlocks } from "@/lib/dayFree/progress";
import { tt } from "@/lib/lang";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated } from "@/store/useStore";

/**
 * Day 10 · the day practises what it teaches (UX-STANDARD 2.15). At the top of each route a small study assistant suggests what to open next, and passes the three
 * questions of card A4 itself: "Why this?" shows its rule (transparency), "Not now" and "Switch suggestions off" let the learner steer it (control), and every action
 * can be undone (recoverability). The Inspector says which kind of system it is (card A1: rule-based), what it uses and what it cannot know. An opt-in black-box
 * version shows the same suggestion as an opaque, over-personalised assistant would. It counts only what the lab already counts (cards marked read, blocks complete);
 * it never scores an answer and never enters the missing list or the export.
 */
type Route = 1 | 2;
type Unit = { id: string; kind: "card" | "block"; title: string; short: string; href: string; done: boolean };

function Tag({ on, children }: { on: boolean; children: ReactNode }) {
  if (!on) return null;
  return <span className="ml-1 inline-block rounded border border-[#7A1E3A] bg-[#F7ECF0] px-1.5 py-0.5 align-middle text-micro font-semibold normal-case tracking-normal text-[#5A1A30]">⚙ {children}</span>;
}

function useUnits(route: Route): Unit[] {
  const p = usePersisted();
  const blocks = freeTaskBlocks(p, SPEC);
  const cards = MATERIALS.filter((m) => (route === 1 ? m.block === "A" : m.block === "B"));
  const bl = route === 1 ? SPEC.blocks1 : [SPEC.block2];
  return [
    ...cards.map((m) => ({ id: m.id, kind: "card" as const, title: tt(`Card ${m.id} · ${m.title}`), short: tt(`card ${m.id}`), href: `#mat-${m.id}`, done: !!p.ui.sectionsRead[`d10:${m.id}`] })),
    ...bl.map((b) => ({ id: b.id, kind: "block" as const, title: b.title, short: tt(`Block ${b.id}`), href: `#block-${b.id.replace(".", "-")}`, done: !!blocks[blockKey(b.id)] })),
  ];
}

/** The black-box version, opt-in: the same suggestion without a reason, a way out or an undo, and far too personal. Nothing here is real or stored. */
function BlackBox({ next }: { next?: Unit }) {
  return (
    <div className="space-y-2 rounded-lg border-2 border-[#1F2937] bg-[#0F172A] p-3 text-white">
      <p className="text-[13px] font-bold">🤖 {tt("AI-powered · 97% match")}</p>
      <p className="text-[14px]">{next ? tt(`Our AI knows you need ${next.short} now. We have prepared it for you.`) : tt("Our AI has optimised your day. Nothing left to do.")}</p>
      <p className="text-[13px] text-[#CBD5E1]">{tt("You seem to read slowly today. People like you usually skip the deeper readings. Smart Mode is always on.")}</p>
      <div aria-hidden className="flex flex-wrap gap-2">
        <span className="rounded bg-[#7A1E3A] px-3 py-1.5 text-[13px] font-semibold">{tt("Continue")}</span>
        <span className="rounded bg-[#334155] px-3 py-1.5 text-[13px] font-semibold">{tt("Continue later")}</span>
      </div>
      <p className="text-micro text-[#E2E8F0]">{tt("Demonstration of an opaque, over-personalised assistant. None of it is true: nothing measured your reading speed, there is no match score, nothing is stored, and the two buttons are only pictures. Notice what is missing: no why, no way to say no, no undo. Then switch it off.")}</p>
    </div>
  );
}

export function Day10Experience({ route }: { route: Route }) {
  const hydrated = useHydrated();
  const units = useUnits(route);
  const [skipped, setSkipped] = useState<string[]>([]);
  const [off, setOff] = useState(false);
  const [why, setWhy] = useState(false);
  const [inspect, setInspect] = useState(false);
  const [box, setBox] = useState(false);
  const [last, setLast] = useState<{ text: string; undo: () => void } | null>(null);

  const open = useMemo(() => units.filter((u) => !u.done), [units]);
  const order = useMemo(() => [...open.filter((u) => !skipped.includes(u.id)), ...open.filter((u) => skipped.includes(u.id))], [open, skipped]);
  const next = hydrated ? order[0] : undefined;
  const done = hydrated ? units.length - open.length : 0;

  const skip = (u: Unit) => {
    setSkipped((s) => [...s.filter((x) => x !== u.id), u.id]);
    setLast({ text: tt(`Skipped ${u.short}; it moved to the end.`), undo: () => setSkipped((s) => s.filter((x) => x !== u.id)) });
  };
  const switchOff = () => {
    setOff(true);
    setLast({ text: tt("Suggestions are off."), undo: () => setOff(false) });
  };

  return (
    <section aria-labelledby="assist-h" className="card space-y-3 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="smallcaps text-accent">{tt("Today you learn intelligent interfaces by using one")}</p>
          <h2 id="assist-h" className="text-h3">
            {tt(`Your study assistant · ${done} of ${units.length} done`)}
            <Tag on={inspect}>{tt("Kind: rule-based (card A1)")}</Tag>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={inspect} onClick={() => setInspect((v) => !v)} className={clsx("btn btn-sm min-h-[40px] border", inspect ? "border-[#7A1E3A] bg-[#F7ECF0] text-[#5A1A30]" : "border-line bg-paper text-ink hover:border-ash")}>
            {inspect ? tt("⚙ Hide how it works") : tt("⚙ How does this assistant work?")}
          </button>
          <button type="button" aria-pressed={box} onClick={() => setBox((v) => !v)} className={clsx("btn btn-sm min-h-[40px] border", box ? "border-[#1F2937] bg-[#E5E7EB] text-ink" : "border-line bg-paper text-ink hover:border-ash")}>
            {box ? tt("Switch the black-box version off") : tt("Show the black-box version (a demonstration)")}
          </button>
        </div>
      </div>

      {off ? (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-paper p-3 text-body text-ink">
          <p>
            {tt("Suggestions are off. You find your way through the page yourself.")}
            <Tag on={inspect}>{tt("Control: you switched it off")}</Tag>
          </p>
          <button type="button" onClick={() => setOff(false)} className="btn btn-sm min-h-[40px] border border-line bg-paper">{tt("Switch suggestions on")}</button>
        </div>
      ) : next ? (
        <div className="space-y-2 rounded-lg border border-line bg-paper p-3">
          <p className="text-caption text-ash">{tt("Suggested next")}</p>
          <p className="text-body font-semibold text-ink">{next.title}</p>
          <div className="flex flex-wrap gap-2">
            <a href={next.href} className="btn-primary btn-sm inline-flex min-h-[40px] items-center">{tt("Go there")}</a>
            <button type="button" aria-expanded={why} onClick={() => setWhy((v) => !v)} className="btn btn-sm min-h-[40px] border border-line bg-paper">{why ? tt("Hide why") : tt("Why this?")}</button>
            <button type="button" onClick={() => skip(next)} className="btn btn-sm min-h-[40px] border border-line bg-paper">{tt("Not now")}</button>
            <button type="button" onClick={switchOff} className="btn btn-sm min-h-[40px] border border-line bg-paper">{tt("Switch suggestions off")}</button>
          </div>
          {why && (
            <p className="rounded bg-[#F7ECF0] px-2 py-1.5 text-caption text-[#3D1020]">
              {skipped.includes(next.id)
                ? tt("Because everything else is finished or skipped, and this one was skipped first.")
                : next.kind === "card"
                  ? tt("Because it is the first card of this route you have not marked as read.")
                  : tt("Because the cards of this route are read or skipped, and this is the first block that is not complete.")}{" "}
              {tt(`The rule: ${ASSIST.rule[route]}`)}
              <Tag on={inspect}>{tt("Transparency: why")}</Tag>
            </p>
          )}
        </div>
      ) : (
        <p className="rounded-lg border border-signal bg-signalSoft p-3 text-body text-ink">{hydrated ? tt("Everything in this route is done. Nothing left to suggest.") : tt("Loading your progress…")}</p>
      )}

      <div aria-live="polite">
        {last && (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border-l-4 border-accent bg-accentSoft px-3 py-2 text-caption text-ink">
            <p>
              {last.text}
              <Tag on={inspect}>{tt("Recoverability: undo")}</Tag>
            </p>
            <button
              type="button"
              onClick={() => {
                last.undo();
                setLast(null);
              }}
              className="btn btn-sm min-h-[40px] border border-line bg-paper"
            >
              {tt("↶ Undo")}
            </button>
          </div>
        )}
      </div>

      {inspect && (
        <div className="space-y-2 rounded-lg border border-[#D7B8C4] bg-[#FCF7F9] p-3 text-caption text-ink">
          <p>
            <span className="font-semibold">{tt("Which kind is this?")}</span> {tt("Rule-based (card A1). The same progress always gives the same suggestion; it does not learn and does not adapt to you as a person.")}
          </p>
          <p className="font-semibold">{tt("What it uses")}</p>
          <ul className="list-disc space-y-0.5 pl-5">{ASSIST.uses.map((u) => <li key={u}>{u}</li>)}</ul>
          <p className="font-semibold">{tt("What it does not use")}</p>
          <ul className="list-disc space-y-0.5 pl-5">{ASSIST.notUses.map((u) => <li key={u}>{u}</li>)}</ul>
          <p>{ASSIST.cannot}</p>
          <p className="font-semibold">{tt("The three questions of card A4, asked of this assistant")}</p>
          <ul className="space-y-0.5">
            <li>✓ {tt("Can you see why? Yes: “Why this?” shows its rule.")}</li>
            <li>✓ {tt("Can you change it? Yes: “Not now” and “Switch suggestions off”.")}</li>
            <li>✓ {tt("Can you undo it? Yes: every skip and the switch can be undone.")}</li>
          </ul>
        </div>
      )}

      {box && <BlackBox next={next} />}
    </section>
  );
}
