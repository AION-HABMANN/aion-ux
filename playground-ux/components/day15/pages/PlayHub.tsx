import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageShell } from '@/components/day15/components/Layout'
import { Kicker, Panel, Btn } from '@/components/day15/components/primitives'
import { ProgressRing } from '@/components/day15/components/charts'
import { useModule } from '@/components/day15/state/ModuleStore'
import { useReduced } from '@/components/day15/lib/utils'
import { hoverLift, revealItem, revealList } from '@/components/day15/lib/motion'

interface Card {
  id: 'focussense' | 'learningpulse' | 'visionmind'
  path: string
  name: string
  level: string
  theme: string
  minutes: number
  tone: 'signal' | 'warn' | 'neuro'
  brief: string
  decision: string
  cost: string
}

const CARDS: Card[] = [
  {
    id: 'focussense',
    path: '/play/focussense',
    name: 'FocusSense',
    level: 'L1 → L2',
    theme: 'Data vs. insight',
    minutes: 12,
    tone: 'signal',
    brief:
      'A digital learning portal. Eye-tracking plus a neurofeedback layer, sold internally as "objective truth data". The team wants to design against the numbers.',
    decision: 'You sort five findings into knowledge and overreach — and rate your own trust twice.',
    cost: 'Costs you: the comfortable belief that a heatmap settles an argument.',
  },
  {
    id: 'learningpulse',
    path: '/play/learningpulse',
    name: 'LearningPulse',
    level: 'L2',
    theme: 'Trade-off simulator',
    minutes: 15,
    tone: 'warn',
    brief:
      'Three innovation approaches, one broad and unprepared target group, a thin research budget, and first results due in five months.',
    decision: 'You commit to one variant, tune budget and parallelism, then watch month 1 → 5 play out.',
    cost: 'Costs you: at least two of six meters. The configuration that maxes everything does not exist.',
  },
  {
    id: 'visionmind',
    path: '/play/visionmind',
    name: 'VisionMind Lab',
    level: 'L3',
    theme: 'Governance architect',
    minutes: 20,
    tone: 'neuro',
    brief:
      '€240,000, 18 weeks, a complex service portal, and an organisation that has enthusiasm for measurement but no governance for it.',
    decision:
      'You fund four measures with 70% of what they need, sequence them, and answer a request you have no validity data for.',
    cost: 'Costs you: one of the four measures. Choose which, and be ready to say why.',
  },
]

export function PlayHub() {
  const reduced = useReduced()
  const { progress } = useModule()

  return (
    <PageShell
      kicker="Decision playgrounds"
      title="Three rooms. Each one takes something from you."
      tone="warn"
      lead={
        <>
          These are not quizzes. Each playground ends with a decision you could be asked to defend —
          and each one is built so that a defensible answer costs you something visible. Do them in
          order: FocusSense teaches the sorting instinct, LearningPulse turns it into a trade-off, and
          VisionMind makes you own the consequences on a budget line.
        </>
      }
    >
      <motion.ul variants={revealList(reduced)} initial="hidden" animate="show" className="grid gap-5 lg:grid-cols-3">
        {CARDS.map((c) => {
          const p = progress[c.id]
          return (
            <motion.li key={c.id} variants={revealItem(reduced)} whileHover={hoverLift(reduced)} className="h-full">
              <Panel className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <Kicker tone={c.tone}>{c.level}</Kicker>
                  <ProgressRing value={p} size={18} />
                </div>

                <h2 className="mt-3 text-[24px]">{c.name}</h2>
                <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {c.theme} · {c.minutes} min
                </p>

                <p className="mt-4 text-[14px] leading-[1.65] text-ink/80">{c.brief}</p>

                <div className="mt-4 rounded-lg border border-subtle bg-deep/50 p-3">
                  <p className="label-mono">What you do</p>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-ink/80">{c.decision}</p>
                </div>

                <p className="mt-4 text-[12.5px] leading-[1.55] text-muted">{c.cost}</p>

                <div className="mt-5 pt-1">
                  <Link to={c.path} className="block">
                    <Btn
                      block
                      variant={c.tone === 'neuro' ? 'neuro' : c.tone === 'warn' ? 'ghost' : 'primary'}
                      trailing="→"
                    >
                      {p >= 1 ? 'Reopen' : p > 0 ? 'Resume' : 'Enter'}
                    </Btn>
                  </Link>
                </div>
              </Panel>
            </motion.li>
          )
        })}
      </motion.ul>

      <Panel className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-[62ch]">
            <Kicker>After all three</Kicker>
            <p className="mt-2 text-[14.5px] leading-[1.65] text-ink/80">
              The debrief pulls your trust delta, your chosen variant, and your allocation profile into
              one printable page — including the measure you consciously postponed. That field is not
              optional in the group exercise, and it is the one most people leave blank.
            </p>
          </div>
          <Link to="/debrief">
            <Btn variant="valid" trailing="→">
              Go to debrief
            </Btn>
          </Link>
        </div>
      </Panel>
    </PageShell>
  )
}
