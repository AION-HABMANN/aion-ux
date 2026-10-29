---
doc: materi
day: 6
kicker: DAY 6 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Gestalt, hierarchy, progressive disclosure and design systems
subtitle: Study material with real research, worked examples and the rules you use in the tasks
daytitle: Day 6 · Module 3 (day 3 of 3): Gestalt, hierarchy, progressive disclosure and design systems
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use a made-up company in each card. The task case is CitizenFlow (see the Task document).
intro: Today is about how a screen is organised and how that organisation is kept across a whole product. You learn the Gestalt laws that make people see groups (proximity, similarity, continuity, closure, figure and ground, common region), how a visual hierarchy steers attention and action, how progressive disclosure shows only what matters in the current step without hiding what people need, and why these principles belong in components, patterns and a design system rather than in single screens. Then you use them on three products. This document holds everything you need to study Day 6 without the website. Every card says what the idea is in plain words, shows it in a picture, gives the details and ends with the rules you use in the tasks.
glossary: component,hierarchy,design-logic,consistency,ux,governance,primary-action,grouping,design-system,case-assumption,common-region,ux-law,proximity,gestalt,progressive,similarity,primary-secondary,attention,neuro-ux,page-type,problematic-hiding,orientation,cog-load,continuity,closure,figure-ground,predictability,cxo,visual-guidance,readability,status-colour,expectation,reachability
refs: wertheimer1923,palmer1992,wagemans2012,ware2012,krug2014,nielsen1994,nielsen2006,sweller1988,iso9241110,frost2016,kholmatova2017,gibbons2018,curtis2010,simon1956,klein2007
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. Levels 1 and 2: find what makes an unfamiliar administration portal hard to navigate, rate three structures for a service platform under conflicting goals, then analyse a public self-service platform, develop four measures, justify them and decide on the first 14 weeks. The cards give you the ideas and the rules you use in Task 1.
:::

## A1 · Gestalt laws for navigation: how people see groups and paths · 12 min · Core

> People see groups, not pieces: what is close, alike, on one line, almost closed, standing out or inside one frame belongs together. Layouts that follow these laws let people group, tell apart and navigate at a glance.

:::box In plain words
**The idea.** People do not see a screen as separate pieces; they see groups. Things close together belong together (proximity). Things that look alike belong together (similarity). Things on one line or curve are followed as a path (continuity). An almost closed shape is seen as closed (closure). One thing stands out from a background (figure and ground). Things inside one frame or area belong together (common region). A layout that follows these laws lets people group, tell apart and navigate in a glance; one that breaks them makes related things look unrelated.
**Why it matters.** Block 1.1 asks about OfficeSphere's information without visual grouping and its similar functions that look unrelated, and Block 2.1 asks about CitizenFlow's page types that group content differently. This card gives you the six laws to name what you see.
**How to read the picture.** One Seabird Ferries page with three switches: proximity, similarity and common region.
:::

![A Seabird Ferries page: proximity, similarity and common region. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d6_A1_0.png)

**Six Gestalt laws in the interface**

| Law | What people see | Used in an interface |
|---|---|---|
| Proximity | Close things belong together. | Spacing between groups larger than within them. |
| Similarity | Alike things belong together. | All links of one kind in one style. |
| Continuity | Things on one line form a path. | Steps of a process on one line. |
| Closure | An almost closed shape is seen as closed. | Cards and sections without full borders still read as units. |
| Figure and ground | One thing stands out from the rest. | A dialog over a dimmed page. |
| Common region | Things in one frame belong together. | A framed section with a heading. |

:::note Case assumption
Seabird Ferries, Elif, Noah, Greta and Malte are made up for this example. The grouping laws follow Wertheimer (1923) and the review by Wagemans et al. (2012); common region follows Palmer (1992).
:::

:::rules How to decide when this comes up in the task
- Ask which elements belong together in meaning, and check whether they also look as if they belong together.
- Proximity first: put related things close and unrelated things apart; spacing alone does much of the work.
- Similarity: give elements of one kind one look, and elements of another kind a different one.
- Common region: a frame or a background area turns scattered elements into a group.
- Similar functions designed differently are not seen as related: make them look alike.
:::

:::note Extra · go deeper (optional reading)
When the laws disagree, the stronger one wins. Palmer (1992) showed that a common region can override proximity: two dots far apart inside one frame are grouped, two close dots in different frames are not. In an interface this means a frame or background can rescue a layout where spacing alone does not work, and can also break one when it groups the wrong things.
:::

^src: Wertheimer 1923 · Palmer 1992 · Wagemans et al. 2012

## A2 · Visual hierarchy: attention, priority and the next action · 12 min · Core

> A visual hierarchy is an order of importance the eye can follow. It steers attention, priority and the next action. Arranging elements side by side is not steering: decide what comes first and make it look first.

:::box In plain words
**The idea.** A visual hierarchy is an order of importance the eye can follow: the most important thing is the strongest, the next is weaker, and the rest is quiet. It steers attention, sets priority and shows the next action. The key difference is between primary actions (the one thing most people should do now) and secondary actions (other things they might do). Simply arranging elements side by side is not the same as steering navigation: steering means deciding what comes first and making it look first.
**Why it matters.** Block 1.1 asks about OfficeSphere's primary and secondary actions that look equally strong and its competing notices, Block 1.2 asks you to rate CareAssist on orientation and navigation clarity, and Block 2.1 asks about CitizenFlow's unseparated actions and unprioritised help and warnings. This card gives you the order and the primary-secondary distinction.
**How to read the picture.** The same Seabird Ferries booking step twice: every element equally strong, and a clear hierarchy with one primary action.
:::

![The same Seabird booking step: every element equally strong, and a clear hierarchy. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d6_A2_0.png)

**Levels of a visual hierarchy on one step**

| Level | What belongs there | How it looks |
|---|---|---|
| 1 · The primary action | The one thing most people should do now. | The strongest element: size, colour, position. |
| 2 · The content of the step | What the person needs to decide. | Clear headings and readable text. |
| 3 · Secondary actions | Other things they might do. | Quiet links or outlined buttons. |
| 4 · Notices and offers | Information that helps but is not the task. | Smaller, calmer; warnings only for real risks. |

:::note Case assumption
Seabird Ferries, Elif, Noah, Greta and Malte are made up for this example. What pops out and guides the eye follows Ware (2012); a clear visual hierarchy follows Krug (2014).
:::

:::rules How to decide when this comes up in the task
- Find the one primary action of each step and make it the strongest element.
- Make secondary actions clearly quieter: a link or an outlined button, not a second strong button.
- Give notices, warnings and help a level below the task, unless they are a real risk.
- Check that notices, status displays and navigation do not compete for the same strength.
- If several elements are equally strong, the page has no hierarchy, whatever its layout.
:::

:::note Extra · go deeper (optional reading)
A quick test for hierarchy: squint at the screen, or blur a screenshot. What remains visible is what the eye sees first. If it is the offer banner and not the primary action, the hierarchy steers attention away from the task.
:::

^src: Ware 2012 · Krug 2014 · Nielsen 1994

## A3 · Progressive disclosure: helpful reduction, not hiding · 12 min · Core

> Progressive disclosure shows what is relevant now and keeps the rest one clear step away; it lowers the load. When information people need to decide is buried too deep, reduction has become hiding.

:::box In plain words
**The idea.** Progressive disclosure means showing only what is relevant in the current step and revealing the rest when it is needed. It lowers cognitive load: a form asks only the questions that apply, and details sit one clearly labelled step away. But there is a line between helpful reduction and problematic hiding. When information people need to decide (a condition, a fee, a deadline) is buried too deep, the screen is calm and the decision is unsafe.
**Why it matters.** Block 1.1 asks about OfficeSphere's forms that show every field at once, Block 1.2 asks you to judge CareAssist's three structures, one of which hides context too deep, and Block 2.1 asks about CitizenFlow's forms and its help that is not disclosed in context. This card gives you the principle and its limit.
**How to read the picture.** One Seabird Ferries booking form in three forms: every field at once, disclosed step by step, and reduced so far that the luggage rules are hidden.
:::

![One Seabird booking form: every field at once, step by step, and hidden too deep. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d6_A3_0.png)

**Helpful reduction and problematic hiding**

| Aspect | Helpful reduction | Problematic hiding |
|---|---|---|
| What is hidden | What does not apply now. | What people need to decide. |
| How it is reached | One clearly labelled step. | Several levels deep, or only in help pages. |
| The effect | Less load, the same safety. | Less load at first sight, unsafe decisions. |

:::note Case assumption
Seabird Ferries, Elif, Noah, Greta and Malte are made up for this example. Progressive disclosure follows Nielsen (2006); cognitive load follows Sweller (1988).
:::

:::rules How to decide when this comes up in the task
- For a form, ask which fields apply to everyone and which only in special cases; show the special ones only when they apply.
- Split long processes into a few steps and show where the person is.
- Keep the rest reachable in one clearly labelled step: “Add a vehicle”, “Show details”.
- Never hide what people need to decide (a condition, a fee, a deadline): show it next to the choice it affects.
- Check the line: is a hidden item something people rarely need, or something they need and miss?
:::

:::note Extra · go deeper (optional reading)
Progressive disclosure has a cost that grows with each level: people have to know or guess that more exists. Nielsen (2006) advises keeping it to one, at most two levels, and making the step to the second level obvious. A third level of disclosure is usually a sign that the first level holds the wrong things.
:::

^src: Nielsen 2006 · Sweller 1988 · Krug 2014

## A4 · Hierarchy, navigation logic and relief: one pattern for one task · 12 min · Core

> When pages of one type are grouped the same way, the primary action sits in the same place and similar tasks follow the same steps, people learn once and predict. Inconsistent patterns undermine predictability.

:::box In plain words
**The idea.** Visual hierarchy, navigation logic and cognitive relief belong together. When every page of the same type is grouped the same way, the primary action is always in the same place and similar tasks follow the same steps, people learn once and then predict. Each new pattern for a similar task costs them a fresh orientation. Inconsistent patterns across areas undermine predictability even when each single page is well designed.
**Why it matters.** Block 1.1 asks about OfficeSphere's different patterns for similar tasks, and Block 2.1 asks about CitizenFlow's navigation patterns that vary between similar areas. This card gives you the link between consistency and relief.
**How to read the picture.** Two Seabird Ferries areas, tickets and freight, built with different patterns and with the same pattern.
:::

![Two Seabird areas, tickets and freight, with different patterns and with the same pattern. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d6_A4_0.png)

**What consistency means on three levels**

| Level | Consistent when | A sign it is missing |
|---|---|---|
| The page type | Every page of one type is grouped the same way. | Two service pages, two layouts. |
| The action | The primary action is always in the same place. | Continue at the bottom here, Next at the top there. |
| The task | Similar tasks follow the same steps. | Booking a ticket and booking freight work differently. |

:::note Case assumption
Seabird Ferries, Elif, Noah, Greta and Malte are made up for this example. Consistency and standards is Nielsen's heuristic (1994); conformity with user expectations is an interaction principle of ISO 9241-110.
:::

:::rules How to decide when this comes up in the task
- List the similar tasks in different areas and check whether they follow the same pattern.
- Check that each page type groups its content the same way, wherever it appears.
- Keep the primary action in the same place for the same kind of step.
- A well-designed page with its own pattern still costs users a fresh orientation.
- Visual hierarchy, navigation logic and cognitive relief belong together: order on each page and the same order across pages.
:::

:::note Extra · go deeper (optional reading)
Inconsistency usually grows from good intentions: each team improves its own area, and the improvements differ. That is why consistency is rarely fixed on the screen; it is fixed where the patterns come from, which is the subject of the next card and of Materi B.
:::

^src: Nielsen 1994 · Krug 2014 · ISO 9241-110

## A5 · From screens to components: UX laws in a design system, and weighing a measure · 12 min · Core

> UX laws belong in components, patterns and standards, not only in single screens; built in once, they hold everywhere. Weigh measures on effect on users, feasibility, risk and time pressure, with a reason.

:::box In plain words
**The idea.** UX laws are not only for single screens. When they are built into components (a form that discloses step by step, a primary button, a status label), patterns (how a page type is grouped) and standards (minimum sizes, one primary action per step), every screen built from them follows the laws automatically. A design system is that set of components, patterns and standards. To put measures in order, weigh each on the four questions Block 2.1 names: effect on users, feasibility, risk and time pressure.
**Why it matters.** Block 1.2 asks for a decision between three structures, and Block 2.1 asks for four measures, one of which can anchor the others in a design system, their justification on these four criteria and a decision for 14 weeks. The example uses Seabird Ferries and its own measures, so the answer for the task cases is not given.
**How to read the picture.** First the chain from a UX law to the screens built from it. Then three measures Seabird considered, rated on effect on users, feasibility, risk and time pressure.
:::

![From a UX law to every screen built from it.](_figures/d6_A5_0.png)

![Seabird weighs three measures on effect on users, feasibility, risk and time pressure.](_figures/d6_A5_1.png)

:::note Case assumption
Seabird Ferries, Elif, Noah, Greta and Malte are made up for this example. Building interfaces from shared components follows Frost (2016) and Kholmatova (2017); rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study.
:::

:::rules How to decide when this comes up in the task
- For each fix, ask whether it can live in a component or a pattern, so every screen gets it.
- Evaluate a design system by whether its components carry the laws: grouping, hierarchy, disclosure, one primary action.
- Rate every measure on the same four questions: effect on users, feasibility, risk, time pressure.
- A quick fix on a page and a shared component can both be right; the component keeps the quick fixes from drifting.
- A rating is a judgement with a reason, never a mark.
:::

:::note Extra · go deeper (optional reading)
Evaluating a design system against the UX laws is a simple audit: take each component and ask whether it groups, ranks and discloses as the principles say. A button component that allows three equally strong buttons side by side, or a form component that cannot hide fields, will reproduce the problem on every screen that uses it.
:::

^src: Frost 2016 · Kholmatova 2017 · Gibbons 2018

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards, led by the facilitator. Level 3 in the Chief Experience Officer's chair: a guiding vision for systemic user guidance, three strategic decisions, an order of what is standardised first, a risk analysis, a governance model for the design system, one decision under uncertainty and a statement to the management. The cards give you the ideas you use in Task 2.
:::

## B1 · Design systems for consistency, scale and steering · 20 min · Core

> A design system is a shared set of principles, components and patterns every team builds from. It gives consistency, scale and steering; leaders use it to turn UX principles into system logic, standards and governance.

:::box In plain words
**The idea.** A design system is a shared set of principles, components and patterns that every team uses to build its screens. It serves three purposes: consistency (the same thing looks and works the same everywhere), scale (new screens are built faster from ready parts) and steering (a change to a component reaches every screen at once). Leaders use it to translate UX principles into system logic, standards and governance, instead of optimising here and there. Without one, every team keeps inventing its own patterns, and users pay for the differences.
**Why it matters.** Block 3.1 asks for a guiding vision for systemic user guidance, three decisions on Gestalt, hierarchy, disclosure and the design system, and an order of what is standardised first, for an organisation whose teams set their own patterns. You decide the system, not the pages.
**How to read the picture.** Left Seabird's teams each building their own patterns, right building from one design system. Below, what a design system holds, from principles to screens.
:::

![Seabird's teams building their own patterns, or building from one design system.](_figures/d6_B1_0.png)

![What a design system holds, from principles to screens.](_figures/d6_B1_1.png)

:::note Case assumption
Seabird Ferries, Elif, Noah, Greta and Malte are made up for this example. Design systems and their parts follow Kholmatova (2017), Frost (2016) and Curtis (2010).
:::

:::rules How to decide when this comes up in the task
- Look at how many teams build the same kind of element in their own way: each is a missing component.
- Start with the principles (grouping, hierarchy, disclosure, one primary action), then the components that carry them.
- Make the shared component the easy path for teams, or they will keep building their own.
- Steer at the level of principles and ownership; let teams build at the level of screens.
:::

:::note Extra · go deeper (optional reading)
A design system is a product for internal users, the teams. Like any product, it fails when it is hard to use: missing components, poor documentation, slow answers to requests. Many organisations therefore give it a small permanent team and treat the other teams' adoption as its main measure of success.
:::

^src: Kholmatova 2017 · Frost 2016 · Curtis 2010

## B2 · Conflicts of goals: consistency, flexibility, speed, clarity and standardisation · 20 min · Core

> Consistency against flexibility, speed today against quality over years, clarity against showing more, standardisation against team autonomy. Make the shared component the easy path and allow documented exceptions.

:::box In plain words
**The idea.** Design systems sit between goals that pull against each other: consistency against flexibility for a team with a special case, product speed today against system quality over years, clarity for users against the departments' wish to show more, and standardisation against each team's autonomy. Short-term pressure favours single solutions; long-term quality needs shared ones. The way through is to make the shared component the easy path, allow documented exceptions, and say what each choice gives up.
**Why it matters.** Block 3.1 asks for three guiding decisions, a risk analysis about behaviour, transparency and standardisation, and a governance model for conflicts between teams. Each of these is a decision between conflicting goals.
**How to read the picture.** The matrix places five Seabird approaches by how standardised they are (to the right) and how fast teams can deliver (upwards). A position is a reading of the example, not a score.
:::

![Five Seabird approaches by standardisation and how fast teams deliver · Exploratory.](_figures/d6_B2_0.png)

**Standing conflicts of design systems**

| Conflict | Who usually stands for each side | What to ask |
|---|---|---|
| Consistency against flexibility | The design-system lead, against a team with a special case. | Is the case really special, or a missing option of a component? |
| Speed today against quality over years | A team with a deadline, against everyone who maintains it later. | What will this single solution cost each time it must change? |
| Visibility against clarity | Departments that want more shown, against users who need less at once. | What does the user need in this step, and what can be one step away? |

:::note Case assumption
Seabird Ferries, Elif, Noah, Greta and Malte are made up for this example. The matrix is a reading of the example, not a score.
:::

:::rules How to decide when this comes up in the task
- Name the conflict as two goals and say who stands for each: a team under time pressure, the design-system lead, a department, the users.
- Short-term pressure favours single solutions; long-term quality needs shared ones. Say which one you serve and why.
- A strict system with no exceptions makes teams wait; a system without components makes teams build their own.
- Allow exceptions with a reason and a review, and turn repeated exceptions into new components.
- Say what the choice gives up; a decision that gives up nothing has not been made.
:::

:::note Extra · go deeper (optional reading)
A useful rule for exceptions: the first time a team needs something the system lacks, it may build it with a note; the second time another team needs the same thing, it becomes a component. The system grows from real needs, and nobody waits for a perfect library.
:::

^src: Kholmatova 2017 · Nielsen 2006 · Gibbons 2018

## B3 · Design-system governance, and deciding with incomplete data · 20 min · Core

> A design system lives only with governance: an owner of its principles and components, a way to propose new ones, and a rule for conflicts between teams. A decision with incomplete data says what it decides, what it does not know, when it would reverse it and what it gives up.

:::box In plain words
**The idea.** A design system lives only with governance: a team that owns its principles and components, a clear way for other teams to propose new components or ask for an exception, and a rule for conflicts between teams. Because data is rarely complete, a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up. Missing visual order becomes a structural problem of the organisation when no one is responsible for the patterns across teams.
**Why it matters.** Block 3.1 asks for a governance model for component standards and UX principles, a decision despite incomplete data, and a statement to the management. This card gives you the parts of each.
**How to read the picture.** The four boxes at the top are the parts of a decision, filled in for Seabird. The two boxes below are the rule for future decisions.
:::

![A decision under uncertainty, filled in for Seabird.](_figures/d6_B3_0.png)

**Three parts of design-system governance**

| Part | The question | An example (Seabird) |
|---|---|---|
| Who owns what | Who owns the principles and components; who uses them? | The design-system lead owns them; teams use them. |
| How a request is decided | How does a team get a new component or an exception? | It proposes; the lead decides on need and effect on users. |
| How a conflict is decided | What happens when two teams want different patterns? | The principles decide; the product owner settles a tie. |

:::note Case assumption
Seabird Ferries, Elif, Noah, Greta and Malte are made up for this example. Deciding with limited information follows Simon (1956); the premortem follows Klein (2007).
:::

:::rules How to decide when this comes up in the task
- Name who owns the principles and the components, and who only uses them.
- Give teams a clear way to propose a component or ask for an exception, and say who decides on what basis.
- Settle conflicts between teams by the principles first, then by need and effect on users, then by a named person.
- Say what you decide, what you do not know, when you would reverse it and what you give up.
- Missing visual order becomes an organisational problem when no one owns the patterns across teams.
:::

:::note Extra · go deeper (optional reading)
Imagine it is a year later and the design system has failed, and ask why (Klein 2007). The usual answers: the components came too late, so teams built their own; nobody answered requests; the principles were written but never enforced in reviews. Each answer is a governance gap, not a design gap.
:::

^src: Simon 1956 · Klein 2007 · Kholmatova 2017
