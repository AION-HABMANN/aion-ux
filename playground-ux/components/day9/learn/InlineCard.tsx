'use client';

import { useEffect } from 'react';
import { conceptBySlug } from '@/data/day9/concepts';
import { CARD_MINUTES, extraMinutes, OPTIONAL_REASON, PLAIN, WHY, type CardInfo } from '@/data/day9/materi';
import { CardBody } from '@/components/day9/learn/CardBody';
import { ShowEverything, useFoldStore } from '@/components/day9/learn/Fold';
import { jumpTo } from '@/components/day9/day/jump';
import { useStore } from '@/lib/day9/store';
import { Mono } from '@/components/day9/ui';

const cardKey = (slug: string) => `card:${slug}`;

/** Open a card on the route page (a link, the old address, the "next" button). */
export const openCard = (slug: string) => useFoldStore.getState().openKey(cardKey(slug));

export interface NextStep {
  /** Anchor id on the page: mat-A3 or t1. */
  id: string;
  /** Short words for the button: "A3 Motivation mechanisms" or "Task 1". */
  label: string;
  /** If the next step is a card, it opens when you arrive. */
  cardSlug?: string;
}

/**
 * One Materi card on the route page. Closed, it shows its place on the path, its title and its
 * plain words (what most people need to decide whether to read on). Open, it holds the demo, the
 * check and "you can now", with the rest one "＋ Show" away. It opens in place: no page change.
 */
export function InlineCard({ card, step, total, next }: { card: CardInfo; step?: number; total?: number; next?: NextStep }) {
  const c = conceptBySlug[card.slug];
  const key = cardKey(card.slug);
  const open = useFoldStore((s) => Boolean(s.open[key]));
  const toggle = useFoldStore((s) => s.toggle);
  const read = useStore((s) => Boolean(s.learn[card.slug]?.completed));
  const completeConcept = useStore((s) => s.completeConcept);

  // an address that names this card (…#mat-A4) opens it
  useEffect(() => {
    const check = () => {
      if (window.location.hash === `#mat-${card.code}`) useFoldStore.getState().openKey(key);
    };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, [card.code, key]);

  const bodyId = `${card.slug}-body`;
  return (
    <li id={`mat-${card.code}`} className={`scroll-mt-24 rounded-lg border bg-raised ${card.core ? 'border-hairline' : 'border-dashed border-hairline'}`}>
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <Mono className="text-ink-soft">
            {step && total ? `Step ${step} of ${total} · ` : ''}Card {card.code} · {CARD_MINUTES} min
          </Mono>
          <span className="flex gap-2">
            <span className={`rounded border px-2 py-0.5 font-mono text-12 ${card.core ? 'border-ink' : 'border-dashed border-hairline text-ink-soft'}`}>{card.core ? 'Core' : 'Optional'}</span>
            {read ? <span className="rounded border border-hairline px-2 py-0.5 font-mono text-12">read</span> : null}
          </span>
        </div>
        <h3 className="mt-2 text-20">{c.title}</h3>
        <div className="mt-2 max-w-2xl space-y-1 text-14">
          <p className="mono-label">In plain words</p>
          {(PLAIN[card.slug] ?? []).map((s) => (
            <p key={s.slice(0, 30)}>{s}</p>
          ))}
          {WHY[card.slug] ? (
            <>
              <p className="mono-label pt-2">Why it matters</p>
              <p>{WHY[card.slug]}</p>
            </>
          ) : null}
        </div>
        <p className="mt-3 text-14 text-ink-soft">
          {card.core ? (
            <>
              Used in{' '}
              {card.tasks.map((t, i) => (
                <span key={t}>
                  {i ? ', ' : ''}
                  <a href={`#${t}`} className="underline underline-offset-2">
                    Task {t.slice(1)}
                  </a>
                </span>
              ))}
            </>
          ) : (
            OPTIONAL_REASON[card.slug] ?? 'No task needs this card.'
          )}
        </p>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => toggle(key)}
          className="no-print mt-3 inline-flex min-h-[40px] items-center gap-2 rounded border border-ink px-3 text-14 hover:bg-black/[0.05]"
        >
          <span aria-hidden>{open ? '－' : '＋'}</span>
          {open ? `Close card ${card.code}` : `Open card ${card.code}: demo`}
        </button>
        <p className="mt-2 text-12 text-ink-soft">About {CARD_MINUTES} min for the plain words and the demo, plus about {extraMinutes(card.slug)} min if you also open the extra explanations and the optional self-check.</p>
      </div>

      {open ? (
        <div id={bodyId} className="space-y-8 border-t border-hairline p-4 sm:p-5">
          <ShowEverything />
          <CardBody slug={card.slug} />
          <div className="no-print flex flex-wrap items-center gap-3 border-t border-hairline pt-4">
            <button
              type="button"
              className="min-h-[40px] rounded border border-ink bg-ink px-4 text-14 text-white"
              onClick={() => {
                completeConcept(card.slug);
                toggle(key);
                if (next) {
                  if (next.cardSlug) openCard(next.cardSlug);
                  window.setTimeout(() => jumpTo(next.id, { block: 'start', focus: false }), 120);
                }
              }}
            >
              {next ? `Mark as read and go to ${next.label}` : 'Mark as read'}
            </button>
            <button type="button" className="min-h-[40px] rounded border border-hairline px-4 text-14" onClick={() => toggle(key)}>
              Close card
            </button>
            <p className="text-12 text-ink-soft">{c.curriculumRef}</p>
          </div>
        </div>
      ) : null}
    </li>
  );
}
