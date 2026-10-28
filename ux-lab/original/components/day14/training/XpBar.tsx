'use client';

import { LEVELS, XP_MAX } from '@/original/data/day14/training';

export function levelFor(xp: number) {
  let label: string = LEVELS[0].label;
  for (const level of LEVELS) {
    if (xp >= level.min) label = level.label;
  }
  return label;
}

export function XpBar({ xp, streak, attempts }: { xp: number; streak: number; attempts: number }) {
  const pct = Math.min(100, Math.round((xp / XP_MAX) * 100));
  const level = levelFor(xp);
  const next = LEVELS.find((l) => l.min > xp);

  return (
    <div className="aion-card p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="aion-label">Level</p>
          <p className="text-lg font-bold text-navy">{level}</p>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <p className="aion-label">XP</p>
            <p className="text-lg font-bold tabular-nums text-navy">{xp}</p>
          </div>
          <div>
            <p className="aion-label">Streak</p>
            <p className="text-lg font-bold tabular-nums text-navy">{streak}</p>
          </div>
          <div>
            <p className="aion-label">Tried</p>
            <p className="text-lg font-bold tabular-nums text-navy">{attempts}</p>
          </div>
        </div>
      </div>
      <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-lilac">
        <div
          className="h-full rounded-full bg-purple transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-navy/60">
        {next
          ? `${next.min - xp} XP to ${next.label}. XP is awarded for attempting — being right is a bonus, not the point.`
          : 'Top level reached. Keep practising — XP is awarded for attempting, not only for being right.'}
      </p>
    </div>
  );
}
