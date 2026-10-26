'use client';

import { anchors, BLOCKS, type Card } from '@/data/day1';
import { Gloss } from '@/lib/Gloss';
import { jumpTo } from '@/lib/flash';
import { useHydrated, useStore } from '@/store/useStore';
import { Pill, ShowMore } from '@/components/ui/kit';

/** Which blocks draw on a card: a card is Core when any block cites it (CLAUDE.md #35). */
export const usedIn = (id: string) => BLOCKS.filter((b) => b.items.some((i) => i.refs.includes(id)));

/**
 * One Materi card (CLAUDE.md #22 and #37). Always visible: title, Core pill and minutes, the scan line, "In plain words" with
 * "Why it matters", and what the tasks read. One quiet row away: the rules the card gives the tasks, and the sources.
 */
export function MaterialCard({ card }: { card: Card }) {
  const hydrated = useHydrated();
  const read = useStore((s) => Boolean(s.read[card.id]));
  const markRead = useStore((s) => s.markRead);
  const blocks = usedIn(card.id);
  return (
    <article id={anchors.card(card.id)} aria-labelledby={`${card.id}-t`} className="card space-y-4 p-5">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="smallcaps text-accent">Card {card.id}</span>
          <Pill tone="core">Core</Pill>
          <Pill>{card.minutes} min</Pill>
          {hydrated && read ? <Pill>Read</Pill> : null}
        </div>
        <h3 id={`${card.id}-t`} className="text-h2">
          {card.title}
        </h3>
        <p className="text-body text-ash">{card.scan}</p>
        <p className="text-caption text-ash">
          Used in{' '}
          {blocks.map((b, i) => (
            <span key={b.id}>
              {i ? ', ' : ''}
              <button type="button" className="underline underline-offset-2" onClick={() => jumpTo(anchors.block(b.id), { focus: false, block: 'start' })}>
                Block {b.id}
              </button>
            </span>
          ))}
        </p>
      </header>

      <section aria-label="In plain words" className="insight space-y-2 rounded-lg bg-canvas p-4">
        <p className="smallcaps">In plain words</p>
        {card.plain.words.map((w) => (
          <p key={w.slice(0, 30)} className="text-body">
            <Gloss>{w}</Gloss>
          </p>
        ))}
        <p className="smallcaps pt-1">Why it matters</p>
        <p className="text-body">
          <Gloss>{card.plain.why}</Gloss>
        </p>
      </section>

      {card.body.map((g) => (
        <div key={g.heading} className="space-y-1">
          <h4 className="text-h3">{g.heading}</h4>
          <ul className="list-disc space-y-1 pl-5 text-body">
            {g.points.map((p) => (
              <li key={p.slice(0, 40)}>
                <Gloss>{p}</Gloss>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <ShowMore id={`rules-${card.id}`} label={`the rules this card gives the tasks (${card.rules.length})`}>
        <div className="space-y-1">
          <p className="smallcaps">How to decide when this comes up in a task</p>
          <ul className="list-disc space-y-1 pl-5 text-body">
            {card.rules.map((r) => (
              <li key={r.slice(0, 40)}>
                <Gloss>{r}</Gloss>
              </li>
            ))}
          </ul>
        </div>
      </ShowMore>

      <ShowMore id={`src-${card.id}`} label={`the sources (${card.sources.length})`}>
        <div className="space-y-1">
          <p className="smallcaps">Sources · to be checked before a course run</p>
          <ul className="list-disc space-y-1 pl-5 text-caption text-ink">
            {card.sources.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="text-caption text-ash">Plan reference: {card.planRef}</p>
        </div>
      </ShowMore>

      <div className="no-print flex flex-wrap items-center gap-3 border-t border-line pt-3">
        <button type="button" className={hydrated && read ? 'btn-ghost btn-sm btn' : 'btn-primary btn-sm btn'} aria-pressed={hydrated && read} onClick={() => markRead(card.id, !read)}>
          {hydrated && read ? 'Marked as read · undo' : 'Mark as read'}
        </button>
        <span className="text-caption text-ash">Nothing is locked: tasks stay open whether or not you mark a card.</span>
      </div>
    </article>
  );
}
