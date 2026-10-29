---
doc: materi
day: 16
kicker: DAY 16 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Immersive prototyping and testing, future strategies and ethical aspects
subtitle: Study material with real research, worked examples and the rules you use in the tasks
daytitle: Day 16 · Module 7 (day 3 of 3): Immersive prototyping and testing, future strategies and ethical aspects
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use a made-up company in each card. The task case is NextWorld UX (see the Task document).
intro: Today is about turning experiments into decisions. You learn the steps from a concept idea through a prototype and a pilot to a scalable solution, what an immersive prototype must do before it can be tested, which aspects to test (orientation, presence, overload, error robustness, acceptance, transfer to real use), the ethical questions new interaction and neurotechnologies raise, and why a technology has to be responsible, connectable and governable, not only new. Then you use it on three platforms, including real 3D prototypes you can turn, and you look at what a headset maker requires before an app goes to market and what the European Union bans and demands. This document holds everything you need to study Day 16 without the website. Every card says what the idea is in plain words, shows it in a picture, gives the details and ends with the rules you use in the tasks.
glossary: scalable-solution,ux,pilot,governance,immersion,maturity,case-assumption,presence,testability,evaluation-grid,responsible-innovation,orientation,error-handling,error-robustness,decision-arch,dark-pattern,concept-idea,accessibility,organisational-learning,attention,neuro-ux,cxo
refs: houde1997,buchenau2000,cooper1990,witmer1998,kennedy1993,meta2025,stilgoe2013,ec2026,eu2024aiact,argyris1978,gibbons2018,simon1956,klein2007
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. Levels 1 and 2: judge an immersive innovation project strategically, organisationally and ethically, rate three strategy options under uncertainty, then analyse a company's immersive prototypes, develop four measures for a responsible scaling decision, justify them and decide on the first 16 weeks. The cards give you the ideas and the rules you use in Task 1.
:::

## A1 · From concept idea to scalable solution: the ladder of immersive prototyping · 12 min · Core

> An immersive idea climbs a ladder: a concept idea says what could be, a prototype makes one question testable, a pilot shows whether it works for real users in one place, a scalable solution keeps working for many with support and an owner. Each rung proves something different, with a gate before the next. A prototype must fit the context of use, make the interaction clear, be technically robust, resilient and testable.

:::box In plain words
**The idea.** An immersive idea climbs a ladder. A concept idea describes what could be. A prototype makes one question testable, for example “can guests find their room with AR arrows?”. A pilot puts a working version in front of real users in one place for a limited time. A scalable solution keeps working for many people, places and devices, with support and maintenance. Each rung proves something different, and each needs a gate before the next. An immersive prototype must fit the context of use, make the interaction clear, be technically robust, cope with stress (resilience) and be testable.
**Why it matters.** Block 1.1 asks where RealityFlow's prototyping is not clarified enough, Block 1.2 compares strategies that climb at different speeds, and Block 2.1 asks which of NextWorld UX's prototypes is ready to scale. This card gives you the rungs and what each must prove.
**How to read the picture.** Fernwood's AR wayfinding on four rungs: a sketch, a prototype, a pilot in one hotel, and forty hotels. Below, the five requirements a prototype must meet.
:::

![Fernwood's “Find your room” built four times: concept, prototype, pilot, scaled. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d16_A1_0.png)

![The gates between the rungs, and what each must answer.](_figures/d16_A1_1.png)

**What an immersive prototype must have**

| Requirement | The question | Example (Fernwood) |
|---|---|---|
| Context of use | Where, when and by whom will it be used? | Late arrivals with luggage, tired, in a new wing. |
| Clarity of interaction | Is it obvious what to do? | One arrow, one room number, nothing else. |
| Technical robustness | Does it work on the devices guests have? | Old phones, low battery, weak signal. |
| Resilience | Does it cope with stress and failure? | A fallback route when tracking is lost. |
| Testability | Can a test show something? | A task, a measure: found the room without asking staff. |

:::note Case assumption
Fernwood, Leila, Sam, Rafael and Greta are made up for this example; the corridor and the reports are drawn for the lesson. What prototypes prototype follows Houde and Hill (1997) and Buchenau and Fulton Suri (2000); gates between stages follow Cooper (1990).
:::

:::rules How to decide when this comes up in the task
- Say which rung a project is really on, whatever its slides say.
- Name the one question a prototype must answer.
- Check the five requirements: context of use, clear interaction, robustness, resilience, testability.
- Set the gate criteria before the rung is climbed.
- Count the cost of the last rung: maps, support, updates, an owner.
:::

:::note Extra · go deeper (optional reading)
The go/no-go meeting is the moment a ladder is either climbed or abandoned. It works only if the criteria were written before the rung, by people who will not be judged by the answer. Otherwise every prototype passes, because everyone in the room wants it to.
:::

^src: Houde & Hill 1997 · Buchenau & Fulton Suri 2000 · Cooper 1990

## A2 · Testing immersive systems: orientation, presence, overload, error robustness, acceptance, transfer · 12 min · Core

> Immersive systems need six kinds of test: orientation (do people know where they are), presence (do they feel there, and does it help), overload (is it too much), error robustness (what happens when something fails), acceptance (will all kinds of people use it again) and transfer (does it work in real use). Transfer is the most underestimated and the most decisive for scaling.

:::box In plain words
**The idea.** Immersive systems need tests that a screen never needed. Orientation: do people know where they are and where to go? Presence: do they feel there, and is that helpful? Overload: is it too much to take in? Error robustness: what happens when the signal drops or someone makes a mistake? Acceptance: will people use it again, all kinds of people? Transfer: does what works in the test work in real use, with noise, time pressure and other people? Transfer is the most underestimated, and the most decisive for scaling.
**Why it matters.** Block 1.1 asks where RealityFlow's testing is unclear, and Block 2.1 asks why NextWorld UX's feedback cannot be compared and what makes a prototype ready to scale. This card gives you the six aspects and a way to test each.
**How to read the picture.** Fernwood's AR arrow under test. Below, the six test aspects with how to test each.
:::

![Fernwood's AR arrow under a stress test: crowd, signal and light · Exploratory.](_figures/d16_A2_0.png)

**Six test aspects and how to test them**

| Aspect | How to test it | Example (Fernwood) |
|---|---|---|
| Orientation | Give a task; watch where people hesitate or turn back. | Find room 216 from the lift. |
| Presence | Ask a short presence questionnaire after the session. | Did the VR room feel like a real room? |
| Overload | Count what competes for attention; ask how demanding it was. | Arrow, number, offers, sounds. |
| Error robustness | Cause failures on purpose: lost signal, a wrong turn. | Tracking lost in the lift lobby. |
| Acceptance | Ask again after the second and third use; include sceptics. | Would Sam use it on his next stay? |
| Transfer | Test in the real place and moment, not the lab. | Friday night, crowd, night lighting. |

:::note Case assumption
Fernwood, Leila, Sam, Rafael and Greta are made up for this example; the corridor and the reports are drawn for the lesson. Asking about presence follows Witmer and Singer (1998); asking about simulator sickness follows Kennedy et al. (1993); rating comfort on one scale before release follows Meta's store policies.
:::

:::rules How to decide when this comes up in the task
- Test in the worst realistic moment: crowds, dark, no signal, time pressure.
- Ask about presence and discomfort with standard questions after each session.
- Break things on purpose and watch what people do.
- Test with the people least like the team: older, newer, tired, sceptical.
- Make every test comparable: the same tasks and measures across prototypes.
:::

:::note Extra · go deeper (optional reading)
Grade the evidence, not only the result. A finding from five colleagues in a quiet room is a hint; the same finding from thirty real guests on busy nights is evidence. Write the grade next to every result, so that a hint is never presented as proof.
:::

^src: Witmer & Singer 1998 · Kennedy et al. 1993 · Meta Horizon Store policies

## A3 · Feasible or responsible: future-proof UX strategy and its ethical questions · 12 min · Core

> Feasibility asks “can we build it?”; a responsible UX strategy asks “should we, for whom, and how?”. New interaction and neurotechnologies raise seven ethical questions: data protection, voluntariness, potential for manipulation, cognitive overload, transparency, accessibility and inclusion. They are cheapest to answer at the concept stage and most expensive after scaling.

:::box In plain words
**The idea.** Technological feasibility asks “can we build it?”. A responsible UX strategy asks “should we, for whom, and how?”. New interaction and neurotechnologies raise seven ethical questions: data protection (what is recorded), voluntariness (can people say no), potential for manipulation (does it steer people for us), cognitive overload (is it too much), transparency (do people know what happens), accessibility (can everyone use it) and inclusion (who is left out). They are cheapest to answer at the concept stage and most expensive after scaling.
**Why it matters.** Block 1.1 asks where RealityFlow's ethics are unclear, Block 1.2 rates the ethics of three strategies, and Block 2.1 asks to build ethics into the scaling logic. This card gives you the questions by name.
**How to read the picture.** Left Fernwood asking “can we build it?”, right “should we, and how?”. Below, the seven ethical questions asked of three Fernwood ideas.
:::

![Fernwood asking “can we build it?” or “should we, and how?”.](_figures/d16_A3_0.png)

![Seven ethical questions asked of three Fernwood ideas.](_figures/d16_A3_1.png)

:::note Case assumption
Fernwood, Leila, Sam, Rafael and Greta are made up for this example; the corridor and the reports are drawn for the lesson. Anticipation, reflection, inclusion and responsiveness follow Stilgoe, Owen and Macnaghten (2013); the EU bans emotion recognition at work and in education and harmful manipulation (European Commission, AI Act).
:::

:::rules How to decide when this comes up in the task
- Ask all seven questions of every idea before the first prototype.
- Write down what is recorded, inferred and kept, and for how long.
- Check that saying no is possible and costs nothing.
- Ask whose interest any steering serves.
- Name who cannot use it, and what they get instead.
:::

:::note Extra · go deeper (optional reading)
The biggest blind spots sit between feasibility and responsibility: a team that can build something rarely asks whether it should, and the people who would ask are rarely in the room when it is built. Invite them to the concept stage, not the launch.
:::

^src: Stilgoe, Owen & Macnaghten 2013 · European Commission, AI Act · EU AI Act 2024

## A4 · Responsible, connectable, governable: maturity, learning and the UX portfolio · 12 min · Core

> A new technology must be responsible (no avoidable harm), connectable (fits the products, processes and systems already run) and governable (someone can decide, measure and stop it). How far a company can go depends on the technology's maturity and on its own ability to learn. Together they shape the UX portfolio: scale, test further, pause, stop.

:::box In plain words
**The idea.** A new technology must be not only innovative but responsible (it does no avoidable harm), connectable (it fits the products, processes and systems the company already runs) and governable (someone can decide about it, measure it and stop it). How far a company can go depends on the maturity of the technology and on its own ability to learn: an organisation that tests, compares and decides well can hold more bold bets. Together they shape the UX portfolio: what is scaled, what is tested further, what is paused, what is stopped.
**Why it matters.** Block 1.1 asks about RealityFlow's scalability and organisational capability, Block 1.2 rates capacity to innovate and steerability, and Block 2.1 asks to focus NextWorld UX's portfolio. This card gives you the three tests and the four moves of a portfolio.
**How to read the picture.** Fernwood's five initiatives on a portfolio board. Below, how experiments grow into a steerable future architecture.
:::

![Fernwood's five initiatives on a portfolio board.](_figures/d16_A4_0.png)

![How a steerable future architecture grows out of experiments, pilots and research.](_figures/d16_A4_1.png)

:::note Case assumption
Fernwood, Leila, Sam, Rafael and Greta are made up for this example; the corridor and the reports are drawn for the lesson. Learning by questioning one's own assumptions follows Argyris and Schön (1978); deciding at gates follows Cooper (1990).
:::

:::rules How to decide when this comes up in the task
- Ask three questions of every initiative: responsible, connectable, governable?
- Place it by maturity: concept, prototype, pilot, scalable.
- Make one of four moves: scale, test further, pause, stop.
- Review the portfolio regularly, not only when something goes wrong.
- Ask what the organisation learned, not only what it built.
:::

:::note Extra · go deeper (optional reading)
Keep a quarter log: every three months, one line per initiative saying what was decided and why. After a year the log shows whether the company learns from its experiments, or only starts new ones.
:::

^src: Argyris & Schön 1978 · Cooper 1990

## A5 · When not to scale, and weighing a scaling decision · 12 min · Core

> Not scaling can be the best decision. Signs: it impresses but is rarely used again; it works only for some; it has not been tested in real use; its ethics are not settled; the organisation cannot support it; it does not fit the strategy. Weigh measures on effect on users, feasibility, risk, time pressure and strategic viability, with a reason for every rating.

:::box In plain words
**The idea.** Not scaling can be the best decision. Signs that a technology should not be scaled yet: it impresses but is rarely used again; it works only for some users; it has not been tested in real use; its ethics are not settled; the organisation cannot support it; or it does not fit the strategy. To put measures in order, weigh each on effect on users, feasibility, risk, time pressure and strategic viability, with a reason for every rating.
**Why it matters.** Block 1.1 asks for the biggest strategic risks, and Block 2.1 asks for four measures for a responsible scaling decision, justified on effect on users, feasibility, risk, time pressure and strategic viability. The example uses Fernwood and its own measures, so the answer for the task cases is not given.
**How to read the picture.** Six signs that Fernwood should not scale yet, as a checklist you can try on its AR minibar. Then three measures rated on five criteria.
:::

![Six signs that Fernwood should not scale yet, tried on the AR minibar menu.](_figures/d16_A5_0.png)

![Fernwood weighs three measures on effect on users, feasibility, risk, time pressure and strategic viability.](_figures/d16_A5_1.png)

:::note Case assumption
Fernwood, Leila, Sam, Rafael and Greta are made up for this example; the corridor and the reports are drawn for the lesson. Rating options on the same criteria follows Gibbons (2018); the five criteria are the ones the plan names for the case study.
:::

:::rules How to decide when this comes up in the task
- Check the six signs before every step to scale.
- Treat a pause as a decision with a date to look again.
- Treat a stop as a result: write down what was learned.
- Rate every measure on the same five criteria, with a reason; a rating is a judgement, never a mark.
- Prefer the measure that decides the biggest question for the least.
:::

:::note Extra · go deeper (optional reading)
When ethics are only looked at after scaling, every answer is expensive: the system is built, people rely on it, and changing it means breaking promises. The same question asked at the concept stage costs a conversation.
:::

^src: Cooper 1990 · Gibbons 2018

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards, led by the facilitator. Level 3 in the Chief Experience Officer's chair: a guiding vision for future-proof UX, three strategic decisions, what continues, pauses or ends, a risk analysis, a governance model, one decision under uncertainty and a statement to the management. The cards give you the ideas you use in Task 2.
:::

## B1 · Future-proof UX as a responsible innovation and decision architecture · 20 min · Core

> At senior level, future-proof UX is a responsible innovation and decision architecture: a guiding vision of the innovation and responsibility wanted, one evaluation grid with comparable evidence, gates from prototype to pilot to scale with ethics built in, and a portfolio reviewed regularly. Experiments become a future when each one ends in a decision.

:::box In plain words
**The idea.** At senior level, future-proof UX is a responsible innovation and decision architecture: a guiding vision of the innovation and responsibility the company wants, one evaluation grid with comparable evidence, gates from prototype to pilot to scale with ethics built in, and a portfolio reviewed regularly. A steerable future architecture grows out of experiments, pilots and research when each one ends in a decision, not in a demo.
**Why it matters.** Block 3.1 asks for a guiding vision for future-proof UX, three decisions on prototyping, testing, scaling, ethics and portfolio, and what continues, pauses or ends. You decide the architecture, not single technologies.
**How to read the picture.** Left Fernwood collecting experiments, right running a steerable future architecture. Below, the layers from a guiding vision to every pilot.
:::

![Fernwood collecting experiments, or running a steerable future architecture.](_figures/d16_B1_0.png)

![The layers of a responsible innovation architecture, from a guiding vision to every pilot.](_figures/d16_B1_1.png)

:::note Closing question of the course · talk it through
What makes a UX strategy sustainable in the long run? A starting point from this card: a vision that outlives single technologies, decisions made on comparable evidence, responsibility built in before scaling, and the courage to pause or stop.
:::

:::note Case assumption
Fernwood, Leila, Sam, Rafael and Greta are made up for this example; the corridor and the reports are drawn for the lesson. Responsible innovation follows Stilgoe, Owen and Macnaghten (2013); gates follow Cooper (1990).
:::

:::rules How to decide when this comes up in the task
- Write a guiding vision: what innovation, for whom, and what responsibility.
- Use one evaluation grid for every prototype and pilot.
- Put an ethics gate before every pilot and every step to scale.
- Keep a focused portfolio and review it every quarter.
- Tell operational decisions (one pilot) from strategic ones (portfolio, governance, market position).
:::

:::note Extra · go deeper (optional reading)
A future project is strategically connected when it would still matter if the technology changed: when it serves a lasting need of customers or staff. If it only matters because the technology is new, it is symbolic innovation, and it will age with the technology.
:::

^src: Stilgoe, Owen & Macnaghten 2013 · Cooper 1990

## B2 · Innovation pressure, ethics, economics, value, maturity, portfolio: the conflicts · 20 min · Core

> Future-proof UX sits between innovation pressure and maturity, ethics and speed, economic viability and a pioneer role, user value and visibility, the next quarter and the long-term portfolio. More active lines bring more visibility and less learning per line. A good portfolio states which conflicts it accepts and writes down what each line assumes.

:::box In plain words
**The idea.** Future-proof UX sits between goals that pull apart: innovation pressure against maturity, ethics against speed, economic viability against the pioneer role, user value against visibility, and the next quarter against the long-term portfolio. More active lines bring more visibility and less learning per line; fewer lines bring focus and the risk of missing something. A good portfolio states which conflicts it accepts, and writes down what each line assumes.
**Why it matters.** Block 3.1 asks for three decisions, a risk analysis of wrong assumptions about future technologies, market maturity, user acceptance and governance, and a governance model for conflicts. Each is a decision between conflicting goals.
**How to read the picture.** A slider for how many lines Fernwood runs at once, from one to five.
:::

![How many lines Fernwood runs at once, and what is gained and lost · Exploratory.](_figures/d16_B2_0.png)

**Standing conflicts of future-proof UX**

| Conflict | Who usually stands for each side | What to ask |
|---|---|---|
| Innovation pressure against maturity | Management and innovation, against product and IT. | Which rung is it really on? |
| Ethics against speed | Data protection and works council, against the launch date. | What would we regret if it went wrong at scale? |
| Pioneer role against economic viability | Strategy, against finance. | What is the smallest step that keeps us ahead? |
| Short-term signal against long-term portfolio | Marketing, against the portfolio owner. | Will this still matter when the technology changes? |

:::note Case assumption
Fernwood, Leila, Sam, Rafael and Greta are made up for this example; the corridor and the reports are drawn for the lesson. The lines and their trade-offs are a reading of the example, not a rule for every company.
:::

:::rules How to decide when this comes up in the task
- Name each conflict as two goals and say who stands for each: management, innovation, IT, departments, data protection, users.
- Decide how many lines can be tested properly at once.
- Write down what each line assumes about technology, market, acceptance and governance.
- Check which lines fall under stricter rules, such as AI that recognises emotions.
- Say what the choice gives up.
:::

:::note Extra · go deeper (optional reading)
Stopping an innovation is the better leadership decision when continuing it would teach nothing new, cost trust, or keep people from work that matters more. The sign of a mature portfolio is not how much it starts, but how calmly it stops.
:::

^src: European Commission, AI Act · Stilgoe, Owen & Macnaghten 2013

## B3 · Who decides to scale, pause or stop, and deciding with incomplete data · 20 min · Core

> Scaling needs owners: someone who owns the evaluation grid, an ethics and data protection review that approves before a pilot and before scaling and may stop anything, a board that decides at each gate to scale, test further, pause or stop, and a regular portfolio review. With incomplete data, a decision says what it decides, does not know, would reverse and gives up.

:::box In plain words
**The idea.** Scaling needs owners: someone who owns the evaluation grid and scores every initiative, an ethics and data protection review that approves before a pilot and before scaling and may stop anything, a board that decides at each gate to scale, test further, pause or stop, and a regular portfolio review. With incomplete data, a decision says what it decides, what it does not know, when it would reverse and what it gives up.
**Why it matters.** Block 3.1 asks for a governance model for innovation evaluation, ethical approvals, scaling decisions and portfolio adjustments, a decision despite incomplete data, and a statement to the management. This card gives you the parts of each.
**How to read the picture.** The four boxes at the top are the parts of a decision, filled in for Fernwood. The two boxes below are the rule for future decisions.
:::

![A decision under uncertainty, filled in for Fernwood.](_figures/d16_B3_0.png)

**Four responsibilities of innovation governance**

| Responsibility | The question | An example (Fernwood) |
|---|---|---|
| Innovation evaluation | Who scores every initiative on one grid? | The head of guest experience and a small team. |
| Ethical approval | Who says yes before a pilot and before scaling, and may stop? | An ethics and data review with the data protection officer. |
| Scaling decision | Who decides scale, test further, pause or stop at each gate? | An innovation board. |
| Portfolio adjustment | Who reviews the whole portfolio, and how often? | The board, every quarter, at most three active lines. |

:::note Case assumption
Fernwood, Leila, Sam, Rafael and Greta are made up for this example; the corridor and the reports are drawn for the lesson. Monitoring after launch follows the European Commission's summary of the AI Act; deciding with limited information follows Simon (1956); the premortem follows Klein (2007).
:::

:::rules How to decide when this comes up in the task
- Name who owns the grid and scores every initiative.
- Name who approves ethically and may stop, including data protection and employee representatives.
- Name who decides at each gate, and how often the portfolio is reviewed.
- Settle conflicts by rights and safety first, then proven value, then cost, then visibility; say who settles a tie.
- Say what you decide, what you do not know, when you would reverse it and what you give up.
:::

:::note Extra · go deeper (optional reading)
Write the stop criteria before the pilot starts, when nobody is attached to it yet. The person who may stop an initiative should not be the person whose bonus depends on it.
:::

^src: European Commission, AI Act · Simon 1956 · Klein 2007
