'use client';

import { useState } from 'react';
import { Widget } from '@/original/components/day14/ui/Widget';
import { EXTERNAL_FRAMEWORK_NOTE } from '@/original/data/day14/categories';
import { ETHICS_CARDS } from '@/original/data/day14/learn';

export function W9Ethics() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Widget index={9} title="Ethics &amp; Responsibility in Immersive UX" tool="2D cards">
      <div className="grid gap-3 sm:grid-cols-2">
        {ETHICS_CARDS.map((card) => {
          const isOpen = card.id === openId;
          return (
            <button
              key={card.id}
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : card.id)}
              className={[
                'rounded-card border p-3 text-left transition-colors',
                isOpen ? 'border-purple bg-lilac/70' : 'border-lilac bg-white hover:border-purple/40',
              ].join(' ')}
            >
              <p className="text-sm font-bold text-navy">{card.title}</p>
              {isOpen && <p className="mt-2 text-sm text-purple">{card.question}</p>}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-navy/70">
        Each card opens a question, not an answer. Working out the answer for a specific context is
        the responsibility itself.
      </p>
      <p className="mt-3 rounded-xl bg-lilac px-3 py-2 text-xs text-navy/60">
        {EXTERNAL_FRAMEWORK_NOTE}
      </p>
    </Widget>
  );
}
