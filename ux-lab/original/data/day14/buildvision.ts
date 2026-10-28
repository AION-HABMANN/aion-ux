/**
 * FROZEN CASE TEXT — Task 1. Identical for every learner on every load.
 * Do not edit, extend, reorder, annotate, or add commentary.
 */

export const BUILDVISION_INTRO =
  'BuildVision is a fictional platform for planning, training, and remote support in technical service.';

export const BUILDVISION_POINTS = [
  'Employees can see maintenance steps as AR overlays directly on the device.',
  'Complex procedures are visualised spatially instead of being presented as a PDF or a checklist.',
  'A support mode allows remote guidance by experts.',
  'Initial tests show that users are impressed, but in stressful situations they sometimes react in an overwhelmed way.',
  'The technology is powerful, but not stably available in all deployment environments.',
  'Some use cases seem genuinely useful, others appear more demonstrative than truly helpful.',
] as const;

/**
 * Neutral, descriptive overlay labels for the 3D viewer. These describe what is
 * on the device only. They never judge, score, categorise, or hint at which
 * points are value versus overload.
 */
export const BUILDVISION_HOTSPOTS = [
  {
    id: 'bv-hs-1',
    slot: 'hotspot-display',
    position: '0 1.42 0.34',
    normal: '0 0 1',
    step: 'Step 1',
    label: 'Status display',
    detail: 'Operating state and current service mode are shown here.',
  },
  {
    id: 'bv-hs-2',
    slot: 'hotspot-hatch',
    position: '0 0.74 0.32',
    normal: '0 0 1',
    step: 'Step 2',
    label: 'Service hatch',
    detail: 'The hatch opens to the replaceable module behind the front plate.',
  },
  {
    id: 'bv-hs-3',
    slot: 'hotspot-valves',
    position: '-0.19 0.34 0.36',
    normal: '0 0 1',
    step: 'Step 3',
    label: 'Shut-off valves',
    detail: 'Two valves control the supply lines to the lower assembly.',
  },
  {
    id: 'bv-hs-4',
    slot: 'hotspot-pipe',
    position: '0.46 1.1 -0.05',
    normal: '1 0 0',
    step: 'Step 4',
    label: 'Side line connector',
    detail: 'The external line connects at the fitting on the right-hand side.',
  },
] as const;

/** The same four steps as flat text, exactly as a PDF checklist would present them. */
export const BUILDVISION_CHECKLIST = [
  'Step 1 — Status display: operating state and current service mode are shown here.',
  'Step 2 — Service hatch: the hatch opens to the replaceable module behind the front plate.',
  'Step 3 — Shut-off valves: two valves control the supply lines to the lower assembly.',
  'Step 4 — Side line connector: the external line connects at the fitting on the right-hand side.',
] as const;

export const BUILDVISION_SUPPORT_MODE_LABEL = 'Remote expert connected';
export const BUILDVISION_SUPPORT_MODE_DETAIL =
  'A remote expert sees the same view and can point at the device while the technician works.';

export const BUILDVISION_WORKSHEET_NOTE = 'Record your analysis in Worksheet 1.';
