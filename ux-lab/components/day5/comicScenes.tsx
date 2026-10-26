import type { ReactNode } from "react";
import { Board, Chip, LOOK, Mark, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 5 comics (data/day5/comics.ts, DL-STANDARD.md section 13). People: Leon and Mara (customers of Ticketo, a made-up cinema and event
 * ticket app), Priya (its UX lead) and Tobias (its product owner). Every label is a short capital word.
 */
LOOK.leon = { hair: "#3B2A20", shirt: "#0B8A82" };
LOOK.mara = { hair: "#1F1F24", shirt: "#F59E0B", long: true, skin: "#8A5A3A" };
LOOK.priya = { hair: "#1F1F24", shirt: "#7A4DE8", long: true, glasses: true, skin: "#B07A50" };
LOOK.tobias = { hair: "#C9A25A", shirt: "#555B66", glasses: true };

const ACC = "#B3261E";
const NEU = "#E4E8EE";

function Phone({ title = "TICKETO", children }: { title?: string; children?: ReactNode }) {
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

function Btn({ x, y, w, h = 6, label, strong, size = 2.6 }: { x: number; y: number; w: number; h?: number; label: string; strong?: boolean; size?: number }) {
  return (
    <g>
      <Chip x={x} y={y} w={w} h={h} c={strong ? ACC : NEU} />
      <Txt x={x + w / 2} y={y + h / 2 + 1.2} size={size} anchor="middle" c={strong ? "#FFFFFF" : "#1B1B1F"}>
        {label}
      </Txt>
    </g>
  );
}

function Checkout({ good }: { good: boolean }) {
  return (
    <Phone title="CHECKOUT">
      <Txt x={58} y={14} size={2.6}>2 TICKETS · SAT</Txt>
      {good ? (
        <g>
          <rect x={58} y={36} width={44} height={26} fill="#E8F5E9" />
          <Btn x={58} y={44} w={44} h={9} label="PAY" strong size={3.4} />
          <Btn x={58} y={56} w={44} h={6} label="CANCEL" />
        </g>
      ) : (
        <g>
          <Btn x={58} y={10.5} w={16} h={3.5} label="PAY" strong size={2} />
          <Btn x={74.5} y={10.5} w={16} h={3.5} label="CANCEL" size={2} />
        </g>
      )}
    </Phone>
  );
}

function Showings({ staged }: { staged: boolean }) {
  return (
    <Phone title="SHOWINGS">
      {staged ? (
        <g>
          {["TODAY", "SAT", "SUN"].map((d, i) => <Btn key={d} x={58 + i * 15} y={11} w={13} h={6} label={d} strong={i === 1} size={2.2} />)}
          {["LIGHTHOUSE", "NIGHT MARKET", "SMALL HOURS"].map((f, i) => <Btn key={f} x={58} y={21 + i * 8} w={44} h={6} label={f} strong={i === 0} size={2.4} />)}
          {["18:00", "20:15", "22:30"].map((tm, i) => <Btn key={tm} x={58 + i * 15} y={50} w={13} h={7} label={tm} size={2.2} />)}
        </g>
      ) : (
        Array.from({ length: 30 }, (_, i) => <Chip key={i} x={58 + (i % 5) * 9} y={10 + Math.floor(i / 5) * 9} w={7} h={6} c={NEU} />)
      )}
    </Phone>
  );
}

function Code({ chunked }: { chunked: boolean }) {
  return (
    <Phone title="TICKETS">
      <Txt x={58} y={14} size={2.4} c="#556274">BOOKING CODE</Txt>
      <Txt x={58} y={20} size={chunked ? 3.4 : 2.8}>{chunked ? "TKX7 Q2MR 84LZ" : "TKX7Q2MR84LZ"}</Txt>
      {chunked ? (
        <g>
          <rect x={58} y={26} width={44} height={20} fill="#F1F3F6" />
          <Txt x={60} y={32} size={2.6}>SAT 20:15</Txt>
          <Txt x={60} y={37} size={2.6}>HALL 3</Txt>
          <Txt x={60} y={42} size={2.6}>ROW 7 · 12, 13</Txt>
        </g>
      ) : (
        <g>
          <Txt x={58} y={30} size={2.2} c="#9AA5B5">HALL 3 IS ON THE FIRST…</Txt>
          <Txt x={58} y={44} size={2.2} c="#9AA5B5">SEATS: ROW 7, 12 AND…</Txt>
          <Txt x={58} y={58} size={2.2} c="#9AA5B5">STARTS AT 20:15, DOORS…</Txt>
        </g>
      )}
    </Phone>
  );
}

function Menu({ good }: { good: boolean }) {
  return (
    <Phone title="MENU">
      {good
        ? ["TICKETS", "FILMS", "EVENTS", "ACCOUNT"].map((m, i) => <Btn key={m} x={58} y={11 + i * 12} w={44} h={9} label={m} size={3} />)
        : Array.from({ length: 12 }, (_, i) => <Btn key={i} x={58} y={10 + i * 4.6} w={44} h={3.6} label={["TICKETS", "FILMS", "EVENTS", "GIFTS", "SNACKS", "OFFERS", "CINEMAS", "ACCOUNT", "HELP", "SETTINGS", "NEWS", "JOBS"][i]} size={2} />)}
    </Phone>
  );
}

function Standard({ once }: { once: boolean }) {
  return (
    <Board x={30} y={6} w={100} h={56}>
      {["CHECKOUT", "GIFT CARDS", "EVENTS"].map((c, i) => (
        <g key={c}>
          <rect x={34 + i * 32} y={12} width={28} height={36} fill={NEU} />
          <Txt x={48 + i * 32} y={18} size={2.7} anchor="middle" c="#556274">{c}</Txt>
          <Chip x={once ? 36 + i * 32 : 38 + i * 32} y={once ? 36 : 24} w={once ? 24 : [12, 8, 16][i]} h={once ? 9 : [5, 4, 6][i]} c={ACC} />
        </g>
      ))}
      <Txt x={80} y={57} size={3.2} anchor="middle" c="#556274">{once ? "ONE STANDARD, EVERY SCREEN" : "EACH TEAM ITS OWN BUTTON"}</Txt>
    </Board>
  );
}

function Matrix() {
  return (
    <Board x={36} y={4} w={88} h={60}>
      <line x1={46} y1={56} x2={118} y2={56} stroke="#1B1B1F" strokeWidth={0.8} />
      <line x1={46} y1={10} x2={46} y2={56} stroke="#1B1B1F" strokeWidth={0.8} />
      <Txt x={82} y={62} size={2.8} anchor="middle" c="#556274">OPTIONS SHOWN →</Txt>
      <Txt x={40} y={34} size={2.8} anchor="middle" c="#556274">FAST</Txt>
      <rect x={80} y={12} width={28} height={18} fill="#B5E3C8" />
      <Txt x={94} y={22.5} size={3} anchor="middle">THE AIM</Txt>
      {[[112, 48, "A"], [92, 16, "B"], [52, 44, "C"], [70, 38, "D"]].map(([x, y, l]) => (
        <g key={l as string}>
          <rect x={(x as number) - 2.5} y={(y as number) - 2.5} width={5} height={5} fill={ACC} />
          <Txt x={(x as number) + 4} y={(y as number) + 1.5} size={2.8}>{l as string}</Txt>
        </g>
      ))}
    </Board>
  );
}

const S = (s: string) => tt(s);

export const ART_D5: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={S("Leon pays on the bus: Pay and Cancel are tiny and touch each other at the top of the screen")} left={{ who: "leon", face: "worried" }}>
      <Checkout good={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a1-2": (
    <Duo label={S("He stretches his thumb and cancels his order by mistake")} left={{ who: "leon", face: "surprised" }}>
      <Checkout good={false} />
      <Mark x={9} y={34} kind="bang" />
    </Duo>
  ),
  "a1-3": (
    <Duo label={S("A large Pay button in the thumb's reach, with space to Cancel: he pays first time")} left={{ who: "leon", face: "happy", pose: "up" }}>
      <Checkout good />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a1-4": (
    <Duo label={S("The rule: large, close and with space, where the thumb already is")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="FITTS'S LAW" items={[{ icon: "up", text: "LARGER IS FASTER" }, { icon: "down", text: "CLOSER IS FASTER" }, { icon: "warn", text: "SPACE AGAINST MIS-TAPS" }]} sub="MIND THE THUMB" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={S("Mara wants Saturday evening and finds thirty equal time buttons")} left={{ who: "mara", face: "worried" }}>
      <Showings staged={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a2-2": (
    <Duo label={S("Priya names the law: more equal options, longer choices")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="HICK'S LAW" items={[{ icon: "down", text: "FEWER AT ONCE" }, { icon: "up", text: "THE LIKELY ONE STANDS OUT" }, { icon: "play", text: "STAGED CHOICES" }]} />
    </Duo>
  ),
  "a2-3": (
    <Duo label={S("Day, then film, then time: three small choices, and Mara is done")} left={{ who: "mara", face: "happy", pose: "up" }}>
      <Showings staged />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a2-4": (
    <Duo label={S("The rule: few options per step, but not too many steps")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="FEWER CHOICES" items={[{ tick: true, text: "FEW OPTIONS AT ONCE" }, { tick: true, text: "A CLEAR PRIORITY" }, { cross: true, text: "NOT: SIX STEPS FOR ONE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={S("At the cinema door Leon tries to read out a twelve-character code")} left={{ who: "leon", face: "think" }}>
      <Code chunked={false} />
    </Duo>
  ),
  "a3-2": (
    <Duo label={S("He loses his place twice and scrolls to find his seats")} left={{ who: "leon", face: "worried" }}>
      <Code chunked={false} />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "a3-3": (
    <Duo label={S("Three blocks of four, and time, hall and seats in one box: he reads it in one go")} left={{ who: "leon", face: "happy", pose: "up" }}>
      <Code chunked />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a3-4": (
    <Duo label={S("The rule: chunk it and put together what belongs together")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="MILLER'S RULE" items={[{ icon: "book", text: "A FEW ITEMS AT ONCE" }, { icon: "gear", text: "CHUNK INTO BLOCKS" }, { icon: "check", text: "SHOW IT WHERE NEEDED" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={S("Mara opens a menu of twelve thin strips and taps the one below the one she wanted")} left={{ who: "mara", face: "worried" }}>
      <Menu good={false} />
      <Mark x={9} y={34} kind="bang" />
    </Duo>
  ),
  "a4-2": (
    <Duo label={S("Priya points out that all three laws are broken at once")} left={{ who: "priya", face: "think" }}>
      <Notes x={40} y={6} w={112} title="ONE MENU, THREE LAWS" items={[{ text: "FITTS: THIN STRIPS" }, { text: "HICK: TWELVE ITEMS" }, { text: "MILLER: NO GROUPS" }]} sub="EACH ADDS TIME AND ERRORS" />
    </Duo>
  ),
  "a4-3": (
    <Duo label={S("Four large items, grouped: Mara hits the right one at once")} left={{ who: "mara", face: "happy", pose: "up" }}>
      <Menu good />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a4-4": (
    <Duo label={S("The rule: hand, decision and memory; fix all three")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="THE THREE LAWS" items={[{ icon: "play", text: "FITTS: THE HAND" }, { icon: "ask", text: "HICK: THE DECISION" }, { icon: "book", text: "MILLER: THE MEMORY" }]} sub="TOGETHER: TIME, ERRORS, LOAD" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={S("Tobias, the product owner, has three fixes and time for one first")} left={{ who: "tobias", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="THREE FIXES" items={[{ icon: "play", text: "BIG PAY BUTTON" }, { icon: "ask", text: "STAGED SHOWINGS" }, { icon: "book", text: "CHUNKED CODE" }]} />
    </Duo>
  ),
  "a5-2": (
    <Duo label={S("Priya weighs the Pay button: high effect, easy, low risk, quick")} left={{ who: "priya", face: "think" }}>
      <Rate x={40} y={6} w={112} title="BIG PAY BUTTON" rows={[["EFFECT", 3, "HIGH"], ["FEASIBLE", 3, "HIGH"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={S("Staging the showings helps more people choose but needs two releases")} left={{ who: "tobias", face: "think" }}>
      <Rate x={40} y={6} w={112} title="STAGED SHOWINGS" rows={[["EFFECT", 3, "HIGH"], ["FEASIBLE", 2, "MID"], ["RISK", 2, "MID"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={S("The rule: less searching, fewer errors, less stress; weigh every fix with a reason")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="WEIGH A MEASURE" items={[{ tick: true, text: "EFFECT ON USERS" }, { tick: true, text: "FEASIBILITY, RISK" }, { tick: true, text: "TIME PRESSURE" }]} sub="THE REASON COUNTS" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={S("Every team made its own Pay button: three sizes on three screens")} left={{ who: "tobias", face: "worried" }}>
      <Standard once={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "b1-2": (
    <Duo label={S("Priya: we keep fixing the same problem one screen at a time")} left={{ who: "priya", face: "think" }}>
      <Notes x={40} y={6} w={112} title="SCREEN BY SCREEN" items={[{ text: "FIX THE CHECKOUT" }, { text: "BREAK GIFT CARDS" }, { text: "FIX IT AGAIN" }]} sub="A DETAIL, EVERY TIME" />
    </Duo>
  ),
  "b1-3": (
    <Duo label={S("One interaction standard for every screen: the same large, reachable Pay button")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Standard once />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "b1-4": (
    <Duo label={S("The rule: decide the laws once, as standards")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="AN ARCHITECTURE" items={[{ icon: "play", text: "THE ELEMENT" }, { icon: "gear", text: "THE STANDARD" }, { icon: "chart", text: "THE BUSINESS" }]} sub="NOT A DETAIL" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Duo label={S("Tobias wants every film and offer on one screen; Mara wants to buy fast")} left={{ who: "tobias", face: "happy", pose: "point" }} right={{ who: "mara", face: "worried" }}>
      <Notes x={34} y={6} w={92} title="TWO GOALS" items={[{ icon: "up", text: "SHOW EVERYTHING" }, { icon: "clock", text: "BUY IN SECONDS" }]} />
    </Duo>
  ),
  "b2-2": (
    <Duo label={S("On the matrix, everything at once is slow, and one button with six steps is slow too")} left={{ who: "priya", face: "think" }}>
      <Matrix />
    </Duo>
  ),
  "b2-3": (
    <Duo label={S("Priya chooses large main actions and the rest one step deeper, and says what that gives up")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="WE CHOOSE B" items={[{ tick: true, text: "MAIN ACTIONS LARGE" }, { tick: true, text: "THE REST ONE TAP AWAY" }, { cross: true, text: "GIVE UP: ALL ON ONE SCREEN" }]} />
    </Duo>
  ),
  "b2-4": (
    <Duo label={S("The rule: name the conflict, choose, and say what you give up")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="FIVE GOALS" items={[{ text: "FEATURES, SPEED" }, { text: "SIMPLICITY, BRAND" }, { text: "FEASIBILITY" }]} sub="REDUCTION CAN BE A HURDLE" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={S("Tobias: the app does not record mis-taps; should we wait for data?")} left={{ who: "tobias", face: "worried" }}>
      <Notes x={40} y={6} w={112} title="WE DO NOT KNOW" items={[{ icon: "ask", text: "HOW MANY MIS-TAPS?" }, { icon: "clock", text: "WAIT FOR DATA?" }]} />
    </Duo>
  ),
  "b3-2": (
    <Duo label={S("Priya decides on a minimum button size, says what is unknown and when she would reverse it")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="A DECISION" items={[{ tick: true, text: "WE DECIDE" }, { icon: "ask", text: "WE DO NOT KNOW" }, { icon: "clock", text: "WE REVERSE IF" }]} sub="AND WHAT WE GIVE UP" />
    </Duo>
  ),
  "b3-3": (
    <Duo label={S("Who owns the standards: UX owns the sizes and limits; a team shows its data for an exception")} left={{ who: "priya", face: "neutral" }} right={{ who: "tobias", face: "happy" }}>
      <Notes x={34} y={6} w={92} title="WHO OWNS IT" items={[{ text: "UX: THE STANDARDS" }, { text: "TEAMS: THEIR CONTENT" }, { text: "DATA FOR EXCEPTIONS" }]} />
    </Duo>
  ),
  "b3-4": (
    <Duo label={S("The rule: someone owns the standards, and a decision says when it is checked")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="ACCOUNTABLE" items={[{ tick: true, text: "OWNER OF STANDARDS" }, { tick: true, text: "EXCEPTIONS NEED DATA" }, { tick: true, text: "DECIDE, THEN CHECK" }]} />
    </Duo>
  ),
};
