'use client';

import { INDUSTRYXR_HOTSPOTS } from '@/data/day14/industryxr';

/**
 * Rendered when WebGL is unavailable. Content parity with the Three.js scene is
 * required: the same four stations, the same panels, the same descriptions.
 */
export function StaticFallback({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-card border border-lilac" style={{ aspectRatio: '16 / 9' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/day14/fallback/industryxr-scene.svg"
        alt="Static view of the industrial training space with four stations"
        className="h-full w-full object-cover"
      />
      {INDUSTRYXR_HOTSPOTS.map((hotspot, index) => {
        const isActive = hotspot.id === activeId;
        return (
          <button
            key={hotspot.id}
            type="button"
            onClick={() => onSelect(hotspot.id)}
            aria-pressed={isActive}
            aria-label={hotspot.name}
            title={hotspot.name}
            className={[
              'absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-xs font-bold shadow-card transition-colors',
              isActive
                ? 'border-white bg-purple text-white'
                : 'border-purple bg-white text-purple hover:bg-lilac',
            ].join(' ')}
            style={{ left: `${hotspot.fallback.left}%`, top: `${hotspot.fallback.top}%` }}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}
