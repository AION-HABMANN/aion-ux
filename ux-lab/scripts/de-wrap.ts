/**
 * Wraps the plain English text of a component in tt("…") so that it can have a German version (UX-STANDARD 2.20).
 *
 *   tsx scripts/de-wrap.ts <day|common|all> [--write]
 *
 * Wrapped: an element whose only content is one text (`<p>Hello</p>` → `<p>{tt("Hello")}</p>`), and a text attribute (label, caption, scan, title, aria-label,
 * placeholder, alt). A text mixed with other elements or expressions (`Click <b>Save</b> to go on`) is only listed: its German word order differs, so it is
 * rewritten by hand. Without --write nothing is changed.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import ts from "typescript";

const ROOT = path.resolve(__dirname, "..");
const DAYS = Array.from({ length: 16 }, (_, i) => String(i + 1));
const ATTRS = new Set(["aria-label", "title", "placeholder", "alt", "label", "caption", "scan"]);

const walk = (dir: string, out: string[] = []): string[] => {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.tsx$/.test(e.name)) out.push(p);
  }
  return out;
};
const filesOf = (scope: string): string[] =>
  scope === "common"
    ? ["components/chrome", "components/day", "components/dayFree", "components/materi", "components/sim", "components/ui", "components/comic", "app"].flatMap((d) => walk(path.join(ROOT, d))).filter((f) => !/\(original-/.test(f))
    : walk(path.join(ROOT, `components/day${scope}`));

const real = (s: string) => /[A-Za-z]{3}/.test(s) && !/^[{}()\[\]|·•—–\-:;,.!?/\\ 0-9]*$/.test(s) && !/[&{}]/.test(s);

function addImport(src: string): string {
  if (/\btt\b[^\n]*from "@\/lib\/(lang|i18n)"/.test(src) || /import\s*{[^}]*\btt\b[^}]*}\s*from\s*"@\/lib\/(lang|i18n)"/.test(src)) return src;
  const m = /import\s*{([^}]*)}\s*from\s*"@\/lib\/lang";/.exec(src);
  if (m) return src.replace(m[0], `import {${m[1].trimEnd()}, tt } from "@/lib/lang";`);
  const imports = [...src.matchAll(/^import [^\n]*;\r?$/gm)];
  const at = imports.length ? imports[imports.length - 1].index! + imports[imports.length - 1][0].length : 0;
  const nl = src.includes("\r\n") ? "\r\n" : "\n";
  return src.slice(0, at) + `${nl}import { tt } from "@/lib/lang";` + src.slice(at);
}

function run(file: string, write: boolean): { wrapped: number; mixed: string[] } {
  let src = fs.readFileSync(file, "utf-8");
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.ES2020, true, ts.ScriptKind.TSX);
  const edits: { start: number; end: number; text: string }[] = [];
  const mixed: string[] = [];
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const visit = (n: ts.Node) => {
    if (ts.isJsxElement(n)) {
      const kids = n.children.filter((c) => !(ts.isJsxText(c) && !c.text.trim()));
      const texts = kids.filter((c): c is ts.JsxText => ts.isJsxText(c) && real(c.text.replace(/\s+/g, " ").trim()));
      if (texts.length) {
        if (kids.length === 1) {
          const t = texts[0];
          const s = t.text.replace(/\s+/g, " ").trim();
          const lead = t.text.length - t.text.trimStart().length;
          const trail = t.text.length - t.text.trimEnd().length;
          edits.push({ start: t.pos + lead, end: t.end - trail, text: `{tt(${JSON.stringify(s)})}` });
        } else {
          for (const t of texts) mixed.push(`${rel}:${sf.getLineAndCharacterOfPosition(t.pos + (t.text.length - t.text.trimStart().length)).line + 1}  ${t.text.replace(/\s+/g, " ").trim().slice(0, 90)}`);
        }
      }
    }
    if (ts.isJsxAttribute(n) && n.initializer && ts.isStringLiteral(n.initializer) && ATTRS.has(n.name.getText(sf))) {
      const s = n.initializer.text;
      if (real(s)) edits.push({ start: n.initializer.getStart(), end: n.initializer.end, text: `{tt(${JSON.stringify(s)})}` });
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  if (write && edits.length) {
    edits.sort((a, b) => b.start - a.start);
    for (const e of edits) src = src.slice(0, e.start) + e.text + src.slice(e.end);
    fs.writeFileSync(file, addImport(src), "utf-8");
  }
  return { wrapped: edits.length, mixed };
}

const [scope, flag] = process.argv.slice(2);
const scopes = scope === "all" ? [...DAYS, "common"] : [scope];
let total = 0;
const allMixed: string[] = [];
for (const sc of scopes) {
  let w = 0;
  for (const f of filesOf(sc)) {
    const r = run(f, flag === "--write");
    w += r.wrapped;
    allMixed.push(...r.mixed);
  }
  total += w;
  console.log(`${sc}: ${w} texts ${flag === "--write" ? "wrapped" : "to wrap"}`);
}
fs.mkdirSync(path.join(ROOT, "de-todo"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "de-todo", "mixed.txt"), allMixed.join("\n") + "\n", "utf-8");
console.log(`total ${total}; ${allMixed.length} mixed texts to rewrite by hand (de-todo/mixed.txt)`);
