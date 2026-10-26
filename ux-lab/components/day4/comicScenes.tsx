import type { ReactNode } from "react";
import { Board, Chip, LOOK, Mark, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 4 comics (data/day4/comics.ts, DL-STANDARD.md section 13). People: Nina and Sam (riders of Pedalo, a made-up bike-sharing app), Yusuf
 * (its UX lead) and Clara (its product owner). Every label is a short capital word.
 */
LOOK.nina = { hair: "#C9A25A", shirt: "#D9534F", long: true };
LOOK.sam = { hair: "#1F1F24", shirt: "#3D7BD9", skin: "#8A5A3A" };
LOOK.yusuf = { hair: "#2B2B2B", shirt: "#2E9E6B", glasses: true, skin: "#B07A50" };
LOOK.clara = { hair: "#9B4A1E", shirt: "#7A4DE8", long: true };

const ACC = "#1D6F42";
const NEU = "#E4E8EE";

/** A phone in the middle of the panel with a title bar. */
function Phone({ title = "PEDALO", children }: { title?: string; children?: ReactNode }) {
  return (
    <Board x={56} y={2} w={48} h={64}>
      <rect x={56} y={2} width={48} height={6} fill={ACC} />
      <Txt x={80} y={6.6} size={3.2} anchor="middle" c="#FFFFFF">
        {title}
      </Txt>
      {children}
    </Board>
  );
}

function Btn({ x, y, w, h = 6, label, strong }: { x: number; y: number; w: number; h?: number; label: string; strong?: boolean }) {
  return (
    <g>
      <Chip x={x} y={y} w={w} h={h} c={strong ? ACC : NEU} />
      <Txt x={x + w / 2} y={y + h / 2 + 1.3} size={2.6} anchor="middle" c={strong ? "#FFFFFF" : "#1B1B1F"}>
        {label}
      </Txt>
    </g>
  );
}

function Icons() {
  return (
    <Phone>
      <rect x={58} y={10} width={44} height={36} fill="#E8EDF2" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={59 + i * 11} y={52} width={8} height={8} fill={NEU} />)}
      {["O", "=", "*", "^"].map((g, i) => <Txt key={g} x={63 + i * 11} y={57.6} size={3} anchor="middle">{g}</Txt>)}
    </Phone>
  );
}

function ScanBtn() {
  return (
    <Phone>
      <rect x={58} y={10} width={44} height={30} fill="#E8EDF2" />
      <Txt x={59} y={45} size={2.4}>NEAREST: MARKET SQ.</Txt>
      <Btn x={58} y={49} w={44} h={8} label="SCAN TO UNLOCK" strong />
    </Phone>
  );
}

function Passes({ few }: { few: boolean }) {
  return (
    <Phone title="PASSES">
      {few
        ? ["SINGLE RIDE", "DAY PASS", "MONTH PASS"].map((p, i) => <Btn key={p} x={58} y={11 + i * 12} w={44} h={9} label={p} strong={i === 0} />)
        : Array.from({ length: 12 }, (_, i) => <Btn key={i} x={58 + (i % 3) * 15} y={11 + Math.floor(i / 3) * 12} w={13} h={9} label={["1", "D", "W", "M", "ST", "SE", "CO", "FA", "NI", "TO", "FL", "WE"][i]} />)}
      {few && <Txt x={80} y={52} size={2.6} anchor="middle" c={ACC}>ALL PASSES ›</Txt>}
    </Phone>
  );
}

function Ride({ good }: { good: boolean }) {
  return (
    <Phone title="RIDING">
      <rect x={58} y={good ? 10 : 18} width={44} height={28} fill="#E8EDF2" />
      <Txt x={80} y={good ? 27 : 35} size={4} anchor="middle">12:04</Txt>
      {good ? <Btn x={58} y={52} w={44} h={10} label="END RIDE" strong /> : <Txt x={101} y={13.5} size={2.2} anchor="end" c="#888888">finish</Txt>}
      {!good && <rect x={60} y={44} width={8} height={8} fill="#D9534F" />}
    </Phone>
  );
}

function Code({ carried }: { carried: boolean }) {
  return (
    <Phone title="UNLOCK · 2">
      <Txt x={59} y={16} size={2.8}>BIKE CODE</Txt>
      <rect x={58} y={19} width={44} height={8} fill="#FFFFFF" stroke="#9AA5B5" strokeWidth={0.6} />
      <Txt x={60} y={24.5} size={3} c={carried ? "#1B1B1F" : "#9AA5B5"}>{carried ? "B7K 2Q9" : "_ _ _ _ _ _"}</Txt>
      {carried && <Txt x={59} y={32} size={2.4} c={ACC}>FROM YOUR SCAN</Txt>}
      <Btn x={58} y={52} w={44} h={8} label={carried ? "CONFIRM" : "UNLOCK"} strong />
    </Phone>
  );
}

function Features({ added }: { added: boolean }) {
  return (
    <Board x={30} y={6} w={100} h={56}>
      <Txt x={80} y={13} size={3.4} anchor="middle" c="#556274">{added ? "WE ADDED" : "WE REMOVED"}</Txt>
      {(added ? ["PASS QUIZ", "HELP VIDEO", "RESUME RIDE"] : ["11 EQUAL PASSES", "TYPING THE CODE", "TINY END BUTTON"]).map((f, i) => (
        <g key={f}>
          <Chip x={40} y={18 + i * 11} w={80} h={8} c={added ? "#F6C9B8" : "#B5E3C8"} />
          <Txt x={80} y={23.5 + i * 11} size={3} anchor="middle">{f}</Txt>
        </g>
      ))}
      <Txt x={80} y={57} size={3} anchor="middle" c="#556274">{added ? "MORE OPTIONS, SAME CALLS" : "FEWER STEPS, FEWER CALLS"}</Txt>
    </Board>
  );
}

function Matrix() {
  return (
    <Board x={36} y={4} w={88} h={60}>
      <line x1={46} y1={56} x2={118} y2={56} stroke="#1B1B1F" strokeWidth={0.8} />
      <line x1={46} y1={10} x2={46} y2={56} stroke="#1B1B1F" strokeWidth={0.8} />
      <Txt x={82} y={62} size={2.8} anchor="middle" c="#556274">FUNCTIONS SHOWN →</Txt>
      <Txt x={40} y={34} size={2.8} anchor="middle" c="#556274">EASY</Txt>
      <rect x={80} y={12} width={28} height={18} fill="#B5E3C8" />
      <Txt x={94} y={22.5} size={3} anchor="middle">THE AIM</Txt>
      {[[112, 46, "A"], [94, 16, "B"], [52, 32, "C"], [100, 34, "D"]].map(([x, y, l]) => (
        <g key={l as string}>
          <rect x={(x as number) - 2.5} y={(y as number) - 2.5} width={5} height={5} fill={ACC} />
          <Txt x={(x as number) + 4} y={(y as number) + 1.5} size={2.8}>{l as string}</Txt>
        </g>
      ))}
    </Board>
  );
}

const S = (s: string) => tt(s);

export const ART_D4: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={S("Nina opens Pedalo: a map and four round icons without labels")} left={{ who: "nina", face: "think" }}>
      <Icons />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a1-2": (
    <Duo label={S("She taps the star, then the lines, and still has no bike")} left={{ who: "nina", face: "worried" }}>
      <Icons />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "a1-3": (
    <Duo label={S("With one labelled Scan to unlock button and the nearest bike named, she rides off")} left={{ who: "nina", face: "happy", pose: "up" }}>
      <ScanBtn />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a1-4": (
    <Duo label={S("The rule: intuitive use is designed for perception, attention, memory and action")} left={{ who: "yusuf", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="FOUR STEPS" items={[{ icon: "eye", text: "PERCEIVE, ATTEND" }, { icon: "book", text: "REMEMBER" }, { icon: "play", text: "ACT, SEE IT WORKED" }]} sub="SIMPLE-LOOKING IS NOT INTUITIVE" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={S("Sam wants one ride and finds twelve equal passes")} left={{ who: "sam", face: "worried" }}>
      <Passes few={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a2-2": (
    <Duo label={S("Yusuf names the law: more equal options, longer decisions")} left={{ who: "yusuf", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="HICK'S LAW" items={[{ icon: "up", text: "MORE EQUAL OPTIONS" }, { icon: "clock", text: "LONGER DECISIONS" }, { icon: "warn", text: "WORST IF ALL LOOK ALIKE" }]} />
    </Duo>
  ),
  "a2-3": (
    <Duo label={S("Three recommended passes and All passes below: Sam chooses at once")} left={{ who: "sam", face: "happy", pose: "up" }}>
      <Passes few />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a2-4": (
    <Duo label={S("The rule: frequent choices first, the rest one step deeper; delete nothing")} left={{ who: "yusuf", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="FEWER EQUAL CHOICES" items={[{ tick: true, text: "FREQUENT ONES FIRST" }, { tick: true, text: "THE REST GROUPED" }, { cross: true, text: "NOT: DELETE FUNCTIONS" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={S("Nina wants to end her ride; there is only a faint word in a corner and a red Stop button")} left={{ who: "nina", face: "worried" }}>
      <Ride good={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a3-2": (
    <Duo label={S("She presses Stop, which only pauses the ride")} left={{ who: "nina", face: "surprised" }}>
      <Ride good={false} />
      <Mark x={9} y={34} kind="bang" />
    </Duo>
  ),
  "a3-3": (
    <Duo label={S("A large End ride button at the bottom, like on every other screen: she ends it first time")} left={{ who: "nina", face: "happy", pose: "up" }}>
      <Ride good />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a3-4": (
    <Duo label={S("The rule: where people expect it, large and close, the same everywhere")} left={{ who: "yusuf", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="EXPECTATIONS" items={[{ icon: "eye", text: "WHERE PEOPLE LOOK" }, { icon: "play", text: "FITTS: LARGE AND CLOSE" }, { icon: "gear", text: "SAME PATTERN EVERYWHERE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={S("Sam must type the bike code he saw on the previous screen")} left={{ who: "sam", face: "think" }}>
      <Code carried={false} />
    </Duo>
  ),
  "a4-2": (
    <Duo label={S("He mistypes one character, gets an error and starts again")} left={{ who: "sam", face: "sad" }}>
      <Code carried={false} />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "a4-3": (
    <Duo label={S("The code comes from the scan; Sam only confirms")} left={{ who: "sam", face: "happy", pose: "up" }}>
      <Code carried />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a4-4": (
    <Duo label={S("The rule: working memory is small; let the system remember")} left={{ who: "yusuf", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="MILLER'S RULE" items={[{ icon: "book", text: "A FEW THINGS AT ONCE" }, { icon: "warn", text: "LOAD: ERRORS, QUITTING" }, { icon: "check", text: "THE SYSTEM REMEMBERS" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={S("Clara, the product owner, has three fixes and time for one first")} left={{ who: "clara", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="THREE FIXES" items={[{ icon: "up", text: "THREE PASSES FIRST" }, { icon: "book", text: "CARRY THE CODE" }, { icon: "play", text: "BIG END BUTTON" }]} />
    </Duo>
  ),
  "a5-2": (
    <Duo label={S("Yusuf weighs the passes: high effect, easy, some risk, quick")} left={{ who: "yusuf", face: "think" }}>
      <Rate x={40} y={6} w={112} title="THREE PASSES FIRST" rows={[["EFFECT", 3, "HIGH"], ["FEASIBLE", 3, "HIGH"], ["RISK", 2, "MID"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={S("Carrying the code helps every unlock but needs the developers for weeks")} left={{ who: "clara", face: "think" }}>
      <Rate x={40} y={6} w={112} title="CARRY THE CODE" rows={[["EFFECT", 3, "HIGH"], ["FEASIBLE", 2, "MID"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={S("The rule: each law points to a fix; weigh every fix with a reason")} left={{ who: "yusuf", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="WEIGH A MEASURE" items={[{ tick: true, text: "EFFECT ON USERS" }, { tick: true, text: "FEASIBILITY, RISK" }, { tick: true, text: "TIME PRESSURE" }]} sub="THE REASON COUNTS" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={S("Clara's last quarter: three new features, and support as busy as before")} left={{ who: "clara", face: "worried" }}>
      <Features added />
    </Duo>
  ),
  "b1-2": (
    <Duo label={S("Yusuf: every new feature is also a new option and a new place to look")} left={{ who: "yusuf", face: "think" }}>
      <Notes x={40} y={6} w={112} title="A NEW FEATURE IS" items={[{ text: "A NEW OPTION" }, { text: "A NEW WORD" }, { text: "A NEW PLACE TO LOOK" }]} sub="MORE LOAD, NOT LESS" />
    </Duo>
  ),
  "b1-3": (
    <Duo label={S("This quarter they removed friction instead, and the calls dropped")} left={{ who: "clara", face: "happy", pose: "up" }}>
      <Features added={false} />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "b1-4": (
    <Duo label={S("The rule: reduce friction in the whole system before adding functions")} left={{ who: "yusuf", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="USABILITY FIRST" items={[{ icon: "eye", text: "THE SCREEN" }, { icon: "play", text: "THE PROCESS" }, { icon: "gear", text: "THE PRIORITIES" }]} sub="WHAT IS DONE FIRST" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Duo label={S("The sales team wants every pass on the start screen; Nina just wants a bike")} left={{ who: "clara", face: "happy", pose: "point" }} right={{ who: "nina", face: "worried" }}>
      <Notes x={34} y={6} w={92} title="TWO GOALS" items={[{ icon: "up", text: "SHOW EVERYTHING" }, { icon: "play", text: "JUST RIDE" }]} />
    </Duo>
  ),
  "b2-2": (
    <Duo label={S("On the matrix, showing every function is not the same as finishing the task")} left={{ who: "yusuf", face: "think" }}>
      <Matrix />
    </Duo>
  ),
  "b2-3": (
    <Duo label={S("Yusuf keeps every function, frequent tasks first, the rest one step deeper")} left={{ who: "yusuf", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="WE CHOOSE B" items={[{ tick: true, text: "FREQUENT TASKS FIRST" }, { tick: true, text: "ALL FUNCTIONS BELOW" }, { cross: true, text: "GIVE UP: ALL ON TOP" }]} />
    </Duo>
  ),
  "b2-4": (
    <Duo label={S("The rule: name the conflict, choose, and say what you give up")} left={{ who: "yusuf", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="FOUR CONFLICTS" items={[{ text: "SCOPE VS SIMPLE" }, { text: "COMPLETE VS FAST" }, { text: "NEW VS EXPERT" }, { text: "IDEAL VS TIME" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={S("Clara: the app records crashes, not where riders give up; should we wait?")} left={{ who: "clara", face: "worried" }}>
      <Notes x={40} y={6} w={112} title="WE DO NOT KNOW" items={[{ icon: "ask", text: "WHERE THEY GIVE UP" }, { icon: "clock", text: "WAIT FOR DATA?" }]} />
    </Duo>
  ),
  "b3-2": (
    <Duo label={S("Yusuf decides to pause new features and fix two processes, and says when he would reverse it")} left={{ who: "yusuf", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="A DECISION" items={[{ tick: true, text: "WE DECIDE" }, { icon: "ask", text: "WE DO NOT KNOW" }, { icon: "clock", text: "WE REVERSE IF" }]} sub="AND WHAT WE GIVE UP" />
    </Duo>
  ),
  "b3-3": (
    <Duo label={S("Who owns the interaction logic: UX owns the order and the steps, teams own their content")} left={{ who: "yusuf", face: "neutral" }} right={{ who: "clara", face: "happy" }}>
      <Notes x={34} y={6} w={92} title="WHO OWNS IT" items={[{ text: "UX: ORDER AND STEPS" }, { text: "TEAMS: CONTENT" }, { text: "FREQUENCY DECIDES" }]} />
    </Duo>
  ),
  "b3-4": (
    <Duo label={S("The rule: someone owns the interaction logic, and a decision says when it is checked")} left={{ who: "yusuf", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="ACCOUNTABLE" items={[{ tick: true, text: "ONE OWNER OF THE LOGIC" }, { tick: true, text: "FREQUENCY AND SUPPORT" }, { tick: true, text: "DECIDE, THEN CHECK" }]} />
    </Duo>
  ),
};
