import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ContinueBar, PageShell } from '@/original/components/day15/components/Layout'
import { Btn, Kicker, Note, Panel, Tip } from '@/original/components/day15/components/primitives'
import { useModule } from '@/original/components/day15/state/ModuleStore'
import { cn, useReduced } from '@/original/components/day15/lib/utils'
import { SPRING, revealItem, revealList, swapIn } from '@/original/components/day15/lib/motion'

/* ------------------------------------------------------------------ Layers */

const LAYERS = [
  {
    key: 'gaze',
    title: 'Gaze tracking',
    tone: 'signal',
    answers: 'Where the eyes were, for how long, in what order.',
    cannot: 'Whether the person was reading, searching, stuck, or thinking about lunch.',
    instrument: 'Camera + calibration. Millisecond resolution.',
  },
  {
    key: 'attention',
    title: 'Attention guidance',
    tone: 'warn',
    answers: 'Whether a layout pulls the eye to the elements you intended.',
    cannot: 'Whether the pull was useful. A confusing element is extremely good at attracting gaze.',
    instrument: 'Gaze data + a design hypothesis you supplied.',
  },
  {
    key: 'cognition',
    title: 'Cognitive processing',
    tone: 'neuro',
    answers: 'Almost nothing, directly. It is inferred, never observed.',
    cannot: 'Be read off a heatmap at all. Comprehension needs task outcomes, think-aloud, or recall.',
    instrument: 'Inference, plus every assumption you did not write down.',
  },
] as const

function LayerComparator() {
  const reduced = useReduced()
  const [active, setActive] = useState<string>('gaze')

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Three different things people mean by attention data">
        {LAYERS.map((l) => (
          <button
            key={l.key}
            role="tab"
            aria-selected={active === l.key}
            onClick={() => setActive(l.key)}
            className={cn(
              'rounded-lg border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200',
              active === l.key
                ? l.tone === 'signal'
                  ? 'border-signal/60 bg-signal/12 text-signal'
                  : l.tone === 'warn'
                    ? 'border-warn/60 bg-warn/12 text-warn'
                    : 'border-neuro/60 bg-neuro/12 text-neuro'
                : 'border-subtle bg-elevated/50 text-muted hover:text-ink',
            )}
          >
            {l.title}
          </button>
        ))}
      </div>

      <div className="relative mt-4 min-h-[184px]">
        {LAYERS.filter((l) => l.key === active).map((l) => (
          <motion.div key={l.key} {...swapIn(reduced)} className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-subtle bg-deep/50 p-4">
              <Kicker tone="valid">Can answer</Kicker>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-ink/85">{l.answers}</p>
            </div>
            <div className="rounded-xl border border-subtle bg-deep/50 p-4">
              <Kicker tone="risk">Cannot answer</Kicker>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-ink/85">{l.cannot}</p>
            </div>
            <p className="sm:col-span-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              Instrument: {l.instrument}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------- The Three Explanations */

const EXPLANATIONS = [
  {
    key: 'engagement',
    label: 'Engagement',
    claim: 'The field is important to them.',
    tone: 'valid' as const,
    reveal:
      'Entirely consistent with the data. High-stakes fields — salary, IBAN, notice period — hold the eye because people check their own input. Nothing in the recording contradicts this.',
    consequence: 'If you act on it: you leave the field exactly as it is, and you may have preserved a friction point.',
  },
  {
    key: 'friction',
    label: 'Friction',
    claim: 'The field is confusing.',
    tone: 'warn' as const,
    reveal:
      'Equally consistent. Re-reading a label, hunting for a format hint, and second-guessing a validation rule all produce long dwell on a small area. This is the reading most teams jump to.',
    consequence: 'If you act on it: you redesign a field that may not have been the problem, and you report a win.',
  },
  {
    key: 'noise',
    label: 'Noise',
    claim: 'They were distracted by something offscreen.',
    tone: 'risk' as const,
    reveal:
      'Also consistent — and the one nobody puts in the deck. A colleague spoke, a notification fired, the room was warm. The eyes rested on the last thing they happened to be pointed at.',
    consequence: 'If you act on it: nothing. Which is sometimes the correct move, and never the popular one.',
  },
]

function DwellVisual({ running }: { running: boolean }) {
  const reduced = useReduced()
  const [t, setT] = useState(0)

  useEffect(() => {
    if (!running || reduced) {
      setT(6.2)
      return undefined
    }
    setT(0)
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const elapsed = Math.min(6.2, (now - start) / 320)
      setT(elapsed)
      if (elapsed < 6.2) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [running, reduced])

  return (
    <div className="relative overflow-hidden rounded-xl border border-subtle bg-deep p-5">
      <div aria-hidden className="pointer-events-none absolute inset-0 lab-grid opacity-30" />
      <div className="relative">
        <p className="label-mono">Recording · participant P07 · form step 2/4</p>

        <div className="mt-4 space-y-2.5">
          <div className="h-8 rounded-md border border-subtle bg-panel/70" />
          <div className="relative">
            <div className="flex h-11 items-center rounded-md border border-signal/50 bg-panel px-3 text-[13px] text-muted">
              Employment start date
            </div>
            <motion.span
              aria-hidden
              className="absolute left-[38%] top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal bg-signal/25"
              animate={{
                width: 18 + (t / 6.2) * 44,
                height: 18 + (t / 6.2) * 44,
                opacity: 0.35 + (t / 6.2) * 0.5,
              }}
              transition={{ duration: 0.1 }}
              style={{ boxShadow: '0 0 26px -4px var(--accent-signal)' }}
            />
          </div>
          <div className="h-8 w-2/3 rounded-md border border-subtle bg-panel/70" />
        </div>

        <div className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-3 border-t border-subtle pt-4">
          <div>
            <p className="label-mono">Dwell time</p>
            <p className="readout text-[26px] leading-none text-signal">{t.toFixed(1)}s</p>
          </div>
          <div>
            <p className="label-mono">Fixations</p>
            <p className="readout text-[26px] leading-none text-ink">{Math.round((t / 6.2) * 9)}</p>
          </div>
          <div>
            <p className="label-mono">Revisits</p>
            <p className="readout text-[26px] leading-none text-ink">{t > 3 ? 3 : Math.floor(t)}</p>
          </div>
          <p className="ml-auto max-w-[30ch] text-[12px] leading-[1.5] text-muted">
            Clean recording. Good calibration. No missing samples. The data is not the problem.
          </p>
        </div>
      </div>
    </div>
  )
}

function ThreeExplanations({ onChoose }: { onChoose: (key: string) => void }) {
  const reduced = useReduced()
  const [phase, setPhase] = useState<'watch' | 'choose' | 'reveal'>('watch')
  const [picked, setPicked] = useState<string | null>(null)

  const choose = (key: string) => {
    setPicked(key)
    onChoose(key)
    // Slow on purpose. This is the beat the whole module turns on.
    window.setTimeout(() => setPhase('reveal'), reduced ? 240 : 900)
  }

  return (
    <section
      aria-label="Three explanations"
      // Full-bleed by position: this section is a sibling of PageShell, so it
      // already spans the main column and needs no negative margin to escape.
      className="relative mt-10 w-full border-y border-subtle bg-panel/40 px-4 py-10 sm:px-6 sm:py-14"
    >
      <div className="mx-auto max-w-[980px]">
        <Kicker tone="warn">The beat</Kicker>
        <h2 className="mt-2 text-[26px] sm:text-[32px]">One pattern. Three readings. Zero arbitration.</h2>
        <p className="mt-3 max-w-[66ch] text-[15.5px] leading-[1.7] text-muted">
          A participant held their gaze on a single form field for 6.2 seconds — roughly four times the
          surrounding average. The recording is clean. Below are the three explanations that will be
          offered in your next review meeting. Pick the one you would put in the summary.
        </p>

        <div className="mt-6">
          <DwellVisual running={phase !== 'watch'} />
        </div>

        {phase === 'watch' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 flex flex-wrap items-center gap-4"
          >
            <Btn size="lg" onClick={() => setPhase('choose')} trailing="→">
              Replay and interpret
            </Btn>
            <p className="text-[13px] text-muted">
              6.2 seconds. You have seen a hundred slides built on less.
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {phase !== 'watch' && (
            <motion.div
              variants={revealList(reduced, 0.15)}
              initial="hidden"
              animate="show"
              className="mt-6 grid gap-4 md:grid-cols-3"
            >
              {EXPLANATIONS.map((e) => {
                const isPicked = picked === e.key
                const revealed = phase === 'reveal'
                return (
                  <motion.div key={e.key} variants={revealItem(reduced)}>
                    <motion.button
                      type="button"
                      disabled={phase === 'reveal'}
                      onClick={() => choose(e.key)}
                      aria-pressed={isPicked}
                      whileHover={reduced || revealed ? undefined : { y: -4 }}
                      transition={SPRING}
                      className={cn(
                        'flex h-full w-full flex-col rounded-xl border p-5 text-left transition-all duration-500',
                        revealed && !isPicked && 'border-subtle bg-panel opacity-80 desaturated',
                        revealed && isPicked && 'border-warn/60 bg-panel',
                        !revealed && isPicked && 'border-signal/70 bg-elevated',
                        !revealed && !isPicked && 'border-subtle bg-panel hover:border-[#33455c] hover:bg-elevated',
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <Kicker tone={e.tone}>{e.label}</Kicker>
                        {revealed && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-valid">
                            <span aria-hidden>✓ </span>consistent
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-[16px] font-medium leading-[1.5] text-ink">{e.claim}</p>

                      <AnimatePresence>
                        {revealed && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: reduced ? 0.15 : 0.5, delay: reduced ? 0 : 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-3 text-[13.5px] leading-[1.6] text-muted">{e.reveal}</p>
                            <p className="mt-3 border-t border-subtle pt-3 text-[13px] leading-[1.55] text-ink/70">
                              {e.consequence}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {isPicked && phase === 'reveal' && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: reduced ? 0.1 : 1.1, duration: 0.6 }}
                          className="mt-4 font-display text-[15px] font-semibold leading-[1.45] text-warn"
                        >
                          You just chose a narrative. The eye-tracker did not.
                        </motion.p>
                      )}
                    </motion.button>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === 'reveal' && (
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0.15 : 1.6, duration: reduced ? 0.15 : 0.7 }}
              className="mt-8"
            >
              <div className="rounded-2xl border border-warn/30 bg-deep/60 p-6 sm:p-8">
                <p className="max-w-[62ch] font-display text-[20px] leading-[1.4] text-ink sm:text-[24px]">
                  All three explanations fit the same 6.2 seconds. The recording cannot rank them.
                  Somebody has to — and that somebody is not an instrument.
                </p>
                <p className="mt-4 max-w-[68ch] text-[15px] leading-[1.7] text-muted">
                  This is not a flaw in eye-tracking. It is what eye-tracking is: a precise record of
                  where the eyes went, silent on why. The overinterpretation begins at the exact moment
                  someone converts "6.2 seconds of dwell" into "users find this confusing" without
                  saying out loud that a step was taken.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { m: 'Ask them', d: 'Retrospective think-aloud on that exact field. Cheap, immediate, and it collapses two of the three readings within an hour.' },
                    { m: 'Check the outcome', d: 'Did they complete the field correctly, first try? Task success separates engagement from friction better than any heatmap.' },
                    { m: 'Look at the session', d: 'Was the pattern present in the other participants, or only in P07? One participant is an anecdote with a calibration file.' },
                  ].map((x) => (
                    <div key={x.m} className="rounded-xl border border-subtle bg-panel p-4">
                      <Kicker tone="signal">{x.m}</Kicker>
                      <p className="mt-2 text-[13px] leading-[1.6] text-muted">{x.d}</p>
                    </div>
                  ))}
                </div>

                <Note tone="warn" label="Take this with you" className="mt-6">
                  The question that survives every neuro-UX meeting: <strong>"What else would produce
                  exactly this data?"</strong> If nobody in the room can answer it, the finding is a
                  hypothesis wearing a lab coat.
                </Note>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* -------------------------------------------------- Interpretation ladder */

const RUNGS = [
  {
    label: 'Signal',
    text: 'Pupil position sampled at 60 Hz, mapped to screen coordinates.',
    risk: 'Calibration drift, tracker loss, participant posture.',
    tone: 'signal' as const,
  },
  {
    label: 'Measure',
    text: '9 fixations totalling 6.2 seconds within the field bounding box.',
    risk: 'Where you drew the box. Fixation threshold settings.',
    tone: 'signal' as const,
  },
  {
    label: 'Observation',
    text: 'This participant spent unusually long on this field.',
    risk: 'Unusual compared to what baseline, and with what sample size?',
    tone: 'warn' as const,
  },
  {
    label: 'Interpretation',
    text: 'The field causes difficulty.',
    risk: 'Three explanations fit. You have silently chosen one.',
    tone: 'warn' as const,
  },
  {
    label: 'Decision',
    text: 'Redesign the field before the next release.',
    risk: 'Budget spent, a real problem possibly untouched, and a precedent set.',
    tone: 'risk' as const,
  },
]

function InterpretationLadder() {
  const reduced = useReduced()
  const [rung, setRung] = useState(1)
  const current = RUNGS[rung]

  return (
    <Panel>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <Kicker tone="warn">Interactive · the ladder</Kicker>
          <h3 className="mt-2 text-[20px]">Every step up is cheap. Only the last one has a budget line.</h3>
        </div>
        <Tip label="Drag the slider to climb from raw signal to the decision it ends up justifying. Nothing warns you when you cross from measure to interpretation — that is the point.">
          <span className="label-mono cursor-help">How to read this</span>
        </Tip>
      </div>

      <div className="mt-5 flex items-stretch gap-3">
        <div className="flex flex-col-reverse justify-between py-1">
          {RUNGS.map((r, i) => (
            <button
              key={r.label}
              type="button"
              onClick={() => setRung(i)}
              aria-current={rung === i}
              className={cn(
                'flex items-center gap-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] transition-colors',
                rung === i ? 'text-ink' : 'text-muted hover:text-ink/80',
              )}
            >
              <motion.span
                aria-hidden
                animate={{ scale: rung === i && !reduced ? 1.3 : 1 }}
                transition={SPRING}
                className={cn(
                  'inline-block h-2 w-2 rounded-full',
                  i <= rung
                    ? RUNGS[i].tone === 'risk'
                      ? 'bg-risk'
                      : RUNGS[i].tone === 'warn'
                        ? 'bg-warn'
                        : 'bg-signal'
                    : 'bg-subtle',
                )}
              />
              {r.label}
            </button>
          ))}
        </div>

        <div className="min-w-0 flex-1 rounded-xl border border-subtle bg-deep/50 p-5">
          <motion.div key={current.label} {...swapIn(reduced)}>
            <Kicker tone={current.tone}>
              Rung {rung + 1}/5 · {current.label}
            </Kicker>
            <p className="mt-3 text-[18px] leading-[1.5] text-ink">{current.text}</p>
            <p className="mt-4 border-t border-subtle pt-3 text-[13.5px] leading-[1.6] text-muted">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                What can go wrong here ·{' '}
              </span>
              {current.risk}
            </p>
          </motion.div>

          <input
            type="range"
            min={0}
            max={4}
            step={1}
            value={rung}
            onChange={(e) => setRung(Number(e.target.value))}
            aria-label="Interpretation ladder rung"
            className="lab-range mt-5 w-full"
            style={
              {
                '--pct': `${(rung / 4) * 100}%`,
                '--accent': current.tone === 'risk' ? 'var(--accent-risk)' : current.tone === 'warn' ? 'var(--accent-warn)' : 'var(--accent-signal)',
              } as React.CSSProperties
            }
          />
          <div className="mt-1.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            <span>instrument</span>
            <span>invoice</span>
          </div>
        </div>
      </div>
    </Panel>
  )
}

/* -------------------------------------------------------------------- Page */

export function Limits() {
  const reduced = useReduced()
  const { setProgress } = useModule()
  const [chosen, setChosen] = useState<string | null>(null)

  useEffect(() => setProgress('limits', 0.15), [setProgress])

  return (
    <>
      <PageShell
        kicker="Learning · 02 · L1"
        tone="warn"
        title="Gaze is not understanding."
        lead={
          <>
            Eye-tracking measures one thing with real precision: the position of a gaze over time.
            Everything else you have ever heard attributed to it — interest, confusion, comprehension,
            intent, cognitive load — is <span className="text-warn">added by a human being</span>{' '}
            afterwards. This section is about the moment that addition happens, because it is almost
            never announced.
          </>
        }
      >
        <motion.div variants={revealList(reduced)} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={revealItem(reduced)}>
            <Panel>
              <Kicker tone="signal">Three things people mean by "attention data"</Kicker>
              <h3 className="mt-2 text-[20px]">They are routinely used as synonyms. They are not synonyms.</h3>
              <p className="mt-3 max-w-[70ch] text-[15px] leading-[1.7] text-muted">
                In most meetings, these three collapse into one word. Separating them is the cheapest
                rigor available to you — it costs one sentence and it changes what the room can claim.
              </p>
              <div className="mt-5">
                <LayerComparator />
              </div>
            </Panel>
          </motion.div>

          <motion.div variants={revealItem(reduced)}>
            <InterpretationLadder />
          </motion.div>
        </motion.div>
      </PageShell>

      <ThreeExplanations
        onChoose={(k) => {
          setChosen(k)
          setProgress('limits', 0.8)
        }}
      />

      <div className="mx-auto w-full max-w-[1080px] px-4 pb-2 pt-10 sm:px-6">
        <Panel className="border-valid/25">
          <Kicker tone="valid">Executive implication</Kicker>
          <h3 className="mt-2 text-[22px]">What this changes on Monday</h3>
          <ul className="mt-4 space-y-3.5">
            {[
              {
                t: 'Separate the finding from the reading, in writing.',
                d: '"Dwell time on field X was 4× baseline" is a finding. "Field X confuses users" is a reading. Put both in the report, on separate lines, and let the room see the step.',
              },
              {
                t: 'Ask for the competing explanation before you approve budget.',
                d: 'If the team cannot name a second reading of their own data, they have not analysed it — they have narrated it.',
              },
              {
                t: 'Treat converging methods as the unit of evidence.',
                d: 'Gaze plus task success plus a retrospective question is evidence. Gaze alone is a lead. Fund the triangulation, not the tracker.',
              },
              {
                t: 'Watch for the aura.',
                d: 'Precision of measurement is being used, everywhere, as a proxy for reliability of conclusion. They are unrelated properties. A tracker sampling at 120 Hz is exactly as silent about meaning as one sampling at 30.',
              },
            ].map((x) => (
              <li key={x.t} className="border-l-2 border-valid/40 pl-4">
                <p className="text-[15px] font-medium text-ink">{x.t}</p>
                <p className="mt-1 text-[14px] leading-[1.65] text-muted">{x.d}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <ContinueBar
          sectionId="limits"
          disabled={!chosen}
          disabledNote="Choose one of the three explanations first. Committing to a reading is the exercise."
          note="Next: Neurofeedback & BCI — and a maturity map you can hold against a roadmap."
        />
      </div>
    </>
  )
}
