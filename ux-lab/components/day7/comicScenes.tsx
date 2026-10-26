import type { ReactNode } from "react";
import { Board, Chip, LOOK, Mark, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 7 comics (data/day7/comics.ts, DL-STANDARD.md section 13). People: Hana and Jonas (customers of Moss & Pine, a made-up garden centre),
 * Wanda (its UX writer) and Bruno (its product owner). Every label is a short capital word.
 */
LOOK.hana = { hair: "#1F1F24", shirt: "#C2603A", long: true };
LOOK.jonas = { hair: "#C9A25A", shirt: "#3F6B3A" };
LOOK.wanda = { hair: "#7A3B2A", shirt: "#5B4A8B", long: true, glasses: true, skin: "#C68A5A" };
LOOK.bruno = { hair: "#2B2B2B", shirt: "#6B5E4A" };

const ACC = "#3F6B3A";
const NEU = "#E4E8EE";

function Site({ title = "MOSS & PINE", children }: { title?: string; children?: ReactNode }) {
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

function Confirm({ warm }: { warm: boolean }) {
  return (
    <Site title="ORDER">
      {warm ? (
        <g>
          <rect x={42} y={12} width={76} height={24} fill="#EEF4EA" />
          <Txt x={44} y={19} size={3.2}>ON THEIR WAY</Txt>
          <Txt x={44} y={26} size={2.6} c="#556274">ARRIVE THURSDAY</Txt>
          <Txt x={44} y={32} size={2.6} c="#556274">WATER ON DAY ONE</Txt>
          <Btn x={43} y={44} w={74} h={8} label="TRACK MY ORDER" strong />
        </g>
      ) : (
        <g>
          <Txt x={44} y={20} size={3.2}>ORDER MP-30417</Txt>
          <Txt x={44} y={28} size={2.8} c="#556274">STATUS: PROCESSED</Txt>
          <Btn x={43} y={44} w={40} h={8} label="CLOSE" />
        </g>
      )}
    </Site>
  );
}

function Pay({ good }: { good: boolean }) {
  return (
    <Site title="PAYMENT">
      {good && <Txt x={44} y={16} size={2.6} c={ACC}>WELCOME BACK</Txt>}
      <rect x={43} y={19} width={74} height={6} fill="#FFFFFF" stroke="#9AA5B5" strokeWidth={0.5} />
      {good && <Txt x={44} y={31} size={2.5} c="#556274">CANCEL UNTIL IT SHIPS</Txt>}
      <Btn x={43} y={36} w={40} h={8} label="PAY" strong />
      {good && <Txt x={86} y={41} size={2.5} c={ACC}>‹ BASKET</Txt>}
    </Site>
  );
}

function Err({ kind }: { kind: "tech" | "cheer" | "kind" }) {
  return (
    <Site title="PAYMENT">
      <rect x={42} y={13} width={76} height={20} fill={kind === "tech" ? "#F3E3E3" : kind === "cheer" ? "#FFF6D9" : "#EEF4EA"} />
      <Txt x={44} y={20} size={2.9}>{kind === "tech" ? "ERR_PAYMENT_DECLINED" : kind === "cheer" ? "OOPS! :)" : "IT DID NOT GO THROUGH"}</Txt>
      <Txt x={44} y={27} size={2.5} c="#556274">{kind === "tech" ? "TRANSACTION FAILED" : kind === "cheer" ? "NO WORRIES!" : "NOTHING WAS CHARGED"}</Txt>
      {kind === "kind" ? (
        <g>
          <Btn x={43} y={38} w={36} label="OTHER CARD" strong />
          <Btn x={81} y={38} w={36} label="INVOICE" />
        </g>
      ) : (
        <Btn x={43} y={38} w={30} label="OK" />
      )}
    </Site>
  );
}

function Countdown() {
  return (
    <Site title="SHOP">
      <Btn x={43} y={13} w={74} label="ALMOST GONE!" c="#F6D6D6" />
      <Btn x={43} y={21} w={74} label="ENDS SOON!" c="#F6EDC9" />
      <rect x={43} y={30} width={34} height={20} fill="#CFE0C8" />
      <rect x={81} y={30} width={34} height={20} fill="#CFE0C8" />
      <Btn x={43} y={53} w={74} label="BUY NOW!!" strong />
    </Site>
  );
}

function Matrix() {
  return (
    <Board x={36} y={4} w={88} h={60}>
      <line x1={46} y1={56} x2={118} y2={56} stroke="#1B1B1F" strokeWidth={0.8} />
      <line x1={46} y1={10} x2={46} y2={56} stroke="#1B1B1F" strokeWidth={0.8} />
      <Txt x={82} y={62} size={2.8} anchor="middle" c="#556274">FITS →</Txt>
      <Txt x={40} y={34} size={2.8} anchor="middle" c="#556274">PUSH</Txt>
      <rect x={88} y={30} width={28} height={22} fill="#B5E3C8" />
      <Txt x={102} y={42} size={3} anchor="middle">LASTING</Txt>
      {[[52, 14, "A"], [56, 26, "B"], [100, 20, "C"], [106, 46, "D"], [74, 52, "E"]].map(([x, y, l]) => (
        <g key={l as string}>
          <rect x={(x as number) - 2.5} y={(y as number) - 2.5} width={5} height={5} fill={ACC} />
          <Txt x={(x as number) + 4} y={(y as number) + 1.5} size={2.8}>{l as string}</Txt>
        </g>
      ))}
    </Board>
  );
}

function Situations() {
  return (
    <Board x={30} y={6} w={100} h={56}>
      {[["OFFER", "INVITE"], ["CARE", "CALM, USEFUL"], ["DELAY", "SORRY, NEW DATE"], ["LOSS", "EMPATHY, REMEDY"]].map(([a, b], i) => (
        <g key={a}>
          <rect x={34 + (i % 2) * 48} y={10 + Math.floor(i / 2) * 22} width={44} height={18} fill={i < 2 ? "#EEF4EA" : NEU} />
          <Txt x={56 + (i % 2) * 48} y={17 + Math.floor(i / 2) * 22} size={3} anchor="middle">{a}</Txt>
          <Txt x={56 + (i % 2) * 48} y={24 + Math.floor(i / 2) * 22} size={2.5} anchor="middle" c="#556274">{b}</Txt>
        </g>
      ))}
      <Txt x={80} y={58} size={3.2} anchor="middle" c="#556274">THE SITUATION DECIDES</Txt>
    </Board>
  );
}

const S = (s: string) => tt(s);

export const ART_D7: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={S("Hana reads a confirmation that says only Order MP-30417, status PROCESSED")} left={{ who: "hana", face: "worried" }}>
      <Confirm warm={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a1-2": (
    <Duo label={S("Hana checks her e-mail twice and thinks of ordering elsewhere")} left={{ who: "hana", face: "think" }}>
      <Notes x={40} y={6} w={112} title="WHAT THE FEELING DOES" items={[{ icon: "eye", text: "CHECKS TWICE" }, { icon: "lock", text: "TRUSTS LESS" }, { icon: "ask", text: "SHOPS ELSEWHERE?" }]} />
    </Duo>
  ),
  "a1-3": (
    <Duo label={S("The warm confirmation: on their way, arrive Thursday, how to water them")} left={{ who: "hana", face: "happy", pose: "up" }}>
      <Confirm warm />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a1-4": (
    <Duo label={S("The rule: ask what a feeling does to attention, motivation, trust, memory and decisions")} left={{ who: "wanda", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="A FEELING ACTS ON" items={[{ icon: "eye", text: "ATTENTION, MOTIVATION" }, { icon: "heart", text: "TRUST" }, { icon: "book", text: "MEMORY, DECISIONS" }]} sub="FEEL FIRST, JUDGE LATER" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={S("Jonas at a usable payment step that says nothing about what happens next")} left={{ who: "jonas", face: "worried" }}>
      <Pay good={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a2-2": (
    <Duo label={S("Wanda lists what is missing: safety, control, recognition")} left={{ who: "wanda", face: "think" }}>
      <Notes x={40} y={6} w={112} title="MISSING" items={[{ icon: "lock", text: "SAFETY" }, { icon: "gear", text: "CONTROL" }, { icon: "heart", text: "RECOGNITION" }]} />
    </Duo>
  ),
  "a2-3": (
    <Duo label={S("The same step with a welcome, a cancel note and a way back: Jonas pays")} left={{ who: "jonas", face: "happy", pose: "up" }}>
      <Pay good />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a2-4": (
    <Duo label={S("The rule: usable is the floor; check the emotional factors")} left={{ who: "wanda", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="EMOTIONAL FACTORS" items={[{ tick: true, text: "SAFETY, CONTROL, JOY" }, { tick: true, text: "BELONGING, RECOGNITION" }, { cross: true, text: "FRUSTRATION, UNCERTAINTY" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={S("Hana's payment fails with a technical error code")} left={{ who: "hana", face: "worried" }}>
      <Err kind="tech" />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "a3-2": (
    <Duo label={S("A cheerful Oops without the facts")} left={{ who: "hana", face: "think" }}>
      <Err kind="cheer" />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a3-3": (
    <Duo label={S("A supportive message: nothing charged, two ways on; Hana pays by invoice")} left={{ who: "hana", face: "happy", pose: "up" }}>
      <Err kind="kind" />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a3-4": (
    <Duo label={S("The rule: visual mood, interaction, tone and feedback create the feeling")} left={{ who: "wanda", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="FOUR SOURCES" items={[{ icon: "eye", text: "VISUAL MOOD" }, { icon: "play", text: "INTERACTION" }, { icon: "pencil", text: "TONE" }, { icon: "check", text: "FEEDBACK" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={S("Bruno's shop page with a countdown and Almost gone on every plant")} left={{ who: "bruno", face: "happy", pose: "point" }}>
      <Countdown />
    </Duo>
  ),
  "a4-2": (
    <Duo label={S("Jonas sees the countdown reset the next day")} left={{ who: "jonas", face: "sad" }}>
      <Countdown />
      <Mark x={9} y={34} kind="bang" />
    </Duo>
  ),
  "a4-3": (
    <Duo label={S("On the matrix, messages that fit the situation build lasting use")} left={{ who: "wanda", face: "think" }}>
      <Matrix />
    </Duo>
  ),
  "a4-4": (
    <Duo label={S("The rule: activate only with feelings that fit and are true")} left={{ who: "wanda", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="NOT THIS" items={[{ cross: true, text: "OVERLOAD" }, { cross: true, text: "OVER-EMOTIONAL" }, { cross: true, text: "FALSE URGENCY" }]} sub="FIT, NOT FORCE" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={S("Bruno has three ideas: errors, photos, confetti")} left={{ who: "bruno", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="THREE IDEAS" items={[{ icon: "pencil", text: "REWRITE ERRORS" }, { icon: "eye", text: "NEW PHOTOS" }, { icon: "heart", text: "CONFETTI" }]} />
    </Duo>
  ),
  "a5-2": (
    <Duo label={S("Wanda weighs the rewritten errors: big effect, easy, low risk")} left={{ who: "wanda", face: "think" }}>
      <Rate x={40} y={6} w={112} title="REWRITE ERRORS" rows={[["EFFECT", 3, "HIGH"], ["FEASIBLE", 3, "HIGH"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={S("The confetti is quick, but risky: it would play for a replacement of dead plants")} left={{ who: "bruno", face: "surprised" }}>
      <Rate x={40} y={6} w={112} title="CONFETTI" rows={[["EFFECT", 2, "MID"], ["FEASIBLE", 3, "HIGH"], ["RISK", 3, "HIGH"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={S("The rule: build trust with honest signals, and weigh every measure with a reason")} left={{ who: "wanda", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="SIGNAL TO TRUST" items={[{ text: "A SMALL SIGNAL" }, { text: "A JUDGEMENT" }, { text: "TRUST" }, { text: "USE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={S("A warm campaign, then a cold PROCESSED from the shop")} left={{ who: "hana", face: "sad" }}>
      <Confirm warm={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "b1-2": (
    <Duo label={S("Wanda: the feelings come from confirmations, errors and waiting")} left={{ who: "wanda", face: "think" }}>
      <Notes x={40} y={6} w={112} title="WHERE IT LIVES" items={[{ text: "CONFIRMATIONS" }, { text: "ERRORS" }, { text: "WAITING" }]} sub="NOBODY DECIDED HOW" />
    </Duo>
  ),
  "b1-3": (
    <Duo label={S("A guiding vision, principles and one tone guide for every team")} left={{ who: "bruno", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="EMOTIONAL UX" items={[{ tick: true, text: "A GUIDING VISION" }, { tick: true, text: "PRINCIPLES" }, { tick: true, text: "ONE TONE GUIDE" }]} />
    </Duo>
  ),
  "b1-4": (
    <Duo label={S("The rule: emotional quality belongs in the UX architecture")} left={{ who: "wanda", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="THE LAYERS" items={[{ text: "VISION" }, { text: "PRINCIPLES" }, { text: "TONE AND PATTERNS" }, { text: "EVERY MESSAGE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Duo label={S("Bruno wants every message cheerful; Wanda thinks of a customer whose hedge died")} left={{ who: "bruno", face: "happy", pose: "point" }} right={{ who: "wanda", face: "think" }}>
      <Notes x={34} y={6} w={92} title="TWO GOALS" items={[{ icon: "up", text: "CHEERFUL SELLS" }, { icon: "heart", text: "FIT THE SITUATION" }]} />
    </Duo>
  ),
  "b2-2": (
    <Duo label={S("One template, four situations, four feelings")} left={{ who: "wanda", face: "think" }}>
      <Situations />
    </Duo>
  ),
  "b2-3": (
    <Duo label={S("They agree: offers may activate; care, delays and losses stay calm")} left={{ who: "bruno", face: "neutral" }}>
      <Notes x={40} y={6} w={112} title="WE CHOOSE" items={[{ tick: true, text: "OFFERS: INVITE" }, { tick: true, text: "CARE, DELAY, LOSS: CALM" }, { cross: true, text: "GIVE UP: SOME UPSELL" }]} />
    </Duo>
  ),
  "b2-4": (
    <Duo label={S("The rule: name the conflict, fit the feeling, say what you give up")} left={{ who: "wanda", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="CONFLICTS" items={[{ text: "SERIOUS VS CLOSE" }, { text: "ACTIVATION VS TRUST" }, { text: "BRAND VS USER" }]} sub="THE SITUATION DECIDES" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={S("Bruno: we have only e-mails and reviews; should we measure first?")} left={{ who: "bruno", face: "worried" }}>
      <Notes x={40} y={6} w={112} title="WE DO NOT KNOW" items={[{ icon: "ask", text: "HOW THEY FEEL" }, { icon: "clock", text: "WAIT FOR DATA?" }]} />
    </Duo>
  ),
  "b3-2": (
    <Duo label={S("Wanda decides to rewrite the checkout messages first and says when she would reverse it")} left={{ who: "wanda", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="A DECISION" items={[{ tick: true, text: "WE DECIDE" }, { icon: "ask", text: "WE DO NOT KNOW" }, { icon: "clock", text: "WE REVERSE IF" }]} sub="AND WHAT WE GIVE UP" />
    </Duo>
  ),
  "b3-3": (
    <Duo label={S("Who decides: correct first, then the customer, then the brand")} left={{ who: "wanda", face: "neutral" }} right={{ who: "bruno", face: "happy" }}>
      <Notes x={34} y={6} w={92} title="WHO OWNS IT" items={[{ text: "CX LEAD: THE TONE" }, { text: "NURSERY: CORRECT" }, { text: "MARKETING: BRAND" }]} />
    </Duo>
  ),
  "b3-4": (
    <Duo label={S("The rule: an owner of the tone, a rule for conflicts, decide then check")} left={{ who: "wanda", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="GOVERNANCE" items={[{ tick: true, text: "AN OWNER OF THE TONE" }, { tick: true, text: "A RULE FOR CONFLICTS" }, { tick: true, text: "DECIDE, THEN CHECK" }]} />
    </Duo>
  ),
};
