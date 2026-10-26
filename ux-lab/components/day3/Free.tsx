"use client";

import { useId } from "react";
import { MateriA, MateriB } from "@/components/day3/Materi";
import { HealthThumb } from "@/components/day3/mocks";
import { HealthSim, SecureLifeSim, ShotOf, TravelEaseSim } from "@/components/day3/sims";
import { ObserveDay3 } from "@/components/day3/observe";
import { Diagram } from "@/components/materi/kit";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Day 3 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). Each picture is the real screen drawn by the same components
 * as the simulation, with dark numbered markers at the places the plan's description names; the markers say what is there, never whether it is good or bad.
 */
const NOTE = () => tt("Simulation · Case assumption: the product and its contents are made up from the plan's description · nothing here is marked right or wrong.");

type Shot = { which: "travelease" | "securelife"; page: string; name: string; desc: string };

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

function TravelEase() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of TravelEase you received")}
        items={[
          tt("The start page uses four strong main colours without a clear system"),
          tt("Warnings, action buttons and information boxes partly appear in similar tones"),
          tt("Headings are decorative but not clearly distinct from the body text"),
          tt("Important notes are in small grey type"),
          tt("Some sections look modern but are hard to read"),
          tt("Links, buttons and status displays are not visually distinct from each other"),
        ]}
      />
      <Shots
        label={tt("TravelEase, the start page, as the portal shows it · Case assumption: the portal is made up from the plan's description")}
        items={[{ which: "travelease", page: "home", name: tt("TravelEase · the start page"), desc: tt("The TravelEase start page: four large buttons in orange, purple, green and amber, an orange-tinted notice about a changed flight, an amber Rebook button, another orange-tinted tip box, an italic serif heading, a short line of text, a small light-grey note on rebooking conditions, a light uppercase paragraph, three coloured status chips and two small links. Numbers 1 to 6 mark the places the description names.") }]}
      />
      <SimButton label={tt("Open TravelEase and try it")} sub={tt("Use it as a traveller: find out what changed on your Porto trip and rebook it.")} url="travelease.example/start" title={tt("Simulation: TravelEase")} note={NOTE()}>
        {() => <TravelEaseSim />}
      </SimButton>
    </div>
  );
}

function Designs() {
  const note = tt("Simulation · Case assumption: the plan describes the three designs only in words; the pages here are made up from those words · nothing here is marked right or wrong.");
  return (
    <OptionCards
      intro={tt("The plan describes three designs for HealthConnect, a health platform. Each is built here as the words say, so you can try it as someone between 20 and 70 would.")}
      options={[
        { id: "A", name: tt("Variant A"), thumb: <HealthThumb kind="A" />, info: tt("Strong brand colours and a high recognition value, but low contrast on central information."), simLabel: tt("Open variant A and try it"), simSub: tt("Read your next appointment and your new message."), url: "healthconnect.example/start?variant=A", sim: () => <HealthSim variant="A" />, note },
        { id: "B", name: tt("Variant B"), thumb: <HealthThumb kind="B" />, info: tt("Very factual and high in contrast, highly readable, but little emotional appeal."), simLabel: tt("Open variant B and try it"), simSub: tt("Read your next appointment and your new message."), url: "healthconnect.example/start?variant=B", sim: () => <HealthSim variant="B" />, note },
        { id: "C", name: tt("Variant C"), thumb: <HealthThumb kind="C" />, info: tt("Modern, elegant typography with a high-quality effect, but smaller type sizes and less visible navigation items."), simLabel: tt("Open variant C and try it"), simSub: tt("Read your next appointment, then find a doctor."), url: "healthconnect.example/start?variant=C", sim: () => <HealthSim variant="C" />, note },
      ]}
    />
  );
}

function SecureLife() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The observed problems of the current portal")}
        items={[
          tt("Different blues, greens and reds are used without a clear functional system"),
          tt("Buttons and information boxes look too similar"),
          tt("Status messages are coded by colour but hardly supported by text"),
          tt("Body text is too small and too dense"),
          tt("Typographic hierarchies are inconsistent"),
          tt("Important calls to action are lost among other text elements"),
        ]}
      />
      <Shots
        label={tt("SecureLife today, as the portal shows it · Case assumption: the portal is made up from the plan's description")}
        items={[
          { which: "securelife", page: "start", name: tt("SecureLife · the start page"), desc: tt("The SecureLife start page: a very large heading, six buttons in different blues, greens and reds, a blue information box that looks like the buttons, three coloured chips with report numbers only, two paragraphs of small dense text, two small plain links to report damage and upload documents, and a last small paragraph. Numbers 1 to 6 mark the places the description names.") },
          { which: "securelife", page: "contracts", name: tt("SecureLife · my contracts"), desc: tt("The contracts page: a small, regular heading, unlike the large heading of the start page, and a table of two contracts.") },
        ]}
      />
      <SimButton label={tt("Open SecureLife and try it")} sub={tt("Use it as a customer: find out the state of your three damage reports and what you have to do.")} url="securelife.example/portal" title={tt("Simulation: SecureLife today")} note={NOTE()}>
        {() => <SecureLifeSim />}
      </SimButton>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting")}
      sub={tt("The note from the management and what the brand team, marketing, IT and support each want, with what the company records.")}
      url="mail.securelife.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk")}
      note={tt("Simulation · Case assumption: the messages and the attachment are made up from the brief · nothing here is marked right or wrong.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · SecureLife Versicherung")}
          messages={[
            { from: tt("Management"), subject: tt("A design logic, not another restyling"), body: [tt("Over the years our website, our portal and our app have each gone their own way: colours changed with every campaign, each team set type differently, and our buttons and notices follow no principle. Customers find their way with difficulty and support requests are rising."), tt("We want a sound concept for colour, typography and visual guidance. The budget is limited, the corporate design is not freely negotiable but functional adjustments are possible, and we need to see first improvements soon. A wrong priority would cost us trust and support time.")] },
            { from: tt("Brand team"), subject: tt("The corporate design"), body: [tt("The logo blue and our typeface are fixed. How they are used in the interface has never been written down; we are open to rules, as long as the brand stays recognisable.")] },
            { from: tt("Marketing"), subject: tt("Campaign colours"), body: [tt("Each campaign needs its colour on the buttons, otherwise nobody notices it. The summer campaign is orange.")] },
            { from: tt("IT"), subject: tt("Components"), body: [tt("Each channel is built from its own components: three different buttons, three different status labels. One shared set would save us time, but someone has to decide what it looks like.")] },
            { from: tt("Support"), subject: tt("What I hear"), body: [tt("Most calls are “has my report arrived?” and “what do I have to do now?”. The answer is on the screen, as a coloured dot. Open the link to see the portal as a customer does.")], attachments: [{ name: "securelife.example/portal", kind: "link", node: <SecureLifeSim /> }] },
            { from: tt("Analytics"), subject: tt("What we can see"), body: [tt("Our data is partly incomplete. The sheet shows what we have.")], attachments: [{ name: "what-the-company-records.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the company records today (Case assumption)")}
                head={[tt("Data"), tt("Recorded?")]}
                rows={[
                  [tt("Subjects of support requests"), tt("yes")],
                  [tt("Page views of the website"), tt("yes")],
                  [tt("Submitted damage reports"), tt("yes")],
                  [tt("Reports started and not submitted"), tt("no")],
                  [tt("Which screen a customer was on when they called"), tt("no")],
                  [tt("Colours and type styles used per channel"), tt("not documented")],
                ]}
              />
            ) }] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { travelease: () => <TravelEase />, designs: () => <Designs />, securelife: () => <SecureLife />, desk: () => <Desk />, observe: () => <ObserveDay3 /> } };
