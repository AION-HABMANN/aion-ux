'use client';

import { useState } from 'react';
import { HEALTHSPACE_INTRO, HEALTHSPACE_WORKSHEET_NOTE } from '@/content/healthspace';
import { CompareMatrix } from './CompareMatrix';
import { Conditions } from './Conditions';
import { VariantCards } from './VariantCards';

/** No 3D here: this case compares strategic approaches, not a spatial object. */
export function HealthSpaceTab() {
  const [compare, setCompare] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="aion-surface p-4 sm:p-5">
        <h2 className="text-xl font-bold text-navy">HealthSpace</h2>
        <p className="mt-1 max-w-2xl text-sm text-navy/75">
          Assessment case for Worksheet 2. Three approaches, one set of framework conditions. No
          variant is recommended here.
        </p>
      </div>

      <div className="aion-card p-4 sm:p-6">
        <p className="aion-label">Case</p>
        <p className="mt-2 text-base text-navy">{HEALTHSPACE_INTRO}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px] lg:items-start">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-full bg-lilac p-1">
              <button
                type="button"
                onClick={() => setCompare(false)}
                aria-pressed={!compare}
                className={[
                  'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors',
                  compare ? 'text-navy/60' : 'bg-purple text-white',
                ].join(' ')}
              >
                Cards
              </button>
              <button
                type="button"
                onClick={() => setCompare(true)}
                aria-pressed={compare}
                className={[
                  'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors',
                  compare ? 'bg-purple text-white' : 'text-navy/60',
                ].join(' ')}
              >
                Compare
              </button>
            </div>
            <span className="text-xs text-navy/55">
              {compare
                ? 'The matrix shows the shape of the analysis, not the analysis.'
                : 'Expand a card to read the full description.'}
            </span>
          </div>

          {compare ? <CompareMatrix /> : <VariantCards />}

          <p className="text-sm font-semibold text-purple">{HEALTHSPACE_WORKSHEET_NOTE}</p>
        </div>

        <Conditions />
      </div>
    </div>
  );
}
