'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import type { TaskDef, TaskField, TaskItem } from '@/data/day9/tasks';
import { conceptBySlug } from '@/data/day9/concepts';
import { cardsFor } from '@/data/day9/materi';
import { openCard } from '@/components/day9/learn/InlineCard';
import { allMissing, lineCount, itemMissing, type Answers } from '@/lib/day9/tasks-logic';
import { jumpTo } from '@/components/day9/day/jump';
import { Eyebrow, Mono } from '@/components/day9/ui';
import { GlossText, ModelAnswer, WritingHelp } from '@/components/day9/tasks/TaskSupport';

/** A text box that grows with what is typed (no inner scrollbar, no clipped answer). */
function AutoTextarea({
  id,
  value,
  onChange,
  rows = 3,
  describedBy,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  describedBy?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight + 2}px`;
  }, [value]);
  return (
    <textarea
      ref={ref}
      id={id}
      value={value}
      rows={rows}
      aria-describedby={describedBy}
      onChange={(e) => onChange(e.target.value)}
      className="w-full resize-none overflow-hidden rounded border border-hairline bg-raised px-3 py-2 text-16 text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none"
    />
  );
}

function FieldInput({ field, answers, setAnswer }: { field: TaskField; answers: Answers; setAnswer: (k: string, v: string) => void }) {
  const value = answers[field.key] ?? '';
  const countId = `${field.key}-count`;

  if (field.kind === 'pick') {
    return (
      <fieldset className="space-y-1.5">
        <legend className="mono-label">{field.label}</legend>
        <div className="flex flex-wrap gap-3">
          {field.options?.map((o) => (
            <label key={o} className="flex cursor-pointer items-center gap-2 rounded border border-hairline bg-raised px-3 py-2 text-16">
              <input
                id={o === field.options?.[0] ? field.key : undefined}
                type="radio"
                name={field.key}
                value={o}
                checked={value === o}
                onChange={() => setAnswer(field.key, o)}
              />
              {o}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  return (
    <div className="space-y-1.5">
      <label htmlFor={field.key} className="mono-label block">
        {field.label}
      </label>
      {field.prefix ? <p className="text-14 text-ink-soft">{field.prefix}</p> : null}
      <AutoTextarea id={field.key} value={value} onChange={(v) => setAnswer(field.key, v)} rows={field.kind === 'lines' ? 4 : 3} describedBy={field.kind === 'lines' ? countId : undefined} />
      {field.kind === 'lines' ? (
        <p id={countId} className="text-12 text-ink-soft">
          <Mono>
            {lineCount(value)} of {field.min ?? 1}
          </Mono>{' '}
          points (one per line)
        </p>
      ) : null}
    </div>
  );
}

function ItemBlock({ task, item, answers, setAnswer }: { task: TaskDef; item: TaskItem; answers: Answers; setAnswer: (k: string, v: string) => void }) {
  const missing = itemMissing(task, item, answers);
  const grid = item.anyOf ? 'grid gap-4 sm:grid-cols-2' : 'space-y-4';
  return (
    <section id={`${task.id}-item-${item.n}`} className="rounded border border-hairline bg-paper p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="max-w-2xl text-16 font-medium">
          <span className="mr-2 font-mono text-14 text-ink-soft">{item.n}.</span>
          <GlossText text={item.prompt} />
        </h3>
        <span
          className="shrink-0 rounded border px-2 py-0.5 font-mono text-12"
          style={{ borderColor: missing ? 'var(--risk)' : 'var(--integrity)', color: missing ? 'var(--risk-text)' : 'var(--integrity-text)' }}
        >
          {missing ? 'Not complete' : 'Complete'}
        </span>
      </div>
      {item.hint ? <p className="mt-1 text-14 text-ink-soft">{item.hint}</p> : null}
      <div className={`mt-3 ${grid}`}>
        {item.fields.map((f) => (
          <FieldInput key={f.key} field={f} answers={answers} setAnswer={setAnswer} />
        ))}
      </div>
      <WritingHelp task={task} item={item} />
      <ModelAnswer task={task} item={item} />
    </section>
  );
}

/**
 * DL #34: an always-live notice under the block. It names what is still empty or too short, each entry
 * jumps to its field, and it takes no space once the block is complete. Completeness only, never correctness.
 */
function TaskMissing({ task, answers }: { task: TaskDef; answers: Answers }) {
  const missing = allMissing(answers, [task.id]);
  if (!missing.length) return null;
  return (
    <div role="group" aria-label={`Still missing in Task ${task.id.slice(1)}`} className="no-print rounded-lg border p-4 text-14" style={{ borderColor: 'var(--risk)' }}>
      <p className="font-medium" style={{ color: 'var(--risk-text)' }}>
        Still missing in Task {task.id.slice(1)} ({missing.length})
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
  );
}

export function TaskSection({ task, answers, setAnswer, stepLabel }: { task: TaskDef; answers: Answers; setAnswer: (k: string, v: string) => void; stepLabel?: string }) {
  return (
    <section id={task.id} aria-labelledby={`${task.id}-title`} className="scroll-mt-24 space-y-5">
      <header>
        <Eyebrow>
          {stepLabel ? `${stepLabel} · ` : ''}Task {task.id.slice(1)} · Level {task.level} · {task.planRow}
        </Eyebrow>
        <h2 id={`${task.id}-title`} className="mt-2 text-26">
          {task.title}
        </h2>
        <p className="mt-1 text-14 text-ink-soft">
          {task.caseHref ? 'Work surface' : 'Case'}: <strong>{task.caseName}</strong>
          {task.caseHref ? (
            <>
              {' · '}
              <Link href={task.caseHref} className="underline underline-offset-2">
                {task.caseLinkLabel ?? 'open the interactive case'}
              </Link>
            </>
          ) : null}
        </p>
        {cardsFor(task.id).length ? (
          <p className="mt-1 text-14 text-ink-soft">
            Draws on:{' '}
            {cardsFor(task.id).map((c, i) => (
              <span key={c.slug}>
                {i ? ' · ' : ''}
                <a href={`#mat-${c.code}`} onClick={() => openCard(c.slug)} className="underline underline-offset-2">
                  {c.code} {conceptBySlug[c.slug].title}
                </a>
              </span>
            ))}
          </p>
        ) : null}
      </header>

      <div className="card space-y-4 p-5">
        <p className="text-16">
          <GlossText text={task.intro} />
        </p>
        {task.brief.map((b) => (
          <div key={b.heading}>
            <p className="mono-label">{b.heading}</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-14">
              {b.points.map((p) => (
                <li key={p}>
                  <GlossText text={p} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {task.items.map((item) => (
          <ItemBlock key={item.n} task={task} item={item} answers={answers} setAnswer={setAnswer} />
        ))}
      </div>

      <p className="text-14 text-ink-soft">
        <strong>Aim of the task:</strong> {task.goal}
      </p>

      <TaskMissing task={task} answers={answers} />
    </section>
  );
}
