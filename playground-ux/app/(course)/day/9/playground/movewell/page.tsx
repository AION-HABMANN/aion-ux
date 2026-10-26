'use client';

import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { copy, fmt } from '@/data/day9/copy';
import { CATEGORIES } from '@/data/day9/cases/skillrise';
import {
  BUDGET_TOTAL,
  TOTAL_WEEKS,
  buildRecommendation,
  justificationPrompts,
  measureById,
  movewellBrief,
  movewellConstraints,
  movewellSteps,
  observedProblems,
} from '@/data/day9/cases/movewell';
import type { Category } from '@/data/day9/types';
import { summariseAllocation } from '@/lib/day9/export';
import { useStore } from '@/lib/day9/store';
import {
  Button,
  Card,
  Divider,
  EmptyState,
  Mono,
  PageHeader,
  TextArea,
  cx,
} from '@/components/day9/ui';
import {
  ClientBrief,
  ReadinessGate,
  Step,
  UnpreparedReflection,
} from '@/components/day9/playground/CaseFrame';
import { BudgetAllocator } from '@/components/day9/playground/BudgetAllocator';
import { DecisionReceipt, TimelineLock } from '@/components/day9/playground/DecisionReceipt';
import { Inspectable } from '@/components/day9/inspector/InspectorTag';

const TOTAL = movewellSteps.length;

export default function MoveWellPage() {
  const accepted = useStore((s) => s.cases.movewell.briefAccepted);

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="CASE 03 · ALLOCATE UNDER CONSTRAINTS"
        title={movewellBrief.client}
        deck={movewellBrief.job}
      />

      <ReadinessGate caseId="movewell">
        <ClientBrief
          caseId="movewell"
          client={movewellBrief.client}
          subtitle={movewellBrief.subtitle}
          body={movewellBrief.body}
          job={movewellBrief.job}
        />
        {accepted ? <MoveWellWorkbench /> : null}
      </ReadinessGate>
    </div>
  );
}

function MoveWellWorkbench() {
  const state = useStore((s) => s);
  const allocation = useStore((s) => s.cases.movewell.allocation);
  const deferred = useStore((s) => s.cases.movewell.deferred);
  const issueReceipt = useStore((s) => s.issueReceipt);
  const receiptIssued = useStore((s) => s.cases.movewell.receiptIssued);
  const grantBadge = useStore((s) => s.grantBadge);

  const summary = useMemo(() => summariseAllocation(state), [state]);

  const valid =
    allocation.length >= 3 &&
    !summary.overBudget &&
    !summary.overTime &&
    deferred.length >= 1 &&
    deferred.every((d) => d.reason.trim().length > 8);

  useEffect(() => {
    if (!valid) return;
    issueReceipt();
    // Under Budget: 10% of budget and a week still in hand.
    if (
      summary.remaining >= BUDGET_TOTAL * 0.1 &&
      summary.weeksUsed <= TOTAL_WEEKS - 1
    ) {
      grantBadge('under-budget');
    }
  }, [valid, summary, issueReceipt, grantBadge]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
      <div className="min-w-0 space-y-12">
        <Step
          n={1}
          total={TOTAL}
          title={movewellSteps[0].title}
          prompt="Six problems were observed. Put each one in the category it actually belongs to — the category decides which measure can fix it."
        >
          <Categorisation />
        </Step>

        <Divider />

        <Step
          n={2}
          total={TOTAL}
          title={movewellSteps[1].title}
          prompt="Ten measures, four constraints, one budget. Nothing on these cards tells you which ones are right."
        >
          <p className="text-14 text-ink-soft">
            The deck sits under the timeline. Drag a card onto a week, or select it and press the
            week button — both routes work.
          </p>
        </Step>

        <Divider />

        <Step n={3} total={TOTAL} title={movewellSteps[2].title}>
          <BudgetAllocator />
          {valid ? (
            <div className="mt-4">
              <TimelineLock weeksUsed={summary.weeksUsed} />
              <p className="mt-2 text-14" style={{ color: 'var(--integrity-text)' }}>
                {fmt(copy.budget.locked, {
                  spent: summary.spent.toLocaleString('en-GB'),
                  n: summary.deferredCount,
                })}
              </p>
            </div>
          ) : null}
        </Step>

        <Divider />

        <Step
          n={4}
          total={TOTAL}
          title={movewellSteps[3].title}
          prompt="Four short fields per measure. Not essays — the division head reads these in a meeting."
        >
          <Justifications />
        </Step>

        <Divider />

        <Step n={5} total={TOTAL} title={movewellSteps[4].title} locked={!receiptIssued}>
          {receiptIssued ? (
            <DecisionReceipt />
          ) : (
            <EmptyState message={copy.empty.allocation} />
          )}
        </Step>

        <Divider />

        <Step n={6} total={TOTAL} title={movewellSteps[5].title} locked={!receiptIssued}>
          <RecommendationEditor />
        </Step>

        <Divider />
        <UnpreparedReflection caseId="movewell" />

        <Card>
          <Mono className="text-ink-soft">NEXT</Mono>
          <p className="mt-2 max-w-2xl text-16">{copy.handoff.toCapstone}</p>
          <Link href="/day/9/capstone">
            <Button variant="primary" className="mt-4">
              {copy.nav.capstone}
            </Button>
          </Link>
        </Card>
      </div>

      <aside className="no-print">
        <Inspectable mechanicId="constraint-visibility">
          <div className="sticky top-24 rounded-lg border border-hairline bg-raised p-4">
            <Mono className="text-ink-soft">{copy.playground.constraints}</Mono>
            <dl className="mt-2 space-y-2">
              {movewellConstraints.map((c) => (
                <div key={c.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                    {c.label}
                  </dt>
                  <dd className="text-14">{c.value}</dd>
                  <dd className="text-12 text-ink-soft">{c.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Inspectable>
      </aside>
    </div>
  );
}

function Categorisation() {
  const categorisation = useStore((s) => s.cases.movewell.categorisation);
  const setCategorisation = useStore((s) => s.setCategorisation);

  return (
    <ul className="space-y-3">
      {observedProblems.map((p) => (
        <li key={p.id} className="rounded-lg border border-hairline bg-raised p-3">
          <div className="flex items-baseline gap-2">
            <Mono className="text-ink-soft">{p.id}</Mono>
            <p className="text-14">{p.problem}</p>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => {
              const chosen = categorisation[p.id] === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategorisation(p.id, c.id as Category)}
                  aria-pressed={chosen}
                  className={cx(
                    'rounded border px-2 py-1 text-12',
                    chosen ? 'border-ink bg-ink text-white' : 'border-hairline hover:border-ink'
                  )}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Justifications() {
  const allocation = useStore((s) => s.cases.movewell.allocation);
  const justifications = useStore((s) => s.cases.movewell.justifications);
  const setJustification = useStore((s) => s.setJustification);

  if (allocation.length === 0) {
    return <EmptyState message={copy.empty.allocation} />;
  }

  return (
    <ul className="space-y-5">
      {allocation.map((a) => {
        const measure = measureById[a.measureId];
        if (!measure) return null;
        return (
          <li key={a.measureId} className="rounded-lg border border-hairline bg-raised p-4">
            <p className="text-16 font-medium">{measure.name}</p>
            <Mono className="text-ink-soft">
              starts week {a.startWeek} · {measure.weeks} weeks
            </Mono>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {justificationPrompts.map((prompt) => (
                <div key={prompt.id}>
                  <label htmlFor={`${a.measureId}-${prompt.id}`} className="mono-label">
                    {prompt.label}
                  </label>
                  <p className="mb-1 text-12 text-ink-soft">
                    {fmt(prompt.prompt, { n: measure.weeks })}
                  </p>
                  <TextArea
                    id={`${a.measureId}-${prompt.id}`}
                    rows={2}
                    value={justifications[a.measureId]?.[prompt.id] ?? ''}
                    onChange={(v) => setJustification(a.measureId, prompt.id, v)}
                    ariaLabel={`${measure.name} — ${prompt.label}`}
                  />
                </div>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Step 6: prefilled from the actual decisions, then edited. */
function RecommendationEditor() {
  const state = useStore((s) => s);
  const recommendation = useStore((s) => s.cases.movewell.recommendation);
  const setRecommendation = useStore((s) => s.setMoveWellRecommendation);

  const summary = useMemo(() => summariseAllocation(state), [state]);
  const placed = state.cases.movewell.allocation
    .map((a) => ({ ...a, measure: measureById[a.measureId] }))
    .filter((a) => a.measure)
    .sort((a, b) => b.measure.impact - a.measure.impact);

  const draft = buildRecommendation({
    measure1: placed[0]?.measure.name ?? 'the first measure',
    measure2: placed[1]?.measure.name ?? 'the second measure',
    measure3: placed[2]?.measure.name ?? 'the third measure',
    deferred: summary.deferredNames[0]?.name ?? 'the deferred measure',
    deferredReason: summary.deferredNames[0]?.reason ?? '',
    risk: summary.biggestExposure,
    week3: placed[2]?.startWeek ?? 8,
    reviewWeek: Math.min(TOTAL_WEEKS, summary.weeksUsed + 1),
  });

  return (
    <div className="max-w-2xl space-y-3">
      <TextArea
        value={recommendation || draft}
        onChange={setRecommendation}
        rows={12}
        ariaLabel={movewellSteps[5].title}
      />
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => setRecommendation(draft)}>
          Rebuild from my decisions
        </Button>
        <Button size="sm" onClick={() => window.print()}>
          {copy.capstone.print}
        </Button>
      </div>
      <p className="text-12 text-ink-soft">
        Written from your allocation, not from a template. Edit it — the board brief quotes it.
      </p>
    </div>
  );
}
