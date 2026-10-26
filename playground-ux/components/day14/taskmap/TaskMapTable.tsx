'use client';

import { TASK_MAP_NOTE, TASK_MAP_ROWS, type TabId } from '@/data/day14/tabs';

export function TaskMapTable({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="aion-surface p-4 sm:p-5">
        <h2 className="text-xl font-bold text-navy">Task Map</h2>
        <p className="mt-1 max-w-2xl text-sm text-navy/75">
          Which playground tab supports which task, and where the teaching for it lives.
        </p>
      </div>

      <div className="aion-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="bg-lilac/60">
                <th scope="col" className="px-4 py-3 text-left font-bold text-navy">
                  Task
                </th>
                <th scope="col" className="px-4 py-3 text-left font-bold text-navy">
                  Level
                </th>
                <th scope="col" className="px-4 py-3 text-left font-bold text-navy">
                  Playground tab
                </th>
                <th scope="col" className="px-4 py-3 text-left font-bold text-navy">
                  Supporting Learn section
                </th>
              </tr>
            </thead>
            <tbody>
              {TASK_MAP_ROWS.map((row) => (
                <tr key={row.task} className="border-t border-lilac">
                  <td className="px-4 py-3 font-semibold text-navy">{row.task}</td>
                  <td className="px-4 py-3 text-navy/70">{row.level}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onNavigate(row.tab)}
                      className="font-semibold text-purple underline underline-offset-4"
                    >
                      {row.tabLabel}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-navy/70">
                    <button
                      type="button"
                      onClick={() => onNavigate('learn')}
                      className="text-left underline underline-offset-4 hover:text-purple"
                    >
                      {row.support}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="rounded-card bg-lilac px-4 py-3 text-sm text-navy/80">{TASK_MAP_NOTE}</p>
    </div>
  );
}
