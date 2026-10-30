"use client";

import clsx from "clsx";
import { useState } from "react";
import type { ReactNode } from "react";
import { AppScreen, TaskLab } from "@/components/sim/TaskLab";
import type { LabCtx } from "@/components/sim/TaskLab";
import { tt } from "@/lib/lang";

/**
 * Day 3 · the working products of the study cards (UX-STANDARD 2.16): Kettle & Co, a made-up online grocery shop, so no task is answered here. Each lab gives one
 * task and versions of the same screen to use, with time, wrong taps and stress tests (components/sim/TaskLab.tsx). No prices are shown.
 */
const ACC = "#1D4ED8";
const Brand = "Kettle & Co";
const Done = ({ text }: { text: string }) => <AppScreen brand={Brand} color="#14532D"><p className="text-[15px] font-bold">{tt("✓ Done")}</p><p>{text}</p></AppScreen>;

/* ------------------------------------------------------------------ A1 · what colour is for */

type Jobs = { accent: boolean; warn: boolean; areas: boolean };
function Basket({ ctx, j }: { ctx: LabCtx; j: Jobs }) {
  if (ctx.finished) return <Done text={tt("Order placed · delivery tomorrow 14:00 to 16:00")} />;
  const area = (name: string, items: string, loud: string, calm: string) => (
    <button type="button" onClick={() => ctx.miss(tt(`Opened ${name}`))} className="block w-full rounded px-2 py-1.5 text-left text-[12px]" style={{ background: j.areas ? calm : loud, color: j.areas ? "#1F2937" : "#FFFFFF" }}>
      <b>{name}</b> · {items}
    </button>
  );
  return (
    <AppScreen brand={Brand} color="#14532D">
      <p className="text-[14px] font-bold">{tt("Your basket")}</p>
      {area(tt("Fruit"), tt("apples, bananas"), "#C2410C", "#FEF3C7")}
      {area(tt("Dairy"), tt("milk, yoghurt"), "#6D28D9", "#E0E7FF")}
      {area(tt("Bakery"), tt("rye bread"), "#BE185D", "#FCE7F3")}
      {j.warn ? (
        <p className="rounded bg-[#F1F5F9] px-2 py-1 text-[12px] text-[#334155]">{tt("Delivery tomorrow, 14:00 to 16:00.")}</p>
      ) : (
        <button type="button" onClick={() => ctx.miss(tt("Opened the red ATTENTION box"))} className="block w-full rounded bg-[#B91C1C] px-2 py-1 text-left text-[12px] font-bold text-white">{tt("⚠ ATTENTION: delivery tomorrow, 14:00 to 16:00")}</button>
      )}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button type="button" onClick={() => ctx.miss(tt("Tapped Keep shopping"))} className={clsx("rounded-lg py-2.5 font-bold", j.accent ? "border border-[#94A3B8] text-[#334155]" : "bg-[#C2410C] text-white")}>{tt("Keep shopping")}</button>
        <button type="button" onClick={() => ctx.done(tt("Paid"))} className={clsx("rounded-lg py-2.5 font-bold", j.accent ? "text-white" : "bg-[#E5E7EB] text-[#4B5563]")} style={j.accent ? { background: ACC } : undefined}>{tt("Pay now")}</button>
      </div>
    </AppScreen>
  );
}

export function ColourLab() {
  const v = (id: string, label: string, j: Jobs, insight: string) => ({ id, label, render: (ctx: LabCtx) => <Basket ctx={ctx} j={j} />, insight });
  return (
    <TaskLab
      label={tt("A Kettle & Co basket: an accent for the main action, red only for a real problem, one calm colour per area · a working product · Case assumption, example company")}
      point={tt("Colour is seen first. It can draw attention to one thing, make an action inviting, warn, build trust through calm and consistency, and give orientation when each area keeps its colour. Used everywhere at full strength, it does none of these.")}
      task={tt("You are Rosa. Pay for your basket.")}
      versions={[
        v("none", tt("Colour everywhere"), { accent: false, warn: false, areas: false }, tt("In plain words: “Pay now” is grey and “Keep shopping” is bright orange, so the eye goes to the wrong button; a red ATTENTION box for an ordinary delivery time alarms for nothing; three loud area colours compete with everything else.")),
        v("accent", tt("An accent for the main action"), { accent: true, warn: false, areas: false }, tt("In plain words: “Pay now” is the only strong blue, so the eye goes there; the red box and the loud areas still compete.")),
        v("all", tt("All three colour jobs"), { accent: true, warn: true, areas: true }, tt("In plain words: one accent for the action, a calm delivery notice so red stays free for a real problem, and a calm tint per area so Rosa knows where she is.")),
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · decorative or functional colour */

function Orders({ ctx, fn }: { ctx: LabCtx; fn: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  if (ctx.finished) return <Done text={tt("Order 1044: payment updated, it will be delivered on Friday")} />;
  const orders = [
    { id: "1042", dot: "#F97316", state: tt("Delivered"), sym: "✓", c: "#475569" },
    { id: "1044", dot: "#22C55E", state: tt("Payment failed"), sym: "!", c: "#B91C1C" },
    { id: "1047", dot: "#A855F7", state: tt("On its way"), sym: "→", c: "#475569" },
  ];
  return (
    <AppScreen brand={Brand} color="#14532D">
      <p className="text-[14px] font-bold">{tt("Your orders")}</p>
      {orders.map((o) => (
        <div key={o.id} className="rounded border border-[#E2E8F0] p-2">
          <button type="button" onClick={() => { setOpen(o.id); (o.id === "1044" ? ctx.hit : ctx.miss)(tt(`Opened order ${o.id}`)); }} className="flex w-full items-center gap-2 text-left">
            <span className="h-3 w-3 rounded-full" style={{ background: fn ? o.c : o.dot }} aria-hidden />
            <span className="font-semibold">{tt(`Order ${o.id}`)}</span>
            {fn && <span className="ml-auto text-[12px] font-semibold" style={{ color: o.c }}>{`${o.sym} ${o.state}`}</span>}
          </button>
          {open === o.id && (
            <div className="mt-1 flex gap-2 text-[12px]">
              {o.id === "1044" ? (
                <button type="button" onClick={() => ctx.done(tt("Updated the payment of 1044"))} className={clsx("rounded px-2 py-1", fn ? "bg-[#1D4ED8] font-semibold text-white" : "bg-[#7E22CE] text-white")}>{tt("Update payment")}</button>
              ) : (
                <span className="text-[#475569]">{tt("Nothing to do.")}</span>
              )}
            </div>
          )}
        </div>
      ))}
      <div className={clsx("rounded p-2 text-[12px]", fn ? "bg-[#F1F5F9] text-[#334155]" : "bg-[#15803D] text-white")}>{tt("Offer: seasonal strawberries are back.")}</div>
      <button type="button" onClick={() => ctx.miss(tt("Tapped Order again"))} className={clsx("text-[12px]", fn ? "rounded bg-[#1D4ED8] px-2 py-1 text-white" : "text-[#7E22CE]")}>{tt("Order again")}</button>
    </AppScreen>
  );
}

export function FunctionLab() {
  return (
    <TaskLab
      label={tt("The same Kettle & Co order list, coloured to decorate and coloured to function · a working product · Case assumption, example company")}
      point={tt("Functional colour has a job: action, priority or state, and each colour keeps one meaning. Decorative colour only sets a look. When decoration and meaning use the same bright tones, people cannot tell a button from a box or a status from a decoration.")}
      task={tt("You are Theo. One of your orders has a problem. Find it and fix it.")}
      versions={[
        { id: "decorate", label: tt("Coloured to decorate"), render: (ctx) => <Orders ctx={ctx} fn={false} />, insight: tt("In plain words: the dots are orange, green and purple, and so are the offer box and the link. The failed order has a cheerful green dot and no word. Theo has to open each order to find the problem.") },
        { id: "function", label: tt("Coloured to function"), render: (ctx) => <Orders ctx={ctx} fn />, insight: tt("In plain words: blue means he can act, red means a problem, grey means information, and each state has a word and a symbol next to its colour, so it survives colour blindness too. Theo sees at once that order 1044 needs him.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · readable type */

type Levers = { size: boolean; spacing: boolean; contrast: boolean; structure: boolean };
function Notice({ ctx, l }: { ctx: LabCtx; l: Levers }) {
  const [pick, setPick] = useState(false);
  if (ctx.finished) return <Done text={tt("Delivery moved to Saturday, 09:00 to 11:00")} />;
  const change = <button type="button" onClick={() => { setPick(true); ctx.hit(tt("Found “change the time”")); }} className="underline" style={{ color: l.contrast ? ACC : "#6B7280" }}>{tt("change the time")}</button>;
  const style = { fontSize: l.size ? 15 : 11, lineHeight: l.spacing ? 1.6 : 1.15, color: l.contrast ? "#111827" : "#767676", fontWeight: l.contrast ? 400 : 300 };
  return (
    <AppScreen brand={Brand} color="#14532D">
      <p className="text-[14px] font-bold">{tt("Your delivery")}</p>
      {l.structure ? (
        <div style={style} className="space-y-2">
          <p><b>{tt("When")}:</b> {tt("tomorrow, 14:00 to 16:00")}</p>
          <p><b>{tt("If you are out")}:</b> {tt("we leave it with a neighbour and put a card in your letterbox")}</p>
          <p><b>{tt("To change it")}:</b> {change}</p>
        </div>
      ) : (
        <p style={style}>
          {tt("Your order will be delivered tomorrow between 14:00 and 16:00 and if nobody is at home our driver will try to leave it with a neighbour and put a card in your letterbox, otherwise it returns to the depot, and if this does not suit you, you can")} {change} {tt("until 22:00 today.")}
        </p>
      )}
      {pick && (
        <div className="space-y-1 rounded bg-[#EFF6FF] p-2">
          {[tt("Tomorrow 18:00 to 20:00"), tt("Saturday 09:00 to 11:00")].map((x) => <button key={x} type="button" onClick={() => (x.includes("Saturday") ? ctx.done(tt("Moved to Saturday")) : ctx.miss(tt(`Picked ${x}`)))} className="block w-full rounded border border-[#93C5FD] bg-white px-2 py-1 text-left">{x}</button>)}
        </div>
      )}
    </AppScreen>
  );
}

export function TypeLab() {
  const v = (id: string, label: string, l: Levers, insight: string) => ({ id, label, render: (ctx: LabCtx) => <Notice ctx={ctx} l={l} />, insight });
  return (
    <TaskLab
      label={tt("A Kettle & Co delivery notice with and without readable type · a working product · Case assumption, example company")}
      point={tt("Readable type on a screen comes from a few levers: a large enough size, enough line spacing, enough contrast, a weight whose strokes do not vanish, and a structure of short parts. Elegant type that ignores them is read badly, above all by older people and on small screens. Try it with the “older eyes” and “sunlight” stress tests.")}
      task={tt("You are Rosa. Find out what happens if you are out, then move the delivery to Saturday morning.")}
      versions={[
        v("elegant", tt("Elegant, small, light"), { size: false, spacing: false, contrast: false, structure: false }, tt("In plain words: small, light, tightly set type in one long sentence. Rosa leans in, reads a line twice, and the three facts she needs are hidden in it.")),
        v("partial", tt("Larger and darker"), { size: true, spacing: false, contrast: true, structure: false }, tt("In plain words: she can read it now, but the lines still run together and the facts are still in one sentence.")),
        v("all", tt("All four levers"), { size: true, spacing: true, contrast: true, structure: true }, tt("In plain words: large enough, room between the lines, dark on white, and three short parts: when, if you are out, how to change it.")),
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · typographic hierarchy */

function Help({ ctx, kind }: { ctx: LabCtx; kind: "flat" | "clear" | "many" }) {
  if (ctx.finished) return <Done text={tt("Return started for the damaged item")} />;
  const H = ({ children, lvl, i }: { children: ReactNode; lvl: 1 | 2 | 3; i: number }) => {
    if (kind === "flat") return <p className="text-[12px]">{children}</p>;
    if (kind === "clear") return <p className={lvl === 1 ? "text-[17px] font-bold" : lvl === 2 ? "mt-2 text-[14px] font-bold text-[#14532D]" : "text-[12.5px] font-semibold"}>{children}</p>;
    const sizes = ["text-[18px] font-black text-[#BE185D]", "text-[13px] italic text-[#1D4ED8]", "text-[15px] font-bold uppercase text-[#C2410C]", "text-[12px] font-bold underline text-[#6D28D9]", "text-[16px] text-[#047857]"];
    return <p className={sizes[i % sizes.length]}>{children}{i % 2 ? <span className="ml-1 rounded bg-[#DC2626] px-1 text-[10px] text-white">{tt("NEW!")}</span> : null}</p>;
  };
  const body = (t: string) => <p className="text-[12px] text-[#334155]" onClick={() => ctx.miss(tt("Read a paragraph"))}>{t}</p>;
  return (
    <AppScreen brand={Brand} color="#14532D">
      <H lvl={1} i={0}>{tt("Help")}</H>
      <H lvl={2} i={1}>{tt("Delivery")}</H>
      {body(tt("We deliver between 07:00 and 22:00 in two-hour slots. You can change a slot until 22:00 the day before."))}
      <H lvl={2} i={2}>{tt("Payment")}</H>
      {body(tt("You pay by card or invoice. A failed payment is shown in your orders."))}
      <H lvl={2} i={3}>{tt("Returns")}</H>
      {body(tt("Fresh goods cannot be sent back, but we refund them."))}
      <H lvl={3} i={4}>{tt("Damaged items")}</H>
      <p className="text-[12px] text-[#334155]">{tt("Take a photo within 24 hours and")} <button type="button" onClick={() => ctx.done(tt("Started a return"))} className="text-[#1D4ED8] underline">{tt("start a return")}</button>.</p>
    </AppScreen>
  );
}

export function HierLab() {
  return (
    <TaskLab
      label={tt("The same Kettle & Co help page: flat, with a clear hierarchy, and with too many styles · a working product · Case assumption, example company")}
      point={tt("A typographic hierarchy is a few fixed levels that look clearly different and mean the same on every page. It lets the eye jump from heading to heading. No levels, and nothing stands out; too many styles, and everything shouts.")}
      task={tt("You are Theo. A jar arrived broken. Find how to return it, and start the return.")}
      versions={[
        { id: "flat", label: tt("Flat"), render: (ctx) => <Help ctx={ctx} kind="flat" />, insight: tt("In plain words: the headings are in the same size and weight as the text. Theo has to read from the top to find “Returns”.") },
        { id: "clear", label: tt("A clear hierarchy"), render: (ctx) => <Help ctx={ctx} kind="clear" />, insight: tt("In plain words: one page heading, section headings in the brand colour, a smaller subheading, and body text. Theo's eye jumps from Delivery to Returns in a second.") },
        { id: "many", label: tt("Too many styles"), render: (ctx) => <Help ctx={ctx} kind="many" />, insight: tt("In plain words: every heading has its own size and colour, and “NEW!” labels compete with them. Theo cannot tell which level a heading is, so the order is lost again.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · the length of a line */

const TERMS = () => [
  tt("Delivery slots run from"), "06:00", tt("to"), "10:00", tt("and from"), "16:00", tt("to"), "20:00",
  tt(". If you are out, the driver rings twice and waits five minutes; after that, the order goes to the neighbour named in your account, or back to the depot by"), "18:00",
  tt(". You can move an order to another day free of charge up to"), "22:00",
  tt("on the evening before. After that the slot is fixed and the order is packed. Substitutions for items that are out of stock are chosen by the packer unless you have switched them off in your account, and you will see them on the delivery note. Frozen and chilled items are packed last and kept cold until the driver is at your door."),
];

function Terms({ ctx, ch }: { ctx: LabCtx; ch: number }) {
  if (ctx.finished) return <Done text={tt("Free changes until 22:00 the evening before")} />;
  return (
    <AppScreen brand={Brand} color="#14532D">
      <p className="text-[14px] font-bold">{tt("Delivery terms")}</p>
      <p className="mx-auto text-[13px] leading-snug" style={{ maxWidth: `${ch}ch` }}>
        {TERMS().map((x, i) =>
          /^\d\d:\d\d$/.test(x) ? (
            <button key={i} type="button" onClick={() => (x === "22:00" ? ctx.done(tt("Tapped 22:00")) : ctx.miss(tt(`Tapped ${x}`)))} className="mx-0.5 rounded bg-[#F1F5F9] px-1 font-semibold">{x}</button>
          ) : (
            <span key={i}>{x.startsWith(".") ? x + " " : ` ${x} `}</span>
          ),
        )}
      </p>
    </AppScreen>
  );
}

export function MeasureLab() {
  return (
    <TaskLab
      label={tt("The Kettle & Co delivery terms at three line lengths · a working product · Case assumption, example company")}
      point={tt("The length of a line changes how easily the eye finds the next one. WCAG 1.4.8 asks for no more than 80 characters per line, and one study found comprehension highest at about 55. The same text is set here at three widths; find the answer in each and see where your eye gets lost.")}
      task={tt("You are Theo. Until what time can you move tomorrow's delivery free of charge? Tap the time.")}
      device="desktop"
      stresses={["eyes", "hurry", "ping"]}
      versions={[
        { id: "long", label: tt("Very long lines (about 120 characters)"), render: (ctx) => <Terms ctx={ctx} ch={120} />, insight: tt("In plain words: the eye runs a long way across and has trouble finding the start of the next line, so the same words take longer to read and the times blur together.") },
        { id: "mid", label: tt("About 55 characters"), render: (ctx) => <Terms ctx={ctx} ch={55} />, insight: tt("In plain words: a line is short enough for the eye to return easily and long enough to carry a whole phrase. Theo can scan the times quickly.") },
        { id: "short", label: tt("Very short lines (about 22 characters)"), render: (ctx) => <Terms ctx={ctx} ch={22} />, insight: tt("In plain words: the eye jumps back every few words, the text becomes a tall strip and a time can be split across lines. Short is not always better.") },
      ]}
    />
  );
}
