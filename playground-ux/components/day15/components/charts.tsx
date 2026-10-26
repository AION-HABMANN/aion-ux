import { motion } from 'framer-motion'
import { useId } from 'react'
import { cn, useReduced } from '@/components/day15/lib/utils'
import { SPRING, springOr } from '@/components/day15/lib/motion'
import { Tip } from '@/components/day15/components/primitives'

/* ------------------------------------------------------------ ProgressRing */

export function ProgressRing({
  value,
  size = 18,
  stroke = 2.5,
  tone = 'var(--accent-signal)',
  title,
}: {
  value: number // 0..1
  size?: number
  stroke?: number
  tone?: string
  title?: string
}) {
  const reduced = useReduced()
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const done = value >= 0.999
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0 overflow-visible"
      role="img"
      aria-label={title ?? `${Math.round(value * 100)} percent complete`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--border-subtle)"
        strokeWidth={stroke}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={done ? 'var(--accent-valid)' : tone}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        initial={false}
        animate={{ strokeDashoffset: c * (1 - Math.max(0, Math.min(1, value))) }}
        transition={springOr(reduced)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  )
}

/* ------------------------------------------------------------------- Radar */

export interface RadarAxis {
  key: string
  label: string
  value: number // 0..1
  explain?: string
}

export function Radar({ axes, size = 260 }: { axes: RadarAxis[]; size?: number }) {
  const reduced = useReduced()
  const gid = useId().replace(/[:]/g, '')
  const cx = size / 2
  const cy = size / 2
  const R = size / 2 - 46
  const n = axes.length

  const point = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2
    return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v] as const
  }

  const poly = axes.map((ax, i) => point(i, Math.max(0.04, ax.value)).join(',')).join(' ')
  const empty = axes.every((a) => a.value === 0)

  return (
    <figure className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Dimension profile">
        <defs>
          <radialGradient id={`radar-${gid}`}>
            <stop offset="0%" stopColor="var(--accent-signal)" stopOpacity="0.42" />
            <stop offset="100%" stopColor="var(--accent-signal)" stopOpacity="0.1" />
          </radialGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((ring) => (
          <polygon
            key={ring}
            points={axes.map((_, i) => point(i, ring).join(',')).join(' ')}
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth={ring === 1 ? 1.2 : 0.8}
          />
        ))}
        {axes.map((_, i) => {
          const [x, y] = point(i, 1)
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--border-subtle)" strokeWidth={0.8} />
        })}

        <motion.polygon
          points={poly}
          fill={`url(#radar-${gid})`}
          stroke="var(--accent-signal)"
          strokeWidth={1.6}
          strokeLinejoin="round"
          initial={false}
          animate={{ points: poly, opacity: empty ? 0.25 : 1 }}
          transition={springOr(reduced)}
        />

        {axes.map((ax, i) => {
          const [x, y] = point(i, 1.24)
          const anchor = Math.abs(x - cx) < 6 ? 'middle' : x > cx ? 'start' : 'end'
          return (
            <text
              key={ax.key}
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="middle"
              className="font-mono"
              fontSize="9"
              letterSpacing="0.08em"
              fill={ax.value > 0 ? 'var(--accent-signal)' : 'var(--text-muted)'}
            >
              {ax.label.toUpperCase()}
            </text>
          )
        })}
      </svg>
      <figcaption className="mt-1 text-center text-[12px] text-muted">
        {empty ? 'No dimensions tagged yet. The shape appears as you commit.' : 'Shape of your reading — not a score.'}
      </figcaption>
    </figure>
  )
}

/* -------------------------------------------------------------- StackedBar */

export interface StackSegment {
  key: string
  label: string
  value: number
  color: string
  explain?: string
}

export function StackedBar({ segments, height = 34 }: { segments: StackSegment[]; height?: number }) {
  const reduced = useReduced()
  const total = segments.reduce((s, x) => s + x.value, 0)
  if (total === 0) {
    return (
      <div
        className="flex items-center justify-center rounded-lg border border-dashed border-subtle bg-deep/50 text-[12px] text-muted"
        style={{ height }}
      >
        Nothing tagged yet. The profile is the diagnosis.
      </div>
    )
  }
  return (
    <div>
      <div className="flex overflow-hidden rounded-lg border border-subtle" style={{ height }}>
        {segments
          .filter((s) => s.value > 0)
          .map((s) => (
            <Tip key={s.key} label={`${s.label}: tagged ${s.value}× — ${s.explain ?? 'share of your diagnosis'}`}>
              <motion.div
                className="h-full"
                style={{ background: s.color, height }}
                initial={false}
                animate={{ width: `${(s.value / total) * 100}%` }}
                transition={springOr(reduced)}
                title={`${s.label}: ${s.value}`}
              />
            </Tip>
          ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {segments.map((s) => (
          <li key={s.key} className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em]">
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-[2px]"
              style={{ background: s.color, opacity: s.value ? 1 : 0.3 }}
            />
            <span className={s.value ? 'text-ink/80' : 'text-muted/60'}>
              {s.label} <span className="text-muted">×{s.value}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* --------------------------------------------------------------- 2×2 plot */

export interface PlotPoint {
  key: string
  label: string
  x: number // 0..1 preserves the relationship
  y: number // 0..1 corrects the epistemics
  tone?: string
  ghost?: boolean
}

export function Plot2x2({
  points,
  xLabel,
  yLabel,
  size = 300,
}: {
  points: PlotPoint[]
  xLabel: string
  yLabel: string
  size?: number
}) {
  const reduced = useReduced()
  const pad = 34
  const inner = size - pad * 2
  const px = (x: number) => pad + x * inner
  const py = (y: number) => pad + (1 - y) * inner

  return (
    <figure>
      <svg width="100%" viewBox={`0 0 ${size} ${size + 16}`} role="img" aria-label={`${xLabel} against ${yLabel}`}>
        <rect x={pad} y={pad} width={inner} height={inner} fill="var(--bg-deep)" stroke="var(--border-subtle)" />
        <rect x={pad + inner / 2} y={pad} width={inner / 2} height={inner / 2} fill="var(--accent-valid)" opacity="0.06" />
        <line
          x1={pad + inner / 2}
          y1={pad}
          x2={pad + inner / 2}
          y2={pad + inner}
          stroke="var(--border-subtle)"
          strokeDasharray="3 4"
        />
        <line
          x1={pad}
          y1={pad + inner / 2}
          x2={pad + inner}
          y2={pad + inner / 2}
          stroke="var(--border-subtle)"
          strokeDasharray="3 4"
        />

        <text x={pad + inner / 2} y={size + 8} textAnchor="middle" fontSize="9" className="font-mono" fill="var(--text-muted)" letterSpacing="0.1em">
          {xLabel.toUpperCase()} →
        </text>
        <text
          x={-(pad + inner / 2)}
          y={12}
          transform="rotate(-90)"
          textAnchor="middle"
          fontSize="9"
          className="font-mono"
          fill="var(--text-muted)"
          letterSpacing="0.1em"
        >
          {yLabel.toUpperCase()} →
        </text>

        {points.map((p, i) => (
          <motion.g
            key={p.key}
            initial={{ opacity: 0, scale: reduced ? 1 : 0.6 }}
            animate={{ opacity: p.ghost ? 0.42 : 1, scale: 1 }}
            transition={{ ...SPRING, delay: reduced ? 0 : i * 0.06 }}
          >
            <circle
              cx={px(p.x)}
              cy={py(p.y)}
              r={p.ghost ? 5 : 7}
              fill={p.ghost ? 'transparent' : (p.tone ?? 'var(--accent-signal)')}
              stroke={p.tone ?? 'var(--accent-signal)'}
              strokeWidth={p.ghost ? 1.4 : 1}
              strokeDasharray={p.ghost ? '2 3' : undefined}
            />
            <text
              x={px(p.x)}
              y={py(p.y) - 12}
              textAnchor="middle"
              fontSize="9.5"
              className="font-mono"
              fill={p.ghost ? 'var(--text-muted)' : 'var(--text-primary)'}
            >
              {p.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </figure>
  )
}

/* ----------------------------------------------------------- Sparkline bar */

export function BarRow({
  label,
  value,
  max,
  color = 'var(--accent-signal)',
  suffix,
  className,
}: {
  label: string
  value: number
  max: number
  color?: string
  suffix?: string
  className?: string
}) {
  const reduced = useReduced()
  const pct = max === 0 ? 0 : (value / max) * 100
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="w-[42%] shrink-0 truncate text-[12.5px] text-ink/80">{label}</span>
      <span className="relative h-[6px] flex-1 overflow-hidden rounded-full bg-deep">
        <motion.span
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: color }}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={springOr(reduced)}
        />
      </span>
      <span className="readout w-[52px] shrink-0 text-right text-[11.5px] text-muted">
        {value}
        {suffix}
      </span>
    </div>
  )
}
