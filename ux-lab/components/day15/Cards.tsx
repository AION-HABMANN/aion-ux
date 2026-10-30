"use client";

import type { ReactNode } from "react";
import { ArchitectureFig, BetsFig, ConsentFig, DecisionFig, LadderFig, LayersChainFig, MaturityFig, QuestionChainFig, ReadingsFig, RecordingFig, TracksFig, WeighFig } from "@/components/day15/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D15 } from "@/components/day15/comicScenes";
import { COMICS_D15 } from "@/data/day15/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 15 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the
 * rules it gives the task (folded) → sources → Mark as read. Example company and people: Tessel, Mara, Joon, Ines and Bastian; never FocusSense, LearningPulse or
 * VisionMind Lab, so no task is answered here. Every statement comes from the plan's Wissen cell; the sources back it. The deeper readings keep the original
 * Day 15's points (which visualisation you are shown is a decision, a pilot without an exit criterion, reputation risk with a slow fuse) in another company's words.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)")}>
    <Callout label={tt("Extra · go deeper")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const TS = () => tt("Tessel, Mara, Joon, Ines and Bastian are made up for this example; the gaze recordings are drawn for the lesson, not measured.");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("An eye-tracker records where people look: fixations (pauses) and saccades (jumps). One recording can be shown as a scanpath (the order), a heatmap (time added up) or areas of interest (marked parts, with when and how long). Each view shows something and hides something. In UX it helps with navigation, information architecture, interface evaluation and prototype tests.")}
      sources={["holmqvist2011", "duchowski2017", "rayner1998", "nielsen2009eye", "behaviorresearch2025"]}
      reasoning={[
        tt("Ask which view you are looking at, and what it leaves out."),
        tt("Read a scanpath for order: what came first, where people searched, what they never reached."),
        tt("Read a heatmap for time, not for order or for single people."),
        tt("Mark areas of interest before the analysis, not after you have seen the colours."),
        tt("Note the conditions: how many people, which task, which device, what light."),
      ]}
    >
      <ComicButton comic={COMICS_D15.A1} art={ART_D15} />
      <RecordingFig />
      <DataTable
        caption={tt("What eye-tracking can make visible")}
        head={[tt("What it shows"), tt("Example (Tessel)"), tt("Useful for")]}
        rows={[
          [tt("Fixations"), tt("1.5 s on the fee line."), tt("Where effort or interest sits.")],
          [tt("Scanpaths"), tt("Form, advert, form, fee line."), tt("Search behaviour and getting lost.")],
          [tt("Distribution of attention"), tt("Most time on the form; none on Help."), tt("Interface evaluation.")],
          [tt("Search behaviour"), tt("Jumps between fields and the advert."), tt("Navigation and information architecture.")],
          [tt("Visual priority"), tt("The advert is seen before the fee."), tt("Prototype tests of hierarchy.")],
        ]}
      />
      <DataTable
        caption={tt("What eye-tracking measures: basis and sample sizes")}
        head={[tt("Topic"), tt("Real finding"), tt("What it means for a study")]}
        rows={[
          [tt("Fixations"), tt("The eyes rest for about 200 to 300 ms in a fixation and take in information only while they rest (Rayner 1998; Holmqvist et al. 2011)."), tt("Dwell time on a line is evidence of effort or interest, not yet of the reason.")],
          [tt("The eye–mind assumption"), tt("Just and Carpenter proposed that the eye stays on a word as long as it is being processed, which is why gaze can serve as a trace of processing (Just and Carpenter 1980)."), tt("The assumption holds best for reading; for free viewing and for interfaces it is weaker.")],
          [tt("How many participants"), tt("Nielsen's 2009 eye-tracking report advised about 39 participants for stable heatmaps, against about five for a qualitative test; a 2025 paper finds no single sample size and gives examples from about 10 to 44 depending on the measure and the precision (Nielsen 2009; Behavior Research Methods 2025; as reported)."), tt("Decide the sample size from the question: a heatmap needs far more people than a qualitative look.")],
          [tt("Methods"), tt("Handbooks cover recording, calibration, areas of interest and the main measures (Holmqvist et al. 2011; Duchowski 2017)."), tt("Define the areas of interest before the study, not after.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${TS()} The measures follow Holmqvist et al. (2011); how trackers work follows Duchowski (2017). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("Which visualisation a meeting is shown is a decision someone made. A heatmap of all participants looks like a fact and hides that three people searched desperately while seven found the button at once. Ask for the scanpaths of the people who failed.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Capturing gaze, steering attention and actual understanding are different things. Looking is not understanding, attention is not agreement, and the eye can rest on something without it being noticed. The measurement is a fact; its meaning is an interpretation that needs another source. Every step from seen to agreed needs more evidence.")}
      sources={["just1980", "holmqvist2011"]}
      reasoning={[
        tt("Say what the data shows in the plainest words: “the eye rested here for 1.5 seconds”."),
        tt("List at least three readings of the same pattern before choosing one."),
        tt("Ask the person: show them their recording and let them explain (retrospective think-aloud)."),
        tt("Never write “users want” or “users love” on the basis of gaze alone."),
        tt("Say which step of the ladder a claim stands on: seen, attended, understood or agreed."),
      ]}
    >
      <ComicButton comic={COMICS_D15.A2} art={ART_D15} />
      <ReadingsFig />
      <LadderFig />
      <DataTable
        caption={tt("Looking is not understanding: the limits")}
        head={[tt("Limit"), tt("What it means"), tt("What to do in a study")]}
        rows={[
          [tt("Looking without seeing"), tt("Attention can be directed to a place without moving the eyes, and a fixation can fall on something that is not processed (Holmqvist et al. 2011)."), tt("Never read a fixation as proof that the content was understood.")],
          [tt("Attention without agreement"), tt("A long fixation can mean interest, confusion or disapproval; the gaze data does not say which (Holmqvist et al. 2011)."), tt("Add a question or a think-aloud to every gaze finding.")],
          [tt("Interpretation"), tt("The eye–mind assumption gives a plausible reading, not a measured one (Just and Carpenter 1980)."), tt("Write each finding as a step on a ladder: recorded, interpreted, tested.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${TS()} The working assumption that what is fixated is being processed, and that longer fixations can mean more effort, follows Just and Carpenter (1980). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("“Measurable” is often confused with “reliable”. A number feels objective because it is precise; but a precise measure of where the eye rested is not a precise measure of what the person thought. The more scientific a chart looks, the more carefully ask which step of the ladder it really stands on.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Neurofeedback shows people a signal of their own brain activity so they can learn to change it; brain-computer interfaces turn brain signals into commands. Fields: training, adaptive systems, attention support, assistive use, experimental interaction. Maturity differs enormously. Chances: deeper insight into load and reactions, new interaction. Risks: over-interpretation, poor everyday fitness, technical hurdles, data protection and ethics.")}
      sources={["sitaram2017", "wolpaw2002", "cortese2016"]}
      reasoning={[
        tt("Say exactly which technology is meant: lab eye-tracking, webcam gaze, consumer EEG, clinical neurofeedback, medical BCI."),
        tt("Ask for the evidence that it measures what it claims, in a setting like yours."),
        tt("Separate “on sale” from “proven”."),
        tt("Check everyday fitness: movement, noise, light, glasses, hair, fatigue."),
        tt("Name the field: training, adaptation, attention support, assistance or experiment."),
      ]}
    >
      <ComicButton comic={COMICS_D15.A3} art={ART_D15} />
      <MaturityFig />
      <DataTable
        caption={tt("Chances and risks of neuro-based UX")}
        head={[tt("Chance"), tt("Example (Tessel)"), tt("Risk"), tt("What it looks like")]}
        rows={[
          [tt("Insight into load"), tt("Where the transfer flow strains people."), tt("Over-interpretation"), tt("A focus score read as truth.")],
          [tt("Insight into attention"), tt("The fee is seen too late."), tt("Poor everyday fitness"), tt("Works in the lab, not on a bus.")],
          [tt("Insight into reactions"), tt("Hesitation before Continue."), tt("Technical hurdles"), tt("Calibration, glasses, bad light.")],
          [tt("New interaction"), tt("Gaze to scroll for people who cannot use their hands."), tt("Data protection and ethics"), tt("Brain data on a vendor's cloud.")],
        ]}
      />
      <DataTable
        caption={tt("Neurofeedback and brain-computer interfaces: real maturity")}
        head={[tt("Topic"), tt("Real finding"), tt("What it means for a product")]}
        rows={[
          [tt("Brain-computer interfaces"), tt("Wolpaw and colleagues defined a brain-computer interface as a system that gives the brain a channel for communication and control that does not use the muscles (Wolpaw et al. 2002)."), tt("A real fit exists for people who cannot use their hands; for everyone else the gain over a mouse or a voice is small.")],
          [tt("Neurofeedback"), tt("A meta-analysis of 13 trials with 520 children and adolescents with ADHD found significant effects only on ratings from assessors close to the treatment, and no significant effects on probably blinded ratings or in trials with sham controls; other authors dispute the conclusion (Cortese et al. 2016)."), tt("A scientific look is not evidence: ask which outcome was measured and how blind the assessor was.")],
          [tt("State of the field"), tt("Reviews describe neurofeedback and real-time brain imaging as promising but with many open questions about effects and methods (Sitaram et al. 2017)."), tt("Treat any commercial claim as a hypothesis until it is replicated.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${TS()} Neurofeedback follows Sitaram et al. (2017); brain-computer interfaces for communication and control follow Wolpaw et al. (2002). The placements are a reading of the example, not a ranking of products. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("Assistive use is where brain-computer interfaces matter most today: for someone who cannot move, a slow, tiring interface that works is life-changing. For everyone else, the same interface is slower than a thumb. Ask whose problem a neurotechnology solves before asking whether it is impressive.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Robust UX research, experimental technology and a marketable application are three tracks with different rules. Mixing them is how weak data ends up deciding a product. Fund the question, not the technology: a question, a hypothesis, a fitting method, what it can show, and the decision it informs. Judge every finding on insight value, interpretation risk and decision relevance.")}
      sources={["tobii2019", "holmqvist2011", "nielsen2009eye", "cortese2016", "eu2024aiact"]}
      reasoning={[
        tt("Sort every idea into research, experiment, product, or not at all."),
        tt("Write the question and the hypothesis before choosing a method."),
        tt("Choose the simplest method that can answer it; sometimes that is not eye-tracking."),
        tt("Name the decision the answer will inform."),
        tt("Let only robust findings cross from research into the product."),
      ]}
    >
      <ComicButton comic={COMICS_D15.A4} art={ART_D15} />
      <TracksFig />
      <QuestionChainFig />
      <DataTable
        caption={tt("Insight, interpretation risk and relevance: three tracks")}
        head={[tt("Track"), tt("Real example"), tt("What it means for a decision")]}
        rows={[
          [tt("Robust research"), tt("Eye-tracking in usability tests with a defined question, calibrated devices and enough participants (Holmqvist et al. 2011; Nielsen 2009, as reported)."), tt("Use it now, for evaluation, with the limits stated.")],
          [tt("Experimental technology"), tt("Neurofeedback for attention is contested in controlled trials (Cortese et al. 2016)."), tt("Run it as a small, controlled experiment with a university, not as a product feature.")],
          [tt("Marketable application"), tt("The EU AI Act prohibits emotion recognition in the workplace and in education, with an exception for medical or safety reasons (Article 5(1)(f), applicable since 2 February 2025)."), tt("Check the law before the market: some applications are not allowed at all.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${TS()} Narrow questions, one feature at a time and measurable outcomes follow Tobii's own advice to UX researchers (2019). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("A pilot without an exit criterion is not a pilot; it is a subscription. Write down before a study what result would make you stop, change course or go on. Otherwise every result will be read as a reason to continue.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Gaze and brain data can reveal tiredness, stress, reading difficulties or health, often without the person knowing; regulators treat neurodata as high risk. Consent is design: what is recorded, what will not be inferred, who sees it, when it is deleted, and a no as easy as a yes. Weigh measures on effect on users, feasibility, risk, time pressure and reputation security.")}
      sources={["ico2023", "ienca2017", "gibbons2018", "chile2021", "eu2024aiact"]}
      reasoning={[
        tt("What is recorded, and what could be inferred from it, even by accident?"),
        tt("Is taking part truly voluntary? At work, rarely."),
        tt("Say what you will not infer, and keep to it."),
        tt("Who sees the data, where is it stored, when is it deleted?"),
        tt("Rate every measure on the same five criteria, with a reason; a rating is a judgement, never a mark."),
      ]}
    >
      <ComicButton comic={COMICS_D15.A5} art={ART_D15} />
      <ConsentFig />
      <WeighFig />
      <DataTable
        caption={tt("Ethics, data protection and voluntariness: real rules")}
        head={[tt("Source"), tt("Real rule or finding"), tt("What it means for a measure")]}
        rows={[
          [tt("The UK regulator"), tt("The Information Commissioner's Office reviewed neurotechnology and the data protection questions it raises, including special sensitivity of neural data and the risk of bias and inference (Information Commissioner's Office 2023)."), tt("Do a data protection impact assessment before a neuro study.")],
          [tt("New rights"), tt("Ienca and Andorno proposed new human rights for the age of neurotechnology, among them cognitive liberty and mental privacy (Ienca and Andorno 2017)."), tt("Voluntary, informed and revocable participation is the minimum.")],
          [tt("Law"), tt("Chile amended its constitution in 2021 to protect brain activity and the information derived from it (Law 21.383), and Colorado extended its privacy law in 2024 to neural data, with express consent (as reported)."), tt("Neural data is already regulated in places: ask where your users live.")],
          [tt("Emotion recognition"), tt("The EU AI Act prohibits emotion recognition systems in workplaces and educational institutions, with medical and safety exceptions (Article 5(1)(f))."), tt("Do not use gaze or physiology to infer feelings of employees or students.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${TS()} Neurodata as high risk and the limits of consent follow the UK ICO (2023); mental privacy follows Ienca and Andorno (2017); rating options on the same criteria follows Gibbons (2018). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="A5">
        <p>{tt("Reputation risk is a cost with a slow fuse. A study that looks harmless inside can read very differently as a headline: “bank measured customers' eyes”. Ask before every study how it would sound if a customer described it to a journalist.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("At senior level, neuro-based UX is a decision architecture for insight, personalisation and new interaction: a guiding vision of what the company wants to understand and what it will not do, separate tracks for research, UX analysis and product, hypotheses before studies, and an evidence grade for what may influence strategy.")}
      sources={["ico2023", "tobii2019", "holmqvist2011", "just1980"]}
      reasoning={[
        tt("Check how neuro-based methods are decided today: by fascination, or by a question?"),
        tt("Write a guiding vision: what insight, for whom, and what is never done with the data."),
        tt("Separate research, UX analysis and product, with rules for crossing."),
        tt("Hold a portfolio of written questions, each with the decision it informs."),
        tt("Tell operational decisions (one study) from strategic ones (portfolio, product, trust)."),
      ]}
    >
      <ComicButton comic={COMICS_D15.B1} art={ART_D15} />
      <ArchitectureFig />
      <LayersChainFig />
      <DataTable
        caption={tt("Neuro-based UX as an insight architecture: structures")}
        head={[tt("Part"), tt("Real example"), tt("What it means")]}
        rows={[
          [tt("A ladder of evidence"), tt("Eye-tracking is robust for questions about where people look; claims about feelings or understanding need further evidence (Holmqvist et al. 2011; Just and Carpenter 1980)."), tt("Grade each finding: recorded, interpreted, tested.")],
          [tt("Regulator guidance"), tt("The ICO sets out how data protection applies to neurotechnology (Information Commissioner's Office 2023)."), tt("Build the review into the research process.")],
          [tt("Vendor claims"), tt("A device maker's documentation shows what a tool measures; the interpretation is yours (Tobii 2019)."), tt("Ask the vendor for the validation behind each metric.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${TS()} The regulator's concerns about neurodata follow the UK ICO (2023); framing each study narrowly follows Tobii (2019). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("Your job is the standard, not the study. A leader does not need to read EEG curves; they need to decide which questions are worth asking, which methods may answer them, and what counts as an answer. That standard outlives every single study.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Neuro-based UX sits between insight and validity, a scientific image and what the data can carry, personalisation and privacy, research depth and market maturity, speed and interpretation effort. A portfolio of a few bets of different size, each with a hypothesis, a measure of success and an exit date, makes the conflicts manageable; write down what each bet assumes.")}
      sources={["ico2023", "sitaram2017", "cortese2016", "nielsen2009eye", "chile2021", "eu2024aiact", "behaviorresearch2025"]}
      reasoning={[
        tt("Name each conflict as two goals and say who stands for each: board, research, product, data protection, customers."),
        tt("Hold a few bets of different size: safe, medium, bold."),
        tt("Write down the assumptions each bet rests on: data quality, acceptance, maturity, strategic value."),
        tt("Set the measure of success and the exit date before the study starts."),
        tt("Say what the choice gives up."),
      ]}
    >
      <ComicButton comic={COMICS_D15.B2} art={ART_D15} />
      <BetsFig />
      <DataTable
        caption={tt("Standing conflicts of neuro-based UX")}
        head={[tt("Conflict"), tt("Who usually stands for each side"), tt("What to ask")]}
        rows={[
          [tt("Insight against validity"), tt("Innovation, against research."), tt("Does the measure mean what it claims, here?")],
          [tt("A scientific image against what the data carries"), tt("Marketing, against research."), tt("Which step of the ladder does the claim stand on?")],
          [tt("Personalisation against privacy"), tt("Product, against data protection and customers."), tt("What would we infer, and would people agree?")],
          [tt("Speed against interpretation effort"), tt("Departments, against research."), tt("What is the smallest study that answers the question?")],
        ]}
      />
      <DataTable
        caption={tt("Conflicts of neuro-based UX, with evidence")}
        head={[tt("Conflict"), tt("What the evidence says"), tt("A way to decide")]}
        rows={[
          [tt("Insight against validity"), tt("Neurofeedback effects vanished with blinded ratings in a meta-analysis (Cortese et al. 2016)."), tt("Ask whether the measure means what it claims, here.")],
          [tt("A scientific image against what the data carries"), tt("A 39-person rule for heatmaps shows how much data a clean picture needs (Nielsen 2009, as reported)."), tt("Put the claim on the right step of the evidence ladder.")],
          [tt("Personalisation against privacy"), tt("Neural data is regulated in some places (Chile 2021; Colorado 2024) and emotion recognition is banned at work and in schools in the EU (AI Act, Article 5(1)(f))."), tt("Ask what you would infer and whether people would agree.")],
          [tt("Speed against interpretation effort"), tt("Sample size depends on the question, from about five to 44 or more (Nielsen 2009; Behavior Research Methods 2025; as reported)."), tt("Run the smallest study that answers the question.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${TS()} The bets are a reading of the example, not a rule for every company. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("A data-driven project becomes a trust problem when people learn about it from someone else. The same study, explained openly in advance, is research; discovered later, it is surveillance. Openness is cheap now and cannot be bought later.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("Neurodata needs an owner of research and the evidence grade, an ethics and data review that approves every study and may stop any, a translation step that decides what may reach a product, and a rule for when insight, speed and trust disagree. With thin evidence, a decision says what it decides, does not know, would reverse and gives up.")}
      sources={["ico2023", "simon1956", "klein2007", "ienca2017", "cortese2016"]}
      reasoning={[
        tt("Name who sets the standard and owns the evidence grade."),
        tt("Name who approves a study and may stop it, including data protection and employee representatives."),
        tt("Name who runs studies, and who translates findings into product decisions."),
        tt("Settle conflicts by people's rights first, then robust evidence, then speed; say who settles a tie."),
        tt("Say what you decide, what you do not know, when you would reverse it and what you give up."),
      ]}
    >
      <ComicButton comic={COMICS_D15.B3} art={ART_D15} />
      <DecisionFig />
      <DataTable
        caption={tt("Four roles of governance for neurodata")}
        head={[tt("Role"), tt("The question"), tt("An example (Tessel)")]}
        rows={[
          [tt("Sets the standard"), tt("Who owns the research and the evidence grade?"), tt("The head of UX research.")],
          [tt("Approves"), tt("Who says yes to a study, and may stop it?"), tt("An ethics and data review with the data protection officer.")],
          [tt("Runs the studies"), tt("Who designs and analyses them?"), tt("The research team, with a university for EEG.")],
          [tt("Translates"), tt("Who decides what reaches the product?"), tt("The CXO, only for graded findings.")],
        ]}
      />
      <DataTable
        caption={tt("Governance for neurodata: real references")}
        head={[tt("Role"), tt("Real reference"), tt("What it means")]}
        rows={[
          [tt("Sets the standard"), tt("The regulator's report is a basis for the evidence and data protection standard (Information Commissioner's Office 2023)."), tt("Name an owner for the evidence grade.")],
          [tt("Approves"), tt("Participation must be voluntary and informed, with the right to withdraw (Ienca and Andorno 2017)."), tt("Put an ethics and data review before every study, with the data protection officer.")],
          [tt("Translates"), tt("Findings that failed blinded tests (Cortese et al. 2016) show why only graded findings should reach a product."), tt("Let only graded findings go to the product decision.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${TS()} The limits of consent at work follow the UK ICO (2023); deciding with limited information follows Simon (1956); imagining the failure in advance (premortem) follows Klein (2007). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Name the roles before you need them. When a study goes wrong, the first question is “who approved this?”; if nobody can answer, the problem is no longer the data, it is the company.")}</p>
      </Extra>
    </MaterialCard>
  );
}
