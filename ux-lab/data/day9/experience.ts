import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * Day 9 · the day practises what it teaches (UX-STANDARD 2.15, user request 2026-10-28). Taken from the original Activation Lab and kept only where it fits the lab's
 * rules: its named milestones and progress rings (here: named stages over the cards and blocks the lab already counts), its "You can now …" capability cards (here:
 * the line a stage gives when it is reached), its Inspector that names the mechanic behind what you see (here: tags on the journey and a list of what is used and
 * what is not), and its dark-pattern layer (here: an opt-in loud version of the same journey, labelled as a demonstration). Nothing here scores an answer.
 */
type Stage = { id: string; name: Tx; cards: string[]; blocks: string[]; canNow: Tx };

type Resolved = { id: string; name: string; cards: string[]; blocks: string[]; canNow: string };
const STAGE_DEFS: Record<1 | 2, Stage[]> = {
  1: [
    { id: "s1", name: t("Stage 1 · What gamification is, and why people react"), cards: ["A1", "A2"], blocks: [], canNow: t("You can now tell structure, tone and a game apart, and name the lever under any mechanic someone proposes.") },
    { id: "s2", name: t("Stage 2 · The tools, how they backfire, and the story"), cards: ["A3", "A4", "A5"], blocks: [], canNow: t("You can now say what each tool is for, spot overstimulation and reward inflation, and make the same mechanics mean more with a true story.") },
    { id: "s3", name: t("Stage 3 · Find where motivation is lost"), cards: [], blocks: ["1.1", "1.2"], canNow: t("You can now find where a product weakens activation and retention, and weigh activation designs under conflicting goals.") },
    { id: "s4", name: t("Stage 4 · Decide for MoveWell"), cards: [], blocks: ["2.1"], canNow: t("You can now turn deficits into four prioritised measures and defend them on effect, feasibility, risk and time.") },
  ],
  2: [
    { id: "r1", name: t("Stage 1 · Activation as architecture"), cards: ["B1"], blocks: [], canNow: t("You can now describe gamification as an activation architecture: a vision, principles, patterns and an order.") },
    { id: "r2", name: t("Stage 2 · Conflicts and who answers for them"), cards: ["B2", "B3"], blocks: [], canNow: t("You can now name the conflict behind a lever, decide per lever, and say who owns a mechanic and how it leaves.") },
    { id: "r3", name: t("Stage 3 · Your memo to the management"), cards: [], blocks: ["3.1"], canNow: t("You can now write an activation strategy a works council, a regulator or a journalist could ask about, and answer for it.") },
  ],
};
export const STAGES = bi(STAGE_DEFS) as unknown as Record<1 | 2, Resolved[]>;

/** The Inspector: the mechanics this page uses, the lever each pulls, and the ones left out on purpose (the original's mechanics catalogue, in its own words where it fits). */
export const USED = bi([
  { id: "progress", mechanic: t("Visible progress"), where: t("the journey bar and its stages"), lever: t("the experience of progress") },
  { id: "stages", mechanic: t("Named stages"), where: t("the stage names"), lever: t("story and progress together: a place that means something") },
  { id: "milestone", mechanic: t("A milestone message"), where: t("the message when a stage is reached"), lever: t("feedback and recognition: competence") },
  { id: "cannow", mechanic: t("A capability line, “You can now …”"), where: t("under every reached stage"), lever: t("self-efficacy: believing you can do it") },
  { id: "read", mechanic: t("Confirmation of a step"), where: t("“Mark as read” on every card and the ring in the rail"), lever: t("feedback on your own position") },
]) as unknown as { id: string; mechanic: string; where: string; lever: string }[];

export const NOT_USED = bi([
  t("Points or XP: they count activity, not learning, and invite collecting for its own sake."),
  t("Badges: few things here are rare enough for a badge to mean something."),
  t("A streak: one missed day would punish an adult with a full working week."),
  t("A ranking of participants: it would shame the ones who need the day most."),
  t("A countdown or “bonus ends soon”: fake urgency, the manipulation card A3 warns about."),
]) as unknown as string[];
