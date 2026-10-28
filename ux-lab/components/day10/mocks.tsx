"use client";

import type { ReactNode } from "react";
import { tt } from "@/lib/lang";

/**
 * Day 10 · the drawn screens of the study cards (CLAUDE.md #52): Northline Rail, a made-up rail company with an app, so no task is answered here. Each mock is the
 * same screen in different states; the figure around it (components/day10/diagrams.tsx) says what changes and what it does to the person.
 *
 * Shown for real (user rule 2026-10-28): the screens are drawn as a real phone app would look, in HTML rather than as grey wireframes, so that a message that knows
 * too much, a rebooking nobody can question, or a confident black-box suggestion look like the thing itself. Northline's own colours only; times, train numbers and
 * percentages are interface labels of a made-up app, not figures about users.
 */

const BRAND = "#7A1E3A";
const INK = "#1D2733";

export function Phone({ children, label, bg = "#F7F5F6", bar = BRAND, title = "Northline" }: { children: ReactNode; label: string; bg?: string; bar?: string; title?: string }) {
  return (
    <div role="img" aria-label={label} className="mx-auto w-full max-w-[300px] select-none">
      <div className="overflow-hidden rounded-[28px] border-[6px] border-[#1F2730] shadow-md" style={{ background: bg }}>
        <div className="flex items-center justify-between px-4 pt-1.5 text-[10px] font-semibold text-white" style={{ background: bar }}>
          <span>7:31</span>
          <span aria-hidden>▂▄▆ ◔</span>
        </div>
        <div className="px-4 pb-2.5 pt-1 text-[13px] font-bold text-white" style={{ background: bar }}>{title}</div>
        <div className="min-h-[280px] space-y-2 p-3 text-[12px] leading-snug" style={{ color: INK }}>{children}</div>
      </div>
    </div>
  );
}

const Btn = ({ children, bg = BRAND, fg = "#fff" }: { children: ReactNode; bg?: string; fg?: string }) => (
  <div className="rounded-lg py-2 text-center text-[12px] font-semibold" style={{ background: bg, color: fg }}>{children}</div>
);
const Card = ({ children, bg = "#fff", border = "#E2D9DD" }: { children: ReactNode; bg?: string; border?: string }) => (
  <div className="rounded-lg border p-2.5" style={{ background: bg, borderColor: border }}>{children}</div>
);
const Small = ({ children, c = "#5D6670" }: { children: ReactNode; c?: string }) => <div className="text-[10.5px]" style={{ color: c }}>{children}</div>;
const Why = ({ children }: { children: ReactNode }) => <div className="rounded bg-[#F3E9ED] px-2 py-1 text-[10.5px] text-[#5A1A30]">ⓘ {children}</div>;
const Train = ({ time, to, note, late }: { time: string; to: string; note?: string; late?: string }) => (
  <div className="flex items-baseline justify-between border-b border-[#EEE6E9] py-1">
    <span className="font-semibold">{time} <span className="font-normal">{to}</span></span>
    <span className="text-[10.5px]" style={{ color: late ? "#B42318" : "#5D6670" }}>{late ?? note}</span>
  </div>
);

/* ------------------------------------------------------------------ A1 · one delay, handled by a rule, by the situation and by what was learned */

export function DelayMock({ kind }: { kind: "rule" | "adaptive" | "learning" }) {
  if (kind === "rule")
    return (
      <Phone label={tt("Northline's delay message from a fixed rule: the same text for every passenger of train 412")}>
        <Card bg="#FFF6E5" border="#F2D49B">
          <div className="font-bold">{tt("Train 412 is delayed")}</div>
          <div>{tt("Expected delay: 20 minutes. We apologise for the inconvenience.")}</div>
        </Card>
        <Train time="7:42" to="Bremen" late="+20" />
        <Train time="8:12" to="Bremen" note={tt("on time")} />
        <Small>{tt("Sent to every passenger with a ticket for train 412.")}</Small>
      </Phone>
    );
  if (kind === "adaptive")
    return (
      <Phone label={tt("The same delay adapted to Ilka's situation now: she is on platform 4 and will miss her connection, so the app offers the next one")}>
        <Small c={BRAND}>{tt("📍 You are at Hamburg Hbf, platform 4")}</Small>
        <Card bg="#FFF6E5" border="#F2D49B">
          <div className="font-bold">{tt("Your train is 20 minutes late")}</div>
          <div>{tt("You will miss your connection in Bremen (8:55). Next option: the 8:12 from platform 6, arriving in time.")}</div>
        </Card>
        <Btn>{tt("Show the way to platform 6")}</Btn>
        <Why>{tt("Because you are at the station now and your ticket includes a connection.")}</Why>
      </Phone>
    );
  return (
    <Phone label={tt("The same delay from what the app has learned about Ilka over months: it knows her usual train and her meeting time and has already chosen an alternative")}>
      <Small c={BRAND}>{tt("✨ Learned from your trips")}</Small>
      <Card bg="#EEF4FF" border="#B9CCF0">
        <div className="font-bold">{tt("Morning, Ilka. Your usual 7:42 is late today.")}</div>
        <div>{tt("You usually need to be in Bremen by 9:30 on Tuesdays. We picked the 8:12 for you; it gets you there at 9:18.")}</div>
      </Card>
      <Btn>{tt("Take the 8:12")}</Btn>
      <Small>{tt("Next month this may look different: it keeps learning.")}</Small>
    </Phone>
  );
}

/* ------------------------------------------------------------------ A2 · context, personal data and steering the interaction */

export function WaysMock({ kind }: { kind: "context" | "personal" | "steer" }) {
  if (kind === "context")
    return (
      <Phone label={tt("Adapting to context: Mats opens the app at Hannover station at 18:05 and sees the departures from there, nothing about him")}>
        <Small c={BRAND}>{tt("📍 Hannover Hbf · 18:05")}</Small>
        <div className="font-bold">{tt("Departures from here")}</div>
        <Train time="18:11" to="Berlin" note={tt("platform 9")} />
        <Train time="18:19" to="Hamburg" note={tt("platform 4")} />
        <Train time="18:26" to="Bremen" note={tt("platform 11")} />
        <Why>{tt("Uses: where you are and the time. Nothing stored about you.")}</Why>
      </Phone>
    );
  if (kind === "personal")
    return (
      <Phone label={tt("Personalising from data: the app shows Mats his usual Friday trip home, from his trip history")}>
        <div className="font-bold">{tt("Your Friday trip")}</div>
        <Card>
          <div>{tt("Hannover → Hamburg · 18:19 · 2nd class · window")}</div>
          <Small>{tt("You took this trip on 11 of the last 12 Fridays.")}</Small>
        </Card>
        <Btn>{tt("Book again")}</Btn>
        <Why>{tt("Uses: your trip history and your preferences, stored in your account.")}</Why>
      </Phone>
    );
  return (
    <Phone label={tt("Steering the interaction: the voice assistant asks only for what it does not know yet and says back what it understood")}>
      <div className="font-bold">{tt("🎙 Voice booking")}</div>
      <div className="ml-auto max-w-[85%] rounded-lg bg-[#F3E9ED] px-2 py-1.5">{tt("“Hamburg, tomorrow morning.”")}</div>
      <div className="max-w-[90%] rounded-lg border border-[#E2D9DD] bg-white px-2 py-1.5">{tt("“Hamburg tomorrow morning. Did I get that right? 7:19 or 8:19? Second class and a window seat, as usual.”")}</div>
      <div className="ml-auto max-w-[85%] rounded-lg bg-[#F3E9ED] px-2 py-1.5">{tt("“8:19.”")}</div>
      <Why>{tt("Steps skipped: date form, class, seat. It says back what it heard, because there is no screen to check.")}</Why>
    </Phone>
  );
}

/* ------------------------------------------------------------------ A3 · from not personal to far too personal */

export const PERSONAL_LEVELS = () => [tt("Not personal"), tt("Fits the trip"), tt("Fits the person"), tt("Knows too much"), tt("Narrows the world")];

export function PersonalMock({ level }: { level: number }) {
  const msgs: [string, string][] = [
    [tt("Service notice"), tt("Delays are possible on the Hamburg–Bremen line today due to construction work.")],
    [tt("Your trip today"), tt("Your 7:42 to Bremen is expected 10 minutes late. Your connection is safe.")],
    [tt("Good morning, Ilka"), tt("Your 7:42 is 10 minutes late. The quiet coach is at the front today, where you usually sit.")],
    [tt("Ilka, running late again?"), tt("Third late start this week. Your 7:42 left without you, and your 18:30 gym class in Bremen looks tight. Leave now?")],
    [tt("Only for you"), tt("We now show you Bremen trips only. Other destinations are hidden, since you never travel there.")],
  ];
  const [head, body] = msgs[level];
  const warm = level >= 3;
  return (
    <Phone label={tt(`Northline push message at level ${level + 1} of 5: ${head}. ${body}`)}>
      <div className="rounded-xl border p-2.5 shadow-sm" style={{ background: warm ? "#FFF1F1" : "#fff", borderColor: warm ? "#F3B4B4" : "#E2D9DD" }}>
        <div className="flex items-center gap-1.5 text-[10px] text-[#5D6670]"><span className="inline-block h-3 w-3 rounded-sm" style={{ background: BRAND }} />{tt("NORTHLINE · now")}</div>
        <div className="mt-1 font-bold">{head}</div>
        <div>{body}</div>
      </div>
      {level === 4 && (
        <Card>
          <div className="font-bold">{tt("Where to?")}</div>
          <Train time="7:42" to="Bremen" note="" />
          <Train time="8:12" to="Bremen" note="" />
          <Small>{tt("Search other destinations ›")}</Small>
        </Card>
      )}
    </Phone>
  );
}

/* ------------------------------------------------------------------ A4 · an automatic rebooking with or without why, change and undo */

export function RebookMock({ why, change, undo }: { why: boolean; change: boolean; undo: boolean }) {
  return (
    <Phone label={tt(`Northline rebooked Ilka automatically onto the 8:12. ${why ? "It says why." : "It does not say why."} ${change ? "She can choose another train." : "She cannot choose another train."} ${undo ? "She can undo it." : "She cannot undo it."}`)}>
      <Card bg="#EAF6EF" border="#A8D9BC">
        <div className="font-bold">{tt("✓ You have been rebooked")}</div>
        <div>{tt("New train: 8:12 to Bremen, coach 7, seat 64.")}</div>
      </Card>
      {why && <Why>{tt("Why: your 7:42 is cancelled, and the 8:12 is the next train with a free seat that still reaches your connection.")}</Why>}
      {change && (
        <Card>
          <div className="font-semibold">{tt("Prefer another train?")}</div>
          <Train time="8:42" to="Bremen" note={tt("seats free")} />
          <Train time="9:12" to="Bremen" note={tt("seats free")} />
        </Card>
      )}
      {undo && <Btn bg="#fff" fg={BRAND}>{tt("↶ Undo rebooking: keep my original ticket")}</Btn>}
      {!why && !change && !undo && <Small>{tt("Your booking has been updated automatically.")}</Small>}
    </Phone>
  );
}

/* ------------------------------------------------------------------ A5 · three measures, as thumbnails */

export function MeasureThumb({ kind }: { kind: "reason" | "board" | "chat" }) {
  return (
    <div aria-hidden className="mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border border-line bg-white text-[9px] leading-tight text-[#26323F]">
      <div className="px-2 py-1 font-bold text-white" style={{ background: BRAND }}>Northline</div>
      <div className="space-y-1 p-1.5">
        {kind === "reason" && (
          <>
            <div className="font-semibold">8:12 → Bremen</div>
            <div className="rounded bg-[#F3E9ED] px-1">ⓘ because your 7:42 is late</div>
            <div className="text-[#5D6670]">Not for me · Undo</div>
          </>
        )}
        {kind === "board" && (
          <>
            <div className="font-semibold">Your departures</div>
            <div>7:42 Bremen ★</div>
            <div>18:19 Hamburg ★</div>
          </>
        )}
        {kind === "chat" && (
          <>
            <div className="rounded bg-[#F3E9ED] px-1">Ask me anything 🤖</div>
            <div className="rounded border border-line px-1">Refund? Bike? Lost bag?</div>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ B2 · how deep to personalise, per journey */

export function DepthMock({ kind }: { kind: "reminder" | "offer" | "assist" }) {
  if (kind === "reminder")
    return (
      <Phone label={tt("Departure reminder: deep personalisation, because the data is good and a mistake is harmless")}>
        <div className="font-bold">{tt("Leave in 10 minutes")}</div>
        <div>{tt("Your 7:42 to Bremen leaves from platform 4. You usually walk 12 minutes to the station.")}</div>
        <Why>{tt("From your bookings and your walking time. Switch off any time.")}</Why>
        <Small>{tt("Depth: deep · data: good · if wrong: a minute lost")}</Small>
      </Phone>
    );
  if (kind === "offer")
    return (
      <Phone label={tt("Price offers: medium personalisation, by route not by person, with a reason and an off switch")}>
        <div className="font-bold">{tt("Saver fares on your routes")}</div>
        <Train time="Sat" to="Hamburg → Bremen" note={tt("saver fare")} />
        <Why>{tt("Because you travel this route. We do not use your income or your age.")}</Why>
        <Small>{tt("Depth: medium · data: routes only · if wrong: an offer ignored")}</Small>
      </Phone>
    );
  return (
    <Phone label={tt("Travel assistance for a wheelchair user: no guessing, the passenger states what is needed and a person confirms")}>
      <div className="font-bold">{tt("Travel assistance")}</div>
      <div>{tt("Tell us what you need. A member of staff confirms within the hour.")}</div>
      <Card><div>{tt("☐ Ramp at boarding  ☐ Ramp at arrival  ☐ Help with luggage")}</div></Card>
      <Btn>{tt("Send to our assistance team")}</Btn>
      <Small>{tt("Depth: none · a person decides · if wrong: someone is stranded")}</Small>
    </Phone>
  );
}
