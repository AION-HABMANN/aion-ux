'use client';

import { STORAGE_KEYS, usePersistentState } from '@/original/lib/day14/storage';
import {
  PRACTICE_ITEMS,
  XP_BONUS_CATEGORY,
  XP_BONUS_VERDICT,
  XP_MAX,
  XP_PER_ATTEMPT,
} from '@/original/data/day14/training';
import { Badges } from './Badges';
import { PracticeCard, type AttemptResult } from './PracticeCard';
import { XpBar } from './XpBar';

type Progress = {
  xp: number;
  streak: number;
  attempted: string[];
  badges: string[];
};

const EMPTY: Progress = { xp: 0, streak: 0, attempted: [], badges: [] };

export function TrainingTab() {
  const [progress, setProgress, reset] = usePersistentState<Progress>(STORAGE_KEYS.training, EMPTY);

  const handleAttempt = (result: AttemptResult) => {
    setProgress((current) => {
      const alreadyDone = current.attempted.includes(result.itemId);
      const gained = alreadyDone
        ? 0
        : XP_PER_ATTEMPT +
          (result.verdictMatched ? XP_BONUS_VERDICT : 0) +
          (result.categoryMatched ? XP_BONUS_CATEGORY : 0);

      return {
        xp: Math.min(XP_MAX, current.xp + gained),
        // The streak counts consecutive attempts. There is no fail state.
        streak: alreadyDone ? current.streak : current.streak + 1,
        attempted: alreadyDone ? current.attempted : [...current.attempted, result.itemId],
        badges: current.badges.includes(result.category)
          ? current.badges
          : [...current.badges, result.category],
      };
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="aion-surface p-4 sm:p-5">
        <h2 className="text-xl font-bold text-navy">Training Ground</h2>
        <p className="mt-1 max-w-2xl text-sm text-navy/75">
          Practice with the reveals switched on. Make a call, hit Reveal, and compare your reasoning
          with the write-up. Every scenario here comes from a domain none of the graded cases touch —
          nothing you see here is an answer to a worksheet.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <XpBar xp={progress.xp} streak={progress.streak} attempts={progress.attempted.length} />
        <Badges earned={progress.badges} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-lilac bg-white px-4 py-3">
        <p className="text-sm text-navy/70">
          {progress.attempted.length} of {PRACTICE_ITEMS.length} practice items attempted.
        </p>
        <button type="button" className="aion-btn-ghost" onClick={reset}>
          Reset practice progress
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {PRACTICE_ITEMS.map((item, index) => (
          <PracticeCard
            key={item.id}
            item={item}
            index={index}
            revealed={false}
            onAttempt={handleAttempt}
          />
        ))}
      </div>
    </div>
  );
}
