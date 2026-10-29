"use client";

import clsx from "clsx";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { D13 } from "@/data/day13/experience";
import { tt } from "@/lib/lang";

/**
 * Day 13 · the day practises what it teaches (UX-STANDARD 2.15). At the top of each route: tools that change this page for different minds (a quiet page with
 * muted colours and no motion, a reading font with left alignment and spacing, a reading ruler that follows the pointer and the keyboard focus), an Inspector
 * that names the inclusive patterns the lab uses, and a five-minute usability test of this page to run with a colleague: three tasks, what to watch, a timer, notes,
 * and the questions to ask afterwards. It is the start of the practice project. Notes stay in this browser tab and are not stored or exported; nothing scores an
 * answer.
 */
type Route = 1 | 2;
const CSS = `
html.d13-quiet main { filter: saturate(0.3); }
html.d13-quiet *, html.d13-quiet *::before, html.d13-quiet *::after { animation: none !important; transition: none !important; }
html.d13-font main { font-family: Verdana, Tahoma, "Segoe UI", sans-serif !important; }
html.d13-font main p, html.d13-font main li { text-align: left !important; line-height: 1.75 !important; letter-spacing: 0.02em !important; word-spacing: 0.1em !important; }
`;

function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: string }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className={clsx("btn btn-sm min-h-[40px] border", on ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ink hover:border-ash")}>
      {on ? "✓ " : ""}
      {children}
    </button>
  );
}

/** A translucent band that follows the pointer and the keyboard focus, as reading rulers do. */
function Ruler() {
  const [y, setY] = useState<number | null>(null);
  useEffect(() => {
    const move = (e: PointerEvent) => setY(e.clientY);
    const focus = () => {
      const el = document.activeElement as HTMLElement | null;
      if (el && el !== document.body) {
        const r = el.getBoundingClientRect();
        setY(r.top + r.height / 2);
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("focusin", focus);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("focusin", focus);
    };
  }, []);
  if (y === null) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 z-[55]" style={{ top: 0, height: "100vh" }}>
      <div className="absolute inset-x-0 top-0 bg-black/25" style={{ height: Math.max(0, y - 22) }} />
      <div className="absolute inset-x-0 border-y-2 border-[#F59E0B]" style={{ top: y - 22, height: 44 }} />
      <div className="absolute inset-x-0 bottom-0 bg-black/25" style={{ top: y + 22 }} />
    </div>
  );
}

function TestKit() {
  const uid = useId();
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [running, setRunning] = useState(false);
  const [secs, setSecs] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (!running) return;
    timer.current = window.setInterval(() => setSecs((s) => s + 1), 1000);
    return () => window.clearInterval(timer.current);
  }, [running]);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  return (
    <div className="space-y-3 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
      <p>{tt("Ask a colleague to use this page while you watch, without helping. Read each task aloud, then only watch and write down what happens. Before you start, ask whether they need anything: a quiet place, a break, more time.")}</p>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => setRunning((v) => !v)} className="btn btn-sm min-h-[40px] border border-line bg-paper">{running ? tt("Pause the timer") : tt("Start the timer")}</button>
        <button type="button" onClick={() => { setRunning(false); setSecs(0); }} className="btn btn-sm min-h-[40px] border border-line bg-paper">{tt("Reset")}</button>
        <span className="font-semibold" aria-live="off">{mm}:{ss}</span>
      </div>
      <ol className="space-y-2">
        {D13.tasks.map((x, i) => (
          <li key={x.id} className="rounded border border-line bg-paper p-2">
            <p className="font-semibold">{tt(`Task ${i + 1}: ${x.task}`)}</p>
            <p className="text-ash">{tt(`Watch: ${x.watch}`)}</p>
            <label htmlFor={`${uid}-${x.id}`} className="mt-1 block font-semibold">{tt("What happened")}</label>
            <textarea id={`${uid}-${x.id}`} rows={2} value={notes[x.id] ?? ""} onChange={(e) => setNotes((n) => ({ ...n, [x.id]: e.target.value }))} className="w-full rounded border border-line px-2 py-1 text-body" />
          </li>
        ))}
      </ol>
      <div>
        <p className="font-semibold">{tt("Ask afterwards")}</p>
        <ul className="list-disc space-y-0.5 pl-5">{D13.after.map((q) => <li key={q}>{q}</li>)}</ul>
      </div>
      <p className="text-ash">{tt("These notes stay in this browser tab only and are not saved or exported. Copy what you need into Block 2.1, question 5, if it helps your prototype plan.")}</p>
    </div>
  );
}

export function Day13Experience({ route }: { route: Route }) {
  const [quiet, setQuiet] = useState(false);
  const [font, setFont] = useState(false);
  const [ruler, setRuler] = useState(false);
  const [inspect, setInspect] = useState(false);
  const [kit, setKit] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const h = document.documentElement;
    h.classList.toggle("d13-quiet", quiet);
    h.classList.toggle("d13-font", font);
  }, [quiet, font]);
  useEffect(() => () => document.documentElement.classList.remove("d13-quiet", "d13-font"), []);

  return (
    <section aria-labelledby="focus-h" className="card space-y-3 p-4">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="smallcaps text-accent">{tt("Today you learn neurodiverse UX by using it")}</p>
          <h2 id="focus-h" className="text-h3">{tt("Focus and reading tools for this page")}</h2>
        </div>
        <button type="button" aria-pressed={inspect} onClick={() => setInspect((v) => !v)} className={clsx("btn btn-sm min-h-[40px] border", inspect ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ink hover:border-ash")}>
          {inspect ? tt("⚙ Hide the patterns") : tt("⚙ Which inclusive patterns does this page use?")}
        </button>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={tt("Focus and reading tools")}>
        <Toggle on={quiet} onClick={() => setQuiet((v) => !v)}>{tt("Quiet page")}</Toggle>
        <Toggle on={font} onClick={() => setFont((v) => !v)}>{tt("Reading font")}</Toggle>
        <Toggle on={ruler} onClick={() => setRuler((v) => !v)}>{tt("Reading ruler")}</Toggle>
      </div>
      <p className="text-caption text-ash">{tt("Quiet page mutes colours and stops motion (for people with ADHD or sensory sensitivity). Reading font switches to a plain wide font, left-aligned with more spacing (for many readers with dyslexia). The reading ruler highlights the line under your pointer or keyboard focus and dims the rest.")}</p>

      {inspect && (
        <div className="space-y-1 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
          <p className="font-semibold">{tt("Inclusive patterns on this page (card A5)")}</p>
          <ul className="list-disc space-y-0.5 pl-5">{D13.patterns.map((p) => <li key={p}>{p}</li>)}</ul>
          <p className="text-ash">{tt(`Honest note: not all of them are tested with neurodivergent learners yet. The test kit below is how you would find out, here on Route ${route}.`)}</p>
        </div>
      )}

      <div>
        <button type="button" aria-expanded={kit} onClick={() => setKit((v) => !v)} className="btn btn-sm min-h-[40px] border border-line bg-paper text-ink">
          {kit ? tt("Close the test kit") : tt("Practice project · test this page with a colleague (5 minutes)")}
        </button>
      </div>
      {kit && <TestKit />}

      {mounted && ruler && createPortal(<Ruler />, document.body)}
    </section>
  );
}
