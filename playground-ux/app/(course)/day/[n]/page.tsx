import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DAYS, dayByNumber } from '@/data/course';

// Built days have their own folder (app/day/9/...); this page serves the others.
export function generateStaticParams() {
  return DAYS.filter((d) => !d.built).map((d) => ({ n: String(d.n) }));
}

const EFFORT = { small: 'Small', medium: 'Medium', large: 'Large' } as const;

export default function DayPlaceholder({ params }: { params: { n: string } }) {
  const d = dayByNumber(Number(params.n));
  if (!d || d.built) notFound();
  const l = d.legacy;

  return (
    <main id="main" className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <p className="font-mono text-12 uppercase tracking-wider text-ink-soft">
        Day {d.n} · Module {d.module} ({d.part})
      </p>
      <h1 className="mt-2 font-display text-34 font-semibold tracking-tight">{d.title}</h1>
      <p className="mt-4 max-w-3xl text-16 text-ink-soft">{d.topic}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px,1fr]">
        <aside className="space-y-4">
          {d.cases ? (
            <section className="rounded-lg border border-hairline bg-raised p-4">
              <h2 className="font-display text-20 font-semibold">Cases in the plan</h2>
              <dl className="mt-3 grid grid-cols-[auto,1fr] gap-x-4 gap-y-1 text-14">
                <dt className="text-ink-soft">Aufgabe 1</dt>
                <dd>{d.cases.task1}</dd>
                <dt className="text-ink-soft">Aufgabe 2</dt>
                <dd>{d.cases.task2}</dd>
                <dt className="text-ink-soft">Fallstudie</dt>
                <dd>{d.cases.caseStudy}</dd>
              </dl>
            </section>
          ) : null}

          <section className="rounded-lg border border-hairline bg-raised p-4 text-14">
            {l ? (
              <>
                <h2 className="font-display text-20 font-semibold">Where this day is today</h2>
                {l.fresh ? (
                  <p className="mt-2 text-ink-soft">
                    Built fresh, to the Digital Learning standard. It runs as a small project of its own; the code is in{' '}
                    <code className="font-mono text-12">{l.fresh}</code> and it will be merged into this project when it is finished.
                  </p>
                ) : (
                  <p className="mt-2 text-ink-soft">
                    Not moved into this project yet. It runs as its own site; the code is kept in{' '}
                    <code className="font-mono text-12">legacy/day{d.n}</code>.
                  </p>
                )}
                {l.effort ? (
                  <p className="mt-3">
                    <span className="text-ink-soft">Effort to move: </span>
                    <strong>{EFFORT[l.effort]}</strong>
                  </p>
                ) : null}
                {l.note ? <p className="mt-2">{l.note}</p> : null}
                <ul className="mt-3 list-disc space-y-1 pl-5">
                  {l.demo ? (
                    <li>
                      <a className="underline underline-offset-2" href={l.demo} target="_blank" rel="noreferrer">
                        {l.fresh ? `Open Day ${d.n} in its own tab` : 'Open the site in its own tab'}
                      </a>
                    </li>
                  ) : null}
                  {l.more?.map((m) => (
                    <li key={m.url}>
                      <a className="underline underline-offset-2" href={m.url} target="_blank" rel="noreferrer">
                        {m.label}
                      </a>
                    </li>
                  ))}
                  {l.repo ? (
                    <li>
                      <a className="underline underline-offset-2" href={l.repo} target="_blank" rel="noreferrer">
                        Repository
                      </a>
                    </li>
                  ) : null}
                  {l.drive ? (
                    <li>
                      <a className="underline underline-offset-2" href={l.drive} target="_blank" rel="noreferrer">
                        Worksheets and slides in Drive
                      </a>
                    </li>
                  ) : null}
                </ul>
              </>
            ) : (
              <p>This day is planned and not built yet.</p>
            )}
          </section>

          <p className="text-14">
            <Link href="/" className="underline underline-offset-2">
              Back to all days
            </Link>
          </p>
        </aside>

        {l?.demo ? (
          <section aria-label={`Current site of day ${d.n}`}>
            <iframe
              src={l.demo}
              title={`Day ${d.n}: ${d.title} (current site)`}
              loading="lazy"
              className="h-[80vh] w-full rounded-lg border border-hairline bg-white"
            />
            <p className="mt-2 text-12 text-ink-soft">
              {l.fresh ? 'Day 1 as it is now, shown here for review. If the frame stays empty, start it first (see the note on the left).' : 'The current site, shown here for review. Some sites remember your work in their own storage, separate from this project.'}
            </p>
          </section>
        ) : null}
      </div>
    </main>
  );
}
