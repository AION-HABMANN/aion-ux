'use client';

import { TABS, type TabId } from '@/original/data/day14/tabs';

export function TabBar({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
}) {
  return (
    <nav
      aria-label="Playground sections"
      className="sticky top-0 z-30 border-b border-lilac bg-white/95 backdrop-blur"
    >
      <div className="mx-auto max-w-shell px-2 sm:px-6">
        <ul className="flex gap-1 overflow-x-auto py-2" role="tablist">
          {TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <li key={tab.id} className="shrink-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => onChange(tab.id)}
                  className={[
                    'whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition-colors sm:px-4',
                    isActive
                      ? 'bg-purple text-white'
                      : 'bg-lilac text-navy/70 hover:bg-lilac hover:text-navy',
                  ].join(' ')}
                >
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
