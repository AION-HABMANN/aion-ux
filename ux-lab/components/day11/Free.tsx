"use client";

import { MateriA, MateriB } from "@/components/day11/Materi";
import { CareVoiceSim, CityHelpSim, HomeAssistSim } from "@/components/day11/sims";
import { ObserveDay11 } from "@/components/day11/observe";
import { Day11Experience } from "@/components/day11/Experience";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { OptionCards } from "@/components/sim/OptionCards";
import { ReferenceButton } from "@/components/sim/ReferencePlatform";
import { SimButton } from "@/components/sim/SimFrame";
import { REF_21, REF_31 } from "@/data/day11/reference";
import type { FreeKit } from "@/lib/dayFree/spec";
import { tt } from "@/lib/lang";

/**
 * Day 11 · the simulations the free-form engine plugs into the blocks (CLAUDE.md #52, #60). The three voice assistants of the plan are dialogues you can talk to
 * (typed, or spoken where the browser allows), with the plan's description beside them as a numbered list that says what is there, never whether it is good or
 * bad. Blocks 2.1 and 3.1 also open a real platform for the class discussion (DL-STANDARD v1.9, section 16): Amazon's Alexa Design Guide and GOV.UK Chat
 * (data/day11/reference.ts).
 */
const NOTE = () => tt("Simulation · Case assumption: the assistant and its answers are made up from the plan's description · the replies are scripted, the same every time · nothing here is marked right or wrong.");

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

function HomeAssist() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The description of HomeAssist Voice you received")}
        items={[
          tt("Users can ask about their power consumption, control devices and report faults by voice"),
          tt("The system reacts quickly, but not always comprehensibly, to more complex requests"),
          tt("On misunderstandings the assistant repeats standard answers without clarifying the situation"),
          tt("Users do not always get clear hints which voice commands are possible"),
          tt("Some suggestions seem helpful, others unexpected or unsuitable"),
          tt("Voice and AI together save time in simple cases, but create uncertainty in special cases"),
        ]}
      />
      <SimButton label={tt("Open HomeAssist Voice and talk to it")} sub={tt("Use it as a customer: ask about your consumption, switch the light, make it warmer, ask why your bill went up, and report a fault.")} url="homeassist.example/voice" title={tt("Simulation: HomeAssist Voice")} note={NOTE()}>
        {() => <HomeAssistSim />}
      </SimButton>
    </div>
  );
}

/** A static mini-screen of each design (no buttons: the thumbnail sits inside the option's own button). */
function Thumb({ which }: { which: "A" | "B" | "C" }) {
  const head = which === "A" ? "#9F1239" : which === "B" ? "#0F766E" : "#5B21B6";
  return (
    <div aria-hidden className="mx-auto w-full max-w-[150px] overflow-hidden rounded-lg border border-line bg-white text-[9px] leading-tight text-[#26323F]">
      <div className="px-2 py-1 font-bold text-white" style={{ background: head }}>🎙 CareVoice</div>
      <div className="space-y-1 p-1.5">
        {which === "A" && <div className="rounded bg-[#FCE7EC] px-1">🔊 Just tell me what you need, in your own words! 😊</div>}
        {which === "B" && <div className="rounded bg-[#E6F4F1] px-1">🔊 Say one, appointments; two, prescriptions; three, results.</div>}
        {which === "C" && (
          <>
            <div className="rounded bg-[#EFE9FB] px-1">🔊 Which time? It is on your screen.</div>
            <div className="rounded border border-line px-1">📱 [Tomorrow 9:20] [Fri 11:00]</div>
          </>
        )}
      </div>
    </div>
  );
}

function Designs() {
  const note = tt("Simulation · Case assumption: the plan describes the three designs only in words; the assistants here are scripted from those words · nothing here is marked right or wrong.");
  return (
    <OptionCards
      intro={tt("The plan describes three variants of CareVoice, a voice assistant for a health platform. Each is built here as the words say, so you can talk to it as a patient: book an appointment, move one, renew a prescription, ask for results.")}
      options={[
        { id: "A", name: tt("Variant A"), thumb: <Thumb which="A" />, info: tt("Very natural, free speech input with high flexibility, but a higher error rate in complex situations."), simLabel: tt("Open variant A and talk to it"), simSub: tt("Ask in your own words; try moving an appointment."), url: "carevoice.example/voice?variant=A", sim: () => <CareVoiceSim variant="A" />, note },
        { id: "B", name: tt("Variant B"), thumb: <Thumb which="B" />, info: tt("Clearly guided voice dialogues with a limited set of commands, but high comprehensibility and robustness."), simLabel: tt("Open variant B and talk to it"), simSub: tt("Follow the menu; try something it does not know."), url: "carevoice.example/voice?variant=B", sim: () => <CareVoiceSim variant="B" />, note },
        { id: "C", name: tt("Variant C"), thumb: <Thumb which="C" />, info: tt("A combination of voice control, visual support and AI help, but a higher implementation effort."), simLabel: tt("Open variant C and talk to it"), simSub: tt("Speak or tap; watch the screen show what it understood."), url: "carevoice.example/voice?variant=C", sim: () => <CareVoiceSim variant="C" />, note },
      ]}
    />
  );
}

function CityHelp() {
  return (
    <div className="space-y-3">
      <Legend
        title={tt("The observed problems of CityHelp Voice")}
        items={[
          tt("First prototypes understand simple requests well, but fail on ambiguous ones"),
          tt("Users often do not know which inputs are possible or sensible"),
          tt("Errors are reported technically instead of helpfully"),
          tt("Voice and AI together seem efficient in some situations, hard to control in others"),
          tt("Test runs show acceptance for simple tasks, but distrust for more sensitive requests"),
          tt("The departments see relief; data protection and citizen service warn of reputational risks"),
        ]}
      />
      <SimButton label={tt("Open CityHelp Voice and talk to it")} sub={tt("Use it as a citizen: book an appointment, ask about your ID card, report a broken streetlight, then say you have moved, ask about a parking permit and about your housing benefit.")} url="115.city.example/voice" title={tt("Simulation: CityHelp Voice, first prototype")} note={NOTE()}>
        {() => <CityHelpSim />}
      </SimButton>
      <ReferenceButton spec={REF_21()} />
    </div>
  );
}

function Desk() {
  return (
    <SimButton
      label={tt("Open your desk and read what is waiting")}
      sub={tt("The note from the management and what the digital team, citizen service, data protection, the product team and the test lab each want, with what the company records.")}
      url="mail.city.example/inbox"
      title={tt("Simulation: the Chief Experience Officer's desk")}
      note={tt("Simulation · Case assumption: the messages and the attachment are made up from the brief · nothing here is marked right or wrong.")}
    >
      {() => (
        <DeskSim
          mailbox={tt("Inbox · Chief Experience Officer · City service company")}
          messages={[
            { from: tt("Management"), subject: tt("Voice, responsibly"), body: [tt("We plan to bring voice control and AI-supported interaction into several areas of our app, service portal and digital assistants. The first prototypes show comfort gains, but also misunderstandings, loss of control and low acceptance in sensitive situations. Inside the company voice is seen strongly as an innovation signal; robust usability, a test strategy and safe limits are not clear."), tt("We expect a sound strategy: not a list of voice features, but a decision architecture for voice interfaces, AI interaction, prototyping and test governance. The budget is limited, several stakeholders want different things, not every interaction suits voice, test data is limited, trust and our image must hold, first results must show soon, and wrong decisions can cause wrong operation, a loss of reputation and low acceptance.")] },
            { from: tt("Digital team"), subject: tt("Voice everywhere"), body: [tt("Other cities have voice in every channel. We propose voice in the app, the portal and the phone line by next year, with a free AI conversation for every topic.")] },
            { from: tt("Citizen service"), subject: tt("The calls it cannot finish"), body: [tt("We take every call the assistant could not finish, and the callers arrive angrier. Nothing sensitive should go to voice until it is tested. Open the line to hear it as a citizen does.")], attachments: [{ name: "115.city.example/voice", kind: "link", node: <CityHelpSim hints={false} /> }] },
            { from: tt("Data protection officer"), subject: tt("Read aloud"), body: [tt("A voice assistant must not read personal decisions aloud without checking who is listening. Any journey with personal data needs my agreement before it goes live.")] },
            { from: tt("Product team"), subject: tt("Our capacity"), body: [tt("We can rewrite prompts, error messages and the hand-over to staff this year, and run tests. New journeys need the vendor and take longer.")] },
            { from: tt("Test lab"), subject: tt("What we know"), body: [tt("Our test data is limited. The sheet shows what we have.")], attachments: [{ name: "what-we-tested.xlsx", kind: "sheet", node: (
              <Sheet
                title={tt("What has been tested so far (Case assumption)")}
                head={[tt("Test"), tt("Done?")]}
                rows={[
                  [tt("Simple requests (appointments, status)"), tt("yes, two sessions")],
                  [tt("Ambiguous requests"), tt("a few, by chance")],
                  [tt("Sensitive requests"), tt("no")],
                  [tt("Older and less tech-savvy citizens"), tt("a few")],
                  [tt("Why a call failed in daily use"), tt("not recorded")],
                  [tt("Voice principles and test standards"), tt("none exist")],
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
  experience: (route) => <Day11Experience route={route} />,
  slots: {
    homeassist: () => <HomeAssist />,
    designs: () => <Designs />,
    cityhelp: () => <CityHelp />,
    desk: () => <Desk />,
    observe: () => <ObserveDay11 />,
    reference: () => <ReferenceButton spec={REF_31()} />,
  },
};
