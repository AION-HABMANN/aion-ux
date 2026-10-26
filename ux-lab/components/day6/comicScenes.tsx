import type { ReactNode } from "react";
import { Board, Chip, LOOK, Lines, Mark, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 6 comics (data/day6/comics.ts, DL-STANDARD.md section 13). People: Elif and Noah (passengers of Seabird Ferries, a made-up ferry
 * operator), Greta (its design-system lead) and Malte (its product owner). Every label is a short capital word.
 */
LOOK.elif = { hair: "#1F1F24", shirt: "#B5372E", long: true, skin: "#C68A5A" };
LOOK.noah = { hair: "#9B4A1E", shirt: "#3D7BD9" };
LOOK.greta = { hair: "#C9A25A", shirt: "#0B8A82", long: true, glasses: true };
LOOK.malte = { hair: "#2B2B2B", shirt: "#555B66", glasses: true };

const ACC = "#1B5E8C";
const NEU = "#E4E8EE";

function Site({ title = "SEABIRD", children }: { title?: string; children?: ReactNode }) {
  return (
    <Board x={40} y={4} w={80} h={60}>
      <rect x={40} y={4} width={80} height={6} fill={ACC} />
      <Txt x={80} y={8.6} size={3.4} anchor="middle" c="#FFFFFF">
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

function Groups({ grouped }: { grouped: boolean }) {
  const items = ["BOOK", "MY TRIPS", "TIMES", "LUGGAGE", "PETS", "ACCESS"];
  return (
    <Site>
      {grouped ? (
        <g>
          <rect x={42} y={12} width={37} height={36} fill="none" stroke="#9AA5B5" strokeWidth={0.6} />
          <rect x={81} y={12} width={37} height={36} fill="none" stroke="#9AA5B5" strokeWidth={0.6} />
          {items.slice(0, 3).map((l, i) => <Btn key={l} x={44} y={15 + i * 10} w={33} label={l} c="#DCE9F3" />)}
          {items.slice(3).map((l, i) => <Btn key={l} x={83} y={15 + i * 10} w={33} label={l} c="#F1EDE3" />)}
        </g>
      ) : (
        items.map((l, i) => <Btn key={l} x={[44, 84, 58, 92, 46, 76][i]} y={[13, 18, 27, 34, 44, 52][i]} w={24} label={l} c={["#DCE9F3", "#F1EDE3", "#E5E5E5", "#E9DCF3", "#DCE9F3", "#F1EDE3"][i]} />)
      )}
    </Site>
  );
}

function Step({ clear }: { clear: boolean }) {
  return (
    <Site title="BOOKING">
      {clear ? (
        <g>
          <Txt x={44} y={16} size={3.2}>HARBOUR → GULL ISLAND</Txt>
          <Btn x={43} y={24} w={74} h={9} label="CONTINUE" strong />
          <Txt x={44} y={40} size={2.6} c={ACC}>CABIN · SAVE · CHANGE DATE</Txt>
        </g>
      ) : (
        <g>
          <Btn x={43} y={13} w={74} label="SUMMER OFFER" c="#F6D6D6" />
          <Btn x={43} y={21} w={74} label="NOTICE: CHECK-IN" c="#F6EDC9" />
          {["CONTINUE", "ADD CABIN", "SAVE", "CHANGE"].map((b, i) => <Btn key={b} x={43 + (i % 2) * 38} y={32 + Math.floor(i / 2) * 9} w={36} label={b} c="#BDC5D0" />)}
        </g>
      )}
    </Site>
  );
}

function Form({ kind }: { kind: "all" | "staged" | "hidden" }) {
  return (
    <Site title="BOOKING FORM">
      {kind === "all" && Array.from({ length: 12 }, (_, i) => <rect key={i} x={43 + (i % 2) * 38} y={13 + Math.floor(i / 2) * 8} width={35} height={5} fill="#FFFFFF" stroke="#9AA5B5" strokeWidth={0.5} />)}
      {kind === "staged" && (
        <g>
          <Txt x={44} y={16} size={2.8}>STEP 1 OF 3</Txt>
          {[0, 1].map((i) => <rect key={i} x={43} y={20 + i * 9} width={74} height={6} fill="#FFFFFF" stroke="#9AA5B5" strokeWidth={0.5} />)}
          <Txt x={44} y={46} size={2.6} c={ACC}>LUGGAGE RULES ›</Txt>
          <Txt x={44} y={53} size={2.6} c={ACC}>+ VEHICLE  + PET</Txt>
        </g>
      )}
      {kind === "hidden" && (
        <g>
          {[0, 1].map((i) => <rect key={i} x={43} y={16 + i * 10} width={74} height={6} fill="#FFFFFF" stroke="#9AA5B5" strokeWidth={0.5} />)}
          <Btn x={43} y={44} w={74} h={8} label="BOOK" strong />
        </g>
      )}
    </Site>
  );
}

function Areas({ same }: { same: boolean }) {
  return (
    <Board x={30} y={6} w={100} h={56}>
      {["TICKETS", "FREIGHT"].map((a, i) => (
        <g key={a}>
          <rect x={34 + i * 48} y={12} width={44} height={36} fill={NEU} />
          <Txt x={56 + i * 48} y={18} size={2.9} anchor="middle" c="#556274">{a}</Txt>
          {i === 0 || same ? <Chip x={38 + i * 48} y={38} w={36} h={7} c={ACC} /> : <Chip x={66 + 48} y={21} w={10} h={4} c={ACC} />}
          <Lines x={38 + i * 48} y={24} w={30} n={3} gap={3.4} />
        </g>
      ))}
      <Txt x={80} y={57} size={3.2} anchor="middle" c="#556274">{same ? "ONE PATTERN FOR ONE TASK" : "EACH AREA ITS OWN PATTERN"}</Txt>
    </Board>
  );
}

function Teams({ shared }: { shared: boolean }) {
  return (
    <Board x={30} y={6} w={100} h={56}>
      {["TICKETS", "FREIGHT", "APP"].map((c, i) => (
        <g key={c}>
          <rect x={34 + i * 32} y={12} width={28} height={36} fill={NEU} />
          <Txt x={48 + i * 32} y={18} size={2.7} anchor="middle" c="#556274">{c}</Txt>
          <rect x={37 + i * 32} y={24} width={22} height={shared ? 18 : [10, 16, 13][i]} fill="#FFFFFF" stroke={shared ? ACC : ["#D9534F", "#F59E0B", "#7A4DE8"][i]} strokeWidth={0.8} />
        </g>
      ))}
      <Txt x={80} y={57} size={3.2} anchor="middle" c="#556274">{shared ? "ONE SHARED FORM COMPONENT" : "THREE TEAMS, THREE FORMS"}</Txt>
    </Board>
  );
}

function Matrix() {
  return (
    <Board x={36} y={4} w={88} h={60}>
      <line x1={46} y1={56} x2={118} y2={56} stroke="#1B1B1F" strokeWidth={0.8} />
      <line x1={46} y1={10} x2={46} y2={56} stroke="#1B1B1F" strokeWidth={0.8} />
      <Txt x={82} y={62} size={2.8} anchor="middle" c="#556274">CONSISTENT →</Txt>
      <Txt x={40} y={34} size={2.8} anchor="middle" c="#556274">FAST</Txt>
      <rect x={90} y={12} width={26} height={18} fill="#B5E3C8" />
      <Txt x={103} y={22.5} size={3} anchor="middle">THE AIM</Txt>
      {[[54, 20, "A"], [104, 18, "B"], [112, 46, "C"], [74, 42, "D"]].map(([x, y, l]) => (
        <g key={l as string}>
          <rect x={(x as number) - 2.5} y={(y as number) - 2.5} width={5} height={5} fill={ACC} />
          <Txt x={(x as number) + 4} y={(y as number) + 1.5} size={2.8}>{l as string}</Txt>
        </g>
      ))}
    </Board>
  );
}

const S = (s: string) => tt(s);

export const ART_D6: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={S("Elif looks for the luggage rules among six scattered, mixed-colour links")} left={{ who: "elif", face: "worried" }}>
      <Groups grouped={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a1-2": (
    <Duo label={S("Greta names three Gestalt laws: proximity, similarity, common region")} left={{ who: "greta", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="PEOPLE SEE GROUPS" items={[{ icon: "eye", text: "CLOSE = TOGETHER" }, { icon: "book", text: "ALIKE = TOGETHER" }, { icon: "gear", text: "ONE FRAME = ONE GROUP" }]} />
    </Duo>
  ),
  "a1-3": (
    <Duo label={S("Two framed groups, one look each: Elif finds the luggage rules at once")} left={{ who: "elif", face: "happy", pose: "up" }}>
      <Groups grouped />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a1-4": (
    <Duo label={S("The rule: group what belongs together so people see it at a glance")} left={{ who: "greta", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="GESTALT LAWS" items={[{ tick: true, text: "PROXIMITY, SIMILARITY" }, { tick: true, text: "CONTINUITY, CLOSURE" }, { tick: true, text: "FIGURE, COMMON REGION" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={S("Noah's booking step: an offer, a notice and four buttons, all equally bold")} left={{ who: "noah", face: "think" }}>
      <Step clear={false} />
    </Duo>
  ),
  "a2-2": (
    <Duo label={S("He presses Save instead of Continue")} left={{ who: "noah", face: "surprised" }}>
      <Step clear={false} />
      <Mark x={9} y={34} kind="bang" />
    </Duo>
  ),
  "a2-3": (
    <Duo label={S("With one strong Continue and quiet secondary links, he goes on at once")} left={{ who: "noah", face: "happy", pose: "up" }}>
      <Step clear />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a2-4": (
    <Duo label={S("The rule: decide what comes first and make it look first")} left={{ who: "greta", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="VISUAL HIERARCHY" items={[{ icon: "up", text: "ONE PRIMARY ACTION" }, { icon: "down", text: "SECONDARY: QUIETER" }, { icon: "eye", text: "AN ORDER TO FOLLOW" }]} sub="ARRANGING IS NOT STEERING" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={S("Elif, on foot, faces twelve fields including freight weight and pet passport")} left={{ who: "elif", face: "worried" }}>
      <Form kind="all" />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "a3-2": (
    <Duo label={S("A very reduced form: only name, date and Book; the luggage rules are hidden")} left={{ who: "elif", face: "think" }}>
      <Form kind="hidden" />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a3-3": (
    <Duo label={S("Step by step, with the rules next to the luggage field: Elif fills in three fields and knows the rules")} left={{ who: "elif", face: "happy", pose: "up" }}>
      <Form kind="staged" />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a3-4": (
    <Duo label={S("The rule: show what is relevant now, and keep the rest one clear step away")} left={{ who: "greta", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="PROGRESSIVE DISCLOSURE" items={[{ tick: true, text: "ONLY WHAT APPLIES NOW" }, { tick: true, text: "THE REST ONE STEP AWAY" }, { cross: true, text: "NOT: HIDDEN TOO DEEP" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={S("Noah books a ticket, then freight: the Continue button is somewhere else")} left={{ who: "noah", face: "worried" }}>
      <Areas same={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a4-2": (
    <Duo label={S("Malte: each area was built by a different team")} left={{ who: "malte", face: "think" }}>
      <Notes x={40} y={6} w={112} title="TWO AREAS" items={[{ text: "TICKETS: BUTTON BELOW" }, { text: "FREIGHT: BUTTON TOP RIGHT" }]} sub="EACH PAGE FINE ON ITS OWN" />
    </Duo>
  ),
  "a4-3": (
    <Duo label={S("One pattern for one task: what Noah learnt in tickets works in freight")} left={{ who: "noah", face: "happy", pose: "up" }}>
      <Areas same />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a4-4": (
    <Duo label={S("The rule: the same task, the same pattern, everywhere")} left={{ who: "greta", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="PREDICTABLE" items={[{ icon: "book", text: "LEARN ONCE" }, { icon: "check", text: "PREDICT EVERYWHERE" }, { icon: "warn", text: "A NEW PATTERN COSTS" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={S("Malte has three fixes: grouping, a staged form, a shared form component")} left={{ who: "malte", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="THREE FIXES" items={[{ icon: "book", text: "FRAMED GROUPS" }, { icon: "play", text: "STAGED FORM" }, { icon: "gear", text: "SHARED COMPONENT" }]} />
    </Duo>
  ),
  "a5-2": (
    <Duo label={S("Greta weighs the grouping: some effect, easy, no risk, quick")} left={{ who: "greta", face: "think" }}>
      <Rate x={40} y={6} w={112} title="FRAMED GROUPS" rows={[["EFFECT", 2, "MID"], ["FEASIBLE", 3, "HIGH"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={S("The shared component helps most but takes longest; it keeps the other fixes in place")} left={{ who: "malte", face: "think" }}>
      <Rate x={40} y={6} w={112} title="SHARED COMPONENT" rows={[["EFFECT", 3, "HIGH"], ["FEASIBLE", 1, "LOW"], ["RISK", 2, "MID"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={S("The rule: build the laws into components, and weigh every measure with a reason")} left={{ who: "greta", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="LAW TO SCREEN" items={[{ text: "A LAW" }, { text: "A PRINCIPLE" }, { text: "A COMPONENT" }, { text: "EVERY SCREEN" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={S("Three teams, three booking forms: a fix in one does nothing for the others")} left={{ who: "malte", face: "worried" }}>
      <Teams shared={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "b1-2": (
    <Duo label={S("Greta: every team keeps inventing its own patterns")} left={{ who: "greta", face: "think" }}>
      <Notes x={40} y={6} w={112} title="WITHOUT A SYSTEM" items={[{ text: "FIX IT THREE TIMES" }, { text: "PASSENGERS RELEARN" }, { text: "EVERY SCREEN FROM ZERO" }]} />
    </Duo>
  ),
  "b1-3": (
    <Duo label={S("One shared form component: a fix reaches every form at once")} left={{ who: "greta", face: "happy", pose: "point" }}>
      <Teams shared />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "b1-4": (
    <Duo label={S("The rule: a design system for consistency, scale and steering")} left={{ who: "greta", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="A DESIGN SYSTEM" items={[{ icon: "check", text: "CONSISTENCY" }, { icon: "up", text: "SCALE" }, { icon: "gear", text: "STEERING" }]} sub="PRINCIPLES, NOT PATCHES" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Duo label={S("The freight team wants its own form now; Greta wants one shared form")} left={{ who: "malte", face: "happy", pose: "point" }} right={{ who: "greta", face: "think" }}>
      <Notes x={34} y={6} w={92} title="TWO GOALS" items={[{ icon: "clock", text: "SHIP IT NOW" }, { icon: "check", text: "KEEP IT CONSISTENT" }]} />
    </Duo>
  ),
  "b2-2": (
    <Duo label={S("On the matrix, an easy-to-use shared system is both fast and consistent")} left={{ who: "greta", face: "think" }}>
      <Matrix />
    </Duo>
  ),
  "b2-3": (
    <Duo label={S("Greta allows documented exceptions within the shared system, and says what that gives up")} left={{ who: "greta", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="WE CHOOSE B AND E" items={[{ tick: true, text: "SHARED IS EASIEST" }, { tick: true, text: "EXCEPTIONS WITH A REASON" }, { cross: true, text: "GIVE UP: OWN FORMS" }]} />
    </Duo>
  ),
  "b2-4": (
    <Duo label={S("The rule: name the conflict, choose, and say what you give up")} left={{ who: "greta", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="FIVE GOALS" items={[{ text: "CONSISTENCY, FLEXIBILITY" }, { text: "SPEED, CLARITY" }, { text: "STANDARDISATION" }]} sub="TODAY VS FOR YEARS" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={S("Malte: nobody records where bookings are abandoned; should we wait?")} left={{ who: "malte", face: "worried" }}>
      <Notes x={40} y={6} w={112} title="WE DO NOT KNOW" items={[{ icon: "ask", text: "WHICH FIELDS CONFUSE" }, { icon: "clock", text: "WAIT FOR DATA?" }]} />
    </Duo>
  ),
  "b3-2": (
    <Duo label={S("Greta decides on the shared form first, says what is unknown and when she would reverse it")} left={{ who: "greta", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="A DECISION" items={[{ tick: true, text: "WE DECIDE" }, { icon: "ask", text: "WE DO NOT KNOW" }, { icon: "clock", text: "WE REVERSE IF" }]} sub="AND WHAT WE GIVE UP" />
    </Duo>
  ),
  "b3-3": (
    <Duo label={S("Who owns it: the design-system lead owns principles and components; teams propose")} left={{ who: "greta", face: "neutral" }} right={{ who: "malte", face: "happy" }}>
      <Notes x={34} y={6} w={92} title="WHO OWNS IT" items={[{ text: "LEAD: THE SYSTEM" }, { text: "TEAMS: PROPOSE" }, { text: "PRINCIPLES DECIDE" }]} />
    </Duo>
  ),
  "b3-4": (
    <Duo label={S("The rule: someone owns the system, and a decision says when it is checked")} left={{ who: "greta", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="GOVERNANCE" items={[{ tick: true, text: "AN OWNER OF THE SYSTEM" }, { tick: true, text: "A WAY TO PROPOSE" }, { tick: true, text: "DECIDE, THEN CHECK" }]} />
    </Duo>
  ),
};
