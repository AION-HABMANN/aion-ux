'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { conceptBySlug } from '@/data/day9/concepts';
import { CARD_MINUTES, fmtMin, pathOf, TASK_MINUTES } from '@/data/day9/materi';
import { Fold } from '@/components/day9/learn/Fold';
import { InlineCard, type NextStep } from '@/components/day9/learn/InlineCard';
import { TASK_BY_ID } from '@/data/day9/tasks';
import type { RouteDef } from '@/data/day9/routes';
import { TaskSection } from '@/components/day9/tasks/TaskSection';
import { PageMap, type MapEntry } from '@/components/day9/day/PageMap';
import { jumpTo } from '@/components/day9/day/jump';
import { Button, Card, Eyebrow } from '@/components/day9/ui';
import { allMissing, totals } from '@/lib/day9/tasks-logic';
import { useTasksStore } from '@/lib/day9/tasks-store';
import { useStore } from '@/lib/day9/store';
import { downloadAnswers, printAnswers } from '@/lib/day9/tasks-export';

/**
 * One route of Day 9 (UX-STANDARD 2.8): header with the deliverable, the Materi cards,
 * the tasks as fields, the export, and the page map.
 */
export function RoutePage({ route }: { route: RouteDef }) {
  const answers = useTasksStore((s) => s.answers);
  const taskHydrated = useTasksStore((s) => s.hydrated);
  const setAnswer = useTasksStore((s) => s.setAnswer);
  const clearTasks = useTasksStore((s) => s.clearTasks);
  const learn = useStore((s) => s.learn);
  const name = useStore((s) => s.learner.name);

  const path = useMemo(() => pathOf(route), [route]);
  const missing = useMemo(() => allMissing(answers, route.taskIds), [answers, route.taskIds]);
  const { done, total } = useMemo(() => totals(answers, route.taskIds), [answers, route.taskIds]);

  // the path in reading order: what each step is, so a card can say what comes next
  const flat = useMemo(() => {
    const out: { id: string; kind: 'card' | 'task' | 'export'; step: number; code: string; label: string; cardSlug?: string; done: boolean }[] = [];
    for (const c of path.cards) {
      out.push({ id: `mat-${c.code}`, kind: 'card', step: c.step, code: c.code, label: conceptBySlug[c.slug].title, cardSlug: c.slug, done: Boolean(learn[c.slug]?.completed) });
    }
    for (const tk of path.tasks) {
      const task = TASK_BY_ID[tk.taskId];
      out.push({ id: tk.taskId, kind: 'task', step: tk.step, code: `T${tk.taskId.slice(1)}`, label: `Task ${tk.taskId.slice(1)} · ${task.caseName}`, done: allMissing(answers, [tk.taskId]).length === 0 });
    }
    out.push({ id: `export-${route.no}`, kind: 'export', step: path.exportStep, code: 'Export', label: `Your ${route.deliverable.replace(/^the /, '')}`, done: false });
    return out;
  }, [path, route, learn, answers]);
  const nextOf = (step: number): NextStep | undefined => {
    const n = flat.find((f) => f.step === step + 1);
    if (!n) return undefined;
    return { id: n.id, label: n.kind === 'card' ? `${n.code} ${n.label}` : n.kind === 'task' ? n.label.split(' · ')[0] : 'your export', cardSlug: n.cardSlug };
  };

  // in the order of the page: cards, the Optional cards, tasks, export
  const entries: MapEntry[] = useMemo(() => {
    const entry = (f: (typeof flat)[number]): MapEntry => ({
      id: f.id,
      code: f.code,
      label: f.label,
      group: f.kind === 'card' ? 'Materi' : f.kind === 'task' ? 'Tasks' : 'Export',
      done: f.done,
      step: f.step,
      minutes: f.kind === 'card' ? CARD_MINUTES : f.kind === 'task' ? TASK_MINUTES[f.id as 't1'] : undefined,
    });
    const opt: MapEntry[] = path.optional.map((c) => ({
      id: `mat-${c.code}`,
      code: c.code,
      label: conceptBySlug[c.slug].title,
      group: 'Materi',
      done: Boolean(learn[c.slug]?.completed),
      optional: true,
      foldKey: `route-${route.no}:optional`,
    }));
    return [...flat.filter((f) => f.kind === 'card').map(entry), ...opt, ...flat.filter((f) => f.kind !== 'card').map(entry)];
  }, [flat, path, route, learn]);

  return (
    <div className="space-y-12">
      <header className="max-w-3xl">
        <Eyebrow>
          Route {route.no} · {route.levels}
        </Eyebrow>
        <h1 className="mt-2 text-34 sm:text-46">{route.verb}</h1>
        <p className="mt-3 text-16 text-ink-soft">{route.intro}</p>
        <p className="mt-3 text-16">
          <strong>You finish with:</strong> {route.deliverable}.
        </p>
        <p className="mt-1 text-14 text-ink-soft">This route holds, in the plan&rsquo;s order: {route.planRows}.</p>
        <p className="mt-3 text-14">
          <Link href="/day/9/" className="underline underline-offset-2">
            Back to the day
          </Link>
        </p>
      </header>

      <nav aria-label="Your path through this route" className="no-print rounded-lg border border-hairline bg-raised p-4 sm:p-5">
        <h2 className="text-20">
          Your path · {path.total} steps · about {fmtMin(path.materiMinutes + path.taskMinutes)}
        </h2>
        <p className="mt-1 text-14">
          Materi about {fmtMin(path.materiMinutes)} (each card about {CARD_MINUTES} min) · tasks about {fmtMin(path.taskMinutes)}. These are draft estimates. The hour of Materi that Digital Learning plans per route also holds the discussion your facilitator leads.
        </p>
        <p className="mt-1 max-w-3xl text-14 text-ink-soft">
          Read the cards first, then do the tasks. A card shows its idea in plain words; its button opens the demo in place. Each task names the cards it draws on. Nothing is locked: every part stays open, so you can start anywhere.
        </p>
        <ol className="mt-4 space-y-3">
          <li className="flex flex-wrap items-center gap-2">
            <span className="mono-label w-20 shrink-0">Materi</span>
            {flat
              .filter((f) => f.kind === 'card')
              .map((f) => (
                <PathPill key={f.id} f={f} />
              ))}
            <span className="text-14 text-ink-soft">about {fmtMin(path.materiMinutes)}</span>
          </li>
          <li className="flex flex-wrap items-center gap-2">
            <span className="mono-label w-20 shrink-0">Tasks</span>
            {flat
              .filter((f) => f.kind === 'task')
              .map((f) => (
                <PathPill key={f.id} f={f} />
              ))}
            <span className="text-14 text-ink-soft">about {fmtMin(path.taskMinutes)}</span>
          </li>
          <li className="flex flex-wrap items-center gap-2">
            <span className="mono-label w-20 shrink-0">Finish</span>
            {flat
              .filter((f) => f.kind === 'export')
              .map((f) => (
                <PathPill key={f.id} f={f} />
              ))}
            <span className="text-14 text-ink-soft">Your {route.deliverable.replace(/^the /, '')}</span>
          </li>
        </ol>
        {path.optional.length ? (
          <p className="mt-3 text-14 text-ink-soft">
            Optional, not on the path: {path.optional.map((c) => `${c.code} ${conceptBySlug[c.slug].title}`).join(', ')}. It is folded at the end of the cards.
          </p>
        ) : null}
      </nav>

      <section id={`materi-${route.no}`} aria-labelledby={`materi-${route.no}-title`} className="scroll-mt-24 space-y-6">
        <div className="border-t-2 border-ink pt-4">
          <Eyebrow>
            {route.materiName} · steps 1 to {path.cards.length} · about {fmtMin(path.materiMinutes)}
          </Eyebrow>
          <h2 id={`materi-${route.no}-title`} className="mt-2 text-26">
            Read the cards first
          </h2>
          <p className="mt-1 max-w-3xl text-14 text-ink-soft">
            {path.cards.length} Core cards{path.optional.length ? ` and ${path.optional.length} Optional` : ''}. Open a card to try its demo; the story, the full idea and the self-check are one click further and are never counted.
          </p>
        </div>
        <ul className="space-y-4">
          {path.cards.map((c) => (
            <InlineCard key={c.slug} card={c} step={c.step} total={path.total} next={nextOf(c.step)} />
          ))}
        </ul>
        {path.optional.length ? (
          <Fold foldKey={`route-${route.no}:optional`} anchor={`optional-${route.no}`} label={`Optional card${path.optional.length > 1 ? 's' : ''} (${path.optional.length}): not needed for any task`}>
            <ul className="space-y-4">
              {path.optional.map((c) => (
                <InlineCard key={c.slug} card={c} />
              ))}
            </ul>
          </Fold>
        ) : null}
      </section>

      <section id={`tasks-${route.no}`} aria-labelledby={`tasks-${route.no}-title`} className="scroll-mt-24 space-y-8">
        <div className="border-t-2 border-ink pt-4">
          <Eyebrow>
            Tasks · steps {path.tasks[0].step} to {path.tasks[path.tasks.length - 1].step} · about {fmtMin(path.taskMinutes)}
          </Eyebrow>
          <h2 id={`tasks-${route.no}-title`} className="mt-2 text-26">
            Now work the {path.tasks.length === 1 ? 'task' : 'tasks'}
          </h2>
        </div>
        {taskHydrated ? (
          path.tasks.map((tk) => (
            <TaskSection key={tk.taskId} task={TASK_BY_ID[tk.taskId]} answers={answers} setAnswer={setAnswer} stepLabel={`Step ${tk.step} of ${path.total} · about ${tk.minutes} min`} />
          ))
        ) : (
          <p className="text-16 text-ink-soft">Loading your saved answers…</p>
        )}
      </section>

      <section id={`export-${route.no}`} aria-labelledby={`export-${route.no}-title`} className="scroll-mt-24 no-print">
        <Card className="space-y-3">
          <Eyebrow>
            Step {path.exportStep} of {path.total}
          </Eyebrow>
          <h2 id={`export-${route.no}-title`} className="text-26">
            Your {route.deliverable.replace(/^the /, '')}
          </h2>
          <p className="text-16">
            <strong>
              {done} of {total}
            </strong>{' '}
            questions complete in this route.
          </p>
          {missing.length ? (
            <div role="group" aria-label="Still missing in this route" id={`export-missing-${route.no}`} className="rounded-lg border p-4 text-14" style={{ borderColor: 'var(--risk)' }}>
              <p className="font-medium" style={{ color: 'var(--risk-text)' }}>
                Still missing in this route ({missing.length})
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {missing.map((m) => (
                  <li key={`${m.task}-${m.item}`}>
                    <button type="button" className="text-left underline underline-offset-2" onClick={() => jumpTo(m.fieldKey)}>
                      {m.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-14">Nothing is missing.</p>
          )}
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => downloadAnswers(name, answers, route)}>
              Download my answers
            </Button>
            <Button onClick={() => printAnswers(name, answers, route)}>Print or save as PDF</Button>
            <Button
              onClick={() => {
                if (window.confirm(`Clear your answers in Route ${route.no} on this device? This cannot be undone.`)) clearTasks(route.taskIds);
              }}
            >
              Clear this route
            </Button>
          </div>
          <p className="text-14 text-ink-soft">
            You can download or print at any time; unanswered questions are marked as such in the document. The file name starts with {route.no}- and uses the name from the day&rsquo;s home page.
          </p>
        </Card>
      </section>

      <PageMap entries={entries} stepTotal={path.total} />
    </div>
  );
}

/** One numbered step of the path, as a button that jumps to it. A done mark is text, never colour alone. */
function PathPill({ f }: { f: { id: string; kind: 'card' | 'task' | 'export'; step: number; code: string; label: string; done: boolean } }) {
  const short = f.kind === 'task' ? `Task ${f.id.slice(1)}` : f.code;
  return (
    <button
      type="button"
      onClick={() => jumpTo(f.id, { block: 'start', focus: false })}
      aria-label={`${f.step} · ${short}${f.done ? ' ✓' : ''}, ${f.label}${f.done ? ' (done)' : ''}`}
      className={`min-h-[40px] rounded border px-3 font-mono text-12 hover:bg-black/[0.05] ${f.kind === 'task' ? 'border-ink bg-ink text-white hover:bg-ink' : 'border-hairline bg-paper'}`}
    >
      {f.step} · {short}
      {f.done ? ' ✓' : ''}
    </button>
  );
}
