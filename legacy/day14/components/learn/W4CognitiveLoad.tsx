'use client';

import { useState } from 'react';
import { Widget } from '@/components/ui/Widget';
import { COGNITIVE_LOAD_CAPTIONS, LOAD_ZONES } from '@/content/learn';

/**
 * Widget 4 — one-dimensional data, so it is rendered in 2D on purpose.
 * The curve is a fixed lookup: identical for every learner on every load.
 */
const COMPREHENSION = [22, 46, 68, 86, 94, 87, 71, 53, 36, 23];

function zoneFor(value: number) {
  if (value <= 3) return LOAD_ZONES[0];
  if (value <= 6) return LOAD_ZONES[1];
  return LOAD_ZONES[2];
}

/** Calm -> strained, staying inside the brand palette. */
function barColour(value: number) {
  const stops: Array<[number, [number, number, number]]> = [
    [1, [155, 128, 226]],
    [5, [86, 36, 208]],
    [10, [35, 26, 69]],
  ];
  let lower = stops[0];
  let upper = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i += 1) {
    if (value >= stops[i][0] && value <= stops[i + 1][0]) {
      lower = stops[i];
      upper = stops[i + 1];
      break;
    }
  }
  const span = upper[0] - lower[0] || 1;
  const t = (value - lower[0]) / span;
  const channel = (a: number, b: number) => Math.round(a + (b - a) * t);
  return `rgb(${channel(lower[1][0], upper[1][0])}, ${channel(lower[1][1], upper[1][1])}, ${channel(
    lower[1][2],
    upper[1][2],
  )})`;
}

export function W4CognitiveLoad() {
  const [value, setValue] = useState(5);
  const comprehension = COMPREHENSION[value - 1];
  const zone = zoneFor(value);

  return (
    <Widget
      index={4}
      title="Attention &amp; Cognitive Load"
      tool="2D slider"
      captions={COGNITIVE_LOAD_CAPTIONS}
    >
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="load-slider" className="text-sm font-semibold text-navy">
            Amount of simultaneous stimuli
          </label>
          <div className="mt-3 flex items-center gap-3">
            <input
              id="load-slider"
              type="range"
              min={1}
              max={10}
              step={1}
              value={value}
              onChange={(event) => setValue(Number(event.target.value))}
              aria-valuetext={`${value} of 10 — ${zone.label}`}
            />
            <span className="w-8 shrink-0 text-right text-lg font-bold tabular-nums text-purple">
              {value}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1 text-[11px] font-semibold uppercase tracking-wide">
            {LOAD_ZONES.map((z) => (
              <span
                key={z.id}
                className={[
                  'rounded-md px-2 py-1 text-center transition-colors',
                  z.id === zone.id ? 'bg-purple text-white' : 'bg-lilac text-navy/50',
                ].join(' ')}
              >
                {z.label}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-card bg-lilac/50 p-4">
          <div className="flex items-baseline justify-between">
            <span className="aion-label">Attention / comprehension</span>
            <span className="text-sm font-bold tabular-nums text-navy">{comprehension}%</span>
          </div>
          <div className="mt-2 h-4 w-full overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full transition-[width,background-color] duration-300"
              style={{ width: `${comprehension}%`, backgroundColor: barColour(value) }}
            />
          </div>

          {/* Fixed curve, drawn from the same lookup table. */}
          <div className="mt-4 flex h-20 items-end gap-1" aria-hidden>
            {COMPREHENSION.map((point, index) => (
              <div
                key={point}
                className="flex-1 rounded-t-sm transition-opacity"
                style={{
                  height: `${point}%`,
                  backgroundColor: barColour(index + 1),
                  opacity: index + 1 === value ? 1 : 0.28,
                }}
              />
            ))}
          </div>

          <p className="mt-3 text-sm text-navy/80">
            <span className="font-semibold text-navy">
              {zone.label} ({zone.range}):{' '}
            </span>
            {zone.readout}
          </p>
        </div>
      </div>
    </Widget>
  );
}
