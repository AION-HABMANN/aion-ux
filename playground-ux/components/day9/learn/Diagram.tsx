'use client';

import { motion } from '@/lib/day9/motion-lite';
import { useState } from 'react';
import { DUR, EASE, STAGGER } from '@/lib/day9/motion';
import { useMotionSafe } from '@/lib/day9/use-motion-safe';
import { Mono } from '@/components/day9/ui';

/**
 * Every "The mechanism" section carries a diagram, built as SVG rather than an
 * image so it can animate and stay legible at any width (CONTENT_PACK §2).
 */
export function Diagram({ kind, spec }: { kind: string; spec: string }) {
  return (
    <figure className="rounded-lg border border-hairline bg-raised p-5">
      <div className="min-h-[160px]">{renderDiagram(kind)}</div>
      <figcaption className="mt-3 border-t border-hairline pt-3 text-12 text-ink-soft">
        {spec}
      </figcaption>
    </figure>
  );
}

function renderDiagram(kind: string) {
  switch (kind) {
    case 'layered-stack':
      return <LayeredStack />;
    case 'five-lever-panel':
      return <FiveLeverPanel />;
    case 'lever-decay-chart':
      return <LeverDecayChart />;
    case 'mechanic-effort-matrix':
      return <MechanicEffortMatrix />;
    case 'trust-asymmetry-chart':
      return <TrustAsymmetryChart />;
    case 'dual-track-journey':
      return <DualTrackJourney />;
    case 'crossing-curves':
      return <CrossingCurves />;
    case 'overjustification-timeline':
      return <OverjustificationTimeline />;
    case 'domain-fit-matrix':
      return <DomainFitSketch />;
    case 'decision-authority-map':
      return <DecisionAuthorityMap />;
    default:
      return null;
  }
}

const BANDS = [
  {
    label: 'SYSTEM LAYER',
    detail: 'rules, goals, feedback, progress state',
    example: 'A four-step indicator on a mortgage application.',
    width: 100,
    effort: 'Low effort',
    colour: 'var(--integrity)',
  },
  {
    label: 'AESTHETIC LAYER',
    detail: 'tone, shape, voice',
    example: 'Rounded shapes and a warmer voice on a tax form.',
    width: 72,
    effort: 'Mid effort',
    colour: 'var(--activation)',
  },
  {
    label: 'FICTION LAYER',
    detail: 'world, characters, stakes',
    example: 'A quest system with a narrator and a fail state.',
    width: 44,
    effort: 'High effort',
    colour: 'var(--risk)',
  },
];

function LayeredStack() {
  const { reduced } = useMotionSafe();
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {[...BANDS].reverse().map((band, i) => {
        const realIndex = BANDS.length - 1 - i;
        const dimmed = hover !== null && hover !== realIndex;
        return (
          <motion.div
            key={band.label}
            onMouseEnter={() => setHover(realIndex)}
            onMouseLeave={() => setHover(null)}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: dimmed ? 0.35 : 1, y: 0 }}
            animate={{ opacity: dimmed ? 0.35 : 1 }}
            viewport={{ once: true }}
            transition={{
              duration: reduced ? 0.15 : DUR.base,
              delay: reduced ? 0 : (BANDS.length - 1 - realIndex) * STAGGER.loose,
            }}
            className="flex items-center gap-3"
          >
            <div
              className="flex items-center justify-between rounded px-3 py-2"
              style={{
                width: `${band.width}%`,
                background: `color-mix(in srgb, ${band.colour} 12%, transparent)`,
                borderLeft: `3px solid ${band.colour}`,
              }}
            >
              <div>
                <Mono style={{ color: band.colour }}>{band.label}</Mono>
                <p className="text-12 text-ink-soft">
                  {hover === realIndex ? band.example : band.detail}
                </p>
              </div>
            </div>
            <Mono className="text-ink-soft">{band.effort}</Mono>
          </motion.div>
        );
      })}
    </div>
  );
}

const LEVER_BARS = [
  { label: 'Progress', question: 'how much is left', height: 96, wide: true },
  { label: 'Feedback', question: 'did that count', height: 74 },
  { label: 'Recognition', question: 'did anyone notice', height: 58 },
  { label: 'Challenge', question: 'is this worth it', height: 66 },
  { label: 'Attainment', question: 'was that real', height: 52 },
];

function FiveLeverPanel() {
  const { reduced } = useMotionSafe();
  return (
    <div>
      <div className="flex items-end gap-3" style={{ height: 120 }}>
        {LEVER_BARS.map((l, i) => (
          <div key={l.label} className={l.wide ? 'flex-[1.4]' : 'flex-1'}>
            <motion.div
              className="rounded-t"
              style={{ background: l.wide ? 'var(--activation)' : 'var(--ink-soft)' }}
              initial={reduced ? { opacity: 0 } : { height: 0 }}
              whileInView={{ height: l.height, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: reduced ? 0.15 : DUR.fill,
                delay: reduced ? 0 : i * STAGGER.base,
                ease: EASE.out as number[],
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-3 border-t border-hairline pt-2">
        {LEVER_BARS.map((l) => (
          <div key={l.label} className={l.wide ? 'flex-[1.4]' : 'flex-1'}>
            <p className="text-12 font-medium">{l.label}</p>
            <p className="font-mono text-[10px] text-ink-soft">{l.question}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 font-mono text-[10px]" style={{ color: 'var(--activation-text)' }}>
        Progress carries the most weight for the effort it takes
      </p>
    </div>
  );
}

function Chart({
  children,
  label,
  height = 140,
}: {
  children: React.ReactNode;
  label: string;
  height?: number;
}) {
  return (
    <svg viewBox={`0 0 320 ${height}`} className="w-full" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

function DrawnPath({
  d,
  stroke,
  delay = 0,
  width = 2,
  dash,
}: {
  d: string;
  stroke: string;
  delay?: number;
  width?: number;
  dash?: string;
}) {
  const { reduced } = useMotionSafe();
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeDasharray={dash}
      initial={reduced ? { opacity: 0 } : { pathLength: 0 }}
      whileInView={reduced ? { opacity: 1 } : { pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0.15 : DUR.draw, delay, ease: EASE.out as number[] }}
    />
  );
}

function LeverDecayChart() {
  return (
    <Chart label="Six motivation levers over 90 days">
      <line x1="0" y1="120" x2="320" y2="120" stroke="var(--hairline)" />
      <line x1="150" y1="10" x2="150" y2="126" stroke="var(--risk)" strokeDasharray="2 3" />
      <text x="153" y="20" fontSize="8" fill="var(--risk)" className="font-mono">
        FAILURE EVENT
      </text>
      <DrawnPath d="M 0 40 C 60 30 120 70 320 104" stroke="var(--activation)" />
      <DrawnPath d="M 0 108 C 100 84 200 76 320 72" stroke="var(--integrity)" delay={0.1} />
      <DrawnPath d="M 0 110 C 80 92 140 88 150 96 C 180 66 240 58 320 52" stroke="var(--inspect)" delay={0.2} />
      <DrawnPath d="M 0 100 C 90 66 200 42 320 30" stroke="var(--ink-soft)" delay={0.3} dash="4 3" />
      <DrawnPath d="M 0 100 C 90 112 200 122 320 128" stroke="var(--risk)" delay={0.35} dash="4 3" />
      <text x="4" y="14" fontSize="8" fill="var(--activation)" className="font-mono">REWARD</text>
      <text x="60" y="14" fontSize="8" fill="var(--integrity)" className="font-mono">COMPETENCE</text>
      <text x="150" y="136" fontSize="8" fill="var(--inspect)" className="font-mono">SELF-EFFICACY (the only line that recovers)</text>
    </Chart>
  );
}

const EFFORT_ROWS = [
  { label: 'Points', effort: 1, lift: 2, decay: 5, risk: 3 },
  { label: 'Badges', effort: 2, lift: 2, decay: 3, risk: 2 },
  { label: 'Levels', effort: 3, lift: 3, decay: 1, risk: 2 },
  { label: 'Challenges', effort: 3, lift: 4, decay: 4, risk: 3 },
  { label: 'Streaks', effort: 3, lift: 5, decay: 2, risk: 5 },
  { label: 'Status displays', effort: 3, lift: 3, decay: 3, risk: 5 },
  { label: 'Feedback mechanics', effort: 1, lift: 4, decay: 1, risk: 1, highlight: true },
];

function MechanicEffortMatrix() {
  return (
    <>
    <table className="w-full text-12">
      <thead>
        <tr className="text-left">
          <th className="pb-1 font-normal"><Mono className="text-ink-soft">MECHANIC</Mono></th>
          {['Build effort', 'Lift', 'Decay', 'Risk'].map((h) => (
            <th key={h} className="pb-1 pl-2 font-normal">
              <Mono className="text-ink-soft">{h}</Mono>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {EFFORT_ROWS.map((row, i) => (
          <tr
            key={row.label}
            className="border-t border-hairline"
            style={
              row.highlight
                ? { outline: '1px solid var(--integrity)', outlineOffset: -1 }
                : undefined
            }
          >
            <td className="py-1 pr-2">{row.label}</td>
            {(['effort', 'lift', 'decay', 'risk'] as const).map((k) => (
              <td key={k} className="py-1 pl-2">
                <Segments
                  n={row[k]}
                  delay={i * 0.06}
                  good={k === 'lift' ? row[k] >= 3 : row[k] <= 2}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <p className="mt-2 text-12 text-ink-soft">Effort means time and people: how long a small team needs and how many different skills. It is a judgement, not a price.</p>
    </>
  );
}

function Segments({ n, delay, good }: { n: number; delay: number; good: boolean }) {
  const { reduced } = useMotionSafe();
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          className="block h-2.5 w-2"
          style={{
            background:
              i < n ? (good ? 'var(--integrity)' : 'var(--risk)') : 'var(--hairline)',
          }}
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.band, delay: delay + i * STAGGER.micro }}
        />
      ))}
    </span>
  );
}

function TrustAsymmetryChart() {
  return (
    <Chart label="Engagement and trust over 180 days">
      <line x1="0" y1="126" x2="320" y2="126" stroke="var(--hairline)" />
      <DrawnPath
        d="M 0 110 C 40 60 60 90 90 62 C 120 92 140 50 170 44 C 200 82 240 108 320 124"
        stroke="var(--activation)"
      />
      <DrawnPath d="M 0 112 C 80 70 130 44 190 38" stroke="var(--integrity)" delay={0.1} />
      <DrawnPath d="M 190 38 L 190 112" stroke="var(--integrity)" delay={0.9} width={2} />
      <DrawnPath d="M 190 112 L 320 112" stroke="var(--integrity)" delay={1.2} />
      <text x="194" y="30" fontSize="8" fill="var(--integrity)" className="font-mono">
        the moment the user noticed
      </text>
      {[40, 90, 140, 190].map((x, i) => (
        <text key={x} x={x} y="138" fontSize="8" fill="var(--ink-soft)" className="font-mono">
          {[1, 2, 4, 8][i]}x
        </text>
      ))}
    </Chart>
  );
}

function DualTrackJourney() {
  const { reduced } = useMotionSafe();
  const plain = [30, 80, 130, 180, 230, 280];
  const narrative = [26, 78, 120, 190, 244, 292];
  return (
    <Chart label="The same six-step journey, numbered and narrated" height={110}>
      <line x1="20" y1="76" x2="300" y2="76" stroke="var(--hairline)" />
      {plain.map((x) => (
        <circle key={x} cx={x} cy="76" r="5" fill="var(--raised)" stroke="var(--ink-soft)" />
      ))}
      <text x="20" y="96" fontSize="8" fill="var(--ink-soft)" className="font-mono">
        STEP 1 … STEP 6 — evenly spaced, undifferentiated
      </text>

      <line x1="20" y1="34" x2="300" y2="34" stroke="var(--activation)" strokeOpacity="0.4" />
      {narrative.map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          cy="34"
          r={i === 2 ? 7 : 5}
          fill="var(--activation)"
          initial={reduced ? false : { scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.stage, delay: i * STAGGER.quick }}
        />
      ))}
      <text x="20" y="20" fontSize="8" fill="var(--activation)" className="font-mono">
        NAMED STAGES — spacing says which thresholds matter
      </text>
      <text x="20" y="58" fontSize="8" fill="var(--ink-soft)" className="font-mono">
        Same mechanics. Same timing. Different meaning.
      </text>
    </Chart>
  );
}

function CrossingCurves() {
  return (
    <Chart label="Heavy mechanics against restrained, over 90 days">
      <rect x="0" y="0" width="74" height="126" fill="var(--risk)" fillOpacity="0.08" />
      <text x="4" y="12" fontSize="8" fill="var(--risk)" className="font-mono">
        where decisions are made
      </text>
      <line x1="0" y1="86" x2="320" y2="86" stroke="var(--hairline)" strokeDasharray="3 3" />
      <DrawnPath d="M 0 92 C 40 24 60 22 74 26 C 130 40 200 84 320 112" stroke="var(--activation)" width={2.5} />
      <DrawnPath d="M 0 100 C 90 88 200 62 320 34" stroke="var(--integrity)" width={2.5} delay={0.1} />
      <line x1="170" y1="8" x2="170" y2="126" stroke="var(--inspect)" strokeWidth="1.5" />
      <text x="174" y="18" fontSize="8" fill="var(--inspect)" className="font-mono">
        THE ONLY DAY THAT SETTLES IT
      </text>
    </Chart>
  );
}

function OverjustificationTimeline() {
  return (
    <Chart label="Motivation across four phases" height={130}>
      <line x1="0" y1="70" x2="320" y2="70" stroke="var(--hairline)" strokeDasharray="3 3" />
      <text x="4" y="66" fontSize="8" fill="var(--ink-soft)" className="font-mono">
        the level you used to have, for free
      </text>
      <DrawnPath d="M 0 70 L 80 70" stroke="var(--integrity)" width={2.5} />
      <DrawnPath d="M 80 70 C 100 34 120 28 160 26" stroke="var(--activation)" width={2.5} delay={0.4} />
      <DrawnPath d="M 160 26 C 180 60 190 92 240 96" stroke="var(--risk)" width={2.5} delay={1.1} />
      <DrawnPath d="M 240 96 L 320 98" stroke="var(--risk)" width={2.5} delay={1.5} />
      {['Intrinsic only', 'Reward in', 'Reward out', '6 months on'].map((label, i) => (
        <text
          key={label}
          x={10 + i * 80}
          y="122"
          fontSize="8"
          fill="var(--ink-soft)"
          className="font-mono"
        >
          {label}
        </text>
      ))}
    </Chart>
  );
}

function DomainFitSketch() {
  const { reduced } = useMotionSafe();
  const verdicts = [
    [1, 0, 2, 0],
    [1, 0, 2, 1],
    [1, 1, 2, 1],
    [1, 0, 1, 0],
    [1, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [2, 2, 2, 2],
    [2, 2, 2, 2],
    [2, 1, 2, 1],
    [2, 2, 2, 2],
    [2, 1, 2, 2],
  ];
  return (
    <div className="flex flex-wrap gap-1">
      {verdicts.map((row, r) => (
        <div key={r} className="flex gap-1">
          {row.map((v, c) => (
            <motion.span
              key={c}
              className="block h-4 w-4 rounded-sm border"
              style={{
                background: v === 2 ? 'var(--integrity)' : 'transparent',
                borderColor: v === 0 ? 'var(--risk)' : 'var(--integrity)',
              }}
              initial={reduced ? false : { scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: DUR.cell, delay: c * STAGGER.wide + r * STAGGER.hair }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function DecisionAuthorityMap() {
  const { reduced } = useMotionSafe();
  const bands = [
    { r: 62, colour: 'var(--risk)', label: 'Escalates' },
    { r: 44, colour: 'var(--activation)', label: 'Owner decides' },
    { r: 26, colour: 'var(--integrity)', label: 'Team decides' },
  ];
  return (
    <Chart label="Three bands of decision authority" height={150}>
      {bands.map((b, i) => (
        <motion.circle
          key={b.label}
          cx="90"
          cy="72"
          r={b.r}
          fill="none"
          stroke={b.colour}
          strokeWidth="2"
          initial={reduced ? false : { scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DUR.band, delay: (bands.length - i) * STAGGER.band }}
          style={{ originX: '90px', originY: '72px' }}
        />
      ))}
      {bands.map((b, i) => (
        <text
          key={b.label}
          x="164"
          y={40 + i * 22}
          fontSize="9"
          fill={b.colour}
          className="font-mono"
        >
          {b.label}
        </text>
      ))}
      <DrawnPath d="M 90 72 L 164 36" stroke="var(--ink-soft)" width={1} delay={0.6} />
      <DrawnPath d="M 90 72 L 164 58" stroke="var(--ink-soft)" width={1} delay={0.7} />
      <DrawnPath d="M 90 72 L 164 80" stroke="var(--ink-soft)" width={1} delay={0.8} />
      <text x="10" y="140" fontSize="8" fill="var(--ink-soft)" className="font-mono">
        Most organisations have the inner band and nothing else.
      </text>
    </Chart>
  );
}
