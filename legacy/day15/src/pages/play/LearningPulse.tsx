import { motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageShell } from '@/components/Layout'
import { Btn, Kicker, LabSlider, Note, Panel, StageHeader, StemInput, Tip } from '@/components/primitives'
import { ConstraintBar, ConstraintRail, type Constraint } from '@/components/ConstraintHUD'
import { Meter, type MeterTone } from '@/components/Meter'
import { ElementChecker, has, longerThan, type CoverageItem } from '@/components/ElementChecker'
import { useModule } from '@/state/ModuleStore'
import { clamp, cn, useReduced } from '@/lib/utils'
import { SPRING, revealItem, revealList, swapIn } from '@/lib/motion'

/* ------------------------------------------------------------- The physics */

type VariantId = 'A' | 'B' | 'C'
type MeterId = 'knowledge' | 'validity' | 'risk' | 'acceptance' | 'market' | 'economic'

interface Variant {
  id: VariantId
  name: string
  scope: string
  effort: string
  interpRisk: string
  learning: string
  base: Record<MeterId, number>
  /** Structural ceilings. No slider setting can push past these. */
  caps: Partial<Record<MeterId, number>>
  character: string
}

const VARIANTS: Variant[] = [
  {
    id: 'A',
    name: 'Comprehensive',
    scope:
      'Full eye-tracking plus experimental neurofeedback, aimed at optimising attention and learning flow inside the product.',
    effort: 'High',
    interpRisk: 'High',
    learning: 'High',
    base: { knowledge: 84, validity: 40, risk: 82, acceptance: 34, market: 64, economic: 32 },
    caps: { validity: 54, acceptance: 58, economic: 50 },
    character:
      'The variant the brief wants. It generates the most material and the least defensible material — at the moment the organisation has neither the interpretation skill nor the governance to hold it.',
  },
  {
    id: 'B',
    name: 'Targeted',
    scope:
      'Eye-tracking for prototype tests and interface analysis only. No product integration, no neuro layer.',
    effort: 'Medium',
    interpRisk: 'Low',
    learning: 'Medium',
    base: { knowledge: 58, validity: 80, risk: 24, acceptance: 76, market: 46, economic: 76 },
    caps: { knowledge: 70, market: 60 },
    character:
      'The variant that survives every meeting and excites nobody. It answers smaller questions properly and leaves the neuro question entirely open — which is either discipline or avoidance, depending on what you say about it.',
  },
  {
    id: 'C',
    name: 'Explorative',
    scope:
      'Structured observational scan of BCI and neuro technologies, with minimal immediate product use.',
    effort: 'Low',
    interpRisk: 'Low',
    learning: 'High',
    base: { knowledge: 64, validity: 60, risk: 18, acceptance: 68, market: 22, economic: 82 },
    caps: { market: 42, validity: 72 },
    character:
      'Cheap, safe, and genuinely informative about the field — while producing nothing the product organisation can use in five months. Its risk is not failure. Its risk is being quietly defunded because nobody could point at anything.',
  },
]

const METER_META: Record<MeterId, { label: string; tone: MeterTone; inverse?: boolean; explain: string }> = {
  knowledge: {
    label: 'Knowledge gain',
    tone: 'signal',
    explain:
      'How much you understand at the end that you did not understand at the start. Peaks when research design and piloting are balanced — pure research goes untested, pure piloting produces results nobody can interpret.',
  },
  validity: {
    label: 'Validity',
    tone: 'valid',
    explain:
      'Whether the findings hold up when someone competent examines the method. Falls with piloting pressure and with parallelism, because both shorten the interval between measuring and concluding.',
  },
  risk: {
    label: 'Risk exposure',
    tone: 'risk',
    inverse: true,
    explain:
      'Higher is worse. Combined interpretation, ethics and reputation exposure. Rises with product proximity, with neuro methods, and with running things in parallel.',
  },
  acceptance: {
    label: 'Acceptance',
    tone: 'neuro',
    explain:
      'Whether the target group and the internal organisation go along with it. This audience is broad and unprepared for neuro-based technology, which caps how far this can move in five months.',
  },
  market: {
    label: 'Market proximity',
    tone: 'warn',
    explain:
      'How close the output is to something the business can point at. Rises with piloting and parallel work — and pulls validity down as it climbs, every time.',
  },
  economic: {
    label: 'Economic viability',
    tone: 'valid',
    explain:
      'Return per euro and per week under a limited research budget. Heavy piloting costs more; parallel work delivers sooner. The two do not cancel out.',
  },
}

/**
 * The trade-off engine.
 *
 * Two levers, six outputs, and no configuration that wins on all of them.
 * `budget` runs research (0) → piloting (100); `parallel` runs sequential (0) →
 * parallel (100). Everything is linear and legible on purpose: the learner has
 * to be able to feel *which* lever cost them the meter.
 */
function computeMeters(variant: Variant, budget: number, parallel: number) {
  const p = (budget - 50) / 50 // + = piloting-heavy
  const q = (parallel - 50) / 50 // + = parallel
  const balance = Math.abs(p) // distance from a balanced split

  const raw: Record<MeterId, number> = {
    knowledge: variant.base.knowledge - 16 * balance - 7 * q,
    validity: variant.base.validity - 20 * p - 18 * q,
    risk: variant.base.risk + 16 * p + 15 * q,
    acceptance: variant.base.acceptance - 11 * p - 13 * q,
    market: variant.base.market + 23 * p + 15 * q,
    economic: variant.base.economic - 13 * p + 15 * q - 8 * balance,
  }

  const value = {} as Record<MeterId, number>
  const ceiling = {} as Record<MeterId, number>
  ;(Object.keys(raw) as MeterId[]).forEach((k) => {
    const cap = variant.caps[k] ?? 100
    ceiling[k] = cap
    value[k] = clamp(Math.min(raw[k], cap))
  })
  return { value, ceiling }
}

/* --------------------------------------------------------------- Timeline */

interface MonthBeat {
  month: number
  delivered: string
  unknown: string
}

function buildTimeline(variant: Variant, budget: number, parallel: number): MonthBeat[] {
  const pilotHeavy = budget > 62
  const researchHeavy = budget < 38
  const par = parallel > 60
  const seq = parallel < 40

  const base: Record<VariantId, MonthBeat[]> = {
    A: [
      { month: 1, delivered: 'Vendor selected. Ethics questions raised for the first time.', unknown: 'Whether the consent text survives the works council.' },
      { month: 2, delivered: 'Lab setup, calibration protocol, first eight sessions recorded.', unknown: 'Whether the neurofeedback signal is stable outside the lab.' },
      { month: 3, delivered: 'First heatmaps circulate internally. They circulate faster than the caveats.', unknown: 'What the load index actually tracks.' },
      { month: 4, delivered: 'Attention metrics proposed as a product KPI — by someone who was not in the sessions.', unknown: 'Whether any of it replicates.' },
      { month: 5, delivered: 'A rich, contested dataset and an internal disagreement about what it licenses.', unknown: 'The thing you were asked: does this improve learning outcomes?' },
    ],
    B: [
      { month: 1, delivered: 'Test protocol written, two IA variants specified.', unknown: 'Whether the neuro question can be deferred without political cost.' },
      { month: 2, delivered: 'First prototype round, 12 participants, clean comparative design.', unknown: 'How far the findings generalise beyond the tested screens.' },
      { month: 3, delivered: 'Navigation finding replicated in a second round. It holds.', unknown: 'Whether anyone outside UX notices.' },
      { month: 4, delivered: 'Interface changes specified against evidence, with limitations stated in the same document.', unknown: 'What the neuro layer would have shown.' },
      { month: 5, delivered: 'Two defensible findings, implemented. No headline.', unknown: 'Whether "we tested properly" reads as leadership or as timidity.' },
    ],
    C: [
      { month: 1, delivered: 'Technology landscape scoped, evaluation criteria defined.', unknown: 'Whether the organisation has the patience for a scan.' },
      { month: 2, delivered: 'Vendor demos and published-evidence review, criteria applied consistently.', unknown: 'How any of it behaves on your users.' },
      { month: 3, delivered: 'Maturity map with named exit criteria per technology.', unknown: 'Everything empirical about your own product.' },
      { month: 4, delivered: 'A defensible "not yet — and here is the trigger that would change that".', unknown: 'Whether "not yet" is heard as an answer.' },
      { month: 5, delivered: 'A decision framework and a watch list. Zero product changes.', unknown: 'Whether the budget survives the next planning round.' },
    ],
  }

  const beats = base[variant.id].map((b) => ({ ...b }))

  if (pilotHeavy) {
    beats[1].delivered = `${beats[1].delivered} Piloting is pulled forward; the research design stays thin.`
    beats[4].unknown = `${beats[4].unknown} And whether the pilot measured the right thing at all.`
  }
  if (researchHeavy) {
    beats[2].delivered = `${beats[2].delivered} Method is solid; nothing has been tried in context yet.`
    beats[4].delivered = `${beats[4].delivered} Rigorous — and thinner on anything anyone can point at.`
  }
  if (par) {
    beats[0].delivered = `${beats[0].delivered} Three workstreams start at once.`
    beats[3].delivered = `${beats[3].delivered} Two workstreams are now waiting on a result the third has not produced.`
  }
  if (seq) {
    beats[3].delivered = `${beats[3].delivered} Sequencing held: month 5 arrives with one stream finished rather than three half-finished.`
  }
  return beats
}

function month5Quote(m: Record<MeterId, number>): { line: string; who: string } {
  if (m.validity < 45)
    return {
      line: '"This is fascinating. Can we say it publicly — and when a customer asks how we know, what do we tell them?"',
      who: 'Head of Communications, month 5',
    }
  if (m.market < 35)
    return {
      line: '"So what have we actually got? I need one slide, and right now I have a reading list."',
      who: 'Managing Director, month 5',
    }
  if (m.risk > 60)
    return {
      line: '"Legal has questions about the recordings. Who signed off on the consent text?"',
      who: 'Data Protection Officer, month 5',
    }
  if (m.acceptance < 45)
    return {
      line: '"Two pilot participants asked to be removed from the study. Word got around."',
      who: 'Learning & Development lead, month 5',
    }
  return {
    line: '"This is smaller than what we announced internally. It is also the only part I would repeat in front of a customer."',
    who: 'Head of Product, month 5',
  }
}

/* --------------------------------------------------------------- Coverage */

const RECO_ITEMS: CoverageItem[] = [
  {
    key: 'priority',
    label: 'Clear priority',
    explain: 'One named recommendation, not three options of equal weight. Detects wording like "recommend", "propose", "variant", "prioritise".',
    test: has('recommend', 'propose', 'we should', 'priority', 'prioritis', 'prioritiz', 'variant'),
  },
  {
    key: 'justification',
    label: 'Justification',
    explain: 'A stated reason, not a preference. Detects "because", "given", "since", "rationale", "so that".',
    test: has('because', 'given', 'since', 'reason', 'rationale', 'in order to', 'so that'),
  },
  {
    key: 'tradeoff',
    label: 'Named trade-off',
    explain: 'What you are giving up, said out loud. Detects "trade-off", "at the cost of", "give up", "instead of".',
    test: has('trade-off', 'tradeoff', 'at the cost', 'give up', 'sacrific', 'in exchange', 'forgo', 'instead of'),
  },
  {
    key: 'residual',
    label: 'Residual risk',
    explain: 'The risk that remains after your decision — not the one you avoided. Detects "residual", "risk remains", "uncertain", "exposure".',
    test: has('residual', 'remaining risk', 'risk remains', 'still risk', 'uncertain', 'we still', 'exposure'),
  },
  {
    key: 'next',
    label: 'Next decision point',
    explain: 'When this gets revisited, and on what trigger. Detects "review", "checkpoint", "month", "week", "revisit", "gate".',
    test: has('review', 'checkpoint', 'month', 'week', 'gate', 'revisit', 'decision point'),
  },
]

const CONDITIONS: Constraint[] = [
  { key: 'image', label: 'Wants to appear innovative and science-adjacent', value: 'pressure', tone: 'warn' },
  { key: 'budget', label: 'Research and piloting budget', value: 'limited', tone: 'warn' },
  { key: 'audience', label: 'Target group', value: 'broad · unprepared', tone: 'risk' },
  { key: 'ethics', label: 'Data protection & ethics', value: 'sensitive', tone: 'risk' },
  { key: 'refs', label: 'References in own market', value: 'few', tone: 'muted' },
  { key: 'time', label: 'First results expected', value: '5 months', tone: 'signal' },
]

/* -------------------------------------------------------------------- Page */

export function LearningPulse() {
  const reduced = useReduced()
  const { setProgress, setLearningPulse, learningPulse } = useModule()

  const [stage, setStage] = useState(1)
  const [variant, setVariant] = useState<VariantId | null>(learningPulse.variant)
  const [budget, setBudget] = useState(learningPulse.budgetSplit)
  const [parallel, setParallel] = useState(learningPulse.parallelism)
  const [justification, setJustification] = useState(learningPulse.justification)
  const [committed, setCommitted] = useState(false)
  const [timelineStep, setTimelineStep] = useState(0)
  const [conflicts, setConflicts] = useState(learningPulse.conflicts)
  const [reco, setReco] = useState(learningPulse.recommendation)

  const stageRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const advance = useCallback((to: number) => {
    setStage((s) => Math.max(s, to))
    window.setTimeout(() => stageRefs.current[to]?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
  }, [])

  useEffect(() => setProgress('learningpulse', 0.1), [setProgress])

  const active = VARIANTS.find((v) => v.id === variant) ?? null

  const { value: meters, ceiling } = useMemo(() => {
    if (active) return computeMeters(active, budget, parallel)
    const zero = { knowledge: 0, validity: 0, risk: 0, acceptance: 0, market: 0, economic: 0 } as Record<MeterId, number>
    return { value: zero, ceiling: {} as Record<MeterId, number> }
  }, [active, budget, parallel])

  const timeline = useMemo(() => (active ? buildTimeline(active, budget, parallel) : []), [active, budget, parallel])

  useEffect(() => {
    if (!committed || timelineStep >= 5) return undefined
    const id = window.setTimeout(() => setTimelineStep((s) => s + 1), reduced ? 260 : 950)
    return () => window.clearTimeout(id)
  }, [committed, timelineStep, reduced])

  const conflictsFilled = Object.values(conflicts).filter((v) => v.trim().length > 12).length

  useEffect(() => {
    setLearningPulse({
      variant,
      variantLabel: active ? `${active.id} — ${active.name}` : '',
      budgetSplit: budget,
      parallelism: parallel,
      meters: Object.fromEntries(
        (Object.keys(METER_META) as MeterId[]).map((k) => [METER_META[k].label, Math.round(meters[k])]),
      ),
      justification,
      conflicts,
      recommendation: reco,
      completed: reco.trim().length > 40 && committed,
    })
  }, [variant, active, budget, parallel, meters, justification, conflicts, reco, committed, setLearningPulse])

  const quote = month5Quote(meters)

  const meterPanel = (
    <div className="rounded-xl border border-subtle bg-panel p-5">
      <div className="flex items-baseline justify-between">
        <Kicker tone="signal">Consequence meters</Kicker>
        <Tip label="Six outputs, two levers, and no setting that maximises all of them. A thin vertical tick on a track marks that meter's structural ceiling for the variant you picked — no slider gets past it.">
          <span className="label-mono cursor-help">live</span>
        </Tip>
      </div>
      {!active ? (
        <p className="mt-4 text-[13px] leading-[1.6] text-muted">
          No variant selected. The meters read zero rather than showing you a plausible-looking
          baseline — a habit worth borrowing.
        </p>
      ) : (
        <div className="mt-2 divide-y divide-subtle/60">
          {(Object.keys(METER_META) as MeterId[]).map((k) => (
            <Meter
              key={k}
              label={METER_META[k].label}
              value={meters[k]}
              tone={METER_META[k].tone}
              inverse={METER_META[k].inverse}
              explain={METER_META[k].explain}
              ceiling={ceiling[k]}
              compact
            />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <PageShell
      wide
      kicker="Playground 02 · L2 · 15 min"
      tone="warn"
      title="LearningPulse"
      lead={
        <>
          Three innovation approaches for a broad-audience learning platform. The company wants to
          appear innovative and science-adjacent; the research budget is limited; the target group is
          not prepared for neuro-based technology; and{' '}
          <span className="text-warn">first results are expected within five months</span>.
        </>
      }
    >
      <ConstraintBar title="Fixed conditions" constraints={CONDITIONS} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_306px]">
        <div className="min-w-0">
          {/* ------------------------------------------------ stage 1 */}
          <div ref={(el) => (stageRefs.current[1] = el)}>
            <StageHeader
              index={1}
              total={4}
              tone="warn"
              title="Pick the approach you would defend"
              lead="Select one to arm the meters. Switch as often as you like — they recompute from scratch every time, and comparing them is the exercise."
            />
            <motion.div variants={revealList(reduced)} initial="hidden" animate="show" className="grid gap-3 md:grid-cols-3">
              {VARIANTS.map((v) => (
                <motion.button
                  key={v.id}
                  variants={revealItem(reduced)}
                  type="button"
                  onClick={() => {
                    setVariant(v.id)
                    setProgress('learningpulse', 0.25)
                  }}
                  aria-pressed={variant === v.id}
                  whileHover={reduced ? undefined : { y: -4 }}
                  transition={SPRING}
                  className={cn(
                    'flex h-full flex-col rounded-xl border p-4 text-left transition-colors duration-200',
                    variant === v.id
                      ? 'border-warn/60 bg-warn/[0.07]'
                      : 'border-subtle bg-panel hover:border-[#33455c] hover:bg-elevated',
                  )}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="readout text-[13px] text-warn">{v.id}</span>
                    <span className="font-display text-[17px] font-semibold text-ink">{v.name}</span>
                  </div>
                  <p className="mt-2 text-[13px] leading-[1.6] text-muted">{v.scope}</p>
                  <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-subtle pt-3">
                    {[
                      ['Effort', v.effort],
                      ['Interp. risk', v.interpRisk],
                      ['Learning', v.learning],
                    ].map(([k, val]) => (
                      <div key={k}>
                        <dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">{k}</dt>
                        <dd className="readout text-[12px] text-ink/85">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </motion.button>
              ))}
            </motion.div>

            {active && (
              <motion.div key={active.id} {...swapIn(reduced)} className="mt-3">
                <Note tone="warn" label={`Variant ${active.id}`}>
                  {active.character}
                </Note>
              </motion.div>
            )}

            {active && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <LabSlider
                  label="Budget allocation"
                  value={budget}
                  onChange={setBudget}
                  leftLabel="research"
                  rightLabel="piloting"
                  readout={`${100 - budget}/${budget}`}
                  tooltip="How the limited budget splits between research design and piloting. Piloting buys market proximity and costs validity. A balanced split maximises knowledge gain — neither extreme does."
                />
                <LabSlider
                  label="Timeline pressure"
                  value={parallel}
                  onChange={setParallel}
                  leftLabel="sequential"
                  rightLabel="parallel"
                  readout={parallel > 60 ? 'parallel' : parallel < 40 ? 'sequential' : 'mixed'}
                  tone="warn"
                  tooltip="Five months is fixed. This is how much runs at once. Parallel work delivers something sooner and shortens the gap between measuring and concluding — which is exactly where validity is lost."
                />
              </div>
            )}

            <div className="mt-5 lg:hidden">{meterPanel}</div>

            {active && (
              <div className="mt-5">
                <Btn
                  onClick={() => {
                    advance(2)
                    setProgress('learningpulse', 0.35)
                  }}
                  trailing="→"
                >
                  Commit to this configuration
                </Btn>
              </div>
            )}
          </div>

          {/* ------------------------------------------------ stage 2 */}
          {stage >= 2 && active && (
            <div ref={(el) => (stageRefs.current[2] = el)} className="mt-12">
              <StageHeader
                index={2}
                total={4}
                tone="warn"
                title="Commit, in one line"
                lead="One sentence of justification, then five months run whether you like the configuration or not."
              />
              <Panel>
                <label htmlFor="lp-just" className="label-mono">
                  Why variant {active.id}, at this budget split and this parallelism
                </label>
                <textarea
                  id="lp-just"
                  rows={2}
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  placeholder="One line. The version you would say out loud, not the version for the minutes."
                  className="mt-2 w-full resize-y rounded-lg border border-subtle bg-deep/70 px-3.5 py-2.5 text-[14px] leading-[1.6] text-ink placeholder:text-muted/75 hover:border-[#33455c] focus:border-warn/70 focus:outline-none focus:ring-2 focus:ring-warn/25"
                />
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Btn
                    variant="ghost"
                    disabled={justification.trim().length < 12 || committed}
                    onClick={() => {
                      setCommitted(true)
                      setProgress('learningpulse', 0.5)
                    }}
                    trailing="▶"
                  >
                    {committed ? 'Running' : 'Run month 1 → 5'}
                  </Btn>
                  {!committed && (
                    <p className="text-[12.5px] text-muted">
                      {justification.trim().length < 12
                        ? 'A configuration without a sentence behind it is a guess with sliders.'
                        : 'The timeline uses your exact settings. Changing them afterwards will not rewrite it.'}
                    </p>
                  )}
                </div>

                {committed && (
                  <div className="mt-6">
                    <ol className="relative space-y-3 border-l border-subtle pl-5">
                      {timeline.slice(0, timelineStep).map((b) => (
                        <motion.li
                          key={b.month}
                          initial={{ opacity: 0, x: reduced ? 0 : -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: reduced ? 0.15 : 0.42 }}
                          className="relative"
                        >
                          <span
                            aria-hidden
                            className="absolute -left-[26px] top-2 h-2.5 w-2.5 rounded-full border border-warn/60 bg-deep"
                          />
                          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-warn">
                            Month {b.month}
                          </p>
                          <p className="mt-1 text-[14px] leading-[1.6] text-ink/85">{b.delivered}</p>
                          <p className="mt-1 text-[13px] leading-[1.55] text-muted">
                            <span className="font-mono text-[10px] uppercase tracking-[0.12em]">still unknown · </span>
                            {b.unknown}
                          </p>
                        </motion.li>
                      ))}
                    </ol>

                    {timelineStep < 5 && (
                      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                        Weighting the trade-offs… month {timelineStep}/5
                      </p>
                    )}

                    {timelineStep >= 5 && (
                      <motion.div
                        initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reduced ? 0.15 : 0.5, delay: reduced ? 0 : 0.3 }}
                        className="mt-6 rounded-xl border border-warn/30 bg-deep/60 p-5"
                      >
                        <p className="font-display text-[19px] leading-[1.45] text-ink">{quote.line}</p>
                        <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                          — {quote.who}
                        </p>
                        <Btn
                          className="mt-5"
                          onClick={() => {
                            advance(3)
                            setProgress('learningpulse', 0.65)
                          }}
                          trailing="→"
                        >
                          Name the conflicts
                        </Btn>
                      </motion.div>
                    )}
                  </div>
                )}
              </Panel>
            </div>
          )}

          {/* ------------------------------------------------ stage 3 */}
          {stage >= 3 && (
            <div ref={(el) => (stageRefs.current[3] = el)} className="mt-12">
              <StageHeader
                index={3}
                total={4}
                tone="risk"
                title="Name the conflicts"
                lead="Not the risks you avoided — the tensions still in the room after you decided."
              />
              <div className="space-y-3">
                <StemInput
                  stem="Research claim vs. market maturity: the conflict is…"
                  value={conflicts.claim}
                  onChange={(e) => setConflicts((c) => ({ ...c, claim: e.target.value }))}
                  placeholder="What the method can support, against what the market is being told."
                />
                <StemInput
                  stem="Innovation visibility vs. accountable introduction: the conflict is…"
                  value={conflicts.visibility}
                  onChange={(e) => setConflicts((c) => ({ ...c, visibility: e.target.value }))}
                  placeholder="Who benefits from the announcement, and who carries it if it does not hold."
                />
                <StemInput
                  stem="Despite this decision, the risk that remains is…"
                  value={conflicts.residual}
                  onChange={(e) => setConflicts((c) => ({ ...c, residual: e.target.value }))}
                  placeholder="The one you accepted knowingly. Every configuration leaves one."
                />
              </div>
              <div className="mt-4">
                <Btn
                  disabled={conflictsFilled < 3}
                  onClick={() => {
                    advance(4)
                    setProgress('learningpulse', 0.8)
                  }}
                  trailing="→"
                >
                  {conflictsFilled < 3 ? `${3 - conflictsFilled} left` : 'Write the recommendation'}
                </Btn>
              </div>
            </div>
          )}

          {/* ------------------------------------------------ stage 4 */}
          {stage >= 4 && (
            <div ref={(el) => (stageRefs.current[4] = el)} className="mt-12">
              <StageHeader
                index={4}
                total={4}
                tone="valid"
                title="Recommendation to project management"
                lead="Half a page at most. The margin checker looks for the presence of five elements — it does not read for quality, and there is no score."
              />
              <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                <div>
                  <textarea
                    rows={12}
                    value={reco}
                    onChange={(e) => setReco(e.target.value)}
                    aria-label="Recommendation to project management"
                    placeholder="Empty. The blank page is the honest starting point — but you already have a variant, a configuration, five months of consequences and three named conflicts."
                    className="w-full resize-y rounded-xl border border-subtle bg-deep/60 p-4 text-[14.5px] leading-[1.7] text-ink placeholder:text-muted/75 hover:border-[#33455c] focus:border-valid/60 focus:outline-none focus:ring-2 focus:ring-valid/20"
                  />
                  <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                    {reco.trim() ? `${reco.trim().split(/\s+/).length} words` : 'no text yet'}
                  </p>
                </div>
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <ElementChecker items={RECO_ITEMS} text={reco} />
                  {longerThan(40)(reco) && (
                    <div className="mt-3">
                      <Note tone="valid" label="Completion">
                        You committed to a configuration, watched it play out, and wrote the version
                        you would sign. The measure here is not the meters — it is whether the
                        recommendation still reads well to you on Monday.
                      </Note>
                      <div className="mt-3 flex flex-col gap-2">
                        <Link to="/play/visionmind">
                          <Btn block trailing="→" onClick={() => setProgress('learningpulse', 1)}>
                            Continue to VisionMind Lab
                          </Btn>
                        </Link>
                        <Link to="/debrief">
                          <Btn block variant="ghost" onClick={() => setProgress('learningpulse', 1)}>
                            Save and go to debrief
                          </Btn>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --------------------------------------------------- rail */}
        <div className="lg:sticky lg:top-[76px] lg:self-start">
          <ConstraintRail title="Fixed conditions" constraints={CONDITIONS} />
          <div className="mt-4 hidden lg:block">{meterPanel}</div>
        </div>
      </div>
    </PageShell>
  )
}
