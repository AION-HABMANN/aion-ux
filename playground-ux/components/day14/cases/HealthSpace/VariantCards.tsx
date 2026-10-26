'use client';

import { useState } from 'react';
import { HEALTHSPACE_VARIANTS } from '@/data/day14/healthspace';

/** No variant is highlighted, ordered by preference, or recommended. */
export function VariantCards() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {HEALTHSPACE_VARIANTS.map((variant) => {
        const isOpen = variant.id === openId;
        return (
          <div key={variant.id} className="aion-card flex flex-col p-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-lilac text-sm font-bold text-purple">
              {variant.id}
            </span>
            <p className="mt-2 text-base font-bold text-navy">{variant.title}</p>
            <p className="mt-1 text-sm text-navy/70">{variant.summary}</p>

            {isOpen && <p className="mt-3 border-t border-lilac pt-3 text-sm text-navy/85">{variant.description}</p>}

            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : variant.id)}
              className="mt-auto pt-3 text-left text-xs font-semibold text-purple underline underline-offset-4"
            >
              {isOpen ? 'Collapse' : 'Read the full description'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
