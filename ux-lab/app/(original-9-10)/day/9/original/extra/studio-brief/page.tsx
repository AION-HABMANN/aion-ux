'use client';

import { motion } from '@/original/lib/day9/motion-lite';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { copy, fmt } from '@/original/data/day9/copy';
import { concepts } from '@/original/data/day9/concepts';
import { DUR, EASE, STAGGER } from '@/original/lib/day9/motion';
import { useStore } from '@/original/lib/day9/store';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { Button, Card, Eyebrow, Mono, TextInput } from '@/original/components/day9/ui';
import { Inspectable } from '@/original/components/day9/inspector/InspectorTag';

/** Landing / narrative onboarding (§5.3 #1). */
export default function StartPage() {
  const { reduced } = useMotionSafe();
  const hydrated = useStore((s) => s.hydrated);
  const name = useStore((s) => s.learner.name);
  const setName = useStore((s) => s.setName);
  const lastRoute = useStore((s) => s.flags.lastRoute);
  const xp = useStore((s) => s.progression.xp);
  const recompute = useStore((s) => s.recomputeGauges);

  const [draft, setDraft] = useState('');
  const [asked, setAsked] = useState(false);

  useEffect(() => {
    if (hydrated) recompute();
  }, [hydrated, recompute]);

  const returning = hydrated && xp > 0;
  const needsName = hydrated && !name && !asked;

  const lines = [copy.landing.line1, copy.landing.line2, copy.landing.line3];

  return (
    <div className="space-y-14">
      <section>
        <Eyebrow>{copy.landing.eyebrow}</Eyebrow>

        {/* Stagger reveal, 0 / 120 / 240ms (§5.3 #1). */}
        <div className="mt-4 max-w-3xl">
          {lines.map((line, i) => (
            <motion.p
              key={line}
              className="font-display text-26 leading-tight sm:text-34"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0.15 : DUR.base,
                delay: reduced ? 0 : i * 0.12,
                ease: EASE.out as number[],
              }}
              style={i === 2 ? { color: 'var(--ink-soft)' } : undefined}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.p
          className="mt-5 max-w-2xl text-16 text-ink-soft"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 0.36, duration: DUR.base }}
        >
          {copy.landing.deck}
        </motion.p>

        {/* The name is asked once and used everywhere afterwards. */}
        <motion.div
          className="mt-8 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 0.48, duration: DUR.base }}
        >
          {needsName ? (
            <Card>
              <label htmlFor="learner-name" className="mono-label">
                {copy.landing.namePrompt}
              </label>
              <div className="mt-2 flex gap-2">
                <TextInput
                  id="learner-name"
                  value={draft}
                  onChange={setDraft}
                  placeholder={copy.landing.namePlaceholder}
                  onEnter={() => {
                    setName(draft);
                    setAsked(true);
                  }}
                />
                <Button
                  variant="primary"
                  onClick={() => {
                    setName(draft);
                    setAsked(true);
                  }}
                >
                  {copy.landing.nameSubmit}
                </Button>
              </div>
              <p className="mt-2 text-12 text-ink-soft">{copy.landing.nameHelp}</p>
              <button
                type="button"
                onClick={() => setAsked(true)}
                className="mt-2 text-12 text-ink-soft underline underline-offset-2 hover:text-ink"
              >
                {copy.landing.nameSkip}
              </button>
            </Card>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/day/9/original/learn">
                <Button variant="primary">{copy.nav.learn}</Button>
              </Link>
              <Link href="/day/9/original/playground">
                <Button>{copy.nav.playground}</Button>
              </Link>
              {returning && lastRoute.replace(/\/$/, '') !== '/day/9/original' ? (
                <Link
                  href={lastRoute}
                  className="text-14 text-ink-soft underline underline-offset-2"
                >
                  {copy.landing.resume}
                </Link>
              ) : null}
            </div>
          )}
        </motion.div>

        {returning ? (
          <p className="mt-4 text-14" style={{ color: 'var(--integrity-text)' }}>
            {copy.progress.resumeGeneric}
          </p>
        ) : null}
      </section>

      {/* The studio frame: manual, briefs, board. */}
      <section aria-labelledby="how-it-works">
        <h2 id="how-it-works" className="mono-label mb-4">
          {copy.landing.howItWorks}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {copy.landing.steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: reduced ? 0.15 : DUR.base,
                delay: reduced ? 0 : i * STAGGER.base,
              }}
            >
              <Card className="h-full">
                <Mono className="text-ink-soft">{['MANUAL', 'BRIEFS', 'BOARD'][i]}</Mono>
                <h3 className="mt-2 text-20">{step.title}</h3>
                <p className="mt-2 text-14 text-ink-soft">{step.body}</p>
              </Card>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-14 text-ink-soft">{copy.landing.ratio}</p>
      </section>

      {/* A quiet index of the manual, so the scale is visible from the start. */}
      <section aria-labelledby="manual-index">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 id="manual-index" className="mono-label">
            {copy.learn.hubTitle}
          </h2>
          <Link href="/day/9/original/learn" className="text-14 underline underline-offset-2">
            {copy.nav.learn}
          </Link>
        </div>
        <Inspectable mechanicId="visible-progress">
          <ol className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {concepts.map((c) => (
              <li key={c.slug} className="flex items-baseline gap-3 border-b border-hairline py-2">
                <Mono className="w-6 shrink-0 text-ink-soft">
                  {String(c.order).padStart(2, '0')}
                </Mono>
                <Link href={`/day/9/original/learn/${c.slug}`} className="text-14 hover:underline">
                  {c.title}
                </Link>
              </li>
            ))}
          </ol>
        </Inspectable>
      </section>

      {name ? (
        <p className="text-14 text-ink-soft">
          {fmt('Signed in as {name} on this device.', { name })}
        </p>
      ) : null}
    </div>
  );
}
