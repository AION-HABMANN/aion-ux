/**
 * verify:day1: the checks that keep Day 1 true to the plan and to the Digital Learning standard (DL-STANDARD v1.8, CLAUDE.md).
 * Run: npm run verify:day1
 */
import { BLOCKS, CARDS, FACILITATOR, GLOSSARY, ROUTE_BLOCKS, ROUTES, allItems, cardById } from '../data/day1';
import { buildDoc, exportFileName } from '../lib/exportDoc';
import { blockMissing, fieldDone, keysOf, modelAnswers, routeMissing, totals } from '../lib/logic';

const problems: string[] = [];
const ok = (cond: unknown, msg: string) => {
  if (!cond) problems.push(msg);
};

// 1. the tasks are the plan's: four blocks and 5 + 5 + 5 + 7 questions, in the plan's order
ok(BLOCKS.map((b) => b.id).join() === '1.1,1.2,2.1,3.1', 'the blocks must be 1.1, 1.2, 2.1, 3.1');
ok(BLOCKS.map((b) => b.items.length).join() === '5,5,5,7', `the plan has 5, 5, 5 and 7 questions (found ${BLOCKS.map((b) => b.items.length).join()})`);
ok(ROUTE_BLOCKS[1].map((b) => b.id).join() === '1.1,1.2,2.1' && ROUTE_BLOCKS[2].map((b) => b.id).join() === '3.1', 'Route 1 holds the Level 1 and 2 blocks, Route 2 the Level 3 block');
for (const b of BLOCKS) {
  ok(b.items.every((i, k) => i.n === k + 1), `${b.id}: questions must be numbered 1 to n`);
  ok(b.minutes > 0 && b.aim.length > 20, `${b.id}: needs minutes and an aim`);
  ok(b.groups.length >= 1 && b.intro.length > 40, `${b.id}: needs a case brief`);
}

// 2. every question carries the standard's parts (CLAUDE.md #8, #11, #23, #55)
for (const { block, item } of allItems(BLOCKS)) {
  const where = `${block.id} q${item.n}`;
  ok(item.steps.length >= 2 && item.steps.length <= 3, `${where}: "how to build the answer" needs 2 or 3 steps`);
  ok(item.example.length > 30, `${where}: needs an example answer on another company`);
  ok(item.help && item.help.length > 10, `${where}: needs a caption under the question`);
  ok(item.refs.length >= 1, `${where}: names no Materi card`);
  const routeLetter = block.level === 3 ? 'B' : 'A';
  ok(item.refs.every((r) => cardById[r as keyof typeof cardById]?.id.startsWith(routeLetter)), `${where}: a block may only cite the cards of its own route (${item.refs.join()})`);
  for (const f of item.fields) {
    ok(typeof item.model[f.key] === 'string' && item.model[f.key].length > 0, `${where}: field ${f.key} has no model answer`);
    ok(f.kind !== 'pick' || (f.options && f.options.length >= 2), `${where}: ${f.key} is a choice without the plan's options`);
  }
}
ok(new Set(keysOf(BLOCKS)).size === keysOf(BLOCKS).length, 'field keys must be unique');

// 3. completeness logic: empty is missing, the model fill leaves nothing missing, a different choice is never missing
ok(routeMissing(ROUTE_BLOCKS[1], {}).length === 15, 'with no answers Route 1 must have 15 missing questions');
ok(routeMissing(ROUTE_BLOCKS[2], {}).length === 7, 'with no answers Route 2 must have 7 missing questions');
const full = modelAnswers(BLOCKS);
ok(routeMissing(BLOCKS, full).length === 0, `the model fill must leave nothing missing (${routeMissing(BLOCKS, full).map((m) => m.text).join(' | ')})`);
const other = { ...full, 'b12-2-pick': 'Variant C' };
ok(blockMissing(BLOCKS[1], other).length === 0, 'a different choice from the model must never be missing');
ok(blockMissing(BLOCKS[0], { ...full, 'b11-2-attention': '', 'b11-2-orientation': '', 'b11-2-trust': '', 'b11-2-emotional-effect': '', 'b11-2-cognitive-load': '' }).length === 1, 'categories: all empty is missing');
ok(blockMissing(BLOCKS[0], { ...full, 'b11-2-attention': '', 'b11-2-orientation': '', 'b11-2-trust': '', 'b11-2-emotional-effect': '' }).length === 0, 'categories: one used category is enough, the others may stay empty');
ok(blockMissing(BLOCKS[0], { ...full, 'b11-3-trust': '' }).length === 1, 'a hypothesis is needed for every category');
ok(!fieldDone({ key: 'x', label: 'x', kind: 'lines', min: 5 }, 'a\nb\n\n'), 'lines: blank lines must not count');
ok(totals(ROUTE_BLOCKS[1], full).done === 15 && totals(ROUTE_BLOCKS[2], {}).done === 0, 'totals() is wrong');

// 4. export: the learner's words only, no model, no score; the route's own file name
const doc = buildDoc('Muhammad Muchson', { 'b11-1': 'one\ntwo\nthree <b>' }, 1, new Date('2026-01-02'));
ok(doc.includes('one<br>two<br>three &lt;b&gt;'), 'the export must escape the learner’s text and keep line breaks');
ok(doc.includes('not answered'), 'the export must mark what is empty');
ok(!doc.includes(full['b11-5'].slice(0, 30)) && !doc.includes('Musterlösung'), 'the export must never print a model answer');
ok(exportFileName('Muhammad Muchson', 1) === '1-muhammad-muchson-day1-l1l2-neuro-ux-analysis.html', `Route 1 file name is ${exportFileName('Muhammad Muchson', 1)}`);
ok(exportFileName('', 2) === '2-participant-day1-l3-neuro-ux-strategy.html', `Route 2 file name is ${exportFileName('', 2)}`);
ok(!buildDoc('x', full, 2).includes('Block 1.1'), 'a Route 2 export must hold only block 3.1');

// 5. the Materi (DL-STANDARD 6, CLAUDE.md #22, #37, #50): the plan's groups, plain words, no price, minutes
ok(CARDS.length === 7, `Day 1 has 5 cards in Materi A and 2 in Materi B (found ${CARDS.length})`);
for (const c of CARDS) {
  ok(c.plain.words.length >= 2 && c.plain.words.length <= 4, `${c.id}: "In plain words" needs 2 to 4 sentences`);
  ok(c.plain.words.join(' ').split(/\s+/).length <= 85, `${c.id}: "In plain words" is too long`);
  ok(c.plain.why.length > 30, `${c.id}: needs "Why it matters"`);
  ok(c.rules.length >= 2 && c.sources.length >= 1 && c.planRef.length > 10, `${c.id}: needs rules, sources and the plan reference`);
  const cited = BLOCKS.filter((b) => b.items.some((i) => i.refs.includes(c.id)));
  ok(cited.length >= 1, `${c.id}: no block cites this card, so it would be Optional (every card of Day 1 must be Core)`);
  ok(cited.every((b) => (c.route === 1 ? b.level <= 2 : b.level === 3)), `${c.id}: cited by a block of the other route`);
  ok(c.minutes > 0, `${c.id}: needs minutes`);
  const text = JSON.stringify(c);
  const price = text.match(/€|\beuro|budget|\bpric(e|es|ing)\b|cheap|expensive|build cost|cost reasons/i);
  ok(!price, `${c.id}: the Materi must not print a price or budget ("${price?.[0]}")`);
}
const mins = (route: 1 | 2) => CARDS.filter((c) => c.route === route).reduce((n, c) => n + c.minutes, 0);
ok(mins(1) === 60, `Materi A should add up to the hour DL plans (found ${mins(1)} min)`);
ok(mins(2) > 0 && mins(2) <= 60, 'Materi B minutes');

// 6. facilitator cards for the plan's rows without a deliverable (DL-STANDARD 3)
ok(FACILITATOR.length === 2 && FACILITATOR.every((f) => BLOCKS.some((b) => b.id === f.after)), 'Coaching and the Feedbackrunde need a facilitator card each, placed after an existing block');
ok(FACILITATOR.every((f) => f.sections.every((s) => s.items.length > 0)), 'a facilitator card section is empty');

// 7. glossary
ok(GLOSSARY.length >= 15 && GLOSSARY.every((g) => g.plain.length > 20), 'the glossary needs at least 15 plain entries');
const forms = GLOSSARY.flatMap((g) => (g.match ?? [g.term]).map((m) => m.toLowerCase()));
ok(new Set(forms).size === forms.length, 'a glossary form is used twice');

// 8. the routes
ok(ROUTES[1].deliverable === 'Neuro-UX Analysis File' && ROUTES[2].deliverable === 'Neuro-UX Strategy Memo', 'deliverable names');

if (problems.length) {
  console.error(`verify:day1 FAILED (${problems.length})\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`verify:day1 OK (${BLOCKS.length} blocks, ${allItems(BLOCKS).length} questions, ${CARDS.length} cards, ${GLOSSARY.length} glossary terms)`);
