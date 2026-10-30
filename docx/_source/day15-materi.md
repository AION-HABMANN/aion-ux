---
doc: materi
day: 15
kicker: DAY 15 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Eye-tracking and gaze behaviour, neurofeedback and brain-computer interfaces
subtitle: Study material with real research, worked examples and the rules you use in the tasks
daytitle: Day 15 · Module 7 (day 2 of 3): Eye-tracking and gaze behaviour, neurofeedback and brain-computer interfaces
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use a made-up company in each card. The task case is VisionMind Lab (see the Task document).
intro: Today is about measuring people's attention: where their eyes go, and what their brain activity might say. You learn what eye-tracking really records (fixations, scanpaths, heatmaps), why looking is not understanding, what neurofeedback and brain-computer interfaces are and how mature they are, and why neurodata needs more care than any click. Then you use it on three platforms, including a gaze recording you can replay and re-read, and you look at what an eye-tracking maker and a data protection regulator say. This document holds everything you need to study Day 15 without the website. Every card says what the idea is in plain words, shows it in a picture, gives the details and ends with the rules you use in the tasks.
glossary: ux,eye-tracking,neurofeedback,attention,fixation,bci,hypothesis,maturity,heatmap,governance,neurodata,case-assumption,scanpath,aoi,evidence-grade,personalisation,validity,eeg,ia,think-aloud,decision-arch,cxo,adaptive,saccade,hierarchy,neuro-ux,leaderboard,adhd
refs: holmqvist2011,duchowski2017,rayner1998,nielsen2009eye,behaviorresearch2025,just1980,sitaram2017,wolpaw2002,cortese2016,tobii2019,eu2024aiact,ico2023,ienca2017,gibbons2018,chile2021,simon1956,klein2007
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. Levels 1 and 2: analyse the insight value and limits of an eye-tracking and neurofeedback project, rate three approaches for a learning platform under conflicting goals, then analyse a company's neuro-based research plans, develop four measures, justify them and decide on the first 18 weeks. The cards give you the ideas and the rules you use in Task 1.
:::

## A1 · What eye-tracking measures: fixations, scanpaths, heatmaps and areas of interest · 12 min · Core

> An eye-tracker records where people look: fixations (pauses) and saccades (jumps). One recording can be shown as a scanpath (the order), a heatmap (time added up) or areas of interest (marked parts, with when and how long). Each view shows something and hides something. In UX it helps with navigation, information architecture, interface evaluation and prototype tests.

:::box In plain words
**The idea.** An eye-tracker records where a person looks. The eye does not glide; it jumps (saccades) and pauses (fixations), and we take in information during the pauses. One recording can be shown in several ways: as a scanpath (the order of fixations, numbered), as a heatmap (where looks piled up, added over people) or as areas of interest (marked parts of the page, with how soon and how long they were looked at). Each view shows something and hides something; which one a team is shown is a decision someone made. In UX, eye-tracking helps with navigation, information architecture, interface evaluation and prototype tests: what is seen first, what is never seen, where people search.
**Why it matters.** Block 1.1 asks where FocusSense's eye-tracking gives real insight, Block 1.2 rates eye-tracking in prototype tests, and Block 2.1 asks which of VisionMind Lab's methods are product-near. This card tells you what the data actually is.
**How to read the picture.** One recording of Mara on the Tessel transfer page, shown three ways: as a numbered scanpath, as a heatmap, and as areas of interest with when and how long she looked.
:::

![Mara's gaze on Tessel's transfer page, as a scanpath, a heatmap and areas of interest · Exploratory.](_figures/d15_A1_0.png)

**What eye-tracking can make visible**

| What it shows | Example (Tessel) | Useful for |
|---|---|---|
| Fixations | 1.5 s on the fee line. | Where effort or interest sits. |
| Scanpaths | Form, advert, form, fee line. | Search behaviour and getting lost. |
| Distribution of attention | Most time on the form; none on Help. | Interface evaluation. |
| Search behaviour | Jumps between fields and the advert. | Navigation and information architecture. |
| Visual priority | The advert is seen before the fee. | Prototype tests of hierarchy. |

**What eye-tracking measures: basis and sample sizes**

| Topic | Real finding | What it means for a study |
|---|---|---|
| Fixations | The eyes rest for about 200 to 300 ms in a fixation and take in information only while they rest (Rayner 1998; Holmqvist et al. 2011). | Dwell time on a line is evidence of effort or interest, not yet of the reason. |
| The eye–mind assumption | Just and Carpenter proposed that the eye stays on a word as long as it is being processed, which is why gaze can serve as a trace of processing (Just and Carpenter 1980). | The assumption holds best for reading; for free viewing and for interfaces it is weaker. |
| How many participants | Nielsen's 2009 eye-tracking report advised about 39 participants for stable heatmaps, against about five for a qualitative test; a 2025 paper finds no single sample size and gives examples from about 10 to 44 depending on the measure and the precision (Nielsen 2009; Behavior Research Methods 2025; as reported). | Decide the sample size from the question: a heatmap needs far more people than a qualitative look. |
| Methods | Handbooks cover recording, calibration, areas of interest and the main measures (Holmqvist et al. 2011; Duchowski 2017). | Define the areas of interest before the study, not after. |

:::note Case assumption
Tessel, Mara, Joon, Ines and Bastian are made up for this example; the gaze recordings are drawn for the lesson, not measured. The measures follow Holmqvist et al. (2011); how trackers work follows Duchowski (2017). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Ask which view you are looking at, and what it leaves out.
- Read a scanpath for order: what came first, where people searched, what they never reached.
- Read a heatmap for time, not for order or for single people.
- Mark areas of interest before the analysis, not after you have seen the colours.
- Note the conditions: how many people, which task, which device, what light.
:::

:::note Extra · go deeper (optional reading)
Which visualisation a meeting is shown is a decision someone made. A heatmap of all participants looks like a fact and hides that three people searched desperately while seven found the button at once. Ask for the scanpaths of the people who failed.
:::

^src: Holmqvist et al. 2011 · Duchowski 2017 · Rayner 1998 · Nielsen 2009 · Behavior Research Methods 2025

## A2 · Looking is not understanding: the limits of gaze data · 12 min · Core

> Capturing gaze, steering attention and actual understanding are different things. Looking is not understanding, attention is not agreement, and the eye can rest on something without it being noticed. The measurement is a fact; its meaning is an interpretation that needs another source. Every step from seen to agreed needs more evidence.

:::box In plain words
**The idea.** Capturing where someone looks, steering their attention, and what they actually understand are three different things. Looking is not understanding: a long fixation can mean interest, confusion or slow reading. Attention is not agreement: looking at an offer is not wanting it. And the eye can rest on something without the person noticing it. The measurement is a fact; its meaning is an interpretation, and it needs another source, such as asking people what they were thinking. Each step up the ladder (seen, attended, understood, agreed) needs more evidence.
**Why it matters.** Block 1.1 asks where FocusSense over-stretches its data and why “objective truth data” is a problem, and Block 2.1 asks about VisionMind Lab's overestimated data and missing hypotheses. This card gives you the limits by name.
**How to read the picture.** The same gaze pattern on Tessel's fee line, read three ways. The picture stays the same; only what Mara said afterwards changes. Below, the ladder from seen to agreed.
:::

![One long fixation on Tessel's fee line, three readings · Exploratory.](_figures/d15_A2_0.png)

![The interpretation ladder: from seen to agreed, and what each step needs.](_figures/d15_A2_1.png)

**Looking is not understanding: the limits**

| Limit | What it means | What to do in a study |
|---|---|---|
| Looking without seeing | Attention can be directed to a place without moving the eyes, and a fixation can fall on something that is not processed (Holmqvist et al. 2011). | Never read a fixation as proof that the content was understood. |
| Attention without agreement | A long fixation can mean interest, confusion or disapproval; the gaze data does not say which (Holmqvist et al. 2011). | Add a question or a think-aloud to every gaze finding. |
| Interpretation | The eye–mind assumption gives a plausible reading, not a measured one (Just and Carpenter 1980). | Write each finding as a step on a ladder: recorded, interpreted, tested. |

:::note Case assumption
Tessel, Mara, Joon, Ines and Bastian are made up for this example; the gaze recordings are drawn for the lesson, not measured. The working assumption that what is fixated is being processed, and that longer fixations can mean more effort, follows Just and Carpenter (1980). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Say what the data shows in the plainest words: “the eye rested here for 1.5 seconds”.
- List at least three readings of the same pattern before choosing one.
- Ask the person: show them their recording and let them explain (retrospective think-aloud).
- Never write “users want” or “users love” on the basis of gaze alone.
- Say which step of the ladder a claim stands on: seen, attended, understood or agreed.
:::

:::note Extra · go deeper (optional reading)
“Measurable” is often confused with “reliable”. A number feels objective because it is precise; but a precise measure of where the eye rested is not a precise measure of what the person thought. The more scientific a chart looks, the more carefully ask which step of the ladder it really stands on.
:::

^src: Just & Carpenter 1980 · Holmqvist et al. 2011

## A3 · Neurofeedback and brain-computer interfaces at their real maturity · 12 min · Core

> Neurofeedback shows people a signal of their own brain activity so they can learn to change it; brain-computer interfaces turn brain signals into commands. Fields: training, adaptive systems, attention support, assistive use, experimental interaction. Maturity differs enormously. Chances: deeper insight into load and reactions, new interaction. Risks: over-interpretation, poor everyday fitness, technical hurdles, data protection and ethics.

:::box In plain words
**The idea.** Neurofeedback shows people a signal of their own brain activity (usually from EEG) so they can learn to change it; it is used in therapy and research, with mixed evidence. A brain-computer interface (BCI) turns brain signals into commands, for example to type without moving; today it is mostly medical and research use. Possible fields: training, adaptive systems, support for attention, assistive use and experimental interaction. Maturity differs enormously: eye-tracking in lab tests is an established method, a consumer headband's “focus score” is not validated, and a BCI to control a website by thought is a research topic. Chances: deeper insight into load, attention and reactions, new ways to interact. Risks: over-interpretation, poor fitness for daily use, high technical hurdles, data protection and ethics.
**Why it matters.** Block 1.1 asks about FocusSense's neurofeedback for concentration and overload, Block 1.2 rates experimental neurofeedback and BCI observation for LearningPulse, and Block 2.1 asks which methods are product-near. This card places them where they really are.
**How to read the picture.** Seven technologies placed by evidence and everyday use, for Tessel.
:::

![Seven technologies for Tessel placed by evidence and everyday use.](_figures/d15_A3_0.png)

**Chances and risks of neuro-based UX**

| Chance | Example (Tessel) | Risk | What it looks like |
|---|---|---|---|
| Insight into load | Where the transfer flow strains people. | Over-interpretation | A focus score read as truth. |
| Insight into attention | The fee is seen too late. | Poor everyday fitness | Works in the lab, not on a bus. |
| Insight into reactions | Hesitation before Continue. | Technical hurdles | Calibration, glasses, bad light. |
| New interaction | Gaze to scroll for people who cannot use their hands. | Data protection and ethics | Brain data on a vendor's cloud. |

**Neurofeedback and brain-computer interfaces: real maturity**

| Topic | Real finding | What it means for a product |
|---|---|---|
| Brain-computer interfaces | Wolpaw and colleagues defined a brain-computer interface as a system that gives the brain a channel for communication and control that does not use the muscles (Wolpaw et al. 2002). | A real fit exists for people who cannot use their hands; for everyone else the gain over a mouse or a voice is small. |
| Neurofeedback | A meta-analysis of 13 trials with 520 children and adolescents with ADHD found significant effects only on ratings from assessors close to the treatment, and no significant effects on probably blinded ratings or in trials with sham controls; other authors dispute the conclusion (Cortese et al. 2016). | A scientific look is not evidence: ask which outcome was measured and how blind the assessor was. |
| State of the field | Reviews describe neurofeedback and real-time brain imaging as promising but with many open questions about effects and methods (Sitaram et al. 2017). | Treat any commercial claim as a hypothesis until it is replicated. |

:::note Case assumption
Tessel, Mara, Joon, Ines and Bastian are made up for this example; the gaze recordings are drawn for the lesson, not measured. Neurofeedback follows Sitaram et al. (2017); brain-computer interfaces for communication and control follow Wolpaw et al. (2002). The placements are a reading of the example, not a ranking of products. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Say exactly which technology is meant: lab eye-tracking, webcam gaze, consumer EEG, clinical neurofeedback, medical BCI.
- Ask for the evidence that it measures what it claims, in a setting like yours.
- Separate “on sale” from “proven”.
- Check everyday fitness: movement, noise, light, glasses, hair, fatigue.
- Name the field: training, adaptation, attention support, assistance or experiment.
:::

:::note Extra · go deeper (optional reading)
Assistive use is where brain-computer interfaces matter most today: for someone who cannot move, a slow, tiring interface that works is life-changing. For everyone else, the same interface is slower than a thumb. Ask whose problem a neurotechnology solves before asking whether it is impressive.
:::

^src: Sitaram et al. 2017 · Wolpaw et al. 2002 · Cortese et al. 2016

## A4 · Insight, interpretation risk and decision relevance: research, experiment or product? · 12 min · Core

> Robust UX research, experimental technology and a marketable application are three tracks with different rules. Mixing them is how weak data ends up deciding a product. Fund the question, not the technology: a question, a hypothesis, a fitting method, what it can show, and the decision it informs. Judge every finding on insight value, interpretation risk and decision relevance.

:::box In plain words
**The idea.** Not every measurement belongs in a product. Robust UX research answers a written question with a fitting method and the participants' consent; experimental technology is explored to learn what it can do; a marketable application must work reliably for everyone, every day. Mixing the three is how weak data ends up deciding a product. Fund the question, not the technology: start from what you need to know, write a hypothesis, choose the method that can answer it, and say which decision the answer will inform. Then judge each finding on its insight value, its interpretation risk and its decision relevance.
**Why it matters.** Block 1.1 asks about decision relevance and the two biggest chances and risks, Block 1.2 compares approaches near and far from the product, and Block 2.1 asks for separate tracks and hypothesis-based pilots. This card gives you the three tracks and the chain from question to decision.
**How to read the picture.** Tessel's five ideas sorted into research, experiment, product, or not at all. Below, the chain from a question to a decision.
:::

![Tessel's five ideas sorted into research, experiment, product, or not at all.](_figures/d15_A4_0.png)

![Fund the question, not the technology: from a question to a decision.](_figures/d15_A4_1.png)

**Insight, interpretation risk and relevance: three tracks**

| Track | Real example | What it means for a decision |
|---|---|---|
| Robust research | Eye-tracking in usability tests with a defined question, calibrated devices and enough participants (Holmqvist et al. 2011; Nielsen 2009, as reported). | Use it now, for evaluation, with the limits stated. |
| Experimental technology | Neurofeedback for attention is contested in controlled trials (Cortese et al. 2016). | Run it as a small, controlled experiment with a university, not as a product feature. |
| Marketable application | The EU AI Act prohibits emotion recognition in the workplace and in education, with an exception for medical or safety reasons (Article 5(1)(f), applicable since 2 February 2025). | Check the law before the market: some applications are not allowed at all. |

:::note Case assumption
Tessel, Mara, Joon, Ines and Bastian are made up for this example; the gaze recordings are drawn for the lesson, not measured. Narrow questions, one feature at a time and measurable outcomes follow Tobii's own advice to UX researchers (2019). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Sort every idea into research, experiment, product, or not at all.
- Write the question and the hypothesis before choosing a method.
- Choose the simplest method that can answer it; sometimes that is not eye-tracking.
- Name the decision the answer will inform.
- Let only robust findings cross from research into the product.
:::

:::note Extra · go deeper (optional reading)
A pilot without an exit criterion is not a pilot; it is a subscription. Write down before a study what result would make you stop, change course or go on. Otherwise every result will be read as a reason to continue.
:::

^src: Tobii 2019 · Holmqvist et al. 2011 · Nielsen 2009 · Cortese et al. 2016 · EU AI Act 2024

## A5 · Ethics, data protection and voluntariness, and weighing a measure · 12 min · Core

> Gaze and brain data can reveal tiredness, stress, reading difficulties or health, often without the person knowing; regulators treat neurodata as high risk. Consent is design: what is recorded, what will not be inferred, who sees it, when it is deleted, and a no as easy as a yes. Weigh measures on effect on users, feasibility, risk, time pressure and reputation security.

:::box In plain words
**The idea.** Gaze and brain data are more intimate than clicks: they can reveal tiredness, stress, reading difficulties or health, often without the person knowing. Regulators treat neurodata as high risk. Consent is part of the design: say what is recorded, what will and will not be inferred, who sees it, when it is deleted, and make saying no as easy as saying yes. At work, consent is rarely free. Leaders weigh neuro-based measures by effect on users, feasibility, risk, time pressure and reputation security, and judge them with a differentiated view instead of a scientific aura.
**Why it matters.** Block 1.1 asks about ethics and acceptance, Block 1.2 about sensitive data protection, and Block 2.1 asks for an ethics, data protection and consent framework and four measures justified on effect on users, feasibility, risk, time pressure and reputation security. The example uses Tessel and its own measures, so the answer for the task cases is not given.
**How to read the picture.** Three consent screens for the same Tessel study: hidden, clear, and clear with limits on what is inferred. Then three measures rated on five criteria.
:::

![Three consent screens for the same Tessel study. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d15_A5_0.png)

![Tessel weighs three measures on effect on users, feasibility, risk, time pressure and reputation security.](_figures/d15_A5_1.png)

**Ethics, data protection and voluntariness: real rules**

| Source | Real rule or finding | What it means for a measure |
|---|---|---|
| The UK regulator | The Information Commissioner's Office reviewed neurotechnology and the data protection questions it raises, including special sensitivity of neural data and the risk of bias and inference (Information Commissioner's Office 2023). | Do a data protection impact assessment before a neuro study. |
| New rights | Ienca and Andorno proposed new human rights for the age of neurotechnology, among them cognitive liberty and mental privacy (Ienca and Andorno 2017). | Voluntary, informed and revocable participation is the minimum. |
| Law | Chile amended its constitution in 2021 to protect brain activity and the information derived from it (Law 21.383), and Colorado extended its privacy law in 2024 to neural data, with express consent (as reported). | Neural data is already regulated in places: ask where your users live. |
| Emotion recognition | The EU AI Act prohibits emotion recognition systems in workplaces and educational institutions, with medical and safety exceptions (Article 5(1)(f)). | Do not use gaze or physiology to infer feelings of employees or students. |

:::note Case assumption
Tessel, Mara, Joon, Ines and Bastian are made up for this example; the gaze recordings are drawn for the lesson, not measured. Neurodata as high risk and the limits of consent follow the UK ICO (2023); mental privacy follows Ienca and Andorno (2017); rating options on the same criteria follows Gibbons (2018). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- What is recorded, and what could be inferred from it, even by accident?
- Is taking part truly voluntary? At work, rarely.
- Say what you will not infer, and keep to it.
- Who sees the data, where is it stored, when is it deleted?
- Rate every measure on the same five criteria, with a reason; a rating is a judgement, never a mark.
:::

:::note Extra · go deeper (optional reading)
Reputation risk is a cost with a slow fuse. A study that looks harmless inside can read very differently as a headline: “bank measured customers' eyes”. Ask before every study how it would sound if a customer described it to a journalist.
:::

^src: ICO 2023 · Ienca & Andorno 2017 · Gibbons 2018 · Chile Law 21.383 and Colorado 2024 · EU AI Act 2024

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards, led by the facilitator. Level 3 in the Chief Experience Officer's chair: a guiding vision for neuro-based UX research and interaction, three strategic decisions, an order of what is researched first, a risk analysis, a governance model, one decision under uncertainty and a statement to the management. The cards give you the ideas you use in Task 2.
:::

## B1 · Neuro-based UX as an insight architecture, not measurement fascination · 20 min · Core

> At senior level, neuro-based UX is a decision architecture for insight, personalisation and new interaction: a guiding vision of what the company wants to understand and what it will not do, separate tracks for research, UX analysis and product, hypotheses before studies, and an evidence grade for what may influence strategy.

:::box In plain words
**The idea.** At senior level, neuro-based UX is not a new gadget but a decision architecture for insight, personalisation and new interaction: a guiding vision of what the company wants to understand and why, separate tracks for research, UX analysis and product, hypotheses before studies, and an evidence grade that decides what may influence strategy. Operational decisions concern a single study; strategic ones concern the research portfolio, product development and the protection of trust.
**Why it matters.** Block 3.1 asks for a guiding vision for neuro-based UX research and interaction, three decisions on eye-tracking, neurofeedback, BCI, ethics, data protection and product connection, and an order of what is looked at first. You decide the architecture, not single methods.
**How to read the picture.** Left Tessel chasing measurements to look scientific, right running an insight architecture. Below, the layers from a guiding vision to every study.
:::

![Tessel chasing measurements to look scientific, or running an insight architecture.](_figures/d15_B1_0.png)

![The layers of an insight architecture, from a guiding vision to every study.](_figures/d15_B1_1.png)

**Neuro-based UX as an insight architecture: structures**

| Part | Real example | What it means |
|---|---|---|
| A ladder of evidence | Eye-tracking is robust for questions about where people look; claims about feelings or understanding need further evidence (Holmqvist et al. 2011; Just and Carpenter 1980). | Grade each finding: recorded, interpreted, tested. |
| Regulator guidance | The ICO sets out how data protection applies to neurotechnology (Information Commissioner's Office 2023). | Build the review into the research process. |
| Vendor claims | A device maker's documentation shows what a tool measures; the interpretation is yours (Tobii 2019). | Ask the vendor for the validation behind each metric. |

:::note Case assumption
Tessel, Mara, Joon, Ines and Bastian are made up for this example; the gaze recordings are drawn for the lesson, not measured. The regulator's concerns about neurodata follow the UK ICO (2023); framing each study narrowly follows Tobii (2019). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Check how neuro-based methods are decided today: by fascination, or by a question?
- Write a guiding vision: what insight, for whom, and what is never done with the data.
- Separate research, UX analysis and product, with rules for crossing.
- Hold a portfolio of written questions, each with the decision it informs.
- Tell operational decisions (one study) from strategic ones (portfolio, product, trust).
:::

:::note Extra · go deeper (optional reading)
Your job is the standard, not the study. A leader does not need to read EEG curves; they need to decide which questions are worth asking, which methods may answer them, and what counts as an answer. That standard outlives every single study.
:::

^src: ICO 2023 · Tobii 2019 · Holmqvist et al. 2011 · Just & Carpenter 1980

## B2 · Value, validity, effort, ethics, data protection, maturity: the conflicts of neuro-based UX · 20 min · Core

> Neuro-based UX sits between insight and validity, a scientific image and what the data can carry, personalisation and privacy, research depth and market maturity, speed and interpretation effort. A portfolio of a few bets of different size, each with a hypothesis, a measure of success and an exit date, makes the conflicts manageable; write down what each bet assumes.

:::box In plain words
**The idea.** Neuro-based UX sits between goals that pull apart: insight against validity, a scientific image against what the data can carry, personalisation against privacy, research depth against market maturity, speed against interpretation effort, and all of them against effort and money. The way through is a portfolio of a few bets of different size, each with a hypothesis, a measure of success and an exit date, and a written list of what each bet assumes about data quality, acceptance, maturity and strategic value.
**Why it matters.** Block 3.1 asks for three decisions, a risk analysis of wrong assumptions about data quality, user acceptance, market maturity and strategic value, and a governance model for conflicts. Each is a decision between conflicting goals.
**How to read the picture.** Tessel's three bets, a safe one, a medium one and a bold one, with what each costs and what it assumes.
:::

![Tessel's three bets: safe, medium and bold · Exploratory.](_figures/d15_B2_0.png)

**Standing conflicts of neuro-based UX**

| Conflict | Who usually stands for each side | What to ask |
|---|---|---|
| Insight against validity | Innovation, against research. | Does the measure mean what it claims, here? |
| A scientific image against what the data carries | Marketing, against research. | Which step of the ladder does the claim stand on? |
| Personalisation against privacy | Product, against data protection and customers. | What would we infer, and would people agree? |
| Speed against interpretation effort | Departments, against research. | What is the smallest study that answers the question? |

**Conflicts of neuro-based UX, with evidence**

| Conflict | What the evidence says | A way to decide |
|---|---|---|
| Insight against validity | Neurofeedback effects vanished with blinded ratings in a meta-analysis (Cortese et al. 2016). | Ask whether the measure means what it claims, here. |
| A scientific image against what the data carries | A 39-person rule for heatmaps shows how much data a clean picture needs (Nielsen 2009, as reported). | Put the claim on the right step of the evidence ladder. |
| Personalisation against privacy | Neural data is regulated in some places (Chile 2021; Colorado 2024) and emotion recognition is banned at work and in schools in the EU (AI Act, Article 5(1)(f)). | Ask what you would infer and whether people would agree. |
| Speed against interpretation effort | Sample size depends on the question, from about five to 44 or more (Nielsen 2009; Behavior Research Methods 2025; as reported). | Run the smallest study that answers the question. |

:::note Case assumption
Tessel, Mara, Joon, Ines and Bastian are made up for this example; the gaze recordings are drawn for the lesson, not measured. The bets are a reading of the example, not a rule for every company. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Name each conflict as two goals and say who stands for each: board, research, product, data protection, customers.
- Hold a few bets of different size: safe, medium, bold.
- Write down the assumptions each bet rests on: data quality, acceptance, maturity, strategic value.
- Set the measure of success and the exit date before the study starts.
- Say what the choice gives up.
:::

:::note Extra · go deeper (optional reading)
A data-driven project becomes a trust problem when people learn about it from someone else. The same study, explained openly in advance, is research; discovered later, it is surveillance. Openness is cheap now and cannot be bought later.
:::

^src: ICO 2023 · Sitaram et al. 2017 · Cortese et al. 2016 · Nielsen 2009 · Chile Law 21.383 and Colorado 2024 · EU AI Act 2024 · Behavior Research Methods 2025

## B3 · Governance for neurodata, and deciding with thin evidence · 20 min · Core

> Neurodata needs an owner of research and the evidence grade, an ethics and data review that approves every study and may stop any, a translation step that decides what may reach a product, and a rule for when insight, speed and trust disagree. With thin evidence, a decision says what it decides, does not know, would reverse and gives up.

:::box In plain words
**The idea.** Neurodata needs owners and limits: someone who owns neuro-based research and the evidence grade, an ethics and data review that approves every study and may stop any, a translation step that decides what may reach a product, and a rule for when insight, speed and trust disagree. Four roles help: whoever sets the standard, whoever approves, whoever runs the studies, whoever translates. Evidence is usually thin at the start; a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up.
**Why it matters.** Block 3.1 asks for a governance model for neuro-based research, ethical approvals and the translation into product decisions, a decision despite patchy evidence, and a statement to the management. This card gives you the parts of each.
**How to read the picture.** The four boxes at the top are the parts of a decision, filled in for Tessel. The two boxes below are the rule for future decisions.
:::

![A decision under uncertainty, filled in for Tessel.](_figures/d15_B3_0.png)

**Four roles of governance for neurodata**

| Role | The question | An example (Tessel) |
|---|---|---|
| Sets the standard | Who owns the research and the evidence grade? | The head of UX research. |
| Approves | Who says yes to a study, and may stop it? | An ethics and data review with the data protection officer. |
| Runs the studies | Who designs and analyses them? | The research team, with a university for EEG. |
| Translates | Who decides what reaches the product? | The CXO, only for graded findings. |

**Governance for neurodata: real references**

| Role | Real reference | What it means |
|---|---|---|
| Sets the standard | The regulator's report is a basis for the evidence and data protection standard (Information Commissioner's Office 2023). | Name an owner for the evidence grade. |
| Approves | Participation must be voluntary and informed, with the right to withdraw (Ienca and Andorno 2017). | Put an ethics and data review before every study, with the data protection officer. |
| Translates | Findings that failed blinded tests (Cortese et al. 2016) show why only graded findings should reach a product. | Let only graded findings go to the product decision. |

:::note Case assumption
Tessel, Mara, Joon, Ines and Bastian are made up for this example; the gaze recordings are drawn for the lesson, not measured. The limits of consent at work follow the UK ICO (2023); deciding with limited information follows Simon (1956); imagining the failure in advance (premortem) follows Klein (2007). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Name who sets the standard and owns the evidence grade.
- Name who approves a study and may stop it, including data protection and employee representatives.
- Name who runs studies, and who translates findings into product decisions.
- Settle conflicts by people's rights first, then robust evidence, then speed; say who settles a tie.
- Say what you decide, what you do not know, when you would reverse it and what you give up.
:::

:::note Extra · go deeper (optional reading)
Name the roles before you need them. When a study goes wrong, the first question is “who approved this?”; if nobody can answer, the problem is no longer the data, it is the company.
:::

^src: ICO 2023 · Simon 1956 · Klein 2007 · Ienca & Andorno 2017 · Cortese et al. 2016
