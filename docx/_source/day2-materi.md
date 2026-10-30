---
doc: materi
day: 2
kicker: DAY 2 · MATERI A AND MATERI B · ROUTES 1 AND 2 · LEVELS 1 TO 3
title: Visual perception and user-centred design
subtitle: Study material with real research, worked examples and the rules you use in the tasks
daytitle: Day 2 · Module 2 (day 1 of 2): Visual perception and user-centred design
doctype: Materi (study material). Materi A has five cards, Materi B has three.
route: Materi A serves Route 1 (Levels 1 and 2, Task 1). Materi B serves Route 2 (Level 3, Task 2).
minutes: Materi A about 60 min · Materi B about 60 min (facilitator-led)
case: Worked examples use a made-up company in each card. The task case is CampusNow (see the Task document).
intro: Today is about reading an interface the way its users do. You learn how people scan a screen, pick out what looks relevant and decide what to look at first, what guides the eye (contrast and colour, grouping, structure), what information density does to orientation and load, and why a design has to start from the user's logic and not from the provider's. Then you use it on three products and decide what to change first. This document holds everything you need to study Day 2 without the website. Every card says what the idea is in plain words, shows it in a picture, gives the details and ends with the rules you use in the tasks.
glossary: ucd,scan,contrast,provider-centred,density,governance,visual-guidance,grouping,orientation,case-assumption,progressive,ui,primary-action,timeliness,ux,neuro-ux,stakeholder,recognition,f-pattern,page-type,card-sorting,cog-load,touchpoint,attention,gestalt,findability,consistency,aesthetic-usability,perception,cxo,ia
refs: iso9241210,gould1985,normanNielsen,rosenfeld2015,treisman1980,rayner1998,thorpe1996,lindgaard2006,gds2012,nielsen1997,pernice2017,krug2014,ittiKoch2001,nielsen2008,wagemans2012,ware2012,elliot2014,wcag22,nielsen1994,wong2011,gnambs2020,wertheimer1923,sweller1988,kurosu1995,moshagen2010,tractinsky2000,iyengar2000,cowan2001,sillence2004,gibbons2018,standing1973,conway1968,spencer2009,nagappan2008,nielsen2006,simon1956,klein2007,gdsStandard
---

[[CONTENTS]]

# Materi A · Route 1 · Levels 1 and 2

:::note How Materi A is used
About 60 minutes, five cards. Levels 1 and 2: read an unfamiliar municipal portal as a first-time user, rate three start pages of a further-education platform and decide despite missing data, then analyse an education portal, develop four user-centred measures, rate them and decide what comes first. The cards give you the ideas and the rules you use in Task 1.
:::

## A1 · Seeing an interface, and designing from the user's side: user-centred against provider-centred design · 13 min · Core

> People see a screen before they read it. User-centred design starts from what users come to do and how they see; provider-centred design starts from how the organisation is built.

:::box In plain words
**The idea.** Before people read a screen they see it: shapes, contrasts and groups decide what is noticed and what is missed. User-centred design starts from what the users come to do and how they see, and checks the design with them. Provider-centred design starts from how the organisation is built and what it wants to say, so the menu mirrors its departments and the start page mirrors its wishes. Both can be complete; only one is easy to use.
**Why it matters.** Block 1.1 asks you to read CityDesk as a first-time user, Block 1.2 to choose a start page from a user-centred point of view, and Block 2.1 to find CampusNow's problems, several of which come from inside logic. This card gives you the difference to look for.
**How to read the picture.** The same Brightwater start page twice: built from the provider's side and from the user's side. Below, a table of what the eye and the brain do before anyone reads, and a real case of user-centred design, GOV.UK.
:::

![The same Brightwater start page, built from the provider's side and from the user's side. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d2_A1_0.png)

**Provider-centred and user-centred design**

| Aspect | Provider-centred | User-centred |
|---|---|---|
| Starts from | The organisation's structure and wishes. | The users' tasks, words and way of seeing. |
| The menu | One item per department. | One item per task people come for. |
| The words | The organisation's terms. | The words users would type or say. |
| Checked by | Whether everything is there. | Whether users can do their task, tested with them. |
| Typical result | Complete, but people search and call. | The same content, found and used. |

**Seeing a screen: what happens before anyone reads**

| Step | What happens | Real finding | What it means for a screen |
|---|---|---|---|
| Noticing | Features such as colour, size, orientation and movement are picked out in parallel, before attention is placed. | A single odd item pops out at once; a combination of features has to be searched item by item (Treisman and Gelade 1980). | One clear difference is enough to be seen first; many differences compete. |
| Fixating | Only a spot of about 2° is sharp; the eyes jump and rest, three to four times a second. | A fixation lasts about 200 to 300 ms (Rayner 1998). | What is not fixated is seen only as a blur, so the important thing must sit where the eye goes. |
| Recognising | Shapes and groups are matched to what the person knows within a fraction of a second. | People tell whether a photo shown for 20 ms contains an animal; the brain shows the difference after about 150 ms (Thorpe et al. 1996). | Layout, icons and groups are understood before the first word is read. |
| Judging | A first impression of the whole forms before the page is used. | People rate the appeal of a web page after 50 ms (Lindgaard et al. 2006). | The look that is seen first sets the expectation for everything that follows. |

**User-centred design in practice: GOV.UK**

| What happened | Real fact | What it shows |
|---|---|---|
| The principle | The design principles of GOV.UK begin with “Start with user needs”: the process starts from real user needs and designs around them, not around the way the official process is at the moment (Government Digital Service 2012). | A principle is only user-centred if it comes first, before the organisation's own wishes. |
| The change | GOV.UK replaced the two main government websites, Directgov and Business Link, on 17 October 2012. The team analysed every piece of information on both sites and built new pages and tools around the needs it found; 28,500 mappings kept the old addresses working. | User-centred design is not a new coat of paint on the same content: it changes what is there and how it is found. |
| The result | The Government Digital Service reported 61% task success on GOV.UK against 46% on Business Link. | These figures come from the Government Digital Service itself and are not an independent test: say who measured a result. |

:::note Case assumption
Brightwater, Ana, Felix, Lea and Omar are made up for this example. User-centred design follows ISO 9241-210 and the principles of Gould and Lewis (1985): an early focus on users and their tasks, testing with real users, and iteration. The findings in the table of real evidence are real research results and real cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Read the screen as someone who has never seen it: what would they come to do, and can they see where to do it?
- Look for the organisation in the interface: menu items named after departments, the organisation's own words, a page that opens with what the provider wants to say.
- A complete interface is not the same as a usable one: everything can be there and still not be found.
- Judge a UI decision from the user's side, not from the inside logic of the people who built it.
:::

:::note Extra · go deeper (optional reading)
ISO 9241-210 calls it human-centred design and names four activities that repeat: understand the context of use, specify the users' requirements, produce design solutions, and evaluate them against the requirements. The point is the loop: a design is not finished when it is complete, but when users can do what they came for.
:::

^src: ISO 9241-210 · Gould & Lewis 1985 · Norman & Nielsen · Rosenfeld et al. 2015 · Treisman & Gelade 1980 · Rayner 1998 · Thorpe et al. 1996 · Lindgaard et al. 2006 · Government Digital Service 2012

## A2 · How people scan, select and prioritise: perception as the basis of UI decisions · 12 min · Core

> People scan before they read: the eye jumps to what stands out and what looks relevant, ranks it and skips the rest. What the scan does not catch is, for the user, not there.

:::box In plain words
**The idea.** People rarely read a screen; they scan it. The eye jumps to what stands out, picks out headings, words and buttons that look relevant to the goal, and skips the rest. On text-heavy pages the jumps often follow an F-shape: across the top, across a little lower, then down the left edge. What is not picked out in this first pass is, for the user, not there. A UI decision is therefore a decision about what the scan will catch.
**Why it matters.** Block 1.1 asks what a first-time user perceives first on CityDesk and which obstacles stop them, and Block 2.1 asks why CampusNow's long text blocks are hard to scan. You need the scan to say why something is seen or missed.
**How to read the picture.** First the four steps of a scan. Then one Brightwater page in two forms: a dense block of text and the same content structured for scanning. A table of scanning in real numbers follows.
:::

![How people take in a screen: four steps in a second or two.](_figures/d2_A2_0.png)

![One Brightwater course page as a dense block and as a page built for scanning. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d2_A2_1.png)

**What the scan catches, and what it misses**

| The scan catches | The scan misses |
|---|---|
| Strong contrasts, large shapes, movement. | Pale, small or low-contrast elements, such as a grey search box. |
| Headings and the first words of lines. | The middle of long, dense paragraphs. |
| Words that match the goal (“Book”, “Opening hours”). | The organisation's own terms the user does not know. |
| The top of the page and the left edge. | What is far down the page or only after long scrolling. |

**Scanning in numbers: what people read, and what they skip**

| Step | Real finding | What it means for a screen |
|---|---|---|
| Scan | In a test of web pages, 79% of the users always scanned a new page and only 16% read it word by word (Nielsen and Morkes 1997). | Set the page for a scan: clear headings, short paragraphs, one idea each. |
| Select | On the average page view of 593 words, users could read at most 28% of the words if they spent all their time reading, and about 20% is more realistic. Reading time rose by only 4.4 seconds for each added 100 words (Nielsen 2008; data from 2005; an upper bound from time on page, not an eye-tracking result). | Every extra paragraph is read by fewer people: put the important thing first and cut the rest. |
| Prioritise | Users read half of the information on an average visit only on pages of 111 words or fewer (Nielsen 2008). | If everything on the page must be read, there is too much on the page. |
| Follow a pattern | In eye-tracking of unstructured text pages with 232 users, the eyes moved in an F-shape: across the top, across a little lower, then down the left edge (Pernice 2017). | The pattern shows what a page gives the eye; headings and bold key words change it. |

:::note Case assumption
Brightwater, Ana, Felix, Lea and Omar are made up for this example. Scanning follows Nielsen (1997); the F-shaped pattern on unstructured text follows Pernice (2017); the pull of strong signals follows Itti and Koch (2001). The findings in the table of real evidence are real research results and real cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Ask what a first-time user sees in the first second or two: the strongest contrasts, the largest shapes, the top and the left edge.
- Ask what they would look for, in their own words, and whether those words appear where the scan passes.
- Treat a long, dense block as invisible in the first pass: what is in its middle is usually missed.
- Headings, short labelled facts and clear buttons give the scan something to catch.
:::

:::note Extra · go deeper (optional reading)
The F-pattern is not a rule to design for; it is a sign that a page gives the eye nothing better. Pernice (2017) describes how headings, bullet points, bold key words and short paragraphs change the pattern: the eye then jumps from anchor to anchor instead of skimming the top and sliding down the left edge.
:::

^src: Nielsen 1997 · Pernice 2017 · Krug 2014 · Itti & Koch 2001 · Nielsen 2008

## A3 · What guides the eye: contrast and colour, grouping and structure · 13 min · Core

> Contrast makes one thing stand out, grouping shows what belongs together, structure gives the eye a path. Used on purpose, they guide the eye; used against each other, everything competes.

:::box In plain words
**The idea.** Four means guide the eye. Contrast makes one thing stand out from its surroundings. Grouping shows what belongs together: things that are close to each other or look alike are read as one group. Structure gives an order the eye can follow, such as headings, columns and alignment. Visual guidance is these three used on purpose, so that the eye goes first to what matters and then along a path. Used against each other, boxes, colours and lines compete and the eye finds no way. Colour is the strongest of these signals: it is seen before shape or text and carries meaning people have learnt, such as red for danger. Used strategically, one accent colour marks the main action and a warning colour is kept for real warnings.
**Why it matters.** Block 1.1 asks you to sort CityDesk's problems into visual guidance, structure and other categories, and Block 2.1 asks about CampusNow's missing prioritisation and inconsistent page types. These means, and how colour is used, are what you check.
**How to read the picture.** One Brightwater page with three switches: contrast, grouping and structure. Then the Book button at three contrast ratios, with the ratio shown, and a table of the real rules and numbers behind each means.
:::

![A Brightwater offers page with and without contrast, grouping and structure. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d2_A3_0.png)

![The Brightwater Book button at three contrast ratios, with a ratio readout. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d2_A3_1.png)

**The means of visual guidance, and a sign that one is missing**

| Means | What it does | A sign it is missing |
|---|---|---|
| Contrast | Makes one element stand out from its surroundings. | The main action is as pale as everything else; or everything is loud. |
| Grouping | Shows what belongs together (close together, alike). | Related items are scattered; unrelated items share a box. |
| Structure | Gives an order the eye can follow: headings, columns, alignment. | Boxes placed anywhere; every page type laid out differently. |
| Visual guidance | All three on purpose: the eye goes first to what matters, then along a path. | Boxes, colours and lines compete; the eye jumps. |

**Colour used strategically, and colour used against the user**

| Strategic use | What it does | Used against the user |
|---|---|---|
| One accent colour for the main action | The eye finds the action first. | Three button colours with no meaning: the eye compares instead of acting. |
| A warning colour only for real warnings | Red keeps its meaning, so people react when it matters. | Red on neutral information: people learn to ignore it, or feel unsafe. |
| Colour plus a word or an icon | Everyone gets the meaning, also people who see colours differently. | Colour alone: “the red fields are required”. |
| Colours that group | Things of one kind share a colour, so the eye reads groups. | A different colour for every box: nothing belongs together. |

**Rules and numbers behind the means of visual guidance**

| Means | Real rule or finding | What to check |
|---|---|---|
| Contrast | WCAG 2.2 asks for a contrast ratio of at least 4.5 to 1 for normal text and 3 to 1 for large text (success criterion 1.4.3), and 3 to 1 for the parts of controls and graphics people need to see (1.4.11). | Measure the ratio of the main action and its label; do not judge it by how it looks on your own screen. |
| Colour | Colour must not be the only way to give information (1.4.1). About 1 in 12 men and 1 in 200 women have a colour vision deficiency, roughly 8% and 0.5% (Wong 2011). | Add a word, an icon or a position to every colour that carries meaning. |
| Grouping | Things that are close, alike or inside one boundary are read as a group; the principles come from Gestalt psychology (Wertheimer 1923; summary in Wagemans et al. 2012). | Make the space between related items smaller than the space between groups. |
| Structure | Alignment, headings and columns give the eye a path; eye-tracking of text pages shows a pull to the top and to the left edge (Pernice 2017). | Put the first thing to see at the top left of the area it belongs to. |
| Guidance of the gaze | Attention goes first to what differs most from its surroundings in colour, contrast, orientation or motion (Itti and Koch 2001; Ware 2012). | Give exactly one thing the strongest difference on the screen. |
| A caution on colour meaning | Claims that one colour changes how people perform have not held up: a 2020 meta-analysis found no evidential value for an effect of red on intellectual performance after correcting for publication bias (Gnambs 2020). | Use colour for contrast, grouping and a few fixed meanings; do not rely on a claim that a colour makes people feel or act in one way. |

:::note Case assumption
Brightwater, Ana, Felix, Lea and Omar are made up for this example. Grouping by proximity and similarity follows the Gestalt research summarised by Wagemans et al. (2012); contrast and visual search follow Ware (2012); the meaning of colour follows Elliot and Maier (2014); not using colour alone follows WCAG 2.2, criterion 1.4.1. The findings in the table of real evidence are real research results and real cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Find the strongest contrast on the screen and ask whether it is the most important thing. If not, it misleads the eye.
- Check grouping: things that belong together should be close together or look alike, and unrelated things should not.
- Check structure: headings, columns and alignment the eye can follow from top to bottom.
- Count the competing boxes, colours and lines. Many strong ones of equal weight mean there is no visual guidance.
- Different page types with different structures make people learn every page again: keep one structure per page type.
- Use colour strategically: one accent for the main action, a warning colour only for real warnings, and never colour alone to carry a meaning.
:::

:::note Extra · go deeper (optional reading)
Proximity usually wins over colour: two items close together are read as a group even if their colours differ, and a heading placed nearer the text below it than the text above it is read as belonging to the text below. Much visual guidance is therefore done with spacing alone, before any colour is chosen.
:::

^src: Wagemans et al. 2012 · Ware 2012 · Elliot & Maier 2014 · WCAG 2.2 · Nielsen 1994 · Wong 2011 · Gnambs 2020 · Wertheimer 1923 · Pernice 2017 · Itti & Koch 2001

## A4 · How much at once: information density, orientation, load and why order looks like quality · 12 min · Core

> Too much at once and everything competes: orientation is lost and the load rises. Too little and people click a lot. An ordered page also looks more trustworthy and of higher quality.

:::box In plain words
**The idea.** Information density is how much a screen shows at once. When it is too high, everything competes, orientation is lost and the cognitive load rises: people have to hold and sort too much. When it is very low, people click a lot to reach anything. Visual order also changes how good a product seems: a calm, ordered page is judged more trustworthy and of higher quality, often before it has been used. Order is not decoration; it is part of the quality people perceive.
**Why it matters.** Block 1.1 asks about CityDesk's information density, Block 1.2 asks you to weigh EduFlex's crowded, reduced and image-led start pages, and Block 2.1 asks about the overloaded start page of CampusNow. This card gives you the trade-off and its effect on load and on perceived quality.
**How to read the picture.** One Brightwater start page at three densities: crowded, balanced and sparse. A table of real findings on density, choice and trust follows.
:::

![The Brightwater start page at three densities. Shown here in its starting state; in the Neuro-UX Lab every version and every stress test can be used.](_figures/d2_A4_0.png)

**Three densities and what they do**

| Density | Orientation and load | How the product seems |
|---|---|---|
| Crowded | Everything competes; orientation is lost; the load is high. | Chaotic, less trustworthy. |
| Balanced | The main tasks are seen at once; the rest is close by. | Calm, well run, of higher quality. |
| Sparse | Calm, but the tasks are behind menus; many clicks. | Elegant, but it can seem empty or evasive. |

**Density, choice and trust: real findings**

| Finding | What was measured | What it means for a screen |
|---|---|---|
| Choice overload (Iyengar and Lepper 2000) | At a shop booth with 24 jams, about 60% of the passers-by stopped to taste and 3% of those who stopped bought a jar; with 6 jams, about 40% stopped and 30% of them bought. | More to choose from drew more interest and fewer decisions. The study rests on few purchases and later reviews find the effect inconsistent: treat it as a warning, not as a law. |
| Working memory (Cowan 2001) | People hold about four chunks in mind at once. | A screen that asks people to compare more than a few things at once asks for more than they have. |
| Design appeal and rejection (Sillence et al. 2004) | In a four-week study, fifteen women searching for health advice rejected sites because of their design appeal, and chose sites for the credibility of the information and its personalisation. | A cluttered or careless page is rejected before its content is judged: order earns the chance to be read. |

:::note Case assumption
Brightwater, Ana, Felix, Lea and Omar are made up for this example. Cognitive load follows Sweller (1988); the aesthetic-usability effect follows Kurosu and Kashimura (1995) and Tractinsky et al. (2000); simplicity as a facet of visual aesthetics follows Moshagen and Thielsch (2010). The findings in the table of real evidence are real research results and real cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Count what the first screen asks the user to take in at once. Every extra element adds to the cognitive load.
- A crowded page costs orientation; a very sparse one costs clicks. Choose the density for the task the page serves.
- Visual order changes how good a product seems: a disordered page is judged less trustworthy before it is used.
- On a phone the same content is longer and narrower, so density problems grow.
:::

:::note Extra · go deeper (optional reading)
Moshagen and Thielsch (2010) found four facets of how good a website looks: simplicity, diversity, colour and craftsmanship. Simplicity, the order and clarity of the layout, is the one a crowded page loses first. That is why an overloaded portal is judged not only harder to use but also of lower quality, even when its content is complete.
:::

^src: Sweller 1988 · Kurosu & Kashimura 1995 · Moshagen & Thielsch 2010 · Tractinsky et al. 2000 · Iyengar & Lepper 2000 · Cowan 2001 · Sillence et al. 2004

## A5 · Recognition instead of search, clarity instead of overload, and weighing a measure · 10 min · Core

> Let people recognise instead of search, and give a few clear signals instead of many loud ones. To put measures in order, weigh each on effect on users, effort, risk and timeliness, with a reason.

:::box In plain words
**The idea.** Two first principles of user guidance. Recognition instead of search: show people the options, words and next step so they can recognise them, instead of making them remember or hunt. Clarity instead of overload: a few clear signals do more than many loud ones. To put measures in order, weigh each one on the four questions Block 2.1 names: effect on users, effort (the time and the people it takes), risk and timeliness (how soon users notice it). The reason next to each rating matters more than the rating.
**Why it matters.** Block 1.1 asks for the two biggest hurdles for an inexperienced user, Block 1.2 asks you to rate start pages on findability and focus, and Block 2.1 asks you to rate four measures on effect, effort, risk and timeliness and to decide what comes first. The example uses Brightwater and its own measures, so the answer for the task cases is not given.
**How to read the picture.** Three measures Brightwater considered, rated on effect on users, effort, risk and timeliness. A rating is a reading of the example, not a mark. A table of recognition and clarity with evidence follows.
:::

![Brightwater weighs three measures on effect on users, effort, risk and timeliness.](_figures/d2_A5_0.png)

**Recognition and clarity, with evidence**

| Principle | Real finding | What it looks like on a screen |
|---|---|---|
| Recognition rather than recall | Nielsen's sixth heuristic: make elements, actions and options visible so users do not have to remember them (Nielsen 1994). | A menu that lists the options; a form that shows the date format; the last search offered again. |
| Recognition memory is large | In Standing's experiments (1973) people recognised pictures they had seen once among thousands, with no sign of saturation after 10,000 pictures. | Show people the thing, with its picture and its words; do not ask them to name it from memory. |
| Clarity rather than overload | The design principles of GOV.UK list “Do less” second, directly after “Start with user needs” (Government Digital Service 2012). | Remove a signal before adding one: ask what the person can do without. |

:::note Case assumption
Brightwater, Ana, Felix, Lea and Omar are made up for this example. Recognition rather than recall and aesthetic and minimalist design are Nielsen's heuristics (1994); rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study. The findings in the table of real evidence are real research results and real cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Recognition instead of search: show the options, the words and the next step so people recognise them, instead of making them remember or hunt.
- Clarity instead of overload: one main action per screen, a visible search, and only the signals that help the task.
- Rate every measure on the same four questions: effect on users, effort (the time and the people it takes), risk, timeliness (how soon users notice it).
- A rating is a judgement with a reason, never a mark. A different order with a better reason is a better answer.
- A measure with a high effect, little effort, low risk and a quick result usually comes first; a larger, strategic one can still be started early.
:::

:::note Extra · go deeper (optional reading)
Effort on this course is always time and people: who has to work on a measure and for how long. That keeps the comparison honest when the money is fixed, and it shows where a measure needs a department's time, such as agreeing new names, rather than a developer's.
:::

^src: Nielsen 1994 · Krug 2014 · Gibbons 2018 · Standing 1973 · Government Digital Service 2012

# Materi B · Route 2 · Level 3

:::note How Materi B is used
About 60 minutes, three cards, led by the facilitator. Level 3 in the Chief Experience Officer's chair: a guiding vision of user-centred design, three strategic decisions, an order of the areas to rework, a risk analysis, a governance model, one decision under uncertainty and a statement to the management. The cards give you the ideas you use in Task 2.
:::

## B1 · Inside logic against user logic: why good UI decisions come from the user's side · 21 min · Core

> Organisations tend to build what mirrors their own structure. Good UI decisions start from the users' tasks and words and work back to screens, structures and owners.

:::box In plain words
**The idea.** Organisations tend to build their digital services the way they are built themselves: one menu item per department, one page layout per team, the organisation's own words. Users do not know the organisation chart; they know their task. Good UI decisions therefore start from the users' tasks and words and work back to screens, structures and owners. When the inside logic wins, users search instead of being guided, and the problem is no longer a design problem but one of how the organisation decides.
**Why it matters.** Block 3.1 asks for a guiding vision, three decisions on orientation, structure, information priority and guidance, and an order of the areas to rework, for an organisation that discusses colours while the cause lies in its structure. You work from the users' tasks, not from the organisation chart.
**How to read the picture.** Left the same Brightwater services ordered by the inside logic, right by the users' tasks. Below, the chain from a single screen to the structure behind it. A table of the evidence for inside logic against user logic follows.
:::

![The same Brightwater services ordered by the inside logic and by the users' tasks.](_figures/d2_B1_0.png)

![From a single screen to the structure behind it.](_figures/d2_B1_1.png)

**Inside logic against user logic: the evidence**

| Evidence | What it shows | What it means for a decision |
|---|---|---|
| Conway 1968 | Organisations that design systems produce designs that are copies of their own communication structure. | A menu with one item per department is not a coincidence: it is the organisation chart on the screen. |
| Nagappan, Murphy and Basili 2008 | On Windows Vista (3,404 binaries, more than 50 million lines of code), measures of the organisation behind the code predicted failure-proneness better than measures of the code itself. | How an organisation is built shows in the product, down to its quality. |
| GOV.UK 2012 | The team did not copy the content of Directgov and Business Link; it started from user needs and built new pages and tools (Government Digital Service 2012). | To leave the inside logic, start from what the user comes to do and work back to the structure and the owners. |
| Card sorting (Spencer 2009) | Users group the content in their own words, and the groups are compared with the organisation's structure. | The gap between the two groupings is the inside logic, made visible. |

:::note Case assumption
Brightwater, Ana, Felix, Lea and Omar are made up for this example. That organisations build what mirrors their communication structure follows Conway (1968); labelling in the users' language follows Rosenfeld, Morville and Arango (2015); card sorting follows Spencer (2009). The findings in the table of real evidence are real research results and real cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Look for the organisation chart in the interface: menu items per department, page layouts per team, the organisation's words.
- Start from the users' tasks: name and order everything by what people come to do.
- When a problem keeps coming back on the screen, look further down: the structure, the information architecture, who owns them.
- Discussions about colours and single screens are a sign that nobody owns the structure.
- Find the users' logic with them, for example with a card sort, instead of guessing it from the inside.
:::

:::note Extra · go deeper (optional reading)
A card sort is simple: write the names of the content on cards, ask a few users to group them and name the groups, and compare their groups with your menu. Where users put things together that your menu keeps apart, the structure follows the inside logic.
:::

^src: Conway 1968 · Rosenfeld et al. 2015 · Spencer 2009 · Nagappan et al. 2008 · Government Digital Service 2012

## B2 · Conflicts of goals: much information against simplicity, stakeholders against users · 20 min · Core

> Much information against simplicity, standardisation against fit, stakeholders against users: the goals pull against each other. Show the few central tasks first and the rest one step deeper.

:::box In plain words
**The idea.** In user-centred design the goals pull against each other. Much information on the first page helps the department that wants everything seen, and hurts the user who needs relief. One standard for every page helps IT and predictability, and limits what a team can adapt. Activation helps marketing and can cost focus. A common way through is to show the few central tasks first and the rest one step deeper (progressive disclosure). The work is to name the conflict, choose, and say what you give up.
**Why it matters.** Block 3.1 asks for three guiding decisions, a risk analysis and a governance model for stakeholders with different goals. Each of these is a decision between conflicting goals.
**How to read the picture.** The matrix places five Brightwater start pages by how much they show at once (to the right) and how easily people find their task (upwards). A position is a reading of the example, not a score. A table of conflicts weighed with evidence follows.
:::

![Five Brightwater start pages by how much they show and how easily people find their task · Exploratory.](_figures/d2_B2_0.png)

**Three standing conflicts of user-centred design**

| Conflict | Who usually stands for each side | What to ask |
|---|---|---|
| Much information against simplicity | A department that wants everything seen, against users who need relief. | What do most users need first, and what can be one step deeper? |
| Standardisation against fit | IT and predictability, against a team with a special case. | Does the special case really need its own structure? |
| Stakeholders against users | Marketing's activation, a department's visibility, against the users' task. | Whose goal does this element serve, and at what cost to the task? |

**Conflicts weighed with evidence**

| Conflict | What the evidence says | A way to decide |
|---|---|---|
| Much information against simplicity | Users could read at most 28% of the words of an average page view (Nielsen 2008); a display of 24 jams led to fewer purchases than a display of 6 (Iyengar and Lepper 2000). | Show the few central tasks first and the rest one step deeper (Nielsen 2006); keep the detail available. |
| Stakeholders against users | For GOV.UK, the team analysed all the information on both old sites against user needs rather than carrying over each department's wish list (Government Digital Service 2012). | Put the user needs, found with users, on the table next to each department's wish. |

:::note Case assumption
Brightwater, Ana, Felix, Lea and Omar are made up for this example. Progressive disclosure follows Nielsen (2006); the matrix is a reading of the example, not a score. The findings in the table of real evidence are real research results and real cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Name the conflict as two goals before you choose between them, and say who stands for each.
- More on the first page is not better findability; past a point it is worse.
- Progressive disclosure: the few central tasks first, the rest on request, so the first screen stays clear.
- A standard for every page helps predictability and IT; say where it does not fit and what happens then.
- Say what the choice gives up; a decision that gives up nothing has not been made.
:::

:::note Extra · go deeper (optional reading)
Progressive disclosure has one condition: the first level must hold what most people need most of the time. If it does not, people dig through the second level for everything and the design is slower than a crowded page. Choosing the first level is therefore the real decision, and it needs evidence about the users' tasks.
:::

^src: Nielsen 2006 · Gibbons 2018 · Krug 2014 · Nielsen 2008 · Iyengar & Lepper 2000 · Government Digital Service 2012

## B3 · User-centredness as the basis of accountable decisions: who owns the structure, and deciding with partial data · 19 min · Core

> User-centredness lasts only when someone owns it. A decision with partial data says what it decides, what it does not know, when it would reverse it and what it gives up.

:::box In plain words
**The idea.** User-centredness only lasts when someone is responsible for it: who owns the structure and the words across all touchpoints, who answers for what users experience, and how a conflict between departments is settled. Because the data is rarely complete, a decision under uncertainty says four things: what you decide, what you do not know, when you would reverse it, and what you give up. A wrong priority is not neutral; it shows up as support effort and dissatisfied users.
**Why it matters.** Block 3.1 asks for a governance model, a decision under uncertainty that you can still justify, and a statement to the management. This card gives you the parts of each.
**How to read the picture.** The four boxes at the top are the parts of a decision, filled in for Brightwater. The two boxes below are the rule for future decisions. A table of a real governance example follows.
:::

![A decision under uncertainty, filled in for Brightwater.](_figures/d2_B3_0.png)

**Three parts of a governance model for user-centred design**

| Part | The question | An example (Brightwater) |
|---|---|---|
| Who owns what | Who owns the structure, the names and the page patterns; who owns the content? | Digital services own the structure; each department owns its texts. |
| Who answers for it | Who answers for what users experience across touchpoints? | The head of digital services. |
| How conflicts are settled | What happens when departments want different things? | The visitors' task decides, shown by calls, searches and tests; the director settles a tie. |

**Owning user-centredness: a real example of governance**

| Part | Real example | What it means |
|---|---|---|
| A standard to meet | The GOV.UK Service Standard has 14 points since July 2019 (18 before); point 1 is to understand users and their needs. | Write down what every service must meet, and start with the users. |
| An assessment | Services are assessed against the standard by a panel; a published assessment report says whether point 1 was met and what evidence of users the panel saw. | Decide who checks, and on what evidence, before the work is finished. |
| A named order | “Start with user needs” stands first among the GOV.UK design principles. | The order of the principles shows what wins when they conflict. |

:::note Case assumption
Brightwater, Ana, Felix, Lea and Omar are made up for this example. Deciding with limited information follows Simon (1956); the premortem follows Klein (2007). The findings in the table of real evidence are real research results and real cases; the sources are listed below.
:::

:::rules How to decide when this comes up in the task
- Name who owns the structure and the names across all touchpoints, and who owns only the content.
- Name who answers for what users experience, not only for a single page.
- Give conflicts a rule: the users' task decides, shown by evidence; where it does not settle it, a named person does.
- Say what you decide, what you do not know, when you would reverse it and what you give up.
- A wrong priority is not neutral: it shows up as support effort and dissatisfied users. Say when you will check.
:::

:::note Extra · go deeper (optional reading)
Before committing, imagine it is a year later and the reorganisation has failed, and ask why (Klein 2007). The answers are usually wrong assumptions about users: that they browse when they search, that they know a term they do not, that they use a desktop when they use a phone. Those are the assumptions to check first.
:::

^src: Simon 1956 · Klein 2007 · ISO 9241-210 · GOV.UK Service Standard · Government Digital Service 2012
