import type { ReactNode } from "react";
import { Board, Chip, LOOK, Mark, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 8 comics (data/day8/comics.ts, DL-STANDARD.md section 13). People: Iris and Pavel (customers of Lantern Kitchens, a made-up kitchen
 * maker), June (its content designer) and Arne (its product owner). Every label is a short capital word.
 */
LOOK.iris = { hair: "#B5651D", shirt: "#2E7D5B", long: true };
LOOK.pavel = { hair: "#3B2A20", shirt: "#3D5A99", glasses: true };
LOOK.june = { hair: "#1F1F24", shirt: "#B0413E", long: true, skin: "#C68A5A" };
LOOK.arne = { hair: "#D8C08A", shirt: "#5A5F6B" };

const ACC = "#8A4B1F";
const NEU = "#E4E8EE";

function Site({ title = "LANTERN KITCHENS", children }: { title?: string; children?: ReactNode }) {
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

function Btn({ x, y, w, h = 6, label, strong, c }: { x: number; y: number; w: number; h?: number; label: string; strong?: boolean; c?: string }) {
  return (
    <g>
      <Chip x={x} y={y} w={w} h={h} c={c ?? (strong ? ACC : NEU)} />
      <Txt x={x + w / 2} y={y + h / 2 + 1.2} size={2.6} anchor="middle" c={strong ? "#FFFFFF" : "#1B1B1F"}>
        {label}
      </Txt>
    </g>
  );
}

function Path({ y, at }: { y: number; at: number }) {
  return (
    <g>
      <rect x={46} y={y - 0.5} width={68} height={1} fill="#9AA5B5" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={46 + i * 22.6 - 2.5} y={y - 2.5} width={5} height={5} fill={i < at ? ACC : i === at ? "#FFFFFF" : NEU} stroke={ACC} strokeWidth={0.5} />
      ))}
    </g>
  );
}

function Planner({ journey }: { journey: boolean }) {
  return (
    <Site title="PLANNER">
      {journey ? (
        <g>
          <rect x={42} y={12} width={76} height={14} fill="#F6EDE4" />
          <Txt x={44} y={18} size={2.9}>YOUR NEW KITCHEN</Txt>
          <Txt x={44} y={23.5} size={2.4} c="#556274">4 STAGES · PLAN + OFFER</Txt>
          <Path y={34} at={0} />
          <Btn x={43} y={44} w={74} h={8} label="START WITH YOUR ROOM" strong />
        </g>
      ) : (
        ["ROOM", "CATALOGUE", "WORKTOPS", "APPLIANCES", "PRICES", "SAVED"].map((l, i) => <Btn key={l} x={43 + (i % 2) * 38} y={14 + Math.floor(i / 2) * 11} w={36} h={8} label={l} />)
      )}
    </Site>
  );
}

function Stage({ good }: { good: boolean }) {
  return (
    <Site title="LAYOUT">
      {good ? (
        <g>
          <Txt x={44} y={16} size={2.6} c={ACC}>GOAL: PLAN + OFFER</Txt>
          <Path y={24} at={4} />
          <rect x={42} y={31} width={76} height={12} fill="#F6EDE4" />
          <Txt x={44} y={38.5} size={2.9}>YOUR PLAN IS READY</Txt>
          <Btn x={43} y={47} w={50} h={7} label="SEE MY PLAN" strong />
        </g>
      ) : (
        <g>
          <rect x={42} y={18} width={76} height={12} fill={NEU} />
          <Txt x={44} y={25.5} size={2.9} c="#556274">DATA SAVED.</Txt>
          <Btn x={43} y={44} w={30} h={7} label="NEXT" />
        </g>
      )}
    </Site>
  );
}

function Between({ kind }: { kind: "bare" | "staged" | "short" }) {
  return (
    <Site title="PLANNER">
      <Txt x={44} y={15} size={2.5} c="#556274">STEP 1 · ROOM · DONE</Txt>
      {kind === "bare" && <Btn x={43} y={40} w={30} h={7} label="NEXT" />}
      {kind === "staged" && (
        <g>
          <rect x={42} y={18} width={76} height={26} fill="#EADBCB" />
          <Txt x={44} y={25} size={2.5}>IMAGINE A SUNDAY…</Txt>
          <Txt x={44} y={31} size={2.5}>THE SMELL OF COFFEE…</Txt>
          <Txt x={44} y={37} size={2.5}>MEMORIES ARE MADE…</Txt>
          <Btn x={43} y={48} w={50} h={7} label="CONTINUE THE STORY" />
        </g>
      )}
      {kind === "short" && (
        <g>
          <rect x={42} y={19} width={76} height={14} fill="#F6EDE4" />
          <Txt x={44} y={25} size={2.8}>YOUR ROOM IS IN.</Txt>
          <Txt x={44} y={30.5} size={2.4} c="#556274">NEXT: YOUR STYLE</Txt>
          <Btn x={43} y={40} w={50} h={7} label="CHOOSE STYLE" strong />
        </g>
      )}
    </Site>
  );
}

function Film() {
  return (
    <Site title="PLANNER">
      <rect x={44} y={13} width={72} height={30} fill="#3A2A1E" />
      <Txt x={80} y={30} size={3} anchor="middle" c="#FFFFFF">▶ OUR STORY</Txt>
      <Btn x={43} y={47} w={74} h={7} label="SCROLL TO CONTINUE ↓" />
    </Site>
  );
}

function Matrix() {
  return (
    <Board x={36} y={4} w={88} h={60}>
      <line x1={46} y1={56} x2={118} y2={56} stroke="#1B1B1F" strokeWidth={0.8} />
      <line x1={46} y1={10} x2={46} y2={56} stroke="#1B1B1F" strokeWidth={0.8} />
      <Txt x={82} y={62} size={2.8} anchor="middle" c="#556274">CLEAR →</Txt>
      <Txt x={40} y={34} size={2.8} anchor="middle" c="#556274">STORY</Txt>
      <rect x={88} y={12} width={28} height={18} fill="#B5E3C8" />
      <Txt x={102} y={22.5} size={3} anchor="middle">THE AIM</Txt>
      {[[54, 14, "A"], [104, 20, "B"], [110, 48, "C"], [66, 50, "D"], [88, 34, "E"]].map(([x, y, l]) => (
        <g key={l as string}>
          <rect x={(x as number) - 2.5} y={(y as number) - 2.5} width={5} height={5} fill={ACC} />
          <Txt x={(x as number) + 4} y={(y as number) + 1.5} size={2.8}>{l as string}</Txt>
        </g>
      ))}
    </Board>
  );
}

function Journeys() {
  return (
    <Board x={30} y={6} w={100} h={56}>
      {[["REORDER", "NO STORY"], ["FITTING", "SHORT LINES"], ["KITCHEN", "FULL GUIDANCE"]].map(([a, b], i) => (
        <g key={a}>
          <rect x={34 + i * 32} y={12} width={28} height={36} fill={i === 2 ? "#F6EDE4" : NEU} />
          <Txt x={48 + i * 32} y={19} size={2.8} anchor="middle">{a}</Txt>
          {Array.from({ length: i + 1 }, (_, k) => <rect key={k} x={38 + i * 32} y={24 + k * 6} width={20} height={4} fill={ACC} />)}
          <Txt x={48 + i * 32} y={45} size={2.2} anchor="middle" c="#556274">{b}</Txt>
        </g>
      ))}
      <Txt x={80} y={57} size={3.2} anchor="middle" c="#556274">SIZED TO THE JOURNEY</Txt>
    </Board>
  );
}

const S = (s: string) => tt(s);

export const ART_D8: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={S("Iris opens the planner and sees six functions")} left={{ who: "iris", face: "worried" }}>
      <Planner journey={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a1-2": (
    <Duo label={S("Iris browses and puts it off")} left={{ who: "iris", face: "sad" }}>
      <Notes x={40} y={6} w={112} title="WITHOUT A JOURNEY" items={[{ icon: "ask", text: "WHERE DO I START?" }, { icon: "clock", text: "ANOTHER DAY" }]} />
    </Duo>
  ),
  "a1-3": (
    <Duo label={S("The start page shows the goal and a path of four stages; Iris starts")} left={{ who: "iris", face: "happy", pose: "up" }}>
      <Planner journey />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a1-4": (
    <Duo label={S("The rule: a beginning, a goal, a way and an end")} left={{ who: "june", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="PEOPLE ASK" items={[{ icon: "play", text: "WHERE DO I START?" }, { icon: "eye", text: "WHERE AM I GOING?" }, { icon: "chart", text: "HOW FAR AM I?" }, { icon: "check", text: "AM I DONE?" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={S("Pavel sees Data saved and a Next button")} left={{ who: "pavel", face: "worried" }}>
      <Stage good={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a2-2": (
    <Duo label={S("June lists the seven elements and circles goal, progress and resolution")} left={{ who: "june", face: "think" }}>
      <Notes x={40} y={6} w={112} title="SEVEN ELEMENTS" items={[{ text: "START, GOAL, RELEVANCE" }, { text: "OBSTACLE, SUPPORT" }, { text: "PROGRESS, RESOLUTION" }]} sub="MISSING: GOAL, PATH, END" />
    </Duo>
  ),
  "a2-3": (
    <Duo label={S("The goal, the path and Your plan is ready: Pavel is done")} left={{ who: "pavel", face: "happy", pose: "up" }}>
      <Stage good />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a2-4": (
    <Duo label={S("The rule: show the goal, show the way, end it")} left={{ who: "june", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="NARRATIVE GUIDANCE" items={[{ tick: true, text: "A GOAL TO SEE" }, { tick: true, text: "PROGRESS TO SEE" }, { tick: true, text: "AN ENDING" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={S("Between two steps only Next: Iris is unsure her room was saved")} left={{ who: "iris", face: "worried" }}>
      <Between kind="bare" />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a3-2": (
    <Duo label={S("A long scene about Sunday mornings delays Iris")} left={{ who: "iris", face: "think" }}>
      <Between kind="staged" />
      <Mark x={9} y={34} kind="zzz" />
    </Duo>
  ),
  "a3-3": (
    <Duo label={S("One line: your room is in, next your style; Iris goes on")} left={{ who: "iris", face: "happy", pose: "up" }}>
      <Between kind="short" />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a3-4": (
    <Duo label={S("The rule: put the dramaturgy into the journey, in small places")} left={{ who: "june", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="DRAMATURGY" items={[{ text: "TENSION, EXPECTATION" }, { text: "SEQUENCE, TRANSITION" }, { text: "CONFIRMATION, CONTEXT" }]} sub="IN SMALL PLACES" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={S("Arne adds a brand film at the start")} left={{ who: "arne", face: "happy", pose: "point" }}>
      <Film />
    </Duo>
  ),
  "a4-2": (
    <Duo label={S("Pavel cannot find the next step behind the film and the scenes")} left={{ who: "pavel", face: "sad" }}>
      <Film />
      <Mark x={9} y={34} kind="bang" />
    </Duo>
  ),
  "a4-3": (
    <Duo label={S("On the matrix, a clear story is both clear and guiding")} left={{ who: "june", face: "think" }}>
      <Matrix />
    </Duo>
  ),
  "a4-4": (
    <Duo label={S("The rule: if the steps are harder to find, the story is too big")} left={{ who: "june", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="NOT THIS" items={[{ cross: true, text: "TOO MUCH STAGING" }, { cross: true, text: "LONG TEXTS" }, { cross: true, text: "LONGER PATHS" }]} sub="A CLEAR STORY" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={S("Arne has three ideas: a goal, a path, a film")} left={{ who: "arne", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="THREE IDEAS" items={[{ icon: "eye", text: "GOAL ON SCREEN ONE" }, { icon: "chart", text: "PATH OF 4 STAGES" }, { icon: "play", text: "BRAND FILM" }]} />
    </Duo>
  ),
  "a5-2": (
    <Duo label={S("June weighs the goal on the first screen: big effect, easy, low risk")} left={{ who: "june", face: "think" }}>
      <Rate x={40} y={6} w={112} title="GOAL ON SCREEN ONE" rows={[["EFFECT", 3, "HIGH"], ["FEASIBLE", 3, "HIGH"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={S("The film: little effect, hard to make, high risk")} left={{ who: "arne", face: "surprised" }}>
      <Rate x={40} y={6} w={112} title="BRAND FILM" rows={[["EFFECT", 1, "LOW"], ["FEASIBLE", 1, "LOW"], ["RISK", 3, "HIGH"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={S("The rule: give each action a context and a place, and weigh every measure")} left={{ who: "june", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="ACTION TO MEANING" items={[{ text: "AN ACTION" }, { text: "ITS CONTEXT" }, { text: "ITS PLACE" }, { text: "A MEANING" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={S("The website promises a journey; the planner is a list of fields")} left={{ who: "iris", face: "sad" }}>
      <Planner journey={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "b1-2": (
    <Duo label={S("June: the product teams build the journeys, step by step")} left={{ who: "june", face: "think" }}>
      <Notes x={40} y={6} w={112} title="WHERE IT LIVES" items={[{ text: "THE FIRST SCREEN" }, { text: "BETWEEN THE STEPS" }, { text: "THE ENDING" }]} sub="NOBODY DECIDED HOW" />
    </Duo>
  ),
  "b1-3": (
    <Duo label={S("A guiding vision and patterns for every journey")} left={{ who: "arne", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="NARRATIVE UX" items={[{ tick: true, text: "A GUIDING VISION" }, { tick: true, text: "PRINCIPLES" }, { tick: true, text: "PATTERNS" }]} />
    </Duo>
  ),
  "b1-4": (
    <Duo label={S("The rule: narrative structure belongs in the experience architecture")} left={{ who: "june", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="THE LAYERS" items={[{ text: "VISION" }, { text: "PRINCIPLES" }, { text: "PATTERNS" }, { text: "EVERY JOURNEY" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Duo label={S("Arne wants story everywhere; June thinks of Pavel and his handle")} left={{ who: "arne", face: "happy", pose: "point" }} right={{ who: "june", face: "think" }}>
      <Notes x={34} y={6} w={92} title="TWO GOALS" items={[{ icon: "heart", text: "STORY EVERYWHERE" }, { icon: "clock", text: "JUST A HANDLE" }]} />
    </Duo>
  ),
  "b2-2": (
    <Duo label={S("Three journeys, three amounts of guidance")} left={{ who: "june", face: "think" }}>
      <Journeys />
    </Duo>
  ),
  "b2-3": (
    <Duo label={S("They agree: the story sized to each journey, the brand story on the website")} left={{ who: "arne", face: "neutral" }}>
      <Notes x={40} y={6} w={112} title="WE CHOOSE" items={[{ tick: true, text: "REORDER: NO STORY" }, { tick: true, text: "KITCHEN: FULL GUIDANCE" }, { cross: true, text: "GIVE UP: THE FILM" }]} />
    </Duo>
  ),
  "b2-4": (
    <Duo label={S("The rule: story where it serves the task, sized to the journey")} left={{ who: "june", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="CONFLICTS" items={[{ text: "QUICK VS STORY" }, { text: "INSPIRING VS SERIOUS" }, { text: "BRAND VS TASK" }]} sub="SIZE IT TO THE JOURNEY" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={S("Arne: nobody knows where customers stop; should we measure first?")} left={{ who: "arne", face: "worried" }}>
      <Notes x={40} y={6} w={112} title="WE DO NOT KNOW" items={[{ icon: "ask", text: "WHERE THEY STOP" }, { icon: "clock", text: "WAIT FOR DATA?" }]} />
    </Duo>
  ),
  "b3-2": (
    <Duo label={S("June decides on the goal and the path first and says when she would reverse it")} left={{ who: "june", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="A DECISION" items={[{ tick: true, text: "WE DECIDE" }, { icon: "ask", text: "WE DO NOT KNOW" }, { icon: "clock", text: "WE REVERSE IF" }]} sub="AND WHAT WE GIVE UP" />
    </Duo>
  ),
  "b3-3": (
    <Duo label={S("Who decides: clear first, then the customer, then the brand")} left={{ who: "june", face: "neutral" }} right={{ who: "arne", face: "happy" }}>
      <Notes x={34} y={6} w={92} title="WHO OWNS IT" items={[{ text: "CX LEAD: JOURNEYS" }, { text: "EXPERTS: FACTS" }, { text: "MARKETING: BRAND" }]} />
    </Duo>
  ),
  "b3-4": (
    <Duo label={S("The rule: an owner of the journeys, a rule for conflicts, decide then check")} left={{ who: "june", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="GOVERNANCE" items={[{ tick: true, text: "AN OWNER OF JOURNEYS" }, { tick: true, text: "A RULE FOR CONFLICTS" }, { tick: true, text: "DECIDE, THEN CHECK" }]} />
    </Duo>
  ),
};
