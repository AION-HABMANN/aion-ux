import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { ContinueBar, PageShell } from '@/components/day15/components/Layout'
import { Btn, Chip, Kicker, Note, Panel, Tip } from '@/components/day15/components/primitives'
import { useModule } from '@/components/day15/state/ModuleStore'
import { cn, useReduced } from '@/components/day15/lib/utils'
import { revealItem, revealList, swapIn } from '@/components/day15/lib/motion'

/* --------------------------------------------------------------- Gaze data */

interface Fixation {
  id: number
  x: number // % of stage width
  y: number // % of stage height
  ms: number
  area: string
}

// A plausible first-visit scanpath on a service portal: logo, nav, headline,
// a detour through the promo card, then the CTA — late, and briefly.
const FIXATIONS: Fixation[] = [
  { id: 1, x: 12, y: 11, ms: 180, area: 'Logo' },
  { id: 2, x: 34, y: 11, ms: 240, area: 'Primary nav' },
  { id: 3, x: 52, y: 11, ms: 310, area: 'Primary nav' },
  { id: 4, x: 22, y: 34, ms: 620, area: 'Headline' },
  { id: 5, x: 41, y: 34, ms: 410, area: 'Headline' },
  { id: 6, x: 24, y: 46, ms: 520, area: 'Body copy' },
  { id: 7, x: 74, y: 40, ms: 880, area: 'Promo card' },
  { id: 8, x: 76, y: 55, ms: 340, area: 'Promo card' },
  { id: 9, x: 28, y: 62, ms: 300, area: 'Body copy' },
  { id: 10, x: 21, y: 76, ms: 760, area: 'Primary CTA' },
  { id: 11, x: 30, y: 76, ms: 290, area: 'Primary CTA' },
  { id: 12, x: 62, y: 88, ms: 210, area: 'Footer' },
]

const CTA_MS = FIXATIONS.filter((f) => f.area === 'Primary CTA').reduce((s, f) => s + f.ms, 0)
const TOTAL_MS = FIXATIONS.reduce((s, f) => s + f.ms, 0)
const TTFF_CTA = FIXATIONS.slice(
  0,
  FIXATIONS.findIndex((f) => f.area === 'Primary CTA'),
).reduce((s, f) => s + f.ms, 0)

type View = 'fixations' | 'scanpath' | 'heatmap'

const VIEW_STORY: Record<View, string> = {
  fixations: 'Fixation view: the portal looks well-read. Twelve stops, nothing skipped.',
  scanpath: 'Scanpath view: the order tells a different story — the CTA is stop ten of twelve.',
  heatmap: 'Heatmap view: the promo card wins the page. The thing you wanted clicked barely glows.',
}

/* -------------------------------------------------------- The mock portal */

function PortalMock() {
  return (
    <div aria-hidden className="absolute inset-0 select-none p-[3%]">
      <div className="flex h-[9%] items-center gap-[4%] rounded-md border border-subtle bg-panel px-[2%]">
        <span className="h-[45%] w-[7%] rounded-sm bg-signal/50" />
        <span className="h-[30%] w-[9%] rounded-sm bg-muted/35" />
        <span className="h-[30%] w-[11%] rounded-sm bg-muted/35" />
        <span className="h-[30%] w-[8%] rounded-sm bg-muted/35" />
        <span className="ml-auto h-[45%] w-[12%] rounded-sm border border-subtle bg-elevated" />
      </div>

      <div className="mt-[3%] flex h-[78%] gap-[3%]">
        <div className="flex w-[62%] flex-col rounded-md border border-subtle bg-panel p-[4%]">
          <span className="h-[7%] w-[80%] rounded-sm bg-ink/60" />
          <span className="mt-[2%] h-[7%] w-[55%] rounded-sm bg-ink/60" />
          <span className="mt-[6%] h-[3.5%] w-[92%] rounded-sm bg-muted/30" />
          <span className="mt-[2%] h-[3.5%] w-[88%] rounded-sm bg-muted/30" />
          <span className="mt-[2%] h-[3.5%] w-[70%] rounded-sm bg-muted/30" />
          <span className="mt-[6%] h-[3.5%] w-[84%] rounded-sm bg-muted/30" />
          <span className="mt-[2%] h-[3.5%] w-[60%] rounded-sm bg-muted/30" />
          <span className="mt-auto h-[11%] w-[42%] rounded-md border border-signal/60 bg-signal/20" />
        </div>

        <div className="flex w-[35%] flex-col gap-[6%]">
          <div className="flex-1 rounded-md border border-warn/40 bg-warn/[0.09] p-[8%]">
            <span className="block h-[9%] w-[70%] rounded-sm bg-warn/60" />
            <span className="mt-[8%] block h-[6%] w-[90%] rounded-sm bg-muted/30" />
            <span className="mt-[4%] block h-[6%] w-[75%] rounded-sm bg-muted/30" />
            <span className="mt-[14%] block h-[13%] w-[55%] rounded-sm border border-warn/50 bg-warn/20" />
          </div>
          <div className="h-[38%] rounded-md border border-subtle bg-panel p-[8%]">
            <span className="block h-[12%] w-[60%] rounded-sm bg-muted/40" />
            <span className="mt-[10%] block h-[8%] w-[85%] rounded-sm bg-muted/25" />
          </div>
        </div>
      </div>

      <div className="mt-[3%] flex h-[7%] items-center gap-[3%] rounded-md border border-subtle bg-panel px-[2%]">
        <span className="h-[35%] w-[10%] rounded-sm bg-muted/25" />
        <span className="h-[35%] w-[8%] rounded-sm bg-muted/25" />
        <span className="h-[35%] w-[6%] rounded-sm bg-muted/25" />
      </div>
    </div>
  )
}

function GazeReplay({ onPlayed }: { onPlayed: () => void }) {
  const reduced = useReduced()
  const [views, setViews] = useState<Record<View, boolean>>({
    fixations: true,
    scanpath: false,
    heatmap: false,
  })
  const [step, setStep] = useState(0) // how many fixations are revealed
  const [playing, setPlaying] = useState(false)

  const played = step >= FIXATIONS.length

  useEffect(() => {
    if (!playing) return undefined
    if (step >= FIXATIONS.length) {
      setPlaying(false)
      onPlayed()
      return undefined
    }
    const id = window.setTimeout(() => setStep((s) => s + 1), reduced ? 40 : 260)
    return () => window.clearTimeout(id)
  }, [playing, step, reduced, onPlayed])

  const shown = FIXATIONS.slice(0, step)
  const pathD = shown.map((f, i) => `${i === 0 ? 'M' : 'L'}${f.x} ${f.y}`).join(' ')

  const activeStory = useMemo(() => {
    if (views.heatmap) return VIEW_STORY.heatmap
    if (views.scanpath) return VIEW_STORY.scanpath
    return VIEW_STORY.fixations
  }, [views])

  const toggle = (v: View) => setViews((s) => ({ ...s, [v]: !s[v] }))

  return (
    <Panel>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Kicker tone="signal">Interactive · gaze replay</Kicker>
          <h3 className="mt-2 text-[21px]">One recording, three ways to look at it</h3>
          <p className="mt-1.5 max-w-[58ch] text-[14px] leading-[1.65] text-muted">
            A first-time visitor on a service portal, 5.1 seconds of recording. Play it, then change
            what you render.
          </p>
        </div>
        <div className="flex gap-2">
          <Btn
            size="sm"
            onClick={() => {
              if (played) {
                setStep(0)
                setPlaying(true)
              } else {
                setPlaying((p) => !p)
              }
            }}
            icon={playing ? '❚❚' : played ? '↺' : '▶'}
          >
            {playing ? 'Pause' : played ? 'Replay' : 'Play'}
          </Btn>
          <Btn
            size="sm"
            variant="ghost"
            onClick={() => {
              setPlaying(false)
              setStep(FIXATIONS.length)
              onPlayed()
            }}
          >
            Show all
          </Btn>
        </div>
      </div>

      {/* stage */}
      <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-xl border border-subtle bg-deep">
        <PortalMock />

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label={`Gaze overlay: ${step} of ${FIXATIONS.length} fixations rendered`}
        >
          <defs>
            <filter id="heat-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.2" />
            </filter>
            <radialGradient id="heat-grad">
              <stop offset="0%" stopColor="#ef5d6b" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#f5b841" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4cc9f0" stopOpacity="0" />
            </radialGradient>
          </defs>

          {views.heatmap && (
            <g filter="url(#heat-blur)" style={{ mixBlendMode: 'screen' }}>
              {shown.map((f) => (
                <motion.circle
                  key={`h${f.id}`}
                  cx={f.x}
                  cy={f.y}
                  r={5 + (f.ms / 880) * 11}
                  fill="url(#heat-grad)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.55 + (f.ms / 880) * 0.4 }}
                  transition={{ duration: reduced ? 0.15 : 0.5 }}
                />
              ))}
            </g>
          )}

          {views.scanpath && shown.length > 1 && (
            <motion.path
              d={pathD}
              fill="none"
              stroke="var(--accent-signal)"
              strokeWidth="0.45"
              strokeOpacity="0.85"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: reduced ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduced ? 0 : 0.45 }}
            />
          )}

          {views.fixations &&
            shown.map((f, i) => (
              <motion.g
                key={f.id}
                initial={{ opacity: 0, scale: reduced ? 1 : 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: reduced ? 0.15 : 0.36,
                  delay: reduced ? 0 : Math.min(i * 0.06, 0.4),
                }}
                style={{ transformOrigin: `${f.x}px ${f.y}px` }}
              >
                <circle
                  cx={f.x}
                  cy={f.y}
                  r={1.6 + (f.ms / 880) * 3.4}
                  fill="var(--accent-signal)"
                  fillOpacity="0.22"
                  stroke="var(--accent-signal)"
                  strokeWidth="0.3"
                  vectorEffect="non-scaling-stroke"
                />
                <text
                  x={f.x}
                  y={f.y + 0.7}
                  textAnchor="middle"
                  fontSize="2"
                  fill="var(--accent-signal)"
                  className="font-mono"
                >
                  {f.id}
                </text>
              </motion.g>
            ))}
        </svg>

        {step === 0 && (
          <div className="absolute inset-0 grid place-items-center bg-deep/55 backdrop-blur-[1px]">
            <p className="rounded-lg border border-subtle bg-panel/90 px-4 py-2.5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted">
              {playing ? 'Rendering fixations…' : 'No gaze rendered yet'}
            </p>
          </div>
        )}
      </div>

      {/* toggles */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {(
          [
            ['fixations', 'Fixations', 'Where the gaze paused long enough to take something in — typically 100–300 ms. Dot size here scales with dwell.'],
            ['scanpath', 'Scanpath', 'The order of fixations, joined by the saccades between them. Order is the part a heatmap destroys.'],
            ['heatmap', 'Heatmap', 'Accumulated dwell, blurred into a gradient. Beautiful, persuasive, and the least analytically honest of the three.'],
          ] as [View, string, string][]
        ).map(([key, label, tip]) => (
          <Tip key={key} label={tip}>
            <Chip active={views[key]} tone={key === 'heatmap' ? 'warn' : 'signal'} onClick={() => toggle(key)}>
              {label}
            </Chip>
          </Tip>
        ))}
        <span aria-hidden className="hairline mx-1 hidden flex-1 sm:block" />
        <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
          {Object.values(views).filter(Boolean).length} layer
          {Object.values(views).filter(Boolean).length === 1 ? '' : 's'} on
        </span>
      </div>

      {/* readout */}
      <div className="mt-4 grid gap-3 rounded-xl border border-subtle bg-deep/60 p-4 sm:grid-cols-4">
        {[
          {
            l: 'Time to first fixation · CTA',
            v: step >= 10 ? `${(TTFF_CTA / 1000).toFixed(2)}s` : '—',
            tip: 'How long before the gaze first landed on the primary call to action. Late arrival is a hierarchy signal, not a comprehension one.',
          },
          {
            l: 'Total fixations',
            v: `${step}`,
            tip: 'Count of gaze pauses in the recording. More fixations can mean thorough reading or a failed search. The count alone does not distinguish them.',
          },
          {
            l: 'Dwell time · CTA',
            v: step >= 11 ? `${(CTA_MS / 1000).toFixed(2)}s` : '—',
            tip: 'Summed fixation duration inside the CTA region — here 1.05s of 5.06s total, about 21% of the visit.',
          },
          {
            l: 'Recording length',
            v: `${(FIXATIONS.slice(0, step).reduce((s, f) => s + f.ms, 0) / 1000).toFixed(2)}s`,
            tip: `Summed fixation time rendered so far, of ${(TOTAL_MS / 1000).toFixed(2)}s total. Saccade time is excluded — the eye is functionally blind mid-jump.`,
          },
        ].map((r) => (
          <div key={r.l}>
            <Tip label={r.tip}>
              <span className="label-mono cursor-help border-b border-dotted border-subtle">{r.l}</span>
            </Tip>
            <p className="readout mt-1.5 text-[20px] leading-none text-signal">{r.v}</p>
          </div>
        ))}
      </div>

      <motion.p
        key={activeStory}
        {...swapIn(reduced)}
        className="mt-4 text-[14.5px] leading-[1.6] text-ink/80"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-warn">
          Same data. Three different stories. ·{' '}
        </span>
        {activeStory}
      </motion.p>
    </Panel>
  )
}

/* ------------------------------------------------------------ Vocabulary */

const VOCAB = [
  {
    term: 'Fixation',
    def: 'A pause of the gaze, roughly 100–300 ms, long enough for the visual system to actually process what is there.',
    exec: 'The only moment information intake plausibly happens. Everything else is transport.',
  },
  {
    term: 'Saccade',
    def: 'The ballistic jump between fixations, 20–40 ms. Vision is largely suppressed during it.',
    exec: 'Nobody reads during a saccade. A "path across the page" is not a path of attention.',
  },
  {
    term: 'Scanpath',
    def: 'The ordered sequence of fixations and saccades — where the eye went, in what order.',
    exec: 'The order is where hierarchy problems surface. It is also the first thing a heatmap deletes.',
  },
  {
    term: 'Area of interest',
    def: 'A region you draw on the stimulus before analysis, so dwell can be counted per element.',
    exec: 'Drawn by a human, before the numbers exist. Change the boxes, change the finding.',
  },
  {
    term: 'Time to first fixation',
    def: 'How long until a given region is first looked at.',
    exec: 'The most defensible single number in the toolkit. It measures noticing, not understanding.',
  },
]

function VocabStrip() {
  const [open, setOpen] = useState(0)
  const reduced = useReduced()
  return (
    <Panel>
      <Kicker tone="signal">The five words vendors use around you</Kicker>
      <h3 className="mt-2 text-[20px]">Know what each one licenses you to say</h3>
      <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,240px)_1fr]">
        <ul className="flex flex-wrap gap-2 lg:flex-col">
          {VOCAB.map((v, i) => (
            <li key={v.term}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-current={open === i}
                className={cn(
                  'w-full rounded-lg border px-3 py-2 text-left font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-200',
                  open === i
                    ? 'border-signal/55 bg-signal/10 text-signal'
                    : 'border-subtle bg-elevated/40 text-muted hover:text-ink',
                )}
              >
                {v.term}
              </button>
            </li>
          ))}
        </ul>
        <div className="rounded-xl border border-subtle bg-deep/50 p-5">
          <motion.div key={VOCAB[open].term} {...swapIn(reduced)}>
            <p className="text-[16px] leading-[1.6] text-ink">{VOCAB[open].def}</p>
            <p className="mt-4 border-t border-subtle pt-3 text-[13.5px] leading-[1.6] text-muted">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-valid">
                For you ·{' '}
              </span>
              {VOCAB[open].exec}
            </p>
          </motion.div>
        </div>
      </div>
    </Panel>
  )
}

/* -------------------------------------------------------------------- Page */

export function Foundations() {
  const reduced = useReduced()
  const { setProgress } = useModule()
  const [played, setPlayed] = useState(false)

  useEffect(() => setProgress('foundations', 0.15), [setProgress])

  return (
    <PageShell
      kicker="Learning · 01 · L1"
      title="What eye-tracking actually measures."
      lead={
        <>
          Before the criticism, the competence. Eye-tracking is a real instrument with a real output,
          and you should be able to read one without help. This section gives you the vocabulary, the
          three standard visualisations, and the four numbers that will be quoted at you — starting
          with the fact that <span className="text-signal">all three visualisations come from the
          same recording</span>.
        </>
      }
    >
      <motion.div variants={revealList(reduced)} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={revealItem(reduced)}>
          <Panel>
            <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
              <div>
                <Kicker>The concept</Kicker>
                <h3 className="mt-2 text-[21px]">Measurement and analysis of gaze behaviour</h3>
                <div className="prose-lab mt-3">
                  <p>
                    An eye-tracker samples the position of the gaze — typically 30 to 120 times a
                    second — and maps it onto whatever the person is looking at. Analysis then
                    segments that stream into <strong>fixations</strong> (pauses where intake is
                    plausible) and <strong>saccades</strong> (the jumps between them), and aggregates
                    dwell against regions you defined in advance.
                  </p>
                  <p>
                    That last clause carries more weight than it looks like. Areas of interest are
                    drawn by a researcher <em>before</em> any number exists. Move the boxes and the
                    percentages move with them. The output feels automatic; the framing is authored.
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-subtle bg-deep/50 p-5">
                <Kicker tone="valid">Where it genuinely earns its cost</Kicker>
                <ul className="mt-3 space-y-3">
                  {[
                    ['Navigation & IA', 'Whether people find the entry point you designed as the entry point — and in what order they consider the alternatives.'],
                    ['Prioritisation', 'Which elements win the first two seconds of a page. Useful for hierarchy decisions, silent on value.'],
                    ['Prototype testing', 'Comparing two layouts on the same task, with the same participants. Relative differences are far more defensible than absolute numbers.'],
                    ['Missed-element detection', 'The strongest claim in the toolkit: nobody looked at it. Not seeing something is much easier to establish than understanding it.'],
                  ].map(([t, d]) => (
                    <li key={t}>
                      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-signal">{t}</p>
                      <p className="mt-1 text-[13.5px] leading-[1.6] text-muted">{d}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Panel>
        </motion.div>

        <motion.div variants={revealItem(reduced)}>
          <GazeReplay
            onPlayed={() => {
              setPlayed(true)
              setProgress('foundations', 0.7)
            }}
          />
        </motion.div>

        <motion.div variants={revealItem(reduced)}>
          <VocabStrip />
        </motion.div>

        <motion.div variants={revealItem(reduced)}>
          <Panel className="border-valid/25">
            <Kicker tone="valid">Executive implication</Kicker>
            <h3 className="mt-2 text-[22px]">Which visualisation you are shown is a decision someone made</h3>
            <p className="mt-3 max-w-[74ch] text-[15px] leading-[1.7] text-ink/80">
              A heatmap is the most persuasive and the least informative of the three. It aggregates
              across participants, discards order, and produces a warm glow that looks like consensus.
              A scanpath is harder to read and tells you far more — including, frequently, that your
              call to action was found tenth.
            </p>
            <Note tone="signal" label="Ask in the meeting" className="mt-4">
              "Is this one participant or the aggregate, and can I see the scanpath?" Two questions,
              fifteen seconds, and they change what the deck is allowed to claim.
            </Note>
          </Panel>
        </motion.div>
      </motion.div>

      <ContinueBar
        sectionId="foundations"
        disabled={!played}
        disabledNote="Play the gaze replay first — the rest of the module assumes you have watched a scanpath assemble itself."
        note="Next: Method limits — the section this one was built to set up."
      />
    </PageShell>
  )
}
