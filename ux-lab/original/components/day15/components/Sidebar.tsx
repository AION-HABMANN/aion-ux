import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { NAV } from '@/original/components/day15/routes'
import { useModule } from '@/original/components/day15/state/ModuleStore'
import { ProgressRing } from '@/original/components/day15/components/charts'
import { cn, useReduced } from '@/original/components/day15/lib/utils'
import { SPRING } from '@/original/components/day15/lib/motion'

const TONE_HEX: Record<string, string> = {
  signal: 'var(--accent-signal)',
  valid: 'var(--accent-valid)',
  warn: 'var(--accent-warn)',
  risk: 'var(--accent-risk)',
  neuro: 'var(--accent-neuro)',
}

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const { progress } = useModule()
  return (
    <nav data-app-nav className="flex flex-col gap-6" aria-label="Module sections">
      {NAV.map((group) => (
        <div key={group.key}>
          <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/80">
            {group.label}
          </p>
          <ul className="space-y-0.5">
            {group.entries.map((e) => {
              const p = progress[e.id]
              return (
                <li key={e.id}>
                  <NavLink
                    to={e.path}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cn(
                        'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200',
                        isActive ? 'bg-elevated' : 'hover:bg-elevated/60',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          aria-hidden
                          className={cn(
                            'absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full transition-opacity duration-200',
                            isActive ? 'opacity-100' : 'opacity-0',
                          )}
                          style={{ background: TONE_HEX[e.tone] }}
                        />
                        <ProgressRing
                          value={p}
                          tone={TONE_HEX[e.tone]}
                          title={`${e.label}: ${Math.round(p * 100)} percent complete`}
                        />
                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              'block truncate text-[13.5px] font-medium leading-tight transition-colors',
                              isActive ? 'text-ink' : 'text-ink/75 group-hover:text-ink',
                            )}
                          >
                            {e.label}
                          </span>
                          <span className="block truncate text-[11.5px] leading-tight text-muted">{e.sub}</span>
                        </span>
                        <span
                          className="shrink-0 font-mono text-[9.5px] tracking-[0.1em]"
                          style={{ color: p > 0 ? TONE_HEX[e.tone] : 'var(--text-muted)' }}
                        >
                          {e.level}
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function OverallReadout() {
  const { overallProgress } = useModule()
  return (
    <div className="rounded-lg border border-subtle bg-deep/60 px-3 py-2.5">
      <div className="flex items-center justify-between">
        <span className="label-mono">Module progress</span>
        <span className="readout text-[12px] text-signal">{Math.round(overallProgress * 100)}%</span>
      </div>
      <div className="mt-2 h-[4px] overflow-hidden rounded-full bg-deep">
        <motion.div
          className="h-full rounded-full bg-signal"
          initial={false}
          animate={{ width: `${overallProgress * 100}%` }}
          transition={SPRING}
        />
      </div>
      <p className="mt-2 text-[11px] leading-[1.45] text-muted">
        {overallProgress === 0
          ? 'Nothing recorded yet. Nothing leaves this browser either.'
          : overallProgress < 1
            ? 'Held in memory only. A reload is a reset.'
            : 'All sections touched. The debrief is where it adds up.'}
      </p>
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden w-[286px] shrink-0 border-r border-subtle bg-panel/50 lg:flex lg:flex-col">
      <div className="flex-1 overflow-y-auto px-3 py-6">
        <NavItems />
      </div>
      <div className="border-t border-subtle p-3">
        <OverallReadout />
      </div>
    </aside>
  )
}

/** Mobile: the same nav, delivered as a bottom sheet. */
export function MobileNav() {
  const [open, setOpen] = useState(false)
  const reduced = useReduced()
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-subtle bg-panel/95 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="flex w-full items-center justify-between px-4 py-3 text-left"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
            <span aria-hidden className="mr-2">
              ☰
            </span>
            Sections
          </span>
          <span className="text-[12px] text-muted">Tap to navigate</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-deep/80 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Module sections"
              initial={{ y: reduced ? 0 : '100%', opacity: reduced ? 0 : 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: reduced ? 0 : '100%', opacity: reduced ? 0 : 1 }}
              transition={reduced ? { duration: 0.15 } : { type: 'spring', stiffness: 260, damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[82vh] overflow-y-auto rounded-t-2xl border-t border-subtle bg-panel p-4 pb-8 lg:hidden"
            >
              <div aria-hidden className="mx-auto mb-4 h-1 w-10 rounded-full bg-subtle" />
              <NavItems onNavigate={() => setOpen(false)} />
              <div className="mt-5">
                <OverallReadout />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
