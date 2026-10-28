'use client';

import { AnimatePresence, motion } from '@/original/lib/day9/motion-lite';
import { create } from 'zustand';
import { useEffect, useState } from 'react';
import { copy } from '@/original/data/day9/copy';
import { darkPatternContent, DARK_PATTERN_SECONDS } from '@/original/data/day9/darkpattern';
import { DUR, EASE } from '@/original/lib/day9/motion';
import { useStore } from '@/original/lib/day9/store';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';

/**
 * BUILD_PROMPT §5.8 — Dark Pattern Mode.
 * Runs for 90 seconds, shuts itself off, and hands the learner a reflection
 * prompt. Nothing done inside it is recorded as progress.
 *
 * The session state is deliberately NOT persisted: the simulation must never
 * survive a reload.
 */
interface DarkPatternSession {
  running: boolean;
  elapsed: number;
  finished: boolean;
  start: () => void;
  stop: () => void;
  tick: () => void;
  clearFinished: () => void;
}

export const useDarkPattern = create<DarkPatternSession>((set, get) => ({
  running: false,
  elapsed: 0,
  finished: false,
  start: () => set({ running: true, elapsed: 0, finished: false }),
  stop: () => set({ running: false, finished: true }),
  tick: () => {
    const next = get().elapsed + 1;
    if (next >= DARK_PATTERN_SECONDS) {
      set({ elapsed: DARK_PATTERN_SECONDS, running: false, finished: true });
    } else {
      set({ elapsed: next });
    }
  },
  clearFinished: () => set({ finished: false, elapsed: 0 }),
}));

export function DarkPatternLayer() {
  const { running, elapsed, tick } = useDarkPattern();
  const { reduced, transition } = useMotionSafe();
  const [dismissedModals, setDismissedModals] = useState<number[]>([]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-darkpattern', running ? 'on' : 'off');
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [running, tick]);

  useEffect(() => {
    if (!running) setDismissedModals([]);
  }, [running]);

  if (!running) return null;

  const visibleToasts = darkPatternContent.toasts.filter(
    (t) => elapsed >= t.at && elapsed < t.at + 6
  );
  const activeModal = darkPatternContent.modals.find(
    (m) => elapsed >= m.at && elapsed < m.at + 25 && !dismissedModals.includes(m.at)
  );

  return (
    <>
      {/* The banner never leaves the screen. */}
      <div
        className="fixed inset-x-0 top-0 z-[70] px-4 py-2 text-center font-mono text-12 font-semibold uppercase tracking-wider"
        style={{ background: 'var(--risk)', color: '#fff' }}
      >
        {copy.darkpattern.banner} · {DARK_PATTERN_SECONDS - elapsed}s
      </div>

      {/* Fake social pressure line. */}
      <div
        className="fixed inset-x-0 top-9 z-[69] px-4 py-1 text-center font-mono text-12"
        style={{ background: '#14002e', color: '#ff2e93' }}
      >
        {darkPatternContent.statusLine}
      </div>

      {/* Trivial-reward toasts. */}
      <div className="pointer-events-none fixed left-4 top-24 z-[68] flex flex-col gap-2">
        <AnimatePresence>
          {visibleToasts.map((t) => (
            <motion.div
              key={t.at}
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: -20, scale: 1.1 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={transition(DUR.quick)}
              className="rounded-full px-4 py-2 text-14 font-bold shadow-lifted"
              style={{ background: 'var(--activation)', color: '#fff' }}
            >
              {t.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loss-aversion and scarcity modals, with a deliberately tiny close. */}
      <AnimatePresence>
        {activeModal ? (
          <motion.div
            className="fixed inset-0 z-[71] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition(DUR.quick)}
          >
            <div className="absolute inset-0 bg-black/60" aria-hidden />
            <motion.div
              className="relative w-full max-w-sm rounded-xl p-6 text-center"
              style={{ background: 'var(--activation)', color: '#fff' }}
              initial={reduced ? { opacity: 0 } : { scale: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: DUR.base, ease: EASE.out as number[] }}
            >
              <p className="font-display text-26">{activeModal.title}</p>
              <p className="mt-2 text-14">{activeModal.body}</p>
              <p className="mt-3 font-mono text-34 tabular-nums">
                {formatFakeCountdown(elapsed)}
              </p>
              <button
                type="button"
                className="mt-4 w-full rounded-full bg-white px-4 py-3 text-16 font-bold"
                style={{ color: 'var(--activation-text)' }}
                onClick={() => setDismissedModals((d) => [...d, activeModal.at])}
              >
                {activeModal.cta}
              </button>
              {/* Small, low-contrast close — the pattern being demonstrated. */}
              <button
                type="button"
                aria-label="Close"
                className="absolute right-2 top-2 text-[9px] opacity-30"
                onClick={() => setDismissedModals((d) => [...d, activeModal.at])}
              >
                close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/** A countdown that is not counting down to anything. */
function formatFakeCountdown(elapsed: number): string {
  const total = 4 * 3600 - elapsed * 37;
  const h = Math.max(0, Math.floor(total / 3600));
  const m = Math.max(0, Math.floor((total % 3600) / 60));
  const s = Math.max(0, total % 60);
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/** The XP multiplier the simulation applies — used by the Module 05 page. */
export function darkPatternMultiplier(elapsed: number): number {
  const step = [...darkPatternContent.inflationSteps]
    .reverse()
    .find((s) => elapsed >= s.at);
  return step?.multiplier ?? 1;
}

/** Convenience hook for the reflection prompt that follows the shutoff. */
export function useDarkPatternReflection() {
  const finished = useDarkPattern((s) => s.finished);
  const clearFinished = useDarkPattern((s) => s.clearFinished);
  const setReflection = useStore((s) => s.setDarkPatternReflection);
  const setTried = useStore((s) => s.setDarkPatternTried);
  return { finished, clearFinished, setReflection, setTried };
}
