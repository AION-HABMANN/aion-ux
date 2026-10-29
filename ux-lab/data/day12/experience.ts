import { bi, t } from "@/lib/lang";

/**
 * Day 12 · the day practises what it teaches (UX-STANDARD 2.15). Taken from the original Day 12 and kept only where it fits the lab's rules: its contrast slider and
 * barrier demonstrations (here: settings that really change this page, and "barrier glasses" that show the page as some people meet it). The Inspector says what the
 * lab's pages do for access and, honestly, what they do not do yet. Nothing here scores an answer; the settings stay in this browser.
 */
const RAW = {
  does: [
    t("Every control shows a visible focus marker when you use the keyboard."),
    t("Pictures and diagrams have a text alternative; the drawn screens are described in words."),
    t("Form fields have labels; error and missing notices say what is missing."),
    t("Headings give each page a structure a screen reader can jump through."),
    t("Animations stop when your system asks for reduced motion."),
    t("Colours were checked with an automatic accessibility test (axe) on every route."),
  ],
  doesNot: [
    t("There is no “skip to content” link yet."),
    t("The pages have not been tested by screen-reader users, only with automatic checks and the keyboard."),
    t("Zoom to 400 % has not been checked on every page."),
    t("The simulations of Block 1.1 and 2.1 contain barriers on purpose."),
  ],
};
export const ACCESS = bi(RAW) as unknown as { does: string[]; doesNot: string[] };
