'use client';

import { motion } from '@/lib/day9/motion-lite';
import Link from 'next/link';
import { copy } from '@/data/day9/copy';
import { skillriseBrief } from '@/data/day9/cases/skillrise';
import { healthjourneyBrief } from '@/data/day9/cases/healthjourney';
import { movewellBrief } from '@/data/day9/cases/movewell';
import { DUR, STAGGER } from '@/lib/day9/motion';
import { useStore } from '@/lib/day9/store';
import { useMotionSafe } from '@/lib/day9/use-motion-safe';
import { Button, Card, Eyebrow, Mono, PageHeader } from '@/components/day9/ui';
import { ReadinessMeter } from '@/components/day9/playground/CaseFrame';

const CASES = [
  {
    id: 'skillrise' as const,
    href: '/day/9/playground/skillrise',
    brief: skillriseBrief,
    interaction: 'Annotate',
    instrument: 'Insight radar',
    tint: 'var(--activation)',
  },
  {
    id: 'healthjourney' as const,
    href: '/day/9/playground/healthjourney',
    brief: healthjourneyBrief,
    interaction: 'Experience, then compare',
    instrument: 'Trade-off compass',
    tint: 'var(--integrity)',
  },
  {
    id: 'movewell' as const,
    href: '/day/9/playground/movewell',
    brief: movewellBrief,
    interaction: 'Allocate',
    instrument: 'Decision receipt',
    tint: 'var(--inspect)',
  },
];

export default function PlaygroundHubPage() {
  const { reduced } = useMotionSafe();
  const cases = useStore((s) => s.cases);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="THREE CLIENTS"
        title={copy.playground.hubTitle}
        deck={copy.playground.hubDeck}
      />

      <ul className="grid gap-5 lg:grid-cols-3">
        {CASES.map((c, i) => {
          const started = cases[c.id].briefAccepted;
          return (
            <motion.li
              key={c.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0.15 : DUR.base,
                delay: reduced ? 0 : i * STAGGER.base,
              }}
            >
              <Card className="flex h-full flex-col">
                <div
                  className="mb-4 h-1 w-12 rounded-full"
                  style={{ background: c.tint }}
                  aria-hidden
                />
                <Eyebrow>{copy.playground.briefFrom}</Eyebrow>
                <h2 className="mt-1 font-display text-26">{c.brief.client}</h2>
                <p className="mt-1 text-14 text-ink-soft">{c.brief.subtitle}</p>

                <div className="mt-4 space-y-1">
                  <p className="text-14">
                    <Mono className="text-ink-soft">INTERACTION</Mono>{' '}
                    <span className="ml-1">{c.interaction}</span>
                  </p>
                  <p className="text-14">
                    <Mono className="text-ink-soft">INSTRUMENT</Mono>{' '}
                    <span className="ml-1">{c.instrument}</span>
                  </p>
                </div>

                <p className="mt-4 flex-1 text-14 text-ink-soft">{c.brief.job}</p>

                <div className="mt-5 space-y-4 border-t border-hairline pt-4">
                  <ReadinessMeter caseId={c.id} />
                  <Link href={c.href}>
                    <Button variant={started ? 'secondary' : 'primary'} className="w-full">
                      {started ? copy.playground.reopen : copy.playground.open}
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.li>
          );
        })}
      </ul>

      <Card className="border-dashed">
        <p className="max-w-3xl text-14 text-ink-soft">
          {copy.handoff.toCapstone}{' '}
          <Link href="/day/9/capstone" className="underline underline-offset-2">
            {copy.nav.capstone}
          </Link>
        </p>
      </Card>
    </div>
  );
}
