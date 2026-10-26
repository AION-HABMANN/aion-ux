import { tt } from "@/lib/lang";
import type { Persisted } from "@/store/useStore";

/** One concretely missing thing: where it is (a DOM id) and what it is, in words (CLAUDE.md #1, #2). */
export type MissingEntry = { id: string; label: string };

export const PARTICIPANT_ID = "participant-strip";

export function participantMissing(p: Persisted): MissingEntry[] {
  return p.participant.name.trim() ? [] : [{ id: PARTICIPANT_ID, label: tt("Your full name is needed for the file name.", "Ihr vollständiger Name wird für den Dateinamen gebraucht.") }];
}

/** Shortens a quotation for a missing-list label. */
export const short = (raw: string, n = 44) => {
  const s = raw.replace(/^[“„"]|[”“"]$/g, "");
  return s.length > n ? `${s.slice(0, n)}…` : s;
};
