"use client";

import { useState } from "react";
import type { BlockSpec } from "@/lib/dayFree/spec";
import { useStore } from "@/store/useStore";
import { tt } from "@/lib/lang";

/**
 * UX-STANDARD 2.24 · the best solution of a case study as a working prototype, for the mentor only. It appears under the block once the passcode has been
 * entered in the mentor bar (a convenience gate, not security, like the other mentor answers). The prototype is a stand-alone page with a Before and an After
 * portal, markers that explain every change, and an answer sheet; it loads only when the mentor asks for it.
 */
export function MentorSolution({ s }: { s: NonNullable<BlockSpec["solution"]> }) {
  const unlocked = useStore((st) => st.mentorUnlocked);
  const [open, setOpen] = useState(false);
  if (!unlocked) return null;
  const src = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${s.src}`;
  return (
    <aside aria-label={tt("Mentor: the best solution as a prototype", "Mentor: die beste Lösung als Prototyp")} className="fade-in space-y-3 rounded-lg border border-rust/50 bg-rustSoft p-3.5 text-caption text-ink print:hidden">
      <p className="smallcaps text-rust">{tt("Mentor · the best solution as a prototype", "Mentor · die beste Lösung als Prototyp")}</p>
      <p>
        {tt(
          `${s.title} A working example of what a very good answer to this case study looks like: switch between Before and After, try the task, click the dots to see the problem, the reason and real products that do the same, and open the answer sheet. The page is in English.`,
          `${s.title} Ein funktionierendes Beispiel dafür, wie eine sehr gute Antwort auf diese Fallstudie aussieht: Wechseln Sie zwischen Before und After, probieren Sie die Aufgabe aus, klicken Sie die Punkte an (Problem, Grund und echte Produkte, die dasselbe tun) und öffnen Sie das Antwortblatt. Die Seite ist auf Englisch.`,
        )}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="btn btn-sm min-h-[40px] border border-rust/50 bg-paper text-ink hover:border-rust">
          {open ? tt("Hide the prototype", "Prototyp ausblenden") : tt("Show the prototype", "Prototyp anzeigen")}
        </button>
        <a href={src} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-2">
          {tt("Open it in a new tab", "In einem neuen Tab öffnen")}
        </a>
      </div>
      {open && <iframe title={s.title} src={src} className="h-[900px] w-full rounded-md border border-line bg-paper" />}
    </aside>
  );
}
