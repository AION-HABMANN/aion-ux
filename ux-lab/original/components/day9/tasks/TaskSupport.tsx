'use client';

import { useState } from 'react';
import type { TaskDef, TaskItem } from '@/original/data/day9/tasks';
import { HELP, KEY, KEY_SOURCE } from '@/original/data/day9/support';
import { splitGloss } from '@/original/lib/day9/gloss';
import { useMentorStore } from '@/original/lib/day9/mentor-store';

/**
 * Text in which each technical term is one click from a plain explanation (CLAUDE.md #19).
 * The first occurrence of a term in a text is a button; the explanation opens under the text.
 */
export function GlossText({ text }: { text: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const parts = splitGloss(text);
  const shown = parts.find((p) => p.entry?.term === open)?.entry;
  return (
    <>
      {parts.map((p, i) =>
        p.entry ? (
          <button
            key={i}
            type="button"
            aria-expanded={open === p.entry.term}
            onClick={() => setOpen(open === p.entry!.term ? null : p.entry!.term)}
            className="cursor-help underline decoration-dotted underline-offset-2"
          >
            {p.text}
          </button>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
      {shown ? (
        <span role="note" className="mt-1 block rounded border border-hairline bg-raised px-3 py-2 text-14 font-normal text-ink">
          <strong>{shown.term}</strong>: {shown.plain}
        </span>
      ) : null}
    </>
  );
}

/** "How to build the answer": how to go about it, never the answer. Collapsed by default. */
export function WritingHelp({ task, item }: { task: TaskDef; item: TaskItem }) {
  const lines = HELP[`${task.id}-${item.n}`];
  if (!lines?.length) return null;
  return (
    <details className="mt-3 rounded border border-hairline bg-raised px-3 py-2">
      <summary className="cursor-pointer text-14 font-medium">How to build the answer</summary>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-14">
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </details>
  );
}

/** The mentor's model answer for one item. Only shown after the mentor passcode; never exported. */
export function ModelAnswer({ task, item }: { task: TaskDef; item: TaskItem }) {
  const unlocked = useMentorStore((s) => s.unlocked);
  if (!unlocked) return null;
  const src = KEY_SOURCE[task.id];
  return (
    <details className="mt-3 rounded border border-inspect bg-raised px-3 py-2">
      <summary className="cursor-pointer text-14 font-medium">Mentor · model answer</summary>
      <p className="mt-2 text-12 text-ink-soft">
        {src.from === 'plan' ? 'From the plan’s model solution. ' : 'Draft, not from the plan: review before use. '}
        {src.note}
      </p>
      <div className="mt-2 space-y-2 text-14">
        {item.fields.map((f) => (
          <p key={f.key}>
            {item.fields.length > 1 ? <strong>{f.label}: </strong> : null}
            {f.prefix && f.kind !== 'pick' ? <span className="text-ink-soft">{f.prefix} </span> : null}
            <span className="whitespace-pre-line">{KEY[f.key]}</span>
          </p>
        ))}
      </div>
    </details>
  );
}
