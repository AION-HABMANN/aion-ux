import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from 'react'
import { Link } from 'react-router-dom'
import { PageShell } from '@/original/components/day15/components/Layout'
import { Btn, Chip, Kicker, Note, Panel, StageHeader, Tip } from '@/original/components/day15/components/primitives'
import { ConstraintBar, ConstraintRail, type Constraint } from '@/original/components/day15/components/ConstraintHUD'
import { Meter } from '@/original/components/day15/components/Meter'
import { StackedBar, type StackSegment } from '@/original/components/day15/components/charts'
import { ElementChecker, has, longerThan, type CoverageItem } from '@/original/components/day15/components/ElementChecker'
import { useModule } from '@/original/components/day15/state/ModuleStore'
import { clamp, cn, euro, useReduced } from '@/original/components/day15/lib/utils'
import { SPRING, revealItem, revealList, swapIn } from '@/original/components/day15/lib/motion'

/* --------------------------------------------------------------- Constants */

const CHIP_VALUE = 20_000
const TOTAL_CHIPS = 12 // €240,000
const TOTAL_WEEKS = 18

interface Measure {
  id: string
  n: string
  title: string
  detail: string
  fullChips: number
  fullWeeks: number
  color: string
  tone: 'signal' | 'valid' | 'warn' | 'risk' | 'neuro'
}

// Full funding would need 17 chips and 26 weeks. The learner has 12 and 18 —
// roughly 70%. The shortfall is the exercise, not a miscalculation.
const MEASURES: Measure[] = [
  {
    id: 'm1',
    n: '01',
    title: 'Establish clear separation',
    detail:
      'Explorative research, UX analysis and possible product use, formally separated — different questions, different evidence standards, different budget lines.',
    fullChips: 4,
    fullWeeks: 6,
    color: 'var(--accent-signal)',
    tone: 'signal',
  },
  {
    id: 'm2',
    n: '02',
    title: 'Hypothesis-based piloting',
    detail:
      'Eye-tracking and neurofeedback piloted against written hypotheses, with defined usage limits and exit criteria.',
    fullChips: 5,
    fullWeeks: 8,
    color: 'var(--accent-neuro)',
    tone: 'neuro',
  },
  {
    id: 'm3',
    n: '03',
    title: 'Ethics, data protection & consent framework',
    detail:
      'Binding, not advisory. A named owner with authority to stop a study, separate retention for physiological data, revocable consent.',
    fullChips: 4,
    fullWeeks: 6,
    color: 'var(--accent-risk)',
    tone: 'risk',
  },
  {
    id: 'm4',
    n: '04',
    title: 'Evaluation grid',
    detail:
      'A grid for knowledge maturity and management relevance, so findings reach the board with their own confidence level attached.',
    fullChips: 4,
    fullWeeks: 6,
    color: 'var(--accent-valid)',
    tone: 'valid',
  },
]

const PROBLEMS = [
  { id: 'p1', text: 'Research, innovation and product optimisation are mixed without clear separation.' },
  { id: 'p2', text: 'High knowledge gain is expected without hypotheses or usage limits defined.' },
  { id: 'p3', text: 'It is unclear which procedures are product-near and which are only exploratively sensible.' },
  { id: 'p4', text: 'Data protection, consent and acceptance are not sufficiently addressed.' },
  { id: 'p5', text: 'Departments expect fast results although the methods are explanation- and interpretation-intensive.' },
  { id: 'p6', text: 'There is no solid governance for neuro-based research.' },
]

const DIMENSIONS = [
  { id: 'knowledge', label: 'Knowledge value', color: '#4CC9F0', tone: 'signal' as const },
  { id: 'validity', label: 'Validity', color: '#52D9A5', tone: 'valid' as const },
  { id: 'ethics', label: 'Ethics', color: '#EF5D6B', tone: 'risk' as const },
  { id: 'protection', label: 'Data protection', color: '#F5B841', tone: 'warn' as const },
  { id: 'market', label: 'Market proximity', color: '#A78BFA', tone: 'neuro' as const },
  { id: 'readiness', label: 'Decision readiness', color: '#8A99AC', tone: 'signal' as const },
]

const JUSTIFICATIONS = [
  { id: 'impact', label: 'User impact' },
  { id: 'feasibility', label: 'Feasibility' },
  { id: 'riskred', label: 'Risk reduction' },
  { id: 'time', label: 'Time pressure' },
  { id: 'reputation', label: 'Reputation security' },
]

/* ------------------------------------------------------------------ Stage 5 */

const DECISIONS = [
  {
    id: 'integrate',
    label: 'Integrate',
    body: 'Ship the finding into the live portal in week 14 as requested.',
    tone: 'risk' as const,
    cost: 'Fastest path to visible value — and you have just set the evidentiary standard for every future finding at "product asked nicely". If it holds, nobody remembers the risk you took. If it does not, the eye-tracking programme gets cancelled, not the decision process that approved it.',
  },
  {
    id: 'flag',
    label: 'Integrate behind a flag with a rollback criterion',
    body: 'Ship to a slice, define in advance what result reverses it, and name who watches.',
    tone: 'valid' as const,
    cost: 'The defensible answer, and it is not free. It costs engineering capacity you did not budget, delays the visible win by the length of the observation window, and only works if the rollback criterion is written before launch. Teams that skip that last part have shipped it permanently and called it a flag.',
  },
  {
    id: 'decline',
    label: 'Decline, offer a prototype-only test',
    body: 'No live integration; a bounded test that answers the same question off the critical path.',
    tone: 'signal' as const,
    cost: 'Methodologically clean and politically expensive. Product hears "no" in week 14 of an 18-week programme they helped fund. You will need the evaluation grid to show why the finding was not ready — if you underfunded measure 04, you are declining on instinct, and it will read that way.',
  },
  {
    id: 'defer',
    label: 'Defer the decision',
    body: 'Ask for more time; revisit once validity data exists.',
    tone: 'warn' as const,
    cost: 'The option that feels free and is not. You spend credibility instead of budget: the request returns in week 16 with less time and more momentum, and the room now knows that pressure moves you. Deferral is a real choice with a real price — it is simply charged to a different account.',
  },
]

/* ------------------------------------------------------------------ Model */

const MODEL_RECOMMENDATION = `Recommendation: fund the ethics and consent framework to completion first, then hypothesis-based piloting, and accept an incomplete evaluation grid in this phase.

Rationale: with €240,000 and 18 weeks we can fund roughly 70% of what all four measures would require. Underfunding measure 03 is the only shortfall that is irreversible — consent structures cannot be applied retroactively to recordings already made, and the reputational exposure sits with the company, not with the project. Measure 04 is the one that can be carried into the next phase at a known cost.

Trade-off: we finish this phase without a complete evaluation grid. Findings will reach management with a confidence statement written per finding rather than against a standard framework — slower to read, harder to compare across studies.

Ethics and data protection position: physiological data on a separate retention schedule with a named owner who has authority to stop a study. Consent is specific, voluntary and revocable, including deletion after the session. No neuro-based data leaves the research context in this phase.

Knowledge maturity criteria: no finding is presented as product-relevant unless it (a) replicates across two rounds, (b) is supported by at least one non-gaze method, and (c) carries an explicit statement of what it does not license.

Residual risk: piloting begins while parts of the evaluation grid are still provisional. If the framework is not finished by week 12, we present findings with a weaker management interface than promised — and we say so, rather than compensating with confident language.

Next decision point: week 12 review. If the knowledge maturity criteria are not met by then, the live integration request is declined for this phase and re-scoped as a prototype test.`

const MODEL_THEMES = ['ethics', 'sequence', 'tradeoff', 'maturity', 'residual', 'gate', 'irreversible']

const LEARNER_THEMES: { id: string; label: string; test: (t: string) => boolean }[] = [
  { id: 'ethics', label: 'ethics / consent position', test: has('ethic', 'consent', 'data protection', 'privacy') },
  { id: 'sequence', label: 'sequencing of measures', test: has('first', 'then', 'before', 'sequence', 'order') },
  { id: 'tradeoff', label: 'explicit trade-off', test: has('trade-off', 'tradeoff', 'at the cost', 'give up', 'instead of') },
  { id: 'maturity', label: 'knowledge maturity criteria', test: has('maturity', 'criteri', 'replicat', 'threshold', 'standard') },
  { id: 'residual', label: 'named residual risk', test: has('residual', 'risk remains', 'remaining risk', 'we still', 'exposure') },
  { id: 'gate', label: 'next decision point', test: has('review', 'checkpoint', 'gate', 'revisit', 'decision point') },
  { id: 'irreversible', label: 'reversibility argument', test: has('irreversib', 'reversib', 'retroactive', 'permanent') },
  { id: 'people', label: 'team capability & workload', test: has('team', 'capacity', 'skill', 'hire', 'training', 'workload') },
  { id: 'stakeholder', label: 'stakeholder expectation management', test: has('stakeholder', 'department', 'expectation', 'communicat') },
  { id: 'cost', label: 'explicit cost reasoning', test: has('€', 'eur', 'budget', 'cost', '000') },
  { id: 'vendor', label: 'vendor / external dependency', test: has('vendor', 'supplier', 'external', 'agency', 'partner') },
  { id: 'stop', label: 'stopping condition', test: has('stop', 'cancel', 'abort', 'discontinue', 'walk away') },
]

const RECO_ITEMS: CoverageItem[] = [
  {
    key: 'prio',
    label: 'Clear prioritisation',
    explain: 'Which measure comes first and which is accepted as incomplete. Detects "first", "priority", "before", "primary".',
    test: has('first', 'priorit', 'before', 'foremost', 'primary'),
  },
  {
    key: 'tradeoff',
    label: 'Explicit trade-off',
    explain: 'What you give up to fund what you funded. Detects "trade-off", "at the cost of", "accept", "instead of".',
    test: has('trade-off', 'tradeoff', 'at the cost', 'give up', 'accept', 'instead of', 'in exchange', 'forgo'),
  },
  {
    key: 'ethics',
    label: 'Ethics / data-protection position',
    explain: 'A stated position, not a mention. Detects "consent", "ethics", "data protection", "retention", "withdraw".',
    test: has('consent', 'ethic', 'data protection', 'retention', 'withdraw', 'privacy', 'gdpr'),
  },
  {
    key: 'maturity',
    label: 'Criteria for knowledge maturity',
    explain: 'What makes a finding ready to act on. Detects "criteria", "replicate", "evidence", "threshold", "validated".',
    test: has('criteri', 'replicat', 'mature', 'evidence', 'threshold', 'standard', 'validat'),
  },
  {
    key: 'strategy',
    label: 'Strategic justification',
    explain: 'Why this serves the company, not only the project. Detects "because", "strategic", "long-term", "capability", "reputation".',
    test: has('because', 'strateg', 'long-term', 'long term', 'position', 'capabilit', 'reputation'),
  },
  {
    key: 'residual',
    label: 'Named residual risk',
    explain: 'The risk you accepted knowingly. Detects "residual", "risk remains", "we still", "exposure", "uncertain".',
    test: has('residual', 'risk remains', 'remaining risk', 'we still', 'exposure', 'uncertain'),
  },
]

const CONDITIONS: Constraint[] = [
  { key: 'budget', label: 'Research, piloting, evaluation', value: euro(240000), tone: 'signal' },
  { key: 'time', label: 'First pilot & decision phase', value: '18 weeks', tone: 'warn' },
  { key: 'image', label: 'Innovative without trust risk', value: 'required', tone: 'risk' },
  { key: 'product', label: 'Short-term product integration', value: 'limited', tone: 'muted' },
  { key: 'market', label: 'Market data situation', value: 'thin', tone: 'muted' },
  { key: 'mgmt', label: 'Insights in management form', value: 'mandatory', tone: 'valid' },
]

/* -------------------------------------------------------------------- Page */

export function VisionMind() {
  const reduced = useReduced()
  const { setProgress, setVisionMind, visionMind } = useModule()

  const [stage, setStage] = useState(1)
  const [acknowledged, setAcknowledged] = useState(false)
  const [diag, setDiag] = useState<Record<string, string[]>>(visionMind.diagnosis)
  const [chips, setChips] = useState<Record<string, number>>(
    visionMind.budget.m1 !== undefined ? visionMind.budget : { m1: 0, m2: 0, m3: 0, m4: 0 },
  )
  const [weeks, setWeeks] = useState<Record<string, number>>(
    visionMind.weeks.m1 !== undefined ? visionMind.weeks : { m1: 0, m2: 0, m3: 0, m4: 0 },
  )
  const [just, setJust] = useState<Record<string, string[]>>(visionMind.justifications)
  const [starts, setStarts] = useState<Record<string, number>>({ m1: 0, m2: 6, m3: 0, m4: 12 })
  const [decision, setDecision] = useState<string | null>(visionMind.decision)
  const [reco, setReco] = useState(visionMind.recommendation)
  const [showModel, setShowModel] = useState(false)

  const stageRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const advance = useCallback((to: number) => {
    setStage((s) => Math.max(s, to))
    window.setTimeout(() => stageRefs.current[to]?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
  }, [])

  useEffect(() => setProgress('visionmind', 0.08), [setProgress])

  /* ---- allocation maths ---- */
  const chipsUsed = Object.values(chips).reduce((a, b) => a + b, 0)
  const weeksUsed = Object.values(weeks).reduce((a, b) => a + b, 0)
  const chipsLeft = TOTAL_CHIPS - chipsUsed
  const weeksLeft = TOTAL_WEEKS - weeksUsed

  const share = useCallback(
    (m: Measure) => 0.6 * ((chips[m.id] ?? 0) / m.fullChips) + 0.4 * ((weeks[m.id] ?? 0) / m.fullWeeks),
    [chips, weeks],
  )

  const meters = useMemo(() => {
    const s = Object.fromEntries(MEASURES.map((m) => [m.id, Math.min(1, share(m))])) as Record<string, number>
    // Reputation risk is inverse: it starts high, and only ethics investment
    // brings it down. Underfunding measure 03 does not merely fail to help — it
    // leaves you exposed while the rest of the programme accelerates.
    const ethics = s.m3
    const acceleration = 0.5 * s.m2 + 0.3 * s.m1
    const risk = clamp(88 - 66 * ethics + 14 * acceleration * (1 - ethics))
    const maturity = clamp(100 * (0.42 * s.m1 + 0.58 * s.m2))
    const connect = clamp(100 * (0.82 * s.m4 + 0.18 * s.m1))
    return { risk, maturity, connect, ethicsShare: ethics }
  }, [share])

  const alarm = meters.ethicsShare < 0.28 ? 'severe' : meters.ethicsShare < 0.55 ? 'elevated' : null
  const allocated = chipsUsed > 0 && weeksUsed > 0
  const fullyAllocated = chipsLeft === 0 && weeksLeft === 0

  const addChip = (id: string, delta: number) =>
    setChips((c) => ({ ...c, [id]: clamp((c[id] ?? 0) + delta, 0, (c[id] ?? 0) + Math.max(0, chipsLeft)) }))
  const addWeek = (id: string, delta: number) =>
    setWeeks((w) => ({ ...w, [id]: clamp((w[id] ?? 0) + delta, 0, (w[id] ?? 0) + Math.max(0, weeksLeft)) }))

  /* ---- diagnosis profile ---- */
  const diagSegments: StackSegment[] = DIMENSIONS.map((d) => ({
    key: d.id,
    label: d.label,
    value: Object.values(diag).filter((tags) => tags.includes(d.id)).length,
    color: d.color,
    explain: 'share of the six observed problems you assigned to this dimension',
  }))
  const diagnosed = Object.values(diag).filter((t) => t.length > 0).length

  /* ---- schedule ---- */
  const scheduled = useMemo(
    () =>
      Object.fromEntries(
        MEASURES.map((m) => [m.id, { start: starts[m.id] ?? 0, length: Math.max(0, weeks[m.id] ?? 0) }]),
      ) as Record<string, { start: number; length: number }>,
    [starts, weeks],
  )

  const seqFlag = useMemo(() => {
    const e = scheduled.m3
    const p = scheduled.m2
    if (!e.length || !p.length) return null
    if (p.start < e.start)
      return {
        tone: 'risk' as const,
        text: 'Piloting starts before the consent framework does. Sessions would be recorded under structures that do not exist yet — the one sequencing error you cannot correct afterwards.',
      }
    if (p.start < e.start + e.length)
      return {
        tone: 'warn' as const,
        text: 'Ethics framework and piloting run in parallel. Workable, but the first sessions land while consent structures are still provisional. Name the date the framework becomes binding, and record nothing before it.',
      }
    return null
  }, [scheduled])

  const overweightUnjustified = MEASURES.filter((m) => (chips[m.id] ?? 0) >= 4 && (just[m.id]?.length ?? 0) < 2)
  const justified = Object.values(just).filter((t) => t.length > 0).length

  /* ---- writing comparison ---- */
  const learnerThemes = LEARNER_THEMES.filter((t) => t.test(reco))
  const extraGround = learnerThemes.filter((t) => !MODEL_THEMES.includes(t.id))

  /* ---- publish ---- */
  useEffect(() => {
    setVisionMind({
      diagnosis: diag,
      budget: chips,
      weeks,
      schedule: scheduled,
      justifications: just,
      meters: {
        'Trust & reputation risk': Math.round(meters.risk),
        'Knowledge maturity': Math.round(meters.maturity),
        'Management connectability': Math.round(meters.connect),
      },
      decision,
      decisionLabel: DECISIONS.find((d) => d.id === decision)?.label ?? '',
      recommendation: reco,
      completed: reco.trim().length > 60 && decision !== null,
    })
  }, [diag, chips, weeks, scheduled, just, meters, decision, reco, setVisionMind])

  const meterPanel = (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border bg-panel p-5 transition-colors duration-500',
        alarm === 'severe' ? 'border-risk/60' : alarm === 'elevated' ? 'border-risk/30' : 'border-subtle',
      )}
    >
      {alarm && (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 w-[3px]',
            alarm === 'severe' ? 'animate-risk-bloom bg-risk' : 'bg-risk/50',
          )}
        />
      )}
      <div className="flex items-baseline justify-between">
        <Kicker tone="signal">Consequence meters</Kicker>
        <Tip label="Three outputs. Reputation risk is inverse — it starts high and only ethics investment brings it down. The other two are driven by measures 01/02 and 04 respectively.">
          <span className="label-mono cursor-help">live</span>
        </Tip>
      </div>
      <div className="mt-2 divide-y divide-subtle/60">
        <Meter
          label="Trust & reputation risk"
          value={meters.risk}
          tone="risk"
          inverse
          qualifier={meters.risk > 65 ? 'exposed' : meters.risk > 40 ? 'watch' : 'contained'}
          explain="Higher is worse. Falls as the ethics, data protection and consent framework is funded — and stays high, or climbs, if the rest of the programme accelerates without it."
        />
        <Meter
          label="Knowledge maturity"
          value={meters.maturity}
          tone="valid"
          qualifier={meters.maturity > 65 ? 'usable' : meters.maturity > 35 ? 'partial' : 'thin'}
          explain="How far findings will have travelled from raw signal to something with a stated confidence level. Driven by clear separation (01) and hypothesis-based piloting (02)."
        />
        <Meter
          label="Management connectability"
          value={meters.connect}
          tone="signal"
          qualifier={meters.connect > 65 ? 'board-ready' : meters.connect > 35 ? 'translatable' : 'raw'}
          explain="Whether results arrive in a form a management audience can act on. Driven almost entirely by the evaluation grid (04) — the measure most often cut first."
        />
      </div>

      <AnimatePresence>
        {alarm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-4 border-t border-subtle pt-3 text-[12.5px] leading-[1.6] text-risk/90">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                <span aria-hidden>▲ </span>
                {alarm === 'severe' ? 'ethics framework unfunded' : 'ethics framework underfunded'} ·{' '}
              </span>
              {alarm === 'severe'
                ? 'Recordings would begin with no binding consent structure and no named owner who can stop a study. This is the shortfall that cannot be repaired retroactively.'
                : 'The framework exists on paper but is not resourced to be binding. It will hold until the first time someone needs it to.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <PageShell
      wide
      kicker="Playground 03 · L3 · 20 min"
      tone="neuro"
      title="VisionMind Lab"
      lead={
        <>
          A company wants to expand UX research and is examining eye-tracking, neurofeedback and early
          BCI concepts for a complex service portal. Internal enthusiasm for measurement is high;
          experience with interpretation, ethics governance and product-near evaluation standards is{' '}
          <span className="text-neuro">not</span>. You have €240,000 and 18 weeks.
        </>
      }
    >
      <ConstraintBar title="Conditions" constraints={CONDITIONS} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_306px]">
        <div className="min-w-0">
          {/* ------------------------------------------------ diagnostic */}
          <Panel className="border-risk/25">
            <Kicker tone="risk">Diagnostic panel · read before allocating</Kicker>
            <h3 className="mt-2 text-[20px]">Six observed problems</h3>
            <motion.ul variants={revealList(reduced)} initial="hidden" animate="show" className="mt-4 space-y-2">
              {PROBLEMS.map((p, i) => (
                <motion.li key={p.id} variants={revealItem(reduced)} className="flex gap-3">
                  <span className="readout shrink-0 text-[11px] text-risk">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[14px] leading-[1.6] text-ink/85">{p.text}</span>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Btn
                variant={acknowledged ? 'ghost' : 'risk'}
                disabled={acknowledged}
                onClick={() => {
                  setAcknowledged(true)
                  advance(1)
                  setProgress('visionmind', 0.15)
                }}
              >
                {acknowledged ? 'Acknowledged' : 'I have read all six'}
              </Btn>
              <p className="text-[12.5px] text-muted">
                {acknowledged
                  ? 'None of the six is fixable with more measurement. That is the point of the list.'
                  : 'Five of the six are governance problems wearing a methods costume.'}
              </p>
            </div>
          </Panel>

          {/* ------------------------------------------------ stage 1 */}
          {acknowledged && (
            <div ref={(el) => { stageRefs.current[1] = el; }} className="mt-12">
              <StageHeader
                index={1}
                total={6}
                tone="neuro"
                title="Diagnose"
                lead="Tag each observed problem with the dimensions it actually belongs to. Most carry two or three — and the profile that emerges is your case for the allocation that follows."
              />
              <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
                <div className="space-y-2.5">
                  {PROBLEMS.map((p) => (
                    <div key={p.id} className="rounded-xl border border-subtle bg-deep/50 p-4">
                      <p className="text-[13.5px] leading-[1.55] text-ink/90">{p.text}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {DIMENSIONS.map((d) => {
                          const on = (diag[p.id] ?? []).includes(d.id)
                          return (
                            <Chip
                              key={d.id}
                              active={on}
                              tone={d.tone}
                              onClick={() =>
                                setDiag((t) => {
                                  const cur = t[p.id] ?? []
                                  return { ...t, [p.id]: on ? cur.filter((x) => x !== d.id) : [...cur, d.id] }
                                })
                              }
                            >
                              {d.label}
                            </Chip>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:sticky lg:top-24 lg:self-start">
                  <Panel>
                    <div className="flex items-baseline justify-between">
                      <Kicker tone="neuro">Diagnostic profile</Kicker>
                      <span className="readout text-[11px] text-muted">{diagnosed}/6</span>
                    </div>
                    <div className="mt-4">
                      <StackedBar segments={diagSegments} />
                    </div>
                    {diagnosed === PROBLEMS.length && (
                      <Note tone="neuro" label="What the profile means" className="mt-4">
                        If ethics and data protection together outweigh knowledge value, you have
                        diagnosed a governance gap — and funding measurement first would be answering
                        a question nobody asked.
                      </Note>
                    )}
                    <Btn
                      className="mt-4"
                      block
                      disabled={diagnosed < PROBLEMS.length}
                      onClick={() => {
                        advance(2)
                        setProgress('visionmind', 0.28)
                      }}
                      trailing="→"
                    >
                      {diagnosed < PROBLEMS.length ? `${PROBLEMS.length - diagnosed} untagged` : 'Allocate'}
                    </Btn>
                  </Panel>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------ stage 2 */}
          {stage >= 2 && (
            <div ref={(el) => { stageRefs.current[2] = el; }} className="mt-12">
              <StageHeader
                index={2}
                total={6}
                tone="risk"
                title="Allocate"
                lead="Twelve budget chips at €20,000 and eighteen week blocks. Full funding of all four measures would take seventeen chips and twenty-six weeks. You have roughly 70% — the shortfall is the decision."
              />

              <div className="rounded-xl border border-subtle bg-deep/50 p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="label-mono">Unallocated</p>
                  <p className="readout text-[12px]">
                    <span className={chipsLeft === 0 ? 'text-muted' : 'text-signal'}>
                      {euro(chipsLeft * CHIP_VALUE)}
                    </span>
                    <span className="text-muted"> · </span>
                    <span className={weeksLeft === 0 ? 'text-muted' : 'text-warn'}>{weeksLeft} weeks</span>
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {Array.from({ length: TOTAL_CHIPS }, (_, i) => (
                    <span
                      key={i}
                      draggable={i < chipsLeft}
                      onDragStart={(e: DragEvent) => e.dataTransfer.setData('text/plain', 'chip')}
                      className={cn(
                        'grid h-8 w-11 place-items-center rounded-md border font-mono text-[10px] transition-colors',
                        i < chipsLeft
                          ? 'cursor-grab border-signal/50 bg-signal/10 text-signal'
                          : 'border-subtle bg-deep text-muted/40',
                      )}
                      title={i < chipsLeft ? 'Unallocated €20,000 chip — drag onto a measure' : 'Allocated'}
                    >
                      20k
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
                    <span
                      key={i}
                      aria-hidden
                      className={cn(
                        'h-3 w-[15px] rounded-[3px] border',
                        i < weeksLeft ? 'border-warn/50 bg-warn/15' : 'border-subtle bg-deep',
                      )}
                    />
                  ))}
                </div>
                <p className="mt-2.5 text-[12px] text-muted">
                  {chipsUsed === 0
                    ? 'Nothing allocated yet. The data is patient. Your stakeholders are not.'
                    : `${chipsUsed}/${TOTAL_CHIPS} chips and ${weeksUsed}/${TOTAL_WEEKS} weeks committed.`}
                </p>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {MEASURES.map((m) => {
                  const c = chips[m.id] ?? 0
                  const w = weeks[m.id] ?? 0
                  const pct = Math.round(Math.min(1, share(m)) * 100)
                  const starved = m.id === 'm3' && share(m) < 0.55
                  return (
                    <div
                      key={m.id}
                      onDragOver={(e: DragEvent) => e.preventDefault()}
                      onDrop={(e: DragEvent) => {
                        e.preventDefault()
                        if (chipsLeft > 0) addChip(m.id, 1)
                      }}
                      className={cn(
                        'relative overflow-hidden rounded-xl border bg-panel p-4 transition-colors duration-300',
                        starved ? 'border-risk/45' : 'border-subtle',
                      )}
                    >
                      {starved && (
                        <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] animate-risk-bloom bg-risk" />
                      )}
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="readout text-[11px]" style={{ color: m.color }}>
                            {m.n}
                          </p>
                          <h4 className="mt-1 text-[16px] leading-[1.3]">{m.title}</h4>
                        </div>
                        <span className="readout shrink-0 text-[12px] text-muted">{pct}%</span>
                      </div>
                      <p className="mt-2 text-[12.5px] leading-[1.55] text-muted">{m.detail}</p>

                      <div className="mt-4 space-y-2.5">
                        {[
                          {
                            k: 'chips',
                            label: 'Budget',
                            val: euro(c * CHIP_VALUE),
                            of: `of ${euro(m.fullChips * CHIP_VALUE)}`,
                            dec: () => addChip(m.id, -1),
                            inc: () => addChip(m.id, 1),
                            canInc: chipsLeft > 0,
                            canDec: c > 0,
                            ratio: c / m.fullChips,
                          },
                          {
                            k: 'weeks',
                            label: 'Weeks',
                            val: `${w}`,
                            of: `of ${m.fullWeeks}`,
                            dec: () => addWeek(m.id, -1),
                            inc: () => addWeek(m.id, 1),
                            canInc: weeksLeft > 0,
                            canDec: w > 0,
                            ratio: w / m.fullWeeks,
                          },
                        ].map((row) => (
                          <div key={row.k} className="flex items-center gap-2.5">
                            <span className="w-[48px] shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                              {row.label}
                            </span>
                            <span className="relative h-[6px] flex-1 overflow-hidden rounded-full bg-deep">
                              <motion.span
                                className="absolute inset-y-0 left-0 rounded-full"
                                style={{ background: m.color }}
                                initial={false}
                                animate={{ width: `${Math.min(100, row.ratio * 100)}%` }}
                                transition={SPRING}
                              />
                            </span>
                            <span className="readout w-[92px] shrink-0 text-right text-[11px] text-ink/80">
                              {row.val} <span className="text-muted">{row.of}</span>
                            </span>
                            <span className="flex shrink-0 gap-1">
                              <button
                                type="button"
                                onClick={row.dec}
                                disabled={!row.canDec}
                                aria-label={`Remove one ${row.label.toLowerCase()} unit from ${m.title}`}
                                className="grid h-7 w-7 place-items-center rounded-md border border-subtle bg-elevated/60 text-[13px] text-muted transition-colors hover:text-ink disabled:opacity-30"
                              >
                                −
                              </button>
                              <button
                                type="button"
                                onClick={row.inc}
                                disabled={!row.canInc}
                                aria-label={`Add one ${row.label.toLowerCase()} unit to ${m.title}`}
                                className="grid h-7 w-7 place-items-center rounded-md border border-subtle bg-elevated/60 text-[13px] text-muted transition-colors hover:text-ink disabled:opacity-30"
                              >
                                +
                              </button>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-5 lg:hidden">{meterPanel}</div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Btn
                  disabled={!allocated}
                  onClick={() => {
                    advance(3)
                    setProgress('visionmind', 0.42)
                  }}
                  trailing="→"
                >
                  Justify the allocation
                </Btn>
                <p className="max-w-[52ch] text-[12.5px] text-muted">
                  {fullyAllocated
                    ? 'Everything committed. Something above is underfunded — say which, and why, and it stops being an accident.'
                    : `${chipsLeft} chips and ${weeksLeft} weeks still uncommitted. Holding reserve is a legitimate choice you will have to defend.`}
                </p>
              </div>
            </div>
          )}

          {/* ------------------------------------------------ stage 3 */}
          {stage >= 3 && (
            <div ref={(el) => { stageRefs.current[3] = el; }} className="mt-12">
              <StageHeader
                index={3}
                total={6}
                tone="warn"
                title="Justify"
                lead="For each measure, the grounds you would actually give. Heavy funding with thin justification gets a margin note — not a penalty."
              />
              <div className="space-y-3">
                {MEASURES.map((m) => {
                  const tags = just[m.id] ?? []
                  const heavy = (chips[m.id] ?? 0) >= 4
                  return (
                    <div key={m.id} className="rounded-xl border border-subtle bg-deep/50 p-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="text-[14px] font-semibold text-ink">
                          <span className="readout mr-2 text-[11px]" style={{ color: m.color }}>
                            {m.n}
                          </span>
                          {m.title}
                        </p>
                        <span className="readout text-[11px] text-muted">
                          {euro((chips[m.id] ?? 0) * CHIP_VALUE)} · {weeks[m.id] ?? 0}w
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {JUSTIFICATIONS.map((j) => {
                          const on = tags.includes(j.id)
                          return (
                            <Chip
                              key={j.id}
                              active={on}
                              tone={m.tone}
                              onClick={() =>
                                setJust((t) => {
                                  const cur = t[m.id] ?? []
                                  return { ...t, [m.id]: on ? cur.filter((x) => x !== j.id) : [...cur, j.id] }
                                })
                              }
                            >
                              {j.label}
                            </Chip>
                          )
                        })}
                      </div>
                      <AnimatePresence>
                        {heavy && tags.length < 2 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-3 text-[13px] leading-[1.6] text-warn/90">
                              You've spent {euro((chips[m.id] ?? 0) * CHIP_VALUE)} on something you can't
                              yet explain to your CFO.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Btn
                  disabled={justified < MEASURES.length}
                  onClick={() => {
                    advance(4)
                    setProgress('visionmind', 0.55)
                  }}
                  trailing="→"
                >
                  {justified < MEASURES.length ? `${MEASURES.length - justified} without grounds` : 'Sequence the 18 weeks'}
                </Btn>
                {overweightUnjustified.length > 0 && (
                  <p className="max-w-[46ch] text-[12.5px] text-warn/85">
                    {overweightUnjustified.length} heavily-funded measure
                    {overweightUnjustified.length === 1 ? '' : 's'} with thin grounds. You can proceed —
                    you just cannot claim nobody mentioned it.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ------------------------------------------------ stage 4 */}
          {stage >= 4 && (
            <div ref={(el) => { stageRefs.current[4] = el; }} className="mt-12">
              <StageHeader
                index={4}
                total={6}
                tone="signal"
                title="Sequence"
                lead="Place each measure across the 18 weeks. Bar length is the weeks you funded. Overlaps are allowed — some of them are merely flagged."
              />
              <Panel>
                <div className="overflow-x-auto">
                  <div className="min-w-[560px]">
                    <div
                      className="mb-2 grid gap-[2px] pl-[38px] pr-[142px]"
                      style={{ gridTemplateColumns: `repeat(${TOTAL_WEEKS}, minmax(0,1fr))` }}
                    >
                      {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
                        <span key={i} className="text-center font-mono text-[9px] text-muted">
                          {i + 1}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {MEASURES.map((m) => {
                        const len = weeks[m.id] ?? 0
                        const start = starts[m.id] ?? 0
                        const maxStart = Math.max(0, TOTAL_WEEKS - len)
                        return (
                          <div key={m.id} className="flex items-center gap-2.5">
                            <span className="w-[28px] shrink-0 font-mono text-[10px]" style={{ color: m.color }}>
                              {m.n}
                            </span>
                            <div
                              className="relative grid h-8 flex-1 gap-[2px] rounded-md border border-subtle bg-deep p-[2px]"
                              style={{ gridTemplateColumns: `repeat(${TOTAL_WEEKS}, minmax(0,1fr))` }}
                            >
                              {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
                                <span key={i} className="rounded-[2px] bg-panel/60" />
                              ))}
                              {len > 0 && (
                                <motion.span
                                  aria-hidden
                                  layout={!reduced}
                                  transition={SPRING}
                                  className="absolute inset-y-[2px] rounded-[3px] opacity-90"
                                  style={{
                                    background: m.color,
                                    left: `calc(${(start / TOTAL_WEEKS) * 100}% + 2px)`,
                                    width: `calc(${(len / TOTAL_WEEKS) * 100}% - 4px)`,
                                  }}
                                />
                              )}
                            </div>
                            <span className="flex shrink-0 gap-1">
                              <button
                                type="button"
                                disabled={len === 0 || start === 0}
                                onClick={() => setStarts((s) => ({ ...s, [m.id]: Math.max(0, (s[m.id] ?? 0) - 1) }))}
                                aria-label={`Move ${m.title} one week earlier`}
                                className="grid h-7 w-7 place-items-center rounded-md border border-subtle bg-elevated/60 text-[11px] text-muted hover:text-ink disabled:opacity-30"
                              >
                                ◀
                              </button>
                              <button
                                type="button"
                                disabled={len === 0 || start >= maxStart}
                                onClick={() =>
                                  setStarts((s) => ({ ...s, [m.id]: Math.min(maxStart, (s[m.id] ?? 0) + 1) }))
                                }
                                aria-label={`Move ${m.title} one week later`}
                                className="grid h-7 w-7 place-items-center rounded-md border border-subtle bg-elevated/60 text-[11px] text-muted hover:text-ink disabled:opacity-30"
                              >
                                ▶
                              </button>
                            </span>
                            <span className="readout w-[74px] shrink-0 text-right text-[10.5px] text-muted">
                              {len === 0 ? 'unfunded' : `w${start + 1}–${start + len}`}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {seqFlag && (
                  <Note tone={seqFlag.tone} label="Sequencing flag" className="mt-4">
                    {seqFlag.text}
                  </Note>
                )}
                {!seqFlag && (weeks.m2 ?? 0) > 0 && (weeks.m3 ?? 0) > 0 && (
                  <Note tone="valid" label="Sequencing" className="mt-4">
                    Consent structures finish before piloting begins. It costs you calendar time, and it
                    is the one ordering choice nobody will ever have to defend.
                  </Note>
                )}

                <Btn
                  className="mt-5"
                  onClick={() => {
                    advance(5)
                    setProgress('visionmind', 0.68)
                  }}
                  trailing="→"
                >
                  Continue
                </Btn>
              </Panel>
            </div>
          )}

          {/* ------------------------------------------------ stage 5 */}
          {stage >= 5 && (
            <div ref={(el) => { stageRefs.current[5] = el; }} className="mt-12">
              <StageHeader
                index={5}
                total={6}
                tone="risk"
                title="Decide under uncertainty"
                lead="You will not get the missing information before you have to answer."
              />
              <Panel className="border-risk/25">
                <p className="max-w-[70ch] font-display text-[19px] leading-[1.45] text-ink sm:text-[21px]">
                  "Product wants one eye-tracking finding integrated into the live portal in week 14.
                  You do not yet have validity data. Decide."
                </p>
                <div className="mt-5 grid gap-2.5 md:grid-cols-2">
                  {DECISIONS.map((d) => (
                    <motion.button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        setDecision(d.id)
                        setProgress('visionmind', 0.78)
                      }}
                      aria-pressed={decision === d.id}
                      whileHover={reduced ? undefined : { y: -3 }}
                      transition={SPRING}
                      className={cn(
                        'rounded-xl border p-4 text-left transition-colors duration-200',
                        decision === d.id
                          ? 'border-risk/55 bg-risk/[0.07]'
                          : 'border-subtle bg-deep/50 hover:border-[#33455c] hover:bg-elevated/60',
                      )}
                    >
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">{d.label}</p>
                      <p className="mt-2 text-[13.5px] leading-[1.55] text-ink/85">{d.body}</p>
                    </motion.button>
                  ))}
                </div>

                {decision && (
                  <motion.div key={decision} {...swapIn(reduced)} className="mt-4">
                    <Note tone={DECISIONS.find((d) => d.id === decision)!.tone} label="What it costs">
                      {DECISIONS.find((d) => d.id === decision)!.cost}
                    </Note>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <Btn
                        onClick={() => {
                          advance(6)
                          setProgress('visionmind', 0.85)
                        }}
                        trailing="→"
                      >
                        Write the recommendation
                      </Btn>
                      <p className="text-[12.5px] text-muted">
                        You can change your answer. In week 14 you could not.
                      </p>
                    </div>
                  </motion.div>
                )}
              </Panel>
            </div>
          )}

          {/* ------------------------------------------------ stage 6 */}
          {stage >= 6 && (
            <div ref={(el) => { stageRefs.current[6] = el; }} className="mt-12">
              <StageHeader
                index={6}
                total={6}
                tone="valid"
                title="Management recommendation"
                lead="Addressed to the department head. One page. They will read the first paragraph properly and skim the rest — write accordingly."
              />
              <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                <div>
                  <textarea
                    rows={16}
                    value={reco}
                    onChange={(e) => setReco(e.target.value)}
                    aria-label="Management recommendation"
                    placeholder="Empty. You have a diagnosis, an allocation you can defend, a sequence, and one decision made without the data you wanted. That is more than most recommendations start with."
                    className="w-full resize-y rounded-xl border border-subtle bg-deep/60 p-4 text-[14.5px] leading-[1.7] text-ink placeholder:text-muted/75 hover:border-[#33455c] focus:border-valid/60 focus:outline-none focus:ring-2 focus:ring-valid/20"
                  />
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                      {reco.trim() ? `${reco.trim().split(/\s+/).length} words` : 'no text yet'}
                    </p>
                    {longerThan(60)(reco) && !showModel && (
                      <Btn
                        size="sm"
                        variant="valid"
                        onClick={() => {
                          setShowModel(true)
                          setProgress('visionmind', 1)
                        }}
                      >
                        Compare with the curriculum answer
                      </Btn>
                    )}
                  </div>
                </div>
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <ElementChecker items={RECO_ITEMS} text={reco} />
                </div>
              </div>

              <AnimatePresence>
                {showModel && (
                  <motion.div
                    initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduced ? 0.15 : 0.55 }}
                    className="mt-6"
                  >
                    <Panel className="border-valid/25">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <Kicker tone="valid">One defensible answer, not the answer</Kicker>
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                          curriculum model
                        </span>
                      </div>
                      <p className="mt-2 max-w-[74ch] text-[14px] leading-[1.65] text-muted">
                        This is what the curriculum would submit — with its own trade-offs and its own
                        blind spots. Read it as a peer's draft. Where you went somewhere it did not,
                        yours is the better document.
                      </p>

                      <div className="mt-5 grid gap-4 lg:grid-cols-2">
                        <div className="rounded-xl border border-subtle bg-deep/50 p-4">
                          <p className="label-mono">Yours</p>
                          <p className="mt-2 whitespace-pre-wrap text-[13.5px] leading-[1.65] text-ink/85">{reco}</p>
                        </div>
                        <div className="rounded-xl border border-valid/25 bg-deep/50 p-4">
                          <p className="label-mono">Model</p>
                          <p className="mt-2 whitespace-pre-wrap text-[13.5px] leading-[1.65] text-ink/85">
                            {MODEL_RECOMMENDATION}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 rounded-xl border border-subtle bg-deep/60 p-4">
                        <Kicker tone="signal">Ground you covered that the model does not</Kicker>
                        {extraGround.length === 0 ? (
                          <p className="mt-2 text-[13.5px] leading-[1.6] text-muted">
                            Nothing detected outside the model's themes. Not a deficiency — but note
                            that the model is silent on team capability, vendor dependency, stakeholder
                            expectation management and stopping conditions. Any one of those would make
                            your version stronger than the one you are being shown.
                          </p>
                        ) : (
                          <>
                            <ul className="mt-3 flex flex-wrap gap-2">
                              {extraGround.map((t) => (
                                <li key={t.id}>
                                  <Chip active tone="signal">
                                    {t.label}
                                  </Chip>
                                </li>
                              ))}
                            </ul>
                            <p className="mt-3 text-[13.5px] leading-[1.6] text-muted">
                              The model does not address {extraGround.length === 1 ? 'this' : 'these'}. In
                              a real steering meeting, that is exactly where the discussion would go.
                            </p>
                          </>
                        )}
                      </div>

                      <Note tone="valid" label="Completion" className="mt-5">
                        You allocated 70% of what four measures needed, sequenced them, and answered a
                        week-14 request without the data you wanted. Somewhere in there is a measure you
                        consciously postponed. The debrief will ask you to name it — that field is the
                        one people leave blank, and it is the one the group exercise turns on.
                      </Note>

                      <div className="mt-5">
                        <Link to="/debrief">
                          <Btn size="lg" trailing="→" onClick={() => setProgress('visionmind', 1)}>
                            Go to the debrief
                          </Btn>
                        </Link>
                      </div>
                    </Panel>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* --------------------------------------------------- rail */}
        <div className="lg:sticky lg:top-[76px] lg:self-start">
          <ConstraintRail title="Conditions" constraints={CONDITIONS} />
          <div className="mt-4 hidden lg:block">{meterPanel}</div>
        </div>
      </div>
    </PageShell>
  )
}
