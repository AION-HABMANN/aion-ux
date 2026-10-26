'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { INTRO } from '@/data/day9/intro';
import { EXTRAS, ROUTES } from '@/data/day9/routes';
import { Card, Eyebrow } from '@/components/day9/ui';
import { useStore } from '@/lib/day9/store';

/** The home of Day 9 (UX-STANDARD 2.8): what today is about, two routes, what is in it for you. */
export default function Day9Home() {
  const name = useStore((s) => s.learner.name);
  const setName = useStore((s) => s.setName);
  const [draft, setDraft] = useState('');
  useEffect(() => setDraft(name), [name]);

  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <Eyebrow>{INTRO.eyebrow}</Eyebrow>
        <h1 className="mt-2 text-34 sm:text-46">{INTRO.title}</h1>
        <p className="mt-3 text-16 text-ink-soft">{INTRO.deck}</p>
      </header>

      <Card className="max-w-3xl space-y-2">
        <label htmlFor="learner-name" className="mono-label block">
          Full name
        </label>
        <p className="text-14 text-ink-soft">Use the same name all week. It is how your submissions are matched. Each export names its own file from it, for example 1-{(name || 'your-name').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-day9-l1l2-activation-analysis.</p>
        <input
          id="learner-name"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => setName(draft)}
          onKeyDown={(e) => e.key === 'Enter' && setName(draft)}
          autoComplete="name"
          placeholder="First name and family name"
          className="w-full max-w-md rounded border border-hairline bg-raised px-3 py-2 text-16 focus:border-ink focus:outline-none"
        />
      </Card>

      <section aria-labelledby="about" className="max-w-3xl space-y-3">
        <Card className="space-y-3">
          <h2 id="about" className="text-26">
            What today is about
          </h2>
          {INTRO.about.map((p) => (
            <p key={p.slice(0, 24)} className="text-16">
              {p}
            </p>
          ))}
        </Card>
      </section>

      <section aria-labelledby="routes" className="space-y-4">
        <h2 id="routes" className="mono-label">
          {INTRO.storyHeading}
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {ROUTES.map((r) => (
            <li key={r.slug}>
              <Link href={`/day/9/${r.slug}/`} className="card block h-full p-5 hover:shadow-lifted">
                <p className="mono-label">
                  Route {r.no} · {r.levels}
                </p>
                <h3 className="mt-2 text-26">{r.verb}</h3>
                <p className="mt-2 text-14">{r.question}</p>
                <p className="mt-3 text-14">
                  <strong>You finish with:</strong> {r.deliverable}
                </p>
                <p className="mt-3 text-14 underline underline-offset-2">Open Route {r.no} →</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="max-w-3xl text-14 text-ink-soft">{INTRO.closing}</p>
      </section>

      <section aria-labelledby="wiifm" className="max-w-3xl">
        <Card className="space-y-4">
          <h2 id="wiifm" className="text-26">
            {INTRO.wiifm.heading}
          </h2>
          <p className="text-14 text-ink-soft">{INTRO.wiifm.lede}</p>
          <ul className="space-y-4">
            {INTRO.wiifm.items.map((it) => (
              <li key={it.skill}>
                <p className="flex flex-wrap items-baseline gap-2">
                  <strong className="text-16">{it.skill}</strong>
                  <span className="rounded border border-hairline px-2 py-0.5 font-mono text-12">Route {it.route}</span>
                </p>
                <p className="mt-1 text-14 text-ink-soft">{it.payoff}</p>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <p className="max-w-3xl text-14 text-ink-soft">
        Looking for more practice? The{' '}
        <Link href="/day/9/extra/" className="underline underline-offset-2">
          Extra shelf
        </Link>{' '}
        holds {EXTRAS.length} things that are not part of the tasks.
      </p>
    </div>
  );
}
