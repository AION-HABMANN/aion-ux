"use client";

import { PARTICIPANT_ID } from "@/lib/missing";
import { useStore } from "@/store/useStore";
import { tt } from "@/lib/lang";

/**
 * The learner's full name, on every page. It only builds the export file name. The number that leads the file name is not typed and
 * not shown: each export adds its own route's number automatically (Route 1 = 1, Route 2 = 2), see lib/slug.ts.
 */
export function ParticipantStrip() {
  const name = useStore((s) => s.participant.name);
  const setParticipant = useStore((s) => s.setParticipant);
  return (
    <section id={PARTICIPANT_ID} aria-label={tt("Participant", "Teilnehmer")} className="card mt-4 p-3 md:p-4 print:hidden">
      <label htmlFor="participant-name" className="text-caption font-semibold">
        {tt("Full name", "Vollständiger Name")}
      </label>
      <p id="participant-name-help" className="text-micro normal-case tracking-normal text-ash">
        {tt(
          "Use the same name all week. It is how your submissions are matched. Each export names its own file from it, for example",
          "Verwenden Sie die ganze Woche denselben Namen, so werden Ihre Abgaben zugeordnet. Jeder Export bildet daraus seinen Dateinamen, zum Beispiel",
        )}{" "}
        <span className="tnum">1-muchson-day1-l1l2-ux-analysis</span>.
      </p>
      <input
        id="participant-name"
        autoComplete="name"
        aria-describedby="participant-name-help"
        className="field mt-1 max-w-xl"
        value={name}
        onChange={(e) => setParticipant({ name: e.target.value })}
        placeholder={tt("First name and family name", "Vorname und Nachname")}
      />
    </section>
  );
}
