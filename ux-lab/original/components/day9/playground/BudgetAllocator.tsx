'use client';

import { motion } from '@/original/lib/day9/motion-lite';
import { useEffect, useMemo, useRef, useState } from 'react';
import { copy, fmt } from '@/original/data/day9/copy';
import {
  BUDGET_TOTAL,
  TOTAL_WEEKS,
  measureById,
  measures,
  type Measure,
} from '@/original/data/day9/cases/movewell';
import { formatEuro } from '@/original/lib/day9/export';
import { DUR } from '@/original/lib/day9/motion';
import { useStore } from '@/original/lib/day9/store';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { Button, Meter, Mono, TextInput, cx } from '@/original/components/day9/ui';
import { Inspectable } from '@/original/components/day9/inspector/InspectorTag';

/**
 * Drag a measure onto the twelve-week timeline; the budget bar shrinks with
 * easing and pulses red past the limit (§10, step 3).
 *
 * Drag-and-drop always has a keyboard equivalent: select a card, then choose a
 * week and press Enter (§13).
 */
export function BudgetAllocator() {
  const allocation = useStore((s) => s.cases.movewell.allocation);
  const deferred = useStore((s) => s.cases.movewell.deferred);
  const placeMeasure = useStore((s) => s.placeMeasure);
  const removeMeasure = useStore((s) => s.removeMeasure);
  const deferMeasure = useStore((s) => s.deferMeasure);
  const undeferMeasure = useStore((s) => s.undeferMeasure);
  const { reduced } = useMotionSafe();

  const [selected, setSelected] = useState<string | null>(null);
  const [deferReason, setDeferReason] = useState('');
  const [rejected, setRejected] = useState<string | null>(null);

  // The week slots sit above the deck in the DOM, so tabbing forward from a
  // selected card walks away from the drop targets. Move focus to the first
  // week instead — without this the keyboard path is technically present and
  // practically unusable (§13).
  const firstWeekRef = useRef<HTMLButtonElement | null>(null);
  const lastSelected = useRef<string | null>(null);

  useEffect(() => {
    if (selected && selected !== lastSelected.current) {
      firstWeekRef.current?.focus();
    }
    lastSelected.current = selected;
  }, [selected]);

  const placed = allocation
    .map((a) => ({ ...a, measure: measureById[a.measureId] }))
    .filter((a) => a.measure);

  const spent = placed.reduce((sum, a) => sum + a.measure.cost, 0);
  const weeksUsed = placed.reduce((max, a) => Math.max(max, a.startWeek + a.measure.weeks - 1), 0);
  const overBudget = spent > BUDGET_TOTAL;
  const overTime = weeksUsed > TOTAL_WEEKS;

  const unplaced = useMemo(
    () =>
      measures.filter(
        (m) =>
          !allocation.some((a) => a.measureId === m.id) &&
          !deferred.some((d) => d.measureId === m.id)
      ),
    [allocation, deferred]
  );

  function tryPlace(measureId: string, week: number) {
    const measure = measureById[measureId];
    if (!measure) return;
    const wouldSpend = spent + measure.cost;
    if (wouldSpend > BUDGET_TOTAL) {
      // The card bounces back with a specific line, never the word "error".
      setRejected(measureId);
      setTimeout(() => setRejected(null), 1400);
      return;
    }
    placeMeasure(measureId, week);
    setSelected(null);
  }

  const highRiskPlaced = placed.find((p) => p.measure.risk >= 5);

  return (
    <div className="space-y-6">
      {/* Instrument panel */}
      <Inspectable mechanicId="constraint-visibility">
        <div className="grid gap-4 rounded-lg border border-hairline bg-raised p-4 sm:grid-cols-3">
          <div>
            <div className="flex items-baseline justify-between">
              <Mono className="text-ink-soft">{copy.budget.label}</Mono>
              <Mono style={{ color: overBudget ? 'var(--risk)' : 'var(--ink)' }}>
                {formatEuro(spent)}
              </Mono>
            </div>
            <Meter
              value={Math.min(spent, BUDGET_TOTAL * 1.2)}
              max={BUDGET_TOTAL}
              accent={overBudget ? 'var(--risk)' : 'var(--activation)'}
              pulse={overBudget}
              label={copy.budget.label}
            />
            <p className="mt-1 font-mono text-[10px] text-ink-soft">
              of {formatEuro(BUDGET_TOTAL)}
            </p>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <Mono className="text-ink-soft">{copy.budget.weeksLabel}</Mono>
              <Mono style={{ color: overTime ? 'var(--risk)' : 'var(--ink)' }}>
                {weeksUsed}/{TOTAL_WEEKS}
              </Mono>
            </div>
            <Meter
              value={weeksUsed}
              max={TOTAL_WEEKS}
              accent={overTime ? 'var(--risk)' : 'var(--integrity)'}
              pulse={overTime}
              label={copy.budget.weeksLabel}
            />
          </div>

          <div>
            <Mono className="text-ink-soft">{copy.budget.remaining}</Mono>
            <p
              className="font-mono text-20 tabular-nums"
              style={{ color: overBudget ? 'var(--risk)' : 'var(--integrity)' }}
            >
              {formatEuro(BUDGET_TOTAL - spent)}
            </p>
          </div>
        </div>
      </Inspectable>

      {overBudget ? (
        <p className="text-14" style={{ color: 'var(--risk-text)' }}>
          {fmt(copy.budget.over, {
            spent: spent.toLocaleString('en-GB'),
            total: BUDGET_TOTAL.toLocaleString('en-GB'),
          })}
        </p>
      ) : overTime ? (
        <p className="text-14" style={{ color: 'var(--risk-text)' }}>
          {fmt(copy.budget.overWeeks, { n: weeksUsed })}
        </p>
      ) : spent > 0 ? (
        <p className="text-14" style={{ color: 'var(--integrity-text)' }}>
          {fmt(copy.budget.valid, {
            spent: spent.toLocaleString('en-GB'),
            remaining: (BUDGET_TOTAL - spent).toLocaleString('en-GB'),
          })}
        </p>
      ) : null}

      {highRiskPlaced ? (
        <p className="text-14" style={{ color: 'var(--risk-text)' }}>
          {fmt(copy.budget.highRisk, { measure: highRiskPlaced.measure.name })}
        </p>
      ) : null}

      {/* The twelve-week timeline. Horizontal scroll with snap on small screens. */}
      <div className="overflow-x-auto scrollbar-thin">
        <div
          className="grid min-w-[720px] gap-1"
          style={{ gridTemplateColumns: `repeat(${TOTAL_WEEKS}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: TOTAL_WEEKS }).map((_, i) => {
            const week = i + 1;
            return (
              <div
                key={week}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData('text/plain');
                  if (id) tryPlace(id, week);
                }}
                className="min-h-[92px] rounded border border-dashed border-hairline p-1"
              >
                <Mono className="text-ink-soft">W{week}</Mono>
                {selected ? (
                  <button
                    type="button"
                    ref={week === 1 ? firstWeekRef : undefined}
                    onClick={() => tryPlace(selected, week)}
                    className="mt-1 w-full rounded border border-hairline px-1 py-0.5 text-[10px] hover:border-ink"
                  >
                    {fmt(copy.budget.place, { n: week })}
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Placed measures, drawn as bars across their weeks. */}
        <div className="mt-2 min-w-[720px] space-y-1">
          {placed
            .sort((a, b) => a.startWeek - b.startWeek)
            .map((a) => (
              <motion.div
                key={a.measureId}
                layout
                className="grid gap-1"
                style={{ gridTemplateColumns: `repeat(${TOTAL_WEEKS}, minmax(0, 1fr))` }}
              >
                <motion.div
                  layout
                  className="flex items-center justify-between gap-2 overflow-hidden rounded px-2 py-1.5"
                  style={{
                    gridColumn: `${a.startWeek} / span ${Math.min(
                      a.measure.weeks,
                      TOTAL_WEEKS - a.startWeek + 1
                    )}`,
                    background: a.measure.risk >= 4 ? 'rgba(226,73,74,0.14)' : 'rgba(255,176,32,0.18)',
                    border: `1px solid ${a.measure.risk >= 4 ? 'var(--risk)' : 'var(--activation)'}`,
                  }}
                >
                  <span className="truncate text-12">{a.measure.name}</span>
                  <button
                    type="button"
                    onClick={() => removeMeasure(a.measureId)}
                    aria-label={copy.budget.removeMeasure}
                    className="shrink-0 text-12 text-ink-soft hover:text-risk"
                  >
                    ×
                  </button>
                </motion.div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* The deferred slot — at least one measure must land here, with a reason. */}
      <Inspectable mechanicId="governance-marker">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            if (id) deferMeasure(id, deferReason);
          }}
          className="rounded-lg border-2 border-dashed p-4"
          style={{ borderColor: deferred.length ? 'var(--integrity)' : 'var(--hairline)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Mono style={{ color: deferred.length ? 'var(--integrity)' : 'var(--ink-soft)' }}>
              {copy.budget.deferSlot}
            </Mono>
            {selected ? (
              <Button size="sm" onClick={() => deferMeasure(selected, deferReason)}>
                Defer the selected measure
              </Button>
            ) : null}
          </div>

          {deferred.length === 0 ? (
            <p className="mt-2 text-14 text-ink-soft">{copy.budget.nothingDeferred}</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {deferred.map((d) => (
                <li key={d.measureId} className="rounded border border-hairline p-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-14">{measureById[d.measureId]?.name}</p>
                    <button
                      type="button"
                      onClick={() => undeferMeasure(d.measureId)}
                      aria-label={copy.budget.removeMeasure}
                      className="text-12 text-ink-soft hover:text-risk"
                    >
                      ×
                    </button>
                  </div>
                  <div className="mt-1">
                    <label htmlFor={`defer-${d.measureId}`} className="mono-label">
                      {copy.budget.deferReason}
                    </label>
                    <TextInput
                      id={`defer-${d.measureId}`}
                      value={d.reason}
                      onChange={(v) => deferMeasure(d.measureId, v)}
                      ariaLabel={copy.budget.deferReason}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}

          {deferred.length === 0 ? (
            <div className="mt-2">
              <label htmlFor="defer-reason-draft" className="mono-label">
                {copy.budget.deferReason}
              </label>
              <TextInput
                id="defer-reason-draft"
                value={deferReason}
                onChange={setDeferReason}
                ariaLabel={copy.budget.deferReason}
              />
            </div>
          ) : null}
        </div>
      </Inspectable>

      {/* The measure deck. Nothing here marks the reference solution. */}
      <div>
        <Mono className="text-ink-soft">
          {fmt('{n} measures still on the table', { n: unplaced.length })}
        </Mono>
        <ul className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {unplaced.map((m) => (
            <li key={m.id}>
              <MeasureCard
                measure={m}
                selected={selected === m.id}
                rejected={rejected === m.id}
                reduced={reduced}
                onSelect={() => setSelected(selected === m.id ? null : m.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MeasureCard({
  measure,
  selected,
  rejected,
  reduced,
  onSelect,
}: {
  measure: Measure;
  selected: boolean;
  rejected: boolean;
  reduced: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      draggable
      onDragStart={(e) =>
        (e as unknown as React.DragEvent).dataTransfer.setData('text/plain', measure.id)
      }
      onClick={onSelect}
      aria-pressed={selected}
      animate={rejected && !reduced ? { x: [0, -8, 8, -4, 0] } : { x: 0 }}
      transition={{ duration: DUR.bounce }}
      className={cx(
        'w-full cursor-grab rounded-lg border p-3 text-left',
        selected ? 'border-ink bg-black/[0.03]' : 'border-hairline hover:border-ink',
        rejected && 'border-risk'
      )}
    >
      <p className="text-14 font-medium">{measure.name}</p>
      <p className="mt-1 font-mono text-12 text-ink-soft">
        {formatEuro(measure.cost)} · {measure.weeks} weeks
      </p>
      <div className="mt-2 space-y-1">
        <Bars label="Impact" n={measure.impact} accent="var(--integrity)" />
        <Bars label="Risk" n={measure.risk} accent="var(--risk)" />
        <Bars label="Tech load" n={measure.techLoad} accent="var(--ink-soft)" />
      </div>
      {measure.touches.length ? (
        <p className="mt-2 font-mono text-[10px] text-ink-soft">
          Touches: {measure.touches.join(', ')}
        </p>
      ) : null}
    </motion.button>
  );
}

function Bars({ label, n, accent }: { label: string; n: number; accent: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="w-16 font-mono text-[10px] uppercase text-ink-soft">{label}</span>
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="block h-2 w-2.5 rounded-[1px]"
            style={{ background: i < n ? accent : 'var(--hairline)' }}
          />
        ))}
      </span>
    </span>
  );
}
