---
doc: materi
day: 12
kicker: DAY 12 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Accessibility, standards and neurodiversity
subtitle: Study material with real research, worked examples and the rules you use in the tasks
daytitle: Day 12 · Module 6 (day 1 of 2): Accessibility, standards and neurodiversity
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use a made-up company in each card. The task case is CitizenConnect (see the Task document).
intro: Today is about who can use a digital service, and who is left out. You learn what accessibility, usability and inclusive design mean, the barriers in perception, interaction, language and structure, what the standards and the law ask, and why accessibility has to be built in from the start. Then you meet the barriers yourself on three platforms, with the mouse put away, and you look at how the W3C shows an inaccessible city portal next to its repaired version. This document holds everything you need to study Day 12 without the website. Every card says what the idea is in plain words, shows it in a picture, gives the details and ends with the rules you use in the tasks.
glossary: accessibility,wcag,contrast,governance,case-assumption,assistive-technology,text-alternative,component,accessibility-statement,inclusive-design,neurodiversity,ux,perception,legibility,focus-order,neuro-ux,consistency,contrast-ratio,design-logic,voice-ui,keyboard-operable,cxo,page-type,barrierefreiheit
refs: holmes2018,wad2016,who2022disability,clickaway2019,wcag22,webaim2025,wong2011,bda2023,who2022autism,dyslexiaaction,eaa2019,gibbons2018,simon1956,klein2007
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. Levels 1 and 2: find the barriers of a citizen service portal without prior knowledge, rate three redesigns of a training platform under conflicting goals, then analyse a city portal, develop four measures, justify them and decide on the first 14 weeks. The cards give you the ideas and the rules you use in Task 1.
:::

## A1 · Accessibility, usability and inclusive design: who is left out, and why it matters · 12 min · Core

> Accessibility means people with disabilities can use a product on their own; usability means it is easy to use; inclusive design means designing with the full range of people from the start. Limits can be permanent, temporary or situational, and minds differ. Digital participation is a matter of quality, law and responsibility.

:::box In plain words
**The idea.** Accessibility (in German law, Barrierefreiheit) means people with disabilities can use a product without special help. Access is the wider word: everyone can reach and use it. Usability means it is easy to use. Inclusive design is the approach: design with the range of people from the start, including disabilities that are permanent, temporary or situational, and different minds (ADHD, autism, dyslexia). Digital participation is a matter of quality, of law and of responsibility: when a public or commercial service is only digital, a barrier means someone cannot take part.
**Why it matters.** Block 1.1 asks which hurdles PublicAccess puts in front of different groups of users, and Block 1.2 rates three designs on accessibility and user-friendliness. This card tells the words apart and shows whom a barrier excludes.
**How to read the picture.** The same Greenway checkout for four people: Kofi with a screen reader, Liv with dyslexia, Arjun with one arm in a cast, and someone in bright sunlight.
:::

![Greenway's checkout as four people meet it, and repaired · simulated barriers. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d12_A1_0.png)

**Four words that are often mixed up**

| Word | The question it asks | Example (Greenway) |
|---|---|---|
| Accessibility | Can people with disabilities use it on their own? | Kofi can order with his screen reader. |
| Access | Can everyone reach and use it, on any device? | The shop works on an old phone and a slow connection. |
| Usability | Is it easy and efficient to use? | Reordering last week's basket takes one tap. |
| Inclusive design | Did we design with the full range of people from the start? | Kofi and Liv were in the first tests, not the last. |

**Who is left out, and what it costs: real figures**

| Fact | Real finding | What it means for a screen |
|---|---|---|
| How many people | About 1.3 billion people, roughly 16% of the world's population, live with a significant disability (World Health Organization 2022). | Accessibility is not an edge case: about one in six people is affected permanently. |
| Permanent, temporary, situational | Holmes describes disability as a mismatch between a person and a design, with permanent, temporary and situational forms: one arm, an injured arm, a baby on the arm (Holmes 2018). | A repair for one group often helps many more. |
| Customers who leave | In a UK survey of online shoppers with access needs, 69% said they would click away from a website that they found difficult to use because of their disability, and only 8% had told a site owner about the barriers they met (Click-Away Pound 2019, as reported). | Most businesses do not hear about the barriers: a lost customer is silent. |
| Words that are mixed up | Accessibility, access, usability and inclusive design answer four different questions (see the table above). | Say which one a requirement is about. |

:::note Case assumption
Greenway, Kofi, Liv, Arjun, Sanne and Henrik are made up for this example. Disability as a mismatch between person and design, and permanent, temporary and situational limits, follow Holmes (2018). Public bodies' duty to make websites and apps accessible follows the EU Web Accessibility Directive (2016). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Ask who is left out, not only whether it works.
- Think of permanent, temporary and situational limits, and of different minds (ADHD, autism, dyslexia).
- Tell accessibility (can people with disabilities use it?) from usability (is it easy?).
- Remember that a barrier in a public or only-digital service can mean someone cannot take part at all.
- Expect a fix for one group to help many others.
:::

:::note Extra · go deeper (optional reading)
A product can meet every technical rule and still exclude people, and it can fail a rule and still be usable for most. Accessibility is about the person completing the task, not about the checklist. The checklist is how a team makes sure it did not forget anyone; it is not the goal.
:::

^src: Holmes 2018 · EU 2016 (Web Accessibility Directive) · WHO 2022 · Click-Away Pound 2019

## A2 · Barriers in perception: contrast, colour and text alternatives · 12 min · Core

> Perception barriers stop people from seeing or hearing what is there: weak contrast (the standard asks for at least 4.5 to 1 for normal text), information by colour alone, and images or icons without a text alternative.

:::box In plain words
**The idea.** Perception barriers stop people from seeing or hearing what is there. Weak contrast between text and background makes text unreadable for many, not only for people with low vision; the standard asks for a contrast ratio of at least 4.5 to 1 for normal text. Information given by colour alone (a red field, a green dot) is lost for people who cannot tell the colours apart. Images, icons and symbols need a text alternative that says what they mean, so a screen reader can say it.
**Why it matters.** Block 1.1 asks about PublicAccess's colour-only hints, weak contrast and images without descriptions, Block 1.2 about LearnAccess's reduced contrast and small text, and Block 2.1 about CitizenConnect's weak contrast and visual-only hints. This card shows how to see these barriers and measure them.
**How to read the picture.** A slider changes the contrast of a Greenway price label and computes the real contrast ratio as you move it. Below, an out-of-stock hint by colour alone and with words, and an image with and without a text alternative.
:::

![A Greenway price label on white, with the contrast ratio computed as you move the slider · Exploratory.](_figures/d12_A2_0.png)

![Greenway product tiles with or without words for “out of stock” and text alternatives for the images. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d12_A2_1.png)

**Barriers in perception: how common they are, and the rules**

| Topic | Real finding or rule | What it means for a screen |
|---|---|---|
| State of the web | In the 2025 WebAIM Million analysis of home pages, 94.8% had detectable WCAG 2 failures; low-contrast text was found on about 79% of the pages and was the most common failure (WebAIM 2025, as reported). | Contrast is the cheapest barrier to find and one of the cheapest to fix. |
| Contrast rules | WCAG 2.2 asks for at least 4.5 to 1 for normal text and 3 to 1 for large text and for controls (success criteria 1.4.3 and 1.4.11). | Measure the ratio; do not judge by eye. |
| Text alternatives | Non-text content needs a text alternative that serves the same purpose (WCAG 1.1.1); decorative images get an empty alternative. | Write the alternative for what the image does here, not for what it shows. |
| Colour alone | Colour must not be the only way to give information (WCAG 1.4.1); about 1 in 12 men have a colour vision deficiency (Wong 2011). | Add words or shapes to colour codes. |

:::note Case assumption
Greenway, Kofi, Liv, Arjun, Sanne and Henrik are made up for this example. The contrast ratios and the rule against colour alone follow WCAG 2.2; the ratio in the picture is computed with the standard's formula. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Measure the contrast of text against its background; do not judge it by eye on a good screen.
- Check every status, hint or error shown by colour: is it also said in words or with an icon?
- Give every meaningful image or icon a text alternative that says what it means.
- Leave decorative images without one, so screen readers skip them.
- Remember sunlight, old screens and older eyes: contrast is for everyone.
:::

:::note Extra · go deeper (optional reading)
Light grey secondary text is the most common accessibility failure on the web, and it usually comes from a brand guide, not from a developer. It looks refined on a large, bright designer's screen and fails on a phone in the sun. That makes contrast a brand decision as much as a design one.
:::

^src: WCAG 2.2 · Holmes 2018 · WebAIM 2025 · Wong 2011

## A3 · Barriers in interaction: keyboard, focus and order · 12 min · Core

> Interaction barriers stop people from operating a product. Many people use a keyboard, a switch, voice control or a screen reader: everything must work by keyboard, the focus must be visible, and it must move in a sensible order.

:::box In plain words
**The idea.** Interaction barriers stop people from operating a product. Many people do not use a mouse: they use a keyboard, a switch, voice control or a screen reader, all of which need everything to work by keyboard. The focus (the marker showing where you are) must be visible, and it must move in a sensible order. A menu that opens only on mouse hover, a button that is really a picture, or a focus that jumps around makes a service unusable for them.
**Why it matters.** Block 1.1 asks about PublicAccess's navigation that works well only with a mouse, and Block 2.1 about CitizenConnect's patchy keyboard operation. This card lets you try it yourself, with the Tab key.
**How to read the picture.** A small Greenway form in three versions: mouse only, keyboard with an invisible focus and a jumping order, and keyboard done right.
:::

![A Greenway checkout form in three versions; click into it and press Tab · Exploratory.](_figures/d12_A3_0.png)

**A ten-second keyboard test**

| Key | What it should do | What a barrier looks like |
|---|---|---|
| Tab | Move to the next control, in reading order. | Skips controls, or jumps around. |
| Shift + Tab | Move back. | Gets stuck in a box (a keyboard trap). |
| Enter / Space | Activate the button or link. | Nothing happens: it was a picture. |
| Arrow keys | Move within menus, tabs, radio buttons. | Menu opens only on mouse hover. |
| Escape | Close a dialog or menu. | The dialog cannot be closed. |

**Barriers in interaction: the rules behind the keyboard test**

| Check | Real rule | What it means for a screen |
|---|---|---|
| Everything by keyboard | All functionality must be operable through a keyboard interface (WCAG 2.1.1). | If it only works on hover or by mouse, it does not exist for a keyboard user. |
| No trap | Keyboard focus must not be trapped in a part of the page (WCAG 2.1.2). | Test that Tab and Shift+Tab can leave every dialog. |
| Focus order and visibility | The focus order must preserve meaning, and the keyboard focus must be visible (WCAG 2.4.3 and 2.4.7). | Follow the focus with your eyes: it should read like the page. |
| Target size | Pointer targets should be at least 24 by 24 CSS pixels at level AA (WCAG 2.5.8). | Small, crowded targets are a barrier for tremor and for thumbs. |

:::note Case assumption
Greenway, Kofi, Liv, Arjun, Sanne and Henrik are made up for this example. Keyboard operability, focus order and visible focus follow WCAG 2.2. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Put the mouse away and press Tab: can you reach and use everything?
- Can you always see where the focus is?
- Does the focus move in the order you read?
- Do menus and dialogs open, and close, with the keyboard too?
- Are buttons real buttons, with names, not pictures that react to a click?
:::

:::note Extra · go deeper (optional reading)
A team without a keyboard user often never notices a keyboard barrier, because every one of them uses a mouse. That is why the most damaging barriers are often invisible inside the company: the people who meet them are not in the room. The ten-second test puts them in the room.
:::

^src: WCAG 2.2

## A4 · Barriers in language and structure: plain words, forms, errors, neurodiversity · 12 min · Core

> Language and structure barriers stop people from understanding: long nested sentences and official terms, unclear structure, forms without clear labels, and error messages that do not say how to fix the mistake. Neurodivergent people benefit in particular from fewer distractions, predictable pages, literal language and good spacing.

:::box In plain words
**The idea.** Language and structure barriers stop people from understanding. Long nested sentences and official terms exclude people with dyslexia, with learning difficulties, with another first language, and anyone in a hurry. Clear structure (headings, short steps, the same pattern on similar pages) helps everyone find their way. Forms need clear labels and instructions, and error messages must say what went wrong and how to fix it. Neurodivergent people benefit in particular: fewer distractions (ADHD), predictable, literal language (autism), plain words and good spacing (dyslexia).
**Why it matters.** Block 1.1 asks about PublicAccess's complex forms and unhelpful error messages, Block 1.2 about LearnAccess's plain language, and Block 2.1 about CitizenConnect's unclear forms, complicated content and inconsistent page types. This card shows plain language and error tolerance before and after.
**How to read the picture.** A Greenway delivery form in official language and in plain language; then submit it with a mistake and compare the two error messages.
:::

![The Greenway delivery form in official and in plain language. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d12_A4_0.png)

![The same mistake in the Greenway form with two error messages · Exploratory.](_figures/d12_A4_1.png)

**What helps neurodivergent people (and almost everyone else)**

| Who | Often hard | What helps |
|---|---|---|
| ADHD | Distractions, long pages, many choices at once. | One task per screen, few moving parts, clear next step. |
| Autism | Vague or figurative language, surprises, changing layouts. | Literal, predictable wording; consistent pages; say what will happen. |
| Dyslexia | Dense, justified text, capitals, italics, long words. | Plain words, short sentences, left-aligned text, good spacing. |

**Language, structure and neurodiversity: findings**

| Topic | Real finding or rule | What it means for a screen |
|---|---|---|
| Autism | The World Health Organization estimates that about one in 100 children has autism, with large differences between studies (World Health Organization 2022). | Literal, predictable wording and consistent pages help a group that is not small. |
| Dyslexia | How many people have dyslexia depends on the definition: it is better described as a continuum than as one figure, and the often-quoted 10% has no traceable source (Dyslexia Action). | Use the dyslexia style guide as a design rule: plain words, short sentences, left-aligned text, good spacing (British Dyslexia Association 2023). |
| Forms and errors | Errors must be identified and described in text (WCAG 3.3.1), and WCAG 2.2 adds that a login must not rely on remembering or transcribing a code (3.3.8). | Say what went wrong and how to fix it; do not make people recall or retype. |
| Structure | Headings and labels must describe the topic or the purpose (WCAG 2.4.6). | Clear structure helps every reader and every assistive technology. |

:::note Case assumption
Greenway, Kofi, Liv, Arjun, Sanne and Henrik are made up for this example. The reading advice follows the British Dyslexia Association's style guide (2023); labels, instructions and error suggestions follow WCAG 2.2. Day 13 goes deeper into neurodiversity. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- One idea per sentence; everyday words; the question the person is answering.
- A label above every field, an example where the format matters.
- Error messages: what went wrong, where, how to fix it; keep what was typed.
- The same pattern on similar pages, so people know where things are.
- Left-aligned text, good spacing, no blocks of capitals or italics; few distractions.
:::

:::note Extra · go deeper (optional reading)
Plain language is often resisted as “dumbing down”, especially in legal and public services. It is the opposite: saying something precisely in everyday words is harder than saying it in jargon, and it is the cheapest accessibility measure with the widest effect, because everyone reads faster and makes fewer mistakes.
:::

^src: British Dyslexia Association 2023 · WCAG 2.2 · WHO autism fact sheet · Dyslexia Action

## A5 · Standards, law and risk: build it in early, and weighing a measure · 12 min · Core

> WCAG groups its requirements under perceivable, operable, understandable and robust; level AA is the usual target. EU public bodies must meet it, and since 28 June 2025 the European Accessibility Act covers many private services. Missing accessibility excludes people and brings frustration, reputational damage, legal risk and support effort; building it in early costs far less than repairing it.

:::box In plain words
**The idea.** Standards give a shared target. The Web Content Accessibility Guidelines (WCAG) group requirements under four principles: perceivable, operable, understandable, robust; level AA is the usual target. In the EU, public bodies must meet it, and since 28 June 2025 the European Accessibility Act also covers many private services such as online shops and banking. Missing accessibility excludes people and causes frustration, reputational damage, legal risk and more support calls. Building it in from the start costs far less than repairing it later. To put measures in order, weigh each on effect on users, legal certainty, feasibility, risk and time pressure.
**Why it matters.** Block 1.2 asks about legal certainty, and Block 2.1 asks for four prioritised measures for CitizenConnect, justified on effect on users, legal certainty, feasibility, risk and time pressure. The example uses Greenway and its own measures, so the answer for the task cases is not given.
**How to read the picture.** The four principles of the standard, each with a Greenway example. Then three measures rated on effect on users, legal certainty, feasibility, risk and time pressure.
:::

![The four principles of the accessibility standard, each with a Greenway example.](_figures/d12_A5_0.png)

![Greenway weighs three measures on effect on users, legal certainty, feasibility, risk and time pressure.](_figures/d12_A5_1.png)

**Standards, law and risk: real dates and findings**

| Topic | Real finding or rule | What it means for a measure |
|---|---|---|
| The European Accessibility Act | Directive (EU) 2019/882 applies from 28 June 2025 to many products and services, among them e-commerce and consumer banking; providers have to publish an accessibility statement (European Union 2019, commentary as reported). | A legal date has passed: the question is no longer whether but how far a service complies. |
| The public sector | The Web Accessibility Directive (EU) 2016/2102 requires public bodies to make websites and apps accessible and to publish an accessibility statement. | A public service has a longer duty than a private one. |
| The state of the web | 94.8% of the million most visited home pages had detectable failures in 2025 (WebAIM 2025, as reported); pages that used ARIA had over twice as many detected errors on average (57 against 27). | Do not add ARIA to repair a design: start with plain HTML and test. |
| Early or late | A barrier that is found in the first test costs less to remove than one that is found after release (practice of the standard; no measured figure is printed here). | Put the check in the definition of done. |

:::note Case assumption
Greenway, Kofi, Liv, Arjun, Sanne and Henrik are made up for this example. The principles and levels follow WCAG 2.2; the dates follow the European Accessibility Act (Directive (EU) 2019/882) and the Web Accessibility Directive (2016/2102). Check the current state of the law before a course run. Rating options on the same criteria follows Gibbons (2018); the five criteria are the ones the plan names for the case study. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Use the four principles to sort any barrier: perceivable, operable, understandable, robust.
- Know which law applies: public body, or a service covered by the European Accessibility Act.
- Name the risks of doing nothing: exclusion, frustration, reputation, legal, support calls.
- Prefer fixing where barriers are made over repairing page by page.
- Rate every measure on the same criteria, with a reason; a rating is a judgement, never a mark.
:::

:::note Extra · go deeper (optional reading)
Retrofitting costs more than building in, for a simple reason: a barrier in a shared component is copied into every page that uses it, and every copy must then be found and fixed. A contrast rule written into the design system costs one decision; the same rule discovered in an audit costs a project.
:::

^src: WCAG 2.2 · EU 2019 (European Accessibility Act) · EU 2016 (Web Accessibility Directive) · Gibbons 2018 · WebAIM 2025

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards, led by the facilitator. Level 3 in the Chief Experience Officer's chair: a guiding vision of digital participation, three strategic decisions, an order of what comes first, a risk analysis, a governance model for accessibility, one decision under uncertainty and a statement to the management. The cards give you the ideas you use in Task 2.
:::

## B1 · Accessibility as quality and responsibility, not a compliance task · 20 min · Core

> Inside many companies accessibility is first a compliance task: an audit, a statement. At senior level it is a dimension of quality and responsibility: part of what “done” means, built into components and templates, tested with disabled people, and owned by someone. Fix it where it is made.

:::box In plain words
**The idea.** Inside many companies accessibility is first a compliance task: a check before launch, an audit, a statement. At senior level it is a quality and responsibility dimension: part of what “done” means for every product, built into the design system once, tested with disabled people, and owned by someone. Systems that formally work but exclude people are not finished. The rule of thumb: fix it where it is made (components, templates, content rules), not page by page afterwards.
**Why it matters.** Block 3.1 asks for a guiding vision of digital participation, three decisions on standards, inclusive design, prioritising barriers and governance, and an order of which journeys, components or systems come first. You decide the architecture, not single fixes.
**How to read the picture.** Left Greenway treating accessibility as a launch check, right building it into how products are made. Below, the layers from a guiding vision to every page.
:::

![Greenway treating accessibility as a launch check, or building it into how products are made.](_figures/d12_B1_0.png)

![The layers of an accessibility architecture, from a guiding vision to every page.](_figures/d12_B1_1.png)

**Accessibility as quality and responsibility: structures**

| Part | Real example or rule | What it means |
|---|---|---|
| A target level | WCAG 2.2 level AA is the usual target in law and procurement; EN 301 549 is the European standard behind the Accessibility Act. | Name the level once, in the strategy. |
| Mismatch, not defect | Holmes treats disability as a mismatch between a person and a design (Holmes 2018). | Put the responsibility on the design, and measure it. |
| A duty to report | Both European directives ask for an accessibility statement (European Union 2016 and 2019). | Publish what is not yet accessible, with a contact for barriers. |

:::note Case assumption
Greenway, Kofi, Liv, Arjun, Sanne and Henrik are made up for this example. Inclusion as a design approach follows Holmes (2018). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Check where accessibility is decided today: at the end, or where products are made?
- Write a guiding vision of participation: who must be able to use every service, and how well.
- Set a target (WCAG 2.2 AA) and make it part of the definition of done.
- Fix barriers in components, templates and writing rules, not page by page.
- Order the work: what every page uses, and the key tasks, first.
:::

:::note Extra · go deeper (optional reading)
A guiding vision for participation is short and testable. “Every customer can find, choose and pay on their own” can be checked on every page: can Kofi pay with his screen reader? “We are committed to accessibility” cannot be checked, and it is what most accessibility statements say.
:::

^src: Holmes 2018 · EU 2016 (Web Accessibility Directive) · WCAG 2.2 · EU 2019 (European Accessibility Act)

## B2 · Effort, standards, diversity, law: the conflicts of accessibility · 20 min · Core

> Accessibility sits between effort and reach, one standard and the diversity of users, the brand's look and legibility, legal certainty and what can be done this year. Decide where to fix once, where to give options, and where the law sets the minimum; write down the assumptions about users, effort and law.

:::box In plain words
**The idea.** Accessibility sits between goals that pull apart: effort against reach, one standard for all against the diversity of users, the brand's look against legibility, legal certainty against what can be done this year. The way through is to decide where to fix once (components, templates), where to give people options (settings), and where the law sets the minimum; and to write down which assumptions about users, effort and legal certainty the plan rests on.
**Why it matters.** Block 3.1 asks for three decisions, a risk analysis of wrong assumptions about user diversity, effort and legal certainty, and a governance model for conflicts between brand, technology, law and user interest. Each is a decision between conflicting goals.
**How to read the picture.** Three Greenway decisions, each a conflict between goals: the brand colour, an optional settings panel, and the order of repairs.
:::

![Three Greenway decisions, each a conflict between goals · Exploratory.](_figures/d12_B2_0.png)

**Standing conflicts of accessibility**

| Conflict | Who usually stands for each side | What to ask |
|---|---|---|
| Brand look against legibility | Brand and marketing, against accessibility and legal. | Can the brand stay recognisable with a darker shade for text? |
| One standard against diverse users | Engineering, against the people a default does not fit. | Do the defaults work for most, and who needs an option? |
| Effort against reach | Finance, against the users who are excluded. | Where does one repair reach the most people? |
| Legal certainty against feasibility this year | Legal, against product. | Which failures carry the most legal and human risk? |

**Conflicts of accessibility, with evidence**

| Conflict | What the evidence says | A way to decide |
|---|---|---|
| Brand look against legibility | Low-contrast text was the most common failure on the home pages analysed in 2025 (WebAIM 2025, as reported). | Keep the brand in large areas and use a darker shade for text. |
| One standard against diverse users | Needs differ across the spectrum of people (Holmes 2018). | Set defaults that work for most and offer options for those who need them. |
| Effort against reach | 69% of the shoppers with access needs in one survey said they click away from sites with barriers (Click-Away Pound 2019, as reported). | Repair the barriers in the busiest journeys first. |
| Legal certainty against feasibility this year | The European Accessibility Act applies from 28 June 2025 (European Union 2019). | Rank the failures by legal and human risk and fix those first. |

:::note Case assumption
Greenway, Kofi, Liv, Arjun, Sanne and Henrik are made up for this example. The conflicts are a reading of the example, not a rule for every product. The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Name each conflict as two goals and say who stands for each: brand, legal, product, finance, users.
- Fix once where it is shared (components, templates); give options only on top of good defaults.
- Treat the legal minimum as the floor, not the goal.
- Write down the assumptions about user diversity, effort and legal certainty, and which would be critical if wrong.
- Say which barriers wait, and why.
:::

:::note Extra · go deeper (optional reading)
The assumption that disabled users are a small group is the one that most often distorts the trade-off. Counting permanent, temporary and situational limits, older users and different minds together, the people who benefit from an accessible default are a large share of customers, and the share grows with an ageing population.
:::

^src: EU 2019 (European Accessibility Act) · Holmes 2018 · WebAIM 2025 · Click-Away Pound 2019

## B3 · Who owns accessibility, and deciding with incomplete data · 20 min · Core

> Accessibility needs an owner of the principles and the target, a check in every release (part of “done”), testing with disabled people, rules for what is bought, a public accessibility statement, and a rule for when brand, technology, law and users disagree. With incomplete data, a decision says what it decides, does not know, would reverse and gives up.

:::box In plain words
**The idea.** Accessibility needs an owner: someone who owns the principles and the target level, a check in every release (part of “done”), testing with disabled people, rules for what is bought from suppliers, a public accessibility statement, and a rule for when brand, technology, law and users disagree. Data on real barriers is often incomplete; a decision under uncertainty says what you decide, what you do not know, when you would reverse it and what you give up.
**Why it matters.** Block 3.1 asks for a governance model for accessibility principles, a decision despite patchy data, and a statement to the management. This card gives you the parts of each.
**How to read the picture.** The four boxes at the top are the parts of a decision, filled in for Greenway. The two boxes below are the rule for future decisions.
:::

![A decision under uncertainty, filled in for Greenway.](_figures/d12_B3_0.png)

**Five parts of accessibility governance**

| Part | The question | An example (Greenway) |
|---|---|---|
| Owner and target | Who owns the principles; which level? | The head of UX; WCAG 2.2 AA. |
| Check in every release | How does nothing ship that excludes people? | An accessibility check in the definition of done; the lead may stop it. |
| Testing with people | Who tests, and when? | Disabled customers test checkout and search before each big release. |
| Procurement and statement | What do suppliers deliver; what do we publish? | AA in every contract; an honest public statement with a contact for barriers. |
| How a conflict is decided | What happens when brand, technology, law and users disagree? | Task and legal minimum first, then brand, then effort; the board settles a tie. |

**Owning accessibility: real rules**

| Part | Real rule or source | What it means |
|---|---|---|
| Owner and target | Public bodies in the EU must publish an accessibility statement (European Union 2016). | Name the owner and the level in a published statement. |
| Check in every release | WCAG 2.2 gives testable success criteria for each requirement. | Put the testable criteria into the definition of done. |
| Procurement | The European standard EN 301 549 sets accessibility requirements for the procurement of ICT products and services. | Write the level into every supplier contract. |

:::note Case assumption
Greenway, Kofi, Liv, Arjun, Sanne and Henrik are made up for this example. The accessibility statement for public bodies follows the Web Accessibility Directive (2016); deciding with limited information follows Simon (1956); the premortem follows Klein (2007). The findings in the table of real evidence are real research results, rules and cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Name who owns the principles and the target level.
- Put the accessibility check into every definition of done and every purchase.
- Give someone the right to stop a release that excludes people.
- Settle conflicts by the user's ability to complete the task and the legal minimum first, then brand, then effort.
- Say what you decide, what you do not know, when you would reverse it and what you give up.
:::

:::note Extra · go deeper (optional reading)
An audit list without an owner ages quickly: by the time the last item is fixed, new pages have added new barriers. What lasts is a check that runs every release and a person who may say no. That is the difference between doing accessibility and anchoring it.
:::

^src: EU 2016 (Web Accessibility Directive) · Simon 1956 · Klein 2007 · WCAG 2.2
