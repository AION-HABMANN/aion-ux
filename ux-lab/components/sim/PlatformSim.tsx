"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import { tt } from "@/lib/lang";

/**
 * A working mini-platform from data (DL-STANDARD v1.7, section 4): pages that link to pages, so every entry of every menu, list and table opens a real page. Each day writes the
 * platform as it is today, and each option as the platform after the measure, as a `PlatformCfg`; the page graph is checked by `scripts/verify-platforms.ts` (no link to a page that
 * does not exist, every page reachable from the start). The same pages, drawn not clickable and with the task's numbered markers, are the pictures of the task (`PlatformShot`).
 * Own colours only (never the site's blue, teal and rust); the content is made up and nothing here is marked right or wrong.
 */
export type Item = { label: string; go?: string; sub?: string; track?: boolean; /** Show "done" or "open" from this key (set by a "finish" block). */ doneKey?: string; color?: string; pulse?: boolean; /** UX Day 5: a target size or spacing the plan names as a flaw (a small link, tiny buttons); never used to repair. */ css?: CSSProperties };
export type Blk =
  /* `css` (UX Day 3): a day whose plan names a flaw of colour or type (a decorative heading, small grey text, boxes in similar tones) sets it here; never used to repair. */
  | { t: "h"; text: string; mark?: number; css?: CSSProperties }
  | { t: "p"; text: string; size?: number; leading?: number; mark?: number; css?: CSSProperties }
  | { t: "list"; items: string[]; size?: number }
  | { t: "links"; items: Item[]; grid?: 2 | 3; small?: boolean; size?: number; mark?: number; /** the list itself, for example buttons packed with no gap */ css?: CSSProperties }
  | { t: "form"; fields: string[]; button: string; msg: string; mark?: number }
  | { t: "table"; head: string[]; rows: (string | { label: string; go: string })[][]; mark?: number }
  | { t: "wizard"; steps: number; text: string; field: string; doneText: string; size?: number; mark?: number }
  | { t: "quiz"; q: string; options: string[]; right: number; why: string; mark?: number }
  | { t: "progress"; label: string; of: string[]; mark?: number }
  | { t: "toggle"; label: string; on: string; off: string; mark?: number }
  | { t: "note"; title: string; text: string; button?: { label: string; msg: string }; go?: { label: string; go: string }; mark?: number; css?: CSSProperties }
  | { t: "tabs"; tabs: { label: string; fields: string[] }[]; button: string; msg: string; mark?: number }
  | { t: "chat"; intro: string; reply: string; label: string; mark?: number }
  | { t: "finish"; label: string; task: string; key?: string; feedback?: string[]; big?: boolean; mark?: number }
  /* v1.8 (2026-10-22, Days 7 to 16): the parts a real learning platform is made of, so a page reads like a product and not like a line of text. */
  | { t: "hero"; kicker?: string; title: string; text: string; button?: { label: string; go: string }; size?: number; mark?: number }
  | { t: "meta"; items: string[]; size?: number; mark?: number; /** one colour per item, for status chips */ colors?: string[] }
  | { t: "cards"; items: Card[]; size?: number; mark?: number }
  | { t: "outline"; modules: { title: string; text?: string; items: Item[] }[]; size?: number; mark?: number }
  | { t: "person"; name: string; role: string; text: string; size?: number; mark?: number }
  | { t: "quotes"; title?: string; items: { who: string; role: string; text: string }[]; size?: number; mark?: number }
  | { t: "faq"; title?: string; items: { q: string; a: string }[]; size?: number; mark?: number }
  | { t: "sub"; text: string; size?: number };
/** A course or content card in a catalogue: a tag, a title, two lines of description, a line of plain facts and who teaches it. */
export type Card = { title: string; text: string; tag?: string; meta?: string; by?: string; go?: string; track?: boolean };

export type PPage = { title: string; crumb?: string; /** The menu entry this page belongs to, so the menu always marks where the learner is. */ section?: string; blocks: Blk[] };
export type PlatformCfg = {
  name: string;
  start: string;
  nav?: { label: string; go: string }[];
  pages: Record<string, PPage>;
  /** Header colour (default a plain purple-grey), and a phone-width frame for a mobile screen. */
  color?: string;
  phone?: boolean;
  /** Draw the whole platform in washed-out, low-contrast colours (an accessibility day shows the problem as the learner meets it). */
  dim?: boolean;
  /** Text at the right of the header, from the pages visited so far (points, a level, a step count). */
  header?: (visited: string[]) => string;
  /** A plain footer line under every page (company, imprint, privacy), as a real product has. Text only, no links. */
  footer?: string;
};

const INK = "text-[#26323F]";
const btn = "min-h-[40px] rounded border border-[#B9B4C4] bg-[#F4F2F7] px-4 text-[14px] text-[#26323F] hover:bg-[#E9E6F0]";
const btnDark = "min-h-[40px] rounded bg-[#4A4458] px-4 text-[14px] font-semibold text-white hover:bg-[#383344]";
const tile = "min-h-[36px] rounded border border-[#D9D5E2] bg-white px-2 py-1 text-left text-[13px] hover:bg-[#F4F2F7]";

function Mk({ n, on, style }: { n?: number; on?: boolean; style?: CSSProperties }) {
  return on && n ? (
    <span aria-hidden className="absolute z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#17212E] text-[11px] font-bold text-white" style={{ top: -9, right: -9, ...style }}>{n}</span>
  ) : null;
}

/** Every page a config links to, and the links that lead nowhere (used by the verify script). */
export function platformIssues(cfg: PlatformCfg): string[] {
  const out: string[] = [];
  const keys = Object.keys(cfg.pages);
  if (!cfg.pages[cfg.start]) out.push(`${cfg.name}: start page "${cfg.start}" is missing`);
  const seen = new Set<string>([cfg.start]);
  const edges = (k: string): string[] => {
    const p = cfg.pages[k];
    if (!p) return [];
    const to: string[] = [];
    for (const b of p.blocks) {
      if (b.t === "links") b.items.forEach((i) => i.go && to.push(i.go));
      if (b.t === "table") b.rows.forEach((r) => r.forEach((c) => typeof c !== "string" && to.push(c.go)));
      if (b.t === "note" && b.go) to.push(b.go.go);
      if (b.t === "hero" && b.button) to.push(b.button.go);
      if (b.t === "cards") b.items.forEach((i) => i.go && to.push(i.go));
      if (b.t === "outline") b.modules.forEach((m) => m.items.forEach((i) => i.go && to.push(i.go)));
    }
    return to;
  };
  const queue = [cfg.start, ...(cfg.nav ?? []).map((n) => n.go)];
  (cfg.nav ?? []).forEach((n) => { if (!cfg.pages[n.go]) out.push(`${cfg.name}: nav "${n.label}" leads to missing page "${n.go}"`); seen.add(n.go); });
  while (queue.length) {
    const k = queue.pop()!;
    for (const to of edges(k)) {
      if (!cfg.pages[to]) out.push(`${cfg.name}: page "${k}" links to missing page "${to}"`);
      else if (!seen.has(to)) { seen.add(to); queue.push(to); }
    }
  }
  keys.filter((k) => !seen.has(k)).forEach((k) => out.push(`${cfg.name}: page "${k}" cannot be reached`));
  for (const k of keys) if (!cfg.pages[k].blocks.length) out.push(`${cfg.name}: page "${k}" is empty`);
  return [...new Set(out)];
}

/* ------------------------------------------------------------------ blocks */

type Ctx = { go: (k: string) => void; mark: (k: string) => void; visited: string[]; marks: boolean; live: boolean };

function Wizard({ b, ctx }: { b: Extract<Blk, { t: "wizard" }>; ctx: Ctx }) {
  const [step, setStep] = useState(1);
  const fs = b.size ?? 13;
  if (step > b.steps)
    return (
      <div className="space-y-2">
        <p style={{ fontSize: fs }}>{b.doneText}</p>
        <button type="button" onClick={() => setStep(1)} style={{ fontSize: fs }} className="underline">{tt("Start again", "Neu beginnen")}</button>
      </div>
    );
  return (
    <div className="relative space-y-3">
      <p style={{ fontSize: fs }} className="font-semibold">{tt(`Step ${step} of ${b.steps}`, `Schritt ${step} von ${b.steps}`)}</p>
      <p style={{ fontSize: fs, lineHeight: 1.5 }}>{b.text}</p>
      <label className="block" style={{ fontSize: fs }}>
        {b.field}
        <input type="text" disabled={!ctx.live} className="mt-0.5 block min-h-[26px] w-full max-w-[240px] rounded border border-[#B0B7C2] px-1" style={{ fontSize: fs }} />
      </label>
      <div className="flex gap-2">
        <button type="button" disabled={!ctx.live} onClick={() => setStep((s) => Math.max(1, s - 1))} style={{ fontSize: fs }} className="min-h-[28px] rounded border border-[#8A93A0] px-2">{tt("Back", "Zurück")}</button>
        <button type="button" disabled={!ctx.live} onClick={() => setStep((s) => s + 1)} style={{ fontSize: fs }} className="min-h-[28px] rounded bg-[#3F4A58] px-2 text-white">{tt("Next", "Weiter")}</button>
      </div>
      <Mk n={b.mark} on={ctx.marks} />
    </div>
  );
}

function Quiz({ b, ctx }: { b: Extract<Blk, { t: "quiz" }>; ctx: Ctx }) {
  const [pick, setPick] = useState<number | null>(null);
  return (
    <fieldset className="relative space-y-2 rounded border border-[#D9D5E2] p-3">
      <legend className="px-1 text-[14px] font-semibold">{b.q}</legend>
      {b.options.map((o, j) => (
        <label key={j} className={clsx("flex min-h-[40px] cursor-pointer items-center gap-2 rounded border px-3 text-[14px]", pick === j ? "border-[#4A4458] bg-[#F4F2F7]" : "border-[#D9D5E2]")}>
          <input type="radio" disabled={!ctx.live} checked={pick === j} onChange={() => setPick(j)} />
          {o}
        </label>
      ))}
      {pick !== null && <p role="status" className="text-[13px]"><span className="font-semibold">{pick === b.right ? tt("Right. ", "Richtig. ") : tt("Not quite. ", "Nicht ganz. ")}</span>{b.why}</p>}
      <Mk n={b.mark} on={ctx.marks} />
    </fieldset>
  );
}

function Form({ b, ctx }: { b: Extract<Blk, { t: "form" } | { t: "tabs" }>; ctx: Ctx }) {
  const [sent, setSent] = useState(false);
  const [tab, setTab] = useState(0);
  const fields = b.t === "tabs" ? b.tabs[tab].fields : b.fields;
  return (
    <div className="relative space-y-2">
      {b.t === "tabs" && (
        <div role="tablist" className="flex flex-wrap gap-1">
          {b.tabs.map((x, i) => (
            <button key={x.label} role="tab" aria-selected={tab === i} type="button" onClick={() => ctx.live && setTab(i)} className={clsx("min-h-[36px] rounded px-2 text-[12px]", tab === i ? "bg-[#4A4458] text-white" : "bg-[#F4F2F7] hover:bg-[#E9E6F0]")}>{x.label}</button>
          ))}
        </div>
      )}
      <div className="grid gap-2 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f} className="block text-[12px]">{f}<input type="text" disabled={!ctx.live} className="mt-0.5 block min-h-[32px] w-full rounded border border-[#B9B4C4] px-2 text-[13px]" /></label>
        ))}
      </div>
      <button type="button" disabled={!ctx.live} onClick={() => setSent(true)} className={btnDark}>{b.button}</button>
      {sent && b.msg && <p role="status" className="text-[13px] text-[#4A4458]">{b.msg}</p>}
      <Mk n={b.mark} on={ctx.marks} />
    </div>
  );
}

function Toggle({ b, ctx }: { b: Extract<Blk, { t: "toggle" }>; ctx: Ctx }) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative space-y-1 rounded border border-[#D9D5E2] p-3">
      <button type="button" aria-pressed={on} disabled={!ctx.live} onClick={() => setOn((x) => !x)} className={btn}>{b.label}: {on ? tt("on", "an") : tt("off", "aus")}</button>
      <p className="text-[13px]">{on ? b.on : b.off}</p>
      <Mk n={b.mark} on={ctx.marks} />
    </div>
  );
}

function Chat({ b, ctx }: { b: Extract<Blk, { t: "chat" }>; ctx: Ctx }) {
  const [log, setLog] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const send = () => {
    const x = draft.trim();
    if (!x) return;
    setLog((l) => [...l, `${tt("You", "Sie")}: ${x}`, b.reply]);
    setDraft("");
  };
  return (
    <div className="relative space-y-2">
      <ul className="space-y-1 text-[14px]">{log.length === 0 ? <li className="text-[#5F5E5A]">{b.intro}</li> : log.map((m, k) => <li key={k} className="rounded border border-[#D9D5E2] px-3 py-1.5">{m}</li>)}</ul>
      <div className="flex gap-2">
        <input value={draft} disabled={!ctx.live} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} aria-label={b.label} className="min-h-[40px] flex-1 rounded border border-[#B9B4C4] px-2 text-[14px]" />
        <button type="button" disabled={!ctx.live} onClick={send} className={btnDark}>{tt("Send", "Senden")}</button>
      </div>
      <Mk n={b.mark} on={ctx.marks} />
    </div>
  );
}

function Finish({ b, ctx }: { b: Extract<Blk, { t: "finish" }>; ctx: Ctx }) {
  const [n, setN] = useState(0);
  return (
    <div className="relative space-y-2 rounded border border-[#C9D0DA] bg-[#F3F6FA] p-2">
      <p className="text-[13px]">{b.task}</p>
      <button type="button" disabled={!ctx.live} onClick={() => { setN((x) => x + 1); if (b.key) ctx.mark(b.key); }} className={clsx("rounded border border-[#8A93A0] bg-white px-2 text-[13px]", b.big ? "min-h-[48px] w-full text-[15px] font-semibold" : "min-h-[34px]")}>{b.label}</button>
      {n > 0 && b.feedback && (
        <div className="space-y-1">{b.feedback.map((m) => (<p key={m} className="rounded border border-[#C9D0DA] bg-[#FFFBEA] px-2 py-1 text-[12px]">{m}</p>))}</div>
      )}
      <Mk n={b.mark} on={ctx.marks} />
    </div>
  );
}

/** Initials in a circle, for a teacher or a learner who wrote a review. */
function Initials({ name, size = 36 }: { name: string; size?: number }) {
  const ini = name.split(/\s+/).filter((w) => /^[A-ZÄÖÜ]/.test(w)).map((w) => w[0]).slice(0, 2).join("") || name.slice(0, 1);
  return <span aria-hidden className="flex shrink-0 items-center justify-center rounded-full bg-[#E4E0EC] font-semibold text-[#4A4458]" style={{ width: size, height: size, fontSize: size * 0.38 }}>{ini}</span>;
}

/** The v1.8 blocks: hero, facts row, course cards, a syllabus, a teacher, reviews, questions, a small heading. Every link opens a page, as everywhere in the platform. */
function RichBlock({ b, ctx }: { b: Extract<Blk, { t: "hero" | "meta" | "cards" | "outline" | "person" | "quotes" | "faq" | "sub" }>; ctx: Ctx }) {
  const fs = b.size;
  const st = fs ? { fontSize: fs } : undefined;
  const small = fs ? { fontSize: Math.max(fs - 1, 10) } : undefined;
  switch (b.t) {
    case "hero":
      return (
        <div className="relative space-y-2 rounded-lg border border-[#DCD8E4] bg-[#F4F2F7] px-4 py-4">
          {b.kicker && <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6B6478]" style={small}>{b.kicker}</p>}
          <p className="text-[19px] font-semibold leading-snug" style={fs ? { fontSize: fs + 4 } : undefined}>{b.title}</p>
          <p className="text-[14px] leading-relaxed" style={st}>{b.text}</p>
          {b.button && <button type="button" disabled={!ctx.live} onClick={() => ctx.go(b.button!.go)} className={btnDark} style={st}>{b.button.label}</button>}
          <Mk n={b.mark} on={ctx.marks} />
        </div>
      );
    case "meta":
      return (
        <ul className="relative flex flex-wrap gap-1.5" aria-label={tt("Facts about the course", "Fakten zum Kurs")}>
          {b.items.map((x, i) => <li key={x} className="rounded-full border border-[#D9D5E2] bg-white px-2.5 py-0.5 text-[12px] text-[#4A4458]" style={{ ...small, ...(b.colors?.[i] ? { background: b.colors[i], borderColor: b.colors[i], color: "#fff" } : {}) }}>{x}</li>)}
          <Mk n={b.mark} on={ctx.marks} />
        </ul>
      );
    case "cards":
      return (
        <ul className="relative grid gap-2 sm:grid-cols-2">
          {b.items.map((c) => {
            const body = (
              <>
                {c.tag && <span className="mb-1 inline-block rounded bg-[#ECE9F1] px-1.5 py-0.5 text-[11px] text-[#4A4458]" style={small}>{c.tag}</span>}
                <span className="block text-[14px] font-semibold" style={st}>{c.track && c.go && ctx.visited.includes(c.go) ? "✓ " : ""}{c.title}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-[#3E4652]" style={small}>{c.text}</span>
                {(c.meta || c.by) && <span className="mt-1.5 block text-[12px] text-[#6B6478]" style={small}>{[c.by, c.meta].filter(Boolean).join(" · ")}</span>}
              </>
            );
            return (
              <li key={c.title}>
                {c.go ? (
                  <button type="button" disabled={!ctx.live} onClick={() => ctx.go(c.go!)} className="block h-full w-full rounded-lg border border-[#D9D5E2] bg-white p-3 text-left hover:border-[#B9B4C4] hover:bg-[#FAF9FC]">{body}</button>
                ) : (
                  <div className="h-full rounded-lg border border-[#D9D5E2] bg-white p-3">{body}</div>
                )}
              </li>
            );
          })}
          <Mk n={b.mark} on={ctx.marks} />
        </ul>
      );
    case "outline":
      return (
        <div className="relative divide-y divide-[#E4E0EC] rounded-lg border border-[#D9D5E2]">
          {b.modules.map((m, i) => (
            <details key={m.title} open={i === 0} className="group">
              <summary className="flex min-h-[40px] cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 text-[14px] font-semibold" style={st}>
                <span>{m.title}</span>
                <span aria-hidden className="text-[12px] text-[#6B6478] group-open:rotate-180">▾</span>
              </summary>
              <div className="space-y-1 px-3 pb-3">
                {m.text && <p className="text-[13px] text-[#3E4652]" style={small}>{m.text}</p>}
                <ul className="space-y-1">
                  {m.items.map((it) => (
                    <li key={it.label}>
                      <button type="button" disabled={!ctx.live || !it.go} onClick={() => it.go && ctx.go(it.go)} className={clsx(tile, "w-full")} style={small}>
                        {it.track && it.go && ctx.visited.includes(it.go) ? "✓ " : ""}{it.label}
                        {it.doneKey ? <span className="float-right text-[12px] text-[#5F5E5A]">{ctx.visited.includes(it.doneKey) ? tt("done", "erledigt") : tt("open", "offen")}</span> : it.sub ? <span className="float-right text-[12px] text-[#5F5E5A]">{it.sub}</span> : null}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
          <Mk n={b.mark} on={ctx.marks} />
        </div>
      );
    case "person":
      return (
        <div className="relative flex gap-3 rounded-lg border border-[#D9D5E2] bg-white p-3">
          <Initials name={b.name} />
          <div className="min-w-0">
            <p className="text-[14px] font-semibold" style={st}>{b.name}</p>
            <p className="text-[12px] text-[#6B6478]" style={small}>{b.role}</p>
            <p className="mt-1 text-[13px] leading-snug" style={small}>{b.text}</p>
          </div>
          <Mk n={b.mark} on={ctx.marks} />
        </div>
      );
    case "quotes":
      return (
        <div className="relative space-y-2">
          {b.title && <p className="text-[14px] font-semibold" style={st}>{b.title}</p>}
          <ul className="grid gap-2 sm:grid-cols-2">
            {b.items.map((q) => (
              <li key={q.who} className="rounded-lg border border-[#E4E0EC] bg-[#FAF9FC] p-3">
                <p className="text-[13px] italic leading-snug" style={small}>“{q.text}”</p>
                <p className="mt-2 flex items-center gap-2 text-[12px] text-[#6B6478]" style={small}><Initials name={q.who} size={24} /><span><span className="font-semibold text-[#26323F]">{q.who}</span> · {q.role}</span></p>
              </li>
            ))}
          </ul>
          <Mk n={b.mark} on={ctx.marks} />
        </div>
      );
    case "faq":
      return (
        <div className="relative space-y-1">
          {b.title && <p className="text-[14px] font-semibold" style={st}>{b.title}</p>}
          <div className="divide-y divide-[#E4E0EC] rounded-lg border border-[#D9D5E2]">
            {b.items.map((f) => (
              <details key={f.q} className="group px-3">
                <summary className="flex min-h-[40px] cursor-pointer list-none items-center justify-between gap-2 py-2 text-[13px] font-semibold" style={small}>
                  <span>{f.q}</span>
                  <span aria-hidden className="text-[12px] text-[#6B6478] group-open:rotate-180">▾</span>
                </summary>
                <p className="pb-2 text-[13px] leading-snug" style={small}>{f.a}</p>
              </details>
            ))}
          </div>
          <Mk n={b.mark} on={ctx.marks} />
        </div>
      );
    case "sub":
      return <p className="pt-1 text-[12px] font-semibold uppercase tracking-wide text-[#6B6478]" style={small}>{b.text}</p>;
  }
}

function Block({ b, ctx }: { b: Blk; ctx: Ctx }) {
  const [msg, setMsg] = useState("");
  switch (b.t) {
    case "hero":
    case "meta":
    case "cards":
    case "outline":
    case "person":
    case "quotes":
    case "faq":
    case "sub":
      return <RichBlock b={b} ctx={ctx} />;
    case "h":
      return <h3 className="relative text-[17px] font-semibold" style={b.css}>{b.text}<Mk n={b.mark} on={ctx.marks} style={{ top: -2, right: -26 }} /></h3>;
    case "p":
      return <p className="relative" style={{ fontSize: b.size ?? 14, lineHeight: b.leading ?? 1.55, ...b.css }}>{b.text}<Mk n={b.mark} on={ctx.marks} style={{ top: -6, right: -10 }} /></p>;
    case "list":
      return <ul className="list-disc space-y-0.5 pl-5" style={{ fontSize: b.size ?? 14 }}>{b.items.map((x) => <li key={x}>{x}</li>)}</ul>;
    case "links":
      return (
        <div className="relative">
          <ul className={clsx(b.small ? "flex flex-wrap gap-1" : b.grid ? (b.grid === 3 ? "grid grid-cols-3 gap-1" : "grid grid-cols-2 gap-1") : "space-y-1")} style={b.css}>
            {b.items.map((i) => (
              <li key={i.label}>
                <button type="button" disabled={!ctx.live || !i.go} onClick={() => i.go && ctx.go(i.go)} style={{ ...(i.color ? { background: i.color, color: "#fff", borderColor: i.color } : {}), ...(b.size ? { fontSize: b.size } : {}), ...i.css }} className={clsx(b.small ? "min-h-[32px] rounded bg-[#F4F2F7] px-2 text-[12px] hover:bg-[#E9E6F0]" : tile, !b.small && "w-full", i.pulse && "motion-safe:animate-pulse")}>
                  {i.track && i.go && ctx.visited.includes(i.go) ? "✓ " : ""}{i.label}{i.doneKey ? <span className="float-right text-[12px] text-[#5F5E5A]">{ctx.visited.includes(i.doneKey) ? tt("done", "erledigt") : tt("open", "offen")}</span> : i.sub ? <span className="float-right text-[12px] text-[#5F5E5A]">{i.sub}</span> : null}
                </button>
              </li>
            ))}
          </ul>
          <Mk n={b.mark} on={ctx.marks} />
        </div>
      );
    case "table":
      return (
        <div className="relative overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead><tr className="bg-[#F4F2F7] text-left">{b.head.map((h) => <th key={h} className="px-2 py-1">{h}</th>)}</tr></thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="border-t border-[#E4E0EC]">
                  {r.map((c, j) => (
                    <td key={j} className="px-2 py-1">{typeof c === "string" ? c : <button type="button" disabled={!ctx.live} onClick={() => ctx.go(c.go)} className="min-h-[32px] underline decoration-dotted">{c.label}</button>}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Mk n={b.mark} on={ctx.marks} />
        </div>
      );
    case "wizard":
      return <Wizard b={b} ctx={ctx} />;
    case "quiz":
      return <Quiz b={b} ctx={ctx} />;
    case "form":
    case "tabs":
      return <Form b={b} ctx={ctx} />;
    case "toggle":
      return <Toggle b={b} ctx={ctx} />;
    case "chat":
      return <Chat b={b} ctx={ctx} />;
    case "finish":
      return <Finish b={b} ctx={ctx} />;
    case "progress": {
      const n = b.of.filter((k) => ctx.visited.includes(k)).length;
      return (
        <div className="relative space-y-1">
          <div className="h-3 rounded-full bg-[#E4E0EC]" role="progressbar" aria-valuemin={0} aria-valuemax={b.of.length} aria-valuenow={n} aria-label={b.label}>
            <div className="h-3 rounded-full bg-[#4A4458]" style={{ width: `${Math.round((n / b.of.length) * 100)}%` }} />
          </div>
          <p className="text-[13px] text-[#5F5E5A]">{b.label}: {n} / {b.of.length}</p>
          <Mk n={b.mark} on={ctx.marks} />
        </div>
      );
    }
    case "note":
      return (
        <div className="relative space-y-1 rounded-lg border border-[#D6DAE1] bg-[#F4F6F8] p-3" style={b.css}>
          <p className="text-[13px] font-semibold">{b.title}</p>
          <p className="text-[12px]">{b.text}</p>
          <div className="flex flex-wrap items-center gap-2">
            {b.button && <button type="button" disabled={!ctx.live} onClick={() => setMsg(b.button!.msg)} className="min-h-[34px] rounded bg-[#3F4A58] px-3 text-[12px] text-white">{b.button.label}</button>}
            {b.go && <button type="button" disabled={!ctx.live} onClick={() => ctx.go(b.go!.go)} className="min-h-[34px] rounded border border-[#8A93A0] px-3 text-[12px]">{b.go.label}</button>}
          </div>
          {msg && <p role="status" className="text-[12px]">{msg}</p>}
          <Mk n={b.mark} on={ctx.marks} />
        </div>
      );
  }
}

function Body({ page, ctx, back, footer }: { page: PPage; ctx: Ctx; back?: () => void; footer?: string }) {
  return (
    <>
      <div className="space-y-3 px-4 py-4">
        {page.blocks.map((b, i) => <Block key={i} b={b} ctx={ctx} />)}
        {back && <button type="button" onClick={back} className="min-h-[36px] text-[13px] underline">← {tt("Back", "Zurück")}</button>}
      </div>
      {footer && <p className="border-t border-[#E4E0EC] bg-[#FAF9FC] px-4 py-2 text-[11px] text-[#6B6478]">{footer}</p>}
    </>
  );
}

function Head({ cfg, crumb, right, cur, onGo, marks }: { cfg: PlatformCfg; crumb?: string; right?: string; cur?: string; onGo?: (k: string) => void; marks?: number }) {
  return (
    <div className="relative text-white" style={{ background: cfg.color ?? "#4A4458" }}>
      <div className="flex items-center justify-between gap-2 px-4 py-2.5">
        <span className="font-serif text-[15px] font-bold">{cfg.name}{crumb ? <span className="ml-3 font-sans text-[12px] font-normal opacity-80">{crumb}</span> : null}</span>
        {right && <span className="rounded-full bg-white px-3 py-0.5 text-[13px] font-bold text-[#4A4458]">{right}</span>}
      </div>
      {cfg.nav && (
        <nav className="flex flex-wrap gap-1 px-3 pb-2" aria-label={tt("Menu", "Menü")}>
          {cfg.nav.map((n) => (
            <button key={n.go} type="button" onClick={() => onGo?.(n.go)} className={clsx("min-h-[32px] rounded px-3 text-[13px]", cur === n.go ? "bg-white text-[#4A4458]" : "hover:bg-white/15")}>{n.label}</button>
          ))}
        </nav>
      )}
      <Mk n={marks} on={!!marks} style={{ top: 6, right: 8 }} />
    </div>
  );
}

/** A phone-width frame for a mobile platform; a plain wrapper otherwise. */
function Frame({ cfg, children }: { cfg: PlatformCfg; children: ReactNode }) {
  const dim = cfg.dim ? { filter: "contrast(0.38) brightness(1.18)" } : undefined;
  return cfg.phone ? <div className={clsx(INK, "mx-auto my-3 max-w-[340px] overflow-hidden rounded-[18px] border-4 border-[#3F4A58] bg-white")} style={dim}>{children}</div> : <div className={INK} style={dim}>{children}</div>;
}

/** The platform, usable: every link opens a page, "Back" returns, visited pages feed the lists, the progress bars and the header. */
export function PlatformSim({ cfg, start }: { cfg: PlatformCfg; start?: string }) {
  const [stack, setStack] = useState<string[]>([start ?? cfg.start]);
  const [visited, setVisited] = useState<string[]>([start ?? cfg.start]);
  const cur = stack[stack.length - 1];
  const page = cfg.pages[cur] ?? cfg.pages[cfg.start];
  const go = (k: string) => {
    setStack((s) => (s[s.length - 1] === k ? s : [...s, k]));
    setVisited((v) => (v.includes(k) ? v : [...v, k]));
  };
  const mark = (k: string) => setVisited((v) => (v.includes(k) ? v : [...v, k]));
  const root = (k: string) => {
    setStack([k]);
    setVisited((v) => (v.includes(k) ? v : [...v, k]));
  };
  return (
    <Frame cfg={cfg}>
      <Head cfg={cfg} crumb={page.crumb} right={cfg.header?.(visited)} cur={page.section ?? cur} onGo={root} />
      <Body page={page} ctx={{ go, mark, visited, marks: false, live: true }} back={stack.length > 1 ? () => setStack((s) => s.slice(0, -1)) : undefined} footer={cfg.footer} />
    </Frame>
  );
}

/** One page of the platform as a picture: not clickable, with the task's numbered markers; pass the page's width (default 560) to `Fit`. */
export function PlatformShot({ cfg, page, marks }: { cfg: PlatformCfg; page: string; marks: boolean }): ReactNode {
  const p = cfg.pages[page];
  return (
    // inert: the picture's buttons are drawn, never focused or clicked (axe aria-hidden-focus); React 18 passes the unknown attribute through as a string.
    <div className={clsx("bg-white", cfg.phone ? "w-[360px]" : "w-[560px]", INK)} aria-hidden {...({ inert: "" } as object)}>
      <Frame cfg={cfg}>
        <Head cfg={cfg} crumb={p.crumb} right={cfg.header?.([])} cur={p.section ?? page} />
        <Body page={p} ctx={{ go: () => undefined, mark: () => undefined, visited: [], marks, live: false }} />
      </Frame>
    </div>
  );
}
