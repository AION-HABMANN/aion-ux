'use client';

import { motion } from '@/original/lib/day9/motion-lite';
import { useEffect, useRef, type ReactNode } from 'react';
import { copy, fmt } from '@/original/data/day9/copy';
import { CONCEPT_SECTIONS } from '@/original/data/day9/concepts';
import { DUR } from '@/original/lib/day9/motion';
import { useStore } from '@/original/lib/day9/store';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { Mono } from '@/original/components/day9/ui';
import { Fold } from '@/original/components/day9/learn/Fold';

/**
 * Stable empty array. A selector that builds `[]` on every call returns a new
 * reference each time, which makes useSyncExternalStore re-render forever.
 */
const NO_SECTIONS: string[] = [];

/** The anchor of one part of one card. Several cards can be open on a route page, so the card is in the id. */
export const sectionAnchor = (slug: string, id: string) => `${slug}--section-${id}`;

/**
 * One part of a card. Marks itself read once it has been on screen (a short dwell, so scrolling
 * past does not count). A part inside a closed fold is never on screen, so it never counts.
 */
export function Section({
  id,
  slug,
  label,
  children,
  eyebrowTone,
  fold,
}: {
  id: string;
  slug: string;
  label?: string;
  children: ReactNode;
  eyebrowTone?: 'inspect' | 'risk';
  /** If set, the body is folded behind a "＋ Show <fold>" row. */
  fold?: string;
}) {
  const markSection = useStore((s) => s.markSection);
  const done = useStore((s) => s.learn[slug]?.sectionsDone ?? NO_SECTIONS);
  const { reduced } = useMotionSafe();
  const ref = useRef<HTMLElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || fired.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          setTimeout(() => markSection(slug, id, CONCEPT_SECTIONS.length), 900);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [id, slug, markSection]);

  const index = CONCEPT_SECTIONS.findIndex((s) => s.id === id) + 1;
  const isDone = done.includes(id);
  const anchor = sectionAnchor(slug, id);

  return (
    <motion.section
      ref={ref}
      id={anchor}
      className="scroll-mt-24"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: reduced ? 0.15 : DUR.base }}
    >
      {label ? (
        <div className="mb-3 flex items-baseline gap-3">
          <Mono
            className="shrink-0"
            style={{
              color: eyebrowTone === 'risk' ? 'var(--risk)' : eyebrowTone === 'inspect' ? 'var(--inspect)' : undefined,
            }}
          >
            {String(index).padStart(2, '0')} · {label.toUpperCase()}
          </Mono>
          {isDone ? <Mono className="text-ink-soft">{fmt(copy.progress.section, { n: index, total: CONCEPT_SECTIONS.length })}</Mono> : null}
        </div>
      ) : null}
      {fold ? (
        <Fold foldKey={`${slug}:${id}`} anchor={anchor} label={fold}>
          {children}
        </Fold>
      ) : (
        children
      )}
    </motion.section>
  );
}
