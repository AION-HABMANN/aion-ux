'use client';

import { AnimatePresence, motion } from '@/original/lib/day9/motion-lite';
import type { ReactNode } from 'react';
import { copy, fmt } from '@/original/data/day9/copy';
import { mechanicById } from '@/original/data/day9/mechanics';
import { DUR } from '@/original/lib/day9/motion';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { useInspector } from './InspectorProvider';
import { cx } from '@/original/components/day9/ui';

/**
 * Wraps a gamified element. When the Inspector is on, a small purple tag with a
 * connector line appears and links the element to its registry entry (§5.7).
 *
 * Every element that carries a mechanic MUST be wrapped in one of these —
 * BUILD_PROMPT §0.5.
 */
export function Inspectable({
  mechanicId,
  children,
  className,
  placement = 'top-right',
  as = 'div',
}: {
  mechanicId: string;
  children: ReactNode;
  className?: string;
  placement?: 'top-right' | 'top-left' | 'bottom-right';
  as?: 'div' | 'span' | 'li' | 'section';
}) {
  const { enabled, open } = useInspector();
  const { transition } = useMotionSafe();
  const mechanic = mechanicById[mechanicId];
  const As = as;

  return (
    <As className={cx('relative', className)} data-mechanic={enabled ? mechanicId : undefined}>
      {children}
      <AnimatePresence>
        {enabled && mechanic ? (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={transition(DUR.quick)}
            onClick={(e) => {
              e.stopPropagation();
              open(mechanicId);
            }}
            aria-label={fmt(copy.inspector.tagAria, { name: mechanic.name })}
            className={cx(
              'absolute z-20 flex items-center gap-1 rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider',
              placement === 'top-right' && '-right-1 -top-2.5',
              placement === 'top-left' && '-left-1 -top-2.5',
              placement === 'bottom-right' && '-bottom-2.5 -right-1'
            )}
            style={{
              borderColor: 'var(--inspect)',
              color: 'var(--inspect)',
              background: 'var(--raised)',
            }}
          >
            <span aria-hidden>⌕</span>
            {mechanic.name}
          </motion.button>
        ) : null}
      </AnimatePresence>
    </As>
  );
}

/** Marks a region as NOT gamified, so the Inspector can desaturate it. */
export function InspectDim({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx('inspect-dim', className)}>{children}</div>;
}
