'use client';

import { useState } from 'react';
import { Widget } from '@/components/ui/Widget';
import { REPUTATION_READOUTS } from '@/content/learn';

export function W10Reputation() {
  const [value, setValue] = useState(3);
  const readout =
    value <= 2 ? REPUTATION_READOUTS[0] : value <= 4 ? REPUTATION_READOUTS[1] : REPUTATION_READOUTS[2];

  const advantage = Math.round(((value - 1) / 5) * 100);
  const risk = advantage;

  return (
    <Widget index={10} title="When Does Innovation Become Reputational Risk?" tool="2D slider">
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wide text-navy/55">
            <span>Usage maturity leads rollout</span>
            <span className="text-right">Rollout leads usage maturity</span>
          </div>
          <input
            className="mt-2"
            type="range"
            min={1}
            max={6}
            step={1}
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
            aria-label="Balance between usage maturity and rollout speed"
            aria-valuetext={readout.label}
          />
        </div>

        <div className="rounded-card bg-lilac/50 p-4">
          <p className="text-sm font-bold text-navy">{readout.label}</p>
          <p className="mt-1 text-sm text-navy/80">{readout.readout}</p>

          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-navy/70">
                <span>Competitive advantage</span>
                <span className="tabular-nums">{advantage}%</span>
              </div>
              <div className="mt-1 h-3 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-purple transition-[width] duration-300"
                  style={{ width: `${Math.max(advantage, 6)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-navy/70">
                <span>Reputational risk</span>
                <span className="tabular-nums">{risk}%</span>
              </div>
              <div className="mt-1 h-3 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-navy transition-[width] duration-300"
                  style={{ width: `${Math.max(risk, 6)}%` }}
                />
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-navy/60">
            The two move together. The decision is not how to avoid the trade — it is how much of it
            you are willing to own, and who agreed to that.
          </p>
        </div>
      </div>
    </Widget>
  );
}
