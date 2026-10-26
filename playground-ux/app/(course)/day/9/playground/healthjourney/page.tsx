'use client';

import { AnimatePresence, motion } from '@/lib/day9/motion-lite';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { copy, fmt } from '@/data/day9/copy';
import {
  conflictPrompts,
  dimensions,
  healthjourneyBrief,
  healthjourneyConstraints,
  healthjourneySteps,
  recommendationScaffold,
  residualRiskPrompts,
  variantById,
  variants,
  type Dimension,
  type Variant,
} from '@/data/day9/cases/healthjourney';
import { SPRING } from '@/lib/day9/motion';
import { checkNow } from '@/lib/day9/feedback-adapter';
import { useStore } from '@/lib/day9/store';
import { useMotionSafe } from '@/lib/day9/use-motion-safe';
import {
  Button,
  Card,
  Divider,
  EmptyState,
  Mono,
  PageHeader,
  Slider,
  TextArea,
  TextInput,
  cx,
} from '@/components/day9/ui';
import {
  ClientBrief,
  ReadinessGate,
  Step,
  UnpreparedReflection,
} from '@/components/day9/playground/CaseFrame';
import { VariantPrototype } from '@/components/day9/playground/VariantPrototype';
import { TradeoffCompass } from '@/components/day9/playground/TradeoffCompass';
import { StakeholderMeter } from '@/components/day9/playground/StakeholderMeter';
import { Inspectable } from '@/components/day9/inspector/InspectorTag';

const TOTAL = healthjourneySteps.length;

export default function HealthJourneyPage() {
  const accepted = useStore((s) => s.cases.healthjourney.briefAccepted);

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="CASE 02 · DECIDE UNDER TRADE-OFFS"
        title={healthjourneyBrief.client}
        deck={healthjourneyBrief.job}
      />

      <ReadinessGate caseId="healthjourney">
        <ClientBrief
          caseId="healthjourney"
          client={healthjourneyBrief.client}
          subtitle={healthjourneyBrief.subtitle}
          body={healthjourneyBrief.body}
          job={healthjourneyBrief.job}
          constraints={healthjourneyConstraints}
        />
        {accepted ? <HealthJourneyWorkbench /> : null}
      </ReadinessGate>
    </div>
  );
}

function HealthJourneyWorkbench() {
  const decision = useStore((s) => s.cases.healthjourney.decision);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_240px]">
      <div className="min-w-0 space-y-12">
        <ExperienceStep />
        <Divider />
        <ScoringStep />
        <Divider />

        <Step n={3} total={TOTAL} title={healthjourneySteps[2].title}>
          <StakeholderMeter />
        </Step>

        <Divider />
        <CommitStep />
        <Divider />

        <Step
          n={5}
          total={TOTAL}
          title={healthjourneySteps[4].title}
          prompt={copy.conflicts.intro}
          locked={!decision}
        >
          <ConflictFields />
        </Step>

        <Divider />

        <Step
          n={6}
          total={TOTAL}
          title={healthjourneySteps[5].title}
          prompt={copy.risks.intro}
          locked={!decision}
        >
          <ResidualRisks />
        </Step>

        <Divider />

        <Step n={7} total={TOTAL} title={healthjourneySteps[6].title} locked={!decision}>
          <RecommendationEditor />
        </Step>

        <Divider />
        <UnpreparedReflection caseId="healthjourney" />

        <Card>
          <Mono className="text-ink-soft">NEXT BRIEF</Mono>
          <p className="mt-2 max-w-2xl text-16">{copy.handoff.toMoveWell}</p>
          <Link href="/day/9/playground/movewell">
            <Button variant="primary" className="mt-4">
              {copy.playground.open}
            </Button>
          </Link>
        </Card>
      </div>

      {/* Constraints stay visible the whole time — the pressure must be felt. */}
      <aside className="no-print">
        <Inspectable mechanicId="constraint-visibility">
          <div className="sticky top-24 rounded-lg border border-hairline bg-raised p-4">
            <Mono className="text-ink-soft">{copy.playground.constraints}</Mono>
            <ul className="mt-2 space-y-1.5">
              {healthjourneyConstraints.map((c) => (
                <li key={c} className="text-12 text-ink-soft">
                  — {c}
                </li>
              ))}
            </ul>
          </div>
        </Inspectable>
      </aside>
    </div>
  );
}

/** Step 1: step into each prototype for at least 60 seconds. */
function ExperienceStep() {
  const [inside, setInside] = useState<Variant | null>(null);
  const times = useStore((s) => s.cases.healthjourney.timeInVariant);

  return (
    <Step
      n={1}
      total={TOTAL}
      title={healthjourneySteps[0].title}
      prompt="Use each one. Scoring from the description is guessing — and the gauges only move while you are inside."
    >
      <AnimatePresence mode="wait">
        {inside ? (
          <VariantPrototype key={inside} variant={inside} onLeave={() => setInside(null)} />
        ) : (
          <motion.ul
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-4 md:grid-cols-3"
          >
            {variants.map((v) => (
              <li key={v.id}>
                <Card className="flex h-full flex-col">
                  <Mono style={{ color: 'var(--activation-text)' }}>{v.name}</Mono>
                  <h3 className="mt-1 text-20">{v.label}</h3>
                  <p className="mt-2 flex-1 text-14 text-ink-soft">{v.summary}</p>
                  <p className="mt-3 font-mono text-12 text-ink-soft">
                    {times[v.id]}s inside so far
                  </p>
                  <Button variant="primary" className="mt-3" onClick={() => setInside(v.id)}>
                    {fmt(copy.variant.enter, { variant: v.name })}
                  </Button>
                </Card>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </Step>
  );
}

/** Step 2: score five dimensions per variant, compass updating live. */
function ScoringStep() {
  const [active, setActive] = useState<Variant>('A');
  const scores = useStore((s) => s.cases.healthjourney.scores);
  const setScore = useStore((s) => s.setScore);
  const markScored = useStore((s) => s.markScored);
  const scoredList = useStore((s) => s.cases.healthjourney.scored);
  const times = useStore((s) => s.cases.healthjourney.timeInVariant);
  const grantBadge = useStore((s) => s.grantBadge);

  const flat = useMemo(
    () =>
      scoredList.length === 3 &&
      variants.every((v) => dimensions.every((d) => scores[v.id][d.id] > 70)),
    [scoredList, scores]
  );

  // Trade-off Reader: at least two dimensions with a 30-point spread.
  useEffect(() => {
    if (scoredList.length < 3) return;
    const wideDimensions = dimensions.filter((d) => {
      const values = variants.map((v) => scores[v.id][d.id]);
      return Math.max(...values) - Math.min(...values) >= 30;
    });
    if (wideDimensions.length >= 2) grantBadge('tradeoff-reader');
  }, [scoredList, scores, grantBadge]);

  const notVisited = times[active] < 20;

  return (
    <Step n={2} total={TOTAL} title={healthjourneySteps[1].title}>
      {scoredList.length === 0 && Object.values(times).every((t) => t < 10) ? (
        <EmptyState message={copy.empty.scores} />
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4 flex gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setActive(v.id)}
                aria-pressed={active === v.id}
                className={cx(
                  'rounded border px-3 py-1.5 text-14',
                  active === v.id ? 'border-ink bg-ink text-white' : 'border-hairline hover:border-ink'
                )}
              >
                {v.name}
                {scoredList.includes(v.id) ? ' ✓' : ''}
              </button>
            ))}
          </div>

          {notVisited ? (
            <p className="mb-3 text-14" style={{ color: 'var(--risk-text)' }}>
              You have spent {times[active]}s inside {variantById[active].name}. Score it after you
              have used it, not before.
            </p>
          ) : null}

          <div className="space-y-4">
            {dimensions.map((d) => (
              <Slider
                key={d.id}
                id={`${active}-${d.id}`}
                label={d.label}
                sublabel={d.question}
                value={scores[active][d.id as Dimension]}
                accent={
                  d.id === 'credibility' || d.id === 'retention'
                    ? 'var(--integrity)'
                    : 'var(--activation)'
                }
                onChange={(v) => setScore(active, d.id, v)}
              />
            ))}
          </div>

          <Button variant="primary" className="mt-4" onClick={() => markScored(active)}>
            {fmt(copy.variant.scoreIt, {})}
          </Button>

          {scoredList.length >= 2 ? (
            <p className="mt-3 border-l-2 pl-3 text-14" style={{ borderColor: 'var(--activation)' }}>
              {copy.tradeoff.moved}
            </p>
          ) : null}

          {flat ? (
            <p className="mt-3 border-l-2 pl-3 text-14" style={{ borderColor: 'var(--risk)' }}>
              {copy.tradeoff.flatWarning}
            </p>
          ) : null}
        </div>

        <TradeoffCompass active={active} />
      </div>
    </Step>
  );
}

/** Step 4: the stamped decision (§5.3 #13). */
function CommitStep() {
  const decision = useStore((s) => s.cases.healthjourney.decision);
  const commit = useStore((s) => s.commitDecision);
  const reopen = useStore((s) => s.reopenDecision);
  const history = useStore((s) => s.cases.healthjourney.decisionHistory);
  const { reduced } = useMotionSafe();

  return (
    <Step n={4} total={TOTAL} title={healthjourneySteps[3].title}>
      {decision ? (
        <motion.div
          initial={reduced ? { opacity: 0 } : { scale: 1.06, rotate: -1.5, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={reduced ? { duration: 0.15 } : (SPRING.stamp as never)}
          className="max-w-md rounded-lg border-2 p-5 shadow-stamped"
          style={{ borderColor: 'var(--activation)' }}
        >
          <Mono style={{ color: 'var(--activation-text)' }}>{copy.decision.locked}</Mono>
          <p className="mt-2 font-display text-26">
            {variantById[decision].name} — {variantById[decision].label}
          </p>
          <p className="mt-2 text-16">
            {fmt(copy.decision.committed, { variant: variantById[decision].name })}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Button size="sm" onClick={reopen}>
              {copy.decision.reopen}
            </Button>
            {history.length > 1 ? (
              <Mono className="text-ink-soft">
                {fmt('{n} commitments on record', { n: history.length })}
              </Mono>
            ) : null}
          </div>
        </motion.div>
      ) : (
        <>
          {history.length ? (
            <p className="mb-3 text-14 text-ink-soft">{copy.decision.reopened}</p>
          ) : null}
          <div className="flex flex-wrap gap-3">
            {variants.map((v) => (
              <Button key={v.id} variant="primary" onClick={() => commit(v.id)}>
                {fmt(copy.decision.commit, { variant: v.name })}
              </Button>
            ))}
          </div>
        </>
      )}
    </Step>
  );
}

function ConflictFields() {
  const conflicts = useStore((s) => s.cases.healthjourney.conflicts);
  const setConflict = useStore((s) => s.setConflict);

  return (
    <div className="max-w-2xl space-y-5">
      {conflictPrompts.map((c) => (
        <div key={c.id}>
          <label htmlFor={c.id} className="mono-label">
            {c.label}
          </label>
          <p className="mb-1 text-14 text-ink-soft">{c.prompt}</p>
          <TextArea
            id={c.id}
            rows={2}
            value={conflicts[c.id] ?? ''}
            onChange={(v) => setConflict(c.id, v)}
            ariaLabel={c.prompt}
          />
        </div>
      ))}
    </div>
  );
}

function ResidualRisks() {
  const risks = useStore((s) => s.cases.healthjourney.residualRisks);
  const setRisks = useStore((s) => s.setResidualRisks);
  const list = risks.length ? risks : ['', ''];

  function update(index: number, value: string) {
    const next = [...list];
    next[index] = value;
    setRisks(next);
  }

  const accepted = list.filter((r) => r.trim() && checkNow(r, 'residual-risk').accepted).length;

  return (
    <div className="max-w-2xl space-y-4">
      <ul className="space-y-3">
        {list.map((risk, i) => (
          <li key={i}>
            <label htmlFor={`risk-${i}`} className="mono-label">
              {residualRiskPrompts[i % residualRiskPrompts.length]}
            </label>
            <TextInput
              id={`risk-${i}`}
              value={risk}
              onChange={(v) => update(i, v)}
              placeholder={copy.risks.placeholder}
              ariaLabel={residualRiskPrompts[i % residualRiskPrompts.length]}
            />
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <Button size="sm" onClick={() => setRisks([...list, ''])}>
          {copy.risks.add}
        </Button>
        {accepted < 2 ? (
          <p className="text-14" style={{ color: 'var(--risk-text)' }}>
            {copy.error.needTwo}
          </p>
        ) : (
          <p className="text-14" style={{ color: 'var(--integrity-text)' }}>
            {fmt('{n} risks named and kept on purpose.', { n: accepted })}
          </p>
        )}
      </div>
    </div>
  );
}

/** Step 7: a scaffold, not an empty textarea. */
function RecommendationEditor() {
  const recommendation = useStore((s) => s.cases.healthjourney.recommendation);
  const setField = useStore((s) => s.setRecommendationField);
  const decision = useStore((s) => s.cases.healthjourney.decision);

  return (
    <div className="max-w-2xl space-y-3">
      <div className="rounded-lg border border-hairline bg-raised p-5 text-16 leading-relaxed">
        {recommendationScaffold.map((part) => (
          <span key={part.id}>
            {part.before}
            <input
              value={
                part.id === 'variant' && !recommendation.variant && decision
                  ? variantById[decision].name
                  : (recommendation[part.id] ?? '')
              }
              onChange={(e) => setField(part.id, e.target.value)}
              placeholder={part.placeholder}
              aria-label={part.placeholder}
              className="mx-1 inline-block min-w-[8ch] border-b border-hairline bg-transparent px-1 focus:border-ink focus:outline-none"
              style={{ width: `${Math.max(8, (recommendation[part.id] ?? part.placeholder).length)}ch` }}
            />
            {part.after}{' '}
          </span>
        ))}
      </div>
      <p className="text-12 text-ink-soft">
        This paragraph is pulled into capstone section 2 when you get there.
      </p>
    </div>
  );
}
