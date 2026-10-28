import { bi, t } from "@/lib/lang";

/**
 * Day 11 · the day practises what it teaches (UX-STANDARD 2.15). Taken from the original Day 11 and kept only where it fits the lab's rules: its free-play talking to
 * an assistant (here: a voice guide for this page, typed or spoken) and its "feel the bad version first" (here: an opt-in badly designed guide, labelled as a
 * demonstration). The guide meets card A2's six requirements and says where; nothing here scores an answer, learns about the learner or leaves the browser.
 */
const RAW = {
  commands: [t("next"), t("read it"), t("repeat"), t("where am I"), t("stop"), t("help")],
  requirements: [
    { name: t("Dialogue logic"), where: t("one command, one short answer; it ends by saying what you can do next") },
    { name: t("Clear expectations"), where: t("the commands are always visible, and “help” lists them") },
    { name: t("Feedback"), where: t("every answer says what it did: “Going to card A3”") },
    { name: t("Error handling"), where: t("the first miss gets a short hint, the second shows the commands as buttons") },
    { name: t("Repeatability"), where: t("“repeat” says the last answer again") },
    { name: t("User control"), where: t("“stop” ends reading aloud; reading aloud can be switched off; you can always type instead of speaking") },
  ],
  badMenu: t("Welcome to the study voice service. Please listen carefully, as our options have changed. Say one for Materi A, two for Materi B, three for Route 1, four for Route 2, five for the glossary, six for your progress, seven for the export, eight for the comics, nine for settings, or say operator. To hear these options again, say repeat."),
};
export const GUIDE = bi(RAW) as unknown as { commands: string[]; requirements: { name: string; where: string }[]; badMenu: string };
