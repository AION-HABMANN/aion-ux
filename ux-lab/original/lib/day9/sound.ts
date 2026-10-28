'use client';

/**
 * BUILD_PROMPT §5.6 — sound.
 * Default OFF. Four cues at most, volume <= 0.25, never triggered on page load.
 * Synthesised with the Web Audio API so the app ships no audio assets and
 * cannot half-play a missing file.
 */

export type Cue = 'tick' | 'confirm' | 'unlock' | 'seal';

const CUES: Record<Cue, { freq: number; dur: number; type: OscillatorType }> = {
  tick: { freq: 880, dur: 0.05, type: 'sine' },
  confirm: { freq: 660, dur: 0.12, type: 'triangle' },
  unlock: { freq: 523.25, dur: 0.22, type: 'sine' },
  seal: { freq: 392, dur: 0.32, type: 'triangle' },
};

const MAX_VOLUME = 0.25;

let ctx: AudioContext | null = null;

function context(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

export function playCue(cue: Cue, enabled: boolean) {
  if (!enabled) return;
  const audio = context();
  if (!audio) return;
  // Browsers suspend the context until a gesture; a cue is always gesture-driven.
  if (audio.state === 'suspended') void audio.resume();

  const { freq, dur, type } = CUES[cue];
  const osc = audio.createOscillator();
  const gain = audio.createGain();

  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, audio.currentTime);
  gain.gain.linearRampToValueAtTime(MAX_VOLUME, audio.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + dur);

  osc.connect(gain).connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + dur + 0.02);
}
