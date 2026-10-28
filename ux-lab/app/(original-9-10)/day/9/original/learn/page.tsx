'use client';

import { motion } from '@/original/lib/day9/motion-lite';
import Link from 'next/link';
import { copy, fmt } from '@/original/data/day9/copy';
import { concepts } from '@/original/data/day9/concepts';
import { DUR, STAGGER } from '@/original/lib/day9/motion';
import { useStore } from '@/original/lib/day9/store';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { Card, Eyebrow, Mono, PageHeader } from '@/original/components/day9/ui';
import { Inspectable } from '@/original/components/day9/inspector/InspectorTag';
import { MasteryLink, MilestoneNode } from '@/original/components/day9/gamification/MilestoneNode';
import { ProgressRing } from '@/original/components/day9/gamification/ProgressRing';

const CASE_TINT: Record<string, string> = {
  skillrise: 'var(--activation)',
  healthjourney: 'var(--integrity)',
  movewell: 'var(--inspect)',
  capstone: 'var(--ink-soft)',
};

/**
 * Node positions for the Mastery Map. Deliberately not a straight line — the
 * curriculum has three levels, and the shape says so.
 */
const NODE_POS: { x: number; y: number }[] = [
  { x: 70, y: 60 },
  { x: 190, y: 40 },
  { x: 310, y: 72 },
  { x: 430, y: 44 },
  { x: 550, y: 84 },
  { x: 300, y: 168 },
  { x: 420, y: 150 },
  { x: 540, y: 182 },
  { x: 180, y: 176 },
  { x: 60, y: 156 },
];

export default function LearnHubPage() {
  const { reduced } = useMotionSafe();
  const learn = useStore((s) => s.learn);

  const doneCount = concepts.filter((c) => learn[c.slug]?.completed).length;

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="THE FIELD MANUAL"
        title={copy.learn.hubTitle}
        deck={copy.learn.hubDeck}
        aside={
          <Inspectable mechanicId="visible-progress">
            <div className="flex items-center gap-3">
              <ProgressRing value={doneCount} total={concepts.length} label={copy.learn.mapLabel} />
              <p className="text-14 text-ink-soft">
                {fmt(copy.progress.sectionsRead, { done: doneCount, total: concepts.length })}
              </p>
            </div>
          </Inspectable>
        }
      />

      {/* Mastery map — not a list of cards. */}
      <section aria-labelledby="mastery-map">
        <h2 id="mastery-map" className="mono-label mb-3">
          {copy.learn.mapLabel}
        </h2>
        <Inspectable mechanicId="milestone">
          <Card className="overflow-x-auto p-4">
            <svg
              viewBox="0 0 620 230"
              className="h-auto w-full min-w-[560px]"
              role="group"
              aria-label={copy.learn.mapHelp}
            >
              {concepts.slice(0, -1).map((c, i) => {
                const from = NODE_POS[i];
                const to = NODE_POS[i + 1];
                const active = Boolean(learn[c.slug]?.completed);
                const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 - 18 };
                return (
                  <MasteryLink
                    key={c.slug}
                    d={`M ${from.x} ${from.y} Q ${mid.x} ${mid.y} ${to.x} ${to.y}`}
                    active={active}
                    delay={reduced ? 0 : i * 0.06}
                  />
                );
              })}

              {concepts.map((c, i) => (
                <MilestoneNode
                  key={c.slug}
                  x={NODE_POS[i].x}
                  y={NODE_POS[i].y}
                  index={c.order}
                  done={Boolean(learn[c.slug]?.completed)}
                  label={c.title}
                  tint={CASE_TINT[c.supports[0]] ?? 'var(--activation)'}
                  href={`/day/9/original/learn/${c.slug}`}
                />
              ))}
            </svg>
          </Card>
        </Inspectable>
        <p className="mt-2 text-12 text-ink-soft">{copy.learn.mapHelp}</p>
      </section>

      {/* The ten modules. */}
      <section aria-labelledby="modules">
        <h2 id="modules" className="mono-label mb-4">
          {fmt('{n} modules', { n: concepts.length })}
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {concepts.map((c, i) => {
            const progress = learn[c.slug];
            const done = Boolean(progress?.completed);
            return (
              <motion.li
                key={c.slug}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: reduced ? 0.15 : DUR.base,
                  delay: reduced ? 0 : (i % 4) * STAGGER.tight,
                }}
              >
                <Link href={`/day/9/original/learn/${c.slug}`} className="block h-full">
                  <Card className="flex h-full flex-col transition-shadow hover:shadow-raised">
                    <div className="flex items-start justify-between gap-3">
                      <Eyebrow>{c.eyebrow}</Eyebrow>
                      {done ? (
                        <Mono style={{ color: 'var(--integrity-text)' }}>{copy.learn.moduleDone}</Mono>
                      ) : progress?.sectionsDone.length ? (
                        <Mono className="text-ink-soft">
                          {fmt(copy.progress.sectionsRead, {
                            done: progress.sectionsDone.length,
                            total: 8,
                          })}
                        </Mono>
                      ) : null}
                    </div>
                    <h3 className="mt-2 text-20">{c.title}</h3>
                    <p className="mt-1.5 flex-1 text-14 text-ink-soft">{c.deck}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Mono className="text-ink-soft">{copy.learn.supportsLabel}</Mono>
                      {c.supports.map((s) => (
                        <span
                          key={s}
                          className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide"
                          style={{
                            border: `1px solid ${CASE_TINT[s]}`,
                            color: CASE_TINT[s],
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </Card>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
