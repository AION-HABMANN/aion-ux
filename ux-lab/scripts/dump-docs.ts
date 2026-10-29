/**
 * Dumps what the Word documents need (docx/ in the repository root) as JSON: the English spec of each day, its study cards (text, tables, callouts, the
 * deeper-reading boxes), the "In plain words" texts, the glossary and the references. The cards are called as plain functions (they only build elements);
 * the pictures and labs are not rendered here, docx/_tools/capture-figures.mjs photographs them from the built site.
 * Run from ux-lab:  npx tsx scripts/dump-docs.ts ../docx/_work/dump.json
 */
import * as R from "react";
import * as fs from "node:fs";
(globalThis as any).React = R;

const kids = (n: any): any[] => (Array.isArray(n) ? n.flatMap(kids) : n === null || n === undefined || n === false ? [] : [n]);
const txt = (n: any): string =>
  kids(n)
    .map((c) => (typeof c === "string" || typeof c === "number" ? String(c) : c?.props ? (c.type === "br" ? " " : txt(c.props.children)) : ""))
    .join("");
const paras = (n: any): string[] => kids(n).flatMap((c) => (c?.type === "p" ? [txt(c.props.children)] : c?.type === "ul" || c?.type === "ol" ? kids(c.props.children).map((li: any) => "- " + txt(li.props?.children)) : c?.props ? paras(c.props.children) : typeof c === "string" ? [c] : []));
const nameOf = (c: any) => (typeof c?.type === "function" ? c.type.name : String(c?.type));

async function main() {
  const out = process.argv[2];
  const { setCurrentLang } = await import("../lib/lang");
  setCurrentLang("en");
  const { FREE_SPECS } = await import("../data/free/registry");
  const { materialsOf } = await import("../data/materialRegistry");
  const { REFERENCES } = await import("../data/references");
  const gl: any = await import("../data/glossary");
  const dump: any = { days: {}, refs: {}, glossary: {} };
  for (const [k, v] of Object.entries(REFERENCES as any)) dump.refs[k] = { chip: (v as any).chip, full: (v as any).full };
  for (let d = 1; d <= 16; d++) {
    const gm: any = await import(`../data/gloss/day${d}`);
    for (const e of gm[`GLOSSARY_D${d}`]) dump.glossary[e.id] = { day: d, title: e.title, match: e.match, exactCase: !!e.exactCase, plain: e.plain, example: e.example ?? "" };
  }
  for (let d = 1; d <= 16; d++) {
    const Cards: any = await import(`../components/day${d}/Cards`);
    const M = materialsOf(d);
    const cards: any = {};
    for (const id of ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3"]) {
      const el: any = Cards[`Card${id}`]();
      const p = el.props;
      const items: any[] = [];
      for (const c of kids(p.children)) {
        const n = nameOf(c);
        if (n === "DataTable") items.push({ k: "table", caption: c.props.caption ?? "", head: c.props.head.map(txt), rows: c.props.rows.map((r: any[]) => r.map(txt)) });
        else if (n === "Callout") items.push({ k: "callout", label: c.props.label ?? "", tone: c.props.tone ?? "", text: paras(c.props.children).join("\n\n") });
        else if (n === "Extra") {
          const sm: any = c.type(c.props);
          items.push({ k: "extra", paras: paras(sm.props.children) });
        } else if (n === "ComicButton") items.push({ k: "comic" });
        else if (typeof c.type === "function") items.push({ k: "fig", name: n, label: c.props?.label ?? "" });
        else if (c.type === "p") items.push({ k: "p", text: txt(c.props.children) });
      }
      cards[id] = { scan: p.scan, sources: p.sources, reasoning: p.reasoning, items };
    }
    dump.days[d] = {
      spec: (FREE_SPECS as any)[d],
      materials: M.MATERIALS,
      plain: M.MATERIAL_PLAIN,
      cards,
    };
    console.log("day", d, Object.values(cards).map((c: any) => c.items.length).join(","));
  }
  fs.writeFileSync(out, JSON.stringify(dump), "utf-8");
  console.log("wrote", out, (fs.statSync(out).size / 1e6).toFixed(2), "MB");
}
main();
