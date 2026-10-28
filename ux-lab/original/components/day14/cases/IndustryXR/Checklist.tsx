'use client';

import { TASK3_CATEGORIES } from '@/original/data/day14/categories';
import { INDUSTRYXR_ASSIGNMENT, INDUSTRYXR_WORKSHEET_NOTE } from '@/original/data/day14/industryxr';
import { STORAGE_KEYS, usePersistentState } from '@/original/lib/day14/storage';

/** Ticks are for the learner's own orientation only. Nothing is scored. */
export function Checklist() {
  const [ticked, setTicked] = usePersistentState<string[]>(STORAGE_KEYS.industryChecklist, []);

  const toggle = (item: string) =>
    setTicked((current) =>
      current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item],
    );

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="aion-card p-4 sm:p-6">
        <p className="aion-label">Task 3 categories (reference only)</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {TASK3_CATEGORIES.map((category) => (
            <li
              key={category}
              className="rounded-xl border border-lilac bg-lilac/50 px-3 py-2 text-sm font-semibold text-navy"
            >
              {category}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-semibold text-purple">{INDUSTRYXR_WORKSHEET_NOTE}</p>
      </div>

      <div className="aion-card p-4 sm:p-6">
        <p className="aion-label">Work assignment</p>
        <p className="mt-1 text-xs text-navy/55">
          Tick these for your own orientation — nothing here is scored or submitted.
        </p>
        <ul className="mt-3 space-y-2">
          {INDUSTRYXR_ASSIGNMENT.map((item, index) => (
            <li key={item}>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-lilac px-3 py-2 text-sm text-navy/85 hover:bg-lilac/40">
                <input
                  type="checkbox"
                  checked={ticked.includes(item)}
                  onChange={() => toggle(item)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#5624D0]"
                />
                <span>
                  <span className="font-semibold text-navy">{index + 1}. </span>
                  {item}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
