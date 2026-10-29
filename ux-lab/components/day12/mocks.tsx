"use client";

import type { ReactNode } from "react";
import { tt } from "@/lib/lang";

/**
 * Day 12 · the drawn screens of the study cards (CLAUDE.md #52): Greenway, a made-up online grocer, so no task is answered here. Each mock is the same screen in
 * different states; the figure around it (components/day12/diagrams.tsx) says what changes and for whom.
 *
 * Shown for real (user rule 2026-10-28): the checkout is drawn as it reaches each person (what a screen reader says, how dense text looks to a reader with
 * dyslexia, a washed-out screen in sunlight), so the barrier is met, not described. Prices and quantities are shop labels of a made-up shop.
 */
const BRAND = "#1F6F43";
const INK = "#1D2733";

export function Phone({ children, label, title = "Greenway", style }: { children: ReactNode; label: string; title?: string; style?: React.CSSProperties }) {
  return (
    <div role="img" aria-label={label} className="mx-auto w-full max-w-[300px] select-none">
      <div className="overflow-hidden rounded-[28px] border-[6px] border-[#1F2730] bg-[#F7FAF8] shadow-md" style={style}>
        <div className="flex items-center justify-between px-4 pt-1.5 text-[10px] font-semibold text-white" style={{ background: BRAND }}>
          <span>17:05</span>
          <span aria-hidden>▂▄▆ ◔</span>
        </div>
        <div className="px-4 pb-2.5 pt-1 text-[13px] font-bold text-white" style={{ background: BRAND }}>{title}</div>
        <div className="min-h-[250px] space-y-2 p-3 text-[12px] leading-snug" style={{ color: INK }}>{children}</div>
      </div>
    </div>
  );
}

const Row = ({ a, b }: { a: string; b: string }) => (
  <div className="flex justify-between border-b border-[#E3ECE6] py-1"><span>{a}</span><span className="font-semibold">{b}</span></div>
);
const Pay = ({ children = tt("Pay now") }: { children?: ReactNode }) => <div className="rounded-lg py-2 text-center font-semibold text-white" style={{ background: BRAND }}>{children}</div>;
const Note = ({ children }: { children: ReactNode }) => <div className="rounded border border-dashed border-[#9AA9A0] bg-white px-2 py-1 text-[10.5px] text-[#4A5560]">{children}</div>;

/* ------------------------------------------------------------------ A1 · one checkout, four people */

export function CheckoutMock({ who }: { who: "kofi" | "liv" | "arjun" | "sun" }) {
  if (who === "kofi")
    return (
      <Phone label={tt("Greenway's checkout as Kofi's screen reader announces it: button, button, image, link, button, with no names")}>
        <div className="font-bold">{tt("Checkout")}</div>
        <div className="space-y-1 rounded bg-[#111827] p-2 font-mono text-[10.5px] text-[#E5E7EB]">
          <div>🔊 “{tt("Button.")}”</div>
          <div>🔊 “{tt("Button.")}”</div>
          <div>🔊 “{tt("Image.")}”</div>
          <div>🔊 “{tt("Link, click here.")}”</div>
          <div>🔊 “{tt("Button.")}”</div>
        </div>
        <Note>{tt("Kofi is blind. The − and + for quantities, the delivery slot and Pay are icons without names; his screen reader cannot say what they do.")}</Note>
      </Phone>
    );
  if (who === "liv")
    return (
      <Phone label={tt("The checkout as a dense block of justified small text in capitals, as hard as it is for Liv, who has dyslexia")}>
        <div className="font-bold">{tt("Checkout")}</div>
        <p className="text-justify text-[10px] uppercase italic leading-tight">{tt("By placing your order you agree that substitutions may be made where items are unavailable unless you have opted out of substitutions in your account preferences prior to the cut-off time which is subject to change.")}</p>
        <Pay />
        <Note>{tt("Liv has dyslexia. Justified text, capitals, italics and one long sentence make the letters swim; she cannot find out whether substitutions are on.")}</Note>
      </Phone>
    );
  if (who === "arjun")
    return (
      <Phone label={tt("The checkout used with the keyboard alone: the focus is invisible and jumps from the basket to the footer, skipping Pay")}>
        <div className="font-bold">{tt("Checkout")}</div>
        <Row a={tt("Apples 1 kg")} b="2.49" />
        <Row a={tt("Oat milk")} b="1.79" />
        <div className="rounded-lg py-2 text-center font-semibold text-white" style={{ background: BRAND }}>{tt("Pay now")}</div>
        <div className="flex gap-1 text-[10px]"><span className="rounded bg-[#FDE2E2] px-1">Tab 1: {tt("basket")}</span><span className="rounded bg-[#FDE2E2] px-1">Tab 2: {tt("footer")}</span><span className="rounded bg-[#FDE2E2] px-1">Tab 3: {tt("logo")}</span></div>
        <Note>{tt("Arjun has his right arm in a cast for six weeks and uses the keyboard. The focus cannot be seen, and Pay is never reached. A temporary limit, the same barrier.")}</Note>
      </Phone>
    );
  return (
    <Phone label={tt("The checkout on a phone in bright sunlight: light grey text has almost disappeared")} style={{ filter: "contrast(0.45) brightness(1.25)" }}>
      <div className="font-bold">{tt("Checkout")}</div>
      <Row a={tt("Apples 1 kg")} b="2.49" />
      <div style={{ color: "#A3AAB2" }}>{tt("Delivery Thursday 18:00–20:00 · change")}</div>
      <Pay />
      <Note>{tt("Anyone outside in the sun: the light grey delivery line is gone. A situational limit, the same barrier as poor eyesight.")}</Note>
    </Phone>
  );
}

/* ------------------------------------------------------------------ A2 · colour only, and text alternatives */

export function StockMock({ words, alt }: { words: boolean; alt: boolean }) {
  return (
    <Phone label={tt(`Greenway product tiles. ${words ? "Out of stock is said in words and with an icon." : "Out of stock is shown only by a red border."} ${alt ? "The product images have text alternatives." : "The product images have no text alternatives."}`)}>
      <div className="grid grid-cols-2 gap-2">
        {[
          [tt("Strawberries"), "🍓", true],
          [tt("Spinach"), "🥬", false],
        ].map(([n, e, ok]) => (
          <div key={String(n)} className="rounded-lg border-2 bg-white p-2 text-center" style={{ borderColor: ok ? "#9BD3AE" : "#E06C6C" }}>
            <div className="text-[28px]">{e}</div>
            <div className="font-semibold">{n}</div>
            {words && !ok && <div className="mt-1 rounded bg-[#FDE2E2] text-[10.5px] font-semibold text-[#8A1C1C]">✕ {tt("Out of stock")}</div>}
            {alt && <div className="mt-1 text-[9.5px] text-[#4A5560]">alt: “{ok ? tt("Punnet of fresh strawberries, 500 g") : tt("Bunch of fresh spinach")}”</div>}
          </div>
        ))}
      </div>
      {!words && <Note>{tt("Which one is out of stock? Only the red border says so.")}</Note>}
    </Phone>
  );
}

/* ------------------------------------------------------------------ A4 · official or plain words */

export function FormMock({ plain }: { plain: boolean }) {
  return (
    <Phone label={plain ? tt("The delivery form in plain language: short steps and clear labels") : tt("The delivery form in official language: long nested sentences and technical terms")}>
      <div className="font-bold">{plain ? tt("Where should we deliver?") : tt("Specification of the delivery modality")}</div>
      {plain ? (
        <>
          <div><div className="text-[10.5px]">{tt("Street and house number")}</div><div className="rounded border border-[#B9C6BE] bg-white px-2 py-1">Lindenstraße 4</div></div>
          <div><div className="text-[10.5px]">{tt("If nobody is home, we may leave it with: (optional)")}</div><div className="rounded border border-[#B9C6BE] bg-white px-2 py-1">{tt("a neighbour")}</div></div>
        </>
      ) : (
        <>
          <p className="text-[10.5px]">{tt("Insofar as the recipient is not present at the delivery address at the time of delivery, the delivery may, subject to the prior declaration of consent pursuant to Section 7(2), be deposited with a third party resident in the immediate vicinity.")}</p>
          <div><div className="text-[10.5px]">{tt("Delivery locality designation")}</div><div className="rounded border border-[#B9C6BE] bg-white px-2 py-1">&nbsp;</div></div>
        </>
      )}
    </Phone>
  );
}

/* ------------------------------------------------------------------ A5 · measures, as thumbnails */

export function MeasureThumb({ kind }: { kind: "components" | "alt" | "overlay" }) {
  return (
    <div aria-hidden className="mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border border-line bg-white text-[9px] leading-tight text-[#26323F]">
      <div className="px-2 py-1 font-bold text-white" style={{ background: BRAND }}>Greenway</div>
      <div className="space-y-1 p-1.5">
        {kind === "components" && (
          <>
            <div className="rounded border-2 border-[#1D4ED8] px-1">[ Pay now ] ← focus</div>
            <div>Button · Field · Tile: fixed once</div>
          </>
        )}
        {kind === "alt" && <div>4,000 product images → alt text</div>}
        {kind === "overlay" && (
          <>
            <div className="rounded-full bg-[#1D4ED8] px-1 text-white">♿ Accessibility widget</div>
            <div className="text-[#B42318]">“100% compliant!”</div>
          </>
        )}
      </div>
    </div>
  );
}
