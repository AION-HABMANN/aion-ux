"use client";

import { MateriA, MateriB } from "@/components/day15/Materi";
import { FocusSenseSim, LearningPulseSim, VisionMindSim } from "@/components/day15/sims";
import { ObserveDay15 } from "@/components/day15/observe";
import { Day15Experience } from "@/components/day15/Experience";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { OptionCards } from "@/components/sim/OptionCards";
import { ReferenceButton } from "@/components/sim/ReferencePlatform";
import { SimButton } from "@/components/sim/SimFrame";
import { REF_21, REF_31 } from "@/data/day15/reference";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Day 15 · the simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). FocusSense is a gaze recording you can replay as a scanpath, a heatmap
 * or areas of interest, with the plan's clues as switches; VisionMind Lab is the research board with its first heatmap and an overload detector demo. The plan's
 * description sits beside each as a numbered list that says what is there, never whether it is good or bad. Blocks 2.1 and 3.1 also open a real platform for the
 * class discussion (DL-STANDARD v1.9, section 16): Tobii's advice on eye-tracking in UX tests and the UK ICO's report on neurotechnology (data/day15/reference.ts).
 */
const NOTE = () => tt("Simulation · Case assumption: the platform, the recordings and the curves are made up from the plan's description; no camera or sensor is used · nothing here is marked right or wrong.");

/** The plan's description, one line per point. */
function Legend({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
      <p className="smallcaps text-ash">{title}</p>
      <ol className="mt-1 space-y-1">
        {items.map((s, i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#17212E] text-[11px] font-bold text-white">{i + 1}</span>
            <span><span className="sr-only">{tt(`Number ${i + 1}: `)}</span>{s}</span>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-ash">{tt("These say what is there, not whether it is good or bad. That is for you to say.")}</p>
    </div>
  );
}

function FocusSense() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of FocusSense you received")}
        items={[
          tt("Eye-tracking is to show which content users see first and where they get lost"),
          tt("A neurofeedback approach is to give hints on concentration phases and overload"),
          tt("First project sketches promise “objective truth data” about the user experience"),
          tt("The team wants to base design decisions strongly on measurement data in future"),
          tt("It is unclear how robust the data are in real situations of use"),
          tt("Data protection, ethics and acceptance have been considered only at the margin"),
        ]}
      />
      <SimButton label={tt("Open FocusSense and replay the gaze")} sub={tt("Replay Lena's gaze, switch to the heatmap and the areas of interest, then switch on the concentration curve, what Lena said, the real conditions and the consent screen.")} url="focussense.example/study/1" title={tt("Simulation: FocusSense")} note={NOTE()}>
        {() => <FocusSenseSim />}
      </SimButton>
    </div>
  );
}

/** A static mini-screen of each approach (no buttons: the thumbnail sits inside the option's own button). */
function Thumb({ which }: { which: "A" | "B" | "C" }) {
  const head = which === "A" ? "#7C2D12" : which === "B" ? "#0F766E" : "#1E3A5F";
  return (
    <div aria-hidden className="mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border border-line bg-white text-[9px] leading-tight text-[#26323F]">
      <div className="px-2 py-1 font-bold text-white" style={{ background: head }}>LearningPulse</div>
      <div className="space-y-1 p-1.5">
        {which === "A" && <div className="rounded bg-[#FDE7DA] px-1">📷🧠 Your focus: 58</div>}
        {which === "B" && <div className="rounded bg-[#CCFBF1] px-1">👁 Prototype test · 8 volunteers</div>}
        {which === "C" && <div>Technology radar · BCI: watch</div>}
      </div>
    </div>
  );
}

function Designs() {
  const note = tt("Simulation · Case assumption: the plan describes the three approaches only in words; the screens here are made up from those words · nothing here is marked right or wrong.");
  return (
    <OptionCards
      intro={tt("The plan describes three innovation approaches for LearningPulse, a learning platform. Each is drawn as the screen it would put in front of a learner or the team, so you can judge it for a broad group that is not prepared for neuro-based technology.")}
      options={[
        { id: "A", name: tt("Variant A"), thumb: <Thumb which="A" />, info: tt("Comprehensive eye-tracking and experimental neurofeedback to optimise attention and learning flow, but high effort and high interpretation risks."), simLabel: tt("Open variant A and try it"), simSub: tt("Watch the focus meter for a while."), url: "learningpulse.example/lesson/7", sim: () => <LearningPulseSim variant="A" />, note },
        { id: "B", name: tt("Variant B"), thumb: <Thumb which="B" />, info: tt("Targeted use of eye-tracking for prototype tests and interface analysis, without direct integration into the product."), simLabel: tt("Open variant B and try it"), simSub: tt("Read a study record."), url: "intranet.learningpulse.example/research", sim: () => <LearningPulseSim variant="B" />, note },
        { id: "C", name: tt("Variant C"), thumb: <Thumb which="C" />, info: tt("Exploratory observation of BCI technologies with little immediate product use, but low risk and high learning potential."), simLabel: tt("Open variant C and try it"), simSub: tt("Look at the technology radar."), url: "intranet.learningpulse.example/radar", sim: () => <LearningPulseSim variant="C" />, note },
      ]}
    />
  );
}

function VisionMind() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The observed problems of VisionMind Lab")}
        items={[
          tt("Research, innovation and product optimisation are mixed without a clear separation"),
          tt("A high gain in insight is hoped for without hypotheses and limits being clearly defined"),
          tt("It is unclear which methods can be used near the product and which only for exploration"),
          tt("Data protection, consent and acceptance are not yet addressed enough"),
          tt("Departments want fast results although the methods need much explanation and interpretation"),
          tt("There is no robust governance for neuro-based research"),
        ]}
      />
      <SimButton label={tt("Open VisionMind Lab's research board")} sub={tt("Read the four studies, open the first heatmap and how it was made, try the overload detector, and read the requests.")} url="intranet.visionmind.example/lab" title={tt("Simulation: VisionMind Lab's research board")} note={NOTE()}>
        {() => <VisionMindSim />}
      </SimButton>
      <ReferenceButton spec={REF_21()} />
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting")}
      sub={tt("The note from the management and what innovation, research, product, the data protection officer and the works council each say, with what the company records.")}
      url="mail.visionmind.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk")}
      note={tt("Simulation · Case assumption: the messages and the attachment are made up from the brief · nothing here is marked right or wrong.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · VisionMind")}
          messages={[
            { from: tt("Management"), subject: tt("Neuro, responsibly"), body: [tt("We want to extend our UX research with eye-tracking, neurofeedback and, later, BCI-near approaches. Our innovation leads see great potential for differentiation and deeper insight; data protection, ethics and market maturity have not been structured."), tt("We expect a sound strategy for building this close to research, responsibly and steerably. The budget is limited, stakeholders want different things, maturity varies strongly, ethical sensitivity is high, acceptance data is patchy, first pilots must be set up soon, and wrong decisions can cost reputation, money and trust. And yes: I would like to present “neuro-UX” at our customer event.")] },
            { from: tt("Innovation lead"), subject: tt("Let's not fall behind"), body: [tt("Competitors talk about neuro-UX. The lab has three ideas ready. Open the board to see them.")], attachments: [{ name: "intranet.visionmind.example/lab", kind: "link", node: <VisionMindSim /> }] },
            { from: tt("UX research"), subject: tt("Before we measure"), body: [tt("We can run good eye-tracking studies if each one answers a question. We have never analysed EEG; I'd want a university partner for that.")] },
            { from: tt("Product"), subject: tt("Overload score"), body: [tt("If the score works, pages could simplify themselves. Can we have it in the portal next quarter?")] },
            { from: tt("Data protection officer"), subject: tt("Neurodata"), body: [tt("Gaze and brain data are highly sensitive. I need purpose, legal basis, consent text, storage and deletion before any study. The lunch test had none of these.")] },
            { from: tt("Works council"), subject: tt("Staff as test subjects"), body: [tt("Colleagues must not be measured because a manager asked. Any study with staff needs our agreement.")] },
            { from: tt("Strategy office"), subject: tt("What we know"), body: [tt("The data is patchy. The sheet shows what we have.")], attachments: [{ name: "what-we-know.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the company knows today (Case assumption)")}
                head={[tt("Data"), tt("Available?")]}
                rows={[
                  [tt("Where customers give up in the portal"), tt("partly")],
                  [tt("Why they give up"), tt("not recorded")],
                  [tt("Experience in analysing gaze or EEG data"), tt("none")],
                  [tt("Consent text for neurodata"), tt("none exists")],
                  [tt("Customer acceptance of attention measurement"), tt("never asked")],
                  [tt("Evidence grade for research findings"), tt("none exists")],
                ]}
              />
            ) }] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = {
  MateriA,
  MateriB,
  experience: (route) => <Day15Experience route={route} />,
  slots: {
    focussense: () => <FocusSense />,
    designs: () => <Designs />,
    visionmind: () => <VisionMind />,
    desk: () => <Desk />,
    observe: () => <ObserveDay15 />,
    reference: () => <ReferenceButton spec={REF_31()} />,
  },
};
