import { TASKS, type TaskDef } from '../../data/day9/tasks';
import type { RouteDef } from '../../data/day9/routes';
import { allMissing, type Answers } from './tasks-logic';

/**
 * Export of the written answers: one self-contained HTML document (inline CSS), built
 * once and used for both the download and "print or save as PDF". It prints what the
 * learner wrote and what is still empty; it never prints a model answer or a score.
 */

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const para = (s: string) => esc(s).replace(/\n/g, '<br>');

export function buildAnswersDoc(
  name: string,
  answers: Answers,
  when: Date = new Date(),
  ids?: readonly TaskDef['id'][],
  heading = 'Day 9 · Gamification: my answers',
): string {
  const shownTasks = ids ? TASKS.filter((t) => ids.includes(t.id)) : TASKS;
  const missing = allMissing(answers, ids);
  const body = shownTasks.map((t) => {
    const items = t.items
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
    return `<section class="task"><h2>Task ${t.id.slice(1)} · ${esc(t.caseName)} <small>(${esc(t.planRow)})</small></h2><p class="title">${esc(t.title)}</p>${items}</section>`;
  }).join('');

  const note = missing.length
    ? `<p class="note">${missing.length} of ${shownTasks.reduce((n, t) => n + t.items.length, 0)} items are not complete yet.</p>`
    : '';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(heading)}${name ? ' · ' + esc(name) : ''}</title><style>
body{font:15px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#10151f;max-width:46rem;margin:2rem auto;padding:0 1rem}
h1{font-size:1.5rem;margin:0}h2{font-size:1.15rem;margin:2rem 0 .1rem;border-bottom:1px solid #ccd}h2 small{font-weight:400;color:#556}
h3{font-size:.95rem;margin:1rem 0 .25rem}.title{margin:.1rem 0 .5rem;color:#445}.meta,.note{color:#556;font-size:.85rem}
.field p{margin:.15rem 0 .6rem;white-space:normal}.label{font-size:.75rem;text-transform:uppercase;letter-spacing:.04em;color:#556}
.prefix{color:#556}.empty{color:#a33}@media print{body{margin:0}.task{break-inside:auto}h2{break-after:avoid}}
</style></head><body><h1>${esc(heading)}</h1><p class="meta">${esc(name || 'Participant')} · ${when.toISOString().slice(0, 10)}</p>${note}${body}</body></html>`;
}

/** The file name starts with the route number: 1-{name}-day9-l1l2-activation-analysis (UX-STANDARD 2.8). */
export function exportFileName(name: string, route: Pick<RouteDef, 'no' | 'fileTag'>): string {
  const who = (name || 'participant').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'participant';
  return `${route.no}-${who}-day9-${route.fileTag}.html`;
}

const docFor = (name: string, answers: Answers, route: RouteDef) =>
  buildAnswersDoc(name, answers, new Date(), route.taskIds, `Day 9 · ${route.deliverable.replace(/^the /, '')}: my answers`);

export function downloadAnswers(name: string, answers: Answers, route: RouteDef): void {
  const html = docFor(name, answers, route);
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = exportFileName(name, route);
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/** Opens the same document in a hidden frame and prints it (so it also works if pop-ups are blocked). */
export function printAnswers(name: string, answers: Answers, route: RouteDef): void {
  const frame = document.createElement('iframe');
  frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0';
  frame.srcdoc = docFor(name, answers, route);
  frame.onload = () => {
    frame.contentWindow?.focus();
    frame.contentWindow?.print();
    setTimeout(() => frame.remove(), 1500);
  };
  document.body.appendChild(frame);
}
