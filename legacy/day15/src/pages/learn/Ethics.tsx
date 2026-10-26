import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState, type DragEvent } from 'react'
import { ContinueBar, PageShell } from '@/components/Layout'
import { Btn, Kicker, Note, Panel, Tip } from '@/components/primitives'
import { Meter } from '@/components/Meter'
import { useModule } from '@/state/ModuleStore'
import { cn, useReduced } from '@/lib/utils'
import { SPRING, revealItem, revealList, swapIn } from '@/lib/motion'

/* ------------------------------------------------------- Consent formulations */

interface Rung {
  id: string
  short: string
  text: string
  /** How much data this formulation lets you collect, in practice. */
  volume: number
  /** How well it survives a journalist, a works council, or a regulator. */
  trust: number
  /** Canonical position, weakest (0) to strongest (4). */
  strength: number
  note: string
}

const RUNGS: Rung[] = [
  {
    id: 'buried',
    short: 'Buried in the terms',
    text: '"By continuing you accept our Terms of Use." Research data collection is covered in clause 14.3. The box is pre-ticked.',
    volume: 96,
    trust: 6,
    strength: 0,
    note: 'Maximum data, zero defensibility. Legally contested in most jurisdictions and indefensible in all of them the moment it becomes public. The volume is real — and it is the only thing this buys you.',
  },
  {
    id: 'bundled',
    short: 'Bundled with analytics',
    text: 'One checkbox at sign-up: "I agree to analytics and product improvement." Eye-tracking is not named. Neither is the neurofeedback layer.',
    volume: 84,
    trust: 18,
    strength: 1,
    note: 'The most common formulation in real products, and the one that reads worst in a headline. "They did not lie" is not a position you want your communications team defending.',
  },
  {
    id: 'coupled',
    short: 'Named but coupled',
    text: 'Eye-tracking is described plainly — but participation is a condition of using the training portal, which is mandatory for the role.',
    volume: 72,
    trust: 36,
    strength: 2,
    note: 'Transparent and still not voluntary. Consent obtained under a condition of employment is the classic failure case: everyone understood, nobody could decline. Works councils find this one immediately.',
  },
  {
    id: 'optin',
    short: 'Separate opt-in',
    text: 'A distinct, plain-language opt-in for the research session. Declining costs nothing. No withdrawal path once the session has been recorded.',
    volume: 48,
    trust: 68,
    strength: 3,
    note: 'Genuinely voluntary at the moment of asking, and defensible in most rooms. The missing withdrawal path is the gap — consent that cannot be revoked was a decision made once, on incomplete information.',
  },
  {
    id: 'informed',
    short: 'Informed, revocable opt-in',
    text: 'What is recorded, why, for how long, who sees it, that it includes physiological signal — plus withdrawal at any point including deletion after the fact, with no disadvantage.',
    volume: 34,
    trust: 94,
    strength: 4,
    note: 'The least data and the only version that survives every room it enters. Note what it costs: a third of your sample, some of it non-randomly. That is a real analytical price, and pretending otherwise is how teams end up back at the buried checkbox.',
  },
]

const CANONICAL = [...RUNGS].sort((a, b) => a.strength - b.strength).map((r) => r.id)

function ConsentLadder({ onOrdered }: { onOrdered: () => void }) {
  const reduced = useReduced()
  // Deliberately scrambled to start. The first arrangement is never the ladder.
  const [order, setOrder] = useState<string[]>(['coupled', 'informed', 'buried', 'optin', 'bundled'])
  const [dragging, setDragging] = useState<string | null>(null)
  const [touched, setTouched] = useState(false)

  const byId = useMemo(() => Object.fromEntries(RUNGS.map((r) => [r.id, r])) as Record<string, Rung>, [])
  // The top of the ladder is not decoration: it is the formulation you ship.
  const shipped = byId[order[0]]

  const isCanonical = order.join() === CANONICAL.join()

  useEffect(() => {
    if (touched) onOrdered()
  }, [touched, onOrdered])

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir
    if (target < 0 || target >= order.length) return
    const next = [...order]
    ;[next[index], next[target]] = [next[target], next[index]]
    setOrder(next)
    setTouched(true)
  }

  const dropOn = (index: number) => {
    if (!dragging) return
    const from = order.indexOf(dragging)
    if (from === -1 || from === index) return
    const next = [...order]
    next.splice(from, 1)
    next.splice(index, 0, dragging)
    setOrder(next)
    setDragging(null)
    setTouched(true)
  }

  return (
    <Panel>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Kicker tone="risk">Interactive · the consent ladder</Kicker>
          <h3 className="mt-2 text-[21px]">Rank these five. Then look at what the top one costs you.</h3>
          <p className="mt-1.5 max-w-[62ch] text-[14px] leading-[1.65] text-muted">
            Order them from weakest to strongest consent. Whatever sits in position 1 is treated as{' '}
            <span className="text-risk">the formulation you would actually ship</span> — and the two
            meters respond to it immediately.
          </p>
        </div>
        <Btn
          size="sm"
          variant="ghost"
          onClick={() => {
            setOrder(CANONICAL)
            setTouched(true)
          }}
        >
          Sort weakest → strongest
        </Btn>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        {/* ladder */}
        <ol className="space-y-2.5">
          {order.map((id, i) => {
            const r = byId[id]
            const shipping = i === 0
            return (
              <motion.li
                key={id}
                layout={!reduced}
                transition={SPRING}
                draggable
                onDragStart={() => setDragging(id)}
                onDragOver={(e: DragEvent) => e.preventDefault()}
                onDrop={() => dropOn(i)}
                onDragEnd={() => setDragging(null)}
                className={cn(
                  'group flex items-start gap-3 rounded-xl border p-3.5 transition-colors duration-200',
                  shipping ? 'border-risk/50 bg-risk/[0.06]' : 'border-subtle bg-deep/50',
                  dragging === id && 'opacity-60',
                )}
              >
                <div className="flex flex-col items-center gap-1 pt-0.5">
                  <span
                    className={cn(
                      'readout grid h-6 w-6 place-items-center rounded-md border text-[11px]',
                      shipping ? 'border-risk/50 text-risk' : 'border-subtle text-muted',
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      aria-label={`Move "${r.short}" up to position ${i}`}
                      className="rounded px-1 text-[10px] leading-none text-muted transition-colors hover:text-ink disabled:opacity-25"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      onClick={() => move(i, 1)}
                      disabled={i === order.length - 1}
                      aria-label={`Move "${r.short}" down to position ${i + 2}`}
                      className="rounded px-1 text-[10px] leading-none text-muted transition-colors hover:text-ink disabled:opacity-25"
                    >
                      ▼
                    </button>
                  </div>
                </div>

                <div className="min-w-0 flex-1 cursor-grab active:cursor-grabbing">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] font-semibold text-ink">{r.short}</p>
                    {shipping && (
                      <span className="rounded border border-risk/50 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-risk">
                        would ship
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[13px] leading-[1.6] text-muted">{r.text}</p>
                </div>
              </motion.li>
            )
          })}
        </ol>

        {/* meters */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-subtle bg-deep/60 p-4">
            <p className="label-mono">If you shipped position 1</p>
            <motion.p
              key={shipped.id}
              {...swapIn(reduced)}
              className="mt-1 text-[15px] font-semibold text-ink"
            >
              {shipped.short}
            </motion.p>

            <div className="mt-4 divide-y divide-subtle/60">
              <Meter
                label="Data volume collected"
                value={shipped.volume}
                tone="signal"
                inverse
                qualifier={shipped.volume > 70 ? 'maximal' : shipped.volume > 45 ? 'reduced' : 'partial'}
                explain="How much usable research data this formulation actually yields. Stronger consent means fewer participants — and, uncomfortably, a non-random subset of them."
              />
              <Meter
                label="Trust & defensibility"
                value={shipped.trust}
                tone="valid"
                qualifier={shipped.trust > 70 ? 'defensible' : shipped.trust > 35 ? 'contestable' : 'indefensible'}
                explain="Whether this formulation survives a works council, a data protection officer, and a journalist reading it out loud. Not a legal opinion — a survivability estimate."
              />
            </div>

            <div className="mt-4 border-t border-subtle pt-3">
              <p className="text-[13px] leading-[1.6] text-muted">{shipped.note}</p>
            </div>
          </div>

          <AnimatePresence>
            {isCanonical && (
              <motion.div
                initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3"
              >
                <Note tone="warn" label="Ladder complete">
                  The order is the easy part — most people get it on the first try. The hard part is
                  sitting with the meters: the arrangement you just built puts your weakest formulation
                  in the shipping slot. Drag the strongest one to position 1 and watch what you give up.
                </Note>
              </motion.div>
            )}
          </AnimatePresence>

          {touched && !isCanonical && (
            <Note tone="signal" label="Note" className="mt-3">
              The two meters never move in the same direction. There is no formulation that collects
              like the first and defends like the last — which is why "we'll tighten consent later" is
              a budget decision disguised as a compliance task.
            </Note>
          )}
        </div>
      </div>
    </Panel>
  )
}

/* -------------------------------------------------------------------- Page */

const SENSITIVITY = [
  {
    t: 'It is not volunteered',
    d: 'A click is an action a person chose to take. A pupil dilation is not. Behavioural data records decisions; physiological data records states the person did not decide to disclose and often cannot perceive.',
  },
  {
    t: 'It cannot be meaningfully proofread',
    d: 'People can review a form before submitting it. Nobody can inspect their own gaze trace or EEG stream and decide which parts to share. Informed consent about content is structurally impossible here.',
  },
  {
    t: 'It leaks beyond its purpose',
    d: 'Gaze and neural signal correlate — noisily, but reliably enough to be uncomfortable — with fatigue, stress, intoxication, some neurological conditions, and attention to content the user did not intend to reveal interest in.',
  },
  {
    t: 'It carries an aura that suppresses challenge',
    d: 'The reputational risk is not only about leakage. It is that "the brain data showed" ends discussion in rooms where "the survey suggested" would have started one.',
  },
]

export function Ethics() {
  const reduced = useReduced()
  const { setProgress } = useModule()
  const [ordered, setOrdered] = useState(false)

  useEffect(() => setProgress('ethics', 0.15), [setProgress])

  return (
    <PageShell
      kicker="Learning · 04 · L2"
      tone="risk"
      title="Consent is a design variable, not a legal footnote."
      lead={
        <>
          Neuro- and gaze-based data is not simply more behavioural data. It is a different category,
          and the difference is not primarily legal — it is that the person{' '}
          <span className="text-risk">cannot see what they are giving you</span>. Everything about how
          you ask follows from that.
        </>
      }
    >
      <motion.div variants={revealList(reduced)} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={revealItem(reduced)}>
          <Panel>
            <Kicker tone="risk">Why the category changes</Kicker>
            <h3 className="mt-2 text-[21px]">Four differences that matter before any regulation is cited</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {SENSITIVITY.map((s, i) => (
                <div key={s.t} className="rounded-xl border border-subtle bg-deep/50 p-4">
                  <div className="flex items-baseline gap-2.5">
                    <span className="readout text-[11px] text-risk">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-[14.5px] font-semibold text-ink">{s.t}</p>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-muted">{s.d}</p>
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>

        <motion.div variants={revealItem(reduced)}>
          <ConsentLadder
            onOrdered={() => {
              setOrdered(true)
              setProgress('ethics', 0.8)
            }}
          />
        </motion.div>

        <motion.div variants={revealItem(reduced)}>
          <Panel>
            <Kicker>The three words that do the work</Kicker>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                {
                  w: 'Consent',
                  d: 'Specific to this purpose, in language the person actually reads, before the recording starts. Consent obtained for "product improvement" does not cover physiological measurement.',
                  q: '"Would this person be surprised by what we recorded?"',
                },
                {
                  w: 'Voluntariness',
                  d: 'Declining must be free of cost. If the session is during work hours, run by a manager, or required for a mandatory course, voluntariness is a claim you cannot support.',
                  q: '"What happens to someone who says no?"',
                },
                {
                  w: 'Withdrawal',
                  d: 'A live exit, including deletion of the recording afterwards. It is the only mechanism that lets a participant correct a decision made before they knew what it felt like.',
                  q: '"Can they take it back on Thursday?"',
                },
              ].map((x) => (
                <div key={x.w} className="rounded-xl border border-subtle bg-deep/50 p-4">
                  <Kicker tone="risk">{x.w}</Kicker>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-muted">{x.d}</p>
                  <p className="mt-3 border-t border-subtle pt-3 text-[13px] italic text-ink/75">{x.q}</p>
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>

        <motion.div variants={revealItem(reduced)}>
          <Panel className="border-risk/25">
            <Kicker tone="risk">Executive implication</Kicker>
            <h3 className="mt-2 text-[22px]">Reputation risk is a P&L item with a slow fuse</h3>
            <div className="prose-lab mt-3 max-w-[74ch]">
              <p>
                The compliance question — "are we allowed to do this?" — is the cheap one, and it is
                usually answerable. The expensive question is the one nobody assigns an owner:{' '}
                <strong>what does this look like when it is described by someone who is not us?</strong>
              </p>
              <p>
                Neuro-based research fails that test far more easily than behavioural research does,
                because the vocabulary is inherently alarming and the nuance does not survive a
                headline. "We measured brain activity to make the course better" is accurate and will
                not read as accurate.
              </p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ['Before the pilot', 'Write the paragraph a journalist would write. If it is bad, the pilot design is wrong — not the communications plan.'],
                ['Name an owner', 'Ethics review needs a person, not a step. Someone with the standing to stop the study, not just to comment on it.'],
                ['Separate the data', 'Physiological data on a separate retention clock, with a separate access list, deleted on a schedule you can state out loud.'],
              ].map(([t, d]) => (
                <Tip key={t} label="These three are cheap now and unbuyable later. That asymmetry is the entire argument.">
                  <div className="w-full cursor-help rounded-lg border border-subtle bg-deep/60 p-3.5">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-risk">{t}</p>
                    <p className="mt-1.5 text-[13px] leading-[1.55] text-ink/80">{d}</p>
                  </div>
                </Tip>
              ))}
            </div>
          </Panel>
        </motion.div>
      </motion.div>

      <ContinueBar
        sectionId="ethics"
        disabled={!ordered}
        disabledNote="Rearrange the ladder at least once — the meters only make their point when you move something."
        note="Next: Decision architecture — what you say when someone calls the data objective."
      />
    </PageShell>
  )
}
