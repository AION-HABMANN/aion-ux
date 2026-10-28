import { AnimatePresence, motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { cn, useReduced } from '@/original/components/day15/lib/utils'
import { Kicker } from '@/original/components/day15/components/primitives'

export interface Constraint {
  key: string
  label: string
  value: string
  tone?: 'signal' | 'valid' | 'warn' | 'risk' | 'neuro' | 'muted'
}

const TONE: Record<string, string> = {
  signal: 'text-signal',
  valid: 'text-valid',
  warn: 'text-warn',
  risk: 'text-risk',
  neuro: 'text-neuro',
  muted: 'text-ink/85',
}

function ConstraintList({ constraints }: { constraints: Constraint[] }) {
  return (
    <ul className="space-y-2.5">
      {constraints.map((c) => (
        <li
          key={c.key}
          className="flex items-baseline justify-between gap-3 border-b border-subtle/50 pb-2 last:border-0 last:pb-0"
        >
          <span className="text-[12.5px] leading-[1.45] text-muted">{c.label}</span>
          <span className={cn('readout shrink-0 text-right text-[12px]', TONE[c.tone ?? 'muted'])}>
            {c.value}
          </span>
        </li>
      ))}
    </ul>
  )
}

/**
 * Desktop: the conditions the learner cannot negotiate with, parked in the rail
 * where they stay on screen for the whole exercise.
 */
export function ConstraintRail({
  title,
  constraints,
  children,
  className,
}: {
  title: string
  constraints: Constraint[]
  children?: ReactNode
  className?: string
}) {
  return (
    <aside
      className={cn('hidden rounded-xl border border-subtle bg-panel p-5 lg:block', className)}
      aria-label={title}
    >
      <Kicker tone="warn">{title}</Kicker>
      <div className="mt-3">
        <ConstraintList constraints={constraints} />
      </div>
      {children && <div className="mt-4 border-t border-subtle pt-4">{children}</div>}
    </aside>
  )
}

/**
 * Mobile: the same conditions as a sticky summary chip that expands on tap.
 *
 * Rendered *before* the layout grid rather than inside the rail — a sticky
 * element can only travel as far as its own parent box, and in the rail that
 * box is a few hundred pixels tall. Out here it follows the learner down the
 * entire exercise, which is the only version worth having.
 */
export function ConstraintBar({ title, constraints }: { title: string; constraints: Constraint[] }) {
  const reduced = useReduced()
  const [open, setOpen] = useState(false)
  const summary = constraints
    .filter((c) => c.tone && c.tone !== 'muted')
    .slice(0, 2)
    .map((c) => c.value)
    .join(' · ')

  return (
    <div className="no-print sticky top-[57px] z-20 -mx-4 mb-5 border-b border-subtle bg-deep/95 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6 lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 rounded-lg border border-warn/30 bg-warn/[0.06] px-3 py-2"
      >
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-warn">{title}</span>
        <span className="flex items-center gap-2 font-mono text-[10.5px] text-muted">
          {summary}
          <span aria-hidden>{open ? '▲' : '▼'}</span>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.28 }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-lg border border-subtle bg-panel p-3.5">
              <ConstraintList constraints={constraints} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
