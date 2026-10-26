'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { copy, fmt } from '@/data/day9/copy';
import {
  EXPLORE_SECONDS,
  skillriseBrief,
  skillriseCompletion,
  skillriseSteps,
} from '@/data/day9/cases/skillrise';
import { checkNow } from '@/lib/day9/feedback-adapter';
import { useStore } from '@/lib/day9/store';
import { Button, Card, Divider, EmptyState, Mono, PageHeader, TextArea, cx } from '@/components/day9/ui';
import {
  ClientBrief,
  ReadinessGate,
  Step,
  UnpreparedReflection,
} from '@/components/day9/playground/CaseFrame';
import { HotspotCanvas } from '@/components/day9/playground/HotspotCanvas';
import { InsightRadar } from '@/components/day9/playground/InsightRadar';
import { Inspectable } from '@/components/day9/inspector/InspectorTag';

const TOTAL = skillriseSteps.length;

export default function SkillRisePage() {
  const accepted = useStore((s) => s.cases.skillrise.briefAccepted);

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="CASE 01 · DIAGNOSE"
        title={skillriseBrief.client}
        deck={skillriseBrief.job}
      />

      <ReadinessGate caseId="skillrise">
        <ClientBrief
          caseId="skillrise"
          client={skillriseBrief.client}
          subtitle={skillriseBrief.subtitle}
          body={skillriseBrief.body}
          job={skillriseBrief.job}
        />

        {accepted ? <SkillRiseWorkbench /> : null}
      </ReadinessGate>
    </div>
  );
}

function SkillRiseWorkbench() {
  const observations = useStore((s) => s.cases.skillrise.observations);

  return (
    <div className="space-y-12">
      <FirstImpression />
      <Divider />

      <Step
        n={2}
        total={TOTAL}
        title={skillriseSteps[1].title}
        prompt={skillriseSteps[1].prompt}
      >
        <HotspotCanvas />
      </Step>

      <Divider />

      <Step
        n={3}
        total={TOTAL}
        title={skillriseSteps[2].title}
        prompt={skillriseSteps[2].prompt}
      >
        <InsightRadar />
      </Step>

      <Divider />

      <Step
        n={4}
        total={TOTAL}
        title={skillriseSteps[3].title}
        prompt={skillriseSteps[3].prompt}
      >
        <ImpactStatements />
      </Step>

      <Divider />

      <Step
        n={5}
        total={TOTAL}
        title={skillriseSteps[4].title}
        prompt={skillriseSteps[4].prompt}
        locked={observations.length < 2}
        lockedNote={observations.length < 2 ? copy.error.needBoth : undefined}
      >
        <Priorities />
      </Step>

      <Divider />

      <UnpreparedReflection caseId="skillrise" />

      <Card>
        <Mono className="text-ink-soft">NEXT BRIEF</Mono>
        <p className="mt-2 max-w-2xl text-16">{skillriseCompletion.handoff}</p>
        <Link href="/day/9/playground/healthjourney">
          <Button variant="primary" className="mt-4">
            {copy.playground.open}
          </Button>
        </Link>
      </Card>
    </div>
  );
}

/** Step 1: the field unlocks only after 90 seconds of exploring (§8). */
function FirstImpression() {
  const startedAt = useStore((s) => s.cases.skillrise.exploreStartedAt);
  const startExplore = useStore((s) => s.startExplore);
  const impression = useStore((s) => s.cases.skillrise.firstImpression);
  const setImpression = useStore((s) => s.setFirstImpression);

  const [remaining, setRemaining] = useState(EXPLORE_SECONDS);

  useEffect(() => {
    startExplore();
  }, [startExplore]);

  useEffect(() => {
    if (!startedAt) return;
    const update = () => {
      const elapsed = Math.floor((Date.now() - Date.parse(startedAt)) / 1000);
      setRemaining(Math.max(0, EXPLORE_SECONDS - elapsed));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  const locked = remaining > 0;

  return (
    <Step n={1} total={TOTAL} title={skillriseSteps[0].title} prompt={skillriseSteps[0].prompt}>
      <div className="max-w-2xl space-y-3">
        {locked ? (
          <Inspectable mechanicId="constraint-visibility">
            <p className="rounded border border-dashed border-hairline px-3 py-2 text-14">
              {fmt(skillriseSteps[0].lockedHint, { t: `${remaining}s` })}
            </p>
          </Inspectable>
        ) : null}

        <TextArea
          value={impression}
          onChange={setImpression}
          rows={4}
          disabled={locked}
          placeholder={skillriseSteps[0].placeholder}
          ariaLabel={skillriseSteps[0].title}
        />
        <p className="text-12 text-ink-soft">
          Explore the mock below while the timer runs. Experience first, analysis second.
        </p>
      </div>
    </Step>
  );
}

/** Step 4: three impact statements, nudged when they describe the interface. */
function ImpactStatements() {
  const statements = useStore((s) => s.cases.skillrise.impactStatements);
  const setStatement = useStore((s) => s.setImpactStatement);
  const award = useStore((s) => s.award);
  const grantBadge = useStore((s) => s.grantBadge);

  const verdicts = useMemo(
    () => statements.map((s) => (s.trim() ? checkNow(s, 'impact-statement') : null)),
    [statements]
  );

  // Depend on the accepted signature, not on a freshly built array — a new
  // reference every render would re-run this on every keystroke.
  const acceptedKey = verdicts.map((v) => (v?.accepted ? '1' : '0')).join('');

  useEffect(() => {
    acceptedKey.split('').forEach((flag, i) => {
      if (flag === '1') award('impactStatement', `impact:${i}`, { silent: true });
    });
    if (acceptedKey === '111') grantBadge('impact-translator');
  }, [acceptedKey, award, grantBadge]);

  return (
    <div className="max-w-2xl space-y-4">
      <Card className="border-dashed">
        <Mono className="text-ink-soft">{copy.impact.exampleLabel}</Mono>
        <p className="mt-1 text-14 italic">{copy.impact.example}</p>
      </Card>

      {statements.map((value, i) => {
        const verdict = verdicts[i];
        return (
          <div key={i}>
            <label className="mono-label" htmlFor={`impact-${i}`}>
              {copy.impact.template}
            </label>
            <div className="mt-1 flex items-start gap-2">
              <span className="pt-2 text-14 text-ink-soft">{copy.impact.prefix}</span>
              <TextArea
                id={`impact-${i}`}
                value={value}
                onChange={(v) => setStatement(i, v)}
                rows={2}
                ariaLabel={`${copy.impact.template} ${i + 1}`}
              />
            </div>
            {verdict ? (
              <p
                className="mt-1 text-14"
                style={{ color: verdict.accepted ? 'var(--integrity)' : 'var(--risk)' }}
              >
                {verdict.message}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/** Step 5: drag or select two observations into weighted slots. */
function Priorities() {
  const observations = useStore((s) => s.cases.skillrise.observations);
  const priorities = useStore((s) => s.cases.skillrise.priorities);
  const setPriorities = useStore((s) => s.setPriorities);
  const reason = useStore((s) => s.cases.skillrise.priorityReason);
  const setReason = useStore((s) => s.setPriorityReason);

  const [picked, setPicked] = useState<string | null>(null);

  function assign(slot: 0 | 1, id: string) {
    const next: [string, string] = [...priorities] as [string, string];
    next[slot] = id;
    // The same observation cannot occupy both slots.
    if (next[slot === 0 ? 1 : 0] === id) next[slot === 0 ? 1 : 0] = '';
    setPriorities(next);
    setPicked(null);
  }

  if (observations.length === 0) {
    return <EmptyState message={copy.empty.observations} />;
  }

  const bothSet = Boolean(priorities[0] && priorities[1]);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div className="space-y-3">
        {[0, 1].map((slot) => {
          const id = priorities[slot];
          const obs = observations.find((o) => o.id === id);
          return (
            <div
              key={slot}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const dropped = e.dataTransfer.getData('text/plain');
                if (dropped) assign(slot as 0 | 1, dropped);
              }}
              className={cx(
                'rounded-lg border-2 border-dashed p-4',
                slot === 0 ? 'min-h-[104px]' : 'min-h-[76px] opacity-90'
              )}
              style={{
                borderColor: obs ? 'var(--activation)' : 'var(--hairline)',
              }}
            >
              <div className="flex items-center justify-between">
                <Mono
                  style={{ color: obs ? 'var(--activation)' : 'var(--ink-soft)' }}
                  className={slot === 0 ? 'text-14' : undefined}
                >
                  {slot === 0 ? copy.priorities.first : copy.priorities.second}
                </Mono>
                {picked ? (
                  <Button size="sm" onClick={() => assign(slot as 0 | 1, picked)}>
                    {fmt('Place here', {})}
                  </Button>
                ) : null}
              </div>
              <p className="mt-2 text-16">
                {obs ? obs.text : 'Drop an observation here, or select one and press Place here.'}
              </p>
            </div>
          );
        })}

        {bothSet ? (
          <div>
            <label htmlFor="priority-reason" className="mono-label">
              {copy.priorities.reason}
            </label>
            <TextArea
              id="priority-reason"
              value={reason}
              onChange={setReason}
              rows={3}
              ariaLabel={copy.priorities.reason}
            />
            {reason.trim().length > 20 ? (
              <p className="mt-2 text-14" style={{ color: 'var(--integrity-text)' }}>
                {copy.priorities.set}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div>
        <Mono className="text-ink-soft">YOUR OBSERVATIONS</Mono>
        <ul className="mt-2 space-y-2">
          {observations.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', o.id)}
                onClick={() => setPicked(picked === o.id ? null : o.id)}
                aria-pressed={picked === o.id}
                className={cx(
                  'w-full cursor-grab rounded border px-3 py-2 text-left text-14',
                  picked === o.id ? 'border-ink bg-ink text-white' : 'border-hairline hover:border-ink'
                )}
              >
                {o.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
