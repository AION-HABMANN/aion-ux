/**
 * The German of the lab (UX-STANDARD 2.20): finds the English texts that have no German yet, and merges the German that was written for them.
 *
 *   tsx scripts/de-tool.ts todo <day|common>     writes de-todo/<day>.txt (the learner's texts) and <day>m.txt (texts only the facilitator sees): one line per text, "[12] The English text", a line break shown as ⏎
 *   tsx scripts/de-tool.ts apply <day|common> <file>   reads "[12] Der deutsche Text" lines, checks them against the todo, merges into data/de/<day>.json
 *   tsx scripts/de-tool.ts check [day ...]       counts what is still English (exit 1 if anything); the gate `npm run verify:de`
 *
 * Where a text is found: the first argument of tt("…") and t("…") calls (static, with the TypeScript parser), every text of the glossary, and every text that the day's
 * spec, its study cards and its materials read while they are built in German (dynamic). Raw JSX text and plain text attributes are listed too, as `raw`.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import * as R from "react";
import ts from "typescript";
(globalThis as any).React = R;

const ROOT = path.resolve(__dirname, "..");
const NL = "⏎";
const TODO = path.join(ROOT, "de-todo");
const DAYS = Array.from({ length: 16 }, (_, i) => i + 1);

const walk = (dir: string, out: string[] = []): string[] => {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e.name) && !/\.d\.ts$/.test(e.name)) out.push(p);
  }
  return out;
};

function filesOf(scope: string): string[] {
  if (scope === "common") {
    const dirs = ["components/chrome", "components/day", "components/dayFree", "components/materi", "components/sim", "components/ui", "components/comic", "lib", "app"];
    const files = dirs.flatMap((d) => walk(path.join(ROOT, d))).filter((f) => !/\(original-/.test(f));
    for (const f of ["data/free/kit.ts", "data/course.ts", "data/glossary.ts", "data/materialRegistry.ts", "data/materialTypes.ts"]) if (fs.existsSync(path.join(ROOT, f))) files.push(path.join(ROOT, f));
    return files.filter((f) => !/lib[\\/]lang\.ts$/.test(f));
  }
  const n = scope;
  const files = [...walk(path.join(ROOT, `components/day${n}`)), ...walk(path.join(ROOT, `data/day${n}`))];
  for (const f of [`data/gloss/day${n}.ts`]) if (fs.existsSync(path.join(ROOT, f))) files.push(path.join(ROOT, f));
  return files;
}

type Found = { en: string; where: string };
const needs = (s: string) => /[A-Za-z]{2}/.test(s);

function strOf(n: ts.Expression | undefined): string | null {
  if (!n) return null;
  if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text;
  if (ts.isParenthesizedExpression(n)) return strOf(n.expression);
  if (ts.isBinaryExpression(n) && n.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const a = strOf(n.left), b = strOf(n.right);
    return a !== null && b !== null ? a + b : null;
  }
  return null;
}

function scan(file: string, found: Found[], raw: Found[], dyn: Found[]) {
  const src = fs.readFileSync(file, "utf-8");
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.ES2020, true, file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const at = (n: ts.Node) => `${rel}:${sf.getLineAndCharacterOfPosition(n.getStart()).line + 1}`;
  const visit = (n: ts.Node) => {
    if (ts.isCallExpression(n) && ts.isIdentifier(n.expression) && (n.expression.text === "tt" || n.expression.text === "t") && n.arguments.length >= 1) {
      const a0 = n.arguments[0];
      const s = strOf(a0);
      if (n.arguments.length === 1) {
        if (s !== null) found.push({ en: s, where: at(n) });
        else if (ts.isTemplateExpression(a0)) dyn.push({ en: a0.getText(sf), where: at(n) });
      }
    }
    if (ts.isJsxText(n)) {
      const s = n.text.replace(/\s+/g, " ").trim();
      if (s && /[A-Za-z]{3}/.test(s) && !/^[{}()\[\]|·•—–\-:;,.!?/\\ 0-9]*$/.test(s)) raw.push({ en: s, where: at(n) });
    }
    if (ts.isJsxAttribute(n) && n.initializer && ts.isStringLiteral(n.initializer) && ["aria-label", "title", "placeholder", "alt", "label", "caption", "scan"].includes(n.name.getText(sf))) {
      const s = n.initializer.text;
      if (/\s/.test(s) && /[A-Za-z]{3}/.test(s)) raw.push({ en: s, where: at(n) });
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
}

function loadDict(): Record<string, string> {
  const o: Record<string, string> = {};
  const dir = path.join(ROOT, "data/de");
  for (const f of fs.readdirSync(dir)) if (f.endsWith(".json")) Object.assign(o, JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")));
  return o;
}

async function dynamicTexts(scope: string): Promise<{ learner: string[]; mentor: string[] }> {
  const out = new Set<string>();
  const lang: any = await import("../lib/lang");
  lang.setCurrentLang("de");
  const read = (v: unknown) => {
    try { JSON.stringify(v); } catch { /* a cycle is fine: the getters have run */ }
  };
  if (scope !== "common") {
    const n = Number(scope);
    try {
      const m: any = await import(`../data/day${n}/free`);
      read(m.SPEC ?? Object.values(m)[0]);
    } catch (e) { console.warn("spec", n, String(e).slice(0, 120)); }
    try {
      const Cards: any = await import(`../components/day${n}/Cards`);
      for (const id of ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3"]) {
        const f = Cards[`Card${id}`];
        if (typeof f === "function") {
          try { const el = f(); read(el?.props?.sources); const kids = (x: any): any => (Array.isArray(x) ? x.forEach(kids) : x && typeof x === "object" && x.props ? (Object.values(x.props).forEach(kids), (typeof x.type === "function" && x.type.name === "Extra" ? (() => { try { kids(x.type(x.props)); } catch { /* ignore */ } })() : 0)) : 0); kids(el); } catch { /* ignore */ }
        }
      }
    } catch (e) { console.warn("cards", n, String(e).slice(0, 120)); }
    for (const f of fs.readdirSync(path.join(ROOT, `data/day${n}`)).filter((x) => x.endsWith(".ts") && x !== "free.ts")) {
      try {
        const M: any = await import(`../data/day${n}/${f.replace(/\.ts$/, "")}`);
        for (const v of Object.values(M)) read(v);
      } catch (e) { console.warn("data", n, f, String(e).slice(0, 100)); }
    }
    try {
      const G: any = await import(`../data/gloss/day${n}`);
      for (const e of G[`GLOSSARY_D${n}`] ?? []) for (const k of ["title", "plain", "example"]) if (typeof e[k] === "string" && e[k] && !e.de?.[k]) out.add(e[k]);
    } catch { /* no glossary module */ }
  }
  for (const s of lang.deMisses()) out.add(s);
  return { learner: [...out], mentor: lang.deMissesMentor().filter((s: string) => !out.has(s)) };
}

async function todo(scope: string) {
  const dict = loadDict();
  const found: Found[] = [], raw: Found[] = [], dyn: Found[] = [];
  for (const f of filesOf(scope)) scan(f, found, raw, dyn);
  const texts = new Map<string, string>();
  for (const f of found) if (needs(f.en) && dict[f.en] === undefined && !texts.has(f.en)) texts.set(f.en, f.where);
  const d = await dynamicTexts(scope);
  for (const s of d.learner) if (needs(s) && dict[s] === undefined && !texts.has(s)) texts.set(s, "dynamic");
  const mentor = d.mentor.filter((s) => needs(s) && dict[s] === undefined && !texts.has(s));
  fs.mkdirSync(TODO, { recursive: true });
  const write = (name: string, list: string[]) => {
    fs.writeFileSync(path.join(TODO, `${name}.json`), JSON.stringify(list, null, 0), "utf-8");
    fs.writeFileSync(path.join(TODO, `${name}.txt`), list.map((s, i) => `[${i + 1}] ${s.replace(/\n/g, NL)}`).join("\n") + "\n", "utf-8");
    return `${list.length} texts (${list.reduce((n, s) => n + s.split(/\s+/).length, 0)} words)`;
  };
  const a = write(scope, [...texts.keys()]);
  const b = write(`${scope}m`, mentor);
  fs.writeFileSync(path.join(TODO, `${scope}.raw.txt`), [...raw.map((r) => `RAW ${r.where}  ${r.en}`), ...dyn.map((r) => `TEMPLATE ${r.where}  ${r.en}`)].join("\n") + "\n", "utf-8");
  console.log(`${scope}: learner ${a}; facilitator ${b}; ${raw.length} raw JSX texts/attributes and ${dyn.length} template texts to look at (de-todo/${scope}.raw.txt)`);
}

const marks = (s: string) => s.split(NL).map((l) => (l.match(/^(• |[A-Z]\) |\d+\. )/) ?? [""])[0]);
const digits = (s: string) => (s.match(/\d+(?:[.,]\d+)*/g) ?? []).map((d) => d.replace(/[.,]/g, "")).sort().join(",");

function apply(scope: string, file: string) {
  const list: string[] = JSON.parse(fs.readFileSync(path.join(TODO, `${scope}.json`), "utf-8"));
  const lines = fs.readFileSync(file, "utf-8").split(/\r?\n/).filter((l) => l.trim());
  const got = new Map<number, string>();
  const bad: string[] = [];
  for (const l of lines) {
    const m = /^\[(\d+)\]\s?([\s\S]*)$/.exec(l);
    if (!m) { bad.push(`not a line: ${l.slice(0, 60)}`); continue; }
    got.set(Number(m[1]), m[2]);
  }
  const target = path.join(ROOT, `data/de/${/^\d+m$/.test(scope) ? `day${scope.slice(0, -1)}` : /^\d+$/.test(scope) ? `day${scope}` : scope}.json`);
  const dict: Record<string, string> = JSON.parse(fs.readFileSync(target, "utf-8"));
  let n = 0;
  for (const [i, de] of got) {
    const en = list[i - 1];
    if (en === undefined) { bad.push(`[${i}] is not in the todo`); continue; }
    const enL = en.replace(/\n/g, NL);
    if (marks(enL).join("|") !== marks(de).join("|")) bad.push(`[${i}] line starts differ (• / A) / 1.): ${en.slice(0, 50)}`);
    if (enL.split(NL).length !== de.split(NL).length) bad.push(`[${i}] line count differs: ${en.slice(0, 50)}`);
    if (digits(enL) !== digits(de)) bad.push(`[${i}] numbers differ: ${en.slice(0, 60)} | ${de.slice(0, 60)}`);
    if (en.length > 60 && (de.length < en.length * 0.45 || de.length > en.length * 2.6)) bad.push(`[${i}] length looks wrong (${en.length} → ${de.length}): ${en.slice(0, 50)}`);
    dict[en] = de.replace(new RegExp(NL, "g"), "\n");
    n++;
  }
  const missing = list.map((_, i) => i + 1).filter((i) => !got.has(i));
  if (missing.length) console.log(`(${missing.length} of ${list.length} texts of the todo are still without German)`);
  if (bad.length) console.log("WARN\n" + bad.slice(0, 60).join("\n") + (bad.length > 60 ? `\n… ${bad.length - 60} more` : ""));
  const keys = Object.keys(dict).sort();
  const sorted: Record<string, string> = {};
  for (const k of keys) sorted[k] = dict[k];
  fs.writeFileSync(target, JSON.stringify(sorted, null, 1) + "\n", "utf-8");
  console.log(`merged ${n} texts into ${path.relative(ROOT, target)} (${keys.length} entries); ${bad.length} warnings`);
}

async function check(args: string[]) {
  const strict = args.includes("--strict");
  const only = args.filter((a) => a !== "--strict");
  let total = 0;
  for (const scope of only.length ? only : [...DAYS.map(String), "common"]) {
    const dict = loadDict();
    const found: Found[] = [], raw: Found[] = [], dyn: Found[] = [];
    for (const f of filesOf(scope)) scan(f, found, raw, dyn);
    const miss = new Set<string>();
    for (const f of found) if (needs(f.en) && dict[f.en] === undefined) miss.add(f.en);
    const d = await dynamicTexts(scope);
    for (const s of d.learner) if (needs(s) && dict[s] === undefined) miss.add(s);
    const mentor = d.mentor.filter((s) => needs(s) && dict[s] === undefined && !miss.has(s));
    total += miss.size + (strict ? mentor.length : 0);
    console.log(`${scope.padStart(6)}: ${miss.size} learner texts English only, ${mentor.length} facilitator texts English only${raw.length ? `, ${raw.length} raw` : ""}${dyn.length ? `, ${dyn.length} template` : ""}`);
  }
  if (total) { console.log(`verify:de: ${total} texts still have no German${strict ? "" : " (facilitator texts are counted only with --strict)"}`); process.exitCode = 1; } else console.log("verify:de: every text has German");
}

async function main() {
  const [cmd, a, b, ...rest] = process.argv.slice(2);
  if (cmd === "todo") await todo(a);
  else if (cmd === "apply") apply(a, b);
  else if (cmd === "check") await check([a, b, ...rest].filter(Boolean) as string[]);
  else console.log("usage: todo <day|common> | apply <day|common> <file> | check [day ...]");
}
main();
