"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { SPEC } from "@/data/day15/free";
import { MATERIALS } from "@/data/day15/materials";
import { blockKey } from "@/lib/dayFree/model";
import { freeTaskBlocks } from "@/lib/dayFree/progress";
import { tt } from "@/lib/lang";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated } from "@/store/useStore";

/**
 * Day 15 · the day practises what it teaches (UX-STANDARD 2.15). At the top of each route: an attention trace of the learner's own visit, opt-in behind a consent
 * screen built the way card A5 asks (what is recorded, what is not inferred, where it stays, how to stop; Yes and No as equal buttons). While it runs it records
 * the pointer position and which card or block is in the middle of the screen, twice a second, and draws them as a strip of the page and a list of reading times.
 * Then it asks why the learner stayed longest where they did, and shows that the trace was the same for every answer (card A2: looking is not understanding).
 * A pointer is not a gaze, and the panel says so. Nothing leaves the tab; nothing is stored, counted or scored.
 */
type Route = 1 | 2;
type Unit = { id: string; title: string; anchor: string; done: boolean };
type Pt = { x: number; y: number };

function useUnits(route: Route): Unit[] {
  const p = usePersisted();
  const blocks = freeTaskBlocks(p, SPEC);
  const cards = MATERIALS.filter((m) => (route === 1 ? m.block === "A" : m.block === "B"));
  const bl = route === 1 ? SPEC.blocks1 : [SPEC.block2];
  return [
    ...cards.map((m) => ({ id: m.id, title: tt(`Card ${m.id} · ${m.title}`), anchor: `mat-${m.id}`, done: !!p.ui.sectionsRead[`d15:${m.id}`] })),
    ...bl.map((b) => ({ id: b.id, title: b.title, anchor: `block-${b.id.replace(".", "-")}`, done: !!blocks[blockKey(b.id)] })),
  ];
}

const READINGS = () => [
  ["interest", tt("It interested me")],
  ["hard", tt("It was hard to understand")],
  ["careful", tt("I read it slowly and carefully")],
  ["else", tt("I was doing something else")],
] as const;

export function Day15Experience({ route }: { route: Route }) {
  const hydrated = useHydrated();
  const units = useUnits(route);
  const done = hydrated ? units.filter((u) => u.done).length : 0;
  const [phase, setPhase] = useState<"ask" | "on" | "off">("ask");
  const [pts, setPts] = useState<Pt[]>([]);
  const [dwell, setDwell] = useState<Record<string, number>>({});
  const [reading, setReading] = useState<string | null>(null);
  const last = useRef(0);
  const unitsRef = useRef(units);
  unitsRef.current = units;

  useEffect(() => {
    if (phase !== "on") return;
    const move = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last.current < 120) return;
      last.current = now;
      const dw = document.documentElement.scrollWidth || 1;
      const dh = document.documentElement.scrollHeight || 1;
      setPts((p) => (p.length > 3000 ? p : [...p, { x: e.pageX / dw, y: e.pageY / dh }]));
    };
    const tick = window.setInterval(() => {
      const mid = window.innerHeight / 2;
      const u = unitsRef.current.find((x) => {
        const el = document.getElementById(x.anchor);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= mid && r.bottom >= mid;
      });
      if (u) setDwell((d) => ({ ...d, [u.id]: (d[u.id] ?? 0) + 0.5 }));
    }, 500);
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      window.clearInterval(tick);
    };
  }, [phase]);

  const wipe = () => {
    setPts([]);
    setDwell({});
    setReading(null);
  };
  const ranked = units.map((u) => ({ ...u, s: dwell[u.id] ?? 0 })).filter((u) => u.s > 0).sort((a, b) => b.s - a.s);
  const top = ranked[0];
  const max = top?.s ?? 1;

  return (
    <section aria-labelledby="trace-h" className="card space-y-3 p-4">
      <div>
        <p className="smallcaps text-accent">{tt("Today you learn about attention data by producing some")}</p>
        <h2 id="trace-h" className="text-h3">{tt(`Your attention trace of this page · ${done} of ${units.length} done`)}</h2>
      </div>

      {phase === "ask" && (
        <div className="space-y-2 rounded-lg border border-line bg-paper p-3 text-caption text-ink">
          <p className="font-semibold">{tt("Would you like to record a trace of your own visit while you work?")}</p>
          <ul className="list-disc space-y-0.5 pl-5">
            <li>{tt("What is recorded: where your pointer moves, and which card or block is in the middle of your screen, twice a second.")}</li>
            <li>{tt("What is not inferred: nothing about your mood, ability or concentration. The trace only shows where, not why.")}</li>
            <li>{tt("Where it stays: only in this browser tab. Nothing is stored, sent, counted or marked; reloading deletes it.")}</li>
            <li>{tt("You can pause or delete it at any time. No camera is used.")}</li>
          </ul>
          <div className="grid max-w-md grid-cols-2 gap-2 pt-1">
            <button type="button" onClick={() => setPhase("off")} className="btn btn-sm min-h-[40px] border border-line bg-white text-ink">{tt("No, thanks")}</button>
            <button type="button" onClick={() => setPhase("on")} className="btn-primary btn-sm min-h-[40px]">{tt("Yes, start the trace")}</button>
          </div>
          <p className="text-ash">{tt("This screen is built the way card A5 describes: what, what not, where, how to stop, and a no as easy as a yes.")}</p>
        </div>
      )}

      {phase !== "ask" && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span aria-live="polite" className={clsx("rounded-full px-2.5 py-1 text-micro font-semibold", phase === "on" ? "bg-[#FEE2E2] text-[#991B1B]" : "bg-mist text-ash")}>{phase === "on" ? tt("● Recording") : tt("Paused")}</span>
            <button type="button" onClick={() => setPhase(phase === "on" ? "off" : "on")} className="btn btn-sm min-h-[40px] border border-line bg-paper text-ink">{phase === "on" ? tt("Pause") : tt("Record")}</button>
            <button type="button" onClick={wipe} className="btn btn-sm min-h-[40px] border border-line bg-paper text-ink">{tt("Delete the trace")}</button>
          </div>
          <div className="grid gap-3 sm:grid-cols-[96px_minmax(0,1fr)]">
            <div className="space-y-1">
              <p className="text-micro text-ash">{tt("Page top")}</p>
              <svg role="img" aria-label={tt(`A strip of the whole page with ${pts.length} pointer positions`)} viewBox="0 0 100 100" preserveAspectRatio="none" className="h-56 w-20 rounded border border-line bg-white">
                {pts.map((p, i) => <rect key={i} x={p.x * 100 - 1.5} y={p.y * 100 - 0.3} width={3} height={0.6} fill="#DC2626" fillOpacity={0.35} />)}
              </svg>
              <p className="text-micro text-ash">{tt("Page bottom")}</p>
            </div>
            <div className="space-y-2 text-caption text-ink">
              <p className="font-semibold">{tt("Time each card or block was in the middle of your screen")}</p>
              {ranked.length === 0 ? (
                <p className="text-ash">{tt("Nothing yet. Scroll down to a card or a block and read for a while, then come back.")}</p>
              ) : (
                <ul className="space-y-1">
                  {ranked.slice(0, 6).map((u) => (
                    <li key={u.id}>
                      <a href={`#${u.anchor}`} className="flex items-center gap-2 hover:underline">
                        <span className="w-10 shrink-0 font-semibold">{u.id}</span>
                        <span className="h-2 flex-1 overflow-hidden rounded bg-mist"><span className="block h-full rounded bg-[#F59E0B]" style={{ width: `${(u.s / max) * 100}%` }} /></span>
                        <span className="w-14 shrink-0 text-right">{tt(`${u.s.toFixed(1)} s`)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-ash">{tt("A pointer is not a gaze: many people read without moving the mouse, and on a phone the pointer only moves when you touch. Screen time is not reading time either. Both are proxies, as card A1 warns.")}</p>
            </div>
          </div>
          {top && top.s >= 5 && (
            <fieldset className="space-y-2 rounded-lg border border-dashed border-line p-3 text-caption text-ink">
              <legend className="px-1 font-semibold">{tt(`You stayed longest at ${top.id} (${top.s.toFixed(1)} s). Why?`)}</legend>
              <div className="flex flex-wrap gap-2">
                {READINGS().map(([k, l]) => (
                  <label key={k} className={clsx("flex min-h-[40px] cursor-pointer items-center gap-2 rounded border px-2.5", reading === k ? "border-accent bg-accentSoft" : "border-line bg-paper")}>
                    <input type="radio" name="d15-reading" value={k} checked={reading === k} onChange={() => setReading(k)} />
                    {l}
                  </label>
                ))}
              </div>
              {reading && <p>{tt(`The trace would look exactly the same for every one of these answers: ${top.s.toFixed(1)} seconds at ${top.id}. Only you could say which was true. That is card A2: the measurement is a fact, its meaning needs the person.`)}</p>}
            </fieldset>
          )}
          <p className="text-ash">{tt(`The trace stays in this tab only; nothing is stored or counted. Route ${route}.`)}</p>
        </div>
      )}
      {phase === "off" && ranked.length === 0 && pts.length === 0 && <p className="text-caption text-ash">{tt("No trace is being recorded. You can start it any time with “Record”.")}</p>}
    </section>
  );
}
