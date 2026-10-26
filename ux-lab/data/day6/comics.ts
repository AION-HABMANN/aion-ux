import { bi } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/materialTypes";
import { comicOf, panel } from "@/data/free/comicKit";

/**
 * Day 6 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people the cards
 * already use (Elif, Noah, Greta, Malte and the ferry operator Seabird Ferries), so it is the card said again in pictures, not a new case. The last panel states the
 * card's rule and names the task block that uses it. The drawings are in components/day6/comicScenes.tsx.
 */
const NOTE = "Elif, Noah, Greta, Malte and Seabird Ferries are made up for this lesson, like the examples on the card: a Case assumption. OfficeSphere, CareAssist and CitizenFlow, the cases of the task, are in the task.";
const NAMES = { elif: "Elif, a passenger", noah: "Noah, a passenger", greta: "Greta, design-system lead", malte: "Malte, product owner" };

export const COMICS_D6 = bi({
  A1: comicOf({
    id: "d6-a1", title: "Six scattered links", teaser: "Elif cannot find the luggage rules among scattered links.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a1-1", scene: "Elif wants the luggage rules. The page shows six links scattered over it, in mixed colours.", say: [["elif", "Which of these is about luggage?", true]], tag: ["plain", "NO GROUPS"], means: "When related things are not close, alike or framed together, people cannot see which belong together.", look: "the six scattered links" }),
      panel({ art: "a1-2", scene: "Greta, the design-system lead, names three Gestalt laws.", say: [["greta", "Close together, alike, inside one frame: that's how people see groups."]], tag: ["teal", "GESTALT LAWS"], means: "Proximity, similarity and common region, with continuity, closure and figure and ground, decide what people see as groups and paths." }),
      panel({ art: "a1-3", scene: "The new page has two framed groups, each with one look: tickets, and before you travel.", say: [["elif", "Before you travel: luggage. There."]], tag: ["teal", "GROUPED"], means: "A layout that follows the laws lets people group, tell apart and navigate in a glance." }),
      panel({ art: "a1-4", scene: "Greta adds the six laws to the team's checklist.", say: [["greta", "If two things belong together, make them look like it."]], tag: ["ink", "THE RULE"], means: "Group what belongs together with proximity, similarity and common region. You use this in Block 1.1 for OfficeSphere's missing grouping and in Block 2.1 for CitizenFlow's page types that group content differently." }),
    ],
  }),
  A2: comicOf({
    id: "d6-a2", title: "Save, not Continue", teaser: "Noah presses the wrong one of four equal buttons.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a2-1", scene: "Noah's booking step: an offer, a notice and four equally bold buttons.", say: [["noah", "Which one takes me on?"]], tag: ["plain", "ALL EQUAL"], means: "When everything is equally strong, nothing shows what matters or what comes next." }),
      panel({ art: "a2-2", scene: "He presses Save for later and wonders why nothing moves.", say: [["noah", "Did I book or not?", true]], tag: ["plain", "THE WRONG ACTION"], means: "Primary and secondary actions that look the same lead to the wrong one." }),
      panel({ art: "a2-3", scene: "The new step shows his crossing, one strong Continue and the other options as quiet links.", say: [["noah", "Continue. Easy."]], tag: ["teal", "A HIERARCHY"], means: "A visual hierarchy is an order of importance: the primary action is the strongest, secondary ones quieter." }),
      panel({ art: "a2-4", scene: "Greta writes the difference on the board.", say: [["greta", "Arranging is not steering. Decide what comes first."]], tag: ["ink", "THE RULE"], means: "Decide the order of importance and make it visible, with one primary action. You use this in Block 1.1 for OfficeSphere's equal actions, in Block 1.2 for CareAssist's orientation and in Block 2.1 for CitizenFlow's unseparated actions." }),
    ],
  }),
  A3: comicOf({
    id: "d6-a3", title: "Twelve fields, or two", teaser: "Elif meets a form that asks too much, then one that tells too little.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a3-1", scene: "Elif travels alone on foot. The form shows twelve fields, including freight weight and pet passport.", say: [["elif", "Do I have to fill all this in?", true]], tag: ["plain", "EVERYTHING AT ONCE"], means: "Showing every field puts the whole load of sorting on the user." }),
      panel({ art: "a3-2", scene: "Another version shows only name, date and Book. The luggage rules are in the help pages.", say: [["elif", "Easy. I'll bring my three bags."]], tag: ["plain", "HIDDEN TOO DEEP"], means: "When information people need to decide is buried, reduction has become hiding. The screen is calm; the decision is unsafe." }),
      panel({ art: "a3-3", scene: "The staged form shows step 1 of 3, the luggage rules next to the luggage field, and links to add a vehicle or a pet.", say: [["elif", "Name, date, luggage, and I know the rules."]], tag: ["teal", "STEP BY STEP"], means: "Progressive disclosure shows what is relevant now and keeps the rest one clear step away." }),
      panel({ art: "a3-4", scene: "Greta writes the line between the two on the board.", say: [["greta", "Hide what does not apply. Never hide what people need to decide."]], tag: ["ink", "THE RULE"], means: "Disclose step by step, but keep decision-relevant information where it is needed. You use this in Block 1.1 for OfficeSphere's forms, in Block 1.2 for CareAssist's three structures and in Block 2.1 for CitizenFlow's forms and help." }),
    ],
  }),
  A4: comicOf({
    id: "d6-a4", title: "Where did Continue go?", teaser: "Noah moves from tickets to freight and the pattern changes.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a4-1", scene: "Noah books a ticket, then adds freight. In freight the Continue button is a small Next at the top right.", say: [["noah", "Where is the button?", true]], tag: ["plain", "A NEW PATTERN"], means: "A different pattern for a similar task costs a fresh orientation." }),
      panel({ art: "a4-2", scene: "Malte, the product owner, explains: two teams built the two areas.", say: [["malte", "Each page is fine on its own."]], tag: ["plain", "FINE ALONE"], means: "Each single page can be well designed and the whole still unpredictable." }),
      panel({ art: "a4-3", scene: "Both areas now share one layout and the same Continue button.", say: [["noah", "Same as before. Continue."]], tag: ["teal", "ONE PATTERN"], means: "Hierarchy, navigation logic and relief belong together: learn once, predict everywhere." }),
      panel({ art: "a4-4", scene: "Greta writes the rule on the board.", say: [["greta", "Same task, same pattern."]], tag: ["ink", "THE RULE"], means: "Keep one pattern for one task across all areas. You use this in Block 1.1 for OfficeSphere's different patterns and in Block 2.1 for CitizenFlow's varying navigation." }),
    ],
  }),
  A5: comicOf({
    id: "d6-a5", title: "Fix the page, or the part?", teaser: "Malte has three fixes, and one keeps the others in place.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a5-1", scene: "Malte has three fixes: framed groups, a staged form, and one shared form component.", say: [["malte", "Which first?"]], tag: ["plain", "THREE FIXES"], means: "UX laws can be fixed on a page, or built into a component every page uses." }),
      panel({ art: "a5-2", scene: "Greta weighs the framed groups on four questions.", say: [["greta", "Some effect, easy, no risk, next release."]], tag: ["teal", "WEIGHED"], means: "Effect on users, feasibility, risk and time pressure, each with a reason." }),
      panel({ art: "a5-3", scene: "The shared component helps most and takes longest, but it keeps the other fixes from drifting.", say: [["malte", "The slow one protects the fast ones?"]], tag: ["plain", "A FOUNDATION"], means: "A component built once carries the laws into every screen, including those not built yet." }),
      panel({ art: "a5-4", scene: "The team writes the order and the reasons.", say: [["greta", "Groups and staged form now, the component started in parallel. And here is why."]], tag: ["ink", "THE RULE"], means: "Build the laws into components and weigh every measure with a reason. You use this in Block 1.2 for the decision and in Block 2.1 for the four measures, their justification and the 14 weeks." }),
    ],
  }),
  B1: comicOf({
    id: "d6-b1", title: "Three forms", teaser: "Seabird's three teams each built their own booking form.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b1-1", scene: "Tickets, freight and the app each have their own booking form. A fix to one does nothing for the others.", say: [["malte", "We fixed the luggage field in tickets. Freight still has the old one."]], tag: ["plain", "EACH ITS OWN"], means: "Without shared components every team keeps inventing its own patterns, and users pay for the differences." }),
      panel({ art: "b1-2", scene: "Greta lists what that costs.", say: [["greta", "Fix it three times, relearn it three times, build it from zero every time."]], tag: ["plain", "THE COST"], means: "Single optimisations do not add up to a consistent product." }),
      panel({ art: "b1-3", scene: "The teams move to one shared form component. A fix to it reaches every form at once.", say: [["greta", "One part, every screen."]], tag: ["teal", "A DESIGN SYSTEM"], means: "A design system gives consistency, scale and steering: a change to a component reaches every screen." }),
      panel({ art: "b1-4", scene: "Greta draws what the system holds, from principles to screens.", say: [["greta", "We steer the principles. The teams build from them."]], tag: ["ink", "THE RULE"], means: "Translate UX principles into a design system instead of patching screens. You use this in Block 3.1 for the guiding vision, the three decisions and what is standardised first." }),
    ],
  }),
  B2: comicOf({
    id: "d6-b2", title: "Ship it now?", teaser: "The freight team wants its own form now; Greta wants one shared form.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b2-1", scene: "The freight team needs a special field and wants to build its own form now.", say: [["malte", "They can ship it this week!"], ["greta", "And we fix it twice for years."]], tag: ["plain", "TWO GOALS"], means: "Consistency against flexibility, speed today against system quality, standardisation against team autonomy." }),
      panel({ art: "b2-2", scene: "Greta places five approaches on two axes: consistency and delivery speed.", say: [["greta", "When the shared part is the easy path, we get both."]], tag: ["teal", "THE MATRIX"], means: "A design system that is easy to use can be both fast and consistent." }),
      panel({ art: "b2-3", scene: "She allows a documented exception: the special field becomes an option of the shared form.", say: [["greta", "We give up separate forms. Here is why."]], tag: ["teal", "A CHOICE"], means: "A decision names the conflict, chooses and says what it gives up." }),
      panel({ art: "b2-4", scene: "Greta adds the five goals to the checklist.", say: [["greta", "Name the two goals before you choose."]], tag: ["ink", "THE RULE"], means: "Name the conflict between consistency, flexibility, speed, clarity and standardisation, choose, and say what you give up. You use this in Block 3.1 for the decisions, the risk analysis and the rule for conflicts between teams." }),
    ],
  }),
  B3: comicOf({
    id: "d6-b3", title: "Who owns the system?", teaser: "Seabird does not know which fields confuse. Wait, or decide?", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b3-1", scene: "Nobody records where bookings are abandoned. Malte does not know which fields confuse most.", say: [["malte", "Shouldn't we wait for better data?"]], tag: ["plain", "INCOMPLETE DATA"], means: "Waiting is a decision too; the confusion goes on meanwhile." }),
      panel({ art: "b3-2", scene: "Greta decides to build the shared form first, and says when she would reverse it.", say: [["greta", "If the calls about luggage don't drop, we look again."]], tag: ["teal", "A DECISION"], means: "A decision under uncertainty says what is decided, what is not known, when it would be reversed and what is given up." }),
      panel({ art: "b3-3", scene: "Malte asks who decides when a team wants a new component.", say: [["greta", "I own the principles and components. Teams propose. The principles decide first."]], tag: ["teal", "WHO OWNS IT"], means: "A design system lives only with an owner, a way to propose and a rule for conflicts." }),
      panel({ art: "b3-4", scene: "The team writes the rule on the board.", say: [["greta", "An owner of the system. A way to propose. Decide, then check."]], tag: ["ink", "THE RULE"], means: "Give the design system an owner and a rule, and say when a decision will be checked. You use this in Block 3.1 for the governance model, the decision under uncertainty and the statement to the management." }),
    ],
  }),
}) as unknown as Record<MaterialId, Comic>;
