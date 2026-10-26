import Link from 'next/link';
import { DAYS, dayHome, type CourseDay } from '@/data/course';

function DayCard({ d }: { d: CourseDay }) {
  const body = (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-12 uppercase tracking-wider text-ink-soft">
          Day {d.n} · Module {d.module} ({d.part})
        </span>
        <span
          className={
            d.built
              ? 'rounded bg-ink px-2 py-0.5 text-12 text-white'
              : 'rounded border border-hairline px-2 py-0.5 text-12 text-ink-soft'
          }
        >
          {d.built ? 'Open' : d.legacy ? 'Separate site' : 'Planned'}
        </span>
      </div>
      <h2 className="mt-2 font-display text-20 font-semibold tracking-tight">{d.title}</h2>
      <p className="mt-2 text-14 text-ink-soft">{d.topic}</p>
      {d.cases ? (
        <p className="mt-3 text-12 text-ink-soft">
          Cases: {d.cases.task1} · {d.cases.task2} · {d.cases.caseStudy}
        </p>
      ) : null}
    </>
  );
  const box = 'block h-full rounded-lg border border-hairline bg-raised p-4 shadow-raised';
  return (
    <Link href={dayHome(d.n)} className={`${box} hover:shadow-lifted`}>
      {body}
    </Link>
  );
}

export default function CourseHome() {
  return (
    <main id="main" className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-34 font-semibold tracking-tight">AION UX class</h1>
      <p className="mt-3 max-w-3xl text-16 text-ink-soft">
        Psychological UX and neuro-design, sixteen days in eight modules. One project holds every
        day. Days 9 to 16 run here exactly as they were built (not upgraded yet). Day 1 is built
        fresh to the Digital Learning standard as a small project of its own and is linked from its page; Days 2 to 8
        are planned.</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DAYS.map((d) => (
          <li key={d.n}>
            <DayCard d={d} />
          </li>
        ))}
      </ul>
    </main>
  );
}
