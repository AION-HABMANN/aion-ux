"use client";

// OPTIONAL enhancement only. If the browser has SpeechRecognition, this button
// dictates into the text box. If it doesn't, the button simply never renders and
// the learner types instead — every flow in this app works with keyboard + mouse.
// No audio ever leaves the component; nothing is recorded or stored.

import { useEffect, useRef, useState } from "react";

// Minimal structural types — the Web Speech API isn't in the default TS lib.
type SpeechResultEvent = { results: { 0: { 0: { transcript: string } } } };
interface RecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((e: SpeechResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}
type RecognitionCtor = new () => RecognitionLike;

function getRecognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export default function MicButton({
  onTranscript,
}: {
  onTranscript: (text: string) => void;
}) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<RecognitionLike | null>(null);

  useEffect(() => {
    setSupported(getRecognitionCtor() !== null);
  }, []);

  if (!supported) return null;

  function toggle() {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const Ctor = getRecognitionCtor();
    if (!Ctor) return;

    const recognition = new Ctor();
    recognition.lang = "en-GB";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (e) => onTranscript(e.results[0][0].transcript);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={listening}
      aria-label={listening ? "Stop dictating" : "Dictate instead of typing (optional)"}
      title="Optional — typing works just as well"
      className={`aion-btn-ghost shrink-0 px-3 ${listening ? "border-purple text-purple" : ""}`}
    >
      <span aria-hidden="true">{listening ? "Listening…" : "Speak"}</span>
    </button>
  );
}
