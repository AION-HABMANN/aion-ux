"use client";

import { useId } from "react";
import { MateriA, MateriB } from "@/components/day8/Materi";
import { JourneyThumb } from "@/components/day8/mocks";
import { GreenHomeSim, ShotOf, SkillsSim, StartSmartSim } from "@/components/day8/sims";
import { ObserveDay8 } from "@/components/day8/observe";
import { Diagram } from "@/components/materi/kit";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Day 8 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). Each picture is the real screen drawn by the same components
 * as the simulation, with dark numbered markers at the places the plan's description names; the markers say what is there, never whether it is good or bad.
 */
const NOTE = () => tt("Simulation · Case assumption: the product and its contents are made up from the plan's description · nothing here is marked right or wrong.");

type Shot = { which: "startsmart" | "greenhome"; page: string; name: string; desc: string };

function Shots({ label, items }: { label: string; items: Shot[] }) {
  const uid = useId().replace(/:/g, "");
  return (
    <Diagram label={label}>
      <div className={items.length > 1 ? "mx-auto grid max-w-[760px] grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2" : "mx-auto max-w-[420px]"}>
        {items.map((x) => (
          <figure key={`${x.which}-${x.page}`} className="min-w-0">
            <div role="img" aria-labelledby={`${uid}-${x.which}-${x.page}-t`} aria-describedby={`${uid}-${x.which}-${x.page}-d`}>
              <span id={`${uid}-${x.which}-${x.page}-d`} className="sr-only">{x.desc}</span>
              <Fit><ShotOf which={x.which} page={x.page} /></Fit>
            </div>
            <figcaption id={`${uid}-${x.which}-${x.page}-t`} className="mt-1 text-center text-[12.5px] font-bold text-ink">{x.name}</figcaption>
          </figure>
        ))}
      </div>
    </Diagram>
  );
}

/** The plan's description, one line per number in the pictures. */
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

function StartSmart() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of StartSmart you received")}
        items={[
          tt("The platform offers much information, but without a recognisable user journey"),
          tt("The entry explains functions, but not the user's path or goal"),
          tt("Between the individual steps there are no transitions or motivating stopovers"),
          tt("There are no visible hints of progress or milestones reached"),
          tt("Help and information seem factual, but do not connect to the user's situation"),
          tt("Successful intermediate steps are not picked up emotionally or dramatically"),
        ]}
      />
      <Shots
        label={tt("StartSmart, as the platform shows it · Case assumption: the platform is made up from the plan's description")}
        items={[
          { which: "startsmart", page: "start", name: tt("StartSmart · the start page"), desc: tt("The start page: the heading StartSmart · functions, one line listing everything on offer, and nine links of equal weight. Numbers 1 and 2 mark the places the description names.") },
          { which: "startsmart", page: "app1", name: tt("StartSmart · the funding application"), desc: tt("The first page of the application: the heading Funding application with no step number, three fields, Save, and small Next and Help links. Numbers 3 and 4 mark the places the description names.") },
          { which: "startsmart", page: "help", name: tt("StartSmart · help"), desc: tt("The help page: a note about guidelines, deadlines and incomplete applications. Number 5 marks the place the description names.") },
          { which: "startsmart", page: "done", name: tt("StartSmart · after the application"), desc: tt("One line: your data has been saved, and a link to the start. Number 6 marks the place the description names.") },
        ]}
      />
      <SimButton label={tt("Open StartSmart and try it")} sub={tt("Use it as a founder: find out what you need and complete the funding application.")} url="startsmart.example/start" title={tt("Simulation: StartSmart")} note={NOTE()}>
        {() => <StartSmartSim />}
      </SimButton>
    </div>
  );
}

function Journeys() {
  const note = tt("Simulation · Case assumption: the plan describes the three journeys only in words; the platforms here are made up from those words · nothing here is marked right or wrong.");
  return (
    <OptionCards
      intro={tt("The plan describes three journeys for FutureSkills, a further-training platform. Each is built here as the words say, so you can try it as a working person with little time.")}
      options={[
        { id: "A", name: tt("Variant A"), thumb: <JourneyThumb kind="A" />, info: tt("Factual and efficient, clear steps, but little emotional embedding or motivation."), simLabel: tt("Open variant A and try it"), simSub: tt("Enrol in a course that fits your goal."), url: "futureskills.example/enrol?variant=A", sim: () => <SkillsSim variant="A" />, note },
        { id: "B", name: tt("Variant B"), thumb: <JourneyThumb kind="B" />, info: tt("Strongly narrative and emotionally activating, but with more text and longer guidance."), simLabel: tt("Open variant B and try it"), simSub: tt("Enrol in a course that fits your goal."), url: "futureskills.example/enrol?variant=B", sim: () => <SkillsSim variant="B" />, note },
        { id: "C", name: tt("Variant C"), thumb: <JourneyThumb kind="C" />, info: tt("A balanced mix of clarity, motivating address and visible progress, but with a somewhat higher implementation effort."), simLabel: tt("Open variant C and try it"), simSub: tt("Enrol in a course that fits your goal."), url: "futureskills.example/enrol?variant=C", sim: () => <SkillsSim variant="C" />, note },
      ]}
    />
  );
}

function GreenHome() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The observed problems of the current onboarding")}
        items={[
          tt("The entry explains functions, but not the personal benefit or the goal for users"),
          tt("The sequence of steps feels administrative rather than developmental"),
          tt("Intermediate states and progress are barely visible"),
          tt("Help and hints explain, but do not motivate"),
          tt("Finishing a step does not feel like progress"),
          tt("The whole flow feels like a form process rather than an accompanied journey"),
        ]}
      />
      <Shots
        label={tt("The GreenHome onboarding today · Case assumption: the onboarding is made up from the plan's description")}
        items={[
          { which: "greenhome", page: "start", name: tt("GreenHome · the entry"), desc: tt("The entry: the heading GreenHome onboarding, a line of functions, a list of five sections from A to E, the sentence that all sections must be completed, and Begin. Numbers 1 and 6 mark the places the description names.") },
          { which: "greenhome", page: "a", name: tt("GreenHome · Section A"), desc: tt("Section A · Property data: a faint Page 1, five fields and a note explaining the year of construction and the living area by the guidelines. Numbers 2, 3 and 4 mark the places the description names.") },
          { which: "greenhome", page: "adone", name: tt("GreenHome · after Section A"), desc: tt("One line: Section A completed, continue with Section B, and a Continue link. Number 5 marks the place the description names.") },
        ]}
      />
      <SimButton label={tt("Open GreenHome and try it")} sub={tt("Use it as a homeowner: go through the onboarding from the entry to the summary.")} url="greenhome.example/onboarding" title={tt("Simulation: the GreenHome onboarding today")} note={NOTE()}>
        {() => <GreenHomeSim />}
      </SimButton>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting")}
      sub={tt("The note from the management and what marketing, the specialist department and support each want, with what the company records.")}
      url="mail.greenhome.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk")}
      note={tt("Simulation · Case assumption: the messages and the attachment are made up from the brief · nothing here is marked right or wrong.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · GreenHome")}
          messages={[
            { from: tt("Management"), subject: tt("Tasks done, journeys forgotten"), body: [tt("Our digital processes work, but they create little relevance and bond. Customers complete their tasks but experience the journey as administrative, interchangeable and not very motivating. Inside the company, storytelling is seen only as a means of communication."), tt("We expect a sound strategy for integrating narrative structure and dramaturgical guidance systematically into our digital offers. The budget is limited, specialist clarity must not be lost, not all journeys can be revised at once, the data is partly incomplete, and first improvements must show soon. Wrong decisions can lengthen processes, weaken credibility or deter users.")] },
            { from: tt("Marketing"), subject: tt("Our story, everywhere"), body: [tt("Our brand story works on the website. Let us bring it into the platform: a film at the start of the onboarding and our story between the sections.")] },
            { from: tt("Specialist department"), subject: tt("Clarity"), body: [tt("The funding rules are complex and must stay exact. No story may make a requirement look optional or a deadline look soft.")] },
            { from: tt("Support"), subject: tt("What I hear"), body: [tt("Most calls are “how much more is there?” and “what do I get at the end?”. Open the link to see the onboarding as a customer does.")], attachments: [{ name: "greenhome.example/onboarding", kind: "link", node: <GreenHomeSim /> }] },
            { from: tt("Product team, self-service"), subject: tt("Our flows"), body: [tt("We build each flow from the specialist logic, field by field. Nobody has ever told us how a journey should begin or end.")] },
            { from: tt("Analytics"), subject: tt("What we can see"), body: [tt("The data is partly incomplete. The sheet shows what we have.")], attachments: [{ name: "what-the-company-records.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the company records today (Case assumption)")}
                head={[tt("Data"), tt("Recorded?")]}
                rows={[
                  [tt("Subjects of support contacts"), tt("yes")],
                  [tt("Onboarding starts and completions"), tt("yes")],
                  [tt("The section where people stop"), tt("no")],
                  [tt("Submissions per self-service flow"), tt("yes, per team")],
                  [tt("User tests of any journey"), tt("none")],
                  [tt("Patterns for entries, progress or endings"), tt("none exist")],
                ]}
              />
            ) }] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { startsmart: () => <StartSmart />, journeys: () => <Journeys />, greenhome: () => <GreenHome />, desk: () => <Desk />, observe: () => <ObserveDay8 /> } };
