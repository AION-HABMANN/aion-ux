---
doc: materi
day: 4
kicker: DAY 4 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: UX laws and cognitive perception
subtitle: Study material with real research, worked examples and the rules you use in the tasks
daytitle: Day 4 · Module 3 (day 1 of 3): UX laws and cognitive perception
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use a made-up company in each card. The task case is MyEnergy (see the Task document).
intro: Today is about why some interfaces feel effortless and others make people search, remember and guess. You learn how perception, attention, memory and action work together, three classic UX laws (Hick's law on choices, Miller's rule and the limits of working memory, Fitts's law on reaching a target), and what expectations, recognisability, mental models and a clear action logic do for intuitive use. Then you use them on three products and decide what to change first. This document holds everything you need to study Day 4 without the website. Every card says what the idea is in plain words, shows it in a picture, gives the details and ends with the rules you use in the tasks.
glossary: friction,ux,intuitive,fitts,mental-model,governance,case-assumption,hick,consistency,chunk,grouping,progressive,miller,action-logic,primary-action,neuro-ux,ux-law,working-memory,expectation,jakob,perception,attention,cognition,cog-load,orientation,self-service,abandonment,cxo,findability,recognition,decision-effort
refs: norman2013,iso9241110,krug2014,raskin1994,baymard2024,rayner1998,cowan2001,hick1952,hyman1953,iyengar2000,yablonski2020,larson1998,fitts1954,wcag22,appleHig,nielsen2000,nielsen1994,miller1956,sweller1988,iso13616,gibbons2018,us5960411,simon1956,klein2007,conway1968,frost2016
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. Levels 1 and 2: find what makes an unfamiliar self-service portal hard to use, rate three navigation variants under conflicting goals, then analyse an energy portal, develop four measures for intuitive use, justify them and decide on the first 12 weeks. The cards give you the ideas and the rules you use in Task 1.
:::

## A1 · Intuitive use is designed: perception, attention, memory and action · 12 min · Core

> Intuitive use is designed. Using an interface runs through perceiving, attending, remembering and acting; friction appears where a design asks too much of one of them. Looking simple is not being intuitive.

:::box In plain words
**The idea.** Intuitive use does not happen by chance; it is the result of design decisions. Using an interface runs through four steps: people perceive what is there, attend to part of it, hold what they need in memory, and act. Each step has limits, and friction appears wherever a design asks too much of one of them. A surface can look simple, with few elements and much white space, and still not be intuitive, if people cannot tell what to do next or have to guess what an icon means.
**Why it matters.** Block 1.1 asks where ServicePoint feels unclear or tiring and which obstacles stop intuitive use, and Block 2.1 asks for MyEnergy's problems of use and cognition. This card gives you the four steps to locate the friction and the difference between looking simple and being intuitive.
**How to read the picture.** First the four steps from seeing to acting. Then the same Pedalo screen twice: designed to look simple and designed to be intuitive. Tables of the evidence follow.
:::

![From seeing to acting: four steps, each with a limit.](_figures/d4_A1_0.png)

![The same Pedalo map screen, designed to look simple and designed to be intuitive. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d4_A1_1.png)

**A simple-looking surface and truly intuitive guidance**

| Aspect | Looks simple | Is intuitive |
|---|---|---|
| Elements | Few, often unlabelled icons. | As many as the task needs, each named. |
| Next step | Has to be guessed. | Visible and clearly the main action. |
| Feedback | Nothing after an action. | Says that it worked and what comes next. |
| Checked by | How clean it looks. | Whether people finish their task without thinking about the interface. |

**Intuitive use is designed: evidence**

| Idea | Real finding | What it means for a screen |
|---|---|---|
| Intuitive means familiar | Jef Raskin argued in 1994 that “intuitive” in practice means familiar: an interface is intuitive when it uses skills people already have (Raskin 1994). | A new layout is intuitive only for people who know its pattern: start from patterns your users already know. |
| Perception, attention, memory, action | The eyes rest for about 200 to 300 ms per fixation (Rayner 1998), and working memory holds about four chunks (Cowan 2001). | What a person must notice, hold and decide in one step has to fit in that budget. |
| Friction has a price | In Baymard's quantitative study, 17% of the US online shoppers had abandoned an order in the past quarter because the checkout seemed too long or complicated; the average cart abandonment rate across all reasons is 70.19% (Baymard Institute 2024). | A step that is hard to follow costs completions, not only comfort. |
| Simple surface or intuitive guidance | ISO 9241-110 asks for self-descriptiveness and conformity with user expectations, not for few elements (ISO 9241-110). | Judge a screen by whether people finish the task without thinking about the interface, not by how clean it looks. |

:::note Case assumption
Pedalo, Nina, Sam, Yusuf and Clara are made up for this example. Designing for how people perceive and act follows Norman (2013); the interaction principles (suitability for the task, self-descriptiveness, conformity with expectations) follow ISO 9241-110. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Walk through a task and note where you hesitate: that is where friction is.
- Locate each hesitation in one of the four steps: not seen (perceive), lost among others (attend), forgotten (remember), unsure what to do or whether it worked (act).
- Do not confuse few elements with intuitive use: unlabelled icons and hidden next steps look simple and make people guess.
- Ask whether the next step is visible, named and clearly the main action.
:::

:::note Extra · go deeper (optional reading)
ISO 9241-110 lists seven interaction principles: suitability for the task, self-descriptiveness, conformity with user expectations, learnability, controllability, use error robustness and user engagement. Most hesitations in a walkthrough break one of them, which gives the team a shared word for the problem.
:::

^src: Norman 2013 · ISO 9241-110 · Krug 2014 · Raskin 1994 · Baymard Institute 2024 · Rayner 1998 · Cowan 2001

## A2 · How people compare options and decide: Hick's law and the cost of choice · 12 min · Core

> People take in the options, compare them and decide. The more equally weighted options there are, the longer the decision takes (Hick's law). Give frequent choices priority and group the rest.

:::box In plain words
**The idea.** People take in the options, compare them and then decide. Hick's law describes the cost: the more equally weighted options there are to choose from, the longer the decision takes. It matters most when the options are unfamiliar and look alike; a familiar, well-sorted list can be long without hurting. The way out is not to delete functions but to give the frequent choices priority, group the rest, and show them one step deeper.
**Why it matters.** Block 1.1 asks about ServicePoint's many equal menu items and new choices after every step, Block 1.2 asks you to rate WorkFlow Hub's variant with very many options against the reduced one, and Block 2.1 asks about MyEnergy's too many equal navigation items. This card gives you the reason and the limits of Hick's law.
**How to read the picture.** One Pedalo pass page in two forms: twelve equal passes, and three recommended passes with “All passes” below. Then a second working example, the help topics in three structures, and a table of findings on choice.
:::

![One Pedalo pass page with twelve equal passes and with three recommended passes. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d4_A2_0.png)

**When many options hurt, and when they do not**

| Situation | Effect of many options | What helps |
|---|---|---|
| Unfamiliar options that look alike | Slow decisions, wrong choices, giving up. | Priority for the frequent ones, a short line on who each is for. |
| A familiar, sorted list (countries, dates) | Little harm; people jump to what they know. | A clear order and search. |
| Experienced users who know the layout | Little harm; they go straight to their item. | Keep positions stable. |
| A choice after every step | Every step becomes a new decision. | One recommended path, alternatives as a secondary link. |

**Choice and decision time: findings**

| Finding | What was measured | What it means for a screen |
|---|---|---|
| Hick-Hyman law | The time to choose grows with the logarithm of the number of equally likely alternatives, RT = a + b·log2(n + 1) (Hick 1952; Hyman 1953). | Each added option costs time, a little less each time. The law holds for unfamiliar, equally likely options, not for sorted lists people know. |
| Depth against breadth | In a study of web structures, more depth harmed search performance, and a medium structure of depth and breadth beat the broadest, shallowest one (Larson and Czerwinski 1998). | Do not flatten everything into one long menu, and do not hide items under many levels: group into a few clear levels. |
| Choice overload | A display of 24 jams drew more stops and far fewer purchases than a display of 6 (Iyengar and Lepper 2000; a small study, with later mixed results). | Recommend a few options first and keep the rest one step away. |

:::note Case assumption
Pedalo, Nina, Sam, Yusuf and Clara are made up for this example. Hick's law follows Hick (1952) and Hyman (1953); that many options can make people choose less follows Iyengar and Lepper (2000). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Count the equally weighted options at each decision point: menu items, tiles, buttons, passes.
- Hick's law bites hardest when the options are unfamiliar and look alike; a familiar, well-sorted list can be long.
- Do not delete functions; give the frequent ones priority and group the rest one step deeper.
- Watch for new choices after every step with no clear right path: each one is a new decision.
- Many options can attract interest and still make people choose less often.
:::

:::note Extra · go deeper (optional reading)
Hick and Hyman measured simple reactions to lights, not people choosing a tariff, so the law is a direction, not a formula for screens. What carries over is the shape: each extra equal option adds decision effort, and the effect shrinks when people already know where to look. That is why stable positions matter for experienced users as much as fewer options matter for new ones.
:::

^src: Hick 1952 · Hyman 1953 · Iyengar & Lepper 2000 · Yablonski 2020 · Larson & Czerwinski 1998

## A3 · Expectations, recognisability and a clear action logic: mental models and Fitts's law · 13 min · Core

> People act on their mental model: they expect things where other products put them and the same element to work the same everywhere. A large, close target is reached faster and missed less (Fitts's law).

:::box In plain words
**The idea.** People bring a mental model of how things work, learnt from other products: the menu is at the top, the main button at the bottom right, the same element works the same everywhere. An interface that conforms to these expectations, keeps its elements recognisable and follows a clear action logic (what to do, in which order, and what happens) is used without thinking. Fitts's law adds the physical side: a target that is large and close is reached faster and missed less often than a small, distant one.
**Why it matters.** Block 1.1 asks about ServicePoint's unclear path and missing feedback, Block 1.2 asks about WorkFlow Hub's changing patterns between areas, and Block 2.1 asks about MyEnergy's invisible process logic. You need mental models and a clear action logic to say why these hurt.
**How to read the picture.** One Pedalo screen with three switches: the button where people expect it, a large target near the thumb, and the same pattern on every screen. A table of the numbers and rules for targets, expectations and mental models follows.
:::

![A Pedalo ride screen: the End ride button where people expect it, large and near the thumb, and the same pattern on every screen. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d4_A3_0.png)

**Four sources of intuitive action**

| Source | What it means | A sign it is missing |
|---|---|---|
| Conformity with expectations | Things are where people expect from other products. | The main button is somewhere unusual. |
| Recognisability | The same element looks and works the same everywhere. | A red button ends a ride on one screen and pauses it on another. |
| A clear action logic | Start, steps and end are visible. | New options appear without saying which path is right. |
| Fitts's law | Important targets are large and close. | A small button far from the thumb is missed. |

**Targets, expectations and mental models: numbers and rules**

| Topic | Real rule or finding | What to check |
|---|---|---|
| Fitts's law | The time to hit a target grows with its distance D and shrinks with its width W, MT = a + b·log2(2D/W) (Fitts 1954). | Make the main target large and near the thumb or the pointer; do not put it in a far corner. |
| Target size | WCAG 2.2 asks for pointer targets of at least 24 by 24 CSS pixels at level AA (2.5.8, with a spacing exception) and 44 by 44 at level AAA (2.5.5); the platform guidelines of Apple and Google give 44 points and 48 dp (Apple; as commonly given). | Measure the tap area, not the icon, and keep the targets apart. |
| Conformity with expectations | Users spend most of their time on other sites, so they expect yours to work like those (Nielsen 2000, Jakob's law). Consistency and standards are one of the ten heuristics (Nielsen 1994). | Put the main action where other products put it, and let one element do one thing everywhere. |
| Mental models | People form a model of how a thing works from what they see; when the system works differently, errors follow (Norman 2013). | Name things in the words users use, and show the state of the system. |

:::note Case assumption
Pedalo, Nina, Sam, Yusuf and Clara are made up for this example. Mental models follow Norman (2013); Fitts's law follows Fitts (1954); conformity with user expectations is an interaction principle of ISO 9241-110; Jakob's law is described by Yablonski (2020). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Ask where people would look for the main action, from habit with other products, and put it there.
- Check recognisability: the same element looks and works the same on every screen and in every area.
- Check the action logic: what to do, in which order, and what happens after each step.
- Apply Fitts's law: the frequent, important targets are large and close to where the hand or thumb already is.
- Changing patterns between areas make people relearn each area and cause wrong actions.
:::

:::note Extra · go deeper (optional reading)
Fitts's law has a corner case worth knowing: on a desktop screen, the edges and corners are effectively infinitely large targets, because the pointer stops there. On a phone the same thinking applies to the bottom of the screen, where the thumb rests: the most frequent actions belong there.
:::

^src: Norman 2013 · Fitts 1954 · ISO 9241-110 · Yablonski 2020 · WCAG 2.2 · Apple HIG · Nielsen 2000 · Nielsen 1994

## A4 · Memory and load: Miller's rule, and why load causes errors, abandonment and uncertainty · 12 min · Core

> Working memory holds only a few things at once (Miller's rule; later research says nearer four). Making people remember raises the load, and with it errors, abandonment and uncertainty.

:::box In plain words
**The idea.** Working memory holds only a few things at once. Miller's rule (“seven, plus or minus two”) made the point; later research puts the limit nearer four chunks. When an interface makes people remember a code from one screen for the next, or compare many options in their head, the load rises, and with it errors, abandonment and uncertainty. Too many options, unclear structures and inconsistent patterns all add load. The fix is to let the system remember, show instead of asking people to recall, and keep patterns consistent.
**Why it matters.** Block 1.1 asks about ServicePoint's intermediate steps that must be remembered, and Block 2.1 asks about MyEnergy's information to remember across steps and its unclear feedback. This card gives you the limit and what it does to errors and abandonment.
**How to read the picture.** The same Pedalo unlock step twice: Sam has to remember a code from the previous screen, or the system carries it for him. A table of findings on memory and load follows.
:::

![The same Pedalo unlock step: you remember the code, or the system carries it. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d4_A4_0.png)

**Where load comes from, and what it does**

| Source of load | What it does | What helps |
|---|---|---|
| Information to carry across steps | Forgotten or mistyped; the task starts again. | The system carries it over. |
| Too many options | Comparing in the head; slow and unsure. | Frequent options first. |
| Unclear structure | People do not know where they are. | Visible steps and a clear place. |
| Inconsistent patterns | What was learnt does not hold; wrong actions. | The same pattern everywhere. |
| No feedback | Uncertainty; repeated or abandoned actions. | A clear confirmation after each step. |

**Memory and load: findings**

| Finding | What it shows | What it means for a screen |
|---|---|---|
| Miller 1956 and Cowan 2001 | Miller described a span of about seven chunks; later work puts it nearer four (Miller 1956; Cowan 2001). The number is about chunks, not about menu items. | Do not build a rule on seven; treat memory as small and let the system carry information across steps. |
| Chunking in practice | An IBAN is written in groups of four characters (ISO 13616), and card numbers are printed in groups of four digits. | Group long codes, so they can be read, remembered and checked in pieces. |
| Load and abandonment | 17% of the US online shoppers had abandoned an order in the past quarter because the checkout seemed too long or complicated (Baymard Institute 2024). | Count what a step asks people to remember and to compare, and remove it. |
| Extraneous load | Effort spent on working out the interface is missing for the task (Sweller 1988). | Remove the effort that does not serve the task before adding any help. |

:::note Case assumption
Pedalo, Nina, Sam, Yusuf and Clara are made up for this example. The limits of short-term memory follow Miller (1956) and Cowan (2001); cognitive load follows Sweller (1988); recognition rather than recall is Nielsen's heuristic (1994). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- List what a person has to keep in mind during a task: a code, a choice made two steps back, a term from another page.
- Let the system carry what it already knows; show instead of asking people to recall.
- Too many options, unclear structures and inconsistent patterns all add load, not only long texts.
- Load shows up as errors, abandoned processes and people unsure whether something worked; feedback after each step lowers the uncertainty.
:::

:::note Extra · go deeper (optional reading)
Miller's “seven, plus or minus two” is often quoted as a rule for menus (“never more than seven items”). That is a misreading: Miller wrote about holding items in memory, not about choosing from items that stay visible. A visible menu with ten items does not have to be remembered; a code on the previous screen does.
:::

^src: Miller 1956 · Cowan 2001 · Sweller 1988 · Nielsen 1994 · Baymard Institute 2024 · ISO 13616

## A5 · UX laws as tools against friction, and weighing a measure · 11 min · Core

> UX laws are tools: each points to a kind of friction and a kind of fix. To put measures in order, weigh each on effect on users, feasibility, risk and time pressure, with a reason.

:::box In plain words
**The idea.** UX laws are tools, not decoration: each one points to a kind of friction and a kind of fix. Hick: fewer equal choices, frequent ones first. Miller: less to remember, the system remembers. Fitts: important targets large and close. Expectations: put things where people look and keep patterns the same. To put measures in order, weigh each on the four questions Block 2.1 names: effect on users, feasibility, risk and time pressure. The reason next to each rating matters more than the rating.
**Why it matters.** Block 1.1 asks for the two biggest hurdles, Block 1.2 for a decision between three navigation variants, and Block 2.1 for four measures, their justification on these four criteria and a decision for 12 weeks. The example uses Pedalo and its own measures, so the answer for the task cases is not given.
**How to read the picture.** Three measures Pedalo considered, rated on effect on users, feasibility, risk and time pressure. A rating is a reading of the example, not a mark. A table on the laws of UX and where they stop follows.
:::

![Pedalo weighs three measures on effect on users, feasibility, risk and time pressure.](_figures/d4_A5_0.png)

**UX laws as tools**

| Law or principle | The friction it points to | The kind of fix |
|---|---|---|
| Hick's law | Too many equal choices. | Frequent ones first, the rest grouped. |
| Miller's rule | Too much to remember. | The system remembers; show, do not ask. |
| Fitts's law | Targets small or far away. | Important targets large and close. |
| Conformity with expectations | Things in unexpected places; changing patterns. | Familiar places, one pattern. |

**The laws of UX as tools, and where they stop**

| Law | What it is good for | Where it stops |
|---|---|---|
| Hick's law | Ordering and grouping options: frequent ones first, the rest grouped. | It is about equally likely, unfamiliar options; it does not say that fewer is always better (Larson and Czerwinski 1998). |
| Fitts's law | Sizing and placing targets. | It models pointing; on touch screens thumb reach and accidental taps matter as well (WCAG 2.5.8). |
| Miller's rule | Reminding that memory is small. | Seven is not a limit for menus; the span is about chunks and is nearer four (Cowan 2001). |
| Jakob's law | Choosing familiar patterns. | Familiar is not always best: a new pattern can pay if it removes real friction. |
| A real step reduction | Amazon's patent for one-click ordering (US 5,960,411, granted 1999) describes a purchase in one action by reusing stored data. | The saving came from carrying information for the user, not from a smaller screen. |

:::note Case assumption
Pedalo, Nina, Sam, Yusuf and Clara are made up for this example. The laws as practical tools follow Yablonski (2020); rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Use the laws to find fixes: Hick to fewer equal choices, Miller to less to remember, Fitts to larger, closer targets, expectations to familiar places and patterns.
- Rate every measure on the same four questions: effect on users, feasibility, risk, time pressure.
- A rating is a judgement with a reason, never a mark. A different order with a better reason is a better answer.
- Prefer fixes that remove a step or a choice over fixes that add explanation, such as help texts and videos.
- Ordering and grouping functions usually needs agreement from the teams that own them: count that in feasibility and risk.
:::

:::note Extra · go deeper (optional reading)
A help text or a tutorial video is often the cheapest-looking fix and the weakest: it adds something to read and remember, and it helps only the people who find it. When a team proposes one, ask which step or choice could be removed instead, so that the help is not needed.
:::

^src: Yablonski 2020 · Gibbons 2018 · Nielsen 1994 · US 5,960,411 · WCAG 2.2 · Cowan 2001

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards, led by the facilitator. Level 3 in the Chief Experience Officer's chair: a guiding vision for intuitive use, three strategic decisions, an order of what is improved first, a risk analysis, a governance model for the interaction logic, one decision under uncertainty and a statement to the management. The cards give you the ideas you use in Task 2.
:::

## B1 · Usability as a strategic factor: reducing friction in the whole system · 20 min · Core

> Usability is strategic when it decides what is done first. Organisations answer problems with new functions, which add load; leaders reduce friction in the whole system first.

:::box In plain words
**The idea.** Usability becomes a strategic factor when it decides which work is done first. Organisations often answer usability problems with new functions, which add options and load. A leader steers the other way: reduce friction in the whole system, in the processes customers run through several channels, before adding anything. The question is not “what else can the product do?” but “where do customers search, remember and guess, and what does that cost in support and abandonment?”.
**Why it matters.** Block 3.1 asks for a guiding vision for intuitive use, three decisions on orientation, efficiency, complexity and main tasks, and an order of the systems or processes to improve first, for a company that discusses new functions while central problems remain. You decide what comes first in the whole system.
**How to read the picture.** Left Pedalo answering problems with new functions, right reducing friction first. Below, the chain from a screen to the whole product system. A table of evidence follows.
:::

![Pedalo answering problems with new functions, or reducing friction first.](_figures/d4_B1_0.png)

![From one screen to the whole product system.](_figures/d4_B1_1.png)

**Usability as a strategic factor: evidence**

| Evidence | What it shows | What it means for a decision |
|---|---|---|
| Baymard Institute 2024 | 17% of the US online shoppers abandoned an order in the past quarter because of a long or complicated checkout. | Friction is a business figure: it shows in completions. |
| Larson and Czerwinski 1998 | How content is structured changes how fast people find it, independent of the content. | Structure is a decision with a measurable effect, not a layout detail. |
| Raskin 1994 | Intuitive means familiar. | A strategy for ease of use starts from what users already know, across all channels. |

:::note Case assumption
Pedalo, Nina, Sam, Yusuf and Clara are made up for this example. Designing for how people act follows Norman (2013); the interaction principles follow ISO 9241-110. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Look at where customers search, remember and guess across all channels, and what it costs in support and abandonment.
- Before a new function, ask which existing friction it is meant to solve, and whether removing that friction would solve it.
- Think in processes across channels, not single screens: the same task in the portal, the app and the service should follow the same logic.
- Leaders steer usability as a factor of impact, not only provide functions.
:::

:::note Extra · go deeper (optional reading)
A simple test for a roadmap: for each planned function, write the user problem it solves and the step or choice it adds. If the problem could be solved by removing a step, the function waits. Teams that apply it usually find that the first quarter's work is in existing processes, not new ones.
:::

^src: Norman 2013 · ISO 9241-110 · Yablonski 2020 · Baymard Institute 2024 · Larson & Czerwinski 1998 · Raskin 1994

## B2 · Conflicts of goals: scope of functions against simplicity, completeness against efficiency · 20 min · Core

> Scope of functions against simplicity, completeness against efficiency, new against experienced users, the ideal against time. Keep every function, but order them: frequent tasks first.

:::box In plain words
**The idea.** Intuitive use sits between goals that pull against each other: the scope of functions against simplicity, a department's wish for completeness and visibility against efficiency for users, new users who need a calm start against experienced users who want everything in one click, and the ideal solution against time pressure and feasibility. A common way through is to keep every function, but order them: the frequent tasks first, the rest grouped and findable one step deeper. The work is to name the conflict, choose, and say what you give up.
**Why it matters.** Block 3.1 asks for three guiding decisions, a risk analysis about user behaviour and internal requirements, and a governance model for conflicts between departments that want variety and users who need simplicity. Each of these is a decision between conflicting goals.
**How to read the picture.** The matrix places five Pedalo designs by how many functions they show at once (to the right) and how easily riders finish their task (upwards). A position is a reading of the example, not a score. A table of conflicts with evidence follows.
:::

![Five Pedalo designs by functions shown at once and how easily riders finish their task · Exploratory.](_figures/d4_B2_0.png)

**Standing conflicts of intuitive use**

| Conflict | Who usually stands for each side | What to ask |
|---|---|---|
| Scope of functions against simplicity | Departments that want their functions seen, against users who need few choices. | Which tasks do most users do most often? |
| New against experienced users | A calm start, against everything in one click. | Can the frequent tasks serve both, with shortcuts for experts? |
| The ideal against time and feasibility | A full rebuild, against what fits the release. | What helps most users within the time there is? |

**Conflicts of intuitive use, with evidence**

| Conflict | What the evidence says | A way to decide |
|---|---|---|
| Scope of functions against simplicity | More choice can mean fewer decisions (Iyengar and Lepper 2000), and a medium structure beats the broadest one (Larson and Czerwinski 1998). | Put the frequent tasks first and group the rest in few levels. |
| New against experienced users | Users expect a product to work like the others they know (Nielsen 2000). | Keep the main pattern familiar and add shortcuts for experts. |
| The ideal against time | Abandonment through a long checkout is common (Baymard Institute 2024). | Fix the steps that lose the most people first. |

:::note Case assumption
Pedalo, Nina, Sam, Yusuf and Clara are made up for this example. That many options can make people choose less follows Iyengar and Lepper (2000); the matrix is a reading of the example, not a score. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Name the conflict as two goals and say who stands for each: a department, the UX team, new users, experienced users.
- Showing every function at once is not the same as people finishing their task; past a point it is worse.
- Keep every function reachable, give the frequent ones priority, and group the rest one step deeper with a clear entry and search.
- Under time pressure, prefer the change that helps most people soon over the ideal rebuild that helps nobody this year.
- Say what the choice gives up; a decision that gives up nothing has not been made.
:::

:::note Extra · go deeper (optional reading)
Departments often fear that a function one step deeper will not be used. A useful agreement: move it, give it a clear entry and search, and look at the use after a quarter. If it really drops for customers who need it, it moves back up. The fear becomes a check instead of a veto.
:::

^src: Iyengar & Lepper 2000 · Gibbons 2018 · Hick 1952 · Larson & Czerwinski 1998 · Nielsen 2000 · Baymard Institute 2024

## B3 · Who owns the interaction logic, and deciding with partial user data · 20 min · Core

> The interaction logic needs an owner, or every team adds its function wherever it likes. A decision with partial user data says what it decides, what it does not know, when it would reverse it and what it gives up.

:::box In plain words
**The idea.** The interaction logic, meaning the order of tasks, the steps of each process and the patterns across channels, needs an owner, or every department adds its function wherever it likes. Departments own their content and rules; someone owns how it all fits together; and a rule decides conflicts, such as how often customers need a task and how much support it causes. Because user data is rarely complete, a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up.
**Why it matters.** Block 3.1 asks for a governance model for the interaction logic, a decision despite incomplete data, and a statement to the management. This card gives you the parts of each.
**How to read the picture.** The four boxes at the top are the parts of a decision, filled in for Pedalo. The two boxes below are the rule for future decisions. A table of evidence and rules follows.
:::

![A decision under uncertainty, filled in for Pedalo.](_figures/d4_B3_0.png)

**Three parts of a governance model for the interaction logic**

| Part | The question | An example (Pedalo) |
|---|---|---|
| Who owns what | Who owns the order of tasks and the steps; who owns content? | The head of UX owns the order and the steps; each team owns its content and rules. |
| How a request is decided | What happens when a team wants its function on top? | How often riders need it and how much support it causes decide. |
| When a function may be added | What must a new function bring? | A plan for where it sits and what it replaces. |

**Who owns the interaction logic: evidence and rules**

| Part | Evidence or rule | What it means |
|---|---|---|
| Ownership | The structure of a product tends to copy the structure of the organisation behind it (Conway 1968). | Name one owner of the order of tasks and steps, or each department will shape its own. |
| Shared rules | Interfaces built from shared rules and components stay consistent (Frost 2016); ISO 9241-110 gives seven principles to decide by. | Write the rules down once and let teams build within them. |
| A floor | WCAG 2.2 fixes minimum target sizes and spacing. | Treat the target size as a rule, not as a taste. |

:::note Case assumption
Pedalo, Nina, Sam, Yusuf and Clara are made up for this example. Deciding with limited information follows Simon (1956); the premortem follows Klein (2007). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Name who owns the order of tasks, the steps of each process and the patterns across channels; departments own their content and rules.
- Give conflicts a rule: how often users need a task and how much support it causes, using the data there is; then a named person.
- Accept a new function only with a plan for where it sits and what it replaces.
- Say what you decide, what you do not know, when you would reverse it and what you give up.
:::

:::note Extra · go deeper (optional reading)
Imagine it is a year later and customers still call about the same tasks, and ask why (Klein 2007). Typical answers: a team added its function to the start screen anyway; a process was fixed in the app but not in the portal; the confirmation was written but never tested. Each answer points to a missing owner or a missing check.
:::

^src: Simon 1956 · Klein 2007 · ISO 9241-110 · Conway 1968 · Frost 2016 · WCAG 2.2
