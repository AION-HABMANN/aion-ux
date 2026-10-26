import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageShell } from '@/components/Layout'
import { Kicker, Panel } from '@/components/primitives'
import { ProgressRing } from '@/components/charts'
import { NAV } from '@/routes'
import { useModule } from '@/state/ModuleStore'
import { useReduced } from '@/lib/utils'
import { hoverLift, revealItem, revealList } from '@/lib/motion'

const DETAIL: Record<string, { question: string; leaves: string }> = {
  foundations: {
    question: 'What does a gaze recording actually contain?',
    leaves: 'You leave with: fixations, saccades, scanpaths — and the readouts a vendor will quote at you.',
  },
  limits: {
    question: 'Where does measurement end and narrative begin?',
    leaves: 'You leave with: the reflex to ask "what else would produce this same data?"',
  },
  neuro: {
    question: 'Which of these methods is anywhere near a product?',
    leaves: 'You leave with: a maturity map you can hold up against a roadmap.',
  },
  ethics: {
    question: 'Why is neuro-data not just more behavioural data?',
    leaves: 'You leave with: consent as a design variable, not a legal footnote.',
  },
  leadership: {
    question: 'What do you say when someone calls the data objective?',
    leaves: 'You leave with: one sentence that corrects the claim without costing you the room.',
  },
}

export function LearnHub() {
  const reduced = useReduced()
  const { progress } = useModule()
  const group = NAV[0]

  return (
    <PageShell
      kicker="Learning material"
      title="Five sections. One habit of mind."
      lead={
        <>
          Each section is built the same way: a hook, the concept, something you have to operate with
          your hands, and the implication for someone who signs off on budget. Read them in order the
          first time — <span className="text-warn">Method limits</span> is the hinge, and it lands
          harder if <span className="text-signal">Foundations</span> has already sold you.
        </>
      }
    >
      <motion.ul variants={revealList(reduced)} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2">
        {group.entries.map((e, i) => {
          const d = DETAIL[e.id]
          const p = progress[e.id]
          return (
            <motion.li key={e.id} variants={revealItem(reduced)} whileHover={hoverLift(reduced)}>
              <Link to={e.path} className="block h-full">
                <Panel className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="readout text-[12px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                      <Kicker tone={e.tone}>{e.level}</Kicker>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="readout text-[11px] text-muted">{e.minutes} min</span>
                      <ProgressRing value={p} size={16} />
                    </div>
                  </div>

                  <h2 className="mt-3 text-[21px]">{e.label}</h2>
                  <p className="mt-1 text-[14px] text-muted">{e.sub}</p>

                  <p className="mt-4 border-l-2 border-subtle pl-3 text-[14.5px] italic leading-[1.6] text-ink/80">
                    {d.question}
                  </p>

                  <p className="mt-auto pt-4 text-[12.5px] leading-[1.55] text-muted">{d.leaves}</p>

                  <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-signal">
                    {p >= 1 ? 'completed · reopen' : p > 0 ? 'in progress →' : 'open section →'}
                  </p>
                </Panel>
              </Link>
            </motion.li>
          )
        })}
      </motion.ul>

      <Panel className="mt-6 border-warn/25">
        <Kicker tone="warn">If you are short on time</Kicker>
        <p className="mt-2 max-w-[74ch] text-[15px] leading-[1.7] text-ink/80">
          Read <Link to="/learn/limits" className="text-warn underline underline-offset-4">Method limits</Link> and go
          straight to <Link to="/play/focussense" className="text-signal underline underline-offset-4">FocusSense</Link>.
          Everything else in this module is an elaboration of those two. Skipping ethics, however, is
          the one shortcut that will cost you in the third playground — the governance model there
          assumes you know why consent is a design variable.
        </p>
      </Panel>
    </PageShell>
  )
}
