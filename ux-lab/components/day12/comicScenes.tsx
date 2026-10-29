import type { ReactNode } from "react";
import { Board, Chip, LOOK, Mark, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 12 comics (data/day12/comics.ts, DL-STANDARD.md section 13). People: Kofi (a blind customer who uses a screen reader) and Liv (a
 * customer with dyslexia) of Greenway, a made-up online grocer, Sanne (its UX designer) and Henrik (its product owner). Every label is a short capital word.
 */
LOOK.kofi = { hair: "#1A1410", shirt: "#3B6EA5", skin: "#6B4226", glasses: true };
LOOK.liv = { hair: "#E0B354", shirt: "#B5476B", long: true };
LOOK.sanne = { hair: "#5A3825", shirt: "#1F6F43", long: true };
LOOK.henrik = { hair: "#9A9A9A", shirt: "#44536A" };

const ACC = "#1F6F43";
const NEU = "#E3ECE6";

function Shop({ title = "GREENWAY", faint, children }: { title?: string; faint?: boolean; children?: ReactNode }) {
  return (
    <Board x={40} y={4} w={80} h={60}>
      <rect x={40} y={4} width={80} height={6} fill={faint ? "#B9D8C4" : ACC} />
      <Txt x={80} y={8.6} size={3.2} anchor="middle" c="#FFFFFF">
        {title}
      </Txt>
      {children}
    </Board>
  );
}

function Btn({ x, y, w, label, strong, focus }: { x: number; y: number; w: number; label: string; strong?: boolean; focus?: boolean }) {
  return (
    <g>
      {focus && <rect x={x - 1.2} y={y - 1.2} width={w + 2.4} height={8.4} fill="none" stroke="#F59E0B" strokeWidth={1} />}
      <Chip x={x} y={y} w={w} h={6} c={strong ? ACC : NEU} />
      <Txt x={x + w / 2} y={y + 4.2} size={2.6} anchor="middle" c={strong ? "#FFFFFF" : "#1B1B1F"}>
        {label}
      </Txt>
    </g>
  );
}

const Checkout = () => (
  <Shop>
    <Txt x={44} y={17} size={2.6}>APPLES 1 KG   2.49</Txt>
    <Txt x={44} y={24} size={2.6}>OAT MILK      1.79</Txt>
    <Btn x={43} y={44} w={40} label="PAY NOW" strong />
  </Shop>
);
const Reader = () => (
  <Shop title="SCREEN READER">
    <rect x={42} y={13} width={76} height={34} fill="#111827" />
    <Txt x={44} y={20} size={2.6} c="#E5E7EB">"BUTTON."</Txt>
    <Txt x={44} y={27} size={2.6} c="#E5E7EB">"BUTTON."</Txt>
    <Txt x={44} y={34} size={2.6} c="#E5E7EB">"IMAGE."</Txt>
    <Txt x={44} y={41} size={2.6} c="#E5E7EB">"CLICK HERE."</Txt>
  </Shop>
);
const Three = () => (
  <Shop title="WHO MEETS IT">
    <Txt x={44} y={18} size={2.6}>BLIND: ALWAYS</Txt>
    <Txt x={44} y={26} size={2.6}>ARM IN CAST: 6 WEEKS</Txt>
    <Txt x={44} y={34} size={2.6}>IN THE SUN: TODAY</Txt>
  </Shop>
);
const Faint = () => (
  <Shop faint>
    <Txt x={44} y={18} size={2.6} c="#C4CAD0">DELIVERY THU 18-20</Txt>
    <Txt x={44} y={25} size={2.6} c="#C4CAD0">OAT MILK 1.79</Txt>
  </Shop>
);
const Ratio = () => (
  <Shop title="CONTRAST">
    <Txt x={44} y={18} size={2.8} c="#B0B6BC">GREY  2.4 : 1</Txt>
    <Txt x={44} y={28} size={2.8} c="#3B4248">DARK  9.7 : 1</Txt>
    <Txt x={44} y={40} size={2.4} c="#556274">NEEDED: 4.5 : 1</Txt>
  </Shop>
);
const Words = () => (
  <Shop>
    <rect x={43} y={14} width={34} height={22} fill="#FFFFFF" stroke="#E06C6C" strokeWidth={0.8} />
    <Txt x={60} y={24} size={2.6} anchor="middle">SPINACH</Txt>
    <Txt x={60} y={31} size={2.3} anchor="middle" c="#8A1C1C">X OUT OF STOCK</Txt>
    <Txt x={82} y={24} size={2.3}>ALT: BUNCH OF</Txt>
    <Txt x={82} y={29} size={2.3}>FRESH SPINACH</Txt>
  </Shop>
);
const TabJump = () => (
  <Shop>
    <Txt x={44} y={17} size={2.4} c="#B42318">TAB 1: LOGO</Txt>
    <Txt x={44} y={24} size={2.4} c="#B42318">TAB 2: FOOTER</Txt>
    <Txt x={44} y={31} size={2.4} c="#B42318">TAB 3: LOGO</Txt>
    <Btn x={43} y={44} w={40} label="PAY NOW" strong />
  </Shop>
);
const Focused = () => (
  <Shop>
    <Btn x={43} y={16} w={50} label="DELIVERY NOTE" />
    <Btn x={43} y={27} w={50} label="VOUCHER" />
    <Btn x={43} y={40} w={40} label="PAY NOW" strong focus />
  </Shop>
);
const Dense = () => (
  <Shop>
    <Txt x={44} y={16} size={2.2}>INSOFAR AS THE RECIPIENT IS</Txt>
    <Txt x={44} y={21} size={2.2}>NOT PRESENT AT THE DELIVERY</Txt>
    <Txt x={44} y={26} size={2.2}>ADDRESS SUBJECT TO SECTION 7(2)</Txt>
    <Txt x={44} y={31} size={2.2}>THE DELIVERY MAY BE DEPOSITED…</Txt>
  </Shop>
);
const Invalid = () => (
  <Shop>
    <Txt x={44} y={17} size={2.6}>DATE: 31/02</Txt>
    <rect x={42} y={22} width={76} height={9} fill="#FDE2E2" />
    <Txt x={44} y={28} size={2.8} c="#8A1C1C">INVALID INPUT.</Txt>
  </Shop>
);
const Plain = () => (
  <Shop>
    <Txt x={44} y={17} size={2.6}>WHERE SHOULD WE DELIVER?</Txt>
    <rect x={42} y={22} width={76} height={13} fill="#F2FAF4" />
    <Txt x={44} y={27} size={2.3}>WRITE THE DATE LIKE</Txt>
    <Txt x={44} y={32} size={2.3}>14.11.2026</Txt>
  </Shop>
);
const Widget = () => (
  <Shop>
    <circle cx={108} cy={50} r={6} fill="#1D4ED8" />
    <Txt x={108} y={51.4} size={3} anchor="middle" c="#FFFFFF">A</Txt>
    <Txt x={44} y={18} size={2.6} c="#B42318">"100% COMPLIANT!"</Txt>
    <Txt x={44} y={26} size={2.4}>ONE LINE OF CODE</Txt>
  </Shop>
);
const Audit = () => (
  <Shop title="AUDIT 2026">
    <Txt x={44} y={18} size={2.8} c="#B42318">140 FAILURES</Txt>
    <Txt x={44} y={27} size={2.4}>"PARTIALLY COMPLIANT"</Txt>
    <Txt x={44} y={34} size={2.4} c="#556274">SAME AS LAST YEAR</Txt>
  </Shop>
);
const Green = () => (
  <Shop>
    <Chip x={43} y={16} w={40} h={7} c="#7FD1A0" />
    <Txt x={63} y={20.8} size={2.6} anchor="middle" c="#FFFFFF">ADD TO BASKET</Txt>
    <Btn x={43} y={30} w={40} label="ADD TO BASKET" strong />
  </Shop>
);
const Trap = () => (
  <Shop>
    <rect x={44} y={16} width={70} height={14} fill="none" stroke="#B42318" strokeWidth={1} />
    <Txt x={46} y={24} size={2.6}>VOUCHER CODE</Txt>
    <Txt x={44} y={40} size={2.4} c="#B42318">TAB → BACK IN THE BOX</Txt>
  </Shop>
);

const S = (s: string) => tt(s);

export const ART_D12: Record<string, ReactNode> = {
  "a1-1": (<Duo label={S("Henrik shows the new checkout; it works with a mouse")} left={{ who: "henrik", face: "happy", pose: "point" }}><Checkout /></Duo>),
  "a1-2": (<Duo label={S("Kofi's screen reader says button, button, image")} left={{ who: "kofi", face: "worried" }}><Reader /><Mark x={9} y={34} kind="ask" /></Duo>),
  "a1-3": (<Duo label={S("Sanne lists who else meets the same barrier")} left={{ who: "sanne", face: "think" }}><Three /></Duo>),
  "a1-4": (<Duo label={S("The rule: ask who is left out")} left={{ who: "sanne", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="WHO IS LEFT OUT?" items={[{ icon: "eye", text: "PERMANENT" }, { icon: "clock", text: "TEMPORARY" }, { icon: "warn", text: "SITUATIONAL" }]} sub="AND DIFFERENT MINDS" /></Duo>),
  "a2-1": (<Duo label={S("Light grey prices and delivery times")} left={{ who: "henrik", face: "happy" }}><Faint /></Duo>),
  "a2-2": (<Duo label={S("Outside in the sun, Liv cannot read her delivery time")} left={{ who: "liv", face: "worried" }}><Faint /><Mark x={9} y={34} kind="ask" /></Duo>),
  "a2-3": (<Duo label={S("Sanne measures the contrast and darkens the text")} left={{ who: "sanne", face: "think" }}><Ratio /></Duo>),
  "a2-4": (<Duo label={S("The rule: contrast, words, text alternatives")} left={{ who: "sanne", face: "happy", pose: "up" }}><Words /><Tick x={9} y={34} /></Duo>),
  "a3-1": (<Duo label={S("The focus jumps from the logo to the footer")} left={{ who: "kofi", face: "worried" }}><TabJump /><Mark x={9} y={34} kind="ask" /></Duo>),
  "a3-2": (<Duo label={S("Henrik tries without his mouse")} left={{ who: "henrik", face: "surprised" }}><TabJump /><Mark x={9} y={34} kind="sweat" /></Duo>),
  "a3-3": (<Duo label={S("Real buttons in reading order with a visible focus")} left={{ who: "kofi", face: "happy", pose: "up" }}><Focused /><Tick x={9} y={34} /></Duo>),
  "a3-4": (<Duo label={S("The rule: ten seconds, no mouse, every release")} left={{ who: "sanne", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="KEYBOARD TEST" items={[{ icon: "check", text: "TAB REACHES ALL" }, { icon: "eye", text: "FOCUS VISIBLE" }, { icon: "down", text: "ORDER MAKES SENSE" }]} /></Duo>),
  "a4-1": (<Duo label={S("A forty-word sentence in the delivery form")} left={{ who: "liv", face: "worried" }}><Dense /><Mark x={9} y={34} kind="ask" /></Duo>),
  "a4-2": (<Duo label={S("The form says only invalid input")} left={{ who: "liv", face: "sad" }}><Invalid /></Duo>),
  "a4-3": (<Duo label={S("Plain words and an example date")} left={{ who: "liv", face: "happy" }}><Plain /><Tick x={9} y={34} /></Duo>),
  "a4-4": (<Duo label={S("The rule: plain words, clear labels, errors that help")} left={{ who: "sanne", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="UNDERSTANDABLE" items={[{ icon: "pencil", text: "PLAIN WORDS" }, { icon: "check", text: "CLEAR LABELS" }, { icon: "idea", text: "ERRORS THAT HELP" }]} /></Duo>),
  "a5-1": (<Duo label={S("A sales offer for a compliance widget")} left={{ who: "henrik", face: "happy", pose: "point" }}><Widget /></Duo>),
  "a5-2": (<Duo label={S("Sanne shows the four principles")} left={{ who: "sanne", face: "think" }}><Notes x={40} y={6} w={112} title="WCAG 2.2 AA" items={[{ text: "PERCEIVABLE" }, { text: "OPERABLE" }, { text: "UNDERSTANDABLE" }, { text: "ROBUST" }]} /></Duo>),
  "a5-3": (<Duo label={S("They rate three measures on five criteria")} left={{ who: "henrik", face: "happy" }} right={{ who: "sanne", face: "neutral" }}><Notes x={40} y={6} w={80} title="WEIGH IT" items={[{ text: "EFFECT · LAW" }, { text: "FEASIBLE" }, { text: "RISK · TIME" }]} /></Duo>),
  "a5-4": (<Duo label={S("The rule: fix it where it is made")} left={{ who: "sanne", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="FIRST" items={[{ tick: true, text: "SHARED COMPONENTS" }, { icon: "clock", text: "4,000 ALT TEXTS: LATER" }, { cross: true, text: "WIDGET: NO" }]} /></Duo>),
  "b1-1": (<Duo label={S("The yearly audit, again")} left={{ who: "henrik", face: "worried" }}><Audit /><Mark x={9} y={34} kind="sweat" /></Duo>),
  "b1-2": (<Duo label={S("Sanne writes the guiding vision")} left={{ who: "sanne", face: "think" }}><Notes x={40} y={6} w={112} title="THE VISION" items={[{ icon: "heart", text: "EVERY CUSTOMER" }, { icon: "check", text: "ON THEIR OWN" }, { icon: "up", text: "WCAG 2.2 AA" }]} /></Duo>),
  "b1-3": (<Duo label={S("Accessible components in the design system")} left={{ who: "henrik", face: "happy", pose: "point" }}><Focused /></Duo>),
  "b1-4": (<Duo label={S("The rule: part of done")} left={{ who: "sanne", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="THE LAYERS" items={[{ text: "VISION" }, { text: "PRINCIPLES + TARGET" }, { text: "COMPONENTS + RULES" }, { text: "EVERY PAGE" }]} /></Duo>),
  "b2-1": (<Duo label={S("The light brand green fails")} left={{ who: "henrik", face: "happy", pose: "point" }} right={{ who: "sanne", face: "worried" }}><Green /></Duo>),
  "b2-2": (<Duo label={S("Light green for shapes, dark green for text")} left={{ who: "sanne", face: "happy" }}><Green /><Tick x={9} y={34} /></Duo>),
  "b2-3": (<Duo label={S("They write down what they assume")} left={{ who: "henrik", face: "think" }}><Notes x={40} y={6} w={112} title="WE ASSUME" items={[{ icon: "ask", text: "FEW DISABLED USERS?" }, { icon: "ask", text: "ONE AUDIT IS ENOUGH?" }, { icon: "ask", text: "A STATEMENT = SAFE?" }]} /></Duo>),
  "b2-4": (<Duo label={S("The rule: fix once, options on top, law as the floor")} left={{ who: "sanne", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="DECIDE" items={[{ tick: true, text: "FIX ONCE" }, { icon: "gear", text: "OPTIONS ON TOP" }, { icon: "lock", text: "LAW = FLOOR" }]} /></Duo>),
  "b3-1": (<Duo label={S("Kofi is trapped in the voucher box")} left={{ who: "kofi", face: "worried" }}><Trap /><Mark x={9} y={34} kind="bang" /></Duo>),
  "b3-2": (<Duo label={S("Sanne writes the governance")} left={{ who: "sanne", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="GOVERNANCE" items={[{ tick: true, text: "AN OWNER" }, { tick: true, text: "CHECK IN DONE" }, { tick: true, text: "A STOP RIGHT" }]} /></Duo>),
  "b3-3": (<Duo label={S("Sanne decides without sorted data and says when she would change")} left={{ who: "sanne", face: "neutral" }}><Notes x={40} y={6} w={112} title="A DECISION" items={[{ tick: true, text: "WE DECIDE" }, { icon: "ask", text: "WE DO NOT KNOW" }, { icon: "clock", text: "WE REVERSE IF" }]} sub="AND WHAT WE GIVE UP" /></Duo>),
  "b3-4": (<Duo label={S("The rule: write the record before anyone asks")} left={{ who: "sanne", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="THE RECORD" items={[{ text: "WHO OWNS IT" }, { text: "WHAT WE CHECK" }, { text: "WHO CAN STOP IT" }]} /></Duo>),
};
