'use client';

import { motion } from '@/lib/day9/motion-lite';
import { DUR, EASE } from '@/lib/day9/motion';
import { useMotionSafe } from '@/lib/day9/use-motion-safe';

/**
 * An analog gauge. The needle overshoots slightly and settles, like a real
 * instrument (§4). This is the app's most important teaching device: the
 * learner sees a trade-off as physical movement, not as a paragraph.
 */
export function Gauge({
  value,
  label,
  accent,
  size = 44,
}: {
  value: number;
  label: string;
  accent: string;
  size?: number;
}) {
  const { reduced } = useMotionSafe();
  // -120deg at 0, +120deg at 100; the needle overshoots a little and settles (CSS only).
  const angle = -120 + (Math.min(100, Math.max(0, value)) / 100) * 240;

  const r = size / 2 - 4;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="flex items-center gap-2">
      <div
        className="relative shrink-0"
        style={{ width: size, height: size }}
        role="meter"
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
          {/* Dial arc */}
          <path
            d={arcPath(cx, cy, r, -120, 120)}
            fill="none"
            stroke="rgba(200,212,228,0.28)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Filled portion */}
          <motion.path
            d={arcPath(cx, cy, r, -120, 120)}
            fill="none"
            stroke={accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength={1}
            initial={false}
            animate={{ pathLength: Math.max(0.001, value / 100) }}
            transition={
              reduced
                ? { duration: 0.15 }
                : { duration: DUR.gauge, ease: EASE.needle as number[] }
            }
          />
          {/* Needle */}
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - r + 3}
            stroke={accent}
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: `${cx}px ${cy}px`,
              transition: reduced ? 'none' : `transform ${DUR.gauge}s cubic-bezier(0.34, 1.32, 0.64, 1)`,
            }}
          />
          <circle cx={cx} cy={cy} r="2" fill={accent} />
        </svg>
      </div>
      <div className="min-w-0">
        <p className="truncate font-mono text-[10px] uppercase tracking-wider text-console-fg/70">
          {label}
        </p>
        <p className="font-mono text-14 tabular-nums text-console-fg">{Math.round(value)}</p>
      </div>
    </div>
  );
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polar(cx, cy, r, startDeg);
  const end = polar(cx, cy, r, endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}
