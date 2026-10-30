import { r } from "@/data/refs/kit";

/**
 * Day 6 · the sources the cards cite that Days 1 to 5 do not already list (CURRICULUM-GUIDE §4). Each is a well-known work; the note after the title says what the card
 * uses it for. Check every source and its current edition before a course run.
 */
export const REFS_D6 = {
  wertheimer1923: r("Wertheimer 1923", "Wertheimer, M. (1923). Untersuchungen zur Lehre von der Gestalt II. Psychologische Forschung, 4, 301–350. (The founding description of perceptual grouping by proximity, similarity, continuity and closure.)"),
  palmer1992: r("Palmer 1992", "Palmer, S. E. (1992). Common region: A new principle of perceptual grouping. Cognitive Psychology, 24(3), 436–447. (Elements inside one enclosed region are seen as a group, even when proximity or similarity say otherwise.)"),
  kholmatova2017: r("Kholmatova 2017", "Kholmatova, A. (2017). Design Systems: A practical guide to creating design languages for digital products. Smashing Media. (Shared patterns, components and principles keep a product consistent across teams; a design system needs ownership to stay alive.)"),
  curtis2010: r("Curtis 2010", "Curtis, N. (2010). Modular Web Design: Creating Reusable Components for User Experience Design and Documentation. New Riders. (Reusable components and their documentation let many teams build consistent interfaces.)"),
  grudin1989: r("Grudin 1989", "Grudin, J. (1989). The case against user interface consistency. Communications of the ACM, 32(10), 1164–1173. https://doi.org/10.1145/67933.67934 (Consistency is used in three senses and is an unreliable guide on its own; designers often do better to study the users' work.)"),
  vonrestorff1933: r("von Restorff 1933", "von Restorff, H. (1933). Über die Wirkung von Bereichsbildungen im Spurenfeld. Psychologische Forschung, 18, 299–342. (An item that differs from a group of like items is remembered better: the isolation effect.)"),
  hunt1995: r("Hunt 1995", "Hunt, R. R. (1995). The subtlety of distinctiveness: What von Restorff really did. Psychonomic Bulletin & Review, 2(1), 105–112. (A review of what the original isolation experiments showed.)"),
  govukds2018: r("Government Digital Service 2018", "Government Digital Service (2018). Introducing the GOV.UK Design System. https://gds.blog.gov.uk/2018/06/22/introducing-the-gov-uk-design-system/ and the GOV.UK Design System community pages, https://design-system.service.gov.uk/community (Announced in June 2018; styles, components and patterns; contributions are checked and reviewed by a working group; new components start as experimental until research shows they meet user needs.)"),
  sparkbox2022: r("Sparkbox 2022", "Sparkbox (2022). The 2022 Design Systems Survey. https://sparkbox.com/foundry/2022_design_systems_survey (Over 200 respondents; 16% tracked metrics; successful systems offered onboarding, training and support. Figures from secondary coverage; check the report.)"),
};
