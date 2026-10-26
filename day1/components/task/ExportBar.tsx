'use client';

import { anchors, ROUTE_BLOCKS, ROUTES } from '@/data/day1';
import { downloadDoc, exportFileName, printDoc } from '@/lib/exportDoc';
import { keysOf, routeMissing, totals } from '@/lib/logic';
import { useHydrated, useStore } from '@/store/useStore';
import { MissingNotice } from '@/components/ui/Help';

/**
 * One export bar per route, one working document (CLAUDE.md #12). Never disabled (#3): the document can be downloaded or printed at any
 * time, and what is still empty is marked as such in it. The live notice above names what is missing (#34).
 */
export function ExportBar({ route, step }: { route: 1 | 2; step?: string }) {
  const hydrated = useHydrated();
  const name = useStore((s) => s.name);
  const answers = useStore((s) => s.answers);
  const clear = useStore((s) => s.clear);
  const blocks = ROUTE_BLOCKS[route];
  const missing = hydrated ? routeMissing(blocks, answers) : [];
  const { done, total } = totals(blocks, hydrated ? answers : {});
  const r = ROUTES[route];
  return (
    <section id={anchors.export(route)} aria-labelledby={`export-${route}-t`} className="card no-print space-y-3 p-5">
      <div className="flex flex-wrap items-center gap-2">
        {step ? <span className="smallcaps text-accent">{step}</span> : null}
      </div>
      <h3 id={`export-${route}-t`} className="text-h2">
        Your {r.deliverable}
      </h3>
      <p className="text-body">
        <strong>
          {done} of {total}
        </strong>{' '}
        questions complete in this route.
      </p>
      {missing.length ? <MissingNotice title="Still missing in this route" items={missing} id={`export-missing-${route}`} /> : <p className="text-caption text-ash">Nothing is missing.</p>}
      <div className="flex flex-wrap gap-3">
        <button type="button" className="btn-primary btn" onClick={() => downloadDoc(name, answers, route)}>
          Download my answers
        </button>
        <button type="button" className="btn-ghost btn" onClick={() => printDoc(name, answers, route)}>
          Print or save as PDF
        </button>
        <button
          type="button"
          className="btn-ghost btn"
          onClick={() => {
            if (window.confirm(`Clear your answers in Route ${route} on this device? This cannot be undone.`)) clear(keysOf(blocks));
          }}
        >
          Clear this route
        </button>
      </div>
      <p className="text-caption text-ash">
        You can download or print at any time; unanswered questions are marked as such in the document. The file is named <code>{exportFileName(name, route)}</code>.
      </p>
    </section>
  );
}
