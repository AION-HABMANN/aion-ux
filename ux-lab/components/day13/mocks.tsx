"use client";

import type { ReactNode } from "react";
import { tt } from "@/lib/lang";

/**
 * Day 13 · the drawn screens of the study cards (CLAUDE.md #52): Hearth Energy, a made-up energy supplier with an app, so no task is answered here. Each mock is the
 * same screen in different states; the figure around it (components/day13/diagrams.tsx) says what changes and for whom.
 *
 * Shown for real (user rule 2026-10-28): the overloaded start page is drawn as busy as such apps are, the inconsistent pages really move their menu and rename
 * their button, so the load is met, not described. Amounts and dates are labels of a made-up app. No element flashes.
 */
const BRAND = "#9A3412";
const INK = "#1D2733";

export function Phone({ children, label, title = "Hearth Energy", bar = BRAND }: { children: ReactNode; label: string; title?: string; bar?: string }) {
  return (
    <div role="img" aria-label={label} className="mx-auto w-full max-w-[300px] select-none">
      <div className="overflow-hidden rounded-[28px] border-[6px] border-[#1F2730] bg-[#FAF7F4] shadow-md">
        <div className="flex items-center justify-between px-4 pt-1.5 text-[10px] font-semibold text-white" style={{ background: bar }}>
          <span>08:12</span>
          <span aria-hidden>▂▄▆ ◔</span>
        </div>
        <div className="px-4 pb-2.5 pt-1 text-[13px] font-bold text-white" style={{ background: bar }}>{title}</div>
        <div className="min-h-[250px] space-y-2 p-3 text-[12px] leading-snug" style={{ color: INK }}>{children}</div>
      </div>
    </div>
  );
}

const Main = ({ children }: { children: ReactNode }) => <div className="rounded-lg py-2 text-center font-semibold text-white" style={{ background: BRAND }}>{children}</div>;
const Note = ({ children }: { children: ReactNode }) => <div className="rounded border border-dashed border-[#A59B92] bg-white px-2 py-1 text-[10.5px] text-[#4A4540]">{children}</div>;

/* ------------------------------------------------------------------ A1 · one start page, three lenses */

export function LensMock({ lens }: { lens: "adhd" | "autism" | "dyslexia" }) {
  const busy = (
    <>
      <div className="flex flex-wrap gap-1 text-[10px]">
        <span className="rounded bg-[#FDE68A] px-1">⚡ {tt("Save 10%!")}</span>
        <span className="rounded bg-[#FBCFE8] px-1">🎁 {tt("Refer a friend")}</span>
        <span className="rounded bg-[#BFDBFE] px-1">🔔 4</span>
      </div>
      <div className="grid grid-cols-3 gap-1 text-center text-[10px]">
        {["📈", "💡", "🧾", "🏠", "🔌", "💬"].map((e) => <div key={e} className="rounded border border-[#E7DED6] bg-white py-1.5 text-[16px]">{e}</div>)}
      </div>
      <div className="text-[10px] text-[#6B6560]">{tt("Meter reading due by 31 Oct")}</div>
    </>
  );
  const notes = {
    adhd: [tt("Ayo (ADHD): ten things ask for attention at once; the one task that matters, the meter reading, is the smallest line. He taps the offer, then the friends, and closes the app.")],
    autism: [tt("Mirko (autistic): icons without words, a badge “4” that says nothing about what happened, and a menu that will look different on the next page. He cannot predict what any tap does.")],
    dyslexia: [tt("Tilda (dyslexia): the important line is tiny and grey; the tariff page behind it is a wall of justified text. She asks her partner to do it.")],
  }[lens];
  return (
    <Phone label={tt(`Hearth Energy's busy start page seen through the ${lens === "adhd" ? "ADHD" : lens === "autism" ? "autism" : "dyslexia"} lens. ${notes[0]}`)}>
      {busy}
      <Note>{notes[0]}</Note>
    </Phone>
  );
}

/* ------------------------------------------------------------------ A2 · from calm to overloaded */

export const STIM_NAMES = () => [tt("Calm"), tt("A banner"), tt("Badges and offers"), tt("Movement and chat"), tt("Everything at once")];

export function BusyMock({ level }: { level: number }) {
  return (
    <Phone label={tt(`Hearth Energy start page at stimulus level ${level + 1} of 5: ${STIM_NAMES()[level]}`)}>
      {level >= 1 && <div className="rounded bg-[#FDE68A] px-2 py-1 text-[11px] font-semibold">⚡ {tt("Winter deal: save 10% now!")}</div>}
      {level >= 3 && <div className="overflow-hidden whitespace-nowrap rounded bg-[#E0F2FE] px-2 py-0.5 text-[10px]">{tt("+++ New tariffs +++ Smart meter offer +++ App update +++")}</div>}
      <div className="font-bold">{tt("Your next step")}</div>
      <div className="rounded border border-[#E7DED6] bg-white p-2">{tt("Send your meter reading by 31 October.")}</div>
      <Main>{tt("Send meter reading")}</Main>
      {level >= 2 && (
        <div className="flex flex-wrap gap-1 text-[10px]">
          <span className="rounded-full bg-[#DC2626] px-2 text-white">🔔 4</span>
          <span className="rounded-full bg-[#7C3AED] px-2 text-white">🏅 {tt("Saver badge")}</span>
          <span className="rounded-full bg-[#047857] px-2 text-white">🎁 {tt("Refer a friend")}</span>
        </div>
      )}
      {level >= 3 && <div className="ml-auto w-fit rounded-full bg-[#9A3412] px-2 py-1 text-[10px] font-semibold text-white">💬 {tt("Hi! Can I help?")}</div>}
      {level >= 4 && (
        <div className="grid grid-cols-2 gap-1 text-[10px]">
          <div className="rounded bg-[#FBCFE8] p-1">{tt("Quiz: how green are you?")}</div>
          <div className="rounded bg-[#DCFCE7] p-1">{tt("Your CO₂ score: B+")}</div>
          <div className="rounded bg-[#FEF3C7] p-1">{tt("Rate the app ⭐⭐⭐⭐⭐")}</div>
          <div className="rounded bg-[#E0E7FF] p-1">{tt("New: dark mode")}</div>
        </div>
      )}
    </Phone>
  );
}

/* ------------------------------------------------------------------ A2 · one long form, or steps */

export function FormMock({ steps }: { steps: boolean }) {
  return (
    <Phone label={steps ? tt("Moving house as three short steps with a progress line and one question per screen") : tt("Moving house as one long form with twelve required fields")}>
      <div className="font-bold">{tt("Moving house")}</div>
      {steps ? (
        <>
          <div className="flex gap-1" aria-hidden>{[0, 1, 2].map((i) => <div key={i} className="h-1.5 flex-1 rounded" style={{ background: i === 0 ? BRAND : "#E7DED6" }} />)}</div>
          <div className="text-[10.5px] font-semibold">{tt("Step 1 of 3 · When do you move?")}</div>
          <div className="rounded border border-[#CFC6BD] bg-white px-2 py-1.5">14.11.2026</div>
          <Main>{tt("Next: your new address")}</Main>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-1 text-[9.5px]">
          {[tt("Customer no.*"), tt("Meter no.*"), tt("Move-out date*"), tt("Reading old*"), tt("New street*"), tt("No.*"), tt("Postcode*"), tt("City*"), tt("Move-in date*"), tt("Reading new*"), tt("Payment*"), tt("Consent*")].map((f) => <div key={f} className="rounded border border-[#CFC6BD] bg-white px-1 py-1">{f}</div>)}
        </div>
      )}
    </Phone>
  );
}

/* ------------------------------------------------------------------ A3 · consistent or not */

export function PagesMock({ consistent }: { consistent: boolean }) {
  const pages = [
    { t: tt("Meter reading"), btn: consistent ? tt("Send meter reading") : tt("Go"), menu: "top", side: "right" },
    { t: tt("My bills"), btn: consistent ? tt("Download bill") : tt("OK"), menu: consistent ? "top" : "left", side: consistent ? "right" : "left" },
    { t: tt("Moving house"), btn: consistent ? tt("Report your move") : tt("Let's go!"), menu: consistent ? "top" : "bottom", side: consistent ? "right" : "center" },
  ];
  return (
    <div role="img" aria-label={consistent ? tt("Three Hearth Energy pages built the same way: the menu always at the top, a descriptive main button always on the right") : tt("Three Hearth Energy pages built differently: the menu moves from top to left to bottom, the main button changes name (Go, OK, Let's go!) and place")} className="mx-auto grid max-w-[640px] grid-cols-3 gap-2 select-none">
      {pages.map((p) => (
        <div key={p.t} className="flex h-40 flex-col overflow-hidden rounded-lg border border-[#CFC6BD] bg-white text-[10px] text-[#1D2733]">
          {p.menu === "top" && <div className="px-1.5 py-1 text-white" style={{ background: BRAND }}>☰ {tt("Menu")}</div>}
          <div className={p.menu === "left" ? "flex flex-1" : "flex flex-1 flex-col"}>
            {p.menu === "left" && <div className="w-10 px-1 py-1 text-white" style={{ background: BRAND }}>☰</div>}
            <div className="flex flex-1 flex-col p-1.5">
              <div className="font-bold">{p.t}</div>
              <div className="mt-1 flex-1 text-[#6B6560]">…</div>
              <div className={p.side === "right" ? "self-end" : p.side === "left" ? "self-start" : "self-center"}>
                <span className="rounded px-1.5 py-0.5 font-semibold text-white" style={{ background: BRAND }}>{p.btn}</span>
              </div>
            </div>
          </div>
          {p.menu === "bottom" && <div className="px-1.5 py-1 text-white" style={{ background: BRAND }}>☰ {tt("Menu")}</div>}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ A5 · the same content through assistive technology */

export const AT_TEXT = () => tt("Your meter reading is due by 31 October. You can send it in the app or by phone. It takes about two minutes.");

export function ATMock({ kind }: { kind: "reader" | "tts" | "readermode" | "zoom" | "calm" }) {
  if (kind === "reader")
    return (
      <Phone label={tt("A screen reader's list of headings and buttons on the Hearth page: Heading level 1, Meter reading; button, Send meter reading; link, Help")}>
        <div className="space-y-1 rounded bg-[#111827] p-2 font-mono text-[10.5px] text-[#E5E7EB]">
          <div>{tt("Heading 1: Meter reading")}</div>
          <div>{tt("Heading 2: Due by 31 October")}</div>
          <div>{tt("Button: Send meter reading")}</div>
          <div>{tt("Link: Help with meter readings")}</div>
        </div>
        <Note>{tt("Works only if the page has real headings, buttons and names. A good base structure is what assistive technology reads.")}</Note>
      </Phone>
    );
  if (kind === "tts")
    return (
      <Phone label={tt(`Text-to-speech reading the notice aloud: ${AT_TEXT()}`)}>
        <div className="rounded border border-[#E7DED6] bg-white p-2"><span className="bg-[#FDE68A]">{tt("Your meter reading is due by 31 October.")}</span> {tt("You can send it in the app or by phone. It takes about two minutes.")}</div>
        <Note>{tt("Read aloud, sentence by sentence, with the current sentence highlighted. Helps many readers with dyslexia. Press “Hear it” below.")}</Note>
      </Phone>
    );
  if (kind === "readermode")
    return (
      <Phone label={tt("Reader mode: only the text, one column, larger, everything else removed")} bar="#57534E" title={tt("Reader view")}>
        <div className="text-[15px] font-bold">{tt("Meter reading")}</div>
        <p className="text-[14px] leading-relaxed">{AT_TEXT()}</p>
        <Note>{tt("The browser's reader view strips menus, banners and offers. It only works if the content is real text in a clear order.")}</Note>
      </Phone>
    );
  if (kind === "zoom")
    return (
      <Phone label={tt("Text scaled to 200 percent: the text grows and wraps, the button stays reachable")}>
        <p className="text-[20px] font-semibold leading-snug">{tt("Meter reading due by 31 Oct")}</p>
        <Main>{tt("Send meter reading")}</Main>
        <Note>{tt("System text scaling at 200 %. Fine here; on pages with fixed boxes, text overlaps or gets cut off.")}</Note>
      </Phone>
    );
  return (
    <Phone label={tt("A reduced-stimulus filter: colours muted, offers hidden, only the task remains")} bar="#78716C">
      <div className="font-bold">{tt("Your next step")}</div>
      <div className="rounded border border-[#D6D3D1] bg-white p-2">{tt("Send your meter reading by 31 October.")}</div>
      <div className="rounded-lg bg-[#57534E] py-2 text-center font-semibold text-white">{tt("Send meter reading")}</div>
      <Note>{tt("A browser extension or the app's own quiet mode mutes colours and hides offers. Helps people with ADHD and sensory sensitivity.")}</Note>
    </Phone>
  );
}

/* ------------------------------------------------------------------ A5 · measures, as thumbnails */

export function MeasureThumb({ kind }: { kind: "calm" | "easy" | "steps" }) {
  return (
    <div aria-hidden className="mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border border-line bg-white text-[9px] leading-tight text-[#26323F]">
      <div className="px-2 py-1 font-bold text-white" style={{ background: BRAND }}>Hearth Energy</div>
      <div className="space-y-1 p-1.5">
        {kind === "calm" && <><div className="font-semibold">Your next step</div><div className="rounded bg-[#9A3412] px-1 text-white">Send meter reading</div></>}
        {kind === "easy" && <><div className="rounded bg-[#FDE68A] px-1">⚡ Offers · 🔔 4 · 🎁</div><div className="text-[#6B6560]">Settings › Easy mode (off)</div></>}
        {kind === "steps" && <><div>Step 1 of 3</div><div className="h-1 rounded bg-[#9A3412]" /></>}
      </div>
    </div>
  );
}
