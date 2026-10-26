import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ContinueBar, PageShell } from '@/components/day15/components/Layout'
import { Btn, Chip, Kicker, Note, Panel, Tip } from '@/components/day15/components/primitives'
import { Plot2x2, type PlotPoint } from '@/components/day15/components/charts'
import { useModule } from '@/components/day15/state/ModuleStore'
import { cn, useReduced } from '@/components/day15/lib/utils'
import { SPRING, revealItem, revealList, swapIn } from '@/components/day15/lib/motion'

/* ------------------------------------------------------ Argument rehearsal */

interface Response {
  id: string
  short: string
  text: string
  relationship: number // 0..1
  epistemics: number // 0..1
  consequence: string
  tone: string
}

const RESPONSES: Response[] = [
  {
    id: 'agree',
    short: 'Accept it',
    text: '"Agreed — the data is what it is. Let\'s build the roadmap around what the users looked at."',
    relationship: 0.92,
    epistemics: 0.06,
    tone: 'var(--accent-signal)',
    consequence:
      'Plausible. But three of your stakeholders would now treat this as proof, and you are the most senior person who could have said otherwise. When the redesign underperforms in six months, the eye-tracking will not be blamed — the design team will.',
  },
  {
    id: 'blunt',
    short: 'Correct it flatly',
    text: '"It isn\'t objective. Gaze data says nothing about why anyone looked anywhere. This is exactly the error that wastes research budgets."',
    relationship: 0.18,
    epistemics: 0.88,
    tone: 'var(--accent-warn)',
    consequence:
      'Epistemically clean, and you have just made the most enthusiastic person in the room defend their position instead of examine it. Correct once in public and you may not get invited to the next data review — which is where you were useful.',
  },
  {
    id: 'both',
    short: 'Split the claim',
    text: '"You\'re right that it\'s a record of where they looked — that part is solid and I want to keep it. What it doesn\'t give us is why. What would we need to see to be confident about the why?"',
    relationship: 0.86,
    epistemics: 0.9,
    tone: 'var(--accent-valid)',
    consequence:
      'You conceded the true half loudly and drew the line on the false half quietly, then handed the room a question it can actually work on. Nobody was corrected; the claim was still narrowed. This is what "resisting the scientific aura" looks like when it works.',
  },
  {
    id: 'defer',
    short: 'Defer it',
    text: '"Let\'s not get stuck on methodology — we can revisit the interpretation question after launch."',
    relationship: 0.58,
    epistemics: 0.08,
    tone: 'var(--accent-risk)',
    consequence:
      'The most common response in the room, and it costs more than the blunt one. The claim stays on the record unchallenged, the launch cements it, and "after launch" arrives with the finding already embedded in three decks and one OKR.',
  },
]

function ArgumentRehearsal({ onTried }: { onTried: () => void }) {
  const reduced = useReduced()
  const [picked, setPicked] = useState<string | null>(null)
  const [tried, setTried] = useState<string[]>([])

  const choose = (id: string) => {
    setPicked(id)
    setTried((t) => (t.includes(id) ? t : [...t, id]))
    onTried()
  }

  const current = RESPONSES.find((r) => r.id === picked)

  const points: PlotPoint[] = RESPONSES.filter((r) => tried.includes(r.id)).map((r) => ({
    key: r.id,
    label: r.short,
    x: r.relationship,
    y: r.epistemics,
    tone: r.tone,
    ghost: r.id !== picked,
  }))

  return (
    <Panel>
      <Kicker tone="valid">Interactive · argument rehearsal</Kicker>
      <h3 className="mt-2 text-[21px]">The sentence you will hear, and the four ways out</h3>

      {/* stakeholder */}
      <div className="mt-5 flex flex-wrap items-start gap-4 rounded-xl border border-subtle bg-deep/60 p-5 sm:flex-nowrap">
        <div
          aria-hidden
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-signal/40 bg-signal/10 font-display text-[15px] font-bold text-signal"
        >
          MK
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
            Head of Product · data review · 14 minutes in
          </p>
          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.4 }}
            className="mt-2 font-display text-[19px] leading-[1.45] text-ink sm:text-[21px]"
          >
            "The eye-tracking data is objective. It's not an opinion — it's what the users actually
            looked at."
          </motion.p>
          <p className="mt-2 text-[13px] text-muted">
            Half of that sentence is true. Answering as though all of it is false is the trap.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-2.5">
          {RESPONSES.map((r) => (
            <motion.button
              key={r.id}
              type="button"
              onClick={() => choose(r.id)}
              aria-pressed={picked === r.id}
              whileHover={reduced ? undefined : { y: -2 }}
              transition={SPRING}
              className={cn(
                'w-full rounded-xl border p-4 text-left transition-colors duration-200',
                picked === r.id
                  ? 'border-valid/55 bg-valid/[0.06]'
                  : tried.includes(r.id)
                    ? 'border-subtle bg-deep/40'
                    : 'border-subtle bg-deep/50 hover:border-[#33455c] hover:bg-elevated/60',
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                  {r.short}
                </span>
                {tried.includes(r.id) && (
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted">
                    plotted
                  </span>
                )}
              </div>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-ink/90">{r.text}</p>
            </motion.button>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-subtle bg-deep/60 p-4">
            <div className="flex items-baseline justify-between">
              <p className="label-mono">Response space</p>
              <Tip label="Two axes, no total. A response can be right and still cost you the room; it can preserve the room and leave a false claim standing. The upper-right quadrant is the only one that does both jobs.">
                <span className="label-mono cursor-help">?</span>
              </Tip>
            </div>
            {points.length === 0 ? (
              <p className="mt-6 text-center text-[13px] leading-[1.6] text-muted">
                Nothing plotted yet. Pick a response — the plot fills in as you try them, and trying
                all four is the point.
              </p>
            ) : (
              <div className="mt-2">
                <Plot2x2
                  points={points}
                  xLabel="Preserves the relationship"
                  yLabel="Corrects the epistemics"
                />
              </div>
            )}
          </div>

          {current && (
            <motion.div key={current.id} {...swapIn(reduced)} className="mt-3">
              <Note tone={current.id === 'both' ? 'valid' : current.id === 'agree' ? 'warn' : 'risk'} label="Consequence">
                {current.consequence}
              </Note>
            </motion.div>
          )}

          {tried.length > 0 && tried.length < 4 && (
            <p className="mt-3 text-center text-[12.5px] text-muted">
              {4 - tried.length} response{4 - tried.length === 1 ? '' : 's'} unplotted. There is no
              penalty for trying them — this is a rehearsal, not a test.
            </p>
          )}
          {tried.length === 4 && (
            <div className="mt-3">
              <Btn size="sm" variant="ghost" block onClick={() => setPicked(null)}>
                Clear selection
              </Btn>
            </div>
          )}
        </div>
      </div>
    </Panel>
  )
}

/* ----------------------------------------------- Operative vs. strategic */

interface DecisionItem {
  id: string
  text: string
  answer: 'operative' | 'strategic'
  why: string
}

const DECISIONS: DecisionItem[] = [
  {
    id: 'vendor',
    text: 'Which eye-tracking vendor and hardware the research team buys',
    answer: 'operative',
    why: 'Reversible, bounded, and the team knows more than you do. Delegating this is not abdication — it is the correct allocation of attention.',
  },
  {
    id: 'live',
    text: 'Whether gaze findings may drive live product changes without validity evidence',
    answer: 'strategic',
    why: 'This sets the evidentiary standard for every future finding. Decide it once, in advance, or it gets decided repeatedly by whoever is most persuasive that week.',
  },
  {
    id: 'sample',
    text: 'How many participants per test round',
    answer: 'operative',
    why: 'A methods decision with methods trade-offs. Ask for the reasoning, do not supply the number.',
  },
  {
    id: 'collect',
    text: 'Whether this company collects neuro-physiological data from users at all',
    answer: 'strategic',
    why: 'Irreversible in reputational terms and hard to unwind operationally. Once the capability and the appetite exist, "should we?" stops being asked.',
  },
  {
    id: 'stop',
    text: 'Who holds the authority to stop a study on ethics grounds',
    answer: 'strategic',
    why: 'A governance decision that costs nothing to make early and cannot be made credibly during an incident. If the answer is "we would escalate", the answer is nobody.',
  },
  {
    id: 'mature',
    text: 'What counts as mature enough to put in front of the board',
    answer: 'strategic',
    why: 'This is where research quality meets management reality. Without an explicit bar, the bar becomes "whatever fits on a slide".',
  },
]

function DecisionSorter({ onDone }: { onDone: () => void }) {
  const reduced = useReduced()
  const [picks, setPicks] = useState<Record<string, 'operative' | 'strategic'>>({})
  const [revealed, setRevealed] = useState(false)
  const complete = Object.keys(picks).length === DECISIONS.length

  useEffect(() => {
    if (revealed) onDone()
  }, [revealed, onDone])

  return (
    <Panel>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Kicker tone="valid">Interactive · what is actually yours</Kicker>
          <h3 className="mt-2 text-[21px]">Operative or strategic?</h3>
          <p className="mt-1.5 max-w-[62ch] text-[14px] leading-[1.65] text-muted">
            The failure mode at senior level is not making bad calls. It is making the operative ones
            — which are visible, concrete and satisfying — while the strategic ones happen by default.
          </p>
        </div>
        {complete && !revealed && (
          <Btn variant="valid" onClick={() => setRevealed(true)} trailing="→">
            Compare
          </Btn>
        )}
      </div>

      <ul className="mt-5 space-y-2.5">
        {DECISIONS.map((d) => {
          const pick = picks[d.id]
          const agrees = pick === d.answer
          return (
            <li
              key={d.id}
              className={cn(
                'rounded-xl border p-3.5 transition-all duration-300',
                revealed && pick && !agrees ? 'border-warn/40 bg-deep/40' : 'border-subtle bg-deep/50',
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="min-w-0 flex-1 text-[14px] leading-[1.55] text-ink/90">{d.text}</p>
                <div className="flex shrink-0 gap-2">
                  {(['operative', 'strategic'] as const).map((opt) => (
                    <Chip
                      key={opt}
                      active={pick === opt}
                      tone={opt === 'strategic' ? 'valid' : 'signal'}
                      onClick={revealed ? undefined : () => setPicks((p) => ({ ...p, [d.id]: opt }))}
                    >
                      {opt}
                    </Chip>
                  ))}
                </div>
              </div>
              <AnimatePresence>
                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: reduced ? 0.15 : 0.35 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 border-t border-subtle pt-3 text-[13px] leading-[1.6] text-muted">
                      <span
                        className={cn(
                          'font-mono text-[10.5px] uppercase tracking-[0.14em]',
                          d.answer === 'strategic' ? 'text-valid' : 'text-signal',
                        )}
                      >
                        {d.answer} ·{' '}
                      </span>
                      {d.why}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>

      {revealed && (
        <Note tone="valid" label="The pattern" className="mt-4">
          Every strategic item here is about <strong>standards and authority</strong> — what counts as
          evidence, who can stop what. Every operative one is about <strong>execution</strong>. If you
          find yourself in the vendor conversation and not in the evidentiary-standard conversation,
          you have swapped roles with your team.
        </Note>
      )}
    </Panel>
  )
}

/* -------------------------------------------------------------------- Page */

export function Leadership() {
  const reduced = useReduced()
  const { setProgress } = useModule()
  const [rehearsed, setRehearsed] = useState(false)

  useEffect(() => setProgress('leadership', 0.15), [setProgress])

  return (
    <PageShell
      kicker="Learning · 05 · L3"
      tone="valid"
      title="Your job is the standard, not the study."
      lead={
        <>
          Three things arrive at your desk wearing the same clothes: solid UX research, experimental
          technology, and a marketable application. They have different evidence requirements,
          different failure modes and different budget logic — and the only person positioned to
          insist on the distinction is <span className="text-valid">the one who does not run any of
          them</span>.
        </>
      }
    >
      <motion.div variants={revealList(reduced)} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={revealItem(reduced)}>
          <Panel>
            <Kicker>Three things, one budget line</Kicker>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                {
                  t: 'Solid UX research',
                  tone: 'valid' as const,
                  need: 'Reproducible method, stated limitations, converging evidence.',
                  fail: 'Slow, unglamorous, occasionally tells you the roadmap is wrong.',
                  fund: 'Fund as an operating cost. It is infrastructure.',
                },
                {
                  t: 'Experimental technology',
                  tone: 'neuro' as const,
                  need: 'A written question, a date, an exit criterion, and a named owner.',
                  fail: 'Becomes permanent by inertia. Nobody ever cancels a pilot; they just stop mentioning it.',
                  fund: 'Fund in tranches against learning, never against a roadmap slot.',
                },
                {
                  t: 'Marketable application',
                  tone: 'warn' as const,
                  need: 'Evidence that survives a customer asking how it works.',
                  fail: 'The claim ships before the validity does, and marketing sets the standard by accident.',
                  fund: 'Fund only when the first two have already produced something.',
                },
              ].map((x) => (
                <div key={x.t} className="rounded-xl border border-subtle bg-deep/50 p-4">
                  <Kicker tone={x.tone}>{x.t}</Kicker>
                  <dl className="mt-3 space-y-2.5 text-[13px] leading-[1.55]">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Needs</dt>
                      <dd className="text-ink/80">{x.need}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Fails by</dt>
                      <dd className="text-muted">{x.fail}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Funding logic</dt>
                      <dd className="text-ink/80">{x.fund}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
            <Note tone="warn" label="The recurring failure" className="mt-4">
              Most neuro-UX trouble is one category being funded on another's evidence standard —
              experimental technology bought as if it were solid research, then marketed as if it were
              a validated application. Nobody lied at any single step.
            </Note>
          </Panel>
        </motion.div>

        <motion.div variants={revealItem(reduced)}>
          <ArgumentRehearsal
            onTried={() => {
              setRehearsed(true)
              setProgress('leadership', 0.7)
            }}
          />
        </motion.div>

        <motion.div variants={revealItem(reduced)}>
          <DecisionSorter onDone={() => setProgress('leadership', 0.9)} />
        </motion.div>

        <motion.div variants={revealItem(reduced)}>
          <Panel className="border-valid/25">
            <Kicker tone="valid">Governance · who owns what</Kicker>
            <h3 className="mt-2 text-[22px]">Four roles. Name them before you need them.</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ['Research ownership', 'Runs the method, states the limitations, and is accountable for the difference between a finding and a reading.'],
                ['Ethics approval', 'Can stop a study. Not consulted — empowered. Independent of the person whose roadmap benefits.'],
                ['Strategic translation', 'Decides what a finding licenses at company level, and what it does not. Usually you.'],
                ['Data stewardship', 'Owns retention, access and deletion of physiological data as a distinct class, on a schedule you can state publicly.'],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl border border-subtle bg-deep/50 p-4">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-valid">{t}</p>
                  <p className="mt-2 text-[13px] leading-[1.6] text-muted">{d}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 max-w-[74ch] text-[14px] leading-[1.65] text-muted">
              If one person holds three of these, you do not have governance — you have a
              well-intentioned individual and a single point of failure. That is the situation you
              will be handed in the third playground.
            </p>
          </Panel>
        </motion.div>
      </motion.div>

      <ContinueBar
        sectionId="leadership"
        disabled={!rehearsed}
        disabledNote="Try at least one response in the rehearsal. Reading the four options is not the same as choosing one."
        label="To the playgrounds"
        note="Next: FocusSense — where you get to find out what you actually do under pressure."
      />
    </PageShell>
  )
}
