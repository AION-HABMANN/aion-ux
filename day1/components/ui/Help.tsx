'use client';

import { jumpTo } from '@/lib/flash';
import type { Missing } from '@/lib/logic';
import { ShowMore } from './kit';
import { Gloss } from '@/lib/Gloss';

/** "How to build the answer": two or three steps, closed by default (CLAUDE.md #55). Wording differs per question. */
export function WritingHelp({ id, steps }: { id: string; steps: string[] }) {
  return (
    <ShowMore id={`help-${id}`} label="how to build the answer">
      <ol className="list-decimal space-y-1 pl-5 text-caption text-ink">
        {steps.map((s) => (
          <li key={s}>
            <Gloss>{s}</Gloss>
          </li>
        ))}
      </ol>
    </ShowMore>
  );
}

/** An example answer on ANOTHER company: it shows the shape, never the answer to this case (CLAUDE.md #23). */
export function ExampleAnswer({ id, text }: { id: string; text: string }) {
  return (
    <ShowMore id={`ex-${id}`} label="an example answer on another company">
      <p className="insight rounded bg-canvas px-3 py-2 text-caption text-ink">
        <span className="smallcaps block">Example (another company)</span>
        {text}
      </p>
    </ShowMore>
  );
}

/**
 * The always-live "still missing" notice (CLAUDE.md #34): it names what is empty or too short, each entry a button that jumps to
 * its field, and it takes no space once nothing is missing. Completeness only; it never says what is right.
 */
export function MissingNotice({ title, items, id }: { title: string; items: Missing[]; id?: string }) {
  if (!items.length) return null;
  return (
    <div id={id} role="group" aria-label={title} className="no-print rounded-lg border border-rust bg-rustSoft p-4 text-caption">
      <p className="font-semibold text-rust">
        {title} ({items.length})
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-ink">
        {items.map((m) => (
          <li key={`${m.block}-${m.n}`}>
            <button type="button" className="text-left underline underline-offset-2" onClick={() => jumpTo(m.target)}>
              {m.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
