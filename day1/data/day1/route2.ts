import type { Block, Field } from './types';

/**
 * Route 2, Level 3: the plan's Transferprojekt (block 3.1), seven numbered items in the plan's order.
 * The plan gives no model solution for this block, so the mentor's answers are DRAFTS written from the plan's own expectation
 * ("system, decision architecture, effect, priority under uncertainty") and need your review.
 */
const text = (key: string, label: string, min = 40): Field => ({ key, label, kind: 'text', min });

export const BLOCK_3_1: Block = {
  id: '3.1',
  title: 'Block 3.1 · Develop a Neuro-UX strategy for a digital service ecosystem',
  planRow: 'Transferprojekt · Level 3',
  level: 3,
  caseName: 'Digital service ecosystem',
  intro:
    'A mid-sized company with several digital touchpoints (website, customer portal, app, chatbot) loses users when they switch between channels. Complaints are increasing, conversion is stagnating, and isolated design changes are being discussed internally. The management wants a viable UX direction for the next 24 months.',
  groups: [
    {
      heading: 'Your role',
      points: [
        'You take the perspective of a Chief Experience Officer, a Head of Digital Experience or a strategy consultant.',
        'You are not meant to optimise single screens, but to design a sound decision architecture for psychologically effective and responsible UX design.',
      ],
    },
    {
      heading: 'Conditions',
      points: [
        'The budget is limited; not all touchpoints can be reworked at the same time.',
        'The data is incomplete; only partial information from support, web analytics and sales is available.',
        'The company wants to appear more innovative but must not cause any loss of trust.',
        'Different stakeholders pursue competing goals: marketing wants activation, compliance wants safety, IT wants standardisation, sales wants closing orientation.',
        'First results should be visible in 3 months.',
      ],
    },
    {
      heading: 'What is expected of senior-level thinking',
      points: [
        'Away from the single problem, towards the system.',
        'Away from reactive improvement, towards a decision architecture.',
        'Away from the “beautiful interface”, towards responsible effect on behaviour, trust and orientation.',
        'Away from complete certainty, towards viable prioritisation under uncertainty.',
      ],
    },
  ],
  minutes: 20,
  aim: 'Think in chains of effect, take responsibility for design decisions, practise strategic UX leadership, and grow from designer to architect, leader, adviser or Chief Officer.',
  items: [
    {
      n: 1,
      prompt: 'A Neuro-UX guiding vision for the company: which psychological effect on users should be created systematically?',
      help: 'One or two sentences about the effect you want people to feel and do, in every channel.',
      fields: [text('b31-1', 'Your guiding vision', 40)],
      steps: ['Say who the users are and what they should perceive, understand and feel.', 'Keep it to one effect that every channel can serve.'],
      refs: ['B1'],
      model: {
        'b31-1':
          'Our users should feel oriented and safe in every channel: they always know where they are, what comes next and that what we tell them is true. That effect, not a look, is what every touchpoint has to deliver.',
      },
      example:
        'Another company, a regional energy supplier: “Customers should always know what their bill is made of and what they can do about it, in the app, on the phone and on paper.”',
    },
    {
      n: 2,
      prompt: 'Three strategic guiding decisions for the next 24 months, for example on the priority of orientation, trust design, reduction of cognitive load and consistency across channels.',
      help: 'Three decisions, one box each. A decision says what you will do and what you give up.',
      fields: [1, 2, 3].map((i) => text(`b31-2-${i}`, `Guiding decision ${i}`, 25)),
      steps: ['Take your vision and ask which three choices would make it real.', 'Write each as “we will …, even though that means …”.'],
      refs: ['B1', 'B2'],
      model: {
        'b31-2-1': 'We put orientation before decoration: the same colour and the same next step mean the same thing in every channel, even where that limits creative freedom.',
        'b31-2-2': 'We build trust by matching every warning to a real risk, even where marketing would like more attention.',
        'b31-2-3': 'We reduce load before we add features: nothing new is added to a channel until what is there has been cleared of competing signals.',
      },
      example:
        'Another company, a regional energy supplier: “1. One bill layout in all channels, even where the app could look nicer. 2. Plain language first, legal text second. 3. No new notices until old ones are removed.”',
    },
    {
      n: 3,
      prompt: 'A prioritised intervention architecture: which touchpoints are changed first, and why these in particular?',
      help: 'Name an order of touchpoints and the reason for the first one.',
      fields: [text('b31-3', 'Your intervention architecture', 60)],
      steps: ['List the touchpoints the case names.', 'Pick the one where users are lost, or where a change helps the other channels most.', 'Say what comes second and third, and why they can wait.'],
      refs: ['B1', 'B2'],
      model: {
        'b31-3':
          'First the changeovers between channels, because that is where the case says users are lost. Then the customer portal, which the other channels link into. The chatbot and the app follow; they can reuse what the portal has settled. Not everything can start at once, so the order follows where the loss is.',
      },
      example:
        'Another company, a regional energy supplier: “First the bill and its explanation, because most calls come from it. Then the app’s start page. The chatbot last; it can reuse the bill’s wording.”',
    },
    {
      n: 4,
      prompt: 'A risk analysis: which wrong assumptions would be especially dangerous? What happens if you optimise for aesthetics rather than effect?',
      help: 'Name two or three assumptions and the harm each could cause.',
      fields: [text('b31-4', 'Your risk analysis', 60)],
      steps: ['Write down what your strategy assumes about users.', 'For each, say what happens if it is wrong.', 'Say what optimising for looks instead of effect would do.'],
      refs: ['B1', 'B2'],
      model: {
        'b31-4':
          'Dangerous assumptions: that users move between channels the way we think; that a modern look raises trust; that more activation always helps. If we optimise for aesthetics, we may get a handsome interface that still loses people at the changeovers and may weaken trust.',
      },
      example:
        'Another company, a regional energy supplier: “If we assume customers read the app notice, we may leave out the letter and lose those who do not. If we restyle first, we look better and the calls stay.”',
    },
    {
      n: 5,
      prompt: 'A governance model: who may take UX-relevant decisions, who bears the professional responsibility, and how are conflicts of goals decided?',
      help: 'Name roles, not people. Say who decides, who is answerable and how a conflict is settled.',
      fields: [text('b31-5', 'Your governance model', 60)],
      steps: ['Name who may decide what.', 'Name who is professionally answerable.', 'Say how a conflict between marketing, compliance, IT and sales is decided and by whom.'],
      refs: ['B2'],
      model: {
        'b31-5':
          'The Head of Digital Experience owns the effect principles and decides UX questions. Compliance and IT can veto on safety and technical grounds, and have to give a reason. Marketing and sales bring goals, not designs. When goals clash, the effect principles decide; if they do not, the management board decides on the evidence that exists.',
      },
      example:
        'Another company, a regional energy supplier: “The customer-experience lead owns the bill layout. Legal may veto wording with a reason. Marketing proposes, the lead decides, the director settles a tie.”',
    },
    {
      n: 6,
      prompt: 'A decision under uncertainty: make at least one prioritised decision although important information is missing. Justify why the decision is still responsible.',
      help: 'Say what you decide, what you do not know, and when you would reverse it.',
      fields: [text('b31-6', 'Your decision and its justification', 80)],
      steps: ['State the decision in one sentence.', 'Name what you do not know.', 'Say why it is still responsible: it can be reversed, or it can be tested, or the cost of waiting is higher.'],
      refs: ['B2'],
      model: {
        'b31-6':
          'I decide to start with the changeovers between website and portal, although the data from support, analytics and sales is only partial. It is responsible because the loss there is visible in the complaints, because the change is easy to reverse and because the first results will show within 3 months whether the assumption holds. I would reverse it if the loss moves elsewhere.',
      },
      example:
        'Another company, a regional energy supplier: “I decide to rewrite the bill explanation first, though I do not know which part confuses most. It is easy to undo, and the call data will show within weeks whether it helped.”',
    },
    {
      n: 7,
      prompt: 'A management statement: a short statement to the board or the management in which you stand for your strategy.',
      help: 'Four to six sentences. The direction first, then the reason, then what you need from the board.',
      fields: [text('b31-7', 'Your management statement', 80)],
      steps: ['Start with the direction in one sentence.', 'Give the one reason that carries it.', 'Say what you ask of the board and what you will report back.'],
      refs: ['B1', 'B2'],
      model: {
        'b31-7':
          'We recommend one shared effect for all channels: orientation and trust, before decoration. We start with the changeovers, where users are lost, and we will show first results within 3 months. We ask the board to back the governance model, so that conflicts between marketing, compliance, IT and sales are settled by principle and not by preference.',
      },
      example:
        'Another company, a regional energy supplier: “We propose one rule for every channel: customers can always see what comes next. We begin with the bill. We ask the board to name the lead who settles disputes.”',
    },
  ],
};
