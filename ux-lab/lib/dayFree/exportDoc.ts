import { blocksOf, listLines, sliceOf, tableMode } from "@/lib/dayFree/model";
import type { FreeField, FreeSpec } from "@/lib/dayFree/spec";
import { cell, docHeader, dateLabel, para } from "@/lib/exportDoc";
import { tt } from "@/lib/lang";
import { esc } from "@/lib/svg";
import type { FreeRoute } from "@/store/dayTypesFree";
import type { Persisted } from "@/store/useStore";

/**
 * The two documents of a free-form day (CLAUDE.md #57), built as self-contained HTML strings in the active language. The on-screen "Preview of your …" and the
 * memo panel render these same bodies, so what the learner reads is what they download. They never print answer keys, ticks, crosses or scores: every answer is
 * the learner's own, printed as written, in the layout (text or table) the learner chose.
 */
const empty = `<p class="muted">—</p>`;
const list = (text: string) => {
  const items = listLines(text);
  return items.length ? `<ol>${items.map((x) => `<li>${cell(x)}</li>`).join("")}</ol>` : empty;
};

function fieldHtml(f: FreeField, r: FreeRoute, level: "h3" | "h2", n?: number): string {
  const H = (s: string) => (level === "h2" ? `<h2>${n ? `${n} · ` : ""}${esc(s)}</h2>` : `<h3>${esc(s)}</h3>`);
  if (f.kind === "text") {
    if (f.table && tableMode(f, r)) {
      const t = f.table;
      const rows = r.rows[f.id] ?? [];
      if (t.kind === "rows") {
        const filled = rows.filter((row) => t.cols.some((c) => (row[c.key] ?? "").trim()));
        if (!filled.length) return `${H(f.doc ?? f.label)}${empty}`;
        return `${H(f.doc ?? f.label)}<table><thead><tr>${t.numbered ? "<th>#</th>" : ""}${t.cols.map((c) => `<th>${esc(c.label)}</th>`).join("")}</tr></thead><tbody>${filled.map((row, i) => `<tr>${t.numbered ? `<td class="id">${i + 1}</td>` : ""}${t.cols.map((c) => `<td>${cell(row[c.key] ?? "")}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
      }
      if (!rows.some((row) => t.cols.some((c) => (row[c.key] ?? "").trim()))) return `${H(f.doc ?? f.label)}${empty}`;
      return `${H(f.doc ?? f.label)}<table><thead><tr><th>${esc(t.head)}</th>${t.cols.map((c) => `<th>${esc(c.label)}</th>`).join("")}</tr></thead><tbody>${t.rows.map((pt, i) => `<tr><td><strong>${esc(pt.label)}</strong></td>${t.cols.map((c) => `<td>${cell(rows[i]?.[c.key] ?? "")}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    }
    return `${H(f.doc ?? f.label)}${para(r.text[f.id] ?? "")}`;
  }
  if (f.kind === "pick") {
    const o = f.options.find((x) => x.id === r.picks[f.id]);
    return `${H(f.doc)}<p><strong>${esc(o ? o.label : "—")}</strong></p>`;
  }
  if (f.kind === "lists") {
    if ((r.modes[f.id] ?? "text") === "table") {
      const rows = (r.rows[f.id] ?? []).filter((row) => f.table.cols.some((c) => (row[c.key] ?? "").trim()));
      if (!rows.length) return `${H(f.table.doc ?? f.label)}${empty}`;
      return `${H(f.table.doc ?? f.label)}<table><thead><tr><th>#</th>${f.table.cols.map((c) => `<th>${esc(c.label)}</th>`).join("")}</tr></thead><tbody>${rows.map((row, i) => `<tr><td class="id">${i + 1}</td>${f.table.cols.map((c) => `<td>${cell(row[c.key] ?? "")}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    }
    return f.lists.map((l) => `${H(l.doc)}${list(r.text[l.id] ?? "")}`).join("");
  }
  const names = f.items.map((i) => ({ id: i.id, name: esc(i.label) }));
  if ((r.modes[f.id] ?? "text") === "table")
    return `${H(f.doc)}<table><thead><tr><th>${esc(f.firstCol)}</th>${f.cols.map((c) => `<th>${esc(c.label)}</th>`).join("")}</tr></thead><tbody>${names.map((i) => `<tr><td>${i.name}</td>${f.cols.map((c) => `<td>${cell(r.assessRows[f.id]?.[i.id]?.[c.key] ?? "")}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  return `${H(f.doc)}${names.map((i) => `<p><strong>${i.name}</strong></p>${para(r.assessText[f.id]?.[i.id] ?? "")}`).join("")}`;
}

/* ------------------------------------------------------------------ Route 1 · the UX Analysis File */

export function freeAnalysisBody(p: Persisted, spec: FreeSpec): string {
  const r = sliceOf(p, spec.day).r1;
  const parts = blocksOf(spec, 1)
    .map((b) => {
      const head = b.id === spec.blocks1[0].id ? `<h2>${esc(`${tt("Part 1", "Teil 1")} · ${spec.route1.part1.level}`)}</h2>` : b.id === spec.route1.part2Before ? `<h2>${esc(`${tt("Part 2", "Teil 2")} · ${spec.route1.part2.level}`)}</h2>` : "";
      return `${head}<h3>${esc(b.doc)}</h3>${b.fields.map((f) => fieldHtml(f, r, "h3")).join("")}`;
    })
    .join("\n");
  return `${docHeader({ kicker: "Neuro-UX Lab", title: "UX Analysis File", level: tt("Levels 1 and 2 · Knowledge and application", "Level 1 und 2 · Wissen und Anwendung"), day: spec.day, name: p.participant.name })}
<h2>${esc(tt("The case", "Der Fall"))}</h2>
<p>${esc(spec.brief1.paragraph)}</p>

${parts}

<div class="foot">${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}

/* ------------------------------------------------------------------ Route 2 · the UX Strategy Memo */

/** The Level 3 memo. The on-screen live memo and the exported file are both built by this function. */
export function freeMemoBody(p: Persisted, spec: FreeSpec): string {
  const s = sliceOf(p, spec.day);
  const pk = spec.pointer;
  const picked = !pk ? "" : (() => {
    const b = spec.blocks1.find((x) => x.id === pk.block);
    const f = b?.fields.find((x) => x.id === pk.field);
    if (!f || f.kind !== "pick") return "";
    return f.options.find((o) => o.id === s.r1.picks[f.id])?.label ?? "";
  })();
  const quoted = !pk
    ? ""
    : picked
    ? `<blockquote><strong>${esc(tt("Where Route 1 left off.", "Wo Route 1 aufgehört hat."))}</strong> ${esc(pk.docLead)} ${esc(picked)}.</blockquote>`
    : `<p class="muted">${esc(tt("Route 1 is not finished, so there is nothing to quote yet. Nothing is blocked.", "Route 1 ist nicht fertig, daher gibt es noch nichts zu zitieren. Nichts ist gesperrt."))}</p>`;
  const items = spec.block2.fields.map((f, i) => fieldHtml(f, s.r2, "h2", i + 1)).join("\n");
  return `${docHeader({ kicker: "Neuro-UX Lab", title: "UX Strategy Memo", level: tt("Level 3 · Management decision", "Level 3 · Managemententscheidung"), day: spec.day, name: p.participant.name })}
<dl class="meta">
  <dt>${esc(tt("To", "An"))}</dt><dd>${esc(spec.route2.to)}</dd>
  <dt>${esc(tt("From", "Von"))}</dt><dd>${esc(p.participant.name.trim() || "—")}, ${esc(spec.role)}</dd>
  <dt>${esc(tt("Subject", "Betreff"))}</dt><dd>${esc(spec.route2.subject)}</dd>
</dl>
${quoted}
${items}

<div class="foot">${esc(tt(`Generated ${dateLabel()}.`, `Erstellt am ${dateLabel()}.`))}</div>`;
}
