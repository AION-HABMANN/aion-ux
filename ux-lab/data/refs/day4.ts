import { r } from "@/data/refs/kit";

/**
 * Day 4 · the sources the cards cite that Days 1 to 3 do not already list (CURRICULUM-GUIDE §4). Each is a well-known work; the note after the title says what the card
 * uses it for. Check every source and its current edition before a course run.
 */
export const REFS_D4 = {
  hick1952: r("Hick 1952", "Hick, W. E. (1952). On the rate of gain of information. Quarterly Journal of Experimental Psychology, 4(1), 11–26. (Choice reaction time rises with the number of equally likely alternatives: Hick's law.)"),
  hyman1953: r("Hyman 1953", "Hyman, R. (1953). Stimulus information as a determinant of reaction time. Journal of Experimental Psychology, 45(3), 188–196. (The same relation holds for the information in the choice; familiar or likely options are chosen faster.)"),
  fitts1954: r("Fitts 1954", "Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology, 47(6), 381–391. (The time to reach a target grows with its distance and shrinks with its size: Fitts's law.)"),
  miller1956: r("Miller 1956", "Miller, G. A. (1956). The magical number seven, plus or minus two: Some limits on our capacity for processing information. Psychological Review, 63(2), 81–97. (Short-term memory holds only a small number of chunks: Miller's rule.)"),
  cowan2001: r("Cowan 2001", "Cowan, N. (2001). The magical number 4 in short-term memory: A reconsideration of mental storage capacity. Behavioral and Brain Sciences, 24(1), 87–114. (The limit of working memory is nearer four chunks than seven.)"),
  iyengar2000: r("Iyengar & Lepper 2000", "Iyengar, S. S., & Lepper, M. R. (2000). When choice is demotivating: Can one desire too much of a good thing? Journal of Personality and Social Psychology, 79(6), 995–1006. (Many options can attract interest and still make people choose less often.)"),
  iso9241110: r("ISO 9241-110", "ISO 9241-110:2020. Ergonomics of human-system interaction, Part 110: Interaction principles. (Suitability for the task, self-descriptiveness, conformity with user expectations, learnability, controllability, use error robustness and user engagement.) Check the current edition before you teach from it."),
  yablonski2020: r("Yablonski 2020", "Yablonski, J. (2020). Laws of UX: Using Psychology to Design Better Products & Services. O'Reilly. (Hick's, Fitts's and Jakob's law, Miller's rule and other principles as practical tools for interface decisions.)"),
};
