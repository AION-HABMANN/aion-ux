"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { tt } from "@/lib/lang";

/**
 * A working simulation of a platform, an option or a case artefact (CLAUDE.md #60), opened from a task: a dialog with a browser window inside
 * (address bar, page, a footer that says it is a simulation). The simulation behaves like the real thing and looks plausible; it never marks a
 * problem and never praises. Its state lives only while it is open: Reset starts it again, Close or Escape leaves it. Never counted, never
 * exported. The page inside uses its own colours, never the site's blue, teal and rust (#15, #49).
 */
const FOCUSABLE = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function SimButton({ label, sub, url, title, note, children }: { label: string; sub?: string; url: string; title: string; note?: string; children: () => ReactNode }) {
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        ref={opener}
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="flex min-h-[44px] w-full items-center gap-3 rounded-lg border border-accent bg-paper px-3 py-2 text-left hover:bg-accentSoft"
      >
        <span aria-hidden className="text-accent">▶</span>
        <span className="min-w-0">
          <span className="block font-semibold text-ink">{label}</span>
          {sub && <span className="block text-caption text-ash">{sub}</span>}
        </span>
      </button>
      {open && (
        <SimDialog
          url={url}
          title={title}
          note={note}
          onClose={() => {
            setOpen(false);
            window.setTimeout(() => opener.current?.focus(), 0);
          }}
        >
          {children}
        </SimDialog>
      )}
    </>
  );
}

function SimDialog({ url, title, note, onClose, children }: { url: string; title: string; note?: string; onClose: () => void; children: () => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab" && ref.current) {
        const els = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (els.length === 0) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[44] flex items-center justify-center bg-ink/60 p-2 sm:p-4 print:hidden" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} role="dialog" aria-modal="true" aria-label={title} className="flex h-full max-h-[52rem] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-[#B8B8B8] bg-white shadow-lg">
        <div className="flex shrink-0 items-center gap-2 bg-[#E8E9EC] px-2.5 py-2">
          <span aria-hidden className="hidden gap-1.5 sm:flex">
            <i className="h-2.5 w-2.5 rounded-full bg-[#B5B7BC]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#B5B7BC]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#B5B7BC]" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-full bg-white px-3 py-1 text-[12px] text-[#555]" aria-label={tt("Address", "Adresse")}>
            {url}
          </span>
          <button type="button" onClick={() => setRun((n) => n + 1)} className="min-h-[36px] rounded-md border border-[#C4C6CB] bg-white px-2.5 text-[12px] text-[#333] hover:bg-[#F4F4F5]">
            ↺ {tt("Reset", "Neu starten")}
          </button>
          <button ref={closeRef} type="button" onClick={onClose} className="min-h-[36px] rounded-md border border-[#C4C6CB] bg-white px-2.5 text-[12px] text-[#333] hover:bg-[#F4F4F5]">
            {tt("Close", "Schließen")} ✕
          </button>
        </div>
        <div key={run} className="min-h-0 flex-1 overflow-y-auto bg-white text-[#26323F]">
          {children()}
        </div>
        <p className="shrink-0 bg-[#F1EFE8] px-3 py-1.5 text-[12px] text-[#5F5E5A]">
          {note ?? tt("Simulation · Case assumption: the course and its texts are made up · nothing here is marked right or wrong.", "Simulation · Fallannahme: der Kurs und seine Texte sind erfunden · hier wird nichts als richtig oder falsch markiert.")}
        </p>
      </div>
    </div>,
    document.body,
  );
}
