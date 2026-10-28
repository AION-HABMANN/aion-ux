import type { ReactNode } from "react";
import { Board, Chip, LOOK, Mark, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 9 comics (data/day9/comics.ts, DL-STANDARD.md section 13). People: Vera and Kaspar (customers of Brightwater Savings, a made-up
 * savings bank), Rhea (its UX designer) and Dominik (its product owner). Every label is a short capital word.
 */
LOOK.vera = { hair: "#7A3B1E", shirt: "#3E7C8C", long: true };
LOOK.kaspar = { hair: "#2A2420", shirt: "#7B5EA7", glasses: true };
LOOK.rhea = { hair: "#151518", shirt: "#C2563A", long: true, skin: "#B9784C" };
LOOK.dominik = { hair: "#C9A86A", shirt: "#4D5866" };

const ACC = "#0E5E6F";
const NEU = "#E4E8EE";
const LOUD = ["#DC2626", "#7C3AED", "#F59E0B", "#DB2777", "#2563EB", "#16A34A", "#EA580C", "#9333EA"];

function App({ title = "BRIGHTWATER", bar = ACC, children }: { title?: string; bar?: string; children?: ReactNode }) {
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

function Btn({ x, y, w, h = 6, label, strong, c }: { x: number; y: number; w: number; h?: number; label: string; strong?: boolean; c?: string }) {
  return (
    <g>
      <Chip x={x} y={y} w={w} h={h} c={c ?? (strong ? ACC : NEU)} />
      <Txt x={x + w / 2} y={y + h / 2 + 1.2} size={2.6} anchor="middle" c={strong || c ? "#FFFFFF" : "#1B1B1F"}>
        {label}
      </Txt>
    </g>
  );
}

function Bar({ y, of, done }: { y: number; of: number; done: number }) {
  return (
    <g>
      {Array.from({ length: of }, (_, i) => (
        <rect key={i} x={44 + i * (72 / of)} y={y} width={72 / of - 1.5} height={3} fill={i < done ? ACC : NEU} />
      ))}
    </g>
  );
}

function Plain() {
  return (
    <App>
      <rect x={42} y={18} width={76} height={12} fill={NEU} />
      <Txt x={44} y={25.5} size={2.8} c="#556274">TRANSACTION COMPLETED.</Txt>
      <Btn x={43} y={46} w={40} h={7} label="OVERVIEW" />
    </App>
  );
}

function Position() {
  return (
    <App>
      <Txt x={44} y={16} size={2.6} c={ACC}>GOAL: 3 MONTHS' RENT</Txt>
      <Bar y={20} of={3} done={2} />
      <Txt x={44} y={29} size={2.4} c="#556274">2 OF 3 MONTHS · ONE TO GO</Txt>
      <rect x={42} y={33} width={76} height={11} fill="#FFF3D6" />
      <Txt x={44} y={39.6} size={2.6}>4 MONTHS IN A ROW!</Txt>
      <Btn x={43} y={49} w={44} h={7} label="SEE MY PLAN" strong />
    </App>
  );
}

function Piggy() {
  return (
    <App title="BRIGHTWATER ✨" bar="#FF6FB1">
      <rect x={41} y={11} width={78} height={52} fill="#FFE3F1" />
      <Txt x={80} y={24} size={6} anchor="middle" c="#C2186B">♥ PIGGY ♥</Txt>
      <Txt x={80} y={32} size={2.8} anchor="middle" c="#C2186B">MONEY MAGIC!!</Txt>
      <Btn x={50} y={44} w={60} h={8} label="FEED MY PIGGY!" c="#FF6FB1" />
    </App>
  );
}

function Steps3() {
  return (
    <App>
      <Bar y={14} of={3} done={2} />
      <Txt x={44} y={22} size={2.6} c="#556274">STEP 2 OF 3 · AMOUNT</Txt>
      <rect x={42} y={26} width={76} height={10} fill="#E6F2F4" />
      <Txt x={44} y={32.4} size={2.4}>GOAL NAMED. NEXT: AMOUNT</Txt>
      <Btn x={43} y={46} w={56} h={7} label="CONTINUE" strong />
    </App>
  );
}

function Loud({ n = 8 }: { n?: number }) {
  const words = ["+50 XP", "BADGE!", "#38", "02:14:09", "🔥 12", "CHEST", "9 NEW", "LEVEL 6"];
  return (
    <App>
      {words.slice(0, n).map((w, i) => (
        <g key={w}>
          <Chip x={42 + (i % 2) * 38} y={13 + Math.floor(i / 2) * 12} w={36} h={9} c={LOUD[i]} />
          <Txt x={60 + (i % 2) * 38} y={19 + Math.floor(i / 2) * 12} size={2.8} anchor="middle" c="#FFFFFF">{w}</Txt>
        </g>
      ))}
    </App>
  );
}

function Plan({ named }: { named: boolean }) {
  const rows = named ? ["M1 · BROKEN PHONE", "M3 · BROKEN BOILER", "M6 · A MONTH'S RENT", "M9 · THREE MONTHS"] : ["STEP 1 OF 12", "STEP 3 OF 12", "STEP 6 OF 12", "STEP 9 OF 12"];
  return (
    <App title="MY PLAN">
      {rows.map((r, i) => (
        <g key={r}>
          <rect x={44} y={14 + i * 11} width={5} height={5} fill={i < 2 ? ACC : NEU} />
          <Txt x={52} y={18 + i * 11} size={2.7}>{r}</Txt>
        </g>
      ))}
    </App>
  );
}

function Window({ late }: { late: boolean }) {
  const h = late ? [8, 18, 28] : [28, 18, 8];
  return (
    <Board x={40} y={4} w={80} h={60}>
      <Txt x={80} y={12} size={3} anchor="middle">{late ? "AFTER 3 MONTHS" : "AFTER 1 WEEK"}</Txt>
      {["LOUD", "PROGRESS", "STAGES"].map((l, i) => (
        <g key={l}>
          <rect x={48 + i * 24} y={52 - h[i]} width={14} height={h[i]} fill={i === (late ? 2 : 0) ? ACC : "#9AA5B5"} />
          <Txt x={55 + i * 24} y={58} size={2.4} anchor="middle" c="#556274">{l}</Txt>
        </g>
      ))}
    </Board>
  );
}

function Ranking() {
  return (
    <App title="TOP SAVERS">
      {[["1. M.K.", "14 MO"], ["2. S.T.", "13 MO"], ["…", ""], ["412. YOU", "2 MO"]].map(([a, b], i) => (
        <g key={a}>
          <rect x={42} y={13 + i * 11} width={76} height={8} fill={i === 3 ? "#FDE2E2" : NEU} />
          <Txt x={44} y={18.4 + i * 11} size={2.7}>{a}</Txt>
          <Txt x={116} y={18.4 + i * 11} size={2.7} anchor="end">{b}</Txt>
        </g>
      ))}
    </App>
  );
}

function Streak() {
  return (
    <App>
      <rect x={42} y={14} width={76} height={22} fill="#FFE4D6" />
      <Txt x={44} y={21} size={2.9} c="#B23A00">🔥 DON'T LOSE YOUR</Txt>
      <Txt x={44} y={27} size={2.9} c="#B23A00">12-WEEK STREAK!</Txt>
      <Txt x={44} y={32.5} size={2.4} c="#556274">SAVE BEFORE MIDNIGHT</Txt>
      <Btn x={43} y={46} w={56} h={7} label="SAVE SOMETHING NOW" strong />
    </App>
  );
}

function Milestone() {
  return (
    <App>
      <rect x={42} y={14} width={76} height={22} fill="#E6F2F4" />
      <Txt x={44} y={21} size={2.9}>MILESTONE: 3 MONTHS</Txt>
      <Txt x={44} y={27} size={2.5} c="#556274">COVERS A BROKEN BOILER</Txt>
      <Txt x={44} y={32.5} size={2.5} c="#556274">NEXT: A MONTH'S RENT</Txt>
      <Btn x={43} y={46} w={44} h={7} label="SEE MY PLAN" strong />
    </App>
  );
}

function Coins({ on }: { on: boolean }) {
  return (
    <App>
      <Txt x={44} y={17} size={2.8}>MONTHLY SAVING</Txt>
      {on ? (
        <g>
          <rect x={42} y={22} width={76} height={14} fill="#FFF3D6" />
          <Txt x={44} y={30.6} size={3}>+200 COINS! 💰</Txt>
        </g>
      ) : (
        <g>
          <rect x={42} y={22} width={76} height={14} fill={NEU} />
          <Txt x={44} y={30.6} size={2.6} c="#556274">COIN PROGRAMME ENDED</Txt>
        </g>
      )}
      <Btn x={43} y={46} w={40} h={7} label="SAVE" strong={on} />
    </App>
  );
}

const S = (s: string) => tt(s);

export const ART_D9: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={S("Dominik brings the board's brief: make it more like a game")} left={{ who: "dominik", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="THE BRIEF" items={[{ icon: "play", text: "MAKE IT FUN" }, { icon: "ask", text: "LIKE A GAME?" }]} />
    </Duo>
  ),
  "a1-2": (
    <Duo label={S("The pink piggy version; Vera asks whether this is her money or a toy")} left={{ who: "vera", face: "worried" }}>
      <Piggy />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a1-3": (
    <Duo label={S("Three steps and one line; Vera knows where she is")} left={{ who: "vera", face: "happy", pose: "up" }}>
      <Steps3 />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a1-4": (
    <Duo label={S("The rule: structure freely, tone carefully, fiction almost never")} left={{ who: "rhea", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="THREE REQUESTS" items={[{ tick: true, text: "STRUCTURE: FREELY" }, { icon: "warn", text: "TONE: CAREFULLY" }, { cross: true, text: "FICTION: ALMOST NEVER" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={S("Kaspar saves and sees only Transaction completed")} left={{ who: "kaspar", face: "worried" }}>
      <Plain />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a2-2": (
    <Duo label={S("Rhea lists five kinds of information and their levers")} left={{ who: "rhea", face: "think" }}>
      <Notes x={40} y={6} w={112} title="HIS POSITION" items={[{ icon: "chart", text: "PROGRESS" }, { icon: "check", text: "FEEDBACK" }, { icon: "heart", text: "RECOGNITION" }, { icon: "up", text: "CHALLENGE · GOAL" }]} />
    </Duo>
  ),
  "a2-3": (
    <Duo label={S("Two of three months saved and four months in a row: Kaspar believes he can do it")} left={{ who: "kaspar", face: "happy", pose: "up" }}>
      <Position />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a2-4": (
    <Duo label={S("The rule: name the lever before you pick the mechanic")} left={{ who: "rhea", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="LEVERS" items={[{ text: "REWARD · COMPETENCE" }, { text: "SELF-EFFICACY" }, { text: "SOCIAL · PROGRESS · TRIGGER" }]} sub="LEVER FIRST" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={S("Every team adds one more signal")} left={{ who: "dominik", face: "happy", pose: "point" }}>
      <Loud n={5} />
    </Duo>
  ),
  "a3-2": (
    <Duo label={S("Eight signals blink at once; Vera closes the app")} left={{ who: "vera", face: "sad" }}>
      <Loud n={8} />
      <Mark x={9} y={34} kind="bang" />
    </Duo>
  ),
  "a3-3": (
    <Duo label={S("The countdown ends every night; Vera feels tricked")} left={{ who: "vera", face: "worried" }}>
      <Notes x={40} y={6} w={112} title="EVERY NIGHT" items={[{ icon: "clock", text: "BONUS ENDS TONIGHT" }, { icon: "clock", text: "BONUS ENDS TONIGHT" }, { cross: true, text: "TRUST LOST" }]} />
    </Duo>
  ),
  "a3-4": (
    <Duo label={S("The rule: one job per tool, count the signals, never fake urgency")} left={{ who: "rhea", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="TOOLS" items={[{ tick: true, text: "ONE JOB EACH" }, { tick: true, text: "COUNT THE SIGNALS" }, { cross: true, text: "FAKE URGENCY" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={S("Vera's plan says Step 6 of 12")} left={{ who: "vera", face: "sad" }}>
      <Plan named={false} />
    </Duo>
  ),
  "a4-2": (
    <Duo label={S("The stages are named after real life; Vera recognises them")} left={{ who: "vera", face: "happy", pose: "up" }}>
      <Plan named />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a4-3": (
    <Duo label={S("After three months the named stages lead")} left={{ who: "rhea", face: "think" }} right={{ who: "dominik", face: "surprised" }}>
      <Window late />
    </Duo>
  ),
  "a4-4": (
    <Duo label={S("The rule: name the stages after real life, measure what lasts")} left={{ who: "rhea", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="STORY + GAME" items={[{ tick: true, text: "TRUE STAGES" }, { tick: true, text: "SAME MECHANICS" }, { icon: "clock", text: "MEASURE MONTHS" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={S("The app pays Kaspar coins for saving")} left={{ who: "kaspar", face: "happy" }}>
      <Coins on />
    </Duo>
  ),
  "a5-2": (
    <Duo label={S("The coins end; Kaspar stops saving")} left={{ who: "kaspar", face: "sad" }}>
      <Coins on={false} />
      <Mark x={9} y={34} kind="zzz" />
    </Duo>
  ),
  "a5-3": (
    <Duo label={S("Rhea asks four questions of a city ranking")} left={{ who: "rhea", face: "think" }}>
      <Notes x={40} y={6} w={112} title="FOUR QUESTIONS" items={[{ icon: "book", text: "SAY IT PLAINLY" }, { icon: "down", text: "WHO IS LAST?" }, { icon: "heart", text: "A BAD MOMENT?" }, { icon: "gear", text: "WHO REMOVES IT?" }]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={S("The rule: reward only what people would not do anyway, weigh every measure")} left={{ who: "rhea", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="WE CHOOSE" items={[{ tick: true, text: "STAGES" }, { tick: true, text: "HONEST WORDS" }, { cross: true, text: "CITY RANKING" }]} sub="AND HERE IS WHY" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={S("Five years of requests made the app loud")} left={{ who: "vera", face: "worried" }}>
      <Loud n={8} />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "b1-2": (
    <Duo label={S("Rhea writes the vision and the levers the bank will not use")} left={{ who: "rhea", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="OUR VISION" items={[{ tick: true, text: "SEE THE CUSHION GROW" }, { cross: true, text: "NO RANKINGS" }, { cross: true, text: "NO FAKE URGENCY" }]} />
    </Duo>
  ),
  "b1-3": (
    <Duo label={S("Patterns built once, used everywhere")} left={{ who: "dominik", face: "happy" }}>
      <Notes x={40} y={6} w={112} title="PATTERNS" items={[{ icon: "chart", text: "PLAN IN STAGES" }, { icon: "check", text: "MONTHLY FEEDBACK" }, { icon: "heart", text: "MILESTONE MESSAGE" }]} sub="APP · WEB · BRANCH" />
    </Duo>
  ),
  "b1-4": (
    <Duo label={S("The rule: we steer behaviour, so we answer for it")} left={{ who: "rhea", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="LAYERS" items={[{ text: "VISION" }, { text: "PRINCIPLES" }, { text: "PATTERNS → TOUCHPOINTS" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Duo label={S("Sales wants a midnight streak warning; the advisers object")} left={{ who: "dominik", face: "happy", pose: "point" }} right={{ who: "rhea", face: "worried" }}>
      <Streak />
    </Duo>
  ),
  "b2-2": (
    <Duo label={S("Three levers and what each one costs")} left={{ who: "rhea", face: "think" }}>
      <Notes x={40} y={6} w={112} title="WHAT IT COSTS" items={[{ icon: "warn", text: "STREAK: AUTONOMY" }, { cross: true, text: "RANKING: TRUST" }, { tick: true, text: "MILESTONE: LITTLE" }]} />
    </Duo>
  ),
  "b2-3": (
    <Duo label={S("They choose milestones and give up the launch spike")} left={{ who: "dominik", face: "neutral" }}>
      <Milestone />
    </Duo>
  ),
  "b2-4": (
    <Duo label={S("The rule: choose the lever on purpose, and choose what you measure")} left={{ who: "rhea", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="CONFLICTS" items={[{ text: "LIVELY VS SERIOUS" }, { text: "PUSH VS CHOICE" }, { text: "BRAND VS CUSTOMER" }]} sub="MEASURE WHAT LASTS" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={S("A journalist asks who decided the ranking; nobody knows")} left={{ who: "dominik", face: "worried" }}>
      <Ranking />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "b3-2": (
    <Duo label={S("Rhea writes an owner, a principle, a removal path and an escalation rule")} left={{ who: "rhea", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="GOVERNANCE" items={[{ tick: true, text: "AN OWNER" }, { tick: true, text: "A WRITTEN REASON" }, { tick: true, text: "A YEARLY REVIEW" }]} />
    </Duo>
  ),
  "b3-3": (
    <Duo label={S("Rhea decides without the data and says when she would reverse it")} left={{ who: "rhea", face: "neutral" }}>
      <Notes x={40} y={6} w={112} title="A DECISION" items={[{ tick: true, text: "WE DECIDE" }, { icon: "ask", text: "WE DO NOT KNOW" }, { icon: "clock", text: "WE REVERSE IF" }]} sub="AND WHAT WE GIVE UP" />
    </Duo>
  ),
  "b3-4": (
    <Duo label={S("The rule: write the paragraph before anyone asks")} left={{ who: "rhea", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="THE RECORD" items={[{ text: "WHO DECIDED" }, { text: "ON WHAT PRINCIPLE" }, { text: "WHAT WOULD CHANGE IT" }]} />
    </Duo>
  ),
};
