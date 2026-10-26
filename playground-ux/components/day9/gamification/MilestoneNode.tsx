'use client';

import { motion } from '@/lib/day9/motion-lite';
import { DUR, EASE } from '@/lib/day9/motion';
import { useMotionSafe } from '@/lib/day9/use-motion-safe';

/**
 * A node on the Mastery Map or a case timeline. Lights when its module is
 * covered; the case tint says which brief it backs.
 */
export function MilestoneNode({
  x,
  y,
  done,
  label,
  index,
  tint,
  onClick,
  href,
}: {
  x: number;
  y: number;
  done: boolean;
  label: string;
  index: number;
  tint: string;
  onClick?: () => void;
  href?: string;
}) {
  const { reduced, transition } = useMotionSafe();

  const node = (
    <>
      <motion.circle
        cx={x}
        cy={y}
        r={done ? 13 : 10}
        fill={done ? tint : 'var(--raised)'}
        stroke={done ? tint : 'var(--hairline)'}
        strokeWidth={2}
        initial={false}
        animate={{ r: done ? 13 : 10 }}
        transition={transition(DUR.base, EASE.settle)}
      />
      {done && !reduced ? (
        <motion.circle
          cx={x}
          cy={y}
          r={13}
          fill="none"
          stroke={tint}
          strokeWidth={1.5}
          initial={{ r: 13, opacity: 0.7 }}
          animate={{ r: 26, opacity: 0 }}
          transition={{ duration: DUR.draw, ease: EASE.out as number[] }}
        />
      ) : null}
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        className="font-mono"
        fontSize="11"
        fill={done ? 'var(--ink)' : 'var(--ink-soft)'}
      >
        {index}
      </text>
    </>
  );

  if (href || onClick) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={`${index}. ${label}`}
        className="cursor-pointer outline-none focus-visible:opacity-80"
      >
        {node}
        <title>{label}</title>
      </a>
    );
  }
  return <g aria-label={label}>{node}</g>;
}

/** A connector that draws itself once the prerequisite is covered (§7). */
export function MasteryLink({
  d,
  active,
  delay = 0,
}: {
  d: string;
  active: boolean;
  delay?: number;
}) {
  const { reduced } = useMotionSafe();
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={active ? 'var(--activation)' : 'var(--hairline)'}
      strokeWidth={active ? 2 : 1}
      strokeDasharray={active ? undefined : '3 4'}
      initial={active && !reduced ? { pathLength: 0 } : false}
      animate={active ? { pathLength: 1 } : { pathLength: 1 }}
      transition={
        reduced
          ? { duration: 0.15 }
          : { duration: DUR.draw, ease: EASE.out as number[], delay }
      }
    />
  );
}
