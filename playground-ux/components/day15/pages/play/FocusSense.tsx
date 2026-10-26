import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageShell } from '@/components/day15/components/Layout'
import { Btn, Chip, Kicker, Note, Panel, StageHeader, StemInput, Tip } from '@/components/day15/components/primitives'
import { AssignCard, AssignLive, AssignZone, useAssign } from '@/components/day15/components/Assign'
import { Radar, type RadarAxis } from '@/components/day15/components/charts'
import { useModule } from '@/components/day15/state/ModuleStore'
import { cn, useReduced } from '@/components/day15/lib/utils'
import { SPRING, revealItem, revealList, swapIn } from '@/components/day15/lib/motion'

/* ------------------------------------------------------------- Domain data */

type Zone = 'knowledge' | 'overextension'

interface Finding {
  id: string
  claim: string
  source: string
  lean: Zone | 'either'
  licenses: string
  doesNot: string
  onKnowledge: string
  onOverextension: string
}

const FINDINGS: Finding[] = [
  {
    id: 'f1',
    claim:
      'Users fixate on the sidebar navigation before the main content — our IA hierarchy is inverted.',
    source: 'Scanpath analysis · n=14 · first 3s of session',
    lean: 'either',
    licenses:
      'That the sidebar wins the first fixations. That is a clean, reproducible measurement and worth knowing.',
    doesNot:
      'That the hierarchy is inverted. Left-positioned, high-contrast elements attract early fixations in almost every layout, on almost every task — including layouts whose hierarchy works. Early gaze follows position and contrast at least as much as it follows importance.',
    onKnowledge:
      'Defensible if you keep the claim at the level you measured it: the sidebar is fixated first. The second half of that sentence — "our hierarchy is inverted" — is a design verdict the scanpath cannot issue. Split the sentence in the report and this one holds.',
    onOverextension:
      'Fair call, and note what you are throwing away with it: the measurement itself is solid. The move is not to discard the finding but to demote it — from a verdict about hierarchy to an observation about position, testable against a variant where the sidebar is not first in reading order.',
  },
  {
    id: 'f2',
    claim:
      'The neurofeedback signal shows elevated load on the quiz screen — the quiz is too hard.',
    source: 'EEG-derived load index · n=9 · aggregated per screen',
    lean: 'overextension',
    licenses:
      'That the derived index was higher on this screen than on others, for this small group, under lab conditions.',
    doesNot:
      'That the quiz is too hard. Elevated cognitive load on a quiz is the expected result — a quiz that produced no load would be the finding. Load is also not valenced: productive effort and frustrated confusion look similar on a load index. And per-individual inference from consumer-grade EEG is not established.',
    onKnowledge:
      'This is the one that ends up in the deck as "neuro-validated". Two problems stack here: the signal does not distinguish productive effort from confusion, and a quiz screen showing more load than a reading screen is what a working quiz looks like. Completion rates and item analysis would answer the actual question for a fraction of the cost.',
    onOverextension:
      'Yes. The measurement may well be real; the conclusion is unlicensed twice over — once on validity, once on interpretation. Worth saying out loud in the review: "elevated load on a quiz is the expected result, not the problem."',
  },
  {
    id: 'f3',
    claim: "87% of users never fixated on the 'Help' link — it is effectively invisible.",
    source: 'Area-of-interest analysis · n=23 · full session',
    lean: 'knowledge',
    licenses:
      'That almost nobody looked at it. Absence of fixation is the strongest claim in the eye-tracking toolkit — far easier to establish than comprehension, and robust to most interpretation problems.',
    doesNot:
      'That it needs to be more prominent. Nobody looked because nobody got stuck may be the better reading. "Invisible" and "unnecessary" produce identical data.',
    onKnowledge:
      'Agreed, and this is the finding to spend on. One caveat for the report: pair it with whether those users needed help. An unused help link on a task everyone completed is a success, not a visibility defect.',
    onOverextension:
      'Stricter than necessary. Non-fixation is the most defensible measurement here — the gaze data genuinely establishes that the link was not looked at. The overreach is only in the word "invisible", and that is a one-word fix rather than a discarded finding.',
  },
  {
    id: 'f4',
    claim: "Gaze dwell time on the instructor video is low — learners don't value video content.",
    source: 'Dwell time per AOI · n=23 · normalised per screen',
    lean: 'overextension',
    licenses: 'That the eyes were not on the video player for much of its runtime.',
    doesNot:
      'Anything about the value of video. Video is largely an audio medium with a picture attached; people listen while looking elsewhere, take notes, or stare past the screen. Low gaze dwell during video is compatible with complete attention and with none at all.',
    onKnowledge:
      'This is the most expensive error on the board, because it is one step from cutting a content format. The instrument measures where eyes point; audio attention is invisible to it entirely. Playback completion and a single recall question would settle this in a day.',
    onOverextension:
      'Correct, and the reason generalises: eye-tracking is blind to every channel that is not visual. Any conclusion about audio, memory or motivation drawn from gaze alone inherits that blindness.',
  },
  {
    id: 'f5',
    claim:
      'Scanpaths on the dashboard are erratic — users don\'t know what to do next; we should test a guided variant.',
    source: 'Scanpath entropy · n=14 · dashboard entry screen',
    lean: 'either',
    licenses:
      'That scanpaths on this screen are less structured than on others. And, importantly, it ends in a test rather than a change.',
    doesNot:
      'That users do not know what to do. Erratic scanning also describes browsing, comparing options, and idle exploration by someone perfectly oriented.',
    onKnowledge:
      'The strongest reason to call this knowledge is the last clause: it converts an ambiguous observation into a testable variant instead of a redesign mandate. That is exactly what an ambiguous signal is for. Keep the "we should test" — the moment it becomes "we should build", it moves zones.',
    onOverextension:
      'Reasonable — "users don\'t know what to do next" is an inference, not a measurement. But notice the difference between this and finding 2: this one proposes a test. An unlicensed inference that generates a hypothesis costs a prototype; one that generates a redesign costs a quarter.',
  },
]

const DIMENSIONS = [
  { id: 'knowledge', label: 'Knowledge value', tone: 'valid' as const, explain: 'Does this tell us something we did not know, at a level the method supports?' },
  { id: 'interpretation', label: 'Interpretation risk', tone: 'warn' as const, explain: 'How much unstated inference sits between the measurement and the claim?' },
  { id: 'ethics', label: 'Ethics', tone: 'risk' as const, explain: 'Does acting on this raise consent, voluntariness or sensitivity questions?' },
  { id: 'acceptance', label: 'Acceptance', tone: 'neuro' as const, explain: 'Will users and internal stakeholders accept both the method and the conclusion?' },
  { id: 'feasibility', label: 'Feasibility', tone: 'signal' as const, explain: 'Can this be acted on with the team, budget and time that actually exist?' },
  { id: 'relevance', label: 'Decision relevance', tone: 'valid' as const, explain: 'Would a decision genuinely change if this finding went the other way?' },
]

const PRESSURE = [
  'Leadership wants a summary by Friday.',
  "Marketing already put 'neuro-validated' in the deck.",
  'Can we just say the heatmap proves it?',
  'The vendor offered a case study slot if we publish results this quarter.',
  'Product asked whether the Focus Score can go on the team dashboard.',
]

/* ------------------------------------------------------------ Pressure ticker */

function PressureTicker({ active }: { active: boolean }) {
  const reduced = useReduced()
  const [i, setI] = useState(-1)

  useEffect(() => {
    if (!active) return undefined
    // Appears at intervals, never on a countdown. Rigour should feel expensive,
    // not timed.
    const first = window.setTimeout(() => setI(0), 9000)
    const cycle = window.setInterval(() => setI((n) => (n + 1) % PRESSURE.length), 21000)
    return () => {
      window.clearTimeout(first)
      window.clearInterval(cycle)
    }
  }, [active])

  if (!active || i < 0) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="no-print pointer-events-none fixed inset-x-0 bottom-14 z-30 flex justify-center px-4 lg:bottom-4"
    >
      <motion.p
        key={i}
        {...swapIn(reduced)}
        className="max-w-[92vw] truncate rounded-full border border-warn/30 bg-panel/95 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-warn/90 shadow-[0_14px_34px_-20px_rgba(0,0,0,0.95)] backdrop-blur"
      >
        <span aria-hidden className="mr-2 opacity-70">
          ◂
        </span>
        {PRESSURE[i]}
      </motion.p>
    </div>
  )
}

/* ------------------------------------------------------- Stage 1 · seduction */

function TrustDial({
  value,
  onChange,
  idSuffix,
}: {
  value: number | null
  onChange: (v: number) => void
  idSuffix: string
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Trust rating from 1 to 10">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            id={`trust-${idSuffix}-${n}`}
            onClick={() => onChange(n)}
            aria-pressed={value === n}
            className={cn(
              'h-11 w-11 rounded-lg border font-mono text-[13px] transition-all duration-200',
              value === n
                ? 'border-signal bg-signal/20 text-signal shadow-[0_0_18px_-6px_var(--accent-signal)]'
                : 'border-subtle bg-deep/60 text-muted hover:border-[#33455c] hover:text-ink',
            )}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
        <span>1 · would not cite it</span>
        <span>10 · would design against it</span>
      </div>
    </div>
  )
}

function SeductionDashboard() {
  const reduced = useReduced()
  return (
    <div className="relative overflow-hidden rounded-xl border border-signal/25 bg-gradient-to-br from-[#0d1926] to-[#0a0e14] p-5 sm:p-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 lab-grid opacity-20" />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
              FocusSense · attention intelligence
            </p>
            <h3 className="mt-1 font-display text-[22px] text-ink">Objective. Measurable. Unambiguous.</h3>
          </div>
          <span className="rounded-full border border-signal/40 bg-signal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-signal">
            live · 23 sessions
          </span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-signal/25 bg-panel/70 p-4">
            <p className="label-mono">Focus score</p>
            <div className="mt-1 flex items-end gap-2">
              <motion.span
                className="readout text-[42px] leading-none text-signal"
                initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={SPRING}
              >
                73
              </motion.span>
              <span className="mb-1 font-mono text-[11px] text-valid">▲ 6 pts</span>
            </div>
            <p className="mt-1.5 text-[11.5px] text-muted">vs. previous cohort</p>
          </div>

          <div className="rounded-xl border border-subtle bg-panel/70 p-4">
            <p className="label-mono">Overload index</p>
            <div className="mt-1 flex items-end gap-2">
              <span className="readout text-[42px] leading-none text-warn">0.41</span>
            </div>
            <p className="mt-1.5 text-[11.5px] text-muted">peaks on quiz screen</p>
          </div>

          <div className="rounded-xl border border-subtle bg-panel/70 p-4">
            <p className="label-mono">Attention coverage</p>
            <div className="mt-1 flex items-end gap-2">
              <span className="readout text-[42px] leading-none text-ink">62%</span>
            </div>
            <p className="mt-1.5 text-[11.5px] text-muted">of primary content AOIs</p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-subtle bg-panel/70 p-4">
            <p className="label-mono">Aggregate heatmap · learning portal</p>
            <div className="relative mt-3 h-[132px] overflow-hidden rounded-lg border border-subtle bg-deep">
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
                <defs>
                  <filter id="fs-blur">
                    <feGaussianBlur stdDeviation="2.6" />
                  </filter>
                  <radialGradient id="fs-heat">
                    <stop offset="0%" stopColor="#ef5d6b" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#f5b841" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#4cc9f0" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <g filter="url(#fs-blur)" style={{ mixBlendMode: 'screen' }}>
                  {[
                    [22, 12, 9],
                    [30, 20, 6],
                    [72, 15, 11],
                    [60, 30, 5],
                    [18, 30, 4],
                  ].map(([x, y, r], i) => (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={r}
                      fill="url(#fs-heat)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.85 }}
                      transition={{ delay: reduced ? 0 : 0.2 + i * 0.12, duration: 0.6 }}
                    />
                  ))}
                </g>
              </svg>
            </div>
          </div>

          <div className="rounded-xl border border-subtle bg-panel/70 p-4">
            <p className="label-mono">Headline claims</p>
            <ul className="mt-2.5 space-y-2 text-[12.5px] leading-[1.5] text-ink/80">
              {[
                'Attention is now a measurable KPI.',
                'Design decisions grounded in truth data.',
                'No more opinion-driven debates.',
              ].map((c) => (
                <li key={c} className="flex gap-2">
                  <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-signal" />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-subtle pt-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              source · project brief, p.2
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------- Page */

export function FocusSense() {
  const reduced = useReduced()
  const { setProgress, focusSense, setFocusSense } = useModule()

  const [stage, setStage] = useState(1)
  const [trustBefore, setTrustBefore] = useState<number | null>(focusSense.trustBefore)
  const [trustAfter, setTrustAfter] = useState<number | null>(focusSense.trustAfter)
  const [sorted, setSorted] = useState<Record<string, Zone>>(focusSense.sorted)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [reviewStep, setReviewStep] = useState(0)
  const [tags, setTags] = useState<Record<string, string[]>>(focusSense.tags)
  const [statements, setStatements] = useState(focusSense.statements)
  const [priorities, setPriorities] = useState<{ opportunities: string[]; risks: string[] }>({
    opportunities: focusSense.opportunities,
    risks: focusSense.risks,
  })

  const stageRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const advance = useCallback((to: number) => {
    setStage((s) => Math.max(s, to))
    window.setTimeout(() => {
      stageRefs.current[to]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }, [])

  useEffect(() => setProgress('focussense', 0.1), [setProgress])

  /* ---- stage 2 sorting ---- */
  const assign = useAssign((itemId, zoneId) => {
    setSorted((s) => ({ ...s, [itemId]: zoneId as Zone }))
  })
  const unsorted = FINDINGS.filter((f) => !sorted[f.id])
  const allSorted = unsorted.length === 0

  useEffect(() => {
    if (!allSorted || !reviewOpen) return undefined
    if (reviewStep >= FINDINGS.length) return undefined
    const id = window.setTimeout(() => setReviewStep((s) => s + 1), reduced ? 200 : 1100)
    return () => window.clearTimeout(id)
  }, [allSorted, reviewOpen, reviewStep, reduced])

  /* ---- stage 3 radar ---- */
  const radarAxes: RadarAxis[] = useMemo(() => {
    const counts: Record<string, number> = {}
    Object.values(tags).forEach((list) => list.forEach((t) => (counts[t] = (counts[t] ?? 0) + 1)))
    return DIMENSIONS.map((d) => ({
      key: d.id,
      label: d.label.split(' ')[0],
      value: Math.min(1, (counts[d.id] ?? 0) / FINDINGS.length),
      explain: d.explain,
    }))
  }, [tags])

  const taggedCount = Object.values(tags).filter((t) => t.length > 0).length

  /* ---- stage 4 live category detection ---- */
  const STATEMENT_SIGNALS: Record<string, string[]> = {
    knowledge: ['know', 'learn', 'evidence', 'insight', 'finding', 'data show'],
    interpretation: ['interpret', 'assume', 'infer', 'why', 'cause', 'conclusion', 'narrative', 'misread'],
    ethics: ['ethic', 'consent', 'privacy', 'data protection', 'voluntar', 'withdraw', 'gdpr'],
    acceptance: ['accept', 'trust', 'stakeholder', 'user', 'team', 'buy-in', 'resist'],
    feasibility: ['budget', 'time', 'cost', 'effort', 'capacity', 'resource', 'feasib'],
    relevance: ['decision', 'decide', 'roadmap', 'priorit', 'invest', 'change'],
  }
  const statementText = `${statements.truth} ${statements.misread} ${statements.before}`.toLowerCase()
  const touched = DIMENSIONS.filter((d) => STATEMENT_SIGNALS[d.id].some((s) => statementText.includes(s)))
  const statementsFilled = Object.values(statements).filter((v) => v.trim().length > 12).length

  /* ---- stage 5 priorities ---- */
  const PRIORITY_POOL = [
    { id: 'p1', kind: 'opportunity', text: 'Non-fixation data on the Help link — a defensible, cheap visibility fix' },
    { id: 'p2', kind: 'opportunity', text: 'Comparative prototype testing: two IA variants, same task, same participants' },
    { id: 'p3', kind: 'opportunity', text: 'Scanpath entropy as a trigger for a guided-dashboard experiment' },
    { id: 'p4', kind: 'opportunity', text: 'A shared vocabulary in the team for finding vs. reading' },
    { id: 'p5', kind: 'risk', text: 'The load index becoming a KPI before it is validated' },
    { id: 'p6', kind: 'risk', text: '"Neuro-validated" leaving the building in marketing material' },
    { id: 'p7', kind: 'risk', text: 'Cutting video content on the basis of gaze dwell alone' },
    { id: 'p8', kind: 'risk', text: 'Consent obtained as part of a mandatory training portal' },
  ]
  const priorityAssign = useAssign((itemId, zoneId) => {
    setPriorities((p) => {
      const next = {
        opportunities: p.opportunities.filter((x) => x !== itemId),
        risks: p.risks.filter((x) => x !== itemId),
      }
      if (zoneId === 'opportunities' && next.opportunities.length < 2) next.opportunities.push(itemId)
      if (zoneId === 'risks' && next.risks.length < 2) next.risks.push(itemId)
      return next
    })
  })
  const prioritiesDone = priorities.opportunities.length === 2 && priorities.risks.length === 2

  /* ---- publish to the store for /debrief ---- */
  useEffect(() => {
    setFocusSense({
      trustBefore,
      trustAfter,
      sorted,
      tags,
      statements,
      opportunities: priorities.opportunities.map((id) => PRIORITY_POOL.find((p) => p.id === id)?.text ?? id),
      risks: priorities.risks.map((id) => PRIORITY_POOL.find((p) => p.id === id)?.text ?? id),
      completed: trustAfter !== null,
    })
    // PRIORITY_POOL is a module-level constant in practice; excluded deliberately.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trustBefore, trustAfter, sorted, tags, statements, priorities, setFocusSense])

  const delta = trustBefore !== null && trustAfter !== null ? trustAfter - trustBefore : null

  return (
    <>
      <PressureTicker active={stage >= 2 && trustAfter === null} />

      <PageShell
        wide
        kicker="Playground 01 · L1 → L2 · 12 min"
        title="FocusSense"
        lead={
          <>
            An innovation project for a digital learning portal. Eye-tracking will reveal what users
            see first and where they get lost; a neurofeedback layer will flag concentration and
            overload. The brief promises <span className="text-signal">"objective truth data"</span>{' '}
            about the user experience.
          </>
        }
      >
        {/* animated brief */}
        <motion.div variants={revealList(reduced, 0.1)} initial="hidden" animate="show" className="mb-8">
          <Panel className="border-signal/20">
            <Kicker tone="signal">Project brief</Kicker>
            <ul className="mt-3 space-y-2.5">
              {[
                'The team wants to base design decisions heavily on measurement data.',
                'It is unclear how robust that data is in real usage.',
                'Data protection, ethics and acceptance have barely been considered.',
                'You are the most senior person who will read this before it becomes a plan.',
              ].map((line) => (
                <motion.li key={line} variants={revealItem(reduced)} className="flex gap-3">
                  <span aria-hidden className="mt-[10px] h-1 w-4 shrink-0 rounded-full bg-signal/60" />
                  <span className="text-[15px] leading-[1.6] text-ink/85">{line}</span>
                </motion.li>
              ))}
            </ul>
          </Panel>
        </motion.div>

        {/* ------------------------------------------------------ stage 1 */}
        <div ref={(el) => { stageRefs.current[1] = el; }}>
          <StageHeader
            index={1}
            total={6}
            title="The dashboard, as the team would present it"
            lead="Read it the way you would read it on a Tuesday, with four other things on your mind."
          />
          <SeductionDashboard />

          <Panel className="mt-4">
            <p className="font-display text-[19px] leading-[1.4] text-ink">
              On a scale of 1–10, how much would you trust this to drive design decisions?
            </p>
            <div className="mt-4">
              <TrustDial value={trustBefore} onChange={setTrustBefore} idSuffix="before" />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Btn
                disabled={trustBefore === null}
                onClick={() => {
                  advance(2)
                  setProgress('focussense', 0.2)
                }}
                trailing="→"
              >
                Record and continue
              </Btn>
              <p className="text-[12.5px] text-muted">
                {trustBefore === null
                  ? 'No number yet. The exercise needs one, and it needs it before the critique.'
                  : 'Recorded. No comment on it — not yet.'}
              </p>
            </div>
          </Panel>
        </div>

        {/* ------------------------------------------------------ stage 2 */}
        {stage >= 2 && (
          <div ref={(el) => { stageRefs.current[2] = el; }} className="mt-12">
            <AssignLive message={assign.announce} />
            <StageHeader
              index={2}
              total={6}
              tone="warn"
              title="Sort five findings"
              lead="Real knowledge gain, or problematic overextension? At least two of these are genuinely arguable — the sorting matters less than being able to say why afterwards."
            />

            <div className="rounded-xl border border-subtle bg-deep/40 p-4">
              <div className="mb-3 flex items-baseline justify-between">
                <p className="label-mono">Unsorted findings</p>
                <span className="readout text-[11px] text-muted">
                  {unsorted.length}/{FINDINGS.length}
                </span>
              </div>
              {unsorted.length === 0 ? (
                <p className="text-[13px] text-muted">
                  All five placed. Nothing was checked as you went — that was deliberate.
                </p>
              ) : (
                <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">
                  {unsorted.map((f) => (
                    <AssignCard
                      key={f.id}
                      selected={assign.selected === f.id}
                      {...assign.itemProps(f.id, f.claim)}
                    >
                      <p className="text-[13.5px] font-medium leading-[1.5] text-ink">{f.claim}</p>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                        {f.source}
                      </p>
                    </AssignCard>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {(
                [
                  ['knowledge', 'Real knowledge gain', 'valid', 'Findings the method can actually license — worth spending on.'],
                  ['overextension', 'Problematic overextension', 'warn', 'Claims that outrun what was measured, however good the recording is.'],
                ] as const
              ).map(([zid, zlabel, tone, hint]) => {
                const items = FINDINGS.filter((f) => sorted[f.id] === zid)
                return (
                  <AssignZone
                    key={zid}
                    label={zlabel}
                    tone={tone}
                    count={items.length}
                    hint={hint}
                    active={assign.hoverZone === zid || (assign.selected !== null && items.length === 0)}
                    canPlace={assign.selected !== null}
                    onPlace={() => assign.place(zid, zlabel)}
                    {...assign.zoneProps(zid, zlabel)}
                  >
                    {items.map((f) => (
                      <motion.div
                        key={f.id}
                        layout={!reduced}
                        transition={SPRING}
                        className="rounded-lg border border-subtle bg-panel p-3"
                      >
                        <p className="text-[13px] leading-[1.5] text-ink/90">{f.claim}</p>
                        {!reviewOpen && (
                          <button
                            type="button"
                            onClick={() => setSorted((s) => {
                              const n = { ...s }
                              delete n[f.id]
                              return n
                            })}
                            className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted hover:text-ink"
                          >
                            ↩ take back
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </AssignZone>
                )
              })}
            </div>

            {allSorted && !reviewOpen && (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Btn variant="ghost" onClick={() => setReviewOpen(true)} trailing="→">
                  Roll in the review
                </Btn>
                <p className="text-[12.5px] text-muted">
                  Five placements, no verdicts so far. The review comes card by card, and it is about
                  what the data licenses — not about your score.
                </p>
              </div>
            )}

            {reviewOpen && (
              <div className="mt-5 space-y-3">
                {FINDINGS.slice(0, reviewStep).map((f) => {
                  const placed = sorted[f.id]
                  const aligned = f.lean === 'either' || f.lean === placed
                  return (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reduced ? 0.15 : 0.45 }}
                      className={cn(
                        'rounded-xl border p-5',
                        f.lean === 'either'
                          ? 'border-signal/30 bg-panel'
                          : aligned
                            ? 'border-valid/30 bg-panel'
                            : 'border-warn/35 bg-panel',
                      )}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="text-[15px] font-semibold leading-[1.45] text-ink">{f.claim}</p>
                        <span
                          className={cn(
                            'shrink-0 rounded border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em]',
                            placed === 'knowledge' ? 'border-valid/45 text-valid' : 'border-warn/45 text-warn',
                          )}
                        >
                          you: {placed === 'knowledge' ? 'knowledge' : 'overextension'}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg border border-subtle bg-deep/50 p-3.5">
                          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-valid">
                            What the data licenses
                          </p>
                          <p className="mt-1.5 text-[13px] leading-[1.6] text-muted">{f.licenses}</p>
                        </div>
                        <div className="rounded-lg border border-subtle bg-deep/50 p-3.5">
                          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-warn">
                            What it does not
                          </p>
                          <p className="mt-1.5 text-[13px] leading-[1.6] text-muted">{f.doesNot}</p>
                        </div>
                      </div>

                      <p className="mt-3.5 border-l-2 border-signal/40 pl-3.5 text-[14px] leading-[1.65] text-ink/85">
                        {placed === 'knowledge' ? f.onKnowledge : f.onOverextension}
                      </p>

                      {f.lean === 'either' && (
                        <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-signal">
                          ◈ genuinely arguable — both placements defensible with the right sentence
                        </p>
                      )}
                    </motion.div>
                  )
                })}

                {reviewStep < FINDINGS.length && (
                  <p className="py-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    Weighting the trade-offs… {reviewStep}/{FINDINGS.length}
                  </p>
                )}

                {reviewStep >= FINDINGS.length && (
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Btn
                      onClick={() => {
                        advance(3)
                        setProgress('focussense', 0.4)
                      }}
                      trailing="→"
                    >
                      Continue to categorisation
                    </Btn>
                    <p className="text-[12.5px] text-muted">
                      Two of the five had no correct answer. If that irritates you, the module is
                      working.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------ stage 3 */}
        {stage >= 3 && (
          <div ref={(el) => { stageRefs.current[3] = el; }} className="mt-12">
            <StageHeader
              index={3}
              total={6}
              title="Tag what each finding is really about"
              lead="Multi-select. Most findings carry more than one dimension, and the ones that carry only 'knowledge value' are usually the ones nobody checked."
            />
            <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-3">
                {FINDINGS.map((f) => (
                  <div key={f.id} className="rounded-xl border border-subtle bg-deep/50 p-4">
                    <p className="text-[13.5px] leading-[1.5] text-ink/90">{f.claim}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {DIMENSIONS.map((d) => {
                        const on = (tags[f.id] ?? []).includes(d.id)
                        return (
                          <Tip key={d.id} label={d.explain}>
                            <Chip
                              active={on}
                              tone={d.tone}
                              onClick={() =>
                                setTags((t) => {
                                  const cur = t[f.id] ?? []
                                  return {
                                    ...t,
                                    [f.id]: on ? cur.filter((x) => x !== d.id) : [...cur, d.id],
                                  }
                                })
                              }
                            >
                              {d.label}
                            </Chip>
                          </Tip>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:sticky lg:top-24 lg:self-start">
                <Panel>
                  <div className="flex items-baseline justify-between">
                    <Kicker tone="signal">Live profile</Kicker>
                    <span className="readout text-[11px] text-muted">
                      {taggedCount}/{FINDINGS.length} tagged
                    </span>
                  </div>
                  <div className="mt-3">
                    <Radar axes={radarAxes} />
                  </div>
                  {taggedCount === FINDINGS.length && (
                    <Note tone="signal" label="What the shape says" className="mt-3">
                      A profile weighted towards knowledge value and decision relevance describes a
                      research programme. One weighted towards interpretation risk and ethics
                      describes a governance problem. Most real projects are the second, presented as
                      the first.
                    </Note>
                  )}
                  <Btn
                    className="mt-4"
                    block
                    disabled={taggedCount < FINDINGS.length}
                    onClick={() => {
                      advance(4)
                      setProgress('focussense', 0.55)
                    }}
                    trailing="→"
                  >
                    {taggedCount < FINDINGS.length
                      ? `${FINDINGS.length - taggedCount} findings untagged`
                      : 'Continue'}
                  </Btn>
                </Panel>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------ stage 4 */}
        {stage >= 4 && (
          <div ref={(el) => { stageRefs.current[4] = el; }} className="mt-12">
            <StageHeader
              index={4}
              total={6}
              title="Three impact statements"
              lead="Finish the sentences. Not an essay — the stems exist so you spend your effort on the content, not the opening."
            />
            <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-3">
                <StemInput
                  stem="If we treat this data as truth, then…"
                  value={statements.truth}
                  onChange={(e) => setStatements((s) => ({ ...s, truth: e.target.value }))}
                  placeholder="…what stops being questioned, and who stops questioning it?"
                />
                <StemInput
                  stem="The most likely misinterpretation is…"
                  value={statements.misread}
                  onChange={(e) => setStatements((s) => ({ ...s, misread: e.target.value }))}
                  placeholder="…and name who would make it, in which meeting."
                />
                <StemInput
                  stem="Before any design decision, we must first…"
                  value={statements.before}
                  onChange={(e) => setStatements((s) => ({ ...s, before: e.target.value }))}
                  placeholder="…one concrete step, with an owner, that fits before Friday."
                />
              </div>

              <div className="lg:sticky lg:top-24 lg:self-start">
                <Panel>
                  <Kicker>Dimensions your statements touch</Kicker>
                  <p className="mt-1.5 text-[12px] leading-[1.5] text-muted">
                    A detector, not a judge. Untouched dimensions are not mistakes — they are just
                    quiet.
                  </p>
                  <ul className="mt-3 space-y-2">
                    {DIMENSIONS.map((d) => {
                      const on = touched.some((t) => t.id === d.id)
                      return (
                        <li key={d.id} className="flex items-center gap-2.5">
                          <motion.span
                            aria-hidden
                            animate={{
                              backgroundColor: on ? 'rgba(76,201,240,0.18)' : 'rgba(38,50,67,0.4)',
                              borderColor: on ? 'var(--accent-signal)' : 'var(--border-subtle)',
                            }}
                            transition={SPRING}
                            className="inline-flex h-[14px] w-[14px] items-center justify-center rounded-[3px] border font-mono text-[9px] text-signal"
                          >
                            {on ? '✓' : ''}
                          </motion.span>
                          <span className={cn('text-[13px]', on ? 'text-ink/85' : 'text-muted')}>
                            {d.label}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                  <p className="mt-3 border-t border-subtle pt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                    {touched.length}/6 touched · no score attached
                  </p>
                  <Btn
                    className="mt-4"
                    block
                    disabled={statementsFilled < 3}
                    onClick={() => {
                      advance(5)
                      setProgress('focussense', 0.7)
                    }}
                    trailing="→"
                  >
                    {statementsFilled < 3 ? `${3 - statementsFilled} statement(s) left` : 'Continue'}
                  </Btn>
                </Panel>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------ stage 5 */}
        {stage >= 5 && (
          <div ref={(el) => { stageRefs.current[5] = el; }} className="mt-12">
            <AssignLive message={priorityAssign.announce} />
            <StageHeader
              index={5}
              total={6}
              tone="risk"
              title="Two opportunities. Two risks."
              lead="Four slots, eight candidates. What you leave out is the part you will be asked about."
            />
            <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
              <div className="rounded-xl border border-subtle bg-deep/40 p-4">
                <p className="label-mono">Candidates</p>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {PRIORITY_POOL.filter(
                    (p) => !priorities.opportunities.includes(p.id) && !priorities.risks.includes(p.id),
                  ).map((p) => (
                    <AssignCard
                      key={p.id}
                      selected={priorityAssign.selected === p.id}
                      tone={p.kind === 'risk' ? 'risk' : 'valid'}
                      {...priorityAssign.itemProps(p.id, p.text)}
                    >
                      <p className="text-[13px] leading-[1.5] text-ink/90">{p.text}</p>
                    </AssignCard>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {(
                  [
                    ['opportunities', 'Biggest opportunities', 'valid'],
                    ['risks', 'Biggest risks', 'risk'],
                  ] as const
                ).map(([zid, zlabel, tone]) => (
                  <AssignZone
                    key={zid}
                    label={`${zlabel} (2)`}
                    tone={tone}
                    count={priorities[zid].length}
                    hint="Two slots. Drag, or select a candidate and place it."
                    active={priorityAssign.hoverZone === zid}
                    canPlace={priorityAssign.selected !== null && priorities[zid].length < 2}
                    onPlace={() => priorityAssign.place(zid, zlabel)}
                    className="min-h-[140px]"
                    {...priorityAssign.zoneProps(zid, zlabel)}
                  >
                    {priorities[zid].map((id) => {
                      const p = PRIORITY_POOL.find((x) => x.id === id)!
                      return (
                        <motion.div
                          key={id}
                          layout={!reduced}
                          transition={SPRING}
                          className="rounded-lg border border-subtle bg-panel p-3"
                        >
                          <p className="text-[13px] leading-[1.5] text-ink/90">{p.text}</p>
                          <button
                            type="button"
                            onClick={() =>
                              setPriorities((prev) => ({ ...prev, [zid]: prev[zid].filter((x) => x !== id) }))
                            }
                            className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted hover:text-ink"
                          >
                            ↩ remove
                          </button>
                        </motion.div>
                      )
                    })}
                  </AssignZone>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <Btn
                disabled={!prioritiesDone}
                onClick={() => {
                  advance(6)
                  setProgress('focussense', 0.85)
                }}
                trailing="→"
              >
                {prioritiesDone ? 'Lock the four' : 'Fill all four slots'}
              </Btn>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------ stage 6 */}
        {stage >= 6 && (
          <div ref={(el) => { stageRefs.current[6] = el; }} className="mt-12">
            <StageHeader
              index={6}
              total={6}
              tone="valid"
              title="The same question, again"
              lead="Nothing about the dashboard has changed. Nothing about the data has changed."
            />
            <Panel>
              <p className="font-display text-[19px] leading-[1.4] text-ink">
                How much would you trust this to drive design decisions?
              </p>
              <div className="mt-4">
                <TrustDial value={trustAfter} onChange={setTrustAfter} idSuffix="after" />
              </div>

              <AnimatePresence>
                {trustAfter !== null && trustBefore !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduced ? 0.15 : 0.5 }}
                    className="mt-7"
                  >
                    <div className="flex items-center justify-center gap-4 sm:gap-10">
                      <div className="text-center">
                        <p className="label-mono">Before</p>
                        <p className="readout mt-1 text-[46px] leading-none text-muted">{trustBefore}</p>
                      </div>

                      <svg width="120" height="46" viewBox="0 0 120 46" aria-hidden className="shrink-0">
                        <motion.path
                          d={`M4 ${46 - trustBefore! * 3.6} C 40 ${46 - trustBefore! * 3.6}, 80 ${46 - trustAfter * 3.6}, 116 ${46 - trustAfter * 3.6}`}
                          fill="none"
                          stroke={delta! < 0 ? 'var(--accent-warn)' : delta! > 0 ? 'var(--accent-signal)' : 'var(--text-muted)'}
                          strokeWidth="2"
                          strokeLinecap="round"
                          initial={{ pathLength: reduced ? 1 : 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: reduced ? 0 : 1.1, ease: 'easeInOut' }}
                        />
                      </svg>

                      <div className="text-center">
                        <p className="label-mono">After</p>
                        <p
                          className="readout mt-1 text-[46px] leading-none"
                          style={{
                            color: delta! < 0 ? 'var(--accent-warn)' : 'var(--accent-signal)',
                          }}
                        >
                          {trustAfter}
                        </p>
                      </div>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: reduced ? 0.15 : 1.2, duration: 0.6 }}
                      className="mx-auto mt-7 max-w-[62ch] text-center font-display text-[21px] leading-[1.45] text-ink sm:text-[24px]"
                    >
                      {delta! < 0
                        ? 'That gap is the module.'
                        : delta! > 0
                          ? "Your trust went up. That is a legitimate outcome — you now know what the data does license, which is more than the brief told you. Just be sure it is the method you trust and not the dashboard."
                          : "You were already calibrated — or you're still holding the brief's promise. Which one?"}
                    </motion.p>

                    <Note tone="valid" label="Completion" className="mx-auto mt-6 max-w-[74ch]">
                      You made four decisions in here: what to sort where, what each finding is really
                      about, what must happen before any design change, and what you left out of your
                      four slots. Two of them you'd defend in a board meeting. You know which.
                    </Note>

                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <Link to="/play/learningpulse">
                        <Btn size="lg" trailing="→" onClick={() => setProgress('focussense', 1)}>
                          Continue to LearningPulse
                        </Btn>
                      </Link>
                      <Link to="/debrief">
                        <Btn size="lg" variant="ghost" onClick={() => setProgress('focussense', 1)}>
                          Save and go to debrief
                        </Btn>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Panel>
          </div>
        )}
      </PageShell>
    </>
  )
}
