"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day2/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day2/materials";
import { tt } from "@/lib/lang";

/** Day 2 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["iso9241210", "gould1985", "normanNielsen", "rosenfeld2015", "nielsen1997", "pernice2017", "krug2014", "ittiKoch2001", "wagemans2012", "ware2012", "nielsen1994", "sweller1988", "kurosu1995", "moshagen2010", "tractinsky2000", "gibbons2018"],
  refsB: ["conway1968", "rosenfeld2015", "spencer2009", "nielsen2006", "gibbons2018", "krug2014", "simon1956", "klein2007", "iso9241210"],
  texts: () => ({
    headA: tt("Visual perception and user-centred design: seeing from the user's side, how people scan, what guides the eye, how much at once, and how to weigh a measure"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every diagram uses Brightwater, a made-up leisure centre, and its people, so the task is never answered for you."),
    headB: tt("User logic, conflicts of goals and accountable decisions: why good UI decisions come from the user's side and who owns them"),
    leadB: tt("Three cards for Level 3. You stop judging single screens and start deciding which structure a whole organisation needs, which conflicts to settle, who owns user-centredness, and what to decide when data is only partly reliable. Each diagram uses Brightwater, another organisation."),
    optionalReason: tt("No Core task block needs this card."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
