"use client";

import { useId } from "react";
import { MateriA, MateriB } from "@/components/day9/Materi";
import { JourneySim, MoveWellSim, ShotOf, SkillRiseSim } from "@/components/day9/sims";
import { ObserveDay9 } from "@/components/day9/observe";
import { Diagram } from "@/components/materi/kit";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { Fit } from "@/components/sim/Fit";
import { OptionCards } from "@/components/sim/OptionCards";
import { ReferenceButton } from "@/components/sim/ReferencePlatform";
import { SimButton } from "@/components/sim/SimFrame";
import { REF_21, REF_31 } from "@/data/day9/reference";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Day 9 · the pictures and simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). Each picture is the real screen drawn by the same components
 * as the simulation, with dark numbered markers at the places the plan's description names; the markers say what is there, never whether it is good or bad. Blocks 2.1
 * and 3.1 also open a real platform for the class discussion (DL-STANDARD v1.9, section 16): NHS Couch to 5K and Duolingo (data/day9/reference.ts).
 */
const NOTE = () => tt("Simulation · Case assumption: the product and its contents are made up from the plan's description · nothing here is marked right or wrong.");

type Which = "skillrise" | "movewell" | "hjA" | "hjB" | "hjC";
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

function SkillRise() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of SkillRise you received")}
        items={[
          tt("The platform offers learning paths, tasks and certificates, but little visible progress"),
          tt("After completed steps, users receive only neutral system messages"),
          tt("There are no motivating intermediate goals or recognisable milestones"),
          tt("The learning path is sensible in content, but not very activating"),
          tt("Elements that make personal development or achieved successes visible are missing"),
          tt("The platform seems functional, but hardly binding or motivating"),
        ]}
      />
      <Shots
        label={tt("SkillRise, as the platform shows it · Case assumption: the platform is made up from the plan's description")}
        items={[
          { which: "skillrise", page: "dash", name: tt("SkillRise · My learning"), desc: tt("The dashboard: the heading My learning, a line about two assigned paths, and two path cards with modules and a certificate but no progress. Numbers 1 and 6 mark the places the description names.") },
          { which: "skillrise", page: "lesson0", name: tt("SkillRise · a module"), desc: tt("A module page with the lesson text, an example, key points and a task with Mark as complete; after it, only Task completed. Number 2 marks the place the description names.") },
          { which: "skillrise", page: "path", name: tt("SkillRise · the learning path"), desc: tt("The path page: the course promise, its facts, the modules in two groups with no ticks or milestones, and a note that a certificate follows when all are done. Numbers 3 and 4 mark the places the description names.") },
          { which: "skillrise", page: "profile", name: tt("SkillRise · the profile"), desc: tt("The profile: a table of name, department, employee ID, language and assigned paths, and a form. Number 5 marks the place the description names.") },
        ]}
      />
      <SimButton label={tt("Open SkillRise and try it")} sub={tt("Use it as an employee: open your learning path, finish a module and look at your progress.")} url="skillrise.example/my-learning" title={tt("Simulation: SkillRise")} note={NOTE()}>
        {() => <SkillRiseSim />}
      </SimButton>
    </div>
  );
}

/** A static mini-screen of each design (no buttons: the thumbnail sits inside the option's own button). */
function Thumb({ which }: { which: "hjA" | "hjB" | "hjC" }) {
  const head = which === "hjA" ? "#6D28D9" : which === "hjB" ? "#0F766E" : "#9A3412";
  return (
    <div aria-hidden className="mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border border-line bg-white text-[9px] leading-tight text-[#26323F]">
      <div className="flex justify-between px-2 py-1 font-bold text-white" style={{ background: head }}>
        <span>HealthJourney</span>
        {which === "hjA" && <span>⭐ 1240 · 🔥4</span>}
      </div>
      <div className="space-y-1 p-1.5">
        {which === "hjA" && (
          <>
            <div className="rounded bg-[#DC2626] px-1 py-0.5 font-bold text-white">🎯 DOUBLE XP today!</div>
            <div className="flex gap-0.5"><span className="rounded bg-[#B45309] px-1 text-white">🏅7</span><span className="rounded bg-[#475569] px-1 text-white">🥈 #14</span><span className="rounded bg-[#047857] px-1 text-white">+10</span></div>
            <div className="rounded bg-[#FDE2E2] px-1">🔻 drop zone!</div>
          </>
        )}
        {which === "hjB" && (
          <>
            <div className="font-semibold">Your plan</div>
            <div className="h-1.5 rounded bg-[#E4E0EC]"><div className="h-1.5 w-1/2 rounded bg-[#0F766E]" /></div>
            <div>✓ Week 1 · milestone</div>
            <div>Week 2 · four days</div>
          </>
        )}
        {which === "hjC" && (
          <>
            <div className="font-semibold">Every healthy habit has a beginning.</div>
            <div>Stage 1 · Finding your time</div>
            <div className="text-[#5F5E5A]">Stage 2 · The first two weeks</div>
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
      intro={tt("The plan describes three activation designs for HealthJourney, a prevention platform. Each is built here as the words say, as a real app of that kind would look, so you can try it as an adult who wants to move more.")}
      options={[
        { id: "A", name: tt("Variant A"), thumb: <Thumb which="hjA" />, info: tt("Strong gamification with points, badges, daily challenges and rankings."), simLabel: tt("Open variant A and try it"), simSub: tt("Do today's challenge, look at your league and your badges."), url: "healthjourney.example/app?variant=A", sim: () => <JourneySim variant="A" />, note },
        { id: "B", name: tt("Variant B"), thumb: <Thumb which="hjB" />, info: tt("A restrained activation logic with progress displays, milestones and confirming feedback."), simLabel: tt("Open variant B and try it"), simSub: tt("Go through your plan and log an activity."), url: "healthjourney.example/app?variant=B", sim: () => <JourneySim variant="B" />, note },
        { id: "C", name: tt("Variant C"), thumb: <Thumb which="hjC" />, info: tt("A narratively embedded user journey with motivating stages, but less visible classic reward elements."), simLabel: tt("Open variant C and try it"), simSub: tt("Follow the stages of the journey."), url: "healthjourney.example/app?variant=C", sim: () => <JourneySim variant="C" />, note },
      ]}
    />
  );
}

function MoveWell() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The observed problems of MoveWell")}
        items={[
          tt("Progress is only faintly visible"),
          tt("Successes are hardly fed back or emotionally reinforced"),
          tt("Motivating intermediate goals and stages are missing"),
          tt("The user journey is functional, but not very activating"),
          tt("There is no clear link between individual development and the experience of use"),
          tt("The feedback so far is technical and not very stimulating"),
        ]}
      />
      <Shots
        label={tt("MoveWell today · Case assumption: the app is made up from the plan's description")}
        items={[
          { which: "movewell", page: "home", name: tt("MoveWell · home"), desc: tt("The home screen: the name MoveWell, a faint grey line Goal status: active, and five equal menu tiles. Numbers 1 and 4 mark the places the description names.") },
          { which: "movewell", page: "log", name: tt("MoveWell · logging an activity"), desc: tt("The log form with activity type, duration and date, and Submit; afterwards only Entry stored. Number 2 marks the place the description names.") },
          { which: "movewell", page: "goal", name: tt("MoveWell · my goal"), desc: tt("The goal as a table: More stamina, a start date, duration open-ended, status active; no stages. Number 3 marks the place the description names.") },
          { which: "movewell", page: "history", name: tt("MoveWell · activity history"), desc: tt("A table of dates, activity types, minutes and record IDs, with no meaning for the member's goal. Number 5 marks the place the description names.") },
        ]}
      />
      <SimButton label={tt("Open MoveWell and try it")} sub={tt("Use it as a member: log an activity, look at your goal and your history, and sync your device.")} url="app.movewell.example" title={tt("Simulation: MoveWell today")} note={NOTE()}>
        {() => <MoveWellSim />}
      </SimButton>
      <ReferenceButton spec={REF_21()} />
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting")}
      sub={tt("The note from the management and what marketing, the medical advisory board, the product team and coaching each want, with what the company records.")}
      url="mail.movewell.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk")}
      note={tt("Simulation · Case assumption: the messages and the attachment are made up from the brief · nothing here is marked right or wrong.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · MoveWell")}
          messages={[
            { from: tt("Management"), subject: tt("Many start, few stay"), body: [tt("Our app, customer portal and service offer are good in content, but many members start and only some stay active. Inside the company there is a debate about whether stronger gamification is the answer, and nobody is clear which mechanics fit our brand, our members and the situations they use our products in."), tt("We expect a sound strategy for designing activation, storytelling and retention systematically and responsibly. The budget is limited, several stakeholders want different things, the brand must not lose credibility, not all systems can be extended at once, the data is partly incomplete, first improvements must show soon, and wrong decisions can harm motivation, trust and our image.")] },
            { from: tt("Marketing"), subject: tt("Let's catch up"), body: [tt("Our competitors have badges, challenges and leaderboards. I propose badges for regular logins and a monthly ranking of our most active members, with a prize.")] },
            { from: tt("Medical advisory board"), subject: tt("No rankings"), body: [tt("Our members include people with chronic conditions. A ranking would shame exactly the people who need prevention most. Any message about health must be accurate; we want to see every one.")] },
            { from: tt("Coaching"), subject: tt("What works on the phone"), body: [tt("When I tell members what their walks already do for them, they keep going. The app never says that. Open the link to see the app as a member does.")], attachments: [{ name: "app.movewell.example", kind: "link", node: <MoveWellSim /> }] },
            { from: tt("Product team"), subject: tt("Our capacity"), body: [tt("We can change texts, add a progress display and a few screens this year. Anything that needs new data or a points engine across app and portal is a bigger project.")] },
            { from: tt("Analytics"), subject: tt("What we can see"), body: [tt("The data is partly incomplete. The sheet shows what we have.")], attachments: [{ name: "what-the-company-records.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the company records today (Case assumption)")}
                head={[tt("Data"), tt("Recorded?")]}
                rows={[
                  [tt("Logins and logged activities"), tt("yes")],
                  [tt("Why a member stops"), tt("no")],
                  [tt("Document downloads in the portal"), tt("yes, not linked to the app")],
                  [tt("What members say in coaching"), tt("free-text notes only")],
                  [tt("Tests of any game element"), tt("none")],
                  [tt("Principles for activation mechanics"), tt("none exist")],
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
  slots: {
    skillrise: () => <SkillRise />,
    designs: () => <Designs />,
    movewell: () => <MoveWell />,
    desk: () => <Desk />,
    observe: () => <ObserveDay9 />,
    reference: () => <ReferenceButton spec={REF_31()} />,
  },
};
