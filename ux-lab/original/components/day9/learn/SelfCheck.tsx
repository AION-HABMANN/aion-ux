'use client';

import { AnimatePresence, motion } from '@/original/lib/day9/motion-lite';
import { useState } from 'react';
import { copy, fmt } from '@/original/data/day9/copy';
import type { SelfCheck as SelfCheckDef } from '@/original/data/day9/types';
import { DUR, EASE } from '@/original/lib/day9/motion';
import { playCue } from '@/original/lib/day9/sound';
import { useStore } from '@/original/lib/day9/store';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { Inspectable } from '@/original/components/day9/inspector/InspectorTag';
import { cx, Mono } from '@/original/components/day9/ui';

/**
 * Self-check (§5.3 #4–#6).
 * Wrong answers get a gentle 3px shake and a hint — never a red wall. Getting
 * it right after being wrong pays MORE than getting it right first time,
 * because this app teaches recovery.
 */
export function SelfCheck({
  check,
  slug,
  capability,
  sectionRef,
}: {
  check: SelfCheckDef;
  slug: string;
  capability: string;
  sectionRef: string;
}) {
  const { reduced, transition } = useMotionSafe();
  const record = useStore((s) => s.recordCheck);
  const soundOn = useStore((s) => s.settings.sound);
  const stored = useStore((s) => s.learn[slug]?.checks[check.id]);

  const [selected, setSelected] = useState<string | null>(null);
  const [shake, setShake] = useState(0);
  const [outcome, setOutcome] = useState<'correct' | 'recovered' | 'wrong' | null>(
    stored?.correct ? (stored.recovered ? 'recovered' : 'correct') : null
  );

  const settled = outcome === 'correct' || outcome === 'recovered';
  const chosen = check.options.find((o) => o.id === selected);

  function choose(id: string) {
    if (settled) return;
    const option = check.options.find((o) => o.id === id);
    if (!option) return;
    setSelected(id);
    const result = record(slug, check.id, option.correct);
    setOutcome(result);
    if (option.correct) {
      playCue('confirm', soundOn);
    } else {
      setShake((n) => n + 1);
      playCue('tick', soundOn);
    }
  }

  return (
    <Inspectable mechanicId={settled && outcome === 'recovered' ? 'recovery-bonus' : 'completion-feedback'}>
      <motion.div
        key={shake}
        animate={
          shake && !settled && !reduced
            ? { x: [0, -3, 3, -3, 0] }
            : { x: 0 }
        }
        transition={{ duration: DUR.shake }}
        className="rounded-lg border border-hairline bg-raised p-5"
      >
        <div className="flex items-baseline justify-between gap-3">
          <Mono className="text-ink-soft">{copy.check.prompt}</Mono>
          {settled ? (
            <Mono style={{ color: 'var(--integrity-text)' }}>{copy.check.answered}</Mono>
          ) : null}
        </div>

        <p className="mt-2 text-16 font-medium">{check.question}</p>

        <div className="mt-4 space-y-2" role="radiogroup" aria-label={check.question}>
          {check.options.map((option) => {
            const isSelected = selected === option.id;
            const revealed = settled || isSelected;
            return (
              <div key={option.id}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={settled}
                  onClick={() => choose(option.id)}
                  className={cx(
                    'w-full rounded border px-3 py-2.5 text-left text-14 transition-colors',
                    revealed && option.correct
                      ? 'border-integrity bg-integrity/[0.07]'
                      : isSelected
                        ? 'border-risk/50 bg-risk/[0.05]'
                        : 'border-hairline hover:border-ink',
                    settled && !option.correct && !isSelected && 'opacity-55'
                  )}
                  style={
                    revealed && option.correct
                      ? { borderColor: 'var(--integrity)' }
                      : isSelected
                        ? { borderColor: 'var(--risk)' }
                        : undefined
                  }
                >
                  <span className="flex items-start gap-2">
                    {revealed && option.correct ? <Checkmark /> : <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-current opacity-40" />}
                    <span>{option.label}</span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {chosen ? (
            <motion.div
              key={chosen.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={transition(DUR.quick)}
              className="mt-4 border-l-2 pl-3 text-14"
              style={{
                borderColor: chosen.correct ? 'var(--integrity)' : 'var(--risk)',
              }}
            >
              <p className="text-ink">{chosen.feedback}</p>

              {chosen.correct ? (
                <p className="mt-2 font-medium" style={{ color: 'var(--integrity-text)' }}>
                  {outcome === 'recovered'
                    ? copy.check.recovered
                    : fmt(copy.check.correct, { capability: fmt(copy.canNow, { capability }) })}
                </p>
              ) : (
                <>
                  <p className="mt-2 text-ink-soft">
                    {fmt(copy.check.wrong, { section: sectionRef })}
                  </p>
                  <p className="mt-2">
                    <Mono className="text-ink-soft">{copy.check.hintLabel}: </Mono>
                    <span className="text-ink-soft">{check.hint}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(null);
                      setOutcome(null);
                    }}
                    className="mt-3 rounded border border-hairline px-3 py-1.5 text-14 hover:border-ink"
                  >
                    {copy.check.retry}
                  </button>
                </>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </Inspectable>
  );
}

/** SVG checkmark that draws itself over 380ms (§5.3 #4). */
function Checkmark() {
  const { reduced } = useMotionSafe();
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="mt-0.5 shrink-0" aria-hidden>
      <motion.path
        d="M3 8.5 L6.5 12 L13 4.5"
        fill="none"
        stroke="var(--integrity)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? { opacity: 0 } : { pathLength: 0 }}
        animate={reduced ? { opacity: 1 } : { pathLength: 1 }}
        transition={{ duration: reduced ? 0.15 : DUR.checkmark, ease: EASE.out as number[] }}
      />
    </svg>
  );
}
