'use client';

import { useState } from 'react';
import {
  GOVERNANCE_ROLES,
  PRIORITY_QUADRANTS,
  RISK_DOMAINS,
  STATEMENT_FRAME,
  TRANSFER_CONDITIONS,
  TRANSFER_ROLE,
  UNCERTAINTY_QUESTIONS,
} from '@/original/data/day14/transfer';
import { STORAGE_KEYS, usePersistentState } from '@/original/lib/day14/storage';
import { EMPTY_NOTES, type TransferNotes } from './state';
import {
  DecisionCards,
  GovernanceSketch,
  PriorityMatrix,
  RiskCards,
  StatementTemplate,
  UncertaintyFramework,
  VisionBuilder,
} from './TransferWidgets';

/** Builds a plain-text export of the learner's OWN entries only. */
function toText(notes: TransferNotes): string {
  const lines: string[] = [
    'AION UX Class — Module 7 Day 1 — Transfer Project notes',
    '',
    '1. VISION STATEMENT',
    `Value anchors: ${notes.anchors.length ? notes.anchors.join(', ') : '(none selected)'}`,
    notes.vision || '(empty)',
    '',
    '2. DECISION CARDS',
  ];

  notes.decisions.forEach((card, index) => {
    lines.push(`Decision ${index + 1} [${card.domain || 'untagged'}]: ${card.body || '(empty)'}`);
  });

  lines.push('', '3. PRIORITY MATRIX');
  if (notes.matrix.length === 0) {
    lines.push('(no measures added)');
  } else {
    PRIORITY_QUADRANTS.forEach((quadrant) => {
      const items = notes.matrix.filter((item) => item.quadrant === quadrant.id);
      lines.push(`${quadrant.label}: ${items.map((i) => i.label).join(', ') || '—'}`);
    });
    const unplaced = notes.matrix.filter((item) => item.quadrant === null);
    if (unplaced.length) lines.push(`Unplaced: ${unplaced.map((i) => i.label).join(', ')}`);
  }

  lines.push('', '4. RISK CATEGORIES — CRITICAL FALSE ASSUMPTIONS');
  RISK_DOMAINS.forEach((domain) => {
    lines.push(`${domain.title}: ${notes.risks[domain.id] || '(empty)'}`);
  });

  lines.push('', '5. GOVERNANCE MODEL');
  GOVERNANCE_ROLES.forEach((role) => {
    lines.push(`${role}: ${notes.governance[role] || '(empty)'}`);
  });
  lines.push(`Escalation path: ${notes.escalation || '(empty)'}`);

  lines.push('', '6. DECISION UNDER UNCERTAINTY');
  UNCERTAINTY_QUESTIONS.forEach((question) => {
    lines.push(`${question.prompt} ${notes.uncertainty[question.id] || '(empty)'}`);
  });

  lines.push('', '7. MANAGEMENT STATEMENT');
  STATEMENT_FRAME.forEach((frame) => {
    lines.push(`${frame.prefix} ${notes.statement[frame.id] || '(empty)'}`);
  });

  return lines.join('\n');
}

export function TransferTab() {
  const [notes, setNotes, reset] = usePersistentState<TransferNotes>(
    STORAGE_KEYS.transfer,
    EMPTY_NOTES,
  );
  const [exported, setExported] = useState<string | null>(null);

  const update = (patch: (current: TransferNotes) => TransferNotes) => setNotes(patch);

  const copyNotes = async () => {
    const text = toText(notes);
    try {
      await navigator.clipboard.writeText(text);
      setExported('Copied to clipboard.');
    } catch {
      setExported('Clipboard unavailable — use “Download .txt” instead.');
    }
  };

  const downloadNotes = () => {
    const blob = new Blob([toText(notes)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'aion-m7d1-transfer-notes.txt';
    anchor.click();
    URL.revokeObjectURL(url);
    setExported('Downloaded aion-m7d1-transfer-notes.txt');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="aion-surface p-4 sm:p-5">
        <h2 className="text-xl font-bold text-navy">Transfer Project</h2>
        <p className="mt-1 max-w-3xl text-sm text-navy/85">{TRANSFER_ROLE}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {TRANSFER_CONDITIONS.map((condition) => (
            <li key={condition} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy/75">
              {condition}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-navy/60">
          These seven widgets help you structure your thinking. They supply no strategy content, no
          model answers, and nothing here is graded in-app.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-card border border-lilac bg-white px-4 py-3">
        <button type="button" className="aion-btn" onClick={copyNotes}>
          Export my notes (copy)
        </button>
        <button type="button" className="aion-btn-ghost" onClick={downloadNotes}>
          Download .txt
        </button>
        <button
          type="button"
          className="text-xs font-semibold text-purple underline underline-offset-4"
          onClick={() => {
            reset();
            setExported(null);
          }}
        >
          Reset my Transfer Project entries
        </button>
        {exported && <span className="text-xs text-navy/60">{exported}</span>}
      </div>

      <VisionBuilder notes={notes} update={update} />
      <DecisionCards notes={notes} update={update} />
      <PriorityMatrix notes={notes} update={update} />
      <RiskCards notes={notes} update={update} />
      <GovernanceSketch notes={notes} update={update} />
      <UncertaintyFramework notes={notes} update={update} />
      <StatementTemplate notes={notes} update={update} />
    </div>
  );
}
