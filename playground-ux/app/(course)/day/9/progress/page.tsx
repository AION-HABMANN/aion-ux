'use client';

import { motion } from '@/lib/day9/motion-lite';
import Link from 'next/link';
import { useState } from 'react';
import { copy, fmt } from '@/data/day9/copy';
import { concepts } from '@/data/day9/concepts';
import { downloadJson } from '@/lib/day9/export';
import { DUR, STAGGER } from '@/lib/day9/motion';
import { BADGES, LEVELS, badgeById, levelDef, levelProgress, nextLevelDef } from '@/lib/day9/progression';
import { useStore } from '@/lib/day9/store';
import { useMotionSafe } from '@/lib/day9/use-motion-safe';
import { Button, Card, EmptyState, Meter, Mono, PageHeader, cx } from '@/components/day9/ui';
import { Inspectable } from '@/components/day9/inspector/InspectorTag';
import { ProgressRing } from '@/components/day9/gamification/ProgressRing';

export default function ProgressPage() {
  const state = useStore((s) => s);
  const xp = useStore((s) => s.progression.xp);
  const level = useStore((s) => s.progression.level);
  const badges = useStore((s) => s.progression.badges);
  const streak = useStore((s) => s.progression.streak);
  const learn = useStore((s) => s.learn);
  const cases = useStore((s) => s.cases);
  const capstone = useStore((s) => s.capstone);
  const resetSession = useStore((s) => s.resetSession);
  const { reduced } = useMotionSafe();

  const [confirming, setConfirming] = useState(false);
  const [cleared, setCleared] = useState(false);

  const def = levelDef(level);
  const next = nextLevelDef(level);
  const modulesDone = concepts.filter((c) => learn[c.slug]?.completed).length;

  const journey = [
    { label: 'Field manual', done: modulesDone, total: concepts.length, href: '/day/9/learn' },
    {
      label: 'SkillRise',
      done: cases.skillrise.observations.length >= 5 ? 1 : 0,
      total: 1,
      href: '/day/9/playground/skillrise',
    },
    {
      label: 'HealthJourney',
      done: cases.healthjourney.decision ? 1 : 0,
      total: 1,
      href: '/day/9/playground/healthjourney',
    },
    {
      label: 'MoveWell',
      done: cases.movewell.receiptIssued ? 1 : 0,
      total: 1,
      href: '/day/9/playground/movewell',
    },
    {
      label: 'Board brief',
      done: Object.values(capstone).filter((t) => t.trim().split(/\s+/).length >= 25).length,
      total: 7,
      href: '/day/9/capstone',
    },
  ];

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="YOUR SESSION"
        title={copy.progressPage.title}
        deck={copy.progressPage.deck}
      />

      {/* Level and XP */}
      <div className="grid gap-5 md:grid-cols-3">
        <Inspectable mechanicId="levels">
          <Card className="h-full">
            <Mono className="text-ink-soft">{copy.progressPage.levelLabel}</Mono>
            <p className="mt-1 font-display text-34">{def.title}</p>
            <p className="mt-1 text-14 text-ink-soft">{fmt(copy.canNow, { capability: def.capability })}</p>
          </Card>
        </Inspectable>

        <Inspectable mechanicId="points">
          <Card className="h-full">
            <Mono className="text-ink-soft">{copy.progressPage.xpLabel}</Mono>
            <p className="mt-1 font-mono text-34 tabular-nums">{xp.toLocaleString('en-GB')}</p>
            <Meter
              value={levelProgress(xp) * 100}
              accent="var(--activation)"
              label={copy.progressPage.xpLabel}
            />
            <p className="mt-1 text-12 text-ink-soft">
              {next
                ? fmt(copy.console.toNext, {
                    n: (next.xp - xp).toLocaleString('en-GB'),
                    title: next.title,
                  })
                : copy.console.atCeiling}
            </p>
          </Card>
        </Inspectable>

        <Inspectable mechanicId="streaks">
          <Card className="h-full">
            <Mono className="text-ink-soft">Streak</Mono>
            <p className="mt-1 font-mono text-34 tabular-nums">{streak.days}</p>
            <p className="mt-1 text-12 text-ink-soft">
              {streak.freezeUsed
                ? copy.streak.frozen
                : 'One automatic freeze a week, unused. You do not have to ask for it.'}
            </p>
          </Card>
        </Inspectable>
      </div>

      {/* Journey map */}
      <section aria-labelledby="journey">
        <h2 id="journey" className="mono-label mb-3">
          {copy.progressPage.journeyLabel}
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {journey.map((leg, i) => (
            <motion.li
              key={leg.label}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0.15 : DUR.base,
                delay: reduced ? 0 : i * STAGGER.tight,
              }}
            >
              <Link href={leg.href}>
                <Card className="flex h-full items-center gap-3">
                  <ProgressRing value={leg.done} total={leg.total} size={40} stroke={4} label={leg.label} />
                  <span className="text-14">{leg.label}</span>
                </Card>
              </Link>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Badges */}
      <section aria-labelledby="badges">
        <h2 id="badges" className="mono-label mb-3">
          {copy.progressPage.badgesLabel} · {badges.length}/{BADGES.length}
        </h2>
        {badges.length === 0 ? (
          <EmptyState message={copy.empty.badges} />
        ) : null}
        <Inspectable mechanicId="badges">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BADGES.map((badge) => {
              const earned = badges.includes(badge.id);
              return (
                <li key={badge.id}>
                  <Card
                    className={cx('h-full', !earned && 'grayscale')}
                    as="article"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-16 font-medium">{badge.name}</p>
                      {earned ? (
                        <Mono style={{ color: 'var(--integrity-text)' }}>Earned</Mono>
                      ) : null}
                    </div>
                    <p className="mt-1 text-14 text-ink-soft">
                      {earned ? badgeById[badge.id].reason : badge.condition}
                    </p>
                  </Card>
                </li>
              );
            })}
          </ul>
        </Inspectable>

        <Card className="mt-4 border-dashed">
          <Mono className="text-ink-soft">{copy.badge.whyNoLoginQuestion}</Mono>
          <p className="mt-1 text-14">{copy.badge.whyNoLogin}</p>
        </Card>
      </section>

      {/* Anti-farming explanation — the rule is taught, not hidden. */}
      <Card>
        <Mono className="text-ink-soft">{copy.progressPage.antiFarming}</Mono>
        <p className="mt-2 max-w-3xl text-14">{copy.progressPage.antiFarmingBody}</p>
      </Card>

      {/* Levels reference */}
      <section aria-labelledby="levels">
        <h2 id="levels" className="mono-label mb-3">
          Levels
        </h2>
        <ol className="space-y-2">
          {LEVELS.map((l) => (
            <li
              key={l.level}
              className={cx(
                'flex flex-wrap items-baseline gap-3 border-b border-hairline pb-2',
                l.level > level && 'grayscale'
              )}
            >
              <Mono className="w-8 text-ink-soft">{l.xp}</Mono>
              <span className="text-16 font-medium">{l.title}</span>
              <span className="text-14 text-ink-soft">
                {fmt(copy.canNow, { capability: l.capability })}
              </span>
              <Mono className="ml-auto text-ink-soft">{l.unlocks.join(' · ')}</Mono>
            </li>
          ))}
        </ol>
      </section>

      {/* Export and reset */}
      <Card>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => downloadJson(state)}>{copy.progressPage.exportJson}</Button>
          <Button onClick={() => window.print()}>{copy.progressPage.printBrief}</Button>
          <Button variant="risk" onClick={() => setConfirming(true)}>
            {copy.progressPage.reset}
          </Button>
        </div>

        {confirming ? (
          <div className="mt-4 rounded border p-4" style={{ borderColor: 'var(--risk)' }}>
            <p className="text-14">{copy.progressPage.resetConfirm}</p>
            <div className="mt-3 flex gap-3">
              <Button
                variant="risk"
                onClick={() => {
                  resetSession();
                  setConfirming(false);
                  setCleared(true);
                }}
              >
                {copy.progressPage.resetConfirmYes}
              </Button>
              <Button variant="quiet" onClick={() => setConfirming(false)}>
                {copy.progressPage.resetConfirmNo}
              </Button>
            </div>
          </div>
        ) : null}

        {cleared ? (
          <p className="mt-3 text-14" style={{ color: 'var(--integrity-text)' }}>
            {copy.progressPage.resetDone}
          </p>
        ) : null}
      </Card>
    </div>
  );
}
