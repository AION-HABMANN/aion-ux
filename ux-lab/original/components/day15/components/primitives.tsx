import { motion } from 'framer-motion'
import {
  forwardRef,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react'
import { cn, useReduced } from '@/original/components/day15/lib/utils'
import { SPRING, revealItem } from '@/original/components/day15/lib/motion'

/* ------------------------------------------------------------------ Button */

type BtnVariant = 'primary' | 'valid' | 'ghost' | 'risk' | 'neuro' | 'quiet'
type BtnSize = 'sm' | 'md' | 'lg'

const VARIANT: Record<BtnVariant, string> = {
  primary:
    'bg-signal/12 text-signal border-signal/45 hover:bg-signal/20 hover:border-signal/70 shadow-[0_0_0_1px_rgba(76,201,240,0.06)_inset]',
  valid: 'bg-valid/12 text-valid border-valid/45 hover:bg-valid/20 hover:border-valid/70',
  risk: 'bg-risk/12 text-risk border-risk/45 hover:bg-risk/20 hover:border-risk/70',
  neuro: 'bg-neuro/12 text-neuro border-neuro/45 hover:bg-neuro/20 hover:border-neuro/70',
  ghost: 'bg-elevated/60 text-ink border-subtle hover:bg-elevated hover:border-[#33455c]',
  quiet: 'bg-transparent text-muted border-transparent hover:text-ink hover:bg-elevated/70',
}

const SIZE: Record<BtnSize, string> = {
  sm: 'px-3 py-1.5 text-[12px] tracking-[0.06em]',
  md: 'px-4 py-2.5 text-[13px] tracking-[0.07em]',
  lg: 'px-6 py-3.5 text-[14px] tracking-[0.08em]',
}

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant
  size?: BtnSize
  icon?: ReactNode
  trailing?: ReactNode
  block?: boolean
}

export const Btn = forwardRef<HTMLButtonElement, BtnProps>(function Btn(
  { variant = 'primary', size = 'md', icon, trailing, block, className, children, ...rest },
  ref,
) {
  const reduced = useReduced()
  return (
    <motion.button
      ref={ref}
      type="button"
      whileHover={reduced || rest.disabled ? undefined : { y: -2 }}
      whileTap={reduced || rest.disabled ? undefined : { y: 0, scale: 0.985 }}
      transition={SPRING}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 rounded-lg border font-mono uppercase',
        'transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent',
        VARIANT[variant],
        SIZE[size],
        block && 'w-full',
        className,
      )}
      {...(rest as Record<string, unknown>)}
    >
      {icon && <span aria-hidden className="shrink-0 opacity-90">{icon}</span>}
      <span>{children}</span>
      {trailing && <span aria-hidden className="shrink-0 opacity-70">{trailing}</span>}
    </motion.button>
  )
})

/* ----------------------------------------------------------------- Tooltip */

/**
 * Every meter, badge and score in this module has to explain what it measures.
 * Hover *and* focus, because the whole app is keyboard-operable.
 */
export function Tip({
  label,
  children,
  side = 'top',
  className,
}: {
  label: ReactNode
  children: ReactNode
  side?: 'top' | 'bottom'
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span aria-describedby={open ? id : undefined} className="inline-flex" tabIndex={0}>
        {children}
      </span>
      {open && (
        <motion.span
          id={id}
          role="tooltip"
          initial={{ opacity: 0, y: side === 'top' ? 4 : -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.14 }}
          className={cn(
            'pointer-events-none absolute left-1/2 z-50 w-max max-w-[248px] -translate-x-1/2 rounded-lg border',
            'border-subtle bg-elevated px-3 py-2 text-[11.5px] font-normal normal-case leading-[1.5] tracking-normal',
            'text-ink/90 shadow-[0_16px_36px_-18px_rgba(0,0,0,0.95)]',
            side === 'top' ? 'bottom-[calc(100%+8px)]' : 'top-[calc(100%+8px)]',
          )}
        >
          {label}
        </motion.span>
      )}
    </span>
  )
}

/* ------------------------------------------------------------------- Panel */

export function Panel({
  children,
  className,
  as: As = 'div',
  ...rest
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'aside'
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <As className={cn('panel p-5 sm:p-6', className)} {...rest}>
      {children}
    </As>
  )
}

/** Small all-caps eyebrow used above headings and on instrument panels. */
export function Kicker({
  children,
  tone = 'muted',
  className,
}: {
  children: ReactNode
  tone?: 'muted' | 'signal' | 'valid' | 'warn' | 'risk' | 'neuro'
  className?: string
}) {
  const tones: Record<string, string> = {
    muted: 'text-muted',
    signal: 'text-signal',
    valid: 'text-valid',
    warn: 'text-warn',
    risk: 'text-risk',
    neuro: 'text-neuro',
  }
  return (
    <p className={cn('font-mono text-[11px] uppercase tracking-[0.18em]', tones[tone], className)}>
      {children}
    </p>
  )
}

/* -------------------------------------------------------------------- Chip */

export function Chip({
  active,
  children,
  tone = 'signal',
  onClick,
  disabled,
  className,
  ariaPressed,
}: {
  active?: boolean
  children: ReactNode
  tone?: 'signal' | 'valid' | 'warn' | 'risk' | 'neuro'
  onClick?: () => void
  disabled?: boolean
  className?: string
  ariaPressed?: boolean
}) {
  const reduced = useReduced()
  const toneOn: Record<string, string> = {
    signal: 'border-signal/60 bg-signal/15 text-signal',
    valid: 'border-valid/60 bg-valid/15 text-valid',
    warn: 'border-warn/60 bg-warn/15 text-warn',
    risk: 'border-risk/60 bg-risk/15 text-risk',
    neuro: 'border-neuro/60 bg-neuro/15 text-neuro',
  }
  const Comp = onClick ? motion.button : motion.span
  return (
    <Comp
      {...(onClick ? { type: 'button', onClick, disabled, 'aria-pressed': ariaPressed ?? !!active } : {})}
      whileHover={onClick && !reduced && !disabled ? { y: -2 } : undefined}
      transition={SPRING}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px]',
        'uppercase tracking-[0.1em] transition-colors duration-200',
        active ? toneOn[tone] : 'border-subtle bg-elevated/50 text-muted',
        onClick && !disabled && 'cursor-pointer hover:text-ink',
        disabled && 'cursor-not-allowed opacity-45',
        className,
      )}
    >
      {active && (
        <span aria-hidden className="text-[10px] leading-none">
          ▸
        </span>
      )}
      {children}
    </Comp>
  )
}

/* -------------------------------------------------------------- Inline note */

/**
 * The module's only feedback device. Never "correct/wrong" — a consequence,
 * written the way a senior colleague would say it. Overreach *desaturates* the
 * surrounding panel rather than buzzing at the learner.
 */
export function Note({
  tone = 'muted',
  children,
  label,
  className,
}: {
  tone?: 'muted' | 'signal' | 'valid' | 'warn' | 'risk' | 'neuro'
  children: ReactNode
  label?: string
  className?: string
}) {
  const reduced = useReduced()
  const map: Record<string, { bar: string; text: string; mark: string }> = {
    muted: { bar: 'bg-muted/50', text: 'text-muted', mark: '—' },
    signal: { bar: 'bg-signal', text: 'text-signal', mark: '◈' },
    valid: { bar: 'bg-valid', text: 'text-valid', mark: '✓' },
    warn: { bar: 'bg-warn', text: 'text-warn', mark: '!' },
    risk: { bar: 'bg-risk', text: 'text-risk', mark: '▲' },
    neuro: { bar: 'bg-neuro', text: 'text-neuro', mark: '◇' },
  }
  const t = map[tone]
  return (
    <motion.div
      initial={{ opacity: 0, x: reduced ? 0 : -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: reduced ? 0.15 : 0.34, ease: [0.22, 0.61, 0.36, 1] }}
      className={cn('relative overflow-hidden rounded-lg bg-elevated/45 py-3 pl-4 pr-4', className)}
    >
      <span aria-hidden className={cn('absolute inset-y-0 left-0 w-[3px]', t.bar)} />
      {label && (
        <span className={cn('mr-2 font-mono text-[10.5px] uppercase tracking-[0.16em]', t.text)}>
          <span aria-hidden className="mr-1.5">
            {t.mark}
          </span>
          {label}
        </span>
      )}
      <span className="text-[13.5px] leading-[1.6] text-ink/85">{children}</span>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ Inputs */

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
}

export function Field({ label, hint, className, id, ...rest }: FieldProps) {
  const auto = useId()
  const fid = id ?? auto
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={fid} className="label-mono">
        {label}
      </label>
      <input
        id={fid}
        className={cn(
          'w-full rounded-lg border border-subtle bg-deep/70 px-3.5 py-2.5 text-[14px] text-ink',
          'placeholder:text-muted/75 transition-colors duration-200',
          'hover:border-[#33455c] focus:border-signal/70 focus:outline-none focus:ring-2 focus:ring-signal/25',
        )}
        {...rest}
      />
      {hint && <p className="text-[12px] text-muted">{hint}</p>}
    </div>
  )
}

interface StemProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  stem: string
  hint?: string
  rows?: number
}

/**
 * Sentence-completion input. The stem is part of the field, not a label above
 * it — a blank page is the enemy of a 12-minute exercise.
 */
export function StemInput({ stem, hint, rows = 3, className, id, value, ...rest }: StemProps) {
  const auto = useId()
  const fid = id ?? auto
  const filled = typeof value === 'string' && value.trim().length > 0
  return (
    <div
      className={cn(
        'rounded-xl border bg-deep/50 p-4 transition-colors duration-300',
        filled ? 'border-signal/35' : 'border-subtle',
        className,
      )}
    >
      <label htmlFor={fid} className="block font-display text-[15px] font-semibold text-ink/90">
        {stem}
      </label>
      <textarea
        id={fid}
        rows={rows}
        value={value}
        className={cn(
          'mt-2.5 w-full resize-y rounded-lg border border-subtle bg-panel/80 px-3.5 py-2.5 text-[14px]',
          'leading-[1.65] text-ink placeholder:text-muted/75 transition-colors duration-200',
          'hover:border-[#33455c] focus:border-signal/70 focus:outline-none focus:ring-2 focus:ring-signal/25',
        )}
        {...rest}
      />
      {hint && <p className="mt-1.5 text-[12px] text-muted">{hint}</p>}
    </div>
  )
}

/* ------------------------------------------------------------------ Slider */

export function LabSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  leftLabel,
  rightLabel,
  readout,
  tooltip,
  tone = 'signal',
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  leftLabel?: string
  rightLabel?: string
  readout?: string
  tooltip?: string
  tone?: 'signal' | 'neuro' | 'warn'
}) {
  const id = useId()
  const pct = ((value - min) / (max - min)) * 100
  const accent = tone === 'neuro' ? 'var(--accent-neuro)' : tone === 'warn' ? 'var(--accent-warn)' : 'var(--accent-signal)'
  return (
    <div className="rounded-xl border border-subtle bg-deep/40 p-4">
      <div className="flex items-baseline justify-between gap-3">
        {tooltip ? (
          <Tip label={tooltip}>
            <label htmlFor={id} className="label-mono cursor-help border-b border-dotted border-subtle">
              {label}
            </label>
          </Tip>
        ) : (
          <label htmlFor={id} className="label-mono">
            {label}
          </label>
        )}
        <span className="readout text-[12.5px]" style={{ color: accent }}>
          {readout ?? `${Math.round(value)}%`}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="lab-range mt-3 w-full"
        style={
          {
            '--pct': `${pct}%`,
            '--accent': accent,
          } as React.CSSProperties
        }
      />
      {(leftLabel || rightLabel) && (
        <div className="mt-1.5 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------ Stage header */

export function StageHeader({
  index,
  total,
  title,
  lead,
  tone = 'signal',
}: {
  index: number
  total: number
  title: string
  lead?: string
  tone?: 'signal' | 'valid' | 'warn' | 'risk' | 'neuro'
}) {
  const reduced = useReduced()
  return (
    <motion.header variants={revealItem(reduced)} initial="hidden" animate="show" className="mb-5">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'inline-flex h-7 items-center rounded-md border px-2 font-mono text-[11px] tracking-[0.14em]',
            tone === 'signal' && 'border-signal/40 text-signal',
            tone === 'valid' && 'border-valid/40 text-valid',
            tone === 'warn' && 'border-warn/40 text-warn',
            tone === 'risk' && 'border-risk/40 text-risk',
            tone === 'neuro' && 'border-neuro/40 text-neuro',
          )}
        >
          STAGE {index}/{total}
        </span>
        <span aria-hidden className="hairline flex-1" />
      </div>
      <h2 className="mt-3 text-[24px] sm:text-[28px]">{title}</h2>
      {lead && <p className="mt-2 max-w-[68ch] text-[15px] leading-[1.7] text-muted">{lead}</p>}
    </motion.header>
  )
}
