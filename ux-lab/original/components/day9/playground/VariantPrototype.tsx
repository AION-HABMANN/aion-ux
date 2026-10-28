'use client';

import { AnimatePresence, motion } from '@/original/lib/day9/motion-lite';
import { useEffect, useState } from 'react';
import { copy, fmt } from '@/original/data/day9/copy';
import {
  MIN_SECONDS_IN_VARIANT,
  variantA,
  variantB,
  variantC,
  variantById,
  type Variant,
} from '@/original/data/day9/cases/healthjourney';
import { DUR, EASE, STAGGER } from '@/original/lib/day9/motion';
import { useStore } from '@/original/lib/day9/store';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { Button, Mono, cx } from '@/original/components/day9/ui';
import { Inspectable } from '@/original/components/day9/inspector/InspectorTag';

/**
 * All three variants are real, clickable prototypes (§9). While the learner is
 * inside one, the console gauges move to that variant's targets — the trade-off
 * is felt before it is scored.
 */
export function VariantPrototype({
  variant,
  onLeave,
}: {
  variant: Variant;
  onLeave: () => void;
}) {
  const spec = variantById[variant];
  const setGaugeOverride = useStore((s) => s.setGaugeOverride);
  const addVariantTime = useStore((s) => s.addVariantTime);
  const timeSoFar = useStore((s) => s.cases.healthjourney.timeInVariant[variant]);
  const { reduced, transition } = useMotionSafe();

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setGaugeOverride(spec.gauges);
    return () => setGaugeOverride(null);
  }, [spec.gauges, setGaugeOverride]);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
      addVariantTime(variant, 1);
    }, 1000);
    return () => clearInterval(id);
  }, [variant, addVariantTime]);

  const total = timeSoFar + seconds;
  const remaining = Math.max(0, MIN_SECONDS_IN_VARIANT - total);

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition(DUR.quick)}
      className="space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Mono style={{ color: 'var(--activation-text)' }}>
            {spec.name} · {spec.label}
          </Mono>
          <p className="text-14 text-ink-soft">
            {remaining > 0
              ? fmt(copy.variant.remaining, { n: remaining, variant: spec.name })
              : fmt(copy.variant.done, { variant: spec.name })}
          </p>
        </div>
        <Button size="sm" onClick={onLeave}>
          {copy.variant.leave}
        </Button>
      </div>

      <div className="rounded-lg border border-hairline bg-white p-5">
        {variant === 'A' ? <PrototypeA /> : variant === 'B' ? <PrototypeB /> : <PrototypeC />}
      </div>

      <p className="text-12 text-ink-soft">
        The gauges at the bottom of the screen are showing what this variant does to motivation and
        credibility. Watch them, not the copy.
      </p>
    </motion.div>
  );
}

// ── Variant A — heavy gamification ──────────────────────────────────────────

function PrototypeA() {
  const [points, setPoints] = useState(2140);
  const [logged, setLogged] = useState(false);
  const { reduced } = useMotionSafe();

  return (
    <div className="space-y-4">
      <Inspectable mechanicId="streaks">
        <p className="text-16 font-semibold">{variantA.greeting}</p>
      </Inspectable>

      <Inspectable mechanicId="challenges">
        <div className="flex items-center justify-between rounded border border-hairline px-3 py-2">
          <p className="text-14">{variantA.challenge}</p>
          <Mono style={{ color: 'var(--activation-text)' }}>{variantA.challengePoints}</Mono>
        </div>
      </Inspectable>

      <Inspectable mechanicId="status-display">
        <p className="text-14">{variantA.rank}</p>
      </Inspectable>

      <Inspectable mechanicId="social-comparison">
        <table className="w-full text-14">
          <caption className="sr-only">This week&apos;s leaderboard</caption>
          <tbody>
            {variantA.leaderboard.map((row) => (
              <tr
                key={row.rank}
                className={cx('border-t border-hairline', row.isUser && 'font-semibold')}
                style={row.isUser ? { color: 'var(--risk-text)' } : undefined}
              >
                <td className="w-8 py-1 font-mono text-12">{row.rank}</td>
                <td className="py-1">{row.name}</td>
                <td className="py-1 text-right font-mono text-12">
                  {row.score.toLocaleString('en-GB')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Inspectable>

      <Inspectable mechanicId="badges">
        <div className="flex flex-wrap gap-2">
          {variantA.badges.map((b) => (
            <span
              key={b}
              className="rounded-full px-2.5 py-1 text-12"
              style={{ background: 'var(--activation)', color: '#fff' }}
            >
              {b}
            </span>
          ))}
        </div>
      </Inspectable>

      <Inspectable mechanicId="points">
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              setPoints((p) => p + 150);
              setLogged(true);
            }}
          >
            {variantA.cta}
          </Button>
          <motion.span
            key={points}
            className="font-mono text-20 tabular-nums"
            style={{ color: 'var(--activation-text)' }}
            initial={reduced ? false : { scale: 1.3 }}
            animate={{ scale: 1 }}
          >
            {points.toLocaleString('en-GB')} pts
          </motion.span>
        </div>
      </Inspectable>

      <AnimatePresence>
        {logged ? (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-16 font-semibold"
            style={{ color: 'var(--activation-text)' }}
          >
            {variantA.onComplete}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

// ── Variant B — restrained ──────────────────────────────────────────────────

function PrototypeB() {
  const [logged, setLogged] = useState(false);
  const { reduced } = useMotionSafe();

  return (
    <div className="space-y-4">
      <p className="text-16">{variantB.week}</p>

      <Inspectable mechanicId="visible-progress">
        <div className="flex gap-1">
          {Array.from({ length: variantB.totalSegments }).map((_, i) => (
            <motion.span
              key={i}
              className="h-2.5 flex-1 rounded-sm"
              style={{
                background:
                  i < variantB.filledSegments ? 'var(--integrity)' : 'var(--hairline)',
              }}
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DUR.segment, delay: i * STAGGER.micro }}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between font-mono text-[10px] text-ink-soft">
          {variantB.milestoneWeeks.map((w) => (
            <span key={w}>week {w}</span>
          ))}
        </div>
      </Inspectable>

      <p className="text-14">{variantB.sessions}</p>

      <Inspectable mechanicId="milestone">
        <p className="border-l-2 pl-3 text-14" style={{ borderColor: 'var(--integrity)' }}>
          {variantB.nextMilestone}
        </p>
      </Inspectable>

      <Inspectable mechanicId="completion-feedback">
        <Button size="sm" variant="primary" onClick={() => setLogged(true)}>
          {variantB.cta}
        </Button>
        <AnimatePresence>
          {logged ? (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-14"
              style={{ color: 'var(--integrity-text)' }}
            >
              {variantB.onComplete}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </Inspectable>
    </div>
  );
}

// ── Variant C — narrative ───────────────────────────────────────────────────

function PrototypeC() {
  const [logged, setLogged] = useState(false);
  const { reduced } = useMotionSafe();

  return (
    <div className="space-y-4">
      <Inspectable mechanicId="narrative-framing">
        <ol className="space-y-2">
          {variantC.stages.map((stage, i) => {
            const state = i < variantC.currentStage ? 'done' : i === variantC.currentStage ? 'now' : 'ahead';
            return (
              <motion.li
                key={stage}
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: DUR.stage, delay: i * STAGGER.quick, ease: EASE.out }}
                className="flex items-start gap-3"
              >
                <span
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    background:
                      state === 'ahead' ? 'var(--hairline)' : 'var(--integrity)',
                    outline: state === 'now' ? '3px solid rgba(31,157,143,0.25)' : undefined,
                  }}
                />
                <span
                  className={cx(
                    'text-16',
                    state === 'ahead' && 'text-ink-soft',
                    state === 'now' && 'font-medium'
                  )}
                >
                  {stage}
                </span>
              </motion.li>
            );
          })}
        </ol>
      </Inspectable>

      <p className="text-12 text-ink-soft">{variantC.note}</p>

      <Inspectable mechanicId="milestone">
        <Button size="sm" variant="primary" onClick={() => setLogged(true)}>
          {variantC.cta}
        </Button>
        <AnimatePresence>
          {logged ? (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-14"
              style={{ color: 'var(--integrity-text)' }}
            >
              {variantC.onComplete}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </Inspectable>
    </div>
  );
}
