"use client";

import clsx from "clsx";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { tt } from "@/lib/lang";

/**
 * Day 12 · the service portals with real barriers (show it real, user rule 2026-10-28): PublicAccess (Block 1.1) and CitizenConnect (Block 2.1). They are built
 * with the barriers the plan describes, so the learner meets them with the mouse and, above all, with the keyboard: a menu that opens only on mouse hover and
 * whose entries are not focusable, appointment slots marked only by colour, faint grey text, official language in long nested sentences, an error message that
 * says only "Invalid input", icons with no text alternative, and (CitizenConnect) page types built differently. These barriers are on purpose and stay inside the
 * simulation window; the lab's own pages around them meet the standard. The names, dates and codes are made up; nothing is marked right or wrong.
 */
type Flags = { mouseOnly: boolean; faint: boolean; inconsistent: boolean };
type Page = "home" | "appt" | "form" | "docs" | "info" | "done";

const FAINT = "#A3AAB2";

/** A clickable thing that is not a button: no keyboard focus, no role. On purpose (the plan's mouse-only barrier). */
function MouseOnly({ onClick, children, style, className }: { onClick: () => void; children: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <div onClick={onClick} className={clsx("cursor-pointer", className)} style={style}>
      {children}
    </div>
  );
}

function Btn({ onClick, children, mouseOnly, style }: { onClick: () => void; children: ReactNode; mouseOnly?: boolean; style?: CSSProperties }) {
  const cls = "inline-block rounded px-3 py-1.5 text-[13px] font-semibold text-white";
  return mouseOnly ? (
    <MouseOnly onClick={onClick} className={cls} style={{ background: "#2F5D8A", ...style }}>{children}</MouseOnly>
  ) : (
    <button type="button" onClick={onClick} className={cls} style={{ background: "#2F5D8A", ...style }}>{children}</button>
  );
}

export function Portal({ kind }: { kind: "publicaccess" | "citizenconnect" }) {
  const f: Flags = kind === "publicaccess" ? { mouseOnly: true, faint: true, inconsistent: false } : { mouseOnly: false, faint: true, inconsistent: true };
  const name = kind === "publicaccess" ? "PublicAccess" : "CitizenConnect";
  const [page, setPage] = useState<Page>("home");
  const [menu, setMenu] = useState(false);
  const [slot, setSlot] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [dob, setDob] = useState("");
  const go = (p: Page) => {
    setPage(p);
    setMenu(false);
    setErr(null);
  };
  const muted: CSSProperties = f.faint ? { color: FAINT } : {};

  const nav = (
    <div className="relative" onMouseEnter={() => f.mouseOnly && setMenu(true)} onMouseLeave={() => f.mouseOnly && setMenu(false)}>
      {f.mouseOnly ? (
        <MouseOnly onClick={() => setMenu((v) => !v)} className="px-3 py-2 text-[13px] font-semibold text-white">☰ Services ▾</MouseOnly>
      ) : (
        <button type="button" onClick={() => setMenu((v) => !v)} aria-expanded={menu} className="px-3 py-2 text-[13px] font-semibold text-white">☰ Services ▾</button>
      )}
      {f.mouseOnly && menu && (
        <div className="absolute left-0 top-full z-10 w-56 rounded-b border border-[#C8D3DD] bg-white shadow-md">
          {(
            [
              ["appt", "Appointment allocation"],
              ["form", "Applications and notifications"],
              ["docs", "Document retrieval"],
              ["info", "Information"],
            ] as [Page, string][]
          ).map(([p, l]) => (
            <MouseOnly key={p} onClick={() => go(p)} className="border-b border-[#EEF2F5] px-3 py-2 text-[13px] text-[#26323F] hover:bg-[#EEF4FA]">{l}</MouseOnly>
          ))}
        </div>
      )}
      {!f.mouseOnly && menu && (
        <ul className="absolute left-0 top-full z-10 w-56 rounded-b border border-[#C8D3DD] bg-white shadow-md">
          {(
            [
              ["appt", "Book an appointment"],
              ["form", "Apply online"],
              ["docs", "My documents"],
              ["info", "Information"],
            ] as [Page, string][]
          ).map(([p, l]) => (
            <li key={p}><button type="button" onClick={() => go(p)} className="w-full border-b border-[#EEF2F5] px-3 py-2 text-left text-[13px] text-[#26323F] hover:bg-[#EEF4FA]">{l}</button></li>
          ))}
        </ul>
      )}
    </div>
  );

  const slots: [string, boolean][] = [["Mon 08:30", false], ["Mon 10:00", true], ["Tue 09:15", false], ["Tue 11:45", true], ["Wed 14:00", true], ["Thu 08:00", false], ["Thu 13:30", true], ["Fri 10:30", false]];

  return (
    <div className="overflow-hidden rounded-xl border border-[#C8D3DD] bg-[#F7F9FB] text-[#26323F]">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#2F5D8A] pr-3">
        <div className="flex items-center">
          <span className="px-3 py-2 text-[14px] font-bold text-white">{name}</span>
          {nav}
        </div>
        <span className="text-[11px] text-white/80">{tt("Citizen services · City administration")}</span>
      </div>
      <div className="min-h-[300px] space-y-3 p-4 text-[14px]">
        {page === "home" && (
          <>
            <h3 className="text-[18px] font-bold">{tt(`Welcome to ${name}`)}</h3>
            <p style={muted}>{tt("Here you can arrange appointments, submit applications and retrieve documents. Please use the services menu.")}</p>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  ["appt", "📅"],
                  ["form", "📝"],
                  ["docs", "📂"],
                ] as [Page, string][]
              ).map(([p, icon]) => (
                <MouseOnly key={p} onClick={() => go(p)} className="flex h-16 items-center justify-center rounded border border-[#C8D3DD] bg-white text-[26px]">
                  <span>{icon}</span>
                </MouseOnly>
              ))}
            </div>
            {f.inconsistent && <p className="text-[12px]" style={muted}>{tt("Notice: changed opening hours apply in the coming weeks.")}</p>}
          </>
        )}

        {page === "appt" && (
          <>
            <h3 className="text-[17px] font-bold">{f.inconsistent ? tt("Book an appointment") : tt("Appointment allocation")}</h3>
            <p style={muted}>{tt("Select an available time slot.")}</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {slots.map(([s, free]) => (
                <MouseOnly key={s} onClick={() => free && setSlot(s)} className="rounded border px-2 py-2 text-center text-[13px] font-semibold" style={{ background: free ? "#D9F2DF" : "#F6D6D6", borderColor: free ? "#7CC48D" : "#E08C8C", outline: slot === s ? "2px solid #2F5D8A" : undefined }}>
                  {s}
                </MouseOnly>
              ))}
            </div>
            {slot && <p>{tt(`Selected: ${slot}.`)}</p>}
            <div className={f.inconsistent ? "flex justify-start" : "flex justify-end"}>
              <Btn mouseOnly={f.mouseOnly} onClick={() => (slot ? go("done") : setErr(tt("Error: no selection.")))}>{f.inconsistent ? tt("Continue") : tt("Proceed")}</Btn>
            </div>
            {err && <p className="text-[13px] text-[#B42318]">{err}</p>}
          </>
        )}

        {page === "form" && (
          <>
            <h3 className="text-[17px] font-bold">{tt("Application for the issuance of a certificate of registration pursuant to the Federal Registration Act")}</h3>
            <p className="text-[13px]" style={muted}>
              {tt("Insofar as the applicant, in the event that the registration was not effected by the applicant personally, is not the person registered, a written authorisation of the person concerned, which, unless otherwise provided, must be submitted in the original, shall be enclosed with the application, failing which the application cannot be processed.")}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <div className="text-[12px]">{tt("Surname / forename(s) of the data subject")}</div>
                <input aria-label={tt("Surname and forenames")} className="w-full rounded border border-[#C8D3DD] px-2 py-1" />
              </div>
              <div>
                <div className="text-[12px]">{tt("Date of birth")}</div>
                <input aria-label={tt("Date of birth")} value={dob} onChange={(e) => setDob(e.target.value)} className="w-full rounded border border-[#C8D3DD] px-2 py-1" />
              </div>
              <div>
                <div className="text-[12px]">{tt("Registration identifier (if known)")}</div>
                <input aria-label={tt("Registration identifier")} className="w-full rounded border border-[#C8D3DD] px-2 py-1" />
              </div>
            </div>
            <div className={f.inconsistent ? "flex justify-end" : "flex justify-start"}>
              <Btn mouseOnly={f.mouseOnly} onClick={() => (/^\d{2}\.\d{2}\.\d{4}$/.test(dob.trim()) ? go("done") : setErr(f.inconsistent ? tt("Form validation failed (code VAL-03).") : tt("Invalid input.")))}>{f.inconsistent ? tt("Submit application") : tt("Send")}</Btn>
            </div>
            {err && <p className="text-[13px] text-[#B42318]">{err}</p>}
          </>
        )}

        {page === "docs" && (
          <>
            <h3 className={f.inconsistent ? "text-[14px] font-normal uppercase tracking-wide" : "text-[17px] font-bold"}>{tt("Document retrieval")}</h3>
            <ul className="space-y-2">
              {[tt("Registration certificate 2025"), tt("Tax notice 2025"), tt("Waste fee notice")].map((d) => (
                <li key={d} className="flex items-center justify-between rounded border border-[#C8D3DD] bg-white px-3 py-2">
                  <span style={muted}>{d}</span>
                  <span className="flex gap-2 text-[18px]">
                    <MouseOnly onClick={() => setErr(tt("Download started."))}>⬇</MouseOnly>
                    <MouseOnly onClick={() => setErr(tt("Sent to printer."))}>🖨</MouseOnly>
                    <MouseOnly onClick={() => setErr(tt("Deleted from your list."))}>✖</MouseOnly>
                  </span>
                </li>
              ))}
            </ul>
            {err && <p className="text-[13px]">{err}</p>}
          </>
        )}

        {page === "info" && (
          <div className={f.inconsistent ? "grid gap-3 sm:grid-cols-[1fr_10rem]" : "space-y-2"}>
            <div className="space-y-2">
              <h3 className="text-[17px] font-bold">{tt("Information on the obligation to register")}</h3>
              <p style={muted}>{tt("Persons who move into a dwelling are obliged to register with the competent registration authority within two weeks of moving in, whereby the landlord's confirmation pursuant to Section 19 must be presented, unless an exception applies.")}</p>
              <p className="rounded bg-[#FDECEC] px-2 py-1 text-[13px]">{tt("Please note the processing times.")}</p>
            </div>
            {f.inconsistent && <aside className="rounded border border-[#C8D3DD] bg-white p-2 text-[12px]" style={muted}>{tt("Related: Parking, Waste, Dogs")}</aside>}
          </div>
        )}

        {page === "done" && (
          <>
            <h3 className="text-[17px] font-bold">{tt("Thank you")}</h3>
            <p>{tt("Your request has been received. Reference 2026-44817.")}</p>
          </>
        )}

        {page !== "home" && (
          <MouseOnly onClick={() => go("home")} className="text-[13px] text-[#2F5D8A] underline">{tt("‹ Home")}</MouseOnly>
        )}
      </div>
      <div className="border-t border-[#C8D3DD] px-4 py-2 text-[11px]" style={muted}>{tt(`© ${name} · Imprint · Privacy · Accessibility statement · Simulation: the names and the contents are made up`)}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ LearnAccess, three redesigns of a training platform */

const COURSE = () => ({
  title: tt("Project management basics"),
  lesson: tt("Lesson 3 · Planning with milestones"),
  text: tt("A milestone marks a point in the project where something important is finished. Set three to five milestones and check at each one whether the plan still fits."),
  task: tt("Task: write down three milestones for a project of your own."),
});

/** Variant A: visually modern and brand-strong, but reduced contrast and small text. */
function LearnA() {
  const c = COURSE();
  const [done, setDone] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl text-[12px]" style={{ background: "#FAFAFD", color: "#9AA0AE", fontWeight: 300 }}>
      <div className="px-4 py-3" style={{ background: "linear-gradient(120deg,#C7B8F5,#9FD8F2)", color: "#FFFFFF" }}>
        <div className="text-[11px] tracking-[0.25em]">LEARNACCESS</div>
        <div className="text-[20px]" style={{ fontWeight: 200 }}>{c.title}</div>
      </div>
      <div className="space-y-3 p-4">
        <div className="text-[11px] uppercase tracking-[0.2em]">{c.lesson}</div>
        <p className="leading-relaxed">{c.text}</p>
        <p className="leading-relaxed">{c.task}</p>
        <button type="button" onClick={() => setDone(true)} className="rounded-full px-4 py-1.5 text-[11px] text-white outline-none" style={{ background: "#C7B8F5", outline: "none" }}>
          {done ? tt("✓ done") : tt("continue →")}
        </button>
      </div>
    </div>
  );
}

/** Variant B: clearly structured, high contrast, plain language, good focus; less premium. */
function LearnB() {
  const c = COURSE();
  const [done, setDone] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border-2 border-[#1F2937] bg-white text-[17px] leading-relaxed text-[#111827]">
      <div className="border-b-2 border-[#1F2937] bg-[#F3F4F6] px-4 py-3">
        <div className="text-[14px] font-semibold">LearnAccess</div>
        <div className="text-[22px] font-bold">{c.title}</div>
      </div>
      <div className="space-y-3 p-4">
        <h4 className="text-[18px] font-bold">{c.lesson}</h4>
        <p>{c.text}</p>
        <p className="font-semibold">{c.task}</p>
        <button type="button" onClick={() => setDone(true)} className="min-h-[44px] rounded border-2 border-[#111827] bg-[#1D4ED8] px-4 font-semibold text-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]">
          {done ? tt("Lesson complete") : tt("Mark lesson as complete")}
        </button>
      </div>
    </div>
  );
}

/** Variant C: good basic accessibility with optional adaptation functions; more technical effort. */
function LearnC() {
  const c = COURSE();
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(15);
  const [contrast, setContrast] = useState(false);
  const [spacing, setSpacing] = useState(false);
  const [done, setDone] = useState(false);
  const body: CSSProperties = { fontSize: size, lineHeight: spacing ? 2 : 1.6, letterSpacing: spacing ? "0.05em" : undefined, wordSpacing: spacing ? "0.16em" : undefined, color: contrast ? "#000" : "#374151", background: contrast ? "#FFF" : "#FCFBFF" };
  return (
    <div className="overflow-hidden rounded-xl border border-[#D9D2F2]">
      <div className="flex items-center justify-between px-4 py-3 text-white" style={{ background: "#5B3FBF" }}>
        <div>
          <div className="text-[12px] tracking-[0.15em]">LEARNACCESS</div>
          <div className="text-[19px] font-semibold">{c.title}</div>
        </div>
        <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="min-h-[40px] rounded border border-white/70 px-3 text-[13px] font-semibold">Aa {tt("Display")}</button>
      </div>
      {open && (
        <div className="flex flex-wrap items-center gap-3 border-b border-[#D9D2F2] bg-white px-4 py-2 text-[13px] text-[#1F2937]">
          <span>{tt("Text size")}</span>
          {[15, 18, 21].map((s) => (
            <button key={s} type="button" aria-pressed={size === s} onClick={() => setSize(s)} className={clsx("min-h-[36px] rounded border px-2", size === s ? "border-[#5B3FBF] bg-[#EEE9FB]" : "border-[#C9C2E6]")}>{s === 15 ? "A" : s === 18 ? "A+" : "A++"}</button>
          ))}
          <label className="inline-flex items-center gap-1"><input type="checkbox" checked={contrast} onChange={(e) => setContrast(e.target.checked)} /> {tt("High contrast")}</label>
          <label className="inline-flex items-center gap-1"><input type="checkbox" checked={spacing} onChange={(e) => setSpacing(e.target.checked)} /> {tt("More spacing")}</label>
        </div>
      )}
      <div className="space-y-3 p-4" style={body}>
        <div className="font-semibold">{c.lesson}</div>
        <p>{c.text}</p>
        <p>{c.task}</p>
        <button type="button" onClick={() => setDone(true)} className="min-h-[40px] rounded px-4 text-[14px] font-semibold text-white" style={{ background: "#5B3FBF" }}>{done ? tt("✓ Lesson complete") : tt("Continue")}</button>
      </div>
    </div>
  );
}

export function LearnAccess({ variant }: { variant: "A" | "B" | "C" }) {
  return variant === "A" ? <LearnA /> : variant === "B" ? <LearnB /> : <LearnC />;
}
