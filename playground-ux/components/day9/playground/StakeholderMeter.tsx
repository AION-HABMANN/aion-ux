'use client';

import { AnimatePresence, motion } from '@/lib/day9/motion-lite';
import { useMemo } from 'react';
import { copy } from '@/data/day9/copy';
import {
  REBALANCE_INTERVENTION_AT,
  stakeholders,
  variants,
  type ReactionTrigger,
  type Variant,
} from '@/data/day9/cases/healthjourney';
import { SPRING } from '@/lib/day9/motion';
import { useStore } from '@/lib/day9/store';
import { useMotionSafe } from '@/lib/day9/use-motion-safe';
import { Meter, Mono } from '@/components/day9/ui';
import { Inspectable } from '@/components/day9/inspector/InspectorTag';

/**
 * Three stakeholders reacting live to the learner's scores (§9, step 3).
 * Keeping all three above 70 is arithmetically impossible — that is the point.
 */
export function StakeholderMeter() {
  const scores = useStore((s) => s.cases.healthjourney.scores);
  const scored = useStore((s) => s.cases.healthjourney.scored);
  const rebalances = useStore((s) => s.cases.healthjourney.rebalances);
  const { reduced } = useMotionSafe();

  const leader = useMemo<Variant | null>(() => {
    if (scored.length === 0) return null;
    const totals = variants.map((v) => ({
      id: v.id,
      total: Object.values(scores[v.id]).reduce((a, b) => a + b, 0),
    }));
    return totals.sort((a, b) => b.total - a.total)[0].id;
  }, [scores, scored]);

  const credibilityLeads = useMemo(() => {
    if (!leader) return false;
    return scores[leader].credibility > scores[leader].motivation;
  }, [leader, scores]);

  return (
    <div className="space-y-4">
      <Mono className="text-ink-soft">{copy.stakeholder.label}</Mono>

      <ul className="grid gap-4 md:grid-cols-3">
        {stakeholders.map((person) => {
          const confidence = leader
            ? Math.round(
                scores[leader][person.tracks] * 0.7 +
                  (leader === person.favours ? 30 : 4)
              )
            : 40;

          const trigger: ReactionTrigger | null = !leader
            ? null
            : rebalances >= REBALANCE_INTERVENTION_AT && person.id === 'user'
              ? 'many-rebalances'
              : credibilityLeads && person.id === 'marketing'
                ? 'credibility-over-motivation'
                : leader === 'A' && person.id === 'subject' && scores.A.motivation > 70
                  ? 'streaks-high'
                  : (`${leader}-highest` as ReactionTrigger);

          const line = trigger ? person.lines[trigger] : null;

          return (
            <li key={person.id}>
              <Inspectable mechanicId="social-comparison" as="div">
                <div className="h-full rounded-lg border border-hairline bg-raised p-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      mood={confidence >= 65 ? 'pleased' : confidence >= 40 ? 'neutral' : 'unhappy'}
                    />
                    <div>
                      <p className="text-14 font-medium">{person.name}</p>
                      <p className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                        {person.role}
                      </p>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {line ? (
                      <motion.p
                        key={line}
                        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={reduced ? { duration: 0.15 } : (SPRING.bubble as never)}
                        className="mt-3 rounded-lg border border-hairline bg-paper px-3 py-2 text-14"
                      >
                        {line}
                      </motion.p>
                    ) : (
                      <p className="mt-3 text-14 text-ink-soft">{person.wants}</p>
                    )}
                  </AnimatePresence>

                  <div className="mt-3">
                    <div className="flex items-baseline justify-between">
                      <Mono className="text-ink-soft">{copy.stakeholder.confidence}</Mono>
                      <Mono>{Math.min(100, Math.max(0, confidence))}</Mono>
                    </div>
                    <Meter
                      value={Math.min(100, Math.max(0, confidence))}
                      accent={
                        confidence >= 65
                          ? 'var(--integrity)'
                          : confidence >= 40
                            ? 'var(--activation)'
                            : 'var(--risk)'
                      }
                      label={`${person.name} ${copy.stakeholder.confidence}`}
                    />
                  </div>
                </div>
              </Inspectable>
            </li>
          );
        })}
      </ul>

      {rebalances >= REBALANCE_INTERVENTION_AT ? (
        <p className="border-l-2 pl-3 text-14" style={{ borderColor: 'var(--risk)' }}>
          {copy.stakeholder.rebalanceWarning}
        </p>
      ) : (
        <p className="text-12 text-ink-soft">{copy.stakeholder.impossible}</p>
      )}
    </div>
  );
}

function Avatar({ mood }: { mood: 'pleased' | 'neutral' | 'unhappy' }) {
  const mouth =
    mood === 'pleased' ? 'M 12 24 Q 18 29 24 24' : mood === 'neutral' ? 'M 12 25 L 24 25' : 'M 12 27 Q 18 22 24 27';
  const colour =
    mood === 'pleased' ? 'var(--integrity)' : mood === 'neutral' ? 'var(--ink-soft)' : 'var(--risk)';
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden>
      <circle cx="18" cy="18" r="17" fill="none" stroke={colour} strokeWidth="1.5" />
      <circle cx="13" cy="15" r="1.6" fill={colour} />
      <circle cx="23" cy="15" r="1.6" fill={colour} />
      <motion.path
        d={mouth}
        fill="none"
        stroke={colour}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={false}
        animate={{ d: mouth }}
      />
    </svg>
  );
}
