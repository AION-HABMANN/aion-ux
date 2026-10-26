'use client';

import { motion } from '@/lib/day9/motion-lite';
import { useState } from 'react';
import {
  DOMAINS,
  DOMAIN_LABELS,
  VERDICT_LABEL,
  domainFit,
  domainFitDetail,
  domainFitKey,
  mechanicById,
} from '@/data/day9/mechanics';
import type { Domain, DomainVerdict } from '@/data/day9/types';
import { DUR, STAGGER } from '@/lib/day9/motion';
import { useStore } from '@/lib/day9/store';
import { useMotionSafe } from '@/lib/day9/use-motion-safe';
import { Button, Mono, TextArea, cx } from '@/components/day9/ui';

type DemoProps = { onInteract: () => void };

// ── MODULE 09 — DomainFitMatrix ─────────────────────────────────────────────

const VERDICT_STYLE: Record<DomainVerdict, { bg: string; border: string; glyph: string }> = {
  ship: { bg: 'var(--integrity)', border: 'var(--integrity)', glyph: '' },
  conditional: { bg: 'transparent', border: 'var(--integrity)', glyph: '' },
  'do-not': { bg: 'transparent', border: 'var(--risk)', glyph: '✕' },
};

export function DomainFitMatrix({ onInteract }: DemoProps) {
  const [selected, setSelected] = useState<{ mechanicId: string; domain: Domain } | null>(null);
  const { reduced, transition } = useMotionSafe();

  const detail = selected
    ? domainFitDetail[domainFitKey(selected.mechanicId, selected.domain)]
    : null;
  const row = selected ? domainFit.find((r) => r.mechanicId === selected.mechanicId) : null;
  const verdict = selected && row ? row.verdicts[selected.domain].verdict : null;
  const mechanic = selected ? mechanicById[selected.mechanicId] : null;

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[540px] border-collapse text-14">
          <caption className="sr-only">Which mechanics may ship in which domains</caption>
          <thead>
            <tr>
              <th scope="col" className="pb-2 text-left font-normal">
                <Mono className="text-ink-soft">MECHANIC</Mono>
              </th>
              {DOMAINS.map((d) => (
                <th key={d} scope="col" className="pb-2 px-2 text-left font-normal">
                  <Mono className="text-ink-soft">{DOMAIN_LABELS[d]}</Mono>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {domainFit.map((r, rowIndex) => (
              <tr
                key={r.mechanicId}
                className={cx(
                  'border-t border-hairline',
                  selected?.mechanicId === r.mechanicId && 'bg-black/[0.03]'
                )}
              >
                <th scope="row" className="py-1.5 pr-3 text-left font-normal">
                  {r.label}
                </th>
                {DOMAINS.map((d, colIndex) => {
                  const v = r.verdicts[d].verdict;
                  const style = VERDICT_STYLE[v];
                  const isSelected =
                    selected?.mechanicId === r.mechanicId && selected.domain === d;
                  return (
                    <td key={d} className="px-2 py-1.5">
                      <motion.button
                        type="button"
                        onClick={() => {
                          setSelected({ mechanicId: r.mechanicId, domain: d });
                          onInteract();
                        }}
                        aria-label={`${r.label} in ${DOMAIN_LABELS[d]}: ${VERDICT_LABEL[v]}`}
                        aria-pressed={isSelected}
                        initial={reduced ? false : { scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          duration: reduced ? 0.15 : 0.2,
                          delay: reduced ? 0 : colIndex * STAGGER.base + rowIndex * 0.01,
                        }}
                        className="flex h-6 w-8 items-center justify-center rounded-sm border text-12"
                        style={{
                          background: style.bg,
                          borderColor: style.border,
                          color: v === 'do-not' ? 'var(--risk)' : 'var(--ink)',
                          outline: isSelected ? '2px solid var(--inspect)' : undefined,
                          outlineOffset: 2,
                        }}
                      >
                        {style.glyph}
                      </motion.button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && verdict && mechanic ? (
        <motion.div
          key={`${selected.mechanicId}-${selected.domain}`}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(DUR.quick)}
          className="rounded border border-hairline p-4"
        >
          <Mono className="text-ink-soft">
            {mechanic.name.toUpperCase()} × {DOMAIN_LABELS[selected.domain].toUpperCase()}
          </Mono>
          <p
            className="mt-1 text-20"
            style={{
              color:
                verdict === 'ship'
                  ? 'var(--integrity)'
                  : verdict === 'do-not'
                    ? 'var(--risk)'
                    : 'var(--ink)',
            }}
          >
            {VERDICT_LABEL[verdict]}
          </p>
          <p className="mt-2 text-14">
            {detail?.reason ?? mechanic.riskIfOverused}
          </p>
          <div className="mt-3 border-l-2 pl-3" style={{ borderColor: 'var(--inspect)' }}>
            <Mono className="text-ink-soft">SAY THIS TO THE STAKEHOLDER</Mono>
            <p className="mt-1 text-14 italic">
              {detail?.stakeholderSentence ??
                `We can ship it, but I need to name what it costs first: ${mechanic.riskIfOverused}`}
            </p>
          </div>
        </motion.div>
      ) : (
        <p className="text-14 text-ink-soft">
          Click any cell. The verdict comes with a sentence you can use in the room.
        </p>
      )}
    </div>
  );
}

// ── MODULE 10 — GovernanceDecisionTree ──────────────────────────────────────

const SCENARIOS = [
  {
    id: 's1',
    text: 'Marketing wants a countdown on a health assessment.',
    options: {
      decides: ['Team', 'Activation owner', 'Escalate'],
      escalate: ['Nothing', 'The countdown itself', 'The whole campaign'],
      veto: ['Nothing', 'Fake urgency', 'All marketing input'],
    },
    statement: (a: string[]) =>
      `${a[0]} decides; ${a[1].toLowerCase()} escalates; we veto ${a[2].toLowerCase()}.`,
  },
  {
    id: 's2',
    text: 'A growth team proposes a leaderboard for a corporate learning path.',
    options: {
      decides: ['Team', 'Activation owner', 'Escalate'],
      escalate: ['Nothing', 'Any ranking mechanic', 'Only public rankings'],
      veto: ['Nothing', 'Rankings across the whole population', 'All comparison'],
    },
    statement: (a: string[]) =>
      `${a[0]} decides on ranking mechanics; ${a[1].toLowerCase()} goes up; ${a[2].toLowerCase()} is refused outright.`,
  },
  {
    id: 's3',
    text: 'Engagement is falling; someone proposes doubling points.',
    options: {
      decides: ['Team', 'Activation owner', 'Escalate'],
      escalate: ['Nothing', 'Any change to reward levels', 'Only doubling'],
      veto: ['Nothing', 'Reward escalation as a response to falling numbers', 'Points entirely'],
    },
    statement: (a: string[]) =>
      `${a[0]} owns reward levels; ${a[1].toLowerCase()} escalates; ${a[2].toLowerCase()} is off the table.`,
  },
  {
    id: 's4',
    text: 'A campaign mechanic from 2023 is still running; nobody owns it.',
    options: {
      decides: ['Team', 'Activation owner', 'Escalate'],
      escalate: ['Nothing', 'Any unowned mechanic', 'Only if removal is contested'],
      veto: ['Nothing', 'Keeping a mechanic with no named owner', 'Removing anything without data'],
    },
    statement: (a: string[]) =>
      `${a[0]} runs the removal path; ${a[1].toLowerCase()} escalates; ${a[2].toLowerCase()} is not permitted.`,
  },
  {
    id: 's5',
    text: 'A streak feature is producing complaints from users on medical leave.',
    options: {
      decides: ['Team', 'Activation owner', 'Escalate'],
      escalate: ['Nothing', 'Anything touching a vulnerable segment', 'Only if complaints continue'],
      veto: ['Nothing', 'Loss-aversion mechanics for this segment', 'The streak entirely'],
    },
    statement: (a: string[]) =>
      `${a[0]} decides; ${a[1].toLowerCase()} escalates immediately; we veto ${a[2].toLowerCase()}.`,
  },
];

const QUESTION_LABELS = ['Who decides', 'What is escalated', 'What is vetoed'] as const;

export function GovernanceDecisionTree({ onInteract }: DemoProps) {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [saved, setSaved] = useState(false);
  const setGovernanceStatements = useStore((s) => s.setGovernanceStatements);
  const setCapstoneSection = useStore((s) => s.setCapstoneSection);
  const existingGovernance = useStore((s) => s.capstone.governance ?? '');
  const { reduced, transition } = useMotionSafe();

  function setAnswer(scenarioId: string, index: number, value: string) {
    setAnswers((a) => {
      const current = a[scenarioId] ?? ['', '', ''];
      const next = [...current];
      next[index] = value;
      return { ...a, [scenarioId]: next };
    });
    onInteract();
  }

  /**
   * A scenario only produces a statement once all three answers are chosen.
   * Note the length check: `[].every(Boolean)` is vacuously true, so testing
   * `every` alone lets an unanswered scenario through and hands `statement`
   * an undefined array.
   */
  const statements = SCENARIOS.filter((s) => {
    const given = answers[s.id];
    return Array.isArray(given) && given.length === QUESTION_LABELS.length && given.every(Boolean);
  }).map((s) => s.statement(answers[s.id]));

  function saveToCapstone() {
    setGovernanceStatements(statements);
    const draft = [
      'Governance model, assembled from five real decisions:',
      ...statements.map((s, i) => `${i + 1}. ${s}`),
      'The named owner holds the total mechanic load, not any single mechanic, and removal does not require a business case.',
    ].join('\n');
    setCapstoneSection('governance', existingGovernance ? `${existingGovernance}\n\n${draft}` : draft);
    setSaved(true);
  }

  return (
    <div className="space-y-4">
      {SCENARIOS.map((scenario, i) => (
        <div key={scenario.id} className="rounded border border-hairline p-4">
          <div className="flex items-baseline gap-2">
            <Mono className="text-ink-soft">{i + 1}</Mono>
            <p className="text-14 font-medium">{scenario.text}</p>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {QUESTION_LABELS.map((label, qi) => {
              const key = ['decides', 'escalate', 'veto'][qi] as keyof typeof scenario.options;
              return (
                <div key={label}>
                  <Mono className="text-ink-soft">{label}</Mono>
                  <div className="mt-1 space-y-1">
                    {scenario.options[key].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAnswer(scenario.id, qi, opt)}
                        aria-pressed={(answers[scenario.id] ?? [])[qi] === opt}
                        className={cx(
                          'block w-full rounded border px-2 py-1 text-left text-12',
                          (answers[scenario.id] ?? [])[qi] === opt
                            ? 'border-ink bg-ink text-white'
                            : 'border-hairline hover:border-ink'
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {statements.length ? (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(DUR.base)}
          className="rounded border p-4"
          style={{ borderColor: 'var(--integrity)' }}
        >
          <Mono style={{ color: 'var(--integrity-text)' }}>DRAFT GOVERNANCE MODEL</Mono>
          <ol className="mt-2 space-y-1 text-14">
            {statements.map((s, i) => (
              <li key={i}>
                {i + 1}. {s}
              </li>
            ))}
          </ol>
          <Button size="sm" className="mt-3" onClick={saveToCapstone}>
            {saved ? 'Sent to capstone section 5' : 'Send to capstone section 5'}
          </Button>
        </motion.div>
      ) : (
        <p className="text-14 text-ink-soft">
          Answer all three questions on a scenario and it turns into a governance line you can use.
        </p>
      )}
    </div>
  );
}

/** Small helper used by Module 05's page to capture the reflection. */
export function ReflectionField({
  value,
  onChange,
  onSave,
  saved,
  prompt,
  saveLabel,
  savedLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  saved: boolean;
  prompt: string;
  saveLabel: string;
  savedLabel: string;
}) {
  return (
    <div className="space-y-3">
      <p className="text-16">{prompt}</p>
      <TextArea value={value} onChange={onChange} rows={4} ariaLabel={prompt} />
      <Button size="sm" onClick={onSave} disabled={value.trim().length < 10}>
        {saveLabel}
      </Button>
      {saved ? (
        <p className="text-14" style={{ color: 'var(--integrity-text)' }}>
          {savedLabel}
        </p>
      ) : null}
    </div>
  );
}
