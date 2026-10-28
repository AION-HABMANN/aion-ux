'use client';

import { INDUSTRYXR_HOTSPOTS } from '@/original/data/day14/industryxr';

/**
 * The four stations as named buttons. The markers in the scene stay compact so
 * they never collide or shrink below legibility on a narrow screen; this legend
 * carries the full names, identically for the 3D scene and the static fallback.
 */
export function HotspotLegend({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
      {INDUSTRYXR_HOTSPOTS.map((hotspot, index) => {
        const isActive = hotspot.id === activeId;
        return (
          <li key={hotspot.id}>
            <button
              type="button"
              onClick={() => onSelect(hotspot.id)}
              aria-pressed={isActive}
              className={[
                'flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-semibold transition-colors',
                isActive
                  ? 'border-purple bg-lilac text-navy'
                  : 'border-lilac bg-white text-navy/80 hover:bg-lilac/50',
              ].join(' ')}
            >
              <span
                aria-hidden
                className={[
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                  isActive ? 'bg-purple text-white' : 'bg-lilac text-purple',
                ].join(' ')}
              >
                {index + 1}
              </span>
              {hotspot.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
