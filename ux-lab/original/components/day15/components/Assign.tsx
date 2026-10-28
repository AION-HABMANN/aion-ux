import { useCallback, useState, type DragEvent, type KeyboardEvent, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn, useReduced } from '@/original/components/day15/lib/utils'
import { SPRING } from '@/original/components/day15/lib/motion'
import { Btn } from '@/original/components/day15/components/primitives'

/**
 * The assignment mechanic behind every sort, allocation and ranking in the app.
 *
 * Pointer drag is the *garnish*. The primitive underneath is select-then-place:
 * click or focus an item, press Enter, then choose a target. That path works
 * with a keyboard, with a screen reader, and with a thumb on a 375px phone —
 * which is also why mobile needs no separate implementation.
 */
export function useAssign(onAssign: (itemId: string, zoneId: string) => void) {
  const [selected, setSelected] = useState<string | null>(null)
  const [hoverZone, setHoverZone] = useState<string | null>(null)
  const [announce, setAnnounce] = useState('')

  const select = useCallback((id: string | null, label?: string) => {
    setSelected(id)
    setAnnounce(id && label ? `${label} picked up. Choose a target to place it.` : 'Selection cleared.')
  }, [])

  const place = useCallback(
    (zoneId: string, zoneLabel?: string, itemId?: string) => {
      const item = itemId ?? selected
      if (!item) return
      onAssign(item, zoneId)
      setSelected(null)
      setHoverZone(null)
      setAnnounce(zoneLabel ? `Placed in ${zoneLabel}.` : 'Placed.')
    },
    [onAssign, selected],
  )

  const itemProps = useCallback(
    (id: string, label: string) => ({
      draggable: true,
      tabIndex: 0,
      role: 'button' as const,
      'aria-pressed': selected === id,
      'aria-label': `${label}. ${selected === id ? 'Picked up — choose a target.' : 'Press Enter to pick up.'}`,
      onDragStart: (e: DragEvent) => {
        e.dataTransfer.setData('text/plain', id)
        e.dataTransfer.effectAllowed = 'move'
        setSelected(id)
      },
      onDragEnd: () => setHoverZone(null),
      onClick: () => select(selected === id ? null : id, label),
      onKeyDown: (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          select(selected === id ? null : id, label)
        }
        if (e.key === 'Escape') select(null)
      },
    }),
    [select, selected],
  )

  const zoneProps = useCallback(
    (zoneId: string, zoneLabel: string) => ({
      onDragOver: (e: DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        setHoverZone(zoneId)
      },
      onDragLeave: () => setHoverZone((z) => (z === zoneId ? null : z)),
      onDrop: (e: DragEvent) => {
        e.preventDefault()
        const id = e.dataTransfer.getData('text/plain') || selected
        if (id) place(zoneId, zoneLabel, id)
      },
      'data-hover': hoverZone === zoneId ? 'true' : undefined,
    }),
    [hoverZone, place, selected],
  )

  return { selected, select, place, itemProps, zoneProps, hoverZone, announce }
}

/** Screen-reader channel for the select-then-place flow. */
export function AssignLive({ message }: { message: string }) {
  return (
    <p aria-live="polite" className="sr-only">
      {message}
    </p>
  )
}

export function AssignCard({
  selected,
  placed,
  tone = 'signal',
  children,
  className,
  ...rest
}: {
  selected?: boolean
  placed?: boolean
  tone?: 'signal' | 'valid' | 'warn' | 'risk' | 'neuro'
  children: ReactNode
  className?: string
} & Record<string, unknown>) {
  const reduced = useReduced()
  const ring: Record<string, string> = {
    signal: 'border-signal/70 shadow-[0_0_0_1px_var(--accent-signal),0_10px_30px_-14px_rgba(76,201,240,0.6)]',
    valid: 'border-valid/70 shadow-[0_0_0_1px_var(--accent-valid)]',
    warn: 'border-warn/70 shadow-[0_0_0_1px_var(--accent-warn)]',
    risk: 'border-risk/70 shadow-[0_0_0_1px_var(--accent-risk)]',
    neuro: 'border-neuro/70 shadow-[0_0_0_1px_var(--accent-neuro)]',
  }
  return (
    <motion.div
      layout={!reduced}
      whileHover={reduced ? undefined : { y: -3 }}
      transition={SPRING}
      className={cn(
        'cursor-grab select-none rounded-xl border bg-panel p-4 text-left transition-colors duration-200',
        'hover:bg-elevated active:cursor-grabbing',
        selected ? ring[tone] : 'border-subtle',
        placed && 'cursor-default',
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function AssignZone({
  label,
  hint,
  tone = 'signal',
  active,
  canPlace,
  onPlace,
  count,
  children,
  className,
  ...rest
}: {
  label: string
  hint?: string
  tone?: 'signal' | 'valid' | 'warn' | 'risk' | 'neuro'
  active?: boolean
  canPlace?: boolean
  onPlace?: () => void
  count?: number
  children?: ReactNode
  className?: string
} & Record<string, unknown>) {
  const border: Record<string, string> = {
    signal: 'border-signal/60 bg-signal/[0.06]',
    valid: 'border-valid/60 bg-valid/[0.06]',
    warn: 'border-warn/60 bg-warn/[0.06]',
    risk: 'border-risk/60 bg-risk/[0.06]',
    neuro: 'border-neuro/60 bg-neuro/[0.06]',
  }
  const label_: Record<string, string> = {
    signal: 'text-signal',
    valid: 'text-valid',
    warn: 'text-warn',
    risk: 'text-risk',
    neuro: 'text-neuro',
  }
  return (
    <section
      aria-label={label}
      className={cn(
        'flex min-h-[168px] flex-col rounded-xl border border-dashed p-4 transition-all duration-200',
        active ? border[tone] : 'border-subtle bg-deep/40',
        className,
      )}
      {...rest}
    >
      <header className="mb-3 flex items-baseline justify-between gap-2">
        <h4 className={cn('font-mono text-[11px] uppercase tracking-[0.14em]', label_[tone])}>{label}</h4>
        {count !== undefined && <span className="readout text-[11px] text-muted">{count}</span>}
      </header>
      <div className="flex-1 space-y-2.5">{children}</div>
      {hint && !children && <p className="text-[12.5px] leading-relaxed text-muted">{hint}</p>}
      {canPlace && onPlace && (
        <Btn size="sm" variant={tone === 'signal' ? 'primary' : tone === 'valid' ? 'valid' : 'ghost'} className="mt-3" onClick={onPlace}>
          Place here
        </Btn>
      )}
    </section>
  )
}
