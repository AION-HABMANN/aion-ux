"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day13/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day13/materials";
import { tt } from "@/lib/lang";

/** Day 13 · the study cards of Materi A and B, with the references of each block (the simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["barkley2015", "pun2016", "bda2023", "coga2021", "houde1997", "kelley1984", "gibbons2018"],
  refsB: ["coga2021", "holmes2018", "pun2016", "simon1956", "klein2007"],
  texts: () => ({
    headA: tt("Neurodiversity: different loads, stimuli and focus, predictability, readability, inclusive patterns, assistive technologies and testing"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every picture uses Hearth Energy, a made-up energy supplier, and its customers, so the task is never answered for you. The pictures let you feel the load: a stimulus dial, pages whose menu moves, a notice whose typography you change, content heard through text-to-speech."),
    headB: tt("Neurodiverse UX as a leadership task: base architecture, conflicts and governance"),
    leadB: tt("Three cards for Level 3. You stop adapting single screens and start deciding which base every product gets, what becomes a mode, who owns the patterns and the tests, and what to decide when nobody has tested with neurodivergent users yet. Each picture uses Hearth Energy, another company."),
    optionalReason: tt("No Core task block needs this card."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
