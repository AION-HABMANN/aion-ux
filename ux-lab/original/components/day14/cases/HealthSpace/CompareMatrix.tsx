import { TASK2_CRITERIA } from '@/original/data/day14/categories';
import { HEALTHSPACE_VARIANTS } from '@/original/data/day14/healthspace';

/**
 * The cells are intentionally EMPTY. The matrix shows the shape of the
 * analysis; producing the analysis is the worksheet's job.
 */
export function CompareMatrix() {
  return (
    <div className="aion-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <caption className="px-4 pt-4 text-left text-xs text-navy/60">
            Six evaluation criteria against three variants. The cells are empty on purpose — fill them
            in Worksheet 2.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="border-b border-lilac px-4 py-3 text-left font-bold text-navy">
                Criterion
              </th>
              {HEALTHSPACE_VARIANTS.map((variant) => (
                <th
                  key={variant.id}
                  scope="col"
                  className="border-b border-l border-lilac px-4 py-3 text-left font-bold text-navy"
                >
                  {variant.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TASK2_CRITERIA.map((criterion) => (
              <tr key={criterion}>
                <th
                  scope="row"
                  className="border-b border-lilac bg-lilac/40 px-4 py-3 text-left font-semibold text-navy"
                >
                  {criterion}
                </th>
                {HEALTHSPACE_VARIANTS.map((variant) => (
                  <td
                    key={variant.id}
                    className="border-b border-l border-lilac px-4 py-3 text-navy/25"
                    aria-label={`${criterion} for ${variant.title} — empty`}
                  >
                    —
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
