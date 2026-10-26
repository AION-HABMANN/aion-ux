import { bi } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/materialTypes";
import { comicOf, panel } from "@/data/free/comicKit";

/**
 * Day 7 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people the cards
 * already use (Hana, Jonas, Wanda, Bruno and the garden centre Moss & Pine), so it is the card said again in pictures, not a new case. The last panel states the card's
 * rule and names the task block that uses it. The drawings are in components/day7/comicScenes.tsx.
 */
const NOTE = "Hana, Jonas, Wanda, Bruno and Moss & Pine are made up for this lesson, like the examples on the card: a Case assumption. WellTrack, CareerPath and LifeSupport, the cases of the task, are in the task.";
const NAMES = { hana: "Hana, a customer", jonas: "Jonas, a customer", wanda: "Wanda, UX writer", bruno: "Bruno, product owner" };

export const COMICS_D7 = bi({
  A1: comicOf({
    id: "d7-a1", title: "PROCESSED", teaser: "Hana orders plants and gets a word that tells her nothing.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a1-1", scene: "Hana orders three plants. The confirmation says only: Order MP-30417, status PROCESSED.", say: [["hana", "Processed… so are they coming?", true]], tag: ["plain", "CORRECT, COLD"], means: "People feel before they judge. A correct but cold message leaves them unsure." }),
      panel({ art: "a1-2", scene: "She checks her e-mail twice and thinks about ordering elsewhere next time.", say: [["hana", "Maybe the shop in town is safer."]], tag: ["plain", "WHAT IT DOES"], means: "The feeling steers attention, trust and the next decision." }),
      panel({ art: "a1-3", scene: "The new confirmation says her plants are on their way, when they arrive and what to do on the first day.", say: [["hana", "Thursday. And they tell me how to water them."]], tag: ["teal", "WARM, THE SAME FACTS"], means: "The same facts, said so that people feel looked after, build trust and memory." }),
      panel({ art: "a1-4", scene: "Wanda, the UX writer, writes the five effects on the board.", say: [["wanda", "Ask what the feeling does, not only whether it works."]], tag: ["ink", "THE RULE"], means: "Name the feeling and what it does to attention, motivation, trust, memory and decisions. You use this in Block 1.1 for WellTrack's spontaneous effect and the effect statements." }),
    ],
  }),
  A2: comicOf({
    id: "d7-a2", title: "Usable, and still unsure", teaser: "Jonas can pay, but does not want to.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a2-1", scene: "Jonas is at the payment step. It works, but nothing says what happens after Pay, and there is no way back.", say: [["jonas", "And if I change my mind?", true]], tag: ["plain", "USABLE"], means: "A step can pass every usability check and still leave people unsure." }),
      panel({ art: "a2-2", scene: "Wanda lists what is missing: safety, control, recognition.", say: [["wanda", "He can pay. He just does not feel safe doing it."]], tag: ["teal", "THE FACTORS"], means: "Safety, control, joy, belonging and recognition, against frustration and uncertainty." }),
      panel({ art: "a2-3", scene: "The step now says he can cancel until it ships, offers a way back, and remembers his hedge plan.", say: [["jonas", "They know me. And I can still change it."]], tag: ["teal", "A GOOD EXPERIENCE"], means: "The fields are the same; the experience quality is not." }),
      panel({ art: "a2-4", scene: "Wanda adds the factors to the team's checklist.", say: [["wanda", "Usable is the floor. Ask how it feels."]], tag: ["ink", "THE RULE"], means: "Check the emotional factors, not only usability. You use this in Block 1.1 for WellTrack's categories, in Block 1.2 for rating CareerPath and in Block 2.1 for LifeSupport's categories." }),
    ],
  }),
  A3: comicOf({
    id: "d7-a3", title: "Error 402", teaser: "Hana's payment fails, and the message makes it worse.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a3-1", scene: "Hana's payment fails. The message: ERR_PAYMENT_DECLINED, transaction failed.", say: [["hana", "Was I charged? Is my basket gone?", true]], tag: ["plain", "TECHNICAL"], means: "A technical message at a critical moment creates uncertainty and blame." }),
      panel({ art: "a3-2", scene: "Bruno, the product owner, tries a cheerful version: Oops, an emoji, no worries.", say: [["hana", "Nice… but what do I do?"]], tag: ["plain", "CHEERFUL"], means: "A friendly tone without the facts does not take the problem seriously." }),
      panel({ art: "a3-3", scene: "Wanda writes it supportive: what happened, nothing charged, basket saved, two ways on, help by phone.", say: [["hana", "OK. I'll pay by invoice."]], tag: ["teal", "SUPPORTIVE"], means: "Feedback and tone at the critical moment create safety." }),
      panel({ art: "a3-4", scene: "Wanda writes the four sources on the board.", say: [["wanda", "Look, act, words, feedback. Most of it is in the words when things go wrong."]], tag: ["ink", "THE RULE"], means: "Visual mood, interaction, tone and feedback create the feeling. You use this in Block 1.1 for WellTrack's errors, in Block 1.2 for CareerPath's feedback and in Block 2.1 for LifeSupport's feedback and tone." }),
    ],
  }),
  A4: comicOf({
    id: "d7-a4", title: "Almost gone!", teaser: "Bruno wants more clicks; the countdown costs trust.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a4-1", scene: "Bruno adds a countdown and “Almost gone!” to every plant. Clicks go up.", say: [["bruno", "It works!"]], tag: ["plain", "ACTIVATION"], means: "Strong stimuli raise activation for a moment." }),
      panel({ art: "a4-2", scene: "Jonas sees the same countdown reset the next day.", say: [["jonas", "So that was not true either.", true]], tag: ["plain", "MANIPULATION"], means: "False urgency uses emotion against people and costs trust in every later message." }),
      panel({ art: "a4-3", scene: "Wanda places five messages on two axes: how strongly they activate and how well they fit.", say: [["wanda", "Fit first. A calm care tip brings him back."]], tag: ["teal", "FIT, NOT FORCE"], means: "Feelings that fit the situation and keep their promise build lasting use." }),
      panel({ art: "a4-4", scene: "The team writes the line on the board.", say: [["wanda", "Would it still work if he knew why we wrote it?"]], tag: ["ink", "THE RULE"], means: "Activate only with feelings that fit and are true; avoid overload, over-emotionalisation and manipulation. You use this in Block 1.1 for WellTrack's weaknesses and in Block 1.2 for CareerPath's Variant A and its conflicts." }),
    ],
  }),
  A5: comicOf({
    id: "d7-a5", title: "Words, photos or confetti?", teaser: "Bruno has three ideas; the cheapest one builds most trust.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "a5-1", scene: "Bruno has three ideas: rewrite the errors, new photos, a celebration after every order.", say: [["bruno", "Which first?"]], tag: ["plain", "THREE IDEAS"], means: "Measures differ in effect, effort, risk and time." }),
      panel({ art: "a5-2", scene: "Wanda weighs the rewritten errors.", say: [["wanda", "Big effect, easy, low risk, next release."]], tag: ["teal", "WEIGHED"], means: "Effect on users, feasibility, risk and time pressure, each with a reason." }),
      panel({ art: "a5-3", scene: "The confetti is quick, but it would also play for a replacement of dead plants.", say: [["bruno", "The fun one is the risky one?"]], tag: ["plain", "A RISK"], means: "Trust grows from small, honest signals; a feeling that does not fit costs it." }),
      panel({ art: "a5-4", scene: "The team writes the order and the reasons.", say: [["wanda", "Errors now, photos over the season, no confetti. And here is why."]], tag: ["ink", "THE RULE"], means: "Build trust with competent, honest signals, and weigh every measure with a reason. You use this in Block 1.2 for the decision and in Block 2.1 for the four measures, their justification and the 12 weeks." }),
    ],
  }),
  B1: comicOf({
    id: "d7-b1", title: "A warm campaign, a cold shop", teaser: "Marketing's spring campaign is warm; the shop's messages are not.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b1-1", scene: "The spring campaign is warm and personal. Then Hana orders, and the shop answers PROCESSED.", say: [["hana", "The advert loved me. The shop doesn't know me.", true]], tag: ["plain", "A CAMPAIGN"], means: "When emotion is only marketing, the product breaks the campaign's promise." }),
      panel({ art: "b1-2", scene: "Wanda shows where feelings come from: the confirmations, the errors, the waiting.", say: [["wanda", "The teams write these every day. Nobody decided how they should feel."]], tag: ["plain", "WHERE IT LIVES"], means: "What people feel comes mostly from feedback, tone and interaction." }),
      panel({ art: "b1-3", scene: "The company writes a guiding vision, a few principles and one tone guide for every team.", say: [["bruno", "So the shop keeps the campaign's promise."]], tag: ["teal", "ARCHITECTURE"], means: "Emotional UX belongs in the UX architecture: vision, principles, tone guide, patterns." }),
      panel({ art: "b1-4", scene: "Wanda draws the layers, from vision to every message.", say: [["wanda", "We steer the feeling. The teams write from it."]], tag: ["ink", "THE RULE"], means: "Make emotional quality part of the UX architecture, not a campaign. You use this in Block 3.1 for the guiding vision, the three decisions and what comes first." }),
    ],
  }),
  B2: comicOf({
    id: "d7-b2", title: "One tone for everything?", teaser: "Marketing wants the cheerful tone everywhere, also for a loss.", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b2-1", scene: "Marketing wants every message cheerful and with an offer. The nursery wants care advice to stay serious.", say: [["bruno", "Cheerful sells!"], ["wanda", "Not to someone whose hedge died."]], tag: ["plain", "TWO GOALS"], means: "Seriousness against closeness, activation against credibility, brand against user effect." }),
      panel({ art: "b2-2", scene: "Wanda shows one template in four situations: an offer, care, a delay, a loss.", say: [["wanda", "The situation decides the feeling."]], tag: ["teal", "FIT"], means: "The right feeling depends on the situation, not on the brand alone." }),
      panel({ art: "b2-3", scene: "They agree: offers may activate; care, delays and losses stay calm, with no upsell.", say: [["bruno", "We give up some sales messages. Here is why."]], tag: ["teal", "A CHOICE"], means: "A decision names the conflict, chooses and says what it gives up." }),
      panel({ art: "b2-4", scene: "Wanda adds the conflicts to the tone guide.", say: [["wanda", "Name the two goals, then fit the feeling."]], tag: ["ink", "THE RULE"], means: "Name the conflict, fit the feeling to the situation and say what you give up. You use this in Block 3.1 for the decisions, the risk analysis and the rule for conflicts between brand, expertise and user effect." }),
    ],
  }),
  B3: comicOf({
    id: "d7-b3", title: "Who owns the tone?", teaser: "No data on feelings. Wait, or decide?", note: NOTE, names: NAMES,
    panels: [
      panel({ art: "b3-1", scene: "Nobody knows how customers feel about the shop. There are only support e-mails and app reviews.", say: [["bruno", "Shouldn't we measure first?"]], tag: ["plain", "LITTLE DATA"], means: "Waiting is a decision too; the cold messages go on meanwhile." }),
      panel({ art: "b3-2", scene: "Wanda decides to rewrite the checkout messages first, and says when she would reverse it.", say: [["wanda", "If the “did my order work?” e-mails don't drop, we look again."]], tag: ["teal", "A DECISION"], means: "Decide, say what is not known, when you would reverse it and what you give up." }),
      panel({ art: "b3-3", scene: "Bruno asks who decides when marketing and the nursery disagree.", say: [["wanda", "Correct first, then the customer, then the brand."]], tag: ["teal", "WHO OWNS IT"], means: "An owner of the principles, experts who check, and a rule for conflicts." }),
      panel({ art: "b3-4", scene: "The team writes the rule on the board.", say: [["wanda", "An owner of the tone. A rule for conflicts. Decide, then check."]], tag: ["ink", "THE RULE"], means: "Give emotional UX an owner and a rule, and say when a decision will be checked. You use this in Block 3.1 for the governance model, the decision under uncertainty and the statement to the management." }),
    ],
  }),
}) as unknown as Record<MaterialId, Comic>;
