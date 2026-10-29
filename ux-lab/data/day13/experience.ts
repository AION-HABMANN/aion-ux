import { bi, t } from "@/lib/lang";

/**
 * Day 13 · the day practises what it teaches (UX-STANDARD 2.15). Taken from the original Day 13 and kept only where it fits the lab's rules: its reduced-stimulus
 * mode and Readability Lab (here: tools that change this page), and its Test Plan Builder (here: a five-minute usability test of this page with a colleague, the
 * start of the practice project). Nothing here scores an answer; the notes stay in this browser tab.
 */
const RAW = {
  tasks: [
    { id: "t1", task: t("Find out what you have to hand in for Block 2.1, question 5."), watch: t("Where do they look first? Do they find the block without help?") },
    { id: "t2", task: t("Open card A4 and make its sample text easier to read."), watch: t("Do they find the controls? Do they say the result is easier?") },
    { id: "t3", task: t("Switch on the quiet page and the reading ruler, then say whether it helps."), watch: t("Do they find the tools? Which one would they keep?") },
  ],
  after: [
    t("What stopped you from completing a task?"),
    t("What confused you, and when?"),
    t("When did you feel unsure or frustrated?"),
    t("What would you change first?"),
  ],
  patterns: [
    t("Numbered steps and a visible order: the route is a path of cards and blocks."),
    t("Folded detail: each card shows the essentials first; the deeper reading is optional."),
    t("The same layout on every day: menu, rail, cards and blocks are always in the same place."),
    t("Descriptive buttons: “Mark as read”, “Open StudyPath and try it”, not “Go”."),
    t("Text alternatives for pictures, and real headings for assistive technology."),
  ],
};
export const D13 = bi(RAW) as unknown as { tasks: { id: string; task: string; watch: string }[]; after: string[]; patterns: string[] };
