"use client";

import clsx from "clsx";
import { useEffect, useId, useState } from "react";
import type { ReactNode } from "react";
import { tt } from "@/lib/lang";

/**
 * Day 15 · a gaze recording you can replay and re-read (show it real). The page is drawn in HTML on a fixed 13:10 stage; the recording is a list of fixations in
 * per cent of the stage (x, y) with their duration. The same recording is shown three ways, as eye-tracking software does: a numbered scanpath that replays in
 * order, a heatmap that adds the time up and loses the order, and areas of interest with when each was first looked at and for how long. The recordings are made
 * up for the lesson (Case assumption); no camera is used.
 */
export type Fix = { x: number; y: number; ms: number };
export type Aoi = { id: string; name: string; x: number; y: number; w: number; h: number };
export type GazeView = "scan" | "heat" | "aoi";

const W = 130;
const inAoi = (f: Fix, a: Aoi) => f.x >= a.x && f.x <= a.x + a.w && f.y >= a.y && f.y <= a.y + a.h;

export function aoiStats(fixes: Fix[], aois: Aoi[]) {
  return aois.map((a) => {
    const idx = fixes.findIndex((f) => inAoi(f, a));
    const ms = fixes.filter((f) => inAoi(f, a)).reduce((s, f) => s + f.ms, 0);
    return { ...a, first: idx === -1 ? null : idx + 1, ms };
  });
}

function useReduced() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
  }, []);
  return r;
}

/** The overlay alone, for a stage that draws its own page. `shown` limits the scanpath to the first n fixations. */
export function GazeOverlay({ fixes, view, aois, shown, mark }: { fixes: Fix[]; view: GazeView; aois?: Aoi[]; shown?: number; mark?: number }) {
  const gid = useId().replace(/:/g, "");
  const n = shown ?? fixes.length;
  const pts = fixes.slice(0, n);
  return (
    <svg aria-hidden viewBox={`0 0 ${W} 100`} preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id={`h${gid}`}>
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.75" />
          <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
        </radialGradient>
      </defs>
      {view === "heat" && fixes.map((f, i) => <circle key={i} cx={f.x * 1.3} cy={f.y} r={5 + f.ms / 70} fill={`url(#h${gid})`} />)}
      {view === "scan" && (
        <>
          <polyline points={pts.map((f) => `${f.x * 1.3},${f.y}`).join(" ")} fill="none" stroke="#1D4ED8" strokeWidth={0.5} strokeOpacity={0.8} />
          {pts.map((f, i) => (
            <g key={i}>
              <circle cx={f.x * 1.3} cy={f.y} r={1.4 + f.ms / 320} fill={mark === i ? "#DC2626" : "#2563EB"} fillOpacity={0.55} stroke="#1E3A8A" strokeWidth={0.3} />
              <text x={f.x * 1.3} y={f.y + 1.1} textAnchor="middle" fontSize={3} fontWeight={700} fill="#FFFFFF">{i + 1}</text>
            </g>
          ))}
        </>
      )}
      {view === "aoi" && aois?.map((a) => (
        <g key={a.id}>
          <rect x={a.x * 1.3} y={a.y} width={a.w * 1.3} height={a.h} fill="#7C3AED" fillOpacity={0.08} stroke="#7C3AED" strokeWidth={0.4} strokeDasharray="1.2 0.8" />
          <text x={a.x * 1.3 + 0.8} y={a.y + 3} fontSize={2.6} fontWeight={700} fill="#5B21B6">{a.name}</text>
        </g>
      ))}
    </svg>
  );
}

/** A stage with its page, a view switch, a replay button and, for areas of interest, a table. */
export function GazeStage({
  page,
  fixes,
  aois,
  label,
  initial = "scan",
  note,
  mark,
}: {
  page: ReactNode;
  fixes: Fix[];
  aois: Aoi[];
  label: string;
  initial?: GazeView;
  note?: ReactNode;
  mark?: number;
}) {
  const [view, setView] = useState<GazeView>(initial);
  const [shown, setShown] = useState(fixes.length);
  const [playing, setPlaying] = useState(false);
  const reduced = useReduced();
  useEffect(() => setShown(fixes.length), [fixes]);
  useEffect(() => {
    if (!playing) return;
    if (shown >= fixes.length) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setShown((s) => s + 1), Math.min(900, fixes[shown]?.ms ?? 300) + 150);
    return () => window.clearTimeout(id);
  }, [playing, shown, fixes]);
  const replay = () => {
    setView("scan");
    if (reduced) {
      setShown(fixes.length);
      return;
    }
    setShown(0);
    setPlaying(true);
  };
  const stats = aoiStats(fixes, aois);
  const total = fixes.reduce((s, f) => s + f.ms, 0);
  const views: [GazeView, string][] = [
    ["scan", tt("Scanpath")],
    ["heat", tt("Heatmap")],
    ["aoi", tt("Areas of interest")],
  ];
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <div role="radiogroup" aria-label={tt("How to show the recording")} className="flex flex-wrap gap-1.5">
          {views.map(([k, l]) => (
            <button key={k} type="button" role="radio" aria-checked={view === k} onClick={() => setView(k)} className={clsx("min-h-[36px] rounded border px-2.5 text-[12.5px] font-semibold", view === k ? "border-[#1E3A5F] bg-[#1E3A5F] text-white" : "border-[#C3CCD6] bg-white text-[#26323F]")}>{l}</button>
          ))}
        </div>
        <button type="button" onClick={replay} className="min-h-[36px] rounded border border-[#2563EB] bg-[#EFF6FF] px-2.5 text-[12.5px] font-semibold text-[#1E3A8A]">{playing ? tt("Replaying …") : tt("▶ Replay the gaze")}</button>
      </div>
      <div tabIndex={0} role="region" aria-label={tt(`Recording: ${label}`)} className="overflow-x-auto rounded-lg border border-line">
        <div role="img" aria-label={label} className="relative min-w-[480px] bg-white" style={{ aspectRatio: "13 / 10" }}>
          {page}
          <GazeOverlay fixes={fixes} view={view} aois={aois} shown={shown} mark={mark} />
        </div>
      </div>
      <p aria-live="polite" className="text-micro text-ash">
        {view === "scan" && tt(`Fixation ${Math.min(shown, fixes.length)} of ${fixes.length}. The circles are fixations, bigger means longer; the numbers are the order.`)}
        {view === "heat" && tt("The heatmap adds the time up: red is where the gaze rested longest. The order and the jumps are gone.")}
        {view === "aoi" && tt("Areas of interest are drawn before the analysis; the table counts when each was first looked at and for how long.")}
      </p>
      {view === "aoi" && (
        <div tabIndex={0} role="region" aria-label={tt(`Areas of interest: ${label}`)} className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[22rem] border-collapse text-caption">
            <caption className="sr-only">{tt("Areas of interest: first look and total time")}</caption>
            <thead>
              <tr className="bg-mist text-left text-micro uppercase text-ash">
                <th scope="col" className="px-2 py-1.5">{tt("Area")}</th>
                <th scope="col" className="px-2 py-1.5">{tt("First looked at")}</th>
                <th scope="col" className="px-2 py-1.5">{tt("Total time")}</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s) => (
                <tr key={s.id} className="border-t border-line">
                  <th scope="row" className="px-2 py-1.5 text-left font-semibold text-ink">{s.name}</th>
                  <td className="px-2 py-1.5 text-ink">{s.first === null ? tt("never") : tt(`fixation ${s.first}`)}</td>
                  <td className="px-2 py-1.5 text-ink">{s.ms === 0 ? "–" : tt(`${(s.ms / 1000).toFixed(1)} s (${Math.round((s.ms / total) * 100)} %)`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {note}
    </div>
  );
}

/** Deliberately faint small print in a demo (a dark pattern shown on purpose), drawn as SVG so the page's own text stays accessible; the label carries the words. */
export function FaintPrint({ lines, label }: { lines: string[]; label: string }) {
  return (
    <svg role="img" aria-label={label} viewBox={`0 0 260 ${lines.length * 10 + 2}`} className="w-full">
      {lines.map((l, i) => (
        <text key={i} x={0} y={9 + i * 10} fontSize={8} fill="#A3ACB9">{l}</text>
      ))}
    </svg>
  );
}

/** A positioned block on the 13:10 stage, in per cent. */
export function Box({ x, y, w, h, className, bg, children }: { x: number; y: number; w: number; h: number; className?: string; bg?: string; children?: ReactNode }) {
  return (
    <div className={clsx("absolute overflow-hidden", className)} style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%`, background: bg }}>
      {children}
    </div>
  );
}
