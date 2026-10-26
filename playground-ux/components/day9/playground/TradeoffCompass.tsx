'use client';

import { motion } from '@/lib/day9/motion-lite';
import { copy } from '@/data/day9/copy';
import { dimensions, variants, type Variant } from '@/data/day9/cases/healthjourney';
import { useStore } from '@/lib/day9/store';
import { Mono } from '@/components/day9/ui';
import { Inspectable } from '@/components/day9/inspector/InspectorTag';

const SIZE = 300;
const CENTRE = SIZE / 2;
const RADIUS = 104;

const VARIANT_COLOUR: Record<Variant, string> = {
  A: 'var(--activation)',
  B: 'var(--integrity)',
  C: 'var(--inspect)',
};

/**
 * Five-axis compass, updated live as the sliders move (§9, step 2).
 * Variants already scored stay on as ghost lines so the comparison is visible.
 */
export function TradeoffCompass({ active }: { active: Variant }) {
  const scores = useStore((s) => s.cases.healthjourney.scores);
  const scored = useStore((s) => s.cases.healthjourney.scored);

  function polygonFor(v: Variant): string {
    return dimensions
      .map((d, i) => {
        const angle = (i / dimensions.length) * Math.PI * 2 - Math.PI / 2;
        const value = (scores[v][d.id] ?? 0) / 100;
        return `${CENTRE + Math.cos(angle) * RADIUS * value},${CENTRE + Math.sin(angle) * RADIUS * value}`;
      })
      .join(' ');
  }

  const ghosts = variants.filter((v) => scored.includes(v.id) && v.id !== active);

  return (
    <Inspectable mechanicId="visible-progress">
      <div>
        <Mono className="text-ink-soft">{copy.tradeoff.label}</Mono>
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="mx-auto w-full max-w-[300px]"
          role="img"
          aria-label={copy.tradeoff.label}
        >
          {[0.25, 0.5, 0.75, 1].map((ring) => (
            <polygon
              key={ring}
              points={dimensions
                .map((_, i) => {
                  const a = (i / dimensions.length) * Math.PI * 2 - Math.PI / 2;
                  return `${CENTRE + Math.cos(a) * RADIUS * ring},${CENTRE + Math.sin(a) * RADIUS * ring}`;
                })
                .join(' ')}
              fill="none"
              stroke="var(--hairline)"
            />
          ))}

          {ghosts.map((v) => (
            <polygon
              key={v.id}
              points={polygonFor(v.id)}
              fill="none"
              stroke={VARIANT_COLOUR[v.id]}
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity={0.5}
            />
          ))}

          {/* No transition on the active shape: the slider must feel direct. */}
          <motion.polygon
            points={polygonFor(active)}
            fill={VARIANT_COLOUR[active]}
            fillOpacity={0.14}
            stroke={VARIANT_COLOUR[active]}
            strokeWidth="2.5"
          />

          {dimensions.map((d, i) => {
            const a = (i / dimensions.length) * Math.PI * 2 - Math.PI / 2;
            const lx = CENTRE + Math.cos(a) * (RADIUS + 30);
            const ly = CENTRE + Math.sin(a) * (RADIUS + 22);
            return (
              <text
                key={d.id}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                className="font-mono"
                fill="var(--ink-soft)"
              >
                {d.label}
              </text>
            );
          })}
        </svg>

        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {variants.map((v) => (
            <span key={v.id} className="flex items-center gap-1.5 text-12">
              <span
                className="inline-block h-2 w-4 rounded-sm"
                style={{
                  background: v.id === active ? VARIANT_COLOUR[v.id] : 'transparent',
                  border: `1.5px ${v.id === active ? 'solid' : 'dashed'} ${VARIANT_COLOUR[v.id]}`,
                }}
              />
              {v.name}
              {scored.includes(v.id) && v.id !== active ? (
                <Mono className="text-ink-soft">{copy.tradeoff.ghostLabel}</Mono>
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </Inspectable>
  );
}
