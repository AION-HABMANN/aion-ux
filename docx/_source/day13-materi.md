---
doc: materi
day: 13
kicker: DAY 13 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Neurodiversity, inclusive patterns and assistive technologies
subtitle: Study material with real research, worked examples and the rules you use in the tasks
daytitle: Day 13 · Module 6 (day 2 of 2): Neurodiversity, inclusive patterns and assistive technologies
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use a made-up company in each card. The task case is LifeGuide (see the Task document).
intro: Today is about minds that work differently. You learn what loads people with ADHD, autistic people and people with dyslexia most, how stimuli, predictability and readability decide whether a page can be used, which inclusive design patterns help many groups at once, how assistive technologies fit in, and how to prototype and test so real hurdles show up instead of assumptions. This is the start of the practice project: you sketch an inclusive prototype and a test plan. This document holds everything you need to study Day 13 without the website. Every card says what the idea is in plain words, shows it in a picture, gives the details and ends with the rules you use in the tasks.
glossary: dyslexia,wcag,ux,autism,readability,consistency,adhd,neurodiversity,assistive-technology,stimulus-load,case-assumption,typography,governance,predictability,attention,neuro-ux,adaptation-mode,accessibility,design-logic,component,inclusive-pattern,orientation,overstimulation,perceived-control,inclusive-design,line-spacing,badge,mental-model,stakeholder,cxo,contrast,body-text,stimulus-reduction
refs: barkley2015,pun2016,bda2023,polanczyk2007,who2022autism,dyslexiaaction,coga2021,wcag22,rello2013,houde1997,kelley1984,gibbons2018,nielsen2000five,holmes2018,simon1956,klein2007
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. Levels 1 and 2: find the hurdles of a learning platform for people with ADHD, autism or dyslexia, rate three designs of a career platform under conflicting goals, then analyse a support portal, develop four measures, justify them and sketch a prototype and what to test first. The cards give you the ideas and the rules you use in Task 1.
:::

## A1 · Neurodiversity: different minds, different loads · 12 min · Core

> Minds differ in how they take in, process and remember information. ADHD: overstimulation, distraction, complex task structures, lack of focus. Autism: sensory overload, unclear navigation logic, inconsistent patterns, ambiguous communication. Dyslexia: difficult reading structures, unsuitable typography, unclear text structure, complex language.

:::box In plain words
**The idea.** Neurodiversity means that human minds differ in how they take in, process and remember information. People with ADHD are loaded most by overstimulation, distraction, complex task structures and a lack of focus. Autistic people are loaded most by sensory overload, unclear navigation logic, inconsistent patterns and ambiguous communication. People with dyslexia are loaded most by difficult reading structures, unsuitable typography, unclear text structure and complex language. These are design factors, not exceptions: many people without a diagnosis feel the same loads when they are tired, stressed or distracted.
**Why it matters.** Block 1.1 asks which hurdles StudyPath puts in front of people with different ways of perceiving and processing, and Block 2.1 asks for LifeGuide's deficits for neurodiverse use. This card gives you the load factors of ADHD, autism and dyslexia by name.
**How to read the picture.** The same Hearth Energy start page seen through three lenses: what loads Ayo (ADHD), Mirko (autism) and Tilda (dyslexia).
:::

![Hearth Energy's start page seen through three lenses, and designed for all three · demonstration. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d13_A1_0.png)

**Load factors by mind, and what usually helps**

| Mind | What loads most | What usually helps |
|---|---|---|
| ADHD | Overstimulation, distraction, complex task structures, lack of focus. | One main task, quiet extras, short steps, a visible next step. |
| Autism | Sensory overload, unclear navigation logic, inconsistent patterns, ambiguous words. | Calm colours, the same patterns everywhere, literal and descriptive words. |
| Dyslexia | Difficult reading structures, unsuitable typography, unclear structure, complex language. | Left-aligned, readable type, spacing, headings, plain language, read-aloud. |

**Different minds, different loads: how many people, and what the guidance says**

| Topic | Real finding | What it means for a screen |
|---|---|---|
| ADHD | A review of 102 studies with 171,756 children and adolescents found a pooled worldwide prevalence of ADHD of 5.29% (Polanczyk et al. 2007). | Distraction-prone users are in every audience: a quiet default serves them and everyone else. |
| Autism | About one in 100 children has autism, as an average estimate with large differences between studies (World Health Organization 2022). | A predictable, literal interface is not a special case. |
| Dyslexia | How many people have dyslexia depends on the definition and is best seen as a continuum; the often-quoted 10% has no traceable source (Dyslexia Action). | Design for a range of reading ability, not for a label. |
| Where the guidance comes from | The W3C working group on cognitive accessibility publishes objectives and patterns as supplemental guidance beyond WCAG; following it is not required for WCAG conformance (W3C COGA 2021). | Use the patterns as a design toolkit and test them; do not claim conformance from them. |

:::note Case assumption
Hearth Energy, Ayo, Mirko, Tilda, Pia and Lukas are made up for this example. The load factors are the ones the plan names; ADHD as a difference in attention and executive function follows Barkley (2015); the dos and don'ts follow the Home Office posters (Pun 2016) and the British Dyslexia Association (2023). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Look at a screen through three lenses: ADHD, autism, dyslexia.
- Ask what overloads, what confuses, and what tires.
- Remember that many people without a diagnosis feel the same in stress.
- Tell neurodiverse needs apart from general usability: the same screen can be usable and still overload.
- Expect some needs to pull in different directions, and test to find the balance.
:::

:::note Extra · go deeper (optional reading)
Many hurdles come less from technology than from the mental model of the people who design: a team that reads fast, ignores banners easily and likes variety builds a product for people like itself. Neurodiversity asks the team to design for minds that work differently from their own, and to test with them, because intuition is exactly what fails here.
:::

^src: Barkley 2015 · Pun 2016 · British Dyslexia Association 2023 · Polanczyk et al. 2007 · WHO autism fact sheet · Dyslexia Action · W3C COGA 2021

## A2 · Stimuli and focus: when a page is too much (ADHD, sensory sensitivity) · 12 min · Core

> Every element competes for attention. A busy page is hard to start, easy to drift from and tiring to finish, for people with ADHD or sensory sensitivity most of all. Show one main task first, keep extras quiet, avoid movement and interruptions, and break long tasks into short steps.

:::box In plain words
**The idea.** Every banner, badge, colour, notification and moving element competes for attention. For people with ADHD or sensory sensitivity, a busy page is not just untidy: it is hard to start, easy to drift from and tiring to finish. Calm pages show one main task first, keep secondary things quiet, avoid movement and interruptions, and break long tasks into steps with a visible next step. Fewer stimuli help almost everyone find what matters.
**Why it matters.** Block 1.1 asks about StudyPath's start page full of hints, colours and notifications and its unprioritised tasks, Block 1.2 rates JobAccess's dense Variant A, and Block 2.1 asks about LifeGuide's competing stimuli and long forms. This card lets you turn the stimuli up and down.
**How to read the picture.** A dial turns the Hearth Energy start page from calm to overloaded: banners, badges, a moving ticker, a chat bubble, notifications. Then the same long form in one piece and in steps.
:::

![The Hearth Energy start page from calm to overloaded · demonstration. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d13_A2_0.png)

![Moving house at Hearth Energy as one long form or as three steps. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d13_A2_1.png)

**Stimuli and focus: rules**

| Topic | Real rule | What it means for a screen |
|---|---|---|
| Moving content | Content that moves, blinks or scrolls, starts automatically and lasts more than five seconds must have a mechanism to pause, stop or hide it (WCAG 2.2.2). | No auto-playing carousels, tickers or animated backgrounds without a stop. |
| Timing | Where a time limit is set, users must be able to turn it off, adjust it or extend it (WCAG 2.2.1). | Do not rush a task that needs thought. |
| Motion on request | Browsers pass on the user's setting for reduced motion (the prefers-reduced-motion media feature), and WCAG 2.3.3 asks that motion triggered by interaction can be disabled (level AAA). | Respect the setting: calm by choice, lively by choice. |
| Redundant entry | WCAG 2.2 asks that information a user already gave in the same process is not asked for again (3.3.7). | Carry data across steps: it spares the memory and the patience. |

:::note Case assumption
Hearth Energy, Ayo, Mirko, Tilda, Pia and Lukas are made up for this example. Limiting interruptions, avoiding too much content and five or fewer main choices per screen follow the W3C's “Making Content Usable” (2021). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Count what competes for attention on the first screen.
- Is the most important task the most visible thing?
- Does anything move, blink or pop up without being asked?
- Are long tasks broken into steps with a visible position and a named next step?
- Can people stop and come back without losing their place?
:::

:::note Extra · go deeper (optional reading)
Stimulus reduction is often resisted because each element has an owner who wants it seen. The page fills up one reasonable request at a time. A rule such as “one main task per screen, everything else quiet” protects the page from its own stakeholders, and it helps the customers who never asked for the extras.
:::

^src: W3C COGA 2021 · Barkley 2015 · WCAG 2.2

## A3 · Predictability: consistent patterns and literal words (autism) · 12 min · Core

> Predictability means people can tell what will happen: the menu stays in one place, the same action has the same name, buttons say what they do, words mean what they say. Inconsistent patterns and ambiguous words are a real barrier for many autistic people and raise anxiety for many others.

:::box In plain words
**The idea.** Predictability means people can tell what will happen: the navigation is in the same place on every page, the same action has the same name, and words mean what they say. For many autistic people inconsistent patterns and ambiguous words are not a small annoyance but a real barrier, and they raise anxiety. Consistent layouts, descriptive buttons (“Send meter reading”, not “Go”) and literal language (no idioms, no vague hints) make an interface safe to use.
**Why it matters.** Block 1.1 asks about StudyPath's navigation that varies between course areas, Block 1.2 about JobAccess A's changing navigation, and Block 2.1 about LifeGuide's inconsistent patterns and low predictability. This card shows the same three pages built consistently and inconsistently.
**How to read the picture.** Three Hearth Energy pages, first built inconsistently (the menu moves, the main button changes name and place), then consistently.
:::

![Three Hearth Energy pages built inconsistently and consistently. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d13_A3_0.png)

**Ambiguous or literal**

| Ambiguous | Literal | Why it matters |
|---|---|---|
| “Let's go!” | “Report your move” | People know what will happen. |
| “You're all set!” | “Your meter reading for 31 October was received.” | People know what was done. |
| “Hang tight…” | “Loading your bills. This takes about 10 seconds.” | No idiom; a time to expect. |
| “Oops, something went sideways” | “We could not save your reading. Please try again.” | What happened, and what to do. |

**Predictability and literal words: rules and guidance**

| Topic | Real rule or guidance | What it means for a screen |
|---|---|---|
| Consistent navigation | Navigation that repeats on several pages must keep the same relative order (WCAG 3.2.3), and components with the same function must be identified consistently (3.2.4). | Keep the same pattern in the same place on every page. |
| Labels and instructions | Labels or instructions must be provided where content asks for user input (WCAG 3.3.2). | Say what is asked and in what format, before the person types. |
| Understand and find | Among the objectives of the cognitive accessibility guidance are helping users understand what things are and how to use them, and helping users find what they need (W3C COGA 2021). | Use literal, descriptive words; avoid idioms and jokes in instructions. |
| Unusual words | WCAG asks at its highest level that a mechanism is available for finding the meaning of unusual words, idioms and jargon (3.1.3). | If you must use a term, explain it where it appears. |

:::note Case assumption
Hearth Energy, Ayo, Mirko, Tilda, Pia and Lukas are made up for this example. Descriptive buttons, simple consistent layouts and no figures of speech follow the Home Office poster for users on the autistic spectrum (Pun 2016). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Is the navigation in the same place on every page?
- Does the same action always have the same name and place?
- Do buttons say what they do (“Send meter reading”), not “Go” or “Click here”?
- Is the language literal, without idioms or vague hints?
- Does the product say what will happen before it happens?
:::

:::note Extra · go deeper (optional reading)
Playful copy (“Oops!”, “Let's go!”) is often added to make a product feel friendly. For many autistic people, and for anyone using a translation tool or reading in a second language, it does the opposite: it hides what happened. Friendliness can be in the tone of a literal sentence; it does not need idioms.
:::

^src: Pun 2016 · W3C COGA 2021 · WCAG 2.2

## A4 · Readability: text structure, typography and language (dyslexia) · 12 min · Core

> Reading is work for people with dyslexia and for many others. Left-aligned text, a plain sans-serif font at a good size, enough line height and spacing, short lines and paragraphs, no blocks of capitals, italics or underlining, clear headings and plain language decide whether people read to the end.

:::box In plain words
**The idea.** For people with dyslexia, and for many others, reading is work. Text is easier to read when it is left-aligned, in a plain sans-serif font at a good size, with enough line height and spacing, in short lines and short paragraphs, without blocks of capitals, italics or underlining, and in plain language with clear headings. Small typographic choices decide whether someone reads to the end.
**Why it matters.** Block 1.1 asks about StudyPath's long, dense, complex texts, Block 1.2 rates JobAccess's readability, and Block 2.1 about LifeGuide's texts that are correct but hard to read. This card lets you change the typography of a real paragraph yourself.
**How to read the picture.** A Hearth Energy notice you can change: size, line height, line length, alignment, spacing, and an official or plain version.
:::

![A Hearth Energy notice whose typography and language you can change · Exploratory.](_figures/d13_A4_0.png)

**Readability: what was tested**

| Finding | What was measured | What it means for a screen |
|---|---|---|
| Fonts | Forty-eight readers with dyslexia read twelve texts in twelve fonts; Helvetica, Courier, Arial, Verdana and Computer Modern Unicode came out as good fonts, and italic fonts consistently reduced readability (Rello and Baeza-Yates 2013). | Use a plain sans-serif for body text and avoid italics for blocks of text. |
| A special font | In the same study a font made for dyslexia did not lead to better or worse readability than the standard fonts, and the participants preferred Verdana and Helvetica (Rello and Baeza-Yates 2013). | A special font is not a shortcut: structure, size and spacing matter more. |
| A style guide | The dyslexia style guide of the British Dyslexia Association recommends plain, left-aligned text with good spacing; summaries of it name sans-serif type of at least 12 points and a line spacing of about 1.5 (British Dyslexia Association 2023, as reported). | Set type size and line spacing as rules in your components. |
| Reading level | WCAG asks at its highest level for supplemental content when text requires a reading ability beyond the lower secondary level (3.1.5). | Write at the level of the audience and give a summary where needed. |

:::note Case assumption
Hearth Energy, Ayo, Mirko, Tilda, Pia and Lukas are made up for this example. The typography advice follows the British Dyslexia Association's style guide (2023) and the Home Office poster for users with dyslexia (Pun 2016). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Left-aligned, never justified.
- At least 15 to 16 pixels, line height around 1.5, lines of 60 to 75 characters.
- No blocks of capitals, italics or underlining.
- Short paragraphs under clear headings; one idea per sentence.
- Let people change contrast and size; offer read-aloud where reading is long.
:::

:::note Extra · go deeper (optional reading)
Justified text is a print habit. On paper, with careful hyphenation, it looks tidy; on a screen it opens uneven gaps between words that form “rivers” down the text, and readers with dyslexia lose their place in them. Left alignment costs nothing and removes the problem.
:::

^src: British Dyslexia Association 2023 · Pun 2016 · Rello & Baeza-Yates 2013 · WCAG 2.2

## A5 · Inclusive patterns, assistive technologies, and testing a prototype · 12 min · Core

> Inclusive design patterns help several groups at once; assistive technologies let people use content their own way, but only on a good base; and only prototypes tested with real people show the real hurdles. Test orientation, stimulus load, task completion, readability and the feeling of control. Weigh measures on effect, gain for inclusion, feasibility, risk and time pressure.

:::box In plain words
**The idea.** Inclusive design patterns are reusable solutions that help several groups at once: one task per screen, a step indicator, descriptive buttons, a summary before sending, a calm mode, a reading mode. Assistive technologies (screen readers, text-to-speech, reader modes, text scaling, focus and stimulus filters) let people use content their own way, but only if the base structure is good. And only prototypes tested with real people show the real hurdles instead of assumptions: test orientation, stimulus load, task completion, readability and the feeling of control, in calm and in stressful situations. To put measures in order, weigh each on effect on users, gain for inclusion, feasibility, risk and time pressure.
**Why it matters.** Block 2.1 asks for four measures for LifeGuide, justified on effect on users, gain for inclusion, feasibility, risk and time pressure, and for an inclusive prototype approach with what to test first; Block 1.2 rates JobAccess C's adaptation modes. The example uses Hearth Energy and its own measures, so the answer for the task cases is not given.
**How to read the picture.** The same Hearth Energy content through five assistive technologies, with a real text-to-speech button. Then a test plan for a prototype, and three measures rated on five criteria.
:::

![The same Hearth Energy notice through five assistive technologies. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d13_A5_0.png)

![Hearth Energy weighs three measures on effect on users, gain for inclusion, feasibility, risk and time pressure.](_figures/d13_A5_1.png)

**A first test plan for a Hearth Energy prototype**

| Part | What we do |
|---|---|
| What the prototype contains | The start page, the menu, and the moving-house form in steps; a quiet mode. |
| Who takes part | Six customers, among them people with ADHD, autistic people and people with dyslexia; asked ahead what support they need. |
| Tasks | Send a meter reading; report a move; find your last bill. |
| A stressful moment | A phone call in the middle of the form; a time limit on one task. |
| What we watch | Orientation, stimulus load, task completion, readability, the feeling of control. |
| How we evaluate | Where people stopped, hesitated, misread or felt unsure; quotes; then the next change. |

**Patterns, assistive technology and testing: evidence**

| Topic | Real finding or rule | What it means for a test |
|---|---|---|
| How many to test | In Nielsen's model, five users find about 85% of the usability problems of a design in a qualitative test; for each distinct group of users more are needed (Nielsen 2000, as reported). | Plan six or so participants per round, from several groups, and test again after fixes. |
| What a prototype shows | A prototype can answer questions about role, look and feel and implementation (Houde and Hill 1997), and a hidden human can play the system in an early test (Kelley 1984). | Say which question the prototype answers, and test before you build. |
| Authentication | WCAG 2.2 asks that a login does not depend on remembering or transcribing a code, unless an alternative is offered (3.3.8). | Test the login with a password manager and with paste. |
| Self-determined use | People use their own assistive technologies and settings, such as a screen reader, reduced motion or a text size (WCAG 1.4.4, 2.3.3). | Test with people's own settings and tools. |

:::note Case assumption
Hearth Energy, Ayo, Mirko, Tilda, Pia and Lukas are made up for this example. Including people in usability testing and asking ahead about support follow the W3C's “Making Content Usable” (2021); choosing a prototype by its question follows Houde and Hill (1997) and Kelley (1984); rating options on the same criteria follows Gibbons (2018). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Prefer a pattern that helps many (steps, one main task, descriptive buttons) over a special screen.
- Check that assistive technology can work: real headings, buttons, text, layouts that grow.
- Prototype the entry pages, the navigation and the core forms first.
- Test with neurodivergent people, with the support they need, also in a stressful moment.
- Evaluate where people stop, hesitate or feel unsure, not only technical errors.
:::

:::note Extra · go deeper (optional reading)
Inclusive design is often presented as adaptation: extra options for people who need them. The stronger argument is architecture: the patterns that neurodivergent people need most (calm, consistent, readable, step by step) make the product better for nearly everyone, and they make assistive technology work. A better base is cheaper than many special cases.
:::

^src: W3C COGA 2021 · Houde & Hill 1997 · Kelley 1984 · Gibbons 2018 · Nielsen 2000 · WCAG 2.2

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards, led by the facilitator. Level 3 in the Chief Experience Officer's chair: a guiding vision for neurodiverse UX, three strategic decisions, an order of what comes first, a risk analysis, a governance model, one decision under uncertainty and a statement to the management. The cards give you the ideas you use in Task 2.
:::

## B1 · Neurodiverse UX as better base architecture, not a special case · 20 min · Core

> Treated as a special case, neurodiversity becomes an option few people find. At senior level it is a strategic dimension of product architecture: calm, predictable, readable defaults built from shared patterns, with adaptation modes on top. The question is which base to build, not which option to add.

:::box In plain words
**The idea.** Many companies treat neurodiversity as a special case: an extra option, a separate “easy” version, a setting few people find. At senior level it is a strategic dimension of the product architecture: calm, predictable, readable defaults help everyone and especially neurodivergent people; patterns built once carry that into every product; adaptation modes come on top of a good base, not instead of it. The question is not “which option do we add?” but “what base do we build?”.
**Why it matters.** Block 3.1 asks for a guiding vision of neurodiverse UX, three decisions on base architecture, patterns, assistive technologies, adaptation modes and test strategy, and an order of which journeys, components or product areas come first. You decide the architecture, not single screens.
**How to read the picture.** Left Hearth Energy adding an “easy mode” on top of a busy product, right building a calm base with patterns and modes. Below, the layers from a guiding vision to every product.
:::

![Hearth Energy adding an “easy mode” on top, or building a calm base with patterns and modes.](_figures/d13_B1_0.png)

![The layers of a neurodiverse UX architecture, from a guiding vision to every product.](_figures/d13_B1_1.png)

**Neurodiverse UX as a better base architecture: structures**

| Part | Real example or rule | What it means |
|---|---|---|
| A shared base | WCAG 2.2 added criteria that help people with cognitive and learning disabilities, such as redundant entry, accessible authentication and target size (WCAG 2.2). | Put the criteria into the base components, so every team inherits them. |
| Supplemental guidance | The cognitive accessibility guidance gives objectives and patterns beyond WCAG (W3C COGA 2021). | Adopt the patterns that fit your journeys and test them. |
| Mismatch as a view | Holmes treats disability as a mismatch between a person and a design and shows that solutions for one group extend to many (Holmes 2018). | Design the base for the range, not for the average. |

:::note Case assumption
Hearth Energy, Ayo, Mirko, Tilda, Pia and Lukas are made up for this example. Inclusion as better design for many follows Holmes (2018); a simplified version from the same code base follows the W3C's “Making Content Usable” (2021). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Check whether neurodiverse needs sit in the base or in an option.
- Write a guiding vision: relief, predictability, readability, adaptability.
- Put the inclusive patterns in the design system, so every product gets them.
- Add modes on top of the base, after tests show who uses them.
- Order the work: shared patterns and journeys taken in stress first.
:::

:::note Extra · go deeper (optional reading)
The “easy mode” is attractive to management because it is visible and contained: one switch, one announcement. It is also the version that changes least for most customers. The harder message for a board is that the default itself is the product most people use, and that is where inclusion has to happen.
:::

^src: W3C COGA 2021 · Holmes 2018 · WCAG 2.2

## B2 · One standard or many modes: the conflicts of neurodiverse UX · 20 min · Core

> Neurodiverse UX sits between one standard and individual adaptation, a dynamic brand and a calm interface, economic viability and the diversity of users, and the cost of testing against the risk of not testing. Decide what belongs in the base, what becomes a mode, and whom to test with first; write down the assumptions.

:::box In plain words
**The idea.** Neurodiverse UX sits between goals that pull apart: one standard for all against individual adaptation, a dynamic brand against a calm interface, economic viability against the diversity of users, and the cost of testing with many groups against the risk of not testing. The way through is to decide what belongs in the base (calm, consistent, readable), what becomes an optional mode, and whom to test with first; and to write down which assumptions about diversity, standardisation and cost the plan rests on.
**Why it matters.** Block 3.1 asks for three decisions, a risk analysis of wrong assumptions about user diversity, standardisation and economic viability, and a governance model for conflicts between brand, technology, product logic and inclusion. Each is a decision between conflicting goals.
**How to read the picture.** Three Hearth Energy decisions between conflicting goals: the dynamic brand, an extra mode, and whom to test with.
:::

![Three Hearth Energy decisions between conflicting goals · Exploratory.](_figures/d13_B2_0.png)

**Standing conflicts of neurodiverse UX**

| Conflict | Who usually stands for each side | What to ask |
|---|---|---|
| One standard against individual adaptation | Engineering, against the people a standard does not fit. | Which needs pull apart, and which do all share? |
| A dynamic brand against a calm interface | Marketing, against UX and support. | Where can the brand live without competing with the task? |
| Economic viability against diversity | Finance, against users. | What does the busy default cost in support calls and abandoned tasks? |
| Test effort against the risk of not testing | Finance, against research. | Which small test would find the most serious hurdles? |

**Conflicts of neurodiverse UX, with evidence**

| Conflict | What the evidence says | A way to decide |
|---|---|---|
| One standard against individual adaptation | A special font did not beat plain standard fonts in a study with readers with dyslexia (Rello and Baeza-Yates 2013). | Ask which needs pull apart and which are shared; solve the shared ones in the base first. |
| A dynamic brand against a calm interface | Auto-playing movement must be stoppable (WCAG 2.2.2). | Let the brand live in images and headlines and keep the task area calm. |
| Test effort against the risk of not testing | Five participants find most problems in a qualitative test (Nielsen 2000, as reported). | Run a small test early rather than a large one late. |

:::note Case assumption
Hearth Energy, Ayo, Mirko, Tilda, Pia and Lukas are made up for this example. That some needs pull in different directions, and that testing finds the balance, follows the Home Office's note on its posters (Pun 2016). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Name each conflict as two goals and say who stands for each: marketing, engineering, research, finance, users.
- Put what helps nearly everyone into the base; make only what pulls apart into a mode.
- Write down the assumptions about user diversity, standardisation and cost, and which would be critical if wrong.
- Choose a small, well-composed test over no test.
- Say what the choice gives up.
:::

:::note Extra · go deeper (optional reading)
The most expensive assumption is usually “neurodivergent customers are a small group”. Many people never had a diagnosis, and anyone under stress (after a high bill, a bereavement, a move) processes like someone with less attention to spare. Designing for the stressed customer is designing for a large share of the customers who matter most to a service.
:::

^src: W3C COGA 2021 · Pun 2016 · Rello & Baeza-Yates 2013 · WCAG 2.2 · Nielsen 2000

## B3 · Who owns it, how it is tested, and deciding with patchy data · 20 min · Core

> Neurodiverse UX needs an owner of the principles and patterns, a test strategy that includes neurodivergent people with the right support, checks in every release, and a rule for when brand, technology, product logic and inclusion disagree. With patchy test data, a decision says what it decides, does not know, would reverse and gives up.

:::box In plain words
**The idea.** Neurodiverse UX needs owners: someone who owns the principles and the patterns, a test strategy that includes neurodivergent people with the right support (a quiet room, breaks, time), checks built into every release, and a rule for when brand, technology, product logic and inclusion disagree. Test data is often patchy; a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up.
**Why it matters.** Block 3.1 asks for a governance model for neurodiverse UX principles, a decision despite patchy test data, and a statement to the management. This card gives you the parts of each.
**How to read the picture.** The four boxes at the top are the parts of a decision, filled in for Hearth Energy. The two boxes below are the rule for future decisions.
:::

![A decision under uncertainty, filled in for Hearth Energy.](_figures/d13_B3_0.png)

**Four parts of neurodiverse UX governance**

| Part | The question | An example (Hearth Energy) |
|---|---|---|
| Owners | Who owns the principles and the patterns? | The head of UX the principles; the design system team the patterns. |
| Test strategy | Who tests what, with whom, before release? | Research tests the key journeys with six people incl. neurodivergent customers; may stop a release. |
| Checks | How does each release keep the base calm and consistent? | A pattern check in the definition of done. |
| How a conflict is decided | What happens when brand, technology, product logic and inclusion disagree? | Completing a task in stress first, then brand, then convenience; the board settles a tie. |

**Owning neurodiverse UX: real rules**

| Part | Real rule or source | What it means |
|---|---|---|
| Test strategy | A small qualitative test with several groups finds most serious problems (Nielsen 2000, as reported). | Fix the number and the groups in the plan, and name who runs it. |
| Checks | WCAG 2.2 gives testable criteria for each requirement. | Put a pattern check in the definition of done. |
| Owners | Supplemental patterns have no conformance level of their own (W3C COGA 2021). | Name an owner for the patterns, or they are not applied. |

:::note Case assumption
Hearth Energy, Ayo, Mirko, Tilda, Pia and Lukas are made up for this example. Including people with cognitive and learning disabilities in research and testing follows the W3C's “Making Content Usable” (2021); deciding with limited information follows Simon (1956); the premortem follows Klein (2007). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Name who owns the principles, and who owns the patterns in the design system.
- Name who owns the test strategy, and give them a stop right.
- Include neurodivergent people in research and tests, with a quiet room, breaks and time.
- Settle conflicts by the user's ability to complete a task in stress first, then brand, then convenience.
- Say what you decide, what you do not know, when you would reverse it and what you give up.
:::

:::note Extra · go deeper (optional reading)
Without an owner, a design system drifts: each product adds one exception, and two years later the consistency that autistic customers relied on is gone. Owning the patterns means saying no to exceptions, and it is the least visible and most important job in neurodiverse UX.
:::

^src: W3C COGA 2021 · Simon 1956 · Klein 2007 · Nielsen 2000 · WCAG 2.2
