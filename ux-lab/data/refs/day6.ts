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
};
