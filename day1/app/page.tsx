import Link from 'next/link';
import { AGENDA, DAY, INTRO, ROUTES, ROUTE_BLOCKS, cardsOf } from '@/data/day1';
import { Gloss } from '@/lib/Gloss';

/**
 * The day's home page (CLAUDE.md #27): "What today is about" and "What's in it for you" come first, then the two routes with
 * "You finish with: …", then the plan's rows as the day's agenda.
 */
export default function Home() {
  const minutes = (route: 1 | 2) => cardsOf(route).reduce((n, c) => n + c.minutes, 0) + ROUTE_BLOCKS[route].reduce((n, b) => n + b.minutes, 0);
  return (
    <div className="space-y-8 pt-6">
      <header className="space-y-2">
        <p className="smallcaps text-accent">{DAY.module}</p>
        <h1 className="text-display">{DAY.heading}</h1>
        <p className="max-w-prose text-body text-ash">{DAY.topic}.</p>
      </header>

      <section aria-labelledby="today-h" className="card space-y-4 p-5">
        <div className="space-y-2">
          <h2 id="today-h" className="text-h2">
            What today is about
          </h2>
          <p className="max-w-prose text-body">
            <Gloss>{INTRO.about}</Gloss>
          </p>
          <p className="max-w-prose text-body">{INTRO.caseLine}</p>
        </div>
        <div className="space-y-2">
          <p className="smallcaps">One story, two routes</p>
          <ol className="grid gap-3 md:grid-cols-2">
            {INTRO.story.map((s) => (
              <li key={s.route}>
                <Link href={`/route-${s.route}/`} className="block h-full space-y-1.5 rounded-lg border border-line bg-canvas p-3 transition-colors hover:border-accent">
                  <p className="smallcaps text-accent">
                    Route {s.route} · {s.verb}
                  </p>
                  <p className="text-body">
                    <Gloss>{s.question}</Gloss>
                  </p>
                  <p className="text-caption text-ash">
                    You finish with: <strong className="text-ink">{s.output}</strong>
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="wiifm-h" className="card space-y-3 border-accent/40 bg-accentSoft p-5">
        <div className="space-y-1">
          <h2 id="wiifm-h" className="text-h2">
            What’s in it for you
          </h2>
          <p className="max-w-prose text-body">Each skill below is one you can use at your own desk next week, not only in these cases.</p>
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          {INTRO.wiifm.map((w) => (
            <li key={w.skill} className="space-y-1 rounded-lg border border-line bg-paper p-3">
              <p className="flex flex-wrap items-baseline justify-between gap-x-2">
                <span className="font-semibold">{w.skill}</span>
                <span className="text-micro font-semibold uppercase text-ash">Route {w.route}</span>
              </p>
              <p className="text-caption">
                <Gloss>{w.payoff}</Gloss>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="routes-h" className="space-y-3">
        <h2 id="routes-h" className="sr-only">
          Routes
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {([1, 2] as const).map((n) => {
            const r = ROUTES[n];
            return (
              <Link key={n} href={`/route-${n}/`} className="card block space-y-3 p-5 transition-shadow hover:shadow-md">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="smallcaps text-accent">Route {n}</span>
                  <span className="text-micro font-semibold uppercase text-ash">{r.levels}</span>
                </div>
                <h3 className="text-h2">{r.h1}</h3>
                <p className="text-body text-ash">{r.blurb}</p>
                <ul className="space-y-1 text-caption">
                  <li>
                    Materi {n === 1 ? 'A' : 'B'} · {cardsOf(n).length} cards · about {cardsOf(n).reduce((s, c) => s + c.minutes, 0)} min
                  </li>
                  <li>
                    Tasks · blocks {ROUTE_BLOCKS[n].map((b) => b.id).join(', ')} · about {ROUTE_BLOCKS[n].reduce((s, b) => s + b.minutes, 0)} min
                  </li>
                </ul>
                <p className="text-caption text-ash">
                  About {minutes(n)} minutes in all (draft estimates). You finish with: <strong className="text-ink">{r.deliverable}</strong>
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="agenda-h" className="card space-y-3 p-5">
        <h2 id="agenda-h" className="text-h2">
          The day in the plan’s rows
        </h2>
        <p className="text-caption text-ash">
          The plan gives each day eight teaching units (UE). Two of them, the coaching and the feedback round, are discussions in the room with nothing to write; your facilitator has a card for them.
        </p>
        <table className="w-full text-left text-caption">
          <thead>
            <tr className="border-b border-line text-ash">
              <th className="py-1 pr-3 font-semibold">UE</th>
              <th className="py-1 pr-3 font-semibold">Plan row</th>
              <th className="py-1 font-semibold">On the site</th>
            </tr>
          </thead>
          <tbody>
            {AGENDA.map((a) => (
              <tr key={a.ue} className="border-b border-line align-top">
                <td className="py-1.5 pr-3 font-mono">{a.ue}</td>
                <td className="py-1.5 pr-3">{a.row}</td>
                <td className="py-1.5">{a.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
