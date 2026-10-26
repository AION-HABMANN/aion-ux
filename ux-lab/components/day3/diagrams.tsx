"use client";

import { useState } from "react";
import { ColourMock, FunctionMock, HierMock, MeasureThumb, TypeMock } from "@/components/day3/mocks";
import { MatrixStory, StateFig, SwitchFig } from "@/components/dayFree/figs";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { tt } from "@/lib/lang";

/**
 * Day 3 · the teaching diagrams of Materi A and B. Example: Kettle & Co, a made-up online grocery shop, with Rosa and Theo (customers), Ines (UX lead) and Karim (brand
 * manager); never TravelEase, HealthConnect or SecureLife, so no task is answered here. Interactive ones carry "The point" and an always-visible "What this shows"; the
 * story of each card is its pixel comic (data/day3/comics.ts); the static ones are drawn pictures (CLAUDE.md #20, #36, #51, #52).
 */

/* ------------------------------------------------------------------ A1 · what colour does (interactive) */

export function ColourFig() {
  return (
    <SwitchFig
      label={tt("A Kettle & Co order page: an accent for the main action, red only for a real problem, one calm colour per area · Exploratory · Case assumption")}
      point={tt("Colour is seen first. It can draw attention to one thing, make an action inviting, warn, build trust through calm and consistency, and give orientation when each area keeps its colour. Used everywhere at full strength, it does none of these.")}
      switches={[
        { id: "accent", label: tt("An accent for the main action") },
        { id: "warn", label: tt("Red only for a real problem") },
        { id: "areas", label: tt("One calm colour per area") },
      ]}
      start={{ accent: false, warn: false, areas: false }}
      picture={(on) => <ColourMock accent={!!on.accent} warn={!!on.warn} areas={!!on.areas} />}
      insight={(on) => {
        const n = [on.accent, on.warn, on.areas].filter(Boolean).length;
        return tt(
          `In plain words: ${n} of the 3 colour jobs are done. ${on.accent ? "“Pay now” is the only strong blue, so Rosa's eye goes there and the action feels inviting." : "“Pay now” is grey and “Keep shopping” is bright orange, so Rosa's eye goes to the wrong button."} ${on.warn ? "The delivery notice is calm, so red stays free for a real problem and keeps its warning." : "A red “ATTENTION” box for an ordinary delivery time alarms Rosa for nothing and teaches her to ignore red."} ${on.areas ? "Fruit, dairy and bakery each have a calm tint, so she knows where she is." : "Three loud colours for the areas compete with everything else."}`,
        );
      }}
    />
  );
}

/* ------------------------------------------------------------------ A2 · decorative against functional colour (interactive) */

export function FunctionFig() {
  return (
    <StateFig
      label={tt("The same Kettle & Co order list, coloured to decorate and coloured to function · Exploratory · Case assumption")}
      point={tt("Functional colour has a job: action, priority or state, and each colour keeps one meaning. Decorative colour only sets a look. When decoration and meaning use the same bright tones, people cannot tell a button from a box or a status from a decoration.")}
      states={[
        { id: "decorative", button: tt("Coloured to decorate"), picture: <FunctionMock kind="decorative" />, insight: tt("In plain words: the dots of the three orders are orange, green and purple, and so are the button, the offer box and the link. Theo cannot tell which order failed, which colour he can press, or whether the purple dot means anything at all.") },
        { id: "functional", button: tt("Coloured to function"), picture: <FunctionMock kind="functional" />, insight: tt("In plain words: blue means he can do something, red means a problem, grey means information, and each state has a word and a symbol next to its colour. Theo sees at once that order 1044 needs him, and that “Order again” is a button.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · four levers of readable type (interactive) */

export function TypeFig() {
  return (
    <SwitchFig
      label={tt("A Kettle & Co delivery notice: type size, line spacing, contrast and structure · Exploratory · Case assumption")}
      point={tt("Readable type on a screen comes from a few levers: a large enough size, enough line spacing, enough contrast between text and background, a weight whose strokes do not vanish, and a structure of short parts. Elegant type that ignores them is read badly, above all by older people and on small screens.")}
      switches={[
        { id: "size", label: tt("Larger type") },
        { id: "spacing", label: tt("More line spacing") },
        { id: "contrast", label: tt("More contrast") },
        { id: "structure", label: tt("Short parts") },
      ]}
      start={{ size: false, spacing: false, contrast: false, structure: false }}
      picture={(on) => <TypeMock size={!!on.size} spacing={!!on.spacing} contrast={!!on.contrast} structure={!!on.structure} />}
      insight={(on) => {
        const n = [on.size, on.spacing, on.contrast, on.structure].filter(Boolean).length;
        return tt(
          `In plain words: ${n} of the 4 levers are used. ${on.size ? "The text is large enough for Rosa to read without leaning in." : "The small type makes Rosa lean towards the screen."} ${on.spacing ? "There is room between the lines, so her eye finds the next one." : "The lines run together, so she reads one twice."} ${on.contrast ? "Dark text on white is easy to read." : "Light grey text on white almost disappears."} ${on.structure ? "Three short parts: the time, what happens if she is out, and how to change it." : "One long sentence hides the three facts she needs."}`,
        );
      }}
    />
  );
}

/* ------------------------------------------------------------------ A4 · typographic hierarchy (interactive) */

export function HierFig() {
  return (
    <StateFig
      label={tt("The same Kettle & Co help page: flat, with a clear hierarchy, and with too many styles · Exploratory · Case assumption")}
      point={tt("A typographic hierarchy is a few fixed levels that look clearly different and mean the same on every page. It lets the eye jump from heading to heading. No levels, and nothing stands out; too many styles, and everything shouts.")}
      states={[
        { id: "flat", button: tt("Flat"), picture: <HierMock kind="flat" />, insight: tt("In plain words: the headings are in the same size and weight as the text. Theo has to read from the top to find “Returns”.") },
        { id: "clear", button: tt("A clear hierarchy"), picture: <HierMock kind="clear" />, insight: tt("In plain words: one page heading, three section headings in the brand colour, and body text. Theo's eye jumps from Delivery to Returns in a second.") },
        { id: "over", button: tt("Too many styles"), picture: <HierMock kind="over" />, insight: tt("In plain words: every heading has its own size and colour, and “NEW!” labels compete with them. Theo cannot tell which level a heading is, so the order is lost again.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A5 · three measures weighed on four criteria (interactive) */

export function WeighFig() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    {
      id: "status",
      name: tt("A word and a symbol next to every status colour"),
      cells: {
        effect: { level: 3, reason: tt("Every customer who checks an order sees its state at once, also those who see colours differently.") },
        feasibility: { level: 3, reason: tt("One component changes; the brand colours stay as they are.") },
        risk: { level: 1, reason: tt("It adds words; nothing is taken away.") },
        time: { level: 3, reason: tt("Live in the next release; the questions about order states show the effect within weeks.") },
      },
    },
    {
      id: "action",
      name: tt("One action colour for every button that does something"),
      cells: {
        effect: { level: 3, reason: tt("Customers learn once what can be pressed, on every page.") },
        feasibility: { level: 2, reason: tt("Every button style in the shop has to be replaced; the brand team must agree that green stays for the logo.") },
        risk: { level: 2, reason: tt("Marketing loses its campaign-coloured buttons and may push back.") },
        time: { level: 2, reason: tt("It takes a few releases to reach every page.") },
      },
    },
    {
      id: "size",
      name: tt("Larger body text with more line spacing"),
      cells: {
        effect: { level: 2, reason: tt("Everyone reads more easily; older customers most of all.") },
        feasibility: { level: 3, reason: tt("One type setting for all pages.") },
        risk: { level: 2, reason: tt("Some pages get longer and some layouts break on small screens; they have to be checked.") },
        time: { level: 3, reason: tt("It can go live quickly once the pages are checked.") },
      },
    },
  ];
  return (
    <Diagram label={tt("Kettle & Co weighs three measures on effect on users, feasibility, risk and time pressure · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("Colour and type measures are weighed like any other: on the same four questions, with the reason next to each rating. A measure that changes one shared element for every page often beats one that looks bigger.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {(["status", "action", "size"] as const).map((k, i) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{rows[i].name}</p>
            </div>
          ))}
        </div>
        <OptionGrid
          label={tt("Kettle & Co · three measures for the shop")}
          caption={tt("Three measures for Kettle & Co (Case assumption, example company)")}
          rows={rows}
          cols={[
            { id: "effect", label: tt("Effect on users") },
            { id: "feasibility", label: tt("Feasibility") },
            { id: "risk", label: tt("Risk") },
            { id: "time", label: tt("Time pressure: fits the time") },
          ]}
          selected={sel}
          onSelect={setSel}
        />
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B1 · decided per campaign against decided once (static) */

export function RulesFig() {
  return (
    <CompareFig
      label={tt("Kettle & Co's colour and type decided campaign by campaign, or decided once as rules")}
      left={tt("Decided per campaign and per team")}
      right={tt("Decided once, as rules")}
      rows={[
        [tt("The button colour changes with each campaign: orange in summer, red at Christmas."), tt("Blue always means “you can do something”; campaigns live in the images.")],
        [tt("The app team sets headings in 18 points, the web team in 24."), tt("Four type levels, the same in the shop, the app and the e-mails.")],
        [tt("Each team designs its own status label."), tt("One status component with a colour, a word and a symbol.")],
        [tt("Meetings argue about whether the new orange looks fresh."), tt("Meetings ask whether a change breaks a rule, and why.")],
      ]}
      caption={tt("The brand is recognised by its consistency, not by its changing colours. Rules turn a debate about taste into a question about effect.")}
    />
  );
}

export function LogicChainFig() {
  return (
    <ChainFig
      label={tt("From the brand to the screens: where colour and type are decided")}
      steps={[
        { h: tt("The brand"), b: tt("Logo, brand colours, typeface, tone: owned by the brand team."), kind: "m" },
        { h: tt("The rules"), b: tt("Which colour means action, warning, state; which type levels and minimum sizes exist."), kind: "a" },
        { h: tt("The components"), b: tt("Buttons, status labels, notices and headings built once from the rules."), kind: "a" },
        { h: tt("The screens"), b: tt("Every page in every channel, assembled from the components."), kind: "s" },
      ]}
      caption={tt("A decision made at the rules or the components reaches every screen at once. A decision made on one screen reaches one screen.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · conflicts in a matrix (interactive) */

export function ConflictFig() {
  return (
    <MatrixStory
      label={tt("Five Kettle & Co designs by readability and brand presence · Exploratory · Case assumption")}
      point={tt("Brand presence and readability can pull against each other, but they need not. The aim is the top right: recognisably the brand, and readable for everyone. It is usually reached by keeping the brand in the logo, tone and images, and the interface in functional rules.")}
      title={tt("Kettle & Co designs")}
      xLabel={tt("Readability and contrast")}
      yLabel={tt("Brand presence")}
      quads={[tt("Brand, hard to read"), tt("The aim"), tt("Neither"), tt("Readable, anonymous")]}
      points={[
        { id: "p1", letter: "A", name: tt("Green everywhere, white text on light green"), x: 0.15, y: 0.88, reading: tt("Unmistakably Kettle & Co, but the white text on light green is hard to read. Brand against accessibility.") },
        { id: "p2", letter: "B", name: tt("Black on white, no brand colour"), x: 0.9, y: 0.18, reading: tt("Readable for everyone, but it could be any shop. Clarity without brand.") },
        { id: "p3", letter: "C", name: tt("Brand in logo and images, functional interface"), x: 0.82, y: 0.78, reading: tt("The green logo and the photos carry the brand; buttons, states and text follow the rules. Close to the aim.") },
        { id: "p4", letter: "D", name: tt("Thin, elegant typeface"), x: 0.32, y: 0.6, reading: tt("It looks premium, but thin strokes at small sizes vanish on a phone. Aesthetics against readability.") },
        { id: "p5", letter: "E", name: tt("A new colour for each campaign"), x: 0.45, y: 0.35, reading: tt("Each campaign looks fresh, but nothing means the same twice and the brand blurs. Activation and freedom against standardisation.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for Kettle & Co (static) */

export function DecisionFig() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for Kettle & Co")}
      boxes={[
        [tt("What we decide"), tt("Every order state shows a word and a symbol next to its colour, in the shop, the app and the e-mails.")],
        [tt("What we do not know"), tt("How many of the calls about orders come from misread colours; support records the subject, not the screen.")],
        [tt("When we would reverse it"), tt("If the questions about order states do not drop in the first months.")],
        [tt("What we give up"), tt("The minimal look of the order list, and the campaign colours on status labels.")],
      ]}
      rule={[
        [tt("Who owns the visual standards"), tt("The head of UX owns the colour and type rules and the components; the brand manager owns the logo, the brand colours and the tone.")],
        [tt("How a conflict is decided"), tt("Minimum readability and contrast first; above them, the head of UX and the brand manager decide on the evidence; the director settles a tie.")],
      ]}
      caption={tt("A colour or type problem becomes a business risk when it causes operating errors, support costs or a loss of trust. That is why the decision says when it will be checked.")}
    />
  );
}
