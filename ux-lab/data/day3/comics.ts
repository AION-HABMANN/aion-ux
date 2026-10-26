import { bi } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/materialTypes";
import { comicOf, panel } from "@/data/free/comicKit";

/**
 * Day 3 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people the cards
 * already use (Rosa, Theo, Ines, Karim and the grocery shop Kettle & Co), so it is the card said again in pictures, not a new case. The last panel states the card's rule
 * and names the task block that uses it. The drawings are in components/day3/comicScenes.tsx.
 */
const NOTE = "Rosa, Theo, Ines, Karim and Kettle & Co are made up for this lesson, like the examples on the card: a Case assumption. TravelEase, HealthConnect and SecureLife, the cases of the task, are in the task.";
const NAMES = { rosa: "Rosa, a customer", theo: "Theo, a customer", ines: "Ines, UX lead", karim: "Karim, brand manager" };

export const COMICS_D3 = bi({
  A1: comicOf({
    id: "d3-a1", title: "Red for nothing", teaser: "A red box alarms Rosa about an ordinary delivery time.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a1-1", scene: "Rosa is about to pay. A red box says ATTENTION: delivery on Saturday. “Pay now” is grey, “Keep shopping” bright orange.", say: [["rosa", "Is something wrong with my order?", true]], tag: ["plain", "COLOUR WITHOUT A JOB"], means: "Colour is seen first. Here red warns about nothing, and the strongest colour sits on the wrong button.", look: "the red box and the orange button" }),
      panel({ art: "a1-2", scene: "Ines, the UX lead, lists what colour can do.", say: [["ines", "Draw attention, warn, invite, build trust, give orientation. One job each."]], tag: ["teal", "FIVE EFFECTS"], means: "Colour acts on attention, trust, activation, warning and orientation. The effects are learnt and depend on context, so each is a hypothesis." }),
      panel({ art: "a1-3", scene: "The new page: one blue for “Pay now”, a calm line for the delivery time, a soft tint for each area.", say: [["rosa", "Saturday morning. Pay."]], tag: ["teal", "COLOUR WITH A JOB"], means: "One accent draws attention to the action, red stays free for a real problem, and calm tints give orientation." }),
      panel({ art: "a1-4", scene: "Ines writes the rule on the board.", say: [["ines", "If a colour has no job, it competes with the ones that do."]], tag: ["ink", "THE RULE"], means: "Give every colour a job and keep it. You use this in Block 1.1 to describe what TravelEase's four colours do to you and in Block 1.2 for the trust and brand effect of HealthConnect's designs." }),
    ],
  }),
  A2: comicOf({
    id: "d3-a2", title: "The purple dot", teaser: "Theo cannot tell which of his orders failed.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a2-1", scene: "Theo opens his orders. Each has a coloured dot: orange, green, purple. The button and the offer box are orange and purple too.", say: [["theo", "Does purple mean something?"]], tag: ["plain", "DECORATIVE"], means: "Decorative colour sets a look. When it uses the same tones as the colours that carry meaning, nothing can be told apart." }),
      panel({ art: "a2-2", scene: "He closes the app. Two days later the order still has not come: the payment had failed.", say: [["theo", "Nobody told me!", true]], tag: ["plain", "MISREAD"], means: "A colour alone carried the state, and it looked like decoration. Unplanned colour risks overload, misunderstanding and no hierarchy.", look: "the purple dot of order 1044" }),
      panel({ art: "a2-3", scene: "The new list: a green tick “Delivered”, a clock “On its way”, a red “Payment failed”, and blue for every button.", say: [["theo", "Payment failed, right there. And blue is what I can press."]], tag: ["teal", "FUNCTIONAL"], means: "Functional colour has a job: action, priority or state, each with a word or a symbol so the meaning never depends on colour alone." }),
      panel({ art: "a2-4", scene: "Ines adds the three jobs to the team's checklist.", say: [["ines", "Action, priority, state. And never colour alone."]], tag: ["ink", "THE RULE"], means: "Use colour for action, priority and state, give each one meaning, and add a word or symbol. You use this in Block 1.1 for TravelEase's similar tones and in Block 2.1 for SecureLife's colours without a system and its colour-only status messages." }),
    ],
  }),
  A3: comicOf({
    id: "d3-a3", title: "Elegant, and unread", teaser: "Rosa leans towards a delivery notice in light grey.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a3-1", scene: "Rosa gets a delivery notice: small, thin, light grey type in one long sentence.", say: [["rosa", "I need my glasses for this.", true]], tag: ["plain", "AESTHETIC TYPE"], means: "Type chosen for its look can be read badly, above all by older people and on small screens." }),
      panel({ art: "a3-2", scene: "Ines names the levers of readable type.", say: [["ines", "Size, line spacing, contrast, weight, and short parts."]], tag: ["teal", "FIVE LEVERS"], means: "Readability on screen depends on type size, line spacing, contrast with the background, a weight whose strokes do not vanish, and a structure of short parts." }),
      panel({ art: "a3-3", scene: "The new notice: larger, darker type in three short parts.", say: [["rosa", "Saturday, eight to twelve. Neighbour if I'm out. Fine."]], tag: ["teal", "FUNCTIONAL TYPE"], means: "Functional reading typography lets people read quickly and without effort. It can still look good." }),
      panel({ art: "a3-4", scene: "Ines writes the rule on the board.", say: [["ines", "Choose type so people can read it, not only so it looks good."]], tag: ["ink", "THE RULE"], means: "Check size, line spacing, contrast, weight and structure. You use this in Block 1.1 for TravelEase's small grey notes, in Block 1.2 for HealthConnect's contrast and type sizes and in Block 2.1 for SecureLife's small, dense body text." }),
    ],
  }),
  A4: comicOf({
    id: "d3-a4", title: "Where is Returns?", teaser: "Theo searches a help page that is flat, then one that shouts.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a4-1", scene: "Theo wants to return a box. On the help page the headings look like the text.", say: [["theo", "Delivery… payment… where is Returns?"]], tag: ["plain", "FLAT"], means: "Without visible levels the eye cannot jump; it has to read from the top." }),
      panel({ art: "a4-2", scene: "A redesign gives every heading its own size and colour, and adds “NEW!” labels.", say: [["theo", "Everything shouts. Which one is the heading?", true]], tag: ["plain", "TOO MANY STYLES"], means: "Too many styles destroy the hierarchy as surely as none: when everything stands out, nothing does." }),
      panel({ art: "a4-3", scene: "The final page has three levels: the page heading, the section headings in the brand green, and the text.", say: [["theo", "Returns. There."]], tag: ["teal", "A HIERARCHY"], means: "A few fixed levels, clearly different, the same on every page, let people scan. Colour, type and structure work together." }),
      panel({ art: "a4-4", scene: "Ines writes the levels on the board.", say: [["ines", "Four levels. Same everywhere. That's the whole trick."]], tag: ["ink", "THE RULE"], means: "Set a small, fixed type hierarchy and keep it on every page. You use this in Block 1.1 for TravelEase's decorative headings and in Block 2.1 for SecureLife's inconsistent hierarchies and lost calls to action." }),
    ],
  }),
  A5: comicOf({
    id: "d3-a5", title: "Which fix first", teaser: "Karim has three colour and type ideas, and time for one first.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a5-1", scene: "Karim, the brand manager, has three ideas: words next to every status colour, one action colour for all buttons, and larger body text.", say: [["karim", "Which first? We have one release."]], tag: ["plain", "THREE IDEAS"], means: "Colour and type decisions change behaviour: whether people find the button, read the condition and trust the shop. So they compete like any measure." }),
      panel({ art: "a5-2", scene: "Ines weighs the status words on four questions.", say: [["ines", "High effect, one component, low risk, live next week."]], tag: ["teal", "WEIGHED"], means: "Effect on users, feasibility, risk and time pressure, each with a reason. The reason counts more than the rating." }),
      panel({ art: "a5-3", scene: "One action colour would help even more, but every button changes and marketing loses its campaign colours.", say: [["karim", "So the bigger win carries the bigger risk?"]], tag: ["plain", "A HIGHER RISK"], means: "A measure with a large effect can still come second when its feasibility and risk are weaker; the reason decides the order." }),
      panel({ art: "a5-4", scene: "The team writes the order and the reasons.", say: [["ines", "Status words first, larger text with them, the action colour next. And here is why."]], tag: ["ink", "THE RULE"], means: "Weigh every colour and type measure on effect, feasibility, risk and time, with a reason. You use this in Block 1.1 for the two most critical weaknesses, in Block 1.2 for the decision and in Block 2.1 for the four measures, their justification and the 12 weeks." }),
    ],
  }),
  B1: comicOf({
    id: "d3-b1", title: "A new colour every campaign", teaser: "Theo meets three Buy buttons in three colours.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b1-1", scene: "In the shop the Buy button is orange, in the app purple, in the e-mail green.", say: [["theo", "Are these the same button?", true]], tag: ["plain", "NO LOGIC"], means: "When colours change with each campaign and each team sets type its own way, users have to relearn every screen." }),
      panel({ art: "b1-2", scene: "Karim explains how it happened.", say: [["karim", "Summer was orange, Christmas red. The app team liked purple."]], tag: ["plain", "TASTE"], means: "Without rules every decision is a matter of taste, and the meetings argue about how a colour looks, not what it does." }),
      panel({ art: "b1-3", scene: "Ines decides colour and type once, as rules: blue always means you can do something; four type levels everywhere.", say: [["ines", "Campaigns get the images. The buttons get the rules."]], tag: ["teal", "A DESIGN LOGIC"], means: "Colour and type become strategic when they are decided once, as rules and shared components, and used everywhere." }),
      panel({ art: "b1-4", scene: "Ines draws the chain from the brand to the screens.", say: [["ines", "Decide it at the rules, and every screen gets it at once."]], tag: ["ink", "THE RULE"], means: "Decide colour and type as rules and use them everywhere; the brand is recognised by its consistency. You use this in Block 3.1 for the guiding vision, the three decisions and what is standardised first." }),
    ],
  }),
  B2: comicOf({
    id: "d3-b2", title: "Green everywhere?", teaser: "Karim wants the brand on every pixel; Rosa wants to read.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b2-1", scene: "Karim wants the shop green everywhere, with white text on light green. Rosa cannot read it.", say: [["karim", "It has to feel like Kettle & Co!"], ["rosa", "I can't read it."]], tag: ["plain", "TWO GOALS"], means: "Brand and accessibility pull against each other, like clarity and activation, and standardisation and campaign freedom." }),
      panel({ art: "b2-2", scene: "Ines places five designs on two axes: readability and brand presence.", say: [["ines", "Look, the aim is up here: clearly us, and readable."]], tag: ["teal", "THE MATRIX"], means: "Brand presence and readability need not exclude each other. The aim is both." }),
      panel({ art: "b2-3", scene: "Ines keeps the brand in the logo, the tone and the photos, and the interface in functional rules.", say: [["ines", "We give up green everywhere. Here is why."]], tag: ["teal", "A CHOICE"], means: "A decision between conflicting goals names the conflict, chooses and says what it gives up." }),
      panel({ art: "b2-4", scene: "Ines adds the five goals to the checklist.", say: [["ines", "Name the two goals before you choose."]], tag: ["ink", "THE RULE"], means: "Name the conflict between brand, accessibility, clarity, activation and standardisation, choose, and say what you give up. You use this in Block 3.1 for the decisions, the risk analysis and the rule for brand against usability." }),
    ],
  }),
  B3: comicOf({
    id: "d3-b3", title: "Who owns the colours?", teaser: "Kettle & Co does not know how many calls come from misread colours. Wait, or decide?", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b3-1", scene: "Support records the subject of a call, not the screen. Karim does not know how many calls come from misread colours.", say: [["karim", "Shouldn't we wait for better data?"]], tag: ["plain", "INCOMPLETE DATA"], means: "Waiting is also a decision; a colour problem can already be costing trust and support time." }),
      panel({ art: "b3-2", scene: "Ines decides to add words to every status colour first, and says when she would reverse it.", say: [["ines", "If the questions about orders don't drop, we look again."]], tag: ["teal", "A DECISION"], means: "A decision under uncertainty says what is decided, what is not known, when it would be reversed and what is given up." }),
      panel({ art: "b3-3", scene: "Karim asks who has the last word when brand and readability clash.", say: [["ines", "UX owns the rules, you own the logo and the tone. Readability first, then we decide together."]], tag: ["teal", "WHO OWNS IT"], means: "Visual standards hold only when someone owns them and a rule decides conflicts: minimum readability and contrast first." }),
      panel({ art: "b3-4", scene: "The team writes the rule on the board.", say: [["ines", "Owners for the standards. Readability first. Decide, then check."]], tag: ["ink", "THE RULE"], means: "Give the visual standards owners and a rule, and say when a decision will be checked. You use this in Block 3.1 for the governance model, the decision under uncertainty and the statement to the management." }),
    ],
  }),
}) as unknown as Record<MaterialId, Comic>;
