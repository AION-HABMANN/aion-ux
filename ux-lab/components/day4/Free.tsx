"use client";

import { useId } from "react";
import { MateriA, MateriB } from "@/components/day4/Materi";
import { NavThumb } from "@/components/day4/mocks";
import { MyEnergySim, ServicePointSim, ShotOf, WorkflowSim } from "@/components/day4/sims";
import { ObserveDay4 } from "@/components/day4/observe";
import { Diagram } from "@/components/materi/kit";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Day 4 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). Each picture is the real screen drawn by the same components
 * as the simulation, with dark numbered markers at the places the plan's description names; the markers say what is there, never whether it is good or bad.
 */
const NOTE = () => tt("Simulation · Case assumption: the product and its contents are made up from the plan's description · nothing here is marked right or wrong.");

type Shot = { which: "servicepoint" | "myenergy"; page: string; name: string; desc: string };

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

function ServicePoint() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of ServicePoint you received")}
        items={[
          tt("The start page shows many equally presented menu items"),
          tt("Important functions such as “change contract” and “contact support” are not recognisable at once"),
          tt("Users have to remember several intermediate steps before they can finish a task"),
          tt("Terms in navigation and forms are partly technical and internal"),
          tt("New choices appear after every step, without it being clear which way is right"),
          tt("There is no clear feedback whether the user is on the right way"),
        ]}
      />
      <Shots
        label={tt("ServicePoint, as the portal shows it · Case assumption: the portal is made up from the plan's description")}
        items={[
          { which: "servicepoint", page: "start", name: tt("ServicePoint · the start page"), desc: tt("The ServicePoint start page: a heading in internal terms, twelve equal menu tiles and a welcome line. Numbers 1, 2 and 4 mark the places the description names.") },
          { which: "servicepoint", page: "change1", name: tt("ServicePoint · changing a contract, step 1"), desc: tt("The first step of a contract change: an ID to keep for a later step and three new choices. Numbers 3 and 5 mark the places the description names.") },
          { which: "servicepoint", page: "change3", name: tt("ServicePoint · changing a contract, the last step"), desc: tt("The last step: a form asking for the ID from step 1 and a date, with a Submit button. Number 6 marks the place the description names.") },
        ]}
      />
      <SimButton label={tt("Open ServicePoint and try it")} sub={tt("Use it as a customer: change your contract to another variant, then contact support.")} url="servicepoint.example/start" title={tt("Simulation: ServicePoint")} note={NOTE()}>
        {() => <ServicePointSim />}
      </SimButton>
    </div>
  );
}

function Navigation() {
  const note = tt("Simulation · Case assumption: the plan describes the three navigation variants only in words; the platforms here are made up from those words · nothing here is marked right or wrong.");
  return (
    <OptionCards
      intro={tt("The plan describes three navigation variants for WorkFlow Hub, a work platform. Each is built here as the words say, so you can try it as a new and as an experienced user.")}
      options={[
        { id: "A", name: tt("Variant A"), thumb: <NavThumb kind="A" />, info: tt("Very many options directly visible and a large scope of functions, but a complex first impression."), simLabel: tt("Open variant A and try it"), simSub: tt("Add a task, then find the audit log."), url: "workflowhub.example/home?variant=A", sim: () => <WorkflowSim variant="A" />, note },
        { id: "B", name: tt("Variant B"), thumb: <NavThumb kind="B" />, info: tt("A reduced navigation with a clear focus on the main tasks, but some rare functions lie deeper in the system."), simLabel: tt("Open variant B and try it"), simSub: tt("Add a task, then find the audit log."), url: "workflowhub.example/home?variant=B", sim: () => <WorkflowSim variant="B" />, note },
        { id: "C", name: tt("Variant C"), thumb: <NavThumb kind="C" />, info: tt("A modern presentation with interactive elements, but patterns that change between the areas."), simLabel: tt("Open variant C and try it"), simSub: tt("Add a task, then find the audit log."), url: "workflowhub.example/home?variant=C", sim: () => <WorkflowSim variant="C" />, note },
      ]}
    />
  );
}

function MyEnergy() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The observed problems of the current portal")}
        items={[
          tt("Too many navigation items of equal rank make orientation hard"),
          tt("Important tasks are not clearly prioritised"),
          tt("Process steps build on each other without the logic being visible"),
          tt("Technical language raises the effort of understanding"),
          tt("Users have to remember information across several steps"),
          tt("Feedback in the process is unclear or too general"),
        ]}
      />
      <Shots
        label={tt("MyEnergy today, as the portal shows it · Case assumption: the portal is made up from the plan's description")}
        items={[
          { which: "myenergy", page: "start", name: tt("MyEnergy · the start page"), desc: tt("The MyEnergy start page: a large banner for a smart home offer, twelve equal menu tiles in technical terms and a line about the contract account number and the meter point designation. Numbers 1, 2 and 4 mark the places the description names.") },
          { which: "myenergy", page: "meter2", name: tt("MyEnergy · submitting a meter reading"), desc: tt("The meter reading step: a note that the meter number is on the last bill, a form and a Send button. Numbers 5 and 6 mark the places the description names.") },
          { which: "myenergy", page: "meter1", name: tt("MyEnergy · the step before"), desc: tt("The step before: a choice of two meter points with technical designations and no sign of how many steps follow. Number 3 marks the place the description names.") },
        ]}
      />
      <SimButton label={tt("Open MyEnergy and try it")} sub={tt("Use it as a customer: submit your electricity meter reading, then change your instalment.")} url="myenergy.example/portal" title={tt("Simulation: MyEnergy today")} note={NOTE()}>
        {() => <MyEnergySim />}
      </SimButton>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting")}
      sub={tt("The note from the management and what the departments, the product team and service each want, with what the company records.")}
      url="mail.stadtenergie.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk")}
      note={tt("Simulation · Case assumption: the messages and the attachment are made up from the brief · nothing here is marked right or wrong.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · Stadtenergie")}
          messages={[
            { from: tt("Management"), subject: tt("Orientation and efficiency across all touchpoints"), body: [tt("Our customers can do most tasks in the portal, the app and on the service platform, but only with much searching, uncertainty and support. Meanwhile every meeting is about new functions."), tt("We expect a sound strategy for more orientation and efficiency across all touchpoints. The budget is limited and the user data is partial, and we need to see first improvements in 3 months. Wrong priorities would raise our support costs, frustration and abandoned processes.")] },
            { from: tt("Billing department"), subject: tt("Our functions stay visible"), body: [tt("Instalments, bills and the contract account are ours, and they must stay in the main menu. If customers do not see them, they will call us.")] },
            { from: tt("Product team"), subject: tt("Next quarter"), body: [tt("We plan to launch a smart home dashboard and an energy coach next quarter. Both are ready to build.")] },
            { from: tt("Service"), subject: tt("What I hear"), body: [tt("Most calls are from customers who did a task online and are not sure it worked, or could not find their meter number. Open the link to see the portal as a customer does.")], attachments: [{ name: "myenergy.example/portal", kind: "link", node: <MyEnergySim /> }] },
            { from: tt("Analytics"), subject: tt("What we can see"), body: [tt("Our user data is partial. The sheet shows what each system records.")], attachments: [{ name: "what-the-company-records.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the company records today (Case assumption)")}
                head={[tt("Data"), tt("Recorded?")]}
                rows={[
                  [tt("Subjects of service contacts"), tt("yes")],
                  [tt("Finished processes in the portal"), tt("yes")],
                  [tt("Abandoned processes and the step"), tt("no")],
                  [tt("App crashes"), tt("yes")],
                  [tt("Abandoned steps in the app"), tt("no")],
                  [tt("Functions customers never use"), tt("not measured")],
                ]}
              />
            ) }] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { servicepoint: () => <ServicePoint />, navigation: () => <Navigation />, myenergy: () => <MyEnergy />, desk: () => <Desk />, observe: () => <ObserveDay4 /> } };
