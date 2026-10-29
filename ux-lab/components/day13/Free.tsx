"use client";

import { MateriA, MateriB } from "@/components/day13/Materi";
import { JobAccessSim, LifeGuideSim, StudyPathSim } from "@/components/day13/sims";
import { ObserveDay13 } from "@/components/day13/observe";
import { Day13Experience } from "@/components/day13/Experience";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { OptionCards } from "@/components/sim/OptionCards";
import { ReferenceButton } from "@/components/sim/ReferencePlatform";
import { SimButton } from "@/components/sim/SimFrame";
import { REF_21, REF_31 } from "@/data/day13/reference";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Day 13 · the simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). StudyPath and LifeGuide carry the plan's load factors for real, with
 * the plan's description beside them as a numbered list that says what is there, never whether it is good or bad. Blocks 2.1 and 3.1 also open a real platform for
 * the class discussion (DL-STANDARD v1.9, section 16): the UK Home Office's accessibility posters and the W3C's “Making Content Usable” (data/day13/reference.ts).
 */
const NOTE = () => tt("Simulation · Case assumption: the platform and its contents are made up from the plan's description · its loads are built in on purpose and stay inside this window · nothing here is marked right or wrong.");

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

function StudyPath() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of StudyPath you received")}
        items={[
          tt("The start page shows many hints, colours, notifications and action areas at the same time"),
          tt("Important tasks are not clearly prioritised"),
          tt("Navigation and page structure vary between course areas"),
          tt("Texts are long, densely set and complex in language"),
          tt("Forms contain many required fields and little supportive help in between"),
          tt("Status messages and interaction feedback are partly short and unclear"),
        ]}
      />
      <SimButton label={tt("Open StudyPath and try it")} sub={tt("Use it as a learner: find what is due this week, open both courses, read a text, and register for the exam.")} url="studypath.example/dashboard" title={tt("Simulation: StudyPath")} note={NOTE()}>
        {() => <StudyPathSim />}
      </SimButton>
    </div>
  );
}

/** A static mini-screen of each design (no buttons: the thumbnail sits inside the option's own button). */
function Thumb({ which }: { which: "A" | "B" | "C" }) {
  return (
    <div aria-hidden className="mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border border-line bg-white text-[9px] leading-tight text-[#26323F]">
      <div className="px-2 py-1 font-bold text-white" style={{ background: which === "A" ? "#0F172A" : which === "B" ? "#1F4E5F" : "#6D28D9" }}>JobAccess</div>
      <div className="space-y-1 p-1.5">
        {which === "A" && <div className="grid grid-cols-3 gap-0.5">{Array.from({ length: 6 }, (_, i) => <div key={i} className="h-3 rounded bg-[#334155]" />)}</div>}
        {which === "B" && <><div className="font-semibold">My applications</div><div className="rounded border border-[#1F4E5F] px-1">Next step: interview Tue</div></>}
        {which === "C" && <><div className="font-semibold">My applications</div><div>Display ▾ reading · calm · simple</div></>}
      </div>
    </div>
  );
}

function Designs() {
  const note = tt("Simulation · Case assumption: the plan describes the three designs only in words; the pages here are made up from those words · nothing here is marked right or wrong.");
  return (
    <OptionCards
      intro={tt("The plan describes three ways to develop JobAccess, a platform for applications, further training and career planning. Each is built here as the words say, as the same “My applications” page, so you can compare how calm, predictable and adaptable it is.")}
      options={[
        { id: "A", name: tt("Variant A"), thumb: <Thumb which="A" />, info: tt("Visually modern and compact, but information-dense and with changing navigation patterns."), simLabel: tt("Open variant A and try it"), simSub: tt("Switch between applications and courses; watch the navigation."), url: "jobaccess.example/me?variant=A", sim: () => <JobAccessSim variant="A" />, note },
        { id: "B", name: tt("Variant B"), thumb: <Thumb which="B" />, info: tt("Clearly structured, calm, readable and consistent, but less dynamic and less brand-strong."), simLabel: tt("Open variant B and try it"), simSub: tt("Switch between applications and courses."), url: "jobaccess.example/me?variant=B", sim: () => <JobAccessSim variant="B" />, note },
        { id: "C", name: tt("Variant C"), thumb: <Thumb which="C" />, info: tt("A good base structure with optional adaptation functions such as a reading mode, stimulus reduction and a simplified view, but a higher implementation effort."), simLabel: tt("Open variant C and try it"), simSub: tt("Open “Display” and try the three modes."), url: "jobaccess.example/me?variant=C", sim: () => <JobAccessSim variant="C" />, note },
      ]}
    />
  );
}

function LifeGuide() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The observed problems of LifeGuide")}
        items={[
          tt("Many simultaneous stimuli and competing information areas on central pages"),
          tt("Inconsistent navigation patterns and low predictability"),
          tt("Texts are correct in content, but hard to access in language and typography"),
          tt("Forms are long and structured with little support"),
          tt("Error messages and feedback help too little in stressful situations"),
          tt("There are no options to reduce stimuli or simplify the display"),
        ]}
      />
      <SimButton label={tt("Open LifeGuide and try it")} sub={tt("Use it as someone looking for support: find an offer near you, book a counselling appointment, and send the form with a field left empty.")} url="lifeguide.example" title={tt("Simulation: LifeGuide today")} note={NOTE()}>
        {() => <LifeGuideSim />}
      </SimButton>
      <ReferenceButton spec={REF_21()} />
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting")}
      sub={tt("The note from the management and what marketing, the product team, the design system team, user research and support each say, with what the organisation records.")}
      url="mail.lifeguide.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk")}
      note={tt("Simulation · Case assumption: the messages and the attachment are made up from the brief · nothing here is marked right or wrong.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · LifeGuide")}
          messages={[
            { from: tt("Management"), subject: tt("Usable for every mind"), body: [tt("Our website, portal and app are formally accessible, but not yet usable enough for people with different cognitive and sensory needs. Complaints about overload, unclarity and reading difficulties are rising. Some say extra options are enough; others say the base of the product must change."), tt("We expect a sound strategy for building neurodiverse requirements, inclusive design patterns, assistive technologies and testing systematically into our UX architecture. The budget is limited, stakeholders want different things, not all systems can change at once, test data is patchy, legal, reputational and quality requirements matter, first improvements must show soon, and wrong decisions can increase exclusion, support effort and loss of trust.")] },
            { from: tt("Marketing"), subject: tt("Keep it lively"), body: [tt("Our app has to feel warm and alive. Animated offers and stories are how we stand out. Please do not turn it into a form.")] },
            { from: tt("Product team"), subject: tt("A quick win"), body: [tt("We can ship an easy mode switch in the settings this quarter: fewer colours, larger text. That would answer the complaints quickly.")] },
            { from: tt("Design system team"), subject: tt("Nobody owns us"), body: [tt("We have a design system, but every product changes it. If you want consistency, someone has to own the patterns and say no to exceptions.")] },
            { from: tt("User research"), subject: tt("What we have not done"), body: [tt("We have never tested with neurodivergent users. We could test the two main journeys with six people in four weeks, with a quiet room and breaks. Open the portal to see what they would meet.")], attachments: [{ name: "lifeguide.example", kind: "link", node: <LifeGuideSim /> }] },
            { from: tt("Support"), subject: tt("What we know"), body: [tt("Our data is patchy. The sheet shows what we have.")], attachments: [{ name: "what-we-know.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the organisation knows today (Case assumption)")}
                head={[tt("Data"), tt("Available?")]}
                rows={[
                  [tt("Complaints about overload, unclarity, reading"), tt("counted, not sorted")],
                  [tt("Booking form: started against sent"), tt("yes, reason unknown")],
                  [tt("Tests with neurodivergent users"), tt("none")],
                  [tt("Who owns the design system"), tt("nobody")],
                  [tt("Use of an easy mode"), tt("unknown, not built")],
                  [tt("Who is neurodivergent"), tt("unknown, and not to be asked")],
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
  experience: (route) => <Day13Experience route={route} />,
  slots: {
    studypath: () => <StudyPath />,
    designs: () => <Designs />,
    lifeguide: () => <LifeGuide />,
    desk: () => <Desk />,
    observe: () => <ObserveDay13 />,
    reference: () => <ReferenceButton spec={REF_31()} />,
  },
};
