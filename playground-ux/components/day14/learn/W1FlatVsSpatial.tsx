'use client';

import { useState } from 'react';
import { Widget } from '@/components/day14/ui/Widget';
import { FLAT_VS_SPATIAL_CAPTIONS } from '@/data/day14/learn';

/**
 * Widget 1 — CSS 3D transforms only. No library, no drag, fixed perspective.
 */
export function W1FlatVsSpatial() {
  const [immersive, setImmersive] = useState(false);

  return (
    <Widget index={1} title="Flat vs Spatial Interface" tool="CSS 3D" captions={FLAT_VS_SPATIAL_CAPTIONS}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={immersive}
            onClick={() => setImmersive((v) => !v)}
            className="relative h-7 w-14 shrink-0 rounded-full border border-lilac bg-lilac transition-colors"
            style={{ backgroundColor: immersive ? '#5624D0' : '#EEE9F9' }}
          >
            <span
              aria-hidden
              className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-[left] duration-300"
              style={{ left: immersive ? '2rem' : '0.25rem' }}
            />
            <span className="sr-only">Toggle immersive interface</span>
          </button>
          <span className="text-sm font-semibold text-navy">
            {immersive ? 'Immersive interface' : 'Classic interface'}
          </span>
        </div>

        <div
          className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-card bg-lilac/60 px-4 py-8"
          style={{ perspective: '900px', perspectiveOrigin: '50% 45%' }}
        >
          <div
            className="relative w-full max-w-[260px] transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: immersive
                ? 'rotateX(52deg) rotateZ(-28deg) scale(0.92)'
                : 'rotateX(0deg) rotateZ(0deg) scale(1)',
            }}
          >
            {/* Layer 3 — background context */}
            <div
              className="absolute inset-0 rounded-xl border border-purple/20 bg-white/80 transition-transform duration-500"
              style={{
                transform: immersive ? 'translateZ(-70px) translateY(18px)' : 'translateZ(0) translateY(0)',
                opacity: immersive ? 1 : 0,
              }}
            >
              <div className="p-3">
                <div className="h-2 w-16 rounded-full bg-lilac" />
                <div className="mt-2 h-2 w-24 rounded-full bg-lilac" />
                <div className="mt-2 h-2 w-20 rounded-full bg-lilac" />
              </div>
            </div>

            {/* Layer 2 — supporting panel */}
            <div
              className="absolute inset-0 rounded-xl border border-purple/25 bg-white/90 transition-transform duration-500"
              style={{
                transform: immersive ? 'translateZ(-35px) translateY(8px)' : 'translateZ(0) translateY(0)',
                opacity: immersive ? 1 : 0,
              }}
            >
              <div className="p-3">
                <div className="h-2 w-20 rounded-full bg-lilac" />
                <div className="mt-2 h-8 rounded-lg bg-lilac" />
              </div>
            </div>

            {/* Layer 1 — the card itself, always visible */}
            <div className="relative rounded-xl border border-purple/30 bg-white p-4 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple">Task panel</p>
              <p className="mt-1 text-sm font-bold text-navy">Step 2 of 4</p>
              <div className="mt-3 space-y-2">
                <div className="h-2 w-full rounded-full bg-lilac" />
                <div className="h-2 w-3/4 rounded-full bg-lilac" />
              </div>
              <div className="mt-4 inline-flex rounded-full bg-purple px-3 py-1 text-[11px] font-semibold text-white">
                Continue
              </div>
            </div>
          </div>

          <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-navy/55">
            {immersive
              ? 'One card became three layers you sit inside — depth now carries meaning.'
              : 'One card on one plane — you are looking at a surface.'}
          </p>
        </div>
      </div>
    </Widget>
  );
}
