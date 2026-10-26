import { ROUTE_BLOCKS, ROUTES, type Block } from '@/data/day1';
import { routeMissing, type Answers } from './logic';

/**
 * The working document of a route: one self-contained HTML file (inline CSS) used for both the download and "print or save as PDF".
 * It prints what the learner wrote and what is still empty. It never prints a model answer, a hint or a score (CLAUDE.md #38, #53).
 * Word documents are built only on the user's signal.
 */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const para = (s: string) => esc(s).replace(/\n/g, '<br>');

export const heading = (route: 1 | 2) => `Day 1 · ${ROUTES[route].deliverable}`;

export function buildDoc(name: string, answers: Answers, route: 1 | 2, when: Date = new Date()): string {
  const blocks: Block[] = ROUTE_BLOCKS[route];
  const missing = routeMissing(blocks, answers);
  const count = blocks.reduce((n, b) => n + b.items.length, 0);
  const body = blocks
    .map((b) => {
      const items = b.items
        .map((i) => {
          const fields = i.fields
            .map((f) => {
              const v = (answers[f.key] ?? '').trim();
              const shown = v ? para(v) : '<em class="empty">not answered</em>';
              const prefix = f.prefix && v ? `<span class="prefix">${esc(f.prefix)}</span> ` : '';
              const label = i.fields.length > 1 ? `<span class="label">${esc(f.label)}</span>` : '';
              return `<div class="field">${label}<p>${prefix}${shown}</p></div>`;
            })
            .join('');
          return `<section class="item"><h3>${i.n}. ${esc(i.prompt)}</h3>${fields}</section>`;
        })
        .join('');
      return `<section class="block"><h2>${esc(b.title)} <small>(${esc(b.planRow)})</small></h2>${items}</section>`;
    })
    .join('');
  const note = missing.length ? `<p class="note">${missing.length} of ${count} questions are not complete yet.</p>` : '';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(heading(route))}${name ? ' · ' + esc(name) : ''}</title><style>
body{font:15px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#17212e;max-width:46rem;margin:2rem auto;padding:0 1rem}
h1{font-size:1.5rem;margin:0}h2{font-size:1.1rem;margin:2rem 0 .1rem;border-bottom:1px solid #d5dee9}h2 small{font-weight:400;color:#556274}
h3{font-size:.95rem;margin:1rem 0 .25rem}.meta,.note{color:#556274;font-size:.85rem}
.field p{margin:.15rem 0 .6rem}.label{font-size:.75rem;text-transform:uppercase;letter-spacing:.04em;color:#556274}
.prefix{color:#556274}.empty{color:#ad3f26}@media print{body{margin:0}h2{break-after:avoid}}
</style></head><body><h1>${esc(heading(route))}</h1><p class="meta">${esc(name || 'Participant')} · ${when.toISOString().slice(0, 10)}</p>${note}${body}</body></html>`;
}

/** The file name starts with the route's number: 1-{name}-day1-l1l2-neuro-ux-analysis (CURRICULUM-GUIDE 7). */
export function exportFileName(name: string, route: 1 | 2): string {
  const who = (name || 'participant').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'participant';
  return `${route}-${who}-day1-${ROUTES[route].fileTag}.html`;
}

export function downloadDoc(name: string, answers: Answers, route: 1 | 2): void {
  const url = URL.createObjectURL(new Blob([buildDoc(name, answers, route)], { type: 'text/html' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = exportFileName(name, route);
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/** Opens the same document in a hidden frame and prints it, so it also works when pop-ups are blocked. */
export function printDoc(name: string, answers: Answers, route: 1 | 2): void {
  const frame = document.createElement('iframe');
  frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0';
  frame.srcdoc = buildDoc(name, answers, route);
  frame.onload = () => {
    frame.contentWindow?.focus();
    frame.contentWindow?.print();
    setTimeout(() => frame.remove(), 1500);
  };
  document.body.appendChild(frame);
}
