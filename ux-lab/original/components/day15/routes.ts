import type { Level, SectionId } from '@/original/components/day15/state/ModuleStore'

export interface NavEntry {
  id: SectionId
  path: string
  label: string
  sub: string
  level: Level | 'L1→L2'
  tone: 'signal' | 'valid' | 'warn' | 'risk' | 'neuro'
  /** Shown in the sidebar as the estimated time on task. */
  minutes: number
}

export interface NavGroup {
  key: string
  label: string
  hubPath?: string
  entries: NavEntry[]
}

export const NAV: NavGroup[] = [
  {
    key: 'learn',
    label: 'Learning material',
    hubPath: '/learn',
    entries: [
      {
        id: 'foundations',
        path: '/learn/foundations',
        label: 'Foundations',
        sub: 'What eye-tracking measures',
        level: 'L1',
        tone: 'signal',
        minutes: 8,
      },
      {
        id: 'limits',
        path: '/learn/limits',
        label: 'Method limits',
        sub: 'Gaze ≠ understanding',
        level: 'L1',
        tone: 'warn',
        minutes: 10,
      },
      {
        id: 'neuro',
        path: '/learn/neuro',
        label: 'Neurofeedback & BCI',
        sub: 'Maturity, not magic',
        level: 'L2',
        tone: 'neuro',
        minutes: 9,
      },
      {
        id: 'ethics',
        path: '/learn/ethics',
        label: 'Ethics & data protection',
        sub: 'Consent, voluntariness, trust',
        level: 'L2',
        tone: 'risk',
        minutes: 9,
      },
      {
        id: 'leadership',
        path: '/learn/leadership',
        label: 'Decision architecture',
        sub: "The leader's role",
        level: 'L3',
        tone: 'valid',
        minutes: 8,
      },
    ],
  },
  {
    key: 'play',
    label: 'Decision playgrounds',
    hubPath: '/play',
    entries: [
      {
        id: 'focussense',
        path: '/play/focussense',
        label: 'FocusSense',
        sub: 'Data vs. insight',
        level: 'L1→L2',
        tone: 'signal',
        minutes: 12,
      },
      {
        id: 'learningpulse',
        path: '/play/learningpulse',
        label: 'LearningPulse',
        sub: 'Trade-off simulator',
        level: 'L2',
        tone: 'warn',
        minutes: 15,
      },
      {
        id: 'visionmind',
        path: '/play/visionmind',
        label: 'VisionMind Lab',
        sub: 'Governance architect',
        level: 'L3',
        tone: 'neuro',
        minutes: 20,
      },
    ],
  },
  {
    key: 'close',
    label: 'Synthesis',
    entries: [
      {
        id: 'debrief',
        path: '/debrief',
        label: 'Debrief',
        sub: 'Your decision profile',
        level: 'L3',
        tone: 'valid',
        minutes: 10,
      },
    ],
  },
]

export const ALL_ENTRIES: NavEntry[] = NAV.flatMap((g) => g.entries)

export function entryForPath(pathname: string): NavEntry | undefined {
  return ALL_ENTRIES.find((e) => pathname.startsWith(e.path))
}

/** The next thing to do, used by the sticky "Continue →" bar. */
export function nextAfter(pathname: string): NavEntry | undefined {
  const i = ALL_ENTRIES.findIndex((e) => pathname.startsWith(e.path))
  return i >= 0 ? ALL_ENTRIES[i + 1] : ALL_ENTRIES[0]
}

export function levelForPath(pathname: string): Level | 'L1→L2' | null {
  if (pathname === '/') return null
  if (pathname === '/learn') return 'L1'
  if (pathname === '/play') return 'L2'
  return entryForPath(pathname)?.level ?? null
}
