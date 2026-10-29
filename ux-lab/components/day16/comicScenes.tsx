import type { ReactNode } from "react";
import { Board, LOOK, Mark, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 16 comics (data/day16/comics.ts, DL-STANDARD.md section 13). People: Leila and Sam (guests of Fernwood, a made-up hotel chain),
 * Rafael (its UX lead) and Greta (its product owner). Every label is a short capital word.
 */
LOOK.leila = { hair: "#1F1410", shirt: "#0E7490", long: true, skin: "#B07A55" };
LOOK.sam = { hair: "#9CA3AF", shirt: "#4B5563", glasses: true };
LOOK.rafael = { hair: "#2A1C12", shirt: "#7C2D12", skin: "#D6A27A" };
LOOK.greta = { hair: "#E5C07B", shirt: "#1D4ED8", long: true };

const ACC = "#7C2D12";
const NEU = "#EDE6DD";

function Screen({ title = "FERNWOOD · AR", children }: { title?: string; children?: ReactNode }) {
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
const Hall = ({ dark, arrow = true, crowd }: { dark?: boolean; arrow?: boolean; crowd?: boolean }) => (
  <Screen>
    <rect x={42} y={12} width={76} height={50} fill={dark ? "#3F3A36" : NEU} />
    <polygon points="64,62 72,40 88,40 96,62" fill={dark ? "#2F2A26" : "#B9A58E"} />
    {arrow && <polygon points="78,58 82,58 82,50 86,50 80,44 74,50 78,50" fill="#22C55E" />}
    {crowd && [60, 70, 90, 100].map((x) => <rect key={x} x={x} y={36} width={6} height={16} fill="#3B3430" />)}
    <Txt x={44} y={18} size={2.4} c={dark ? "#D6D3D1" : "#44403C"}>ROOM 216</Txt>
  </Screen>
);
const Ladder = () => (
  <Screen title="THE LADDER">
    {["SCALE", "PILOT", "PROTOTYPE", "CONCEPT"].map((t, i) => (
      <g key={t}>
        <rect x={56} y={14 + i * 12} width={48} height={8} fill={i === 2 ? "#FDE68A" : NEU} />
        <Txt x={80} y={19.5 + i * 12} size={2.4} anchor="middle">{t}</Txt>
      </g>
    ))}
  </Screen>
);
const Lobby = () => (
  <Screen title="LOBBY CAMERA">
    <circle cx={80} cy={30} r={10} fill="#FFFFFF" stroke="#1B1B1F" strokeWidth={0.8} />
    <circle cx={80} cy={30} r={4} fill="#1B1B1F" />
    <Txt x={46} y={52} size={2.4} c="#B42318">GUEST 12: STRESSED → SPA OFFER</Txt>
  </Screen>
);
const BoardFour = () => (
  <Screen title="PORTFOLIO">
    {["SCALE", "TEST", "PAUSE", "STOP"].map((t, i) => (
      <g key={t}>
        <rect x={42 + i * 19.5} y={14} width={18} height={44} fill={i === 3 ? "#FDE2E2" : i === 0 ? "#DCFCE7" : NEU} />
        <Txt x={51 + i * 19.5} y={19} size={2} anchor="middle">{t}</Txt>
      </g>
    ))}
  </Screen>
);
const Wiki = () => (
  <Screen title="INNOVATION WIKI">
    {[16, 24, 32, 40, 48].map((y, i) => (
      <g key={y}>
        <Txt x={44} y={y} size={2.4}>{`PROJECT ${i + 1}`}</Txt>
        <Txt x={86} y={y} size={2.2} c="#556274">RUNNING</Txt>
      </g>
    ))}
  </Screen>
);
const Slider = ({ n }: { n: number }) => (
  <Screen title="ACTIVE LINES">
    {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={46 + i * 14} y={30} width={12} height={8} fill={i < n ? "#F59E0B" : NEU} />)}
    <Txt x={80} y={50} size={2.6} anchor="middle">{`${n} LINES`}</Txt>
  </Screen>
);

const S = (s: string) => tt(s);

export const ART_D16: Record<string, ReactNode> = {
  "a1-1": (<Duo label={S("Greta sees the demo in an empty corridor")} left={{ who: "greta", face: "happy", pose: "point" }}><Hall /></Duo>),
  "a1-2": (<Duo label={S("Rafael draws the ladder")} left={{ who: "rafael", face: "think" }}><Ladder /></Duo>),
  "a1-3": (<Duo label={S("Leila in the pilot hotel: the arrow froze")} left={{ who: "leila", face: "worried" }}><Hall arrow={false} /><Mark x={9} y={34} kind="ask" /></Duo>),
  "a1-4": (<Duo label={S("The rule: a gate before every rung")} left={{ who: "rafael", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="THE GATES" items={[{ text: "CONCEPT → PROTOTYPE" }, { text: "PROTOTYPE → PILOT" }, { text: "PILOT → SCALE" }]} /></Duo>),
  "a2-1": (<Duo label={S("Tested at 10 am")} left={{ who: "greta", face: "happy" }}><Hall /><Tick x={9} y={34} /></Duo>),
  "a2-2": (<Duo label={S("Friday 11 pm: crowd, dim light, weak signal")} left={{ who: "sam", face: "surprised" }}><Hall dark crowd arrow={false} /><Mark x={9} y={34} kind="ask" /></Duo>),
  "a2-3": (<Duo label={S("Rafael lists six test aspects")} left={{ who: "rafael", face: "think" }}><Notes x={40} y={6} w={112} title="SIX ASPECTS" items={[{ text: "ORIENTATION · PRESENCE" }, { text: "OVERLOAD · ERRORS" }, { text: "ACCEPTANCE · TRANSFER" }]} /></Duo>),
  "a2-4": (<Duo label={S("The rule: test transfer")} left={{ who: "rafael", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="TEST FOR REAL" items={[{ icon: "warn", text: "CROWDS" }, { icon: "warn", text: "DARK" }, { icon: "warn", text: "NO SIGNAL" }]} /></Duo>),
  "a3-1": (<Duo label={S("Greta wants mood-based offers")} left={{ who: "greta", face: "happy", pose: "point" }}><Lobby /></Duo>),
  "a3-2": (<Duo label={S("Rafael asks seven questions")} left={{ who: "rafael", face: "think" }}><Notes x={40} y={6} w={112} title="SEVEN QUESTIONS" items={[{ icon: "lock", text: "DATA · CONSENT" }, { icon: "warn", text: "MANIPULATION" }, { icon: "eye", text: "ACCESS · INCLUSION" }]} /></Duo>),
  "a3-3": (<Duo label={S("Leila finds out")} left={{ who: "leila", face: "sad" }}><Lobby /><Mark x={9} y={34} kind="bang" /></Duo>),
  "a3-4": (<Duo label={S("The rule: should we, for whom, and how")} left={{ who: "rafael", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="BEFORE BUILDING" items={[{ icon: "ask", text: "SHOULD WE?" }, { icon: "ask", text: "FOR WHOM?" }, { icon: "ask", text: "HOW?" }]} /></Duo>),
  "a4-1": (<Duo label={S("Five initiatives, all important")} left={{ who: "greta", face: "worried" }}><Wiki /></Duo>),
  "a4-2": (<Duo label={S("Three tests of each")} left={{ who: "rafael", face: "think" }}><Notes x={40} y={6} w={112} title="THREE TESTS" items={[{ tick: true, text: "RESPONSIBLE" }, { tick: true, text: "CONNECTABLE" }, { tick: true, text: "GOVERNABLE" }]} /></Duo>),
  "a4-3": (<Duo label={S("Four columns")} left={{ who: "greta", face: "think" }}><BoardFour /></Duo>),
  "a4-4": (<Duo label={S("The rule: decide well, bet bolder")} left={{ who: "rafael", face: "happy", pose: "up" }}><BoardFour /></Duo>),
  "a5-1": (<Duo label={S("Greta wants the minibar everywhere")} left={{ who: "greta", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="AR MINIBAR" items={[{ text: "OPENED: ONCE" }, { text: "AGAIN: RARELY" }]} /></Duo>),
  "a5-2": (<Duo label={S("Rafael ticks three signs")} left={{ who: "rafael", face: "neutral" }}><Notes x={40} y={6} w={112} title="NOT YET" items={[{ tick: true, text: "RARELY USED AGAIN" }, { tick: true, text: "NOBODY MAINTAINS IT" }, { tick: true, text: "NOT TESTED FOR REAL" }]} /></Duo>),
  "a5-3": (<Duo label={S("They weigh three measures")} left={{ who: "greta", face: "neutral" }} right={{ who: "rafael", face: "happy" }}><Notes x={40} y={6} w={80} title="WEIGH IT" items={[{ text: "EFFECT" }, { text: "RISK · TIME" }, { text: "STRATEGY" }]} /></Duo>),
  "a5-4": (<Duo label={S("The rule: not scaling is a decision")} left={{ who: "rafael", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="A DECISION" items={[{ icon: "clock", text: "PAUSE" }, { cross: true, text: "STOP" }]} sub="WITH A REASON" /></Duo>),
  "b1-1": (<Duo label={S("Five projects, nothing stopped")} left={{ who: "greta", face: "worried" }}><Wiki /><Mark x={9} y={34} kind="ask" /></Duo>),
  "b1-2": (<Duo label={S("Rafael writes the vision")} left={{ who: "rafael", face: "think" }}><Notes x={40} y={6} w={112} title="THE VISION" items={[{ icon: "heart", text: "HELPFUL" }, { icon: "check", text: "PROVEN" }, { icon: "check", text: "FAIR" }]} /></Duo>),
  "b1-3": (<Duo label={S("Grid, gates and review")} left={{ who: "greta", face: "happy", pose: "point" }}><BoardFour /></Duo>),
  "b1-4": (<Duo label={S("The rule: experiments end in decisions")} left={{ who: "rafael", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="THE LAYERS" items={[{ text: "VISION" }, { text: "GRID · GATES" }, { text: "PORTFOLIO" }, { text: "PILOTS" }]} /></Duo>),
  "b2-1": (<Duo label={S("The board wants five lines")} left={{ who: "greta", face: "happy", pose: "point" }} right={{ who: "rafael", face: "worried" }}><Slider n={5} /></Duo>),
  "b2-2": (<Duo label={S("Three lines")} left={{ who: "rafael", face: "think" }}><Slider n={3} /></Duo>),
  "b2-3": (<Duo label={S("What each line assumes")} left={{ who: "greta", face: "think" }}><Notes x={40} y={6} w={112} title="WE ASSUME" items={[{ icon: "ask", text: "IT WORKS AT SCALE?" }, { icon: "ask", text: "GUESTS USE IT AGAIN?" }, { icon: "ask", text: "SOMEONE DECIDES?" }]} /></Duo>),
  "b2-4": (<Duo label={S("The rule: say which conflicts we accept")} left={{ who: "rafael", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="WE ACCEPT" items={[{ tick: true, text: "LESS VISIBILITY" }, { tick: true, text: "MORE LEARNING" }]} /></Duo>),
  "b3-1": (<Duo label={S("Nobody may stop the screens")} left={{ who: "greta", face: "worried" }}><Lobby /><Mark x={9} y={34} kind="sweat" /></Duo>),
  "b3-2": (<Duo label={S("Four roles")} left={{ who: "rafael", face: "happy", pose: "point" }}><Notes x={40} y={6} w={112} title="FOUR ROLES" items={[{ text: "EVALUATES" }, { text: "APPROVES" }, { text: "DECIDES" }, { text: "REVIEWS" }]} /></Duo>),
  "b3-3": (<Duo label={S("Rafael decides with incomplete data")} left={{ who: "rafael", face: "neutral" }}><Notes x={40} y={6} w={112} title="A DECISION" items={[{ tick: true, text: "WE DECIDE" }, { icon: "ask", text: "WE DO NOT KNOW" }, { icon: "clock", text: "WE STOP IF" }]} sub="AND WHAT WE GIVE UP" /></Duo>),
  "b3-4": (<Duo label={S("The rule: write the record before anyone asks")} left={{ who: "rafael", face: "happy", pose: "up" }}><Notes x={40} y={6} w={112} title="THE RECORD" items={[{ text: "SCALED" }, { text: "PAUSED" }, { text: "STOPPED" }]} sub="AND WHY" /><Tick x={9} y={34} /></Duo>),
};
