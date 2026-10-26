import { r } from "@/data/refs/kit";

/**
 * Day 5 · the sources the cards cite that Days 1 to 4 do not already list (CURRICULUM-GUIDE §4). Each is a well-known work; the note after the title says what the card
 * uses it for. Check every source and its current edition before a course run.
 */
export const REFS_D5 = {
  mackenzie1992: r("MacKenzie 1992", "MacKenzie, I. S. (1992). Fitts' law as a research and design tool in human-computer interaction. Human-Computer Interaction, 7(1), 91–139. (Fitts's law holds for pointing on screens: larger and closer targets are reached faster and with fewer errors.)"),
  parhi2006: r("Parhi et al. 2006", "Parhi, P., Karlson, A. K., & Bederson, B. B. (2006). Target size study for one-handed thumb use on small touchscreen devices. MobileHCI '06, 203–210. (Small targets under the thumb are slower and missed more often; there is a size below which errors rise sharply.)"),
  hoober2013: r("Hoober 2013", "Hoober, S. (2013). How Do Users Really Hold Mobile Devices? UXmatters. https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php (Many people use a phone with one hand and the thumb; what the thumb reaches easily shapes where targets belong.)"),
  gobet2001: r("Gobet et al. 2001", "Gobet, F., Lane, P. C. R., Croker, S., Cheng, P. C.-H., Jones, G., Oliver, I., & Pine, J. M. (2001). Chunking mechanisms in human learning. Trends in Cognitive Sciences, 5(6), 236–243. (Grouping items into meaningful chunks lets people hold and recall more.)"),
};
