import { r } from "@/data/refs/kit";

/**
 * Day 12 · the sources the cards cite that Days 1 to 11 do not already list (CURRICULUM-GUIDE §4). Each is a well-known work or a binding rule; the note after the
 * title says what the card uses it for. Check every source, its current version and the state of the law before a course run.
 */
export const REFS_D12 = {
  eaa2019: r("EU 2019 (European Accessibility Act)", "Directive (EU) 2019/882 of the European Parliament and of the Council of 17 April 2019 on the accessibility requirements for products and services. Official Journal of the European Union, L 151. (Applies from 28 June 2025 to many products and services, among them e-commerce and banking; in Germany implemented by the Barrierefreiheitsstärkungsgesetz.)"),
  wad2016: r("EU 2016 (Web Accessibility Directive)", "Directive (EU) 2016/2102 of the European Parliament and of the Council of 26 October 2016 on the accessibility of the websites and mobile applications of public sector bodies. (Public bodies must make websites and apps accessible and publish an accessibility statement.)"),
  holmes2018: r("Holmes 2018", "Holmes, K. (2018). Mismatch: How Inclusion Shapes Design. MIT Press. (Disability as a mismatch between a person and a design; permanent, temporary and situational limits; solving for one extends to many.)"),
  waibad2012: r("W3C WAI 2012", "W3C Web Accessibility Initiative (2012). Before and After Demonstration (BAD). https://www.w3.org/WAI/demos/bad/ (An inaccessible demo website and its retrofitted version, with annotations for each barrier.)"),
  bda2023: r("British Dyslexia Association 2023", "British Dyslexia Association (2023). Dyslexia Style Guide. (Plain language, short sentences, left-aligned text, good spacing and no blocks of italics or capitals help readers with dyslexia.)"),
};
