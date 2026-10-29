"use client";

import { MateriA, MateriB } from "@/components/day16/Materi";
import { FutureHubSim, InnovationWikiSim, NextWorldSim, RealityFlowSim } from "@/components/day16/sims";
import { ObserveDay16 } from "@/components/day16/observe";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { OptionCards } from "@/components/sim/OptionCards";
import { ReferenceButton } from "@/components/sim/ReferencePlatform";
import { SimButton } from "@/components/sim/SimFrame";
import { REF_21, REF_31 } from "@/data/day16/reference";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Day 16 · the simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). RealityFlow shows three prototypes with real 3D and a real work
 * situation; NextWorld UX is the decision board with three reports in three formats. The plan's description sits beside each as a numbered list that says what is
 * there, never whether it is good or bad. Blocks 2.1 and 3.1 also open a real platform for the class discussion (DL-STANDARD v1.9, section 16): Meta's store
 * policies for VR apps and the European Commission's page on the AI Act (data/day16/reference.ts).
 */
const NOTE = () => tt("Simulation · Case assumption: the platform and its contents are made up from the plan's description; the 3D objects are generic models · nothing here is marked right or wrong.");

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

function RealityFlow() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of RealityFlow you received")}
        items={[
          tt("The company wants to combine AR-supported service processes, immersive training modules and neuro-informed interaction analyses"),
          tt("First prototypes attract great attention, but their usability in real work situations is still unclear"),
          tt("The management wants visible innovation signals; the departments demand robust practical fitness"),
          tt("Data protection, ethical questions and user acceptance have only been addressed roughly"),
          tt("Single pilot ideas exist, but no clear test and scaling logic"),
          tt("The company is already discussing broad investments, although central assumptions are not yet secured"),
        ]}
      />
      <SimButton label={tt("Open RealityFlow and try the prototypes")} sub={tt("Turn the AR service device and the training machine, look at the interaction analysis, then take them into a real work situation and read the notes and the investment proposal.")} url="showcase.realityflow.example" title={tt("Simulation: RealityFlow")} note={NOTE()}>
        {() => <RealityFlowSim />}
      </SimButton>
    </div>
  );
}

/** A static mini-screen of each option (no buttons: the thumbnail sits inside the option's own button). */
function Thumb({ which }: { which: "A" | "B" | "C" }) {
  const head = which === "A" ? "#B91C1C" : which === "B" ? "#0F766E" : "#334155";
  return (
    <div aria-hidden className="mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border border-line bg-white text-[9px] leading-tight text-[#26323F]">
      <div className="px-2 py-1 font-bold text-white" style={{ background: head }}>FutureInteraction Hub</div>
      <div className="space-y-1 p-1.5">
        {which === "A" && <div className="rounded bg-[#FEE2E2] px-1">7 functions · 5 areas · Q1</div>}
        {which === "B" && <div className="rounded bg-[#CCFBF1] px-1">2 pilots · tests · gates</div>}
        {which === "C" && <div>Watch list · reviews twice a year</div>}
      </div>
    </div>
  );
}

function Designs() {
  const note = tt("Simulation · Case assumption: the plan describes the three options only in words; the plans here are made up from those words · nothing here is marked right or wrong.");
  return (
    <OptionCards
      intro={tt("The plan describes three strategy options for FutureInteraction Hub, a platform. Each is drawn as the plan it would put on the table, so you can judge it under a limited budget and patchy data.")}
      options={[
        { id: "A", name: tt("Option A"), thumb: <Thumb which="A" />, info: tt("Fast, broad introduction of immersive pilot functions in several areas: high innovation pressure, but higher risks for consistency, acceptance and governance."), simLabel: tt("Open option A and look at it"), simSub: tt("The launch board."), url: "hub.example/launch", sim: () => <FutureHubSim option="A" />, note },
        { id: "B", name: tt("Option B"), thumb: <Thumb which="B" />, info: tt("Focused piloting of a few clearly prioritised future applications with a strong test and ethics framework."), simLabel: tt("Open option B and look at it"), simSub: tt("The pilot plan."), url: "hub.example/pilots", sim: () => <FutureHubSim option="B" />, note },
        { id: "C", name: tt("Option C"), thumb: <Thumb which="C" />, info: tt("A waiting strategy with observation, research and little immediate implementation: lower risk and lower visibility."), simLabel: tt("Open option C and look at it"), simSub: tt("The research radar."), url: "hub.example/radar", sim: () => <FutureHubSim option="C" />, note },
      ]}
    />
  );
}

function NextWorld() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The observed problems of NextWorld UX")}
        items={[
          tt("The prototypes were developed with different depth and without a common evaluation logic"),
          tt("User feedback exists but is not systematically comparable"),
          tt("Ethical and organisational implications were handled differently in the single projects"),
          tt("Some pilot ideas attract strong attention but have only limited practical use"),
          tt("Investment decisions are under time pressure, although maturity varies strongly"),
          tt("An overarching future strategy and governance structure is missing"),
        ]}
      />
      <SimButton label={tt("Open NextWorld UX's decision board")} sub={tt("Read the three prototype reports, put them on one grid, read the feedback, and sort them in the sandbox.")} url="intranet.nextworld.example/decide" title={tt("Simulation: NextWorld UX's decision board")} note={NOTE()}>
        {() => <NextWorldSim />}
      </SimButton>
      <ReferenceButton spec={REF_21()} />
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting")}
      sub={tt("The note from the management and what innovation, IT, the department, data protection and the works council each say, with what the company records.")}
      url="mail.nextworld.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk")}
      note={tt("Simulation · Case assumption: the messages and the attachment are made up from the brief · nothing here is marked right or wrong.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · NextWorld")}
          messages={[
            { from: tt("Management"), subject: tt("From experiments to strategy"), body: [tt("We have several prototypes and pilots on immersive, AI-supported and neuro-based interaction, but no portfolio logic. We expect a long-term strategy that connects innovation, user value, ethics, economic viability and our ability to learn."), tt("The budget is limited, not all lines can continue, data on use, effect and acceptance is incomplete, and reputation and investment are at stake. First decisions must show soon, but not at the cost of our long-term capacity to innovate. And yes: I would like an AR headline at the spring trade fair.")] },
            { from: tt("Innovation"), subject: tt("Keep the momentum"), body: [tt("All five lines have potential. Cutting now would send the wrong signal. The wiki has the details.")], attachments: [{ name: "wiki.nextworld.example", kind: "link", node: <InnovationWikiSim /> }] },
            { from: tt("IT"), subject: tt("Five platforms"), body: [tt("Five lines, five vendors, five update cycles. We can support three at most.")] },
            { from: tt("Customer service"), subject: tt("What customers say"), body: [tt("The chat is used a lot; customers ask whether it is a person. The AR advice gets praise in week one and silence after.")] },
            { from: tt("Data protection"), subject: tt("Two lines worry me"), body: [tt("The neuro-informed study ran without consent, and the emotion-adaptive learning module reads employees' faces. The second may not be allowed at all.")] },
            { from: tt("Works council"), subject: tt("The staff academy"), body: [tt("We were not consulted about the emotion-adaptive module. We will not agree to a pilot with employees.")] },
            { from: tt("Strategy office"), subject: tt("What we know"), body: [tt("The data is incomplete. The sheet shows what we have.")], attachments: [{ name: "what-we-know.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the company knows today (Case assumption)")}
                head={[tt("Data"), tt("Available?")]}
                rows={[
                  [tt("Spend per line"), tt("yes")],
                  [tt("Results per line on one scale"), tt("not recorded")],
                  [tt("Repeat use of each feature"), tt("chat only")],
                  [tt("Ethics review per line"), tt("1 of 5")],
                  [tt("Customer acceptance of the new features"), tt("never asked")],
                  [tt("A process for stopping a line"), tt("none exists")],
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
  slots: {
    realityflow: () => <RealityFlow />,
    designs: () => <Designs />,
    nextworld: () => <NextWorld />,
    desk: () => <Desk />,
    observe: () => <ObserveDay16 />,
    reference: () => <ReferenceButton spec={REF_31()} />,
  },
};
