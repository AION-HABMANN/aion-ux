# CityHelp Voice — AION Day 11 · Module 5

An interactive learning playground about voice and AI-assisted interfaces. A junior UX
learner works through six stops built around **CityHelp Voice**, a fictional voice
assistant for a German municipal service (Bürgeramt appointments, application status,
broken streetlight reports). Some of what CityHelp does is genuinely helpful and some of
it is deliberately infuriating — the learner uses it first, forms a gut reaction, and
only then gets the vocabulary to explain why. Nothing here is graded, scored, or
timed as a test; the teaching is the product.

## Run it

In GitHub Codespaces (or anywhere with Node 18+):

```bash
npm install
npm run dev
```

Then open the forwarded port 3000. To check a production build:

```bash
npm run build
```

## All "AI" here is deterministic and offline

There is no backend, no database, no API key, and no model call anywhere in this app.
Every CityHelp reply comes from keyword rules in `lib/responseEngine.ts`, so the same
input always produces the same output — in class, on a train, with the wifi off.

The browser Speech Recognition API is used as an **optional** extra: if the browser
supports it, a "Speak" button appears and dictates into the text box. If it doesn't, the
button simply never renders. Every flow in the app is fully usable with keyboard and
mouse alone. No audio is recorded, stored, or transmitted.

Learner progress and notes live in `localStorage` only. "Reset my progress" in the
sidebar clears them.

## Route map

| Route | Stop | What happens there |
| --- | --- | --- |
| `/` | 0 · Welcome | What CityHelp is, why this is a sandbox, and the one question behind the day. |
| `/meet-cityhelp` | 1 · Meet CityHelp Voice | Free-play chat simulator with quick chips and a gut-reaction log. |
| `/six-moments` | 2 · Six moments, six lessons | Animated replay of transcripts T1–T6, lens picker, expert reading, per-moment notes. |
| `/six-lenses` | 3 · The six lenses | Six lens cards taught by contrast, plus a ten-line sorting practice round. |
| `/three-ways` | 4 · Three ways to build it | Variants A/B/C of one booking task, live property panel, persona switch. |
| `/why-your-brain-reacts` | 5 · Why your brain reacts | Cognitive load, predictability, and stimulus-vs-relief demos. |
| `/prove-it-works` | 6 · Prove it works | Prototype types, a risk-based 2×2 testing sorter, and a scope decision widget. |

## File map

```
app/
  layout.tsx                    Root layout, wraps everything in AppShell
  globals.css                   Tailwind + AION component classes (.aion-card, .aion-btn…)
  page.tsx                      Stop 0
  meet-cityhelp/                Stop 1 — page.tsx + FreePlay.tsx
  six-moments/                  Stop 2 — page.tsx + MomentLab.tsx + MomentReplay.tsx
  six-lenses/                   Stop 3 — page.tsx + SortingGame.tsx
  three-ways/                   Stop 4 — page.tsx + VariantLab.tsx + VariantFlows.tsx
  why-your-brain-reacts/        Stop 5 — page.tsx + three demo components
  prove-it-works/               Stop 6 — page.tsx + PrototypePicker/RiskSorter/DecisionWidget

components/
  AppShell.tsx                  Top bar + sidebar + main column
  TopBar.tsx                    Slim AION bar, present on every page
  Sidebar.tsx                   Ordered learning path, progress counter, reset control
  SectionShell.tsx              The Feel it / See it / Carry it rhythm every stop follows
  ChatMock.tsx                  Reusable phone-style chat frame and message log
  MicButton.tsx                 Optional Web Speech dictation, renders only if supported
  LensPicker.tsx                Six lens chips + strengthens/weakens toggle
  LensCard.tsx                  One lens with a good and a bad CityHelp example
  PropertyPanel.tsx             High/Medium/Low ratings for one build variant

lib/
  responseEngine.ts             ★ All free-play CityHelp dialogue — edit lines here
  moments.ts                    ★ The T1–T6 transcripts and their expert readings
  lenses.ts                     The six lenses, their examples, and the sorting-game items
  variants.ts                   Variant A/B/C ratings, flows, and persona verdicts
  proveIt.ts                    Prototype types, risk 2×2 answers, decision-widget copy
  navigation.ts                 The ordered learning path
  storage.ts                    localStorage hooks (progress, notes, reactions)
  types.ts                      Shared types
```

★ = the two files an instructor is most likely to want to edit.

## A note for future contributors

**Several CityHelp behaviours in this app are bad on purpose.** The main-menu loop, the
one-word "Done." confirmation, the "please say a valid command" dead-end, and the
newsletter over-reach are teaching artifacts, not bugs. Each one is marked in the source
with an `INTENTIONAL PLANTED FLAW` comment. Please don't clean them up — a learner who
never feels the loop never learns why it matters.

## How to demo this in class — five lines

1. Open `/meet-cityhelp` and let people type real requests for three minutes; ask who
   got annoyed and where.
2. Go to `/six-moments`, play **T2** live — the loop lands much harder at conversation
   speed than on a slide.
3. Open `/six-lenses` and run the sorting game together, arguing out loud about the
   overlapping picks.
4. On `/three-ways`, book the same appointment in A, then B, then flip the persona
   switch and watch the winner change.
5. Close on `/prove-it-works`: fill the 2×2 as a group, then let the room argue about
   which tasks voice should refuse.
