import { r } from "@/data/refs/kit";

/**
 * Day 8 · the sources the cards cite that Days 1 to 7 do not already list (CURRICULUM-GUIDE §4). Each is a well-known work; the note after the title says what the card
 * uses it for. Check every source and its current edition before a course run.
 */
export const REFS_D8 = {
  bruner1991: r("Bruner 1991", "Bruner, J. (1991). The narrative construction of reality. Critical Inquiry, 18(1), 1–21. (People make sense of experience as narrative: with a beginning, a goal, obstacles and an outcome.)"),
  quesenbery2010: r("Quesenbery & Brooks 2010", "Quesenbery, W., & Brooks, K. (2010). Storytelling for User Experience: Crafting Stories for Better Design. Rosenfeld Media. (Stories help teams understand users and shape journeys around their goals.)"),
  lupton2017: r("Lupton 2017", "Lupton, E. (2017). Design Is Storytelling. Cooper Hewitt, Smithsonian Design Museum. (A design leads people through a sequence with a beginning, tension and resolution; the narrative arc applies to interfaces.)"),
  freytag1863: r("Freytag 1863", "Freytag, G. (1863). Die Technik des Dramas. Hirzel. (The classic arc of exposition, rising action, climax, falling action and resolution.)"),
  kivetz2006: r("Kivetz et al. 2006", "Kivetz, R., Urminsky, O., & Zheng, Y. (2006). The goal-gradient hypothesis resurrected: Purchase acceleration, illusionary goal progress, and customer retention. Journal of Marketing Research, 43(1), 39–58. (People speed up as they see themselves getting closer to a goal.)"),
  green2000: r("Green & Brock 2000", "Green, M. C., & Brock, T. C. (2000). The role of transportation in the persuasiveness of public narratives. Journal of Personality and Social Psychology, 79(5), 701–721. (People absorbed in a story are moved by it; the effect depends on the story fitting them.)"),
  nunes2006: r("Nunes & Drèze 2006", "Nunes, J. C., & Drèze, X. (2006). The endowed progress effect: How artificial advancement increases effort. Journal of Consumer Research, 32(4), 504–512. (Customers of a car wash got a card with a head start of two stamps or a card without one; the head start group was compared on completion. Check the paper for the figures.)"),
  govukQuestion: r("GOV.UK Design System, Question pages", "GOV.UK Design System. Question pages. https://design-system.service.gov.uk/patterns/question-pages (Start by asking one question per page, so users understand what they are asked and can focus on it; the pattern lengthens a form, so ask only for what is needed.)"),
  govukForms: r("GOV.UK Service Manual, Form structure", "GOV.UK Service Manual. Form structure. https://www.gov.uk/service-manual/design/form-structure (Start by splitting the form across multiple pages, each page containing just one thing.)"),
  gdsOneThing2015: r("Government Digital Service 2015", "Government Digital Service (2015). One thing per page. GDS Design Notes, 3 July 2015. https://designnotes.blog.gov.uk/2015/07/03/one-thing-per-page/ (The one-question layout was better at handling errors, branches, loops and saving progress than the alternatives compared.)"),
};
