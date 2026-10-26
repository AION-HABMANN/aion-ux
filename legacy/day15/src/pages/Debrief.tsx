import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { PageShell } from '@/components/Layout'
import { Btn, Field, Kicker, Note, Panel, StemInput, Tip } from '@/components/primitives'
import { BarRow } from '@/components/charts'
import { useModule } from '@/state/ModuleStore'
import { cn, euro, useReduced } from '@/lib/utils'
import { revealItem, revealList } from '@/lib/motion'

const MEASURE_NAMES: Record<string, string> = {
  m1: '01 · Clear separation',
  m2: '02 · Hypothesis-based piloting',
  m3: '03 · Ethics & consent framework',
  m4: '04 · Evaluation grid',
}

const PROMPTS = [
  {
    id: 'measurability',
    q: 'Where is "measurability" confused with "reliability" in innovation discourse?',
    stem: 'The confusion shows up when…',
    hint: 'Name a place you have actually seen it — a deck, a KPI, a vendor conversation, a board question.',
  },
  {
    id: 'sensible',
    q: 'Which form of eye-tracking use is immediately sensible, and which is rather explorative?',
    stem: 'Immediately sensible: … / Explorative: …',
    hint: 'Two halves, one sentence each. The line between them is the thing worth being able to draw quickly.',
  },
  {
    id: 'ethicsLine',
    q: 'When does neuro-based UX become an ethics or reputation risk instead of a knowledge opportunity?',
    stem: 'It crosses over at the point where…',
    hint: 'A threshold, not a list. What is true on one side of it that is not true on the other?',
  },
] as const

export function Debrief() {
  const reduced = useReduced()
  const { setProgress, focusSense, learningPulse, visionMind, debrief, setDebrief } = useModule()
  const [revealed, setRevealed] = useState(0)
  const [showClosing, setShowClosing] = useState(false)

  useEffect(() => setProgress('debrief', 0.2), [setProgress])

  const delta =
    focusSense.trustBefore !== null && focusSense.trustAfter !== null
      ? focusSense.trustAfter - focusSense.trustBefore
      : null

  const vmAllocated = Object.values(visionMind.budget).reduce((a, b) => a + b, 0)
  const answeredPrompts = Object.values(debrief.reflections).filter((v) => v.trim().length > 10).length

  useEffect(() => {
    if (answeredPrompts === 3 && debrief.postponed.trim().length > 3) setProgress('debrief', 1)
    else if (answeredPrompts > 0) setProgress('debrief', 0.6)
  }, [answeredPrompts, debrief.postponed, setProgress])

  const nothingDone = !focusSense.trustBefore && !learningPulse.variant && vmAllocated === 0

  const printedAt = useMemo(
    () =>
      new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
    [],
  )

  return (
    <>
      <PageShell
        wide
        kicker="Synthesis · L3 · 10 min"
        tone="valid"
        title="Your decision profile"
        lead={
          <>
            Three playgrounds, one page. This is what you would actually take into the room — your
            trust delta, the variant you committed to, the allocation you can defend, and the one
            measure you postponed on purpose.
          </>
        }
      >
        {nothingDone && (
          <Note tone="warn" label="Nothing to synthesise yet" className="mb-6">
            You have not run a playground in this session. The debrief still works — the reflection
            prompts and the export are open to anyone — but the three summaries below will be empty,
            and the group exercise is considerably harder without them.{' '}
            <Link to="/play" className="text-signal underline underline-offset-4">
              Start with FocusSense.
            </Link>
          </Note>
        )}

        {/* ------------------------------------------------ three summaries */}
        <motion.div
          variants={revealList(reduced)}
          initial="hidden"
          animate="show"
          className="grid gap-4 lg:grid-cols-3"
        >
          {/* FocusSense */}
          <motion.div variants={revealItem(reduced)}>
            <Panel className="h-full">
              <Kicker tone="signal">FocusSense · trust delta</Kicker>
              {focusSense.trustBefore === null ? (
                <p className="mt-4 text-[13.5px] leading-[1.6] text-muted">
                  No rating recorded. The delta is the only number in this module worth keeping — it is
                  also the only one that requires you to have been wrong first.
                </p>
              ) : (
                <>
                  <div className="mt-4 flex items-end gap-4">
                    <div>
                      <p className="label-mono">Before</p>
                      <p className="readout text-[34px] leading-none text-muted">{focusSense.trustBefore}</p>
                    </div>
                    <span aria-hidden className="mb-2 text-[18px] text-muted">
                      →
                    </span>
                    <div>
                      <p className="label-mono">After</p>
                      <p
                        className="readout text-[34px] leading-none"
                        style={{
                          color:
                            delta === null
                              ? 'var(--text-muted)'
                              : delta < 0
                                ? 'var(--accent-warn)'
                                : 'var(--accent-signal)',
                        }}
                      >
                        {focusSense.trustAfter ?? '—'}
                      </p>
                    </div>
                    {delta !== null && (
                      <span
                        className={cn(
                          'mb-1.5 ml-auto rounded-md border px-2 py-1 font-mono text-[11px]',
                          delta < 0 ? 'border-warn/45 text-warn' : delta > 0 ? 'border-signal/45 text-signal' : 'border-subtle text-muted',
                        )}
                      >
                        {delta > 0 ? `+${delta}` : delta}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-[13px] leading-[1.6] text-muted">
                    {delta === null
                      ? 'Second rating not given — the callback is the point of that playground.'
                      : delta < 0
                        ? 'Your trust fell after you saw what the findings license. That gap is the module.'
                        : delta > 0
                          ? 'Your trust rose. Defensible — as long as it is the method you trust and not the dashboard.'
                          : 'Unchanged. Either you were calibrated before you started, or the brief still has you.'}
                  </p>
                  {focusSense.risks.length > 0 && (
                    <div className="mt-4 border-t border-subtle pt-3">
                      <p className="label-mono">Your top risks</p>
                      <ul className="mt-2 space-y-1.5">
                        {focusSense.risks.map((r) => (
                          <li key={r} className="text-[12.5px] leading-[1.5] text-ink/80">
                            — {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </Panel>
          </motion.div>

          {/* LearningPulse */}
          <motion.div variants={revealItem(reduced)}>
            <Panel className="h-full">
              <Kicker tone="warn">LearningPulse · variant & residual risk</Kicker>
              {!learningPulse.variant ? (
                <p className="mt-4 text-[13.5px] leading-[1.6] text-muted">
                  No variant committed. The meters there are the cheapest place in this module to find
                  out that you cannot have validity and market proximity at the same time.
                </p>
              ) : (
                <>
                  <p className="mt-3 font-display text-[22px] text-ink">{learningPulse.variantLabel}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    budget {100 - learningPulse.budgetSplit}/{learningPulse.budgetSplit} research/piloting ·{' '}
                    {learningPulse.parallelism > 60
                      ? 'parallel'
                      : learningPulse.parallelism < 40
                        ? 'sequential'
                        : 'mixed'}
                  </p>
                  <div className="mt-4 space-y-2">
                    {Object.entries(learningPulse.meters).map(([k, v]) => (
                      <BarRow
                        key={k}
                        label={k}
                        value={v}
                        max={100}
                        color={
                          k === 'Risk exposure'
                            ? 'var(--accent-risk)'
                            : k === 'Validity'
                              ? 'var(--accent-valid)'
                              : 'var(--accent-signal)'
                        }
                      />
                    ))}
                  </div>
                  {learningPulse.conflicts.residual && (
                    <div className="mt-4 border-t border-subtle pt-3">
                      <p className="label-mono">Residual risk, in your words</p>
                      <p className="mt-1.5 text-[13px] leading-[1.6] text-ink/80">
                        {learningPulse.conflicts.residual}
                      </p>
                    </div>
                  )}
                </>
              )}
            </Panel>
          </motion.div>

          {/* VisionMind */}
          <motion.div variants={revealItem(reduced)}>
            <Panel className="h-full">
              <Kicker tone="neuro">VisionMind · allocation & the call</Kicker>
              {vmAllocated === 0 ? (
                <p className="mt-4 text-[13.5px] leading-[1.6] text-muted">
                  Nothing allocated. Four measures, 70% of the funding they need — the exercise is
                  choosing which one you starve, and saying so out loud.
                </p>
              ) : (
                <>
                  <p className="mt-3 readout text-[13px] text-muted">
                    {euro(vmAllocated * 20000)} of {euro(240000)} committed
                  </p>
                  <div className="mt-3 space-y-2">
                    {Object.entries(MEASURE_NAMES).map(([id, name]) => (
                      <BarRow
                        key={id}
                        label={name}
                        value={(visionMind.budget[id] ?? 0) * 20}
                        max={100}
                        suffix="k"
                        color={
                          id === 'm3'
                            ? 'var(--accent-risk)'
                            : id === 'm2'
                              ? 'var(--accent-neuro)'
                              : id === 'm4'
                                ? 'var(--accent-valid)'
                                : 'var(--accent-signal)'
                        }
                      />
                    ))}
                  </div>
                  <div className="mt-4 space-y-2 border-t border-subtle pt-3">
                    {Object.entries(visionMind.meters).map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-2">
                        <span className="text-[12.5px] text-muted">{k}</span>
                        <span className="readout text-[12.5px] text-ink/85">{v}</span>
                      </div>
                    ))}
                  </div>
                  {visionMind.decisionLabel && (
                    <div className="mt-4 border-t border-subtle pt-3">
                      <p className="label-mono">Week 14, without validity data</p>
                      <p className="mt-1.5 text-[13px] leading-[1.55] text-ink/85">{visionMind.decisionLabel}</p>
                    </div>
                  )}
                </>
              )}
            </Panel>
          </motion.div>
        </motion.div>

        {/* ------------------------------------------------ reflections */}
        <section className="mt-12">
          <div className="flex items-baseline gap-3">
            <h2 className="text-[24px]">Three questions, one at a time</h2>
            <span aria-hidden className="hairline flex-1" />
            <span className="readout text-[11px] text-muted">{answeredPrompts}/3</span>
          </div>
          <p className="mt-2 max-w-[70ch] text-[15px] leading-[1.7] text-muted">
            These are the discussion prompts from the curriculum. They arrive one at a time on purpose
            — the second one reads differently once you have written the first.
          </p>

          <div className="mt-6 space-y-4">
            {PROMPTS.slice(0, revealed + 1).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0.15 : 0.65, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <Panel>
                  <Kicker tone="valid">Prompt {i + 1} of 3</Kicker>
                  <h3 className="mt-2 max-w-[54ch] text-[21px] leading-[1.35]">{p.q}</h3>
                  <div className="mt-4">
                    <StemInput
                      stem={p.stem}
                      hint={p.hint}
                      rows={3}
                      value={debrief.reflections[p.id]}
                      onChange={(e) =>
                        setDebrief({
                          reflections: { ...debrief.reflections, [p.id]: e.target.value },
                        })
                      }
                    />
                  </div>
                </Panel>
              </motion.div>
            ))}
          </div>

          {revealed < PROMPTS.length - 1 && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Btn
                variant="ghost"
                onClick={() => setRevealed((r) => r + 1)}
                disabled={debrief.reflections[PROMPTS[revealed].id].trim().length < 8}
                trailing="↓"
              >
                Next prompt
              </Btn>
              <p className="text-[12.5px] text-muted">
                {debrief.reflections[PROMPTS[revealed].id].trim().length < 8
                  ? 'Answer this one first. Skipping ahead is how three prompts become one.'
                  : 'The next question is sharper than this one.'}
              </p>
            </div>
          )}

          {revealed === PROMPTS.length - 1 && !showClosing && (
            <div className="mt-4">
              <Btn
                variant="valid"
                onClick={() => setShowClosing(true)}
                disabled={answeredPrompts < 3}
                trailing="→"
              >
                {answeredPrompts < 3 ? `${3 - answeredPrompts} prompt(s) open` : 'Closing impulse'}
              </Btn>
            </div>
          )}
        </section>
      </PageShell>

      {/* ------------------------------------------------ closing impulse */}
      <AnimatePresence>
        {showClosing && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0.2 : 1.6, ease: 'easeOut' }}
            className="relative mt-8 flex min-h-[68vh] items-center border-y border-subtle bg-panel/30 px-4 py-16 sm:px-6"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 lab-grid opacity-[0.14]" />
            <div className="relative mx-auto max-w-[900px] text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduced ? 0 : 0.6, duration: reduced ? 0.2 : 1.2 }}
              >
                <Kicker tone="valid">Discussion impulse</Kicker>
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0.1 : 1.1, duration: reduced ? 0.2 : 1.6 }}
                className="mt-5 text-[28px] leading-[1.25] sm:text-[42px]"
              >
                "When is stopping an innovation the better leadership decision than scaling it fast?"
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduced ? 0.15 : 2.6, duration: reduced ? 0.2 : 1.4 }}
                className="mx-auto mt-7 max-w-[64ch] text-[15.5px] leading-[1.75] text-muted"
              >
                Take it into the group with your export. Five minutes each: your prioritised measures,
                and one measure you consciously postponed. The postponed one is the part that shows
                whether you decided or merely allocated.
              </motion.p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------ export */}
      <div className="mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6">
        <Panel>
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <Kicker tone="valid">Export · for the group presentation</Kicker>
              <h2 className="mt-2 text-[24px]">Download your decision profile</h2>
              <p className="mt-2 max-w-[62ch] text-[14.5px] leading-[1.7] text-muted">
                One printable page, generated from what you did in this session. It opens your
                browser's print dialogue — choose "Save as PDF" if you want a file. Nothing is sent
                anywhere; there is nowhere for it to be sent.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Field
                  label="Name for the header"
                  placeholder="Optional"
                  value={debrief.learnerName}
                  onChange={(e) => setDebrief({ learnerName: e.target.value })}
                />
                <div className="sm:col-span-2">
                  <StemInput
                    stem="One measure I consciously postponed — and why"
                    rows={3}
                    value={debrief.postponed}
                    hint="Required for the group exercise. Naming what you did not do is the part that distinguishes a decision from an allocation."
                    onChange={(e) => setDebrief({ postponed: e.target.value })}
                    placeholder="e.g. The evaluation grid. It is the only one of the four that can be carried into the next phase at a known cost — and I will owe management a weaker interface until then."
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Tip label="Opens the browser print dialogue with a dedicated one-page stylesheet. No PDF library, no upload, no tracking.">
                  <span>
                    <Btn size="lg" onClick={() => window.print()} icon="⎙" disabled={debrief.postponed.trim().length < 4}>
                      Download my decision profile
                    </Btn>
                  </span>
                </Tip>
                {debrief.postponed.trim().length < 4 && (
                  <p className="text-[12.5px] text-muted">
                    Fill in the postponed measure first. It is the field the exercise turns on, and the
                    one everybody leaves blank.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-subtle bg-deep/50 p-5">
              <p className="label-mono">What the page contains</p>
              <ul className="mt-3 space-y-2 text-[13px] leading-[1.55] text-muted">
                {[
                  'Trust rating before and after FocusSense, with the delta',
                  'Your LearningPulse variant, configuration and residual risk',
                  'VisionMind allocation across the four measures, in euros and weeks',
                  'The decision you made in week 14 without validity data',
                  'Your three reflection answers',
                  'The measure you consciously postponed',
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <span aria-hidden className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-valid" />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-subtle pt-3 text-[12.5px] leading-[1.55] text-muted">
                Held in memory only. Close this tab and it is gone — print it or lose it.
              </p>
            </div>
          </div>
        </Panel>

        <div className="mt-6 flex flex-wrap justify-between gap-3">
          <Link to="/play">
            <Btn variant="ghost" icon="←">
              Back to the playgrounds
            </Btn>
          </Link>
          <Link to="/">
            <Btn variant="quiet">Module overview</Btn>
          </Link>
        </div>
      </div>

      {/* ------------------------------------------------ print-only page */}
      {/* Portalled to <body> so the print stylesheet can hide #root wholesale
          rather than fighting the app's stacking and layout for one sheet. */}
      {createPortal(
        <div data-print="page" className="hidden">
        <h1>Neuro-UX decision profile</h1>
        <p style={{ marginTop: '2mm' }}>
          Module 7 · Day 2 — eye-tracking, neurofeedback and BCI
          {debrief.learnerName ? ` · ${debrief.learnerName}` : ''} · {printedAt}
        </p>
        <hr data-print="rule" style={{ margin: '4mm 0' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4mm' }}>
          <div data-print="card">
            <h2>FocusSense — trust delta</h2>
            <p>
              Before: <strong>{focusSense.trustBefore ?? '—'}</strong> · After:{' '}
              <strong>{focusSense.trustAfter ?? '—'}</strong>
              {delta !== null ? ` · Delta: ${delta > 0 ? '+' : ''}${delta}` : ''}
            </p>
            {focusSense.opportunities.length > 0 && (
              <>
                <h3 style={{ marginTop: '2mm' }}>Top opportunities</h3>
                <ul>
                  {focusSense.opportunities.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </>
            )}
            {focusSense.risks.length > 0 && (
              <>
                <h3 style={{ marginTop: '2mm' }}>Top risks</h3>
                <ul>
                  {focusSense.risks.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div data-print="card">
            <h2>LearningPulse — chosen variant</h2>
            <p>
              <strong>{learningPulse.variantLabel || '—'}</strong>
              {learningPulse.variant
                ? ` · budget ${100 - learningPulse.budgetSplit}/${learningPulse.budgetSplit} research/piloting · ${
                    learningPulse.parallelism > 60 ? 'parallel' : learningPulse.parallelism < 40 ? 'sequential' : 'mixed'
                  }`
                : ''}
            </p>
            {Object.keys(learningPulse.meters).length > 0 && (
              <p style={{ marginTop: '2mm' }}>
                {Object.entries(learningPulse.meters)
                  .map(([k, v]) => `${k} ${v}`)
                  .join(' · ')}
              </p>
            )}
            {learningPulse.conflicts.residual && (
              <p style={{ marginTop: '2mm' }}>
                <strong>Residual risk:</strong> {learningPulse.conflicts.residual}
              </p>
            )}
          </div>
        </div>

        <div data-print="card" style={{ marginTop: '4mm' }}>
          <h2>VisionMind — allocation and the call</h2>
          <p>
            {Object.entries(MEASURE_NAMES)
              .map(
                ([id, name]) =>
                  `${name}: ${euro((visionMind.budget[id] ?? 0) * 20000)} / ${visionMind.weeks[id] ?? 0}w`,
              )
              .join('  ·  ')}
          </p>
          {Object.keys(visionMind.meters).length > 0 && (
            <p style={{ marginTop: '2mm' }}>
              {Object.entries(visionMind.meters)
                .map(([k, v]) => `${k} ${v}`)
                .join(' · ')}
            </p>
          )}
          {visionMind.decisionLabel && (
            <p style={{ marginTop: '2mm' }}>
              <strong>Week 14, without validity data:</strong> {visionMind.decisionLabel}
            </p>
          )}
        </div>

        <div data-print="card" style={{ marginTop: '4mm' }}>
          <h2>Reflections</h2>
          {PROMPTS.map((p) => (
            <div key={p.id} style={{ marginTop: '2mm' }}>
              <h3>{p.q}</h3>
              <p>{debrief.reflections[p.id] || '—'}</p>
            </div>
          ))}
        </div>

        <div data-print="card" style={{ marginTop: '4mm' }}>
          <h2>Consciously postponed</h2>
          <p>{debrief.postponed || '—'}</p>
        </div>

          <p style={{ marginTop: '4mm', fontSize: '8pt' }}>
            Generated in-browser from an in-memory session. No data was stored or transmitted.
          </p>
        </div>,
        document.body,
      )}
    </>
  )
}
