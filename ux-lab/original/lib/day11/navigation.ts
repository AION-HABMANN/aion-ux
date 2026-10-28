// The ordered learning path. The sidebar, the progress counter and the
// "next stop" buttons all read from this one list.

export interface Stop {
  /** 0 is the welcome screen and does not count toward "explored". */
  id: number;
  href: string;
  label: string;
  blurb: string;
}

export const STOPS: Stop[] = [
  {
    id: 0,
    href: "/day/11/original/",
    label: "Welcome & how to use this",
    blurb: "What this is, and the one question behind the whole day.",
  },
  {
    id: 1,
    href: "/day/11/original/meet-cityhelp/",
    label: "Meet CityHelp Voice",
    blurb: "Free play. Use the assistant before anyone explains it.",
  },
  {
    id: 2,
    href: "/day/11/original/six-moments/",
    label: "Six moments, six lessons",
    blurb: "Replay the six transcripts and name what happened.",
  },
  {
    id: 3,
    href: "/day/11/original/six-lenses/",
    label: "The six lenses",
    blurb: "The vocabulary, plus practice sorting real lines.",
  },
  {
    id: 4,
    href: "/day/11/original/three-ways/",
    label: "Three ways to build it",
    blurb: "The same task in three interaction styles.",
  },
  {
    id: 5,
    href: "/day/11/original/why-your-brain-reacts/",
    label: "Why your brain reacts",
    blurb: "Cognitive load, expectation, and trust — felt, not described.",
  },
  {
    id: 6,
    href: "/day/11/original/prove-it-works/",
    label: "Prove it works",
    blurb: "Prototype, test by risk, and decide where voice belongs.",
  },
];

export function getStop(id: number): Stop {
  const found = STOPS.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown stop: ${id}`);
  return found;
}

export function getNextStop(id: number): Stop | undefined {
  return STOPS.find((s) => s.id === id + 1);
}
