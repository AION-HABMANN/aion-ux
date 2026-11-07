"use client";

import { useEffect, useState } from "react";
import { tt } from "@/lib/lang";

/**
 * A scripted sequence the learner can play or walk through: the model runs of the labs and the short animations of a day's learning arc (UX-STANDARD 2.21).
 * Play moves one step every `ms` (twice as long when Slow is on); Step and Back move by hand. When the device asks for reduced motion nothing plays by itself.
 */
export type Stepper = { step: number; last: number; playing: boolean; slow: boolean; reduce: boolean; play: () => void; back: () => void; next: () => void; toggleSlow: () => void; reset: () => void };

export function useStepper(count: number, autoplay = false, ms = 2800): Stepper {
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [slow, setSlow] = useState(false);
  const [reduce, setReduce] = useState(false);
  const last = count - 1;
  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(r);
    if (autoplay && !r) {
      setStep(0);
      setPlaying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!playing) return;
    if (step >= last) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setStep((k) => k + 1), (slow ? 2 : 1) * ms);
    return () => window.clearTimeout(id);
  }, [playing, step, slow, last, ms]);
  return {
    step,
    last,
    playing,
    slow,
    reduce,
    play: () => {
      if (playing) return setPlaying(false);
      if (step >= last || step < 0) setStep(0);
      setPlaying(true);
    },
    back: () => { setPlaying(false); setStep((k) => Math.max(0, k - 1)); },
    next: () => { setPlaying(false); setStep((k) => Math.min(last, k + 1)); },
    toggleSlow: () => setSlow((v) => !v),
    reset: () => { setPlaying(false); setStep(-1); },
  };
}

const BTN = "btn btn-sm min-h-[40px] border border-line bg-paper text-ink hover:border-ash disabled:opacity-40";

export function StepControls({ s, onClose }: { s: Stepper; onClose?: () => void }) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={BTN} onClick={s.back} disabled={s.step <= 0}>{tt("◀ Back")}</button>
        <button type="button" className={BTN} onClick={s.play} disabled={s.reduce} aria-pressed={s.playing}>{s.playing ? tt("Pause") : s.step >= s.last ? tt("Replay") : tt("Play")}</button>
        <button type="button" className={BTN} onClick={s.next} disabled={s.step >= s.last}>{tt("Step ▶")}</button>
        <button type="button" className={BTN} onClick={s.toggleSlow} aria-pressed={s.slow} disabled={s.reduce}>{tt("Slow")}</button>
        {onClose && <button type="button" className={BTN} onClick={() => { s.reset(); onClose(); }}>{tt("Close")}</button>}
      </div>
      {s.reduce && <p className="text-caption text-ash">{tt("Your device asks for reduced motion, so nothing plays by itself: use Step.")}</p>}
    </>
  );
}
