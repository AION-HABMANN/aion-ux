import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Btn, Kicker, Panel, Tip } from '@/components/day15/components/primitives'
import { NAV } from '@/components/day15/routes'
import { useModule } from '@/components/day15/state/ModuleStore'
import { ProgressRing } from '@/components/day15/components/charts'
import { useReduced } from '@/components/day15/lib/utils'
import { revealItem, revealList, hoverLift } from '@/components/day15/lib/motion'

/** Decorative scanpath. The seduction of the module, rendered at 40% opacity. */
function GazeField() {
  const reduced = useReduced()
  const dots = [
    { x: 18, y: 30, r: 9 },
    { x: 42, y: 20, r: 14 },
    { x: 66, y: 38, r: 7 },
    { x: 80, y: 62, r: 18 },
    { x: 52, y: 72, r: 10 },
    { x: 28, y: 58, r: 6 },
  ]
  const path = dots.map((d, i) => `${i === 0 ? 'M' : 'L'}${d.x} ${d.y}`).join(' ')
  return (
    <svg
      viewBox="0 0 100 90"
      className="h-full w-full"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <motion.path
        d={path}
        fill="none"
        stroke="var(--accent-signal)"
        strokeWidth="0.5"
        strokeOpacity="0.55"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 2.4, ease: 'easeInOut' }}
      />
      {dots.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r / 4}
          fill="var(--accent-signal)"
          fillOpacity="0.16"
          stroke="var(--accent-signal)"
          strokeWidth="0.35"
          strokeOpacity="0.7"
          initial={{ scale: reduced ? 1 : 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: reduced ? 0 : 0.3 + i * 0.28, duration: 0.5 }}
          style={{ transformOrigin: `${d.x}px ${d.y}px` }}
        />
      ))}
    </svg>
  )
}

const PROMISES = [
  {
    n: '01',
    title: 'You will trust a number',
    body: 'A dashboard will hand you a Focus Score of 73. It looks like measurement. You will be asked how much you would bet on it.',
    tone: 'text-signal',
  },
  {
    n: '02',
    title: 'You will choose a story',
    body: 'One gaze pattern, three plausible explanations. The eye-tracker picks none of them. You will pick one anyway — everyone does.',
    tone: 'text-warn',
  },
  {
    n: '03',
    title: 'You will pay for it',
    body: 'Budget, weeks, reputation. Every allocation in the playgrounds costs something somewhere else. There is no configuration that wins on all six meters.',
    tone: 'text-risk',
  },
]

export function Landing() {
  const reduced = useReduced()
  const { overallProgress, progress } = useModule()
  const started = overallProgress > 0

  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6 sm:py-14">
      {/* ------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden rounded-2xl border border-subtle bg-panel">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[52%] opacity-40">
          <GazeField />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-panel via-panel/92 to-transparent"
        />

        <div className="relative p-6 sm:p-10 lg:p-14">
          <motion.div
            variants={revealList(reduced, 0.05)}
            initial="hidden"
            animate="show"
            className="max-w-[62ch]"
          >
            <motion.div variants={revealItem(reduced)}>
              <Kicker tone="signal">Module 7 · Day 2 · Senior track</Kicker>
            </motion.div>

            <motion.h1
              variants={revealItem(reduced)}
              className="mt-4 text-[34px] leading-[1.06] sm:text-[46px] lg:text-[54px]"
            >
              Eye-tracking, neurofeedback,
              <br />
              <span className="text-signal">and the gap you are about to fall into.</span>
            </motion.h1>

            <motion.p
              variants={revealItem(reduced)}
              className="mt-6 max-w-[58ch] text-[16.5px] leading-[1.75] text-ink/80"
            >
              This module has one job: to make the difference between{' '}
              <strong className="text-signal">measurable</strong> and{' '}
              <strong className="text-valid">reliable</strong> something you can feel, not
              something you can define. It will let you believe the data first.
            </motion.p>

            <motion.p variants={revealItem(reduced)} className="mt-4 max-w-[58ch] text-[15px] text-muted">
              Five learning sections, three decision playgrounds, one debrief you can print and defend
              in a room. Roughly 100 minutes if you take it seriously. Considerably less if you don't —
              and it will show.
            </motion.p>

            <motion.div variants={revealItem(reduced)} className="mt-8 flex flex-wrap items-center gap-3">
              <Link to={started ? '/learn' : '/learn/foundations'}>
                <Btn size="lg" trailing="→">
                  {started ? 'Resume module' : 'Begin with foundations'}
                </Btn>
              </Link>
              <Link to="/play">
                <Btn size="lg" variant="ghost">
                  Skip to the playgrounds
                </Btn>
              </Link>
            </motion.div>

            <motion.p variants={revealItem(reduced)} className="mt-4 font-mono text-[11px] text-muted">
              {started
                ? `Module progress ${Math.round(overallProgress * 100)}% · in-memory only`
                : 'No account. No storage. A reload wipes everything you decide here.'}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------- three beats */}
      <motion.section
        variants={revealList(reduced, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-8 grid gap-4 md:grid-cols-3"
      >
        {PROMISES.map((p) => (
          <motion.article key={p.n} variants={revealItem(reduced)} whileHover={hoverLift(reduced)}>
            <Panel className="h-full">
              <span className={`readout text-[12px] ${p.tone}`}>{p.n}</span>
              <h3 className="mt-3 text-[18px]">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.65] text-muted">{p.body}</p>
            </Panel>
          </motion.article>
        ))}
      </motion.section>

      {/* --------------------------------------------------------- route map */}
      <section className="mt-10">
        <div className="flex items-baseline gap-3">
          <h2 className="text-[20px]">The path</h2>
          <span aria-hidden className="hairline flex-1" />
          <Tip label="Rings fill as you complete a section. Progress is earned by finishing a beat, not by opening the page.">
            <span className="label-mono cursor-help">Progress rings</span>
          </Tip>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {NAV.map((group) => (
            <Panel key={group.key} className="flex flex-col">
              <p className="label-mono">{group.label}</p>
              <ul className="mt-4 flex-1 space-y-2.5">
                {group.entries.map((e) => (
                  <li key={e.id}>
                    <Link
                      to={e.path}
                      className="group flex items-center gap-3 rounded-lg border border-transparent px-2 py-2 transition-colors duration-200 hover:border-subtle hover:bg-elevated/70"
                    >
                      <ProgressRing value={progress[e.id]} size={16} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] text-ink/90 group-hover:text-ink">
                          {e.label}
                        </span>
                        <span className="block truncate text-[12px] text-muted">{e.sub}</span>
                      </span>
                      <span className="readout shrink-0 text-[10.5px] text-muted">{e.minutes}m</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ ground rule */}
      <section className="mt-10 rounded-2xl border border-subtle bg-panel p-6 sm:p-8">
        <Kicker tone="warn">Ground rule</Kicker>
        <p className="mt-3 max-w-[70ch] text-[17px] leading-[1.7] text-ink/85">
          Nothing in this module has a single correct answer, and nothing you write here is graded.
          The playgrounds check whether your reasoning is <em>defensible</em> — whether you named the
          trade-off, the residual risk, and the point at which you would stop. That is the only
          standard that survives contact with a real steering committee.
        </p>
        <p className="mt-4 max-w-[70ch] text-[14px] text-muted">
          One warning about the technology itself: eye-tracking and neuro-based methods produce
          genuinely useful signal. This module is not an argument against using them. It is an
          argument against citing them as proof.
        </p>
      </section>
    </div>
  )
}
