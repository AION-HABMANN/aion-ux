---
doc: task
day: 5
kicker: DAY 5 · TASK 1 AND TASK 2 · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: MoveEasy: UX Analysis File and UX Strategy Memo
subtitle: Describe the effect, choose the measures as a team member, and decide as Chief Experience Officer
daytitle: Day 5 · Module 3 (day 2 of 3): Fitts, Hick and Miller in practice
doctype: Task (worksheet with answer spaces). Task 1 (UX Analysis File) and Task 2 (UX Strategy Memo).
route: Task 1 = Route 1, Levels 1 and 2 (draws on Materi A). Task 2 = Route 2, Level 3 (draws on Materi B).
minutes: Task 1 about 33 min · Task 2 about 20 min
case: MoveEasy, the day's case study; other products appear as warm-ups
intro: This is the worksheet for Day 5. Read the case once, study the evidence printed in this document, and write your answers in the boxes and tables. You can work through it on paper or type into the document. All blocks are Core. There are no answer keys and no scores; the reason you give matters more than the choice.
glossary: error-probability,ux,hick,fitts,miller,reachability,interaction-standard,governance,case-assumption,decision-effort,memory-load,mis-tap,touch-target,stakeholder,cxo,ux-law,misoperation,decision-stress,mobile-usability,orientation,decision-arch,action-logic
---

[[CONTENTS]]

:::note Which plan item each block answers
| UE | Plan item (Strukturplan, Day 5) | Block in this document |
|---|---|---|
| UE2 | Level 1, task 1 · Recognise interaction hurdles in a portal: BankDirect | Block 1.1 (Core) |
| UE3 | Level 1, task 2 · Rate navigation and interaction concepts under conflicting goals: AdminFlow | Block 1.2 (Core) |
| UE4 | Coaching: from describing to deciding | A classroom talk led by the trainer; not a worksheet block |
| UE5–6 | Level 2 case study · Case study: optimising the booking and management portal MoveEasy | Block 2.1 (Core) |
| UE7 | Feedback round with a management perspective | A classroom discussion led by the trainer; not a worksheet block |
| UE8–10 | Level 3 transfer project · An interaction strategy for efficient, low-load digital use | Block 3.1 (Core), in Task 2 |
:::

:::note Your name
Write your full name here. Use the same name on every Task document this week; it is how your work is matched.
[[ANSWER lines=1]]
:::

# Task 1 · Route 1 · UX Analysis File: find the law behind each hurdle, then decide what to change

## The case: three products on the UX team's desk, and MoveEasy

*Read once · about 3 min*

You work in the UX team of a digital agency. This week three products land on your desk. Two are warm-ups: BankDirect, a customer portal for transfers, card management and contract services, and AdminFlow, an administration platform that has three variants for its main navigation. The main case is MoveEasy, a mobility provider's portal where users book trips, manage tickets, change payment data and send support requests. It is rich in functions, but using it is slow and error-prone; above all on mobile devices, mis-taps and abandoned processes pile up.

| What the plan gives you | How the task runs · three blocks |
|---|---|
| • Block 1.1: BankDirect, with 14 equal menu options, “start transfer” as a small link at the top right, buttons close together with similar labels, much information in forms, numbers and options to remember, and small central buttons on mobile<br>• Block 1.2: three navigation variants for AdminFlow; frequent and occasional users, the department wants every function visible, IT wants little rework, mobile use rising strongly, release in 7 weeks, limited test data<br>• Block 2.1: MoveEasy, with €140,000 and 10 weeks, mobile use already above 60 %, no complete relaunch, marketing that wants many offers visible and support that wants fewer operating errors | • Block 1.1: find the hurdles of interaction. Say where the portal feels slow, unclear or error-prone, assign your observations to the three laws, name five hurdles, write three effect statements and pick the two biggest weaknesses.<br>• Block 1.2: rate three navigation variants under conflicting goals. Rate each on five criteria, choose one, name the conflicts and the risks you accept, and write a recommendation to the project lead.<br>• Block 2.1: the case study. The central problems of interaction and decision, sorted into five categories, four measures, justified on four criteria, a decision for the first 10 weeks and a recommendation to the division management. |

**What is known and what is open**

| In the brief | Clear · Case assumption | Open · on purpose |
|---|---|---|
| • BankDirect: 14 equal menu options, “start transfer” as a small top-right link, similar buttons close together, crowded forms, things to remember, small mobile buttons.<br>• AdminFlow: three navigation variants in words; frequent and occasional users; 7 weeks; limited test data; mobile use rising.<br>• MoveEasy: small, badly placed booking buttons, too many options, tariffs to remember, long similar lists, equal choices in each step, small touch targets; €140,000 and 10 weeks; mobile above 60 %. | • You review BankDirect and AdminFlow as an agency would: from their screens, with no access to their data.<br>• MoveEasy's booking shows all ticket types and their conditions on one screen; the conditions are needed again two steps later.<br>• MoveEasy's main Book button sits at the top of the phone screen, out of reach of the thumb.<br>• Support at MoveEasy hears most often: “I booked the wrong ticket” and “I tapped by mistake”. | • How many users there are, and how many book on a phone exactly: the plan says only “above 60 %”.<br>• Which AdminFlow variant users would cope with best: the test data is limited.<br>• Where exactly MoveEasy users mis-tap: not recorded for every element.<br>• How much of the €140,000 each measure would take: the plan does not say. |

*As in most projects, not everything is known. Decide anyway, and say what you assume.*

:::note Case assumption
The brief says: BankDirect with 14 equal options, a small “start transfer” link, similar buttons close together, crowded forms, numbers to remember and small mobile buttons; AdminFlow's three navigation variants for frequent and occasional users, a department against IT, rising mobile use, 7 weeks and limited test data; MoveEasy with small, badly placed buttons, too many options, things to remember, long similar lists, small touch targets, €140,000, 10 weeks, mobile use above 60 % and no relaunch. Those are the plan's facts and its only figures. Everything else is made up for this exercise: the agency, the pictures, the simulations and the facts marked “Clear”.
:::

# Part 1 · Find the law behind the hurdles and weigh variants · Level 1 · Knowledge

## Block 1.1 · Recognise interaction hurdles in a portal: BankDirect · JUDGED · Core · about 10 min

**Draws on:** A1 · Fitts's law · A2 · Hick's law · A3 · Miller's rule · A4 · The three laws together.

You receive the description of a fictional customer portal, BankDirect, for transfers, card management and contract services. Open it, on the desktop and on a phone, and try to start a transfer as a customer would. You need no prior knowledge: notice where you are slow, unsure or close to a mistake. The aim is to recognise the three UX laws in concrete problems of use and to describe their effect step by step.

![BankDirect, as the portal shows it.](_figures/d5_b1-1_0.png)

**Question 1 of 5 · Describe which places could feel slow, unclear or error-prone from the user's point of view**

Name the places where you were slow, unsure or close to a mistake, and say why.

*How to build the answer:*

- Open BankDirect and try to start a transfer; then open it on a phone and try again.
- Write down each place where you were slow, unsure or almost tapped the wrong thing.
- For each, say what made it slow, unclear or risky.

[[ANSWER lines=4]]

**Question 2 of 5 · Assign the observations to the three laws Fitts's law, Hick's law and Miller's rule**

Write the observations that belong to each law in a few words. One observation may touch two laws; put it where its effect is strongest.

*How to build the answer:*

- Take your observations from question 1.
- Ask what each one is about: hitting a target, choosing between options, or keeping something in mind.
- Write it under that law.

| UX law | The observations for this law |
|---|---|
| Fitts's law · size, distance, reach | __ |
| Hick's law · number of choices | __ |
| Miller's rule · what must be held in mind | __ |

**Question 3 of 5 · Name at least 5 concrete hurdles of use**

*How to build the answer:*

- Go back through your observations.
- Write each hurdle as something concrete in the portal, and say what it makes the user do or risk.

Write them as a list, one hurdle per line, each concrete, with what it makes the user do or risk.

[[ANSWER lines=7]]

**Question 4 of 5 · Write an effect statement for three points: “For users this could mean that …”**

*How to build the answer:*

- Pick three hurdles from question 3.
- Finish the plan's sentence with what the user would do, risk or fail to do.

Write them as a list, one statement per line, each starting with the hurdle and ending with what it could mean for users.

[[ANSWER lines=5]]

**Question 5 of 5 · Prioritise the two biggest weaknesses with regard to efficiency and error risk**

*How to build the answer:*

- Look at your hurdles with two questions: which one costs the most time, and which one can cause the worst mistake?
- Pick the two that weigh most on efficiency and error risk together, and say why.

Write them as a list, the bigger weakness first, each with why it weighs most on efficiency and error risk.

[[ANSWER lines=4]]

## Block 1.2 · Rate navigation and interaction concepts under conflicting goals: AdminFlow · JUDGED · Core · about 8 min

**Draws on:** A1 · Fitts's law · A2 · Hick's law · A3 · Miller's rule · A5 · Less searching, fewer errors, less decision stress, and weighing a measure.

AdminFlow is an administration platform. Three variants for its main navigation are described in words: A) all functions visible at a glance, so a high access to functions, but many options at once; B) the central tasks are large and easy to reach, while rare functions lie deeper in submenus; C) a modern, minimalist layout with few visible options, but many steps to the actual action. The conditions: the target group is frequent and occasional users, the department demands that all functions are visible, IT wants to manage with little rework, mobile use is rising strongly, the release is in 7 weeks, and only limited user test data exists. Decide anyway, and say what you assume.

![The product to read, as the lab shows it (adminnav).](_figures/d5_b1-2_0.png)

**Question 1 of 5 · Rate each variant on reachability, decision effort, memory load, efficiency and error risk**

Write a few sentences for each variant that cover all five criteria. Many teams rate each criterion Low, Medium or High with a reason; you may do that or write it in your own words.

*How to build the answer:*

- Take one variant at a time and keep both groups in mind, frequent and occasional users, on the desktop and on a phone.
- For each criterion, say how the variant does and which law explains it.
- Use the same five criteria for every variant, so you can compare them.

| Variant | Reachability | Decision effort | Memory load | Efficiency | Error risk |
|---|---|---|---|---|---|
| Variant A · all functions visible, many options at once | __ | __ | __ | __ | __ |
| Variant B · central tasks large, rare ones in submenus | __ | __ | __ | __ | __ |
| Variant C · minimalist, many steps to the action | __ | __ | __ | __ | __ |

**Question 2 of 5 · Decide which variant is the most viable under the given conditions**

Choose one variant, then give your reason below. There is no single right choice; the reason has to rest on the users and the conditions.

*How to build the answer:*

- Say which group, which device and which condition weigh most for you.
- Say how your choice meets them better than the other two.

[[CHOOSE]] Variant A · all functions visible, many options at once ‖ Variant B · central tasks large, rare ones in submenus ‖ Variant C · minimalist, many steps to the action

**Why this variant, under these conditions?**

Give your reason with the conditions: frequent and occasional users, the department against IT, rising mobile use, 7 weeks, limited test data.

*How to build the answer:*

- Name the group, the device and the condition that weigh most for you.
- Say how your variant meets them and why the other two meet them less well.
- Say what your choice gives up.

[[ANSWER lines=4]]

**Question 3 of 5 · Name the conflicts of goals that make your decision difficult**

Name at least two conflicts, each as two goals that pull against each other.

*How to build the answer:*

- Look at who wants what: the department, IT, frequent users, occasional users, mobile users.
- Write each conflict as “… against …” and say who stands for each side.

[[ANSWER lines=4]]

**Question 4 of 5 · Which risks do you knowingly take with your decision?**

Name at least one risk you accept and who would feel it.

*How to build the answer:*

- Think of what your chosen variant is weak at.
- Say who would notice and what would happen.

[[ANSWER lines=4]]

**Question 5 of 5 · Formulate a recommendation to the project management**

Two to four sentences: what you recommend, why, and what you will check next.

*How to build the answer:*

- Lead with the recommendation.
- Give the one reason the project management can follow.
- Say what you will check after the release.

[[ANSWER lines=3]]

# Part 2 · The case study · Level 2 · Application · Case study (2 UE)

:::note Case study: 2 teaching units (UE5–6)
This part is the day's Level 2 case study. It takes 2 UE (about 90 minutes): UE5 for the briefing and your own work, UE6 for comparing your results with your group and for the trainer's closing. The block below needs about 15 minutes of writing; the rest of the time is discussion.
:::

## Block 2.1 · Case study: optimising the booking and management portal MoveEasy · JUDGED · Core · about 15 min

**Draws on:** A1 · Fitts's law · A2 · Hick's law · A3 · Miller's rule · A4 · The three laws together · A5 · Less searching, fewer errors, less decision stress, and weighing a measure.

A provider of mobility services runs MoveEasy, a portal where users book trips, manage tickets, change payment data and send support requests. The portal is rich in functions, but use is slow and error-prone; above all on mobile devices, mis-taps and abandoned processes pile up. The observed problems: central booking buttons are small and partly badly placed, too many options at once on the start page raise uncertainty, users have to remember several tariffs and conditions at once, important actions lie in long lists of similar options, process steps offer too many equal choices, and mobile interaction is hard because touch targets are too small. The conditions: a budget of €140,000, 10 weeks for the implementation, mobile use is already above 60 %, a complete relaunch is not possible, marketing wants to keep as many offers visible as possible, and support demands fewer operating errors and questions. You work through six steps.

![MoveEasy today, as the portal shows it.](_figures/d5_b2-1_0.png)

**Question 1 of 6 · Analyse the central problems of interaction and decision in the portal**

*How to build the answer:*

- Open MoveEasy on a phone and book a day ticket, then change your payment data, as a customer would.
- Write one problem per line as an effect on the user, and note the law behind it if you see one.

Write them as a list, one problem per line, each as an effect on the user. At least five.

[[ANSWER lines=7]]

**Question 2 of 6 · Assign the problems to the categories reachability, decision effort, memory load, mobile usability and error risk**

Write the problems that belong to each category in a few words. A problem may fit two categories.

*How to build the answer:*

- Take your problems from question 1.
- Ask which of the five categories each one affects most, and write it there.

| Category | The problems in this category |
|---|---|
| Reachability | __ |
| Decision effort | __ |
| Memory load | __ |
| Mobile usability | __ |
| Error risk | __ |

**Question 3 of 6 · Develop 4 prioritised measures for improvement**

*How to build the answer:*

- Turn each group of problems into something you could change within 10 weeks and without a relaunch.
- Put them in order: what helps most users soonest, above all on the phone, first.

Write them as a numbered list, the first priority first, each with what it changes for users.

[[ANSWER lines=6]]

**Question 4 of 6 · Justify your selection using effect on users, feasibility, risk and time pressure**

Use all four criteria and say how they support your selection and its order.

*How to build the answer:*

- Say for your first measure what it changes for speed and errors, above all on the phone.
- Say what is feasible without a relaunch, and the risk of each.
- Keep marketing and support in mind, and the 10 weeks.

[[ANSWER lines=5]]

**Question 5 of 6 · Make a prioritisation decision for the first 10 weeks**

Say what you do in the first 10 weeks, in which order, and what you leave for later, with the reason.

*How to build the answer:*

- Say what comes first and why.
- Say what you do in parallel and what waits.
- Say how you deal with marketing's offers.

[[ANSWER lines=5]]

**Question 6 of 6 · Formulate a recommendation to the division management**

Three to five sentences: what you recommend, what has priority, and what you expect to change.

*How to build the answer:*

- Lead with the recommendation.
- Name the priorities.
- Say what you expect to change for users and for the company.

[[ANSWER lines=4]]

# Task 2 · Route 2 · UX Strategy Memo: decide as Chief Experience Officer

## The situation: the mobility provider behind MoveEasy, and all its interfaces

*Read once · about 2 min*

You take the perspective of the Chief Experience Officer of the mobility provider that runs MoveEasy. The company has a customer portal, a service app and an administration interface. Many digital processes work, but they are unnecessarily slow, error-prone and hard to access for first-time users. Inside the company new functions are prioritised, although known problems of reach, choice complexity and information overload remain unsolved. The management demands a sound strategy to improve efficiency, orientation and the quality of interaction. You are not to correct single buttons or menus but to develop a sound decision architecture for navigation, interaction and action logic based on Fitts's law, Hick's law and Miller's rule.

| The framework | How the task runs · one block |
|---|---|
| • The budget is limited<br>• Mobile use is growing strongly<br>• Several stakeholders pursue conflicting interests<br>• Not all systems can be adapted at the same time<br>• User data is only partly available<br>• First results must be visible at short notice<br>• Wrong decisions increase support costs, abandoned processes and frustration | • Block 3.1 asks seven questions: a guiding vision for efficient interaction, three strategic decisions, a prioritised architecture of measures, a risk analysis, a governance model, one decision under uncertainty and a management statement. |

**What is known and what is open**

| In the brief | Clear · Case assumption | Open · on purpose |
|---|---|---|
| • A customer portal, a service app and an administration interface.<br>• Processes work, but are slow, error-prone and hard for first-time users.<br>• New functions are prioritised; known problems of reach, choice and overload stay.<br>• Mobile use grows strongly; first results must show soon; not all systems at once. | • The company is the mobility provider behind MoveEasy in Route 1.<br>• Each team builds its buttons, lists and forms its own way; there are no shared interaction standards.<br>• Support records the subject of each contact; the portal records completed bookings; nobody records mis-taps. | • How large the budget is: “limited” is all the plan says.<br>• Which interface causes the most errors: the data is only partial.<br>• How many functions are really used: not measured. |

*As in most projects, not everything is known. Decide anyway, and say what you assume.*

:::note Case assumption
The brief says: a company with a customer portal, a service app and an administration interface, processes that work but are slow, error-prone and hard for first-time users, new functions prioritised over known problems of reach, choice complexity and information overload, a limited budget, strongly growing mobile use, conflicting stakeholders, not all systems at once, partial user data, first results soon, and the warning that wrong decisions increase support costs, abandonment and frustration. Those are the plan's facts. That the company is the mobility provider of Route 1 and the facts marked “Clear” are made up for this exercise.
:::

*The memo is addressed to: The management. Subject: An interaction strategy for efficient and low-load digital use.*

# Part 3 · Level 3 · Management decision · Transfer project (3 UE)

:::note Transfer project: 3 teaching units (UE8–10)
UE8: the trainer presents Materi B and sets the role. UE9: you write the memo. UE10: you present the decision and what you give up; the trainer debriefs.
:::

## Block 3.1 · An interaction strategy for efficient, low-load digital use · JUDGED · Core · about 20 min

**Draws on:** B1 · Interaction as an architecture of effect · B2 · Conflicts of goals · B3 · Who owns the interaction standards, and deciding with incomplete data.

Develop a strategic concept for the mobility provider. Your desk holds what the management, the teams and the data say. Open it, then answer the seven questions; your answers build the memo below.

![Your desk: the messages that wait for you, shown in the lab as a mailbox (1 of 6).](_figures/d5_b3-1_0.png)

![Your desk: the messages that wait for you, shown in the lab as a mailbox (2 of 6).](_figures/d5_b3-1_1.png)

![Your desk: the messages that wait for you, shown in the lab as a mailbox (3 of 6).](_figures/d5_b3-1_2.png)

![Your desk: the messages that wait for you, shown in the lab as a mailbox (4 of 6).](_figures/d5_b3-1_3.png)

![Your desk: the messages that wait for you, shown in the lab as a mailbox (5 of 6).](_figures/d5_b3-1_4.png)

![Your desk: the messages that wait for you, shown in the lab as a mailbox (6 of 6).](_figures/d5_b3-1_5.png)

![The platform as it is today, as the lab lets you observe it (1 of 5).](_figures/d5_b3-1_6.png)

![The platform as it is today, as the lab lets you observe it (2 of 5).](_figures/d5_b3-1_7.png)

![The platform as it is today, as the lab lets you observe it (3 of 5).](_figures/d5_b3-1_8.png)

![The platform as it is today, as the lab lets you observe it (4 of 5).](_figures/d5_b3-1_9.png)

![The platform as it is today, as the lab lets you observe it (5 of 5).](_figures/d5_b3-1_10.png)

**Question 1 of 7 · A guiding vision for efficient interaction: which quality of use and which relief for users should be reached systematically?**

One or two sentences about how fast, safe and light interaction should feel, in every interface and on every device.

*How to build the answer:*

- Say what users should be able to do quickly and safely, also on a phone and the first time.
- Say what they should never have to do: aim, compare too much or remember.

[[ANSWER lines=3]]

**Question 2 of 7 · Three strategic guiding decisions on reachability, reducing choice, structuring information and prioritising main actions**

*How to build the answer:*

- Take your vision and ask which three choices would make it real.
- Write each as “we will …, even though that means …”.

Write them as a list, one decision per line, each with what it gives up.

[[ANSWER lines=5]]

**Question 3 of 7 · A prioritised architecture of measures: which processes, screens or systems are improved first, and why?**

Put the processes, screens or systems in an order and give the reason for the first ones.

*How to build the answer:*

- List the candidates: the most used processes, the interfaces and the shared elements.
- Put first what most users touch and where most errors happen, on the phone.
- Say why the others can wait.

[[ANSWER lines=4]]

**Question 4 of 7 · A risk analysis: which wrong assumptions about user behaviour and the need for functions would be especially critical?**

Name two or three assumptions about how users behave or which functions they need, and the harm if each is wrong.

*How to build the answer:*

- Write down what your concept assumes about users' behaviour.
- Write down what it assumes about which functions are needed.
- For each, say what happens if it is wrong.

[[ANSWER lines=5]]

**Question 5 of 7 · A governance model: who is responsible for the interaction standards, and how are conflicts between feature richness and usability decided?**

Name roles, not people: who owns the interaction standards, how a request for more visible functions is decided, and on what basis.

*How to build the answer:*

- Name who owns the interaction standards across all interfaces.
- Name how a request for more visible functions or a new function is decided.
- Say on what basis the conflict is decided.

[[ANSWER lines=5]]

**Question 6 of 7 · A decision under uncertainty: make at least one prioritised decision despite incomplete data and justify it**

Say what you decide, what you do not know, and why the decision is responsible all the same, for example when you would reverse it.

*How to build the answer:*

- State the decision in one sentence.
- Name what you do not know.
- Say why it is still responsible: it can be reversed, it can be checked soon, or waiting costs more.

[[ANSWER lines=5]]

**Question 7 of 7 · A management statement: a recommendation to the management with a clear priority and a strategic reason**

Four to six sentences: the direction first, then the priority, the reason and what you ask of the management.

*How to build the answer:*

- Start with the direction in one sentence.
- Name the priority and the reason that carries it.
- Say what you ask of the management and what you will report back.

[[ANSWER lines=5]]
