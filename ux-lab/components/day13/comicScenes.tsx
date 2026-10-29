import type { ReactNode } from "react";
import { Board, Chip, LOOK, Mark, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 13 comics (data/day13/comics.ts, DL-STANDARD.md section 13). People: Ayo (ADHD), Mirko (autistic) and Tilda (dyslexia), customers of
 * Hearth Energy, a made-up energy supplier, Pia (its UX designer) and Lukas (its product owner). Every label is a short capital word.
 */
LOOK.ayo = { hair: "#1A1410", shirt: "#E07A2E", skin: "#7A4A2A" };
LOOK.mirko = { hair: "#3B3026", shirt: "#4E6E8E", glasses: true };
LOOK.tilda = { hair: "#C98B3C", shirt: "#3F7A5A", long: true };
LOOK.pia = { hair: "#2A1E18", shirt: "#9A3412", long: true, skin: "#D6A47C" };
LOOK.lukas = { hair: "#B08A50", shirt: "#475569" };

const ACC = "#9A3412";
const NEU = "#EDE6DF";

function App({ title = "HEARTH ENERGY", children }: { title?: string; children?: ReactNode }) {
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
function Btn({ x, y, w, label }: { x: number; y: number; w: number; label: string }) {
  return (
    <g>
      <Chip x={x} y={y} w={w} h={6} c={ACC} />
      <Txt x={x + w / 2} y={y + 4.2} size={2.6} anchor="middle" c="#FFFFFF">
        {label}
      </Txt>
    </g>
  );
}

const Busy = () => (
  <App>
    <rect x={42} y={12} width={36} height={6} fill="#FDE68A" />
    <Txt x={44} y={16.4} size={2.4}>SAVE 10%!</Txt>
    <rect x={80} y={12} width={36} height={6} fill="#FBCFE8" />
    <Txt x={82} y={16.4} size={2.4}>QUIZ!</Txt>
    <rect x={42} y={20} width={22} height={9} fill={NEU} />
    <rect x={66} y={20} width={22} height={9} fill={NEU} />
    <rect x={90} y={20} width={26} height={9} fill={NEU} />
    <circle cx={112} cy={48} r={5} fill="#DC2626" />
    <Txt x={112} y={49.4} size={3} anchor="middle" c="#FFFFFF">4</Txt>
    <Txt x={44} y={40} size={2} c="#8A8178">METER READING DUE</Txt>
  </App>
);
const Calm = () => (
  <App>
    <Txt x={44} y={18} size={2.8}>YOUR NEXT STEP</Txt>
    <Txt x={44} y={26} size={2.4}>SEND READING BY 31 OCT</Txt>
    <Btn x={43} y={36} w={52} label="SEND METER READING" />
  </App>
);
const Icons = () => (
  <App>
    <rect x={44} y={16} width={14} height={10} fill={NEU} />
    <rect x={62} y={16} width={14} height={10} fill={NEU} />
    <rect x={80} y={16} width={14} height={10} fill={NEU} />
    <circle cx={98} cy={16} r={3.5} fill="#DC2626" />
    <Txt x={98} y={17.3} size={2.6} anchor="middle" c="#FFFFFF">4</Txt>
  </App>
);
const Wall = () => (
  <App>
    {[16, 21, 26, 31, 36, 41].map((y) => <rect key={y} x={44} y={y} width={72} height={2.4} fill="#A8A29E" />)}
  </App>
);
const Readable = () => (
  <App>
    <Txt x={44} y={18} size={3}>PLEASE SEND YOUR</Txt>
    <Txt x={44} y={25} size={3}>READING BY 31 OCT.</Txt>
    <Txt x={44} y={34} size={2.6} c="#57534E">IT TAKES 2 MINUTES.</Txt>
  </App>
);
const Moving = ({ label }: { label: string }) => (
  <App>
    <rect x={42} y={12} width={10} height={50} fill={ACC} />
    <Btn x={56} y={44} w={22} label={label} />
  </App>
);
const Steps = () => (
  <App>
    <rect x={44} y={14} width={22} height={2.4} fill={ACC} />
    <rect x={68} y={14} width={22} height={2.4} fill={NEU} />
    <rect x={92} y={14} width={22} height={2.4} fill={NEU} />
    <Txt x={44} y={24} size={2.6}>STEP 1 OF 3</Txt>
    <Txt x={44} y={31} size={2.4}>WHEN DO YOU MOVE?</Txt>
    <Btn x={43} y={42} w={52} label="NEXT: NEW ADDRESS" />
  </App>
);
const Quiet = () => (
  <App title="TEST ROOM · QUIET">
    <Txt x={44} y={18} size={2.6}>TASK 2: REPORT A MOVE</Txt>
    <Txt x={44} y={27} size={2.4} c="#B42318">PHONE RINGS…</Txt>
    <Txt x={44} y={36} size={2.4}>NOTE: WHERE THEY STOP</Txt>
  </App>
);
const Easy = () => (
  <App title="SETTINGS">
    <Txt x={44} y={18} size={2.4}>NOTIFICATIONS   ON</Txt>
    <Txt x={44} y={25} size={2.4}>LANGUAGE        EN</Txt>
    <Txt x={44} y={44} size={2} c="#8A8178">EASY MODE       OFF</Txt>
  </App>
);

const S = (s: string) => tt(s);

export const ART_D13: Record<string, ReactNode> = {
  "a1-1": (<Duo label={S("Ayo opens the busy app and forgets why")} left={{ who: "ayo", face: "surprised" }}><Busy /><Mark x={9} y={34} kind="ask" /></Duo>),
  "a1-2": (<Duo label={S("Mirko sees icons without words and a red four")} left={{ who: "mirko", face: "worried" }}><Icons /><Mark x={9} y={34} kind="ask" /></Duo>),
  "a1-3": (<Duo label={S("Tilda finds a tiny grey line and a wall of text")} left={{ who: "tilda", face: "sad" }}><Wall /></Duo>),
  "a1-4": (<Duo label={S("The rule: three lenses")} left={{ who: "pia", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="THREE LENSES" items={[{ icon: "warn", text: "WHAT OVERLOADS?" }, { icon: "ask", text: "WHAT CONFUSES?" }, { icon: "clock", text: "WHAT TIRES?" }]} /></Duo>),
  "a2-1": (<Duo label={S("Lukas adds one more banner")} left={{ who: "lukas", face: "happy", pose: "point" }}><Busy /></Duo>),
  "a2-2": (<Duo label={S("Ayo drifts and misses the deadline")} left={{ who: "ayo", face: "worried" }}><Busy /><Mark x={9} y={34} kind="sweat" /></Duo>),
  "a2-3": (<Duo label={S("One next step and three short steps")} left={{ who: "ayo", face: "happy", pose: "up" }}><Steps /><Tick x={9} y={34} /></Duo>),
  "a2-4": (<Duo label={S("The rule: one task per screen")} left={{ who: "pia", face: "happy", pose: "up" }}><Calm /></Duo>),
  "a3-1": (<Duo label={S("The menu moves and the button says Go")} left={{ who: "mirko", face: "worried" }}><Moving label="GO" /><Mark x={9} y={34} kind="ask" /></Duo>),
  "a3-2": (<Duo label={S("You're all set: set for what?")} left={{ who: "mirko", face: "think" }}><App><Txt x={44} y={24} size={3}>YOU'RE ALL SET!</Txt></App><Mark x={9} y={34} kind="ask" /></Duo>),
  "a3-3": (<Duo label={S("The menu stays; the button says what it does")} left={{ who: "mirko", face: "happy" }}><Calm /><Tick x={9} y={34} /></Duo>),
  "a3-4": (<Duo label={S("The rule: same place, same name, say what it does")} left={{ who: "pia", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="PREDICTABLE" items={[{ tick: true, text: "SAME PLACE" }, { tick: true, text: "SAME NAME" }, { tick: true, text: "SAY WHAT IT DOES" }]} /></Duo>),
  "a4-1": (<Duo label={S("A wall of capitals and italics")} left={{ who: "tilda", face: "sad" }}><Wall /><Mark x={9} y={34} kind="sweat" /></Duo>),
  "a4-2": (<Duo label={S("Pia moves the typography sliders")} left={{ who: "pia", face: "think" }}><Notes x={40} y={6} w={112} title="TYPOGRAPHY" items={[{ icon: "up", text: "LARGER" }, { icon: "down", text: "MORE LINE HEIGHT" }, { icon: "check", text: "LEFT-ALIGNED" }]} /></Duo>),
  "a4-3": (<Duo label={S("Four short plain sentences")} left={{ who: "tilda", face: "happy", pose: "up" }}><Readable /><Tick x={9} y={34} /></Duo>),
  "a4-4": (<Duo label={S("The rule: left, large, spaced, short, plain")} left={{ who: "pia", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="READABLE" items={[{ text: "LEFT · LARGE" }, { text: "SPACED · SHORT" }, { text: "PLAIN WORDS" }]} /></Duo>),
  "a5-1": (<Duo label={S("Lukas is sure the form is easy")} left={{ who: "lukas", face: "happy", pose: "point" }}><Steps /></Duo>),
  "a5-2": (<Duo label={S("A quiet test room; a phone rings mid-form")} left={{ who: "ayo", face: "surprised" }}><Quiet /><Mark x={9} y={34} kind="bang" /></Duo>),
  "a5-3": (<Duo label={S("Read-aloud and a screen reader's button list")} left={{ who: "tilda", face: "happy" }} right={{ who: "mirko", face: "neutral" }}><Readable /></Duo>),
  "a5-4": (<Duo label={S("The rule: test the entry pages, navigation and forms with them")} left={{ who: "pia", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="TEST FIRST" items={[{ tick: true, text: "ENTRY PAGES" }, { tick: true, text: "NAVIGATION" }, { tick: true, text: "CORE FORMS" }]} sub="WITH NEURODIVERGENT PEOPLE" /></Duo>),
  "b1-1": (<Duo label={S("An easy mode nobody finds")} left={{ who: "lukas", face: "happy" }}><Easy /></Duo>),
  "b1-2": (<Duo label={S("Pia draws a calm default for every product")} left={{ who: "pia", face: "think" }}><Calm /></Duo>),
  "b1-3": (<Duo label={S("The patterns go into the design system")} left={{ who: "lukas", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="DESIGN SYSTEM" items={[{ tick: true, text: "ONE MAIN TASK" }, { tick: true, text: "STEP-BY-STEP FORMS" }, { tick: true, text: "CLEAR BUTTONS" }]} /></Duo>),
  "b1-4": (<Duo label={S("The rule: base first, modes on top")} left={{ who: "pia", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="THE LAYERS" items={[{ text: "VISION" }, { text: "PRINCIPLES" }, { text: "PATTERNS + MODES" }, { text: "EVERY PRODUCT" }]} /></Duo>),
  "b2-1": (<Duo label={S("Animated offers against a calm start page")} left={{ who: "lukas", face: "happy", pose: "point" }} right={{ who: "pia", face: "worried" }}><Busy /></Duo>),
  "b2-2": (<Duo label={S("The brand in colour and tone; the task leads")} left={{ who: "pia", face: "happy" }}><Calm /><Tick x={9} y={34} /></Duo>),
  "b2-3": (<Duo label={S("They write down what they assume")} left={{ who: "lukas", face: "think" }}><Notes x={40} y={6} w={112} title="WE ASSUME" items={[{ icon: "ask", text: "FEW ARE AFFECTED?" }, { icon: "ask", text: "ONE STANDARD FITS?" }, { icon: "ask", text: "ONLY A COST?" }]} /></Duo>),
  "b2-4": (<Duo label={S("The rule: base for all, modes where needs pull apart")} left={{ who: "pia", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="DECIDE" items={[{ tick: true, text: "BASE FOR ALL" }, { icon: "gear", text: "MODES WHERE NEEDED" }, { icon: "eye", text: "TEST TO SEE" }]} /></Duo>),
  "b3-1": (<Duo label={S("Every product has its own menu again")} left={{ who: "mirko", face: "worried" }}><Moving label="OK" /><Mark x={9} y={34} kind="sweat" /></Duo>),
  "b3-2": (<Duo label={S("Pia names owners and a test strategy")} left={{ who: "pia", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="GOVERNANCE" items={[{ tick: true, text: "PATTERN OWNER" }, { tick: true, text: "TESTS WITH USERS" }, { tick: true, text: "A STOP RIGHT" }]} /></Duo>),
  "b3-3": (<Duo label={S("Pia decides without the data and says when she would reverse it")} left={{ who: "pia", face: "neutral" }}><Notes x={40} y={6} w={112} title="A DECISION" items={[{ tick: true, text: "WE DECIDE" }, { icon: "ask", text: "WE DO NOT KNOW" }, { icon: "clock", text: "WE REVERSE IF" }]} sub="AND WHAT WE GIVE UP" /></Duo>),
  "b3-4": (<Duo label={S("The rule: write the record before anyone asks")} left={{ who: "pia", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="THE RECORD" items={[{ text: "WHO OWNS IT" }, { text: "HOW WE TEST" }, { text: "WHO CAN STOP IT" }]} /></Duo>),
};
