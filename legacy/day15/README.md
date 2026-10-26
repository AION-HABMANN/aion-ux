# Neuro-UX Lab — Module 7, Day 2

An interactive learning app for a senior-level executive UX training module on
**eye-tracking, gaze behaviour, neurofeedback and brain-computer interfaces**.

It is not a slide deck and not a documentation site. It has one pedagogical
objective:

> Teach the learner to feel the difference between *measurable* and *reliable* —
> by letting them fall for seemingly objective data first, then showing them the
> consequences of their own decision.

Every screen either teaches a concept or forces a consequential decision.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static bundle in dist/
npm run preview    # serve the built bundle
npm run typecheck
```

The build is fully static and uses `HashRouter`, so `dist/` can be dropped on
any host without rewrite rules.

## Structure

```
/                       Landing / module overview
/learn                  Learning hub
  /learn/foundations    What eye-tracking measures  · Gaze Replay
  /learn/limits         Gaze ≠ understanding        · Three Explanations  ← the hinge
  /learn/neuro          Neurofeedback & BCI         · Maturity Spectrum
  /learn/ethics         Consent & data protection   · Consent Ladder
  /learn/leadership     Decision architecture       · Argument Rehearsal
/play                   Playground hub
  /play/focussense      L1→L2 · Data vs. insight    · 12 min
  /play/learningpulse   L2    · Trade-off simulator · 15 min
  /play/visionmind      L3    · Governance architect· 20 min
/debrief                Cross-playground synthesis + printable export
```

```
src/
  components/     Layout, Sidebar, primitives (Btn/Chip/Note/Field/…),
                  Meter, charts (Radar/StackedBar/Plot2x2/ProgressRing),
                  Assign (select-then-place), ElementChecker, ConstraintHUD
  lib/            motion contract, small utilities
  pages/          one file per route
  state/          ModuleStore — progress rings + playground outputs for /debrief
```

## Design decisions worth knowing

**State is in memory only.** No `localStorage`, no backend, no account. A reload
is a reset, and the app says so where it matters. The export is the only way
anything leaves the session.

**Trade-offs are computed, not scripted.** LearningPulse runs two levers into six
meters; VisionMind runs four funded measures into three. Neither has a
configuration that wins everywhere — meters carry structural ceilings, and a
meter that is capped by the learner's other settings says so.

**Writing is never scored.** The margin checkers detect the *presence* of
elements (named trade-off, residual risk, next decision point) and explain what
they look for on hover. There is no grade on any written response, and the
VisionMind model answer is framed explicitly as *one* defensible answer — it
also reports the ground the learner covered that the model does not.

**Feedback is consequence, not correctness.** No ✅/❌. An overreaching choice
desaturates its panel and gets a quiet inline note; two of the five FocusSense
findings have no correct placement at all.

**Drag is the garnish, not the mechanic.** Every assignment is built on
select-then-place: focus an item, press Enter, choose a target. That path is the
keyboard path, the screen-reader path (with `aria-live` announcements) and the
375px touch path, so there is no separate mobile implementation to drift.

**Reduced motion removes the physics, not the beats.** `prefers-reduced-motion`
swaps springs for 150 ms fades and drops stagger delays; sequential reveals still
happen, because they carry meaning.

**Print is a portal.** The `/debrief` export renders into `document.body`, so the
print stylesheet hides `#root` wholesale rather than fighting the app's layout
for one sheet. No PDF library — the browser's own dialogue does the work.

## Accessibility

- Keyboard-operable throughout; visible focus rings on every interactive element
- Meters expose `role="meter"` with `aria-valuenow`/`aria-valuetext` plus a
  monospace numeric readout
- Colour is never the only carrier of meaning — every coded state is paired with
  a label or glyph
- Body text meets 4.5:1 against `--bg-panel` (muted text measures ≈6:1)
- No horizontal overflow at 375px; constraint HUDs collapse to a sticky summary
  chip that expands on tap

## Stack

React 18 + TypeScript, Vite, React Router, Tailwind CSS, Framer Motion. All
charts and meters are hand-built SVG — no chart library.
