'use client';

import { useState } from 'react';
import {
  DECISION_DOMAINS,
  GOVERNANCE_ROLES,
  PRIORITY_QUADRANTS,
  RISK_DOMAINS,
  STATEMENT_FRAME,
  UNCERTAINTY_QUESTIONS,
  VALUE_ANCHORS,
  VISION_STEM_PREFIX,
  VISION_STEM_SUFFIX,
} from '@/data/day14/transfer';
import type { MatrixItem, TransferNotes } from './state';

type Update = (patch: (current: TransferNotes) => TransferNotes) => void;

function Panel({
  index,
  title,
  point,
  children,
}: {
  index: number;
  title: string;
  point: string;
  children: React.ReactNode;
}) {
  return (
    <section className="aion-card p-4 sm:p-6">
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="aion-label">Widget {index}</span>
        <h3 className="text-lg font-bold text-navy">{title}</h3>
        <span className="rounded-full bg-lilac px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-navy/60">
          {point}
        </span>
      </div>
      {children}
    </section>
  );
}

/* 1 — Vision Statement Builder ------------------------------------------- */

export function VisionBuilder({ notes, update }: { notes: TransferNotes; update: Update }) {
  const toggleAnchor = (anchor: string) =>
    update((current) => ({
      ...current,
      anchors: current.anchors.includes(anchor)
        ? current.anchors.filter((entry) => entry !== anchor)
        : [...current.anchors, anchor],
    }));

  const stem =
    notes.anchors.length > 0
      ? `${VISION_STEM_PREFIX} ${notes.anchors.join(', ')}${VISION_STEM_SUFFIX}`
      : '';

  return (
    <Panel index={1} title="Vision Statement Builder" point="Assignment point 1">
      <div className="flex flex-wrap gap-2">
        {VALUE_ANCHORS.map((anchor) => (
          <button
            key={anchor}
            type="button"
            onClick={() => toggleAnchor(anchor)}
            aria-pressed={notes.anchors.includes(anchor)}
            className={[
              'aion-chip',
              notes.anchors.includes(anchor) ? 'aion-chip-active' : 'hover:border-purple/40',
            ].join(' ')}
          >
            {anchor}
          </button>
        ))}
      </div>

      <p className="mt-3 rounded-xl bg-lilac px-3 py-2 text-sm text-navy/70">
        {stem || 'Select the value anchors your vision is built on — the sentence stem assembles below.'}
      </p>

      <label htmlFor="vision-text" className="mt-4 block text-sm font-semibold text-navy">
        Your vision statement
      </label>
      <textarea
        id="vision-text"
        rows={3}
        className="aion-input mt-2"
        placeholder={stem || 'Start from the stem above and write it in your own words.'}
        value={notes.vision}
        onChange={(event) => update((current) => ({ ...current, vision: event.target.value }))}
      />
      <button
        type="button"
        disabled={!stem}
        onClick={() => update((current) => ({ ...current, vision: stem }))}
        className="mt-2 text-xs font-semibold text-purple underline underline-offset-4 disabled:opacity-40 disabled:no-underline"
      >
        Copy the stem into the field
      </button>
    </Panel>
  );
}

/* 2 — Decision Card Set --------------------------------------------------- */

export function DecisionCards({ notes, update }: { notes: TransferNotes; update: Update }) {
  const setCard = (index: number, patch: Partial<{ domain: string; body: string }>) =>
    update((current) => ({
      ...current,
      decisions: current.decisions.map((card, i) => (i === index ? { ...card, ...patch } : card)),
    }));

  return (
    <Panel index={2} title="Decision Card Set" point="Assignment point 2">
      <div className="grid gap-3 lg:grid-cols-3">
        {notes.decisions.map((card, index) => (
          <div key={index} className="rounded-card border border-lilac bg-lilac/30 p-3">
            <p className="aion-label">Decision {index + 1}</p>
            <label htmlFor={`decision-domain-${index}`} className="sr-only">
              Domain for decision {index + 1}
            </label>
            <select
              id={`decision-domain-${index}`}
              className="aion-input mt-2"
              value={card.domain}
              onChange={(event) => setCard(index, { domain: event.target.value })}
            >
              <option value="">Tag a domain…</option>
              {DECISION_DOMAINS.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
            <label htmlFor={`decision-body-${index}`} className="sr-only">
              Body for decision {index + 1}
            </label>
            <textarea
              id={`decision-body-${index}`}
              rows={5}
              className="aion-input mt-2"
              placeholder="Your decision…"
              value={card.body}
              onChange={(event) => setCard(index, { body: event.target.value })}
            />
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* 3 — Priority Matrix ----------------------------------------------------- */

export function PriorityMatrix({ notes, update }: { notes: TransferNotes; update: Update }) {
  const [draft, setDraft] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const addItem = () => {
    const label = draft.trim();
    if (!label) return;
    const item: MatrixItem = { id: `m-${Date.now()}`, label, quadrant: null };
    update((current) => ({ ...current, matrix: [...current.matrix, item] }));
    setDraft('');
    setSelected(item.id);
  };

  const place = (quadrant: MatrixItem['quadrant']) => {
    if (!selected) return;
    update((current) => ({
      ...current,
      matrix: current.matrix.map((item) => (item.id === selected ? { ...item, quadrant } : item)),
    }));
    setSelected(null);
  };

  const remove = (id: string) =>
    update((current) => ({ ...current, matrix: current.matrix.filter((item) => item.id !== id) }));

  const unplaced = notes.matrix.filter((item) => item.quadrant === null);

  return (
    <Panel index={3} title="Priority Matrix" point="Assignment point 3">
      <div className="flex flex-wrap gap-2">
        <label htmlFor="matrix-input" className="sr-only">
          New measure label
        </label>
        <input
          id="matrix-input"
          className="aion-input flex-1 min-w-[180px]"
          placeholder="Name one of your measures…"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              addItem();
            }
          }}
        />
        <button type="button" className="aion-btn" onClick={addItem}>
          Add
        </button>
      </div>

      {unplaced.length > 0 && (
        <div className="mt-3 rounded-xl bg-lilac px-3 py-2">
          <p className="text-xs font-semibold text-navy/70">
            Unplaced — select one, then click a quadrant.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {unplaced.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item.id === selected ? null : item.id)}
                aria-pressed={item.id === selected}
                className={[
                  'aion-chip text-xs',
                  item.id === selected ? 'aion-chip-active' : 'border-purple/30',
                ].join(' ')}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2">
        {PRIORITY_QUADRANTS.map((quadrant) => (
          <button
            key={quadrant.id}
            type="button"
            onClick={() => place(quadrant.id)}
            className="min-h-[120px] rounded-card border border-dashed border-purple/35 bg-white p-3 text-left transition-colors hover:bg-lilac/40"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-navy/55">{quadrant.label}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {notes.matrix
                .filter((item) => item.quadrant === quadrant.id)
                .map((item) => (
                  <span
                    key={item.id}
                    className="inline-flex items-center gap-1 rounded-md bg-lilac px-2 py-1 text-[11px] font-semibold text-navy"
                  >
                    {item.label}
                    <span
                      role="button"
                      tabIndex={0}
                      aria-label={`Remove ${item.label}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        remove(item.id);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.stopPropagation();
                          event.preventDefault();
                          remove(item.id);
                        }
                      }}
                      className="cursor-pointer text-navy/45"
                    >
                      ✕
                    </span>
                  </span>
                ))}
            </div>
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-navy/55">
        Axes: impact against effort. Nothing is pre-placed and no quadrant is recommended.
      </p>
    </Panel>
  );
}

/* 4 — Risk Category Cards ------------------------------------------------- */

export function RiskCards({ notes, update }: { notes: TransferNotes; update: Update }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Panel index={4} title="Risk Category Cards" point="Assignment point 4">
      <div className="grid gap-3 sm:grid-cols-2">
        {RISK_DOMAINS.map((domain) => {
          const isOpen = domain.id === openId;
          return (
            <div key={domain.id} className="rounded-card border border-lilac bg-white p-3">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : domain.id)}
                className={[
                  'w-full rounded-lg px-3 py-2 text-left text-sm font-bold transition-colors',
                  isOpen ? 'bg-purple text-white' : 'bg-lilac text-navy hover:bg-lilac',
                ].join(' ')}
              >
                {domain.title}
                {notes.risks[domain.id]?.trim() ? ' ·' : ''}
              </button>
              {isOpen && (
                <div className="pt-3">
                  <p className="text-xs text-navy/60">{domain.prompt}</p>
                  <label htmlFor={`risk-${domain.id}`} className="sr-only">
                    {domain.title} false assumptions
                  </label>
                  <textarea
                    id={`risk-${domain.id}`}
                    rows={4}
                    className="aion-input mt-2"
                    placeholder="Your critical false assumptions…"
                    value={notes.risks[domain.id] ?? ''}
                    onChange={(event) =>
                      update((current) => ({
                        ...current,
                        risks: { ...current.risks, [domain.id]: event.target.value },
                      }))
                    }
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

/* 5 — Governance Model Sketch --------------------------------------------- */

export function GovernanceSketch({ notes, update }: { notes: TransferNotes; update: Update }) {
  const [openRole, setOpenRole] = useState<string | null>(null);

  return (
    <Panel index={5} title="Governance Model Sketch" point="Assignment point 5">
      <div className="flex flex-wrap gap-2">
        {GOVERNANCE_ROLES.map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => setOpenRole(role === openRole ? null : role)}
            aria-pressed={role === openRole}
            className={[
              'aion-chip',
              role === openRole ? 'aion-chip-active' : 'hover:border-purple/40',
              notes.governance[role]?.trim() && role !== openRole ? 'border-purple/50' : '',
            ].join(' ')}
          >
            {role}
          </button>
        ))}
      </div>

      {openRole && (
        <div className="mt-3 rounded-card border border-purple/25 bg-lilac/40 p-3">
          <label htmlFor={`gov-${openRole}`} className="text-sm font-semibold text-navy">
            Responsibilities of {openRole}
          </label>
          <textarea
            id={`gov-${openRole}`}
            rows={4}
            className="aion-input mt-2"
            placeholder="What this role decides, and what it does not…"
            value={notes.governance[openRole] ?? ''}
            onChange={(event) =>
              update((current) => ({
                ...current,
                governance: { ...current.governance, [openRole]: event.target.value },
              }))
            }
          />
        </div>
      )}

      <label htmlFor="escalation" className="mt-4 block text-sm font-semibold text-navy">
        Escalation path for conflicts between visibility, impact, risk, and effort
      </label>
      <textarea
        id="escalation"
        rows={3}
        className="aion-input mt-2"
        placeholder="Who decides when these pull against each other, and in what order…"
        value={notes.escalation}
        onChange={(event) => update((current) => ({ ...current, escalation: event.target.value }))}
      />
    </Panel>
  );
}

/* 6 — Decision-Under-Uncertainty Framework -------------------------------- */

export function UncertaintyFramework({ notes, update }: { notes: TransferNotes; update: Update }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Panel index={6} title="Decision-Under-Uncertainty Framework" point="Assignment point 6">
      <p className="mb-3 text-sm text-navy/70">
        These are questions, not answers. Open one and write your own response.
      </p>
      <ul className="space-y-2">
        {UNCERTAINTY_QUESTIONS.map((question) => {
          const isOpen = question.id === openId;
          return (
            <li key={question.id} className="rounded-card border border-lilac bg-white">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : question.id)}
                className="w-full px-3 py-2.5 text-left text-sm font-semibold text-navy hover:bg-lilac/50"
              >
                {question.prompt}
              </button>
              {isOpen && (
                <div className="border-t border-lilac p-3">
                  <p className="text-xs text-navy/60">{question.guidance}</p>
                  <label htmlFor={`unc-${question.id}`} className="sr-only">
                    {question.prompt}
                  </label>
                  <textarea
                    id={`unc-${question.id}`}
                    rows={3}
                    className="aion-input mt-2"
                    placeholder="Your answer…"
                    value={notes.uncertainty[question.id] ?? ''}
                    onChange={(event) =>
                      update((current) => ({
                        ...current,
                        uncertainty: { ...current.uncertainty, [question.id]: event.target.value },
                      }))
                    }
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

/* 7 — Management Statement Template --------------------------------------- */

export function StatementTemplate({ notes, update }: { notes: TransferNotes; update: Update }) {
  return (
    <Panel index={7} title="Management Statement Template" point="Assignment point 7">
      <div className="space-y-3">
        {STATEMENT_FRAME.map((frame) => (
          <div key={frame.id} className="rounded-card border border-lilac bg-lilac/30 p-3">
            <label htmlFor={`stmt-${frame.id}`} className="text-sm font-semibold text-navy">
              {frame.prefix} …
            </label>
            <textarea
              id={`stmt-${frame.id}`}
              rows={2}
              className="aion-input mt-2"
              placeholder={frame.placeholder}
              value={notes.statement[frame.id] ?? ''}
              onChange={(event) =>
                update((current) => ({
                  ...current,
                  statement: { ...current.statement, [frame.id]: event.target.value },
                }))
              }
            />
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-navy/55">
        The blanks stay empty until you fill them — this template contains no recommendation of its own.
      </p>
    </Panel>
  );
}
