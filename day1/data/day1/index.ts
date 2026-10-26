import { BLOCK_1_1, BLOCK_1_2, BLOCK_2_1 } from './route1';
import { BLOCK_3_1 } from './route2';
import type { Block, Item } from './types';

export * from './types';
export { CARDS, cardById, cardsOf } from './materials';
export { DAY, INTRO, ROUTES, FACILITATOR, AGENDA } from './day';
export { GLOSSARY } from './glossary';

export const ROUTE_BLOCKS: Record<1 | 2, Block[]> = { 1: [BLOCK_1_1, BLOCK_1_2, BLOCK_2_1], 2: [BLOCK_3_1] };
export const BLOCKS: Block[] = [...ROUTE_BLOCKS[1], ...ROUTE_BLOCKS[2]];
export const blockById = Object.fromEntries(BLOCKS.map((b) => [b.id, b])) as Record<Block['id'], Block>;

export const allItems = (blocks: Block[]): { block: Block; item: Item }[] => blocks.flatMap((block) => block.items.map((item) => ({ block, item })));

/** Anchor ids, one place so the page map, the missing list and the links agree. */
export const anchors = {
  card: (id: string) => `card-${id}`,
  block: (id: string) => `block-${id.replace('.', '-')}`,
  field: (key: string) => `field-${key}`,
  item: (block: string, n: number) => `q-${block.replace('.', '-')}-${n}`,
  export: (route: 1 | 2) => `export-${route}`,
};
