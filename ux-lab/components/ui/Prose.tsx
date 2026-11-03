import clsx from "clsx";
import type { ReactNode } from "react";
import { Gloss } from "@/lib/glossify";

/**
 * A long text, set so that it can be read (UX-STANDARD 2.19). The text may carry a little markup, and nothing in it changes a word:
 * a blank line starts a new paragraph; a line that starts with "• " is a bullet; a line that starts with "A) ", "B) " is an option on its own line;
 * a plain line right above a list is its lead-in. A long text without any markup is cut into short paragraphs of one or two sentences.
 */
type Block =
  | { kind: "p"; text: string }
  | { kind: "list"; intro?: string; items: string[] }
  | { kind: "opts"; intro?: string; items: { label: string; text: string }[] };

const ABBR = ["e.g.", "i.e.", "vs.", "etc.", "No.", "approx.", "Fig.", "Dr.", "St."];
const AUTO_AT = 240;
const GROUP_MAX = 230;

function sentences(t: string): string[] {
  let p = t;
  ABBR.forEach((a, i) => { p = p.split(a).join(`\u0000${i}\u0000`); });
  const out: string[] = [];
  let last = 0;
  const re = /([.!?]["”’)]?)\s+(?=[A-Z“"(])/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(p))) {
    out.push(p.slice(last, m.index + m[1].length));
    last = m.index + m[0].length;
  }
  out.push(p.slice(last));
  return out.map((s) => s.replace(/\u0000(\d+)\u0000/g, (_, i) => ABBR[Number(i)]).trim()).filter(Boolean);
}

function autoSplit(t: string): string[] {
  const out: string[] = [];
  let buf: string[] = [];
  for (const s of sentences(t)) {
    if (buf.length && (buf.length >= 2 || buf.join(" ").length + s.length + 1 > GROUP_MAX)) {
      out.push(buf.join(" "));
      buf = [];
    }
    buf.push(s);
  }
  if (buf.length) out.push(buf.join(" "));
  return out;
}

export function parseProse(text: string): Block[] {
  if (!text.includes("\n")) {
    return text.length >= AUTO_AT ? autoSplit(text).map((s) => ({ kind: "p" as const, text: s })) : [{ kind: "p", text }];
  }
  const blocks: Block[] = [];
  for (const chunk of text.split(/\n{2,}/)) {
    const lines = chunk.split("\n").filter((l) => l.trim());
    let i = 0;
    let intro: string | undefined;
    const plain: string[] = [];
    while (i < lines.length) {
      const l = lines[i];
      if (l.startsWith("• ")) {
        const items: string[] = [];
        while (i < lines.length && lines[i].startsWith("• ")) items.push(lines[i++].slice(2));
        if (plain.length) { for (const q of plain.slice(0, -1)) blocks.push({ kind: "p", text: q }); intro = plain[plain.length - 1]; plain.length = 0; }
        blocks.push({ kind: "list", intro, items });
        intro = undefined;
      } else if (/^[A-Z]\) /.test(l)) {
        const items: { label: string; text: string }[] = [];
        while (i < lines.length && /^[A-Z]\) /.test(lines[i])) { items.push({ label: lines[i][0], text: lines[i].slice(3) }); i++; }
        if (plain.length) { for (const q of plain.slice(0, -1)) blocks.push({ kind: "p", text: q }); intro = plain[plain.length - 1]; plain.length = 0; }
        blocks.push({ kind: "opts", intro, items });
        intro = undefined;
      } else {
        plain.push(l);
        i++;
      }
    }
    for (const q of plain) blocks.push({ kind: "p", text: q });
  }
  return blocks;
}

export function Prose({ text, className, gloss }: { text: string; className?: string; gloss?: boolean }) {
  const g = (s: string): ReactNode => (gloss ? <Gloss>{s}</Gloss> : s);
  return (
    <div className={clsx("space-y-3", className)}>
      {parseProse(text).map((b, i) =>
        b.kind === "p" ? (
          <p key={i}>{g(b.text)}</p>
        ) : (
          <div key={i} className="space-y-1.5">
            {b.intro && <p>{g(b.intro)}</p>}
            {b.kind === "list" ? (
              <ul className="list-disc space-y-1 pl-5">
                {b.items.map((t, j) => <li key={j}>{g(t)}</li>)}
              </ul>
            ) : (
              <div className="space-y-1.5">
                {b.items.map((o, j) => (
                  <p key={j} className="flex gap-2">
                    <span className="w-5 shrink-0 font-semibold text-accent">{o.label})</span>
                    <span>{g(o.text)}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        ),
      )}
    </div>
  );
}
