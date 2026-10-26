"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day4/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day4/materials";
import { tt } from "@/lib/lang";

/** Day 4 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["norman2013", "iso9241110", "krug2014", "hick1952", "hyman1953", "iyengar2000", "yablonski2020", "fitts1954", "miller1956", "cowan2001", "sweller1988", "nielsen1994", "gibbons2018"],
  refsB: ["norman2013", "iso9241110", "yablonski2020", "iyengar2000", "gibbons2018", "hick1952", "simon1956", "klein2007"],
  texts: () => ({
    headA: tt("UX laws and cognitive perception: intuitive use, choices (Hick), expectations and targets (Fitts), memory and load (Miller), and how to weigh a measure"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every diagram uses Pedalo, a made-up bike-sharing app, and its people, so the task is never answered for you."),
    headB: tt("Usability as a strategic factor: reducing friction in the whole system, the conflict between functions and simplicity, and who owns the interaction logic"),
    leadB: tt("Three cards for Level 3. You stop fixing single screens and start deciding what a whole company improves first, which conflicts to settle, who owns the interaction logic, and what to decide when user data is partial. Each diagram uses Pedalo, another company."),
    optionalReason: tt("No Core task block needs this card."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
