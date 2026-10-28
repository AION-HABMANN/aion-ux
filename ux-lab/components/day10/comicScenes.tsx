import type { ReactNode } from "react";
import { Board, Chip, LOOK, Mark, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 10 comics (data/day10/comics.ts, DL-STANDARD.md section 13). People: Ilka and Mats (passengers of Northline Rail, a made-up rail
 * company), Saskia (its UX designer) and Bram (its product owner). Every label is a short capital word.
 */
LOOK.ilka = { hair: "#B5651D", shirt: "#2F6F8F", long: true };
LOOK.mats = { hair: "#3A2A1E", shirt: "#5E7D3A", glasses: true };
LOOK.saskia = { hair: "#1C1C20", shirt: "#7A1E3A", long: true, skin: "#C08A5B" };
LOOK.bram = { hair: "#D2B378", shirt: "#4D5866" };

const ACC = "#7A1E3A";
const NEU = "#E8E2E5";
const WARN = "#FFF1D6";

function App({ title = "NORTHLINE", bar = ACC, children }: { title?: string; bar?: string; children?: ReactNode }) {
  return (
    <Board x={40} y={4} w={80} h={60}>
      <rect x={40} y={4} width={80} height={6} fill={bar} />
      <Txt x={80} y={8.6} size={3.2} anchor="middle" c="#FFFFFF">
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
      <Txt x={x + w / 2} y={y + h / 2 + 1.2} size={2.6} anchor="middle" c={strong ? "#FFFFFF" : "#1B1B1F"}>
        {label}
      </Txt>
    </g>
  );
}

/** A coloured message box with up to three short lines. */
function Msg({ y, lines, bg = WARN, h }: { y: number; lines: string[]; bg?: string; h?: number }) {
  return (
    <g>
      <rect x={42} y={y} width={76} height={h ?? 4 + lines.length * 5} fill={bg} />
      {lines.map((l, i) => (
        <Txt key={l} x={44} y={y + 5 + i * 5} size={2.6}>
          {l}
        </Txt>
      ))}
    </g>
  );
}

function RuleMsg() {
  return (
    <App>
      <Msg y={14} lines={["TRAIN 412 DELAYED", "+20 MIN. WE APOLOGISE."]} />
      <Txt x={44} y={36} size={2.4} c="#556274">SENT TO EVERYONE</Txt>
    </App>
  );
}

function NextTrain() {
  return (
    <App>
      <Txt x={44} y={15} size={2.4} c={ACC}>YOU: PLATFORM 4</Txt>
      <Msg y={18} lines={["CONNECTION MISSED", "NEXT: 8:12, PLATFORM 6"]} />
      <Btn x={43} y={44} w={56} h={7} label="WAY TO PLATFORM 6" strong />
    </App>
  );
}

function Departures() {
  return (
    <App>
      <Txt x={44} y={15} size={2.4} c={ACC}>HANNOVER · 18:05</Txt>
      <Txt x={44} y={23} size={2.6}>18:11 BERLIN</Txt>
      <Txt x={44} y={30} size={2.6}>18:19 HAMBURG</Txt>
      <Txt x={44} y={37} size={2.6}>18:26 BREMEN</Txt>
    </App>
  );
}

function OldTrip() {
  return (
    <App>
      <Txt x={44} y={15} size={2.4} c={ACC}>YOUR FRIDAY TRIP</Txt>
      <Msg y={18} bg={NEU} lines={["HANNOVER → HAMBURG", "18:19 · AS USUAL"]} />
      <Btn x={43} y={44} w={40} h={7} label="BOOK AGAIN" strong />
    </App>
  );
}

function Voice() {
  return (
    <App title="NORTHLINE · VOICE">
      <rect x={70} y={14} width={46} height={8} fill={NEU} />
      <Txt x={72} y={19.4} size={2.5}>"BREMEN, 8:19"</Txt>
      <rect x={44} y={26} width={60} height={13} fill="#FFFFFF" stroke="#C9C1C5" strokeWidth={0.5} />
      <Txt x={46} y={31.4} size={2.4}>BREMEN 8:19.</Txt>
      <Txt x={46} y={36.4} size={2.4}>DID I GET THAT RIGHT?</Txt>
    </App>
  );
}

function Fits() {
  return (
    <App>
      <Msg y={14} bg="#EAF6EF" lines={["YOUR 7:42 IS 10 MIN LATE", "CONNECTION SAFE"]} />
      <Tick x={110} y={42} />
    </App>
  );
}

function TooMuch() {
  return (
    <App>
      <Msg y={14} bg="#FFE1E1" lines={["RUNNING LATE AGAIN, ILKA?", "3RD TIME THIS WEEK.", "GYM 18:30 LOOKS TIGHT."]} />
    </App>
  );
}

function Rebooked({ why, change }: { why?: boolean; change?: boolean }) {
  return (
    <App>
      <Msg y={13} bg="#EAF6EF" lines={["REBOOKED: 8:12"]} />
      {why && <Msg y={24} bg="#F3E9ED" lines={["WHY: 7:42 CANCELLED"]} />}
      {change && (
        <>
          <Btn x={43} y={36} w={34} label="8:42 INSTEAD" />
          <Btn x={80} y={36} w={36} label="UNDO" strong />
        </>
      )}
    </App>
  );
}

function Holiday() {
  return (
    <App>
      <Txt x={44} y={15} size={2.4} c={ACC}>TUESDAY · AUGUST</Txt>
      <Msg y={18} bg="#EEF4FF" lines={["WE PICKED YOUR", "USUAL 7:42 FOR YOU"]} />
      <Btn x={43} y={44} w={40} h={7} label="TAKE IT" strong />
    </App>
  );
}

function Many() {
  return (
    <App>
      <Msg y={13} bg="#FFE1E1" lines={["TRY FIRST CLASS!"]} />
      <Msg y={24} bg="#EEF4FF" lines={["AI PICK: LOUNGE PASS"]} />
      <Msg y={35} bg={WARN} lines={["SMART TIP: BIKE"]} />
      <Txt x={44} y={52} size={2.4} c="#556274">WHY? NOBODY KNOWS</Txt>
    </App>
  );
}

function Pattern() {
  return (
    <App>
      <Txt x={44} y={16} size={2.6}>8:12 → BREMEN</Txt>
      <Msg y={19} bg="#F3E9ED" lines={["BECAUSE 7:42 IS LATE"]} />
      <Btn x={43} y={32} w={34} label="NOT FOR ME" />
      <Btn x={80} y={32} w={36} label="UNDO" />
    </App>
  );
}

const S = (s: string) => tt(s);

export const ART_D10: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={S("Bram brings the board's wish: make the app intelligent")} left={{ who: "bram", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="THE WISH" items={[{ icon: "idea", text: "MAKE IT SMART" }, { icon: "ask", text: "SMART HOW?" }]} />
    </Duo>
  ),
  "a1-2": (
    <Duo label={S("A fixed rule sends Ilka the same delay message as everyone")} left={{ who: "ilka", face: "worried" }}>
      <RuleMsg />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a1-3": (
    <Duo label={S("The adaptive version knows where Ilka is and shows her next train")} left={{ who: "ilka", face: "happy", pose: "up" }}>
      <NextTrain />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a1-4": (
    <Duo label={S("The rule: ask which kind of system before asking for AI")} left={{ who: "saskia", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="WHICH KIND?" items={[{ icon: "gear", text: "A RULE" }, { icon: "eye", text: "THE SITUATION" }, { icon: "book", text: "LEARNING" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={S("At the station Mats sees the departures from there")} left={{ who: "mats", face: "happy" }}>
      <Departures />
    </Duo>
  ),
  "a2-2": (
    <Duo label={S("The app offers his old Friday trip; he moved last month")} left={{ who: "mats", face: "surprised" }}>
      <OldTrip />
      <Mark x={9} y={34} kind="bang" />
    </Duo>
  ),
  "a2-3": (
    <Duo label={S("The voice assistant says back what it understood")} left={{ who: "mats", face: "happy", pose: "up" }}>
      <Voice />
    </Duo>
  ),
  "a2-4": (
    <Duo label={S("The rule: context first, personal data only where context is not enough")} left={{ who: "saskia", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="THREE WAYS" items={[{ tick: true, text: "CONTEXT: FIRST" }, { icon: "warn", text: "PERSONAL: IF NEEDED" }, { icon: "check", text: "VOICE: SAY IT BACK" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={S("A message that fits the trip saves Ilka checking")} left={{ who: "ilka", face: "happy" }}>
      <Fits />
    </Duo>
  ),
  "a3-2": (
    <Duo label={S("Bram wants to add more and more about Ilka")} left={{ who: "bram", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="ADD MORE" items={[{ icon: "chart", text: "HER LATE STARTS" }, { icon: "heart", text: "HER GYM CLASS" }, { icon: "eye", text: "HER SEAT" }]} />
    </Duo>
  ),
  "a3-3": (
    <Duo label={S("Ilka reads a message that knows too much")} left={{ who: "ilka", face: "worried" }}>
      <TooMuch />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "a3-4": (
    <Duo label={S("The rule: fit the trip, not the person's whole life")} left={{ who: "saskia", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="GAINS · RISKS" items={[{ tick: true, text: "RELEVANCE · TIME" }, { cross: true, text: "OPACITY · NO CONTROL" }, { cross: true, text: "TOO PERSONAL · TRUST" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={S("The app rebooked Ilka and says only that")} left={{ who: "ilka", face: "worried" }}>
      <Rebooked />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a4-2": (
    <Duo label={S("Saskia adds the reason; Ilka understands")} left={{ who: "ilka", face: "think" }}>
      <Rebooked why />
    </Duo>
  ),
  "a4-3": (
    <Duo label={S("Ilka chooses another train and could undo it all")} left={{ who: "ilka", face: "happy", pose: "up" }}>
      <Rebooked why change />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a4-4": (
    <Duo label={S("The rule: why, change, undo")} left={{ who: "saskia", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="THREE QUESTIONS" items={[{ icon: "ask", text: "WHY?" }, { icon: "pencil", text: "CHANGE?" }, { icon: "down", text: "UNDO?" }]} sub="THREE NO'S: IT DOESN'T SHIP" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={S("On holiday, the app picks Ilka's commuter train")} left={{ who: "ilka", face: "surprised" }}>
      <Holiday />
      <Mark x={9} y={34} kind="bang" />
    </Duo>
  ),
  "a5-2": (
    <Duo label={S("Saskia traces the mistake back to the data")} left={{ who: "saskia", face: "think" }}>
      <Notes x={40} y={6} w={112} title="THE CHAIN" items={[{ icon: "book", text: "DATA: NO HOLIDAYS" }, { icon: "eye", text: "SITUATION: MISREAD" }, { cross: true, text: "SUGGESTION: WRONG" }]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={S("The team weighs three measures on four questions")} left={{ who: "bram", face: "happy" }} right={{ who: "saskia", face: "neutral" }}>
      <Notes x={40} y={6} w={80} title="WEIGH IT" items={[{ text: "EFFECT" }, { text: "FEASIBLE" }, { text: "RISK" }, { text: "TIME" }]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={S("The rule: robust cases first, with a reason")} left={{ who: "saskia", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="FIRST" items={[{ tick: true, text: "REASONS + NOT FOR ME" }, { icon: "clock", text: "PERSONAL BOARD: LATER" }, { cross: true, text: "CHATBOT: NOT NOW" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={S("Three AI features; nobody can say why Mats sees them")} left={{ who: "mats", face: "worried" }}>
      <Many />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "b1-2": (
    <Duo label={S("Saskia drafts the guiding vision")} left={{ who: "saskia", face: "think" }}>
      <Notes x={40} y={6} w={112} title="THE VISION" items={[{ icon: "up", text: "HELP: NEXT GOOD STEP" }, { icon: "eye", text: "ALWAYS SAY WHY" }, { icon: "heart", text: "CHOICE STAYS THEIRS" }]} />
    </Duo>
  ),
  "b1-3": (
    <Duo label={S("One suggestion pattern, built once")} left={{ who: "bram", face: "happy", pose: "point" }}>
      <Pattern />
    </Duo>
  ),
  "b1-4": (
    <Duo label={S("The rule: fewer, reliable suggestions first")} left={{ who: "saskia", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="THE LAYERS" items={[{ text: "VISION" }, { text: "PRINCIPLES" }, { text: "PATTERNS" }, { text: "TOUCHPOINTS" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Duo label={S("Sales wants personal prices; data protection objects")} left={{ who: "bram", face: "happy", pose: "point" }} right={{ who: "saskia", face: "worried" }}>
      <Notes x={40} y={6} w={80} title="TWO GOALS" items={[{ text: "BETTER OFFERS" }, { text: "VS" }, { text: "FAIR PRICES" }]} />
    </Duo>
  ),
  "b2-2": (
    <Duo label={S("Three journeys, three depths")} left={{ who: "saskia", face: "think" }}>
      <Notes x={40} y={6} w={112} title="HOW DEEP" items={[{ tick: true, text: "REMINDERS: DEEP" }, { icon: "warn", text: "OFFERS: MEDIUM" }, { icon: "heart", text: "ASSISTANCE: A PERSON" }]} />
    </Duo>
  ),
  "b2-3": (
    <Duo label={S("They give up personal prices and say why")} left={{ who: "bram", face: "neutral" }}>
      <Notes x={40} y={6} w={112} title="WE GIVE UP" items={[{ cross: true, text: "PRICES BY PERSON" }, { tick: true, text: "OFFERS BY ROUTE" }]} sub="AND WE SAY WHY" />
    </Duo>
  ),
  "b2-4": (
    <Duo label={S("The rule: deep where it is safe, a person where it is not")} left={{ who: "saskia", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="CONFLICTS" items={[{ text: "PERSONAL VS CLEAR" }, { text: "AUTO VS CHOICE" }, { text: "NEW VS TRUSTED" }]} sub="DECIDE PER JOURNEY" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={S("A journalist asks why; nobody knows")} left={{ who: "bram", face: "worried" }}>
      <Many />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "b3-2": (
    <Duo label={S("Saskia writes the governance")} left={{ who: "saskia", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="GOVERNANCE" items={[{ tick: true, text: "AN OWNER" }, { tick: true, text: "A VETO" }, { tick: true, text: "A RECORD PER FUNCTION" }]} />
    </Duo>
  ),
  "b3-3": (
    <Duo label={S("Saskia decides without the data and says when she would reverse it")} left={{ who: "saskia", face: "neutral" }}>
      <Notes x={40} y={6} w={112} title="A DECISION" items={[{ tick: true, text: "WE DECIDE" }, { icon: "ask", text: "WE DO NOT KNOW" }, { icon: "clock", text: "WE REVERSE IF" }]} sub="AND WHAT WE GIVE UP" />
    </Duo>
  ),
  "b3-4": (
    <Duo label={S("The rule: write the record before anyone asks")} left={{ who: "saskia", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="THE RECORD" items={[{ text: "WHAT IT SUGGESTS" }, { text: "FROM WHICH DATA" }, { text: "HOW TO SWITCH OFF" }]} />
    </Duo>
  ),
};
