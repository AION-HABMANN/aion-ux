"use client";

import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Box, FaintPrint, GazeStage } from "@/components/day15/gaze";
import type { Aoi, Fix } from "@/components/day15/gaze";
import { tt } from "@/lib/lang";

/**
 * Day 15 · the platforms of the tasks, with the plan's clues built in (show it real, user rule 2026-10-28). FocusSense (Block 1.1) is a recorded gaze on a lesson
 * page you can replay as a scanpath, a heatmap or areas of interest, with the neurofeedback "concentration" curve, what the learner said afterwards, the same
 * recording under real conditions, and the project's consent screen. LearningPulse's three approaches (Block 1.2) are drawn as the screen each would put in front
 * of a learner or the team. VisionMind Lab (Block 2.1) is the research board, its first heatmap and an "overload detector" demo whose score reacts to movement.
 * The recordings and names are made up; nothing is marked right or wrong; no camera or sensor is used.
 */

function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className={clsx("min-h-[36px] rounded border px-2.5 text-[12.5px] font-semibold", on ? "border-[#1E3A5F] bg-[#1E3A5F] text-white" : "border-[#C3CCD6] bg-white text-[#26323F]")}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ FocusSense · the lesson page and the recording */

const LH = "#3730A3";

function LessonPage() {
  return (
    <div className="absolute inset-0 text-[10.5px] leading-snug text-[#1D2733]">
      <Box x={0} y={0} w={100} h={9} bg={LH} className="flex items-center justify-between px-3 text-white"><b>LearnHub</b><span className="text-[10px]">{tt("Home · Courses · Forum · Help")}</span></Box>
      <Box x={0} y={9} w={19} h={91} bg="#EEF0FA" className="space-y-1 p-2 text-[10px]">
        <b>{tt("Module 4")}</b>
        {[1, 2, 3, 4, 5, 6].map((n) => <div key={n} className={n === 3 ? "font-bold text-[#3730A3]" : ""}>{tt(`Lesson ${n}`)}</div>)}
      </Box>
      <Box x={22} y={11} w={75} h={8} className="text-[15px] font-bold">{tt("Lesson 3: Reading a bar chart")}</Box>
      <Box x={22} y={21} w={34} h={29} className="flex items-end gap-[6%] rounded border border-[#D6DAE6] p-2">
        {[55, 80, 35, 65].map((h, i) => <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === 1 ? "#6366F1" : "#A5B4FC" }} />)}
      </Box>
      <Box x={59} y={21} w={38} h={29} className="text-[10px]">{tt("A bar chart compares amounts. The longest bar is the largest value; check the axis before you compare, because it may not start at zero.")}</Box>
      <Box x={22} y={53} w={75} h={9} bg="#FFF7ED" className="rounded px-2 py-1 text-[10px]">{tt("Select all that apply. Note: a partly correct answer counts as wrong unless option D is also chosen.")}</Box>
      <Box x={22} y={64} w={75} h={17} className="space-y-0.5 text-[10px]">
        {[tt("☐ A: Bar 2 is the largest"), tt("☐ B: Bar 3 is half of bar 2"), tt("☐ C: The axis starts at zero"), tt("☐ D: None of the above can be read")].map((o) => <div key={o}>{o}</div>)}
      </Box>
      <Box x={22} y={84} w={18} h={7} bg={LH} className="flex items-center justify-center rounded font-semibold text-white">{tt("Check")}</Box>
      <Box x={60} y={84} w={37} h={13} bg="#F0FDF4" className="rounded border border-[#86EFAC] px-2 py-1 text-[10px]"><b>{tt("Key points")}</b><br />{tt("Check the axis · compare lengths")}</Box>
    </div>
  );
}

const LESSON_FIXES: Fix[] = [
  { x: 40, y: 15, ms: 260 },
  { x: 33, y: 32, ms: 340 },
  { x: 47, y: 40, ms: 300 },
  { x: 70, y: 26, ms: 240 },
  { x: 82, y: 33, ms: 220 },
  { x: 55, y: 57, ms: 690 },
  { x: 80, y: 58, ms: 760 },
  { x: 40, y: 58, ms: 720 },
  { x: 8, y: 30, ms: 280 },
  { x: 92, y: 4, ms: 320 },
  { x: 66, y: 57, ms: 600 },
  { x: 32, y: 67, ms: 330 },
  { x: 32, y: 72, ms: 300 },
  { x: 36, y: 78, ms: 380 },
  { x: 30, y: 87, ms: 420 },
];
/** The same session recorded by a webcam at home: offsets, jitter and lost samples. */
const REAL_FIXES: Fix[] = LESSON_FIXES.filter((_, i) => ![3, 8, 12].includes(i)).map((f, i) => ({ x: Math.min(97, f.x + 5 + ((i * 7) % 6)), y: Math.min(97, f.y + 6 - ((i * 5) % 7)), ms: f.ms }));
const LESSON_AOIS = (): Aoi[] => [
  { id: "title", name: tt("Title"), x: 22, y: 11, w: 75, h: 8 },
  { id: "chart", name: tt("Chart"), x: 22, y: 21, w: 34, h: 29 },
  { id: "text", name: tt("Text"), x: 59, y: 21, w: 38, h: 29 },
  { id: "instr", name: tt("Quiz instructions"), x: 22, y: 52, w: 75, h: 11 },
  { id: "options", name: tt("Options"), x: 22, y: 64, w: 75, h: 17 },
  { id: "check", name: tt("Check button"), x: 22, y: 83, w: 18, h: 9 },
  { id: "summary", name: tt("Key points box"), x: 60, y: 83, w: 37, h: 14 },
  { id: "nav", name: tt("Menu and lesson list"), x: 0, y: 0, w: 19, h: 100 },
];

function ConcentrationCurve() {
  // A made-up curve of a consumer headband's "concentration" score over 90 seconds, with the dip the dashboard calls overload.
  const pts = [62, 64, 66, 63, 65, 68, 66, 64, 41, 33, 36, 52, 60, 63, 61, 64, 62, 65, 63];
  const path = pts.map((v, i) => `${(i / (pts.length - 1)) * 300},${100 - v}`).join(" ");
  return (
    <div className="space-y-1 rounded-lg border border-[#C7D2FE] bg-[#EEF2FF] p-2">
      <p className="text-[12px] font-semibold text-[#312E81]">{tt("FocusSense · Neurofeedback · concentration (consumer EEG headband)")}</p>
      <svg role="img" aria-label={tt("A concentration score between about 60 and 68 for most of the 90 seconds, dropping to about 33 between second 40 and 55, labelled overload detected")} viewBox="0 0 300 100" className="h-28 w-full">
        <rect x={120} y={0} width={50} height={100} fill="#FECACA" fillOpacity={0.5} />
        <text x={145} y={12} textAnchor="middle" fontSize={9} fontWeight={700} fill="#B91C1C">{tt("OVERLOAD DETECTED")}</text>
        <polyline points={path} fill="none" stroke="#4F46E5" strokeWidth={2} />
        <text x={2} y={96} fontSize={8} fill="#475569">0 s</text>
        <text x={296} y={96} fontSize={8} textAnchor="end" fill="#475569">90 s</text>
      </svg>
      <p className="text-[11px] text-[#312E81]">{tt("Dashboard note: “Objective measure of cognitive state. Lesson 3 causes overload at 0:45 → shorten the chart section.”")}</p>
    </div>
  );
}

export function FocusSense() {
  const [curve, setCurve] = useState(false);
  const [said, setSaid] = useState(false);
  const [real, setReal] = useState(false);
  const [consent, setConsent] = useState(false);
  const fixes = real ? REAL_FIXES : LESSON_FIXES;
  return (
    <div className="space-y-3 text-[#26323F]">
      <div className="rounded-lg border border-[#C7D2FE] bg-white p-3 text-[12.5px]">
        <p className="smallcaps text-[#4338CA]">{tt("FocusSense · project sketch")}</p>
        <p className="font-semibold">{tt("“Objective truth data about the learning experience. No more opinions: design decisions based on what learners' eyes and brains really do.”")}</p>
        <p className="text-[11.5px] text-[#55606E]">{tt("Study 1: Lena, learner, lesson 3, 90 seconds, lab eye-tracker and EEG headband.")}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Toggle on={curve} onClick={() => setCurve((v) => !v)}>{tt("Concentration curve")}</Toggle>
        <Toggle on={said} onClick={() => setSaid((v) => !v)}>{tt("What Lena said afterwards")}</Toggle>
        <Toggle on={real} onClick={() => setReal((v) => !v)}>{tt("Real conditions: webcam at home")}</Toggle>
        <Toggle on={consent} onClick={() => setConsent((v) => !v)}>{tt("The consent screen")}</Toggle>
      </div>
      {real && <p className="rounded border border-[#FCD34D] bg-[#FFFBEB] px-2 py-1 text-[12px]">{tt("Webcam at home: evening light, glasses, a laptop on the knees. Tracking lost for about a fifth of the session; the points sit up to a line off. The page is the same.")}</p>}
      <GazeStage page={<LessonPage />} fixes={fixes} aois={LESSON_AOIS()} label={tt("LearnHub lesson 3 with Lena's recorded gaze drawn over it")} />
      {curve && <ConcentrationCurve />}
      {said && (
        <div className="space-y-1 rounded-lg border border-line bg-paper p-3 text-[12.5px]">
          <p className="font-semibold">{tt("Lena watched her own recording and explained (retrospective think-aloud)")}</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>{tt("“The instructions: I read them three times. Does D count or not? I still don't know.”")}</li>
            <li>{tt("“Then I looked for help in the menu, and at the lesson list, to see if I'd missed something.”")}</li>
            <li>{tt("“Key points box? I never saw it. It looks like an advert.”")}</li>
            <li>{tt("“Around the middle the neighbour's dog started barking and I scratched under the headband.”")}</li>
          </ul>
        </div>
      )}
      {consent && (
        <div className="mx-auto max-w-[360px] space-y-2 rounded-lg border border-line bg-white p-3 text-[12px]">
          <p className="font-bold">{tt("Welcome to LearnHub 2.0!")}</p>
          <p>{tt("Enjoy smarter lessons that adapt to you.")}</p>
          <div className="rounded py-1.5 text-center font-semibold text-white" style={{ background: LH }}>{tt("Start learning")}</div>
          <FaintPrint label={tt("Small grey print: By continuing you accept the terms of use, including the processing of interaction, camera and sensor data to optimise the service.")} lines={[tt("By continuing you accept the terms of use, including the"), tt("processing of interaction, camera and sensor data to optimise"), tt("the service.")]} />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ LearningPulse · three approaches as screens */

export function LearningPulse({ variant }: { variant: "A" | "B" | "C" }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (variant !== "A") return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1800);
    return () => window.clearInterval(id);
  }, [variant]);
  if (variant === "A") {
    const focus = [74, 71, 58, 46, 63, 77, 69][tick % 7];
    const low = focus < 50;
    return (
      <div className="space-y-2 rounded-lg border border-line bg-white p-3 text-[12.5px] text-[#26323F]">
        <div className="flex items-center justify-between rounded px-2 py-1 text-white" style={{ background: "#7C2D12" }}>
          <b>LearningPulse</b>
          <span className="text-[11px]">{tt("📷 camera on · 🧠 headband connected")}</span>
        </div>
        <p className="font-semibold">{tt("Lesson 7: Fractions in everyday life")}</p>
        <div className="flex items-center gap-2">
          <span className="text-[11px]">{tt("Your focus")}</span>
          <div className="h-2.5 flex-1 overflow-hidden rounded bg-[#FDE7DA]"><div className="h-full rounded motion-safe:transition-all" style={{ width: `${focus}%`, background: low ? "#DC2626" : "#EA580C" }} /></div>
          <span className="w-10 text-right text-[11px] font-semibold">{focus}</span>
        </div>
        <p aria-live="polite" className={clsx("rounded px-2 py-1 text-[12px]", low ? "bg-[#FEE2E2] text-[#991B1B]" : "bg-[#F1F5F9] text-[#334155]")}>
          {low ? tt("Your attention dropped. Look at the screen to continue. The video is paused.") : tt("Great focus! Keep your eyes on the lesson to earn focus points.")}
        </p>
        <p className="text-[11px] text-[#64748B]">{tt("To use LearningPulse, allow camera and headband access. [Allow] · learn without measurement (in settings)")}</p>
      </div>
    );
  }
  if (variant === "B")
    return (
      <div className="space-y-2 rounded-lg border border-line bg-white p-3 text-[12.5px] text-[#26323F]">
        <div className="rounded px-2 py-1 text-white" style={{ background: "#0F766E" }}><b>{tt("LearningPulse · UX research · internal")}</b></div>
        <p className="font-semibold">{tt("Prototype test: new lesson navigation")}</p>
        <table className="w-full border-collapse text-[11.5px]">
          <caption className="sr-only">{tt("The study record")}</caption>
          <tbody>
            {[
              [tt("Question"), tt("Do learners find “Next lesson” without searching?")],
              [tt("Participants"), tt("8 volunteers, consent signed, recordings deleted after 3 months")],
              [tt("Method"), tt("Lab eye-tracking + retrospective interview")],
              [tt("Finding"), tt("6 of 8 never looked at “Next lesson” at the top right; in the interview they said they looked for it at the bottom.")],
              [tt("Decision"), tt("Move the button to the bottom; test again with 5 people.")],
            ].map(([k, v]) => (
              <tr key={k} className="border-t border-line align-top"><th scope="row" className="w-28 py-1 pr-2 text-left font-semibold">{k}</th><td className="py-1">{v}</td></tr>
            ))}
          </tbody>
        </table>
        <p className="text-[11px] text-[#64748B]">{tt("Nothing is measured in the product; learners at home are not tracked.")}</p>
      </div>
    );
  return (
    <div className="space-y-2 rounded-lg border border-line bg-white p-3 text-[12.5px] text-[#26323F]">
      <div className="rounded px-2 py-1 text-white" style={{ background: "#1E3A5F" }}><b>{tt("LearningPulse · technology radar")}</b></div>
      <ul className="space-y-1">
        {[
          [tt("Brain-computer interfaces for learning"), tt("Watch · research only · review in 6 months")],
          [tt("Consumer EEG headbands"), tt("Watch · validity unclear for learning")],
          [tt("Webcam eye-tracking"), tt("Assess · precision for remote tests?")],
        ].map(([k, v]) => (
          <li key={k} className="flex flex-wrap justify-between gap-2 rounded border border-line px-2 py-1"><span className="font-semibold">{k}</span><span className="text-[#475569]">{v}</span></li>
        ))}
      </ul>
      <p className="text-[11px] text-[#64748B]">{tt("Quarterly note: two papers read, one conference talk. No product change planned.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ VisionMind Lab · research board, first heatmap, overload detector */

function PortalHome({ t }: { t: number }) {
  return (
    <div className="absolute inset-0 text-[10.5px] leading-snug text-[#1D2733]">
      <Box x={0} y={0} w={100} h={9} bg="#0F3D5E" className="flex items-center justify-between px-3 text-white"><b>VisionMind</b><span className="text-[10px]">{tt("Service · My contracts · Help")}</span></Box>
      <Box x={4} y={12} w={92} h={22} bg={t % 2 ? "#F59E0B" : "#FB923C"} className="flex items-center justify-center rounded text-[14px] font-bold text-white">{tt("🎉 Switch now and get 3 months free! 🎉")}</Box>
      <Box x={4} y={38} w={60} h={7} className="text-[13px] font-bold">{tt("What would you like to do?")}</Box>
      {[tt("Change my tariff"), tt("Report a problem"), tt("Documents"), tt("Payment details"), tt("More services (14)"), tt("Contracts")].map((l, i) => (
        <Box key={l} x={4 + (i % 3) * 31} y={48 + Math.floor(i / 3) * 14} w={29} h={11} className="flex items-center justify-center rounded border border-[#C9D3DD] text-center">{l}</Box>
      ))}
      <Box x={4} y={78} w={92} h={8} className="text-[10px] text-[#55606E]">{tt("Moving house? See Help → Forms → Contract → Change of address.")}</Box>
    </div>
  );
}
const HEAT_FIXES: Fix[] = [
  { x: 40, y: 22, ms: 900 }, { x: 55, y: 24, ms: 1100 }, { x: 30, y: 20, ms: 700 }, { x: 62, y: 27, ms: 800 }, { x: 48, y: 18, ms: 950 },
  { x: 20, y: 52, ms: 300 }, { x: 50, y: 53, ms: 250 }, { x: 80, y: 66, ms: 420 }, { x: 45, y: 23, ms: 1000 }, { x: 18, y: 66, ms: 260 },
];
const HEAT_AOIS = (): Aoi[] => [
  { id: "banner", name: tt("Banner"), x: 4, y: 12, w: 92, h: 22 },
  { id: "tiles", name: tt("Service tiles"), x: 4, y: 47, w: 91, h: 26 },
  { id: "move", name: tt("Moving house hint"), x: 4, y: 77, w: 92, h: 10 },
];

function OverloadDemo() {
  const [cond, setCond] = useState<"calm" | "frown" | "talk">("calm");
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setN((v) => v + 1), 700);
    return () => window.clearInterval(id);
  }, []);
  const series = useMemo(() => {
    const base = cond === "calm" ? 38 : cond === "frown" ? 74 : 82;
    return Array.from({ length: 24 }, (_, i) => Math.max(5, Math.min(98, base + Math.round(Math.sin((i + n) * 1.7) * (cond === "calm" ? 6 : 14)))));
  }, [cond, n]);
  const now = series[series.length - 1];
  return (
    <div className="space-y-2 rounded-lg border border-line bg-white p-3 text-[12.5px]">
      <p className="font-semibold">{tt("Demo: EEG “overload detector” (prototype from the lunch test)")}</p>
      <div role="radiogroup" aria-label={tt("What the participant is doing")} className="flex flex-wrap gap-1.5">
        {(
          [
            ["calm", tt("Reads the tariff page calmly")],
            ["frown", tt("Frowns and moves the head")],
            ["talk", tt("Talks to the researcher")],
          ] as ["calm" | "frown" | "talk", string][]
        ).map(([k, l]) => (
          <button key={k} type="button" role="radio" aria-checked={cond === k} onClick={() => setCond(k)} className={clsx("min-h-[36px] rounded border px-2.5 text-[12px] font-semibold", cond === k ? "border-[#6D28D9] bg-[#6D28D9] text-white" : "border-[#C3CCD6] bg-white text-[#26323F]")}>{l}</button>
        ))}
      </div>
      <svg aria-hidden viewBox="0 0 240 60" className="h-20 w-full">
        <rect x={0} y={0} width={240} height={18} fill="#FEE2E2" fillOpacity={0.6} />
        <polyline points={series.map((v, i) => `${i * 10.4},${60 - v * 0.6}`).join(" ")} fill="none" stroke="#6D28D9" strokeWidth={1.6} />
      </svg>
      <p className={clsx("rounded px-2 py-1 font-semibold", now > 70 ? "bg-[#FEE2E2] text-[#991B1B]" : "bg-[#F1F5F9] text-[#334155]")}>
        {tt(`Overload score ${now}: `)}
        <span aria-live="polite">{now > 70 ? tt("OVERLOAD") : tt("normal")}</span>
      </p>
      <p className="text-[11px] text-[#64748B]">{tt("Lab note: the headband's signal also rises with jaw, eye and forehead muscles. The prototype does not separate them yet.")}</p>
    </div>
  );
}

export function VisionMind() {
  const [tab, setTab] = useState<"board" | "heat" | "eeg" | "asks">("board");
  const [blink, setBlink] = useState(0);
  const [gaps, setGaps] = useState(false);
  useEffect(() => {
    if (tab !== "heat") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setBlink((b) => b + 1), 900);
    return () => window.clearInterval(id);
  }, [tab]);
  const tabs: [typeof tab, string][] = [
    ["board", tt("Research board")],
    ["heat", tt("First heatmap")],
    ["eeg", tt("Overload detector")],
    ["asks", tt("Requests")],
  ];
  const studies = [
    { name: tt("Lab eye-tracking of the service portal"), track: "—", hyp: "—", consent: tt("not yet"), want: tt("Research") },
    { name: tt("Webcam eye-tracking for remote tests"), track: "—", hyp: "—", consent: tt("not yet"), want: tt("Innovation") },
    { name: tt("EEG “overload detector” for portal users"), track: "—", hyp: "—", consent: tt("lunch test: none"), want: tt("Product") },
    { name: tt("“Control the portal by thought” (BCI concept)"), track: "—", hyp: "—", consent: "—", want: tt("Management, for the customer event") },
  ];
  return (
    <div className="space-y-3 text-[#26323F]">
      <div className="flex items-center justify-between rounded px-3 py-1.5 text-white" style={{ background: "#4C1D95" }}>
        <b>{tt("VisionMind Lab · intranet")}</b>
        <span className="text-[11px]">{tt("Budget phase 1 · 18 weeks")}</span>
      </div>
      <div role="tablist" aria-label={tt("VisionMind Lab")} className="flex flex-wrap gap-1.5">
        {tabs.map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={clsx("min-h-[36px] rounded border px-2.5 text-[12.5px] font-semibold", tab === k ? "border-[#4C1D95] bg-[#4C1D95] text-white" : "border-[#C3CCD6] bg-white text-[#26323F]")}>{l}</button>
        ))}
      </div>
      {tab === "board" && (
        <div tabIndex={0} role="region" aria-label={tt("The studies on the research board")} className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[34rem] border-collapse text-[12px]">
            <caption className="sr-only">{tt("The studies on the research board")}</caption>
            <thead>
              <tr className="bg-mist text-left text-micro uppercase text-ash">
                {[tt("Study"), tt("Track"), tt("Hypothesis"), tt("Consent"), tt("Wanted by")].map((h) => <th key={h} scope="col" className="px-2 py-1.5">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {studies.map((s) => (
                <tr key={s.name} className="border-t border-line align-top">
                  <th scope="row" className="px-2 py-1.5 text-left font-semibold">{s.name}</th>
                  <td className="px-2 py-1.5">{s.track}</td>
                  <td className="px-2 py-1.5">{s.hyp}</td>
                  <td className="px-2 py-1.5">{s.consent}</td>
                  <td className="px-2 py-1.5">{s.want}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === "heat" && (
        <div className="space-y-2">
          <p className="rounded bg-[#FEF3C7] px-2 py-1 text-[12.5px] font-semibold text-[#78350F]">{tt("Lab newsletter: “The banner gets the most attention! Customers love the offer.”")}</p>
          <GazeStage page={<PortalHome t={blink} />} fixes={HEAT_FIXES} aois={HEAT_AOIS()} initial="heat" label={tt("The service portal home page with a heatmap glowing over the flashing banner")} />
          <Toggle on={gaps} onClick={() => setGaps((v) => !v)}>{tt("Show how the study was run")}</Toggle>
          {gaps && (
            <ul className="list-disc space-y-1 rounded-lg border border-line bg-paper p-3 pl-7 text-[12.5px]">
              <li>{tt("8 colleagues from the lab, not customers.")}</li>
              <li>{tt("10 seconds each, no task: “just look at the page”.")}</li>
              <li>{tt("The banner flashes; movement draws the eye whether people want it or not.")}</li>
              <li>{tt("Nobody asked the participants anything afterwards.")}</li>
              <li>{tt("Recordings stored on a shared drive; no deletion date.")}</li>
            </ul>
          )}
        </div>
      )}
      {tab === "eeg" && <OverloadDemo />}
      {tab === "asks" && (
        <ul className="space-y-1.5 text-[12.5px]">
          {[
            [tt("Marketing"), tt("“Heatmap of the banner by Friday, please; we want it in the campaign deck.”")],
            [tt("Product"), tt("“Can the overload score go into the portal next quarter? Pages could simplify themselves.”")],
            [tt("Management"), tt("“For the customer event: a live demo of controlling the portal by thought.”")],
            [tt("Customer service"), tt("“Our callers mostly can't find ‘Move house’. Can research help with that?”")],
            [tt("Data protection officer"), tt("“I read about the lunch test in the newsletter. Nobody asked me.”")],
          ].map(([who, text]) => (
            <li key={who} className="rounded border border-line bg-white px-2 py-1.5"><b>{who}:</b> {text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
