import { r } from "@/data/refs/kit";

/**
 * Day 2 · the sources the cards cite that Day 1 does not already list (CURRICULUM-GUIDE §4). Each is a well-known work; the note after the title says what the card
 * uses it for. Check every source and its current edition before a course run.
 */
export const REFS_D2 = {
  gould1985: r("Gould & Lewis 1985", "Gould, J. D., & Lewis, C. (1985). Designing for usability: Key principles and what designers think. Communications of the ACM, 28(3), 300–311. (Early focus on users and their tasks, empirical measurement with real users, and iterative design: the core of user-centred design.)"),
  nielsen1997: r("Nielsen 1997", "Nielsen, J. (1997). How Users Read on the Web. Nielsen Norman Group. https://www.nngroup.com/articles/how-users-read-on-the-web/ (Most users scan a page rather than read it word by word, picking out words, headings and links.)"),
  pernice2017: r("Pernice 2017", "Pernice, K. (2017). F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant (Even on Mobile). Nielsen Norman Group. https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/ (On text-heavy pages without structure, the eye often scans in an F-shape; headings, short paragraphs and clear structure change the pattern.)"),
  wagemans2012: r("Wagemans et al. 2012", "Wagemans, J., Elder, J. H., Kubovy, M., Palmer, S. E., Peterson, M. A., Singh, M., & von der Heydt, R. (2012). A century of Gestalt psychology in visual perception: I. Perceptual grouping and figure–ground organization. Psychological Bulletin, 138(6), 1172–1217. (Things that are close together or look alike are seen as one group.)"),
  ware2012: r("Ware 2012", "Ware, C. (2012). Information Visualization: Perception for Design (3rd ed.). Morgan Kaufmann. (Contrast, colour and position decide what pops out; a visual order the eye can follow reduces the effort of search.)"),
  kurosu1995: r("Kurosu & Kashimura 1995", "Kurosu, M., & Kashimura, K. (1995). Apparent usability vs. inherent usability: Experimental analysis on the determinants of the apparent usability. CHI '95 Conference Companion, 292–293. (People judge an ordered, attractive interface as easier to use: the aesthetic-usability effect.)"),
  moshagen2010: r("Moshagen & Thielsch 2010", "Moshagen, M., & Thielsch, M. T. (2010). Facets of visual aesthetics. International Journal of Human-Computer Studies, 68(10), 689–709. (Simplicity, diversity, colour and craftsmanship shape how good a website seems; simplicity is the order and clarity of the layout.)"),
  rosenfeld2015: r("Rosenfeld et al. 2015", "Rosenfeld, L., Morville, P., & Arango, J. (2015). Information Architecture: For the Web and Beyond (4th ed.). O'Reilly. (Organising, labelling and navigation systems; labels should speak the users' language, not the organisation's.)"),
  spencer2009: r("Spencer 2009", "Spencer, D. (2009). Card Sorting: Designing Usable Categories. Rosenfeld Media. (Card sorting shows how users group and name content, so the structure can follow their logic.)"),
  conway1968: r("Conway 1968", "Conway, M. E. (1968). How do committees invent? Datamation, 14(4), 28–31. (Organisations tend to produce designs that copy their own communication structure: the menu mirrors the departments.)"),
  elliot2014: r("Elliot & Maier 2014", "Elliot, A. J., & Maier, M. A. (2014). Color psychology: Effects of perceiving color on psychological functioning in humans. Annual Review of Psychology, 65, 95–120. (Colour carries meaning learnt from context, such as red for danger or a stop; the effect depends on the context and the culture, so it is a hypothesis, not a law.)"),
  wcag22: r("WCAG 2.2", "W3C (2023). Web Content Accessibility Guidelines (WCAG) 2.2. https://www.w3.org/TR/WCAG22/ (Success criterion 1.4.1 Use of Color: colour must not be the only way to convey information; 1.4.3 Contrast (Minimum) for text.)"),
  nielsen2006: r("Nielsen 2006", "Nielsen, J. (2006). Progressive Disclosure. Nielsen Norman Group. https://www.nngroup.com/articles/progressive-disclosure/ (Show the few most important options first and the rest on request; it helps both new and experienced users.)"),
};
