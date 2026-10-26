import { motion } from 'framer-motion'
import { cn, useReduced } from '@/lib/utils'
import { SPRING } from '@/lib/motion'
import { Tip } from '@/components/primitives'

export interface CoverageItem {
  key: string
  label: string
  /** What the checker is looking for. Shown on hover — this is not a secret. */
  explain: string
  test: (text: string) => boolean
}

/**
 * Coverage, not grading.
 *
 * This deliberately never produces a number. It answers one question — "have
 * you said the thing you'd be asked about in the room?" — and nothing else.
 * A learner can leave every box dark and still submit.
 */
export function ElementChecker({
  items,
  text,
  title = 'Coverage check',
  className,
}: {
  items: CoverageItem[]
  text: string
  title?: string
  className?: string
}) {
  const reduced = useReduced()
  const results = items.map((i) => ({ ...i, hit: i.test(text) }))
  const hits = results.filter((r) => r.hit).length

  return (
    <aside
      className={cn('rounded-xl border border-subtle bg-deep/50 p-4', className)}
      aria-label={`${title}: ${hits} of ${items.length} elements present`}
    >
      <header className="mb-3">
        <p className="label-mono">{title}</p>
        <p className="mt-1 text-[11.5px] leading-[1.5] text-muted">
          Presence, not quality. Nothing here is a mark.
        </p>
      </header>

      <ul className="space-y-2">
        {results.map((r) => (
          <li key={r.key} className="flex items-start gap-2.5">
            <motion.span
              aria-hidden
              initial={false}
              animate={{
                scale: r.hit && !reduced ? [1, 1.22, 1] : 1,
                backgroundColor: r.hit ? 'rgba(82,217,165,0.16)' : 'rgba(38,50,67,0.5)',
                borderColor: r.hit ? 'var(--accent-valid)' : 'var(--border-subtle)',
                color: r.hit ? 'var(--accent-valid)' : 'var(--text-muted)',
              }}
              transition={SPRING}
              className="mt-[3px] inline-flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[4px] border font-mono text-[10px] leading-none"
            >
              {r.hit ? '✓' : '·'}
            </motion.span>
            <Tip label={r.explain} side="bottom">
              <span
                className={cn(
                  'cursor-help text-left text-[12.5px] leading-[1.45] transition-colors duration-300',
                  r.hit ? 'text-ink/85' : 'text-muted',
                )}
              >
                {r.label}
              </span>
            </Tip>
          </li>
        ))}
      </ul>

      <p className="mt-3 border-t border-subtle pt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
        {hits === 0
          ? 'nothing detected yet'
          : hits === items.length
            ? 'all elements present — now reread it as your CFO'
            : `${hits}/${items.length} elements present`}
      </p>
    </aside>
  )
}

/** Shared detectors so coverage language stays consistent across playgrounds. */
export const has = (...signals: string[]) => (text: string) => {
  const t = text.toLowerCase()
  return signals.some((s) => t.includes(s))
}

export const hasAllOf = (min: number, ...signals: string[]) => (text: string) => {
  const t = text.toLowerCase()
  return signals.filter((s) => t.includes(s)).length >= min
}

export const longerThan = (words: number) => (text: string) =>
  text.trim().split(/\s+/).filter(Boolean).length > words
