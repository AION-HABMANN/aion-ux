import type { Block, Field } from './types';

/**
 * Route 1, Levels 1 and 2: the plan's Arbeitsauftrag 1 (block 1.1), Arbeitsauftrag 2 (block 1.2) and the Fallstudie (block 2.1).
 * Every question is the plan's own, in the plan's order and close to its words (DL-STANDARD 1). No figure beyond what the plan prints.
 * The model answers are the mentor's key. For block 2.1 they follow the plan's Musterlösung; for 1.1 and 1.2 the plan gives none,
 * so they are DRAFTS written from the plan's own description and need your review.
 */
const text = (key: string, label: string, min = 20, prefix?: string): Field => ({ key, label, kind: 'text', min, ...(prefix ? { prefix } : {}) });
const lines = (key: string, label: string, min: number): Field => ({ key, label, kind: 'lines', min });

const CATS_1 = ['Attention', 'Orientation', 'Trust', 'Emotional effect', 'Cognitive load'];
const CATS_2 = ['Perception', 'Cognitive load', 'Trust', 'Emotional effect', 'Action guidance'];
const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');

export const BLOCK_1_1: Block = {
  id: '1.1',
  title: 'Block 1.1 · Describe and explain the effect of an unfamiliar interface (CarePath)',
  planRow: 'Arbeitsauftrag 1 · Grundlagen strukturieren',
  level: 1,
  caseName: 'CarePath',
  intro:
    'You receive the description of a fictional digital product, “CarePath”: a health app for organising appointments, medication reminders and contact with doctors. You can answer without any prior knowledge. Ask yourself what feels confusing, stressful, uncertain or unclear.',
  groups: [
    {
      heading: 'Description of the interface',
      points: [
        'The start page has 9 tiles, all highlighted equally strongly.',
        'A red warning notice sits at the top, although there is no acute problem.',
        'There are three different button colours with no recognisable system.',
        'Important information is shown in very small type.',
        'Moving elements and changing notices appear in the upper area.',
        'Personal health data, notices and advertising sit visually close together.',
      ],
    },
  ],
  minutes: 15,
  aim: 'Build systematic observation, and learn to recognise an effect before you judge it.',
  items: [
    {
      n: 1,
      prompt: 'Mark all elements that could bind or distract attention.',
      help: 'One element per line. Name each element the way the description does.',
      fields: [lines('b11-1', 'Elements that bind or distract attention, one per line', 3)],
      steps: [
        'Read the description once and underline everything that moves, glows, is large or is repeated.',
        'Ask of each one: does it help the person find what they need, or does it only pull the eye?',
        'Write one element per line, in the description’s own words.',
      ],
      refs: ['A2', 'A3'],
      model: {
        'b11-1':
          'The nine tiles that are all equally strong\nThe red warning notice at the top\nThe moving elements and changing notices in the upper area\nThe three button colours that follow no system\nThe dense block of health data, notices and advertising',
      },
      example:
        'Another product, a railway app: the animated banner for a discount, the bright red “delay” badge on every journey, and the six equally large buttons under the timetable. All three pull the eye, but only the timetable is what the traveller came for.',
    },
    {
      n: 2,
      prompt: 'Assign possible problems to the categories attention, orientation, trust, emotional effect and cognitive load.',
      help: 'Write each problem under the category it belongs to. A category can stay empty, and one problem can fit more than one.',
      anyOf: true,
      fields: CATS_1.map((c) => text(`b11-2-${slug(c)}`, c, 3)),
      steps: [
        'Take the elements from question 1 one at a time.',
        'Ask which effect each one has: does it pull attention, hide the order, weaken belief, raise worry, or add mental effort?',
        'Write it under that category in a few words. Leave a category empty if nothing fits.',
      ],
      refs: ['A1', 'A3', 'A4'],
      model: {
        'b11-2-attention': 'Nine equally strong tiles; moving elements and changing notices at the top',
        'b11-2-orientation': 'No visual order on the start page, so no clear main action; three button colours with no system',
        'b11-2-trust': 'A red warning although nothing acute is happening; health data and advertising next to each other',
        'b11-2-emotional-effect': 'The red warning causes worry; the crowded page feels stressful',
        'b11-2-cognitive-load': 'Many equal signals at once; very small type on important information; elements to ignore',
      },
      example:
        'Another product, a library catalogue: “Attention: a flashing “new arrivals” strip. Orientation: search box and filters look the same size. Trust: an alarm-red “fine due” banner for a book returned on time. Cognitive load: fourteen filters open at once.”',
    },
    {
      n: 3,
      prompt: 'Write a hypothesis for each category: “This design element could trigger the following effect in the user …”',
      help: 'One hypothesis per category, five in all. A hypothesis is an assumption you could test, so say “could”.',
      fields: CATS_1.map((c) => text(`b11-3-${slug(c)}`, `${c}: hypothesis`, 12, 'This design element could trigger the following effect in the user: …')),
      steps: [
        'Pick the element you named for the category.',
        'Finish the sentence with a feeling or an action, not with a judgement (“could make the user feel …”, “could lead the user to …”).',
        'Keep it to one effect. Say “could”; it is an assumption.',
      ],
      refs: ['A1', 'A4'],
      model: {
        'b11-3-attention': 'The moving elements could pull the user’s eye away from the appointment they came to check.',
        'b11-3-orientation': 'Nine equally strong tiles could leave the user unsure where to start, so they tap at random or give up.',
        'b11-3-trust': 'The red warning without a real problem could make the user doubt every later warning from the app.',
        'b11-3-emotional-effect': 'The red warning could make the user worried about their health before they have read anything.',
        'b11-3-cognitive-load': 'Very small type on important information could force the user to concentrate hard, or to skip it.',
      },
      example:
        'Another product, a banking app: “The red balance figure could lead the user to feel they have done something wrong even when the account is fine.”',
    },
    {
      n: 4,
      prompt: 'Name three places where an unconscious design effect could play a role.',
      help: 'An unconscious effect works before the person can say why. Name the place and the effect.',
      fields: [1, 2, 3].map((i) => text(`b11-4-${i}`, `Place ${i}`, 10)),
      steps: [
        'Think of what a person would feel in the first second, before reading anything.',
        'Name the place (an element or a combination) and say what it could do without being noticed.',
      ],
      refs: ['A4'],
      model: {
        'b11-4-1': 'The red warning at the top: it could cause unease before the user has read what it says.',
        'b11-4-2': 'Health data placed right next to advertising: it could feel unsafe without the user knowing why.',
        'b11-4-3': 'The moving elements: even when ignored, they could add a low level of stress.',
      },
      example:
        'Another product, a supermarket app: “The loud countdown on a coupon could make shoppers feel rushed, so they buy more without deciding to.”',
    },
    {
      n: 5,
      prompt: 'Develop a first simple prioritisation: what would have to be improved first, and why?',
      help: 'Name one or two things and give the reason. The reason matters more than the choice.',
      fields: [text('b11-5', 'What first, and why', 50)],
      steps: [
        'Pick the problem that affects the most later steps, or the one that could do harm if left.',
        'Say what you would change first and what effect you expect from it.',
        'Say in one sentence why the other problems can wait.',
      ],
      refs: ['A1', 'A3', 'A4'],
      model: {
        'b11-5':
          'First I would give the start page an order: one main action, the other tiles quieter. Without that, every later improvement is hard to notice. Second, I would show the red warning only when there is a real problem, because a false alarm weakens trust in every later notice. The button colours and the small type can follow.',
      },
      example:
        'Another product, a city library’s website: “I would first remove the alarm-red banner that shows for everyone, because it makes honest users feel accused and teaches them to ignore real notices. The filter layout can wait; it is annoying but not harmful.”',
    },
  ],
};

export const BLOCK_1_2: Block = {
  id: '1.2',
  title: 'Block 1.2 · Rate design effects and decide under uncertainty (SkillFlow)',
  planRow: 'Arbeitsauftrag 2 · Bewertung und Priorisierung',
  level: 1,
  caseName: 'SkillFlow',
  intro: 'You receive three alternative designs for the start page of a fictional learning platform, “SkillFlow”. The designs are described in words only.',
  groups: [
    {
      heading: 'The variants',
      points: [
        'Variant A: modern, strongly animated, emotionally activating, but dense with information.',
        'Variant B: very sober and factual, clearly structured, but not very motivating.',
        'Variant C: visually high quality, strong imagery, reduced navigation, but less transparent about the next steps.',
      ],
    },
    {
      heading: 'Conditions',
      points: [
        'The product is to go live within 8 weeks.',
        'Target group: working adults between 25 and 55.',
        'The budget for revision is limited.',
        'Management demands a “modern impression”; the support team demands “as few follow-up questions as possible”.',
        'No user tests exist yet.',
      ],
    },
  ],
  minutes: 15,
  aim: 'Train first decision ability, not just describing designs.',
  items: [
    {
      n: 1,
      prompt: 'Rate each variant on orientation, cognitive load, trust, activation and understandability.',
      help: 'One answer per variant, covering all five criteria. Plain sentences are enough; a word such as low, medium or high may help but needs a reason.',
      fields: [text('b12-1-a', 'Variant A', 40), text('b12-1-b', 'Variant B', 40), text('b12-1-c', 'Variant C', 40)],
      steps: [
        'Go through the five criteria one by one for the variant.',
        'For each, say better, worse or about even, and name the feature in the description that makes you say so.',
        'Keep to what the description says; do not invent features.',
      ],
      refs: ['A1', 'A3', 'A4'],
      model: {
        'b12-1-a':
          'Orientation: weaker, the information is dense. Cognitive load: high, animation and density compete. Trust: mixed, it looks modern but may feel restless. Activation: strong. Understandability: weaker, because so much is shown at once.',
        'b12-1-b':
          'Orientation: strong, the structure is clear. Cognitive load: low. Trust: strong, it is factual. Activation: weak, it is not very motivating. Understandability: strong.',
        'b12-1-c':
          'Orientation: weaker, the navigation is reduced and the next steps are not clear. Cognitive load: low to medium. Trust: weaker, because it is not transparent. Activation: strong through the imagery. Understandability: weaker.',
      },
      example:
        'Another product, a recipe app, two variants: “Variant X (photo wall): orientation weaker, you cannot tell where recipes are; activation strong. Variant Y (list): orientation strong; activation weak; trust strong because it looks complete.”',
    },
    {
      n: 2,
      prompt: 'Make a reasoned prioritisation decision: which variant would be the most viable under the given conditions?',
      help: 'Choose one variant, then give your reasons using the conditions. There is no single right choice, but the reason has to rest on the conditions.',
      fields: [
        { key: 'b12-2-pick', label: 'Your choice', kind: 'pick', min: 1, options: ['Variant A', 'Variant B', 'Variant C'] },
        text('b12-2-why', 'Why this variant', 50),
      ],
      steps: [
        'Say which of the five conditions weighs most for you (8 weeks, limited budget, no tests, management against support).',
        'Say how your choice meets that condition better than the other two.',
        'Say what the choice gives up.',
      ],
      refs: ['A3', 'A5'],
      model: {
        'b12-2-pick': 'Variant B',
        'b12-2-why':
          'With 8 weeks, a limited budget and no user tests, the least risky base is the clear one: Variant B is easy to understand and generates the fewest follow-up questions for the support team. It gives up activation, so I would add one activating element from A or C later and test it.',
      },
      example:
        'Another product, a recipe app: “I choose the list. With a small team and no tests, the clear version fails least, and cooks who open it want to find a recipe, not be impressed. It is less exciting, so I would try one photo section after launch.”',
    },
    {
      n: 3,
      prompt: 'Which risks are you knowingly taking with your decision?',
      help: 'Name at least one risk and say who would feel it.',
      fields: [text('b12-3', 'Risks you accept', 40)],
      steps: ['Think of what the chosen variant is weak at.', 'Say who would notice (users, management, support) and what would happen.'],
      refs: ['A5'],
      model: {
        'b12-3':
          'The risk is that Variant B looks plain, so management may find it not modern enough and users who need motivation may drop out. I accept it because the alternative risks are confusion and a high number of follow-up questions, and I have no test data to show otherwise.',
      },
      example:
        'Another product, a recipe app: “I accept that the list looks dull, so the owner may be disappointed and casual visitors may leave sooner.”',
    },
    {
      n: 4,
      prompt: 'What information is missing for a safe decision?',
      help: 'Name what you would want to know and how you would find it out.',
      fields: [text('b12-4', 'What is missing', 40)],
      steps: ['Name the assumption your decision rests on.', 'Say what evidence would confirm or refute it, and who or what could supply it.'],
      refs: ['A5'],
      model: {
        'b12-4':
          'There are no user tests, so I do not know whether working adults between 25 and 55 find B too dull, find A overloaded or find C unclear. A short test of the three start pages with a few users from the target group would settle most of it.',
      },
      example:
        'Another product, a recipe app: “I do not know whether people open it to browse or to find one recipe. A look at what they search for would tell me.”',
    },
    {
      n: 5,
      prompt: 'Write a management statement: “Under uncertainty we provisionally decide for …, because …”',
      help: 'Two sentences at most. State the decision, the reason and, if you can, what would change your mind.',
      fields: [text('b12-5', 'Your management statement', 40, 'Under uncertainty we provisionally decide for …, because …')],
      steps: ['Fill the gaps in the plan’s sentence.', 'Add what you would check next.'],
      refs: ['A5'],
      model: {
        'b12-5':
          'Under uncertainty we provisionally decide for Variant B, because it is the clearest and the safest within 8 weeks and a limited budget. We will test one activating element after launch.',
      },
      example:
        'Another product, a recipe app: “Under uncertainty we provisionally decide for the list, because it is the fastest to make well and the least likely to confuse. We will test a photo section afterwards.”',
    },
  ],
};

export const BLOCK_2_1: Block = {
  id: '2.1',
  title: 'Block 2.1 · Redesign of an insurance portal (SafeHome Online)',
  planRow: 'Fallstudie (2 UE) · Level 2',
  level: 2,
  caseName: 'SafeHome Online',
  intro:
    'An insurance company runs a self-service portal for damage reports, contract overviews and document download. The portal is judged to be complete in content, but it has massive usage problems.',
  groups: [
    {
      heading: 'Starting point',
      points: [
        'The abandonment rate for damage reports is 46 %.',
        'Many calls to the service centre, although the online functions exist.',
        'Users find the portal “complicated”, “cold” and “unsafe”.',
        'Internal specialist departments want to add more notices and safeguards.',
        'The management demands a modern, trustworthy and more efficient customer experience.',
      ],
    },
    {
      heading: 'Description of the current portal',
      points: [
        'Very many blocks of text and legal notices directly on the entry page.',
        'Primary actions are not visually emphasised.',
        'Progress in the process is not visible.',
        'Warning colours are often used, even for neutral information.',
        'The document upload is formally correct but worded in an emotionally off-putting way.',
        'Important actions are partly placed below long information texts.',
      ],
    },
    {
      heading: 'Conditions',
      points: [
        'Budget for the first optimisation: €180,000.',
        'Time to implement: 12 weeks.',
        'The legal notices must not be dropped.',
        'IT can intervene only to a limited extent at short notice.',
        'No full relaunch is possible; targeted prioritisation is needed.',
      ],
    },
  ],
  minutes: 20,
  aim: 'Apply neuroscientific and psychological UX principles to a realistic decision situation.',
  items: [
    {
      n: 1,
      prompt: 'Carry out a simplified psychological UX analysis: identify at least 5 central effect problems in the current portal.',
      help: 'One problem per line. Say what the design does to people, not only what is wrong with it.',
      fields: [lines('b21-1', 'Effect problems, one per line', 5)],
      steps: [
        'Go through the description of the portal line by line.',
        'For each, ask what it does to attention, understanding, trust or the wish to continue.',
        'Write each as an effect, for example “too many signals at once make it hard to find the first step”.',
      ],
      refs: ['A1', 'A2', 'A3', 'A4'],
      model: {
        'b21-1':
          'Information overload from too many signals at the same time\nNo visual hierarchy, which makes orientation hard\nWarning signals used so often that they cause needless uncertainty\nNo sense of progress, which raises the likelihood of abandoning\nLegal-sounding language weakens trust and the readiness to act',
      },
      example:
        'Another product, a tax-return service: “Too many field explanations open at once, so the next step is hard to find. Every page ends in a red “Attention” box, so real errors look like routine. No count of the steps left, so people stop at page three.”',
    },
    {
      n: 2,
      prompt: 'Assign the problems to the categories perception, cognitive load, trust, emotional effect and action guidance.',
      help: 'Write each problem under the category it belongs to. A category can stay empty, and one problem can fit more than one.',
      anyOf: true,
      fields: CATS_2.map((c) => text(`b21-2-${slug(c)}`, c, 3)),
      steps: [
        'Take the problems from question 1 one at a time.',
        'Choose the category of the strongest effect; add it to a second one if it clearly fits.',
        'Leave a category empty if nothing in the portal fits it.',
      ],
      refs: ['A1', 'A3', 'A4'],
      model: {
        'b21-2-perception': 'No visual hierarchy, so the primary actions are not seen',
        'b21-2-cognitive-load': 'Too many signals at the same time; long texts above the actions',
        'b21-2-trust': 'Legal-sounding language; warning colours used for neutral information',
        'b21-2-emotional-effect': 'Emotionally off-putting wording of the upload; needless uncertainty from over-used warnings',
        'b21-2-action-guidance': 'No visible progress; actions placed below long texts, so the next step is hard to find',
      },
      example:
        'Another product, a tax-return service: “Perception: the “continue” button is the same grey as “back”. Trust: the red box on every page. Action guidance: no indication of how many steps are left.”',
    },
    {
      n: 3,
      prompt: 'Develop 4 prioritised improvement measures.',
      help: 'One measure per line, most important first.',
      fields: [lines('b21-3', 'Measures, most important first', 4)],
      steps: ['Turn each problem group into something you could change.', 'Order them by what would help people most within the conditions.'],
      refs: ['A3', 'A4', 'A5'],
      model: {
        'b21-3':
          'Introduce a visual hierarchy and clear primary actions\nTurn the process into clear steps with a progress indicator\nDifferentiate warning and risk communication: emphasise only real risks, and word neutral information calmly and clearly\nRewrite microcopy and upload communication',
      },
      example:
        'Another product, a tax-return service: “1. One main button per page. 2. Show “Step 3 of 6” on every page. 3. Keep the red box for real errors only. 4. Reword the upload instructions in plain language.”',
    },
    {
      n: 4,
      prompt: 'Justify your prioritisation using the criteria: effect on users, feasibility, risk and time pressure.',
      help: 'Use all four criteria. Say how each measure scores or why the order holds.',
      fields: [text('b21-4', 'Your justification', 80)],
      steps: [
        'For the first measure, say what it changes for users and why it is feasible within the conditions.',
        'Say what risk each carries and how the 12 weeks and the limited IT help shape the order.',
        'Keep the legal notices in mind: they stay.',
      ],
      refs: ['A3', 'A5'],
      model: {
        'b21-4':
          'The measures have a high user effect and need comparatively little technical intervention. Measures 1 and 2 reduce abandonment directly. Measures 3 and 4 strengthen trust and reduce uncertainty. The legal requirements stay, but they are integrated in a more user-friendly way.',
      },
      example:
        'Another product, a tax-return service: “A progress indicator and one main button need little change in the system, so they fit a short time, and they help the most people. The reworded upload is easy but helps fewer people. The legal text stays and moves lower on the page.”',
    },
    {
      n: 5,
      prompt: 'Write a short recommendation to the management.',
      help: 'Three to five sentences. Lead with the decision.',
      fields: [text('b21-5', 'Your recommendation', 80)],
      steps: ['Say what you recommend and what you do not.', 'Give the one reason that will carry the board.', 'Say what you expect to change.'],
      refs: ['A5', 'A3'],
      model: {
        'b21-5':
          'We do not prioritise a cosmetic modernisation but an effect-oriented reorganisation of user guidance. The portal has to be relieved psychologically first, given a clear structure and worded in a way that builds trust. That lowers abandonment and support effort at a justifiable budget and implementation risk.',
      },
      example:
        'Another product, a tax-return service: “We recommend relief before restyling. First we reduce what people have to take in at once and show them how far they are. The new look can wait; abandonment and calls will drop sooner with the first step.”',
    },
  ],
};
