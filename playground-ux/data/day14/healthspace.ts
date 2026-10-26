/**
 * FROZEN CASE TEXT — Task 2. Identical for every learner on every load.
 * No recommended variant. No "best" option marked anywhere.
 */

export const HEALTHSPACE_INTRO =
  'Three innovation approaches for a platform "HealthSpace" in the health and prevention sector.';

export const HEALTHSPACE_VARIANTS = [
  {
    id: 'A',
    title: 'Variant A',
    summary: 'Strongly immersive application',
    description:
      'strongly immersive application with AR and VR components for consultation, training, and motivation, but high technical and organisational effort.',
  },
  {
    id: 'B',
    title: 'Variant B',
    summary: 'Targeted use of individual immersive elements',
    description:
      'targeted use of individual immersive elements for clearly defined situations, with strong practical relevance and controllable scope.',
  },
  {
    id: 'C',
    title: 'Variant C',
    summary: 'Classic UX with technology monitoring',
    description:
      'for now classic UX with only preparatory technology monitoring and later piloting.',
  },
] as const;

export const HEALTHSPACE_CONDITIONS = [
  'The company wants to act innovatively, but also trustworthily and economically.',
  'The budget for future projects is limited.',
  'The target group is heterogeneous and not consistently tech-affine.',
  'A release of first pilot solutions is possible in 6 months.',
  'There is still hardly any real user data on immersive formats.',
  'Management demands visible innovation signals; specialist departments demand robust added value.',
] as const;

export const HEALTHSPACE_WORKSHEET_NOTE = 'Record your analysis in Worksheet 2.';
