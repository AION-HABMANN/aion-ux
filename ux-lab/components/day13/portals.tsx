"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { tt } from "@/lib/lang";

/**
 * Day 13 · the platforms with the plan's load factors built in (show it real, user rule 2026-10-28): StudyPath (Block 1.1), the three JobAccess designs (Block 1.2)
 * and LifeGuide (Block 2.1). The learner meets the load instead of reading about it: a start page with banners, badges, a moving ticker and a chat bubble at once,
 * a deadline that looks like everything else, navigation that moves between areas, dense justified text, a long form of required fields, "Error E12", and in
 * LifeGuide a countdown in the error message. Movement stops when the system asks for reduced motion. These loads are on purpose and stay inside the simulation
 * window. JobAccess C's modes really change the page. The names and contents are made up; nothing is marked right or wrong.
 */

const TICKER = `
@keyframes d13-ticker { from { transform: translateX(0); } to { transform: translateX(-100%); } }
@keyframes d13-pulse { 0%,100% { opacity: 1; } 50% { opacity: .55; } }
@media (prefers-reduced-motion: no-preference) {
  .d13-ticker { animation: d13-ticker 14s linear infinite; }
  .d13-pulse { animation: d13-pulse 1.6s ease-in-out infinite; }
}`;

function Shell({ name, color, nav, children, footer }: { name: string; color: string; nav: ReactNode; children: ReactNode; footer?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#CBD3DC] bg-white text-[#26323F]">
      <style dangerouslySetInnerHTML={{ __html: TICKER }} />
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-white" style={{ background: color }}>
        <span className="text-[14px] font-bold">{name}</span>
        {nav}
      </div>
      <div className="min-h-[320px] p-3 text-[13px]">{children}</div>
      <div className="border-t border-[#CBD3DC] px-3 py-1.5 text-[11px] text-[#5F6B78]">{footer ?? tt(`© ${name} · Imprint · Privacy · Simulation: the names and the contents are made up`)}</div>
    </div>
  );
}

const NavBtn = ({ on, onClick, children }: { on?: boolean; onClick: () => void; children: ReactNode }) => (
  <button type="button" onClick={onClick} className={clsx("rounded px-2 py-1 text-[12px] font-semibold", on ? "bg-white/25" : "hover:bg-white/15")}>{children}</button>
);

const DENSE = () =>
  tt("Within the framework of the modular further training programme, participants are required, prior to the commencement of the examination phase, to have completed all mandatory learning units including the associated formative assessments, whereby the recognition of prior learning pursuant to the examination regulations may, upon application and subject to the submission of the corresponding evidence, be taken into account, insofar as the competences acquired are equivalent in content and level to those of the respective module.");

/* ------------------------------------------------------------------ StudyPath */

export function StudyPath() {
  const [page, setPage] = useState<"home" | "a" | "b" | "exam">("home");
  const [msg, setMsg] = useState("");
  return (
    <Shell
      name="StudyPath"
      color="#4338CA"
      nav={
        <div className="flex flex-wrap gap-1">
          <NavBtn on={page === "home"} onClick={() => setPage("home")}>{tt("Dashboard")}</NavBtn>
          <NavBtn on={page === "a"} onClick={() => setPage("a")}>{tt("Project management")}</NavBtn>
          <NavBtn on={page === "b"} onClick={() => setPage("b")}>{tt("Business English")}</NavBtn>
          <NavBtn onClick={() => setPage("exam")}>🔔 7</NavBtn>
        </div>
      }
    >
      {page === "home" && (
        <div className="relative space-y-2 pb-10">
          <div className="overflow-hidden whitespace-nowrap rounded bg-[#FEF3C7] py-1 text-[12px] font-semibold text-[#78350F]"><div className="d13-ticker inline-block pl-[100%]">{tt("🎉 New: gamified quizzes! · 🏆 Top learners this week · 📣 Webinar tonight 19:00 · 💡 Tip: try dark mode · 🎓 Graduation photos online")}</div></div>
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded border-l-4 border-[#DC2626] bg-[#FEE2E2] p-2"><b>{tt("Maintenance")}</b> {tt("Sunday 02:00–04:00")}</div>
            <div className="rounded border-l-4 border-[#7C3AED] bg-[#EDE9FE] p-2"><b>{tt("New badge!")}</b> {tt("🏅 Early bird")}</div>
            <div className="rounded border-l-4 border-[#059669] bg-[#D1FAE5] p-2"><b>{tt("Survey")}</b> {tt("Tell us what you think (2 min)")}</div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {["📚", "🧪", "📝", "🗓", "👥", "⚙️"].map((e, i) => (
              <button key={e} type="button" onClick={() => setPage(i === 2 ? "exam" : i % 2 ? "b" : "a")} className="rounded border border-[#CBD3DC] bg-[#F8FAFC] py-3 text-[20px]">{e}</button>
            ))}
          </div>
          <p className="text-[11px] text-[#5F6B78]">{tt("Exam registration closes Friday.")}</p>
          <div className="d13-pulse absolute bottom-0 right-0 rounded-full bg-[#4338CA] px-3 py-2 text-[12px] font-semibold text-white sm:block">💬 {tt("Need help? Chat with Sam!")}</div>
        </div>
      )}
      {page === "a" && (
        <div className="grid gap-3 sm:grid-cols-[9rem_1fr]">
          <ul className="space-y-1 text-[12px]">
            <li className="font-semibold">{tt("Modules")}</li>
            <li>1 · {tt("Scope")}</li>
            <li>2 · {tt("Milestones")}</li>
            <li>3 · {tt("Risks")}</li>
          </ul>
          <div className="space-y-2">
            <h3 className="text-[15px] font-bold">{tt("Module 2 · Milestones")}</h3>
            <p className="text-justify text-[12px] leading-tight">{DENSE()}</p>
            <div className="flex justify-end"><button type="button" onClick={() => setPage("b")} className="rounded bg-[#4338CA] px-3 py-1.5 text-[12px] font-semibold text-white">{tt("Next")}</button></div>
          </div>
        </div>
      )}
      {page === "b" && (
        <div className="space-y-2">
          <div className="flex gap-1 border-b border-[#CBD3DC] text-[12px]">
            <span className="border-b-2 border-[#0EA5E9] px-2 pb-1 font-semibold">{tt("Unit 4")}</span>
            <span className="px-2 pb-1">{tt("Unit 5")}</span>
            <span className="px-2 pb-1">{tt("Glossary")}</span>
          </div>
          <div className="flex justify-start"><button type="button" onClick={() => setPage("home")} className="rounded border border-[#0EA5E9] px-3 py-1.5 text-[12px] font-semibold text-[#0369A1]">{tt("Continue →")}</button></div>
          <p className="text-justify text-[12px] uppercase italic leading-tight">{tt("Please note that all written submissions must comply with the formal requirements set out in the module handbook.")}</p>
        </div>
      )}
      {page === "exam" && (
        <div className="space-y-2">
          <h3 className="text-[15px] font-bold">{tt("Examination registration")}</h3>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {[tt("Surname*"), tt("First name*"), tt("Learner ID*"), tt("Module code*"), tt("Examination period*"), tt("Location*"), tt("Date of birth*"), tt("Employer*"), tt("Cost centre*"), tt("Declaration of independent work*")].map((f) => (
              <input key={f} aria-label={f} placeholder={f} className="rounded border border-[#CBD3DC] px-2 py-1 text-[12px]" />
            ))}
          </div>
          <button type="button" onClick={() => setMsg(tt("Error E12"))} className="rounded bg-[#4338CA] px-3 py-1.5 text-[12px] font-semibold text-white">{tt("Submit")}</button>
          {msg && <p className="text-[12px] text-[#B91C1C]">{msg}</p>}
        </div>
      )}
    </Shell>
  );
}

/* ------------------------------------------------------------------ JobAccess A, B, C */

const APPS = () => [
  [tt("UX designer · Fernwerk GmbH"), tt("Interview on Tuesday, 10:00")],
  [tt("Product owner · Hollen AG"), tt("Application sent")],
  [tt("Course: Agile basics"), tt("Starts 12 November")],
];

export function JobAccess({ variant }: { variant: "A" | "B" | "C" }) {
  const [tab, setTab] = useState<"apps" | "courses">("apps");
  const [reading, setReading] = useState(false);
  const [calm, setCalm] = useState(false);
  const [simple, setSimple] = useState(false);
  const [open, setOpen] = useState(false);
  if (variant === "A")
    return (
      <Shell
        name="JobAccess"
        color="#0F172A"
        nav={tab === "apps" ? <div className="flex gap-1"><NavBtn on onClick={() => setTab("apps")}>{tt("Applications")}</NavBtn><NavBtn onClick={() => setTab("courses")}>{tt("Courses")}</NavBtn></div> : <span className="text-[11px]">{tt("Menu ☰")}</span>}
      >
        {tab === "apps" ? (
          <div className="grid gap-1.5 text-[11px] sm:grid-cols-3">
            {[...APPS(), [tt("Recommended: Data analyst"), tt("97% match")], [tt("Trending: AI courses"), tt("🔥 Hot")], [tt("Profile 72% complete"), tt("Add skills")]].map(([a, b]) => (
              <div key={a} className="rounded-md bg-gradient-to-br from-[#1E293B] to-[#334155] p-2 text-white"><div className="font-semibold">{a}</div><div className="text-[#CBD5E1]">{b}</div></div>
            ))}
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-[7rem_1fr]">
            <div className="space-y-1 text-[11px]">
              <button type="button" onClick={() => setTab("apps")} className="block underline">{tt("← Applications")}</button>
              <div>{tt("Courses")}</div>
            </div>
            <div className="grid gap-1.5 text-[11px] sm:grid-cols-2">
              {[tt("Agile basics"), tt("Negotiation"), tt("Excel advanced"), tt("Leadership 101")].map((c) => <div key={c} className="rounded-md bg-[#1E293B] p-2 text-white">{c}</div>)}
            </div>
          </div>
        )}
      </Shell>
    );
  if (variant === "B")
    return (
      <Shell name="JobAccess" color="#1F4E5F" nav={<div className="flex gap-1"><NavBtn on={tab === "apps"} onClick={() => setTab("apps")}>{tt("My applications")}</NavBtn><NavBtn on={tab === "courses"} onClick={() => setTab("courses")}>{tt("My courses")}</NavBtn></div>}>
        <div className="space-y-3 text-[15px] leading-relaxed">
          <h3 className="text-[18px] font-bold">{tab === "apps" ? tt("My applications") : tt("My courses")}</h3>
          <p className="rounded border border-[#1F4E5F] bg-[#EEF5F7] p-2">{tt("Next step: prepare for your interview on Tuesday at 10:00.")}</p>
          <ul className="space-y-2">
            {(tab === "apps" ? APPS().slice(0, 2) : [APPS()[2]]).map(([a, b]) => (
              <li key={a} className="rounded border border-[#CBD3DC] p-2"><div className="font-semibold">{a}</div><div>{b}</div></li>
            ))}
          </ul>
        </div>
      </Shell>
    );
  return (
    <Shell
      name="JobAccess"
      color="#6D28D9"
      nav={
        <div className="flex flex-wrap items-center gap-1">
          <NavBtn on={tab === "apps"} onClick={() => setTab("apps")}>{tt("My applications")}</NavBtn>
          <NavBtn on={tab === "courses"} onClick={() => setTab("courses")}>{tt("My courses")}</NavBtn>
          <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="rounded border border-white/60 px-2 py-1 text-[12px] font-semibold">{tt("Display ▾")}</button>
        </div>
      }
    >
      {open && (
        <div className="mb-2 flex flex-wrap gap-3 rounded border border-[#DDD6FE] bg-[#F5F3FF] p-2 text-[12px]">
          <label className="inline-flex items-center gap-1"><input type="checkbox" checked={reading} onChange={(e) => setReading(e.target.checked)} /> {tt("Reading mode")}</label>
          <label className="inline-flex items-center gap-1"><input type="checkbox" checked={calm} onChange={(e) => setCalm(e.target.checked)} /> {tt("Fewer stimuli")}</label>
          <label className="inline-flex items-center gap-1"><input type="checkbox" checked={simple} onChange={(e) => setSimple(e.target.checked)} /> {tt("Simplified view")}</label>
        </div>
      )}
      <div className={clsx("space-y-3", reading ? "text-[17px] leading-loose tracking-wide" : "text-[14px] leading-relaxed")} style={{ filter: calm ? "saturate(0.2)" : undefined }}>
        <h3 className="text-[17px] font-bold">{tab === "apps" ? tt("My applications") : tt("My courses")}</h3>
        <p className="rounded border-l-4 border-[#6D28D9] bg-[#F5F3FF] p-2">{tt("Next step: prepare for your interview on Tuesday at 10:00.")}</p>
        {!simple && !calm && <div className="rounded bg-gradient-to-r from-[#EDE9FE] to-[#FCE7F3] p-2 text-[12px]">✨ {tt("New: career coaching sessions this month")}</div>}
        <ul className={clsx("gap-2", reading || simple ? "space-y-2" : "grid sm:grid-cols-2")}>
          {(tab === "apps" ? APPS().slice(0, simple ? 1 : 2) : [APPS()[2]]).map(([a, b]) => (
            <li key={a} className="rounded border border-[#DDD6FE] p-2"><div className="font-semibold">{a}</div><div>{b}</div></li>
          ))}
        </ul>
        {simple && <p className="text-[12px] text-[#5F6B78]">{tt("Simplified view: only your next step and your most recent item. Switch it off to see everything.")}</p>}
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ LifeGuide */

export function LifeGuide() {
  const [page, setPage] = useState<"home" | "find" | "book">("home");
  const [err, setErr] = useState(false);
  const [secs, setSecs] = useState(299);
  useEffect(() => {
    if (!err) return;
    const id = window.setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => window.clearInterval(id);
  }, [err]);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  return (
    <Shell
      name="LifeGuide"
      color="#0E7490"
      nav={
        page === "book" ? (
          <span className="text-[11px]">{tt("Step 1 of 1")}</span>
        ) : (
          <div className="flex gap-1">
            <NavBtn on={page === "home"} onClick={() => setPage("home")}>{tt("Start")}</NavBtn>
            <NavBtn on={page === "find"} onClick={() => setPage("find")}>{tt("Offers")}</NavBtn>
          </div>
        )
      }
    >
      {page === "home" && (
        <div className="space-y-2">
          <div className="grid gap-2 sm:grid-cols-[2fr_1fr]">
            <div className="rounded bg-gradient-to-r from-[#0E7490] to-[#7C3AED] p-3 text-white"><div className="text-[16px] font-bold">{tt("Your health. Your life. Your guide.")}</div><div className="text-[12px]">{tt("Discover 120+ offers, events and stories")}</div></div>
            <div className="space-y-1">
              <div className="rounded bg-[#FEF3C7] p-1.5 text-[11px]">📣 {tt("Flu season: book now")}</div>
              <div className="rounded bg-[#FCE7F3] p-1.5 text-[11px]">❤️ {tt("Story of the week")}</div>
              <div className="rounded bg-[#DCFCE7] p-1.5 text-[11px]">🎁 {tt("Win a fitness tracker")}</div>
            </div>
          </div>
          <div className="overflow-hidden whitespace-nowrap rounded bg-[#ECFEFF] py-1 text-[12px]"><div className="d13-ticker inline-block pl-[100%]">{tt("+++ New counselling hours +++ Self-help groups in your area +++ Newsletter: subscribe now +++")}</div></div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[tt("Counselling"), tt("Prevention"), tt("Self-help"), tt("Events")].map((x, i) => (
              <button key={x} type="button" onClick={() => setPage(i === 0 ? "book" : "find")} className="rounded border border-[#CBD3DC] p-2 text-[12px] font-semibold">{x}</button>
            ))}
          </div>
          <p className="text-[10px] text-[#64748B]">{tt("In a crisis: 0800 111 0 111 (day and night)")}</p>
        </div>
      )}
      {page === "find" && (
        <div className="grid gap-3 sm:grid-cols-[1fr_9rem]">
          <div className="space-y-2">
            <h3 className="text-[15px] font-bold">{tt("Offers near you")}</h3>
            <p className="text-justify text-[12px] leading-tight">{tt("The offers listed below are provided by independent organisations within the framework of the regional support network and are subject to their respective conditions of participation, which may vary depending on eligibility, availability and the applicable funding arrangements.")}</p>
            <ul className="space-y-1 text-[12px]">
              <li>• {tt("Talking group for carers · Wed 18:00")}</li>
              <li>• {tt("Counselling after a diagnosis · by appointment")}</li>
            </ul>
          </div>
          <aside className="space-y-1 text-[11px]">
            <div className="font-semibold">{tt("Filter")}</div>
            <div>☐ {tt("Online")}</div>
            <div>☐ {tt("Free of charge")}</div>
            <button type="button" onClick={() => setPage("book")} className="mt-2 rounded bg-[#0E7490] px-2 py-1 font-semibold text-white">{tt("Proceed to booking")}</button>
          </aside>
        </div>
      )}
      {page === "book" && (
        <div className="space-y-2">
          <h3 className="text-[15px] font-bold">{tt("Booking request for a counselling appointment")}</h3>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {[tt("Title"), tt("Surname"), tt("First name"), tt("Date of birth"), tt("Health insurance number"), tt("Reason for consultation"), tt("Preferred date"), tt("Alternative date"), tt("Phone"), tt("E-mail"), tt("Referral (if available)"), tt("How did you hear about us?")].map((f) => (
              <input key={f} aria-label={f} placeholder={f} className="rounded border border-[#CBD3DC] px-2 py-1 text-[12px]" />
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => { setErr(true); setSecs(299); }} className="rounded bg-[#0E7490] px-3 py-1.5 text-[12px] font-semibold text-white">{tt("Send request")}</button>
            <button type="button" onClick={() => { setPage("home"); setErr(false); }} className="rounded border border-[#CBD3DC] px-3 py-1.5 text-[12px]">{tt("Back")}</button>
          </div>
          {err && <p className="rounded bg-[#FEE2E2] p-2 text-[12px] font-semibold text-[#991B1B]">{tt(`Validation error in 4 fields. Your session expires in ${mm}:${ss}.`)}</p>}
        </div>
      )}
    </Shell>
  );
}
