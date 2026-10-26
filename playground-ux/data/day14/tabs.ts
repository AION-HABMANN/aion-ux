export const TABS = [
  { id: 'learn', label: 'Learn' },
  { id: 'training', label: 'Training Ground' },
  { id: 'buildvision', label: 'BuildVision' },
  { id: 'healthspace', label: 'HealthSpace' },
  { id: 'industryxr', label: 'IndustryXR' },
  { id: 'transfer', label: 'Transfer Project' },
  { id: 'taskmap', label: 'Task Map' },
] as const;

export type TabId = (typeof TABS)[number]['id'];

export const MODULE_TITLE = 'Module 7 · Day 1 of 3';
export const MODULE_SUBTITLE = 'Immersive Technologies & Neuroscience UX Foundations';

export const TASK_MAP_ROWS = [
  {
    task: 'Worksheet 1',
    level: 'L1',
    tab: 'buildvision' as const,
    tabLabel: 'BuildVision',
    support: 'L1 widgets 1, 2, 4, 5',
  },
  {
    task: 'Worksheet 2',
    level: 'L1',
    tab: 'healthspace' as const,
    tabLabel: 'HealthSpace',
    support: 'L1 widget 3 · L2 widgets 6, 7',
  },
  {
    task: 'Task 3',
    level: 'L2',
    tab: 'industryxr' as const,
    tabLabel: 'IndustryXR',
    support: 'L2 widgets 6, 7 · L1 widget 4',
  },
  {
    task: 'Task 4',
    level: 'L3',
    tab: 'transfer' as const,
    tabLabel: 'Transfer Project',
    support: 'L3 widgets 8, 9, 10',
  },
] as const;

export const TASK_MAP_NOTE =
  'Practice freely in the Training Ground — it uses different examples and never reveals case answers.';
