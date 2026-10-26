import { getLang, tt } from "@/lib/lang";
import { esc } from "@/lib/svg";

/**
 * Shared pieces of every exported document (CLAUDE.md #16): the CSS, the page wrapper, the download and print helpers. Each day builds its own
 * bodies (lib/dayN/exportDoc.ts) as a self-contained HTML string in the active language; the on-screen "Preview of your …" renders the
 * same body, so what the participant reads is what they download. An export never prints answer keys, ticks, crosses or scores.
 */

export const DOC_CSS = `
.doc{font-family:Georgia,Cambria,"Times New Roman",serif;color:#17212E;background:#FFFFFF;line-height:1.5;font-size:14px}
.doc *{box-sizing:border-box}
.doc h1{font-size:22px;margin:0 0 4px;font-weight:600}
.doc h2{font-size:15px;margin:22px 0 8px;padding-bottom:4px;border-bottom:1px solid #D5DEE9;font-weight:600;letter-spacing:.01em}
.doc h3{font-size:13.5px;margin:14px 0 4px;font-weight:600}
.doc .meta{display:grid;grid-template-columns:auto 1fr;gap:2px 14px;margin:12px 0 4px;font-family:system-ui,sans-serif;font-size:12.5px}
.doc .meta dt{color:#556274}.doc .meta dd{margin:0}
.doc .kicker{font-family:system-ui,sans-serif;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#1750A8}
.doc table{width:100%;border-collapse:collapse;font-size:12.5px;font-family:system-ui,sans-serif}
.doc th{text-align:left;font-weight:600;color:#556274;border-bottom:1px solid #556274;padding:4px 8px 4px 0;font-size:11px;letter-spacing:.04em;text-transform:uppercase}
.doc td{border-bottom:1px solid #E6ECF4;padding:6px 8px 6px 0;vertical-align:top}
.doc td.num{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}
.doc td.id{font-weight:700}
.doc table{table-layout:auto}.doc td,.doc th{overflow-wrap:anywhere}
.doc blockquote{margin:6px 0;padding:6px 12px;border-left:3px solid #4C8BE0;background:#E3ECFA}
.doc .muted{color:#556274}
.doc .foot{margin-top:26px;padding-top:8px;border-top:1px solid #556274;font-family:system-ui,sans-serif;font-size:12px;color:#556274}
.doc .legend{font-family:system-ui,sans-serif;font-size:11.5px;color:#556274;margin:4px 0 0}
.doc svg{display:block;margin:8px 0}
@media print{.doc{font-size:12px}.doc h2{break-after:avoid}.doc table,.doc svg,.doc blockquote{break-inside:avoid}}
`;

export const dateLabel = () => new Date().toLocaleDateString(getLang() === "de" ? "de-DE" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

export const para = (s: string) => `<blockquote>${esc(s.trim()) || "—"}</blockquote>`;
export const cell = (s: string) => esc(s.trim()) || "—";

export function wrapDocument(title: string, body: string): string {
  return `<!doctype html>
<html lang="${getLang()}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<style>body{margin:0;background:#F3F6FA}.sheet{max-width:820px;margin:0 auto;padding:36px 40px;background:#FFFFFF}@media print{body{background:#fff}.sheet{padding:0;max-width:none}@page{margin:16mm}}${DOC_CSS}</style>
</head><body><div class="sheet"><div class="doc">${body}</div></div></body></html>`;
}

export function downloadHtml(filename: string, html: string) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".html") ? filename : `${filename}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Opens the same document in a new window and prints it (no PDF library). Falls back to a hidden frame if pop-ups are blocked. */
export function printDocument(title: string, html: string) {
  const win = window.open("", "_blank");
  if (win) {
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.document.title = title;
    win.focus();
    window.setTimeout(() => win.print(), 250);
    return;
  }
  const iframe = document.createElement("iframe");
  iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden";
  document.body.appendChild(iframe);
  const w = iframe.contentWindow;
  if (!w) return iframe.remove();
  w.document.open();
  w.document.write(html);
  w.document.close();
  window.setTimeout(() => {
    w.focus();
    w.print();
    window.setTimeout(() => iframe.remove(), 1000);
  }, 250);
}

/** The header block every document starts with. */
export function docHeader(opts: { kicker: string; title: string; level: string; day: number; name: string }): string {
  return `
<div class="kicker">${esc(opts.kicker)}</div>
<h1>${esc(opts.title)}</h1>
<dl class="meta">
  <dt>${esc(tt("Course", "Kurs"))}</dt><dd>${esc(tt(`Day ${opts.day}`, `Tag ${opts.day}`))}</dd>
  <dt>${esc(tt("Position", "Einordnung"))}</dt><dd>${esc(opts.level)}</dd>
  <dt>${esc(tt("Participant", "Teilnehmer/in"))}</dt><dd>${esc(opts.name.trim() || "—")}</dd>
  <dt>${esc(tt("Date", "Datum"))}</dt><dd>${esc(dateLabel())}</dd>
</dl>`;
}
