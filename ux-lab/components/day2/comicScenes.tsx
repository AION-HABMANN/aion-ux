import type { ReactNode } from "react";
import { Board, Chip, LOOK, Lines, Mark, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 2 comics (data/day2/comics.ts, DL-STANDARD.md section 13). People: Ana and Felix (visitors of Brightwater, a made-up leisure centre),
 * Lea (Brightwater's UX lead) and Omar (its product owner). Every label is a short capital word.
 */
LOOK.ana2 = { hair: "#2B1D14", shirt: "#C2417A", long: true };
LOOK.felix = { hair: "#C9A25A", shirt: "#3D7BD9" };
LOOK.lea = { hair: "#5A3A22", shirt: "#0B8A82", long: true, glasses: true };
LOOK.omar = { hair: "#1F1F24", shirt: "#7A4DE8", skin: "#B07A50" };

const ACC = "#1F6F8B";
const NEU = "#E4E8EE";
const OK = "#B5E3C8";

/** A web page in the middle of the panel with a title bar. */
function Site({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <Board x={40} y={4} w={80} h={60}>
      <rect x={40} y={4} width={80} height={6} fill="#3F4A58" />
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
      <Txt x={x + w / 2} y={y + 4.9} size={2.8} anchor="middle" c={strong ? "#FFFFFF" : "#1B1B1F"}>
        {label}
      </Txt>
    </g>
  );
}

function DeptMenu() {
  return (
    <Site title="BRIGHTWATER">
      {["SPORT DEPT", "FACILITIES", "COURSE ADMIN", "CUSTOMER OFFICE"].map((l, i) => (
        <Btn key={l} x={43 + (i % 2) * 38} y={14 + Math.floor(i / 2) * 10} w={35} label={l} />
      ))}
      <Lines x={44} y={38} w={70} n={4} gap={3.4} />
    </Site>
  );
}

function TaskMenu() {
  return (
    <Site title="BRIGHTWATER">
      <Txt x={44} y={17} size={3.2}>WHAT WOULD YOU LIKE TO DO?</Txt>
      <Btn x={43} y={22} w={74} label="BOOK A SWIM" strong />
      <Btn x={43} y={32} w={36} label="COURSES" />
      <Btn x={81} y={32} w={36} label="HOURS" />
      <Lines x={44} y={48} w={60} n={2} gap={3.4} c="#C9CFD8" />
    </Site>
  );
}

function Block({ scan }: { scan: boolean }) {
  return (
    <Site title="SWIM COURSE">
      {scan ? (
        <g>
          <Txt x={44} y={17} size={3.6}>SWIMMING FOR ADULTS</Txt>
          <Txt x={44} y={24} size={3}>WHEN · TUESDAY 18:00</Txt>
          <Txt x={44} y={30} size={3}>LEVEL · BEGINNERS</Txt>
          <Btn x={43} y={38} w={40} label="BOOK" strong />
        </g>
      ) : (
        <g>
          <Txt x={44} y={17} size={3.4}>SWIMMING FOR ADULTS</Txt>
          <Lines x={44} y={21} w={72} n={11} gap={3.4} />
        </g>
      )}
    </Site>
  );
}

function Scattered({ order }: { order: boolean }) {
  return (
    <Site title="OFFERS">
      {order ? (
        <g>
          <Txt x={44} y={17} size={3}>FACILITIES</Txt>
          <Txt x={82} y={17} size={3}>COURSES</Txt>
          {[0, 1, 2].map((i) => <Chip key={`l${i}`} x={44} y={20 + i * 8} w={32} h={6} c="#DCEBF1" />)}
          {[0, 1, 2].map((i) => <Chip key={`r${i}`} x={82} y={20 + i * 8} w={32} h={6} c="#F3E3D3" />)}
          <Btn x={82} y={50} w={34} label="BOOK" strong />
        </g>
      ) : (
        <g>
          {[[44, 14, "#F6D6D6"], [88, 18, "#D6F0E0"], [56, 28, "#E8D6F3"], [94, 34, "#F6EDC9"], [46, 44, "#D6E4F6"], [80, 48, "#F3D6E8"]].map(([x, y, c], i) => (
            <Chip key={i} x={x as number} y={y as number} w={22} h={6} c={c as string} />
          ))}
          <Btn x={88} y={56} w={26} label="BOOK" />
        </g>
      )}
    </Site>
  );
}

function Density({ kind }: { kind: "crowded" | "balanced" | "sparse" }) {
  return (
    <Site title="BRIGHTWATER">
      {kind === "crowded" && (
        <g>
          <rect x={42} y={12} width={76} height={5} fill="#E9B7B7" />
          {Array.from({ length: 12 }, (_, i) => <Chip key={i} x={42 + (i % 4) * 19} y={19 + Math.floor(i / 4) * 9} w={17} h={7} c={["#D6E4F6", "#F6EDC9", "#D6F0E0", "#F3D6E8"][i % 4]} />)}
          <Lines x={42} y={49} w={74} n={3} gap={3} />
        </g>
      )}
      {kind === "balanced" && (
        <g>
          <Btn x={43} y={14} w={74} label="BOOK A SWIM" strong />
          <Btn x={43} y={24} w={36} label="COURSES" />
          <Btn x={81} y={24} w={36} label="HOURS" />
          <Txt x={44} y={42} size={3}>TODAY: POOL 7 TO 21</Txt>
        </g>
      )}
      {kind === "sparse" && (
        <g>
          <rect x={42} y={12} width={76} height={40} fill="#9AA5B5" />
          <Txt x={80} y={34} size={3.6} anchor="middle" c="#FFFFFF">FEEL THE WATER</Txt>
          <Btn x={96} y={55} w={20} label="MENU" />
        </g>
      )}
    </Site>
  );
}

function Search({ visible }: { visible: boolean }) {
  return (
    <Site title="BRIGHTWATER">
      {visible ? (
        <g>
          <rect x={43} y={13} width={60} height={7} fill="#FFFFFF" stroke={ACC} strokeWidth={0.8} />
          <Txt x={46} y={17.8} size={3} c="#556274">SEARCH: YOGA</Txt>
          <rect x={105} y={13} width={12} height={7} fill={ACC} />
          <Btn x={43} y={26} w={74} label="YOGA · THURSDAY 19:00" />
        </g>
      ) : (
        <g>
          <Txt x={115} y={17} size={2.4} anchor="end" c="#C9CFD8">search</Txt>
          {Array.from({ length: 6 }, (_, i) => <Btn key={i} x={43 + (i % 2) * 38} y={22 + Math.floor(i / 2) * 9} w={35} label={["SPORT", "POOL", "KIDS", "PRESS", "JOBS", "MORE"][i]} />)}
        </g>
      )}
    </Site>
  );
}

function Org({ wins }: { wins: "inside" | "user" }) {
  return (
    <Board x={30} y={6} w={100} h={56}>
      {["WEBSITE", "BOOKING", "APP"].map((c, i) => (
        <g key={c}>
          <rect x={34 + i * 32} y={12} width={28} height={36} fill={NEU} />
          <Txt x={48 + i * 32} y={18} size={2.9} anchor="middle" c="#556274">{c}</Txt>
          <Chip x={36 + i * 32} y={28} w={24} h={7} c={wins === "user" ? OK : "#F6C9B8"} />
          <Txt x={48 + i * 32} y={32.8} size={2.6} anchor="middle">{wins === "user" ? "MY BOOKINGS" : ["CUSTOMER OFF.", "ADMISSIONS", "TICKETS"][i]}</Txt>
        </g>
      ))}
      <Txt x={80} y={57} size={3.2} anchor="middle" c="#556274">{wins === "user" ? "THE VISITOR'S WORDS EVERYWHERE" : "EACH TEAM ITS OWN WORDS"}</Txt>
    </Board>
  );
}

function Matrix() {
  return (
    <Board x={36} y={4} w={88} h={60}>
      <line x1={46} y1={56} x2={118} y2={56} stroke="#1B1B1F" strokeWidth={0.8} />
      <line x1={46} y1={10} x2={46} y2={56} stroke="#1B1B1F" strokeWidth={0.8} />
      <Txt x={82} y={62} size={2.8} anchor="middle" c="#556274">SHOWN AT ONCE →</Txt>
      <Txt x={40} y={34} size={2.8} anchor="middle" c="#556274">FOUND</Txt>
      <rect x={70} y={12} width={30} height={18} fill={OK} />
      <Txt x={85} y={22.5} size={3} anchor="middle">THE AIM</Txt>
      {[[112, 48, "A"], [86, 16, "B"], [54, 44, "C"], [100, 36, "E"]].map(([x, y, l]) => (
        <g key={l as string}>
          <rect x={(x as number) - 2.5} y={(y as number) - 2.5} width={5} height={5} fill={ACC} />
          <Txt x={(x as number) + 4} y={(y as number) + 1.5} size={2.8}>{l as string}</Txt>
        </g>
      ))}
    </Board>
  );
}

const S = (s: string) => tt(s);

export const ART_D2: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={S("Ana wants to book a swim and sees a menu of four departments")} left={{ who: "ana2", face: "worried" }}>
      <DeptMenu />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a1-2": (
    <Duo label={S("Omar explains: the menu is how the centre is organised")} left={{ who: "omar", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="OUR MENU" items={[{ text: "ONE ITEM PER DEPARTMENT" }, { text: "OUR OWN WORDS" }, { text: "EVERYTHING IS THERE" }]} sub="COMPLETE, BUT FOR WHOM?" />
    </Duo>
  ),
  "a1-3": (
    <Duo label={S("Lea rebuilds the start page around what visitors come to do; Ana books at once")} left={{ who: "ana2", face: "happy", pose: "up" }}>
      <TaskMenu />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a1-4": (
    <Duo label={S("The rule: start from the user's task, not from the organisation")} left={{ who: "lea", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="USER-CENTRED" items={[{ tick: true, text: "THE USER'S TASK FIRST" }, { tick: true, text: "THE USER'S WORDS" }, { cross: true, text: "NOT: OUR ORG CHART" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={S("Felix opens a course page that is one long block of text")} left={{ who: "felix", face: "think" }}>
      <Block scan={false} />
    </Duo>
  ),
  "a2-2": (
    <Duo label={S("His eye skims the top and the left edge, and he misses the dates in the middle")} left={{ who: "felix", face: "worried" }}>
      <Block scan={false} />
      <rect x={42} y={14} width={76} height={5} fill="none" stroke="#F59E0B" strokeWidth={1} />
      <rect x={42} y={20} width={8} height={40} fill="none" stroke="#F59E0B" strokeWidth={1} />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "a2-3": (
    <Duo label={S("With a heading, short facts and a button, his scan lands on what matters")} left={{ who: "felix", face: "happy", pose: "up" }}>
      <Block scan />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a2-4": (
    <Duo label={S("The rule: people scan first; design for what the scan will catch")} left={{ who: "lea", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="A SCAN" items={[{ icon: "eye", text: "SCAN, SELECT" }, { icon: "up", text: "PRIORITISE" }, { icon: "play", text: "ACT OR LEAVE" }]} sub="NOT CAUGHT = NOT THERE" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={S("Six offers in six colours, scattered, and a pale Book button: Ana's eye jumps")} left={{ who: "ana2", face: "worried" }}>
      <Scattered order={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a3-2": (
    <Duo label={S("Lea names the three means that guide the eye")} left={{ who: "lea", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="GUIDE THE EYE" items={[{ icon: "eye", text: "CONTRAST" }, { icon: "book", text: "GROUPING" }, { icon: "gear", text: "STRUCTURE" }]} />
    </Duo>
  ),
  "a3-3": (
    <Duo label={S("Two groups in two columns and a strong Book button: Ana sees the way")} left={{ who: "ana2", face: "happy", pose: "up" }}>
      <Scattered order />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a3-4": (
    <Duo label={S("The rule: contrast, grouping and structure, used on purpose")} left={{ who: "lea", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="VISUAL GUIDANCE" items={[{ tick: true, text: "ONE THING STANDS OUT" }, { tick: true, text: "WHAT BELONGS, GROUPS" }, { tick: true, text: "A PATH FOR THE EYE" }]} sub="NOT: EVERY BOX COMPETES" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={S("A crowded start page: Felix cannot find the Book button and thinks the centre is chaotic")} left={{ who: "felix", face: "worried" }}>
      <Density kind="crowded" />
      <Mark x={9} y={34} kind="bang" />
    </Duo>
  ),
  "a4-2": (
    <Duo label={S("A sparse page with one photo: elegant, but he clicks twice to find the hours")} left={{ who: "felix", face: "think" }}>
      <Density kind="sparse" />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a4-3": (
    <Duo label={S("A balanced page: three tasks and today's hours; it looks well run")} left={{ who: "felix", face: "happy" }}>
      <Density kind="balanced" />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a4-4": (
    <Duo label={S("The rule: enough to orient, little enough to find; order looks like quality")} left={{ who: "lea", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="DENSITY" items={[{ icon: "warn", text: "TOO MUCH: EVERYTHING COMPETES" }, { icon: "ask", text: "TOO LITTLE: MANY CLICKS" }, { icon: "check", text: "ORDER = QUALITY" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={S("Ana looks for the yoga course; the search is a faint word in the corner")} left={{ who: "ana2", face: "worried" }}>
      <Search visible={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a5-2": (
    <Duo label={S("With a visible search she recognises the course and goes straight to it")} left={{ who: "ana2", face: "happy", pose: "up" }}>
      <Search visible />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={S("Omar weighs the task buttons on four questions, with a reason for each")} left={{ who: "omar", face: "think" }}>
      <Rate x={40} y={6} w={112} title="THREE TASK BUTTONS" rows={[["EFFECT", 3, "HIGH"], ["EFFORT", 1, "LOW"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={S("The rule: recognition instead of search, clarity instead of overload, and weigh every measure")} left={{ who: "lea", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="WEIGH A MEASURE" items={[{ tick: true, text: "EFFECT ON USERS" }, { tick: true, text: "EFFORT, RISK" }, { tick: true, text: "TIMELINESS" }]} sub="EFFORT = TIME AND PEOPLE" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={S("Felix finds 'Customer Office' on the website, 'Admissions' in the booking system and 'Tickets' in the app")} left={{ who: "felix", face: "worried" }}>
      <Org wins="inside" />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "b1-2": (
    <Duo label={S("Omar: the meeting is about new colours again")} left={{ who: "omar", face: "think" }}>
      <Notes x={40} y={6} w={112} title="THE MEETING" items={[{ text: "NEW BLUE?" }, { text: "BIGGER LOGO?" }, { text: "ROUNDER BUTTONS?" }]} sub="NOBODY ASKS ABOUT THE STRUCTURE" />
    </Duo>
  ),
  "b1-3": (
    <Duo label={S("Lea moves the discussion from the screen to the structure: one name, the visitor's, everywhere")} left={{ who: "lea", face: "happy", pose: "point" }}>
      <Org wins="user" />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "b1-4": (
    <Duo label={S("The rule: structure follows the users' tasks, not the organisation chart")} left={{ who: "lea", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="USER LOGIC" items={[{ icon: "eye", text: "THE SCREEN" }, { icon: "gear", text: "THE STRUCTURE" }, { icon: "book", text: "WHO OWNS IT" }]} sub="FIX IT WHERE IT STARTS" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Duo label={S("Omar wants every department on the start page; Ana wants to book a swim")} left={{ who: "omar", face: "happy", pose: "point" }} right={{ who: "ana2", face: "worried" }}>
      <Notes x={34} y={6} w={92} title="TWO GOALS" items={[{ icon: "up", text: "SHOW EVERYTHING" }, { icon: "down", text: "FIND IT FAST" }]} />
    </Duo>
  ),
  "b2-2": (
    <Duo label={S("On the matrix, showing everything is not the same as finding it")} left={{ who: "lea", face: "think" }}>
      <Matrix />
    </Duo>
  ),
  "b2-3": (
    <Duo label={S("Lea chooses three tasks first and the rest one step deeper, and says what that gives up")} left={{ who: "lea", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="WE CHOOSE B" items={[{ tick: true, text: "THREE TASKS FIRST" }, { tick: true, text: "THE REST ONE STEP DEEPER" }, { cross: true, text: "GIVE UP: A BOX PER DEPT" }]} />
    </Duo>
  ),
  "b2-4": (
    <Duo label={S("The rule: name the conflict, choose, and say what you give up")} left={{ who: "lea", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="THREE CONFLICTS" items={[{ text: "MUCH VS SIMPLE" }, { text: "STANDARD VS FIT" }, { text: "STAKEHOLDER VS USER" }]} sub="CHOOSE AND SAY WHY" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={S("Omar: the data does not show whether visitors browse or search; should we wait?")} left={{ who: "omar", face: "worried" }}>
      <Notes x={40} y={6} w={112} title="WE DO NOT KNOW" items={[{ icon: "ask", text: "BROWSE OR SEARCH?" }, { icon: "clock", text: "WAIT FOR DATA?" }]} />
    </Duo>
  ),
  "b3-2": (
    <Duo label={S("Lea decides, says what is unknown and when she would reverse it")} left={{ who: "lea", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="A DECISION" items={[{ tick: true, text: "WE DECIDE" }, { icon: "ask", text: "WE DO NOT KNOW" }, { icon: "clock", text: "WE REVERSE IF" }]} sub="AND WHAT WE GIVE UP" />
    </Duo>
  ),
  "b3-3": (
    <Duo label={S("Who owns the structure: the head of digital; departments own their texts")} left={{ who: "lea", face: "neutral" }} right={{ who: "omar", face: "happy" }}>
      <Notes x={34} y={6} w={92} title="WHO OWNS IT" items={[{ text: "DIGITAL: THE STRUCTURE" }, { text: "DEPTS: THEIR TEXTS" }, { text: "DIRECTOR: A TIE" }]} />
    </Duo>
  ),
  "b3-4": (
    <Duo label={S("The rule: someone owns user-centredness, and a decision says when it is checked")} left={{ who: "lea", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="ACCOUNTABLE" items={[{ tick: true, text: "ONE OWNER OF STRUCTURE" }, { tick: true, text: "THE USER'S TASK DECIDES" }, { tick: true, text: "DECIDE, THEN CHECK" }]} />
    </Duo>
  ),
};
