---
doc: materi
day: 14
kicker: DAY 14 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Immersive technologies and neuroscientific UX basics
subtitle: Study material with real research, worked examples and the rules you use in the tasks
daytitle: Day 14 · Module 7 (day 1 of 3): Immersive technologies and neuroscientific UX basics
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use a made-up company in each card. The task case is IndustryXR (see the Task document).
intro: Today is about interfaces that leave the screen: augmented, virtual and mixed reality, spatial and sensory interaction. You learn what each technology is, what immersion does to attention and cognitive load, where it intensifies an experience and where it overwhelms, how to tell real user value from fascination, and which ethical questions come with it. Then you use it on three platforms, including a real 3D machine with AR overlays you can turn (and, on a phone, place in your room), and you look at what a headset maker and a government service manual advise. This document holds everything you need to study Day 14 without the website. Every card says what the idea is in plain words, shows it in a picture, gives the details and ends with the rules you use in the tasks.
glossary: immersion,maturity,attention,ux,case-assumption,governance,presence,stage-gate,perception,decision-arch,working-memory,overstimulation,adaptive,cybersickness,cog-load,neuro-ux,scan,dark-pattern,ar,vr,mr,touchpoint,cxo,contrast,embodiment
refs: milgram1994,slater2016,lavie2005,rebenitsch2016,govuk2026,apple2026,gibbons2018,simon1956,klein2007
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. Levels 1 and 2: analyse the chances and risks of an AR service platform, rate three innovation approaches for a health platform under conflicting goals, then analyse an industrial company's immersive plans, develop four measures, justify them and decide on the first 16 weeks. The cards give you the ideas and the rules you use in Task 1.
:::

## A1 · From screen to space: AR, VR, MR and other future interfaces · 12 min · Core

> Classic interfaces are flat; immersive ones put content into space. AR lays information over the real world, VR replaces it, MR lets digital objects sit in the real room. Spatial interfaces, sensory interaction and context-adaptive systems add depth, touch, sound and situation. Each solves different problems at different cost and maturity.

:::box In plain words
**The idea.** Classic interfaces are flat: a screen you look at. Immersive interfaces put content into space. Augmented reality (AR) lays digital information over the real world; virtual reality (VR) replaces the world with a digital one; mixed reality (MR) lets digital objects sit in and react to the real room. Spatial interfaces use position and depth, sensory interaction adds touch, sound or gesture, and context-adaptive systems change with the situation. Each solves different problems, at different cost and maturity.
**Why it matters.** Block 1.1 asks what BuildVision's AR overlays and spatial visualisation add, Block 1.2 rates HealthSpace's AR and VR designs, and Block 2.1 asks which of IndustryXR's ideas offer real immersive value. This card tells the technologies apart.
**How to read the picture.** A real 3D Brewline coffee machine you can turn: as a flat picture, as a 3D object, and with AR labels anchored to its parts. On a phone, “View in your space” places it on your table.
:::

![The Brewline coffee machine as a flat manual, as a 3D object and with AR labels · real 3D. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d14_A1_0.png)

**Future interfaces and what they are good for**

| Technology | What it does | Good for | Needs |
|---|---|---|---|
| Augmented reality (AR) | Lays information over the real world. | Help at an object; seeing if something fits. | A phone or glasses, light, a stable view. |
| Virtual reality (VR) | Replaces the world with a digital one. | Practice without risk; places you cannot visit. | A headset, space, short sessions. |
| Mixed reality (MR) | Digital objects in and reacting to the real room. | Planning in place; working on a virtual object. | Advanced headsets; mapping of the room. |
| Spatial interfaces | Use position and depth. | Seeing structure and order. | 3D content. |
| Sensory interaction | Touch, sound, gesture. | Hands-busy work; feedback without looking. | Sensors; careful design. |
| Context-adaptive systems | Change with the situation. | The right help at the right moment. | Good data about the situation. |

:::note Case assumption
Brewline, Zara, Edgar, Kim and Ruth are made up for this example; the 3D machine is a generic model. The continuum from the real world through AR to VR follows Milgram and Kishino (1994).
:::

:::rules How to decide when this comes up in the task
- Say which technology a proposal means: AR, VR, MR, spatial, sensory or context-adaptive.
- Ask what it adds over a flat screen for this task: place, depth, hands-free, practice without risk.
- Ask what it needs: devices, light, network, space, content.
- Remember that AR keeps people in their world; VR takes them out of it.
- Treat “the metaverse” as a word, not a plan: ask for the task.
:::

:::note Extra · go deeper (optional reading)
Flat and spatial are not better and worse; they are good at different things. A list of steps is faster to scan on a flat screen; the place of a part is faster to find in space. Most good immersive products combine both: the step in a calm panel, the place on the object.
:::

^src: Milgram & Kishino 1994 · Slater & Sanchez-Vives 2016

## A2 · Presence, attention and load: what the brain does in immersive space · 12 min · Core

> Immersion creates presence: the feeling of being there, with space, attention, the body and several senses involved. The brain's limits stay: attention is narrow, working memory small, and under stress people follow the most visible cue. Good immersive design steers perception, keeps load low and supports decisions.

:::box In plain words
**The idea.** In immersive space people feel present: they are “there”. Space, presence, attention, embodiment (using the body) and several senses at once make experiences intense. The brain's limits stay the same: attention is narrow, working memory small, and every overlay, sound and movement competes for it. Good immersive design steers perception (what people notice first), keeps cognitive load low, and remembers that decisions under stress follow the most visible cue, not the most important one.
**Why it matters.** Block 1.1 asks why BuildVision's users are impressed but overwhelmed in stressful situations, Block 1.2 about acceptance of immersive formats, and Block 2.1 about IndustryXR's attention steering and overload risks. This card explains what immersion does to attention and load.
**How to read the picture.** The same Brewline machine with two AR labels, with nine, and with nine plus movement and sound cues.
:::

![The Brewline machine with two labels, nine labels, and nine moving labels · Exploratory.](_figures/d14_A2_0.png)

**Neuroscience basics, and what they mean in immersive space**

| Basic | What it means | For immersive design |
|---|---|---|
| Attention | Only a little can be attended to at once. | One focus per step; quiet everything else. |
| Cognitive load | Working memory fills up fast. | Show, don't make people remember; short steps. |
| Perception steering | Contrast, movement, sound and position decide what is noticed. | Make the important thing the most noticeable. |
| Stimulus processing | More stimuli, more effort; some people are more sensitive. | Fewer stimuli; a calm option. |
| Decision behaviour | Under stress, people take the most available cue. | Make the right action the obvious one. |

:::note Case assumption
Brewline, Zara, Edgar, Kim and Ruth are made up for this example; the 3D machine is a generic model. Presence follows Slater and Sanchez-Vives (2016); selective attention under load follows Lavie (2005).
:::

:::rules How to decide when this comes up in the task
- Count what competes for attention in the scene: labels, sounds, movement.
- Show only what the person needs for this step.
- Use movement and sound sparingly: they capture attention whether people want it or not.
- Design the most important cue to be the most visible one.
- Test in the stressful moment, when attention narrows most.
:::

:::note Extra · go deeper (optional reading)
Presence is double-edged. The feeling of being there is what makes VR training memorable, and it is also why a badly designed scene can feel threatening or exhausting. The same intensity that teaches a safety procedure can overwhelm someone who is already anxious.
:::

^src: Slater & Sanchez-Vives 2016 · Lavie 2005

## A3 · Intensify or overwhelm: the chances and risks of immersive UX · 12 min · Core

> Immersive UX can intensify experiences or overwhelm people. Chances: better visualisation, support in the situation, training, experiencing complex content, new interaction. Risks: stimulus overload, disorientation, low acceptance, technical hurdles and high implementation effort. The same feature can help in calm and hurt in stress.

:::box In plain words
**The idea.** Immersive technology can intensify an experience or overwhelm it. Its chances: better visualisation (seeing inside a machine), support in the situation (help at the object), training (practising without risk), experiencing complex content (a building before it is built), and new forms of interaction. Its risks: stimulus overload, disorientation, low acceptance, technical hurdles (devices, connection, light, noise) and high implementation effort. The same feature can be a help in a quiet room and a burden in a stressful moment.
**Why it matters.** Block 1.1 asks for BuildVision's chances and risks and its two biggest of each, Block 1.2 for HealthSpace's risks, and Block 2.1 for IndustryXR's central chances and risks. This card gives you both lists by name.
**How to read the picture.** The Brewline descaling guide in AR, once on a quiet Sunday and once with a crying child, a beeping machine and a weak connection.
:::

![The Brewline AR descaling guide in a calm and a stressful moment. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d14_A3_0.png)

**Chances and risks of immersive UX**

| Chance | Example (Brewline) | Risk | What it looks like |
|---|---|---|---|
| Better visualisation | See inside the machine. | Stimulus overload | Nine labels and an advert. |
| Support in the situation | The descaling step on the tank. | Disorientation | Labels that drift with a weak signal. |
| Training | Café staff practise milk foam in VR. | Low acceptance | Edgar will not use AR at all. |
| Experiencing complex content | How the brewing unit works. | Technical hurdles | Steam, bad light, old phones. |
| New interaction | Ask the machine with your hands full. | High effort | Content for every model, every update. |

:::note Case assumption
Brewline, Zara, Edgar, Kim and Ruth are made up for this example; the 3D machine is a generic model. Motion sickness in VR follows Rebenitsch and Owen (2016).
:::

:::rules How to decide when this comes up in the task
- Name the chance: what does immersion make possible that a screen does not?
- Name the risk next to it: overload, disorientation, acceptance, technology, effort.
- Picture the worst realistic moment of use: noise, gloves, time pressure, bad light, no network.
- Ask who will not or cannot use it: older users, people prone to motion sickness, people without the device.
- Count the effort beyond the demo: devices, content, updates, support.
:::

:::note Extra · go deeper (optional reading)
Users are often impressed in the first test and overwhelmed in the third week. The first test measures novelty; daily use measures value. A pilot that ends after the wow phase has not tested anything that matters for an investment decision.
:::

^src: Rebenitsch & Owen 2016 · Lavie 2005

## A4 · Fascination or impact: user value, maturity and marketability · 12 min · Core

> A future technology is relevant only when it creates real value for users: it solves a real problem better than a classic interface. Four things decide together: the user's need, the innovation, its maturity in the real environment, and its marketability. Fascination is not a reason.

:::box In plain words
**The idea.** A future technology is relevant only when it creates real value for users: it solves a real problem better than a classic interface would. Four things decide together: the user's need, the innovation itself, its maturity (does it work reliably, in the real environment, for real users?) and its marketability (will people use it, can it be built and paid for at scale?). Fascination is not a reason; many impressive demos solve nothing.
**Why it matters.** Block 1.1 asks which of BuildVision's uses are helpful and which only demonstrative, Block 1.2 rates user value, maturity and economics, and Block 2.1 asks to prioritise IndustryXR's use cases by value and feasibility. This card gives you the test.
**How to read the picture.** Brewline's five ideas placed by user value and maturity. Below, the steps from an idea to a product in use.
:::

![Brewline's five ideas placed by user value and maturity.](_figures/d14_A4_0.png)

![From an idea to a product in use, and where most immersive projects stop.](_figures/d14_A4_1.png)

:::note Case assumption
Brewline, Zara, Edgar, Kim and Ruth are made up for this example; the 3D machine is a generic model. Reserving immersion for meaningful moments follows Apple's guidelines; reframing a solution as a problem follows the GOV.UK Service Manual.
:::

:::rules How to decide when this comes up in the task
- Name the user's problem first, then the technology.
- Compare with the classic solution: is the immersive one clearly better for this task?
- Judge maturity in the real environment, not in the lab.
- Ask whether people will use it and whether it can be built, run and paid for at scale.
- Leave out what only impresses.
:::

:::note Extra · go deeper (optional reading)
Demonstrative use cases are attractive because they are easy to show and hard to evaluate. A useful test: would a customer miss it if it disappeared next month? A descaling guide they used twice, yes; a trade-fair showroom they saw once, no.
:::

^src: GOV.UK Service Manual · Apple HIG

## A5 · Ethics and responsibility, and weighing a measure · 12 min · Core

> Immersive and neuro-based interfaces see more of people than screens: rooms, bodies, gaze. They can make people sick, exclude those without devices, and steer attention in the company's interest. Responsible leaders prioritise by effect, economics and responsibility, not fascination. Weigh measures on effect, feasibility, risk, time pressure and investment security.

:::box In plain words
**The idea.** Immersive and neuro-based interfaces raise their own ethical questions: cameras that scan homes and workplaces, data about where people look and how their body moves, motion sickness and exhaustion, exclusion of people who cannot use headsets, and attention steering that can slip into manipulation. Responsible leaders prioritise future technologies by effect, economics and responsibility, not by fascination. To put measures in order, weigh each on effect on users, feasibility, risk, time pressure and investment security.
**Why it matters.** Block 1.2 asks about trust and risk in health, and Block 2.1 asks for four prioritised measures for IndustryXR, justified on effect on users, feasibility, risk, time pressure and investment security. The example uses Brewline and its own measures, so the answer for the task cases is not given.
**How to read the picture.** Five ethical questions asked of three Brewline ideas. Then three measures rated on five criteria.
:::

![Five ethical questions asked of three Brewline ideas.](_figures/d14_A5_0.png)

![Brewline weighs three measures on effect on users, feasibility, risk, time pressure and investment security.](_figures/d14_A5_1.png)

:::note Case assumption
Brewline, Zara, Edgar, Kim and Ruth are made up for this example; the 3D machine is a generic model. Rating options on the same criteria follows Gibbons (2018); the five criteria are the ones the plan names for the case study.
:::

:::rules How to decide when this comes up in the task
- What does it record about people and their surroundings, and where does it go?
- Who is left out, and what do they use instead?
- Can it make people sick, tired or anxious?
- Does it steer attention for the user or for the company?
- Rate every measure on the same five criteria, with a reason; a rating is a judgement, never a mark.
:::

:::note Extra · go deeper (optional reading)
Neuro-informed design knows how attention works, which makes it powerful in both directions. The same knowledge that puts the right step in front of a technician can put an offer in front of a tired customer. The line between guidance and manipulation is whose interest the steering serves.
:::

^src: Rebenitsch & Owen 2016 · Gibbons 2018

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards, led by the facilitator. Level 3 in the Chief Experience Officer's chair: a guiding vision for future UX innovation, three strategic decisions, an order of what is piloted first, a risk analysis, a governance model, one decision under uncertainty and a statement to the management. The cards give you the ideas you use in Task 2.
:::

## B1 · Future technologies as decision architecture, not a trend · 20 min · Core

> At senior level future technologies are a decision architecture for innovation, service quality and differentiation: a guiding vision of the immersive value wanted, a portfolio that separates watching, piloting and scaling, one evaluation grid, and stage gates where pilots prove themselves. Innovation is managed like an investment.

:::box In plain words
**The idea.** At senior level, future technologies are not a trend to follow but a decision architecture for innovation, service quality and differentiation: a guiding vision of what immersive value the company wants, a portfolio that separates watching, piloting and scaling, an evaluation grid (value, maturity, effort, scaling potential, responsibility), and stage gates where a pilot must prove itself before it grows. Innovation is managed like an investment, not like a showcase.
**Why it matters.** Block 3.1 asks for a guiding vision for future UX innovation, three decisions on technology use, maturity assessment, user value and portfolio, and an order of which use cases, touchpoints or product areas are piloted first. You decide the architecture, not single trend technologies.
**How to read the picture.** Left Brewline chasing headsets to look innovative, right running an innovation portfolio with gates. Below, the layers from a guiding vision to every pilot.
:::

![Brewline chasing headsets to look innovative, or running an innovation portfolio with gates.](_figures/d14_B1_0.png)

![The layers of an innovation architecture, from a guiding vision to every pilot.](_figures/d14_B1_1.png)

:::note Case assumption
Brewline, Zara, Edgar, Kim and Ruth are made up for this example; the 3D machine is a generic model. Discovery, alpha and the decision to go on or stop follow the GOV.UK Service Manual.
:::

:::rules How to decide when this comes up in the task
- Check how future technologies are decided today: by enthusiasm, or by a grid?
- Write a guiding vision: what immersive value, for whom, and what is not done for show.
- Separate watching, piloting and scaling in one portfolio.
- Use one evaluation grid: value, maturity, effort, scaling, responsibility.
- Put a gate before every step up: measures set in advance, a date to decide.
:::

:::note Extra · go deeper (optional reading)
Innovation labs often produce demos rather than products, because a demo is the end of their task. A portfolio changes the task: the lab's job is to produce evidence for a decision, and a stopped pilot with clear evidence is a success.
:::

^src: GOV.UK Service Manual · Apple HIG

## B2 · Innovation, value, maturity, risk, ethics: the conflicts of the future · 20 min · Core

> Future technologies sit between the degree of innovation and user value, visibility and maturity, investment risk and the risk of falling behind, ethics and speed, and feasibility. A portfolio of a few bets of different size, each with a reason, measures set in advance and a decision date, makes the conflicts manageable; write down what each bet assumes.

:::box In plain words
**The idea.** Future technologies sit between goals that pull apart: the degree of innovation against user value, visibility against maturity, investment risk against the risk of falling behind, ethics against speed, and all of them against feasibility. The way through is a portfolio: a few bets of different size and maturity, each with a reason, success measures set in advance, and a date to decide whether to scale, change or stop; and a written list of the assumptions each bet rests on.
**Why it matters.** Block 3.1 asks for three decisions, a risk analysis of wrong assumptions about innovation, user behaviour, market maturity and economics, and a governance model for conflicts between visibility, effect, risk and effort. Each is a decision between conflicting goals.
**How to read the picture.** Brewline's three bets, a safe one, a medium one and a bold one, with what each costs and what it can teach.
:::

![Brewline's three bets: safe, medium and bold · Exploratory.](_figures/d14_B2_0.png)

**Standing conflicts of future technologies**

| Conflict | Who usually stands for each side | What to ask |
|---|---|---|
| Innovation against user value | The board and the lab, against users and service. | Which user problem does it solve better? |
| Visibility against maturity | Marketing, against engineering. | Does it work in the real environment, at scale? |
| Investment risk against falling behind | Finance, against strategy. | What is the smallest bet that teaches us enough? |
| Ethics against speed | Data protection and safety, against the launch date. | What does it record, and who could be harmed? |

:::note Case assumption
Brewline, Zara, Edgar, Kim and Ruth are made up for this example; the 3D machine is a generic model. The bets are a reading of the example, not a rule for every company.
:::

:::rules How to decide when this comes up in the task
- Name each conflict as two goals and say who stands for each: board, units, safety, finance, users.
- Hold a few bets of different size: safe, medium, bold.
- Write down the assumptions each bet rests on: innovation, user behaviour, market maturity, economics.
- Set the measures and the decision date before the pilot starts.
- Say what the choice gives up.
:::

:::note Extra · go deeper (optional reading)
A future technology becomes a reputational risk when it is launched as a promise and experienced as a gimmick: when the headline outruns the product. The safest way to protect reputation is to let the evidence lead the announcement, not the other way round.
:::

^src: GOV.UK Service Manual · Slater & Sanchez-Vives 2016

## B3 · Who decides on future technologies, and deciding without test data · 20 min · Core

> Future technologies need an owner of the portfolio, one evaluation grid for every idea, stage gates with measures set before a pilot, the right to stop a pilot (not a failure), and a rule for when visibility, effect, risk and effort disagree. With patchy tests, a decision says what it decides, does not know, would reverse and gives up.

:::box In plain words
**The idea.** Future technologies need owners and gates: someone who owns the innovation portfolio, an evaluation grid used for every idea, stage gates with success measures set before a pilot starts, the right to stop a pilot (it is not a failure), and a rule for when visibility, effect, risk and effort disagree. Real test data is usually missing at the start; a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up.
**Why it matters.** Block 3.1 asks for a governance model for future technologies in the UX portfolio, a decision despite missing tests, and a statement to the management. This card gives you the parts of each.
**How to read the picture.** The four boxes at the top are the parts of a decision, filled in for Brewline. The two boxes below are the rule for future decisions.
:::

![A decision under uncertainty, filled in for Brewline.](_figures/d14_B3_0.png)

**Four parts of innovation governance**

| Part | The question | An example (Brewline) |
|---|---|---|
| Owner and grid | Who owns the portfolio; how is every idea scored? | The head of UX; value, maturity, effort, scaling, responsibility. |
| Gates | What must a pilot show before it grows? | Use, completion, support calls, cost, by a set date. |
| Stop right | Who may stop a pilot? | The innovation board; product safety at any time. |
| How a conflict is decided | What happens when visibility, effect, risk and effort disagree? | Safety, then proven value, then effort, then visibility; the board settles a tie. |

:::note Case assumption
Brewline, Zara, Edgar, Kim and Ruth are made up for this example; the 3D machine is a generic model. “It's not a failure to stop” follows the GOV.UK Service Manual; deciding with limited information follows Simon (1956); the premortem follows Klein (2007).
:::

:::rules How to decide when this comes up in the task
- Name who owns the innovation portfolio and the grid.
- Set the measures and the decision date before every pilot.
- Give a board the right to scale, change or stop, and safety the right to stop.
- Settle conflicts by safety first, then proven value, then effort, then visibility; say who settles a tie.
- Say what you decide, what you do not know, when you would reverse it and what you give up.
:::

:::note Extra · go deeper (optional reading)
The most expensive innovation decisions are the ones nobody made: pilots that were never stopped and never scaled, kept alive by goodwill. A gate with a date forces the decision. Write the stop criteria down before the pilot starts, when nobody is attached to it yet.
:::

^src: GOV.UK Service Manual · Simon 1956 · Klein 2007
