'use client';

import { motion } from '@/original/lib/day9/motion-lite';
import { ChevronUp, Search, Volume2, VolumeX, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { copy, fmt } from '@/original/data/day9/copy';
import { DUR, EASE } from '@/original/lib/day9/motion';
import { levelDef, levelProgress, nextLevelDef } from '@/original/lib/day9/progression';
import { useStore } from '@/original/lib/day9/store';
import { useMotionSafe } from '@/original/lib/day9/use-motion-safe';
import { useInspector } from '@/original/components/day9/inspector/InspectorProvider';
import { Inspectable } from '@/original/components/day9/inspector/InspectorTag';
import { Gauge } from './Gauge';
import { cx } from '@/original/components/day9/ui';

/**
 * SIGNATURE ELEMENT (§4).
 * 64px on desktop, collapsible to 44px on mobile, present on every page.
 * This is the only place in the app allowed to be visually bold.
 */
export function MotivationConsole() {
  const { reduced, transition } = useMotionSafe();
  const hydrated = useStore((s) => s.hydrated);
  const xp = useStore((s) => s.progression.xp);
  const level = useStore((s) => s.progression.level);
  const streak = useStore((s) => s.progression.streak);
  const gauges = useStore((s) => s.gauges);
  const override = useStore((s) => s.gaugeOverride);
  const soundOn = useStore((s) => s.settings.sound);
  const toggleSound = useStore((s) => s.toggleSound);
  const { enabled: inspectorOn, toggle: toggleInspector } = useInspector();

  const [expanded, setExpanded] = useState(false);

  // On re-entry the gauges animate up from zero rather than appearing (§5.3 #23).
  const shown = override ?? gauges;

  const def = levelDef(level);
  const next = nextLevelDef(level);
  const pct = levelProgress(xp);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.style.setProperty('--console-h', expanded ? '148px' : '64px');
  }, [expanded]);

  return (
    <motion.aside
      aria-label={copy.console.label}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-black/40 bg-console text-console-fg no-print"
      initial={reduced ? { opacity: 0 } : { y: 72 }}
      animate={reduced ? { opacity: 1 } : { y: 0 }}
      transition={reduced ? { duration: 0.15 } : { duration: 0.48, ease: EASE.out as number[] }}
    >
      <div className="mx-auto flex max-w-7xl flex-col px-4">
        {/* Primary strip — 64px */}
        <div className="flex h-16 items-center gap-4">
          {/* Level + XP */}
          <Inspectable mechanicId="levels" className="shrink-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-console-fg/70">
              {copy.console.levelPrefix} {def.level}
            </p>
            <p className="font-display text-16 leading-none text-white">{def.title}</p>
          </Inspectable>

          <Inspectable mechanicId="points" className="hidden min-w-0 flex-1 sm:block">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-full max-w-[180px] overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'var(--activation)' }}
                  initial={false}
                  animate={{ width: `${pct * 100}%` }}
                  transition={transition(DUR.fill)}
                />
              </div>
              <p className="whitespace-nowrap font-mono text-12 tabular-nums text-console-fg">
                {hydrated ? xp.toLocaleString('en-GB') : '0'} {copy.console.xpSuffix}
              </p>
            </div>
            <p className="mt-0.5 truncate font-mono text-[10px] text-console-fg/60">
              {next
                ? fmt(copy.console.toNext, { n: (next.xp - xp).toLocaleString('en-GB'), title: next.title })
                : copy.console.atCeiling}
            </p>
          </Inspectable>

          {/* Gauges — desktop */}
          <div className="hidden items-center gap-5 lg:flex">
            <Inspectable mechanicId="visible-progress">
              <div className="flex items-center gap-5">
                <Gauge value={shown.motivation} label={copy.console.motivation} accent="var(--activation)" />
                <Gauge value={shown.credibility} label={copy.console.credibility} accent="var(--integrity)" />
                <Gauge value={shown.progress} label={copy.console.progressGauge} accent="var(--console-fg)" />
              </div>
            </Inspectable>
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <Inspectable mechanicId="streaks" placement="top-left" className="hidden sm:block">
              <span className="flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 font-mono text-[11px] text-console-fg">
                <Zap size={12} style={{ color: 'var(--activation)' }} aria-hidden />
                {streak.days > 0 ? fmt(copy.streak.label, { n: streak.days }) : copy.streak.none}
              </span>
            </Inspectable>

            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={soundOn}
              title={copy.console.sound}
              className="rounded p-2 text-console-fg/70 hover:bg-white/10 hover:text-console-fg"
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="sr-only">{copy.console.sound}</span>
            </button>

            <button
              type="button"
              onClick={toggleInspector}
              aria-pressed={inspectorOn}
              className={cx(
                'flex items-center gap-1.5 rounded border px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors',
                inspectorOn ? 'text-white' : 'border-white/20 text-console-fg/80 hover:text-console-fg'
              )}
              style={inspectorOn ? { borderColor: 'var(--inspect)', background: 'var(--inspect)' } : undefined}
            >
              <Search size={12} aria-hidden />
              {copy.console.inspector}
            </button>

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="rounded p-2 text-console-fg/70 hover:bg-white/10 hover:text-console-fg lg:hidden"
            >
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={transition(DUR.micro)}>
                <ChevronUp size={16} />
              </motion.span>
              <span className="sr-only">
                {expanded ? copy.console.collapse : copy.console.expand}
              </span>
            </button>
          </div>
        </div>

        {/* Expanded gauge tray — mobile */}
        {expanded ? (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            transition={transition(DUR.base)}
            className="flex flex-wrap items-center gap-6 border-t border-white/10 py-3 lg:hidden"
          >
            <Gauge value={shown.motivation} label={copy.console.motivation} accent="var(--activation)" />
            <Gauge value={shown.credibility} label={copy.console.credibility} accent="var(--integrity)" />
            <Gauge value={shown.progress} label={copy.console.progressGauge} accent="var(--console-fg)" />
          </motion.div>
        ) : null}
      </div>
    </motion.aside>
  );
}
