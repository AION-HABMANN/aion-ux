'use client';

import { CaseText } from './CaseText';
import { CategoryRef } from './CategoryRef';
import { ModelViewerStage } from './ModelViewerStage';

export function BuildVisionTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="aion-surface p-4 sm:p-5">
        <h2 className="text-xl font-bold text-navy">BuildVision</h2>
        <p className="mt-1 max-w-2xl text-sm text-navy/75">
          Assessment case for Worksheet 1. Explore the device, read the case, and do your analysis in
          the worksheet. This tab shows no verdicts, categories, or hints.
        </p>
      </div>

      <ModelViewerStage />
      <CaseText />
      <CategoryRef />
    </div>
  );
}
