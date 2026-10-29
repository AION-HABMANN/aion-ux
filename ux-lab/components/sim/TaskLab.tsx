"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { tt } from "@/lib/lang";

/**
 * The shared task lab of the Materi cards (UX-STANDARD 2.16, model: the original Day 16's Ladder). One constant task, two to four versions of a working product
 * the learner actually uses, live measures (time, wrong taps, a log) with a result per version, and stress tests that change the product (bright sun, colour
 * blindness, older eyes, a small phone, a hurry, an interruption). The product of each version is rendered by the card and reports through `ctx`: `hit` for a
 * useful step, `miss` for a wrong tap, `done` when the task is complete. Results stay in the tab; nothing is stored, scored or marked right or wrong.
 */
export type LabStressId = "sun" | "cvd" | "eyes" | "small" | "hurry" | "ping";
export type LabCtx = {
  version: string;
  stress: LabStressId[];
  hit: (what: string) => void;
  miss: (what: string) => void;
  done: (what?: string) => void;
  finished: boolean;
};
export type LabVersion = { id: string; label: string; render: (ctx: LabCtx) => ReactNode; insight: string };

const STRESS_LABEL = (): Record<LabStressId, string> => ({
  sun: tt("Bright sunlight on the screen"),
  cvd: tt("Red-green colour blindness"),
  eyes: tt("Older eyes, no glasses"),
  small: tt("A small phone"),
  hurry: tt("In a hurry"),
  ping: tt("Interrupted by a message"),
});
const STRESS_NOTE = (): Record<LabStressId, string> => ({
  sun: tt("Low contrast disappears first: thin grey text and pale buttons fade."),
  cvd: tt("Red and green look alike; only shape, position and words still carry the meaning."),
  eyes: tt("Small text blurs; big, clear targets survive."),
  small: tt("Less room: what is not near the top or the thumb is easily missed."),
  hurry: tt("Attention narrows; people take the most visible option, not the right one."),
  ping: tt("Working memory is wiped: can the person find their place again?"),
});

type Result = { version: string; secs: number; misses: number };

export function TaskLab({
  label,
  point,
  task,
  versions,
  stresses = ["sun", "cvd", "eyes", "small", "hurry", "ping"],
  device = "phone",
  note,
}: {
  label: string;
  point: string;
  task: string;
  versions: LabVersion[];
  stresses?: LabStressId[];
  device?: "phone" | "desktop";
  note?: ReactNode;
}) {
  const [cur, setCur] = useState(versions[0].id);
  const [on, setOn] = useState<LabStressId[]>([]);
  const [t0, setT0] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [misses, setMisses] = useState(0);
  const [finished, setFinished] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [ping, setPing] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [run, setRun] = useState(0);
  const pingTimer = useRef<number | null>(null);
  const v = versions.find((x) => x.id === cur) ?? versions[0];

  useEffect(() => {
    if (t0 === null || finished) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [t0, finished]);
  useEffect(() => {
    if (!on.includes("ping") || t0 === null || finished) {
      setPing(false);
      return;
    }
    pingTimer.current = window.setTimeout(() => setPing(true), 2500);
    return () => {
      if (pingTimer.current) window.clearTimeout(pingTimer.current);
    };
  }, [on, t0, finished]);

  const reset = (id = cur) => {
    setCur(id);
    setT0(null);
    setNow(0);
    setMisses(0);
    setFinished(false);
    setLog([]);
    setPing(false);
    setReveal(false);
    setRun((r) => r + 1);
  };
  const start = () => {
    if (t0 === null) setT0(Date.now());
  };
  const secs = t0 === null ? 0 : Math.round(((finished ? now : Date.now()) - t0) / 100) / 10;
  const ctx: LabCtx = {
    version: cur,
    stress: on,
    finished,
    hit: (what) => {
      start();
      setLog((l) => [tt(`✓ ${what}`), ...l].slice(0, 5));
    },
    miss: (what) => {
      start();
      setMisses((m) => m + 1);
      setLog((l) => [tt(`✗ ${what}`), ...l].slice(0, 5));
    },
    done: (what) => {
      if (finished) return;
      const end = Date.now();
      const s = t0 === null ? 0 : Math.round((end - t0) / 100) / 10;
      setNow(end);
      setFinished(true);
      setLog((l) => [tt(`● ${what ?? "Task complete"} · ${s} s`), ...l].slice(0, 5));
      setResults((r) => [...r.filter((x) => x.version !== cur), { version: cur, secs: s, misses }]);
    },
  };

  const filters: string[] = [];
  if (on.includes("sun")) filters.push("contrast(0.45) brightness(1.4)");
  if (on.includes("cvd")) filters.push("url(#tasklab-cvd)");
  if (on.includes("eyes")) filters.push("blur(0.9px)");
  const style: CSSProperties = { filter: filters.length ? filters.join(" ") : undefined, maxWidth: on.includes("small") ? 300 : device === "phone" ? 380 : undefined };
  const toggle = (s: LabStressId) => setOn((a) => (a.includes(s) ? a.filter((x) => x !== s) : [...a, s]));

  return (
    <Diagram label={label}>
      <div className="space-y-3">
        <ThePoint>{point}</ThePoint>
        <svg aria-hidden width="0" height="0" className="absolute">
          <filter id="tasklab-cvd"><feColorMatrix type="matrix" values="0.367 0.861 -0.228 0 0  0.280 0.673 0.047 0 0  -0.012 0.043 0.969 0 0  0 0 0 1 0" /></filter>
        </svg>
        <div className="rounded-lg bg-[#1F1B3A] px-3 py-2 text-white">
          <p className="text-[10.5px] uppercase tracking-wide text-white/70">{tt("Your task in every version")}</p>
          <p className="text-[13.5px]">{task}</p>
        </div>
        <div role="radiogroup" aria-label={tt("Choose a version")} className="flex flex-wrap gap-2">
          {versions.map((x) => (
            <button key={x.id} type="button" role="radio" aria-checked={cur === x.id} onClick={() => reset(x.id)} className={clsx("btn btn-sm min-h-[40px] border text-left", cur === x.id ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
              {x.label}
              {results.some((r) => r.version === x.id) && <span aria-hidden> ✓</span>}
            </button>
          ))}
        </div>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_230px]">
          <div className="space-y-2 rounded-lg border border-line bg-[#F8FAFC] p-3">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] text-[#312E81]">
              <span>{tt(`Time ${secs.toFixed(1)} s`)}</span>
              <span>{tt(`Wrong taps ${misses}`)}</span>
              <span aria-live="polite">{finished ? tt("Done") : t0 === null ? tt("Starts with your first tap") : tt("Running")}</span>
              {on.includes("hurry") && !finished && <span className="rounded bg-[#FEE2E2] px-1.5 font-sans font-semibold text-[#991B1B]">{tt(`Your taxi leaves in ${Math.max(0, 30 - Math.floor(secs))} s`)}</span>}
            </div>
            <div role="region" aria-label={tt(`The product, version: ${v.label}`)} className="relative mx-auto w-full" style={style}>
              <div key={run}>{v.render(ctx)}</div>
              {ping && (
                <div role="alertdialog" aria-label={tt("A message arrives")} className="absolute inset-x-2 top-2 z-10 rounded-lg bg-[#111827] p-2 text-[12px] text-white shadow-lg">
                  <p className="font-semibold">{tt("💬 Sam: Where are you? Call me back!")}</p>
                  <button type="button" onClick={() => { setPing(false); ctx.miss(tt("Lost the place after a message")); }} className="mt-1 rounded bg-white/20 px-2 py-0.5">{tt("Dismiss")}</button>
                </div>
              )}
            </div>
            {finished && (
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" onClick={() => reset()} className="btn btn-sm min-h-[36px] border border-line bg-white text-ink">{tt("Try this version again")}</button>
                {versions.filter((x) => !results.some((r) => r.version === x.id) && x.id !== cur).slice(0, 1).map((x) => (
                  <button key={x.id} type="button" onClick={() => reset(x.id)} className="btn-primary btn-sm min-h-[36px]">{tt(`Now try: ${x.label}`)}</button>
                ))}
              </div>
            )}
            {log.length > 0 && (
              <div className="rounded border border-line bg-white p-2 font-mono text-[11px] text-[#334155]">
                {log.map((l, i) => <p key={i}>{l}</p>)}
              </div>
            )}
          </div>
          <div className="space-y-2 text-[12px] text-ink">
            <div className="rounded-lg border border-line bg-white p-2">
              <p className="text-[12.5px] font-semibold">{tt("Stress tests")}</p>
              <p className="mb-1 text-[11px] text-ash">{tt("Switch one on and try the task again.")}</p>
              <div className="space-y-1">
                {stresses.map((s) => (
                  <button key={s} type="button" aria-pressed={on.includes(s)} onClick={() => toggle(s)} className={clsx("block w-full rounded border px-2 py-1 text-left", on.includes(s) ? "border-[#4F46E5] bg-[#EEF2FF] font-semibold" : "border-line bg-white")}>{STRESS_LABEL()[s]}</button>
                ))}
              </div>
              {on.length > 0 && <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[11px] text-ash">{on.map((s) => <li key={s}>{STRESS_NOTE()[s]}</li>)}</ul>}
            </div>
            {results.length > 0 && (
              <div className="rounded-lg border border-line bg-white p-2">
                <p className="text-[12.5px] font-semibold">{tt("Your runs (this tab only)")}</p>
                <table className="mt-1 w-full text-[11.5px]">
                  <caption className="sr-only">{tt("Time and wrong taps per version")}</caption>
                  <thead><tr className="text-left text-ash"><th scope="col">{tt("Version")}</th><th scope="col">{tt("Time")}</th><th scope="col">{tt("Wrong")}</th></tr></thead>
                  <tbody>
                    {results.map((r) => (
                      <tr key={r.version}><th scope="row" className="text-left font-normal">{versions.find((x) => x.id === r.version)?.label}</th><td>{tt(`${r.secs} s`)}</td><td>{r.misses}</td></tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-1 text-[11px] text-ash">{tt("One run is not evidence; it is a feeling for what a test would measure.")}</p>
              </div>
            )}
          </div>
        </div>
        {finished || reveal ? <Insight>{v.insight}</Insight> : <button type="button" onClick={() => setReveal(true)} className="text-[12px] underline">{tt("Show what this version shows without doing the task")}</button>}
        {note}
      </div>
    </Diagram>
  );
}

/** A phone-app frame for the products inside a task lab. */
export function AppScreen({ brand, color = "#1F2937", status, children }: { brand: string; color?: string; status?: string; children: ReactNode }) {
  return (
    <div className="mx-auto w-full overflow-hidden rounded-[24px] border-[6px] border-[#1F2730] bg-white shadow-md">
      <div className="flex items-center justify-between px-4 pt-1.5 text-[10px] font-semibold text-white" style={{ background: color }}>
        <span>9:41</span>
        <span aria-hidden>▂▄▆ ◔</span>
      </div>
      <div className="flex items-center justify-between px-3 pb-2 pt-1 text-white" style={{ background: color }}>
        <span className="text-[13px] font-bold">{brand}</span>
        {status && <span className="text-[11px] opacity-90">{status}</span>}
      </div>
      <div className="min-h-[300px] space-y-2 p-3 text-[12.5px] leading-snug text-[#1D2733]">{children}</div>
    </div>
  );
}
