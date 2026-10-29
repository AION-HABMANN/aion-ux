"use client";

import clsx from "clsx";
import { useId, useState } from "react";
import type { CSSProperties } from "react";
import { ATMock, AT_TEXT, BusyMock, FormMock, LensMock, MeasureThumb, PagesMock, STIM_NAMES } from "@/components/day13/mocks";
import { StateFig } from "@/components/dayFree/figs";
import { ChainFig, CompareFig, DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { OptionGrid } from "@/components/materi/optionGrid";
import type { GridRow } from "@/components/materi/optionGrid";
import { HearIt } from "@/components/sim/VoiceSim";
import { tt } from "@/lib/lang";

/**
 * Day 13 · the teaching diagrams of Materi A and B. Example: Hearth Energy, a made-up energy supplier, with Ayo (ADHD), Mirko (autistic) and Tilda (dyslexia) as
 * customers, Pia (UX designer) and Lukas (product owner); never StudyPath, JobAccess or LifeGuide, so no task is answered here. Ideas from the original Day 13 kept
 * here: the Profile Lens (A1), the Stimulus Dial (A2), the Predictability Toggle (A3), the Readability Lab (A4), the Assistive Tech Strip (A5).
 */

/* ------------------------------------------------------------------ A1 · three lenses (interactive) */

export function LensFig() {
  return (
    <StateFig
      label={tt("Hearth Energy's start page seen through three lenses: ADHD, autism, dyslexia · Exploratory · Case assumption")}
      point={tt("The same screen loads different minds differently. With ADHD the load is overstimulation, distraction and an unclear task; with autism it is sensory overload, unclear logic, inconsistent patterns and ambiguous words; with dyslexia it is reading structure, typography and complex language. Many people without a diagnosis feel the same in stress.")}
      states={[
        { id: "adhd", button: tt("Ayo · ADHD"), picture: <LensMock lens="adhd" />, insight: tt("In plain words: ten things call for attention; the task that matters is the smallest line. Ayo starts three things and finishes none.") },
        { id: "autism", button: tt("Mirko · autism"), picture: <LensMock lens="autism" />, insight: tt("In plain words: icons without words and a number without meaning. Mirko cannot predict what a tap will do, so he does not tap.") },
        { id: "dyslexia", button: tt("Tilda · dyslexia"), picture: <LensMock lens="dyslexia" />, insight: tt("In plain words: the key line is tiny and grey and leads to a wall of text. Tilda reads slowly and gives the task to someone else.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · the stimulus dial (interactive) */

export function StimulusFig() {
  const [n, setN] = useState(0);
  const id = useId();
  const names = STIM_NAMES();
  const insight = [
    tt("In plain words: one next step and one button. Ayo sends his reading in thirty seconds."),
    tt("In plain words: one offer above the task. Still manageable; the task is still the biggest thing."),
    tt("In plain words: badges and offers below the button compete with it. The eye starts to wander."),
    tt("In plain words: something moves and a chat bubble talks. Movement pulls attention involuntarily; for people with ADHD or sensory sensitivity it is hard to look away."),
    tt("In plain words: quizzes, scores and ratings fill the screen. The meter reading is one item among twelve. Many people leave without doing it."),
  ][n];
  return (
    <Diagram label={tt("A dial from calm to overloaded on the Hearth Energy start page · Exploratory · Case assumption")}>
      <div className="space-y-3">
        <ThePoint>{tt("Every element competes for the same attention. A calm page shows one main task first, keeps extras quiet, avoids movement and interruptions. Fewer stimuli help people with ADHD and sensory sensitivity most, and almost everyone else too.")}</ThePoint>
        <div className="space-y-1">
          <label htmlFor={id} className="text-caption font-semibold text-ink">{tt(`Stimuli on the page: ${names[n]}`)}</label>
          <input id={id} type="range" min={0} max={4} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-[#1750A8]" aria-valuetext={names[n]} />
        </div>
        <BusyMock level={n} />
        <Insight>{insight}</Insight>
      </div>
    </Diagram>
  );
}

export function StepsFig() {
  return (
    <StateFig
      label={tt("Moving house at Hearth Energy as one long form or as three steps · Exploratory · Case assumption")}
      point={tt("Long tasks are easier in short steps: one question per screen, a visible position, and the next step named on the button. People who lose focus can find their place again; nobody has to hold twelve fields in mind.")}
      states={[
        { id: "long", button: tt("One long form"), picture: <FormMock steps={false} />, insight: tt("In plain words: twelve required fields at once. Ayo starts at the top, gets distracted at field five, and cannot find where he was.") },
        { id: "steps", button: tt("Three steps"), picture: <FormMock steps />, insight: tt("In plain words: one question, a position (step 1 of 3) and a button that says what comes next. The same twelve fields, in pieces anyone can hold.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · predictable or not (interactive) */

export function PredictFig() {
  return (
    <StateFig
      label={tt("Three Hearth Energy pages built inconsistently and consistently · Exploratory · Case assumption")}
      point={tt("Predictability means people can tell what will happen: the menu stays in one place, the same action has the same name, and buttons say what they do. For many autistic people this is the difference between using a product and avoiding it.")}
      states={[
        { id: "inconsistent", button: tt("Inconsistent"), picture: <PagesMock consistent={false} />, insight: tt("In plain words: the menu moves from top to left to bottom; the main button says “Go”, “OK” and “Let's go!” and moves too. Mirko has to relearn every page and cannot be sure what “Go” does.") },
        { id: "consistent", button: tt("Consistent"), picture: <PagesMock consistent />, insight: tt("In plain words: the menu always at the top, the main button always on the right, and it says what it does: “Send meter reading”, “Download bill”, “Report your move”. Learned once, used everywhere.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · the readability lab (interactive) */

export function ReadabilityFig() {
  const [size, setSize] = useState(13);
  const [lead, setLead] = useState(1.3);
  const [width, setWidth] = useState(100);
  const [left, setLeft] = useState(false);
  const [space, setSpace] = useState(false);
  const [plain, setPlain] = useState(false);
  const uid = useId();
  const official = tt("PLEASE NOTE: Pursuant to the general terms and conditions of supply, the reading of the metering device shall be transmitted by the customer no later than the 31st of October, failing which an estimated consumption figure will be applied for the purposes of the annual statement, which may result in a subsequent adjustment of the instalment amounts.");
  const plainText = tt("Please send us your meter reading by 31 October. If we do not get it, we have to estimate your use. Then your monthly payment may change later. Sending it takes about two minutes.");
  const style: CSSProperties = { fontSize: size, lineHeight: lead, maxWidth: `${width}%`, textAlign: left ? "left" : "justify", letterSpacing: space ? "0.05em" : undefined, wordSpacing: space ? "0.16em" : undefined, fontStyle: !plain && !left ? "italic" : undefined };
  const good = size >= 15 && lead >= 1.5 && width <= 75 && left && plain;
  const slider = (id: string, label: string, value: number, min: number, max: number, step: number, set: (v: number) => void, text: string) => (
    <div className="space-y-0.5">
      <label htmlFor={`${uid}-${id}`} className="text-caption font-semibold text-ink">{`${label}: ${text}`}</label>
      <input id={`${uid}-${id}`} type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} className="w-full accent-[#1750A8]" />
    </div>
  );
  return (
    <Diagram label={tt("A Hearth Energy notice whose typography and language you can change · Exploratory · Case assumption")}>
      <div className="space-y-3">
        <ThePoint>{tt("Small typographic choices decide whether people read to the end. Left-aligned text, a good size, enough line height, short lines, spacing, and plain language help readers with dyslexia most, and nearly everyone else.")}</ThePoint>
        <div className="grid gap-2 sm:grid-cols-3">
          {slider("size", tt("Size"), size, 11, 19, 1, setSize, `${size} px`)}
          {slider("lead", tt("Line height"), lead, 1.1, 2, 0.1, setLead, lead.toFixed(1))}
          {slider("width", tt("Line length"), width, 50, 100, 5, setWidth, `${width} %`)}
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              [left, setLeft, tt("Left-aligned")],
              [space, setSpace, tt("Extra spacing")],
              [plain, setPlain, tt("Plain language")],
            ] as [boolean, (v: boolean) => void, string][]
          ).map(([v, set, l]) => (
            <button key={l} type="button" aria-pressed={v} onClick={() => set(!v)} className={clsx("btn btn-sm min-h-[40px] border", v ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>{v ? "✓ " : ""}{l}</button>
          ))}
        </div>
        <div className="rounded-lg border border-line bg-white p-4 text-ink">
          <p style={style}>{plain ? plainText : official}</p>
        </div>
        <Insight>{good ? tt("In plain words: now Tilda reads it once and knows what to do. Nothing about the message changed; only how it is set and said.") : tt("In plain words: try a larger size, line height 1.5 or more, a shorter line, left alignment and plain language, and watch how much easier the same message becomes.")}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A5 · assistive technologies (interactive) */

export function ATFig() {
  return (
    <div className="space-y-2">
      <StateFig
        label={tt("The same Hearth Energy content through five assistive technologies · Exploratory · Case assumption")}
        point={tt("Assistive technologies let people use content their own way: a screen reader, text-to-speech, a reader view, text scaling, a stimulus filter. They all depend on a good base: real headings and buttons, real text in a clear order, layouts that can grow. Inclusive patterns and assistive technology work together.")}
        states={[
          { id: "reader", button: tt("Screen reader"), picture: <ATMock kind="reader" />, insight: tt("In plain words: the screen reader lists headings and buttons with their names, so people can jump to what they need.") },
          { id: "tts", button: tt("Text-to-speech"), picture: <ATMock kind="tts" />, insight: tt("In plain words: the notice read aloud, sentence by sentence. Press “Hear it”: many readers with dyslexia listen and read along.") },
          { id: "readermode", button: tt("Reader view"), picture: <ATMock kind="readermode" />, insight: tt("In plain words: the browser removes everything except the text. It works only if the content is real text, not text in pictures.") },
          { id: "zoom", button: tt("Text at 200 %"), picture: <ATMock kind="zoom" />, insight: tt("In plain words: the text doubles and wraps. Layouts with fixed boxes would cut it off.") },
          { id: "calm", button: tt("Stimulus filter"), picture: <ATMock kind="calm" />, insight: tt("In plain words: colours muted, offers hidden, the task alone. An app can offer this itself; an extension can do part of it.") },
        ]}
      />
      <div className="flex justify-center"><HearIt text={AT_TEXT()} /></div>
    </div>
  );
}

/* ------------------------------------------------------------------ A5 · three measures weighed (interactive) */

export function WeighFig() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    {
      id: "calm",
      name: tt("A calm start page: one next step, extras quiet, no movement"),
      cells: {
        effect: { level: 3, reason: tt("Everyone sees the task first; fewer abandoned meter readings.") },
        inclusion: { level: 3, reason: tt("Helps ADHD and sensory sensitivity most, and nobody loses.") },
        feasibility: { level: 3, reason: tt("One template and a decision about what moves down.") },
        risk: { level: 1, reason: tt("Marketing loses some banner space.") },
        time: { level: 3, reason: tt("It fits this quarter.") },
      },
    },
    {
      id: "easy",
      name: tt("An “easy mode” switch in the settings"),
      cells: {
        effect: { level: 1, reason: tt("Most people never find it; the busy default stays.") },
        inclusion: { level: 2, reason: tt("Helps the few who switch it on.") },
        feasibility: { level: 2, reason: tt("A second version of every screen to maintain.") },
        risk: { level: 2, reason: tt("It signals that the normal app is not for everyone.") },
        time: { level: 2, reason: tt("Two releases.") },
      },
    },
    {
      id: "steps",
      name: tt("Long forms as short steps with a position"),
      cells: {
        effect: { level: 3, reason: tt("Moving house and contract changes are finished more often.") },
        inclusion: { level: 3, reason: tt("Helps ADHD, dyslexia and anyone interrupted.") },
        feasibility: { level: 2, reason: tt("A shared step component; a few weeks.") },
        risk: { level: 1, reason: tt("Low, if the steps are few and named.") },
        time: { level: 2, reason: tt("The two most used forms fit this quarter.") },
      },
    },
  ];
  return (
    <Diagram label={tt("Hearth Energy weighs three measures on effect on users, gain for inclusion, feasibility, risk and time pressure · Case assumption, example company")}>
      <div className="space-y-3">
        <ThePoint>{tt("Calming the default and breaking long forms into steps help many minds at once; an “easy mode” helps the few who find it and leaves the default unchanged. Weigh each measure on the same criteria, with the reason next to each rating.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {(["calm", "easy", "steps"] as const).map((k, i) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{rows[i].name}</p>
            </div>
          ))}
        </div>
        <OptionGrid
          label={tt("Hearth Energy · three measures for the app")}
          caption={tt("Three measures for Hearth Energy (Case assumption, example company)")}
          rows={rows}
          cols={[
            { id: "effect", label: tt("Effect on users") },
            { id: "inclusion", label: tt("Gain for inclusion") },
            { id: "feasibility", label: tt("Feasibility") },
            { id: "risk", label: tt("Risk") },
            { id: "time", label: tt("Time pressure: fits the time") },
          ]}
          selected={sel}
          onSelect={setSel}
        />
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B1 · a special case or a better base (static) */

export function ArchitectureFig() {
  return (
    <CompareFig
      label={tt("Hearth Energy adding an “easy mode” on top, or building a calm base with patterns and modes")}
      left={tt("A special case on top")}
      right={tt("A better base for everyone")}
      rows={[
        [tt("The busy app stays; an “easy mode” is added in the settings."), tt("A guiding vision: calm, predictable, readable by default; adaptable on top.")],
        [tt("Each product invents its own simplified screens."), tt("Inclusive patterns in the design system: one main task, step-by-step forms, descriptive buttons.")],
        [tt("Nobody tests with neurodivergent customers."), tt("Key journeys are tested with neurodivergent people before release.")],
        [tt("The easy mode is used by few; complaints continue."), tt("Modes come after tests show who needs them; the default helps most people already.")],
      ]}
      caption={tt("At senior level, neurodiversity is not a special case but a dimension of the product architecture: build a better base, then offer modes on top.")}
    />
  );
}

export function LayersChainFig() {
  return (
    <ChainFig
      label={tt("The layers of a neurodiverse UX architecture, from a guiding vision to every product")}
      steps={[
        { h: tt("A guiding vision"), b: tt("“Calm, predictable and readable for every customer, also in a stressful moment; adaptable for those who need more.”"), kind: "m" },
        { h: tt("Principles"), b: tt("One main task per screen; the same patterns everywhere; plain, literal language; no movement unless asked."), kind: "a" },
        { h: tt("Patterns, modes and tests"), b: tt("Step-by-step forms, descriptive buttons, a quiet mode and a reading mode; tests with neurodivergent people."), kind: "a" },
        { h: tt("Every product"), b: tt("The app, the website, the customer portal, letters and e-mails."), kind: "s" },
      ]}
      caption={tt("Leaders decide on the left: the base, the principles and who owns them. Teams build on the right, from the patterns.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · three conflicts (interactive) */

export function ConflictFig() {
  const box = (title: string, body: string, who: string) => (
    <div role="img" aria-label={`${title}. ${body}. ${who}`} className="mx-auto max-w-[360px] space-y-2 rounded-lg border border-line bg-white p-3 text-caption text-ink">
      <p className="font-semibold">{title}</p>
      <p>{body}</p>
      <p className="text-ash">{who}</p>
    </div>
  );
  return (
    <StateFig
      label={tt("Three Hearth Energy decisions between conflicting goals · Exploratory · Case assumption")}
      point={tt("Standardisation, individualisation, economic viability, user diversity and test effort pull apart. Decide what belongs in the base, what becomes a mode, and whom to test with first, and say what you give up.")}
      states={[
        { id: "brand", button: tt("The lively brand"), picture: box(tt("A dynamic brand against a calm interface"), tt("Marketing wants animated offers on the start page. Decision: the brand lives in colour, illustration and tone; the start page shows one task, and offers move below it, still."), tt("Marketing for animation; UX and support for calm.")), insight: tt("In plain words: the brand stays recognisable without competing with the task. Animated offers are given up on the start page.") },
        { id: "mode", button: tt("An extra mode"), picture: box(tt("One standard against many modes"), tt("Some customers need more contrast, others softer colours. Decision: a calm standard for all, plus two modes (quiet, reading) after tests show who uses them."), tt("Engineering for one standard; research for modes.")), insight: tt("In plain words: modes cost design, building and testing each time. Two well-tested modes on a good base beat five untested ones.") },
        { id: "tests", button: tt("Whom to test with"), picture: box(tt("Test effort against the risk of not testing"), tt("Testing with every group is expensive. Decision: test the two most used journeys with six people, including people with ADHD, autistic people and people with dyslexia, before each major release."), tt("Finance for fewer tests; UX for more.")), insight: tt("In plain words: a small, well-chosen test finds most of the serious hurdles. Not testing finds them in the complaints.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for Hearth Energy (static) */

export function DecisionFig() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for Hearth Energy")}
      boxes={[
        [tt("What we decide"), tt("We calm the base first (one main task, consistent patterns, step-by-step forms) and do not ship the proposed “easy mode” switch now.")],
        [tt("What we do not know"), tt("How many customers are neurodivergent, and whether anyone would use a mode; we have never tested.")],
        [tt("When we would reverse it"), tt("If the first tests show a group still cannot complete the key journeys on the calm base; their mode comes next.")],
        [tt("What we give up"), tt("A quick “easy mode” announcement this quarter, and some animated offers.")],
      ]}
      rule={[
        [tt("Who owns neurodiverse UX"), tt("The head of UX owns the principles; the design system team owns the patterns; research owns the tests and may stop a release.")],
        [tt("How a conflict is decided"), tt("The customer's ability to complete a task in a stressful moment first, then the brand, then convenience; the board settles a tie.")],
      ]}
      caption={tt("An “easy mode” is easy to announce and easy to ignore. A better base, tested with real people, is harder to announce and helps more.")}
    />
  );
}
