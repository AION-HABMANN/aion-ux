import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn, clamp, useReduced } from '@/original/components/day15/lib/utils'
import { springOr } from '@/original/components/day15/lib/motion'
import { Tip } from '@/original/components/day15/components/primitives'

export type MeterTone = 'signal' | 'valid' | 'warn' | 'risk' | 'neuro'

const TONE: Record<MeterTone, { fill: string; text: string; glow: string }> = {
  signal: { fill: 'var(--accent-signal)', text: 'text-signal', glow: 'rgba(76,201,240,0.4)' },
  valid: { fill: 'var(--accent-valid)', text: 'text-valid', glow: 'rgba(82,217,165,0.4)' },
  warn: { fill: 'var(--accent-warn)', text: 'text-warn', glow: 'rgba(245,184,65,0.4)' },
  risk: { fill: 'var(--accent-risk)', text: 'text-risk', glow: 'rgba(239,93,107,0.4)' },
  neuro: { fill: 'var(--accent-neuro)', text: 'text-neuro', glow: 'rgba(167,139,250,0.4)' },
}

export interface MeterProps {
  label: string
  value: number
  tone?: MeterTone
  /** What this meter actually measures. Required — no unexplained numbers. */
  explain: string
  /**
   * Highest value reachable given the learner's other settings. Rendered as a
   * hard tick on the track: the visible shape of a trade-off.
   */
  ceiling?: number
  /** Short word next to the number, e.g. "thin", "defensible". */
  qualifier?: string
  /** Higher = worse. Flips the readout language, never the colour alone. */
  inverse?: boolean
  compact?: boolean
}

export function Meter({
  label,
  value,
  tone = 'signal',
  explain,
  ceiling,
  qualifier,
  inverse,
  compact,
}: MeterProps) {
  const reduced = useReduced()
  const v = clamp(value)
  const t = TONE[tone]
  const [blocked, setBlocked] = useState(false)
  const prev = useRef(v)

  // "Impossible" flash: the learner pushed a lever that would take this meter
  // past what their other settings allow. The meter refuses, visibly.
  useEffect(() => {
    if (ceiling !== undefined && v >= ceiling - 0.35 && prev.current < v) {
      setBlocked(true)
      const id = window.setTimeout(() => setBlocked(false), 620)
      return () => window.clearTimeout(id)
    }
    prev.current = v
    return undefined
  }, [v, ceiling])

  return (
    <div className={cn('group', compact ? 'py-1.5' : 'py-2')}>
      <div className="flex items-baseline justify-between gap-2">
        <Tip label={explain}>
          <span className="label-mono cursor-help border-b border-dotted border-subtle/80 pb-px">
            {label}
          </span>
        </Tip>
        <span className="flex items-baseline gap-2">
          {qualifier && (
            <span className={cn('font-mono text-[10.5px] uppercase tracking-[0.12em]', t.text)}>
              {qualifier}
            </span>
          )}
          <span className="readout text-[13px]" style={{ color: t.fill }}>
            {Math.round(v)}
            <span className="text-muted">/100</span>
          </span>
        </span>
      </div>

      <div
        role="meter"
        aria-label={`${label}${inverse ? ' (higher is worse)' : ''}`}
        aria-valuenow={Math.round(v)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${Math.round(v)} of 100${qualifier ? `, ${qualifier}` : ''}${
          ceiling !== undefined ? `, ceiling ${Math.round(ceiling)}` : ''
        }`}
        className={cn(
          'relative mt-2 h-[7px] w-full overflow-hidden rounded-full border border-subtle/70 bg-deep',
          blocked && 'ring-1 ring-warn/70',
        )}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: t.fill, boxShadow: `0 0 14px -2px ${t.glow}` }}
          animate={{ width: `${v}%` }}
          transition={springOr(reduced)}
        />
        {ceiling !== undefined && ceiling < 99.5 && (
          <span
            aria-hidden
            className="absolute inset-y-[-3px] w-px bg-muted/70"
            style={{ left: `${clamp(ceiling)}%` }}
          />
        )}
      </div>

      {blocked && (
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-warn"
        >
          <span aria-hidden>▲ </span>ceiling — your other settings cap this
        </motion.p>
      )}
    </div>
  )
}

/** A compact meter row used inside constraint HUDs. */
export function MeterStack({ meters }: { meters: MeterProps[] }) {
  return (
    <div className="divide-y divide-subtle/60">
      {meters.map((m) => (
        <Meter key={m.label} {...m} />
      ))}
    </div>
  )
}
