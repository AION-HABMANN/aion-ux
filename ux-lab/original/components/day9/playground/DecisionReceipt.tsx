'use client';

import { motion } from '@/original/lib/day9/motion-lite';
import { copy, fmt } from '@/original/data/day9/copy';
import { TOTAL_WEEKS } from '@/original/data/day9/cases/movewell';
import { formatEuro, summariseAllocation } from '@/original/lib/day9/export';
import { DUR, STAGGER } from '@/original/lib/day9/motion';
import { useStore } from '@/original/lib/day9/store';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { Button, Mono } from '@/original/components/day9/ui';
import { Inspectable } from '@/original/components/day9/inspector/InspectorTag';

/**
 * The signature moment of Case 3 (§10, step 5). Prints line by line with a 90ms
 * stagger, then can be exported.
 */
export function DecisionReceipt() {
  const state = useStore((s) => s);
  const name = useStore((s) => s.learner.name);
  const { reduced } = useMotionSafe();

  const summary = summariseAllocation(state);

  const lines: { label: string; value: string }[] = [
    {
      label: copy.receipt.committed,
      value: `${formatEuro(summary.spent)} / ${formatEuro(150000)}`,
    },
    {
      label: copy.receipt.timeline,
      value: `${summary.weeksUsed} of ${TOTAL_WEEKS} weeks`,
    },
    { label: copy.receipt.shipped, value: String(summary.shipped) },
    {
      label: copy.receipt.deferred,
      value: summary.deferredNames.length
        ? `${summary.deferredCount}  (${summary.deferredNames[0].name} — ${summary.deferredNames[0].reason || 'reason not written yet'})`
        : '0',
    },
    { label: copy.receipt.strongest, value: summary.strongestBet },
    { label: copy.receipt.exposure, value: summary.biggestExposure },
  ];

  return (
    <Inspectable mechanicId="governance-marker">
      <div className="print-sheet rounded-lg border border-hairline bg-raised p-5 font-mono">
        <p className="text-12 uppercase tracking-wider">{copy.receipt.title}</p>
        <div className="my-3 border-t border-hairline" />

        <dl className="space-y-1.5">
          {lines.map((line, i) => (
            <motion.div
              key={line.label}
              className="grid grid-cols-[minmax(0,150px)_1fr] gap-3 text-12"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0.15 : 0.24,
                delay: reduced ? 0 : i * STAGGER.base + 0.02,
              }}
            >
              <dt className="text-ink-soft">{line.label}</dt>
              <dd className="break-words">{line.value}</dd>
            </motion.div>
          ))}
        </dl>

        <div className="my-3 border-t border-hairline" />
        <p className="text-12 text-ink-soft">
          {fmt(copy.receipt.signed, { name: name || 'Unsigned' })}
        </p>
        <p className="text-12 text-ink-soft">{new Date().toLocaleDateString('en-GB')}</p>

        <Button size="sm" className="mt-4 no-print" onClick={() => window.print()}>
          {copy.receipt.print}
        </Button>
      </div>
    </Inspectable>
  );
}

/** The locking animation for the timeline once it is valid (§5.3 #15). */
export function TimelineLock({ weeksUsed }: { weeksUsed: number }) {
  const { reduced } = useMotionSafe();
  return (
    <div className="flex gap-1" aria-hidden>
      {Array.from({ length: TOTAL_WEEKS }).map((_, i) => (
        <motion.span
          key={i}
          className="h-1.5 flex-1 rounded-sm"
          style={{ background: i < weeksUsed ? 'var(--integrity)' : 'var(--hairline)' }}
          initial={reduced ? false : { opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.cell, delay: reduced ? 0 : i * STAGGER.tight }}
        />
      ))}
    </div>
  );
}
