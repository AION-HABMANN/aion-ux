import { CATEGORIES, type CategoryId } from '@/original/lib/day12/categories';

export function CategoryChip({
  id,
  showGerman = false,
  size = 'sm',
}: {
  id: CategoryId;
  showGerman?: boolean;
  size?: 'sm' | 'md';
}) {
  const c = CATEGORIES[id];
  return (
    <span
      className={`aion-chip ${c.chip} ${
        size === 'md' ? 'px-3.5 py-1.5 text-sm' : ''
      }`}
    >
      <span aria-hidden="true">{c.icon}</span>
      {c.label}
      {showGerman && (
        <span className="font-normal">({c.de})</span>
      )}
    </span>
  );
}
