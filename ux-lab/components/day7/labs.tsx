"use client";

import clsx from "clsx";
import { useState } from "react";
import { AppScreen, TaskLab } from "@/components/sim/TaskLab";
import type { LabCtx } from "@/components/sim/TaskLab";
import { tt } from "@/lib/lang";

/**
 * Day 7 · the working products of the study cards (UX-STANDARD 2.16): Moss & Pine, a made-up garden centre with an online shop and an app, so no task is answered
 * here. Each lab gives one task and versions of the same screen to use, with time, wrong taps, stress tests and, because this day is about feelings, a five-step
 * "how did that feel?" after each run (components/sim/TaskLab.tsx). No prices are shown.
 */
const ACC = "#3F6212";
const Brand = "Moss & Pine";
const Done = ({ text }: { text: string }) => <AppScreen brand={Brand} color={ACC}><p className="text-[15px] font-bold">{tt("✓ Done")}</p><p>{text}</p></AppScreen>;

/* ------------------------------------------------------------------ A1 · the same confirmation, cold or warm */

function Confirm({ ctx, warm }: { ctx: LabCtx; warm: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  if (ctx.finished) return <Done text={tt("Arriving Thursday · first day: water well, keep out of full sun")} />;
  if (warm)
    return (
      <AppScreen brand={Brand} color={ACC}>
        <p className="text-[16px] font-bold">{tt("🌿 Your plants are on their way, Hana")}</p>
        <button type="button" onClick={() => ctx.hit(tt("Saw the arrival day"))} className="block w-full rounded bg-[#ECFCCB] p-2 text-left"><b>{tt("Arriving Thursday")}</b>{tt(", between 08:00 and 12:00")}</button>
        <div className="rounded border border-[#D9F99D] p-2">
          <p className="font-semibold">{tt("On the first day")}</p>
          <p className="text-[12px]">{tt("Water them well and keep them out of full sun for two days.")}</p>
          <button type="button" onClick={() => ctx.done(tt("Read the first-day care"))} className="mt-1 text-[12px] font-semibold text-[#3F6212] underline">{tt("I'm ready for Thursday")}</button>
        </div>
        <p className="text-[11.5px] text-[#475569]">{tt("Order 50417 · you can change the delivery until Wednesday.")}</p>
      </AppScreen>
    );
  return (
    <AppScreen brand={Brand} color={ACC}>
      <p className="text-[12px]">{tt("Order no. 50417")}</p>
      <p className="font-mono text-[16px] font-bold">{tt("STATUS: PROCESSED")}</p>
      {[tt("Order details"), tt("Invoice"), tt("Terms"), tt("FAQ")].map((x) => (
        <div key={x}>
          <button type="button" onClick={() => { setOpen(x); (x === tt("Order details") || x === tt("FAQ") ? ctx.hit : ctx.miss)(tt(`Opened ${x}`)); }} className="block w-full border-b border-[#E5E7EB] py-1.5 text-left">{x}</button>
          {open === x && x === tt("Order details") && <p className="py-1 text-[11.5px]">{tt("Shipment: dispatched. Estimated delivery: Thursday.")}</p>}
          {open === x && x === tt("FAQ") && (
            <p className="py-1 text-[11.5px]">{tt("Q17: What should I do when plants arrive? Water well, avoid full sun for 48 h.")} <button type="button" onClick={() => ctx.done(tt("Pieced it together from the FAQ"))} className="underline">{tt("Got it")}</button></p>
          )}
        </div>
      ))}
    </AppScreen>
  );
}

export function FeelLab() {
  return (
    <TaskLab
      label={tt("The same Moss & Pine order confirmation, cold and warm · a working product · Case assumption, example company")}
      point={tt("People feel before they judge, and the feeling steers what they do: where they look, whether they go on, whether they believe it, what they remember and what they choose next. The two confirmations hold the same facts; they leave a different feeling. After each run, say how sure you feel that the plants are coming.")}
      task={tt("You are Hana. Find out when your plants arrive and what to do on the first day.")}
      feel={[tt("uneasy"), tt("looked after")]}
      versions={[
        { id: "cold", label: tt("Cold"), render: (ctx) => <Confirm ctx={ctx} warm={false} />, insight: tt("In plain words: an order number and PROCESSED. The facts are there, but in Order details and question 17 of the FAQ. Hana checks her e-mail twice, wonders whether to buy from a shop she knows next time, and remembers the order as a form she filled in.") },
        { id: "warm", label: tt("Warm"), render: (ctx) => <Confirm ctx={ctx} warm />, insight: tt("In plain words: her plants are on their way, they arrive on Thursday, and here is what to do on the first day. Same facts. Hana feels looked after, is curious about the care tips and remembers the shop as one that cares about plants.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · safety, control, recognition */

type F = { safety: boolean; control: boolean; recognition: boolean };
function Checkout({ ctx, f }: { ctx: LabCtx; f: F }) {
  const [back, setBack] = useState(false);
  if (ctx.finished) return <Done text={tt("Paid · 12 hornbeam plants, delivery in March")} />;
  if (back)
    return (
      <AppScreen brand={Brand} color={ACC}>
        <p className="font-bold">{tt("Basket")}</p>
        <p>{tt("12 × hornbeam, 60 to 80 cm")}</p>
        <button type="button" onClick={() => { setBack(false); ctx.hit(tt("Checked the basket and came back")); }} className="w-full rounded-lg py-2 font-bold text-white" style={{ background: ACC }}>{tt("Back to checkout")}</button>
      </AppScreen>
    );
  return (
    <AppScreen brand={Brand} color={ACC}>
      <p className="text-[14px] font-bold">{f.recognition ? tt("Welcome back, Jonas · your hedge plan") : tt("Checkout")}</p>
      <p>{tt("12 × hornbeam, 60 to 80 cm · delivery in March")}</p>
      {f.recognition && <p className="text-[11.5px] text-[#475569]">{tt("For the 9 m hedge you planned in January.")}</p>}
      <p className="rounded border border-[#D1D5DB] px-2 py-1 text-[12px]">{tt("Saved card •••• (demo) · delivery to your saved address")}</p>
      {f.safety && <p className="text-[11.5px] text-[#3F6212]">{tt("After paying you get an e-mail. You can cancel until the plants ship.")}</p>}
      <button type="button" onClick={() => ctx.done(tt("Paid"))} className="w-full rounded-lg py-2.5 font-bold text-white" style={{ background: ACC }}>{tt("Pay")}</button>
      {f.control && <button type="button" onClick={() => { setBack(true); ctx.hit(tt("Went back to the basket")); }} className="text-[12px] underline">{tt("← Change the basket")}</button>}
    </AppScreen>
  );
}

export function FactorsLab() {
  const v = (id: string, label: string, f: F, insight: string) => ({ id, label, render: (ctx: LabCtx) => <Checkout ctx={ctx} f={f} />, insight });
  return (
    <TaskLab
      label={tt("A Moss & Pine checkout step: safety, control and recognition · a working product · Case assumption, example company")}
      point={tt("A step can be fully usable and still feel unsafe, out of control or anonymous. The fields and the button stay the same in every version; only the emotional factors change. Usability is the floor; experience quality is how it feels to stand on it. Pay in each version and say how it felt.")}
      task={tt("You are Jonas, a returning customer. Check that your order is right, then pay for the hedge plants you planned.")}
      feel={[tt("pushed, unsure"), tt("safe, in control")]}
      versions={[
        v("none", tt("None of the three"), { safety: false, control: false, recognition: false }, tt("In plain words: nothing says what happens after Pay, there is no way back to the basket, and the page treats Jonas as a stranger though he has ordered before. Fully usable, and uneasy.")),
        v("safety", tt("Safety only"), { safety: true, control: false, recognition: false }, tt("In plain words: he knows he will get an e-mail and can cancel until it ships, so he feels safe to pay, but he cannot check the basket first.")),
        v("all", tt("All three"), { safety: true, control: true, recognition: true }, tt("In plain words: safe (what happens next), in control (a way back) and recognised (his hedge plan). The same fields and button; a different experience.")),
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · a payment error in three tones */

function PayError({ ctx, tone }: { ctx: LabCtx; tone: "tech" | "cheer" | "support" }) {
  const [tries, setTries] = useState(0);
  const [alt, setAlt] = useState(false);
  if (ctx.finished) return <Done text={tt("Ordered · paid by invoice, nothing charged twice")} />;
  if (alt)
    return (
      <AppScreen brand={Brand} color={ACC}>
        <p className="font-bold">{tt("Payment method")}</p>
        <button type="button" onClick={() => ctx.done(tt("Paid by invoice"))} className="block w-full rounded border border-[#3F6212] px-2 py-2 text-left">{tt("Invoice · pay within 14 days")}</button>
        <button type="button" onClick={() => ctx.miss(tt("Card again: failed"))} className="block w-full rounded border border-[#D1D5DB] px-2 py-2 text-left">{tt("Card •••• (demo)")}</button>
      </AppScreen>
    );
  const retry = <button type="button" onClick={() => { setTries((t) => t + 1); ctx.miss(tt("Tried the card again: failed")); }} className="rounded border border-[#64748B] px-3 py-1">{tt("Try again")}</button>;
  return (
    <AppScreen brand={Brand} color={ACC}>
      {tone === "tech" && (
        <>
          <p className="font-mono text-[13px] font-bold text-[#991B1B]">{tt("ERROR 402-PSP_DECLINED")}</p>
          <p className="font-mono text-[11.5px]">{tt("Transaction failed. Ref 7f3a-91c2.")}</p>
          {retry}
          <p className="pt-6 text-[10.5px] text-[#4B5563]"><button type="button" onClick={() => { setAlt(true); ctx.hit(tt("Found other payment methods in the footer")); }} className="underline">{tt("Account › Payment settings")}</button></p>
        </>
      )}
      {tone === "cheer" && (
        <>
          <p className="text-[18px]">🙈</p>
          <p className="text-[14px] font-bold">{tt("Oops! Something went wrong. No worries! 🌸")}</p>
          {retry}
          {tries > 1 && <p className="text-[11.5px]">{tt("Still no luck? Maybe try later! 😊")} <button type="button" onClick={() => { setAlt(true); ctx.hit(tt("Found other methods after two tries")); }} className="underline">{tt("other options")}</button></p>}
        </>
      )}
      {tone === "support" && (
        <>
          <p className="text-[14px] font-bold">{tt("Your card payment did not go through")}</p>
          <p className="text-[12px]">{tt("Nothing was charged. Your basket is saved.")}</p>
          <button type="button" onClick={() => { setAlt(true); ctx.hit(tt("Chose another payment method")); }} className="w-full rounded-lg py-2 font-bold text-white" style={{ background: ACC }}>{tt("Pay another way")}</button>
          {retry}
          <p className="text-[11.5px] text-[#475569]">{tt("Help by phone: 0800 123 456, 8:00 to 18:00.")}</p>
        </>
      )}
    </AppScreen>
  );
}

export function ErrorToneLab() {
  return (
    <TaskLab
      label={tt("One Moss & Pine payment error: technical, cheerful and supportive · a working product · Case assumption, example company")}
      point={tt("Most emotional effect sits in feedback and tone at the critical moments. The same error can make people feel at fault, not taken seriously, or safe. A supportive message says what happened, what it means for them and how to go on, in plain and calm words. The card in this lab always fails; find a way to pay.")}
      task={tt("You are Hana. Your card payment fails. Get your order paid anyway.")}
      feel={[tt("at fault"), tt("safe")]}
      versions={[
        { id: "tech", label: tt("Technical"), render: (ctx) => <PayError ctx={ctx} tone="tech" />, insight: tt("In plain words: an error code and “Transaction failed”. Hana does not know whether she was charged or whether her basket is gone; the way out hides in the account settings. She feels she did something wrong.") },
        { id: "cheer", label: tt("Cheerful"), render: (ctx) => <PayError ctx={ctx} tone="cheer" />, insight: tt("In plain words: “Oops”, an emoji, “no worries”. Friendly, but it does not say what happened or what to do; other options appear only after failing twice. Hana feels her problem is not taken seriously.") },
        { id: "support", label: tt("Supportive"), render: (ctx) => <PayError ctx={ctx} tone="support" />, insight: tt("In plain words: the payment did not go through, nothing was charged, the basket is saved, here is another way and help by phone. Hana feels safe and pays by invoice.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · the right feeling depends on the situation */

type Sit = "offer" | "care" | "delay" | "loss";
const MSG = (): Record<string, [string, string]> => ({
  cheer: [tt("🎉 Great news from Moss & Pine!"), tt("Exciting things are happening! Tap to see our latest deals 🌸🛒")],
  calm: [tt("From Moss & Pine"), tt("A short, useful note with what matters now, in plain words.")],
  sorry: [tt("We are sorry"), tt("Something did not go as it should. Here is what happened and what we will do.")],
});
const REPLY = (): Record<Sit, Record<string, [string, string]>> => ({
  offer: { cheer: ["🙂", tt("“Nice, the seed potatoes are back. I'll have a look.”")], calm: ["🙂", tt("“Good to know, thanks.”")], sorry: ["🤨", tt("“Sorry for what? It's an offer.”")] },
  care: { cheer: ["😕", tt("“I asked how to prune my roses and got a sale.”")], calm: ["😊", tt("“Thanks, that's exactly what I needed for the roses.”")], sorry: ["🤨", tt("“Why are you apologising?”")] },
  delay: { cheer: ["😠", tt("“My hedge is late and you send me confetti?”")], calm: ["😐", tt("“OK. But when does it come?”")], sorry: ["🙂", tt("“Thanks for telling me early. Saturday is fine.”")] },
  loss: { cheer: ["😠", tt("“Half my plants died and you want to sell me more?”")], calm: ["😐", tt("“That sounds like a form letter.”")], sorry: ["🙂", tt("“Thank you. I'll take the replacement.”")] },
});
function Composer({ ctx, sit }: { ctx: LabCtx; sit: Sit }) {
  const [tone, setTone] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const facts: Record<Sit, string> = {
    offer: tt("Situation: seed potatoes are back in stock; Hana bought them last spring."),
    care: tt("Situation: Jonas asked how to prune his new roses."),
    delay: tt("Situation: Jonas's hedge plants will arrive on Saturday instead of Thursday."),
    loss: tt("Situation: half of Hana's plants arrived dead after a hot transport."),
  };
  const r = tone ? REPLY()[sit][tone] : null;
  return (
    <AppScreen brand={tt("Moss & Pine · messages")} color="#1F2937">
      <p className="rounded bg-[#F3F4F6] p-2 text-[12px]">{facts[sit]}</p>
      <p className="text-[12px] font-semibold">{tt("Choose a template")}</p>
      {Object.entries(MSG()).map(([k, [h, b]]) => (
        <button key={k} type="button" aria-pressed={tone === k} onClick={() => { setTone(k); setSent(false); ctx.hit(tt(`Chose the ${k} template`)); }} className={clsx("block w-full rounded border p-2 text-left", tone === k ? "border-[#3F6212] bg-[#F7FEE7]" : "border-[#D1D5DB]")}>
          <span className="block font-semibold">{h}</span>
          <span className="block text-[11.5px] text-[#475569]">{b}</span>
        </button>
      ))}
      <button type="button" disabled={!tone} onClick={() => { setSent(true); ctx.done(tt(`Sent the ${tone} template`)); }} className="w-full rounded-lg py-2 font-bold text-white disabled:opacity-50" style={{ background: ACC }}>{tt("Send")}</button>
      {sent && r && <p className="rounded bg-[#EFF6FF] p-2 text-[12.5px]"><span aria-hidden className="mr-1">{r[0]}</span>{tt("Reply:")} {r[1]}</p>}
    </AppScreen>
  );
}

export function SituationLab() {
  const s = (id: Sit, label: string, insight: string) => ({ id, label, render: (ctx: LabCtx) => <Composer ctx={ctx} sit={id} />, insight });
  return (
    <TaskLab
      label={tt("The Moss & Pine message tool in four situations · a working product · Case assumption, example company")}
      point={tt("The right feeling depends on the situation, not on the brand alone. A gentle push fits an offer; a calm, useful voice fits care; an apology fits a delay; empathy and a remedy fit a loss. Send a message in each situation and read the customer's reply.")}
      task={tt("You work at Moss & Pine. In each situation, choose a template and send it.")}
      stresses={["hurry", "ping"]}
      device="phone"
      versions={[
        s("offer", tt("An offer"), tt("In plain words: a real reason at the right time, a gentle invitation. Activation fits here; false urgency or an apology would feel odd.")),
        s("care", tt("Care"), tt("In plain words: calm and useful. Marketing would like an offer added; it would turn help into a sales channel.")),
        s("delay", tt("A delay"), tt("In plain words: an apology, a reassurance and the new date. A cheerful tone here feels as if the delay did not matter.")),
        s("loss", tt("A loss"), tt("In plain words: the plants died. The message names the disappointment and offers a remedy. Confetti or an upsell here would be incongruent and would cost Hana's trust.")),
      ]}
    />
  );
}
