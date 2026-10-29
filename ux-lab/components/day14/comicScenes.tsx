import type { ReactNode } from "react";
import { Board, Chip, LOOK, Mark, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 14 comics (data/day14/comics.ts, DL-STANDARD.md section 13). People: Zara and Edgar (customers of Brewline, a made-up maker of
 * coffee machines), Kim (its UX designer) and Ruth (its product owner). Every label is a short capital word.
 */
LOOK.zara = { hair: "#2B1B14", shirt: "#0E7490", long: true, skin: "#9A6B4A" };
LOOK.edgar = { hair: "#D4D4D4", shirt: "#57534E", glasses: true };
LOOK.kim = { hair: "#151518", shirt: "#6B3E26", long: true, skin: "#E0B48C" };
LOOK.ruth = { hair: "#8B5A2B", shirt: "#7C3AED", long: true };

const ACC = "#6B3E26";
const NEU = "#ECE5E0";

function Phone({ title = "BREWLINE · AR", children }: { title?: string; children?: ReactNode }) {
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
const Machine = ({ x = 66 }: { x?: number }) => (
  <g>
    <rect x={x} y={22} width={28} height={34} fill="#D6D3D1" />
    <rect x={x + 4} y={18} width={20} height={5} fill="#A8A29E" />
    <rect x={x + 10} y={36} width={8} height={4} fill="#57534E" />
  </g>
);
const Lbl = ({ x, y, text, c = "#FFFFFF", fg = "#1B1B1F" }: { x: number; y: number; text: string; c?: string; fg?: string }) => (
  <g>
    <Chip x={x} y={y} w={text.length * 1.9 + 4} h={5} c={c} />
    <Txt x={x + 2} y={y + 3.6} size={2.4} c={fg}>{text}</Txt>
  </g>
);

const Manual = () => (
  <Phone title="MANUAL · PAGE 12">
    <rect x={46} y={14} width={30} height={30} fill={NEU} />
    <Txt x={80} y={20} size={2.4}>A: WATER TANK</Txt>
    <Txt x={80} y={26} size={2.4}>B: SPOUT</Txt>
    <Txt x={80} y={32} size={2.4}>SEE FIGURE 3</Txt>
  </Phone>
);
const ArTwo = () => (
  <Phone>
    <Machine />
    <Lbl x={70} y={13} text="TANK" />
    <Lbl x={46} y={37} text="SPOUT" />
  </Phone>
);
const ArNine = ({ loud }: { loud?: boolean }) => (
  <Phone>
    <Machine />
    <Lbl x={70} y={13} text="TANK" />
    <Lbl x={44} y={20} text="HOT!" c={loud ? "#F59E0B" : "#FEF3C7"} />
    <Lbl x={96} y={26} text="TIP" c="#FEF3C7" />
    <Lbl x={44} y={30} text="SPOUT" />
    <Lbl x={96} y={36} text="ORDER 🛒" c={loud ? "#F59E0B" : "#FEF3C7"} />
    <Lbl x={44} y={44} text="TRAY" />
    <Lbl x={96} y={46} text="RATE ⭐" c="#FEF3C7" />
    <Lbl x={70} y={57} text="BX-7" c="#FEF3C7" />
  </Phone>
);
const Beep = () => (
  <Phone>
    <rect x={42} y={12} width={76} height={6} fill="#B91C1C" />
    <Txt x={80} y={16.4} size={2.6} anchor="middle" c="#FFFFFF">BEEP · DESCALE!</Txt>
    <Machine />
    <Lbl x={44} y={26} text="HOT!" c="#FEF3C7" />
    <Lbl x={96} y={30} text="ORDER" c="#FEF3C7" />
    <Txt x={44} y={60} size={2.2} c="#556274">WEAK SIGNAL…</Txt>
  </Phone>
);
const Grid = () => (
  <Phone title="VALUE × MATURITY">
    <rect x={44} y={14} width={34} height={22} fill="#F2FAF4" />
    <Txt x={46} y={20} size={2.3}>DESCALE AR</Txt>
    <rect x={80} y={36} width={34} height={22} fill={NEU} />
    <Txt x={82} y={46} size={2.3}>VR SHOWROOM</Txt>
    <Txt x={44} y={46} size={2} c="#556274">VALUE ↑ MATURITY →</Txt>
  </Phone>
);
const Showroom = () => (
  <Phone title="TRADE FAIR · VR">
    <rect x={42} y={12} width={76} height={42} fill="#4C1D95" />
    <Txt x={80} y={34} size={3.2} anchor="middle" c="#FFFFFF">WOW! ✨</Txt>
  </Phone>
);
const Eye = () => (
  <Phone title="EYE-TRACKING">
    <circle cx={80} cy={32} r={9} fill="#FFFFFF" stroke="#1B1B1F" strokeWidth={0.8} />
    <circle cx={80} cy={32} r={4} fill="#1B1B1F" />
    <Txt x={44} y={54} size={2.4} c="#B42318">LOOKED AT OFFER 2.4 S</Txt>
  </Phone>
);
const Demos = () => (
  <Phone title="INNOVATION LAB">
    {[16, 24, 32, 40, 48].map((y, i) => (
      <g key={y}>
        <Txt x={44} y={y} size={2.4}>{`DEMO ${i + 1}`}</Txt>
        <Txt x={86} y={y} size={2.2} c="#556274">NOT IN USE</Txt>
      </g>
    ))}
  </Phone>
);

const S = (s: string) => tt(s);

export const ART_D14: Record<string, ReactNode> = {
  "a1-1": (<Duo label={S("Zara holds the manual and looks for A")} left={{ who: "zara", face: "worried" }}><Manual /><Mark x={9} y={34} kind="ask" /></Duo>),
  "a1-2": (<Duo label={S("Ruth wants full VR")} left={{ who: "ruth", face: "happy", pose: "point" }}><Showroom /></Duo>),
  "a1-3": (<Duo label={S("The AR label sits on the tank")} left={{ who: "zara", face: "happy", pose: "up" }}><ArTwo /><Tick x={9} y={34} /></Duo>),
  "a1-4": (<Duo label={S("The rule: name the task first")} left={{ who: "kim", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="WHICH ONE?" items={[{ icon: "eye", text: "AR: OVER THE WORLD" }, { icon: "play", text: "VR: A NEW WORLD" }, { icon: "gear", text: "MR: IN THE ROOM" }]} /></Duo>),
  "a2-1": (<Duo label={S("Two labels; Zara finds them at once")} left={{ who: "zara", face: "happy" }}><ArTwo /><Tick x={9} y={34} /></Duo>),
  "a2-2": (<Duo label={S("Ruth adds seven more labels")} left={{ who: "ruth", face: "happy", pose: "point" }}><ArNine /></Duo>),
  "a2-3": (<Duo label={S("The offers pulse and pull Zara's eye")} left={{ who: "zara", face: "surprised" }}><ArNine loud /><Mark x={9} y={34} kind="ask" /></Duo>),
  "a2-4": (<Duo label={S("The rule: the important cue must be the most visible")} left={{ who: "kim", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="ATTENTION" items={[{ icon: "eye", text: "ONE FOCUS" }, { icon: "down", text: "LOW LOAD" }, { icon: "warn", text: "MOVE = PULL" }]} /></Duo>),
  "a3-1": (<Duo label={S("A quiet Sunday: descaled in five minutes")} left={{ who: "zara", face: "happy", pose: "up" }}><ArTwo /><Tick x={9} y={34} /></Duo>),
  "a3-2": (<Duo label={S("Monday morning: beeping, a crying child, a weak signal")} left={{ who: "zara", face: "worried" }}><Beep /><Mark x={9} y={34} kind="sweat" /></Duo>),
  "a3-3": (<Duo label={S("Edgar wants paper")} left={{ who: "edgar", face: "neutral" }}><Manual /></Duo>),
  "a3-4": (<Duo label={S("The rule: design for Monday")} left={{ who: "kim", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="CHANCE · RISK" items={[{ tick: true, text: "HELP AT THE MACHINE" }, { cross: true, text: "OVERLOAD IN STRESS" }, { cross: true, text: "NOT FOR EVERYONE" }]} /></Duo>),
  "a4-1": (<Duo label={S("Ruth wants a VR showroom for the fair")} left={{ who: "ruth", face: "happy", pose: "point" }}><Showroom /></Duo>),
  "a4-2": (<Duo label={S("Kim places five ideas by value and maturity")} left={{ who: "kim", face: "think" }}><Grid /></Duo>),
  "a4-3": (<Duo label={S("Nobody would miss the showroom")} left={{ who: "ruth", face: "think" }}><Grid /></Duo>),
  "a4-4": (<Duo label={S("The rule: real value first")} left={{ who: "kim", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="THE TEST" items={[{ tick: true, text: "BEATS THE CLASSIC?" }, { tick: true, text: "WORKS FOR REAL?" }, { tick: true, text: "USED AT SCALE?" }]} /></Duo>),
  "a5-1": (<Duo label={S("Ruth proposes eye-tracking for offers")} left={{ who: "ruth", face: "happy", pose: "point" }}><Eye /></Duo>),
  "a5-2": (<Duo label={S("Kim asks whom it serves")} left={{ who: "kim", face: "think" }}><Notes x={40} y={6} w={112} title="FIVE QUESTIONS" items={[{ icon: "eye", text: "WHAT IS RECORDED?" }, { icon: "ask", text: "WHO IS LEFT OUT?" }, { icon: "warn", text: "FOR WHOM?" }]} /></Duo>),
  "a5-3": (<Duo label={S("They rate three measures")} left={{ who: "ruth", face: "neutral" }} right={{ who: "kim", face: "happy" }}><Notes x={40} y={6} w={80} title="WEIGH IT" items={[{ text: "EFFECT" }, { text: "RISK · TIME" }, { text: "INVESTMENT" }]} /></Duo>),
  "a5-4": (<Duo label={S("The rule: effect, money, responsibility")} left={{ who: "kim", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="PRIORITISE BY" items={[{ tick: true, text: "EFFECT" }, { tick: true, text: "ECONOMICS" }, { tick: true, text: "RESPONSIBILITY" }]} sub="NOT FASCINATION" /></Duo>),
  "b1-1": (<Duo label={S("Five demos, none in use")} left={{ who: "ruth", face: "worried" }}><Demos /><Mark x={9} y={34} kind="ask" /></Duo>),
  "b1-2": (<Duo label={S("Kim writes the vision")} left={{ who: "kim", face: "think" }}><Notes x={40} y={6} w={112} title="THE VISION" items={[{ icon: "heart", text: "HELP AT THE MACHINE" }, { icon: "check", text: "BEATS THE MANUAL" }, { cross: true, text: "NOT FOR SHOW" }]} /></Duo>),
  "b1-3": (<Duo label={S("One portfolio with gates")} left={{ who: "ruth", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="PORTFOLIO" items={[{ icon: "eye", text: "WATCH" }, { icon: "play", text: "PILOT" }, { icon: "up", text: "SCALE" }]} /></Duo>),
  "b1-4": (<Duo label={S("The rule: an investment, not a showcase")} left={{ who: "kim", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="THE LAYERS" items={[{ text: "VISION" }, { text: "GRID" }, { text: "GATES" }, { text: "PILOTS" }]} /></Duo>),
  "b2-1": (<Duo label={S("The board wants a mixed-reality café")} left={{ who: "ruth", face: "happy", pose: "point" }} right={{ who: "kim", face: "worried" }}><Showroom /></Duo>),
  "b2-2": (<Duo label={S("Three bets")} left={{ who: "kim", face: "think" }}><Notes x={40} y={6} w={112} title="THREE BETS" items={[{ tick: true, text: "SAFE: DESCALE AR" }, { icon: "warn", text: "MEDIUM: VR COURSE" }, { icon: "eye", text: "BOLD: WATCH LIST" }]} /></Duo>),
  "b2-3": (<Duo label={S("They write down what each bet assumes")} left={{ who: "ruth", face: "think" }}><Notes x={40} y={6} w={112} title="WE ASSUME" items={[{ icon: "ask", text: "PEOPLE WANT IT?" }, { icon: "ask", text: "IT WORKS FOR REAL?" }, { icon: "ask", text: "IT PAYS OFF?" }]} /></Duo>),
  "b2-4": (<Duo label={S("The rule: measures and a stop date before the start")} left={{ who: "kim", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="BEFORE THE START" items={[{ tick: true, text: "A REASON" }, { tick: true, text: "MEASURES" }, { tick: true, text: "A STOP DATE" }]} /></Duo>),
  "b3-1": (<Duo label={S("A two-year pilot nobody measured")} left={{ who: "ruth", face: "worried" }}><Demos /><Mark x={9} y={34} kind="sweat" /></Duo>),
  "b3-2": (<Duo label={S("Kim writes the governance")} left={{ who: "kim", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="GOVERNANCE" items={[{ tick: true, text: "AN OWNER" }, { tick: true, text: "GATES" }, { tick: true, text: "A STOP RIGHT" }]} /></Duo>),
  "b3-3": (<Duo label={S("Kim decides on a small pilot without data")} left={{ who: "kim", face: "neutral" }}><Notes x={40} y={6} w={112} title="A DECISION" items={[{ tick: true, text: "WE DECIDE" }, { icon: "ask", text: "WE DO NOT KNOW" }, { icon: "clock", text: "WE STOP IF" }]} sub="AND WHAT WE GIVE UP" /></Duo>),
  "b3-4": (<Duo label={S("The rule: write the record before anyone asks")} left={{ who: "kim", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="THE RECORD" items={[{ text: "WHO OWNS IT" }, { text: "WHAT WE MEASURE" }, { text: "WHEN WE STOP" }]} /></Duo>),
};
