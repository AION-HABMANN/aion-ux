import type { ReactNode } from "react";
import { Board, Chip, LOOK, Lines, Mark, Tick, Cross, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 1 comics (data/day1/comics.ts, DL-STANDARD.md section 13). People: Mia and Tom (customers of Nordwind, a made-up travel-booking
 * app), Jana (Nordwind's UX lead) and Ben (its product owner). Every label is a short capital word.
 */
LOOK.mia = { hair: "#3B2A20", shirt: "#0B8A82", long: true };
LOOK.tom = { hair: "#1F1F24", shirt: "#555B66", skin: "#C68A5A" };
LOOK.jana = { hair: "#9B4A1E", shirt: "#2B8A6E", long: true, glasses: true };
LOOK.ben = { hair: "#2B2B2B", shirt: "#3D7BD9" };

const ACC = "#2F5D8A";
const WARN = "#D9534F";
const NEU = "#E4E8EE";
const OK = "#B5E3C8";

/** A phone screen in the middle of the panel with a title bar. */
function Phone({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <Board x={44} y={4} w={72} h={60}>
      <rect x={44} y={4} width={72} height={6} fill="#3F4A58" />
      <Txt x={80} y={8.6} size={3.4} anchor="middle" c="#FFFFFF">
        {title}
      </Txt>
      {children}
    </Board>
  );
}

function Btn({ x, y, w, label, strong }: { x: number; y: number; w: number; label: string; strong?: boolean }) {
  return (
    <g>
      <Chip x={x} y={y} w={w} h={7} c={strong ? ACC : NEU} />
      <Txt x={x + w / 2} y={y + 4.9} size={2.9} anchor="middle" c={strong ? "#FFFFFF" : "#1B1B1F"}>
        {label}
      </Txt>
    </g>
  );
}

function BookingLooks() {
  return (
    <Phone title="NORDWIND">
      <rect x={48} y={13} width={64} height={22} fill="#9AA5B5" />
      <Txt x={80} y={26} size={3.6} anchor="middle" c="#FFFFFF">LISBON</Txt>
      <Lines x={48} y={39} w={60} n={1} c="#C9CFD8" />
      <Btn x={48} y={48} w={19} label="DETAILS" />
      <Btn x={70} y={48} w={19} label="BOOK" />
      <Btn x={92} y={48} w={19} label="SHARE" />
    </Phone>
  );
}

function BookingWorks() {
  return (
    <Phone title="NORDWIND">
      <Txt x={48} y={18} size={3.6}>LISBON · 3 NIGHTS</Txt>
      <Lines x={48} y={23} w={56} n={1} />
      <Btn x={48} y={36} w={64} label="BOOK NOW" strong />
      <Txt x={80} y={54} size={2.8} anchor="middle" c="#556274">DETAILS · SHARE</Txt>
    </Phone>
  );
}

function TripPage({ ringBanner, ringLink }: { ringBanner?: boolean; ringLink?: boolean }) {
  return (
    <Phone title="YOUR TRIP">
      <rect x={47} y={12} width={66} height={9} fill={WARN} />
      <Txt x={80} y={18} size={3} anchor="middle" c="#FFFFFF">FLASH SALE</Txt>
      <Lines x={48} y={26} w={60} n={3} gap={3.2} />
      <Txt x={48} y={46} size={3} c={ACC}>CHANGE BOOKING</Txt>
      {ringBanner && <rect x={45} y={10.5} width={70} height={12} fill="none" stroke="#F59E0B" strokeWidth={1.2} />}
      {ringLink && <rect x={46.5} y={42} width={33} height={6} fill="none" stroke="#2E9E6B" strokeWidth={1.2} />}
    </Phone>
  );
}

function CheckIn({ aims }: { aims: boolean }) {
  return (
    <Phone title="CHECK-IN">
      {aims ? <Txt x={48} y={15} size={2.8} c="#556274">STEP 2 OF 3 · SEATS</Txt> : null}
      {aims ? <Txt x={110} y={8.6} size={3.4} anchor="end" c="#FFFFFF">≡</Txt> : null}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={48 + i * 13} y={19} width={10} height={10} fill={i === 2 ? ACC : NEU} />
      ))}
      {aims ? (
        <Btn x={48} y={36} w={64} label="CONTINUE" strong />
      ) : (
        [0, 1, 2, 3].map((i) => <Btn key={i} x={48 + i * 16} y={36} w={14} label={["GO", "SKIP", "FLY", "ADD"][i]} />)
      )}
      {!aims && <Txt x={80} y={58} size={2.6} anchor="middle" c="#556274">MENU: IN THE FOOTER</Txt>}
    </Phone>
  );
}

function Pay({ tone }: { tone: "alarm" | "pressure" | "calm" }) {
  return (
    <Phone title="PAYMENT">
      {tone === "alarm" && (
        <g>
          <rect x={47} y={12} width={66} height={7} fill={WARN} />
          <Txt x={80} y={16.8} size={2.9} anchor="middle" c="#FFFFFF">WARNING! CHECK ALL DATA</Txt>
          <rect x={47} y={21} width={66} height={7} fill="#F6C9B8" />
          <Txt x={80} y={25.8} size={2.9} anchor="middle">ERRORS MAY CANCEL</Txt>
        </g>
      )}
      {tone === "pressure" && (
        <g>
          <rect x={47} y={12} width={66} height={7} fill="#F59E0B" />
          <Txt x={80} y={16.8} size={2.9} anchor="middle" c="#FFFFFF">HELD FOR 5 MINUTES</Txt>
          <Txt x={80} y={25} size={2.9} anchor="middle" c={WARN}>ONLY 1 SEAT LEFT!</Txt>
        </g>
      )}
      {tone === "calm" && (
        <g>
          <Txt x={48} y={16} size={2.9} c="#556274">STEP 3 OF 3</Txt>
          <Txt x={48} y={24} size={2.9} c="#2E7D55">SECURE · CHANGE ANY TIME</Txt>
        </g>
      )}
      <rect x={48} y={32} width={64} height={7} fill="#FFFFFF" stroke="#9AA5B5" strokeWidth={0.6} />
      <Btn x={48} y={45} w={64} label={tone === "pressure" ? "PAY NOW!" : "PAY"} strong />
    </Phone>
  );
}

function Channels({ shared }: { shared: boolean }) {
  const names = shared ? ["BOOKING", "BOOKING", "BOOKING"] : ["BOOKING", "TRIP", "ORDER"];
  return (
    <Board x={30} y={6} w={100} h={56}>
      {["WEBSITE", "APP", "CHATBOT"].map((c, i) => (
        <g key={c}>
          <rect x={34 + i * 32} y={12} width={28} height={36} fill={NEU} />
          <Txt x={48 + i * 32} y={18} size={2.9} anchor="middle" c="#556274">{c}</Txt>
          <Chip x={36 + i * 32} y={28} w={24} h={7} c={shared ? OK : i === 0 ? OK : "#F6C9B8"} />
          <Txt x={48 + i * 32} y={32.8} size={2.7} anchor="middle">{names[i]}</Txt>
        </g>
      ))}
      <Txt x={80} y={57} size={3.2} anchor="middle" c="#556274">{shared ? "ONE WORD, ONE NEXT STEP" : "EACH CHANNEL ITS OWN WORD"}</Txt>
    </Board>
  );
}

function Matrix() {
  return (
    <Board x={36} y={4} w={88} h={60}>
      <line x1={46} y1={56} x2={118} y2={56} stroke="#1B1B1F" strokeWidth={0.8} />
      <line x1={46} y1={10} x2={46} y2={56} stroke="#1B1B1F" strokeWidth={0.8} />
      <Txt x={82} y={62} size={2.8} anchor="middle" c="#556274">CLARITY →</Txt>
      <Txt x={40} y={34} size={2.8} anchor="middle" c="#556274">ACT.</Txt>
      <rect x={90} y={12} width={26} height={18} fill={OK} />
      <Txt x={103} y={22.5} size={3} anchor="middle">THE AIM</Txt>
      {[[54, 16, "A"], [108, 50, "B"], [100, 20, "C"], [62, 34, "D"]].map(([x, y, l]) => (
        <g key={l as string}>
          <rect x={(x as number) - 2.5} y={(y as number) - 2.5} width={5} height={5} fill={ACC} />
          <Txt x={(x as number) + 4} y={(y as number) + 1.5} size={2.8}>{l as string}</Txt>
        </g>
      ))}
    </Board>
  );
}

const S = (s: string) => tt(s);

export const ART_D1: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={S("Mia looks at a beautiful booking page and cannot see which of three equal buttons books")} left={{ who: "mia", face: "worried" }}>
      <BookingLooks />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a1-2": (
    <Duo label={S("Jana explains: UX is what Mia notices, understands, feels and does; UI is the surface")} left={{ who: "jana", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="UX AND UI" items={[{ icon: "eye", text: "UX: NOTICE, UNDERSTAND" }, { icon: "heart", text: "UX: FEEL, DO" }, { icon: "gear", text: "UI: THE SURFACE" }]} sub="A PAGE CAN LOOK GOOD AND WORK BADLY" />
    </Duo>
  ),
  "a1-3": (
    <Duo label={S("The plainer page has one strong Book button, and Mia books at once")} left={{ who: "mia", face: "happy", pose: "up" }}>
      <BookingWorks />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a1-4": (
    <Duo label={S("The rule: say the effect, not your taste")} left={{ who: "jana", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="JUDGE A DESIGN" items={[{ tick: true, text: "WHAT IS NOTICED?" }, { tick: true, text: "WHAT IS UNDERSTOOD?" }, { cross: true, text: "NOT: I LIKE IT" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={S("A red flashing sale banner pulls Mia's eye before anything else")} left={{ who: "mia", face: "surprised" }}>
      <TripPage ringBanner />
    </Duo>
  ),
  "a2-2": (
    <Duo label={S("Mia came to change her booking, so she scans for those words")} left={{ who: "mia", face: "think" }}>
      <TripPage ringLink />
    </Duo>
  ),
  "a2-3": (
    <Duo label={S("Both pull at once: she needs longer and taps the banner by mistake")} left={{ who: "mia", face: "worried" }}>
      <TripPage ringBanner ringLink />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "a2-4": (
    <Duo label={S("The rule: a strong signal that is not the task competes with the task")} left={{ who: "jana", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="TWO PULLS" items={[{ icon: "warn", text: "BOTTOM-UP: THE SIGNAL" }, { icon: "eye", text: "TOP-DOWN: THE GOAL" }, { tick: true, text: "LET THEM AGREE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={S("Tom looks for the menu at the top, where other apps put it; it is in the footer")} left={{ who: "tom", face: "worried" }}>
      <CheckIn aims={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a3-2": (
    <Duo label={S("Four equal buttons: Tom reads them all before he can go on")} left={{ who: "tom", face: "think" }}>
      <CheckIn aims={false} />
    </Duo>
  ),
  "a3-3": (
    <Duo label={S("With a step line, one main button and the menu at the top, Tom goes straight on")} left={{ who: "tom", face: "happy", pose: "up" }}>
      <CheckIn aims />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a3-4": (
    <Duo label={S("The rule: orientation, less confusion, steered attention")} left={{ who: "jana", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="THREE AIMS" items={[{ icon: "book", text: "WHERE AM I, WHAT NEXT" }, { icon: "down", text: "FEWER SIGNALS" }, { icon: "eye", text: "THE TASK IS STRONGEST" }]} sub="USE WHAT PEOPLE EXPECT" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={S("Two red warnings at a step where nothing is wrong: Mia feels unsafe before she reads")} left={{ who: "mia", face: "worried" }}>
      <Pay tone="alarm" />
      <Mark x={9} y={34} kind="bang" />
    </Duo>
  ),
  "a4-2": (
    <Duo label={S("A countdown and 'only 1 seat left' push Tom, and he pushes back and closes the app")} left={{ who: "tom", face: "sad" }}>
      <Pay tone="pressure" />
      <Cross x={9} y={34} />
    </Duo>
  ),
  "a4-3": (
    <Duo label={S("The calm step says it is the last one and that everything can still change; Mia pays")} left={{ who: "mia", face: "happy" }}>
      <Pay tone="calm" />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a4-4": (
    <Duo label={S("The rule: write the effect as a hypothesis")} left={{ who: "jana", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="A HYPOTHESIS" items={[{ icon: "pencil", text: "THIS ELEMENT" }, { icon: "heart", text: "COULD MAKE USERS FEEL" }, { icon: "check", text: "TEST IT LATER" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={S("Ben has three ideas for the app: one Book button, a step line, large photos")} left={{ who: "ben", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="THREE IDEAS" items={[{ icon: "play", text: "ONE BOOK BUTTON" }, { icon: "up", text: "A STEP LINE" }, { icon: "eye", text: "LARGE PHOTOS" }]} />
    </Duo>
  ),
  "a5-2": (
    <Duo label={S("Jana weighs the button on four questions, with a reason for each")} left={{ who: "jana", face: "think" }}>
      <Rate x={40} y={6} w={112} title="ONE BOOK BUTTON" rows={[["EFFECT", 3, "HIGH"], ["FEASIBLE", 3, "HIGH"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={S("The photos look good but push the button down: a high risk for little effect")} left={{ who: "ben", face: "worried" }}>
      <Rate x={40} y={6} w={112} title="LARGE PHOTOS" rows={[["EFFECT", 1, "LOW"], ["FEASIBLE", 2, "MID"], ["RISK", 3, "HIGH"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={S("The rule: weigh effect, feasibility, risk and time, with a reason next to each")} left={{ who: "jana", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="WEIGH A MEASURE" items={[{ tick: true, text: "EFFECT ON USERS" }, { tick: true, text: "FEASIBILITY, RISK" }, { tick: true, text: "TIME PRESSURE" }]} sub="THE REASON COUNTS" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={S("Mia books on the website, opens the app and finds 'trip' instead of 'booking'")} left={{ who: "mia", face: "worried" }}>
      <Channels shared={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "b1-2": (
    <Duo label={S("Ben: each team improved its own screens")} left={{ who: "ben", face: "think" }}>
      <Notes x={40} y={6} w={112} title="THREE TEAMS" items={[{ text: "WEBSITE: NEW LOOK" }, { text: "APP: NEW WORDS" }, { text: "CHATBOT: OWN STEPS" }]} sub="NOBODY OWNS THE JOURNEY" />
    </Duo>
  ),
  "b1-3": (
    <Duo label={S("Jana chooses one effect, orientation and trust, and every channel serves it")} left={{ who: "jana", face: "happy", pose: "point" }}>
      <Channels shared />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "b1-4": (
    <Duo label={S("The rule: start from the effect, not from the screen")} left={{ who: "jana", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="A NEURO-UX STRATEGY" items={[{ icon: "eye", text: "PERCEPTION" }, { icon: "book", text: "UNDERSTANDING" }, { icon: "play", text: "BEHAVIOUR, DECISION" }]} sub="ONE EFFECT, EVERY CHANNEL" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Duo label={S("Ben wants animated deals for activation; support wants fewer calls")} left={{ who: "ben", face: "happy", pose: "point" }} right={{ who: "tom", face: "worried" }}>
      <Notes x={34} y={6} w={92} title="TWO GOALS" items={[{ icon: "up", text: "ACTIVATION" }, { icon: "down", text: "FEWER CALLS" }]} />
    </Duo>
  ),
  "b2-2": (
    <Duo label={S("On the matrix, the deals wall is exciting but unclear; the aim is clear and activating")} left={{ who: "jana", face: "think" }}>
      <Matrix />
    </Duo>
  ),
  "b2-3": (
    <Duo label={S("Jana names the conflict and what the choice gives up")} left={{ who: "jana", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="WE CHOOSE C" items={[{ tick: true, text: "CLEAR NEXT STEP" }, { tick: true, text: "ONE TIP TO INSPIRE" }, { cross: true, text: "GIVE UP: THE DEALS WALL" }]} />
    </Duo>
  ),
  "b2-4": (
    <Duo label={S("The rule: name the conflict as two goals, choose, and say what you give up")} left={{ who: "jana", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="THREE CONFLICTS" items={[{ text: "LOOKS VS CLARITY" }, { text: "NEW VS FAMILIAR" }, { text: "ACTIVATE VS OVERLOAD" }]} sub="CHOOSE AND SAY WHY" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={S("Ben: we do not know where people are lost between channels; should we wait for data?")} left={{ who: "ben", face: "worried" }}>
      <Notes x={40} y={6} w={112} title="WE DO NOT KNOW" items={[{ icon: "ask", text: "WHERE PEOPLE ARE LOST" }, { icon: "clock", text: "WAIT FOR DATA?" }]} />
    </Duo>
  ),
  "b3-2": (
    <Duo label={S("Jana decides, says what is unknown and when she would reverse it")} left={{ who: "jana", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="A DECISION" items={[{ tick: true, text: "WE DECIDE" }, { icon: "ask", text: "WE DO NOT KNOW" }, { icon: "clock", text: "WE REVERSE IF" }]} sub="AND WHAT WE GIVE UP" />
    </Duo>
  ),
  "b3-3": (
    <Duo label={S("Who decides: the head of customer experience; legal and IT may object with a reason")} left={{ who: "jana", face: "neutral" }} right={{ who: "ben", face: "happy" }}>
      <Notes x={34} y={6} w={92} title="WHO DECIDES" items={[{ text: "HEAD OF CX DECIDES" }, { text: "LEGAL, IT: OBJECT" }, { text: "BOARD: A TIE" }]} />
    </Duo>
  ),
  "b3-4": (
    <Duo label={S("The rule: an accountable decision says what is not known and when it will be checked")} left={{ who: "jana", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="ACCOUNTABLE" items={[{ tick: true, text: "EFFECT, NOT TASTE" }, { tick: true, text: "RULES FOR WHO DECIDES" }, { tick: true, text: "DECIDE, THEN CHECK" }]} />
    </Duo>
  ),
};
