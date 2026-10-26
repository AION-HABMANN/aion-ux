'use client';

import type { FacilitatorCard as Card } from '@/data/day1';
import { useSession } from '@/store/useStore';

/**
 * The plan's rows with no deliverable (Coaching, Feedbackrunde) are not tasks (DL-STANDARD 3). They are a card for the facilitator:
 * hidden until the mentor passcode is entered, then one quiet button opens it. It has no fields and is not in the missing list,
 * the page map or the export.
 */
export function FacilitatorCard({ card }: { card: Card }) {
  const unlocked = useSession((s) => s.unlocked);
  const open = useSession((s) => Boolean(s.open[card.id]));
  const toggle = useSession((s) => s.toggle);
  if (!unlocked) return null;
  return (
    <section aria-label={card.openLabel} className="no-print">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${card.id}-body`}
        onClick={() => toggle(card.id)}
        className="flex min-h-[40px] w-full items-center gap-2 rounded-lg border border-dashed border-signal/60 bg-signalSoft px-3 text-left text-caption text-signal"
      >
        <span aria-hidden>{open ? '－' : '＋'}</span>
        {open ? 'Hide' : 'Show'} · {card.openLabel}
      </button>
      <div id={`${card.id}-body`} hidden={!open} className="card mt-3 space-y-4 p-5">
        {card.sections.map((s) => (
          <div key={s.kicker} className="space-y-1">
            <p className="smallcaps">{s.kicker}</p>
            <ul className="list-disc space-y-1 pl-5 text-body">
              {s.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
