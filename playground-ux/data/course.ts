/**
 * The sixteen days of the AION UX class (psychological UX and neuro-design).
 * Source: the Strukturplan, sheet "hanya kurikulum Strukturplan_DE_EN_ID"
 * (see ../PLAN-MAP.md). Topics are shortened and translated here.
 *
 * `built` days live in this project under /day/{n}/. A day not built yet keeps
 * its place; days 10 to 16 point to the separate repository they come from
 * until they are migrated.
 */

export interface PlanCases {
  /** Arbeitsauftrag 1, Arbeitsauftrag 2, Fallstudie (the plan's own names). */
  task1: string;
  task2: string;
  caseStudy: string;
}

export interface LegacyLink {
  /** The old repository, if the day came from one. A day built fresh has none. */
  repo?: string;
  /** A day built fresh in its own project (folder next to this one), until it is merged into this project. */
  fresh?: string;
  /** The current site of the day, shown on the day's page until the day is migrated. */
  demo?: string;
  more?: { label: string; url: string }[];
  /** The day's folder in Drive (worksheets, answer keys, slides). */
  drive?: string;
  effort?: 'small' | 'medium' | 'large';
  /** One sentence for the reviewer. Details: legacy/dayN/MIGRATION.md. */
  note?: string;
}

export interface CourseDay {
  n: number;
  module: number;
  /** "1 of 3": the day's place inside its module. */
  part: string;
  title: string;
  topic: string;
  cases?: PlanCases;
  built: boolean;
  legacy?: LegacyLink;
}

const ORG = 'https://github.com/AION-HABMANN';

/**
 * Days 1 to 8 are built in the Neuro-UX Lab (aion-ux/ux-lab, port 3400), on the Digital Learning engine. Set NEXT_PUBLIC_UX_LAB_URL to its address when it is
 * deployed. A day links there once it is built.
 */
const LAB_URL = (process.env.NEXT_PUBLIC_UX_LAB_URL ?? 'http://localhost:3400/').replace(/\/?$/, '/');
const lab = (n: number): LegacyLink => ({
  fresh: 'aion-ux/ux-lab',
  demo: `${LAB_URL}day/${n}/`,
  note: 'To see it here, start it first: npm --prefix aion-ux/ux-lab run dev (port 3400).',
});

export const DAYS: CourseDay[] = [
  {
    n: 1, module: 1, part: '1 of 1', title: 'Psychological UX and neuro-design',
    topic: 'Introduction to psychological UX design; neural basics of visual perception; overview of neuro-design in the interface',
    cases: { task1: 'CarePath', task2: 'SkillFlow', caseStudy: 'SafeHome Online' },
    built: false,
    legacy: lab(1),
  },
  { n: 2, module: 2, part: '1 of 2', title: 'Visual perception and colour', topic: 'Foundations of visual perception in interface design; colour psychology and strategic use of colour', cases: { task1: 'CityDesk', task2: 'EduFlex', caseStudy: 'CampusNow' }, built: false, legacy: lab(2) },
  { n: 3, module: 2, part: '2 of 2', title: 'Typography and layout', topic: 'Typography for readability and UX; design principles and layout optimisation; practice integration', cases: { task1: 'TravelEase', task2: 'HealthConnect', caseStudy: 'SecureLife' }, built: false, legacy: lab(3) },
  { n: 4, module: 3, part: '1 of 3', title: 'UX laws and cognition', topic: 'Foundations of UX laws and cognitive perception: Fitts\'s law, Hick\'s law, Miller\'s rule', cases: { task1: 'ServicePoint', task2: 'WorkFlow Hub', caseStudy: 'MyEnergy' }, built: false, legacy: lab(4) },
  { n: 5, module: 3, part: '2 of 3', title: 'Gestalt and hierarchy', topic: 'Gestalt laws and visual hierarchy; cognitive load and progressive disclosure', cases: { task1: 'BankDirect', task2: 'AdminFlow', caseStudy: 'MoveEasy' }, built: false, legacy: lab(5) },
  { n: 6, module: 3, part: '3 of 3', title: 'UX laws in design systems', topic: 'Integration and evaluation of UX laws in design systems', cases: { task1: 'OfficeSphere', task2: 'CareAssist', caseStudy: 'CitizenFlow' }, built: false, legacy: lab(6) },
  { n: 7, module: 4, part: '1 of 3', title: 'Emotional bonding', topic: 'Foundations of emotional bonding in design; psychology and neuro-design', cases: { task1: 'WellTrack', task2: 'CareerPath', caseStudy: 'LifeSupport' }, built: false, legacy: lab(7) },
  { n: 8, module: 4, part: '2 of 3', title: 'Storytelling', topic: 'Storytelling in UX/UI design; narrative user experiences', built: false },
  {
    n: 9, module: 4, part: '3 of 3', title: 'Gamification',
    topic: 'Gamification strategies; integration of storytelling and gamification',
    cases: { task1: 'SkillRise', task2: 'HealthJourney', caseStudy: 'MoveWell' },
    built: true,
  },
  {
    n: 10, module: 5, part: '1 of 2', title: 'Intelligent interfaces',
    topic: 'Foundations of intelligent interfaces and AI-assisted interaction; voice user interface design',
    cases: { task1: 'SmartAssist', task2: 'CareerNavigator', caseStudy: 'CareGuide' },
    built: true,
    legacy: { repo: `${ORG}/aion-ux-day10-intelligent-interfaces`, demo: '/legacy/day10/companion.html', more: [{ label: 'Original Claude artifact', url: 'https://claude.ai/public/artifacts/61147ebd-56cb-489f-a3c9-bc48a910abe1' }], drive: 'https://drive.google.com/drive/folders/1ZFQZSf5Fh0U4_4NKaslxTM-rUeTBrDAp', effort: 'large', note: 'No application yet: one companion page and four worksheets on real AI tools. To be rebuilt on the plan’s cases.' },
  },
  {
    n: 11, module: 5, part: '2 of 2', title: 'Voice and adaptive journeys',
    topic: 'Adaptive user journeys and personalised experiences; neuro-design for intelligent interfaces; prototyping and testing of AI interfaces',
    cases: { task1: 'HomeAssist Voice', task2: 'CareVoice', caseStudy: 'CityHelp Voice' },
    built: true,
    legacy: { repo: `${ORG}/aion-ux-day11-ui-voice`, demo: 'https://aion-uiux-day11-ui-voice.netlify.app/', drive: 'https://drive.google.com/drive/folders/11kRvte7FSvxZ_B8x8oTH65ELn6Gz3NRj', effort: 'small', note: 'CityHelp Voice in six stops. Closest to the target stack; the plan’s HomeAssist and CareVoice screens are missing.' },
  },
  {
    n: 12, module: 6, part: '1 of 2', title: 'Accessibility and neurodiversity',
    topic: 'Accessibility and accessibility standards; neurodiversity (ADHD, autism, dyslexia)',
    cases: { task1: 'PublicAccess', task2: 'LearnAccess', caseStudy: 'CitizenConnect' },
    built: true,
    legacy: { repo: `${ORG}/aion-ux-day12-accessibility-neurodiversity`, demo: 'https://storied-duckanoo-da5583.netlify.app', more: [{ label: 'CitizenConnect portal (case study site)', url: 'https://poetic-sprite-62cb39.netlify.app' }], drive: 'https://drive.google.com/drive/folders/1-kaAEtE7zWyuo6Cw_rY0oX7MF_Ry5GTQ', effort: 'medium', note: 'One page with 13 widgets, a Training Ground and three cases; no export or transfer block yet.' },
  },
  {
    n: 13, module: 6, part: '2 of 2', title: 'Inclusive design patterns',
    topic: 'Inclusive design patterns; assistive technology and integration; practice project (start)',
    cases: { task1: 'StudyPath', task2: 'JobAccess', caseStudy: 'LifeGuide' },
    built: true,
    legacy: { repo: `${ORG}/aion-ux-day13-inclusive-design-patterns`, demo: 'https://aion-ux-day-13-inclusive-design-pat.vercel.app', drive: 'https://drive.google.com/drive/folders/12zDlV0iVsbTPtEJxR0eFsS0heSz9_spY', effort: 'small', note: 'One page: learn levels, Training Ground, four cases. Already on Next 14.' },
  },
  {
    n: 14, module: 7, part: '1 of 3', title: 'Immersive technologies',
    topic: 'Introduction to immersive technologies; neuroscience foundations of UX',
    cases: { task1: 'BuildVision', task2: 'HealthSpace', caseStudy: 'IndustryXR' },
    built: true,
    legacy: { repo: `${ORG}/aion-ux-day14-immersive-tech-neuroscience`, demo: 'https://aion-ux-day14.vercel.app', drive: 'https://drive.google.com/drive/folders/1NsWv-CLRGDFmHPDmMrHA5S2yn12tMFpY', effort: 'large', note: 'Ten widgets and three cases with 3D scenes (three.js, model-viewer). Needs a fallback for every scene.' },
  },
  {
    n: 15, module: 7, part: '2 of 3', title: 'Eye-tracking, neurofeedback and BCI',
    topic: 'Eye-tracking and gaze behaviour; neurofeedback and brain-computer interfaces',
    cases: { task1: 'FocusSense', task2: 'LearningPulse', caseStudy: 'VisionMind Lab' },
    built: true,
    legacy: { repo: `${ORG}/aion-ux-day15-tracking`, demo: 'https://aion-ux-day15-tracking.vercel.app', drive: 'https://drive.google.com/drive/folders/11Apb277KIIQRxCiTrbLR15Bd3V5JVJK5', effort: 'large', note: 'A Vite app with React Router; has to become Next.js routes. Worksheets Task 2 to 4 are missing in Drive.' },
  },
  {
    n: 16, module: 7, part: '3 of 3', title: 'Immersive prototyping, strategy and ethics',
    topic: 'Immersive prototyping and testing; future strategies and ethical aspects',
    cases: { task1: 'RealityFlow', task2: 'FutureInteraction Hub', caseStudy: 'NextWorld UX' },
    built: true,
    legacy: { repo: `${ORG}/aion-ux-day16-immersive-prototyping`, demo: 'https://aion-ux-day16-immersive-prototyping.vercel.app', drive: 'https://drive.google.com/drive/folders/1rwS3pUdZdW128xzxl_cAa73dG3zdnBfF', effort: 'medium', note: 'Ladder, Test Bench, Portfolio Room and NextWorld UX. 11 of 23 plan items covered.' },
  },
];

export const dayByNumber = (n: number): CourseDay | undefined => DAYS.find((d) => d.n === n);
export const builtDays = (): CourseDay[] => DAYS.filter((d) => d.built);
export const dayHome = (n: number): string => `/day/${n}/`;
