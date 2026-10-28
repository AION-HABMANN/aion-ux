import type { ReactNode } from "react";
import { Board, Chip, LOOK, Mark, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 11 comics (data/day11/comics.ts, DL-STANDARD.md section 13). People: Noor and Ole (home cooks using Ladle, a made-up cooking app
 * with a voice mode), Freya (its UX designer) and Piet (its product owner). Every label is a short capital word.
 */
LOOK.noor = { hair: "#1E1A1A", shirt: "#B23A0A", long: true, skin: "#A8714A" };
LOOK.ole = { hair: "#C9A86A", shirt: "#3F6E4E", glasses: true };
LOOK.freya = { hair: "#8A3B12", shirt: "#3D5A80", long: true };
LOOK.piet = { hair: "#2B2B2B", shirt: "#6B5B95" };

const ACC = "#B23A0A";
const NEU = "#ECE4DF";

function App({ title = "LADLE · VOICE", children }: { title?: string; children?: ReactNode }) {
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

function Bubble({ y, lines, bg = NEU }: { y: number; lines: string[]; bg?: string }) {
  return (
    <g>
      <rect x={42} y={y} width={76} height={4 + lines.length * 5} fill={bg} />
      {lines.map((l, i) => (
        <Txt key={l + i} x={44} y={y + 5 + i * 5} size={2.6}>
          {l}
        </Txt>
      ))}
    </g>
  );
}

function Btn({ x, y, w, label, strong }: { x: number; y: number; w: number; label: string; strong?: boolean }) {
  return (
    <g>
      <Chip x={x} y={y} w={w} h={6} c={strong ? ACC : NEU} />
      <Txt x={x + w / 2} y={y + 4.2} size={2.6} anchor="middle" c={strong ? "#FFFFFF" : "#1B1B1F"}>
        {label}
      </Txt>
    </g>
  );
}

const Recipe = () => (
  <App title="LADLE">
    <Txt x={44} y={16} size={2.8}>PANCAKES · 6</Txt>
    <Txt x={44} y={23} size={2.6}>600 G FLOUR</Txt>
    <Txt x={44} y={29} size={2.6}>3 EGGS</Txt>
    <Txt x={44} y={35} size={2.6}>450 ML MILK</Txt>
    <Btn x={43} y={44} w={40} label="TIMER 12:00" strong />
  </App>
);
const Answer = () => (
  <App>
    <Bubble y={14} lines={["600 G FLOUR, 3 EGGS,", "450 ML MILK.", "TIMER 12 MIN STARTED."]} />
  </App>
);
const Long = () => (
  <App>
    <Bubble y={13} bg="#FFE7DC" lines={["1 SCALE 2 TIMER 3 SWAP", "4 LIST 5 RATE 6 UNITS", "7 SHARE 8 VIDEO …"]} />
  </App>
);
const Loop = () => (
  <App>
    <Bubble y={13} bg="#FFE1E1" lines={["SORRY, I DIDN'T", "UNDERSTAND THAT."]} />
    <Bubble y={30} bg="#FFE1E1" lines={["SORRY, I DIDN'T", "UNDERSTAND THAT."]} />
  </App>
);
const Better = () => (
  <App>
    <Bubble y={14} lines={["FIVE MINUTES,", "OR TEN?"]} />
    <Btn x={43} y={36} w={34} label="5 MIN" />
    <Btn x={80} y={36} w={36} label="10 MIN" />
  </App>
);
const Hint = () => (
  <App>
    <Bubble y={14} lines={["YOU CAN SAY: NEXT,", "REPEAT, TIMER, STOP."]} />
    <Bubble y={32} bg="#EAF6EF" lines={["TIMER 5 MIN: NUTS ✓"]} />
  </App>
);
const Busy = () => (
  <App>
    <Bubble y={12} bg="#FFE1E1" lines={["GREAT JOB! 🔥4 STEP 4/9", "180 OR 160 OR GAS 4…", "PREMIUM? ORDER PAPER?"]} />
    <Txt x={44} y={40} size={2.4} c="#556274">SAY YES NO MORE SKIP…</Txt>
  </App>
);
const Calm = () => (
  <App>
    <Bubble y={16} lines={["STEP 4: BAKE FOR", "20 MINUTES."]} />
  </App>
);
const Demo = () => (
  <App title="LADLE · DEMO">
    <Txt x={44} y={17} size={2.6}>✓ PANCAKES</Txt>
    <Txt x={44} y={24} size={2.6}>✓ OMELETTE</Txt>
    <Txt x={44} y={31} size={2.6}>✓ TOAST</Txt>
    <Txt x={44} y={42} size={2.4} c="#556274">3 OF 3 PASSED</Txt>
  </App>
);
const Wizard = () => (
  <App title="WIZARD OF OZ">
    <Bubble y={14} lines={["CAN I SWAP THE NUTS?"]} />
    <rect x={42} y={26} width={76} height={14} fill="none" stroke={ACC} strokeDasharray="2 1" strokeWidth={0.6} />
    <Txt x={44} y={32} size={2.4} c={ACC}>FREYA TYPES:</Txt>
    <Txt x={44} y={37} size={2.4}>"SUNFLOWER SEEDS."</Txt>
  </App>
);
const Kitchen = () => (
  <App title="TEST · REAL KITCHEN">
    <Txt x={44} y={16} size={2.5}>FAN ON · RADIO ON</Txt>
    <Bubble y={20} bg="#FFE1E1" lines={["HEARD: THIRTEEN", "SAID: THIRTY"]} />
    <Txt x={44} y={43} size={2.4} c="#B42318">HIGH RISK: ALLERGY</Txt>
  </App>
);
const Mics = () => (
  <App title="LADLE">
    <Bubble y={13} lines={["🎙 APP: SAY ANYTHING"]} />
    <Bubble y={24} bg="#FFE7DC" lines={["🎙 SHOP: COMMAND?"]} />
    <Bubble y={35} bg="#EEF4FF" lines={["🎙 OVEN: BEEP."]} />
  </App>
);
const Pay = () => (
  <App title="LADLE · SHOP">
    <Bubble y={14} lines={["IN YOUR BASKET.", "CHECK AND PAY", "ON YOUR SCREEN."]} />
    <Btn x={43} y={42} w={44} label="PAY ON SCREEN" strong />
  </App>
);
const Nuts = () => (
  <App>
    <Bubble y={14} bg="#FFE1E1" lines={["NUT-FREE CAKE?", "TRY HAZELNUTS!"]} />
  </App>
);

const S = (s: string) => tt(s);

export const ART_D11: Record<string, ReactNode> = {
  "a1-1": (<Duo label={S("Noor kneads dough; the recipe is on the phone across the counter")} left={{ who: "noor", face: "worried" }}><Recipe /><Mark x={9} y={34} kind="ask" /></Duo>),
  "a1-2": (<Duo label={S("Noor asks aloud and Ladle answers at once")} left={{ who: "noor", face: "happy", pose: "up" }}><Answer /><Tick x={9} y={34} /></Duo>),
  "a1-3": (<Duo label={S("Ladle reads many amounts; Noor forgets one")} left={{ who: "noor", face: "surprised" }}><Long /><Mark x={9} y={34} kind="ask" /></Duo>),
  "a1-4": (<Duo label={S("The rule: voice for busy hands and short answers")} left={{ who: "freya", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="VOICE" items={[{ tick: true, text: "HANDS-FREE · FAST" }, { tick: true, text: "ACCESSIBLE · NATURAL" }, { cross: true, text: "MISHEARS · NOTHING TO SEE" }]} /></Duo>),
  "a2-1": (<Duo label={S("Ladle says sorry twice while the nuts burn")} left={{ who: "ole", face: "worried" }}><Loop /><Mark x={9} y={34} kind="sweat" /></Duo>),
  "a2-2": (<Duo label={S("A better question: five minutes or ten?")} left={{ who: "ole", face: "happy" }}><Better /><Tick x={9} y={34} /></Duo>),
  "a2-3": (<Duo label={S("Ladle says what can be asked and what it set")} left={{ who: "ole", face: "happy", pose: "up" }}><Hint /></Duo>),
  "a2-4": (<Duo label={S("The rule: six requirements")} left={{ who: "freya", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="A GOOD DIALOGUE" items={[{ text: "LOGIC · EXPECTATIONS" }, { text: "FEEDBACK · ERRORS" }, { text: "REPEAT · CONTROL" }]} /></Duo>),
  "a3-1": (<Duo label={S("Ladle reads eight options while Noor stirs")} left={{ who: "noor", face: "surprised" }}><Long /><Mark x={9} y={34} kind="ask" /></Duo>),
  "a3-2": (<Duo label={S("Piet adds a tip, an offer and a streak to every answer")} left={{ who: "piet", face: "happy", pose: "point" }}><Busy /></Duo>),
  "a3-3": (<Duo label={S("The calm version: one step in one breath")} left={{ who: "noor", face: "happy" }}><Calm /><Tick x={9} y={34} /></Duo>),
  "a3-4": (<Duo label={S("The rule: predictable, light on memory, calm")} left={{ who: "freya", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="NEURO-DESIGN" items={[{ icon: "check", text: "PREDICTABLE" }, { icon: "idea", text: "LIGHT ON MEMORY" }, { icon: "eye", text: "FEWER STIMULI" }]} /></Duo>),
  "a4-1": (<Duo label={S("Piet shows a perfect demo with three easy recipes")} left={{ who: "piet", face: "happy", pose: "up" }}><Demo /></Duo>),
  "a4-2": (<Duo label={S("Freya plays Ladle from behind a screen")} left={{ who: "ole", face: "think" }} right={{ who: "freya", face: "neutral" }}><Wizard /></Duo>),
  "a4-3": (<Duo label={S("In a real kitchen, with the fan on and an allergy question")} left={{ who: "freya", face: "worried" }}><Kitchen /><Mark x={9} y={34} kind="bang" /></Duo>),
  "a4-4": (<Duo label={S("The rule: choose the prototype by the question")} left={{ who: "freya", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="PROTOTYPES" items={[{ icon: "gear", text: "FUNCTION: WORKS?" }, { icon: "play", text: "INTERACTION: FEELS?" }, { icon: "eye", text: "TEST: REAL TASKS?" }]} sub="TEST THE RISKY ONES" /></Duo>),
  "a5-1": (<Duo label={S("Piet wants voice for everything")} left={{ who: "piet", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="VOICE FOR…" items={[{ text: "TIMERS" }, { text: "ALLERGIES" }, { text: "PAYING" }]} /></Duo>),
  "a5-2": (<Duo label={S("Freya asks five questions of each task")} left={{ who: "freya", face: "think" }}><Notes x={40} y={6} w={112} title="FIVE QUESTIONS" items={[{ icon: "ask", text: "HANDS BUSY? FREQUENT?" }, { icon: "ask", text: "FEW CHOICES? SHORT?" }, { icon: "ask", text: "CHEAP IF WRONG?" }]} /></Duo>),
  "a5-3": (<Duo label={S("They rate three measures on four questions")} left={{ who: "piet", face: "happy" }} right={{ who: "freya", face: "neutral" }}><Notes x={40} y={6} w={80} title="WEIGH IT" items={[{ text: "EFFECT" }, { text: "FEASIBLE" }, { text: "RISK" }, { text: "TIME" }]} /></Duo>),
  "a5-4": (<Duo label={S("The rule: reliable before impressive")} left={{ who: "freya", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="FIRST" items={[{ tick: true, text: "SAY WHAT IS POSSIBLE" }, { tick: true, text: "SCREEN AFTER 2ND MISS" }, { cross: true, text: "ASK ME ANYTHING: NOT NOW" }]} /></Duo>),
  "b1-1": (<Duo label={S("A microphone on every screen, each answering differently")} left={{ who: "ole", face: "worried" }}><Mics /><Mark x={9} y={34} kind="ask" /></Duo>),
  "b1-2": (<Duo label={S("Freya drafts the guiding vision")} left={{ who: "freya", face: "think" }}><Notes x={40} y={6} w={112} title="THE VISION" items={[{ icon: "heart", text: "COOK WITH HANDS FULL" }, { icon: "check", text: "SHORT AND CLEAR" }, { icon: "up", text: "YOU ARE IN CHARGE" }]} /></Duo>),
  "b1-3": (<Duo label={S("Shared principles and tests, built once")} left={{ who: "piet", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="BUILT ONCE" items={[{ tick: true, text: "READ-BACK" }, { tick: true, text: "SCREEN AFTER 2ND MISS" }, { tick: true, text: "TESTS BY RISK" }]} /></Duo>),
  "b1-4": (<Duo label={S("The rule: robust core uses first")} left={{ who: "freya", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="THE LAYERS" items={[{ text: "VISION" }, { text: "PRINCIPLES" }, { text: "PATTERNS + TESTS" }, { text: "TOUCHPOINTS" }]} /></Duo>),
  "b2-1": (<Duo label={S("Sales wants paying by voice; Freya asks what happens if it mishears")} left={{ who: "piet", face: "happy", pose: "point" }} right={{ who: "freya", face: "worried" }}><Notes x={40} y={6} w={80} title="TWO GOALS" items={[{ text: "COMFORT" }, { text: "VS" }, { text: "PRECISION" }]} /></Duo>),
  "b2-2": (<Duo label={S("Three journeys, three degrees of freedom")} left={{ who: "freya", face: "think" }}><Pay /></Duo>),
  "b2-3": (<Duo label={S("They write down what they assume about scale")} left={{ who: "piet", face: "think" }}><Notes x={40} y={6} w={112} title="WE ASSUME" items={[{ icon: "ask", text: "PEOPLE TALK NATURALLY" }, { icon: "ask", text: "SIMPLE TRUST CARRIES" }, { icon: "ask", text: "3 JOURNEYS → 20" }]} /></Duo>),
  "b2-4": (<Duo label={S("The rule: free where cheap, checked where it matters")} left={{ who: "freya", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="PER JOURNEY" items={[{ tick: true, text: "TIMERS: FREE" }, { icon: "warn", text: "ALLERGIES: + SCREEN" }, { icon: "lock", text: "PAYING: SCREEN" }]} /></Duo>),
  "b3-1": (<Duo label={S("A complaint: Ladle suggested hazelnuts for a nut-free cake")} left={{ who: "piet", face: "worried" }}><Nuts /><Mark x={9} y={34} kind="sweat" /></Duo>),
  "b3-2": (<Duo label={S("Freya writes the governance")} left={{ who: "freya", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="GOVERNANCE" items={[{ tick: true, text: "AN OWNER" }, { tick: true, text: "TESTS BY RISK" }, { tick: true, text: "A STOP RIGHT" }]} /></Duo>),
  "b3-3": (<Duo label={S("Freya decides without the data and says when she would reverse it")} left={{ who: "freya", face: "neutral" }}><Notes x={40} y={6} w={112} title="A DECISION" items={[{ tick: true, text: "WE DECIDE" }, { icon: "ask", text: "WE DO NOT KNOW" }, { icon: "clock", text: "WE REVERSE IF" }]} sub="AND WHAT WE GIVE UP" /></Duo>),
  "b3-4": (<Duo label={S("The rule: write the record before anyone asks")} left={{ who: "freya", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="THE RECORD" items={[{ text: "WHO OWNS IT" }, { text: "WHAT WAS TESTED" }, { text: "WHO CAN STOP IT" }]} /></Duo>),
};
