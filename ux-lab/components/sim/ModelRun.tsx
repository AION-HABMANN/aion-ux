"use client";

import { useState } from "react";
import clsx from "clsx";
import { StepControls, useStepper } from "@/components/sim/Stepper";
import { tt } from "@/lib/lang";

/**
 * A scripted model run (UX-STANDARD 2.21): a small scene that builds up step by step, with a sentence for each step. It is the shape of Day 1's A2 run for every
 * other day: Play moves on by itself, Step and Back by hand, nothing plays by itself when the device asks for reduced motion. The scene is data, so a day only
 * writes its script (items + steps + one summary), in English and German.
 *
 * An item is visible from step `at` (default: always) until step `out`; `hi` lists the steps in which it is drawn in full strength (the others dim it).
 */
export type Tone = "ink" | "acc" | "sig" | "rust" | "mute" | "gold";
type Common = { at?: number; out?: number; hi?: number[] };
export type Item =
  | ({ k: "box"; x: number; y: number; w: number; h: number; label?: string; sub?: string; tone?: Tone; fill?: boolean; size?: number; dash?: boolean } & Common)
  | ({ k: "text"; x: number; y: number; t: string; size?: number; tone?: Tone; anchor?: "start" | "middle" | "end"; bold?: boolean } & Common)
  | ({ k: "arrow"; x1: number; y1: number; x2: number; y2: number; tone?: Tone; dash?: boolean } & Common)
  | ({ k: "path"; pts: [number, number][]; tone?: Tone; dash?: boolean } & Common)
  | ({ k: "dot"; x: number; y: number; n?: string; r?: number; tone?: Tone } & Common);

export type RunStep = { say: string; meter?: { label: string; value: string } };
export type Script = {
  /** What is shown, in a few words ("The scan path on a dense page"). */
  title: string;
  /** Shown before the first step. */
  intro: string;
  steps: RunStep[];
  items: Item[];
  /** One sentence with the real finding and its source; printed after the last step. */
  summary: string;
  /** The scene size; 640 × 280 by default. */
  w?: number;
  h?: number;
};

const COL: Record<Tone, string> = { ink: "#17212E", acc: "#1750A8", sig: "#0B6F69", rust: "#AD3F26", mute: "#8A95A5", gold: "#B7791F" };
const SOFT: Record<Tone, string> = { ink: "#EEF1F5", acc: "#E3ECFA", sig: "#DCF0EE", rust: "#F8E4DE", mute: "#F3F5F8", gold: "#FBF0D9" };

function Draw({ it, step, reduce }: { it: Item; step: number; reduce: boolean }) {
  const at = it.at ?? -1;
  const shown = step >= at && (it.out === undefined || step < it.out);
  const strong = !it.hi || it.hi.includes(step);
  const style = { opacity: shown ? (strong ? 1 : 0.45) : 0, transition: reduce ? undefined : "opacity 350ms ease" } as const;
  if (it.k === "box") {
    const c = COL[it.tone ?? "mute"];
    return (
      <g style={style}>
        <rect x={it.x} y={it.y} width={it.w} height={it.h} rx="4" fill={it.fill === false ? "none" : SOFT[it.tone ?? "mute"]} stroke={c} strokeWidth="1.4" strokeDasharray={it.dash ? "4 3" : undefined} />
        {it.label && <text x={it.x + it.w / 2} y={it.y + it.h / 2 + (it.sub ? -2 : 4)} textAnchor="middle" fontSize={it.size ?? 12} fontWeight="600" fill="#17212E">{it.label}</text>}
        {it.sub && <text x={it.x + it.w / 2} y={it.y + it.h / 2 + 12} textAnchor="middle" fontSize="10.5" fill="#556274">{it.sub}</text>}
      </g>
    );
  }
  if (it.k === "text") {
    return (
      <g style={style}>
        <text x={it.x} y={it.y} textAnchor={it.anchor ?? "start"} fontSize={it.size ?? 12} fontWeight={it.bold ? 700 : 500} fill={COL[it.tone ?? "ink"]}>{it.t}</text>
      </g>
    );
  }
  if (it.k === "arrow") {
    const c = COL[it.tone ?? "acc"];
    const a = Math.atan2(it.y2 - it.y1, it.x2 - it.x1);
    const hx = (d: number) => it.x2 - 8 * Math.cos(a + d);
    const hy = (d: number) => it.y2 - 8 * Math.sin(a + d);
    return (
      <g style={style}>
        <line x1={it.x1} y1={it.y1} x2={it.x2} y2={it.y2} stroke={c} strokeWidth="1.8" strokeDasharray={it.dash ? "4 3" : undefined} />
        <polygon points={`${it.x2},${it.y2} ${hx(0.45)},${hy(0.45)} ${hx(-0.45)},${hy(-0.45)}`} fill={c} />
      </g>
    );
  }
  if (it.k === "path") {
    return (
      <g style={style}>
        <polyline points={it.pts.map((p) => p.join(",")).join(" ")} fill="none" stroke={COL[it.tone ?? "acc"]} strokeWidth="1.8" strokeDasharray={it.dash === false ? undefined : "4 3"} />
      </g>
    );
  }
  const r = it.r ?? 9;
  return (
    <g style={style}>
      <circle cx={it.x} cy={it.y} r={r} fill={COL[it.tone ?? "acc"]} stroke="#fff" strokeWidth="1.2" />
      {it.n && <text x={it.x} y={it.y + 3.6} textAnchor="middle" fontSize={r > 8 ? 10 : 8.5} fontWeight="700" fill="#fff">{it.n}</text>}
    </g>
  );
}

/** The box under a lab's stress tests, and the figure inside a card (ModelRunFigure): the same scene either way. */
export function ModelRun({ script, mode, onClose }: { script: Script; mode: "play" | "step"; onClose?: () => void }) {
  const s = useStepper(script.steps.length, mode === "play");
  const cur = s.step >= 0 ? script.steps[s.step] : undefined;
  const w = script.w ?? 640;
  const h = script.h ?? 280;
  return (
    <div className="mt-3 space-y-2 rounded-lg border border-line bg-paper p-3">
      <p className="smallcaps text-ash">{tt("Model run · an illustration, not measured data", "Modelllauf · eine Veranschaulichung, keine Messdaten")} · {script.title}</p>
      <svg role="img" aria-label={script.title} viewBox={`0 0 ${w} ${h}`} className="w-full rounded-md border border-line bg-[#FBFCFD]">
        {script.items.map((it, i) => (
          <Draw key={i} it={it} step={s.step} reduce={s.reduce} />
        ))}
      </svg>
      <p className="text-caption font-semibold text-ash" aria-live="polite">
        {s.step < 0 ? tt("Press Play or Step to start.", "Drücken Sie Play oder Step, um zu beginnen.") : tt(`Step ${s.step + 1} of ${script.steps.length}`, `Schritt ${s.step + 1} von ${script.steps.length}`)}
        {cur?.meter && (
          <span className="ml-3 rounded-full bg-accentSoft px-2 py-0.5 text-micro normal-case tracking-normal text-ink">
            {cur.meter.label}: <span className="tnum font-semibold">{cur.meter.value}</span>
          </span>
        )}
      </p>
      <p className="min-h-[3.5rem] max-w-prose text-body text-ink" aria-live="polite">{cur ? cur.say : script.intro}</p>
      <StepControls s={s} onClose={onClose} />
      {s.step >= s.last && <p className="max-w-prose rounded bg-accentSoft p-2 text-caption text-ink">{script.summary}</p>}
    </div>
  );
}

/** For a card that has no lab: the same run as a figure with its own Play and Step by step buttons. */
export function ModelRunFigure({ script, caption }: { script: Script; caption: string }) {
  const [mode, setMode] = useState<"play" | "step" | null>(null);
  const pick = (m: "play" | "step") => clsx("btn btn-sm min-h-[40px] border text-left", mode === m ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ink hover:border-ash");
  return (
    <figure className="space-y-2 rounded-lg border border-line bg-[#F8FAFC] p-3">
      <figcaption className="text-[13px] font-semibold text-ink">{caption}</figcaption>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={pick("play")} onClick={() => setMode("play")}>{tt("Play the model run", "Modelllauf abspielen")}</button>
        <button type="button" className={pick("step")} onClick={() => setMode("step")}>{tt("Step by step", "Schritt für Schritt")}</button>
      </div>
      {mode && <div key={mode}><ModelRun script={script} mode={mode} onClose={() => setMode(null)} /></div>}
    </figure>
  );
}
