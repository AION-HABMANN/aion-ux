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
  xiong2017: r("Xiong et al. 2017", "Xiong, W., Droppo, J., Huang, X., et al. (2017). The Microsoft 2017 conversational speech recognition system. arXiv:1708.06073. https://arxiv.org/abs/1708.06073 (A word error rate of 5.1% on the NIST 2000 Switchboard test set, reported as matching a careful human transcription benchmark; a result on one test set, not in real use.)"),
  koenecke2020: r("Koenecke et al. 2020", "Koenecke, A., Nam, A., Lake, E., et al. (2020). Racial disparities in automated speech recognition. PNAS, 117(14), 7684–7689. https://doi.org/10.1073/pnas.1915768117 (Five commercial systems had an average word error rate of 0.35 for Black speakers and 0.19 for white speakers.)"),
  strayer2015: r("Strayer et al. 2015", "Strayer, D. L., Cooper, J. M., Turrill, J., et al. (2015). Measuring Cognitive Distraction in the Automobile III: A Comparison of Ten 2015 In-Vehicle Information Systems. AAA Foundation for Traffic Safety. (Mental distraction lasted up to 27 seconds after a task in the worst-performing systems; figures from press coverage, check the report.)"),
};
