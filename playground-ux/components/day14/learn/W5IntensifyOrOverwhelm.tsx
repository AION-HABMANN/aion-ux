'use client';

import { useState } from 'react';
import { Widget } from '@/components/day14/ui/Widget';
import { OPPORTUNITIES, RISKS } from '@/data/day14/learn';

type Item = { id: string; label: string; example: string };

function Column({
  title,
  items,
  openId,
  onToggle,
  accent,
}: {
  title: string;
  items: readonly Item[];
  openId: string | null;
  onToggle: (id: string) => void;
  accent: 'purple' | 'navy';
}) {
  return (
    <div className="rounded-card border border-lilac bg-white p-3">
      <p
        className={[
          'mb-3 rounded-lg px-3 py-1.5 text-sm font-bold',
          accent === 'purple' ? 'bg-purple text-white' : 'bg-navy text-white',
        ].join(' ')}
      >
        {title}
      </p>
      <ul className="space-y-2">
        {items.map((item) => {
          const isOpen = item.id === openId;
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => onToggle(item.id)}
                className={[
                  'w-full rounded-lg border px-3 py-2 text-left text-sm font-semibold transition-colors',
                  isOpen ? 'border-purple bg-lilac text-navy' : 'border-lilac bg-white text-navy/80 hover:bg-lilac/60',
                ].join(' ')}
              >
                {item.label}
              </button>
              {isOpen && <p className="px-3 py-2 text-sm text-navy/75">{item.example}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function W5IntensifyOrOverwhelm() {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((current) => (current === id ? null : id));

  return (
    <Widget index={5} title="Intensify or Overwhelm" tool="2D toggle pair">
      <div className="grid gap-3 sm:grid-cols-2">
        <Column
          title="Opportunities"
          items={OPPORTUNITIES}
          openId={openId}
          onToggle={toggle}
          accent="purple"
        />
        <Column title="Risks" items={RISKS} openId={openId} onToggle={toggle} accent="navy" />
      </div>
      <p className="mt-3 text-sm text-navy/70">
        The same design decision usually appears on both sides — what separates them is the amount,
        the timing, and who carries the cost.
      </p>
    </Widget>
  );
}
