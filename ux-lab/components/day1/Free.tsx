"use client";

import { useId } from "react";
import { MateriA, MateriB } from "@/components/day1/Materi";
import { VariantThumb } from "@/components/day1/mocks";
import { CarePathSim, SafeHomeSim, ShotOf, SkillFlowSim } from "@/components/day1/sims";
import { ObserveDay1 } from "@/components/day1/observe";
import { Diagram } from "@/components/materi/kit";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Day 1 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). Each picture is the real screen drawn by the same components
 * as the simulation, with dark numbered markers at the places the plan's description names; the markers say what is there, never whether it is good or bad.
 */
const NOTE = () => tt("Simulation · Case assumption: the product and its contents are made up from the plan's description · nothing here is marked right or wrong.");

type Shot = { which: "carepath" | "safehome"; page: string; name: string; desc: string };

function Shots({ label, items }: { label: string; items: Shot[] }) {
  const uid = useId().replace(/:/g, "");
  return (
    <Diagram label={label}>
      <div className={items.length > 1 ? "mx-auto grid max-w-[760px] grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2" : "mx-auto max-w-[420px]"}>
        {items.map((x) => (
          <figure key={`${x.which}-${x.page}`} className="min-w-0">
            <div role="img" aria-labelledby={`${uid}-${x.page}-t`} aria-describedby={`${uid}-${x.page}-d`}>
              <span id={`${uid}-${x.page}-d`} className="sr-only">{x.desc}</span>
              <Fit><ShotOf which={x.which} page={x.page} /></Fit>
            </div>
            <figcaption id={`${uid}-${x.page}-t`} className="mt-1 text-center text-[12.5px] font-bold text-ink">{x.name}</figcaption>
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

function CarePath() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of CarePath you received")}
        items={[
          tt("A start page with 9 equally strongly emphasised tiles"),
          tt("A red warning at the top, although there is no acute problem"),
          tt("Three different button colours with no recognisable system"),
          tt("Very small type on important information"),
          tt("Moving elements and changing notices in the upper area"),
          tt("Personal health data, notices and advertising visually close together"),
        ]}
      />
      <Shots
        label={tt("CarePath, the start page, as the app shows it · Case assumption: the app is made up from the plan's description")}
        items={[{ which: "carepath", page: "home", name: tt("CarePath · the start page"), desc: tt("The CarePath start page: a red notice, moving notices, a greeting, nine equal tiles, an appointment line in small type, three coloured buttons, and cards with health data next to advertising. Numbers 1 to 6 mark the places the description names.") }]}
      />
      <SimButton label={tt("Open CarePath and try it")} sub={tt("Use it as a patient: find your next appointment and your medication.")} url="carepath.example/start" title={tt("Simulation: CarePath")} note={NOTE()}>
        {() => <CarePathSim />}
      </SimButton>
    </div>
  );
}

function Variants() {
  const note = tt("Simulation · Case assumption: the plan describes the three start pages only in words; the pages here are made up from those words · nothing here is marked right or wrong.");
  return (
    <OptionCards
      intro={tt("The plan describes three start pages for SkillFlow, a learning platform. Each is built here as the words say, so you can try it as one of its users.")}
      options={[
        { id: "A", name: tt("Variant A"), thumb: <VariantThumb kind="A" />, info: tt("Modern, strongly animated, emotionally activating, but dense with information."), simLabel: tt("Open variant A and try it"), simSub: tt("Find the course you started and go on with it."), url: "skillflow.example/start?variant=A", sim: () => <SkillFlowSim variant="A" />, note },
        { id: "B", name: tt("Variant B"), thumb: <VariantThumb kind="B" />, info: tt("Very sober, factual, clearly structured, but not very motivating."), simLabel: tt("Open variant B and try it"), simSub: tt("Find the course you started and go on with it."), url: "skillflow.example/start?variant=B", sim: () => <SkillFlowSim variant="B" />, note },
        { id: "C", name: tt("Variant C"), thumb: <VariantThumb kind="C" />, info: tt("Visually high quality, strong imagery, a reduced navigation, but less transparent about the next steps."), simLabel: tt("Open variant C and try it"), simSub: tt("Find the course you started and go on with it."), url: "skillflow.example/start?variant=C", sim: () => <SkillFlowSim variant="C" />, note },
      ]}
    />
  );
}

function SafeHome() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of the current portal")}
        items={[
          tt("Very many blocks of text and legal notices directly on the entry page"),
          tt("Primary actions are not visually emphasised, and some are below long texts"),
          tt("Progress in the process is not visible"),
          tt("Warning colours are used often, even for neutral information"),
          tt("The document upload is formally correct but worded in an off-putting way"),
        ]}
      />
      <Shots
        label={tt("SafeHome Online today, as the portal shows it · Case assumption: the portal is made up from the plan's description")}
        items={[
          { which: "safehome", page: "start", name: tt("SafeHome Online · the entry page"), desc: tt("The entry page: a heading, a long legal text, two red notices, two more long texts and a row of small links at the bottom. Numbers 1, 2 and 4 mark the places the description names.") },
          { which: "safehome", page: "claim3", name: tt("SafeHome Online · the upload step"), desc: tt("The upload step of the damage report: a heading, a warning text, a red notice on file formats, two file fields and a data protection text. Number 5 marks the place the description names.") },
          { which: "safehome", page: "claim1", name: tt("SafeHome Online · the damage report"), desc: tt("The first step of the damage report: a heading, a legal text, three fields and small links. Number 3 marks the place the description names.") },
        ]}
      />
      <SimButton label={tt("Open SafeHome Online and try it")} sub={tt("Use it as a customer: report water damage in your flat.")} url="safehome.example/portal" title={tt("Simulation: SafeHome Online today")} note={NOTE()}>
        {() => <SafeHomeSim />}
      </SimButton>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting")}
      sub={tt("The note from the management and what marketing, compliance, IT, sales and support each want, with what the company records.")}
      url="mail.safehome.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk")}
      note={tt("Simulation · Case assumption: the messages and the attachment are made up from the brief · nothing here is marked right or wrong.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · SafeHome Versicherung")}
          messages={[
            { from: tt("Management"), subject: tt("A UX direction for the next 24 months"), body: [tt("We lose customers when they move between the website, the portal, the app and the chatbot. Complaints are rising and conversion is stagnating, and every team is discussing its own design changes."), tt("We want a viable UX direction for the next 24 months, not single screens. We cannot rework every touchpoint at once, and we want to see first results in 3 months. We want to appear more innovative, without losing anyone's trust.")] },
            { from: tt("Marketing"), subject: tt("We need more activation"), body: [tt("Our channels look old-fashioned. We want people to act: more prominent offers, more movement, more reasons to sign up. That is what an innovative brand does.")] },
            { from: tt("Compliance"), subject: tt("Safety first"), body: [tt("Whatever changes, the legal notices and the safeguards stay. Each new element that pushes customers to act needs to be checked by us first.")] },
            { from: tt("IT"), subject: tt("One standard, please"), body: [tt("Four channels, four ways of building them. We want one standard set of components for all of them; anything special costs us time we do not have.")] },
            { from: tt("Sales"), subject: tt("Closing"), body: [tt("Interested people leave before they sign. Every step between the offer and the signature should lead to the contract.")] },
            { from: tt("Support"), subject: tt("What I hear from customers"), body: [tt("Many callers have tried online first and got lost between the channels. They ask where they are in the process and whether their report arrived.")] },
            { from: tt("Analytics"), subject: tt("What we can see"), body: [tt("Our data is partial: support, web analytics and sales each record their own part. The sheet shows what we have.")], attachments: [{ name: "what-the-company-records.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the company records today (Case assumption)")}
                head={[tt("Data"), tt("Recorded?")]}
                rows={[
                  [tt("Reason for a call (support)"), tt("yes")],
                  [tt("Page views of the website (web analytics)"), tt("yes")],
                  [tt("Signed contracts (sales)"), tt("yes")],
                  [tt("Use of the portal, the app and the chatbot"), tt("partly")],
                  [tt("The path a customer takes across channels"), tt("no")],
                  [tt("Customer satisfaction"), tt("not surveyed")],
                ]}
              />
            ) }] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { carepath: () => <CarePath />, variants: () => <Variants />, safehome: () => <SafeHome />, desk: () => <Desk />, observe: () => <ObserveDay1 /> } };
