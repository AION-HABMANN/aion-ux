---
doc: materi
day: 5
kicker: DAY 5 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Fitts, Hick and Miller in practice
subtitle: Study material with real research, worked examples and the rules you use in the tasks
daytitle: Day 5 · Module 3 (day 2 of 3): Fitts, Hick and Miller in practice
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use a made-up company in each card. The task case is MoveEasy (see the Task document).
intro: Today is about three UX laws as working tools. Fitts's law: how the size, distance and position of a target decide how fast and safely people hit it, on a screen and under a thumb. Hick's law: how the number of options decides how long a choice takes, and why priority and staged choices help. Miller's rule: how little people can hold in mind at once, and why chunking and structure help. You learn how the three work together on navigation, interaction and interface elements, and then use them on three products. This document holds everything you need to study Day 5 without the website. Every card says what the idea is in plain words, shows it in a picture, gives the details and ends with the rules you use in the tasks.
glossary: chunk,interaction-standard,governance,case-assumption,reachability,ux,hick,fitts,miller,decision-effort,cog-load,neuro-ux,grouping,staged-choice,decision-stress,error-probability,reaction-time,working-memory,misoperation,touch-target,progressive,memory-load,primary-action,cxo,findability,recognition,thumb-zone,mis-tap,mobile-usability
refs: fitts1954,mackenzie1992,parhi2006,hoober2013,wcag22,hick1952,hyman1953,iyengar2000,nielsen2006,miller1956,cowan2001,gobet2001,nielsen1994,yablonski2020,sweller1988,gibbons2018,frost2016,simon1956,klein2007
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. Levels 1 and 2: find what makes an unfamiliar banking portal slow and error-prone and match it to the three laws, rate three navigation variants under conflicting goals, then analyse a mobility portal, develop four measures, justify them and decide on the first 10 weeks. The cards give you the ideas and the rules you use in Task 1.
:::

## A1 · Fitts's law: target size, distance and position, on a screen and under a thumb · 12 min · Core

> The time to hit a target grows with its distance and shrinks with its size (Fitts's law). Make main actions large, close to the hand and spaced apart; on a phone, where the thumb already is.

:::box In plain words
**The idea.** Fitts's law says that the time to hit a target grows with its distance and shrinks with its size. On a screen that means: important buttons and links must be large enough and close to where the pointer or the thumb already is. On a phone, people often hold the device in one hand, and the thumb reaches the lower middle of the screen easily and the top corners badly. Targets that are small, far away or packed close together are slow to hit and easy to miss.
**Why it matters.** Block 1.1 asks about BankDirect's small top-right transfer link, its buttons close together and its small mobile buttons, and Block 2.1 asks about MoveEasy's small, badly placed booking buttons and touch targets. This card gives you size, distance, spacing and the thumb's reach.
**How to read the picture.** One Ticketo checkout on a phone with three switches: a larger Pay button, placed where the thumb reaches, and space between the buttons.
:::

![A Ticketo checkout: a larger Pay button, where the thumb reaches, with space between the buttons. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d5_A1_0.png)

**Fitts's law on screens**

| Lever | What it does | A sign it is missing |
|---|---|---|
| Size | A larger target is hit faster and missed less. | Small links for the main task; tiny phone buttons. |
| Distance and position | A target near the hand is reached faster. | The main action in a far top corner. |
| Spacing | Space between targets prevents mix-ups. | Similar buttons that touch. |
| Touch area | The area that reacts can be larger than the label. | Only the word itself reacts to a tap. |

:::note Case assumption
Ticketo, Leon, Mara, Priya and Tobias are made up for this example. Fitts's law follows Fitts (1954) and, for screens, MacKenzie (1992); small targets under the thumb follow Parhi, Karlson and Bederson (2006); how people hold phones follows Hoober (2013); WCAG 2.2 sets a minimum target size in criterion 2.5.8.
:::

:::rules How to decide when this comes up in the task
- Find the most important action on each screen and check its size: can it be hit without aiming?
- Check its distance: is it near where the pointer or the thumb already is, or in a far corner?
- Check the space around it: targets that touch are confused, above all similar ones.
- On a phone held in one hand, the thumb reaches the lower middle easily and the top corners badly.
- The click or touch area can be larger than the visible label; make it so for small labels.
:::

:::note Extra · go deeper (optional reading)
WCAG 2.2 criterion 2.5.8 asks that a pointer target is at least 24 by 24 CSS pixels, or has enough space around it; the older enhanced criterion 2.5.5 asks for 44 by 44. Neither is a design goal: they are a floor below which people with less precise hands, or anyone on a moving bus, start to fail.
:::

^src: Fitts 1954 · MacKenzie 1992 · Parhi et al. 2006 · Hoober 2013 · WCAG 2.2

## A2 · Hick's law: fewer options, clear priority and staged choices · 12 min · Core

> The more equally weighted options, the longer the choice (Hick's law). Fewer options at once, a clear priority and staged choices cut decision effort; too many stages become a hurdle.

:::box In plain words
**The idea.** Hick's law says that the more equally weighted options people choose between, the longer the choice takes. Three things help. Fewer options at once: show what most people need. Clear priority: make the likely choice stand out. Staged choices: split one large choice into a few small ones (first the day, then the film, then the time), each with only a few options. Staging has a price: every stage is a step, and too many steps become a hurdle of their own.
**Why it matters.** Block 1.1 asks about BankDirect's 14 equal menu options, Block 1.2 asks you to rate AdminFlow's all-at-once, staged and minimalist variants, and Block 2.1 asks about MoveEasy's too many options and equal choices in every step. This card gives you the three ways to lower decision effort and the limit of reduction.
**How to read the picture.** The same Ticketo choice in two forms: every showing of the week at once, and staged by day, film and time.
:::

![The same Ticketo choice: every showing of the week at once, and staged by day, film and time. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d5_A2_0.png)

**Three ways to lower decision effort, and their limit**

| Way | What it does | Its limit |
|---|---|---|
| Fewer options at once | Less to compare. | Rare needs must stay findable. |
| A clear priority | The likely choice stands out. | A wrong priority misleads. |
| Staged choices | A few options per step. | Each stage is a step; too many steps slow people down. |

:::note Case assumption
Ticketo, Leon, Mara, Priya and Tobias are made up for this example. Hick's law follows Hick (1952) and Hyman (1953); many options making people choose less follows Iyengar and Lepper (2000); showing options in stages follows Nielsen (2006) on progressive disclosure.
:::

:::rules How to decide when this comes up in the task
- Count the equal options at each decision point: menu items, tiles, buttons, list entries.
- Show what most people need and make the likely choice stand out.
- Split a large choice into a few small stages with few options each.
- Count the stages too: when a short choice needs many screens, reduction has become a hurdle.
- Long lists of similar options are a decision problem as well as a reach problem.
:::

:::note Extra · go deeper (optional reading)
Hick's law grows with the logarithm of the number of options, not in a straight line: going from two options to four costs about as much as going from four to eight. That is why the first few extra options hurt most, and why a short, well-ordered list often beats a cleverer structure with more steps.
:::

^src: Hick 1952 · Hyman 1953 · Iyengar & Lepper 2000 · Nielsen 2006

## A3 · Miller's rule: chunking, structure and what people can hold in mind · 12 min · Core

> Short-term memory holds only a few items (Miller's rule; later research says nearer four). Chunking and structure make information easier to take in and remember; showing it where needed avoids remembering at all.

:::box In plain words
**The idea.** Miller's rule says that short-term memory holds only a small number of items; later research puts it nearer four. Two things help. Chunking: group items into a few meaningful units, such as a booking code in blocks of three, or seat, time and price in one box. Structure: put what belongs together together, and show information where it is needed, so it does not have to be carried from one screen to the next. What people must remember is a common source of typing errors and wrong choices.
**Why it matters.** Block 1.1 asks about BankDirect's crowded forms and the numbers and options users must remember at once, and Block 2.1 asks about MoveEasy's tariffs and conditions to remember. This card gives you chunking and structure as fixes.
**How to read the picture.** The same Ticketo confirmation twice: a long code and scattered details, and a chunked code with the details in one box.
:::

![The same Ticketo confirmation: a long code and scattered details, or a chunked code with the details in one box. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d5_A3_0.png)

**Chunking and structure**

| Technique | What it does | An example |
|---|---|---|
| Chunk a string | A long string becomes a few units. | A booking code in three blocks of four. |
| Group related details | What belongs together is read together. | Time, hall and seats in one box. |
| Show where needed | Nothing has to be carried across screens. | The conditions next to the ticket being chosen. |
| Split a long form | A few fields per group, each with a heading. | Who travels · When · How to pay. |

:::note Case assumption
Ticketo, Leon, Mara, Priya and Tobias are made up for this example. The limits of short-term memory follow Miller (1956) and Cowan (2001); chunking follows Gobet et al. (2001); recognition rather than recall is Nielsen's heuristic (1994).
:::

:::rules How to decide when this comes up in the task
- List what people must take in or keep in mind at each step: codes, numbers, tariffs, conditions, earlier choices.
- Chunk long strings into blocks of three or four, and group related details in one place.
- Show information where it is needed, so it does not have to be carried from one screen to the next.
- Forms that show everything at once hide the few fields that matter: structure them into small groups.
:::

:::note Extra · go deeper (optional reading)
Chunks are meaningful units, not just shorter pieces: an experienced traveller sees a train number and a platform as one chunk, a newcomer as several. That is why grouping by meaning (all the details of one ticket together) helps more than splitting text at a fixed length.
:::

^src: Miller 1956 · Cowan 2001 · Gobet et al. 2001 · Nielsen 1994

## A4 · The three laws together: reaction time, errors and load on navigation and interaction · 12 min · Core

> Fitts is the hand, Hick the decision, Miller the memory. On navigation, interaction and interface elements they add up: each adds reaction time, raises the error probability and the cognitive load.

:::box In plain words
**The idea.** The three laws describe different things: Fitts the hand (reaching a target), Hick the decision (choosing between options), Miller the memory (holding information). On a real screen they work together. A menu can be slow because its items are small (Fitts), because there are many of them (Hick) and because the labels have to be compared in the head (Miller). Each adds reaction time, and each raises the chance of an error; together they raise the cognitive load. Small click targets, overloaded menus and too much information at once weaken use for that reason.
**Why it matters.** Block 1.1 asks you to assign BankDirect's problems to the three laws, Block 1.2 asks you to rate AdminFlow on reachability, decision effort and memory load, and Block 2.1 asks you to sort MoveEasy's problems by reachability, decision effort, memory load, mobile usability and error risk. This card shows how to tell the laws apart and how they combine.
**How to read the picture.** One Ticketo menu with three switches, one per law: larger items, fewer items, and labels grouped by meaning.
:::

![A Ticketo menu: larger items (Fitts), the four most used (Hick), grouped by meaning (Miller). Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d5_A4_0.png)

**The three laws side by side**

| Law | What it is about | Typical hurdle | Typical fix |
|---|---|---|---|
| Fitts's law | The hand: reaching and hitting a target. | Small, far, crowded targets. | Large, close, spaced targets. |
| Hick's law | The decision: choosing between options. | Many equal options. | Fewer, prioritised, staged options. |
| Miller's rule | The memory: holding information. | Codes and conditions to remember. | Chunked, grouped, shown where needed. |

:::note Case assumption
Ticketo, Leon, Mara, Priya and Tobias are made up for this example. The three laws together follow Yablonski (2020); cognitive load follows Sweller (1988).
:::

:::rules How to decide when this comes up in the task
- For each hurdle, ask which of the three it is about: reaching a target, choosing between options, or holding information.
- Many hurdles touch two laws at once, such as a long list of small, similar items (Fitts and Hick).
- Small click targets, overloaded menus and too much information at once weaken use because each law adds time and errors.
- Reaction time, error probability and cognitive load rise together; lowering one law's cost lowers all three a little.
:::

:::note Extra · go deeper (optional reading)
The laws also trade against each other. Making every target large (Fitts) on a small screen leaves room for fewer options (Hick), which can push some into a second step that has to be remembered (Miller). Good interaction design looks for the arrangement that keeps all three costs low for the most frequent tasks.
:::

^src: Yablonski 2020 · Fitts 1954 · Hick 1952 · Miller 1956 · Sweller 1988

## A5 · Less searching, fewer errors, less decision stress, and weighing a measure · 12 min · Core

> Good UX reduces searching, operating errors and decision stress; the laws give efficient guidance a basis beyond looks. Weigh measures on effect on users, feasibility, risk and time pressure, with a reason.

:::box In plain words
**The idea.** Good UX design reduces three things the laws explain: searching (where is it?), operating errors (the wrong tap, the wrong choice, the wrong number) and decision stress (too many similar options). The laws give efficient user guidance a basis, beyond how a screen looks. To put measures in order, weigh each on the four questions Block 2.1 names: effect on users, feasibility, risk and time pressure. The reason next to each rating matters more than the rating.
**Why it matters.** Block 1.1 asks for the two biggest weaknesses for efficiency and error risk, Block 1.2 for a decision between three navigation variants, and Block 2.1 for four measures, their justification on these four criteria and a decision for 10 weeks. The example uses Ticketo and its own measures, so the answer for the task cases is not given.
**How to read the picture.** Three measures Ticketo considered, rated on effect on users, feasibility, risk and time pressure. A rating is a reading of the example, not a mark.
:::

![Ticketo weighs three measures on effect on users, feasibility, risk and time pressure.](_figures/d5_A5_0.png)

:::note Case assumption
Ticketo, Leon, Mara, Priya and Tobias are made up for this example. The laws as practical tools follow Yablonski (2020); rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study.
:::

:::rules How to decide when this comes up in the task
- Say for each measure which of the three it reduces: searching, operating errors or decision stress.
- Prefer measures that change a shared element (a button, a menu, a code layout) used on many screens.
- Rate every measure on the same four questions: effect on users, feasibility, risk, time pressure.
- A rating is a judgement with a reason, never a mark. A different order with a better reason is a better answer.
- Judge a design by how fast and safely people finish, not only by how it looks.
:::

:::note Extra · go deeper (optional reading)
An aesthetic redesign can make all three laws worse at once: thinner buttons, more items in a sleek menu, information spread over a cleaner layout. A quick check before any visual change: is every main target as large and close as before, are there as few equal options, and is nothing new to remember?
:::

^src: Yablonski 2020 · Gibbons 2018 · WCAG 2.2

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards, led by the facilitator. Level 3 in the Chief Experience Officer's chair: a guiding vision for efficient interaction, three strategic decisions, an order of what is improved first, a risk analysis, a governance model for interaction standards, one decision under uncertainty and a statement to the management. The cards give you the ideas you use in Task 2.
:::

## B1 · Interaction as an architecture of effect: the laws as standards, not details · 20 min · Core

> An interaction decision repeats on every screen and every visit; it is an architecture of effect, not a detail. At senior level the laws become interaction standards every team follows.

:::box In plain words
**The idea.** An interaction decision is not a detail. The size of a button, the number of options in a menu and the way a form groups information decide how fast and safely thousands of people use a product, and how many call support. At senior level the three laws become steering tools: they are written down as interaction standards (minimum target sizes, a limit on equal options, a rule for chunking) that every team follows, so the product is fast and safe by design instead of fixed screen by screen.
**Why it matters.** Block 3.1 asks for a guiding vision for efficient interaction, three decisions on reachability, choice, information and main actions, and an order of what is improved first, for a company that adds functions while known interaction problems stay. You decide standards, not single buttons.
**How to read the picture.** Left Ticketo fixing details one screen at a time, right deciding interaction standards once. Below, the chain from a button to the business.
:::

![Ticketo fixing details one screen at a time, or deciding interaction standards once.](_figures/d5_B1_0.png)

![From a button to the business.](_figures/d5_B1_1.png)

:::note Case assumption
Ticketo, Leon, Mara, Priya and Tobias are made up for this example. Building interfaces from shared rules and components follows Frost (2016); the target size floor follows WCAG 2.2.
:::

:::rules How to decide when this comes up in the task
- Look for the same interaction problem on several screens: it is a missing standard, not a missing fix.
- Write the laws down as standards: a minimum target size and position, a limit on equal options, a rule for chunking.
- Apply the standards to new functions from the start, so they do not undo earlier fixes.
- Follow the chain from an element to the business: support contacts, abandoned purchases, customers who leave.
:::

:::note Extra · go deeper (optional reading)
Interaction standards work best when they live in the shared components, not only in a document: a button component that cannot be smaller than the minimum, a menu that warns beyond a number of items. Then a team that builds a new screen gets the standard without having to remember it, which is Miller's rule applied to the organisation.
:::

^src: Yablonski 2020 · Frost 2016 · WCAG 2.2

## B2 · Conflicts of goals: feature richness, speed, simplicity, brand and feasibility · 20 min · Core

> Feature richness against speed, simplicity against brand, the ideal against feasibility. Reduction is not always the answer: give the main actions size and priority, keep the rest reachable.

:::box In plain words
**The idea.** Efficient interaction sits between goals that pull against each other: feature richness against speed of use, everything visible against few, large targets, a minimal brand look against reachable buttons, and the ideal against what is technically feasible now. Reduction is not always the answer: hiding options behind many steps can be slower than showing them. The way through is to give the main actions size and priority, keep the rest reachable, and say what each choice gives up.
**Why it matters.** Block 3.1 asks for three guiding decisions, a risk analysis about user behaviour and the need for functions, and a governance model for conflicts between feature richness and usability. Each of these is a decision between conflicting goals.
**How to read the picture.** The matrix places five Ticketo designs by how many options they show at once (to the right) and how fast and safely people finish (upwards). A position is a reading of the example, not a score.
:::

![Five Ticketo designs by options shown at once and how fast and safely people finish · Exploratory.](_figures/d5_B2_0.png)

**Standing conflicts of efficient interaction**

| Conflict | Who usually stands for each side | What to ask |
|---|---|---|
| Feature richness against speed | A department or marketing, against users in a hurry. | Which actions do most users need most often? |
| Reduction against steps | A calm screen, against reaching the action quickly. | How many steps does the frequent task take now? |
| A minimal brand look against reachability | The brand team, against users on phones. | Are the main targets still large and close enough? |

:::note Case assumption
Ticketo, Leon, Mara, Priya and Tobias are made up for this example. Many options making people choose less follows Iyengar and Lepper (2000); progressive disclosure follows Nielsen (2006); the matrix is a reading of the example, not a score.
:::

:::rules How to decide when this comes up in the task
- Name the conflict as two goals and say who stands for each: a department, marketing, IT, frequent or occasional users.
- “Everything at a glance” and “one button, many steps” are both slow; look for main actions first, the rest one step away.
- A minimal brand look must not shrink the targets below what hands can hit.
- Under time and feasibility limits, prefer the change that helps most users now over the ideal later.
- Say what the choice gives up; a decision that gives up nothing has not been made.
:::

:::note Extra · go deeper (optional reading)
A useful compromise for “everything visible”: keep every function one tap from the first screen, behind a clearly labelled entry, and give the first screen only to the few actions most users take. The department's functions are still reachable, and the users' main tasks are still fast.
:::

^src: Iyengar & Lepper 2000 · Gibbons 2018 · Nielsen 2006

## B3 · Who owns the interaction standards, and deciding with incomplete data · 20 min · Core

> Interaction standards hold only with an owner and a rule for exceptions. A decision with incomplete data says what it decides, what it does not know, when it would reverse it and what it gives up.

:::box In plain words
**The idea.** Interaction standards hold only when someone owns them and a rule decides when a team wants an exception: how often a function is needed and what errors and support data say. Because data is rarely complete, a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up. A small interaction problem becomes a strategic business problem when it repeats on every visit: then it costs support, abandoned processes and customers.
**Why it matters.** Block 3.1 asks for a governance model for the interaction standards, a decision despite incomplete data, and a statement to the management. This card gives you the parts of each.
**How to read the picture.** The four boxes at the top are the parts of a decision, filled in for Ticketo. The two boxes below are the rule for future decisions.
:::

![A decision under uncertainty, filled in for Ticketo.](_figures/d5_B3_0.png)

**Three parts of a governance model for interaction standards**

| Part | The question | An example (Ticketo) |
|---|---|---|
| Who owns what | Who owns the standards; who owns the content? | The head of UX owns sizes, limits and chunking; teams own their content. |
| How an exception is decided | What happens when a team wants more visible options? | It shows how often they are used and what the error data says. |
| How a standard changes | When may a standard itself change? | Only with evidence from users, errors or support. |

:::note Case assumption
Ticketo, Leon, Mara, Priya and Tobias are made up for this example. Deciding with limited information follows Simon (1956); the premortem follows Klein (2007).
:::

:::rules How to decide when this comes up in the task
- Name who owns the interaction standards across all interfaces, and who owns the content.
- Give exceptions a rule: how often the function is needed and what the error and support data say.
- Say what you decide, what you do not know, when you would reverse it and what you give up.
- A small interaction problem becomes a strategic business problem when it repeats on every visit; say when you will check.
:::

:::note Extra · go deeper (optional reading)
When no one records mis-taps, the support contacts are the best available sign: “I booked the wrong ticket”, “I cancelled by mistake”. Counting them before and after a change is a simple way to check a decision made under uncertainty, without waiting for perfect data.
:::

^src: Simon 1956 · Klein 2007 · WCAG 2.2
