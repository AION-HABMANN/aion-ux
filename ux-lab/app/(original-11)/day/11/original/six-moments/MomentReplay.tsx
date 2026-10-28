"use client";

// One moment: an animated replay of the transcript, then an optional
// "reveal the lesson" panel and a personal notes box.
//
// The replay is timed rather than instant on purpose. A loop that appears all at
// once reads as text; a loop that arrives one weary line at a time feels like a
// loop. That felt rhythm is the point of this stop.

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatFrame, ChatLog, type Bubble } from "@/original/components/day11/ChatMock";
import LensPicker from "@/original/components/day11/LensPicker";
import { getLens } from "@/original/lib/day11/lenses";
import { useLensChoice, useNote } from "@/original/lib/day11/storage";
import type { Direction, LensId, Moment } from "@/original/lib/day11/types";

const USER_DELAY_MS = 700;
const SYSTEM_TYPING_MS = 900;

export default function MomentReplay({ moment }: { moment: Moment }) {
  const [shown, setShown] = useState<Bubble[]>([]);
  const [typing, setTyping] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [note, setNote] = useNote(`moment-${moment.id}`);
  const [choice, setChoice] = useLensChoice(moment.id);
  const [lens, setLens] = useState<LensId | null>(null);
  const [direction, setDirection] = useState<Direction | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Restore a previously saved pick when switching back to this moment.
  useEffect(() => {
    setLens((choice?.lens as LensId) ?? null);
    setDirection((choice?.direction as Direction) ?? null);
  }, [choice]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimers();
    setShown([]);
    setTyping(false);
    setPlaying(true);

    let elapsed = 0;
    moment.lines.forEach((line) => {
      const isAside = line.text.startsWith("(");
      if (line.role === "user") {
        elapsed += USER_DELAY_MS;
        timersRef.current.push(
          setTimeout(() => {
            setShown((prev) => [...prev, { role: "user", text: line.text }]);
          }, elapsed)
        );
      } else {
        // Show the typing dots first, so a slow, unhelpful reply feels slow.
        timersRef.current.push(
          setTimeout(() => setTyping(true), elapsed + 120)
        );
        elapsed += SYSTEM_TYPING_MS;
        timersRef.current.push(
          setTimeout(() => {
            setTyping(false);
            setShown((prev) => [
              ...prev,
              { role: "system", text: line.text, aside: isAside },
            ]);
          }, elapsed)
        );
      }
    });

    timersRef.current.push(setTimeout(() => setPlaying(false), elapsed + 200));
  }, [moment, clearTimers]);

  // Auto-play whenever the learner selects a different moment.
  useEffect(() => {
    setRevealed(false);
    play();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moment.id]);

  const expertLens = getLens(moment.primaryLens);
  const agrees = lens === moment.primaryLens && direction === moment.direction;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
      <div>
        <ChatFrame label={`${moment.id} · ${moment.title}`}>
          <ChatLog bubbles={shown} typing={typing} />
        </ChatFrame>
        <div className="mx-auto mt-3 flex w-full max-w-md gap-2">
          <button type="button" onClick={play} className="aion-btn-ghost" disabled={playing}>
            {playing ? "Playing…" : "Replay"}
          </button>
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            className="aion-btn"
            aria-expanded={revealed}
          >
            {revealed ? "Hide the lesson" : "Reveal the lesson"}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {revealed ? (
          <>
            <div className="aion-card-soft">
              <p className="aion-label">How that probably felt</p>
              <p className="mt-2 text-sm leading-relaxed text-navy">{moment.feeling}</p>
            </div>

            <div className="aion-card">
              <LensPicker
                idPrefix={`m-${moment.id}`}
                selectedLens={lens}
                selectedDirection={direction}
                onSelectLens={(l) => {
                  setLens(l);
                  setChoice(l, direction ?? "");
                }}
                onSelectDirection={(d) => {
                  setDirection(d);
                  setChoice(lens ?? "", d);
                }}
              />

              {lens && direction && (
                <div className="mt-5 border-t border-navy/10 pt-4">
                  <p className="aion-label">Here's how a UX lead would read it</p>
                  <p className="mt-1 text-xs text-navy/55">
                    {agrees
                      ? "Same reading as yours. Here's the reasoning behind it."
                      : `You picked ${getLens(lens).name}, ${direction}. That's a defensible read — here's a different one. Both can be true at once.`}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-navy/85">
                    <span className="font-semibold text-navy">
                      {expertLens.name}, {moment.direction}.
                    </span>{" "}
                    {moment.expertReading}
                  </p>
                  <p className="mt-3 text-xs text-navy/55">
                    This is one expert's reading, not the only one. If you can argue for
                    a different lens, argue for it — that's the skill.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="aion-card">
            <p className="text-sm leading-relaxed text-navy/70">
              Watch it play out first. Notice where you'd have given up, or where you
              relaxed. Then reveal the lesson and try to name it before you read on.
            </p>
          </div>
        )}

        <div className="aion-card">
          <label
            htmlFor={`note-${moment.id}`}
            className="aion-label block"
          >
            My notes on {moment.id}
          </label>
          <p className="mt-1 text-xs text-navy/55">
            Your own wording, in your own words. Saved in this browser.
          </p>
          <textarea
            id={`note-${moment.id}`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="What went wrong or right here, in one sentence…"
            className="aion-input mt-2 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
