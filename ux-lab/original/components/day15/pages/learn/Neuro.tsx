import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ContinueBar, PageShell } from '@/original/components/day15/components/Layout'
import { Btn, Kicker, Note, Panel, Tip } from '@/original/components/day15/components/primitives'
import { AssignCard, AssignLive, AssignZone, useAssign } from '@/original/components/day15/components/Assign'
import { useModule } from '@/original/components/day15/state/ModuleStore'
import { cn, useReduced } from '@/original/components/day15/lib/utils'
import { SPRING, revealItem, revealList } from '@/original/components/day15/lib/motion'

/* --------------------------------------------------------- Maturity data */

const STAGES = [
  { id: 'lab', label: 'Lab research', x: 0, hint: 'Works under controlled conditions with trained operators. Publishable, not deployable.' },
  { id: 'pilot', label: 'Explorative pilot', x: 1, hint: 'Worth running to learn something specific, with a defined question and an exit criterion.' },
  { id: 'near', label: 'Product-near', x: 2, hint: 'Robust enough for real users in a bounded scenario, with support and fallbacks in place.' },
  { id: 'shipped', label: 'Shipped feature', x: 3, hint: 'Routine practice. Ships without special pleading, survives contact with ordinary users.' },
] as const

interface Tech {
  id: string
  label: string
  detail: string
  consensus: number // 0..3, fractional on purpose
  verdict: string
}

const TECHS: Tech[] = [
  {
    id: 'et-proto',
    label: 'Eye-tracking for prototype testing',
    detail: 'Lab or remote sessions, small n, comparing two layouts on one task.',
    consensus: 2.9,
    verdict:
      'Routine, and has been for two decades. Screen-based trackers are cheap, analysis is well understood, and comparative claims on the same task are defensible. This is the boring, useful end of the field.',
  },
  {
    id: 'et-prod',
    label: 'Eye-tracking in production',
    detail: 'Gaze captured from real users in the live product, continuously.',
    consensus: 1.2,
    verdict:
      'Split verdict, which is why it trips people up. In VR/AR headsets and driver monitoring it is shipped and unremarkable. On a web portal, via webcam, it is an explorative pilot at best: accuracy collapses, consent gets complicated, and the data volume tempts exactly the overreach this module is about.',
  },
  {
    id: 'eeg-load',
    label: 'EEG-based cognitive load detection',
    detail: 'Consumer or research EEG inferring workload during a task.',
    consensus: 0.8,
    verdict:
      'Real signal, weak specificity. Group-level workload differences are detectable under controlled conditions; per-user, per-screen claims are not. Treat any product that reports an individual "overload index" in real time as an unvalidated inference, not a measurement.',
  },
  {
    id: 'nf-loop',
    label: 'Neurofeedback training loop',
    detail: 'The user sees their own brain signal and learns to modulate it.',
    consensus: 1.0,
    verdict:
      'Decades of clinical literature, persistently contested effect sizes outside specific indications. As a UX feature it is an explorative pilot with an ethics review attached — you are training a person, not testing an interface.',
  },
  {
    id: 'bci-consumer',
    label: 'Consumer BCI as an input method',
    detail: 'Non-invasive headset used to control an interface.',
    consensus: 0.35,
    verdict:
      'Bandwidth is the wall. Non-invasive consumer BCI delivers a few bits per second under good conditions, with training and a still head. Demo-friendly, product-hostile. Anything promising more deserves a very close look at the demo conditions.',
  },
  {
    id: 'bci-assistive',
    label: 'Assistive BCI',
    detail: 'Communication and control for people with severe motor impairment.',
    consensus: 2.3,
    verdict:
      'The most mature serious application, and the one least discussed in commercial UX. Deployed with real clinical support for users who have no better option. The tolerance for slow, effortful input is completely different when the alternative is nothing.',
  },
]

/* --------------------------------------------------------- The spectrum */

function MaturitySpectrum({ onComplete }: { onComplete: () => void }) {
  const reduced = useReduced()
  const [placed, setPlaced] = useState<Record<string, number>>({})
  const [revealed, setRevealed] = useState(false)
  const [inspect, setInspect] = useState<string | null>(null)

  const assign = useAssign((techId, zoneId) => {
    const stage = STAGES.find((s) => s.id === zoneId)
    if (!stage) return
    setPlaced((p) => ({ ...p, [techId]: stage.x }))
  })

  const tray = TECHS.filter((t) => placed[t.id] === undefined)
  const allPlaced = tray.length === 0

  useEffect(() => {
    if (allPlaced) onComplete()
  }, [allPlaced, onComplete])

  return (
    <Panel>
      <AssignLive message={assign.announce} />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Kicker tone="neuro">Interactive · maturity spectrum</Kicker>
          <h3 className="mt-2 text-[21px]">Place six technologies where you think they actually are</h3>
          <p className="mt-1.5 max-w-[62ch] text-[14px] leading-[1.65] text-muted">
            Not where the vendor puts them, and not where you would like them to be. Drag a card into
            a column — or select it and press <span className="readout">Place here</span> if you are on
            a keyboard or a phone.
          </p>
        </div>
        {allPlaced && !revealed && (
          <Btn variant="neuro" onClick={() => setRevealed(true)} trailing="→">
            Show expert consensus
          </Btn>
        )}
      </div>

      {/* tray */}
      <div className="mt-5 rounded-xl border border-subtle bg-deep/40 p-4">
        <div className="mb-3 flex items-baseline justify-between">
          <p className="label-mono">Unplaced</p>
          <span className="readout text-[11px] text-muted">
            {tray.length}/{TECHS.length}
          </span>
        </div>
        {tray.length === 0 ? (
          <p className="text-[13px] text-muted">
            All six placed. Whatever you do next, you have now committed to a position — which is more
            than most roadmaps do.
          </p>
        ) : (
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {tray.map((t) => (
              <AssignCard
                key={t.id}
                selected={assign.selected === t.id}
                tone="neuro"
                {...assign.itemProps(t.id, t.label)}
              >
                <p className="text-[13.5px] font-medium leading-[1.4] text-ink">{t.label}</p>
                <p className="mt-1 text-[12px] leading-[1.5] text-muted">{t.detail}</p>
              </AssignCard>
            ))}
          </div>
        )}
      </div>

      {/* stages */}
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {STAGES.map((s) => {
          const items = TECHS.filter((t) => placed[t.id] === s.x)
          return (
            <AssignZone
              key={s.id}
              label={s.label}
              tone="neuro"
              count={items.length}
              active={assign.hoverZone === s.id || (assign.selected !== null && items.length === 0)}
              canPlace={assign.selected !== null}
              onPlace={() => assign.place(s.id, s.label)}
              hint={s.hint}
              {...assign.zoneProps(s.id, s.label)}
            >
              {items.length > 0 && (
                <>
                  {items.map((t) => (
                    <motion.button
                      key={t.id}
                      type="button"
                      layout={!reduced}
                      onClick={() => setInspect(inspect === t.id ? null : t.id)}
                      transition={SPRING}
                      className="w-full rounded-lg border border-neuro/35 bg-neuro/[0.07] p-2.5 text-left"
                    >
                      <p className="text-[12.5px] font-medium leading-[1.35] text-ink">{t.label}</p>
                      {revealed && (
                        <p
                          className={cn(
                            'mt-1 font-mono text-[10px] uppercase tracking-[0.1em]',
                            Math.abs(t.consensus - s.x) < 0.6 ? 'text-valid' : 'text-warn',
                          )}
                        >
                          consensus {t.consensus.toFixed(1)} · you {s.x.toFixed(1)}
                        </p>
                      )}
                    </motion.button>
                  ))}
                  <p className="pt-1 text-[11.5px] leading-[1.45] text-muted">{s.hint}</p>
                </>
              )}
            </AssignZone>
          )
        })}
      </div>

      {/* gap ruler */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.5 }}
            className="mt-6 rounded-xl border border-subtle bg-deep/50 p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <Kicker tone="neuro">The gap</Kicker>
              <p className="text-[12px] text-muted">
                No score. Ghosted markers are the consensus; solid markers are yours.
              </p>
            </div>

            <div className="mt-5 space-y-4">
              {TECHS.map((t, i) => {
                const mine = placed[t.id] ?? 0
                const gap = Math.abs(mine - t.consensus)
                return (
                  <div key={t.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setInspect(inspect === t.id ? null : t.id)}
                        className="truncate text-left text-[13px] text-ink/85 underline decoration-dotted underline-offset-4 hover:text-ink"
                      >
                        {t.label}
                      </button>
                      <span
                        className={cn(
                          'readout shrink-0 text-[11px]',
                          gap < 0.6 ? 'text-valid' : gap < 1.3 ? 'text-warn' : 'text-risk',
                        )}
                      >
                        Δ {gap.toFixed(1)}
                      </span>
                    </div>
                    <div className="relative mt-2 h-6">
                      <span aria-hidden className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-subtle" />
                      {[0, 1, 2, 3].map((tick) => (
                        <span
                          key={tick}
                          aria-hidden
                          className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-subtle"
                          style={{ left: `${(tick / 3) * 100}%` }}
                        />
                      ))}
                      <motion.span
                        aria-hidden
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: reduced ? 0 : 0.2 + i * 0.07 }}
                        className="absolute top-1/2 h-[3px] -translate-y-1/2 bg-warn/40"
                        style={{
                          left: `${(Math.min(mine, t.consensus) / 3) * 100}%`,
                          width: `${(gap / 3) * 100}%`,
                        }}
                      />
                      <span
                        aria-hidden
                        className="absolute top-1/2 h-[13px] w-[13px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-muted"
                        style={{ left: `${(t.consensus / 3) * 100}%` }}
                      />
                      <motion.span
                        aria-hidden
                        initial={{ scale: reduced ? 1 : 0 }}
                        animate={{ scale: 1 }}
                        transition={{ ...SPRING, delay: reduced ? 0 : i * 0.07 }}
                        className="absolute top-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neuro shadow-[0_0_12px_-2px_var(--accent-neuro)]"
                        style={{ left: `${(mine / 3) * 100}%` }}
                      />
                    </div>
                    <AnimatePresence>
                      {inspect === t.id && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden text-[13px] leading-[1.6] text-muted"
                        >
                          <span className="block pt-2">{t.verdict}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            <div className="mt-5 flex flex-wrap justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              {STAGES.map((s) => (
                <span key={s.id}>{s.label}</span>
              ))}
            </div>

            <Note tone="neuro" label="Read the shape, not the deltas" className="mt-5">
              Most people underestimate assistive BCI and overestimate consumer BCI. Both errors come
              from the same place: judging a technology by its demo rather than by the conditions its
              demo required.
            </Note>
          </motion.div>
        )}
      </AnimatePresence>
    </Panel>
  )
}

/* -------------------------------------------------------------------- Page */

export function Neuro() {
  const reduced = useReduced()
  const { setProgress } = useModule()
  const [done, setDone] = useState(false)

  useEffect(() => setProgress('neuro', 0.15), [setProgress])

  return (
    <PageShell
      kicker="Learning · 03 · L2"
      tone="neuro"
      title="Neurofeedback and BCI, at their actual altitude."
      lead={
        <>
          Brain-based interaction is the part of this field with the strongest pull on a leadership
          audience and the widest gap between demo and deployment. The useful question is never
          "does it work?" — something always works, under some conditions. The question is{' '}
          <span className="text-neuro">under which conditions, at what cost, for whom</span>.
        </>
      }
    >
      <motion.div variants={revealList(reduced)} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={revealItem(reduced)}>
          <Panel>
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <Kicker tone="neuro">The concept</Kicker>
                <h3 className="mt-2 text-[21px]">Feedback loops and interaction built on brain activity</h3>
                <div className="prose-lab mt-3">
                  <p>
                    Two families sit under the same heading. <strong>Neurofeedback</strong> shows a
                    person a representation of their own neural signal so they can learn to modulate
                    it — the loop closes through the user. <strong>Brain-computer interfaces</strong>{' '}
                    translate neural signal into control input — the loop closes through the system.
                  </p>
                  <p>
                    Almost everything commercially available is non-invasive, which means it is
                    reading a weak, noisy, indirect trace through the skull. That constraint is not a
                    detail. It sets the ceiling for everything downstream: bandwidth, reliability,
                    calibration burden, and how much interpretation has to be layered on top.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-xl border border-valid/25 bg-deep/50 p-4">
                  <Kicker tone="valid">The opportunity, stated fairly</Kicker>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-muted">
                    A continuous, unprompted signal correlated with cognitive load and attentional
                    state — something no survey and no interview can give you, because both require
                    the user to stop and report. For adaptive systems, training environments and
                    assistive contexts, that is a genuinely new input.
                  </p>
                </div>
                <div className="rounded-xl border border-risk/25 bg-deep/50 p-4">
                  <Kicker tone="risk">The cost, stated equally fairly</Kicker>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-muted">
                    Setup and calibration per session. Signal quality that degrades with movement,
                    hair, sweat and boredom. Interpretation that is statistical at group level and
                    speculative at individual level. And a category of data that changes your legal
                    and reputational position the moment you collect it.
                  </p>
                </div>
              </div>
            </div>
          </Panel>
        </motion.div>

        <motion.div variants={revealItem(reduced)}>
          <MaturitySpectrum
            onComplete={() => {
              setDone(true)
              setProgress('neuro', 0.8)
            }}
          />
        </motion.div>

        <motion.div variants={revealItem(reduced)}>
          <Panel>
            <Kicker tone="neuro">Where it is actually applied today</Kicker>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                {
                  t: 'Training & simulation',
                  d: 'High-stakes training environments use load estimates to adapt difficulty — aviation, surgery, defence. The population is small, trained and consenting, and a technician is in the room.',
                  tone: 'signal' as const,
                },
                {
                  t: 'Adaptive systems',
                  d: 'Interfaces that back off when the user appears loaded. Compelling in principle; in practice the failure mode is a system that adapts confidently to a misreading, and the user cannot see why.',
                  tone: 'warn' as const,
                },
                {
                  t: 'Assistive usage',
                  d: 'The clearest value case in the field. Slow, effortful input is acceptable when the alternative is no input at all — a trade-off that does not transfer to a consumer product.',
                  tone: 'valid' as const,
                },
              ].map((x) => (
                <div key={x.t} className="rounded-xl border border-subtle bg-deep/50 p-4">
                  <Kicker tone={x.tone}>{x.t}</Kicker>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-muted">{x.d}</p>
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>

        <motion.div variants={revealItem(reduced)}>
          <Panel className="border-valid/25">
            <Kicker tone="valid">Executive implication</Kicker>
            <h3 className="mt-2 text-[22px]">Fund the question, not the technology</h3>
            <p className="mt-3 max-w-[74ch] text-[15px] leading-[1.7] text-ink/80">
              Every one of these methods can be defended as a pilot and none of them can be defended
              as a platform decision on current evidence. The practical governance move is to separate
              the budget line: exploration is funded to answer a written question by a written date,
              with an exit criterion. Product integration is funded only against validity evidence
              that already exists.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Tip label="A pilot without an exit criterion is not a pilot. It is a subscription.">
                <div className="w-full cursor-help rounded-lg border border-subtle bg-deep/60 p-3.5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-signal">Ask the team</p>
                  <p className="mt-1.5 text-[13.5px] leading-[1.55] text-ink/80">
                    "What result would make us stop?"
                  </p>
                </div>
              </Tip>
              <Tip label="If the answer is a lab study on 18 undergraduates, that is fine — but it is not the same claim as 'validated'.">
                <div className="w-full cursor-help rounded-lg border border-subtle bg-deep/60 p-3.5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-signal">Ask the vendor</p>
                  <p className="mt-1.5 text-[13.5px] leading-[1.55] text-ink/80">
                    "Validated against what, on whom, and published where?"
                  </p>
                </div>
              </Tip>
            </div>
          </Panel>
        </motion.div>
      </motion.div>

      <ContinueBar
        sectionId="neuro"
        disabled={!done}
        disabledNote="Place all six technologies on the spectrum. Committing to positions is the exercise; the consensus is only interesting afterwards."
        note="Next: Ethics & data protection — why this data is a different category."
      />
    </PageShell>
  )
}
