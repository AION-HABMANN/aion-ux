"use client";

import clsx from "clsx";
import { useState } from "react";
import { GazeStage } from "@/components/day15/gaze";
import { MeasureThumb, TESSEL_AOIS, TESSEL_FIXES, TesselPage } from "@/components/day15/mocks";
import { StateFig } from "@/components/dayFree/figs";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { tt } from "@/lib/lang";
import { ConsentLab } from "@/components/day15/labs";

/**
 * Day 15 · the teaching diagrams of Materi A and B. Example: Tessel, a made-up bank, with Mara and Joon (customers), Ines (UX researcher) and Bastian (product
 * owner); never FocusSense, LearningPulse or VisionMind Lab, so no task is answered here. Ideas from the original Day 15 kept here: one recording seen three ways
 * (A1), one pattern with three readings and the interpretation ladder (A2), technologies placed at their real maturity (A3), fund the question (A4), consent as a
 * design variable (A5), operative or strategic and the four roles (B1, B3).
 */

/* ------------------------------------------------------------------ A1 · one recording, three views (interactive, a real replay) */

export function RecordingFig() {
  return (
    <Diagram label={tt("Mara's gaze on Tessel's transfer page, as a scanpath, a heatmap and areas of interest · Exploratory · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("An eye-tracker records fixations (pauses) and saccades (jumps). The same recording can be shown as a scanpath, a heatmap or areas of interest. Each shows something and hides something: the heatmap loses the order, the scanpath gets crowded, areas of interest only count what someone marked in advance.")}</ThePoint>
        <GazeStage page={<TesselPage />} fixes={TESSEL_FIXES} aois={TESSEL_AOIS()} label={tt("Tessel's Send money page with Mara's recorded gaze drawn over it")} />
        <Insight>{tt("In plain words: Mara looked at the form, glanced at the Gold card advert twice, rested very long on the fee line and never looked at “Help with transfers”. What she thought at the fee line is not in the recording (card A2).")}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A2 · one pattern, three readings (interactive) and the ladder */

export function ReadingsFig() {
  const page = (
    <GazeStage page={<TesselPage dim />} fixes={TESSEL_FIXES} aois={TESSEL_AOIS()} label={tt("The same recording, with the long fixation on the fee line marked red")} mark={7} />
  );
  return (
    <StateFig
      label={tt("One long fixation on Tessel's fee line, three readings · Exploratory · Case assumption")}
      point={tt("The recording is the same in all three readings: fixation 8, about one and a half seconds on the fee line. Only what Mara said afterwards differs. Looking is not understanding, attention is not agreement, and a measurement needs an interpretation from another source.")}
      states={[
        { id: "interest", button: tt("Reading 1: interest"), picture: page, insight: tt("Mara afterwards: “I wanted to know whether instant was free on my plan. Good to see it there.” Here the long look was interest, and the line did its job.") },
        { id: "confusion", button: tt("Reading 2: confusion"), picture: page, insight: tt("Mara afterwards: “Section 4.2 of what? I read it three times and still didn't know if I'd pay.” The same long look was confusion; the line needs rewriting.") },
        { id: "slow", button: tt("Reading 3: slow reading"), picture: page, insight: tt("Mara afterwards: “I'm dyslexic; small grey text takes me longer. I understood it in the end.” The same long look was effort; the line needs bigger, clearer type, not new content.") },
      ]}
    />
  );
}

export function LadderFig() {
  return (
    <ChainFig
      label={tt("The interpretation ladder: from seen to agreed, and what each step needs")}
      steps={[
        { h: tt("Seen"), b: tt("The eye rested on it. The eye-tracker shows this, if calibration and light were good."), kind: "m" },
        { h: tt("Attended"), b: tt("The person noticed it. Needs more: did they mention it, react to it?"), kind: "a" },
        { h: tt("Understood"), b: tt("They know what it means. Needs asking or a task: can they explain it, act on it?"), kind: "a" },
        { h: tt("Agreed or wanted"), b: tt("They like it, want it, trust it. Needs their own words and behaviour over time."), kind: "s" },
      ]}
      caption={tt("Every step up is easy to claim and needs more evidence. A heatmap stands on the first step; a sentence like “customers love the banner” stands on the last.")}
    />
  );
}

/* ------------------------------------------------------------------ A3 · technologies at their real maturity (interactive) */

type Tech = { id: string; name: string; evidence: 1 | 2 | 3; use: 1 | 2 | 3; why: string };
export function MaturityFig() {
  const techs: Tech[] = [
    { id: "lab", name: tt("Lab eye-tracking in UX tests"), evidence: 3, use: 1, why: tt("An established research method with decades of studies. It belongs in the lab with volunteers and a question, not in the app.") },
    { id: "webcam", name: tt("Webcam eye-tracking for remote tests"), evidence: 2, use: 2, why: tt("Works with ordinary cameras, but less precise; good for rough areas, not single words. Check accuracy before relying on it.") },
    { id: "gaze", name: tt("Gaze control in headsets"), evidence: 3, use: 3, why: tt("Sold in mixed-reality headsets: you look at a button and pinch. Mature as an input method, not as a way to read minds.") },
    { id: "headband", name: tt("Consumer EEG “focus” headband"), evidence: 1, use: 3, why: tt("On sale, but its focus score is not validated for work or learning; movement and muscles disturb the signal. On the market is not the same as proven.") },
    { id: "nf", name: tt("Neurofeedback in clinics"), evidence: 2, use: 2, why: tt("Used in therapy and research; promising for some conditions, mixed for others. Far from a product feature.") },
    { id: "bci-med", name: tt("BCI for communication (paralysis)"), evidence: 2, use: 1, why: tt("Lets some people who cannot move type or speak; implanted or lab systems in trials. Life-changing, and not a consumer product.") },
    { id: "bci-app", name: tt("Control an app by thought"), evidence: 1, use: 1, why: tt("A research topic. Demos exist; reliable everyday control for everyone does not. A good watch topic, not a roadmap item.") },
  ];
  const [sel, setSel] = useState<string>("headband");
  const cur = techs.find((x) => x.id === sel)!;
  const cell = (e: number, u: number) => techs.filter((x) => x.evidence === e && x.use === u);
  return (
    <Diagram label={tt("Seven technologies for Tessel placed by evidence and everyday use · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("Neurofeedback, brain-computer interfaces and eye-tracking sit at very different heights. Place each by the evidence that it does what it claims and by how far it is in everyday use. The dangerous corner is bottom right: on sale, but not proven.")}</ThePoint>
        <div tabIndex={0} role="region" aria-label={tt("The maturity grid; scroll sideways on a small screen")} className="overflow-x-auto">
          <div className="mx-auto grid min-w-[30rem] max-w-[560px] grid-cols-[auto_1fr_1fr_1fr] gap-1 text-caption">
            <div />
            {[tt("Lab or trials"), tt("Some settings"), tt("Everyday use")].map((h) => <div key={h} className="text-center font-semibold text-ash">{h}</div>)}
            {[3, 2, 1].map((e) => (
              <div key={e} className="contents">
                <div className="flex items-center pr-1 font-semibold text-ash">{[tt("Evidence weak"), tt("mixed"), tt("Evidence strong")][e - 1]}</div>
                {[1, 2, 3].map((u) => (
                  <div key={u} className={clsx("min-h-[56px] rounded border p-1", e === 1 && u === 3 ? "border-[#E8A1A1] bg-[#FDF2F2]" : "border-line bg-paper")}>
                    {cell(e, u).map((x) => (
                      <button key={x.id} type="button" aria-pressed={sel === x.id} onClick={() => setSel(x.id)} className={clsx("mb-1 block w-full rounded border px-1 py-0.5 text-left text-[12px]", sel === x.id ? "border-accent bg-accentSoft font-semibold" : "border-line bg-white")}>{x.name}</button>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Insight>{tt(`${cur.name}: ${cur.why}`)}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A4 · research, experiment or product (interactive) and the chain */

type Idea = { id: string; name: string; track: "research" | "experiment" | "product" | "no"; why: string };
export function TracksFig() {
  const ideas: Idea[] = [
    { id: "test", name: tt("Eye-tracking test of the transfer page"), track: "research", why: tt("A written question (“do people see the fee before they continue?”), a mature method, volunteers. Its answer informs one design decision.") },
    { id: "remote", name: tt("Check whether webcam eye-tracking is precise enough"), track: "experiment", why: tt("Not yet a method Tessel trusts. An experiment to learn whether it could become one; its result is “usable for X, not for Y”.") },
    { id: "uni", name: tt("EEG stress study with a university"), track: "experiment", why: tt("Exploring what brain signals can say about stress in banking tasks. Marked as research; nothing goes into the app from it.") },
    { id: "adaptive", name: tt("An app that hides offers when it senses stress"), track: "product", why: tt("A product idea that needs a validated stress measure in daily use. That measure does not exist yet, so the idea waits for the experiment.") },
    { id: "ads", name: tt("Webcam gaze tracking to place adverts"), track: "no", why: tt("Measures customers for Tessel's benefit, not theirs. A question of whether, not when: Bastian drops it.") },
  ];
  const [sel, setSel] = useState<string>("test");
  const cur = ideas.find((x) => x.id === sel)!;
  const cols: [Idea["track"], string, string][] = [
    ["research", tt("UX research"), tt("a question, a fitting method, consent")],
    ["experiment", tt("Experiment"), tt("learn what a technology can do")],
    ["product", tt("Product"), tt("works for everyone, every day")],
    ["no", tt("Not at all"), tt("serves us, not them")],
  ];
  return (
    <Diagram label={tt("Tessel's five ideas sorted into research, experiment, product, or not at all · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("Robust UX research, experimental technology and a marketable product are three tracks with different rules. When they are mixed, an experiment's weak signal ends up deciding a product. Sort every idea into its track before anyone measures anything.")}</ThePoint>
        <div className="grid gap-2 sm:grid-cols-4">
          {cols.map(([k, h, sub]) => (
            <div key={k} className={clsx("rounded-lg border p-2", k === "no" ? "border-[#E8A1A1] bg-[#FDF2F2]" : "border-line bg-paper")}>
              <p className="text-caption font-semibold text-ink">{h}</p>
              <p className="mb-1 text-micro text-ash">{sub}</p>
              {ideas.filter((x) => x.track === k).map((x) => (
                <button key={x.id} type="button" aria-pressed={sel === x.id} onClick={() => setSel(x.id)} className={clsx("mb-1 block w-full rounded border px-1.5 py-1 text-left text-[12px]", sel === x.id ? "border-accent bg-accentSoft font-semibold" : "border-line bg-white")}>{x.name}</button>
              ))}
            </div>
          ))}
        </div>
        <Insight>{tt(`${cur.name}: ${cur.why}`)}</Insight>
      </div>
    </Diagram>
  );
}

export function QuestionChainFig() {
  return (
    <ChainFig
      label={tt("Fund the question, not the technology: from a question to a decision")}
      steps={[
        { h: tt("The question"), b: tt("“Why do people abandon transfers on the last step?”"), kind: "m" },
        { h: tt("A hypothesis"), b: tt("“They do not see the fee until it is too late, and stop.”"), kind: "a" },
        { h: tt("A fitting method"), b: tt("Eye-tracking of ten volunteers, plus asking them afterwards."), kind: "a" },
        { h: tt("What it can show"), b: tt("Whether the fee line is seen before “Continue”, and what people made of it."), kind: "a" },
        { h: tt("The decision it informs"), b: tt("Move and rewrite the fee line, or look elsewhere."), kind: "s" },
      ]}
      caption={tt("Without the first two boxes, a study produces pictures, not answers. Judge every finding on its insight value, its interpretation risk and its decision relevance.")}
    />
  );
}

/* ------------------------------------------------------------------ A5 · consent as a design variable (interactive) and three measures weighed */

export function ConsentFig() {
  return <ConsentLab />;
}

export function WeighFig() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    {
      id: "lab",
      name: tt("Lab eye-tracking test of the transfer page with ten volunteers"),
      cells: {
        effect: { level: 3, reason: tt("Finds why transfers are abandoned; customers get a clearer page.") },
        feasibility: { level: 3, reason: tt("A lab, a few days, an existing method.") },
        risk: { level: 1, reason: tt("Low: volunteers, consent, deleted after the study.") },
        time: { level: 3, reason: tt("Results within weeks.") },
        reputation: { level: 3, reason: tt("Nothing to hide; could even be shown openly.") },
      },
    },
    {
      id: "webcam",
      name: tt("Webcam gaze tracking for all app users to measure advert attention"),
      cells: {
        effect: { level: 1, reason: tt("Helps marketing, not customers.") },
        feasibility: { level: 2, reason: tt("Technically possible; imprecise on phones.") },
        risk: { level: 3, reason: tt("High: measuring everyone, for offers.") },
        time: { level: 2, reason: tt("Months, with legal review.") },
        reputation: { level: 1, reason: tt("“Your bank watches your eyes”: a headline nobody wants.") },
      },
    },
    {
      id: "eeg",
      name: tt("EEG stress study with a university partner"),
      cells: {
        effect: { level: 2, reason: tt("No direct effect now; learning for later.") },
        feasibility: { level: 2, reason: tt("Needs a partner and an ethics approval.") },
        risk: { level: 2, reason: tt("Medium: sensitive data, but research rules and volunteers.") },
        time: { level: 1, reason: tt("Many months before anything is known.") },
        reputation: { level: 2, reason: tt("Fine if kept as research; harmful if sold as a feature.") },
      },
    },
  ];
  return (
    <Diagram label={tt("Tessel weighs three measures on effect on users, feasibility, risk, time pressure and reputation security · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("A focused lab test answers a real question at little risk; measuring everyone for adverts buys risk; a research partnership buys learning, slowly. Weigh each measure on the same criteria, with the reason next to each rating.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {(["lab", "webcam", "eeg"] as const).map((k, i) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{rows[i].name}</p>
            </div>
          ))}
        </div>
        <OptionGrid
          label={tt("Tessel · three neuro-based measures")}
          caption={tt("Three measures for Tessel (Case assumption, example company)")}
          rows={rows}
          cols={[
            { id: "effect", label: tt("Effect on users") },
            { id: "feasibility", label: tt("Feasibility") },
            { id: "risk", label: tt("Risk") },
            { id: "time", label: tt("Time pressure: fits the time") },
            { id: "reputation", label: tt("Reputation security") },
          ]}
          selected={sel}
          onSelect={setSel}
        />
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B1 · measurement fascination or an insight architecture (static) */

export function ArchitectureFig() {
  return (
    <CompareFig
      label={tt("Tessel chasing measurements to look scientific, or running an insight architecture")}
      left={tt("Measurement fascination")}
      right={tt("An insight architecture")}
      rows={[
        [tt("A headband demo at lunch; “we can see what customers think”."), tt("A guiding vision: understand where products overload people; never judge individuals by their data.")],
        [tt("Heatmaps go straight to marketing; scores go straight into the app."), tt("Three tracks: research, UX analysis, product; nothing crosses without an evidence grade.")],
        [tt("Studies start with a device, not a question."), tt("Every study starts with a written hypothesis and the decision it informs.")],
        [tt("Consent is a checkbox at the end."), tt("An ethics and data review approves before anyone is measured.")],
      ]}
      caption={tt("Operational decisions concern one study. Strategic ones concern the research portfolio, product development and the protection of trust.")}
    />
  );
}

export function LayersChainFig() {
  return (
    <ChainFig
      label={tt("The layers of an insight architecture, from a guiding vision to every study")}
      steps={[
        { h: tt("A guiding vision"), b: tt("“We measure to make banking simpler, never to steer or judge a customer.”"), kind: "m" },
        { h: tt("Tracks and rules"), b: tt("Research, UX analysis, product; consent, purpose, deletion; an evidence grade."), kind: "a" },
        { h: tt("Questions and hypotheses"), b: tt("A portfolio of written questions, each with the decision it informs."), kind: "a" },
        { h: tt("Every study"), b: tt("The transfer-page test, the webcam check, the university study."), kind: "s" },
      ]}
      caption={tt("Leaders decide on the left: the vision, the tracks and the rules. Researchers run studies on the right and bring back graded findings.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · three bets (interactive) */

export function BetsFig() {
  const box = (title: string, body: string, who: string) => (
    <div role="img" aria-label={`${title}. ${body}. ${who}`} className="mx-auto max-w-[360px] space-y-2 rounded-lg border border-line bg-white p-3 text-caption text-ink">
      <p className="font-semibold">{title}</p>
      <p>{body}</p>
      <p className="text-ash">{who}</p>
    </div>
  );
  return (
    <StateFig
      label={tt("Tessel's three bets: safe, medium and bold · Exploratory · Case assumption")}
      point={tt("Insight, validity, effort, ethics, data protection and market maturity pull apart. A portfolio holds a few bets of different size, each with a hypothesis, a measure of success and an exit date, and a written list of what each bet assumes.")}
      states={[
        { id: "safe", button: tt("Safe: lab eye-tracking"), picture: box(tt("A safe bet"), tt("Eye-tracking tests of the hardest tasks with volunteers. Mature, cheap, answers real questions. Assumes: lab findings carry over to customers at home."), tt("Research and product like it; the management finds it unspectacular.")), insight: tt("In plain words: little to announce, much to learn. If the assumption fails, little is lost.") },
        { id: "medium", button: tt("Medium: EEG study"), picture: box(tt("A medium bet"), tt("A stress study with EEG and a university, marked as research. Assumes: brain signals say something reliable about stress in banking tasks."), tt("Innovation wants it; the data protection officer asks about consent and storage.")), insight: tt("In plain words: real learning possible, validity uncertain. A time-boxed study with an exit date fits.") },
        { id: "bold", button: tt("Bold: a stress-adaptive app"), picture: box(tt("A bold bet"), tt("An app that senses stress and simplifies itself. Assumes: a valid stress measure in daily use, customers who accept it, and a law that allows it."), tt("The board loves the story; nobody can show the measure works.")), insight: tt("In plain words: maximum story, many untested assumptions. A portfolio keeps it on the watch list, not in the budget.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision with thin evidence, filled in for Tessel (static) */

export function DecisionFig() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for Tessel")}
      boxes={[
        [tt("What we decide"), tt("We run eye-tracking tests of the transfer page this quarter; no gaze tracking in the app, and no stress-adaptive app this year.")],
        [tt("What we do not know"), tt("Whether lab findings hold for customers at home, and whether EEG will ever be valid enough for a product.")],
        [tt("When we would reverse it"), tt("We stop the tests if two in a row change no design decision; we revisit the adaptive app only if research shows the measure is valid.")],
        [tt("What we give up"), tt("A “neuro-banking” headline, and the board's wish to look like a pioneer.")],
      ]}
      rule={[
        [tt("Who owns neuro-based research"), tt("The head of UX research owns studies and the evidence grade; an ethics and data review approves and may stop any study; the CXO decides what reaches the app.")],
        [tt("How a conflict is decided"), tt("Customers' rights first, then the robustness of the evidence, then speed; the management settles what that does not.")],
      ]}
      caption={tt("A study that disproves an idea is a good result. A score in a product that nobody validated is the expensive one.")}
    />
  );
}
