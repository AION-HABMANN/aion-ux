---
doc: task
day: 12
kicker: DAY 12 · TASK 1 AND TASK 2 · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: CitizenConnect: UX Analysis File and UX Strategy Memo
subtitle: Describe the effect, choose the measures as a team member, and decide as Chief Experience Officer
daytitle: Day 12 · Module 6 (day 1 of 2): Accessibility, standards and neurodiversity
doctype: Task (worksheet with answer spaces). Task 1 (UX Analysis File) and Task 2 (UX Strategy Memo).
route: Task 1 = Route 1, Levels 1 and 2 (draws on Materi A). Task 2 = Route 2, Level 3 (draws on Materi B).
minutes: Task 1 about 33 min · Task 2 about 20 min
case: CitizenConnect, the day's case study; other products appear as warm-ups
intro: This is the worksheet for Day 12. Read the case once, study the evidence printed in this document, and write your answers in the boxes and tables. You can work through it on paper or type into the document. All blocks are Core. There are no answer keys and no scores; the reason you give matters more than the choice.
glossary: accessibility,contrast,ux,inclusive-design,governance,legibility,keyboard-operable,case-assumption,consistency,perception,component,assistive-technology,stakeholder,cxo,page-type,brand,decision-arch,wcag
---

[[CONTENTS]]

:::note Which plan item each block answers
| UE | Plan item (Strukturplan, Day 12) | Block in this document |
|---|---|---|
| UE2 | Level 1, task 1 · Recognise barriers in a digital offer without prior knowledge: PublicAccess | Block 1.1 (Core) |
| UE3 | Level 1, task 2 · Rate inclusive design under conflicting goals: LearnAccess | Block 1.2 (Core) |
| UE4 | Coaching: from describing to deciding | A classroom talk led by the trainer; not a worksheet block |
| UE5–6 | Level 2 case study · Case study: making the portal CitizenConnect more accessible | Block 2.1 (Core) |
| UE7 | Feedback round with a management perspective | A classroom discussion led by the trainer; not a worksheet block |
| UE8–10 | Level 3 transfer project · A strategic accessibility and inclusion architecture for digital services | Block 3.1 (Core), in Task 2 |
:::

:::note Your name
Write your full name here. Use the same name on every Task document this week; it is how your work is matched.
[[ANSWER lines=1]]
:::

# Task 1 · Route 1 · UX Analysis File: find the barriers, then decide what to repair

## The case: two platforms on the UX team's desk, and CitizenConnect

*Read once · about 3 min*

You work in the UX team of a digital agency. This week three platforms land on your desk. Two are warm-ups: PublicAccess, a service portal for citizen services, appointments and documents, and LearnAccess, a platform for digital further training with three redesigns to choose from. The main case is CitizenConnect, a city's service platform for information, appointment bookings and applications. It is heavily used, but complaints about poor legibility, unclear navigation and poor operability with assistive technologies keep coming. The city wants it to become more accessible and inclusive, without a complete relaunch.

| What the plan gives you | How the task runs · three blocks |
|---|---|
| • Block 1.1: PublicAccess, with navigation that works well only with a mouse, hints marked by colour only, weak contrast in places, complex terms and long nested sentences in forms, error messages that explain too little, and images and symbols that are not self-explanatory or described<br>• Block 1.2: three redesigns of LearnAccess; a very heterogeneous target group, modern and inclusive, a limited budget, release in 10 weeks, legal requirements that must be met, department and marketing with different priorities<br>• Block 2.1: CitizenConnect, with €160,000 and 14 weeks, no complete relaunch, legal requirements first, several departments supplying content, and first improvements soon | • Block 1.1: find the barriers of PublicAccess without prior knowledge. Describe the hurdles, name five barriers, sort them into five categories, write three effect statements and pick the two most serious barriers.<br>• Block 1.2: rate three redesigns under conflicting goals. Rate each on six criteria, choose one, name the conflicts between design ambition, accessibility and effort and the remaining risks, and write a recommendation to the project lead.<br>• Block 2.1: the case study. The central barriers, sorted into five categories, four measures, justified on five criteria, a decision for the first 14 weeks and a recommendation to the division management. |

**What is known and what is open**

| In the brief | Clear · Case assumption | Open · on purpose |
|---|---|---|
| • PublicAccess: mouse-only navigation, colour-only hints, weak contrast, complex forms, unhelpful errors, undescribed images.<br>• LearnAccess: three redesigns in words; a very heterogeneous group; 10 weeks; legal requirements; department against marketing.<br>• CitizenConnect: weak contrast, unstructured forms, patchy keyboard use, visual-only hints, complicated content, inconsistent pages; €160,000 and 14 weeks; no relaunch. | • You review PublicAccess and LearnAccess as an agency would: by using them, with the keyboard too, without access to their code.<br>• CitizenConnect is built from a few page templates (information page, appointment booking, application form) that every department fills with its own content.<br>• The city must meet the accessibility rules for public bodies; the target it has set itself is WCAG 2.2 level AA.<br>• Complaints arrive by phone and e-mail and are not sorted by barrier. | • How many users meet each barrier: nobody has measured it.<br>• Which assistive technologies citizens use: never asked.<br>• How much of the €160,000 each measure would take: the plan does not say.<br>• Whether disabled citizens were ever part of a test: no record. |

*As in most projects, not everything is known. Decide anyway, and say what you assume.*

:::note Case assumption
The brief says: PublicAccess with mouse-only navigation, colour-only hints, weak contrast in places, complex terms and long nested sentences in forms, insufficient error messages, and images and symbols that are not self-explanatory or described; LearnAccess's three redesigns (A modern and brand-strong with reduced contrast and small text, B structured, high-contrast, plain and well focusable but less premium, C good basic accessibility with optional adaptations but more technical effort) for a very heterogeneous group, modern and inclusive, a limited budget, 10 weeks, legal requirements, department against marketing; CitizenConnect's weak contrast, unstructured forms with unclear errors, patchy keyboard operation, visual-only hints, complicated content and inconsistent page types, €160,000, 14 weeks, no relaunch, legal requirements first, several departments supplying content, first improvements soon. Those are the plan's facts and its only figures. Everything else is made up for this exercise: the agency, the pages, the simulations and the facts marked “Clear”.
:::

# Part 1 · Find the barriers, and weigh redesigns · Level 1 · Knowledge

## Block 1.1 · Recognise barriers in a digital offer without prior knowledge: PublicAccess · JUDGED · Core · about 10 min

**Draws on:** A1 · Accessibility, usability and inclusive design · A2 · Barriers in perception · A3 · Barriers in interaction · A4 · Barriers in language and structure.

You receive the description of a fictional service portal, PublicAccess, for citizen services, appointments and documents. Open it and use it as a citizen: book an appointment, find a document, fill in a form and make a mistake. Then try the same with the keyboard alone (Tab, Enter, the arrow keys). You need no prior knowledge: notice where you get stuck, and imagine who else would. The aim is to recognise barriers systematically and to understand accessibility from the user's side, not only as a technical matter.

![The product to read, as the lab shows it (publicaccess).](_figures/d12_b1-1_0.png)

**Question 1 of 5 · Describe spontaneously which hurdles the offer could have for different groups of users**

Two to four sentences: which groups, and what stops them.

*How to build the answer:*

- Open PublicAccess and book an appointment with the mouse, then try it with the keyboard alone.
- Look at the colours, the pictures and the form texts, and make a mistake in the form.
- Write who would get stuck where.

[[ANSWER lines=4]]

**Question 2 of 5 · Name at least 5 possible barriers in the interface**

*How to build the answer:*

- Go through your visit: the menu, the calendar, the text, the pictures, the form, the error.
- For each barrier, say what it is and whom it stops.

Write them as a list, one barrier per line, each with whom it stops.

[[ANSWER lines=7]]

**Question 3 of 5 · Assign the observations to the categories perceivability, operability, comprehensibility, error tolerance and participation**

Write the observations that belong to each category in a few words. One may fit two; put it where its effect is strongest.

*How to build the answer:*

- Take your barriers from question 2.
- Ask which of the five each one affects most, and write it there.

| Category | The observations in this category |
|---|---|
| Perceivability | __ |
| Operability | __ |
| Comprehensibility | __ |
| Error tolerance | __ |
| Participation | __ |

**Question 4 of 5 · Write an effect statement for three points: “For users this could mean that …”**

*How to build the answer:*

- Pick three barriers from question 2.
- Finish the plan's sentence with what the user would feel, do or fail to do.

Write them as a list, one statement per line, each starting with the barrier and ending with what it could mean for users.

[[ANSWER lines=5]]

**Question 5 of 5 · Prioritise the two most serious barriers with regard to usability and the risk of exclusion**

*How to build the answer:*

- Look at your barriers with two questions: which stops people completely, and which affects the most people?
- Write the two, each with why it weighs most.

Write two lines: barrier 1 and barrier 2, each with why it weighs most.

[[ANSWER lines=4]]

## Block 1.2 · Rate inclusive design under conflicting goals: LearnAccess · JUDGED · Core · about 8 min

**Draws on:** A1 · Accessibility, usability and inclusive design · A2 · Barriers in perception · A4 · Barriers in language and structure · A5 · Standards, law and risk.

LearnAccess is a platform for digital further training that is to be redesigned. Three variants are described in words: A) visually modern and brand-strong, but with reduced contrast and small text; B) clearly structured, high in contrast, in plain language and well focusable, but less “premium” in its brand; C) good basic accessibility with some optional adaptation functions, but a higher technical effort. The conditions: the target group is very heterogeneous, the company wants to look modern and inclusive, the budget for technical changes is limited, the release is in 10 weeks, legal requirements must be met, and the department and marketing set different priorities. Decide anyway, and say what you assume.

![The product to read, as the lab shows it (designs).](_figures/d12_b1-2_0.png)

**Question 1 of 5 · Rate each variant on accessibility, comprehensibility, brand effect, feasibility, legal certainty and user-friendliness**

Write a few sentences for each variant that cover all six criteria. Many teams rate each criterion Low, Medium or High with a reason; you may do that or write it in your own words.

*How to build the answer:*

- Take one variant at a time and keep the conditions in mind: heterogeneous users, 10 weeks, legal requirements.
- For each criterion, say how the variant does and why.
- Use the same six criteria for every variant.

| Variant | Accessibility | Comprehensibility | Brand effect | Feasibility | Legal certainty | User-friendliness |
|---|---|---|---|---|---|---|
| Variant A · modern and brand-strong | __ | __ | __ | __ | __ | __ |
| Variant B · structured, high contrast, plain | __ | __ | __ | __ | __ | __ |
| Variant C · basic accessibility with options | __ | __ | __ | __ | __ | __ |

**Question 2 of 5 · Decide which variant is the most viable under the given conditions**

Choose one variant, then give your reason below. There is no single right choice; the reason has to rest on the users and the conditions.

*How to build the answer:*

- Say which condition weighs most for you.
- Say how your choice meets it better than the other two.

[[CHOOSE]] Variant A · modern and brand-strong ‖ Variant B · structured, high contrast, plain ‖ Variant C · basic accessibility with options

**Why this variant, under these conditions?**

Give your reason with the conditions: a very heterogeneous group, modern and inclusive, a limited budget, 10 weeks, legal requirements, department against marketing.

*How to build the answer:*

- Name the condition that weighs most for you.
- Say how your variant meets it and why the other two meet it less well.
- Say what your choice gives up and how you would deal with its weakness.

[[ANSWER lines=4]]

**Question 3 of 5 · Name the conflicts of goals between design ambition, accessibility and effort**

Name at least two conflicts, each as one goal against another, and who stands for each side.

*How to build the answer:*

- Look at what the design ambition wants (a premium look), what accessibility needs (contrast, size, plain words) and what effort allows (10 weeks, budget).
- Write each conflict as “… against …” and say who stands for each side.

[[ANSWER lines=4]]

**Question 4 of 5 · Which risks remain despite your decision?**

Name at least one risk that remains and who would feel it.

*How to build the answer:*

- Think of what your chosen variant is weak at.
- Say who would notice and what would happen.

[[ANSWER lines=4]]

**Question 5 of 5 · Formulate a recommendation to the project management**

Two to four sentences: what you recommend, why, and what you will check next.

*How to build the answer:*

- Lead with the recommendation.
- Give the one reason the project management can follow.
- Say what you will test before and after the release.

[[ANSWER lines=3]]

# Part 2 · The case study · Level 2 · Application · Case study (2 UE)

:::note Case study: 2 teaching units (UE5–6)
This part is the day's Level 2 case study. It takes 2 UE (about 90 minutes): UE5 for the briefing and your own work, UE6 for comparing your results with your group and for the trainer's closing. The block below needs about 15 minutes of writing; the rest of the time is discussion.
:::

## Block 2.1 · Case study: making the portal CitizenConnect more accessible · JUDGED · Core · about 15 min

**Draws on:** A1 · Accessibility, usability and inclusive design · A2 · Barriers in perception · A3 · Barriers in interaction · A4 · Barriers in language and structure · A5 · Standards, law and risk.

A municipal service platform offers information, appointment bookings and application processes digitally. It is heavily used, but complaints about poor legibility, unclear navigation and poor operability with assistive technologies keep coming. The organisation wants to make the portal more accessible and inclusive without a complete relaunch. The observed problems: weak contrast makes central information hard to read; forms are not cleanly structured and contain unclear error messages; keyboard operation is patchy; important hints are differentiated visually but not in words; content is partly complicated; and different page types are not built consistently. The conditions: a budget of €160,000, 14 weeks for the implementation, no complete relaunch, legal requirements that must be considered first, several departments that supply content, and first improvements that must show soon. You work through six steps.

![The product to read, as the lab shows it (citizenconnect).](_figures/d12_b2-1_0.png)

**Question 1 of 6 · Analyse the central barriers and gaps in inclusion of the portal**

*How to build the answer:*

- Open CitizenConnect as a citizen: read an information page, book an appointment, fill in an application with a mistake, then try it all with the keyboard alone.
- Write one barrier per line, and what it does.

Write them as a list, one barrier per line, each with what it does. At least five.

[[ANSWER lines=7]]

**Question 2 of 6 · Assign the problems to the categories perceivability, operability, comprehensibility, error tolerance and consistency**

Write the problems that belong to each category in a few words.

*How to build the answer:*

- Take your barriers from question 1.
- Ask which category each affects most, and write it there.

| Category | The problems in this category |
|---|---|
| Perceivability | __ |
| Operability | __ |
| Comprehensibility | __ |
| Error tolerance | __ |
| Consistency | __ |

**Question 3 of 6 · Develop 4 prioritised measures for improvement**

*How to build the answer:*

- Turn each group of problems into something you could change within 14 weeks and €160,000, without a relaunch.
- Put them in order: what reduces exclusion first.

Write them as a numbered list, the first priority first, each with what it changes for citizens.

[[ANSWER lines=6]]

**Question 4 of 6 · Justify your selection using effect on users, legal certainty, feasibility, risk and time pressure**

Use all five criteria and say how they support your selection and its order.

*How to build the answer:*

- Say what your first measures change for exclusion.
- Say how they serve legal certainty, and what is feasible without a relaunch.
- Keep the 14 weeks and the several departments in mind.

[[ANSWER lines=5]]

**Question 5 of 6 · Make a prioritisation decision for the first 14 weeks**

Say what you do in the first 14 weeks, in which order, and what you leave for later, with the reason.

*How to build the answer:*

- Say what comes first and why.
- Say what you do in parallel and what waits.
- Say how you make the first improvements visible.

[[ANSWER lines=5]]

**Question 6 of 6 · Formulate a recommendation to the division management**

Three to five sentences: what you recommend, what has priority, and what you expect to change.

*How to build the answer:*

- Lead with the recommendation.
- Name the priorities.
- Say what you expect to change.

[[ANSWER lines=4]]

# Task 2 · Route 2 · UX Strategy Memo: decide as Chief Experience Officer

## The situation: services that formally work, but not for everyone

*Read once · about 2 min*

You take the perspective of the Chief Experience Officer of the organisation behind CitizenConnect: a website, a customer portal and digital service processes. Its systems formally work, but they are not equally accessible to all users, and complaints about legibility, operability and comprehensibility keep rising. Inside, accessibility is seen mostly as a compliance topic, not as an integral part of UX quality and service responsibility. The management expects a sound strategy for building accessibility and inclusive design systematically into product development and governance. You are not to repair single barriers, but to develop a sound decision architecture for accessibility, inclusion and legally secure UX quality.

| The framework | How the task runs · one block |
|---|---|
| • The budget is limited<br>• Several stakeholders pursue different goals<br>• Legal requirements are binding<br>• Not all systems can be adapted at the same time<br>• Data on real barriers in use is partly incomplete<br>• First improvements must be visible at short notice<br>• Wrong decisions can increase exclusion, reputational damage and legal risks | • Block 3.1 asks seven questions: a guiding vision of digital participation, three strategic decisions, a prioritised architecture of measures, a risk analysis, a governance model, one decision under uncertainty and a management statement. |

**What is known and what is open**

| In the brief | Clear · Case assumption | Open · on purpose |
|---|---|---|
| • A website, a customer portal and digital service processes that formally work.<br>• Not equally accessible; complaints about legibility, operability and comprehensibility rise.<br>• Inside, accessibility is seen as compliance, not as UX quality.<br>• Legal requirements are binding; first improvements must show soon. | • The organisation is the city's citizen services department behind CitizenConnect in Route 1; the website and the customer portal are its other channels.<br>• Every department writes its own content; an external agency builds the templates; the brand team owns the colours.<br>• An external audit last year listed many failures; nobody owns the list. | • How large the budget is: “limited” is all the plan says.<br>• Which barriers hurt most in daily use: the complaints are not sorted.<br>• How many disabled citizens stopped using the portal: unknown. |

*As in most projects, not everything is known. Decide anyway, and say what you assume.*

:::note Case assumption
The brief says: an organisation with a website, a customer portal and digital service processes that formally work but are not equally accessible, rising complaints about legibility, operability and comprehensibility, accessibility seen inside as compliance, a limited budget, several stakeholders, binding legal requirements, not all systems at once, incomplete data on real barriers, first improvements soon, and the warning that wrong decisions can increase exclusion, reputational damage and legal risks. Those are the plan's facts. That the organisation is the one behind CitizenConnect and the facts marked “Clear” are made up for this exercise.
:::

*The memo is addressed to: The management. Subject: An accessibility and inclusion architecture for our digital services.*

# Part 3 · Level 3 · Management decision · Transfer project (3 UE)

:::note Transfer project: 3 teaching units (UE8–10)
UE8: the trainer presents Materi B and sets the role. UE9: you write the memo. UE10: you present the decision and what you give up; the trainer debriefs.
:::

## Block 3.1 · A strategic accessibility and inclusion architecture for digital services · JUDGED · Core · about 20 min

**Draws on:** B1 · Accessibility as quality and responsibility, not a compliance task · B2 · Effort, standards, diversity, law · B3 · Who owns accessibility, and deciding with incomplete data.

Develop a strategic concept for the organisation. Your desk holds what the management, the legal team, the brand team, the departments, the template agency and citizen service say. Open it, then answer the seven questions; your answers build the memo below.

![Your desk: the messages that wait for you, shown in the lab as a mailbox (1 of 6).](_figures/d12_b3-1_0.png)

![Your desk: the messages that wait for you, shown in the lab as a mailbox (2 of 6).](_figures/d12_b3-1_1.png)

![Your desk: the messages that wait for you, shown in the lab as a mailbox (3 of 6).](_figures/d12_b3-1_2.png)

![Your desk: the messages that wait for you, shown in the lab as a mailbox (4 of 6).](_figures/d12_b3-1_3.png)

![Your desk: the messages that wait for you, shown in the lab as a mailbox (5 of 6).](_figures/d12_b3-1_4.png)

![Your desk: the messages that wait for you, shown in the lab as a mailbox (6 of 6).](_figures/d12_b3-1_5.png)

![The platform as it is today, as the lab lets you observe it (1 of 5).](_figures/d12_b3-1_6.png)

![The platform as it is today, as the lab lets you observe it (2 of 5).](_figures/d12_b3-1_7.png)

![The platform as it is today, as the lab lets you observe it (3 of 5).](_figures/d12_b3-1_8.png)

![The platform as it is today, as the lab lets you observe it (4 of 5).](_figures/d12_b3-1_9.png)

![The platform as it is today, as the lab lets you observe it (5 of 5).](_figures/d12_b3-1_10.png)

![A real platform that solved this, shown for the class discussion (1 of 3).](_figures/d12_b3-1_11.png)

![A real platform that solved this, shown for the class discussion (2 of 3).](_figures/d12_b3-1_12.png)

![A real platform that solved this, shown for the class discussion (3 of 3).](_figures/d12_b3-1_13.png)

**Question 1 of 7 · A guiding vision of digital participation: which form of accessibility, comprehensibility and quality of use should be guaranteed systematically?**

One or two sentences about who must be able to use the services, how well, and what that means for every product.

*How to build the answer:*

- Say who must be able to use every service.
- Say what quality of use that means: perceivable, operable, understandable.

[[ANSWER lines=3]]

**Question 2 of 7 · Three strategic guiding decisions on accessibility standards, inclusive design, prioritising barriers and governance**

*How to build the answer:*

- Take your vision and ask which three choices would make it real.
- Write each as “we will …, even though that means …”.

Write them as a list, one decision per line, each with what it gives up.

[[ANSWER lines=5]]

**Question 3 of 7 · A prioritised architecture of measures: which journeys, components or systems are improved first, and why?**

Put the journeys, components or systems in an order and give the reason for the first ones.

*How to build the answer:*

- List the candidates: the page templates, the form component, the appointment journey, the application journeys, the website, the customer portal, PDFs.
- Put first what reaches the most people and removes total exclusion.
- Say why the others wait.

[[ANSWER lines=4]]

**Question 4 of 7 · A risk analysis: which wrong assumptions about user diversity, effort and legal certainty would be especially critical?**

Name two or three assumptions and the harm if each is wrong.

*How to build the answer:*

- Write down what your concept assumes about who the users are.
- Write down what it assumes about the effort.
- Write down what it assumes about legal certainty.

[[ANSWER lines=5]]

**Question 5 of 7 · A governance model: who is responsible for accessibility principles, and how are conflicts between brand, technology, law and user interest decided?**

Name roles, not people: who owns the principles and the target level, how it is checked in every release, the roles of the legal team, the brand team and the departments, and how a conflict is decided.

*How to build the answer:*

- Name who owns the accessibility principles and the target level.
- Say how it is checked in every release and every purchase.
- Say how a conflict between brand, technology, law and user interest is decided.

[[ANSWER lines=5]]

**Question 6 of 7 · A decision under uncertainty: make at least one prioritised decision despite patchy data and justify it responsibly**

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
