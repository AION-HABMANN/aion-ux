import { r } from "@/data/refs/kit";

/**
 * Day 11 · the sources the cards cite that Days 1 to 10 do not already list (CURRICULUM-GUIDE §4). Each is a well-known work; the note after the title says what the
 * card uses it for. Check every source and its current edition before a course run.
 */
export const REFS_D11 = {
  cohen2004: r("Cohen et al. 2004", "Cohen, M. H., Giangola, J. P., & Balogh, J. (2004). Voice User Interface Design. Addison-Wesley. (Dialogue logic, prompts, confirmations and error recovery for spoken interfaces.)"),
  pearl2016: r("Pearl 2016", "Pearl, C. (2016). Designing Voice User Interfaces: Principles of Conversational Experiences. O'Reilly. (Setting expectations, confirming what was understood, escalating error handling, and when voice is the wrong choice.)"),
  kelley1984: r("Kelley 1984", "Kelley, J. F. (1984). An iterative design methodology for user-friendly natural language office information applications. ACM Transactions on Information Systems, 2(1), 26–41. (The Wizard-of-Oz method: a person secretly plays the system to test a dialogue before it is built.)"),
  houde1997: r("Houde & Hill 1997", "Houde, S., & Hill, C. (1997). What do prototypes prototype? In M. Helander, T. Landauer, & P. Prabhu (Eds.), Handbook of Human-Computer Interaction (2nd ed., pp. 367–381). Elsevier. (A prototype answers a question about role, look and feel, or implementation; choose it by the question.)"),
};
