'use client';

import { motion } from '@/original/lib/day9/motion-lite';
import { DUR, EASE } from '@/original/lib/day9/motion';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';

/**
 * A ring that fills by segment. Never jumps to its value — the sweep IS the
 * mechanic (§5.3 #2).
 */
export function ProgressRing({
  value,
  total,
  size = 56,
  stroke = 5,
  accent = 'var(--activation)',
  label,
  showFraction = true,
}: {
  value: number;
  total: number;
  size?: number;
  stroke?: number;
  accent?: string;
  label?: string;
  showFraction?: boolean;
}) {
  const { reduced } = useMotionSafe();
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = total > 0 ? Math.min(1, value / total) : 0;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={label}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--hairline)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={accent}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={false}
          animate={{ strokeDashoffset: circumference * (1 - pct) }}
          transition={
            reduced
              ? { duration: 0.15 }
              : { duration: DUR.fill, ease: EASE.out as number[] }
          }
        />
      </svg>
      {showFraction ? (
        <span className="absolute font-mono text-12 tabular-nums text-ink">
          {value}/{total}
        </span>
      ) : null}
    </div>
  );
}
