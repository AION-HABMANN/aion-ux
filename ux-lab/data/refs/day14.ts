import { r } from "@/data/refs/kit";

/**
 * Day 14 · the sources the cards cite that Days 1 to 13 do not already list (CURRICULUM-GUIDE §4). Each is a well-known work or a public guide; the note after the
 * title says what the card uses it for. Check every source and its current version before a course run.
 */
export const REFS_D14 = {
  milgram1994: r("Milgram & Kishino 1994", "Milgram, P., & Kishino, F. (1994). A taxonomy of mixed reality visual displays. IEICE Transactions on Information and Systems, E77-D(12), 1321–1329. (The reality–virtuality continuum from the real world through augmented reality to virtual reality.)"),
  slater2016: r("Slater & Sanchez-Vives 2016", "Slater, M., & Sanchez-Vives, M. V. (2016). Enhancing our lives with immersive virtual reality. Frontiers in Robotics and AI, 3, 74. (Presence: the feeling of being there, and what immersion can and cannot do.)"),
  lavie2005: r("Lavie 2005", "Lavie, N. (2005). Distracted and confused?: Selective attention under load. Trends in Cognitive Sciences, 9(2), 75–82. (Attention is limited; under load, what is processed depends on what competes for it.)"),
  rebenitsch2016: r("Rebenitsch & Owen 2016", "Rebenitsch, L., & Owen, C. (2016). Review on cybersickness in applications and visual displays. Virtual Reality, 20(2), 101–125. (Motion sickness in VR and the factors that make it worse.)"),
  apple2026: r("Apple HIG", "Apple Inc. Human Interface Guidelines: Immersive experiences. https://developer.apple.com/design/human-interface-guidelines/immersive-experiences (read 29.10.2026). (Reserve immersion for meaningful moments; comfort; let people choose when to enter and exit.)"),
  govuk2026: r("GOV.UK Service Manual", "Government Digital Service. Service Manual: How the discovery phase works; How the alpha phase works. https://www.gov.uk/service-manual/agile-delivery (read 29.10.2026). (Define the problem, test the riskiest assumptions with throwaway prototypes, decide with evidence, including to stop.)"),
  kaplan2021: r("Kaplan et al. 2021", "Kaplan, A. D., Cruit, J., Endsley, M., Beers, S. M., Sawyer, B. D., & Hancock, P. A. (2021). The effects of virtual reality, augmented reality, and mixed reality as training enhancement methods: A meta-analysis. Human Factors, 63(4), 706–726. https://doi.org/10.1177/0018720820904229 (Training in virtual, augmented or mixed reality was about as effective as training in a non-simulated environment, not more.)"),
  miller2020vr: r("Miller et al. 2020", "Miller, M. R., Herrera, F., Jun, H., Landay, J. A., & Bailenson, J. N. (2020). Personal identifiability of user tracking data during observation of 360-degree VR video. Scientific Reports, 10, 17404. https://doi.org/10.1038/s41598-020-74486-y (More than 500 participants could be identified with above 95% accuracy from less than five minutes of tracking data; figures from summaries.)"),
};
