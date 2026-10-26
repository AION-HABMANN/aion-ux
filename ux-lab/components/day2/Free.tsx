"use client";

import { useId } from "react";
import { MateriA, MateriB } from "@/components/day2/Materi";
import { EduThumb } from "@/components/day2/mocks";
import { CampusNowSim, CampusPhoneSim, CityDeskSim, EduFlexSim, ShotOf } from "@/components/day2/sims";
import { ObserveDay2 } from "@/components/day2/observe";
import { Diagram } from "@/components/materi/kit";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Day 2 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). Each picture is the real screen drawn by the same components
 * as the simulation, with dark numbered markers at the places the plan's description names; the markers say what is there, never whether it is good or bad.
 */
const NOTE = () => tt("Simulation · Case assumption: the product and its contents are made up from the plan's description · nothing here is marked right or wrong.");

type Shot = { which: "citydesk" | "campusnow" | "campusphone"; page: string; name: string; desc: string };

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

function CityDesk() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of CityDesk you received")}
        items={[
          tt("12 menu items with similar visual weight on the start page"),
          tt("The most important services are not emphasised"),
          tt("Several text sections are set very densely"),
          tt("Different boxes, colours and lines compete with each other"),
          tt("The search is there, but visually inconspicuous"),
          tt("Important forms are only visible after long scrolling"),
        ]}
      />
      <Shots
        label={tt("CityDesk, the start page, as the portal shows it · Case assumption: the portal is made up from the plan's description")}
        items={[{ which: "citydesk", page: "home", name: tt("CityDesk · the start page, full length"), desc: tt("The CityDesk start page: twelve equal menu tiles, four coloured news boxes, a welcome heading, several long dense paragraphs, a small lowercase search link, more paragraphs, and at the very bottom a Forms heading with four small links. Numbers 1 to 6 mark the places the description names.") }]}
      />
      <SimButton label={tt("Open CityDesk and try it")} sub={tt("Use it as a resident: book an appointment at the citizens' office.")} url="citydesk.example/start" title={tt("Simulation: CityDesk")} note={NOTE()}>
        {() => <CityDeskSim />}
      </SimButton>
    </div>
  );
}

function Variants() {
  const note = tt("Simulation · Case assumption: the plan describes the three start pages only in words; the pages here are made up from those words · nothing here is marked right or wrong.");
  return (
    <OptionCards
      intro={tt("The plan describes three start pages for EduFlex, a further-education platform. Each is built here as the words say, so you can try it as one of its users: someone with little time.")}
      options={[
        { id: "A", name: tt("Variant A"), thumb: <EduThumb kind="A" />, info: tt("Much content directly visible, a high volume of information, but little visual calm."), simLabel: tt("Open variant A and try it"), simSub: tt("Continue your course, then find a course on time management."), url: "eduflex.example/start?variant=A", sim: () => <EduFlexSim variant="A" />, note },
        { id: "B", name: tt("Variant B"), thumb: <EduThumb kind="B" />, info: tt("A clear structure and less information, but more clicks to the goal."), simLabel: tt("Open variant B and try it"), simSub: tt("Continue your course, then find a course on time management."), url: "eduflex.example/start?variant=B", sim: () => <EduFlexSim variant="B" />, note },
        { id: "C", name: tt("Variant C"), thumb: <EduThumb kind="C" />, info: tt("Strongly image-led and modern, but the central functions recede into the background."), simLabel: tt("Open variant C and try it"), simSub: tt("Continue your course, then find a course on time management."), url: "eduflex.example/start?variant=C", sim: () => <EduFlexSim variant="C" />, note },
      ]}
    />
  );
}

function CampusNow() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The observed problems of the current portal")}
        items={[
          tt("The start page is overloaded with information"),
          tt("Navigation items are named after the internal organisation"),
          tt("Important functions are not visually prioritised"),
          tt("Different page types use different structures"),
          tt("Text blocks are long and hard to scan"),
          tt("Users often have to search instead of being guided directly"),
        ]}
      />
      <Shots
        label={tt("CampusNow today, as the portal shows it · Case assumption: the portal is made up from the plan's description")}
        items={[
          { which: "campusnow", page: "start", name: tt("CampusNow · the start page"), desc: tt("The CampusNow start page: a menu of five department names, a welcome heading, a long paragraph, six news cards, a row of small links to the booking system and other services, and a paragraph of conditions. Numbers 1, 2, 3, 5 and 6 mark the places the description names.") },
          { which: "campusnow", page: "booking", name: tt("CampusNow · the course list (one page type)"), desc: tt("The course booking system: a heading, a paragraph of terms and a table of three courses with Details and Book links at the end of each row. Number 4 marks the page type.") },
          { which: "campusnow", page: "certs", name: tt("CampusNow · the certificate service (another page type)"), desc: tt("The certificate service: a long heading, a paragraph of conditions and a tabbed form. Number 4 marks the page type, laid out differently from the course list.") },
          { which: "campusphone", page: "booking", name: tt("CampusNow · the course list on a phone"), desc: tt("The same course list in a phone-width frame: the table is cramped and the Book links are at the far right.") },
        ]}
      />
      <div className="grid gap-2 sm:grid-cols-2">
        <SimButton label={tt("Open CampusNow and try it")} sub={tt("Use it as a learner: book a course in English, then request a certificate.")} url="campusnow.example/portal" title={tt("Simulation: CampusNow today")} note={NOTE()}>
          {() => <CampusNowSim />}
        </SimButton>
        <SimButton label={tt("Open CampusNow on a phone and try it")} sub={tt("The same task on a phone, where the plan says use is especially problematic.")} url="campusnow.example/portal" title={tt("Simulation: CampusNow on a phone")} note={NOTE()}>
          {() => <CampusPhoneSim />}
        </SimButton>
      </div>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting")}
      sub={tt("The note from the management and what the departments, marketing, support and IT each want, with what the organisation records.")}
      url="mail.campusnow.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk")}
      note={tt("Simulation · Case assumption: the messages and the attachment are made up from the brief · nothing here is marked right or wrong.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · Regional Education Organisation")}
          messages={[
            { from: tt("Management"), subject: tt("A sound direction, not another redesign"), body: [tt("Many of our users do not finish their tasks efficiently, on the website, in CampusNow, in the app or in the support area. Every month we discuss colours and single pages, and nothing changes."), tt("We want a concept for user-centred design across all touchpoints. The budget is limited, only part of the systems can be changed soon, and we need to see first results in 3 months. A wrong priority would raise our support costs and our users' dissatisfaction.")] },
            { from: tt("Department III"), subject: tt("Our place on the start page"), body: [tt("Each of our units needs to be visible on the start page. If our courses are one click deeper, nobody will find them.")] },
            { from: tt("Marketing"), subject: tt("A modern look"), body: [tt("Our channels look dated. We want a fresh, modern look that activates people, with large images and fewer words.")] },
            { from: tt("IT"), subject: tt("Standardisation"), body: [tt("Every department builds its pages differently. We want one set of page templates for all touchpoints; every special layout costs us time.")] },
            { from: tt("Support"), subject: tt("What I hear"), body: [tt("Most questions are “where do I find …”. The answer is there, people just don't see it. On the phone it is worse. Open the link to see the portal as a learner does.")], attachments: [{ name: "campusnow.example/portal", kind: "link", node: <CampusNowSim /> }] },
            { from: tt("Analytics"), subject: tt("What we can see"), body: [tt("Our data is only partly reliable: support, the website and the portal each record their own part. The sheet shows what we have.")], attachments: [{ name: "what-the-organisation-records.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the organisation records today (Case assumption)")}
                head={[tt("Data"), tt("Recorded?")]}
                rows={[
                  [tt("Subjects of support questions"), tt("yes")],
                  [tt("Page views and searches on the website"), tt("yes")],
                  [tt("Finished bookings in the portal"), tt("yes")],
                  [tt("Abandoned bookings"), tt("partly")],
                  [tt("Phone against desktop"), tt("no")],
                  [tt("Which task a user came for"), tt("no")],
                ]}
              />
            ) }] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { citydesk: () => <CityDesk />, variants: () => <Variants />, campusnow: () => <CampusNow />, desk: () => <Desk />, observe: () => <ObserveDay2 /> } };
