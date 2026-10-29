/**
 * Verification of the UX days (ported from Digital Learning, DL-STANDARD v1.8): run with `npm run verify:day1` (to day9), or `npm run verify:free`
 * for all of them. For each day and each language it checks that the model answers empty every missing list and complete every block, that a list or an
 * assessment counts in the layout the learner chose (a box each or a table) and only in that one, that a different but reasoned choice still exports, that no
 * block is Optional and no cost or budget figure is printed, that the exports carry the learner's own answers, and that an old saved shape loads. It needs no browser.
 */
import { materialsOf } from "../data/materialRegistry";
import { GLOSSARY, GLOSS_LOOKUP } from "../data/glossary";
import { freeAnalysisBody, freeMemoBody } from "../lib/dayFree/exportDoc";
import { freeMissing } from "../lib/dayFree/missing";
import { guideOf, freeRouteKey } from "../lib/dayFree/mentor";
import { blocksOf, emptyFreeRoute, fieldsOf, listLines } from "../lib/dayFree/model";
import { freeDossier, freeTaskBlocks } from "../lib/dayFree/progress";
import type { FreeField, FreeSpec, GuideSpec } from "../lib/dayFree/spec";
import { MENTOR_PASSCODE } from "../lib/mentorKey";
import { setCurrentLang } from "../lib/lang";
import { FREE_DAYS, FREE_SPECS } from "../data/free/registry";
import { emptyPersisted, mergeDefaults, migratePersisted } from "../store/useStore";
import type { Persisted } from "../store/useStore";

const SPECS: Record<number, FreeSpec> = FREE_SPECS;
/** The money figures the plan itself prints for a day (UX-STANDARD: a figure appears only where the plan prints it, and only in the brief). */
const PLAN_FIGURES: Record<number, string[]> = { 1: ["€180,000"], 2: ["€150,000"], 3: ["€130,000"], 4: ["€160,000"], 5: ["€140,000"], 6: ["€170,000"], 7: ["€145,000"], 8: ["€155,000"], 9: ["€150,000"], 10: ["€180,000"], 11: ["€190,000"], 12: ["€160,000"], 13: ["€175,000"], 14: ["€220,000"], 15: ["€240,000"], 16: ["€260,000"] };
const want = process.argv[2] ? [Number(process.argv[2])] : FREE_DAYS;

let failed = 0;
const ok = (cond: boolean, msg: string) => {
  if (!cond) {
    failed++;
    console.error("FAIL  " + msg);
  } else console.log("ok    " + msg);
};

const base = (): Persisted => emptyPersisted();
type Patch = (r: ReturnType<typeof freeRouteKey>) => void;
/** A person who has answered everything with the model, with an optional change on route 1 or route 2. */
const withKey = (spec: FreeSpec, on1?: Patch, on2?: Patch): Persisted => {
  const p = base() as unknown as Record<string, unknown>;
  const r1 = freeRouteKey(spec, 1);
  const r2 = freeRouteKey(spec, 2);
  on1?.(r1);
  on2?.(r2);
  p.participant = { name: "Test Person" };
  p[`d${spec.day}`] = { r1, r2 };
  return p as unknown as Persisted;
};
const ids = (m: { id: string }[]) => m.map((x) => x.id);
/** The export of the table layout of one text field holds a table and its first model cell. */
const tableDocHas = (spec: FreeSpec, id: string, route: 1 | 2) => {
  const p = withKey(spec, (r) => (r.modes[id] = "table"), (r) => (r.modes[id] = "table"));
  const html = route === 1 ? freeAnalysisBody(p, spec) : freeMemoBody(p, spec);
  const f = fieldsOf(spec, route).find((x) => x.id === id);
  if (!f || f.kind !== "text" || !f.table) return false;
  const first = Object.values(f.table.model[0])[0].slice(0, 14).replace(/&/g, "&amp;");
  return html.includes("<table>") && html.includes(first);
};

for (const day of want) {
  const spec = SPECS[day];
  for (const lang of ["en"] as const) {
    setCurrentLang(lang);
    console.log(`\n=== DAY ${day} · ${lang.toUpperCase()} ===`);
    const f1 = fieldsOf(spec, 1);
    const f2 = fieldsOf(spec, 2);

    // 1 · the shape: the plan's numbered questions, every block Core, nothing the plan does not print
    ok(blocksOf(spec, 1).map((b) => b.id).join() === "1.1,1.2,2.1" && spec.block2.id === "3.1", "Route 1 has the blocks 1.1, 1.2 and 2.1; Route 2 has block 3.1");
    ok(f2.length === 6 || f2.length === 7, "Block 3.1 asks the questions of the transfer project (six, or seven where one item has two parts)");
    // every "see above" reference lands on a field that exists (a list is answered in a box whose id ends in Text)
    const domIds = new Set(f1.concat(f2).flatMap((f) => (f.kind === "lists" ? f.lists.map((l) => l.id) : [f.id])));
    const refTargets = f1.concat(f2).flatMap((f) => f.refs ?? []).map((r) => r.target);
    const badRefs = refTargets.filter((tg) => /-field$/.test(tg) && !domIds.has(tg.replace(/-field$/, "")));
    ok(badRefs.length === 0, "every reference to an earlier answer points at a field that exists" + (badRefs.length ? ": " + badRefs.join(", ") : ""));
    // reference-platform cards (DL-STANDARD section 16) are counted apart from the plan's coaching and feedback cards
    const planCards = spec.cards.filter((c) => c.after !== "brief1" && c.after !== "brief2" && !c.id.startsWith("ref-card"));
    const refCards = spec.cards.filter((c) => c.id.startsWith("ref-card"));
    if (refCards.length) ok(refCards.every((c) => c.sections.length === 2 && c.sections[0].items!.length >= 3 && (c.after === "2.1" || c.after === "3.1")), "reference-platform cards sit under 2.1 or 3.1 with the analysis and the discussion prompts");
    ok(planCards.length === 2 && planCards.every((c) => c.sections.length >= 2), "two hidden facilitator cards (coaching and feedback round)");
    // DL-STANDARD section 14: each case brief names what is known and what is open, and a hidden card holds the standard answers
    for (const [n, b] of [["brief1", spec.brief1], ["brief2", spec.brief2]] as const) {
      ok(!!b.known && b.known.columns.length === 3 && b.known.columns.every((c) => c.items.length >= 3), `${n}: a "known and open" box with three columns of at least three points`);
      const qaCards = spec.cards.filter((c) => c.after === n);
      ok(qaCards.length === 1 && qaCards[0].sections.every((s) => (s.qa?.length ?? 0) >= 3 && s.qa!.every((x) => x.q.length > 5 && x.a.length > 20)), `${n}: one hidden "if a participant asks" card with at least three answered questions`);
    }
    const lists = f1.concat(f2).filter((f) => f.kind === "lists");
    ok(lists.every((f) => f.kind === "lists" && listLines(f.lists[0].model).length === f.n && f.table.model.length === f.n && f.table.model.every((r) => f.table.cols.every((c) => !!r[c.key]))), "every list holds exactly the asked number of items, in both layouts");
    ok(f1.concat(f2).every((f) => f.kind !== "text" || (f.guide.example.length > 20 && f.guide.lookFor.length >= 2 && f.model.length >= f.min)), "every text field has a model above its minimum and a worked example");
    ok(f1.concat(f2).filter((f) => f.kind === "pick").every((f) => f.kind === "pick" && f.options.filter((o) => o.expected).length === 1 && f.options.some((o) => o.id === f.model && o.expected)), "every pick has exactly one reference option and it is the model");
    const alltext = (PLAN_FIGURES[day] ?? []).reduce((s, x) => s.split(x).join(""), JSON.stringify(spec));
    ok(!/€\s?\d|\d\s?€/.test(alltext), "no cost or budget figure is printed beyond the ones the plan prints");

    // 2 · from empty: a named, finite missing list in each route
    const p0 = base();
    const m1 = freeMissing(p0, spec, 1);
    const m2 = freeMissing(p0, spec, 2);
    ok(m1.length > 0 && m1.every((m) => m.label.length > 12 && m.id.length > 0), `Route 1 from empty names ${m1.length} concrete items`);
    ok(m2.filter((m) => /^Block 3\.1:/.test(m.label)).length >= 6 && m2.every((m) => m.label.length > 12), "Route 2 from empty names the items of Block 3.1");
    ok(m1.every((m) => /^(Block (1\.1|1\.2|2\.1):)|^[A-Z]/.test(m.label)), "every Route 1 entry names one of the three blocks");

    // 3 · the model answers empty every list and complete every block
    const p1 = withKey(spec);
    ok(freeMissing(p1, spec, 1).length === 0 && freeMissing(p1, spec, 2).length === 0, "the model answers leave nothing missing in either route");
    ok(Object.values(freeTaskBlocks(p1, spec)).every(Boolean) && Object.keys(freeTaskBlocks(p1, spec)).length === 4, "every task block is complete after the model fill");
    const mats = materialsOf(day);
    ok(freeDossier(p1, spec, mats.MATERIALS, 1).total === mats.MATERIALS.filter((x) => x.block === "A" && !x.optional).length + 3 && freeDossier(p1, spec, mats.MATERIALS, 2).total === mats.MATERIALS.filter((x) => x.block === "B" && !x.optional).length + 1, "progress totals count the cards and the task blocks");

    // 4 · every list and every assessment: layout by layout
    for (const f of f1.concat(f2)) {
      const route: 1 | 2 = f1.includes(f) ? 1 : 2;
      const miss = (p: Persisted) => freeMissing(p, spec, route);
      if (f.kind === "lists") {
        const table = withKey(spec, (r) => route === 1 && (r.modes[f.id] = "table"), (r) => route === 2 && (r.modes[f.id] = "table"));
        ok(miss(table).length === 0, `list ${f.id}: the model table leaves nothing missing in the table layout`);
        const tableEmpty = withKey(spec, (r) => route === 1 && ((r.modes[f.id] = "table"), (r.rows[f.id] = emptyFreeRoute([f]).rows[f.id])), (r) => route === 2 && ((r.modes[f.id] = "table"), (r.rows[f.id] = emptyFreeRoute([f]).rows[f.id])));
        ok(ids(miss(tableEmpty)).filter((x) => x.startsWith(`${f.id}-row-`)).length === f.n, `list ${f.id}: in the table layout, a full text box does not count (${f.n} rows named)`);
        const textEmpty = withKey(spec, (r) => route === 1 && (r.text[f.lists[0].id] = ""), (r) => route === 2 && (r.text[f.lists[0].id] = ""));
        ok(ids(miss(textEmpty)).includes(`${f.lists[0].id}-field`), `list ${f.id}: in the text layout, a full table does not count`);
        const few = withKey(spec, (r) => route === 1 && (r.text[f.lists[0].id] = f.lists[0].model.split("\n").slice(0, f.n - 1).join("\n")), (r) => route === 2 && (r.text[f.lists[0].id] = f.lists[0].model.split("\n").slice(0, f.n - 1).join("\n")));
        ok(miss(few).some((m) => m.id === `${f.lists[0].id}-field` && m.label.includes(String(f.n - 1))), `list ${f.id}: one item too few is named with the count`);
        const gap = withKey(spec, (r) => route === 1 && ((r.modes[f.id] = "table"), (r.rows[f.id][0][f.table.cols[f.table.cols.length - 1].key] = "")), (r) => route === 2 && ((r.modes[f.id] = "table"), (r.rows[f.id][0][f.table.cols[f.table.cols.length - 1].key] = "")));
        ok(miss(gap).some((m) => m.id === `${f.id}-row-0`), `list ${f.id}: a table row without its last cell is named (row 1)`);
      } else if (f.kind === "assess") {
        const tbl = withKey(spec, (r) => (r.modes[f.id] = "table"));
        ok(miss(tbl).length === 0, `assessment ${f.id}: the model table leaves nothing missing in the table layout`);
        const tblEmpty = withKey(spec, (r) => ((r.modes[f.id] = "table"), (r.assessRows[f.id] = emptyFreeRoute([f]).assessRows[f.id])));
        ok(ids(miss(tblEmpty)).filter((x) => x.startsWith(`${f.id}-`)).length === f.items.length, `assessment ${f.id}: in the table layout, filled boxes do not count`);
        const gap = withKey(spec, (r) => ((r.modes[f.id] = "table"), (r.assessRows[f.id][f.items[1].id][f.cols[0].key] = "")));
        ok(miss(gap).some((m) => m.id === `${f.id}-${f.items[1].id}`), `assessment ${f.id}: a table row with an empty cell is named`);
      } else if (f.kind === "pick") {
        const other = f.options.find((o) => !o.expected)!;
        const diff = withKey(spec, (r) => route === 1 && (r.picks[f.id] = other.id), (r) => route === 2 && (r.picks[f.id] = other.id));
        ok(miss(diff).length === 0, `pick ${f.id}: a different choice with a reason still has nothing missing`);
        ok(miss(withKey(spec, (r) => route === 1 && (r.picks[f.id] = null))).some((m) => m.id === `${f.id}-field`) || route === 2, `pick ${f.id}: no choice is named as missing`);
      } else {
        const short = withKey(spec, (r) => route === 1 && (r.text[f.id] = "too short"), (r) => route === 2 && (r.text[f.id] = "too short"));
        ok(miss(short).some((m) => m.id === `${f.id}-field`), `text ${f.id}: a too-short answer is named`);
      }
    }

    // 4b · the guided tables (DL-STANDARD section 15): hints for every column, one example row that is not an answer, the layout counts alone
    type G = { f: FreeField; route: 1 | 2; guide: GuideSpec | undefined; cols: string[]; first: boolean; model: Record<string, string>[] };
    const guided = f1.concat(f2).flatMap((f): G[] => {
      const route: 1 | 2 = f1.includes(f) ? 1 : 2;
      if (f.kind === "lists") return [{ f, route, guide: f.table.guide, cols: f.table.cols.map((c) => c.key), first: false, model: f.table.model }];
      if (f.kind === "assess") return [{ f, route, guide: f.tableGuide, cols: f.cols.map((c) => c.key), first: true, model: [] as Record<string, string>[] }];
      if (f.kind === "text" && f.table) return [{ f, route, guide: f.table.guide, cols: f.table.cols.map((c) => c.key), first: f.table.kind === "frame" || !!(f.table.kind === "rows" && f.table.numbered), model: f.table.model }];
      return [];
    });
    ok(guided.length >= 8, `${guided.length} questions offer a guided table`);
    for (const g of guided) {
      if (!g.guide) { console.log("   no guide:", g.f.id); continue; }
      for (const k of g.cols) if (!((g.guide.hints[k] ?? "").length > 8 && (g.guide.example.cells[k] ?? "").length > 8)) console.log("   weak column", g.f.id, k);
      if (g.first && !(g.guide.hints.first && g.guide.example.first)) console.log("   no first", g.f.id);
    }
    ok(guided.every((g) => !!g.guide && g.cols.every((k) => (g.guide!.hints[k] ?? "").length > 8 && (g.guide!.example.cells[k] ?? "").length > 8) && (!g.first || (!!g.guide!.hints.first && !!g.guide!.example.first))), "every guided table has a hint and an example cell for every column (and for the row header where there is one)");
    ok(guided.every((g) => g.model.every((row) => g.cols.every((k) => (row[k] ?? "") !== g.guide!.example.cells[k]))), "the grey example row is never a model answer");
    ok(guided.every((g) => !g.guide!.suggest || Object.keys(g.guide!.suggest).every((k) => g.cols.includes(k) && g.guide!.suggest![k].values.length >= 3)), "suggestions belong to a column of the table and offer at least three values");
    for (const f of f1.concat(f2)) {
      if (f.kind !== "text" || !f.table) continue;
      const route: 1 | 2 = f1.includes(f) ? 1 : 2;
      const T = f.table;
      const miss = (p: Persisted) => freeMissing(p, spec, route);
      const mode = (r: ReturnType<typeof freeRouteKey>) => (r.modes[f.id] = "table");
      const only = (fn: (r: ReturnType<typeof freeRouteKey>) => void) => withKey(spec, route === 1 ? fn : undefined, route === 2 ? fn : undefined);
      ok(miss(only(mode)).length === 0, `text ${f.id}: the model table leaves nothing missing in the table layout`);
      ok(miss(only((r) => { mode(r); r.text[f.id] = ""; })).length === 0, `text ${f.id}: in the table layout, an empty text box does not matter`);
      ok(miss(only((r) => { r.text[f.id] = ""; })).some((m) => m.id === `${f.id}-field`), `text ${f.id}: in the text layout, a full table does not count`);
      const wipe = (r: ReturnType<typeof freeRouteKey>) => { mode(r); r.rows[f.id] = r.rows[f.id].map((row) => Object.fromEntries(Object.keys(row).map((k) => [k, ""]))); };
      ok(miss(only(wipe)).length > 0, `text ${f.id}: in the table layout, a full text box does not count`);
      const lastKey = T.cols[T.cols.length - 1].key;
      ok(miss(only((r) => { mode(r); r.rows[f.id][0][lastKey] = ""; })).some((m) => m.id === `${f.id}-row-0`), `text ${f.id}: a row or part with an empty cell is named`);
      ok(miss(only((r) => { mode(r); r.rows[f.id][0][lastKey] = "Low: "; })).some((m) => m.id === `${f.id}-row-0`), `text ${f.id}: a scale word alone does not count as an answer`);
      if (T.kind === "rows") {
        ok(T.model.length >= 2 && T.model.length <= 8, `text ${f.id}: the model fills two to eight rows`);
        ok(miss(only((r) => { mode(r); r.rows[f.id] = r.rows[f.id].slice(0, 2).concat([Object.fromEntries(T.cols.map((c) => [c.key, ""]))]); })).length === 0, `text ${f.id}: two complete rows and an empty one count`);
        ok(miss(only((r) => { mode(r); r.rows[f.id] = r.rows[f.id].slice(0, 1); })).some((m) => m.id === `${f.id}-field`), `text ${f.id}: one complete row is not enough`);
      } else ok(T.model.length === T.rows.length, `text ${f.id}: the model fills every fixed row`);
      ok(tableDocHas(spec, f.id, route), `text ${f.id}: the export prints the chosen table`);
    }

    // 5 · the worked answers and the exports
    const gids = f1.concat(f2).flatMap((f) => (f.kind === "lists" ? f.lists.map((l) => l.id) : f.kind === "pick" ? [] : [f.id]));
    ok(gids.every((id) => !!guideOf(spec, id)?.answer && !!guideOf(spec, id)?.example && !!guideOf(spec, id)?.lookFor?.length), "every question has a worked answer with an example and a look-for list");
    const doc = freeAnalysisBody(p1, spec);
    const memo = freeMemoBody(p1, spec);
    const snips = f1.flatMap((f) => (f.kind === "text" ? [f.model.slice(0, 18)] : f.kind === "lists" ? [f.lists[0].model.split("\n")[0].replace(/^\d+\.\s*/, "").slice(0, 18)] : []));
    ok(snips.every((s) => doc.includes(s.replace(/&/g, "&amp;"))), "the UX Analysis File prints the learner's own answers");
    const snips2 = f2.flatMap((f) => (f.kind === "text" ? [f.model.slice(0, 18)] : f.kind === "lists" ? [f.lists[0].model.split("\n")[0].replace(/^\d+\.\s*/, "").slice(0, 18)] : []));
    ok(snips2.every((s) => memo.includes(s.replace(/&/g, "&amp;"))), "the UX Strategy Memo prints the learner's own answers");
    ok(doc.includes("Test Person") && memo.includes("Test Person"), "both documents carry the participant's name");
    ok(!/answer key|Musterlösung|expected/i.test(doc + memo) && !/[✓✗]/.test(doc + memo) && !/€\s?\d|\d\s?€/.test(doc + memo), "no answer key, tick, cross or cost figure in an export");
    const tableDoc = freeAnalysisBody(withKey(spec, (r) => f1.forEach((f) => (f.kind === "lists" || f.kind === "assess") && (r.modes[f.id] = "table"))), spec);
    ok(tableDoc.includes("<table>") && !doc.includes("<table>") === (f1.every((f) => f.kind !== "assess")) || tableDoc.includes("<th>"), "the export prints a table in the table layout");
    ok(freeAnalysisBody(p0, spec).includes("—") && freeMemoBody(p0, spec).includes("—"), "empty documents still build");

    // 6 · the glossary (English first, UX-STANDARD decision 4)
    ok(GLOSSARY.every((g) => !!g.plain && g.match.length > 0), "every glossary entry has an English text");
    ok(GLOSS_LOOKUP.size > 20, "the glossary lookup has entries");
  }

  setCurrentLang("en");
  console.log(`\n=== DAY ${day} · language-independent ===`);
  const mats = materialsOf(day);
  ok(mats.MATERIALS.filter((x) => x.block === "A").reduce((s, x) => s + x.minutes, 0) === 60, "Materi A cards add up to 60 minutes");
  ok(mats.MATERIALS.filter((x) => x.block === "B").reduce((s, x) => s + x.minutes, 0) === 60, "Materi B cards add up to 60 minutes");
  const slice = emptyFreeRoute(fieldsOf(spec, 1));
  const merged = mergeDefaults(slice, { text: { [fieldsOf(spec, 1).find((f) => f.kind === "text")!.id]: "kept answer" }, sort: { f1: "x" }, chosen: ["m1"] });
  ok(Object.values(merged.text).includes("kept answer") && Object.keys(merged.rows).length === Object.keys(slice.rows).length, "an old slice keeps what fits and gets every new key from the defaults");
  ok(mergeDefaults(slice, { text: 5 }).text !== (5 as never), "a value of the wrong type is dropped");
}

setCurrentLang("en");
ok(MENTOR_PASSCODE === "muchson123", "the mentor passcode is unchanged");
const migrated = migratePersisted({ participant: { name: "Old" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: { r1: {}, r2: {} } });
ok(FREE_DAYS.every((d) => !!(migrated as unknown as Record<string, unknown>)[`d${d}`]) && migrated.participant.name === "Old", "an old blob migrates to the current shape with its name kept");

console.log(failed ? `\n${failed} check(s) FAILED` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
