"use client";

import { useState } from "react";
import { CheckoutMock, ConfirmMock, ErrorMock, MeasureThumb, ReminderMock } from "@/components/day7/mocks";
import { MatrixStory, StateFig, SwitchFig } from "@/components/dayFree/figs";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { tt } from "@/lib/lang";

/**
 * Day 7 · the teaching diagrams of Materi A and B. Example: Moss & Pine, a made-up garden centre with an online shop and an app, with Hana and Jonas (customers), Wanda
 * (UX writer) and Bruno (product owner); never WellTrack, CareerPath or LifeSupport, so no task is answered here. Interactive ones carry "The point" and an
 * always-visible "What this shows"; the story of each card is its pixel comic (data/day7/comics.ts); the static ones are drawn pictures (CLAUDE.md #20, #36, #51, #52).
 */

/* ------------------------------------------------------------------ A1 · a cold and a warm confirmation (interactive) */

export function FeelFig() {
  return (
    <StateFig
      label={tt("The same Moss & Pine order confirmation, cold and warm · Exploratory · Case assumption")}
      point={tt("People feel before they judge, and the feeling steers what they do: where they look, whether they go on, whether they believe it, what they remember and what they choose next. The two confirmations hold the same facts; they leave a different feeling.")}
      states={[
        { id: "cold", button: tt("Cold"), picture: <ConfirmMock kind="cold" />, insight: tt("In plain words: an order number and PROCESSED. Hana is not sure the plants are really coming or when, so she checks her e-mail twice (attention), wonders whether to order from a shop she knows instead next time (decision) and remembers the order as a form she filled in (memory).") },
        { id: "warm", button: tt("Warm"), picture: <ConfirmMock kind="warm" />, insight: tt("In plain words: her plants are on their way, they arrive on Thursday, and here is what to do on the first day. Hana feels looked after (trust), is curious about the care tips (motivation) and remembers the shop as one that cares about plants.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · safety, control and recognition on one usable step (interactive) */

export function FactorsFig() {
  return (
    <SwitchFig
      label={tt("A Moss & Pine checkout step: safety, control and recognition · Exploratory · Case assumption")}
      point={tt("A step can be fully usable and still feel unsafe, out of control or anonymous. The fields and the button stay the same in every version; only the emotional factors change. Usability is the floor; experience quality is how it feels to stand on it.")}
      switches={[
        { id: "safety", label: tt("Safety: say what happens next") },
        { id: "control", label: tt("Control: a way to change or undo") },
        { id: "recognition", label: tt("Recognition: show that we know him") },
      ]}
      start={{ safety: false, control: false, recognition: false }}
      picture={(on) => <CheckoutMock safety={!!on.safety} control={!!on.control} recognition={!!on.recognition} />}
      insight={(on) => {
        const n = [on.safety, on.control, on.recognition].filter(Boolean).length;
        return tt(
          `In plain words: ${n} of the 3 factors are used. ${on.safety ? "Jonas knows he will get an e-mail and can cancel until it ships, so he feels safe to pay." : "Nothing says what happens after Pay, so Jonas hesitates: uncertainty."} ${on.control ? "He can go back to his basket, so he feels in control." : "There is no way back, so he feels pushed."} ${on.recognition ? "The page knows his saved hedge plan, so he feels recognised as a returning customer." : "The page treats him as a stranger, though he has ordered before."}`,
        );
      }}
    />
  );
}

/* ------------------------------------------------------------------ A3 · one error written three ways (interactive) */

export function ToneFig() {
  return (
    <StateFig
      label={tt("One Moss & Pine payment error: technical, cheerful and supportive · Exploratory · Case assumption")}
      point={tt("Most emotional effect sits in feedback and tone at the critical moments. The same error can make people feel at fault, not taken seriously, or safe. A supportive message says what happened, what it means for them and how to go on, in plain and calm words.")}
      states={[
        { id: "technical", button: tt("Technical"), picture: <ErrorMock kind="technical" />, insight: tt("In plain words: an error code and Transaction failed. Hana does not know whether she was charged or whether her basket is gone. She feels she did something wrong and closes the app.") },
        { id: "cheerful", button: tt("Cheerful"), picture: <ErrorMock kind="cheerful" />, insight: tt("In plain words: Oops, an emoji, no worries. It is friendly, but it does not say what happened or what to do. Hana feels her problem is not taken seriously.") },
        { id: "supportive", button: tt("Supportive"), picture: <ErrorMock kind="supportive" />, insight: tt("In plain words: the payment did not go through, nothing was charged, the basket is saved, here are two ways on and help by phone. Hana feels safe and pays by invoice.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · activation against fit (interactive) */

export function ActivationFig() {
  return (
    <MatrixStory
      label={tt("Five Moss & Pine messages by how strongly they activate and how well they fit the situation · Exploratory · Case assumption")}
      point={tt("Strong activation is not the aim; fit is. A message that fits the situation and activates gently builds lasting use. A message that activates strongly without fitting turns into over-emotionalisation, and one that uses emotion against the customer is manipulation.")}
      title={tt("Moss & Pine messages")}
      xLabel={tt("Fits the situation")}
      yLabel={tt("Activates strongly")}
      quads={[tt("Pushy or manipulative"), tt("Fits and activates"), tt("Neither"), tt("Fits, calm: lasting use")]}
      points={[
        { id: "p1", letter: "A", name: tt("“Almost gone! Order now or miss out!”"), x: 0.12, y: 0.88, reading: tt("False urgency: the stock and the clock are invented to push. Strong activation, no fit, and a dark pattern.") },
        { id: "p2", letter: "B", name: tt("Confetti after a refund request"), x: 0.2, y: 0.6, reading: tt("Celebration where the customer is disappointed: incongruent address.") },
        { id: "p3", letter: "C", name: tt("“Spring planting has begun” in March"), x: 0.78, y: 0.66, reading: tt("A real reason, at the right time, with a gentle push. Fits and activates.") },
        { id: "p4", letter: "D", name: tt("A calm care reminder after a purchase"), x: 0.85, y: 0.3, reading: tt("Low activation, but it helps the plants live; customers come back because it was useful.") },
        { id: "p5", letter: "E", name: tt("“Your order has been processed”"), x: 0.42, y: 0.12, reading: tt("Neither warm nor useful: no activation and little fit.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A5 · from a signal to trust (static) and three measures (interactive) */

export function TrustChainFig() {
  return (
    <ChainFig
      label={tt("From a small signal to trust and use")}
      steps={[
        { h: tt("A small signal"), b: tt("For example: an error message that says nothing was charged."), kind: "m" },
        { h: tt("A judgement"), b: tt("“They know what they are doing, and they are honest with me.”"), kind: "a" },
        { h: tt("Trust"), b: tt("Perceived competence, honesty and goodwill, thought and felt at once."), kind: "a" },
        { h: tt("Use"), b: tt("People go on, come back and believe the next message."), kind: "s" },
      ]}
      caption={tt("Trust links the cognitive and the emotional effect. It grows from many small signals and is lost fast when a promise is broken.")}
    />
  );
}

export function WeighFig() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    {
      id: "errors",
      name: tt("Rewrite the error messages of the checkout"),
      cells: {
        effect: { level: 3, reason: tt("Every customer who meets an error now knows what happened and how to go on.") },
        feasibility: { level: 3, reason: tt("Writing, checked by Wanda and the developers; no new screens.") },
        risk: { level: 1, reason: tt("Low, as long as the texts stay correct.") },
        time: { level: 3, reason: tt("It fits the next release.") },
      },
    },
    {
      id: "photos",
      name: tt("New photographs on every product page"),
      cells: {
        effect: { level: 2, reason: tt("The shop feels warmer and closer to the nursery.") },
        feasibility: { level: 1, reason: tt("Every plant has to be photographed; it needs a photographer and the nursery's time.") },
        risk: { level: 1, reason: tt("Little risk, as long as the photos show the real plants.") },
        time: { level: 1, reason: tt("It takes the whole season.") },
      },
    },
    {
      id: "celebrate",
      name: tt("A celebration animation after every order"),
      cells: {
        effect: { level: 2, reason: tt("A moment of joy for some; others find it childish.") },
        feasibility: { level: 3, reason: tt("One animation, quickly built.") },
        risk: { level: 3, reason: tt("It can feel over-emotional, and it plays also when an order is a replacement for dead plants.") },
        time: { level: 3, reason: tt("It fits the next release.") },
      },
    },
  ];
  return (
    <Diagram label={tt("Moss & Pine weighs three measures on effect on users, feasibility, risk and time pressure · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("A quick change of words can have more effect than a large visual change, and a fast, joyful idea can carry the highest risk. Weigh each measure on the same four questions, with the reason next to each rating.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {(["errors", "photos", "celebrate"] as const).map((k, i) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{rows[i].name}</p>
            </div>
          ))}
        </div>
        <OptionGrid
          label={tt("Moss & Pine · three measures for the shop")}
          caption={tt("Three measures for Moss & Pine (Case assumption, example company)")}
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

/* ------------------------------------------------------------------ B1 · emotion as a campaign against emotion in the UX architecture (static) */

export function ArchitectureFig() {
  return (
    <CompareFig
      label={tt("Moss & Pine treating emotion as a campaign, or building it into the UX architecture")}
      left={tt("Emotion as a campaign")}
      right={tt("Emotion in the UX architecture")}
      rows={[
        [tt("Marketing makes the spring campaign warm and personal."), tt("A guiding vision says how every touchpoint should feel.")],
        [tt("The error messages and confirmations stay technical."), tt("Confirmations, errors and waiting follow one tone guide.")],
        [tt("Each team writes its own messages."), tt("Patterns for critical moments are built once and reused.")],
        [tt("The warm campaign promises what the product does not keep."), tt("The product keeps the promise in every interaction.")],
      ]}
      caption={tt("What people feel comes mostly from feedback, tone and interaction, which product teams build every day. That is why emotional UX is part of the architecture.")}
    />
  );
}

export function EmotionLayersFig() {
  return (
    <ChainFig
      label={tt("The layers of emotional UX, from a guiding vision to every message")}
      steps={[
        { h: tt("A guiding vision"), b: tt("“Customers feel looked after and sure of what happens, also when something goes wrong.”"), kind: "m" },
        { h: tt("Principles"), b: tt("Fit the feeling to the situation; never use urgency we cannot prove; always say what comes next."), kind: "a" },
        { h: tt("A tone guide and patterns"), b: tt("How we confirm, how we apologise, how we wait; written once."), kind: "a" },
        { h: tt("Every message and screen"), b: tt("Built from the patterns, in the shop, the app and the e-mails."), kind: "s" },
      ]}
      caption={tt("Leaders steer at the left: the vision, the principles and who owns them. Teams write at the right, from what the guide gives them.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · one template, four situations (interactive) */

export function SituationFig() {
  return (
    <StateFig
      label={tt("The same Moss & Pine message template in four situations · Exploratory · Case assumption")}
      point={tt("The right feeling depends on the situation, not on the brand alone. A gentle push fits an offer; a calm, useful voice fits care; an apology fits a delay; empathy and a remedy fit a loss. The same cheerful tone everywhere would be incongruent in two of the four.")}
      states={[
        { id: "sale", button: tt("An offer"), picture: <ReminderMock kind="sale" />, insight: tt("In plain words: a real reason at the right time, a gentle invitation. Activation fits here; false urgency would harm credibility.") },
        { id: "care", button: tt("Care"), picture: <ReminderMock kind="care" />, insight: tt("In plain words: calm and useful. Jonas's roses do well and he trusts the next message. Marketing would like an offer added; it would turn help into a sales channel.") },
        { id: "late", button: tt("A delay"), picture: <ReminderMock kind="late" />, insight: tt("In plain words: an apology, a reassurance and the new date. A cheerful tone here would feel as if the delay did not matter.") },
        { id: "loss", button: tt("A loss"), picture: <ReminderMock kind="loss" />, insight: tt("In plain words: the plants died. The message names the disappointment and offers a remedy. Confetti or an upsell here would be incongruent and would cost Hana's trust.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for Moss & Pine (static) */

export function DecisionFig() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for Moss & Pine")}
      boxes={[
        [tt("What we decide"), tt("We rewrite the confirmations and error messages of the checkout by one tone guide first, before any visual change.")],
        [tt("What we do not know"), tt("How customers feel about the shop today; we have only support e-mails and app reviews.")],
        [tt("When we would reverse it"), tt("If the e-mails asking “did my order work?” do not drop, or customers find the new tone too familiar.")],
        [tt("What we give up"), tt("Marketing's spring campaign waits a month, and the teams lose some freedom over their wording.")],
      ]}
      rule={[
        [tt("Who owns emotional UX"), tt("The head of customer experience owns the principles and the tone guide; the nursery checks that care advice is correct; marketing owns campaigns.")],
        [tt("How a conflict is decided"), tt("Correctness first, then the effect on the customer in that situation, then the brand; the product owner settles a tie.")],
      ]}
      caption={tt("Words and feedback are the safest place to start under uncertainty: they are cheap to change, quick to check and easy to reverse.")}
    />
  );
}
