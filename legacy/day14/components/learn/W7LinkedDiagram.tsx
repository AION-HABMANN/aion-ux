'use client';

import { useState } from 'react';
import { Widget } from '@/components/ui/Widget';
import { LINKED_NODES } from '@/content/learn';

export function W7LinkedDiagram() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = LINKED_NODES.find((node) => node.id === openId) ?? null;

  return (
    <Widget index={7} title="Innovation ↔ Need ↔ Maturity ↔ Market Fit" tool="2D linked diagram">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
          {LINKED_NODES.map((node, index) => (
            <div key={node.id} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                aria-expanded={node.id === openId}
                onClick={() => setOpenId(node.id === openId ? null : node.id)}
                className={[
                  'flex-1 rounded-card border-2 px-3 py-3 text-sm font-bold transition-colors',
                  node.id === openId
                    ? 'border-purple bg-purple text-white'
                    : 'border-lilac bg-lilac text-navy hover:border-purple/40',
                ].join(' ')}
              >
                {node.label}
              </button>
              {index < LINKED_NODES.length - 1 && (
                <span aria-hidden className="hidden text-purple sm:inline">
                  ↔
                </span>
              )}
            </div>
          ))}
        </div>

        {active ? (
          <div className="rounded-card border border-purple/25 bg-lilac/50 p-4">
            <p className="text-sm font-bold text-navy">{active.label}</p>
            <p className="mt-1 text-sm text-navy/80">{active.role}</p>
            <p className="mt-2 text-sm text-purple">{active.weakLink}</p>
          </div>
        ) : (
          <p className="rounded-card bg-lilac/50 p-4 text-sm text-navy/60">
            Click a node to see its role in the chain — and what happens when that link is weak.
          </p>
        )}
      </div>
    </Widget>
  );
}
