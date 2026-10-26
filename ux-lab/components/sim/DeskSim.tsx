"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import { tt } from "@/lib/lang";

/**
 * The desk of the Level 3 role (CLAUDE.md #60, DL-STANDARD section 4 "Route 2 windows"): a mail client that looks like one, with an inbox of the messages the plan's framework implies,
 * sender, time, unread marks and attachments that open in place (the table of what the platform records as a spreadsheet, a news page, the product itself). It adds no hint, no verdict and
 * no recommendation. Own colours, never the site's blue, teal and rust.
 */
export type DeskAttachment = { name: string; kind?: "sheet" | "page" | "link"; node: ReactNode };
export type DeskMessage = { from: string; subject: string; body: string[]; time?: string; attachments?: DeskAttachment[] };
export type DeskTable = { title: string; head: [string, string]; rows: [string, string][] };

const TIMES = () => [tt("Mon 08:12", "Mo 08:12"), tt("Mon 09:40", "Mo 09:40"), tt("Mon 11:05", "Mo 11:05"), tt("Tue 07:55", "Di 07:55"), tt("Tue 10:20", "Di 10:20"), tt("Tue 13:05", "Di 13:05"), tt("Wed 08:30", "Mi 08:30")];
const HUES = ["#6B5B95", "#2F7F79", "#B5651D", "#4A6FA5", "#8C4A5E", "#5B7F3A"];
const initials = (n: string) => n.split(/[\s·,]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
const hue = (n: string) => HUES[[...n].reduce((a, c) => a + c.charCodeAt(0), 0) % HUES.length];

export function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  return (
    <span aria-hidden className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white" style={{ width: size, height: size, background: hue(name), fontSize: size * 0.38 }}>
      {initials(name)}
    </span>
  );
}

/** A spreadsheet look for a small table: column letters, row numbers, a header row. */
export function Sheet({ title, head, rows }: { title: string; head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded border border-[#CFD4DC] bg-white">
      <div className="flex items-center gap-2 border-b border-[#CFD4DC] bg-[#F1F3F6] px-3 py-1.5 text-[12px] text-[#5F5E5A]">
        <span aria-hidden className="rounded bg-[#1E7B4B] px-1.5 text-[11px] font-bold text-white">X</span>
        <span className="font-semibold text-[#26323F]">{title}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-[#F1F3F6] text-[11px] text-[#5F6675]">
              <th className="w-8 border border-[#E1E4EA] px-1"><span className="sr-only">{tt("Row", "Zeile")}</span></th>
              {head.map((_, i) => (
                <th key={i} className="border border-[#E1E4EA] px-2 py-0.5 font-normal">{String.fromCharCode(65 + i)}</th>
              ))}
            </tr>
            <tr className="bg-[#EEF1F5] text-left">
              <th className="border border-[#E1E4EA] px-1 text-center text-[11px] font-normal text-[#5F6675]">1</th>
              {head.map((h) => (
                <th key={h} className="border border-[#E1E4EA] px-2 py-1.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="border border-[#E1E4EA] bg-[#F7F8FA] px-1 text-center text-[11px] text-[#5F6675]">{i + 2}</td>
                {r.map((c, j) => (
                  <td key={j} className="border border-[#E1E4EA] px-2 py-1.5">{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DeskSim({ mailbox, messages, table }: { mailbox: string; messages: DeskMessage[]; table?: DeskTable }) {
  const times = TIMES();
  const all: DeskMessage[] = messages.map((m, i) => ({
    ...m,
    time: m.time ?? times[i % times.length],
    attachments: [...(m.attachments ?? []), ...(table && i === messages.length - 1 ? [{ name: "platform-records.xlsx", kind: "sheet" as const, node: <Sheet title={table.title} head={table.head} rows={table.rows} /> }] : [])],
  }));
  const [open, setOpen] = useState(0);
  const [seen, setSeen] = useState<number[]>([0]);
  const [att, setAtt] = useState<number | null>(null);
  const m = all[open];
  const go = (i: number) => {
    setOpen(i);
    setAtt(null);
    setSeen((s) => (s.includes(i) ? s : [...s, i]));
  };
  const addr = (n: string) => `${n.toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\.|\.$/g, "")}@company.example`;
  return (
    <div className="text-[#26323F]">
      <div className="flex items-center justify-between bg-[#3B4256] px-4 py-2 text-white">
        <span className="text-[14px] font-semibold">{mailbox}</span>
        <span aria-hidden className="hidden rounded bg-white/15 px-3 py-0.5 text-[12px] text-white/80 sm:block">{tt("Search mail", "E-Mails durchsuchen")}</span>
      </div>
      <div className="grid gap-0 md:grid-cols-[250px_minmax(0,1fr)]">
        <ul className="border-b border-[#D9DEE6] bg-[#F7F8FA] md:border-b-0 md:border-r" aria-label={tt("Inbox", "Posteingang")}>
          <li className="border-b border-[#E3E6EC] px-3 py-1.5 text-[12px] font-semibold text-[#5F5E5A]">{tt("Inbox", "Posteingang")} · {all.length}</li>
          {all.map((x, i) => (
            <li key={i}>
              <button type="button" onClick={() => go(i)} aria-current={open === i} className={clsx("flex min-h-[56px] w-full items-start gap-2 border-b border-[#E3E6EC] px-3 py-2 text-left", open === i ? "bg-white" : "hover:bg-white")}>
                <Avatar name={x.from} size={30} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className={clsx("truncate text-[13px]", seen.includes(i) ? "" : "font-bold")}>{x.from}</span>
                    <span className="shrink-0 text-[11px] text-[#5F6675]">{x.time}</span>
                  </span>
                  <span className={clsx("block truncate text-[13px]", seen.includes(i) ? "text-[#4A5160]" : "font-semibold")}>{x.subject}</span>
                  {(x.attachments?.length ?? 0) > 0 && <span className="text-[11px] text-[#5F6675]">{tt("Attachment", "Anhang")} · {x.attachments!.length}</span>}
                </span>
                {!seen.includes(i) && <span aria-label={tt("unread", "ungelesen")} className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2F6FDB]" />}
              </button>
            </li>
          ))}
        </ul>
        <div className="min-w-0 space-y-3 px-4 py-4" aria-live="polite">
          <h3 className="text-[17px] font-semibold">{m.subject}</h3>
          <div className="flex items-center gap-3">
            <Avatar name={m.from} size={36} />
            <div className="min-w-0 text-[12px] text-[#5F5E5A]">
              <p><span className="font-semibold text-[#26323F]">{m.from}</span> &lt;{addr(m.from)}&gt;</p>
              <p>{tt("to me", "an mich")} · {m.time}</p>
            </div>
          </div>
          <div className="space-y-2">
            {m.body.map((p, i) => (
              <p key={i} className="max-w-prose text-[14px] leading-relaxed">{p}</p>
            ))}
          </div>
          {(m.attachments?.length ?? 0) > 0 && (
            <div className="space-y-2 border-t border-[#E3E6EC] pt-3">
              <p className="text-[12px] text-[#5F6675]">{tt("Attachments", "Anhänge")}</p>
              <div className="flex flex-wrap gap-2">
                {m.attachments!.map((a, i) => (
                  <button key={a.name} type="button" aria-pressed={att === i} onClick={() => setAtt(att === i ? null : i)} className={clsx("flex min-h-[38px] items-center gap-2 rounded border px-3 text-[13px]", att === i ? "border-[#3B4256] bg-[#EEF1F5]" : "border-[#CFD4DC] bg-white hover:bg-[#F7F8FA]")}>
                    <span aria-hidden>{a.kind === "sheet" ? "▦" : a.kind === "link" ? "↗" : "▤"}</span>
                    {a.name}
                  </button>
                ))}
              </div>
              {att !== null && <div className="overflow-hidden rounded border border-[#CFD4DC]">{m.attachments![att].node}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
