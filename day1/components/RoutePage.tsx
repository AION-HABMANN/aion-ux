'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { FACILITATOR, ROUTE_BLOCKS, ROUTES, anchors, cardsOf } from '@/data/day1';
import { jumpTo } from '@/lib/flash';
import { routeMissing } from '@/lib/logic';
import { useHydrated, useStore } from '@/store/useStore';
import { PageMap, type MapEntry } from '@/components/chrome/PageMap';
import { MaterialCard } from '@/components/materi/MaterialCard';
import { ExportBar } from '@/components/task/ExportBar';
import { FacilitatorCard } from '@/components/task/FacilitatorCard';
import { TaskBlock } from '@/components/task/TaskBlock';
import { Pill } from '@/components/ui/kit';

/**
 * One route (CLAUDE.md #12, #30): the Materi cards first, then the tasks, then the one export, with the page map at the side.
 * Every block is Core and every card is Core, because a block draws on each of them (DL-STANDARD 1 and 6).
 */
export function RoutePage({ route }: { route: 1 | 2 }) {
  const hydrated = useHydrated();
  const read = useStore((s) => s.read);
  const answers = useStore((s) => s.answers);
  const r = ROUTES[route];
  const cards = cardsOf(route);
  const blocks = ROUTE_BLOCKS[route];
  const materiMin = cards.reduce((n, c) => n + c.minutes, 0);
  const taskMin = blocks.reduce((n, b) => n + b.minutes, 0);
  const letter = route === 1 ? 'A' : 'B';
  const openCard = (id: string) => jumpTo(anchors.card(id), { focus: false, block: 'start' });

  const entries: MapEntry[] = useMemo(() => {
    const open = hydrated ? routeMissing(blocks, answers) : [];
    return [
      ...cards.map((c) => ({ id: anchors.card(c.id), code: c.id, label: c.title, group: 'Materi', done: hydrated && Boolean(read[c.id]), minutes: c.minutes })),
      ...blocks.map((b) => ({ id: anchors.block(b.id), code: b.id, label: b.title.replace(/^Block \d\.\d · /, ''), group: 'Tasks', done: hydrated && !open.some((m) => m.block === b.id), minutes: b.minutes })),
      { id: anchors.export(route), code: 'Export', label: `Your ${r.deliverable}`, group: 'Export' },
    ];
  }, [cards, blocks, hydrated, read, answers, route, r.deliverable]);

  return (
    <div className="space-y-10 pt-6">
      <header className="max-w-prose space-y-2">
        <p className="smallcaps text-accent">{r.kicker}</p>
        <h1 className="text-display">{r.h1}</h1>
        <p className="text-body text-ash">{r.blurb}</p>
        <p className="text-body">
          <strong>You finish with:</strong> {r.deliverable}.
        </p>
        <p className="text-caption text-ash">
          About {materiMin + taskMin} minutes: the cards about {materiMin} min and the tasks about {taskMin} min. These are draft estimates. Digital Learning plans about an hour of Materi per route; the rest of it is the discussion your facilitator leads.
        </p>
        <p className="text-caption">
          <Link href="/" className="underline underline-offset-2">
            Back to the day
          </Link>
        </p>
      </header>

      <section id={`materi-${route}`} aria-labelledby={`materi-${route}-t`} className="space-y-4">
        <div className="space-y-1 border-t-2 border-ink pt-3">
          <p className="smallcaps text-accent">Materi {letter} · {cards.length} cards · about {materiMin} min</p>
          <h2 id={`materi-${route}-t`} className="text-h1">
            Read the cards first
          </h2>
          <p className="text-body text-ash">
            Each card opens with its idea in plain words, then what the tasks need. The rules and the sources are one click further. Nothing is locked: you can start with a task whenever you like.
          </p>
        </div>
        {cards.map((c) => (
          <MaterialCard key={c.id} card={c} />
        ))}
      </section>

      <section id={`tasks-${route}`} aria-labelledby={`tasks-${route}-t`} className="space-y-8">
        <div className="space-y-1 border-t-2 border-ink pt-3">
          <p className="smallcaps text-accent">
            Tasks · {blocks.length} {blocks.length === 1 ? 'block' : 'blocks'} · about {taskMin} min
          </p>
          <h2 id={`tasks-${route}-t`} className="text-h1">
            Now work {blocks.length === 1 ? 'the task' : 'the tasks'}
          </h2>
          <p className="flex flex-wrap items-center gap-2 text-body text-ash">
            <Pill tone="core">Every block is Core</Pill>
            The questions are the plan’s own. Your answers are your own words; a choice that differs from the model is never marked missing.
          </p>
        </div>
        {blocks.map((b) => (
          <div key={b.id} className="space-y-4">
            <TaskBlock block={b} onOpenCard={openCard} />
            {FACILITATOR.filter((f) => f.after === b.id).map((f) => (
              <FacilitatorCard key={f.id} card={f} />
            ))}
          </div>
        ))}
      </section>

      <ExportBar route={route} />
      <PageMap entries={entries} />
    </div>
  );
}
