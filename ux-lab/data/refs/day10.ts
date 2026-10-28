import { r } from "@/data/refs/kit";

/**
 * Day 10 · the sources the cards cite that Days 1 to 9 do not already list (CURRICULUM-GUIDE §4). Each is a well-known work; the note after the title says what the
 * card uses it for. Check every source and its current edition before a course run.
 */
export const REFS_D10 = {
  horvitz1999: r("Horvitz 1999", "Horvitz, E. (1999). Principles of mixed-initiative user interfaces. Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '99), 159–166. (When an automated service should act, ask or wait, weighed against the cost of being wrong; let people refine and dismiss what it does.)"),
  amershi2019: r("Amershi et al. 2019", "Amershi, S., Weld, D., Vorvoreanu, M., Fourney, A., Nushi, B., Collisson, P., Suh, J., Iqbal, S., Bennett, P. N., Inkpen, K., Teevan, J., Kikin-Gil, R., & Horvitz, E. (2019). Guidelines for human-AI interaction. Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems, Paper 3. (Eighteen guidelines: make clear what the system can do and how well, show why it did something, support dismissal and correction, learn from feedback cautiously.)"),
  pariser2011: r("Pariser 2011", "Pariser, E. (2011). The Filter Bubble: What the Internet Is Hiding from You. Penguin Press. (Personalisation that narrows what people see to what they saw before.)"),
  parasuraman1997: r("Parasuraman & Riley 1997", "Parasuraman, R., & Riley, V. (1997). Humans and automation: Use, misuse, disuse, abuse. Human Factors, 39(2), 230–253. (People over-rely on automation that seems reliable and abandon it after visible failures.)"),
  lee2004: r("Lee & See 2004", "Lee, J. D., & See, K. A. (2004). Trust in automation: Designing for appropriate reliance. Human Factors, 46(1), 50–80. (Trust should match what a system can actually do; showing how it works and where it fails helps people rely on it appropriately.)"),
  sundar2020: r("Sundar 2020", "Sundar, S. S. (2020). Rise of machine agency: A framework for studying the psychology of human–AI interaction. Journal of Computer-Mediated Communication, 25(1), 74–88. (People react to an AI's agency itself: help that acts for them can feel convenient or intrusive, depending on control.)"),
  eu2024aiact: r("EU AI Act 2024", "Regulation (EU) 2024/1689 of the European Parliament and of the Council laying down harmonised rules on artificial intelligence (Artificial Intelligence Act). Official Journal of the European Union, 12 July 2024. (Among other duties, people must be informed when they interact with an AI system; check the current state of its application before a course run.)"),
};
