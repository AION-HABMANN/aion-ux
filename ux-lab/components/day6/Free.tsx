"use client";

import { useId } from "react";
import { MateriA, MateriB } from "@/components/day6/Materi";
import { CareThumb } from "@/components/day6/mocks";
import { CareSim, CitizenFlowSim, OfficeSphereSim, ShotOf } from "@/components/day6/sims";
import { ObserveDay6 } from "@/components/day6/observe";
import { Diagram } from "@/components/materi/kit";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Day 6 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). Each picture is the real screen drawn by the same components
 * as the simulation, with dark numbered markers at the places the plan's description names; the markers say what is there, never whether it is good or bad.
 */
const NOTE = () => tt("Simulation · Case assumption: the product and its contents are made up from the plan's description · nothing here is marked right or wrong.");

type Shot = { which: "officesphere" | "citizenflow"; page: string; name: string; desc: string };

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

function OfficeSphere() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of OfficeSphere you received")}
        items={[
          tt("Much information stands side by side on the start page without clear visual grouping"),
          tt("Similar functions are designed differently and hard to recognise as related"),
          tt("Important primary actions and supplementary secondary actions look equally strong"),
          tt("Forms show all input fields at once, even though many are only relevant in special cases"),
          tt("Single notices, status displays and navigation elements compete visually"),
          tt("Different areas of the system use different patterns for similar tasks"),
        ]}
      />
      <Shots
        label={tt("OfficeSphere, as the portal shows it · Case assumption: the portal is made up from the plan's description")}
        items={[
          { which: "officesphere", page: "start", name: tt("OfficeSphere · the start page"), desc: tt("The start page: one long line of news and figures, a row of links mixing a red notice, an orange counter and plain links, and three cards for related tasks in three different styles. Numbers 1, 2 and 5 mark the places the description names.") },
          { which: "officesphere", page: "leave", name: tt("OfficeSphere · requesting leave"), desc: tt("The leave form: eight fields including special cases, and four equally strong buttons: Submit, Save draft, Print, Cancel. Numbers 3 and 4 mark the places the description names.") },
          { which: "officesphere", page: "travel", name: tt("OfficeSphere · a travel request"), desc: tt("The travel request: the Next link at the top, unlike the leave form. Number 6 marks the place the description names.") },
        ]}
      />
      <SimButton label={tt("Open OfficeSphere and try it")} sub={tt("Use it as an employee: request leave, then approve a colleague's request.")} url="officesphere.example/start" title={tt("Simulation: OfficeSphere")} note={NOTE()}>
        {() => <OfficeSphereSim />}
      </SimButton>
    </div>
  );
}

function Structures() {
  const note = tt("Simulation · Case assumption: the plan describes the three structures only in words; the platforms here are made up from those words · nothing here is marked right or wrong.");
  return (
    <OptionCards
      intro={tt("The plan describes three structures for CareAssist, a service platform. Each is built here as the words say, so you can try it as an experienced and as a new user.")}
      options={[
        { id: "A", name: tt("Variant A"), thumb: <CareThumb kind="A" />, info: tt("All information and options directly visible: a high transparency, but a strong density of information."), simLabel: tt("Open variant A and try it"), simSub: tt("Find your next session and the cancellation rules."), url: "careassist.example/start?variant=A", sim: () => <CareSim variant="A" />, note },
        { id: "B", name: tt("Variant B"), thumb: <CareThumb kind="B" />, info: tt("Central content clearly prioritised; additional information only shown step by step."), simLabel: tt("Open variant B and try it"), simSub: tt("Find your next session and the cancellation rules."), url: "careassist.example/start?variant=B", sim: () => <CareSim variant="B" />, note },
        { id: "C", name: tt("Variant C"), thumb: <CareThumb kind="C" />, info: tt("A modern, reduced layout with strong compression, but important context information is partly hidden too deep."), simLabel: tt("Open variant C and try it"), simSub: tt("Find your next session and the cancellation rules."), url: "careassist.example/start?variant=C", sim: () => <CareSim variant="C" />, note },
      ]}
    />
  );
}

function CitizenFlow() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The observed problems of the current platform")}
        items={[
          tt("Different page types group content differently"),
          tt("Primary and secondary actions are not cleanly separated visually"),
          tt("Forms show all fields at once, also optional and context-dependent details"),
          tt("Navigation patterns vary between areas with a similar function"),
          tt("Additional information, help and warnings are not cleanly prioritised visually"),
          tt("Users have to work out themselves which information is relevant and which is only supplementary"),
        ]}
      />
      <Shots
        label={tt("CitizenFlow today, as the platform shows it · Case assumption: the platform is made up from the plan's description")}
        items={[
          { which: "citizenflow", page: "residents", name: tt("CitizenFlow · the residents area"), desc: tt("The residents area: a heading, one line listing every topic, and two small links. Number 1 marks the place the description names.") },
          { which: "citizenflow", page: "vehicles", name: tt("CitizenFlow · the vehicles area"), desc: tt("The vehicles area of the same page type: a Continue link at the top and two cards, laid out differently from residents. Number 4 marks the place the description names.") },
          { which: "citizenflow", page: "cert1", name: tt("CitizenFlow · the application form"), desc: tt("The application for a residence certificate: an orange notice, eleven fields including those for foreign residents and companies, a long help paragraph and four equally strong buttons. Numbers 2, 3, 5 and 6 mark the places the description names.") },
        ]}
      />
      <SimButton label={tt("Open CitizenFlow and try it")} sub={tt("Use it as a citizen: apply for a residence certificate and send it, then check its status.")} url="citizenflow.example/start" title={tt("Simulation: CitizenFlow today")} note={NOTE()}>
        {() => <CitizenFlowSim />}
      </SimButton>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting")}
      sub={tt("The note from the management and what the service teams, IT and support each want, with what the administration records.")}
      url="mail.city.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk")}
      note={tt("Simulation · Case assumption: the messages and the attachment are made up from the brief · nothing here is marked right or wrong.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · City administration")}
          messages={[
            { from: tt("Management"), subject: tt("From many solutions to one system"), body: [tt("Over the years our teams have built many digital solutions, each with its own patterns for navigation, page structure, status displays and forms. Citizens experience breaks, uncertainty and unnecessary searching."), tt("We expect a sound strategy to turn the UX laws into an organisation-wide design system and clear decision structures. The budget is limited, several teams work in parallel, the data is partly incomplete, and first improvements must show in 3 months. Wrong decisions raise support effort, frustration and follow-up costs in development.")] },
            { from: tt("Team lead, residents"), subject: tt("Our deadline"), body: [tt("We have a new service to launch next month. We cannot wait for shared components; we will build it the way we always do.")] },
            { from: tt("Team lead, vehicles"), subject: tt("Happy to share"), body: [tt("We would use shared components at once if they existed. Today every team builds its own buttons and forms.")] },
            { from: tt("IT"), subject: tt("Maintenance"), body: [tt("We maintain four versions of the same form. Every legal change has to be made four times.")] },
            { from: tt("Support"), subject: tt("What I hear"), body: [tt("Most calls are “which fields do I fill in?” and “where do I send it?”. Open the link to see the application form as a citizen does.")], attachments: [{ name: "citizenflow.example/start", kind: "link", node: <CitizenFlowSim /> }] },
            { from: tt("Analytics"), subject: tt("What we can see"), body: [tt("Our data is partly incomplete. The sheet shows what we have.")], attachments: [{ name: "what-the-administration-records.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the administration records today (Case assumption)")}
                head={[tt("Data"), tt("Recorded?")]}
                rows={[
                  [tt("Subjects of support contacts"), tt("yes")],
                  [tt("Submitted applications"), tt("yes")],
                  [tt("Saved but unsent applications"), tt("no")],
                  [tt("Abandoned steps"), tt("no")],
                  [tt("Applications returned for missing information"), tt("partly, per team")],
                  [tt("Shared components"), tt("none exist")],
                ]}
              />
            ) }] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { officesphere: () => <OfficeSphere />, structures: () => <Structures />, citizenflow: () => <CitizenFlow />, desk: () => <Desk />, observe: () => <ObserveDay6 /> } };
