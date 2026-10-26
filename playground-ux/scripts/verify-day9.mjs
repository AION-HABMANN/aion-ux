// verify:day9 (UX-STANDARD 2.6). Plain Node; uses the TypeScript compiler from node_modules to read the
// day's own .ts files. Checks that Day 9's tasks follow the plan item for item, that the day has the
// shape of UX-STANDARD 2.8 (home, two routes, Extra), that the completeness logic and the export
// behave, and that the removed libraries stay removed.
//   Run: npm run verify:day9
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = fileURLToPath(new URL('..', import.meta.url));
const require = createRequire(import.meta.url);
const ts = require('typescript');
const problems = [];
const fail = (m) => problems.push(m);
const ok = (cond, m) => {
  if (!cond) fail(m);
};

// --- load a .ts file (and its relative imports) without a build step -------------------------
const cache = new Map();
function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const src = readFileSync(file, 'utf8');
  const out = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const mod = { exports: {} };
  cache.set(file, mod);
  const req = (spec) => {
    if (!spec.startsWith('.')) return require(spec);
    const base = resolve(dirname(file), spec);
    for (const cand of [base + '.ts', join(base, 'index.ts'), base]) if (existsSync(cand) && statSync(cand).isFile()) return load(cand);
    throw new Error(`cannot resolve ${spec} from ${relative(root, file)}`);
  };
  new Function('module', 'exports', 'require', out)(mod, mod.exports, req);
  return mod.exports;
}

// --- the plan, Day 9 (Strukturplan, column Tag 9) ---------------------------------------------
const PLAN = {
  t1: { row: 'Arbeitsauftrag 1', caseName: 'SkillRise', items: 5, level: 1, courseKey: 'task1' },
  t2: { row: 'Arbeitsauftrag 2', caseName: 'HealthJourney', items: 5, level: 1, courseKey: 'task2' },
  t3: { row: 'Fallstudie', caseName: 'MoveWell', items: 6, level: 2, courseKey: 'caseStudy' },
  t4: { row: 'Transferprojekt', items: 7, level: 3 },
};
const CATEGORIES = {
  't1-3': ['Motivation', 'Progress', 'Recognition', 'Feedback', 'Retention', 'Self-efficacy'],
  't3-2': ['Progress', 'Feedback', 'Motivation', 'Self-efficacy', 'Credibility', 'Long-term retention'],
};
// Counts the plan prints: "at least 5 places", "three impact statements", "two weaknesses", "4 measures",
// three variants, three guiding decisions.
const COUNTS = { 't1-2': { kind: 'lines', min: 5 }, 't3-3': { kind: 'lines', min: 4 }, 't1-4': { fields: 3 }, 't1-5': { fields: 2 }, 't2-1': { fields: 3 }, 't4-2': { fields: 3 } };

const { TASKS } = load(join(root, 'data/day9/tasks.ts'));
const logic = load(join(root, 'lib/day9/tasks-logic.ts'));
const { buildAnswersDoc, exportFileName } = load(join(root, 'lib/day9/tasks-export.ts'));
const { ROUTES, EXTRAS, NAV_ACTIVE } = load(join(root, 'data/day9/routes.ts'));
const { INTRO } = load(join(root, 'data/day9/intro.ts'));
const { concepts } = load(join(root, 'data/day9/concepts.ts'));
const { HELP, KEY, KEY_SOURCE, GLOSSARY } = load(join(root, 'data/day9/support.ts'));
const { splitGloss } = load(join(root, 'lib/day9/gloss.ts'));
const { PLAIN, DRAWS, OPTIONAL_REASON, cardInfo, cardsOf, cardsFor, pathOf, WHY, CARD_MINUTES, TASK_MINUTES, extraMinutes, fmtMin } = load(join(root, 'data/day9/materi.ts'));
const { CONCEPT_SECTIONS } = load(join(root, 'data/day9/concepts.ts'));

// 1. the tasks are the plan's, item for item
ok(TASKS.map((t) => t.id).join() === 't1,t2,t3,t4', 'tasks are not t1..t4 in the plan order');
const allKeys = [];
let totalItems = 0;
for (const t of TASKS) {
  const p = PLAN[t.id];
  ok(t.planRow === p.row, `${t.id}: planRow "${t.planRow}" is not "${p.row}"`);
  ok(t.level === p.level, `${t.id}: level ${t.level} is not ${p.level}`);
  if (p.caseName) ok(t.caseName === p.caseName, `${t.id}: case "${t.caseName}" is not the plan's "${p.caseName}"`);
  ok(t.items.length === p.items, `${t.id}: ${t.items.length} items, the plan has ${p.items}`);
  t.items.forEach((it, i) => {
    ok(it.n === i + 1, `${t.id}: item numbers are not 1..${p.items} in order (item ${i + 1} is numbered ${it.n})`);
    ok(it.prompt && it.prompt.length > 10, `${t.id} item ${it.n}: empty prompt`);
    ok(it.fields.length > 0, `${t.id} item ${it.n}: no field`);
    const id = `${t.id}-${it.n}`;
    const c = COUNTS[id];
    if (c?.fields) ok(it.fields.length === c.fields, `${id}: ${it.fields.length} fields, the plan asks for ${c.fields}`);
    if (c?.kind) ok(it.fields[0].kind === c.kind && it.fields[0].min === c.min, `${id}: expects a list with at least ${c.min} lines`);
    if (CATEGORIES[id]) {
      ok(it.anyOf === true, `${id}: category assignment must be "anyOf"`);
      ok(it.fields.map((f) => f.label).join('|') === CATEGORIES[id].join('|'), `${id}: categories differ from the plan's`);
    }
    for (const f of it.fields) {
      allKeys.push(f.key);
      ok(f.key.startsWith(`${t.id}-`), `${f.key}: key does not start with ${t.id}-`);
      ok(['text', 'lines', 'pick'].includes(f.kind), `${f.key}: unknown kind ${f.kind}`);
      if (f.kind === 'pick') ok(f.options?.length >= 2, `${f.key}: a choice needs options`);
      if (f.kind === 'lines') ok((f.min ?? 0) >= 1, `${f.key}: a list needs a minimum`);
    }
  });
  totalItems += t.items.length;
}
ok(new Set(allKeys).size === allKeys.length, 'field keys are not unique');
ok(totalItems === 23, `expected 23 plan items in total, found ${totalItems}`);

// 2. the cases are the ones the course data names for Day 9
const course = readFileSync(join(root, 'data/course.ts'), 'utf8');
const day9 = course.match(/n: 9,[^]*?cases: \{ task1: '([^']+)', task2: '([^']+)', caseStudy: '([^']+)' \}/);
if (!day9) fail('data/course.ts: Day 9 cases not found');
else {
  const got = { task1: day9[1], task2: day9[2], caseStudy: day9[3] };
  for (const t of TASKS) if (PLAN[t.id].courseKey) ok(got[PLAN[t.id].courseKey] === t.caseName, `${t.id}: case ${t.caseName} differs from data/course.ts (${got[PLAN[t.id].courseKey]})`);
}

// 3. completeness logic
const filled = {};
for (const t of TASKS)
  for (const it of t.items)
    for (const f of it.fields) filled[f.key] = f.kind === 'pick' ? f.options[0] : f.kind === 'lines' ? Array.from({ length: f.min }, (_, i) => `point ${i + 1}`).join('\n') : 'x'.repeat(Math.max(f.min ?? 15, 15));
ok(logic.allMissing({}).length === 23, `empty answers: ${logic.allMissing({}).length} missing, expected 23`);
ok(logic.allMissing(filled).length === 0, `complete answers still report missing: ${logic.allMissing(filled).map((m) => m.text).join('; ')}`);
ok(logic.totals(filled).done === 23 && logic.totals({}).done === 0, 'totals() is wrong');
const m2 = logic.allMissing({ ...filled, 't1-2': 'a\nb\nc' }).find((m) => m.task === 't1' && m.item === 2);
ok(m2 && m2.text.includes('3 of 5') && m2.fieldKey === 't1-2', `a list of 3 of 5 points is not reported as "3 of 5" (${m2?.text})`);
ok(logic.allMissing({ ...filled, 't2-2-why': '' }).some((m) => m.task === 't2' && m.item === 2), 'a choice without a reason must be missing');
ok(logic.allMissing({ ...filled, 't2-2-pick': 'Variant C' }).length === 0, 'a different choice must never be missing (checks are completeness only)');
const oneCat = { ...filled };
for (const f of TASKS[0].items[2].fields) oneCat[f.key] = '';
oneCat[TASKS[0].items[2].fields[0].key] = 'only one';
ok(!logic.allMissing(oneCat).some((m) => m.task === 't1' && m.item === 3), 'one filled category must be enough for the assignment item');
ok(logic.allMissing({ ...filled, 't1-1': 'short' }).some((m) => m.task === 't1' && m.item === 1), 'a too-short answer must be missing');

// 4. export
const doc = buildAnswersDoc('Test <b>Name</b>', { ...filled, 't1-1': '<script>alert(1)</script>' }, new Date('2026-01-02'));
ok(!doc.includes('<script>'), 'export does not escape answers');
ok(doc.includes('&lt;script&gt;'), 'export lost the escaped answer text');
ok(TASKS.every((t) => t.items.every((it) => doc.includes(`${it.n}. `))), 'export is missing item headings');
ok(buildAnswersDoc('', {}).includes('not answered'), 'export must show unanswered questions as such');
ok(!/model answer|answer key|score/i.test(doc), 'export must never print a model answer, a key or a score');

// 5. the shape of the day (UX-STANDARD 2.8)
const page = (rel) => join(root, 'app/(course)/day/9', rel, 'page.tsx');
for (const rel of ['', 'route-1', 'route-2', 'extra', 'extra/studio-brief']) ok(existsSync(page(rel)), `app/(course)/day/9/${rel}/page.tsx is missing`);
ok(!existsSync(page('tasks')), 'the separate Tasks page must be gone: tasks live inside the routes');
ok(ROUTES.length === 2 && ROUTES[0].no === 1 && ROUTES[1].no === 2, 'the day needs exactly two routes, numbered 1 and 2');
const seenTasks = ROUTES.flatMap((r) => r.taskIds);
ok(seenTasks.slice().sort().join() === 't1,t2,t3,t4', `every plan task must be in exactly one route (found ${seenTasks.join()})`);
ok(ROUTES[0].taskIds.join() === 't1,t2,t3' && ROUTES[1].taskIds.join() === 't4', 'Route 1 carries tasks 1 to 3 (Levels 1 and 2), Route 2 carries task 4 (Level 3)');
for (const r of ROUTES) {
  ok(r.deliverable && r.verb && r.question && r.fileTag, `Route ${r.no}: needs a verb, a question, a deliverable and a file tag`);
  const sourcePage = readFileSync(page(r.slug), 'utf8');
  ok(sourcePage.includes(`ROUTES[${r.no - 1}]`), `Route ${r.no} page does not render its route`);
}
// Materi: every concept card belongs to exactly one route, by level
for (const c of concepts) ok(ROUTES.filter((r) => r.materiLevels.includes(c.level)).length === 1, `concept ${c.slug} (level ${c.level}) is in ${ROUTES.filter((r) => r.materiLevels.includes(c.level)).length} routes, expected 1`);
ok(concepts.filter((c) => ROUTES[1].materiLevels.includes(c.level)).length >= 1, 'Route 2 has no Materi card');
// the home
ok(INTRO.about.length === 2, 'the home needs two "what today is about" paragraphs');
ok(INTRO.wiifm.items.length >= 5 && INTRO.wiifm.items.length <= 6, `"in it for you" has ${INTRO.wiifm.items.length} items, expected 5 to 6`);
for (const it of INTRO.wiifm.items) ok(ROUTES.some((r) => r.no === it.route), `"${it.skill}" names a route that does not exist`);
ok(ROUTES.every((r) => INTRO.wiifm.items.some((it) => it.route === r.no)), 'every route must teach at least one item of "in it for you"');
const lastItem = INTRO.wiifm.items[INTRO.wiifm.items.length - 1];
ok(ROUTES.every((r) => lastItem.payoff.includes(r.deliverable.replace(/^the /, ''))), 'the last "in it for you" item must name both documents');
const homeSrc = readFileSync(page(''), 'utf8');
ok(homeSrc.includes('ROUTES.map') && homeSrc.includes('You finish with'), 'the home does not render the route tiles with "You finish with"');
// the Extra shelf: every link resolves
ok(EXTRAS.length >= 1, 'the Extra shelf is empty; remove the entry from the navigation instead');
for (const e of EXTRAS) {
  const rel = e.href.replace(/^\/day\/9\//, '').replace(/\/$/, '');
  ok(existsSync(page(rel)), `Extra link ${e.href} has no page`);
}
// task work surfaces resolve
for (const t of TASKS)
  if (t.caseHref) ok(existsSync(page(t.caseHref.replace(/^\/day\/9\//, '').replace(/\/$/, ''))), `${t.id}: work surface ${t.caseHref} has no page`);
// the navigation bar has exactly: the day, two routes, Extra
const shell = readFileSync(join(root, 'components/day9/layout/AppShell.tsx'), 'utf8');
ok(/key: 'home'/.test(shell) && /key: 'route-1'/.test(shell) && /key: 'route-2'/.test(shell) && /key: 'extra'/.test(shell), 'the navigation bar must hold exactly: home, route-1, route-2, extra');
ok((shell.match(/\{ key: '/g) ?? []).length === 4, 'the navigation bar has more or fewer than 4 entries');
ok(['home', 'route-1', 'route-2', 'extra'].every((k) => k in NAV_ACTIVE), 'NAV_ACTIVE must cover home, route-1, route-2 and extra');
// the route page has a page map and a per-route export
const routeSrc = readFileSync(join(root, 'components/day9/day/RoutePage.tsx'), 'utf8');
ok(routeSrc.includes('<PageMap') && routeSrc.includes('Clear this route') && routeSrc.includes('downloadAnswers'), 'the route page needs a page map, an export and "Clear this route"');

// 6. export per route, file names
ok(exportFileName('Muhammad Muchson', ROUTES[0]) === '1-muhammad-muchson-day9-l1l2-activation-analysis.html', `Route 1 file name is ${exportFileName('Muhammad Muchson', ROUTES[0])}`);
ok(exportFileName('', ROUTES[1]) === '2-participant-day9-l3-activation-strategy.html', `Route 2 file name is ${exportFileName('', ROUTES[1])}`);
const doc2 = buildAnswersDoc('x', filled, new Date('2026-01-02'), ROUTES[1].taskIds, 'h');
ok(doc2.includes('Task 4') && !doc2.includes('Task 1'), 'a Route 2 export must hold only Task 4');
const doc1 = buildAnswersDoc('x', {}, new Date('2026-01-02'), ROUTES[0].taskIds, 'h');
ok(doc1.includes('Task 3') && !doc1.includes('Task 4') && doc1.includes('16 of 16 items are not complete'), `a Route 1 export must hold Tasks 1 to 3 and say 16 of 16 are not complete (${(doc1.match(/\d+ of \d+ items[^<]*/) ?? [''])[0]})`);
ok(logic.allMissing({}, ['t4']).length === 7 && logic.allMissing({}, ['t1', 't2', 't3']).length === 16, 'allMissing() per route is wrong');
ok(logic.keysOf(['t4']).every((k) => k.startsWith('t4-')) && logic.keysOf(['t4']).length === TASKS[3].items.reduce((n, i) => n + i.fields.length, 0), 'keysOf() must return only the task\'s own keys');

// 7. support: writing help, mentor key, glossary (DL-STANDARD 2; CLAUDE.md #7, #19, #23)
const itemKeys = TASKS.flatMap((t) => t.items.map((i) => `${t.id}-${i.n}`));
for (const k of itemKeys) ok(Array.isArray(HELP[k]) && HELP[k].length >= 1 && HELP[k].every((l) => l.trim().length > 10), `${k}: "How to build the answer" is missing or empty`);
ok(Object.keys(HELP).every((k) => itemKeys.includes(k)), 'HELP has an entry for an item that does not exist');
ok(Object.keys(KEY).sort().join() === allKeys.slice().sort().join(), `the model key must cover exactly the ${allKeys.length} fields (missing: ${allKeys.filter((k) => !(k in KEY)).join() || 'none'}; extra: ${Object.keys(KEY).filter((k) => !allKeys.includes(k)).join() || 'none'})`);
ok(logic.allMissing(KEY).length === 0, `the model fill must leave nothing missing: ${logic.allMissing(KEY).map((m) => m.text).join('; ')}`);
for (const t of TASKS) for (const it of t.items) for (const f of it.fields) if (f.kind === 'pick') ok(f.options.includes(KEY[f.key]), `${f.key}: the model choice is not one of the options`);
ok(Object.keys(HELP).every((k) => HELP[k].every((l) => !Object.values(KEY).some((a) => a.length > 40 && a.includes(l)))), 'a help line repeats a model answer');
ok(KEY_SOURCE.t3.from === 'plan' && ['t1', 't2', 't4'].every((k) => KEY_SOURCE[k].from === 'draft'), 'KEY_SOURCE must say that Task 3 follows the plan and the others are drafts');
ok(GLOSSARY.length >= 12 && new Set(GLOSSARY.map((g) => g.term)).size === GLOSSARY.length, 'the glossary needs at least 12 unique terms');
for (const g of GLOSSARY) ok(g.plain.length > 15 && g.plain.length <= 170, `glossary "${g.term}": the explanation should be one or two plain sentences`);
const taskTexts = TASKS.flatMap((t) => [t.intro, ...t.brief.flatMap((b) => b.points), ...t.items.map((i) => i.prompt), ...t.items.map((i) => i.hint ?? '')]);
for (const g of GLOSSARY) ok(taskTexts.some((s) => splitGloss(s).some((p) => p.entry?.term === g.term)), `glossary term "${g.term}" is not used in any task text`);
const sec = readFileSync(join(root, 'components/day9/tasks/TaskSection.tsx'), 'utf8');
ok(sec.includes('<GlossText') && sec.includes('<WritingHelp') && sec.includes('<ModelAnswer'), 'TaskSection must render the glossary, the writing help and the model answer');
const supportSrc = readFileSync(join(root, 'components/day9/tasks/TaskSupport.tsx'), 'utf8');
ok(/if \(!unlocked\) return null/.test(supportSrc), 'the model answer must stay hidden until the mentor passcode');
const mentorSrc = readFileSync(join(root, 'lib/day9/mentor-store.ts'), 'utf8');
ok(!/persist/.test(mentorSrc.replace(/\/\*[^]*?\*\//g, '')), 'the unlocked flag must not be persisted (a reload locks it again)');
const barSrc = readFileSync(join(root, 'components/day9/layout/MentorBar.tsx'), 'utf8');
ok(['Fill all model answers', 'Lock', 'Wrong passcode', "Clear this route", "Jump to this route"].every((s) => barSrc.includes(s)), 'the mentor bar lacks one of: fill all, lock, wrong passcode, clear this route, jump to export');
ok(shell.includes('<MentorBar'), 'the mentor bar must be in the Day 9 shell');
ok(!readFileSync(join(root, 'lib/day9/tasks-export.ts'), 'utf8').includes('support'), 'the export must not import the model answers');

// 8. the Materi is simple (UX-STANDARD 2.10; DL #22, #35, #37, #40)
for (const c of concepts) {
  const pl = PLAIN[c.slug];
  ok(Array.isArray(pl) && pl.length >= 2 && pl.length <= 4, `${c.slug}: "In plain words" needs 2 to 4 sentences`);
  if (pl) {
    const words = pl.join(' ').split(/\s+/).length;
    ok(words <= 75, `${c.slug}: "In plain words" is ${words} words; keep it under 75`);
    ok(pl.every((s) => s.trim().endsWith('.') && !s.includes('*')), `${c.slug}: plain words must be full sentences without markdown`);
  }
  ok(c.slug in DRAWS, `${c.slug}: DRAWS has no entry`);
  const info = cardInfo(c.slug);
  ok(Boolean(info), `${c.slug}: no card info (the concept is in no route)`);
  if (info) {
    ok(info.tasks.every((tid) => info.route.taskIds.includes(tid)), `${c.slug}: a card may only be drawn on by tasks of its own route (Core never depends on another route's Optional)`);
    ok(info.core === (info.tasks.length > 0), `${c.slug}: Core must mean "at least one task draws on it"`);
    if (!info.core) ok(Boolean(OPTIONAL_REASON[c.slug]), `${c.slug}: an Optional card needs a one-sentence reason`);
  }
}
ok(Object.keys(DRAWS).every((k) => concepts.some((c) => c.slug === k)), 'DRAWS names a card that does not exist');
for (const tk of TASKS) ok(cardsFor(tk.id).length >= 1, `${tk.id}: no card is named for this task ("Draws on")`);
for (const r of ROUTES) {
  const cs = cardsOf(r);
  ok(cs.length >= 1 && cs.some((x) => x.core), `Route ${r.no}: needs at least one Core card`);
  ok(cs.filter((x) => x.core).length <= 7, `Route ${r.no}: more than 7 Core cards is too many to read before the tasks`);
  const codes = cs.map((x) => x.code);
  ok(new Set(codes).size === codes.length, `Route ${r.no}: card codes are not unique`);
}
// reading order: what a task needs first, the folded parts after
const openIds = CONCEPT_SECTIONS.filter((s) => !s.fold).map((s) => s.id);
ok(openIds.join() === 'demo,cannow', `a card is open on: try it and you can now (found ${openIds.join()})`);
const foldedIds = CONCEPT_SECTIONS.filter((s) => s.fold).map((s) => s.id);
ok(foldedIds.join() === 'check,hook,core,mechanism,balance,serious', `folded parts must be the self-check, hook, core, mechanism, balance, serious (found ${foldedIds.join()})`);
ok(CONCEPT_SECTIONS.slice(0, 2).every((s) => !s.fold), 'try it and you can now must not be folded');
const body = readFileSync(join(root, 'components/day9/learn/CardBody.tsx'), 'utf8');
ok((body.match(/fold=\{FOLD\./g) ?? []).length === 6, 'the card body must fold six parts (the optional self-check and five explanations)');
const inline = readFileSync(join(root, 'components/day9/learn/InlineCard.tsx'), 'utf8');
ok(!body.includes('completeConcept'), 'a card is read when the reader says so, never because a quiz was answered');
ok(inline.includes('PLAIN[') && inline.includes('<ShowEverything') && inline.includes('aria-expanded') && inline.includes('aria-controls') && inline.includes('{open ? ('), 'a card must show its plain words first, open in place with a keyboard-operable button, and mount its demo only when opened');
const foldSrc = readFileSync(join(root, 'components/day9/learn/Fold.tsx'), 'utf8');
ok(foldSrc.includes('aria-expanded') && foldSrc.includes('hashchange') && foldSrc.includes('hidden={!isOpen}'), 'the fold must be keyboard-operable (aria-expanded), open on a jump to it, and keep its text in the page');
const rp = readFileSync(join(root, 'components/day9/day/RoutePage.tsx'), 'utf8');
ok(rp.includes('Your path') && rp.includes('<InlineCard') && rp.includes('<Fold') && rp.includes('pathOf('), 'the route page needs the path, the cards in place and the folded Optional cards');
ok(!rp.includes('/day/9/learn/'), 'the route page must not send a reader to a separate card page');
ok(!existsSync(join(root, 'components/day9/learn/ConceptPage.tsx')) && readFileSync(join(root, 'app/(course)/day/9/learn/[slug]/page.tsx'), 'utf8').includes('CardRedirect'), 'the old card address must only redirect to the route page');

// 8b. the path through a route (UX-STANDARD 2.11): all Core cards, then all tasks, then the export (DL #12, #30)
for (const r of ROUTES) {
  const pth = pathOf(r);
  const steps = [...pth.cards.map((c) => c.step), ...pth.tasks.map((x) => x.step), pth.exportStep];
  ok(steps.every((n, i) => n === i + 1) && pth.total === steps.length, `Route ${r.no}: steps must run 1 to ${pth.total} without a gap`);
  ok(pth.cards.every((c) => c.step <= pth.cards.length) && pth.tasks.every((x) => x.step > pth.cards.length), `Route ${r.no}: every card must come before every task`);
  ok(pth.tasks.map((x) => x.taskId).join() === r.taskIds.join(), `Route ${r.no}: tasks in the plan's order`);
  const placed = pth.cards.map((c) => c.slug);
  ok(new Set(placed).size === placed.length, `Route ${r.no}: a card is on the path twice`);
  const core = cardsOf(r).filter((c) => c.core).map((c) => c.slug);
  ok(core.length === placed.length && core.every((s) => placed.includes(s)), `Route ${r.no}: every Core card must be on the path exactly once`);
  ok(pth.optional.every((c) => !c.core) && pth.optional.length === cardsOf(r).length - core.length, `Route ${r.no}: Optional cards are the ones off the path`);
}
// 8c. audit of 2026-10-25 against DL #22, #34, #35, #37 (docs/DAY9-AUDIT-62-RULES.md)
for (const c of concepts) {
  const info = cardInfo(c.slug);
  if (info?.core) {
    ok(typeof WHY[c.slug] === 'string' && WHY[c.slug].split(/\s+/).length <= 40, `${c.slug}: a Core card needs a one-to-two sentence "Why it matters" of 40 words at most`);
    ok(info.tasks.every((tid) => WHY[c.slug]?.includes(tid.slice(1))), `${c.slug}: "Why it matters" must name each task that draws on the card`);
  }
  ok(extraMinutes(c.slug) >= 1, `${c.slug}: extra minutes must be at least 1`);
}
ok(CARD_MINUTES > 0 && TASK_MINUTES.t1 > 0 && TASK_MINUTES.t2 > 0 && TASK_MINUTES.t3 > 0 && TASK_MINUTES.t4 > 0, 'every card and task needs minutes');
ok(fmtMin(59) === '59 min' && fmtMin(106) === '1 h 46 min' && fmtMin(120) === '2 h', 'fmtMin is wrong');
for (const r of ROUTES) {
  const pth = pathOf(r);
  ok(pth.materiMinutes === pth.cards.length * CARD_MINUTES && pth.taskMinutes === pth.tasks.reduce((n, x) => n + TASK_MINUTES[x.taskId], 0), `Route ${r.no}: route minutes must be the sum of its cards and tasks`);
}
const taskSrc = readFileSync(join(root, 'components/day9/tasks/TaskSection.tsx'), 'utf8');
ok(taskSrc.includes('function TaskMissing') && taskSrc.includes('<TaskMissing'), 'every task block needs its own live "still missing" notice (DL #34)');
const rp2 = readFileSync(join(root, 'components/day9/day/RoutePage.tsx'), 'utf8');
ok(rp2.includes('Still missing in this route') && !rp2.includes('setShowMissing'), 'the notice above Export must be live, not behind a click (DL #34)');
const pm = readFileSync(join(root, 'components/day9/day/PageMap.tsx'), 'utf8');
ok(pm.includes("'Core'") && pm.includes("'Optional'"), 'the page map must show Core and Optional on the pill, not only in a tooltip (DL #35)');
const ic = readFileSync(join(root, 'components/day9/learn/InlineCard.tsx'), 'utf8');
ok(ic.includes('CARD_MINUTES') && ic.includes('WHY['), 'a card must show its minutes and "Why it matters" (DL #37, #22)');
// 8d. DL-STANDARD 6: the Materi prints no price, budget, cost band or effort-by-price rule
// (effort is a judgement of time and people with a reason). The plan's own figures live in the tasks, not here.
const PRICE = /€|\beuro|budget|\bpric(e|es|ing)\b|cheap|expensive|build cost|implementation cost|cost matrix|cost ratio|cost reasons|per euro|cost to build/i;
const materiFiles = ['data/day9/concepts.ts', 'data/day9/materi.ts', 'components/day9/learn/Diagram.tsx', ...readdirSync(join(root, 'components/day9/learn/demos')).map((f) => `components/day9/learn/demos/${f}`)];
for (const f of materiFiles) {
  const src = readFileSync(join(root, f), 'utf8');
  src.split('\n').forEach((line, i) => {
    const m = line.match(PRICE);
    // the check itself and its explanation may name the words; a line that says "not a price" is the rule being taught
    if (m && !/not a price/i.test(line)) ok(false, `${f}:${i + 1}: the Materi must not print a price or budget ("${m[0]}"): rate effort as time and people, with a reason`);
  });
}
// the visible layer of a card is short
for (const c of concepts) {
  const visible = [...PLAIN[c.slug], c.deck, c.demo.brief, c.demo.insight].join(' ').split(/\s+/).length;
  ok(visible <= 220, `${c.slug}: the visible text before the checks is ${visible} words (limit 220)`);
}

// 9. libraries
ok(!('recharts' in (JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).dependencies ?? {})), 'recharts is back in package.json');

function scan(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) scan(p);
    else if (/\.(ts|tsx)$/.test(f)) {
      const t = readFileSync(p, 'utf8');
      if (/from ['"](framer-motion|recharts)['"]/.test(t)) fail(`${relative(root, p)}: imports framer-motion or recharts`);
    }
  }
}
for (const d of ['components/day9', 'lib/day9', 'app/(course)/day/9', 'data/day9']) scan(join(root, d));

if (problems.length) {
  console.error('verify:day9 FAILED');
  for (const p of problems) console.error(' - ' + p);
  process.exit(1);
}
console.log(`verify:day9 OK (${TASKS.length} tasks, ${totalItems} plan items, ${allKeys.length} fields; completeness, export and library checks passed)`);
