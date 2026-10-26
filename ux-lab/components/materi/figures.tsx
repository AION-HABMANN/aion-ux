"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import { Diagram, Insight } from "@/components/materi/kit";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";

/**
 * Shared teaching figures for the days built after Day 1 (CLAUDE.md #36: a picture beats a paragraph). The simple ones are plain HTML
 * (a chain, two columns, a loop, four boxes) so they reflow at 380 px and the sentences stay real text (#12); the two that need a
 * coordinate system are inline SVG with a `viewBox`, a `<title>` and a `<desc>` of one string each (#10). A "kind" is a structural role,
 * never a verdict: colour is always paired with a label (#15).
 */
export type Kind = "a" | "s" | "r" | "m" | "g";

const KIND_CLS: Record<Kind, string> = {
  a: "border-accent/60 bg-accentSoft",
  s: "border-signal/60 bg-signalSoft",
  r: "border-rust/60 bg-rustSoft",
  m: "border-ash/50 bg-mist",
  g: "border-line bg-paper",
};

/* ------------------------------------------------------------------ a chain of boxes (left to right, top to bottom on a phone) */

export type ChainStep = { h: string; b: string; kind?: Kind; tag?: string };

export function ChainFig({ label, steps, caption, loop }: { label: string; steps: ChainStep[]; caption?: ReactNode; loop?: string }) {
  return (
    <Diagram label={label} caption={caption}>
      <ol className="flex flex-col gap-1.5 md:flex-row md:items-stretch md:gap-0">
        {steps.map((s, i) => (
          <li key={i} className="flex flex-col items-stretch gap-1.5 md:min-w-0 md:flex-1 md:flex-row md:items-center md:gap-0">
            <div className={clsx("h-full min-w-0 flex-1 rounded-lg border-2 p-2.5", KIND_CLS[s.kind ?? "a"])}>
              {s.tag && <p className="smallcaps text-ash">{s.tag}</p>}
              <p className="text-body font-semibold text-ink">{s.h}</p>
              <p className="mt-0.5 text-caption text-ink">
                <Gloss>{s.b}</Gloss>
              </p>
            </div>
            {i < steps.length - 1 && (
              <span aria-hidden className="self-center text-lg text-ash md:px-1">
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
      {loop && <p className="mt-2 text-center text-caption font-semibold text-ash">↺ {loop}</p>}
    </Diagram>
  );
}

/* ------------------------------------------------------------------ two columns, row against row */

export function CompareFig({ label, left, right, rows, caption, leftKind = "s", rightKind = "r" }: { label: string; left: string; right: string; rows: [string, string][]; caption?: ReactNode; leftKind?: Kind; rightKind?: Kind }) {
  return (
    <Diagram label={label} caption={caption}>
      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
        <p className={clsx("rounded-lg border-2 px-2.5 py-1.5 text-body font-bold text-ink", KIND_CLS[leftKind])}>{left}</p>
        <p className={clsx("rounded-lg border-2 px-2.5 py-1.5 text-body font-bold text-ink", KIND_CLS[rightKind])}>{right}</p>
        {rows.map(([l, r], i) => (
          <div key={i} className="contents">
            <p className="rounded-lg border border-line bg-paper px-2.5 py-1.5 text-caption text-ink">
              <Gloss>{l}</Gloss>
            </p>
            <p className="rounded-lg border border-line bg-paper px-2.5 py-1.5 text-caption text-ink">
              <Gloss>{r}</Gloss>
            </p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ four boxes of a decision under uncertainty, and the rule for next time */

export function DecisionFrameFig({ label, caption, boxes, rule }: { label: string; caption?: ReactNode; boxes: [string, string][]; rule: [string, string][] }) {
  return (
    <Diagram label={label} caption={caption}>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {boxes.map(([h, b], i) => (
          <div key={h} className={clsx("rounded-lg border-2 p-2.5", i === 3 ? KIND_CLS.r : KIND_CLS.a)}>
            <p className="text-body font-bold text-ink">{h}</p>
            <p className="mt-0.5 text-caption text-ink">
              <Gloss>{b}</Gloss>
            </p>
          </div>
        ))}
      </div>
      <p className="smallcaps mt-3">{tt("The rule for future decisions", "Die Regel für künftige Entscheidungen")}</p>
      <div className="mt-1 grid gap-2 sm:grid-cols-2">
        {rule.map(([h, b]) => (
          <div key={h} className={clsx("rounded-lg border-2 p-2.5", KIND_CLS.s)}>
            <p className="text-body font-bold text-ink">{h}</p>
            <p className="mt-0.5 text-caption text-ink">
              <Gloss>{b}</Gloss>
            </p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ cost against the effort bands and the budget (static) */

export type CostBar = { name: string; cost: number };

/**
 * Three options as bars of their printed cost, drawn over the effort rule (the coloured bands) and the budget line. The effort of an
 * option is read from the band its bar ends in: a rule, never a feeling. Bands carry their word (Low, Mid, High), so colour is never alone.
 */
export function CostBands({ title, bars, budget, bands }: { title: string; bars: CostBar[]; budget: number; bands: { to: number | null; label: string }[] }) {
  const uid = useId().replace(/:/g, "");
  const W = 640;
  const X0 = 150;
  const X1 = 624;
  const max = Math.max(budget, ...bars.map((b) => b.cost)) * 1.06;
  const x = (v: number) => X0 + (v / max) * (X1 - X0);
  const rowH = 46;
  const top = 36;
  const H = top + bars.length * rowH + 30;
  const edges = bands.map((b, i) => ({ from: i === 0 ? 0 : (bands[i - 1].to as number), to: b.to ?? max, label: b.label }));
  const fills = ["#DCF0EE", "#E3ECFA", "#F8E4DE"];
  const desc = tt(
    `${bars.map((b) => `${b.name}: ${euro(b.cost)}`).join("; ")}. Budget ${euro(budget)}. Effort bands: ${bands.map((b, i) => `${b.label}${b.to ? ` up to ${euro(b.to)}` : ` above ${euro(bands[i - 1].to as number)}`}`).join(", ")}.`,
    `${bars.map((b) => `${b.name}: ${euro(b.cost)}`).join("; ")}. Budget ${euro(budget)}. Aufwandsbänder: ${bands.map((b, i) => `${b.label}${b.to ? ` bis ${euro(b.to)}` : ` über ${euro(bands[i - 1].to as number)}`}`).join(", ")}.`,
  );
  return (
    <Diagram label={tt("Cost against the effort rule and the budget (Case assumption, example company)", "Kosten gegen die Aufwandsregel und das Budget (Fallannahme, Beispielunternehmen)")}>
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto h-auto w-full max-w-[640px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{title}</title>
        <desc id={`${uid}-d`}>{desc}</desc>
        {edges.map((e) => (
          <g key={e.label}>
            <rect x={x(e.from)} y={top - 6} width={Math.max(x(e.to) - x(e.from), 1)} height={bars.length * rowH + 4} fill={fills[edges.indexOf(e) % 3]} opacity="0.75" />
            <text x={x(e.from) + (x(e.to) - x(e.from)) / 2} y="16" textAnchor="middle" fontSize="13" fontWeight="700" fill="#17212E">
              {tt(`Effort ${e.label}`, `Aufwand ${e.label}`)}
            </text>
          </g>
        ))}
        {bars.map((b, i) => (
          <g key={b.name}>
            <text x="8" y={top + i * rowH + 26} fontSize="13" fontWeight="600" fill="#17212E">
              {b.name}
            </text>
            <rect x={X0} y={top + i * rowH + 6} width={Math.max(x(b.cost) - X0, 1)} height="28" rx="3" fill="#2B5F8E" stroke="#17212E" />
            <text x={Math.min(x(b.cost) + 6, X1 - 4)} y={top + i * rowH + 26} textAnchor={x(b.cost) + 60 > X1 ? "end" : "start"} fontSize="13" fontWeight="700" fill={x(b.cost) + 60 > X1 ? "#FFFFFF" : "#17212E"}>
              {euro(b.cost)}
            </text>
          </g>
        ))}
        <line x1={x(budget)} x2={x(budget)} y1={top - 8} y2={top + bars.length * rowH} stroke="#17212E" strokeWidth="2" strokeDasharray="6 4" />
        <text x={x(budget)} y={H - 8} textAnchor={x(budget) > W - 90 ? "end" : "middle"} fontSize="13" fontWeight="700" fill="#17212E">
          {`${tt("Budget", "Budget")} ${euro(budget)}`}
        </text>
      </svg>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ a two-axis matrix with selectable points (interactive; the caller owns the state and the story) */

export type MatrixPoint = { id: string; letter: string; name: string; x: number; y: number; reading: string };

/**
 * Items placed by two readings of an example (x to the right, y upwards, both 0 to 1), with one named corner per quadrant. A position is a
 * reading of the example company, never a score. Every point is a button in the picture and again in a button list below it (touch and
 * keyboard); selecting one prints its reading in "What this shows" (#20).
 */
export function MatrixFig({
  title,
  xLabel,
  yLabel,
  quads,
  points,
  selected,
  onSelect,
  spot,
}: {
  title: string;
  xLabel: string;
  yLabel: string;
  /** Top left, top right, bottom left, bottom right. */
  quads: [string, string, string, string];
  points: MatrixPoint[];
  selected: string | null;
  onSelect: (id: string | null) => void;
  /** The point a story step is talking about: a dashed ring that pulses. */
  spot?: string | null;
}) {
  const uid = useId().replace(/:/g, "");
  const W = 640;
  const H = 400;
  const L = 56;
  const R = 628;
  const T = 14;
  const B = 340;
  const px = (v: number) => L + v * (R - L);
  const py = (v: number) => B - v * (B - T);
  const cur = points.find((p) => p.id === selected) ?? null;
  const quad = (p: MatrixPoint) => quads[(p.y >= 0.5 ? 0 : 2) + (p.x >= 0.5 ? 1 : 0)];
  const desc = tt(
    `A square split in four. Axes: ${xLabel} to the right, ${yLabel} upwards. Corners: ${quads.join(", ")}. Points: ${points.map((p) => `${p.letter} ${p.name}`).join("; ")}.`,
    `Ein in vier geteiltes Quadrat. Achsen: ${xLabel} nach rechts, ${yLabel} nach oben. Ecken: ${quads.join(", ")}. Punkte: ${points.map((p) => `${p.letter} ${p.name}`).join("; ")}.`,
  );
  return (
    <div className="space-y-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto h-auto w-full max-w-[640px]" role="group" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{title}</title>
        <desc id={`${uid}-d`}>{desc}</desc>
        <rect x={L} y={T} width={R - L} height={B - T} fill="#FFFFFF" stroke="#556274" strokeWidth="1.5" />
        <rect x={px(0.5)} y={T} width={R - px(0.5)} height={py(0.5) - T} fill="#DCF0EE" opacity="0.7" />
        <line x1={px(0.5)} x2={px(0.5)} y1={T} y2={B} stroke="#8793A3" strokeDasharray="5 4" />
        <line x1={L} x2={R} y1={py(0.5)} y2={py(0.5)} stroke="#8793A3" strokeDasharray="5 4" />
        {[
          [L + 8, T + 18, "start", quads[0]],
          [R - 8, T + 18, "end", quads[1]],
          [L + 8, B - 8, "start", quads[2]],
          [R - 8, B - 8, "end", quads[3]],
        ].map(([qx, qy, anchor, q]) => (
          <text key={q as string} x={qx as number} y={qy as number} textAnchor={anchor as "start" | "end"} fontSize="13" fontWeight="700" fill="#556274">
            {q as string}
          </text>
        ))}
        <text x={(L + R) / 2} y={B + 28} textAnchor="middle" fontSize="13" fontWeight="600" fill="#17212E">
          {xLabel} →
        </text>
        <text x="14" y={(T + B) / 2} textAnchor="middle" fontSize="13" fontWeight="600" fill="#17212E" transform={`rotate(-90 14 ${(T + B) / 2})`}>
          {yLabel} →
        </text>
        {points.map((p) => {
          const on = selected === p.id;
          return (
            <g
              key={p.id}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`${p.letter} ${p.name}: ${quad(p)}`}
              onClick={() => onSelect(on ? null : p.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(on ? null : p.id);
                }
              }}
              className="cursor-pointer outline-none focus-visible:[&>circle:first-child]:stroke-ink"
            >
              {spot === p.id && <circle cx={px(p.x)} cy={py(p.y)} r="22" fill="none" stroke="#4C8BE0" strokeWidth="2.5" strokeDasharray="5 4" className="anim-pulse" />}
              <circle cx={px(p.x)} cy={py(p.y)} r="15" fill={on ? "#1750A8" : "#E3ECFA"} stroke={on ? "#123E85" : "#1750A8"} strokeWidth="2" />
              <text x={px(p.x)} y={py(p.y) + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={on ? "#FFFFFF" : "#17212E"}>
                {p.letter}
              </text>
            </g>
          );
        })}
      </svg>
      <div role="group" aria-label={tt("Items in the picture", "Elemente im Bild")} className="flex flex-wrap gap-2">
        {points.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={selected === p.id}
            onClick={() => onSelect(selected === p.id ? null : p.id)}
            className={clsx("btn btn-sm min-h-[40px] border", selected === p.id ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}
          >
            <span className="font-bold">{p.letter}</span> {p.name}
          </button>
        ))}
      </div>
      <Insight>
        {cur
          ? tt(`In plain words: “${cur.name}” sits in the corner “${quad(cur)}”. ${cur.reading}`, `In einfachen Worten: „${cur.name}“ liegt in der Ecke „${quad(cur)}“. ${cur.reading}`)
          : tt("Select a point to read where it sits and why. A position is a reading of this example company, not a score.", "Wählen Sie einen Punkt, um zu lesen, wo er liegt und warum. Eine Position ist eine Lesart dieses Beispielunternehmens, keine Note.")}
      </Insight>
    </div>
  );
}
