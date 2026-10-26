import { motion } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { MobileNav, Sidebar } from '@/components/Sidebar'
import { entryForPath, levelForPath, nextAfter } from '@/routes'
import { useModule, type SectionId } from '@/state/ModuleStore'
import { cn, useReduced } from '@/lib/utils'
import { SPRING } from '@/lib/motion'
import { Btn, Kicker } from '@/components/primitives'

const LEVELS = ['L1', 'L2', 'L3'] as const

function LevelIndicator() {
  const { pathname } = useLocation()
  const level = levelForPath(pathname)
  const reduced = useReduced()

  const isOn = (l: string) => (level === 'L1→L2' ? l === 'L1' || l === 'L2' : level === l)
  const isLead = (l: string) => (level === 'L1→L2' ? l === 'L2' : level === l)

  return (
    <div className="flex items-center gap-1.5" aria-label={`Current depth level: ${level ?? 'overview'}`}>
      {LEVELS.map((l) => (
        <motion.span
          key={l}
          animate={{
            opacity: isOn(l) ? 1 : 0.32,
            scale: isLead(l) && !reduced ? 1.06 : 1,
          }}
          transition={SPRING}
          className={cn(
            'rounded-md border px-2 py-1 font-mono text-[10.5px] tracking-[0.14em] transition-colors duration-300',
            isOn(l)
              ? l === 'L3'
                ? 'border-neuro/60 bg-neuro/10 text-neuro'
                : l === 'L2'
                  ? 'border-warn/60 bg-warn/10 text-warn'
                  : 'border-signal/60 bg-signal/10 text-signal'
              : 'border-subtle text-muted',
          )}
        >
          {l}
        </motion.span>
      ))}
    </div>
  )
}

function TopBar() {
  const { pathname } = useLocation()
  const entry = entryForPath(pathname)
  return (
    <header className="no-print sticky top-0 z-30 border-b border-subtle bg-deep/85 backdrop-blur-md">
      <div className="flex items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <span
            aria-hidden
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-signal/40 bg-signal/10"
          >
            <span className="block h-2 w-2 rounded-full bg-signal shadow-[0_0_10px_var(--accent-signal)]" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-[14px] font-semibold leading-tight text-ink">
              Neuro-UX Lab
            </span>
            <span className="block truncate font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Module 7 · Day 2
            </span>
          </span>
        </Link>

        <span aria-hidden className="hairline hidden flex-1 sm:block" />

        <span className="ml-auto hidden min-w-0 max-w-[38ch] truncate text-right text-[12.5px] text-muted md:block sm:ml-0">
          {entry ? `${entry.label} — ${entry.sub}` : 'Eye-tracking · Neurofeedback · BCI'}
        </span>

        <LevelIndicator />
      </div>
    </header>
  )
}

/**
 * Sticky "Continue →" bar. Also the place where a learning page reports itself
 * complete — progress is earned by finishing, not by arriving.
 */
export function ContinueBar({
  sectionId,
  label = 'Continue',
  note,
  disabled,
  disabledNote,
  onContinue,
}: {
  sectionId: SectionId
  label?: string
  note?: string
  disabled?: boolean
  disabledNote?: string
  onContinue?: () => void
}) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { setProgress } = useModule()
  const next = nextAfter(pathname)

  return (
    <div className="no-print sticky bottom-0 z-20 -mx-4 mt-12 border-t border-subtle bg-deep/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:bottom-0">
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center gap-3">
        <div className="min-w-0 flex-1">
          {disabled ? (
            <p className="text-[12.5px] text-muted">{disabledNote ?? 'Work through the beat above to continue.'}</p>
          ) : (
            <p className="text-[12.5px] text-muted">
              {note ?? (next ? `Next: ${next.label} — ${next.sub}` : 'End of module.')}
            </p>
          )}
        </div>
        <Btn
          size="md"
          disabled={disabled}
          trailing="→"
          onClick={() => {
            setProgress(sectionId, 1)
            onContinue?.()
            if (next) navigate(next.path)
            window.scrollTo({ top: 0, behavior: 'auto' })
          }}
        >
          {label}
        </Btn>
      </div>
    </div>
  )
}

/** Standard learning/playground page frame: hook, title, body. */
export function PageShell({
  kicker,
  title,
  lead,
  tone = 'signal',
  children,
  wide,
}: {
  kicker: string
  title: string
  lead?: ReactNode
  tone?: 'signal' | 'valid' | 'warn' | 'risk' | 'neuro'
  children: ReactNode
  wide?: boolean
}) {
  const reduced = useReduced()
  return (
    <div className={cn('mx-auto w-full px-4 py-8 sm:px-6 sm:py-10', wide ? 'max-w-[1180px]' : 'max-w-[1080px]')}>
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.15 : 0.35 }}
      >
        <Kicker tone={tone}>{kicker}</Kicker>
        <h1 className="mt-2 max-w-[22ch] text-[30px] leading-[1.1] sm:text-[38px]">{title}</h1>
        {lead && <div className="mt-4 max-w-[70ch] text-[16px] leading-[1.75] text-muted">{lead}</div>}
      </motion.div>
      <div className="mt-8">{children}</div>
    </div>
  )
}

export function Layout() {
  const location = useLocation()
  const reduced = useReduced()
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="flex min-h-screen bg-deep">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:border focus:border-signal/60 focus:bg-panel focus:px-4 focus:py-2 focus:text-[13px]"
      >
        Skip to content
      </a>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main id="main" ref={mainRef} className="relative flex-1 pb-20 lg:pb-0">
          <div aria-hidden className="pointer-events-none absolute inset-0 lab-grid opacity-[0.12]" />
          {/*
            Enter-only, deliberately. An AnimatePresence with mode="wait" wedges
            when a second route change lands while the first exit animation is
            still running: the incoming page mounts and is then driven to the
            exit state, leaving a fully-rendered page at opacity 0. Clicking
            through the sidebar at a normal pace is enough to trigger it. Keying
            on the pathname remounts and animates in — the same 300ms fade and
            12px slide, with no exit choreography to lose a race with.
          */}
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
