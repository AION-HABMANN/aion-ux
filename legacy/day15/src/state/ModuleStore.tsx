import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

/**
 * The one piece of shared state in the app.
 *
 * Playgrounds keep their own working state in their own contexts — this store
 * only holds (a) section progress for the sidebar rings and (b) the *outputs*
 * each playground publishes, because /debrief has to synthesise across all
 * three. In-memory only, by design: nothing here survives a reload, and
 * nothing leaves the browser.
 */

export type SectionId =
  | 'foundations'
  | 'limits'
  | 'neuro'
  | 'ethics'
  | 'leadership'
  | 'focussense'
  | 'learningpulse'
  | 'visionmind'
  | 'debrief'

export type Level = 'L1' | 'L2' | 'L3'

export interface FocusSenseResult {
  trustBefore: number | null
  trustAfter: number | null
  sorted: Record<string, 'knowledge' | 'overextension'>
  tags: Record<string, string[]>
  statements: { truth: string; misread: string; before: string }
  opportunities: string[]
  risks: string[]
  completed: boolean
}

export interface LearningPulseResult {
  variant: 'A' | 'B' | 'C' | null
  variantLabel: string
  budgetSplit: number // 0 = all research, 100 = all piloting
  parallelism: number // 0 = fully sequential, 100 = fully parallel
  meters: Record<string, number>
  justification: string
  conflicts: { claim: string; visibility: string; residual: string }
  recommendation: string
  completed: boolean
}

export interface VisionMindResult {
  diagnosis: Record<string, string[]>
  budget: Record<string, number> // measure id -> chips
  weeks: Record<string, number> // measure id -> week blocks
  schedule: Record<string, { start: number; length: number }>
  justifications: Record<string, string[]>
  meters: Record<string, number>
  decision: string | null
  decisionLabel: string
  recommendation: string
  completed: boolean
}

export interface DebriefResult {
  reflections: { measurability: string; sensible: string; ethicsLine: string }
  postponed: string
  learnerName: string
}

interface ModuleState {
  progress: Record<SectionId, number>
  setProgress: (id: SectionId, value: number) => void
  visited: (id: SectionId) => void
  focusSense: FocusSenseResult
  setFocusSense: (patch: Partial<FocusSenseResult>) => void
  learningPulse: LearningPulseResult
  setLearningPulse: (patch: Partial<LearningPulseResult>) => void
  visionMind: VisionMindResult
  setVisionMind: (patch: Partial<VisionMindResult>) => void
  debrief: DebriefResult
  setDebrief: (patch: Partial<DebriefResult>) => void
  overallProgress: number
}

const SECTION_IDS: SectionId[] = [
  'foundations',
  'limits',
  'neuro',
  'ethics',
  'leadership',
  'focussense',
  'learningpulse',
  'visionmind',
  'debrief',
]

const emptyProgress = SECTION_IDS.reduce(
  (acc, id) => ({ ...acc, [id]: 0 }),
  {} as Record<SectionId, number>,
)

const initialFocusSense: FocusSenseResult = {
  trustBefore: null,
  trustAfter: null,
  sorted: {},
  tags: {},
  statements: { truth: '', misread: '', before: '' },
  opportunities: [],
  risks: [],
  completed: false,
}

const initialLearningPulse: LearningPulseResult = {
  variant: null,
  variantLabel: '',
  budgetSplit: 50,
  parallelism: 40,
  meters: {},
  justification: '',
  conflicts: { claim: '', visibility: '', residual: '' },
  recommendation: '',
  completed: false,
}

const initialVisionMind: VisionMindResult = {
  diagnosis: {},
  budget: {},
  weeks: {},
  schedule: {},
  justifications: {},
  meters: {},
  decision: null,
  decisionLabel: '',
  recommendation: '',
  completed: false,
}

const initialDebrief: DebriefResult = {
  reflections: { measurability: '', sensible: '', ethicsLine: '' },
  postponed: '',
  learnerName: '',
}

const Ctx = createContext<ModuleState | null>(null)

export function ModuleStoreProvider({ children }: { children: ReactNode }) {
  const [progress, setProgressMap] = useState<Record<SectionId, number>>(emptyProgress)
  const [focusSense, setFocusSenseState] = useState<FocusSenseResult>(initialFocusSense)
  const [learningPulse, setLearningPulseState] = useState<LearningPulseResult>(initialLearningPulse)
  const [visionMind, setVisionMindState] = useState<VisionMindResult>(initialVisionMind)
  const [debrief, setDebriefState] = useState<DebriefResult>(initialDebrief)

  // Progress only ever moves forward — backtracking to re-read a page should
  // never look like losing ground.
  const setProgress = useCallback((id: SectionId, value: number) => {
    setProgressMap((prev) => (prev[id] >= value ? prev : { ...prev, [id]: Math.min(1, value) }))
  }, [])

  const visited = useCallback(
    (id: SectionId) => setProgress(id, Math.max(0.12, 0)),
    [setProgress],
  )

  const setFocusSense = useCallback(
    (patch: Partial<FocusSenseResult>) => setFocusSenseState((p) => ({ ...p, ...patch })),
    [],
  )
  const setLearningPulse = useCallback(
    (patch: Partial<LearningPulseResult>) => setLearningPulseState((p) => ({ ...p, ...patch })),
    [],
  )
  const setVisionMind = useCallback(
    (patch: Partial<VisionMindResult>) => setVisionMindState((p) => ({ ...p, ...patch })),
    [],
  )
  const setDebrief = useCallback(
    (patch: Partial<DebriefResult>) => setDebriefState((p) => ({ ...p, ...patch })),
    [],
  )

  const overallProgress = useMemo(
    () => SECTION_IDS.reduce((sum, id) => sum + progress[id], 0) / SECTION_IDS.length,
    [progress],
  )

  const value = useMemo<ModuleState>(
    () => ({
      progress,
      setProgress,
      visited,
      focusSense,
      setFocusSense,
      learningPulse,
      setLearningPulse,
      visionMind,
      setVisionMind,
      debrief,
      setDebrief,
      overallProgress,
    }),
    [
      progress,
      setProgress,
      visited,
      focusSense,
      setFocusSense,
      learningPulse,
      setLearningPulse,
      visionMind,
      setVisionMind,
      debrief,
      setDebrief,
      overallProgress,
    ],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useModule(): ModuleState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useModule must be used inside <ModuleStoreProvider>')
  return ctx
}
