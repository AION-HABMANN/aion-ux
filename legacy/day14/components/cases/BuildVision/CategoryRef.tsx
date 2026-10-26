import { BUILDVISION_WORKSHEET_NOTE } from '@/content/buildvision';
import { TASK1_CATEGORIES } from '@/content/categories';

/**
 * Read-only reference panel. It lists the worksheet's categories and nothing
 * more — no inputs, no scoring, no submission, no pre-assignment.
 */
export function CategoryRef() {
  return (
    <div className="aion-card p-4 sm:p-6">
      <p className="aion-label">Worksheet 1 categories (reference only)</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {TASK1_CATEGORIES.map((category) => (
          <li
            key={category}
            className="rounded-xl border border-lilac bg-lilac/50 px-3 py-2 text-sm font-semibold text-navy"
          >
            {category}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm font-semibold text-purple">{BUILDVISION_WORKSHEET_NOTE}</p>
    </div>
  );
}
