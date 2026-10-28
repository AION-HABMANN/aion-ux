"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { NOT_USED, STAGES, USED } from "@/data/day9/experience";
import { SPEC } from "@/data/day9/free";
import { blockKey } from "@/lib/dayFree/model";
import { freeTaskBlocks } from "@/lib/dayFree/progress";
import { tt } from "@/lib/lang";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated } from "@/store/useStore";

/**
 * Day 9 · the day practises what it teaches (UX-STANDARD 2.15). At the top of each route: the learner's journey through the day in named stages, a calm milestone
 * message with "You can now …" when a stage is reached, an Inspector that names every mechanic on the page and the lever it pulls (and lists what is left out on
 * purpose), and an opt-in loud version of the same journey that shows how manipulative gamification would present it. It counts only what the lab already counts
 * (cards marked read, blocks complete); it never scores an answer and never enters the missing list or the export. Ideas from the original Activation Lab: its
 * milestones and rings, its "You can now" cards, its Inspector and its dark-pattern layer.
 */
type Route = 1 | 2;

function Tag({ on, children }: { on: boolean; children: ReactNode }) {
  if (!on) return null;
  return <span className="ml-1 inline-block rounded border border-[#7C3AED] bg-[#F3EEFF] px-1.5 py-0.5 align-middle text-micro font-semibold normal-case tracking-normal text-[#5B21B6]">⚙ {children}</span>;
}

function useStages(route: Route) {
  const p = usePersisted();
  const blocks = freeTaskBlocks(p, SPEC);
  return STAGES[route].map((s) => {
    const units = [...s.cards.map((c) => !!p.ui.sectionsRead[`d9:${c}`]), ...s.blocks.map((b) => !!blocks[blockKey(b)])];
    const done = units.filter(Boolean).length;
    return { ...s, done, total: units.length, complete: done === units.length };
  });
}

/** The loud version, opt-in: the same progress as a manipulative app would show it. Nothing here is real or counted. */
function Loud({ doneUnits }: { doneUnits: number }) {
  const [secs, setSecs] = useState(14 * 60 + 59);
  useEffect(() => {
    const id = window.setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 14 * 60 + 59)), 1000);
    return () => window.clearInterval(id);
  }, []);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  return (
    <div className="space-y-2 rounded-lg border-2 border-[#7C3AED] bg-[#1E1036] p-3 text-white">
      <div className="flex flex-wrap items-center gap-2 text-[13px] font-bold">
        <span className="rounded-full bg-[#7C3AED] px-2 py-0.5">⭐ {40 + doneUnits * 120} XP</span>
        <span className="rounded-full bg-[#B91C1C] px-2 py-0.5">🔥 {tt("1-day streak: don't break it tomorrow!")}</span>
        <span className="rounded-full bg-[#92400E] px-2 py-0.5">🏆 {tt("You are #7 of 24 in your cohort")}</span>
      </div>
      <p className="rounded bg-[#B91C1C] px-2 py-1 text-[13px] font-bold motion-safe:animate-pulse">⏰ {tt(`DOUBLE XP ends in ${mm}:${ss}! Read one more card NOW!`)}</p>
      <p className="text-[13px]">🎁 {tt("Mystery reward unlocked! Mark 2 more cards as read to open it.")} <span className="font-bold">{tt("3 people in your cohort just passed you. 👀")}</span></p>
      <p className="text-micro text-[#E9D5FF]">{tt("Demonstration of manipulative gamification. None of this is real: no XP, no streak, no ranking, no reward is counted or stored. Notice how it makes you feel, then switch it off.")}</p>
    </div>
  );
}

export function Day9Experience({ route }: { route: Route }) {
  const hydrated = useHydrated();
  const stages = useStages(route);
  const [inspect, setInspect] = useState(false);
  const [loud, setLoud] = useState(false);
  const [msg, setMsg] = useState<{ name: string; canNow: string } | null>(null);
  const seen = useRef<Record<string, boolean> | null>(null);

  // A milestone message only for a stage reached during this visit, never for one already complete when the page opened.
  useEffect(() => {
    if (!hydrated) return;
    if (seen.current === null) {
      seen.current = Object.fromEntries(stages.map((s) => [s.id, s.complete]));
      return;
    }
    const fresh = stages.find((s) => s.complete && !seen.current![s.id]);
    seen.current = Object.fromEntries(stages.map((s) => [s.id, s.complete]));
    if (fresh) setMsg({ name: fresh.name, canNow: fresh.canNow });
  }, [hydrated, stages]);

  const total = stages.reduce((n, s) => n + s.total, 0);
  const done = hydrated ? stages.reduce((n, s) => n + s.done, 0) : 0;
  const reached = hydrated ? stages.filter((s) => s.complete).length : 0;

  return (
    <section aria-labelledby="journey-h" className="card space-y-3 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="smallcaps text-accent">{tt("Today you learn gamification by using it")}</p>
          <h2 id="journey-h" className="text-h3">
            {tt(`Your Day 9 journey · ${reached} of ${stages.length} stages reached`)}
            <Tag on={inspect}>{tt("Visible progress · lever: the experience of progress")}</Tag>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={inspect} onClick={() => setInspect((v) => !v)} className={clsx("btn btn-sm min-h-[40px] border", inspect ? "border-[#7C3AED] bg-[#F3EEFF] text-[#5B21B6]" : "border-line bg-paper text-ink hover:border-ash")}>
            {inspect ? tt("⚙ Hide the mechanics") : tt("⚙ Show the mechanics on this page")}
          </button>
          <button type="button" aria-pressed={loud} onClick={() => setLoud((v) => !v)} className={clsx("btn btn-sm min-h-[40px] border", loud ? "border-[#B91C1C] bg-[#FDE2E2] text-[#7F1D1D]" : "border-line bg-paper text-ink hover:border-ash")}>
            {loud ? tt("Switch the loud version off") : tt("Show the loud version (a demonstration)")}
          </button>
        </div>
      </div>

      <div className="h-2 rounded-full bg-mist" role="progressbar" aria-label={tt("Your Day 9 journey")} aria-valuemin={0} aria-valuemax={total} aria-valuenow={done}>
        <div className="h-2 rounded-full bg-accent transition-[width]" style={{ width: `${total ? Math.round((done / total) * 100) : 0}%` }} />
      </div>

      <ol className="grid gap-2 md:grid-cols-2">
        {stages.map((s, i) => {
          const ok = hydrated && s.complete;
          return (
            <li key={s.id} className={clsx("rounded-lg border p-2.5 text-caption", ok ? "border-signal bg-signalSoft" : "border-line bg-paper")}>
              <p className="font-semibold text-ink">
                <span aria-hidden className="mr-1">{ok ? "✓" : `${i + 1}.`}</span>
                {s.name}
                {i === 0 && <Tag on={inspect}>{tt("Named stages · lever: story and progress")}</Tag>}
              </p>
              <p className="text-ash">{tt(`${hydrated ? s.done : 0} of ${s.total} done · ${s.cards.length ? `cards ${s.cards.join(", ")}` : `block${s.blocks.length > 1 ? "s" : ""} ${s.blocks.join(", ")}`}`)}</p>
              {ok && (
                <p className="mt-1 text-ink">
                  {s.canNow}
                  {i === 0 && <Tag on={inspect}>{tt("Capability line · lever: self-efficacy")}</Tag>}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <div aria-live="polite">
        {msg && (
          <div className="flex items-start justify-between gap-3 rounded-lg border-l-4 border-signal bg-signalSoft px-3 py-2 text-body text-ink">
            <p>
              <span className="font-semibold">{tt(`Reached: ${msg.name}.`)}</span> {msg.canNow}
              <Tag on={inspect}>{tt("Milestone message · lever: competence")}</Tag>
            </p>
            <button type="button" onClick={() => setMsg(null)} className="btn btn-sm min-h-[40px] shrink-0 border border-line bg-paper">{tt("Close")}</button>
          </div>
        )}
      </div>

      {inspect && (
        <div className="space-y-2 rounded-lg border border-[#C4B5FD] bg-[#FAF7FF] p-3 text-caption text-ink">
          <p className="font-semibold">{tt("The mechanics on this page, and the lever each pulls")}</p>
          <ul className="space-y-1">
            {USED.map((u) => (
              <li key={u.id}>
                <span className="font-semibold">{u.mechanic}</span> · {u.where} · <span className="text-[#5B21B6]">{tt(`lever: ${u.lever}`)}</span>
              </li>
            ))}
          </ul>
          <p className="font-semibold">{tt("Left out on purpose")}</p>
          <ul className="list-disc space-y-1 pl-5">{NOT_USED.map((n) => <li key={n}>{n}</li>)}</ul>
          <p className="text-ash">{tt("This is the structure layer of card A1, chosen with the four questions of card A5. Nothing here counts or scores your answers.")}</p>
        </div>
      )}

      {loud && <Loud doneUnits={done} />}
    </section>
  );
}
