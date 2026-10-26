"use client";

import { useId } from "react";
import { MateriA, MateriB } from "@/components/day5/Materi";
import { AdminThumb } from "@/components/day5/mocks";
import { AdminFlowSim, BankDirectPhoneSim, BankDirectSim, MoveEasyPhoneSim, MoveEasySim, ShotOf } from "@/components/day5/sims";
import { ObserveDay5 } from "@/components/day5/observe";
import { Diagram } from "@/components/materi/kit";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Day 5 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). Each picture is the real screen drawn by the same components
 * as the simulation, with dark numbered markers at the places the plan's description names; the markers say what is there, never whether it is good or bad.
 */
const NOTE = () => tt("Simulation · Case assumption: the product and its contents are made up from the plan's description · nothing here is marked right or wrong.");

type Which = "bankdirect" | "bankphone" | "moveeasy" | "movephone";
type Shot = { which: Which; page: string; name: string; desc: string };

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

function BankDirect() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of BankDirect you received")}
        items={[
          tt("14 equally weighted menu options are visible on the start page"),
          tt("The most important function, “start transfer”, is a small link in the top right"),
          tt("Several buttons sit close together and are similarly labelled"),
          tt("Forms show much information at the same time"),
          tt("Users have to remember several numbers and options at the same time"),
          tt("On mobile devices, central buttons are relatively small"),
        ]}
      />
      <Shots
        label={tt("BankDirect, as the portal shows it · Case assumption: the portal is made up from the plan's description")}
        items={[
          { which: "bankdirect", page: "start", name: tt("BankDirect · the start page"), desc: tt("The start page: two tiny links at the top right, one of them Start transfer, a heading, fourteen equal menu tiles and a table of accounts. Numbers 1 and 2 mark the places the description names.") },
          { which: "bankdirect", page: "transfer1", name: tt("BankDirect · the transfer form"), desc: tt("The transfer form: a long instruction and eight fields at once. Number 4 marks the place the description names.") },
          { which: "bankdirect", page: "transfer2", name: tt("BankDirect · check and confirm"), desc: tt("The confirmation: a request to re-enter digits from the previous page, and four tiny buttons packed together: Send, Save, Save as template, Back. Numbers 3 and 5 mark the places the description names.") },
          { which: "bankphone", page: "transfer2", name: tt("BankDirect · check and confirm on a phone"), desc: tt("The same confirmation in a phone frame: the four tiny buttons are even harder to tell apart. Number 6 refers to it.") },
        ]}
      />
      <div className="grid gap-2 sm:grid-cols-2">
        <SimButton label={tt("Open BankDirect and try it")} sub={tt("Use it as a customer: start a transfer and send it.")} url="bankdirect.example/overview" title={tt("Simulation: BankDirect")} note={NOTE()}>
          {() => <BankDirectSim />}
        </SimButton>
        <SimButton label={tt("Open BankDirect on a phone and try it")} sub={tt("The same task on a phone, where the central buttons are small.")} url="bankdirect.example/overview" title={tt("Simulation: BankDirect on a phone")} note={NOTE()}>
          {() => <BankDirectPhoneSim />}
        </SimButton>
      </div>
    </div>
  );
}

function AdminNav() {
  const note = tt("Simulation · Case assumption: the plan describes the three variants only in words; the platforms here are made up from those words · nothing here is marked right or wrong.");
  return (
    <OptionCards
      intro={tt("The plan describes three variants for the main navigation of AdminFlow, an administration platform. Each is built here as the words say, so you can try it as a frequent and as an occasional user.")}
      options={[
        { id: "A", name: tt("Variant A"), thumb: <AdminThumb kind="A" />, info: tt("All functions visible at a glance, so a high access to functions, but many options at once."), simLabel: tt("Open variant A and try it"), simSub: tt("Approve a request, then find the audit log."), url: "adminflow.example/home?variant=A", sim: () => <AdminFlowSim variant="A" />, note },
        { id: "B", name: tt("Variant B"), thumb: <AdminThumb kind="B" />, info: tt("The central tasks are large and easy to reach; rare functions lie deeper in submenus."), simLabel: tt("Open variant B and try it"), simSub: tt("Approve a request, then find the audit log."), url: "adminflow.example/home?variant=B", sim: () => <AdminFlowSim variant="B" />, note },
        { id: "C", name: tt("Variant C"), thumb: <AdminThumb kind="C" />, info: tt("A modern, minimalist layout with few visible options, but many steps to the actual action."), simLabel: tt("Open variant C and try it"), simSub: tt("Approve a request, then find the audit log."), url: "adminflow.example/home?variant=C", sim: () => <AdminFlowSim variant="C" />, note },
      ]}
    />
  );
}

function MoveEasy() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The observed problems of the current portal")}
        items={[
          tt("Central booking buttons are small and partly badly placed"),
          tt("Too many options at once on the start page increase uncertainty"),
          tt("Users have to remember several tariffs and conditions at the same time"),
          tt("Important actions lie in long lists with similar options"),
          tt("Process steps offer too many equal choices"),
          tt("Mobile interaction is hard because touch targets are too small"),
        ]}
      />
      <Shots
        label={tt("MoveEasy today, as the portal shows it · Case assumption: the portal is made up from the plan's description")}
        items={[
          { which: "moveeasy", page: "start", name: tt("MoveEasy · the start page"), desc: tt("The start page: a tiny Book link in the top right, four offer cards and six equal service tiles. Numbers 1 and 2 mark the places the description names.") },
          { which: "movephone", page: "book1", name: tt("MoveEasy · choosing a ticket on a phone"), desc: tt("Choosing a ticket on a phone: twelve tiny ticket buttons in a grid and a long paragraph of conditions to remember for later. Numbers 3, 5 and 6 mark the places the description names.") },
          { which: "moveeasy", page: "book2", name: tt("MoveEasy · zones"), desc: tt("The next step: four similar zone options as small buttons. Number 4 marks the place the description names.") },
        ]}
      />
      <div className="grid gap-2 sm:grid-cols-2">
        <SimButton label={tt("Open MoveEasy on a phone and try it")} sub={tt("Use it as a customer: book a day ticket, then change your payment data.")} url="moveeasy.example/portal" title={tt("Simulation: MoveEasy on a phone")} note={NOTE()}>
          {() => <MoveEasyPhoneSim />}
        </SimButton>
        <SimButton label={tt("Open MoveEasy on the desktop and try it")} sub={tt("The same task on a large screen.")} url="moveeasy.example/portal" title={tt("Simulation: MoveEasy today")} note={NOTE()}>
          {() => <MoveEasySim />}
        </SimButton>
      </div>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting")}
      sub={tt("The note from the management and what the product team, marketing, IT and the service desk each want, with what the company records.")}
      url="mail.moveeasy.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk")}
      note={tt("Simulation · Case assumption: the messages and the attachment are made up from the brief · nothing here is marked right or wrong.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · MoveEasy Mobility")}
          messages={[
            { from: tt("Management"), subject: tt("Efficiency, orientation, quality of interaction"), body: [tt("Many of our digital processes work, but they are unnecessarily slow, error-prone and hard for first-time users, in the portal, the service app and the administration interface. Meanwhile we keep prioritising new functions."), tt("We want a sound strategy for efficiency, orientation and the quality of interaction. The budget is limited, mobile use is growing strongly, not all systems can change at once, and the user data is partial. First results must show soon; wrong decisions raise support costs, abandonment and frustration.")] },
            { from: tt("Product team"), subject: tt("Next quarter"), body: [tt("We plan a carbon calculator and a loyalty programme. Both are ready to build.")] },
            { from: tt("Marketing"), subject: tt("Our offers"), body: [tt("The offers on the start page bring in sales. They must stay visible, all of them.")] },
            { from: tt("IT"), subject: tt("Components"), body: [tt("The portal, the app and the admin tool each have their own buttons and lists. One shared set would help us, but we can only change part of the systems at a time.")] },
            { from: tt("Service desk"), subject: tt("What I hear"), body: [tt("Customers book the wrong ticket or tap the wrong button. Our own admin tool has Refund, Reissue and Block side by side. Open the link to see the booking on a phone.")], attachments: [{ name: "moveeasy.example/portal", kind: "link", node: <MoveEasyPhoneSim /> }] },
            { from: tt("Analytics"), subject: tt("What we can see"), body: [tt("Our user data is partial. The sheet shows what each system records.")], attachments: [{ name: "what-the-company-records.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the company records today (Case assumption)")}
                head={[tt("Data"), tt("Recorded?")]}
                rows={[
                  [tt("Subjects of service contacts"), tt("yes")],
                  [tt("Completed bookings, by device"), tt("yes")],
                  [tt("Abandoned bookings"), tt("no")],
                  [tt("Mis-taps and corrections"), tt("no")],
                  [tt("Which functions are used"), tt("not measured")],
                ]}
              />
            ) }] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { bankdirect: () => <BankDirect />, adminnav: () => <AdminNav />, moveeasy: () => <MoveEasy />, desk: () => <Desk />, observe: () => <ObserveDay5 /> } };
