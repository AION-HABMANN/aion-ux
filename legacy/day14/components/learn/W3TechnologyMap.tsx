'use client';

import { useState } from 'react';
import { Widget } from '@/components/ui/Widget';
import { TECHNOLOGY_MAP } from '@/content/learn';

export function W3TechnologyMap() {
  const [open, setOpen] = useState<string | null>(null);
  const active = TECHNOLOGY_MAP.find((entry) => entry.id === open) ?? null;

  return (
    <Widget index={3} title="Technology Map" tool="2D cards">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {TECHNOLOGY_MAP.map((entry) => {
            const isOpen = entry.id === open;
            return (
              <button
                key={entry.id}
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : entry.id)}
                className={['aion-chip', isOpen ? 'aion-chip-active' : 'hover:border-purple/40'].join(' ')}
              >
                {entry.name}
              </button>
            );
          })}
        </div>

        {active ? (
          <div className="rounded-card border border-purple/25 bg-lilac/50 p-4">
            <p className="text-sm font-bold text-navy">{active.name}</p>
            <p className="mt-1 text-sm text-navy/80">{active.definition}</p>
            <p className="mt-2 text-sm text-purple">{active.useCase}</p>
          </div>
        ) : (
          <p className="rounded-card bg-lilac/50 p-4 text-sm text-navy/60">
            Pick a term to see one definition and one typical use case.
          </p>
        )}
      </div>
    </Widget>
  );
}
