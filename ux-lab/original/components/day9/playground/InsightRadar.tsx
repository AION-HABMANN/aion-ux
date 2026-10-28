'use client';

import { motion } from '@/original/lib/day9/motion-lite';
import { useEffect, useMemo, useRef } from 'react';
import { copy, fmt } from '@/original/data/day9/copy';
import { CATEGORIES, expectedFindings } from '@/original/data/day9/cases/skillrise';
import { DUR, EASE } from '@/original/lib/day9/motion';
import { useStore } from '@/original/lib/day9/store';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { Mono } from '@/original/components/day9/ui';
import { Inspectable } from '@/original/components/day9/inspector/InspectorTag';

/** Wider than it is tall, so the axis labels have room and never clip. */
const WIDTH = 320;
const HEIGHT = 260;
const CENTRE_X = WIDTH / 2;
const CENTRE_Y = HEIGHT / 2;
const RADIUS = 86;
const MAX_PER_AXIS = 3;

/**
 * Six-axis radar that fills live as observations are logged (§8, step 3).
 * When all six axes carry something, the shape draws itself and the completion
 * bonus lands.
 */
export function InsightRadar() {
  const observations = useStore((s) => s.cases.skillrise.observations);
  const award = useStore((s) => s.award);
  const grantBadge = useStore((s) => s.grantBadge);
  const hintsTaken = useStore((s) => s.cases.skillrise.hintsTaken);
  const takeHint = useStore((s) => s.takeHint);
  const { reduced } = useMotionSafe();
  const completedOnce = useRef(false);

  const counts = useMemo(() => {
    const map = Object.fromEntries(CATEGORIES.map((c) => [c.id, 0])) as Record<string, number>;
    observations.forEach((o) => {
      map[o.category] = (map[o.category] ?? 0) + 1;
    });
    return map;
  }, [observations]);

  const covered = CATEGORIES.filter((c) => counts[c.id] > 0);
  const complete = covered.length === CATEGORIES.length;

  useEffect(() => {
    if (!complete || completedOnce.current) return;
    completedOnce.current = true;
    award('radarComplete', 'skillrise-radar-complete');
    // Category Thinker: ten observations spread across all six categories.
    if (observations.length >= 10) grantBadge('category-thinker');
    // Pattern Spotter: five or more weaknesses found without asking for a hint.
    const weaknesses = observations.filter((o) => o.effect === 'weakens').length;
    if (weaknesses >= 5 && hintsTaken.length === 0) grantBadge('pattern-spotter');
  }, [complete, observations, hintsTaken, award, grantBadge]);

  const points = CATEGORIES.map((c, i) => {
    const angle = (i / CATEGORIES.length) * Math.PI * 2 - Math.PI / 2;
    const value = Math.min(counts[c.id], MAX_PER_AXIS) / MAX_PER_AXIS;
    return {
      x: CENTRE_X + Math.cos(angle) * RADIUS * value,
      y: CENTRE_Y + Math.sin(angle) * RADIUS * value,
      lx: CENTRE_X + Math.cos(angle) * (RADIUS + 42),
      ly: CENTRE_Y + Math.sin(angle) * (RADIUS + 20),
      category: c,
      value,
    };
  });

  const polygon = points.map((p) => `${p.x},${p.y}`).join(' ');

  // The first uncovered category gets a nudge, never the answer.
  const missing = CATEGORIES.find((c) => counts[c.id] === 0);
  const nudge = missing
    ? expectedFindings.find((f) => f.category === missing.id)
    : undefined;

  return (
    <Inspectable mechanicId="visible-progress">
      <div className="grid gap-5 sm:grid-cols-[280px_1fr]">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full max-w-[320px]"
          role="img"
          aria-label={fmt('{n} of 6 categories covered', { n: covered.length })}
        >
          {[0.33, 0.66, 1].map((ring) => (
            <polygon
              key={ring}
              points={CATEGORIES.map((_, i) => {
                const a = (i / CATEGORIES.length) * Math.PI * 2 - Math.PI / 2;
                return `${CENTRE_X + Math.cos(a) * RADIUS * ring},${CENTRE_Y + Math.sin(a) * RADIUS * ring}`;
              }).join(' ')}
              fill="none"
              stroke="var(--hairline)"
            />
          ))}
          {CATEGORIES.map((c, i) => {
            const a = (i / CATEGORIES.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <line
                key={c.id}
                x1={CENTRE_X}
                y1={CENTRE_Y}
                x2={CENTRE_X + Math.cos(a) * RADIUS}
                y2={CENTRE_Y + Math.sin(a) * RADIUS}
                stroke="var(--hairline)"
              />
            );
          })}

          <motion.polygon
            points={polygon}
            fill="var(--activation)"
            fillOpacity={complete ? 0.16 : 0.1}
            stroke="var(--activation)"
            strokeWidth="2"
            initial={false}
            animate={{ points: polygon }}
            transition={
              reduced ? { duration: 0.15 } : { duration: DUR.draw, ease: EASE.out }
            }
          />

          {points.map((p) => (
            <g key={`label-${p.category.id}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r={p.value > 0 ? 3 : 2}
                fill={p.value > 0 ? 'var(--activation)' : 'var(--hairline)'}
              />
              <text
                x={p.lx}
                y={p.ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                className="font-mono"
                fill={p.value > 0 ? 'var(--ink)' : 'var(--ink-soft)'}
              >
                {p.category.label}
              </text>
            </g>
          ))}
        </svg>

        <div>
          <Mono className="text-ink-soft">{copy.radar.label}</Mono>
          {complete ? (
            <motion.p
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-16"
              style={{ color: 'var(--integrity-text)' }}
            >
              {copy.radar.complete}
            </motion.p>
          ) : (
            <p className="mt-2 text-16 text-ink-soft">
              {covered.length} of {CATEGORIES.length} categories carry an observation.
            </p>
          )}

          {!complete && missing && nudge && observations.length >= 5 ? (
            <div className="mt-4 rounded border border-dashed border-hairline p-3">
              <p className="text-14">
                {fmt(copy.radar.hint, { category: missing.label, nudge: nudge.hint })}
              </p>
              <button
                type="button"
                onClick={() => takeHint(nudge.n)}
                className="mt-2 font-mono text-[10px] uppercase tracking-wider text-ink-soft underline"
              >
                {hintsTaken.includes(nudge.n) ? 'Hint taken' : 'I used this hint'}
              </button>
            </div>
          ) : null}

          <ul className="mt-4 space-y-1">
            {CATEGORIES.map((c) => (
              <li key={c.id} className="flex items-center justify-between text-14">
                <span className={counts[c.id] ? 'text-ink' : 'text-ink-soft'}>{c.label}</span>
                <Mono
                  style={{
                    color:
                      counts[c.id] > 0
                        ? c.tone === 'activation'
                          ? 'var(--activation)'
                          : 'var(--integrity)'
                        : 'var(--ink-soft)',
                  }}
                >
                  {counts[c.id]}
                </Mono>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Inspectable>
  );
}
