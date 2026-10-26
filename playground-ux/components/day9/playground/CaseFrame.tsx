'use client';

import { motion } from '@/lib/day9/motion-lite';
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { copy, fmt } from '@/data/day9/copy';
import { conceptBySlug, conceptsSupporting } from '@/data/day9/concepts';
import { DUR } from '@/lib/day9/motion';
import { useStore } from '@/lib/day9/store';
import { useMotionSafe } from '@/lib/day9/use-motion-safe';
import { Button, Card, Eyebrow, Mono, cx } from '@/components/day9/ui';
import { Inspectable } from '@/components/day9/inspector/InspectorTag';
import { ProgressRing } from '@/components/day9/gamification/ProgressRing';

export function useReadiness(caseId: string) {
  const learn = useStore((s) => s.learn);
  const supporting = conceptsSupporting(caseId);
  const done = supporting.filter((slug) => learn[slug]?.completed);
  return {
    supporting,
    done,
    missing: supporting.filter((slug) => !learn[slug]?.completed),
    ratio: supporting.length ? done.length / supporting.length : 1,
  };
}

/** The readiness meter shown on the hub (§3). */
export function ReadinessMeter({ caseId }: { caseId: string }) {
  const { supporting, done } = useReadiness(caseId);
  return (
    <Inspectable mechanicId="visible-progress">
      <div className="flex items-center gap-3">
        <ProgressRing value={done.length} total={supporting.length} size={44} stroke={4} label={copy.playground.readiness} />
        <div>
          <Mono className="text-ink-soft">{copy.playground.readiness}</Mono>
          <p className="text-12 text-ink-soft">
            {fmt(copy.playground.readinessMeter, {
              done: done.length,
              total: supporting.length,
            })}
          </p>
        </div>
      </div>
    </Inspectable>
  );
}

/**
 * Soft gate (§3). The button into the case is never disabled — autonomy is part
 * of the lesson — but going in unprepared is recorded and reflected back at the
 * end of the case.
 */
export function ReadinessGate({
  caseId,
  children,
}: {
  caseId: string;
  children: ReactNode;
}) {
  const { missing, ratio } = useReadiness(caseId);
  const markUnprepared = useStore((s) => s.markUnprepared);
  const alreadyIn = useStore((s) => s.flags.enteredCaseUnprepared.includes(caseId));
  const briefAccepted = useStore(
    (s) => s.cases[caseId as 'skillrise' | 'healthjourney' | 'movewell'].briefAccepted
  );
  const [override, setOverride] = useState(false);
  const { transition } = useMotionSafe();

  const blocked = ratio < 0.5 && !override && !alreadyIn && !briefAccepted;

  if (!blocked) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={transition(DUR.base)}
      className="mx-auto max-w-xl"
    >
      <Card>
        <Eyebrow tone="risk">{copy.playground.readiness}</Eyebrow>
        <p className="mt-2 text-16">{copy.readiness.low}</p>

        <div className="mt-4">
          <Mono className="text-ink-soft">{copy.readiness.missingLabel}</Mono>
          <ul className="mt-1 space-y-1">
            {missing.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/day/9/learn/${slug}`}
                  className="text-14 underline underline-offset-2 hover:no-underline"
                >
                  {conceptBySlug[slug]?.title ?? slug}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/day/9/learn">
            <Button variant="primary">{copy.readiness.coverFirst}</Button>
          </Link>
          <Button
            onClick={() => {
              markUnprepared(caseId);
              setOverride(true);
            }}
          >
            {copy.readiness.goAnyway}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

/** Shown at the end of a case the learner entered without the background. */
export function UnpreparedReflection({ caseId }: { caseId: string }) {
  const unprepared = useStore((s) => s.flags.enteredCaseUnprepared.includes(caseId));
  const { missing } = useReadiness(caseId);
  if (!unprepared) return null;

  return (
    <Card className="border-dashed">
      <Eyebrow tone="risk">{copy.playground.readiness}</Eyebrow>
      <p className="mt-2 text-16">{copy.readiness.overridden}</p>
      <ul className="mt-3 space-y-1">
        {missing.map((slug) => (
          <li key={slug} className="text-14 text-ink-soft">
            <Link href={`/day/9/learn/${slug}`} className="underline underline-offset-2">
              {conceptBySlug[slug]?.title}
            </Link>
            {' — '}
            {conceptBySlug[slug]?.canNow}
          </li>
        ))}
        {missing.length === 0 ? (
          <li className="text-14 text-ink-soft">
            You have since covered everything behind this case. The gap closed itself.
          </li>
        ) : null}
      </ul>
    </Card>
  );
}

/** The client brief card that opens every case (§3 narrative frame). */
export function ClientBrief({
  caseId,
  client,
  subtitle,
  body,
  job,
  constraints,
}: {
  caseId: 'skillrise' | 'healthjourney' | 'movewell';
  client: string;
  subtitle: string;
  body: string;
  job: string;
  constraints?: string[];
}) {
  const accepted = useStore((s) => s.cases[caseId].briefAccepted);
  const accept = useStore((s) => s.acceptBrief);
  const { transition } = useMotionSafe();

  if (accepted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition(DUR.base)}
      className="mx-auto max-w-2xl"
    >
      <Card>
        <Eyebrow>{copy.playground.briefFrom}</Eyebrow>
        <h2 className="mt-2 font-display text-26">{client}</h2>
        <p className="mt-1 text-14 text-ink-soft">{subtitle}</p>
        <p className="mt-4 text-16">{body}</p>

        {constraints?.length ? (
          <div className="mt-4">
            <Mono className="text-ink-soft">{copy.playground.constraints}</Mono>
            <ul className="mt-1 space-y-0.5">
              {constraints.map((c) => (
                <li key={c} className="text-14 text-ink-soft">
                  — {c}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div
          className="mt-5 border-l-2 pl-3"
          style={{ borderColor: 'var(--activation)' }}
        >
          <Mono className="text-ink-soft">{copy.playground.yourJob}</Mono>
          <p className="text-16">{job}</p>
        </div>

        <Button variant="primary" className="mt-5" onClick={() => accept(caseId)}>
          {copy.playground.accept}
        </Button>
      </Card>
    </motion.div>
  );
}

/** Numbered step wrapper used by all three cases. */
export function Step({
  n,
  total,
  title,
  prompt,
  children,
  locked,
  lockedNote,
}: {
  n: number;
  total: number;
  title: string;
  prompt?: string;
  children: ReactNode;
  locked?: boolean;
  lockedNote?: string;
}) {
  const { reduced } = useMotionSafe();
  return (
    <motion.section
      className={cx('scroll-mt-24', locked && 'opacity-60')}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: locked ? 0.6 : 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: reduced ? 0.15 : DUR.base }}
      aria-labelledby={`step-${n}`}
    >
      <div className="mb-3 flex flex-wrap items-baseline gap-3">
        <Mono style={{ color: 'var(--activation-text)' }}>
          {fmt(copy.playground.stepOf, { n, total })}
        </Mono>
        <h2 id={`step-${n}`} className="text-20">
          {title}
        </h2>
      </div>
      {prompt ? <p className="mb-4 max-w-2xl text-14 text-ink-soft">{prompt}</p> : null}
      {locked && lockedNote ? (
        <p className="mb-3 text-14" style={{ color: 'var(--risk-text)' }}>
          {lockedNote}
        </p>
      ) : null}
      <div className={locked ? 'pointer-events-none' : undefined}>{children}</div>
    </motion.section>
  );
}
