"use client";

import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { SPEC } from "@/data/day14/free";
import { MATERIALS } from "@/data/day14/materials";
import { blockKey } from "@/lib/dayFree/model";
import { freeTaskBlocks } from "@/lib/dayFree/progress";
import { tt } from "@/lib/lang";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated } from "@/store/useStore";

/**
 * Day 14 · the day practises what it teaches (UX-STANDARD 2.15). At the top of each route: the day's cards and blocks as a flat list or as a spatial map (tiles on
 * a tilted plane you can turn), and a self-timed test: find one item in each view and compare the times, so the learner checks fascination against impact (card
 * A4) on their own. From the original Day 14's "flat against spatial" widget. Tiles open the card or block; times stay in this tab and are not stored or counted.
 * The spatial view respects reduced motion and stays fully usable with the keyboard (the tiles are ordinary buttons in reading order).
 */
type Route = 1 | 2;
type Unit = { id: string; title: string; anchor: string; done: boolean };

function useUnits(route: Route): Unit[] {
  const p = usePersisted();
  const blocks = freeTaskBlocks(p, SPEC);
  const cards = MATERIALS.filter((m) => (route === 1 ? m.block === "A" : m.block === "B"));
  const bl = route === 1 ? SPEC.blocks1 : [SPEC.block2];
  return [
    ...cards.map((m) => ({ id: m.id, title: tt(`Card ${m.id} · ${m.title}`), anchor: `mat-${m.id}`, done: !!p.ui.sectionsRead[`d14:${m.id}`] })),
    ...bl.map((b) => ({ id: b.id, title: b.title, anchor: `block-${b.id.replace(".", "-")}`, done: !!blocks[blockKey(b.id)] })),
  ];
}

export function Day14Experience({ route }: { route: Route }) {
  const hydrated = useHydrated();
  const units = useUnits(route);
  const [view, setView] = useState<"flat" | "space">("flat");
  const [turn, setTurn] = useState(-28);
  const [target, setTarget] = useState<Unit | null>(null);
  const [start, setStart] = useState(0);
  const [misses, setMisses] = useState(0);
  const [times, setTimes] = useState<{ flat?: number; space?: number }>({});
  const drag = useRef<number | null>(null);
  const done = hydrated ? units.filter((u) => u.done).length : 0;
  const shuffled = useMemo(() => [...units].sort((a, b) => (a.id < b.id ? 1 : -1)), [units]);
  useEffect(() => setMisses(0), [target]);

  const begin = () => {
    const pool = units.filter((u) => u.id !== target?.id);
    setTarget(pool[(Date.now() >> 3) % pool.length]);
    setStart(performance.now());
  };
  const pick = (u: Unit) => {
    if (!target) {
      document.getElementById(u.anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (u.id !== target.id) {
      setMisses((m) => m + 1);
      return;
    }
    const s = (performance.now() - start) / 1000;
    setTimes((t) => ({ ...t, [view]: Math.round(s * 10) / 10 }));
    setTarget(null);
  };
  const tile = (u: Unit) => (
    <button
      key={u.id}
      type="button"
      onClick={() => pick(u)}
      className={clsx("min-h-[44px] rounded-lg border px-2 py-1.5 text-left text-caption", u.done && hydrated ? "border-signal bg-signalSoft" : "border-line bg-paper", "hover:border-accent")}
    >
      <span className="font-semibold">{u.id}</span> <span className="text-ash">{u.title.replace(/^Card [AB]\d · |^Block \d\.\d · /, "")}</span>
    </button>
  );

  return (
    <section aria-labelledby="space-h" className="card space-y-3 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="smallcaps text-accent">{tt("Today you learn immersive UX by testing it")}</p>
          <h2 id="space-h" className="text-h3">{tt(`Your day, flat or spatial · ${done} of ${units.length} done`)}</h2>
        </div>
        <div role="radiogroup" aria-label={tt("Choose a view")} className="flex gap-2">
          {(
            [
              ["flat", tt("Flat list")],
              ["space", tt("Spatial map")],
            ] as ["flat" | "space", string][]
          ).map(([k, l]) => (
            <button key={k} type="button" role="radio" aria-checked={view === k} onClick={() => setView(k)} className={clsx("btn btn-sm min-h-[40px] border", view === k ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ink hover:border-ash")}>{l}</button>
          ))}
        </div>
      </div>

      {view === "flat" ? (
        <div className="grid gap-1.5 sm:grid-cols-2">{units.map(tile)}</div>
      ) : (
        <div className="space-y-2">
          <div
            className="overflow-hidden rounded-lg border border-line bg-gradient-to-b from-[#0F172A] to-[#1E293B] py-10"
            style={{ perspective: "900px" }}
            onPointerDown={(e) => (drag.current = e.clientX)}
            onPointerMove={(e) => {
              if (drag.current === null) return;
              setTurn((t) => Math.max(-60, Math.min(60, t + (e.clientX - drag.current!) * 0.3)));
              drag.current = e.clientX;
            }}
            onPointerUp={() => (drag.current = null)}
            onPointerLeave={() => (drag.current = null)}
          >
            <div className="mx-auto grid w-[86%] grid-cols-2 gap-2 sm:grid-cols-4 motion-safe:transition-transform" style={{ transform: `rotateX(52deg) rotateZ(${turn}deg)`, transformStyle: "preserve-3d" }}>
              {shuffled.map(tile)}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-caption text-ash">
            <button type="button" onClick={() => setTurn((t) => Math.max(-60, t - 15))} className="btn btn-sm min-h-[40px] border border-line bg-paper text-ink">{tt("↺ Turn left")}</button>
            <button type="button" onClick={() => setTurn((t) => Math.min(60, t + 15))} className="btn btn-sm min-h-[40px] border border-line bg-paper text-ink">{tt("Turn right ↻")}</button>
            <span>{tt("Drag the map or use the buttons. The tiles are in a different order here, as items often are in a spatial scene.")}</span>
          </div>
        </div>
      )}

      <div className="space-y-2 rounded-lg border border-dashed border-line p-3 text-caption text-ink">
        <p className="font-semibold">{tt("Test it yourself: is the spatial view more useful, or only more impressive?")}</p>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={begin} className="btn-primary btn-sm min-h-[40px]">{target ? tt("New item") : tt(`Start: find an item in the ${view === "flat" ? "flat list" : "spatial map"}`)}</button>
          <span aria-live="polite">{target ? tt(`Find and click: ${target.id}${misses ? ` · ${misses} wrong` : ""}`) : ""}</span>
        </div>
        <p>
          {tt(`Flat list: ${times.flat !== undefined ? `${times.flat} s` : "not tried"} · Spatial map: ${times.space !== undefined ? `${times.space} s` : "not tried"}`)}
        </p>
        {times.flat !== undefined && times.space !== undefined && (
          <p className="text-ink">{times.space > times.flat ? tt("The flat list was faster for you. The spatial map looks more striking; for finding one item, flat usually wins. That is fascination against impact (card A4).") : tt("The spatial map was as fast or faster for you this time. Try another item: one run is not evidence, which is why pilots need more than a demo (card B3).")}</p>
        )}
        <p className="text-ash">{tt(`Times stay in this tab only; nothing is stored or counted. Route ${route}.`)}</p>
      </div>
    </section>
  );
}
