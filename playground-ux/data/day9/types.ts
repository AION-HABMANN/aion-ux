/** CONTENT_PACK §1 — type definitions for all learning content. */

export type Level = 1 | 2 | 3;

export type Category =
  | 'motivation'
  | 'progress'
  | 'recognition'
  | 'feedback'
  | 'retention'
  | 'self-efficacy';

export type MotivationLever =
  | 'competence'
  | 'autonomy'
  | 'relatedness'
  | 'progress-experience'
  | 'social-validation'
  | 'reward'
  | 'activation-trigger'
  | 'narrative-meaning'
  | 'loss-aversion'
  | 'recognition';

export type Domain = 'health' | 'finance' | 'corporate-learning' | 'public-service';

export type DomainVerdict = 'ship' | 'conditional' | 'do-not';

export type CaseId = 'skillrise' | 'healthjourney' | 'movewell';
export type SupportTarget = CaseId | 'capstone';

export interface SelfCheckOption {
  id: string;
  label: string;
  correct: boolean;
  /** Shown after selection. Never generic. Explains WHY, not just right/wrong. */
  feedback: string;
}

export interface SelfCheck {
  id: string;
  question: string;
  options: SelfCheckOption[];
  /** Shown only after a wrong answer, points back into the page. */
  hint: string;
}

export interface Concept {
  slug: string;
  order: number;
  eyebrow: string;
  title: string;
  deck: string;
  level: Level;
  curriculumRef: string;
  hook: string;
  coreIdea: string;
  mechanism: string[];
  /** Spec for the inline diagram. Built as SVG, never as an image. */
  diagram: { kind: string; spec: string };
  /** Column headings differ per module (e.g. "When the risk is low"). */
  worksLabel: string;
  backfiresLabel: string;
  whenItWorks: string[];
  whenItBackfires: string[];
  seriousDomain: { title: string; body: string };
  demo: { component: string; brief: string; insight: string };
  selfChecks: SelfCheck[];
  /** Goes into the "You can now…" card. A capability, not a completion. */
  canNow: string;
  supports: SupportTarget[];
  /** Mechanic IDs this page tags when the Inspector is on. */
  inspectorTags: string[];
  /** Module 05 hosts the Dark Pattern Mode toggle. */
  hostsDarkPatternToggle?: boolean;
  /** Module 10 pre-fills capstone section 5. */
  prefillsCapstoneSection?: number;
}

export interface Mechanic {
  id: string;
  name: string;
  levers: MotivationLever[];
  whyItWorks: string;
  riskIfOverused: string;
  fits: Domain[];
  doesntFit: Domain[];
  /** Routes / components in this app where the mechanic appears. */
  seenIn: string[];
  /** The Module 05 plain-language test. */
  survivesExplanation: boolean;
  survivesNote?: string;
}

/** The six diagnostic categories used across SkillRise and MoveWell. */
export interface CategoryDef {
  id: Category;
  label: string;
  question: string;
  tone: 'activation' | 'integrity';
}
