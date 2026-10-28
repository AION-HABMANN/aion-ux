'use client';

import { motion } from '@/original/lib/day9/motion-lite';
import { useCallback, useRef, useState, type ReactNode } from 'react';
import { copy } from '@/original/data/day9/copy';
import { DUR } from '@/original/lib/day9/motion';
import { useStore } from '@/original/lib/day9/store';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { Inspectable } from '@/original/components/day9/inspector/InspectorTag';
import { Mono } from '@/original/components/day9/ui';

/**
 * Wraps every live demo. Handles the "meaningful interaction" award — once per
 * demo, never per click (§5.2) — and flashes the changed region in --inspect
 * for 240ms the first time (§5.3 #3).
 */
export function DemoFrame({
  slug,
  mechanicId,
  brief,
  insight,
  children,
}: {
  slug: string;
  mechanicId: string;
  brief: string;
  insight: string;
  children: (api: { onInteract: () => void; flashed: boolean }) => ReactNode;
}) {
  const markDemoUsed = useStore((s) => s.markDemoUsed);
  const used = useStore((s) => Boolean(s.learn[slug]?.demoUsed));
  const { reduced, transition } = useMotionSafe();
  const [flash, setFlash] = useState(false);
  const fired = useRef(false);

  const onInteract = useCallback(() => {
    if (fired.current) return;
    fired.current = true;
    setFlash(true);
    setTimeout(() => setFlash(false), 240);
    markDemoUsed(slug);
  }, [markDemoUsed, slug]);

  return (
    <Inspectable mechanicId={mechanicId}>
      <div className="rounded-lg border border-hairline bg-raised">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-hairline px-5 py-3">
          <Mono style={{ color: 'var(--inspect-text)' }}>{copy.learn.demoLabel}</Mono>
          {used ? <Mono className="text-ink-soft">Interaction banked</Mono> : null}
        </div>

        <p className="px-5 pt-4 text-14 text-ink-soft">{brief}</p>

        <motion.div
          className="p-5"
          animate={
            flash && !reduced
              ? { boxShadow: 'inset 0 0 0 2px var(--inspect)' }
              : { boxShadow: 'inset 0 0 0 0px rgba(0,0,0,0)' }
          }
          transition={transition(DUR.micro)}
        >
          {children({ onInteract, flashed: flash })}
        </motion.div>

        {used ? (
          <div className="border-t border-hairline px-5 py-3">
            <Mono className="text-ink-soft">{copy.learn.demoInsight}</Mono>
            <p className="mt-1 text-14 text-ink-soft">{insight}</p>
          </div>
        ) : null}
      </div>
    </Inspectable>
  );
}

/** Small shared readout used across several demos. */
export function Readout({
  label,
  value,
  suffix,
  accent = 'var(--ink)',
}: {
  label: string;
  value: number | string;
  suffix?: string;
  accent?: string;
}) {
  return (
    <div>
      <p className="mono-label">{label}</p>
      <p className="font-mono text-26 tabular-nums" style={{ color: accent }}>
        {value}
        {suffix ? <span className="text-14">{suffix}</span> : null}
      </p>
    </div>
  );
}
