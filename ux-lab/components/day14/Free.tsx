"use client";

import { MateriA, MateriB } from "@/components/day14/Materi";
import { BuildVisionSim, HealthSpaceSim, IndustryXRSim } from "@/components/day14/sims";
import { ObserveDay14 } from "@/components/day14/observe";
import { Day14Experience } from "@/components/day14/Experience";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { OptionCards } from "@/components/sim/OptionCards";
import { ReferenceButton } from "@/components/sim/ReferencePlatform";
import { SimButton } from "@/components/sim/SimFrame";
import { REF_21, REF_31 } from "@/data/day14/reference";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Day 14 · the simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). BuildVision is a real 3D device with AR labels and the plan's clues as
 * switches; IndustryXR is the pilot board with a 3D training demo. The plan's description sits beside each as a numbered list that says what is there, never whether
 * it is good or bad. Blocks 2.1 and 3.1 also open a real platform for the class discussion (DL-STANDARD v1.9, section 16): Apple's guidelines for immersive
 * experiences and the GOV.UK Service Manual (data/day14/reference.ts).
 */
const NOTE = () => tt("Simulation · Case assumption: the platform and its contents are made up from the plan's description; the 3D object is a generic model · nothing here is marked right or wrong.");

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

function BuildVision() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of BuildVision you received")}
        items={[
          tt("Employees can see maintenance steps as AR overlays directly on the device"),
          tt("Complex procedures are visualised in space instead of as a PDF or checklist"),
          tt("A support mode allows remote guidance by experts"),
          tt("First tests show users are impressed, but partly overwhelmed in stressful situations"),
          tt("The technology is powerful, but not stably available in all environments"),
          tt("Some use cases seem useful, others more demonstrative than really helpful"),
        ]}
      />
      <SimButton label={tt("Open BuildVision and try it")} sub={tt("Turn the device, compare AR with the PDF, call the remote expert, then switch on the stressful situation, the weak connection and the show mode.")} url="buildvision.example/service/SV-22" title={tt("Simulation: BuildVision")} note={NOTE()}>
        {() => <BuildVisionSim />}
      </SimButton>
    </div>
  );
}

/** A static mini-screen of each approach (no buttons: the thumbnail sits inside the option's own button). */
function Thumb({ which }: { which: "A" | "B" | "C" }) {
  const head = which === "A" ? "#4C1D95" : which === "B" ? "#0F766E" : "#1E3A5F";
  return (
    <div aria-hidden className="mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border border-line bg-white text-[9px] leading-tight text-[#26323F]">
      <div className="px-2 py-1 font-bold text-white" style={{ background: head }}>HealthSpace</div>
      <div className="space-y-1 p-1.5">
        {which === "A" && <div className="rounded bg-[#EDE9FE] px-1">🥽 Enter your immersive health world</div>}
        {which === "B" && <div className="rounded bg-[#CCFBF1] px-1">📱 AR: practise your inhaler, step 1 of 4</div>}
        {which === "C" && <div>Your plan · video · guide · call</div>}
      </div>
    </div>
  );
}

function Designs() {
  const note = tt("Simulation · Case assumption: the plan describes the three approaches only in words; the screens here are made up from those words · nothing here is marked right or wrong.");
  return (
    <OptionCards
      intro={tt("The plan describes three innovation approaches for HealthSpace, a health and prevention platform. Each is drawn as the screen a patient would meet first, so you can judge it as someone who is not always at home with technology.")}
      options={[
        { id: "A", name: tt("Variant A"), thumb: <Thumb which="A" />, info: tt("Strongly immersive, with AR and VR components for counselling, training and motivation, but a high technical and organisational effort."), simLabel: tt("Open variant A and try it"), simSub: tt("Start the VR counselling."), url: "healthspace.example/xr", sim: () => <HealthSpaceSim variant="A" />, note },
        { id: "B", name: tt("Variant B"), thumb: <Thumb which="B" />, info: tt("Single immersive elements for clearly defined situations, with high practical relevance and a controllable scope."), simLabel: tt("Open variant B and try it"), simSub: tt("Practise the inhaler technique."), url: "healthspace.example/inhaler", sim: () => <HealthSpaceSim variant="B" />, note },
        { id: "C", name: tt("Variant C"), thumb: <Thumb which="C" />, info: tt("Classic UX for now, with preparatory technology monitoring and later piloting."), simLabel: tt("Open variant C and try it"), simSub: tt("Look at your prevention plan."), url: "healthspace.example/plan", sim: () => <HealthSpaceSim variant="C" />, note },
      ]}
    />
  );
}

function IndustryXR() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The observed problems of IndustryXR")}
        items={[
          tt("It is unclear which use cases really offer immersive value"),
          tt("Single pilot ideas are technically exciting, but hardly prioritised by effect and benefit"),
          tt("Stakeholders pursue divergent goals between innovation, safety, efficiency and cost control"),
          tt("Usage risks such as overload, technical failures and acceptance problems are not assessed enough"),
          tt("The link between technical fascination and strategic relevance is unclear"),
          tt("There is no robust roadmap for introduction, testing and scaling"),
        ]}
      />
      <SimButton label={tt("Open IndustryXR's pilot board")} sub={tt("Read the five pilot ideas and the comments, look at the roadmap, and open the VR training demo.")} url="intranet.industryxr.example/innovation" title={tt("Simulation: IndustryXR's innovation board")} note={NOTE()}>
        {() => <IndustryXRSim />}
      </SimButton>
      <ReferenceButton spec={REF_21()} />
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting")}
      sub={tt("The note from the management and what the innovation lab, service, training, safety and finance each say, with what the company records.")}
      url="mail.industryxr.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk")}
      note={tt("Simulation · Case assumption: the messages and the attachment are made up from the brief · nothing here is marked right or wrong.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · IndustryXR")}
          messages={[
            { from: tt("Management"), subject: tt("The future, responsibly"), body: [tt("We want to extend our UX strategy with immersive technologies and neuroscience-informed interaction. AR, VR and other future technologies are a great chance for us, but we lack clear priorities, evaluation standards and governance."), tt("We expect a sound strategy for bringing future technologies with real user value, controlled risk and economic viability into our UX portfolio. The budget is limited, stakeholders want different things, maturity varies strongly by use case, data on real acceptance is patchy, first pilots must be visible soon, and wrong decisions can raise costs, frustration and reputational damage. And yes: I would like a headset demo at the spring fair.")] },
            { from: tt("Innovation lab"), subject: tt("Five demos ready"), body: [tt("We have five strong demos. With budget, we can take all of them further this year. Open the board to see them.")], attachments: [{ name: "intranet.industryxr.example/innovation", kind: "link", node: <IndustryXRSim /> }] },
            { from: tt("Service"), subject: tt("What we need"), body: [tt("Half of our engineers' trips are explanations. Remote help and step-by-step guidance at the machine would save days. We don't need holograms.")] },
            { from: tt("Safety"), subject: tt("Headsets"), body: [tt("No headsets near moving machines. Any VR training must be tested for motion sickness before staff use it.")] },
            { from: tt("Finance"), subject: tt("Show me the numbers"), body: [tt("Nobody can tell me what any of the lab's demos saved or earned. Before more money, I want success measures.")] },
            { from: tt("Strategy office"), subject: tt("What we know"), body: [tt("The data is patchy. The sheet shows what we have.")], attachments: [{ name: "what-we-know.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the company knows today (Case assumption)")}
                head={[tt("Data"), tt("Available?")]}
                rows={[
                  [tt("Service trips per month"), tt("yes")],
                  [tt("Trips a remote call could replace"), tt("not recorded")],
                  [tt("Acceptance of AR or VR in daily work"), tt("not tested")],
                  [tt("Success measures for lab demos"), tt("none set")],
                  [tt("Network at customer sites"), tt("often missing")],
                  [tt("An evaluation grid for new technologies"), tt("none exists")],
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
  experience: (route) => <Day14Experience route={route} />,
  slots: {
    buildvision: () => <BuildVision />,
    designs: () => <Designs />,
    industryxr: () => <IndustryXR />,
    desk: () => <Desk />,
    observe: () => <ObserveDay14 />,
    reference: () => <ReferenceButton spec={REF_31()} />,
  },
};
