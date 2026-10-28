'use client';

import { motion } from '@/original/lib/day9/motion-lite';
import Link from 'next/link';
import { copy, fmt } from '@/original/data/day9/copy';
import type { SupportTarget } from '@/original/data/day9/types';
import { DUR, EASE } from '@/original/lib/day9/motion';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { Inspectable } from '@/original/components/day9/inspector/InspectorTag';
import { Mono } from '@/original/components/day9/ui';

const CASE_ROUTE: Record<SupportTarget, string> = {
  skillrise: '/day/9/original/playground/skillrise',
  healthjourney: '/day/9/original/playground/healthjourney',
  movewell: '/day/9/original/playground/movewell',
  capstone: '/day/9/original/capstone',
};

/**
 * The "You can now…" card (§5.3 #7). Slides up and scales 0.96→1 over 420ms.
 * It names a concrete capability, never "Module complete".
 */
export function CanNowCard({
  capability,
  supports,
}: {
  capability: string;
  supports: SupportTarget[];
}) {
  const { reduced } = useMotionSafe();

  return (
    <Inspectable mechanicId="self-efficacy-statement">
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: reduced ? 0.15 : DUR.base, ease: EASE.settle as number[] }}
        className="rounded-lg border p-5"
        style={{ borderColor: 'var(--integrity)', background: 'rgba(31,157,143,0.06)' }}
      >
        <Mono style={{ color: 'var(--integrity-text)' }}>{copy.canNowLabel}</Mono>
        <p className="mt-2 font-display text-20 leading-snug">
          {fmt(copy.canNow, { capability })}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {supports.map((s) => (
            <Link
              key={s}
              href={CASE_ROUTE[s]}
              className="rounded border border-hairline bg-raised px-3 py-1.5 text-14 hover:border-ink"
            >
              {fmt(copy.canNowLink, { case: s })}
            </Link>
          ))}
        </div>
      </motion.div>
    </Inspectable>
  );
}
