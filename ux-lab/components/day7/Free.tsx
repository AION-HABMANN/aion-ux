"use client";

import { useId } from "react";
import { MateriA, MateriB } from "@/components/day7/Materi";
import { CareerThumb } from "@/components/day7/mocks";
import { CareerSim, LifeSupportSim, ShotOf, WellTrackSim } from "@/components/day7/sims";
import { ObserveDay7 } from "@/components/day7/observe";
import { Diagram } from "@/components/materi/kit";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { SimButton } from "@/components/sim/SimFrame";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Day 7 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). Each picture is the real screen drawn by the same components
 * as the simulation, with dark numbered markers at the places the plan's description names; the markers say what is there, never whether it is good or bad.
 */
const NOTE = () => tt("Simulation · Case assumption: the product and its contents are made up from the plan's description · nothing here is marked right or wrong.");

type Shot = { which: "welltrack" | "lifesupport"; page: string; name: string; desc: string };

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

function WellTrack() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of WellTrack you received")}
        items={[
          tt("The start page is factually correct, but seems cool and distant"),
          tt("Error messages are formulated technically and not supportively"),
          tt("Successful actions end without positive feedback"),
          tt("Important health information is presented soberly, but not in a way that builds trust"),
          tt("There are hardly any hints that give orientation, safety or personal relevance"),
          tt("The design looks professional, but emotionally unapproachable"),
        ]}
      />
      <Shots
        label={tt("WellTrack, as the platform shows it · Case assumption: the platform is made up from the plan's description")}
        items={[
          { which: "welltrack", page: "start", name: tt("WellTrack · the start page"), desc: tt("The start page: a grey heading, one line listing the available functions, and three plain links. Numbers 1, 5 and 6 mark the places the description names.") },
          { which: "welltrack", page: "err", name: tt("WellTrack · a failed booking"), desc: tt("A grey box: Error 4012, SLOT_UNAVAILABLE, the request could not be processed, and a Back link. Number 2 marks the place the description names.") },
          { which: "welltrack", page: "done", name: tt("WellTrack · a successful booking"), desc: tt("One line: the request has been stored, with a request number, and a link to the start. Number 3 marks the place the description names.") },
          { which: "welltrack", page: "recs", name: tt("WellTrack · recommendations"), desc: tt("A table of three measures with a status each, and a line saying they are generated from a standard catalogue. Number 4 marks the place the description names.") },
        ]}
      />
      <SimButton label={tt("Open WellTrack and try it")} sub={tt("Use it as a new user: book a check-up and read your recommendations.")} url="welltrack.example/start" title={tt("Simulation: WellTrack")} note={NOTE()}>
        {() => <WellTrackSim />}
      </SimButton>
    </div>
  );
}

function CareerDesigns() {
  const note = tt("Simulation · Case assumption: the plan describes the three designs only in words; the platforms here are made up from those words · nothing here is marked right or wrong.");
  return (
    <OptionCards
      intro={tt("The plan describes three designs for CareerPath, a platform for career development and further training. Each is built here as the words say, so you can try it as someone between 25 and 60 who wants to grow at work.")}
      options={[
        { id: "A", name: tt("Variant A"), thumb: <CareerThumb kind="A" />, info: tt("Modern, warm and motivating, but with many emotional stimuli and activating messages."), simLabel: tt("Open variant A and try it"), simSub: tt("Find a course on leading a team and apply."), url: "careerpath.example/start?variant=A", sim: () => <CareerSim variant="A" />, note },
        { id: "B", name: tt("Variant B"), thumb: <CareerThumb kind="B" />, info: tt("Factual, clear and trustworthy, but not very inspiring or connecting."), simLabel: tt("Open variant B and try it"), simSub: tt("Find a course on leading a team and apply."), url: "careerpath.example/start?variant=B", sim: () => <CareerSim variant="B" />, note },
        { id: "C", name: tt("Variant C"), thumb: <CareerThumb kind="C" />, info: tt("High quality and personal in feel, but in some situations a little unclear in its interaction feedback."), simLabel: tt("Open variant C and try it"), simSub: tt("Find a course on leading a team and apply."), url: "careerpath.example/start?variant=C", sim: () => <CareerSim variant="C" />, note },
      ]}
    />
  );
}

function LifeSupport() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The observed problems of the current portal")}
        items={[
          tt("The visual language is factual, but emotionally distant"),
          tt("Feedback after actions is technical instead of supportive"),
          tt("Critical situations, such as error messages, create uncertainty instead of orientation"),
          tt("Positive experiences of use are not visibly reinforced"),
          tt("The tone is correct, but does not build trust or motivate"),
          tt("The interaction is functional, but does not build a relationship"),
        ]}
      />
      <Shots
        label={tt("LifeSupport today, as the portal shows it · Case assumption: the portal is made up from the plan's description")}
        items={[
          { which: "lifesupport", page: "start", name: tt("LifeSupport · the overview"), desc: tt("The overview: a dark heading Customer portal, one line asking you to manage your services and keep your data up to date, and six plain links. Numbers 1 and 5 mark the places the description names.") },
          { which: "lifesupport", page: "book", name: tt("LifeSupport · booking a check-up"), desc: tt("The booking form: four fields, Check availability and a small Confirm booking link. Number 6 marks the place the description names.") },
          { which: "lifesupport", page: "booked", name: tt("LifeSupport · after booking"), desc: tt("A grey box with a booking number, Status: CONFIRMED, Transaction completed, and a line Return to the overview. Numbers 2 and 4 mark the places the description names.") },
          { which: "lifesupport", page: "results", name: tt("LifeSupport · my results"), desc: tt("A grey notice that some values are outside the reference range, to contact your physician if required, and a table of values. Number 3 marks the place the description names.") },
        ]}
      />
      <SimButton label={tt("Open LifeSupport and try it")} sub={tt("Use it as a customer: book a check-up, open your results, and upload a document.")} url="lifesupport.example/portal" title={tt("Simulation: LifeSupport today")} note={NOTE()}>
        {() => <LifeSupportSim />}
      </SimButton>
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting")}
      sub={tt("The note from the management and what marketing, the medical department and support each want, with what the company records.")}
      url="mail.lifesupport.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk")}
      note={tt("Simulation · Case assumption: the messages and the attachment are made up from the brief · nothing here is marked right or wrong.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · LifeSupport")}
          messages={[
            { from: tt("Management"), subject: tt("Correct, but not supportive"), body: [tt("Our digital offers are functionally solid, but they create little emotional bond. Users find them correct, but not supportive, trust-building or motivating. Inside the company, emotion is mostly seen as a question of communication or marketing."), tt("We expect a sound strategy for building emotional quality systematically into our product experience. The budget is limited, the brand must stay professional, not all systems can be adapted at once, data on emotional effect is only partly available, and first improvements must show soon. Wrong decisions can weaken credibility and acceptance.")] },
            { from: tt("Marketing"), subject: tt("More warmth, more activation"), body: [tt("Our campaign is warm and personal and it works. Let us use the same voice in the portal and the app, with more reminders and offers, so people use them more.")] },
            { from: tt("Medical department"), subject: tt("Seriousness"), body: [tt("Health information must stay precise. A friendly tone must never make a result sound harmless when it is not, or alarming when it is not.")] },
            { from: tt("Support"), subject: tt("What I hear"), body: [tt("Most calls are “did my booking work?” and “is something wrong with my results?”. Open the link to see the portal as a customer does.")], attachments: [{ name: "lifesupport.example/portal", kind: "link", node: <LifeSupportSim /> }] },
            { from: tt("Product team, portal"), subject: tt("Our messages"), body: [tt("We write our own confirmations and error texts. Nobody has ever told us how they should sound.")] },
            { from: tt("Analytics"), subject: tt("What we can see"), body: [tt("Data on emotional effect is only partly available. The sheet shows what we have.")], attachments: [{ name: "what-the-company-records.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the company records today (Case assumption)")}
                head={[tt("Data"), tt("Recorded?")]}
                rows={[
                  [tt("Subjects of support contacts"), tt("yes")],
                  [tt("Logins and bookings"), tt("yes")],
                  [tt("Why people stop using the portal"), tt("no")],
                  [tt("How customers feel"), tt("no, never measured")],
                  [tt("App store reviews"), tt("yes, not read regularly")],
                  [tt("A tone guide"), tt("none exists")],
                ]}
              />
            ) }] },
          ]}
        />
      )}
    </SimButton>
  );
}

export const KIT: FreeKit = { MateriA, MateriB, slots: { welltrack: () => <WellTrack />, careerdesigns: () => <CareerDesigns />, lifesupport: () => <LifeSupport />, desk: () => <Desk />, observe: () => <ObserveDay7 /> } };
