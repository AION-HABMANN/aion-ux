'use client';

import { useState } from 'react';
import { Widget } from '@/components/ui/Widget';
import { FASCINATION_CARDS, FASCINATION_NOTE } from '@/content/learn';

export function W8FascinationVsImpact() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Widget index={8} title="Fascination vs Impact Orientation" tool="2D card pair">
      <div className="grid gap-3 sm:grid-cols-2">
        {FASCINATION_CARDS.map((card) => {
          const isOpen = card.id === openId;
          return (
            <div key={card.id} className="rounded-card border border-lilac bg-white p-3">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : card.id)}
                className={[
                  'w-full rounded-lg px-3 py-2 text-left text-sm font-bold transition-colors',
                  isOpen ? 'bg-purple text-white' : 'bg-lilac text-navy hover:bg-lilac',
                ].join(' ')}
              >
                {card.title}
              </button>
              {isOpen && (
                <div className="space-y-2 px-1 pt-3 text-sm text-navy/80">
                  <p>{card.optimisedFor}</p>
                  <p>{card.measured}</p>
                  <p className="text-purple">{card.goesWrong}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-3 rounded-xl bg-lilac px-3 py-2 text-sm text-navy/80">{FASCINATION_NOTE}</p>
    </Widget>
  );
}
