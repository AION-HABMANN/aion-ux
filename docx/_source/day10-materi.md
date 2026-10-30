---
doc: materi
day: 10
kicker: DAY 10 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Intelligent interfaces and AI-supported interaction
subtitle: Study material with real research, worked examples and the rules you use in the tasks
daytitle: Day 10 · Module 5 (day 1 of 2): Intelligent interfaces and AI-supported interaction
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use a made-up company in each card. The task case is CareGuide (see the Task document).
intro: Today is about interfaces that seem to think: recommendations, assistants that suggest the next step, help that appears on its own. You learn the difference between rule-based, adaptive and learning systems, how AI supports guidance and help, the difference between adapting to the situation, personalising from data and steering the interaction, what intelligent interfaces give and how they go wrong, and why people need to see why, change it and undo it. Then you use it on three platforms, and you look at how two real ones explain their recommendations. This document holds everything you need to study Day 10 without the website. Every card says what the idea is in plain words, shows it in a picture, gives the details and ends with the rules you use in the tasks.
glossary: personalisation,ux,intelligent-interface,governance,case-assumption,neuro-ux,learning-system,over-personalisation,perceived-control,decision-arch,rule-based,adaptive,misadaptation,touchpoint,explainability,recoverability,voice-ui,grouping,cxo,leaderboard
refs: horvitz1999,amershi2019,sundar2020,gomezuribe2015,pariser2011,parasuraman1997,lee2004,bakshy2015,gdpr2016,eu2024aiact,gibbons2018,simon1956,klein2007
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. Levels 1 and 2: find the chances and risks of an insurance service platform's intelligent interaction, rate three personalisation designs of a career platform under conflicting goals, then analyse a health portal, develop four measures, justify them and decide on the first 14 weeks. The cards give you the ideas and the rules you use in Task 1.
:::

## A1 · Rule-based, adaptive or learning: what makes an interface intelligent · 12 min · Core

> Three kinds of system can stand behind a smart-looking screen: a rule (same input, same output), an adaptive system (reacts to the situation now) and a learning system (changes with data about a person). An interface is intelligent when its support fits the situation; doing things automatically is only automation.

:::box In plain words
**The idea.** An interface can look smart for three different reasons. A rule-based system follows fixed rules: the same input gives the same output, every time, and the rule can be explained in one sentence. An adaptive system reacts to the situation now: where you are, what time it is, what you just did. A learning system changes with data over time: it gets to know a person, and the same input can give a different output next month. Many products mix the three. An interface is intelligent when it supports people in a way that fits their situation; one that only does things automatically is automated, not intelligent.
**Why it matters.** Block 1.1 asks what SmartAssist's suggestions do for users and notes that they cannot tell rules from AI, and Block 2.1 asks why CareGuide's recommendations fit only sometimes. This card gives you the three kinds of system behind a smart-looking screen.
**How to read the picture.** The same Northline Rail moment, a delayed train, handled by a rule, by the situation and by what the app has learned.
:::

![One Northline delay handled by a rule, by the situation and by what the app has learned. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d10_A1_0.png)

**Three kinds of system behind an interface**

| Kind | What it uses | Can it explain itself? | Typical mistake |
|---|---|---|---|
| Rule-based | Fixed rules written by people. | Yes, in one sentence. | Treats everyone the same, also when the situation differs. |
| Adaptive | The situation now: place, time, device, the last step. | Yes, if it names the situation. | Misreads the situation. |
| Learning | Data about the person, collected over time. | Only partly; it has to be designed. | Confident mistakes from old or missing data. |

**Kinds of intelligent behaviour: sources**

| Source | Real finding or rule | What it means for a screen |
|---|---|---|
| Mixed initiative | Horvitz set out principles for interfaces in which the user and an automated service share the initiative, including acting only when the expected benefit outweighs the cost of a wrong action (Horvitz 1999). | An intelligent suggestion has a price when it is wrong: weigh it before showing it. |
| Guidelines for human-AI interaction | Amershi et al. distilled 18 guidelines, from more than 160 candidate recommendations, grouped by when they apply: initially, during interaction, when the system is wrong, and over time (Amershi et al. 2019). | Check an intelligent feature in each of the four phases, not only in the demo. |
| Rule-based, adaptive, learning | A rule is fixed and can be explained in a sentence; an adaptive system reacts to the situation now; a learning system draws on data about the person over time. | Say which kind sits behind the screen: it decides what you can promise and explain. |

:::note Case assumption
Northline Rail, Ilka, Mats, Saskia and Bram are made up for this example. When an automated service should act, ask or wait follows Horvitz (1999); making clear what a system can do and why it did something follows Amershi et al. (2019). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Ask which kind of system is behind a suggestion: a rule, the situation, or learning about the person.
- A rule can be explained in one sentence; check whether the screen says it.
- An adaptive system needs the situation to be read correctly; check what happens when it is misread.
- A learning system can change its answer over time; check whether people can see what it learned.
- Do not call it intelligent because it is automatic; call it intelligent when its help fits.
:::

:::note Extra · go deeper (optional reading)
Many products mix the three, and the people using them cannot tell which part is which. That matters: a rule that is wrong is wrong for everyone and is fixed once; a learning system that is wrong may be wrong only for some people, quietly, for months. When nobody can say which kind decided, nobody can say who to ask when it goes wrong. “Which type is this?” is the first question to ask of any smart-looking screen.
:::

^src: Horvitz 1999 · Amershi et al. 2019

## A2 · How AI guides, recommends and helps: context, personal data and steering · 12 min · Core

> AI supports people in four places: guidance, recommendations, help, and the course of an interaction. It adapts in three ways: to the context now, to personal data, or by steering the interaction itself. Each needs different data and carries a different risk. A voice interface is one form; it must say back what it understood.

:::box In plain words
**The idea.** AI can support people in four places: guidance (what to do next), recommendations (what might suit them), help (an answer at the moment of need) and the course of an interaction (a dialogue that shortens itself). There are three ways to adapt. Adapting to context uses the situation now (time, place, device). Personalising from data uses what is known about the person (history, preferences). Dynamic steering changes the interaction itself (skipping steps, reordering, a voice assistant asking only what is missing). Each needs different data and carries a different risk; voice interfaces are one form, where saying back what was understood replaces what a screen would show.
**Why it matters.** Block 1.2 asks you to rate three ways CareerNavigator could personalise, and Block 2.1 asks what CareGuide's recommendations do. This card tells context, personal data and steering apart.
**How to read the picture.** The Northline Rail app in three versions: adapting to the station Mats is at, personalising from his usual trips, and steering the booking itself.
:::

![The Northline app adapting to context, personalising from data and steering the interaction by voice. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d10_A2_0.png)

**Three ways an interface can adapt**

| Way | What it uses | Example (Northline) | Main risk |
|---|---|---|---|
| Adapting to context | The situation now. | Departures from the station Mats is at. | A misread situation. |
| Personalising from data | What is known about the person. | His usual Friday trip, ready to book. | Old data; feeling watched. |
| Steering the interaction | The course of the dialogue itself. | The voice assistant asks only what is missing. | Guesses the person did not see. |

**How AI guides, recommends and helps: a real platform and the rules**

| Topic | Real finding or example | What it means for a screen |
|---|---|---|
| Recommendation at scale | Netflix reported that its recommender influences the choice for about 80% of the hours streamed, and the rest comes from search; the company also estimated the value of personalisation and recommendations at over one billion dollars a year (Gomez-Uribe and Hunt 2015; the figures are the company's own). | A recommendation is not a side feature: on a large platform it is the main way into the content. |
| Context and data | Guidelines ask a system to make clear what it can do and how well it can do it, to match social norms, and to time its services by the person's context (Amershi et al. 2019). | Show the person what the assistant knows and does not know. |
| Steering the dialogue | A system that acts on a guess should be easy to dismiss (Amershi et al. 2019). | Give every guess a one-tap way out. |

:::note Case assumption
Northline Rail, Ilka, Mats, Saskia and Bram are made up for this example. People reacting to an AI's agency, as convenient or intrusive depending on control, follows Sundar (2020). Voice interfaces go deeper on Day 11. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Say which of the four a feature does: guide, recommend, help, or shorten the interaction.
- Say which way it adapts: context, personal data or steering.
- Context needs no data about the person; prefer it where it is enough.
- Personal data needs consent and good data; check both.
- Steering skips steps; check that people can still see and correct what was filled in, by voice especially.
:::

:::note Extra · go deeper (optional reading)
Context is the cheapest and safest kind of intelligence, and the most often skipped. Teams reach for personal data because it feels more impressive, when the situation alone (where someone is, what they just did) would have answered the question without storing anything. Ask first whether the situation is enough; personalise only for what it cannot answer.
:::

^src: Amershi et al. 2019 · Horvitz 1999 · Sundar 2020 · Gomez-Uribe & Hunt 2015

## A3 · What intelligent interfaces give, and how they go wrong · 12 min · Core

> Intelligent interfaces can raise relevance, save time, relieve people of steps, help before they ask and fit how people work. They go wrong through opacity, loss of control, misadaptation, over-personalisation and loss of trust. The same feature can do both.

:::box In plain words
**The idea.** Intelligent interfaces can raise relevance (what people see fits them), save time, relieve people of steps, help before they ask, and fit the way people already work. They can also go wrong in five ways: opacity (nobody can see why), loss of control (people cannot change it), misadaptation (it fits the wrong situation), over-personalisation (it knows too much, or narrows what people see) and loss of trust (after one bad surprise, people doubt every suggestion). The same feature can do both; whether it helps depends on how well it fits, and how easy it is to see and to correct.
**Why it matters.** Block 1.1 asks for the chances and risks of SmartAssist and for its two biggest chances and risks, and Block 2.1 asks for CareGuide's central chances and risks. This card gives you the potentials and the risks by name.
**How to read the picture.** One Northline Rail message, from not personal at all to far too personal.
:::

![One Northline message from not personal at all to far too personal. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d10_A3_0.png)

**What intelligent interfaces give, and how they go wrong**

| Potential | What it looks like | Risk | How it shows |
|---|---|---|---|
| Relevance | What people see fits them. | Opacity | Nobody can see why. |
| Time saved | Fewer steps to the goal. | Loss of control | People cannot change it. |
| Relief | The system does the routine part. | Misadaptation | It fits the wrong situation. |
| Anticipating help | Help before people ask. | Over-personalisation | It knows too much, or narrows the view. |
| Fit | It matches how people already work. | Loss of trust | After one bad surprise, every suggestion is doubted. |

**What intelligent interfaces give, and how they go wrong: evidence**

| Topic | Real finding | What it means for a screen |
|---|---|---|
| A narrowed view | In a study of 10.1 million US Facebook users, the ranking algorithm reduced the share of ideologically cross-cutting content that users saw by about 5% for conservatives and 8% for liberals; the users' own clicks reduced it by about 17% and 6% (Bakshy et al. 2015, as reported). | A system narrows the view in two ways: by what it ranks and by what people choose from it; measure both. |
| The filter bubble claim | Eli Pariser warned that personalisation could lock people into a view of their own (Pariser 2011); the size of the effect is contested, as the study above shows. | Treat over-personalisation as a risk to test, not as a certainty. |
| Use and misuse of automation | Parasuraman and Riley described the use, misuse, disuse and abuse of automation: people rely on it too much or reject it, depending on how well it matches their trust (Parasuraman and Riley 1997). | Design for calibrated trust, not for maximum use. |
| Trust in automation | Trust should follow the actual reliability of the system; trust that is too high or too low leads to error (Lee and See 2004). | Show reliability honestly, and let the person see when the system is unsure. |

:::note Case assumption
Northline Rail, Ilka, Mats, Saskia and Bram are made up for this example. Personalisation narrowing what people see follows Pariser (2011); people abandoning automation after visible failures follows Parasuraman and Riley (1997); trust that should match what a system can do follows Lee and See (2004). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Name the potential a feature aims at: relevance, time, relief, anticipating help, fit.
- Name the risk next to it: opacity, loss of control, misadaptation, over-personalisation, loss of trust.
- Ask where more personal stops being more helpful.
- Remember that one bad surprise lowers trust in every suggestion after it.
- Check whether personalisation narrows what people can find.
:::

:::note Extra · go deeper (optional reading)
Trust in automation is lost faster than it is gained. People who see a system make an obvious mistake often stop using it altogether, including for the things it does well. That is why a few confident wrong suggestions can cost more than many right ones bring: the risk is not one bad recommendation, but every recommendation after it.
:::

^src: Pariser 2011 · Parasuraman & Riley 1997 · Lee & See 2004 · Bakshy et al. 2015

## A4 · Why, change, undo: transparency, control and the feeling of control · 12 min · Core

> People trust what they can understand and change. Ask three questions of every suggestion: can they see why (transparency), change it (control), undo it (recoverability)? Clear expectations matter: what the system will and will not do. The more it acts alone, the more people need to feel in control.

:::box In plain words
**The idea.** People trust a suggestion they can understand and change. Three questions test it: Can the person see why the system did what it did (transparency)? Can they change, steer or turn it off (control)? If it gets it wrong, can it be undone (recoverability)? If the answer to all three is no, the feature needs redesign before it ships, however clever the system behind it. Clear expectations matter too: people should know what the system will and will not do. The more a system acts on its own, the more people need to feel in control; perceived control is not the same as real control, but it decides how people feel about automation.
**Why it matters.** Block 1.1 asks about transparency and control at SmartAssist, Block 1.2 asks you to weigh explainability and user control at CareerNavigator, and Block 2.1 asks why CareGuide's members do not understand its recommendations. This card gives you the three questions to ask of every suggestion.
**How to read the picture.** One Northline Rail suggestion with three switches: a reason, a way to change it, and an undo.
:::

![Northline's automatic rebooking with a reason, a way to change it and an undo. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d10_A4_0.png)

**The three questions, with Northline examples**

| Question | What it tests | Northline, before | Northline, after |
|---|---|---|---|
| Can I see why? | Transparency | “You have been rebooked.” | “… because your 7:42 is cancelled.” |
| Can I change it? | Control | No other trains shown. | Two other trains to choose. |
| Can I undo it? | Recoverability | Only through the hotline. | “Undo rebooking” in one tap. |

**Transparency, control and undo: guidelines and rules**

| Question | Real guideline or rule | What it means for a screen |
|---|---|---|
| Can I see why? | One of the guidelines asks to make clear why the system did what it did (Amershi et al. 2019). Under the GDPR, people can ask for meaningful information about the logic of an automated decision. | State the reason in one sentence next to the suggestion. |
| Can I change it? | The guidelines ask to support efficient correction and to encourage granular feedback (Amershi et al. 2019). | Offer other options at the point of decision, not in a settings page. |
| Can I undo it? | The guidelines ask for global controls over what the system monitors and how it behaves (Amershi et al. 2019). Article 22 of the GDPR gives people a right not to be subject to a decision based solely on automated processing with legal or similarly significant effects, with safeguards such as human intervention and the right to contest it. | Make undo one tap, and give a human route for decisions that matter. |
| Do I know it is a machine? | The EU AI Act (Article 50) requires that people are told when they are interacting with an AI system, unless that is obvious from the context. | Label the assistant and say what it is. |

:::note Case assumption
Northline Rail, Ilka, Mats, Saskia and Bram are made up for this example. Showing why, supporting dismissal and correction follows Amershi et al. (2019); perceived control shaping how people feel about automation follows Sundar (2020). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Why: does the screen say why, in the person's words?
- Change: can the person steer, dismiss or switch it off?
- Undo: if it is wrong, can the person go back without help?
- If all three answers are no, redesign before it ships.
- Say what the system will and will not do, so people know what to expect.
:::

:::note Extra · go deeper (optional reading)
Automation and autonomy pull against each other. The more a system does on its own, the less the person decides, and the more it matters that they could decide if they wanted to. An undo that nobody uses is still worth building: knowing it is there is what makes people comfortable letting the system act at all.
:::

^src: Amershi et al. 2019 · Lee & See 2004 · Sundar 2020 · GDPR · EU AI Act 2024

## A5 · Data, context and situation, and weighing a measure · 12 min · Core

> An intelligent interface is only as good as its data and its reading of the situation. Incomplete data gives confident mistakes. So intelligent interfaces are a psychological and strategic design task, not only a technical one. Start with robust, frequent cases; weigh measures on effect on users, feasibility, risk and time pressure.

:::box In plain words
**The idea.** An intelligent interface is only as good as its data and its sense of the situation. Incomplete or old data produces confident mistakes; a suggestion that fits at home may not fit on a platform in the rain. So intelligent interfaces are a psychological task (expectations, trust, the feeling of control) and a strategic one (where it is worth it, and where it is too risky), not only a technical one. Start with robust cases: the frequent, simple situations where the data is good. To put measures in order, weigh each on effect on users, feasibility, risk and time pressure, the four Block 2.1 names.
**Why it matters.** Block 1.2 asks about CareerNavigator with only partial user data, and Block 2.1 asks for four prioritised measures for CareGuide, justified on effect on users, feasibility, risk and time pressure, with data of mixed quality. The example uses Northline Rail and its own measures, so the answer for the task cases is not given.
**How to read the picture.** First the chain from data to a suggestion and where it breaks. Then three measures Northline Rail considered, rated on effect on users, feasibility, risk and time pressure.
:::

![From data to a suggestion in the Northline app, and where it breaks.](_figures/d10_A5_0.png)

![Northline weighs three measures on effect on users, feasibility, risk and time pressure.](_figures/d10_A5_1.png)

**Data, context and situation: findings**

| Topic | Real finding | What it means for a measure |
|---|---|---|
| Trust follows reliability | Trust should be calibrated to how reliable the automation really is (Lee and See 2004). | Measure how often the suggestion is right, and show people the result. |
| Misuse and disuse | Over-reliance (misuse) and rejection (disuse) both follow from a poor match between trust and reliability (Parasuraman and Riley 1997). | A measure that raises use without raising reliability raises risk. |
| Learning over time | The guidelines ask to notify users about changes, to update cautiously and to learn from behaviour (Amershi et al. 2019). | Announce when the system changes what it does, and change it in small steps. |

:::note Case assumption
Northline Rail, Ilka, Mats, Saskia and Bram are made up for this example. Rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Ask which data a suggestion uses, and how complete and current it is.
- Ask whether the situation of use is read correctly: at home, on the move, in a hurry.
- Start with frequent cases where the data is good; leave rare, costly ones to people.
- Treat expectations, trust and the feeling of control as part of the design.
- Rate every measure on the same four questions, with a reason; a rating is a judgement, never a mark.
:::

:::note Extra · go deeper (optional reading)
Data quality is rarely even. Most companies have one kind of data that is complete and current (bookings, appointments, contracts) and several that are patchy (reading history, preferences, free text). The robust core cases are where the good data is. An intelligent interface that starts there earns the trust it later needs for the harder cases; one that starts with the impressive cases on patchy data spends that trust before it has any.
:::

^src: Parasuraman & Riley 1997 · Lee & See 2004 · Gibbons 2018 · Amershi et al. 2019

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards, led by the facilitator. Level 3 in the Chief Experience Officer's chair: a guiding vision for intelligent UX, three strategic decisions, an order of what comes first, a risk analysis, a governance model for intelligent UX principles, one decision under uncertainty and a statement to the management. The cards give you the ideas you use in Task 2.
:::

## B1 · Intelligent UX as a decision architecture, not a technology trend · 20 min · Core

> Inside many companies AI is first an innovation signal. At senior level an intelligent interface is a decision architecture: what support, how much personalisation and how much autonomy users get, decided once for every journey. It shapes guidance, service quality and differentiation, and is designed from the user's need.

:::box In plain words
**The idea.** Inside many companies AI is first an innovation signal: a feature to announce. At senior level an intelligent interface is a decision architecture: what kind of support, how much personalisation and how much autonomy the company wants for its users, decided once and applied in every journey. It shapes guidance, service quality and how the product stands apart, so it is designed from the user's need, not from what the technology can do. The rule of thumb: fewer, reliable, explainable suggestions in the journeys where they help most, before anything clever anywhere else.
**Why it matters.** Block 3.1 asks for a guiding vision for intelligent UX, three decisions on transparency, control, adaptivity, depth of personalisation and trustworthy AI interaction, and an order of which journeys, functions or touchpoints become intelligent first. You decide the architecture, not single AI features.
**How to read the picture.** Left Northline Rail adding AI features to look modern, right building an intelligent UX architecture. Below, the layers from a guiding vision to every touchpoint.
:::

![Northline adding AI features to look modern, or building an intelligent UX architecture.](_figures/d10_B1_0.png)

![The layers of an intelligent UX architecture, from a guiding vision to every touchpoint.](_figures/d10_B1_1.png)

**Intelligent UX as a decision architecture: structures**

| Part | Real example | What it means |
|---|---|---|
| Four phases | Amershi et al. grouped the guidelines into initially, during interaction, when wrong and over time (Amershi et al. 2019). | Plan the architecture over the whole life of a feature, not for its launch. |
| Mixed initiative | Horvitz asked that automated services act only when the expected benefit outweighs the cost of error (Horvitz 1999). | Set a rule for when the system may act on its own and when it must ask. |
| Legal frame | The GDPR (Articles 13 to 15 and 22) and the EU AI Act (Article 50) set duties of information and human oversight. | Build the information and the human route into the architecture from the start. |

:::note Case assumption
Northline Rail, Ilka, Mats, Saskia and Bram are made up for this example. Designing the human side of AI from the user's need follows Amershi et al. (2019). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Check where intelligent features are decided today: in a vision, or one AI feature at a time?
- Write a guiding vision: what help people get, how personal it may be, what stays their decision.
- Turn it into principles on transparency, control, depth of personalisation and AI interaction.
- Decide which journeys become intelligent first: frequent, good data, low harm if wrong.
- Prefer fewer, reliable, explainable suggestions to many clever ones.
:::

:::note Extra · go deeper (optional reading)
A guiding vision for intelligent UX is short and testable. “Northline helps passengers make the next good decision, says why and leaves the choice to them” can be checked on every screen: does this suggestion say why, and can the passenger decline it? “AI-first” cannot be checked, and it invites every feature anyone proposes.
:::

^src: Amershi et al. 2019 · Horvitz 1999 · Lee & See 2004 · GDPR · EU AI Act 2024

## B2 · Personalisation against transparency and trust: the conflicts of intelligent UX · 20 min · Core

> Intelligent UX sits between goals that pull apart: personalisation against transparency, automation against autonomy, comfort against data protection, efficiency against trust, and all of them against what can be built. Decide the depth of personalisation per journey, say what you give up, and keep a person for the exceptions.

:::box In plain words
**The idea.** Intelligent UX sits between goals that pull apart: personalisation against transparency (the deeper it goes, the harder to explain), automation against autonomy (doing it for people against letting them choose), comfort against data protection, efficiency against trust, and all of these against what can be built. The way through is to decide the depth of personalisation per journey: shallow where mistakes are costly or data is poor, deeper where it is safe and the person benefits; to say what is given up; and to keep a human answer for the exceptions.
**Why it matters.** Block 3.1 asks for three guiding decisions, a risk analysis of wrong assumptions about user behaviour, data quality and the effect of AI, and a governance model for conflicts between innovation, data protection, trust and economic viability. Each is a decision between conflicting goals.
**How to read the picture.** Three Northline Rail journeys and how deep the personalisation should go in each, with who stands for each side.
:::

![Northline's personalisation console: how deep personalisation goes in three journeys. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d10_B2_0.png)

**Standing conflicts of intelligent UX**

| Conflict | Who usually stands for each side | What to ask |
|---|---|---|
| Personalisation against transparency | Product, against data protection. | Can we still explain it at this depth? |
| Automation against autonomy | Efficiency targets, against the user's own choice. | Would people choose to let it act for them? |
| Innovation against trust | The innovation team, against service and the brand. | What happens after its first confident mistake? |
| All of these against economic viability | Finance, against everyone. | What does it cost to build, explain and maintain? |

**Conflicts of intelligent UX, with evidence**

| Conflict | What the evidence says | A way to decide |
|---|---|---|
| Personalisation against transparency | Recommendations steer about 80% of the hours on a large platform (Gomez-Uribe and Hunt 2015), and the GDPR gives people a right to information about the logic of automated decisions. | Decide how deep an explanation can go, and test that it can be given in a sentence. |
| Automation against autonomy | Decisions based solely on automated processing with significant effects need safeguards (GDPR Article 22). | Ask whether people would choose to let the system act for them. |
| Innovation against trust | Trust that does not match reliability leads to misuse or disuse (Lee and See 2004; Parasuraman and Riley 1997). | Plan what happens after the first confident mistake. |

:::note Case assumption
Northline Rail, Ilka, Mats, Saskia and Bram are made up for this example. The duty to inform people when they interact with an AI system follows the EU AI Act (2024); check the current state of its application before a course run. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Name each conflict as two goals and say who stands for each: innovation, data protection, sales, service.
- Decide the depth per journey: deep where data is good and mistakes are harmless, none where a person must decide.
- Write down the assumptions about user behaviour, data quality and what AI does, and which would be critical if wrong.
- Tell people when they deal with an automated system.
- Say what the choice gives up; a decision that gives up nothing has not been made.
:::

:::note Extra · go deeper (optional reading)
Click numbers cannot see the cost of a wrong suggestion. A recommendation that was clicked may have been clicked out of curiosity, confusion or alarm; one that was not clicked may have quietly lowered trust. Decide which signals you will look at (dismissals, reasons opened, controls used, complaints) before you decide how deep to personalise, or the click rate will decide for you.
:::

^src: Pariser 2011 · Lee & See 2004 · EU AI Act 2024 · Gomez-Uribe & Hunt 2015 · GDPR · Parasuraman & Riley 1997

## B3 · Who answers for an intelligent interface, and deciding with patchy data · 20 min · Core

> An intelligent interface needs an owner: someone who owns its principles, a data protection side that may veto, teams that apply it, and a rule for when innovation and trust disagree. With patchy data, a decision says what it decides, does not know, would reverse and gives up. Explanations, controls and undo are a safe start.

:::box In plain words
**The idea.** An intelligent interface needs an owner: someone who owns the principles (what the system may suggest, what it must explain, what users can switch off), the data protection side that may veto, the product teams that apply it, and a rule for when innovation and trust disagree. Data is often patchy; a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up. Explanations, controls and undo are cheap to add and quick to check: a safe start when nobody knows how users will react.
**Why it matters.** Block 3.1 asks for a governance model for intelligent UX principles, a decision despite patchy data, and a statement to the management. This card gives you the parts of each.
**How to read the picture.** The four boxes at the top are the parts of a decision, filled in for Northline Rail. The two boxes below are the rule for future decisions.
:::

![A decision under uncertainty, filled in for Northline Rail.](_figures/d10_B3_0.png)

**Four parts of intelligent UX governance**

| Part | The question | An example (Northline) |
|---|---|---|
| Who owns what | Who owns the principles; who applies them? | The head of customer experience owns them; every product team applies them. |
| Who checks | Who makes sure no suggestion misleads or misuses data? | Data protection may veto; service checks the wording. |
| The record | What is written down for each intelligent function? | What it suggests, from which data, how it explains itself, how it is switched off. |
| How a conflict is decided | What happens when innovation, data protection and economics disagree? | Trust and data protection first, then the passenger, then economics; the board settles a tie. |

**Owning an intelligent interface: records and rules**

| Part | Real rule or guideline | What it means |
|---|---|---|
| The record | The guidelines ask for clarity on what the system can do and how well, on why it acted, and on how it changes (Amershi et al. 2019). | Write down for each intelligent function what it suggests, from which data, how it explains itself and how it is switched off. |
| Who checks | The GDPR sets conditions for automated decisions and for the data behind them (GDPR Article 22). | Give data protection a right to veto, and let service check the wording. |
| The duty to inform | The EU AI Act (Article 50) requires that people are informed when they interact with an AI system. | Add the notice to the release checklist. |

:::note Case assumption
Northline Rail, Ilka, Mats, Saskia and Bram are made up for this example. Deciding with limited information follows Simon (1956); the premortem follows Klein (2007). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Name who owns what the system may suggest, explain and switch off.
- Give data protection a veto on every new use of data.
- Require a short record for every intelligent function: what it suggests, from which data, how it explains itself, how it is switched off.
- Settle conflicts by trust and data protection first, then the user's benefit, then economics; say who settles a tie.
- Say what you decide, what you do not know, when you would reverse it and what you give up.
:::

:::note Extra · go deeper (optional reading)
When a passenger, a regulator or a journalist asks why the app suggested something, the answer has to exist before the question. A company that keeps a one-paragraph record per intelligent function (what it suggests, from which data, how it explains itself, how it is switched off, who owns it) can answer in a day. One that cannot has found its first governance gap.
:::

^src: Simon 1956 · Klein 2007 · EU AI Act 2024 · Amershi et al. 2019 · GDPR
