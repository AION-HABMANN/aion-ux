import { bi, t } from "@/lib/lang";

/**
 * Day 10 · the day practises what it teaches (UX-STANDARD 2.15). Taken from the original Day 10 and kept only where it fits the lab's rules: its three-question test
 * of transparency, control and recoverability (here: the study assistant answers all three) and its "which type is this?" (here: the Inspector says the assistant is
 * rule-based and what it can and cannot know). The opt-in black-box version shows the same suggestion as an opaque, over-personalised assistant would, labelled as a
 * demonstration. Nothing here scores an answer, learns about the learner or leaves the browser.
 */
const RAW = {
  rule: {
    1: t("Cards A1 to A5 in order, then Blocks 1.1, 1.2 and 2.1 in order. The first one you have not finished comes first; one you skip moves to the end."),
    2: t("Cards B1 to B3 in order, then Block 3.1. The first one you have not finished comes first; one you skip moves to the end."),
  },
  uses: [t("Which cards you marked as read."), t("Which blocks are complete."), t("What you skipped during this visit.")],
  notUses: [t("How long you spend on a page."), t("What you wrote in your answers."), t("Anything about you as a person."), t("Any data outside this browser.")],
  cannot: t("It cannot know whether you understood a card, only whether you marked it as read. That is why it suggests and you decide."),
};
export const ASSIST = bi(RAW) as unknown as { rule: Record<1 | 2, string>; uses: string[]; notUses: string[]; cannot: string };
