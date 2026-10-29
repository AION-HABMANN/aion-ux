"use client";

import clsx from "clsx";
import { useState } from "react";
import { AppScreen, TaskLab } from "@/components/sim/TaskLab";
import type { LabCtx } from "@/components/sim/TaskLab";
import { tt } from "@/lib/lang";

/**
 * Day 12 · the working products of the study cards (UX-STANDARD 2.16): Greenway, a made-up online grocer, so no task is answered here. Each lab gives one task and
 * versions of the same shop to use, with time, wrong taps and stress tests (components/sim/TaskLab.tsx). The barriers are simulated inside the lab (a screen
 * reader's announcements, a keyboard without a mouse, sunlight); the page around them stays accessible. No prices are shown.
 */
const ACC = "#166534";
const Brand = "Greenway";
const Done = ({ text }: { text: string }) => <AppScreen brand={Brand} color={ACC}><p className="text-[15px] font-bold">{tt("✓ Done")}</p><p>{text}</p></AppScreen>;

/* ------------------------------------------------------------------ A1 · one checkout, four people */

type Who = "kofi" | "liv" | "arjun" | "sun" | "fixed";
function Checkout({ ctx, who }: { ctx: LabCtx; who: Who }) {
  const [heard, setHeard] = useState<string[]>([]);
  const [subs, setSubs] = useState<"" | "on" | "off">("");
  const [focus, setFocus] = useState(-1);
  if (ctx.finished) return <Done text={tt("Order paid · delivery Thursday 08:00 to 10:00")} />;
  const fixed = who === "fixed";
  if (who === "kofi") {
    const items: [string, string, () => void][] = [
      [tt("image"), tt("(the Greenway logo)"), () => ctx.miss(tt("Heard: image"))],
      [tt("button"), tt("(change the delivery slot)"), () => ctx.miss(tt("Activated a button: it opened the delivery slots"))],
      [tt("button"), tt("(apply a voucher)"), () => ctx.miss(tt("Activated a button: it asked for a voucher"))],
      [tt("button"), tt("(pay)"), () => ctx.done(tt("Found Pay by trying every button"))],
    ];
    return (
      <AppScreen brand={tt("Screen reader view")} color="#111827">
        <p className="text-[11.5px] text-[#475569]">{tt("The screen is dark to you. Swipe through what the screen reader announces, and double-tap to activate.")}</p>
        <div className="space-y-1 rounded bg-[#0F172A] p-2 font-mono text-[12.5px] text-white">
          {items.map(([say, , act], i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <button type="button" onClick={() => setHeard((h) => [...h, say])} className="text-left underline decoration-dotted">{tt(`🔊 ${i + 1}: “${say}”`)}</button>
              {say !== tt("image") && <button type="button" onClick={act} className="rounded border border-white/40 px-1.5 text-[11px]">{tt("activate")}</button>}
            </div>
          ))}
        </div>
        <p className="text-[11px] text-[#475569]">{tt(`Heard so far: ${heard.length}`)}</p>
      </AppScreen>
    );
  }
  const subsText = who === "liv"
    ? <p className="text-justify text-[11px] italic uppercase leading-tight">{tt("Substitutions: where an ordered product is unavailable Greenway may at its discretion supply a comparable product unless the customer has deactivated this service in the account preferences prior to dispatch in which case no substitution occurs.")}</p>
    : <p className="text-[12.5px]"><b>{tt("Substitutions: on.")}</b> {tt("If something is out of stock, we send a similar product. You can turn this off.")}</p>;
  const pay = <button type="button" onClick={() => (who === "liv" && subs !== "on" ? ctx.miss(tt(subs ? "Answered “off”, but they are on" : "Paid without knowing about substitutions")) : ctx.done(tt("Paid")))} className={clsx("w-full rounded-lg py-2.5 font-bold text-white", who === "arjun" && "pointer-events-none")} style={{ background: ACC }}>{tt("Pay")}</button>;
  return (
    <AppScreen brand={Brand} color={ACC}>
      <p className="text-[14px] font-bold">{tt("Checkout")}</p>
      <p className={clsx("text-[12px]", who === "sun" ? "text-[#6B7280]" : "text-[#334155]")}>{tt("Delivery: Thursday 08:00 to 10:00")}</p>
      {subsText}
      {who === "liv" && (
        <div className="flex flex-wrap items-center gap-1 text-[12px]">
          {tt("Are substitutions on?")}
          {(["on", "off"] as const).map((k) => <button key={k} type="button" aria-pressed={subs === k} onClick={() => setSubs(k)} className={clsx("rounded border px-2", subs === k && "border-[#166534] bg-[#DCFCE7]")}>{k === "on" ? tt("on") : tt("off")}</button>)}
        </div>
      )}
      {who === "arjun" ? (
        <div className="space-y-1">
          <p className="text-[11.5px] text-[#475569]">{tt("Arjun's arm is in a cast: no mouse, no touch. Press the keys below.")}</p>
          <div className="flex gap-1">
            <button type="button" onClick={() => { const n = (focus + 1) % 3; setFocus(n); ctx.miss(tt(`Tab → ${[tt("logo"), tt("voucher field"), tt("delivery link")][n]} (no visible focus)`)); }} className="rounded border border-[#334155] px-3 py-1 font-mono">Tab</button>
            <button type="button" onClick={() => ctx.miss(tt("Enter: nothing happened"))} className="rounded border border-[#334155] px-3 py-1 font-mono">Enter</button>
            <button type="button" onClick={() => ctx.done(tt("Gave up: Pay is never reached by keyboard"))} className="rounded border border-[#B91C1C] px-2 py-1 text-[11px] text-[#B91C1C]">{tt("Give up")}</button>
          </div>
          <p className="text-[11px] text-[#475569]">{tt(`Focus is on element ${focus + 1} of 3, but nothing on the screen shows where.`)}</p>
        </div>
      ) : null}
      {pay}
      {fixed && <p className="text-[11px] text-[#475569]">{tt("Repaired: buttons have names, plain text, visible keyboard focus, enough contrast.")}</p>}
    </AppScreen>
  );
}

export function PeopleLab() {
  const v = (id: Who, label: string, insight: string) => ({ id, label, render: (ctx: LabCtx) => <Checkout ctx={ctx} who={id} />, insight });
  return (
    <TaskLab
      label={tt("Greenway's checkout as four people meet it, and repaired · a working product · simulated barriers · Case assumption, example company")}
      point={tt("Barriers are not in people; they are in designs that meet people's limits, permanent, temporary or situational. The same checkout fails a blind customer, a customer with dyslexia, a customer with an arm in a cast and everyone in bright sunlight, each in a different way. Meet it as each of them.")}
      task={tt("Pay for the order, and know whether substitutions are on.")}
      versions={[
        v("kofi", tt("Kofi · screen reader"), tt("In plain words: Kofi hears “button, button, image”. Nothing tells him which button pays, so he activates each one. A permanent limit; the barrier is the missing names, not his blindness.")),
        v("liv", tt("Liv · dyslexia"), tt("In plain words: one long justified sentence in capitals and italics. Liv cannot find out whether substitutions are on, and many other customers skip it too.")),
        v("arjun", tt("Arjun · arm in a cast"), tt("In plain words: for six weeks Arjun uses the keyboard. He cannot see where he is, and Pay is never reached. A temporary limit meets the same barrier as a permanent one.")),
        v("sun", tt("In bright sunlight"), tt("In plain words: switch on “bright sunlight”: the light grey delivery line disappears. Everyone has this situational limit sometimes; weak contrast fails them all.")),
        v("fixed", tt("Repaired for everyone"), tt("In plain words: named buttons, plain text, visible focus, enough contrast. Nothing special for anyone; the same checkout now works for all four.")),
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · words for “out of stock” and text alternatives */

type St = { words: boolean; alt: boolean };
function Tiles({ ctx, s }: { ctx: LabCtx; s: St }) {
  const [sr, setSr] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const items = [
    { n: tt("Oat milk"), e: "🥛", out: false },
    { n: tt("Rye bread"), e: "🍞", out: true },
    { n: tt("Apples"), e: "🍏", out: false },
    { n: tt("Blueberries"), e: "🫐", out: true },
  ];
  if (ctx.finished) return <Done text={tt(`In your basket: ${cart.join(", ")}`)} />;
  const add = (n: string, out: boolean) => {
    if (out) return ctx.miss(tt(`${n} is out of stock`));
    const c = [...cart, n];
    setCart(c);
    ctx.hit(tt(`Added ${n}`));
    if (c.length === 2) ctx.done(tt("Added both products that are in stock"));
  };
  return (
    <AppScreen brand={Brand} color={ACC}>
      <button type="button" onClick={() => setSr((v) => !v)} aria-pressed={sr} className="rounded border border-[#334155] px-2 py-0.5 text-[11.5px]">{sr ? tt("Back to the screen") : tt("🔊 Hear it as a screen reader would")}</button>
      {sr ? (
        <ul className="space-y-1 rounded bg-[#0F172A] p-2 font-mono text-[12px] text-white">
          {items.map((i) => <li key={i.n}>{tt(`“${s.alt ? `${i.n}, photo` : "image"}${s.words && i.out ? ", out of stock" : ""}. Add, button.”`)}</li>)}
        </ul>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {items.map((i) => (
            <div key={i.n} className={clsx("rounded border p-2", i.out ? "border-[#FCA5A5] bg-[#FEF2F2]" : "border-[#BBF7D0] bg-[#F0FDF4]")}>
              <p className="text-[24px]" aria-hidden>{i.e}</p>
              <p className="text-[12px] font-semibold">{i.n}</p>
              {s.words && i.out && <p className="text-[11px] font-semibold text-[#991B1B]">{tt("✕ Out of stock")}</p>}
              <button type="button" onClick={() => add(i.n, i.out)} className="mt-1 w-full rounded py-1 text-[12px] font-semibold text-white" style={{ background: ACC }}>{tt("Add")}</button>
            </div>
          ))}
        </div>
      )}
    </AppScreen>
  );
}

export function StockLab() {
  const v = (id: string, label: string, s: St, insight: string) => ({ id, label, render: (ctx: LabCtx) => <Tiles ctx={ctx} s={s} />, insight });
  return (
    <TaskLab
      label={tt("Greenway product tiles with or without words for “out of stock” and text alternatives for the images · a working product · Case assumption, example company")}
      point={tt("Information that lives only in colour or only in an image is lost to anyone who cannot see that colour or image. Words next to the colour and a text alternative for every meaningful image make the same tile work for everyone. Try it with the colour-blindness stress test, and listen as a screen reader would.")}
      task={tt("Put every product that is in stock into your basket.")}
      stresses={["cvd", "sun", "eyes"]}
      versions={[
        v("none", tt("Colour and images only"), { words: false, alt: false }, tt("In plain words: “out of stock” is a pale red tint. With red-green colour blindness or in sunlight the tiles look alike, and a screen reader says only “image”.")),
        v("words", tt("Words for out of stock"), { words: true, alt: false }, tt("In plain words: “✕ Out of stock” next to the colour survives colour blindness and sunlight; the screen reader still cannot say what the product is.")),
        v("all", tt("Words and text alternatives"), { words: true, alt: true }, tt("In plain words: words for the state and a name for every image: the screen reader says “Rye bread, photo, out of stock”. The same tile works for everyone.")),
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · official or plain language */

function Delivery({ ctx, plain }: { ctx: LabCtx; plain: boolean }) {
  const [choice, setChoice] = useState<string | null>(null);
  if (ctx.finished) return <Done text={tt("Saved: if nobody is home, the parcel may go to a neighbour")} />;
  const opts = plain
    ? [[tt("Leave it with a neighbour"), "yes"], [tt("Bring it back to the depot"), "no"]]
    : [[tt("I waive my objection to non-deposition"), "no"], [tt("I do not object to deposition with third parties"), "yes"]];
  return (
    <AppScreen brand={Brand} color={ACC}>
      {plain ? (
        <>
          <p className="text-[14px] font-bold">{tt("Where should we deliver?")}</p>
          <p className="text-[12.5px]">{tt("If nobody is home, we may leave it with:")}</p>
        </>
      ) : (
        <>
          <p className="text-[12px] font-bold">{tt("Delivery locality designation")}</p>
          <p className="text-[11px]">{tt("In the event that the consignee is not present at the delivery locality at the time of attempted delivery, deposition of the consignment with third parties in accordance with §4(2) of the General Terms shall be permissible unless objection has been lodged.")}</p>
        </>
      )}
      {opts.map(([l, k]) => (
        <label key={k} className="flex items-start gap-2 text-[12px]"><input type="radio" name="dep" checked={choice === k} onChange={() => setChoice(k)} />{l}</label>
      ))}
      <button type="button" onClick={() => (choice === "yes" ? ctx.done(tt("Neighbour allowed")) : ctx.miss(tt(choice ? "Chose the opposite of what you wanted" : "Saved without a choice")))} className="w-full rounded-lg py-2 font-bold text-white" style={{ background: ACC }}>{tt("Save")}</button>
    </AppScreen>
  );
}

export function PlainLab() {
  return (
    <TaskLab
      label={tt("The Greenway delivery form in official and in plain language · a working product · Case assumption, example company")}
      point={tt("Plain language is not simplified content; it is the same content said the way a person would say it. Official wording with double negatives and legal references makes people choose the opposite of what they want.")}
      task={tt("You are Liv. Make sure the parcel may be left with a neighbour if you are not home.")}
      stresses={["eyes", "hurry", "ping"]}
      versions={[
        { id: "official", label: tt("Official language"), render: (ctx) => <Delivery ctx={ctx} plain={false} />, insight: tt("In plain words: one sentence of over 40 words with a legal reference, and two options built on double negatives. Liv reads it three times and is still not sure which one allows the neighbour.") },
        { id: "plain", label: tt("Plain language"), render: (ctx) => <Delivery ctx={ctx} plain />, insight: tt("In plain words: “Where should we deliver?” and “If nobody is home, we may leave it with:”. The same legal content, said the way a person would say it.") },
      ]}
    />
  );
}
