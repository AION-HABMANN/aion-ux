'use client';

import { motion } from '@/original/lib/day9/motion-lite';
import { useMemo, useState } from 'react';
import { DUR, EASE } from '@/original/lib/day9/motion';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { Button, Mono, Slider, cx } from '@/original/components/day9/ui';
import { Readout } from '../DemoFrame';

type DemoProps = { onInteract: () => void };

// ── MODULE 01 — ThreePanelComparator ────────────────────────────────────────

const PANELS = [
  {
    id: 'system',
    layer: 'System layer',
    effort: 'Low',
    people: 'A short time, a small team',
    risk: 'Reputation risk: none',
    tone: 'var(--integrity)',
  },
  {
    id: 'aesthetic',
    layer: 'Aesthetic layer',
    effort: 'Mid',
    people: 'Some weeks, design and writing',
    risk: 'Reputation risk: moderate',
    tone: 'var(--activation)',
  },
  {
    id: 'fiction',
    layer: 'Fiction layer',
    effort: 'High',
    people: 'Many weeks, writers, artists and developers',
    risk: 'Reputation risk: high',
    tone: 'var(--risk)',
  },
] as const;

export function ThreePanelComparator({ onInteract }: DemoProps) {
  const [active, setActive] = useState<(typeof PANELS)[number]['id']>('system');
  const { transition } = useMotionSafe();
  const panel = PANELS.find((p) => p.id === active)!;

  return (
    <div className="space-y-4">
      <p className="text-14 text-ink-soft">
        The task is the same in all three: <strong>upload your qualification certificate</strong>.
      </p>

      <div role="tablist" aria-label="Layers" className="flex flex-wrap gap-2">
        {PANELS.map((p) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={active === p.id}
            onClick={() => {
              setActive(p.id);
              onInteract();
            }}
            className={cx(
              'rounded border px-3 py-1.5 text-14',
              active === p.id ? 'border-ink bg-ink text-white' : 'border-hairline hover:border-ink'
            )}
          >
            {p.layer}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition(DUR.quick)}
        className="rounded border border-hairline p-4"
      >
        {active === 'system' ? (
          <div className="space-y-2">
            <Mono className="text-ink-soft">STEP 2 OF 4</Mono>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
              <div className="h-full w-1/2 rounded-full" style={{ background: 'var(--integrity)' }} />
            </div>
            <p className="text-16">Certificate on file. One item left.</p>
            <Button size="sm">Upload certificate</Button>
          </div>
        ) : active === 'aesthetic' ? (
          <div
            className="space-y-3 rounded-xl p-4"
            style={{ background: '#FFF3DE', borderRadius: 20 }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: 'var(--activation)' }}
                aria-hidden
              >
                ☺
              </div>
              <p className="text-16">Nice one — nearly there!</p>
            </div>
            <button
              type="button"
              className="rounded-full px-4 py-2 text-14 font-semibold"
              style={{ background: 'var(--activation)' }}
            >
              Pop your certificate in
            </button>
          </div>
        ) : (
          <div className="space-y-3 rounded p-4" style={{ background: '#14002e', color: '#fff' }}>
            <Mono style={{ color: 'var(--activation-text)' }}>THE CREDENTIALS TRIAL</Mono>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-white/20" aria-hidden />
              <p className="text-14">
                “Archivist Vell awaits your proof of standing, traveller.”
              </p>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-2/3" style={{ background: 'var(--activation)' }} />
            </div>
            <Mono style={{ color: 'var(--activation-text)' }}>XP 640 / 1000 · ♪ sound cue</Mono>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-2 gap-4 border-t border-hairline pt-3">
        <Readout label="Effort" value={panel.effort} accent={panel.tone} />
        <Readout label="Risk" value={panel.risk.replace('Reputation risk: ', '')} accent={panel.tone} />
      </div>
      <p className="text-12 text-ink-soft">
        Effort is time and people: {panel.people.toLowerCase()}. It is a judgement with a reason, not a price.
      </p>
    </div>
  );
}

// ── MODULE 02 — FiveLeverBoard ──────────────────────────────────────────────

const LEVERS = [
  { id: 'progress', label: 'Progress', weight: 34, question: 'How much is left?' },
  { id: 'feedback', label: 'Feedback', weight: 18, question: 'Did that count?' },
  { id: 'recognition', label: 'Recognition', weight: 12, question: 'Did anyone notice?' },
  { id: 'challenge', label: 'Challenge', weight: 14, question: 'Is this worth my attention?' },
  { id: 'attainment', label: 'Attainment', weight: 10, question: 'Was that real?' },
] as const;

const TASKS = [
  'Read: what a distribution is',
  'Watch: reading a box plot',
  'Exercise: spot the skew',
  'Assignment: summarise a dataset',
];

export function FiveLeverBoard({ onInteract }: DemoProps) {
  const [on, setOn] = useState<Record<string, boolean>>(
    Object.fromEntries(LEVERS.map((l) => [l.id, true]))
  );
  const { transition } = useMotionSafe();

  const score = useMemo(
    () => 12 + LEVERS.reduce((sum, l) => sum + (on[l.id] ? l.weight : 0), 0),
    [on]
  );

  return (
    <div className="grid gap-5 md:grid-cols-[220px_1fr]">
      <div className="space-y-3">
        {LEVERS.map((l) => (
          <label key={l.id} className="flex items-start gap-2 text-14">
            <input
              type="checkbox"
              checked={on[l.id]}
              onChange={() => {
                setOn((v) => ({ ...v, [l.id]: !v[l.id] }));
                onInteract();
              }}
              className="mt-1"
            />
            <span>
              {l.label}
              <span className="block font-mono text-[11px] text-ink-soft">{l.question}</span>
            </span>
          </label>
        ))}
        <div className="border-t border-hairline pt-3">
          <Readout
            label="Willingness to continue"
            value={score}
            accent={score > 70 ? 'var(--integrity)' : score > 45 ? 'var(--activation)' : 'var(--risk)'}
          />
        </div>
      </div>

      <div className="rounded border border-hairline p-4">
        <p className="text-16 font-medium">Data Literacy for Managers</p>

        {on.progress ? (
          <div className="mt-2">
            <Mono className="text-ink-soft">3 OF 8 MODULES</Mono>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'var(--activation)' }}
                animate={{ width: '37.5%' }}
                transition={transition(DUR.fill)}
              />
            </div>
          </div>
        ) : (
          <p className="mt-2 text-14 text-ink-soft">A list of items.</p>
        )}

        <ul className="mt-4 space-y-2">
          {TASKS.map((t, i) => (
            <li
              key={t}
              className="flex items-center justify-between rounded border border-hairline px-3 py-2 text-14"
              style={
                on.challenge && i === 3
                  ? { borderColor: 'var(--activation)', borderWidth: 2 }
                  : undefined
              }
            >
              <span>{t}</span>
              <span className="font-mono text-12 text-ink-soft">
                {on.feedback && i < 2
                  ? 'You can read a box plot now'
                  : i < 2
                    ? 'Step saved'
                    : on.challenge && i === 3
                      ? 'Hardest one — 45 min'
                      : ''}
              </span>
            </li>
          ))}
        </ul>

        {on.recognition ? (
          <p className="mt-3 text-14" style={{ color: 'var(--integrity-text)' }}>
            Third session running. The system noticed.
          </p>
        ) : null}

        {on.attainment ? (
          <p className="mt-3 rounded border border-hairline px-3 py-2 text-14">
            Finishing all eight issues a certificate your employer accepts.
          </p>
        ) : (
          <p className="mt-3 text-14 text-ink-soft">There is no stated end state.</p>
        )}
      </div>
    </div>
  );
}

// ── MODULE 03 — MotivationMixer ─────────────────────────────────────────────

const PRESETS = {
  marketing: { reward: 85, competence: 25, social: 80, triggers: 75 },
  subject: { reward: 15, competence: 80, social: 5, triggers: 20 },
  retains: { reward: 25, competence: 85, social: 20, triggers: 30 },
};

export function MotivationMixer({ onInteract }: DemoProps) {
  const [mix, setMix] = useState(PRESETS.retains);
  const { transition } = useMotionSafe();

  const week1 = Math.round(
    30 + mix.reward * 0.4 + mix.triggers * 0.3 + mix.social * 0.15 + mix.competence * 0.05
  );
  const week12 = Math.round(
    Math.max(
      4,
      20 + mix.competence * 0.55 - mix.reward * 0.18 - Math.max(0, mix.social - 60) * 0.9 -
        Math.max(0, mix.triggers - 50) * 0.25
    )
  );

  const marcus =
    mix.social > 60
      ? '“I don’t want to be compared. I signed up because my doctor mentioned it — I’d rather nobody saw my numbers.”'
      : mix.reward > 65
        ? '“The points were fun for a fortnight. Now I notice I only open it when it tells me to.”'
        : mix.competence > 60
          ? '“I can do more than I could in February. That is why I keep going, honestly.”'
          : '“It’s fine. I don’t think about it much, which probably means I’ll stop.”';

  function apply(preset: keyof typeof PRESETS) {
    setMix(PRESETS[preset]);
    onInteract();
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <Slider
          label="Reward"
          value={mix.reward}
          onChange={(v) => {
            setMix((m) => ({ ...m, reward: v }));
            onInteract();
          }}
        />
        <Slider
          label="Competence"
          value={mix.competence}
          accent="var(--integrity)"
          onChange={(v) => {
            setMix((m) => ({ ...m, competence: v }));
            onInteract();
          }}
        />
        <Slider
          label="Social validation"
          value={mix.social}
          accent="var(--risk)"
          onChange={(v) => {
            setMix((m) => ({ ...m, social: v }));
            onInteract();
          }}
        />
        <Slider
          label="Activation frequency"
          value={mix.triggers}
          onChange={(v) => {
            setMix((m) => ({ ...m, triggers: v }));
            onInteract();
          }}
        />

        <div className="flex flex-wrap gap-2 pt-1">
          <Button size="sm" onClick={() => apply('marketing')}>
            Marketing’s proposal
          </Button>
          <Button size="sm" onClick={() => apply('subject')}>
            Subject lead’s proposal
          </Button>
          <Button size="sm" onClick={() => apply('retains')}>
            What actually retains Marcus
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded border border-hairline p-4">
          <Mono className="text-ink-soft">MARCUS, 52</Mono>
          <p className="mt-1 text-12 text-ink-soft">
            Enrolled through his employer. Reasonably motivated, quietly worried about being judged.
          </p>
          <motion.p
            key={marcus}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition(DUR.quick)}
            className="mt-3 text-14"
          >
            {marcus}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Readout label="Week 1" value={week1} accent="var(--activation)" />
          <Readout label="Week 12" value={week12} accent="var(--integrity)" />
        </div>

        <svg viewBox="0 0 200 70" className="w-full" role="img" aria-label="90-day retention line">
          <motion.path
            d={retentionPath(week1, week12)}
            fill="none"
            stroke="var(--integrity)"
            strokeWidth="2"
            initial={false}
            animate={{ d: retentionPath(week1, week12) }}
            transition={{ duration: DUR.gauge, ease: EASE.out as number[] }}
          />
          <line x1="0" y1="60" x2="200" y2="60" stroke="var(--hairline)" />
        </svg>
      </div>
    </div>
  );
}

function retentionPath(week1: number, week12: number): string {
  const y = (v: number) => 62 - (v / 100) * 52;
  const peak = y(week1);
  const end = y(week12);
  return `M 0 ${y(20)} C 30 ${peak} 50 ${peak} 80 ${(peak + end) / 2} S 150 ${end} 200 ${end}`;
}
