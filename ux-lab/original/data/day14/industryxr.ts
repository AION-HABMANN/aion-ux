/**
 * FROZEN CASE TEXT — Task 3. Identical for every learner on every load.
 * Hotspot panels carry neutral factual description only: no verdicts, no
 * categories, no risk ratings, no recommendations.
 */

export const INDUSTRYXR_INTRO =
  'An industrial company plans to develop its training, maintenance, and support processes further through immersive technologies. Under discussion are AR instructions, VR training environments, and neuroscience-informed UX concepts for better attention guidance. Internally there is enthusiasm for the technology; at the same time, robust experience regarding acceptance, economic viability, and embedding into existing processes is missing.';

export const INDUSTRYXR_PROBLEMS = [
  'It is unclear which use cases genuinely offer immersive added value.',
  'Individual pilot ideas are technically exciting but hardly prioritised by impact and benefit.',
  'Different stakeholders pursue diverging goals across innovation, safety, efficiency, and cost control.',
  'Usage risks such as overload, technical disruptions, and acceptance problems have not yet been sufficiently assessed.',
  'The connection between technical fascination and strategic relevance is unclear.',
  'There is no robust roadmap yet for introduction, testing, and scaling.',
] as const;

export const INDUSTRYXR_CONDITIONS = [
  'Budget: EUR 220,000 for the first phase',
  'Implementation time: 16 weeks for piloting and decision preparation',
  'Full technological integration is not achievable in the short term',
  'Several business units want to be involved',
  'Data from real usage tests is barely available',
  'First visible innovation steps are expected by management',
] as const;

export type IndustryHotspot = {
  id: string;
  name: string;
  /** Scene coordinates for the Three.js build. */
  world: [number, number, number];
  /** Percentage coordinates on the static fallback image (content parity). */
  fallback: { left: number; top: number };
  description: string[];
};

export const INDUSTRYXR_HOTSPOTS: IndustryHotspot[] = [
  {
    id: 'ar-instruction',
    name: 'AR instruction station',
    world: [-3.2, 2.05, -1.5],
    fallback: { left: 18.5, top: 44 },
    description: [
      'A workbench position where AR instructions are under discussion for maintenance and support steps.',
      'The station belongs to the existing training, maintenance, and support processes the company plans to develop further.',
      'Robust experience regarding acceptance and embedding into existing processes is missing here.',
    ],
  },
  {
    id: 'vr-training',
    name: 'VR training station',
    world: [-0.9, 1.35, -0.6],
    fallback: { left: 44.3, top: 44 },
    description: [
      'A marked floor area reserved for VR training environments, one of the technologies under discussion.',
      'Data from real usage tests is barely available for this station.',
      'Neuroscience-informed UX concepts for better attention guidance are also under discussion for this kind of training.',
    ],
  },
  {
    id: 'remote-support',
    name: 'Remote support corner',
    world: [1.65, 2.0, -1.35],
    fallback: { left: 67.2, top: 46 },
    description: [
      'A corner set up for support processes that connect an on-site worker with colleagues elsewhere.',
      'Several business units want to be involved in how this corner is used.',
      'Internally there is enthusiasm for the technology used here.',
    ],
  },
  {
    id: 'legacy-zone',
    name: 'Not-yet-integrated area (legacy process zone)',
    world: [3.95, 2.3, -1.6],
    fallback: { left: 88, top: 43 },
    description: [
      'An area still running the existing process without immersive technology.',
      'Full technological integration is not achievable in the short term.',
      'There is no robust roadmap yet for introduction, testing, and scaling that would cover this area.',
    ],
  },
];

/** The six-part work assignment, ticked for the learner's own orientation only. */
export const INDUSTRYXR_ASSIGNMENT = [
  'Analyse the initial situation and the observed problems.',
  'Assess which use cases plausibly carry immersive added value.',
  'Weigh the diverging stakeholder goals against one another.',
  'Assess the usage risks named in the case.',
  'Relate technical fascination to strategic relevance.',
  'Outline a roadmap for introduction, testing, and scaling.',
] as const;

export const INDUSTRYXR_WORKSHEET_NOTE = 'Record your analysis in Worksheet 3.';
