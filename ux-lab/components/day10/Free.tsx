"use client";

import { useId } from "react";
import { MateriA, MateriB } from "@/components/day10/Materi";
import { CareGuideSim, NavigatorSim, ShotOf, SmartAssistSim } from "@/components/day10/sims";
import { ObserveDay10 } from "@/components/day10/observe";
import { Day10Experience } from "@/components/day10/Experience";
import { Diagram } from "@/components/materi/kit";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { ReferenceButton } from "@/components/sim/ReferencePlatform";
import { SimButton } from "@/components/sim/SimFrame";
import { REF_21, REF_31 } from "@/data/day10/reference";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Day 10 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). Each picture is the real screen drawn by the same components
 * as the simulation, with dark numbered markers at the places the plan's description names; the markers say what is there, never whether it is good or bad. Blocks 2.1
 * and 3.1 also open a real platform for the class discussion (DL-STANDARD v1.9, section 16): Spotify and YouTube (data/day10/reference.ts).
 */
const NOTE = () => tt("Simulation · Case assumption: the product and its contents are made up from the plan's description · nothing here is marked right or wrong.");

type Which = "smartassist" | "careguide";
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

function SmartAssist() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of SmartAssist you received")}
        items={[
          tt("The platform shows different recommendations depending on usage history"),
          tt("An assistant suggests next steps, but does not always explain why"),
          tt("Some content seems helpful, other content random or unsuitable"),
          tt("Users receive automatic help, but it is not always clear whether they can steer it"),
          tt("Standard processes are partly simplified"),
          tt("In complex situations the guidance seems unclear; users cannot always tell whether rules or AI influence decisions"),
        ]}
      />
      <Shots
        label={tt("SmartAssist, as the platform shows it · Case assumption: the platform is made up from the plan's description")}
        items={[
          { which: "smartassist", page: "home", name: tt("SmartAssist · overview"), desc: tt("The overview: a greeting, the assistant's suggestion Upload your documents now with no reason, and three recommendations: household cover, travel insurance, pet liability. Numbers 1 and 2 mark the places the description names.") },
          { which: "smartassist", page: "rec2", name: tt("SmartAssist · a recommendation"), desc: tt("A travel insurance recommendation with no trip and no reason, and a button Take out now. Number 3 marks the place the description names.") },
          { which: "smartassist", page: "simple", name: tt("SmartAssist · a simple claim"), desc: tt("The phone damage claim: details filled in automatically from the contract, and a three-step form. Numbers 4 and 5 mark the places the description names.") },
          { which: "smartassist", page: "complex", name: tt("SmartAssist · a complex claim"), desc: tt("The water damage claim involving a neighbour: only general frequently asked questions. Number 6 marks the place the description names.") },
        ]}
      />
      <SimButton label={tt("Open SmartAssist and try it")} sub={tt("Use it as a customer: look at your recommendations, follow the assistant, report the simple claim and then the complicated one, and look for a way to switch the automatic help off.")} url="my.smartassist.example/overview" title={tt("Simulation: SmartAssist")} note={NOTE()}>
        {() => <SmartAssistSim />}
      </SimButton>
    </div>
  );
}

/** A static mini-screen of each design (no buttons: the thumbnail sits inside the option's own button). */
function Thumb({ which }: { which: "A" | "B" | "C" }) {
  const head = which === "A" ? "#B42318" : which === "B" ? "#155E75" : "#5B21B6";
  return (
    <div aria-hidden className="mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border border-line bg-white text-[9px] leading-tight text-[#26323F]">
      <div className="flex justify-between px-2 py-1 font-bold text-white" style={{ background: head }}>
        <span>CareerNavigator</span>
        {which === "A" && <span>🤖</span>}
      </div>
      <div className="space-y-1 p-1.5">
        {which === "A" && (
          <>
            <div className="font-semibold">We know what you need next 🚀</div>
            <div className="flex gap-0.5"><span className="rounded bg-[#B42318] px-1 text-white">98%</span><span className="rounded bg-[#C2410C] px-1 text-white">94%</span></div>
            <div className="rounded bg-[#FDE2E2] px-1">✨ Enrolled automatically</div>
          </>
        )}
        {which === "B" && (
          <>
            <div className="font-semibold">Find a course</div>
            <div className="rounded border border-line px-1">Topic · experience · time</div>
            <div>Why shown: matches “negotiation”</div>
          </>
        )}
        {which === "C" && (
          <>
            <div className="font-semibold">New role next month</div>
            <div>Your first 90 days · because …</div>
            <div className="text-[#5F5E5A]">Not my situation · Why?</div>
          </>
        )}
      </div>
    </div>
  );
}

function Designs() {
  const note = tt("Simulation · Case assumption: the plan describes the three designs only in words; the apps here are made up from those words · nothing here is marked right or wrong.");
  return (
    <OptionCards
      intro={tt("The plan describes three ways CareerNavigator, a platform for professional development, could personalise. Each is built here as the words say, as a real app of that kind would look, so you can try it as an employee who wants to develop.")}
      options={[
        { id: "A", name: tt("Variant A"), thumb: <Thumb which="A" />, info: tt("Strong personalisation from past use and automatic recommendations, but little transparency about the selection criteria."), simLabel: tt("Open variant A and try it"), simSub: tt("Look at your picks, ask for something else, and look at your courses."), url: "careernavigator.example/app?variant=A", sim: () => <NavigatorSim variant="A" />, note },
        { id: "B", name: tt("Variant B"), thumb: <Thumb which="B" />, info: tt("Restrained personalisation with clear explainability and high user control, but less comfort and less automation."), simLabel: tt("Open variant B and try it"), simSub: tt("Search for a course and look at your settings."), url: "careernavigator.example/app?variant=B", sim: () => <NavigatorSim variant="B" />, note },
        { id: "C", name: tt("Variant C"), thumb: <Thumb which="C" />, info: tt("Adaptive support with situational recommendations and optional ways to intervene, but a higher implementation effort."), simLabel: tt("Open variant C and try it"), simSub: tt("Look at the suggestions for your situation, ask why, and say it is not your situation."), url: "careernavigator.example/app?variant=C", sim: () => <NavigatorSim variant="C" />, note },
      ]}
    />
  );
}

function CareGuide() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The observed problems of CareGuide")}
        items={[
          tt("Recommendations seem partly helpful, but partly do not fit the current situation"),
          tt("Users do not always understand why certain content is shown"),
          tt("There are no clear hints how strongly the system personalises"),
          tt("The users' ways to intervene are limited or unclear"),
          tt("The platform saves time in simple cases"),
          tt("In exceptions it seems hard to follow"),
        ]}
      />
      <Shots
        label={tt("CareGuide today · Case assumption: the portal is made up from the plan's description")}
        items={[
          { which: "careguide", page: "home", name: tt("CareGuide · home"), desc: tt("The home page for a member: three recommendations (a back check-up, a pregnancy article, a quit-smoking programme) and the line Content selected for you. Numbers 1 and 2 mark the places the description names.") },
          { which: "careguide", page: "art2", name: tt("CareGuide · a recommended article"), desc: tt("A pregnancy article recommended to Mr Aydin, with no reason given. Number 3 marks the place the description names.") },
          { which: "careguide", page: "settings", name: tt("CareGuide · settings"), desc: tt("The settings: only a switch for e-mail reminders and the language; nothing about recommendations. Number 4 marks the place the description names.") },
          { which: "careguide", page: "appts", name: tt("CareGuide · an appointment"), desc: tt("The appointment page with a suggested time for the back check-up and two buttons. Number 5 marks the place the description names.") },
          { which: "careguide", page: "contact", name: tt("CareGuide · an exception"), desc: tt("The contact page: a member who also manages his mother's appointments, and an assistant that answers with a recommendation. Number 6 marks the place the description names.") },
        ]}
      />
      <SimButton label={tt("Open CareGuide and try it")} sub={tt("Use it as Mr Aydin, a member: look at your recommendations and ask why, book the suggested appointment, find a document, look for a way to switch recommendations off, and ask about your mother's appointments.")} url="portal.careguide.example" title={tt("Simulation: CareGuide today")} note={NOTE()}>
        {() => <CareGuideSim />}
      </SimButton>
      <ReferenceButton spec={REF_21()} />
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting")}
      sub={tt("The note from the management and what the innovation team, data protection, the doctors, the product team and analytics each want, with what the company records.")}
      url="mail.careguide.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk")}
      note={tt("Simulation · Case assumption: the messages and the attachment are made up from the brief · nothing here is marked right or wrong.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · CareGuide")}
          messages={[
            { from: tt("Management"), subject: tt("AI, responsibly"), body: [tt("We plan to make our customer portal, our app and our service platform more AI-supported and personalised. The first pilots show potential, but members do not understand recommendations, partly feel patronised, or get suggestions that do not fit. Inside the company AI is seen mostly as an innovation signal; trust, steerability and transparency are not settled."), tt("We expect a sound strategy for integrating intelligent interfaces responsibly and effectively: not a list of AI features, but a decision architecture for adaptive guidance, personalisation and trustworthy interaction. The budget is limited, several stakeholders want different things, the data quality is not consistent, trust and the brand must hold, not all systems can be adapted at once, first improvements must show soon, and wrong decisions can cause reputational damage, mis-steering and low acceptance.")] },
            { from: tt("Innovation team"), subject: tt("Chat assistant everywhere"), body: [tt("Competitors have an AI chat assistant in every channel. We propose one in the portal, the app and the service platform by next year. It would also show that we are modern.")] },
            { from: tt("Data protection officer"), subject: tt("Explainable and switchable"), body: [tt("Every recommendation must say why it appears and must be possible to switch off. Health data is special: I need to agree before any new personalisation goes live.")] },
            { from: tt("Medical advisory board"), subject: tt("Health content"), body: [tt("A health suggestion that is wrong can do harm. We review every piece of medical content; we have never seen how the recommendation logic chooses among them. Open the link to see the portal as a member does.")], attachments: [{ name: "portal.careguide.example", kind: "link", node: <CareGuideSim /> }] },
            { from: tt("Product team"), subject: tt("Our capacity"), body: [tt("We can add texts, a reason line, settings and a few screens this year. Changing the recommendation logic itself needs our external IT partner and takes longer.")] },
            { from: tt("Analytics"), subject: tt("What we can see"), body: [tt("The data is not consistent. The sheet shows what we have.")], attachments: [{ name: "what-the-company-records.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the company records today (Case assumption)")}
                head={[tt("Data"), tt("Recorded?")]}
                rows={[
                  [tt("Recommendations shown and clicked"), tt("yes")],
                  [tt("Whether a recommendation fitted"), tt("no")],
                  [tt("Appointment history"), tt("yes, complete")],
                  [tt("Programmes a member joined"), tt("partly")],
                  [tt("Pages read"), tt("only since the last update")],
                  [tt("Principles for what the system may suggest"), tt("none exist")],
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
  experience: (route) => <Day10Experience route={route} />,
  slots: {
    smartassist: () => <SmartAssist />,
    designs: () => <Designs />,
    careguide: () => <CareGuide />,
    desk: () => <Desk />,
    observe: () => <ObserveDay10 />,
    reference: () => <ReferenceButton spec={REF_31()} />,
  },
};
