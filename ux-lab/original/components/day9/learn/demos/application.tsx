'use client';

import { motion } from '@/original/lib/day9/motion-lite';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DUR, EASE } from '@/original/lib/day9/motion';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { Button, Mono, Slider, cx } from '@/original/components/day9/ui';
import { Readout } from '../DemoFrame';

type DemoProps = { onInteract: () => void };

// ── MODULE 04 — MechanicSandbox ─────────────────────────────────────────────

const SANDBOX_MECHANICS = [
  { id: 'feedback', label: 'Feedback mechanics', motivation: 14, credibility: 6, effort: 1 },
  { id: 'progress', label: 'Progress bar', motivation: 20, credibility: 5, effort: 2 },
  { id: 'milestones', label: 'Milestones', motivation: 12, credibility: 3, effort: 2 },
  { id: 'points', label: 'Points', motivation: 10, credibility: -8, effort: 2 },
  { id: 'badges', label: 'Badges', motivation: 8, credibility: -6, effort: 3 },
  { id: 'streaks', label: 'Streaks', motivation: 16, credibility: -14, effort: 3 },
  { id: 'leaderboard', label: 'Leaderboard', motivation: 12, credibility: -22, effort: 4 },
];

export function MechanicSandbox({ onInteract }: DemoProps) {
  const [added, setAdded] = useState<string[]>([]);
  const { transition } = useMotionSafe();

  const { motivation, credibility, effort } = useMemo(() => {
    const chosen = SANDBOX_MECHANICS.filter((m) => added.includes(m.id));
    const rawMotivation = chosen.reduce((s, m) => s + m.motivation, 0);
    // Past four mechanics, each addition dilutes the others (§ density ceiling).
    const dilution = Math.max(0, chosen.length - 4) * 6;
    const rawCredibility = chosen.reduce((s, m) => s + m.credibility, 0);
    return {
      motivation: Math.max(0, Math.min(100, 22 + rawMotivation - dilution)),
      credibility: Math.max(0, Math.min(100, 78 + rawCredibility - dilution * 1.6)),
      // relative units of time and people, shown only as Low, Mid or High
      effort: chosen.reduce((s, m) => s + m.effort, 0),
    };
  }, [added]);

  function toggle(id: string) {
    setAdded((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));
    onInteract();
  }

  return (
    <div className="grid gap-5 md:grid-cols-[1fr_220px]">
      <div className="rounded border border-hairline p-4">
        <p className="text-16 font-medium">Professional development platform</p>
        <p className="mt-1 text-14 text-ink-soft">Module 4 of 8 · Working with distributions</p>

        <div className="mt-4 space-y-2">
          {added.includes('progress') ? (
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'var(--activation)' }}
                animate={{ width: '45%' }}
                transition={transition(DUR.fill)}
              />
            </div>
          ) : null}
          {added.includes('feedback') ? (
            <p className="text-14" style={{ color: 'var(--integrity-text)' }}>
              You can read a box plot now. One reading left in this module.
            </p>
          ) : (
            <p className="text-14 text-ink-soft">Step saved.</p>
          )}
          {added.includes('milestones') ? (
            <p className="text-14">Halfway marker: module 4 is where the maths stops being new.</p>
          ) : null}
          {added.includes('points') ? <Mono>+150 PTS</Mono> : null}
          {added.includes('badges') ? (
            <div className="flex gap-2">
              {['Early Bird', 'Finisher'].map((b) => (
                <span key={b} className="rounded-full border border-hairline px-2 py-0.5 text-12">
                  {b}
                </span>
              ))}
            </div>
          ) : null}
          {added.includes('streaks') ? (
            <p className="text-14" style={{ color: 'var(--activation-text)' }}>
              4-day streak — keep it alive
            </p>
          ) : null}
          {added.includes('leaderboard') ? (
            <p className="text-14" style={{ color: 'var(--risk-text)' }}>
              You are #12 of 40 in your cohort this week
            </p>
          ) : null}
        </div>

        {added.length > 5 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 rounded border px-3 py-2 text-14"
            style={{ borderColor: 'var(--risk)', color: 'var(--risk-text)' }}
          >
            {added.length} mechanics. Which one is now doing nothing?
          </motion.p>
        ) : null}
      </div>

      <div className="space-y-3">
        <Mono className="text-ink-soft">TRAY</Mono>
        {SANDBOX_MECHANICS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => toggle(m.id)}
            aria-pressed={added.includes(m.id)}
            className={cx(
              'w-full rounded border px-3 py-2 text-left text-14',
              added.includes(m.id) ? 'border-ink bg-ink text-white' : 'border-hairline hover:border-ink'
            )}
          >
            {m.label}
          </button>
        ))}

        <div className="space-y-2 border-t border-hairline pt-3">
          <Readout label="Motivation" value={Math.round(motivation)} accent="var(--activation)" />
          <Readout label="Credibility" value={Math.round(credibility)} accent="var(--integrity)" />
          <Readout label="Effort" value={effort === 0 ? 'None' : effort <= 3 ? 'Low' : effort <= 7 ? 'Mid' : 'High'} />
          <p className="text-12 text-ink-soft">
            {effort === 0
              ? 'Add a mechanic to see how much time and how many people it takes.'
              : effort <= 3
                ? 'A short time and a small team.'
                : effort <= 7
                  ? 'Some weeks and a design and development team.'
                  : 'Many weeks and several teams. Each addition also needs someone to look after it.'}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── MODULE 05 — RewardInflationSimulator ────────────────────────────────────

export function RewardInflationSimulator({ onInteract }: DemoProps) {
  const [rewards, setRewards] = useState(1);
  const [trustDamaged, setTrustDamaged] = useState(false);
  const [undoPressed, setUndoPressed] = useState(false);

  const motivation = motivationAt(rewards);
  // Trust never comes back once it has fallen — that is the whole point.
  const liveTrust = trustAt(rewards);
  const trust = trustDamaged ? Math.min(liveTrust, 18) : liveTrust;

  useEffect(() => {
    if (rewards >= 9) setTrustDamaged(true);
  }, [rewards]);

  return (
    <div className="space-y-5">
      <Slider
        label="Rewards per session"
        value={rewards}
        min={1}
        max={20}
        onChange={(v) => {
          setRewards(v);
          onInteract();
        }}
        sublabel="Drag it up. Then try to undo it."
      />

      <svg viewBox="0 0 320 130" className="w-full" role="img" aria-label="Motivation and trust over 180 days">
        <line x1="0" y1="118" x2="320" y2="118" stroke="var(--hairline)" />
        <motion.path
          d={curve(motivation, 'motivation')}
          fill="none"
          stroke="var(--activation)"
          strokeWidth="2.5"
          animate={{ d: curve(motivation, 'motivation') }}
          transition={{ duration: DUR.gauge, ease: EASE.out as number[] }}
        />
        <motion.path
          d={curve(trust, 'trust')}
          fill="none"
          stroke="var(--integrity)"
          strokeWidth="2.5"
          animate={{ d: curve(trust, 'trust') }}
          transition={{ duration: DUR.gauge, ease: EASE.out as number[] }}
        />
        <text x="4" y="14" fontSize="9" fill="var(--activation)" className="font-mono">
          MOTIVATION
        </text>
        <text x="4" y="26" fontSize="9" fill="var(--integrity)" className="font-mono">
          TRUST
        </text>
      </svg>

      <div className="flex flex-wrap items-center gap-4">
        <Readout label="Motivation" value={Math.round(motivation)} accent="var(--activation)" />
        <Readout label="Trust" value={Math.round(trust)} accent="var(--integrity)" />
        <Button
          size="sm"
          onClick={() => {
            setRewards(1);
            setUndoPressed(true);
            onInteract();
          }}
        >
          Undo the inflation
        </Button>
      </div>

      {undoPressed && trustDamaged ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-l-2 pl-3 text-14"
          style={{ borderColor: 'var(--risk)' }}
        >
          Trust has no reset. That is the whole point.
        </motion.p>
      ) : null}
    </div>
  );
}

function motivationAt(r: number): number {
  if (r <= 5) return 30 + r * 9;
  if (r <= 8) return 75;
  return Math.max(18, 75 - (r - 8) * 5.5);
}

function trustAt(r: number): number {
  if (r <= 6) return 82;
  return Math.max(6, 82 - (r - 6) * 5.4);
}

function curve(end: number, kind: 'motivation' | 'trust'): string {
  const y = (v: number) => 118 - (v / 100) * 100;
  if (kind === 'trust') {
    return `M 0 ${y(40)} C 60 ${y(70)} 90 ${y(80)} 130 ${y(82)} L 160 ${y(82)} L 168 ${y(end)} L 320 ${y(end)}`;
  }
  return `M 0 ${y(30)} C 60 ${y(end + 12)} 120 ${y(end + 8)} 180 ${y(end)} S 260 ${y(end)} 320 ${y(end)}`;
}

// ── MODULE 06 — NarrativeLayerToggle ────────────────────────────────────────

const PLAIN_STEPS = [
  'Step 1 of 6 — Complete your baseline',
  'Step 2 of 6 — Set targets',
  'Step 3 of 6 — First week complete',
  'Step 4 of 6 — Fourth week complete',
  'Step 5 of 6 — Sixth week complete',
  'Step 6 of 6 — Eighth week complete',
];

const NARRATIVE_STEPS = [
  'Getting your starting point',
  'Deciding what you’re actually aiming at',
  'Week 2 — your body starts noticing',
  'Week 4 — the point most people quit',
  'Week 6 — it costs less effort now',
  'Week 8 — this is a habit, not a programme',
];

export function NarrativeLayerToggle({ onInteract }: DemoProps) {
  const [narrative, setNarrative] = useState(false);
  const { reduced, transition } = useMotionSafe();
  const steps = narrative ? NARRATIVE_STEPS : PLAIN_STEPS;

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-14">
        <input
          type="checkbox"
          checked={narrative}
          onChange={() => {
            setNarrative((v) => !v);
            onInteract();
          }}
        />
        Narrative layer
      </label>

      <motion.ol
        key={narrative ? 'on' : 'off'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition(DUR.quick)}
        className="space-y-2"
      >
        {steps.map((s, i) => (
          <li
            key={s}
            className="flex items-center gap-3 rounded border border-hairline px-3 py-2 text-14"
          >
            <motion.span
              className="inline-block h-2 w-2 shrink-0 rounded-full"
              style={{
                background: i < 3 ? 'var(--activation)' : 'var(--hairline)',
              }}
              animate={
                narrative && i === 2 && !reduced ? { scale: [1, 1.9, 1] } : { scale: 1 }
              }
              transition={{ duration: DUR.pulse }}
            />
            {s}
          </li>
        ))}
      </motion.ol>

      <div className="rounded border border-hairline bg-paper p-3">
        <Mono className="text-ink-soft">MECHANICS: unchanged</Mono>
        <p className="mt-1 font-mono text-12 text-ink-soft">
          progress bar: on · milestones: 4 · feedback timing: identical · new mechanics added: 0
        </p>
      </div>
    </div>
  );
}

// ── MODULE 07 — RetentionCurveLab ───────────────────────────────────────────

const STRATEGIES = [
  { id: 'heavy', label: 'Heavy mechanics', at: { 7: 140, 30: 128, 60: 96, 90: 78 } },
  { id: 'restrained', label: 'Restrained', at: { 7: 112, 30: 118, 60: 124, 90: 131 } },
  { id: 'narrative', label: 'Narrative-led', at: { 7: 108, 30: 116, 60: 126, 90: 136 } },
] as const;

const WINDOWS = [7, 30, 60, 90] as const;

export function RetentionCurveLab({ onInteract }: DemoProps) {
  const [strategy, setStrategy] = useState<(typeof STRATEGIES)[number]['id']>('heavy');
  const [window, setWindow] = useState<(typeof WINDOWS)[number]>(7);

  const winner = useMemo(() => {
    const ranked = [...STRATEGIES].sort((a, b) => b.at[window] - a.at[window]);
    return ranked[0];
  }, [window]);

  const chosen = STRATEGIES.find((s) => s.id === strategy)!;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div>
          <Mono className="text-ink-soft">STRATEGY</Mono>
          <div className="mt-1 flex flex-wrap gap-2">
            {STRATEGIES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setStrategy(s.id);
                  onInteract();
                }}
                aria-pressed={strategy === s.id}
                className={cx(
                  'rounded border px-3 py-1.5 text-14',
                  strategy === s.id ? 'border-ink bg-ink text-white' : 'border-hairline hover:border-ink'
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Mono className="text-ink-soft">REPORTING WINDOW</Mono>
          <div className="mt-1 flex flex-wrap gap-2">
            {WINDOWS.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => {
                  setWindow(w);
                  onInteract();
                }}
                aria-pressed={window === w}
                className={cx(
                  'rounded border px-3 py-1.5 font-mono text-14',
                  window === w ? 'border-ink bg-ink text-white' : 'border-hairline hover:border-ink'
                )}
              >
                {w}d
              </button>
            ))}
          </div>
        </div>
      </div>

      <svg viewBox="0 0 320 130" className="w-full" role="img" aria-label="Active users over 90 days">
        <line x1="0" y1="86" x2="320" y2="86" stroke="var(--hairline)" strokeDasharray="3 3" />
        <text x="2" y="82" fontSize="8" fill="var(--ink-soft)" className="font-mono">
          BASELINE
        </text>
        {STRATEGIES.map((s) => (
          <path
            key={s.id}
            d={strategyPath(s.at)}
            fill="none"
            stroke={s.id === 'heavy' ? 'var(--activation)' : 'var(--integrity)'}
            strokeWidth={s.id === strategy ? 2.5 : 1}
            opacity={s.id === strategy ? 1 : 0.3}
          />
        ))}
        <line
          x1={(window / 90) * 320}
          y1="6"
          x2={(window / 90) * 320}
          y2="120"
          stroke="var(--inspect)"
          strokeWidth="1.5"
        />
      </svg>

      <div className="rounded border border-hairline p-4">
        <Mono className="text-ink-soft">VERDICT AT {window} DAYS</Mono>
        <p className="mt-1 text-20">{winner.label} wins</p>
        <p className="mt-1 text-14 text-ink-soft">
          {chosen.label} reads {chosen.at[window]} against a baseline of 100.
        </p>
        <p className="mt-3 border-l-2 pl-3 text-14" style={{ borderColor: 'var(--inspect)' }}>
          You did not choose a strategy. You chose a window, and the window chose the strategy.
        </p>
      </div>
    </div>
  );
}

function strategyPath(at: Record<number, number>): string {
  const x = (d: number) => (d / 90) * 320;
  const y = (v: number) => 120 - ((v - 60) / 100) * 100;
  return `M 0 ${y(100)} C ${x(14)} ${y(at[7] + 6)} ${x(24)} ${y(at[30])} ${x(30)} ${y(at[30])} S ${x(60)} ${y(at[60])} ${x(90)} ${y(at[90])}`;
}

// ── MODULE 08 — OverjustificationDemo ───────────────────────────────────────

const TILE_COLOURS = ['var(--activation)', 'var(--integrity)', 'var(--inspect)'];

export function OverjustificationDemo({ onInteract }: DemoProps) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [tiles, setTiles] = useState([0, 1, 2, 0, 1, 2]);
  const [points, setPoints] = useState(0);
  const [durations, setDurations] = useState<number[]>([]);
  const startedAt = useRef<number | null>(null);
  const clicks = useRef(0);

  function beginPhase(next: 1 | 2 | 3) {
    if (startedAt.current !== null) {
      const seconds = Math.round((Date.now() - startedAt.current) / 1000);
      setDurations((d) => [...d, seconds]);
    }
    startedAt.current = Date.now();
    clicks.current = 0;
    setPhase(next);
    onInteract();
  }

  function tapTile(i: number) {
    setTiles((t) => t.map((v, idx) => (idx === i ? (v + 1) % 3 : v)));
    clicks.current += 1;
    if (phase === 2) setPoints((p) => p + 10);
    onInteract();
  }

  return (
    <div className="space-y-4">
      {phase === 0 ? (
        <>
          <p className="text-14 text-ink-soft">
            Arrange the six tiles into whatever pattern you like. No score, no timer.
          </p>
          <Button
            size="sm"
            onClick={() => {
              startedAt.current = Date.now();
              setPhase(1);
              onInteract();
            }}
          >
            Start
          </Button>
        </>
      ) : null}

      {phase >= 1 ? (
        <>
          <div className="flex gap-2">
            {tiles.map((v, i) => (
              <button
                key={i}
                type="button"
                onClick={() => tapTile(i)}
                aria-label={`Tile ${i + 1}`}
                className="h-12 w-12 rounded border border-hairline transition-transform hover:scale-105"
                style={{ background: TILE_COLOURS[v] }}
              />
            ))}
          </div>

          {phase === 2 ? (
            <p className="font-mono text-26" style={{ color: 'var(--activation-text)' }}>
              {points} POINTS
            </p>
          ) : null}

          {phase === 3 ? (
            <p className="text-14 text-ink-soft">Points programme ended.</p>
          ) : null}

          <div className="flex flex-wrap gap-2">
            {phase === 1 ? (
              <Button size="sm" onClick={() => beginPhase(2)}>
                Introduce points
              </Button>
            ) : null}
            {phase === 2 ? (
              <Button size="sm" onClick={() => beginPhase(3)}>
                Remove the points
              </Button>
            ) : null}
            {phase === 3 ? (
              <Button
                size="sm"
                onClick={() => {
                  if (startedAt.current !== null) {
                    const seconds = Math.round((Date.now() - startedAt.current) / 1000);
                    setDurations((d) => [...d, seconds]);
                    startedAt.current = null;
                  }
                  setPhase(0);
                }}
              >
                Show me my three durations
              </Button>
            ) : null}
          </div>
        </>
      ) : null}

      {durations.length >= 3 ? (
        <div className="rounded border border-hairline p-4">
          <Mono className="text-ink-soft">YOUR OWN VOLUNTARY DURATIONS</Mono>
          <div className="mt-2 flex items-end gap-4">
            {['Intrinsic only', 'Reward introduced', 'Reward removed'].map((label, i) => (
              <div key={label} className="flex-1">
                <div
                  className="rounded-t"
                  style={{
                    height: Math.max(6, Math.min(90, durations[i] * 4)),
                    background: i === 1 ? 'var(--activation)' : 'var(--integrity)',
                  }}
                />
                <p className="mt-1 font-mono text-[10px] text-ink-soft">{label}</p>
                <Mono>{durations[i]}s</Mono>
              </div>
            ))}
          </div>
          <p className="mt-3 text-14 text-ink-soft">
            {durations[2] < durations[0]
              ? 'Your third stretch was shorter than your first. That gap is the overjustification effect, measured on you.'
              : 'It did not happen to you this time. It happens at population scale, which is the level you will be shipping at.'}
          </p>
        </div>
      ) : null}
    </div>
  );
}
