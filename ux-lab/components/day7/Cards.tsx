"use client";

import type { ReactNode } from "react";
import { ActivationFig, ArchitectureFig, DecisionFig, EmotionLayersFig, FactorsFig, FeelFig, SituationFig, ToneFig, TrustChainFig, WeighFig } from "@/components/day7/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D7 } from "@/components/day7/comicScenes";
import { COMICS_D7 } from "@/data/day7/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 7 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: Moss & Pine, Hana, Jonas, Wanda and Bruno; never WellTrack, CareerPath or
 * LifeSupport, so no task is answered here. Every statement comes from the plan's Wissen cell; the sources back it.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)")}>
    <Callout label={tt("Extra · go deeper")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const MP = () => tt("Moss & Pine, Hana, Jonas, Wanda and Bruno are made up for this example.");

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("People feel before they judge, and the feeling steers attention, motivation, trust, memory and decisions. Emotional bonding is the result over time: the sense that a product is on your side.")}
      sources={["norman2004", "damasio1994", "kahneman1993"]}
      reasoning={[
        tt("Describe the first feeling a screen gives, before you judge whether it works."),
        tt("Ask what the feeling does: where people look, whether they go on, whether they believe it, what they remember, what they choose."),
        tt("Write an effect as a hypothesis: “for users this could mean that …”."),
        tt("Look hardest at the strongest moment and at the end of a visit: people remember those."),
        tt("A correct product that feels distant is used once; a product that feels on your side is used again."),
      ]}
    >
      <ComicButton comic={COMICS_D7.A1} art={ART_D7} />
      <FeelFig />
      <DataTable
        caption={tt("What a feeling acts on")}
        head={[tt("Acts on"), tt("What it means"), tt("In an interface")]}
        rows={[
          [tt("Attention"), tt("What people notice and what they miss."), tt("A worried person reads the warning, not the offer.")],
          [tt("Motivation"), tt("Whether they go on or stop."), tt("A sense of progress keeps people in a long form.")],
          [tt("Trust"), tt("Whether they believe what they read."), tt("A calm, clear confirmation is believed.")],
          [tt("Memory"), tt("What stays after the visit."), tt("The end of a visit colours the whole of it.")],
          [tt("Decisions"), tt("What they choose next."), tt("Uncertainty makes people postpone or go elsewhere.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${MP()} The three levels of emotional design follow Norman (2004); emotion as part of reasoning follows Damasio (1994); the peak-end rule follows Kahneman et al. (1993).`)}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("Norman (2004) describes three levels on which a product acts. The visceral level is the immediate reaction to how it looks. The behavioural level is how it feels to use: whether it works, responds and lets you stay in control. The reflective level is what it means to you afterwards, what you tell others about it. A product can win one level and lose another: beautiful at first sight, frustrating to use, and remembered as frustrating.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Usable is not the same as a good experience. Safety, control, joy, belonging and recognition, and their opposites, frustration and uncertainty, decide how a usable product feels.")}
      sources={["hassenzahl2010", "norman2004", "iso9241210"]}
      reasoning={[
        tt("First check usability: can people reach their goal? Then ask how it feels on the way."),
        tt("Safety: do people know what is happening and what comes next?"),
        tt("Control: can they steer, change and undo?"),
        tt("Recognition and belonging: does the product see their effort and feel made for people like them?"),
        tt("Frustration and uncertainty: where do they get stuck or wonder whether something worked?"),
      ]}
    >
      <ComicButton comic={COMICS_D7.A2} art={ART_D7} />
      <FactorsFig />
      <DataTable
        caption={tt("The emotional factors of UX")}
        head={[tt("Factor"), tt("What people feel"), tt("A sign it is missing")]}
        rows={[
          [tt("Safety"), tt("I know what is happening."), tt("“Did it work?”")],
          [tt("Control"), tt("I can steer and undo."), tt("No way back from a step.")],
          [tt("Joy"), tt("Something is pleasant."), tt("Every step feels like a chore.")],
          [tt("Belonging"), tt("This is for people like me."), tt("Words and pictures for someone else.")],
          [tt("Recognition"), tt("My effort is seen."), tt("A finished task ends in silence.")],
          [tt("Frustration and uncertainty"), tt("I am stuck, or I do not know."), tt("Errors that blame; waiting without a word.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${MP()} Experience beyond usability follows Hassenzahl (2010); user experience as perceptions and responses before, during and after use follows ISO 9241-210.`)}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Hassenzahl (2010) separates what a product does (its pragmatic quality: useful, usable) from what it means to people (its hedonic quality: stimulation, identification). Both shape the overall experience. A health or career product that is only pragmatic is used when people must; one that also gives a sense of competence and being understood is used when they could choose otherwise.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Feelings come from four things on the screen: visual mood, interaction patterns, tone and feedback. Most of the effect sits in feedback and tone at critical moments: an error, a wait, a success.")}
      sources={["walter2011", "norman2013", "nielsen1994"]}
      reasoning={[
        tt("Visual mood: what temperature do colour, images, space and type set before anything is read?"),
        tt("Interaction: what happens when people act, and can they undo it?"),
        tt("Tone: read the error messages and confirmations aloud; would a person say that?"),
        tt("Feedback: after every action, does the product say what happened and what comes next?"),
        tt("Celebrate real successes calmly; a finished task that ends in silence wastes a moment of recognition."),
      ]}
    >
      <ComicButton comic={COMICS_D7.A3} art={ART_D7} />
      <ToneFig />
      <DataTable
        caption={tt("Four sources of emotional effect")}
        head={[tt("Source"), tt("What it sets"), tt("A question to ask")]}
        rows={[
          [tt("Visual mood"), tt("A temperature before reading: warm or distant, calm or loud."), tt("Does the look fit what people come here for?")],
          [tt("Interaction patterns"), tt("Whether people feel in control."), tt("Is every step reversible and responsive?")],
          [tt("Tone"), tt("Whether the product sounds like a person on their side."), tt("Would a helpful person say it this way?")],
          [tt("Feedback"), tt("Safety and recognition after each action."), tt("Does it say what happened, what comes next, and that it went well?")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${MP()} Tone and personality in interfaces follow Walter (2011); visibility of system status and helpful error messages are Nielsen's heuristics (1994); feedback as a basic design principle follows Norman (2013).`)}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("A supportive error message has four parts: what happened, in plain words; what it means for the person (was anything lost or charged?); what they can do now; and where help is. It never blames, never hides behind a code, and never jokes about a problem the person feels. The same four parts work for waiting: what is happening, how long it may take, what the person can do meanwhile.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Activation is not bonding. Many stimuli can overload and push; more feeling than the situation carries is over-emotionalisation; a feeling that does not fit is incongruent; emotion used against people is manipulation.")}
      sources={["mathur2019", "fogg2003", "walter2011"]}
      reasoning={[
        tt("Count the stimuli on a screen: badges, banners, countdowns, exclamation marks. Do they help the task or compete with it?"),
        tt("Ask whether the feeling fits the situation: a worry needs calm, a success may be celebrated."),
        tt("Check every urgency or scarcity message: is it true?"),
        tt("Ask whom the emotion serves: the user's goal, or only the company's?"),
        tt("Prefer feelings that keep their promise; they build lasting use."),
      ]}
    >
      <ComicButton comic={COMICS_D7.A4} art={ART_D7} />
      <ActivationFig />
      <DataTable
        caption={tt("Where emotion turns against use")}
        head={[tt("Risk"), tt("What it is"), tt("What it does")]}
        rows={[
          [tt("Overload"), tt("Too many emotional stimuli at once."), tt("People tire and miss what matters.")],
          [tt("Over-emotionalisation"), tt("More feeling than the situation carries."), tt("It feels exaggerated and less credible.")],
          [tt("Incongruent address"), tt("A feeling that does not fit the situation."), tt("People feel not taken seriously.")],
          [tt("Manipulation"), tt("Emotion used against people's interest: false urgency, guilt, hidden costs."), tt("Short-term clicks, long-term loss of trust.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${MP()} False urgency, scarcity and confirmshaming as dark patterns follow Mathur et al. (2019); the ethics of persuasive technology follow Fogg (2003).`)}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("A simple test for manipulation: would the message still work if the person knew exactly why it was written this way? A care reminder still works when people know it is meant to keep their plants alive. A countdown that resets every visit stops working the moment people see through it, and takes their trust in the next message with it.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Trust links thinking and feeling. People judge competence, honesty and goodwill from small signals. Weigh measures on effect on users, feasibility, risk and time pressure, with a reason.")}
      sources={["fogg2003", "lindgaard2006", "gibbons2018"]}
      reasoning={[
        tt("Look for the small signals of competence: clear feedback, careful wording, information that says where it comes from."),
        tt("Look for signals of honesty: no surprises, no hidden conditions, errors that say what happened."),
        tt("A good look raises trust at first; a broken promise lowers it fast."),
        tt("Rate every measure on the same four questions: effect on users, feasibility, risk, time pressure."),
        tt("A rating is a judgement with a reason, never a mark."),
      ]}
    >
      <ComicButton comic={COMICS_D7.A5} art={ART_D7} />
      <TrustChainFig />
      <WeighFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${MP()} Credibility and perceived competence follow Fogg (2003); first impressions within a fraction of a second follow Lindgaard et al. (2006); rating options on the same criteria with a reason follows Gibbons (2018). The four criteria are the ones the plan names for the case study.`)}</p>
      </Callout>
      <Extra id="A5">
        <p>{tt("Fogg (2003) found that people judge the credibility of a website largely from surface signals: design, clarity, small errors. This is why a typo or a technical error message can cost more trust than its size suggests, and why careful wording in confirmations and errors is one of the cheapest ways to build it.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("What people feel in a product comes mostly from feedback, tone and interaction, which teams build every day. Emotional UX belongs in the UX architecture, with a vision, principles, a tone guide, patterns and an owner.")}
      sources={["norman2004", "walter2011", "hassenzahl2010"]}
      reasoning={[
        tt("Check where emotion is decided today: by marketing in campaigns, or in the product's feedback and tone?"),
        tt("Write a guiding vision that says how people should feel in every touchpoint, including when something goes wrong."),
        tt("Turn it into a few principles and a tone guide every team uses."),
        tt("Build patterns once for the critical moments: confirmations, errors, waiting."),
        tt("At senior level, emotional UX is a leadership task when it shapes loyalty, acceptance and how the company is seen."),
      ]}
    >
      <ComicButton comic={COMICS_D7.B1} art={ART_D7} />
      <ArchitectureFig />
      <EmotionLayersFig />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${MP()} Emotion as a property of the product follows Norman (2004) and Hassenzahl (2010); tone and personality as a design system of their own follow Walter (2011).`)}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("A guiding vision for emotional UX is short and testable: one sentence that names the feeling and covers the hard moments. “Customers feel looked after and sure of what happens, also when something goes wrong” can be checked on every screen. “We delight our customers” cannot, and it invites over-emotionalisation.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Seriousness against closeness, activation against credibility, brand effect against user effect. Over-emotionalisation and manipulation are strategic risks. Fit the feeling to the situation and say what each choice gives up.")}
      sources={["mathur2019", "fogg2003", "gibbons2018"]}
      reasoning={[
        tt("Name the conflict as two goals and say who stands for each: marketing, the experts, the product team, the users."),
        tt("Decide the feeling by the situation: offer, care, delay, loss; not by the brand alone."),
        tt("Treat every false urgency or inappropriate cheerfulness as a risk to credibility, not as a style question."),
        tt("Write the rule down, so the conflict is not fought again on every message."),
        tt("Say what the choice gives up; a decision that gives up nothing has not been made."),
      ]}
    >
      <ComicButton comic={COMICS_D7.B2} art={ART_D7} />
      <SituationFig />
      <DataTable
        caption={tt("Standing conflicts of emotional UX")}
        head={[tt("Conflict"), tt("Who usually stands for each side"), tt("What to ask")]}
        rows={[
          [tt("Seriousness against closeness"), tt("The experts, against marketing and the brand."), tt("Can it be warm and correct at once?")],
          [tt("Activation against credibility"), tt("Marketing's targets, against long-term trust."), tt("Would the message still work if people knew why it was written?")],
          [tt("Brand effect against user effect"), tt("What the company wants to say, against what the person needs now."), tt("What does this person need in this situation?")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${MP()} The four situations are a reading of the example, not a rule for every product.`)}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("Over-emotionalisation is often a symptom of a conflict that was never settled: marketing adds warmth to every message because no one decided where warmth belongs. A short matrix in the tone guide (which feeling for which situation) settles it once and gives every team the same answer.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("Emotional quality lives only with governance: an owner of the principles and the tone guide, experts who check correctness, marketing who owns the brand, and a rule for conflicts. A decision with little data says what it decides, does not know, would reverse and gives up.")}
      sources={["simon1956", "klein2007", "walter2011"]}
      reasoning={[
        tt("Name who owns the emotional UX principles and the tone guide, and who only uses them."),
        tt("Give the experts a veto on correctness, and marketing ownership of campaigns."),
        tt("Settle conflicts by correctness first, then the effect on the person in that situation, then the brand."),
        tt("Say what you decide, what you do not know, when you would reverse it and what you give up."),
        tt("Start where changes are cheap, quick to check and easy to reverse: words and feedback."),
      ]}
    >
      <ComicButton comic={COMICS_D7.B3} art={ART_D7} />
      <DecisionFig />
      <DataTable
        caption={tt("Three parts of emotional UX governance")}
        head={[tt("Part"), tt("The question"), tt("An example (Moss & Pine)")]}
        rows={[
          [tt("Who owns what"), tt("Who owns the principles and the tone guide; who uses them?"), tt("The head of customer experience owns them; every team uses them.")],
          [tt("Who checks"), tt("Who makes sure warmth stays correct?"), tt("The nursery checks care advice; marketing checks the brand.")],
          [tt("How a conflict is decided"), tt("What happens when brand, expertise and user effect disagree?"), tt("Correctness, then the customer, then the brand; the product owner settles a tie.")],
        ]}
      />
      <Callout label={tt("Case assumption")}>
        <p>{tt(`${MP()} Deciding with limited information follows Simon (1956); the premortem follows Klein (2007).`)}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Imagine it is a year later and the new tone has failed, and ask why (Klein 2007). The usual answers: it sounded friendly but stopped being precise, so the experts withdrew; marketing used it for urgency; each team bent it until there were five tones again. Each answer is a governance gap, not a writing gap.")}</p>
      </Extra>
    </MaterialCard>
  );
}
