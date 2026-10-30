---
doc: materi
day: 11
kicker: DAY 11 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Voice interfaces, neuro-design and testing AI interfaces
subtitle: Study material with real research, worked examples and the rules you use in the tasks
daytitle: Day 11 · Module 5 (day 2 of 2): Voice interfaces, neuro-design and testing AI interfaces
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use a made-up company in each card. The task case is CityHelp Voice (see the Task document).
intro: Today is about interfaces you talk to. You learn what voice does better than a screen and where it fails, what a good voice dialogue needs, what the brain needs from an intelligent interface, and how to prototype and test one before it meets real people. Then you use it on three voice assistants you can actually talk to (by typing, or by speaking where your browser allows it), and you look at how a voice platform and a government AI assistant handle errors, limits and testing. This document holds everything you need to study Day 11 without the website. Every card says what the idea is in plain words, shows it in a picture, gives the details and ends with the rules you use in the tasks.
glossary: error-handling,test-prototype,neuro-ux,governance,case-assumption,ux,voice-ui,dialogue-logic,mental-model,accessibility,wizard-of-oz,working-memory,predictability,chunk,attention,touchpoint,intelligent-interface,stimulus-reduction,cxo
refs: cohen2004,pearl2016,xiong2017,koenecke2020,strayer2015,wcag22,norman2013,nielsen1994,cowan2001,sweller1988,houde1997,kelley1984,gibbons2018,eu2024aiact,simon1956,klein2007
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. Levels 1 and 2: find where an energy assistant strengthens or weakens comprehensibility, trust and control, rate three voice designs of a health platform under conflicting goals, then analyse a city's voice assistant, develop four measures, justify them and decide on the first 14 weeks. The cards give you the ideas and the rules you use in Task 1.
:::

## A1 · Screen, chat or voice: what voice can do and where it fails · 12 min · Core

> A screen shows every option at once, a chat keeps a written record, voice leaves nothing to look at. Voice offers hands-free use, speed, accessibility, situational relief and natural interaction; it fails through misunderstandings, lost context, error-proneness, invisible options and high expectations of naturalness.

:::box In plain words
**The idea.** The same task can be done on a screen, in a typed chat or by voice. A screen shows every option at once; a chat keeps a written record; voice leaves nothing to look at. Voice is strong when hands or eyes are busy, when speed matters, for people who find screens hard, and because talking is natural. It fails through misunderstandings, lost context, errors that are hard to notice, options nobody can see, and the expectation that it understands like a person.
**Why it matters.** Block 1.1 asks for the chances and risks of HomeAssist Voice, Block 1.2 rates three voice designs for CareVoice, and Block 2.1 asks what CityHelp Voice's assistant does well and badly. This card gives you the strengths and limits of voice by name.
**How to read the picture.** One Ladle task, scaling a recipe and setting a timer, on a screen, in a chat and by voice.
:::

![One Ladle task, scaling a recipe and setting a timer, on a screen, in a chat and by voice. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d11_A1_0.png)

**What voice can do, and where it fails**

| Chance | What it looks like | Limit | How it shows |
|---|---|---|---|
| Hands-free | Cooking, driving, carrying. | Misunderstandings | “Thirteen” for “thirty”. |
| Speed | One sentence instead of five taps. | Loss of context | “And for four people?” is not linked to the recipe. |
| Accessibility | For people who cannot see or use a screen well. | Error-proneness | Noise, accents, half sentences. |
| Situational relief | Help at the moment hands are busy. | Invisible options | Nobody sees what can be said. |
| Natural interaction | Talking is learned, not taught. | High expectations | People expect it to understand like a person. |

**What voice can do and where it fails: evidence**

| Topic | Real finding or rule | What it means for a screen |
|---|---|---|
| Accuracy in a test | A research system reached a word error rate of 5.1% on a standard test of telephone conversations, which the authors report as matching the human transcription error of the careful benchmark (Xiong et al. 2017). | Recognition can be very good under test conditions; the test is not your users' kitchen. |
| Accuracy for whom | In a study of five commercial speech recognition systems, the average word error rate was 0.35 for Black speakers and 0.19 for white speakers (Koenecke et al. 2020). | Test with the full range of your users' voices, or the error-proneness lands on some of them. |
| Hands-free is not risk-free | In a study of the infotainment systems of ten cars, mental distraction after a task lasted up to 27 seconds for the worst-performing systems, and practice did not remove it (Strayer et al. 2015, as reported). | Voice in a driving or cooking context still takes attention: keep dialogues short. |
| Voice and accessibility | WCAG 2.2 asks that the accessible name of a control contains its visible label (success criterion 2.5.3), so that people who control a screen by voice can say what they see. | Name the controls the way they are written on screen. |

:::note Case assumption
Ladle, Noor, Ole, Freya and Piet are made up for this example. Dialogue logic and the strengths and limits of spoken interfaces follow Cohen et al. (2004) and Pearl (2016). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Ask which mode a task needs: screen, chat or voice.
- Name the chance voice offers here: hands-free, speed, accessibility, relief, natural.
- Name the limit next to it: misunderstanding, lost context, error, invisible options, expectations.
- Check what people must remember after a spoken answer.
- Expect people to talk to it like a person; check what happens when it cannot keep up.
:::

:::note Extra · go deeper (optional reading)
Voice is often launched as a symbol: it shows that a company is modern. The test of whether it is more than a symbol is simple: would people miss it if it were gone, for a task they do often? A timer while cooking passes; “ask me anything” usually does not. When voice is a symbol, the cost is paid by the people who believed it and got stuck.
:::

^src: Cohen et al. 2004 · Pearl 2016 · Xiong et al. 2017 · Koenecke et al. 2020 · Strayer et al. 2015 · WCAG 2.2

## A2 · A good voice dialogue: expectations, feedback, errors, repeat, control · 12 min · Core

> A good voice interface needs clear dialogue logic, clear expectations, feedback, error handling, repeatability and user control. Without them a misunderstanding becomes a loop, and people stop trusting it.

:::box In plain words
**The idea.** A good voice interface needs six things. Clear dialogue logic: one question at a time, and it is clear whose turn it is. Clear expectations: people know what it can do. Feedback: it says what it understood and what it did. Error handling: when it does not understand, it asks a better question instead of repeating itself. Repeatability: “say that again” works. User control: people can stop, go back and change their mind.
**Why it matters.** Block 1.1 asks where HomeAssist Voice strengthens or weakens comprehensibility, trust and control, Block 1.2 asks about guided against free dialogues, and Block 2.1 asks for measures for CityHelp Voice's dialogue and error handling. This card gives you the six requirements.
**How to read the picture.** One Ladle voice dialogue with six switches, one per requirement.
:::

![One Ladle voice dialogue with and without the six requirements of a good voice interface. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d11_A2_0.png)

**Six requirements, and the sentence that shows each**

| Requirement | Without it | With it (Ladle) |
|---|---|---|
| Dialogue logic | Four instructions and a question in one breath. | “Step 3: fold in the egg whites. Say next when ready.” |
| Clear expectations | People guess what it understands. | “You can say: next, repeat, timer, stop.” |
| Feedback | “Okay.” | “Timer for 5 minutes, for the nuts, started.” |
| Error handling | “Sorry, I didn't understand that.” Twice. | “Five minutes, or ten?” then the screen. |
| Repeatability | “We are at step 4.” | “Step 3: fold in the egg whites.” |
| User control | “Timer cannot be changed.” | “Timer stopped. Say start to start again.” |

**A good voice dialogue: principles with sources**

| Requirement | Real principle | What it means for a dialogue |
|---|---|---|
| Clear expectations | Norman calls the quality that makes the available actions visible discoverability (Norman 2013); with voice, nothing is visible unless the system says it. | Say what can be said, at the moment it matters: “You can say next, repeat, timer, stop.” |
| Feedback | One of the ten heuristics asks the system to keep users informed about what is going on, through appropriate feedback within a reasonable time (Nielsen 1994). | Repeat back what was understood: “Timer for 5 minutes, for the nuts, started.” |
| Error handling | Another heuristic asks that error messages are expressed in plain language, indicate the problem and suggest a solution (Nielsen 1994). | Ask a narrow question after a failure, and offer the screen as a way out. |
| Repeatability | Speech passes by and cannot be re-read; working memory holds about four chunks (Cowan 2001). | Let people say “repeat”, and keep each answer to a few chunks. |
| Design practice | Voice interface design books describe the same elements: dialogue logic, prompts, confirmation and recovery (Cohen et al. 2004; Pearl 2016). | Write the dialogue as a script and read it aloud before building it. |

:::note Case assumption
Ladle, Noor, Ole, Freya and Piet are made up for this example. Setting expectations, confirming and escalating errors follow Pearl (2016); feedback and visible options follow Norman (2013). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Dialogue logic: one question at a time, and it is clear whose turn it is.
- Expectations: does it say what it can do?
- Feedback: does it say what it understood and did?
- Error handling: after a miss, a better question; after the second, another way (a screen, a person).
- Repeat and control: can people hear it again, stop, change or go back?
:::

:::note Extra · go deeper (optional reading)
The hotline loop everybody knows, “Sorry, I didn't understand. Returning to the main menu”, is not a technical failure but a design decision: someone decided that a misunderstanding ends where it began. Error handling is where a voice interface earns or loses trust, because it is the moment people need it most and have the least patience.
:::

^src: Pearl 2016 · Cohen et al. 2004 · Norman 2013 · Nielsen 1994 · Cowan 2001

## A3 · Neuro-design: predictable, light on memory, calm · 12 min · Core

> Neuro-design asks what the brain needs: predictability, cognitive relief, trust, a clear mental model and fewer stimuli. Voice raises the load quickly, because everything said must be held in working memory, which holds only a few things.

:::box In plain words
**The idea.** Neuro-design asks what the brain needs from an intelligent interface. Predictability: the same request gives the same kind of answer. Cognitive relief: the interface remembers, so the person does not have to. Trust: it does what it says. A mental model: people can picture how it works. Stimulus reduction: fewer things at once. Voice raises the load quickly, because everything said must be held in working memory; a spoken list of eight options is much harder than one on a screen.
**Why it matters.** Block 1.1 asks about predictability and relief at HomeAssist Voice, Block 1.2 about comfort and comprehensibility, and Block 2.1 about CityHelp's users who do not know what is possible. This card explains why voice can relieve or overload the mind.
**How to read the picture.** A memory test: Ladle reads out a menu of options, then asks for one. Then a slider from calm to busy.
:::

![A memory test with a Ladle voice menu: a long menu and a short one · Exploratory.](_figures/d11_A3_0.png)

![One Ladle spoken answer, calm and busy. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d11_A3_1.png)

**Predictable, light on memory, calm: evidence**

| Principle | Real finding | What it means for a voice screen |
|---|---|---|
| Light on memory | People hold about four chunks in mind at once (Cowan 2001). | Offer at most three options in one prompt, and say the most likely one first. |
| Less extraneous load | Effort spent on working out the interface is missing for the task (Sweller 1988). | Do not make people remember the commands: say them. |
| Load can be measured | Distraction ratings of voice systems in cars ranged from 2.4 for the best system to 4.6 for the worst on a five-point scale (Strayer et al. 2015, as reported). | Measure the load of a dialogue, for example with a dual task, before launch. |
| Mental models | People act on what they believe a system is and does (Norman 2013). | Tell the person what kind of assistant it is, and keep that behaviour stable. |

:::note Case assumption
Ladle, Noor, Ole, Freya and Piet are made up for this example. The small capacity of working memory follows Cowan (2001); extra load leaving less for the task follows Sweller (1988); mental models follow Norman (2013). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Predictability: does the same request give the same kind of answer?
- Relief: does the interface remember, so the person does not have to?
- Mental model: can people picture what it can and cannot do?
- Stimulus reduction: is there one thing per answer, or five?
- Count the options in a spoken answer: past three or four, people lose them.
:::

:::note Extra · go deeper (optional reading)
An intelligent interface can lower load (it remembers the recipe, the time, the last step) or raise it (it adds tips, offers and choices to every answer). The difference is rarely the technology; it is what the team decided to say. The calmer interface usually feels more intelligent, because people can follow it.
:::

^src: Cowan 2001 · Sweller 1988 · Norman 2013 · Strayer et al. 2015

## A4 · Prototyping and testing an AI interface · 12 min · Core

> A functional prototype tests whether the technology works, an interaction prototype how the dialogue feels (often a person secretly plays the system), a test prototype whether real users manage real tasks. Test comprehensibility, error robustness, met expectations, transparency and acceptance, and test risky situations on purpose.

:::box In plain words
**The idea.** AI interfaces are tested with three kinds of prototype. A functional prototype checks whether the technology works at all. An interaction prototype checks how the dialogue feels, often with a person secretly playing the system (“Wizard of Oz”). A test prototype is close to the real thing and is tried with real users on real tasks. Test five things: comprehensibility, error robustness, whether expectations are met, transparency and acceptance; and test the risky and ambiguous situations on purpose, not only the easy ones.
**Why it matters.** Block 2.1 asks for measures that include prototyping and testing CityHelp Voice with risk-based scenarios, and Block 1.2 notes that CareVoice's user tests exist only in first approaches. This card gives you the prototypes and what to test.
**How to read the picture.** Three Ladle questions, each answered by a different prototype. Below, a test plan by risk level.
:::

![Three Ladle questions, each answered by a different prototype · Exploratory.](_figures/d11_A4_0.png)

**A Ladle test plan by risk level**

| Risk level | Example scenario | Tested how | Must pass before |
|---|---|---|---|
| Low | Next step, repeat, timer. | Test prototype, a few cooks. | Launch. |
| Medium | Change a running timer; noise; half sentences. | Test prototype in real kitchens, on purpose. | Launch. |
| High | Allergy substitutes; paying. | Wizard of Oz first, then test prototype, with the nutrition team. | Any voice answer at all. |

**Prototyping and testing an AI interface: methods and findings**

| Method or finding | Real source | What it means for a test |
|---|---|---|
| Wizard of Oz | In the 1984 study of natural language office applications, a person played the part of the system behind the screen, so the design could be tested before it was built (Kelley 1984). | Test the dialogue with a hidden human first; build the recogniser later. |
| What a prototype is for | A prototype can answer questions about the role of a product, about its look and feel, and about its implementation (Houde and Hill 1997). | Say which of the three questions each prototype answers: functional, interaction or test prototype. |
| Test with all voices | Recognition error rates differ between groups of speakers (Koenecke et al. 2020). | Recruit test participants across accents, ages and speaking styles. |
| A test set is not the world | A word error rate of 5.1% was measured on a standard telephone test set (Xiong et al. 2017). | Test in the real setting: noise, half sentences, interruptions. |

:::note Case assumption
Ladle, Noor, Ole, Freya and Piet are made up for this example. Choosing a prototype by its question follows Houde and Hill (1997); the Wizard-of-Oz method follows Kelley (1984). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Name the question first, then choose the prototype.
- Try a dialogue with a person playing the system before building it.
- Test the five aspects: comprehensibility, error robustness, expectations met, transparency, acceptance.
- Sort test scenarios by risk; test the high-risk and ambiguous ones on purpose.
- Test with the people who will find it hardest, not only with colleagues.
:::

:::note Extra · go deeper (optional reading)
Most voice tests use the easy cases, because they make the demo look good. The cases that decide trust are the ambiguous and the sensitive ones, and they are exactly the ones nobody wants to try in front of the board. A risk-based test plan forces them onto the list before the public finds them.
:::

^src: Houde & Hill 1997 · Kelley 1984 · Koenecke et al. 2020 · Xiong et al. 2017

## A5 · Where voice belongs, and weighing a measure · 12 min · Core

> Voice belongs where tasks are simple, frequent and clear, hands or eyes are busy and a mistake is cheap. Leaders keep technology where it supports reliably instead of impressing. Weigh measures on effect on users, feasibility, risk and time pressure.

:::box In plain words
**The idea.** Not every task suits voice. Voice belongs where tasks are simple, frequent and clear, where hands or eyes are busy, and where a mistake is cheap; it does not belong where choices are many and unfamiliar or a mistake is costly. Leaders make sure the technology supports reliably instead of impressing. To put measures in order, weigh each on effect on users, feasibility, risk and time pressure, the four Block 2.1 names.
**Why it matters.** Block 2.1 asks for four prioritised measures for CityHelp Voice, justified on effect on users, feasibility, risk and time pressure, and Block 1.2 asks which CareVoice design holds. The example uses Ladle and its own measures, so the answer for the task cases is not given.
**How to read the picture.** Five questions that decide whether a task suits voice, tried on three Ladle tasks. Then three measures rated on effect on users, feasibility, risk and time pressure.
:::

![Five questions that decide whether a Ladle task suits voice.](_figures/d11_A5_0.png)

![Ladle weighs three measures on effect on users, feasibility, risk and time pressure.](_figures/d11_A5_1.png)

**Where voice belongs: evidence**

| Topic | Real finding or rule | What it means for a measure |
|---|---|---|
| Good fit | Hands and eyes are busy, the task is short and frequent, and the vocabulary is small (Pearl 2016). | Choose voice for the tasks that fit this profile. |
| Poor fit | Error rates differ between speakers (Koenecke et al. 2020), and invisible options make rare commands undiscoverable (Norman 2013). | Keep a screen path for rare and sensitive tasks. |
| Risk in context | Hands-free systems in cars still distract for many seconds after a task (Strayer et al. 2015, as reported). | Rate each voice journey by the cost of a wrong action and of lost attention. |

:::note Case assumption
Ladle, Noor, Ole, Freya and Piet are made up for this example. When voice is the wrong choice follows Pearl (2016); rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Ask the five questions of every task: hands busy, frequent, few known choices, short answer, cheap if wrong.
- Keep voice where most answers are yes; give the rest a screen or a person.
- Prefer a reliable small voice service to an impressive broad one.
- Rate every measure on the same four questions, with a reason; a rating is a judgement, never a mark.
- Say what you leave out on purpose.
:::

:::note Extra · go deeper (optional reading)
A narrow voice service that always works earns the trust a broad one later needs. Teams that start broad meet their hardest cases first, in public, and spend the trust before they have it. The responsible choice often looks less innovative at launch and more innovative a year later.
:::

^src: Pearl 2016 · Gibbons 2018 · Koenecke et al. 2020 · Strayer et al. 2015 · Norman 2013

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards, led by the facilitator. Level 3 in the Chief Experience Officer's chair: a guiding vision for voice and AI interaction, three strategic decisions, an order of what comes first, a risk analysis, a governance model for voice principles and test standards, one decision under uncertainty and a statement to the management. The cards give you the ideas you use in Task 2.
:::

## B1 · Voice and AI as a service architecture, not an innovation signal · 20 min · Core

> Inside many companies voice is first an innovation signal. At senior level voice and AI interaction are part of the service architecture: which relief, control and service experience the company creates, where voice is used and where not, how it hands over, and how it is tested before it grows.

:::box In plain words
**The idea.** Inside many companies voice is first an innovation signal: a feature to show. At senior level voice and AI interaction are part of the service architecture: which kind of relief, control and service experience the company creates, in which journeys voice is used and where it is not, how it hands over to a screen or a person, and how it is tested before it grows. The rule of thumb: robust core uses first, broad coverage later.
**Why it matters.** Block 3.1 asks for a guiding vision for voice and AI interaction, three decisions on where voice is used, neuro-design, error robustness, prototyping and testing, and an order of which journeys come first. You decide the architecture, not single voice features.
**How to read the picture.** Left Ladle adding voice everywhere to look modern, right building a voice service architecture. Below, the layers from a guiding vision to every touchpoint.
:::

![Ladle adding voice everywhere to look modern, or building a voice service architecture.](_figures/d11_B1_0.png)

![The layers of a voice service architecture, from a guiding vision to every touchpoint.](_figures/d11_B1_1.png)

**Voice as a service architecture: structures**

| Part | Real example or source | What it means |
|---|---|---|
| Principles for speaking, confirming and failing | Voice design practice treats the persona, the prompts, the confirmation and the recovery as one designed whole (Cohen et al. 2004; Pearl 2016). | Define the principles once, for every voice journey. |
| A duty to tell | The EU AI Act (Article 50) requires that people are told when they interact with an AI system, unless that is obvious from the context. | Make the voice announce what it is. |
| Discoverability | Voice leaves the options invisible (Norman 2013). | Plan where the screen shows what the voice can do. |

:::note Case assumption
Ladle, Noor, Ole, Freya and Piet are made up for this example. The design of spoken services follows Pearl (2016). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Check where voice is decided today: in a vision, or one feature at a time?
- Write a guiding vision: the relief, the control, the service experience.
- Decide the fields of use for voice, and where it is not used.
- Decide how voice hands over to a screen or a person.
- Order the journeys: simple, frequent, clear and cheap if wrong first.
:::

:::note Extra · go deeper (optional reading)
A guiding vision for voice is short and testable. “Ladle lets you cook with your hands full: short, clear, and you are always in charge” can be checked on every dialogue: is this answer short, is it clear what to say, can the cook stop it? “Voice-first” cannot be checked, and it invites voice everywhere.
:::

^src: Pearl 2016 · Norman 2013 · Cohen et al. 2004 · EU AI Act 2024

## B2 · Comfort, precision, trust, effort: the conflicts of voice · 20 min · Core

> Voice sits between comfort and precision, trust and effort, robustness and natural conversation, and all of them against scalability. Decide per journey how free the dialogue may be, where a screen confirms and where a person takes over, and write down the assumptions the plan rests on.

:::box In plain words
**The idea.** Voice sits between goals that pull apart: comfort (say anything) against precision (understand it correctly), trust against effort, error robustness against natural conversation, and all of them against scalability: what works in one journey may not work in twenty. The way through is to decide per journey how free the dialogue may be, where a screen confirms, and where a person takes over, and to write down which assumptions about naturalness, behaviour and acceptance the plan rests on.
**Why it matters.** Block 3.1 asks for three decisions, a risk analysis of wrong assumptions about naturalness, user behaviour, acceptance and scalability, and a governance model for conflicts between innovation, trust and effort. Each is a decision between conflicting goals.
**How to read the picture.** Three Ladle journeys and how free the voice dialogue may be in each, with who stands for each side.
:::

![Three Ladle journeys and how free the voice dialogue may be in each. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d11_B2_0.png)

**Standing conflicts of voice**

| Conflict | Who usually stands for each side | What to ask |
|---|---|---|
| Comfort against precision | Product, against safety and service. | What happens if it hears the wrong word here? |
| Natural conversation against robustness | Marketing, against engineering and support. | How often will it fail, and where does the person go then? |
| Innovation against trust | The board, against the people who answer complaints. | What happens after its first public mistake? |
| All of these against effort and scalability | Finance and engineering, against everyone. | What does each new journey cost to build and to test? |

**Conflicts of voice, with evidence**

| Conflict | What the evidence says | A way to decide |
|---|---|---|
| Comfort against precision | Word error rates of 0.19 to 0.35 were found across the speakers of five systems (Koenecke et al. 2020). | Ask what happens if it hears the wrong word here, and confirm where the cost is high. |
| Natural conversation against robustness | A test result of 5.1% on a standard set does not predict the failure rate in real use (Xiong et al. 2017). | Plan how often it will fail and where the person goes then. |
| Innovation against trust | Distraction after hands-free tasks lasted up to 27 seconds in the weakest systems (Strayer et al. 2015, as reported). | Plan what happens after its first public mistake. |

:::note Case assumption
Ladle, Noor, Ole, Freya and Piet are made up for this example. The conflicts are a reading of the example, not a rule for every product. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Name each conflict as two goals and say who stands for each: product, safety, support, sales.
- Decide per journey: free speech, voice with a screen, or a screen or person.
- Write down the assumptions about naturalness, behaviour, acceptance and scalability, and which would be critical if wrong.
- Remember that what works for three journeys may not work for twenty.
- Say what the choice gives up.
:::

:::note Extra · go deeper (optional reading)
Scalability is the assumption most voice plans get wrong. Each new journey adds new words, new misunderstandings and new test cases, and they multiply rather than add. A plan that says “three journeys now, twenty next year” should say what has to be true for the next seventeen, and how the company will know.
:::

^src: Pearl 2016 · Cowan 2001 · Koenecke et al. 2020 · Xiong et al. 2017 · Strayer et al. 2015

## B3 · Voice principles, test standards and deciding with little test data · 20 min · Core

> Voice and AI interaction need owners: someone who owns the voice principles, test standards by risk level that must be met before a launch, the right to stop one, and a rule for when innovation, trust and effort disagree. With thin test data, a decision says what it decides, does not know, would reverse and gives up.

:::box In plain words
**The idea.** Voice and AI interaction need owners: someone who owns the voice principles (how it speaks, confirms, fails and hands over), test standards that say what must be tested before anything goes live (by risk level), and a rule for when innovation, trust and effort disagree. Test data is often thin; a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up. A small, well-tested core is a safe start.
**Why it matters.** Block 3.1 asks for a governance model for voice principles and test standards, a decision despite patchy data, and a statement to the management. This card gives you the parts of each.
**How to read the picture.** The four boxes at the top are the parts of a decision, filled in for Ladle. The two boxes below are the rule for future decisions.
:::

![A decision under uncertainty, filled in for Ladle.](_figures/d11_B3_0.png)

**Four parts of voice governance**

| Part | The question | An example (Ladle) |
|---|---|---|
| Who owns the principles | Who decides how it speaks, confirms, fails and hands over? | The head of product experience. |
| Test standards | What must be tested, by risk level, before a launch? | Low: a few cooks; high: Wizard of Oz and real kitchens, with the nutrition team. |
| The stop right | Who may stop a launch? | The test board of UX research, the nutrition team and support. |
| How a conflict is decided | What happens when innovation, trust and effort disagree? | Safety and trust first, then comfort, then effort; the board settles a tie. |

**Voice governance: test standards and rules**

| Part | Real example or rule | What it means |
|---|---|---|
| Test standards by risk | The automotive study rated ten systems with 257 drivers on a common scale, and a rating of 2 or more counted as potentially dangerous (Strayer et al. 2015, as reported). | Define the test and the threshold before the launch, by risk level. |
| Who may stop a launch | Differences in recognition between groups of speakers were found only because the systems were tested across groups (Koenecke et al. 2020). | Give a test board with UX research, the domain experts and support the right to stop. |
| The duty to inform | EU AI Act, Article 50. | Add the notice to the release checklist. |

:::note Case assumption
Ladle, Noor, Ole, Freya and Piet are made up for this example. Deciding with limited information follows Simon (1956); the premortem follows Klein (2007). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Name who owns how the assistant speaks, confirms, fails and hands over.
- Write test standards by risk level, and say who signs off.
- Give someone the right to stop a launch.
- Settle conflicts by safety and trust first, then comfort, then effort; say who settles a tie.
- Say what you decide, what you do not know, when you would reverse it and what you give up.
:::

:::note Extra · go deeper (optional reading)
A test standard is only real if someone can say no. Without a stop right, a test board becomes a reporting step: it writes down the risks the launch then ignores. Give the right to stop to the people who will answer the complaints.
:::

^src: Simon 1956 · Klein 2007 · Strayer et al. 2015 · Koenecke et al. 2020 · EU AI Act 2024
