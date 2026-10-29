---
doc: task
day: 11
kicker: DAY 11 · TASK 1 AND TASK 2 · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: CityHelp Voice: UX Analysis File and UX Strategy Memo
subtitle: Describe the effect, choose the measures as a team member, and decide as Chief Experience Officer
daytitle: Day 11 · Module 5 (day 2 of 2): Voice interfaces, neuro-design and testing AI interfaces
doctype: Task (worksheet with answer spaces). Task 1 (UX Analysis File) and Task 2 (UX Strategy Memo).
route: Task 1 = Route 1, Levels 1 and 2 (draws on Materi A). Task 2 = Route 2, Level 3 (draws on Materi B).
minutes: Task 1 about 33 min · Task 2 about 20 min
case: CityHelp Voice, the day's case study; other products appear as warm-ups
intro: This is the worksheet for Day 11. Read the case once, study the evidence printed in this document, and write your answers in the boxes and tables. You can work through it on paper or type into the document. All blocks are Core. There are no answer keys and no scores; the reason you give matters more than the choice.
glossary: voice-ui,ux,error-handling,governance,case-assumption,neuro-ux,dialogue-logic,touchpoint,stakeholder,cxo,reachability,predictability,decision-arch,intelligent-interface
---

[[CONTENTS]]

:::note Which plan item each block answers
| UE | Plan item (Strukturplan, Day 11) | Block in this document |
|---|---|---|
| UE2 | Level 1, task 1 · Analyse voice and AI interaction from the user's side: HomeAssist Voice | Block 1.1 (Core) |
| UE3 | Level 1, task 2 · Rate voice and AI interactions under conflicting goals: CareVoice | Block 1.2 (Core) |
| UE4 | Coaching: from describing to deciding | A classroom talk led by the trainer; not a worksheet block |
| UE5–6 | Level 2 case study · Case study: developing the voice service assistant CityHelp Voice | Block 2.1 (Core) |
| UE7 | Feedback round with a management perspective | A classroom discussion led by the trainer; not a worksheet block |
| UE8–10 | Level 3 transfer project · A strategic UX architecture for voice, AI interaction and intelligent testing | Block 3.1 (Core), in Task 2 |
:::

:::note Your name
Write your full name here. Use the same name on every Task document this week; it is how your work is matched.
[[ANSWER lines=1]]
:::

# Task 1 · Route 1 · UX Analysis File: find where voice helps or fails, then decide what to change

## The case: two assistants on the UX team's desk, and CityHelp Voice

*Read once · about 3 min*

You work in the UX team of a digital agency. This week three voice assistants land on your desk. Two are warm-ups: HomeAssist Voice, a digital assistant for energy management, device control and service requests, and CareVoice, a voice assistant for a health platform, with three designs for how it could work. The main case is CityHelp Voice, the voice assistant of a municipal service platform for appointments, status queries and simple citizen requests. The city wants it to lower barriers, improve reachability and relieve its service staff, but it is unsure about comprehensibility, errors, acceptance and the quality of the AI's answers.

| What the plan gives you | How the task runs · three blocks |
|---|---|
| • Block 1.1: HomeAssist Voice, fast but not always comprehensible on complex requests, repeating standard answers on misunderstandings, giving no hints which commands are possible, with suggestions that are partly helpful and partly surprising, saving time in simple cases and creating uncertainty in special ones<br>• Block 1.2: three designs for CareVoice; users of different ages and experience, innovative and reliable, a limited budget, release in 12 weeks, user tests only in first approaches, data protection, trust and error avoidance critical<br>• Block 2.1: CityHelp Voice, with €190,000 and 14 weeks, no full multichannel solution at once, understandable for people who are not at home with technology, limited test data, and first results soon | • Block 1.1: analyse HomeAssist Voice from the user's side. Describe chances and risks, name five places, sort them into six categories, write three effect statements and pick the two biggest weaknesses.<br>• Block 1.2: rate three voice designs under conflicting goals. Rate each on six criteria, choose one, name the conflicts between naturalness, precision and feasibility and the remaining risks, and write a recommendation to the project lead.<br>• Block 2.1: the case study. The central chances and risks, sorted into six categories, four measures, justified on four criteria, a decision for the first 14 weeks and a recommendation to the division management. |

**What is known and what is open**

| In the brief | Clear · Case assumption | Open · on purpose |
|---|---|---|
| • HomeAssist Voice: fast on simple requests, unclear on complex ones, standard answers on misunderstandings, no hints what is possible.<br>• CareVoice: three designs in words; mixed ages and experience; 12 weeks; tests only begun; data protection, trust and error avoidance critical.<br>• CityHelp Voice: simple requests work, ambiguous ones fail, technical errors, distrust in sensitive matters; €190,000 and 14 weeks; limited test data. | • You review HomeAssist Voice and CareVoice as an agency would: by talking to them, with no access to their code or their models.<br>• CityHelp Voice runs on the city's phone line and in its app; for now it handles appointments at the citizens' office, the status of applications and reports such as a broken streetlight.<br>• CityHelp's prototypes were tested with a few dozen citizens in two sessions; nobody tested sensitive requests on purpose.<br>• The citizen service team answers every call that CityHelp cannot finish. | • How often CityHelp misunderstands in daily use: not measured.<br>• Which CareVoice design older users would accept: no tests.<br>• How much of the €190,000 each measure would take: the plan does not say.<br>• Which requests citizens would never want to say aloud: never asked. |

*As in most projects, not everything is known. Decide anyway, and say what you assume.*

:::note Case assumption
The brief says: HomeAssist Voice for energy, devices and service requests, fast but not always comprehensible on complex requests, standard answers on misunderstandings, no hints which commands are possible, partly surprising suggestions, time saved in simple cases and uncertainty in special ones; CareVoice's three designs (A natural free input with a higher error rate in complex situations, B guided dialogues with limited commands but high comprehensibility and robustness, C voice with visual support and AI help but more effort) for users of different ages and experience, innovative and reliable, a limited budget, 12 weeks, first user tests only, data protection, trust and error avoidance critical; CityHelp Voice's simple requests understood and ambiguous ones not, unknown possible inputs, technical errors, efficient but hard to control, acceptance for simple tasks and distrust for sensitive ones, relief against reputational risk, €190,000, 14 weeks, no full multichannel solution, understandable for people not at home with technology, limited test data, first results soon. Those are the plan's facts and its only figures. Everything else is made up for this exercise: the agency, the dialogues, the simulations and the facts marked “Clear”.
:::

# Part 1 · Analyse a voice assistant, and weigh voice designs · Level 1 · Knowledge

## Block 1.1 · Analyse voice and AI interaction from the user's side: HomeAssist Voice · JUDGED · Core · about 10 min

**Draws on:** A1 · Screen, chat or voice · A2 · A good voice dialogue · A3 · Neuro-design.

You receive the description of a fictional digital assistant, HomeAssist Voice, for energy management, device control and service requests. Open it and talk to it as a customer: ask about your consumption, switch a device, ask something complicated, and report a fault. You need no prior knowledge: notice when it helps you, when you do not know what to say, and what happens when it misunderstands. The aim is to judge voice and AI interaction from the user's side, apart from what the technology can do.

![The product to read, as the lab shows it (homeassist).](_figures/d11_b1-1_0.png)

**Question 1 of 5 · Describe spontaneously which chances and risks this interface brings from the user's point of view**

Two to four sentences: where it helps, where it worries or confuses you, and why.

*How to build the answer:*

- Open HomeAssist Voice and ask a simple question, then switch a device.
- Ask something complicated, and say something it does not understand.
- Write where it helped and where you did not know what to do.

[[ANSWER lines=4]]

**Question 2 of 5 · Name at least 5 places where comprehensibility, trust or control are strengthened or weakened**

*How to build the answer:*

- Go through your conversation: the simple question, the device, the complicated question, the misunderstanding, the suggestion, the fault report.
- For each place, say whether it strengthens or weakens comprehensibility, trust or control, and why.

Write them as a list, one place per line, and say what it strengthens or weakens, and why.

[[ANSWER lines=7]]

**Question 3 of 5 · Assign the observations to the categories comprehensibility, error robustness, user control, predictability, relief and trust**

Write the observations that belong to each category in a few words. One may fit two; put it where its effect is strongest.

*How to build the answer:*

- Take your places from question 2.
- Ask which of the six each one affects most, and write it there.

| Category | The observations in this category |
|---|---|
| Comprehensibility | __ |
| Error robustness | __ |
| User control | __ |
| Predictability | __ |
| Relief | __ |
| Trust | __ |

**Question 4 of 5 · Write an effect statement for three points: “For users this could mean that …”**

*How to build the answer:*

- Pick three places from question 2.
- Finish the plan's sentence with what the user would feel, do or fail to do.

Write them as a list, one statement per line, each starting with the observation and ending with what it could mean for users.

[[ANSWER lines=5]]

**Question 5 of 5 · Prioritise the two biggest weaknesses of the system with regard to intelligent interaction**

*How to build the answer:*

- Look at your places with one question: which weakness costs the most people the most trust or time?
- Write the two, each with why it weighs most.

Write two lines: weakness 1 and weakness 2, each with why it weighs most.

[[ANSWER lines=4]]

## Block 1.2 · Rate voice and AI interactions under conflicting goals: CareVoice · JUDGED · Core · about 8 min

**Draws on:** A1 · Screen, chat or voice · A2 · A good voice dialogue · A4 · Prototyping and testing an AI interface · A5 · Where voice belongs, and weighing a measure.

CareVoice is a voice assistant for a platform in the health field. Three variants are described in words: A) very natural, free speech input with high flexibility, but a higher error rate in complex situations; B) clearly guided voice dialogues with a limited set of commands, but high comprehensibility and robustness; C) a combination of voice control, visual support and AI help, but a higher implementation effort. The conditions: the target group covers different ages and levels of experience, the company wants to look innovative and reliable at the same time, the budget for technical development is limited, the release is in 12 weeks, user tests exist only in first approaches, and data protection, trust and avoiding errors are critical. Decide anyway, and say what you assume.

![The product to read, as the lab shows it (designs).](_figures/d11_b1-2_0.png)

**Question 1 of 5 · Rate each variant on comprehensibility, user control, error robustness, comfort, trust and scalability**

Write a few sentences for each variant that cover all six criteria. Many teams rate each criterion Low, Medium or High with a reason; you may do that or write it in your own words.

*How to build the answer:*

- Take one variant at a time and keep the conditions in mind: mixed ages, 12 weeks, first tests only, errors critical.
- For each criterion, say how the variant does and why.
- Use the same six criteria for every variant.

| Variant | Comprehensibility | User control | Error robustness | Comfort | Trust | Scalability |
|---|---|---|---|---|---|---|
| Variant A · natural, free speech input | __ | __ | __ | __ | __ | __ |
| Variant B · guided dialogues, limited commands | __ | __ | __ | __ | __ | __ |
| Variant C · voice, screen and AI help | __ | __ | __ | __ | __ | __ |

**Question 2 of 5 · Decide which variant is the most viable under the given conditions**

Choose one variant, then give your reason below. There is no single right choice; the reason has to rest on the users and the conditions.

*How to build the answer:*

- Say which condition weighs most for you.
- Say how your choice meets it better than the other two.

[[CHOOSE]] Variant A · natural, free speech input ‖ Variant B · guided dialogues, limited commands ‖ Variant C · voice, screen and AI help

**Why this variant, under these conditions?**

Give your reason with the conditions: different ages and experience, innovative and reliable, a limited budget, 12 weeks, first user tests only, data protection, trust and error avoidance critical.

*How to build the answer:*

- Name the condition that weighs most for you.
- Say how your variant meets it and why the other two meet it less well.
- Say what your choice gives up and how you would deal with its weakness.

[[ANSWER lines=4]]

**Question 3 of 5 · Name the conflicts of goals between naturalness, precision and feasibility**

Name at least two conflicts, each as one goal against another, and who stands for each side.

*How to build the answer:*

- Look at what naturalness needs (free speech), what precision needs (limited, confirmed input) and what feasibility needs (time, budget, tests).
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

## Block 2.1 · Case study: developing the voice service assistant CityHelp Voice · JUDGED · Core · about 15 min

**Draws on:** A1 · Screen, chat or voice · A2 · A good voice dialogue · A3 · Neuro-design · A4 · Prototyping and testing an AI interface · A5 · Where voice belongs, and weighing a measure.

A municipal service platform wants to introduce a voice assistant, CityHelp Voice, for appointments, status queries and simple citizen requests. The aim is to lower barriers to use, improve reachability and relieve service processes. At the same time there is uncertainty about comprehensibility, error-proneness, acceptance and the quality of AI-supported answers. The observed problems: first prototypes understand simple requests well but fail on ambiguous ones; users often do not know which inputs are possible or sensible; errors are reported technically instead of helpfully; the combination of voice and AI seems efficient in some situations and hard to control in others; test runs show acceptance for simple tasks but distrust for more sensitive requests; and the departments see relief, while data protection and citizen service warn of reputational risks. The conditions: a budget of €190,000, 14 weeks for the implementation, no full multichannel solution at once, a system that people who are not at home with technology can follow, limited data from earlier tests, and first results that must show soon. You work through six steps.

![The product to read, as the lab shows it (cityhelp).](_figures/d11_b2-1_0.png)

**Question 1 of 6 · Analyse the central chances and risks of the voice assistant**

*How to build the answer:*

- Talk to CityHelp Voice as a citizen: book an appointment, ask about an application, report a streetlight, then try something ambiguous and something sensitive.
- Write one point per line: a chance or a risk, and what it does.

Write them as a list, one point per line, each as a chance or a risk and what it does. At least five.

[[ANSWER lines=7]]

**Question 2 of 6 · Assign the observations to the categories comprehensibility, error robustness, control, trust, relief and acceptance**

Write the observations that belong to each category in a few words.

*How to build the answer:*

- Take your points from question 1.
- Ask which category each affects most, and write it there.

| Category | The observations in this category |
|---|---|
| Comprehensibility | __ |
| Error robustness | __ |
| Control | __ |
| Trust | __ |
| Relief | __ |
| Acceptance | __ |

**Question 3 of 6 · Develop 4 prioritised measures for improvement**

*How to build the answer:*

- Turn each group of problems into something you could change within 14 weeks and €190,000, without a full multichannel solution.
- Put them in order: what secures comprehensibility and trust first.

Write them as a numbered list, the first priority first, each with what it changes for citizens.

[[ANSWER lines=6]]

**Question 4 of 6 · Justify your selection using effect on users, feasibility, risk and time pressure**

Use all four criteria and say how they support your selection and its order.

*How to build the answer:*

- Say what your first measures change for comprehensibility and trust.
- Say what is feasible in 14 weeks with limited test data, and the risk of each.
- Keep the less tech-savvy users and the first visible results in mind.

[[ANSWER lines=5]]

**Question 5 of 6 · Make a prioritisation decision for the first 14 weeks**

Say what you do in the first 14 weeks, in which order, and what you leave for later, with the reason.

*How to build the answer:*

- Say what comes first and why.
- Say what you do in parallel and what waits.
- Say how you keep citizens' trust.

[[ANSWER lines=5]]

**Question 6 of 6 · Formulate a recommendation to the division management**

Three to five sentences: what you recommend, what has priority, and what you expect to change.

*How to build the answer:*

- Lead with the recommendation.
- Name the priorities.
- Say what you expect to change.

[[ANSWER lines=4]]

# Task 2 · Route 2 · UX Strategy Memo: decide as Chief Experience Officer

## The situation: the city's service company, voice seen as an innovation signal

*Read once · about 2 min*

You take the perspective of the Chief Experience Officer of the company that runs the city's digital services: an app, a service portal and digital assistants. It plans to bring voice control and AI-supported interaction into several areas. First prototypes show comfort gains, but also problems with misunderstandings, loss of control and acceptance in sensitive situations. Inside the company the technology is seen strongly as an innovation signal, while robust usability, a test strategy and safe limits are not yet clear. The management expects a sound strategy for using intelligent interfaces responsibly. You are not to choose single voice features, but to develop a sound decision architecture for voice interfaces, AI interaction, prototyping and test governance.

| The framework | How the task runs · one block |
|---|---|
| • The budget is limited<br>• Several stakeholders pursue different goals<br>• Not all forms of interaction suit voice equally<br>• Test data is only available to a limited extent<br>• Trust and the brand must not be weakened<br>• First results must be visible at short notice<br>• Wrong decisions can cause wrong operation, a loss of reputation and low acceptance | • Block 3.1 asks seven questions: a guiding vision for voice and AI interaction, three strategic decisions, a prioritised architecture of measures, a risk analysis, a governance model, one decision under uncertainty and a management statement. |

**What is known and what is open**

| In the brief | Clear · Case assumption | Open · on purpose |
|---|---|---|
| • An app, a service portal and digital assistants; plans for voice and AI in several areas.<br>• Prototypes: comfort gains; misunderstandings, loss of control, low acceptance in sensitive situations.<br>• Inside, voice is an innovation signal; robust usability, testing and safe limits are open.<br>• Trust and brand must hold; first results must show soon. | • The company is the city's service company that runs CityHelp Voice in Route 1.<br>• The digital team wants voice in the app, the portal and the phone line by next year; citizen service and data protection want nothing sensitive handled by voice until it is tested.<br>• The prototypes are CityHelp Voice on the phone line and a voice search in the app. | • How large the budget is: “limited” is all the plan says.<br>• How often the prototypes fail in daily use: test data is limited.<br>• Which requests citizens would trust to voice: never asked. |

*As in most projects, not everything is known. Decide anyway, and say what you assume.*

:::note Case assumption
The brief says: a company with an app, a service portal and digital assistants that plans voice and AI in several areas, prototypes with comfort gains and problems with misunderstandings, loss of control and acceptance in sensitive situations, voice seen inside as an innovation signal, robust usability, test strategy and safe limits unclear, a limited budget, several stakeholders, not all interactions suited to voice, limited test data, trust and brand that must hold, first results soon, and the warning that wrong decisions can cause wrong operation, a loss of reputation and low acceptance. Those are the plan's facts. That the company is the city's service company of Route 1 and the facts marked “Clear” are made up for this exercise.
:::

*The memo is addressed to: The management. Subject: A UX architecture for voice, AI interaction and testing.*

# Part 3 · Level 3 · Management decision · Transfer project (3 UE)

:::note Transfer project: 3 teaching units (UE8–10)
UE8: the trainer presents Materi B and sets the role. UE9: you write the memo. UE10: you present the decision and what you give up; the trainer debriefs.
:::

## Block 3.1 · A strategic UX architecture for voice, AI interaction and intelligent testing · JUDGED · Core · about 20 min

**Draws on:** B1 · Voice and AI as a service architecture, not an innovation signal · B2 · Comfort, precision, trust, effort · B3 · Voice principles, test standards and deciding with little test data.

Develop a strategic concept for the city's service company. Your desk holds what the management, the digital team, citizen service, data protection, the product team and the test lab say. Open it, then answer the seven questions; your answers build the memo below.

![Your desk: the messages that wait for you, shown in the lab as a mailbox (1 of 6).](_figures/d11_b3-1_0.png)

![Your desk: the messages that wait for you, shown in the lab as a mailbox (2 of 6).](_figures/d11_b3-1_1.png)

![Your desk: the messages that wait for you, shown in the lab as a mailbox (3 of 6).](_figures/d11_b3-1_2.png)

![Your desk: the messages that wait for you, shown in the lab as a mailbox (4 of 6).](_figures/d11_b3-1_3.png)

![Your desk: the messages that wait for you, shown in the lab as a mailbox (5 of 6).](_figures/d11_b3-1_4.png)

![Your desk: the messages that wait for you, shown in the lab as a mailbox (6 of 6).](_figures/d11_b3-1_5.png)

![The platform as it is today, as the lab lets you observe it (1 of 5).](_figures/d11_b3-1_6.png)

![The platform as it is today, as the lab lets you observe it (2 of 5).](_figures/d11_b3-1_7.png)

![The platform as it is today, as the lab lets you observe it (3 of 5).](_figures/d11_b3-1_8.png)

![The platform as it is today, as the lab lets you observe it (4 of 5).](_figures/d11_b3-1_9.png)

![The platform as it is today, as the lab lets you observe it (5 of 5).](_figures/d11_b3-1_10.png)

![A real platform that solved this, shown for the class discussion (1 of 3).](_figures/d11_b3-1_11.png)

![A real platform that solved this, shown for the class discussion (2 of 3).](_figures/d11_b3-1_12.png)

![A real platform that solved this, shown for the class discussion (3 of 3).](_figures/d11_b3-1_13.png)

**Question 1 of 7 · A guiding vision for intelligent voice and AI interaction: which form of relief, steerability and service experience should be created systematically?**

One or two sentences about the relief people get, how they stay in control, and what the service should feel like.

*How to build the answer:*

- Say what kind of relief citizens should get from voice and AI.
- Say how they stay in control, and what the service should feel like.

[[ANSWER lines=3]]

**Question 2 of 7 · Three strategic guiding decisions on fields of use for voice, neuro-design principles, error robustness, prototyping and testing**

*How to build the answer:*

- Take your vision and ask which three choices would make it real.
- Write each as “we will …, even though that means …”.

Write them as a list, one decision per line, each with what it gives up.

[[ANSWER lines=5]]

**Question 3 of 7 · A prioritised architecture of measures: which journeys, functions or touchpoints are supported with voice and AI first, and why?**

Put the journeys, functions or touchpoints in an order and give the reason for the first ones.

*How to build the answer:*

- List the candidates: appointment booking, application status, damage reports, voice search in the app, questions about benefits or residence.
- Put first what is simple, frequent and clear, with low harm if wrong.
- Say why the others wait.

[[ANSWER lines=4]]

**Question 4 of 7 · A risk analysis: which wrong assumptions about naturalness, user behaviour, acceptance and scalability would be especially critical?**

Name two or three assumptions and the harm if each is wrong.

*How to build the answer:*

- Write down what your concept assumes about how natural the dialogue must be.
- Write down what it assumes about how citizens behave and what they accept.
- Write down what it assumes about growing to more journeys.

[[ANSWER lines=5]]

**Question 5 of 7 · A governance model: who is responsible for voice principles, test standards and decisions on conflicts between innovation, trust and effort?**

Name roles, not people: who owns the voice principles, who sets and checks the test standards, the roles of citizen service and data protection, and how a conflict is decided.

*How to build the answer:*

- Name who owns the voice principles.
- Name who sets the test standards and who may stop a launch.
- Say how a conflict between innovation, trust and effort is decided.

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
