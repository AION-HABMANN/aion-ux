"use client";

import { MateriA, MateriB } from "@/components/day12/Materi";
import { CitizenConnectSim, LearnAccessSim, PublicAccessSim } from "@/components/day12/sims";
import { ObserveDay12 } from "@/components/day12/observe";
import { Day12Experience } from "@/components/day12/Experience";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { OptionCards } from "@/components/sim/OptionCards";
import { ReferenceButton } from "@/components/sim/ReferencePlatform";
import { SimButton } from "@/components/sim/SimFrame";
import { REF_21, REF_31 } from "@/data/day12/reference";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Day 12 · the simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). PublicAccess and CitizenConnect contain the plan's barriers for real
 * (try them with the keyboard), with the plan's description beside them as a numbered list that says what is there, never whether it is good or bad. Blocks 2.1
 * and 3.1 also open a real platform for the class discussion (DL-STANDARD v1.9, section 16): the W3C's Before and After Demonstration and its guide to planning
 * and managing accessibility (data/day12/reference.ts).
 */
const NOTE = () => tt("Simulation · Case assumption: the portal and its contents are made up from the plan's description · its barriers are built in on purpose and stay inside this window · nothing here is marked right or wrong.");
const KEYS = () => tt("Try it twice: once with the mouse, once with the keyboard alone (Tab, Shift + Tab, Enter, the arrow keys).");

/** The plan's description, one line per point. */
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

function PublicAccess() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of PublicAccess you received")}
        items={[
          tt("The navigation works well only with the mouse"),
          tt("Important hints are marked by colour, but not also in text"),
          tt("Contrast between text and background is weak in places"),
          tt("Forms contain complex terms and long nested sentences"),
          tt("Error messages explain problems insufficiently"),
          tt("Images and symbols are not always self-explanatory or described"),
        ]}
      />
      <SimButton label={tt("Open PublicAccess and try it")} sub={tt(`Use it as a citizen: book an appointment, fill in the application with a mistake, open your documents. ${KEYS()}`)} url="publicaccess.example/citizen-services" title={tt("Simulation: PublicAccess")} note={NOTE()}>
        {() => <PublicAccessSim />}
      </SimButton>
    </div>
  );
}

/** A static mini-screen of each design (no buttons: the thumbnail sits inside the option's own button). */
function Thumb({ which }: { which: "A" | "B" | "C" }) {
  if (which === "A")
    return (
      <svg aria-hidden viewBox="0 0 150 60" className="mx-auto block w-full max-w-[150px] rounded-lg" style={{ background: "#FAFAFD" }}>
        <defs><linearGradient id="la-a" x1="0" x2="1"><stop offset="0" stopColor="#C7B8F5" /><stop offset="1" stopColor="#9FD8F2" /></linearGradient></defs>
        <rect width="150" height="16" fill="url(#la-a)" />
        <text x="6" y="11" fontSize="7" fill="#FFFFFF">LEARNACCESS · Project basics</text>
        <text x="6" y="30" fontSize="7" fill="#B4B9C4">A milestone marks a point in</text>
        <text x="6" y="40" fontSize="7" fill="#B4B9C4">the project where something</text>
        <text x="6" y="50" fontSize="7" fill="#B4B9C4">important is finished…</text>
      </svg>
    );
  if (which === "B")
    return (
      <div aria-hidden className="mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border-2 border-[#1F2937] bg-white text-[10px] font-semibold leading-tight text-[#111827]">
        <div className="border-b-2 border-[#1F2937] bg-[#F3F4F6] px-2 py-1">LearnAccess</div>
        <div className="p-1.5">Lesson 3 · Planning with milestones</div>
      </div>
    );
  return (
    <div aria-hidden className="mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border border-line bg-white text-[9px] leading-tight text-[#374151]">
      <div className="flex justify-between px-2 py-1 text-white" style={{ background: "#5B3FBF" }}><span>LearnAccess</span><span>Aa</span></div>
      <div className="p-1.5">A · A+ · A++ · contrast · spacing</div>
    </div>
  );
}

function Designs() {
  const note = tt("Simulation · Case assumption: the plan describes the three redesigns only in words; the lesson pages here are made up from those words · nothing here is marked right or wrong.");
  return (
    <OptionCards
      intro={tt("The plan describes three redesigns of LearnAccess, a platform for digital further training. Each is built here as the words say, as the same lesson page, so you can compare how it reads and how it works with the keyboard.")}
      options={[
        { id: "A", name: tt("Variant A"), thumb: <Thumb which="A" />, info: tt("Visually modern and brand-strong, but with reduced contrast and small text elements."), simLabel: tt("Open variant A and try it"), simSub: tt("Read the lesson; then press Tab and look for the focus."), url: "learnaccess.example/course?variant=A", sim: () => <LearnAccessSim variant="A" />, note },
        { id: "B", name: tt("Variant B"), thumb: <Thumb which="B" />, info: tt("Clearly structured, high in contrast, plain in language and well focusable, but less “premium” in its brand."), simLabel: tt("Open variant B and try it"), simSub: tt("Read the lesson; then press Tab."), url: "learnaccess.example/course?variant=B", sim: () => <LearnAccessSim variant="B" />, note },
        { id: "C", name: tt("Variant C"), thumb: <Thumb which="C" />, info: tt("Good basic accessibility with some optional adaptation functions, but a higher technical effort."), simLabel: tt("Open variant C and try it"), simSub: tt("Open “Display” and change the text size, contrast and spacing."), url: "learnaccess.example/course?variant=C", sim: () => <LearnAccessSim variant="C" />, note },
      ]}
    />
  );
}

function CitizenConnect() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The observed problems of CitizenConnect")}
        items={[
          tt("Weak contrast makes central information hard to read"),
          tt("Forms are not cleanly structured and contain unclear error messages"),
          tt("Keyboard operation is patchy"),
          tt("Important hints are differentiated visually, but not in words"),
          tt("Content is partly complicated"),
          tt("Different page types are not built consistently"),
        ]}
      />
      <SimButton label={tt("Open CitizenConnect and try it")} sub={tt(`Use it as a citizen: read the information page, book an appointment, apply with a mistake. ${KEYS()}`)} url="citizenconnect.example" title={tt("Simulation: CitizenConnect today")} note={NOTE()}>
        {() => <CitizenConnectSim />}
      </SimButton>
      <ReferenceButton spec={REF_21()} />
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting")}
      sub={tt("The note from the management and what the legal team, the brand team, the departments, the template agency and citizen service each say, with what the organisation records.")}
      url="mail.citizenconnect.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk")}
      note={tt("Simulation · Case assumption: the messages and the attachment are made up from the brief · nothing here is marked right or wrong.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · Citizen services")}
          messages={[
            { from: tt("Management"), subject: tt("Accessible for everyone"), body: [tt("Our website, customer portal and digital service processes formally work, but they are not equally accessible to all users, and complaints about legibility, operability and comprehensibility keep rising. Inside, accessibility is mostly treated as compliance, not as part of UX quality and service responsibility."), tt("We expect a sound strategy for building accessibility and inclusive design systematically into product development and governance: not single fixes, but a decision architecture. The budget is limited, stakeholders want different things, legal requirements are binding, not all systems can be adapted at once, data on real barriers is incomplete, first improvements must show soon, and wrong decisions can increase exclusion, reputational damage and legal risk.")] },
            { from: tt("Legal team"), subject: tt("We are covered"), body: [tt("We publish the accessibility statement every year and list what is not accessible. That covers us legally. A full repair programme seems out of proportion.")] },
            { from: tt("Brand team"), subject: tt("Our colours"), body: [tt("The light blue and the light grey are our identity. We are open to changes, but not to a portal that looks like a government form from 1998.")] },
            { from: tt("Citizen service"), subject: tt("The calls"), body: [tt("Half of my calls are people who could not finish an online form. Open the portal and try it with the keyboard.")], attachments: [{ name: "citizenconnect.example", kind: "link", node: <CitizenConnectSim /> }] },
            { from: tt("Template agency"), subject: tt("Our part"), body: [tt("We can fix contrast, focus and the form component in the shared templates in a few weeks. Our contract does not name an accessibility level, so nobody has asked us so far.")] },
            { from: tt("Quality management"), subject: tt("What we know"), body: [tt("The data on real barriers is incomplete. The sheet shows what we have.")], attachments: [{ name: "what-we-know.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What the organisation knows today (Case assumption)")}
                head={[tt("Data"), tt("Available?")]}
                rows={[
                  [tt("Complaints, counted"), tt("yes")],
                  [tt("Complaints, sorted by barrier"), tt("no")],
                  [tt("Last year's external audit"), tt("yes, no owner")],
                  [tt("Tests with disabled citizens"), tt("none on record")],
                  [tt("Accessibility level in supplier contracts"), tt("not named")],
                  [tt("Who owns accessibility"), tt("nobody named")],
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
  experience: (route) => <Day12Experience route={route} />,
  slots: {
    publicaccess: () => <PublicAccess />,
    designs: () => <Designs />,
    citizenconnect: () => <CitizenConnect />,
    desk: () => <Desk />,
    observe: () => <ObserveDay12 />,
    reference: () => <ReferenceButton spec={REF_31()} />,
  },
};
