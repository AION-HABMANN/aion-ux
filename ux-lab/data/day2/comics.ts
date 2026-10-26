import { bi } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/materialTypes";
import { comicOf, panel } from "@/data/free/comicKit";

/**
 * Day 2 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people the cards
 * already use (Ana, Felix, Lea, Omar and the leisure centre Brightwater), so it is the card said again in pictures, not a new case. The last panel states the card's rule
 * and names the task block that uses it. The drawings are in components/day2/comicScenes.tsx.
 */
const NOTE = "Ana, Felix, Lea, Omar and Brightwater are made up for this lesson, like the examples on the card: a Case assumption. CityDesk, EduFlex and CampusNow, the cases of the task, are in the task.";
const NAMES = { ana2: "Ana, a visitor", felix: "Felix, a visitor", lea: "Lea, UX lead", omar: "Omar, product owner" };

export const COMICS_D2 = bi({
  A1: comicOf({
    id: "d2-a1", title: "Whose logic is the menu?", teaser: "Ana wants to swim and finds four departments.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a1-1", scene: "Ana wants to book a swim at Brightwater. The start page offers Sport Department, Facilities, Course Administration and Customer Office, and a long welcome text.", say: [["ana2", "Which of these books a swim?", true]], tag: ["plain", "PROVIDER-CENTRED"], means: "The page is complete, but it is built from how the centre is organised. Ana does not know the organisation; she knows her task.", look: "the four department buttons" }),
      panel({ art: "a1-2", scene: "Omar, the product owner, explains how the menu came about.", say: [["omar", "Every department wanted its own item. And everything is in there."]], tag: ["plain", "INSIDE LOGIC"], means: "Provider-centred design starts from the organisation's structure and wishes. The result is often complete and still hard to use." }),
      panel({ art: "a1-3", scene: "Lea, the UX lead, rebuilds the start page around what most visitors come to do.", say: [["ana2", "Book a swim. There it is."]], tag: ["teal", "USER-CENTRED"], means: "User-centred design starts from the users' tasks and words and checks the design with them. The same content, a different way in." }),
      panel({ art: "a1-4", scene: "Lea writes the test she uses for every page.", say: [["lea", "Could someone who has never seen our org chart do their task here?"]], tag: ["ink", "THE RULE"], means: "Start from the user's task, not from the organisation. You use this in Block 1.1 to read CityDesk as a first-time user, in Block 1.2 to choose the start page from a user-centred point of view and in Block 2.1 for CampusNow's internal terms." }),
    ],
  }),
  A2: comicOf({
    id: "d2-a2", title: "The scan decides", teaser: "Felix misses the dates of a course that is right in front of him.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a2-1", scene: "Felix opens the page of a swimming course. It is one long block of text.", say: [["felix", "Let's see… when is it?"]], tag: ["plain", "A DENSE BLOCK"], means: "People rarely read a page; they scan it, looking for words that match their goal." }),
      panel({ art: "a2-2", scene: "His eye goes across the first line, a little across the second, then down the left edge. The dates and the booking link are in the middle.", say: [["felix", "No dates? Maybe you can't book online.", true]], tag: ["plain", "MISSED"], means: "On text-heavy pages the scan often follows an F-shape. What the scan does not select is, for the user, not there.", look: "the orange frames of the scan" }),
      panel({ art: "a2-3", scene: "The new page has a heading, three short facts with a label each, and one Book button.", say: [["felix", "Tuesday, six o'clock, beginners. Book."]], tag: ["teal", "BUILT FOR SCANNING"], means: "Headings, short labelled facts and a clear button give the scan something to catch: what matters is selected and prioritised first." }),
      panel({ art: "a2-4", scene: "Lea adds a line to the team's checklist.", say: [["lea", "Ask what the scan will catch, not what the text says."]], tag: ["ink", "THE RULE"], means: "Scan, select, prioritise, act: design for what the scan will catch. You use this in Block 1.1 to say what a first-time user perceives first on CityDesk and in Block 2.1 for CampusNow's long text blocks." }),
    ],
  }),
  A3: comicOf({
    id: "d2-a3", title: "A path for the eye", teaser: "Six colourful boxes, and Ana cannot see where to book.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a3-1", scene: "Ana opens the offers page: six boxes in six colours, scattered over the page, and a pale Book button at the bottom.", say: [["ana2", "Where do I start? Where do I book?", true]], tag: ["plain", "EVERYTHING COMPETES"], means: "When boxes, colours and lines compete, the eye jumps without a path and the important thing is lost." }),
      panel({ art: "a3-2", scene: "Lea names the three means that guide the eye.", say: [["lea", "Contrast, grouping, structure. Use them on purpose."]], tag: ["teal", "THREE MEANS"], means: "Contrast makes one thing stand out; grouping shows what belongs together; structure gives an order the eye can follow." }),
      panel({ art: "a3-3", scene: "The new page has two labelled groups in two columns, one colour per group, and a strong Book button.", say: [["ana2", "Facilities here, courses there, and I book here."]], tag: ["teal", "GUIDED"], means: "Visual guidance is the three means together: the eye goes first to what matters and then along a path." }),
      panel({ art: "a3-4", scene: "Lea checks every page the same way.", say: [["lea", "What stands out? What belongs together? Which way does the eye go?"]], tag: ["ink", "THE RULE"], means: "Use contrast, grouping and structure on purpose, so one thing leads and the rest has an order. You use this in Block 1.1 to sort CityDesk's problems into visual guidance and structure and in Block 2.1 for CampusNow's missing priorities." }),
    ],
  }),
  A4: comicOf({
    id: "d2-a4", title: "How much at once", teaser: "Too much, too little, or enough: Felix judges the centre by its start page.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a4-1", scene: "Felix opens a crowded start page: a banner, twelve boxes and three lines of text.", say: [["felix", "Where is the Book button? This place seems chaotic.", true]], tag: ["plain", "CROWDED"], means: "Too much information at once: everything competes, orientation is lost and the load rises. The page also makes the centre look less well run." }),
      panel({ art: "a4-2", scene: "Another version shows only a large photo and a Menu button.", say: [["felix", "Nice photo. Now where are the hours?"]], tag: ["plain", "SPARSE"], means: "Too little at once is not clearer either: people have to open menus and click to reach anything." }),
      panel({ art: "a4-3", scene: "The balanced version shows three tasks and today's hours.", say: [["felix", "Book a swim, open until nine. Looks well organised."]], tag: ["teal", "BALANCED"], means: "Enough to orient, little enough to find. An ordered page is also judged more trustworthy and of higher quality." }),
      panel({ art: "a4-4", scene: "Lea writes the trade-off on the board.", say: [["lea", "Order is not decoration. People read it as quality."]], tag: ["ink", "THE RULE"], means: "Choose the density for the task: enough to orient, little enough to find; visual order is part of perceived quality. You use this in Block 1.1 for CityDesk's information density, in Block 1.2 for EduFlex's three start pages and in Block 2.1 for CampusNow's overloaded start page." }),
    ],
  }),
  A5: comicOf({
    id: "d2-a5", title: "Recognise, don't hunt", teaser: "Ana hunts for the yoga course, then Omar weighs three fixes.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a5-1", scene: "Ana looks for the yoga course. The search is a faint word in a corner, so she clicks through six menu items.", say: [["ana2", "Where did they put yoga?", true]], tag: ["plain", "HUNTING"], means: "When people have to remember where something is or hunt for it, they slow down and give up." }),
      panel({ art: "a5-2", scene: "With a visible search box at the top, she types “yoga” and recognises the course at once.", say: [["ana2", "Yoga, Thursday at seven. That one."]], tag: ["teal", "RECOGNISED"], means: "Recognition instead of search: show the options and the way so people can recognise them. Clarity instead of overload: a few clear signals do more than many loud ones." }),
      panel({ art: "a5-3", scene: "Omar has three fixes for the website and time for one first. Lea helps him weigh them.", say: [["omar", "Task buttons: big effect, little effort, low risk, live tomorrow."]], tag: ["teal", "WEIGHED"], means: "Effect on users, effort (the time and the people it takes), risk and timeliness, each with a reason. The reason counts more than the rating." }),
      panel({ art: "a5-4", scene: "The team writes the order and the reasons.", say: [["lea", "Task buttons first, hours list with it, the search next. And here is why."]], tag: ["ink", "THE RULE"], means: "Let people recognise instead of search, and weigh every measure on effect, effort, risk and timeliness with a reason. You use this in Block 1.1 for the two biggest hurdles, in Block 1.2 for findability and focus and in Block 2.1 to rate the four measures and decide what comes first." }),
    ],
  }),
  B1: comicOf({
    id: "d2-b1", title: "The meeting about colours", teaser: "Felix is lost between three systems, and the meeting is about blue.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b1-1", scene: "Felix finds “Customer Office” on the website, “Admissions” in the booking system and “Tickets” in the app, all for the same thing.", say: [["felix", "Are these three different things?", true]], tag: ["plain", "INSIDE LOGIC"], means: "Each team named and built its part its own way. Users do not see teams; they see one centre with three names for one thing." }),
      panel({ art: "b1-2", scene: "Omar comes out of the monthly meeting.", say: [["omar", "We discussed a new blue and a bigger logo. Again."]], tag: ["plain", "SCREEN THINKING"], means: "When the debate stays on colours and single screens, the cause further down is never touched: structure, naming and who owns them." }),
      panel({ art: "b1-3", scene: "Lea moves the discussion from the screen to the structure: one name for one thing, the visitor's, in every system.", say: [["lea", "“My bookings”, everywhere. Then we talk about blue."]], tag: ["teal", "USER LOGIC"], means: "Good UI decisions start from the users' tasks and words and work back to the structure and to who owns it." }),
      panel({ art: "b1-4", scene: "Lea draws the chain from a screen to the organisation behind it.", say: [["lea", "Fix it where it starts, not where it shows."]], tag: ["ink", "THE RULE"], means: "Structure follows the users' tasks, not the organisation chart; a problem that keeps coming back on screen is often settled in the structure. You use this in Block 3.1 for the guiding vision, the three decisions and the order of areas." }),
    ],
  }),
  B2: comicOf({
    id: "d2-b2", title: "Show everything, find nothing", teaser: "Omar wants every department on the start page; Ana wants a swim.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b2-1", scene: "Omar has been asked to give every department a box on the start page. Ana only wants to book a swim.", say: [["omar", "Everyone wants to be seen!"], ["ana2", "I just want to swim."]], tag: ["plain", "TWO GOALS"], means: "Goals pull against each other: much information against simplicity, stakeholders against users, standardisation against fit." }),
      panel({ art: "b2-2", scene: "Lea places five start pages on two axes: how much they show and how easily people find their task.", say: [["lea", "Past a point, more on the page means less found."]], tag: ["teal", "THE MATRIX"], means: "Showing everything is not the same as finding it. The aim is enough to see the main tasks, little enough to find them." }),
      panel({ art: "b2-3", scene: "Lea chooses three tasks first and the rest one step deeper, and writes down what it gives up.", say: [["lea", "No box per department. Here is why."]], tag: ["teal", "A CHOICE"], means: "Progressive disclosure: the few central tasks first, the rest on request. A decision names what it gives up." }),
      panel({ art: "b2-4", scene: "Lea adds the three standing conflicts to the team's checklist.", say: [["lea", "Name the two goals before you choose."]], tag: ["ink", "THE RULE"], means: "Name the conflict as two goals, choose, and say what you give up. You use this in Block 3.1 for the guiding decisions, the risk analysis and the rule for conflicts between stakeholders." }),
    ],
  }),
  B3: comicOf({
    id: "d2-b3", title: "Who owns the structure?", teaser: "Brightwater does not know whether visitors browse or search. Wait, or decide?", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b3-1", scene: "Omar does not know whether most visitors use the menu or the search: the page views and the calls each show only a part.", say: [["omar", "Shouldn't we wait for better data?"]], tag: ["plain", "PARTIAL DATA"], means: "Data is rarely complete. Waiting is also a decision, and a wrong priority shows up as calls and dissatisfied visitors." }),
      panel({ art: "b3-2", scene: "Lea decides to rename the menu first, and says what she does not know and when she would reverse it.", say: [["lea", "If the calls about booking don't drop, we change course."]], tag: ["teal", "A DECISION"], means: "A decision under uncertainty says what is decided, what is not known, when it would be reversed and what is given up." }),
      panel({ art: "b3-3", scene: "Omar asks who has the last word when departments disagree.", say: [["lea", "Digital owns the structure, departments own their texts, the director settles a tie."]], tag: ["teal", "WHO OWNS IT"], means: "User-centredness lasts only when someone owns it: the structure and the names across all touchpoints, the effect on users, and a rule for conflicts." }),
      panel({ art: "b3-4", scene: "The team writes the rule on the board.", say: [["lea", "One owner of the structure. The user's task decides. Decide, then check."]], tag: ["ink", "THE RULE"], means: "Give user-centredness an owner and a rule, and say when a decision will be checked. You use this in Block 3.1 for the governance model, the decision under uncertainty and the statement to the management." }),
    ],
  }),
}) as unknown as Record<MaterialId, Comic>;
