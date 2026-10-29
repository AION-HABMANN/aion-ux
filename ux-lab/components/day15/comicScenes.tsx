import type { ReactNode } from "react";
import { Board, LOOK, Mark, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 15 comics (data/day15/comics.ts, DL-STANDARD.md section 13). People: Mara and Joon (customers of Tessel, a made-up bank), Ines
 * (its UX researcher) and Bastian (its product owner). Every label is a short capital word.
 */
LOOK.mara = { hair: "#3B2416", shirt: "#0F766E", long: true, skin: "#C68E68" };
LOOK.joon = { hair: "#111114", shirt: "#475569", glasses: true, skin: "#E7C29F" };
LOOK.ines = { hair: "#6B3B1F", shirt: "#7C3AED", long: true };
LOOK.bastian = { hair: "#C9A15A", shirt: "#B45309" };

const ACC = "#0F5E4C";
const NEU = "#E6ECEA";

function Screen({ title = "TESSEL · SEND MONEY", children }: { title?: string; children?: ReactNode }) {
  return (
    <Board x={40} y={4} w={80} h={60}>
      <rect x={40} y={4} width={80} height={6} fill={ACC} />
      <Txt x={80} y={8.6} size={3.2} anchor="middle" c="#FFFFFF">
        {title}
      </Txt>
      {children}
    </Board>
  );
}
const Form = () => (
  <g>
    <rect x={44} y={14} width={44} height={6} fill={NEU} />
    <rect x={44} y={22} width={44} height={6} fill={NEU} />
    <rect x={44} y={30} width={44} height={6} fill={NEU} />
    <Txt x={44} y={42} size={2.2} c="#556274">FEE: SEE 4.2</Txt>
    <rect x={44} y={48} width={18} height={6} fill={ACC} />
    <rect x={94} y={14} width={22} height={22} fill="#B45309" />
    <Txt x={105} y={26} size={2.4} anchor="middle" c="#FFFFFF">GOLD!</Txt>
  </g>
);
const Dot = ({ x, y, n, r = 2.2, c = "#2563EB" }: { x: number; y: number; n?: number; r?: number; c?: string }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={c} fillOpacity={0.7} />
    {n !== undefined && (
      <Txt x={x} y={y + 1} size={2.2} anchor="middle" c="#FFFFFF">
        {String(n)}
      </Txt>
    )}
  </g>
);
const Path = () => (
  <Screen>
    <Form />
    <polyline points="50,17 52,25 104,22 52,33 56,41 70,41" fill="none" stroke="#1D4ED8" strokeWidth={0.5} />
    <Dot x={50} y={17} n={1} />
    <Dot x={52} y={25} n={2} />
    <Dot x={104} y={22} n={3} />
    <Dot x={52} y={33} n={4} />
    <Dot x={56} y={41} n={5} />
    <Dot x={70} y={41} n={6} r={3.6} c="#DC2626" />
  </Screen>
);
const Heat = () => (
  <Screen>
    <Form />
    <circle cx={64} cy={41} r={8} fill="#DC2626" fillOpacity={0.45} />
    <circle cx={64} cy={41} r={4} fill="#DC2626" fillOpacity={0.6} />
    <circle cx={104} cy={22} r={5} fill="#F59E0B" fillOpacity={0.45} />
  </Screen>
);
const Tracker = () => (
  <Screen>
    <Form />
    <rect x={64} y={58} width={32} height={3} fill="#1B1B1F" />
    <Txt x={80} y={56} size={2.2} anchor="middle" c="#B42318">● REC</Txt>
  </Screen>
);
const Band = ({ jumpy }: { jumpy?: boolean }) => (
  <Screen title="FOCUS SCORE">
    <polyline points={jumpy ? "44,40 52,38 58,20 64,50 70,22 78,46 86,26 94,44 104,24 116,40" : "44,30 56,28 68,32 80,29 92,31 104,28 116,30"} fill="none" stroke="#7C3AED" strokeWidth={0.8} />
    <Txt x={44} y={58} size={2.4} c={jumpy ? "#B42318" : "#556274"}>{jumpy ? "UNFOCUSED?!" : "FOCUSED 82"}</Txt>
  </Screen>
);
const Map7 = () => (
  <Screen title="EVIDENCE × USE">
    <rect x={92} y={42} width={24} height={16} fill="#FDE2E2" />
    <Txt x={94} y={50} size={2} c="#B42318">HEADBAND</Txt>
    <rect x={44} y={14} width={24} height={14} fill="#DCFCE7" />
    <Txt x={46} y={22} size={2} c="#14532D">LAB EYE-TRACK</Txt>
    <Txt x={46} y={50} size={2} c="#556274">APP BY THOUGHT</Txt>
  </Screen>
);
const Tracks = () => (
  <Screen title="FOUR TRACKS">
    {["RESEARCH", "EXPERIMENT", "PRODUCT", "NOT AT ALL"].map((t, i) => (
      <g key={t}>
        <rect x={42 + i * 19.5} y={14} width={18} height={40} fill={i === 3 ? "#FDE2E2" : NEU} />
        <Txt x={51 + i * 19.5} y={19} size={1.8} anchor="middle">{t}</Txt>
      </g>
    ))}
  </Screen>
);
const Consent = () => (
  <Screen title="WHAT'S NEW">
    <rect x={50} y={30} width={60} height={9} fill={ACC} />
    <Txt x={80} y={35.6} size={3} anchor="middle" c="#FFFFFF">CONTINUE</Txt>
    <Txt x={50} y={48} size={1.6} c="#8A94A3">☑ I AGREE TO ATTENTION DATA FOR OFFERS…</Txt>
  </Screen>
);
const News = () => (
  <Screen title="LAB NEWS">
    <Txt x={44} y={20} size={2.8}>WE CAN SEE WHAT</Txt>
    <Txt x={44} y={26} size={2.8}>CUSTOMERS THINK 🧠</Txt>
    <Txt x={44} y={40} size={2} c="#556274">8 COLLEAGUES · 10 SECONDS</Txt>
  </Screen>
);
const Cloud = () => (
  <Screen title="VENDOR CLOUD">
    <Txt x={44} y={20} size={2.4}>EEG_LUNCHTEST.CSV</Txt>
    <Txt x={44} y={28} size={2.4}>APPROVED BY: —</Txt>
    <Txt x={44} y={36} size={2.4} c="#B42318">CONSENT: —</Txt>
  </Screen>
);

const S = (s: string) => tt(s);

export const ART_D15: Record<string, ReactNode> = {
  "a1-1": (<Duo label={S("Mara sends money while her gaze is recorded")} left={{ who: "mara", face: "neutral" }}><Tracker /></Duo>),
  "a1-2": (<Duo label={S("Ines shows the numbered scanpath")} left={{ who: "ines", face: "happy", pose: "point" }}><Path /></Duo>),
  "a1-3": (<Duo label={S("Bastian prefers the heatmap")} left={{ who: "bastian", face: "happy", pose: "point" }}><Heat /></Duo>),
  "a1-4": (<Duo label={S("The rule: each view hides something")} left={{ who: "ines", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="ONE RECORDING" items={[{ icon: "eye", text: "SCANPATH: ORDER" }, { icon: "chart", text: "HEATMAP: TIME" }, { icon: "check", text: "BOXES: COUNTS" }]} /></Duo>),
  "a2-1": (<Duo label={S("Bastian reads the long look as interest")} left={{ who: "bastian", face: "happy", pose: "point" }}><Path /></Duo>),
  "a2-2": (<Duo label={S("Mara says she was confused")} left={{ who: "mara", face: "worried" }}><Path /><Mark x={9} y={34} kind="ask" /></Duo>),
  "a2-3": (<Duo label={S("Joon reads small grey text slowly")} left={{ who: "joon", face: "neutral" }}><Path /></Duo>),
  "a2-4": (<Duo label={S("The rule: looking is not understanding")} left={{ who: "ines", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="THE LADDER" items={[{ text: "SEEN" }, { text: "ATTENDED" }, { text: "UNDERSTOOD" }, { text: "AGREED" }]} sub="EACH STEP: MORE EVIDENCE" /></Duo>),
  "a3-1": (<Duo label={S("Bastian brings a focus headband")} left={{ who: "bastian", face: "happy", pose: "point" }}><Band /></Duo>),
  "a3-2": (<Duo label={S("Joon moves and the score jumps")} left={{ who: "joon", face: "surprised" }}><Band jumpy /><Mark x={9} y={34} kind="ask" /></Duo>),
  "a3-3": (<Duo label={S("Ines places seven technologies")} left={{ who: "ines", face: "think" }}><Map7 /></Duo>),
  "a3-4": (<Duo label={S("The rule: place it where it really is")} left={{ who: "ines", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="MATURITY" items={[{ tick: true, text: "LAB: ESTABLISHED" }, { icon: "warn", text: "ON SALE ≠ PROVEN" }, { icon: "eye", text: "BCI: RESEARCH" }]} /></Duo>),
  "a4-1": (<Duo label={S("Bastian wants to measure everything")} left={{ who: "bastian", face: "happy", pose: "point" }}><Tracker /></Duo>),
  "a4-2": (<Duo label={S("Ines asks what they need to know")} left={{ who: "ines", face: "think" }}><Notes x={40} y={6} w={112} title="THE QUESTION" items={[{ icon: "ask", text: "WHY DO PEOPLE STOP?" }]} /></Duo>),
  "a4-3": (<Duo label={S("They sort five ideas into tracks")} left={{ who: "bastian", face: "think" }}><Tracks /></Duo>),
  "a4-4": (<Duo label={S("The rule: question, hypothesis, method, decision")} left={{ who: "ines", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="FUND THE QUESTION" items={[{ text: "QUESTION" }, { text: "HYPOTHESIS" }, { text: "METHOD" }, { text: "DECISION" }]} /></Duo>),
  "a5-1": (<Duo label={S("A tiny pre-ticked box")} left={{ who: "bastian", face: "happy" }}><Consent /></Duo>),
  "a5-2": (<Duo label={S("Mara reads the small print")} left={{ who: "mara", face: "sad" }}><Consent /><Mark x={9} y={34} kind="bang" /></Duo>),
  "a5-3": (<Duo label={S("Ines writes a clear invitation")} left={{ who: "ines", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="CLEAR CONSENT" items={[{ tick: true, text: "WHAT AND WHO" }, { tick: true, text: "WHAT WE WON'T INFER" }, { tick: true, text: "NO = YES" }]} /></Duo>),
  "a5-4": (<Duo label={S("They weigh three measures")} left={{ who: "bastian", face: "neutral" }} right={{ who: "ines", face: "happy" }}><Notes x={40} y={6} w={80} title="WEIGH IT" items={[{ text: "EFFECT" }, { text: "RISK · TIME" }, { text: "REPUTATION" }]} /></Duo>),
  "b1-1": (<Duo label={S("A newsletter headline")} left={{ who: "ines", face: "worried" }}><News /><Mark x={9} y={34} kind="ask" /></Duo>),
  "b1-2": (<Duo label={S("Ines writes the vision")} left={{ who: "ines", face: "think" }}><Notes x={40} y={6} w={112} title="THE VISION" items={[{ icon: "heart", text: "MEASURE TO SIMPLIFY" }, { cross: true, text: "NEVER TO JUDGE" }]} /></Duo>),
  "b1-3": (<Duo label={S("Three tracks and an evidence grade")} left={{ who: "bastian", face: "happy", pose: "point" }}><Tracks /></Duo>),
  "b1-4": (<Duo label={S("The rule: an architecture, not a gadget")} left={{ who: "ines", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="THE LAYERS" items={[{ text: "VISION" }, { text: "TRACKS · RULES" }, { text: "QUESTIONS" }, { text: "STUDIES" }]} /></Duo>),
  "b2-1": (<Duo label={S("The board wants a stress-adaptive app")} left={{ who: "bastian", face: "happy", pose: "point" }} right={{ who: "ines", face: "worried" }}><Band jumpy /></Duo>),
  "b2-2": (<Duo label={S("Three bets")} left={{ who: "ines", face: "think" }}><Notes x={40} y={6} w={112} title="THREE BETS" items={[{ tick: true, text: "SAFE: LAB TESTS" }, { icon: "warn", text: "MEDIUM: EEG STUDY" }, { icon: "eye", text: "BOLD: WATCH LIST" }]} /></Duo>),
  "b2-3": (<Duo label={S("They write down what each bet assumes")} left={{ who: "bastian", face: "think" }}><Notes x={40} y={6} w={112} title="WE ASSUME" items={[{ icon: "ask", text: "THE DATA IS VALID?" }, { icon: "ask", text: "PEOPLE ACCEPT IT?" }, { icon: "ask", text: "IT IS MATURE?" }]} /></Duo>),
  "b2-4": (<Duo label={S("The rule: success measure and exit date first")} left={{ who: "ines", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="BEFORE THE START" items={[{ tick: true, text: "A HYPOTHESIS" }, { tick: true, text: "A MEASURE" }, { tick: true, text: "AN EXIT DATE" }]} /></Duo>),
  "b3-1": (<Duo label={S("EEG data on a vendor's cloud")} left={{ who: "bastian", face: "worried" }}><Cloud /><Mark x={9} y={34} kind="sweat" /></Duo>),
  "b3-2": (<Duo label={S("Ines writes four roles")} left={{ who: "ines", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="FOUR ROLES" items={[{ text: "SETS THE STANDARD" }, { text: "APPROVES" }, { text: "RUNS STUDIES" }, { text: "TRANSLATES" }]} /></Duo>),
  "b3-3": (<Duo label={S("Ines decides on small lab tests")} left={{ who: "ines", face: "neutral" }}><Notes x={40} y={6} w={112} title="A DECISION" items={[{ tick: true, text: "WE DECIDE" }, { icon: "ask", text: "WE DO NOT KNOW" }, { icon: "clock", text: "WE STOP IF" }]} sub="AND WHAT WE GIVE UP" /></Duo>),
  "b3-4": (<Duo label={S("The rule: write the record before anyone asks")} left={{ who: "ines", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="THE RECORD" items={[{ text: "WHO APPROVES" }, { text: "WHAT WE INFER" }, { text: "WHEN WE DELETE" }]} /><Tick x={9} y={34} /></Duo>),
};
