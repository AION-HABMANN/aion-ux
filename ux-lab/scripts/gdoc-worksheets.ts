/**
 * Builds the Google Doc worksheets (Habmann style, UX-STANDARD 2.18 and 2.22) of Blocks 1.1 and 1.2 from a day's spec. One HTML file per block, ready to be
 * uploaded to Drive with the connector (create_file converts it to a Google Doc). The doc holds everything except the answers: the case, the questions with their
 * steps, references and help, the example from another case, and an empty answer table with the grey example row.
 * Run from ux-lab:  npx tsx scripts/gdoc-worksheets.ts <outdir> <day> [<day> ...]   (writes dNN_11.html, dNN_12.html and the .title.txt of each)
 */
import * as R from "react";
import * as fs from "node:fs";
(globalThis as any).React = R;

const NAVY = "#14325c";
const GREEN_BG = "#e8f3ec";
const GREEN = "#2e7d32";
const GREY = "#f1f3f5";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const softHelp = (s: string) => s.replace(/\s*(?:At least|Mindestens) \d+[^.]*\./g, "").trim();

/** The lab's light markup: blank line = paragraph, "• " = bullet, "A) " = option. */
function prose(text: string): string {
  return text
    .split(/\n\n+/)
    .map((par) => {
      const lines = par.split("\n").filter((l) => l.trim());
      const out: string[] = [];
      let bullets: string[] = [];
      const flush = () => {
        if (bullets.length) out.push("<ul>" + bullets.map((b) => `<li>${esc(b)}</li>`).join("") + "</ul>");
        bullets = [];
      };
      for (const l of lines) {
        if (l.startsWith("• ")) bullets.push(l.slice(2));
        else {
          flush();
          const m = /^([A-D]\)) (.*)$/.exec(l);
          out.push(m ? `<p><b>${m[1]}</b> ${esc(m[2])}</p>` : `<p>${esc(l)}</p>`);
        }
      }
      flush();
      return out.join("");
    })
    .join("");
}
const numbered = (text: string) => {
  const lines = text.split("\n").filter((l) => l.trim());
  return lines.map((l) => esc(l)).join("<br>");
};

const band = (kicker: string, title: string) =>
  `<table width="100%" cellpadding="10" cellspacing="0" style="width:100%;border-collapse:collapse"><tr><td align="center" bgcolor="${NAVY}" style="background:${NAVY};color:#ffffff"><span style="font-size:9pt;color:#cfd8e6">${esc(kicker)}</span><br><b style="font-size:13pt;color:#ffffff">${esc(title)}</b></td></tr></table>`;
const box = (inner: string, bg: string, edge: string) =>
  `<table width="100%" cellpadding="10" cellspacing="0" style="width:100%;border-collapse:collapse"><tr><td bgcolor="${bg}" style="background:${bg};border:1px solid ${edge}">${inner}</td></tr></table>`;
const th = (s: string) => `<td bgcolor="${NAVY}" style="background:${NAVY};color:#ffffff;border:1px solid #9aa7b8"><b style="color:#ffffff">${esc(s)}</b></td>`;
const td = (s: string, o: { b?: boolean; i?: boolean; bg?: string } = {}) => {
  const inner = o.b ? `<b>${esc(s)}</b>` : o.i ? `<i>${esc(s)}</i>` : esc(s);
  return `<td ${o.bg ? `bgcolor="${o.bg}"` : ""} style="border:1px solid #9aa7b8;${o.bg ? `background:${o.bg};` : ""}height:26px">${inner || "&nbsp;"}</td>`;
};
const table = (head: string[], rows: string[]) =>
  `<table width="100%" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse"><tr>${head.map(th).join("")}</tr>${rows.map((r) => `<tr>${r}</tr>`).join("")}</table>`;
const emptyRow = (n: number, first?: string) => (first !== undefined ? td(first, { b: true }) : td("")) + Array.from({ length: n - 1 }, () => td("")).join("");
const answerBox = () => `<table width="100%" cellpadding="14" cellspacing="0" style="width:100%;border-collapse:collapse"><tr><td style="border:1px solid #9aa7b8;height:90px">&nbsp;</td></tr></table>`;
const exampleBox = (text: string) =>
  box(`<b style="color:${GREEN}">Example (a different case, not yours)</b><br>${numbered(text)}`, GREEN_BG, GREEN);

function exampleRow(cols: number, first: string | undefined, cells: string[], label?: string): string {
  const vals = first !== undefined ? [first, ...cells] : cells;
  const row = Array.from({ length: cols }, (_, i) => td(vals[i] ?? "", { i: true, bg: GREY }));
  void label;
  return row.join("");
}

function answerTable(f: any): string {
  if (f.kind === "text" && f.table?.kind === "rows") {
    const t = f.table;
    const g = t.guide;
    const head = [...(t.numbered ? [t.orderHead ?? "#"] : []), ...t.cols.map((c: any) => c.label)];
    const exFirst = t.numbered ? g.example.first ?? "Example" : undefined;
    const ex = exampleRow(head.length, exFirst, t.cols.map((c: any) => g.example.cells[c.key] ?? ""));
    const rows = [ex, ...[1, 2, 3, 4, 5].slice(0, t.numbered ? 5 : 3).map((n) => emptyRow(head.length, t.numbered ? String(n) : undefined))];
    return table(head, rows) + (t.numbered ? "" : `<p><i>Add rows as needed.</i></p>`);
  }
  if (f.kind === "text" && f.table?.kind === "frame") {
    const t = f.table;
    const g = t.guide;
    const head = [t.head, ...t.cols.map((c: any) => c.label)];
    const ex = exampleRow(head.length, g.example.first, t.cols.map((c: any) => g.example.cells[c.key] ?? ""));
    const rows = [ex, ...t.rows.map((r: any) => emptyRow(head.length, r.label))];
    return table(head, rows);
  }
  if (f.kind === "lists") {
    const t = f.table;
    const g = t.guide;
    const head = ["#", ...t.cols.map((c: any) => c.label)];
    const ex = g ? exampleRow(head.length, g.example.first ?? "Example", t.cols.map((c: any) => g.example.cells[c.key] ?? "")) : "";
    const rows = [ex, ...Array.from({ length: f.n }, (_, i) => emptyRow(head.length, String(i + 1)))].filter(Boolean);
    return table(head, rows);
  }
  if (f.kind === "assess") {
    const g = f.tableGuide;
    const head = [f.firstCol, ...f.cols.map((c: any) => c.label)];
    const ex = g ? exampleRow(head.length, g.example.first, f.cols.map((c: any) => g.example.cells[c.key] ?? "")) : "";
    const rows = [ex, ...f.items.map((it: any) => emptyRow(head.length, it.label))].filter(Boolean);
    return table(head, rows);
  }
  if (f.kind === "pick") {
    return `<p><i>${esc(f.optionsLabel ?? "Choose one")}:</i> ${f.options.map((o: any) => esc(o.label)).join(" · ")}</p>` + answerBox();
  }
  return answerBox();
}

function exampleOf(f: any): string {
  if (f.kind === "lists") return f.lists?.[0]?.guide?.example ?? "";
  return f.guide?.example ?? "";
}
function helpOf(f: any): string {
  if (f.kind === "lists") return softHelp(f.lists?.[0]?.help ?? f.help ?? "");
  if (f.kind === "assess") return softHelp(f.helpText ?? f.help ?? "");
  return softHelp(f.help ?? "");
}

function question(f: any): string {
  const parts: string[] = [];
  if (f.qLabel) parts.push(band(f.qLabel.toUpperCase(), f.label));
  else parts.push(`<h3 style="color:${NAVY}">${esc(f.label)}</h3>`);
  if (f.steps?.length) parts.push(`<p><b>How to approach it</b></p><ol>${f.steps.map((s: string) => `<li>${esc(s)}</li>`).join("")}</ol>`);
  const refs = (f.refs ?? []).filter((r: any) => !/-field$|^slot-/.test(r.target ?? ""));
  if (refs.length) parts.push(`<p><b>Look at</b></p><ul>${refs.map((r: any) => `<li>${esc(r.label)} · ${esc(r.value)}</li>`).join("")}</ul>`);
  const h = helpOf(f);
  if (h) parts.push(`<p><i>${esc(h)}</i></p>`);
  const ex = exampleOf(f);
  if (ex) parts.push(exampleBox(ex));
  parts.push(`<br>${answerTable(f)}`);
  parts.push("<br>");
  return parts.join("");
}

function worksheet(spec: any, b: any): { html: string; title: string } {
  const d = spec.day;
  const name = b.title.replace(/^Block \d\.\d · /, "");
  const kicker = `UX DEVELOPER · DAY ${d} · BLOCK ${b.id}`;
  const url = `https://aion-ux-lab.vercel.app/day/${d}/route-1/#block-${b.id.replace(".", "-")}`;
  const lab = b.refs.map((r: string) => `Materi ${r}`).join(" · ");
  const how = [
    "Make your own copy first: File → Make a copy. Write your answers in your copy.",
    "Use any tool you like, AI included. The thinking and the decisions are yours.",
    "No question is required. Answer what helps you; leave out what does not.",
    `The case desk, the Materi and the export are in the lab: <a href="${url}">${url}</a>`,
  ];
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(name)}</title>
<style>body{font-family:Cabin,Arial,sans-serif;font-size:11pt;color:#1b2430} h2{color:${NAVY};font-size:14pt} h3{color:${NAVY};font-size:12pt} td{vertical-align:top} p{margin:4pt 0} li{margin:2pt 0}</style></head><body>
${band(kicker, name)}<br>
<table width="100%" cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse"><tr>${td("Name(s)", { b: true })}${td("")}</tr><tr>${td("Time", { b: true })}${td(`${b.minutes} minutes`)}</tr><tr>${td("Materi", { b: true })}${td(lab)}</tr></table><br>
${box(`<b>How to use this worksheet</b><ul>${how.map((x, i) => `<li>${i === 3 ? x.replace(/^(.*?)<a/, (m) => m) : esc(x)}</li>`).join("")}</ul>`, GREY, "#9aa7b8")}
<h2>THE CASE</h2>${prose(b.lead ?? "")}<br>
${b.fields.map(question).join("")}
<p style="color:#6b7787;font-size:9pt">UX Developer · Day ${d} · Block ${b.id} · Worksheet</p></body></html>`;
  return { html, title: `Day ${String(d).padStart(2, "0")} · Block ${b.id} · Worksheet · ${name}` };
}

async function main() {
  const [outdir, ...days] = process.argv.slice(2);
  fs.mkdirSync(outdir, { recursive: true });
  const { setCurrentLang } = await import("../lib/lang");
  setCurrentLang("en");
  const { FREE_SPECS } = await import("../data/free/registry");
  for (const dn of days.map(Number)) {
    const spec: any = (FREE_SPECS as any)[dn];
    for (const b of spec.blocks1.filter((x: any) => x.id === "1.1" || x.id === "1.2")) {
      const w = worksheet(spec, b);
      const base = `${outdir}/d${String(dn).padStart(2, "0")}_${b.id.replace(".", "")}`;
      fs.writeFileSync(base + ".html", w.html, "utf-8");
      fs.writeFileSync(base + ".title.txt", w.title, "utf-8");
      console.log(base, (w.html.length / 1024).toFixed(1) + " KB", w.title);
    }
  }
}
main();
