import type { ReactNode } from "react";
import { Board, Chip, LOOK, Lines, Mark, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 3 comics (data/day3/comics.ts, DL-STANDARD.md section 13). People: Rosa and Theo (customers of Kettle & Co, a made-up online grocery
 * shop), Ines (its UX lead) and Karim (its brand manager). Every label is a short capital word.
 */
LOOK.rosa = { hair: "#8A8A90", shirt: "#B5372E", long: true, glasses: true };
LOOK.theo = { hair: "#3B2A20", shirt: "#2E9E6B", skin: "#C68A5A" };
LOOK.ines = { hair: "#1F1F24", shirt: "#3D7BD9", long: true };
LOOK.karim = { hair: "#2B2B2B", shirt: "#F59E0B", glasses: true };

const BRAND = "#2E7D4F";
const ACTION = "#1F5FA8";
const WARN = "#D9534F";
const LOUD = ["#E8590C", "#7048E8", "#0CA678", "#F08C00"];

function Shop({ title = "KETTLE & CO", children }: { title?: string; children?: ReactNode }) {
  return (
    <Board x={40} y={4} w={80} h={60}>
      <rect x={40} y={4} width={80} height={6} fill={BRAND} />
      <Txt x={80} y={8.6} size={3.4} anchor="middle" c="#FFFFFF">
        {title}
      </Txt>
      {children}
    </Board>
  );
}

function Btn({ x, y, w, label, c, tc = "#FFFFFF" }: { x: number; y: number; w: number; label: string; c: string; tc?: string }) {
  return (
    <g>
      <Chip x={x} y={y} w={w} h={7} c={c} />
      <Txt x={x + w / 2} y={y + 4.9} size={2.8} anchor="middle" c={tc}>
        {label}
      </Txt>
    </g>
  );
}

function Loud() {
  return (
    <Shop>
      {["FRUIT", "DAIRY", "BREAD"].map((l, i) => <Btn key={l} x={43 + i * 25} y={14} w={23} label={l} c={LOUD[i]} />)}
      <rect x={43} y={24} width={74} height={7} fill={WARN} />
      <Txt x={80} y={28.8} size={2.8} anchor="middle" c="#FFFFFF">ATTENTION: SATURDAY</Txt>
      <Btn x={43} y={44} w={35} label="PAY NOW" c="#E4E8EE" tc="#556274" />
      <Btn x={81} y={44} w={36} label="KEEP SHOPPING" c={LOUD[3]} />
    </Shop>
  );
}

function Calm() {
  return (
    <Shop>
      {["FRUIT", "DAIRY", "BREAD"].map((l, i) => <Btn key={l} x={43 + i * 25} y={14} w={23} label={l} c={["#E6F2EA", "#E8EEF8", "#F6EFE3"][i]} tc="#1B1B1F" />)}
      <Txt x={44} y={29} size={2.8}>DELIVERY SATURDAY 8 TO 12</Txt>
      <Btn x={43} y={44} w={35} label="PAY NOW" c={ACTION} />
      <Btn x={81} y={44} w={36} label="KEEP SHOPPING" c="#FFFFFF" tc={ACTION} />
    </Shop>
  );
}

function Orders({ functional }: { functional: boolean }) {
  const dots = functional ? ["#2E7D32", "#8A6D00", WARN] : [LOUD[0], LOUD[2], LOUD[1]];
  return (
    <Shop title="YOUR ORDERS">
      {["1042", "1043", "1044"].map((o, i) => (
        <g key={o}>
          <rect x={43} y={14 + i * 10} width={74} height={8} fill="#F1F3F6" />
          <Txt x={45} y={19.5 + i * 10} size={2.9}>{`ORDER ${o}`}</Txt>
          <rect x={functional ? 76 : 110} y={16 + i * 10} width={4} height={4} fill={dots[i]} />
          {functional && <Txt x={82} y={19.5 + i * 10} size={2.6} c={dots[i]}>{["DELIVERED", "ON ITS WAY", "PAY FAILED"][i]}</Txt>}
        </g>
      ))}
      <Btn x={43} y={48} w={35} label="ORDER AGAIN" c={functional ? ACTION : LOUD[1]} />
      <Btn x={81} y={48} w={36} label="SUMMER FRUIT" c={functional ? "#EEF2F6" : LOUD[0]} tc={functional ? "#1B1B1F" : "#FFFFFF"} />
    </Shop>
  );
}

function Notice({ readable }: { readable: boolean }) {
  return (
    <Shop title="DELIVERY">
      {readable ? (
        <g>
          <Txt x={44} y={18} size={3.6}>SATURDAY, 8 TO 12</Txt>
          <Txt x={44} y={27} size={3.2}>NOT HOME? A NEIGHBOUR</Txt>
          <Txt x={44} y={33} size={3.2}>TAKES THE BOX.</Txt>
          <Txt x={44} y={44} size={3.2}>CHANGE: ORDERS › DELIVERY</Txt>
        </g>
      ) : (
        <Lines x={44} y={15} w={72} n={9} gap={2.2} c="#C9CFD8" />
      )}
    </Shop>
  );
}

function Help({ kind }: { kind: "flat" | "clear" | "over" }) {
  return (
    <Shop title="HELP">
      {kind === "flat" && ["DELIVERY", "RETURNS", "PAYMENT"].map((s, i) => (
        <g key={s}>
          <Txt x={44} y={17 + i * 15} size={2.8} c="#556274">{s}</Txt>
          <Lines x={44} y={19 + i * 15} w={70} n={2} gap={2.6} />
        </g>
      ))}
      {kind === "clear" && ["DELIVERY", "RETURNS", "PAYMENT"].map((s, i) => (
        <g key={s}>
          <Txt x={44} y={18 + i * 15} size={4} c={BRAND}>{s}</Txt>
          <Lines x={44} y={21 + i * 15} w={70} n={2} gap={2.6} />
        </g>
      ))}
      {kind === "over" && ["DELIVERY", "RETURNS", "PAYMENT"].map((s, i) => (
        <g key={s}>
          <Txt x={44 + (i % 2) * 8} y={18 + i * 15} size={[4.6, 3, 4.2][i]} c={LOUD[i]}>{s}</Txt>
          <Txt x={104} y={18 + i * 15} size={2.6} c={LOUD[3]}>NEW!</Txt>
          <Lines x={44} y={21 + i * 15} w={70} n={2} gap={2.6} c={[LOUD[2], "#9AA5B5", LOUD[0]][i]} />
        </g>
      ))}
    </Shop>
  );
}

function Campaigns({ rules }: { rules: boolean }) {
  return (
    <Board x={30} y={6} w={100} h={56}>
      {["SHOP", "APP", "E-MAIL"].map((c, i) => (
        <g key={c}>
          <rect x={34 + i * 32} y={12} width={28} height={36} fill="#E4E8EE" />
          <Txt x={48 + i * 32} y={18} size={2.9} anchor="middle" c="#556274">{c}</Txt>
          <Chip x={36 + i * 32} y={28} w={24} h={7} c={rules ? ACTION : LOUD[i]} />
          <Txt x={48 + i * 32} y={32.8} size={2.6} anchor="middle" c="#FFFFFF">BUY</Txt>
        </g>
      ))}
      <Txt x={80} y={57} size={3.2} anchor="middle" c="#556274">{rules ? "ONE RULE, EVERY CHANNEL" : "A NEW COLOUR EACH CAMPAIGN"}</Txt>
    </Board>
  );
}

function Matrix() {
  return (
    <Board x={36} y={4} w={88} h={60}>
      <line x1={46} y1={56} x2={118} y2={56} stroke="#1B1B1F" strokeWidth={0.8} />
      <line x1={46} y1={10} x2={46} y2={56} stroke="#1B1B1F" strokeWidth={0.8} />
      <Txt x={82} y={62} size={2.8} anchor="middle" c="#556274">READABLE →</Txt>
      <Txt x={40} y={34} size={2.8} anchor="middle" c="#556274">BRAND</Txt>
      <rect x={90} y={12} width={26} height={18} fill="#B5E3C8" />
      <Txt x={103} y={22.5} size={3} anchor="middle">THE AIM</Txt>
      {[[54, 14, "A"], [110, 50, "B"], [104, 20, "C"], [68, 30, "D"]].map(([x, y, l]) => (
        <g key={l as string}>
          <rect x={(x as number) - 2.5} y={(y as number) - 2.5} width={5} height={5} fill={ACTION} />
          <Txt x={(x as number) + 4} y={(y as number) + 1.5} size={2.8}>{l as string}</Txt>
        </g>
      ))}
    </Board>
  );
}

const S = (s: string) => tt(s);

export const ART_D3: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={S("Rosa sees a red ATTENTION box for an ordinary delivery time and a bright orange Keep shopping button")} left={{ who: "rosa", face: "worried" }}>
      <Loud />
      <Mark x={9} y={34} kind="bang" />
    </Duo>
  ),
  "a1-2": (
    <Duo label={S("Ines lists what colour can do")} left={{ who: "ines", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="COLOUR CAN" items={[{ icon: "eye", text: "DRAW ATTENTION" }, { icon: "warn", text: "WARN" }, { icon: "heart", text: "BUILD TRUST, ACTIVATE" }, { icon: "book", text: "GIVE ORIENTATION" }]} />
    </Duo>
  ),
  "a1-3": (
    <Duo label={S("One blue for Pay now, red kept for real problems, calm tints for the areas: Rosa pays without a second look")} left={{ who: "rosa", face: "happy", pose: "up" }}>
      <Calm />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a1-4": (
    <Duo label={S("The rule: give every colour a job and keep it")} left={{ who: "ines", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="COLOUR WITH A JOB" items={[{ tick: true, text: "ONE ACCENT FOR THE ACTION" }, { tick: true, text: "RED FOR REAL PROBLEMS" }, { cross: true, text: "NOT: LOUD EVERYWHERE" }]} sub="AN EFFECT IS A HYPOTHESIS" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={S("Theo's orders show orange, green and purple dots, the same colours as the buttons and the offer box")} left={{ who: "theo", face: "think" }}>
      <Orders functional={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a2-2": (
    <Duo label={S("He does not see that one payment failed")} left={{ who: "theo", face: "worried" }}>
      <Orders functional={false} />
      <rect x={109} y={35.5} width={6} height={6} fill="none" stroke="#F59E0B" strokeWidth={1} />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "a2-3": (
    <Duo label={S("With functional colour, a word and a symbol, he sees the failed payment and the blue button at once")} left={{ who: "theo", face: "happy", pose: "up" }}>
      <Orders functional />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a2-4": (
    <Duo label={S("The rule: colour for action, priority and state, and never colour alone")} left={{ who: "ines", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="FUNCTIONAL COLOUR" items={[{ icon: "play", text: "ACTION" }, { icon: "up", text: "PRIORITY" }, { icon: "check", text: "STATE + A WORD" }]} sub="RISKS: OVERLOAD, MIX-UPS, NO ORDER" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={S("Rosa leans towards a delivery notice in small, light grey type")} left={{ who: "rosa", face: "worried" }}>
      <Notice readable={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a3-2": (
    <Duo label={S("Ines names the levers of readable type")} left={{ who: "ines", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="READABLE TYPE" items={[{ text: "SIZE" }, { text: "LINE SPACING" }, { text: "CONTRAST, WEIGHT" }, { text: "SHORT PARTS" }]} />
    </Duo>
  ),
  "a3-3": (
    <Duo label={S("Larger, darker type in three short parts: Rosa reads it in one go")} left={{ who: "rosa", face: "happy", pose: "up" }}>
      <Notice readable />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a3-4": (
    <Duo label={S("The rule: choose type for reading, not only for its look")} left={{ who: "ines", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="FUNCTIONAL TYPE" items={[{ tick: true, text: "READ FAST, NO EFFORT" }, { tick: true, text: "FOR EVERY AGE" }, { cross: true, text: "NOT: ELEGANT BUT THIN" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={S("On the flat help page Theo reads from the top to find Returns")} left={{ who: "theo", face: "think" }}>
      <Help kind="flat" />
    </Duo>
  ),
  "a4-2": (
    <Duo label={S("On the over-styled page every heading shouts, and he is lost again")} left={{ who: "theo", face: "worried" }}>
      <Help kind="over" />
      <Mark x={9} y={34} kind="bang" />
    </Duo>
  ),
  "a4-3": (
    <Duo label={S("With three clear levels his eye jumps straight to Returns")} left={{ who: "theo", face: "happy", pose: "up" }}>
      <Help kind="clear" />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a4-4": (
    <Duo label={S("The rule: a few fixed levels, the same on every page")} left={{ who: "ines", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="HIERARCHY" items={[{ text: "PAGE HEADING" }, { text: "SECTION HEADING" }, { text: "BODY, NOTE" }]} sub="COLOUR, TYPE, STRUCTURE TOGETHER" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={S("Karim, the brand manager, has three ideas and time for one first")} left={{ who: "karim", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="THREE IDEAS" items={[{ icon: "check", text: "WORDS WITH STATUS" }, { icon: "play", text: "ONE ACTION COLOUR" }, { icon: "book", text: "LARGER TEXT" }]} />
    </Duo>
  ),
  "a5-2": (
    <Duo label={S("Ines weighs the status words: high effect, easy, low risk, quick")} left={{ who: "ines", face: "think" }}>
      <Rate x={40} y={6} w={112} title="WORDS WITH STATUS" rows={[["EFFECT", 3, "HIGH"], ["FEASIBLE", 3, "HIGH"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={S("One action colour helps more, but marketing loses its campaign buttons: a higher risk")} left={{ who: "karim", face: "worried" }}>
      <Rate x={40} y={6} w={112} title="ONE ACTION COLOUR" rows={[["EFFECT", 3, "HIGH"], ["FEASIBLE", 2, "MID"], ["RISK", 2, "MID"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={S("The rule: colour and type change behaviour, so weigh them like any measure")} left={{ who: "ines", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="WEIGH A MEASURE" items={[{ tick: true, text: "EFFECT ON USERS" }, { tick: true, text: "FEASIBILITY, RISK" }, { tick: true, text: "TIME PRESSURE" }]} sub="THE REASON COUNTS" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={S("Theo finds an orange Buy button in the shop, a purple one in the app and a green one in the e-mail")} left={{ who: "theo", face: "worried" }}>
      <Campaigns rules={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "b1-2": (
    <Duo label={S("Karim: each campaign brings its own colour; each team its own headings")} left={{ who: "karim", face: "think" }}>
      <Notes x={40} y={6} w={112} title="HOW IT HAPPENED" items={[{ text: "SUMMER: ORANGE" }, { text: "CHRISTMAS: RED" }, { text: "EACH TEAM: OWN TYPE" }]} sub="THE MEETINGS: TASTE" />
    </Duo>
  ),
  "b1-3": (
    <Duo label={S("Ines decides colour and type once, as rules: blue always means you can do something")} left={{ who: "ines", face: "happy", pose: "point" }}>
      <Campaigns rules />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "b1-4": (
    <Duo label={S("The rule: decide the rules once and use them everywhere")} left={{ who: "ines", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="A DESIGN LOGIC" items={[{ icon: "heart", text: "THE BRAND" }, { icon: "gear", text: "THE RULES" }, { icon: "book", text: "COMPONENTS, SCREENS" }]} sub="CONSISTENCY IS THE BRAND" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Duo label={S("Karim wants green everywhere; Rosa cannot read white text on light green")} left={{ who: "karim", face: "happy", pose: "point" }} right={{ who: "rosa", face: "worried" }}>
      <Notes x={34} y={6} w={92} title="TWO GOALS" items={[{ icon: "heart", text: "THE BRAND" }, { icon: "eye", text: "READABLE" }]} />
    </Duo>
  ),
  "b2-2": (
    <Duo label={S("On the matrix the brand and readability meet in one place")} left={{ who: "ines", face: "think" }}>
      <Matrix />
    </Duo>
  ),
  "b2-3": (
    <Duo label={S("Ines keeps the brand in the logo and the images, and the interface in functional rules")} left={{ who: "ines", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="WE CHOOSE C" items={[{ tick: true, text: "BRAND: LOGO, IMAGES" }, { tick: true, text: "INTERFACE: THE RULES" }, { cross: true, text: "GIVE UP: GREEN EVERYWHERE" }]} />
    </Duo>
  ),
  "b2-4": (
    <Duo label={S("The rule: name the conflict, choose, and say what you give up")} left={{ who: "ines", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="FIVE GOALS" items={[{ text: "BRAND, ACCESSIBILITY" }, { text: "CLARITY, ACTIVATION" }, { text: "STANDARDISATION" }]} sub="CHOOSE AND SAY WHY" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={S("Karim: we do not know how many calls come from misread colours; should we wait?")} left={{ who: "karim", face: "worried" }}>
      <Notes x={40} y={6} w={112} title="WE DO NOT KNOW" items={[{ icon: "ask", text: "HOW MANY MISREAD?" }, { icon: "clock", text: "WAIT FOR DATA?" }]} />
    </Duo>
  ),
  "b3-2": (
    <Duo label={S("Ines decides, says what is unknown and when she would reverse it")} left={{ who: "ines", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="A DECISION" items={[{ tick: true, text: "WE DECIDE" }, { icon: "ask", text: "WE DO NOT KNOW" }, { icon: "clock", text: "WE REVERSE IF" }]} sub="AND WHAT WE GIVE UP" />
    </Duo>
  ),
  "b3-3": (
    <Duo label={S("Who owns what: UX owns the rules, brand owns the logo; readability decides first")} left={{ who: "ines", face: "neutral" }} right={{ who: "karim", face: "happy" }}>
      <Notes x={34} y={6} w={92} title="WHO OWNS IT" items={[{ text: "UX: RULES, PARTS" }, { text: "BRAND: LOGO, TONE" }, { text: "READABLE FIRST" }]} />
    </Duo>
  ),
  "b3-4": (
    <Duo label={S("The rule: someone owns the standards, and a decision says when it is checked")} left={{ who: "ines", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="ACCOUNTABLE" items={[{ tick: true, text: "OWNERS OF STANDARDS" }, { tick: true, text: "READABILITY FIRST" }, { tick: true, text: "DECIDE, THEN CHECK" }]} />
    </Duo>
  ),
};
