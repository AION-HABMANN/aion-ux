'use client';

import { ALL_CATEGORIES } from '@/original/data/day14/categories';

/**
 * One badge per category practised. Muted amber and muted teal are permitted
 * here (Training Ground only) to keep the earned state readable at a glance.
 */
export function Badges({ earned }: { earned: string[] }) {
  return (
    <div className="aion-card p-4">
      <p className="aion-label">Category badges</p>
      <p className="mt-1 text-xs text-navy/60">
        Earned by practising an item in that category — the module vocabulary, nothing else.
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {ALL_CATEGORIES.map((category, index) => {
          const isEarned = earned.includes(category);
          const accent = index % 2 === 0 ? 'border-teal-muted text-teal-muted' : 'border-amber-muted text-amber-muted';
          return (
            <li key={category}>
              <span
                className={[
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
                  isEarned ? `bg-white ${accent}` : 'border-lilac bg-lilac text-navy/35',
                ].join(' ')}
              >
                <span aria-hidden>{isEarned ? '●' : '○'}</span>
                {category}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
