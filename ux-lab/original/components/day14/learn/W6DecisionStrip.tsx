'use client';

import { useState } from 'react';
import { Widget } from '@/original/components/day14/ui/Widget';
import { DECISION_GATES, DECISION_PASS_VERDICT, DECISION_SAMPLE_CASE } from '@/original/data/day14/learn';

/**
 * Widget 6 — teaches the reasoning pattern on a GENERIC sample use case.
 * It is never applied to BuildVision, HealthSpace or IndustryXR content.
 */
export function W6DecisionStrip() {
  const [answers, setAnswers] = useState<Array<boolean | null>>([null, null, null, null]);

  const answer = (index: number, value: boolean) => {
    setAnswers((current) => {
      const next = [...current];
      next[index] = value;
      // A failed gate ends the run: later gates are cleared.
      if (!value) {
        for (let i = index + 1; i < next.length; i += 1) next[i] = null;
      }
      return next;
    });
  };

  const failedIndex = answers.findIndex((a) => a === false);
  const passedAll = answers.every((a) => a === true);
  const reachable = (index: number) => index === 0 || answers[index - 1] === true;

  return (
    <Widget index={6} title="Does It Earn Its Place?" tool="2D decision strip">
      <p className="mb-4 rounded-xl bg-lilac px-3 py-2 text-sm text-navy/80">{DECISION_SAMPLE_CASE}</p>

      <ol className="space-y-2">
        {DECISION_GATES.map((gate, index) => {
          const state = answers[index];
          const open = reachable(index);
          return (
            <li
              key={gate.id}
              className={[
                'rounded-card border p-3 transition-opacity',
                open ? 'border-lilac opacity-100' : 'border-lilac/60 opacity-40',
              ].join(' ')}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-navy">
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-lilac text-[11px] font-bold text-purple">
                    {index + 1}
                  </span>
                  {gate.question}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={!open}
                    onClick={() => answer(index, true)}
                    className={[
                      'rounded-full px-3 py-1 text-xs font-bold transition-colors',
                      state === true ? 'bg-purple text-white' : 'bg-lilac text-navy/70 hover:bg-lilac',
                    ].join(' ')}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    disabled={!open}
                    onClick={() => answer(index, false)}
                    className={[
                      'rounded-full px-3 py-1 text-xs font-bold transition-colors',
                      state === false ? 'bg-navy text-white' : 'bg-lilac text-navy/70 hover:bg-lilac',
                    ].join(' ')}
                  >
                    No
                  </button>
                </div>
              </div>
              {state === true && <p className="mt-2 text-sm text-navy/70">{gate.yesNote}</p>}
            </li>
          );
        })}
      </ol>

      {failedIndex >= 0 && (
        <div className="mt-4 rounded-card border border-navy/20 bg-lilac/60 p-4">
          <p className="aion-label text-navy/60">Verdict</p>
          <p className="mt-1 text-sm text-navy/85">{DECISION_GATES[failedIndex].failVerdict}</p>
        </div>
      )}
      {passedAll && (
        <div className="mt-4 rounded-card border border-purple/30 bg-lilac/60 p-4">
          <p className="aion-label">Verdict</p>
          <p className="mt-1 text-sm text-navy/85">{DECISION_PASS_VERDICT}</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setAnswers([null, null, null, null])}
        className="mt-4 text-xs font-semibold text-purple underline underline-offset-4"
      >
        Run the gates again
      </button>
    </Widget>
  );
}
