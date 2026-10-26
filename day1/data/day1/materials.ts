import type { Card } from './types';

/**
 * Materi of Day 1 (DL-STANDARD 6 and CLAUDE.md #50): the cards are the plan's own topic groups of the day's Wissen cell, in the plan's
 * order, each carrying that group's bullets and nothing the plan does not name. Where a task needs a word the plan's bullets only imply
 * (cognitive load, hypothesis), the card teaches it in one line. No price, no budget, no figure the plan does not print.
 * Minutes are DRAFT estimates (15 per card).
 */
export const CARDS: Card[] = [
  {
    id: 'A1',
    route: 1,
    title: 'UX, UI and the psychology behind them',
    scan: 'The words you will need, and why a design that looks good can still work badly.',
    minutes: 12,
    planRef:
      'Begriffsklärung: UX, UI, Nutzererleben, Wahrnehmung, Kognition, Aufmerksamkeit, Emotion, mentale Modelle · Unterschied zwischen rein ästhetischem Design und psychologisch wirksamem UX-Design',
    plain: {
      words: [
        'UX is everything a person goes through when using a product: what they see, understand, feel and do. UI is the part they see and touch.',
        'A page can be beautiful and still make people overlook the button, doubt the company or give up. Psychological UX design asks what a design does to attention, understanding, feeling and decision, not only how it looks.',
      ],
      why: 'Task 1.1 (CarePath) and Task 2.1 (SafeHome) both ask you to describe what a design does to people before you judge it. This card gives you the words for that.',
      read: '',
    },
    body: [
      {
        heading: 'Words you will meet',
        points: [
          'User experience (UX): the whole experience of using a product, before, during and after.',
          'User interface (UI): what is on the screen and how it can be used.',
          'Perception: taking in what you see and hear. Cognition: thinking, remembering, comparing and deciding. Attention: what the brain picks out to work on.',
          'Emotion: the feeling a design triggers, often before you notice it.',
          'Mental model: what a person believes the product is and how it works. A design works well when it fits that belief.',
        ],
      },
      {
        heading: 'Looks good versus works well',
        points: [
          'Aesthetic design asks: is it attractive and consistent with the brand?',
          'Psychologically effective UX design asks: what will people notice first, understand, feel and do? It is judged by that effect.',
          'The two can agree or conflict. A calm page with one clear action can be plain and effective; a rich page can be impressive and exhausting.',
        ],
      },
    ],
    rules: [
      'When you are asked whether a design is good, say what it does to attention, understanding, trust and action. Do not answer with whether you like it.',
      'Separate taste (“I like it”) from an effect assumption (“users will probably overlook this button, because …”). Only the second can be tested.',
    ],
    sources: [
      'Norman, D. A. (2013). The Design of Everyday Things (revised and expanded edition). Basic Books. Conceptual models and mental models.',
      'ISO 9241-210:2019. Ergonomics of human-system interaction, human-centred design for interactive systems. Defines user experience.',
    ],
  },
  {
    id: 'A2',
    route: 1,
    title: 'How people see: the neural basics of perception',
    scan: 'What the eye and brain do first, and how knowledge and expectation change what a person sees.',
    minutes: 12,
    planRef:
      'Neuronale Grundlagen der visuellen Wahrnehmung: Reizaufnahme, Aufmerksamkeitslenkung, Mustererkennung, kognitive Verarbeitung · Bottom-up und Top-down · Vorwissen, Erwartungen, Kontext, Gewohnheiten',
    plain: {
      words: [
        'Seeing is not a camera. The eye takes in light, the brain picks out what stands out, finds patterns and then tries to make sense of them.',
        'Two forces steer this. A strong signal such as movement or a bright colour pulls attention by itself (bottom-up). What you want, know and expect pulls it too (top-down).',
      ],
      why: 'Task 1.1 asks which elements bind or distract attention, and Task 1.2 compares designs that pull attention in different ways. You need both forces to explain why.',
      read: '',
    },
    body: [
      {
        heading: 'From light to meaning, in four steps',
        points: [
          'Taking in the stimulus: the eye collects light, and the brain detects edges, colour, size and movement.',
          'Steering attention: what differs from its surroundings is processed first.',
          'Recognising patterns: the brain groups things and matches them to what it already knows.',
          'Cognitive processing: meaning is built, options are compared and a decision is made.',
        ],
      },
      {
        heading: 'Bottom-up and top-down together',
        points: [
          'Bottom-up: the stimulus pulls attention. Movement, strong contrast, a saturated colour or a large shape catch the eye whether or not they matter.',
          'Top-down: the goal and the knowledge steer attention. Someone who wants to book an appointment looks for something that says “appointment”.',
          'In an interface both run at once. When a strong signal does not match the goal, users are slowed down or led astray.',
        ],
      },
      {
        heading: 'What people bring with them',
        points: [
          'Prior knowledge and habits: people expect a menu, a search field or a back button where other products put them.',
          'Expectations and context: the same screen is read differently by someone in a hurry, someone worried, or someone using it for the first time.',
        ],
      },
    ],
    rules: [
      'A strong signal that is not part of the task (movement, a saturated colour, a banner) competes with the task. Count it as a distraction.',
      'If an element behaves differently from similar products, assume users will be slower or will decide wrongly.',
      'Context changes the effect: do not judge a screen for a worried or rushed user as if the user were calm.',
    ],
    sources: [
      'Itti, L. & Koch, C. (2001). Computational modelling of visual attention. Nature Reviews Neuroscience, 2(3), 194–203.',
      'Corbetta, M. & Shulman, G. L. (2002). Control of goal-directed and stimulus-driven attention in the brain. Nature Reviews Neuroscience, 3(3), 201–215.',
      'Treisman, A. M. & Gelade, G. (1980). A feature-integration theory of attention. Cognitive Psychology, 12(1), 97–136.',
    ],
  },
  {
    id: 'A3',
    route: 1,
    title: 'Using it in an interface: orientation, less confusion, steered attention',
    scan: 'Three things a design must achieve, and how a person’s mental load changes what they can do.',
    minutes: 12,
    planRef: 'Anwendung neurowissenschaftlicher Erkenntnisse im Interface-Design: Orientierung, Reduktion von Verwirrung, Steuerung von Aufmerksamkeit',
    plain: {
      words: [
        'A good interface answers three questions at once: where am I, what can I do, and what comes next. It also keeps the number of competing signals low, so the person can think about the task instead of the screen.',
        'Cognitive load is how much the person has to hold in mind and work out at the same time. Every extra signal adds to it.',
      ],
      why: 'Task 1.1 and Task 2.1 ask you to sort problems into categories such as orientation and cognitive load, and Task 1.2 asks you to rate designs on them.',
      read: '',
    },
    body: [
      {
        heading: 'Orientation',
        points: [
          'People should see where they are, what the main action is and what happens after it.',
          'A visible order (one main action, secondary ones quieter) shows the way; many equally strong elements show nothing.',
          'A system helps: the same colour or shape should always mean the same thing.',
        ],
      },
      {
        heading: 'Less confusion',
        points: [
          'Fewer competing signals at once means less cognitive load.',
          'Related things belong together; unrelated things need space between them.',
          'Plain labels and short sentences cost less effort than technical or legal wording.',
        ],
      },
      {
        heading: 'Steering attention on purpose',
        points: [
          'Size, contrast, position, space and movement all steer attention. Use them for what matters, and sparingly.',
          'Movement and warning colours are the strongest signals. If they do not serve the task, they distract.',
        ],
      },
    ],
    rules: [
      'Count how many elements are equally strong. Many equally strong elements mean there is no visual order, which is an orientation problem.',
      'A variation with no system (three button colours with no meaning) breaks orientation, because the person cannot learn what a colour means.',
      'Movement needs a reason. If it does not help the task, treat it as a distraction.',
      'Put important information where the eye goes and large enough to read; small type on the thing that matters costs attention and trust.',
    ],
    sources: [
      'Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. Cognitive Science, 12(2), 257–285.',
      'Nielsen, J. (1994). 10 Usability Heuristics for User Interface Design: visibility of system status, consistency and standards, aesthetic and minimalist design. Nielsen Norman Group.',
    ],
  },
  {
    id: 'A4',
    route: 1,
    title: 'Feelings and unconscious effects: trust, reactance, overload, safety, liking',
    scan: 'Effects that work before a person has thought about it, and how they change what people do.',
    minutes: 12,
    planRef: 'Emotionale und unbewusste Designwirkungen: Vertrauen, Reaktanz, Überforderung, Sicherheit, Sympathie',
    plain: {
      words: [
        'People react to a design before they have thought about it. In a fraction of a second they feel whether it looks trustworthy, safe and pleasant, and that first feeling colours what follows.',
        'Five effects matter most: trust, reactance (pushing back when you feel pushed), overload, a sense of safety and plain liking.',
      ],
      why: 'Tasks 1.1 and 2.1 ask about trust and emotional effect, and Task 1.2 asks you to rate designs on trust and activation. This card is where those words come from.',
      read: '',
    },
    body: [
      {
        heading: 'Five effects',
        points: [
          'Trust: the person believes the product is honest and competent. Clear language, consistency and warnings that match the real risk build it; alarms where nothing is wrong destroy it.',
          'Reactance: the urge to resist when something feels like pressure or control. Pushy prompts can cause the opposite of what was intended.',
          'Overload: too much at once. People freeze, skip things or leave.',
          'Safety: the feeling that nothing bad will happen. Clear steps, a visible way back and a calm tone build it.',
          'Liking: sympathy for the product, through warmth, tone and visual quality. It helps, and it is not the same as clarity.',
        ],
      },
      {
        heading: 'Unconscious effects',
        points: [
          'Many of these effects work before a person can say why. Users usually cannot tell you that the red banner made them uneasy; they just feel uneasy.',
          'So you cannot ask only “what did you notice?”. You have to infer the effect from the design and then test it.',
        ],
      },
    ],
    rules: [
      'A warning shown when nothing is wrong teaches people to ignore warnings or to feel unsafe. Treat it as a trust problem and an emotional problem.',
      'Pressure in the wording or the design can trigger reactance instead of action.',
      'Personal or health data placed right next to advertising or clutter weakens the feeling of safety.',
      'Write an effect as a hypothesis: “This element could make the user feel …”. It is an assumption until it is tested.',
    ],
    sources: [
      'Brehm, J. W. (1966). A Theory of Psychological Reactance. Academic Press.',
      'Lindgaard, G., Fernandes, G., Dudek, C. & Brown, J. (2006). Attention web designers: You have 50 milliseconds to make a good first impression! Behaviour & Information Technology, 25(2), 115–126.',
      'Fogg, B. J. (2003). Prominence-interpretation theory: Explaining how people assess credibility online. CHI ’03 Extended Abstracts, 722–723.',
    ],
  },
  {
    id: 'A5',
    route: 1,
    title: 'Conflicting goals: weighing and deciding',
    scan: 'Three standing conflicts in UX, and how to choose between them when the conditions are tight.',
    minutes: 12,
    planRef: 'Zielkonflikte im UX-Design: Ästhetik vs. Klarheit, Innovation vs. Vertrautheit, Aktivierung vs. Überlastung',
    plain: {
      words: [
        'In UX the goals often pull against each other: beautiful or clear, new or familiar, activating or not overloading. There is rarely one right answer, so the job is to choose and to say why.',
        'You choose with the conditions in front of you: how much time, which users, what is known, who wants what. Then you say what you accept and what you do not know.',
      ],
      why: 'Block 1.2 gives you three designs and five conditions and asks you to decide. Block 2.1 gives you a portal and asks you to prioritise four measures.',
      read: '',
    },
    body: [
      {
        heading: 'Three standing conflicts',
        points: [
          'Aesthetics versus clarity: the most attractive page is not always the clearest.',
          'Innovation versus familiarity: new patterns impress, familiar ones are understood without effort.',
          'Activation versus overload: motivating elements raise energy, and too many of them tire people out.',
        ],
      },
      {
        heading: 'Choosing under conditions',
        points: [
          'Start from what is given: the time, the target group, the resources and what different people ask for.',
          'Say which conflict you are deciding, and what you give up by choosing.',
          'When information is missing, decide anyway and say what you assume and what you would check next.',
        ],
      },
    ],
    rules: [
      'Name the conflict as two goals before you choose between them.',
      'Decide, then say what you accept, what you do not know and what would change your mind.',
      'Where information is missing, prefer the decision you can reverse and learn from fastest.',
      'A choice rests on the conditions. If you cannot point to one, the reason is only taste.',
    ],
    sources: [
      'Simon, H. A. (1956). Rational choice and the structure of the environment. Psychological Review, 63(2), 129–138.',
      'Norman, D. A. (2013). The Design of Everyday Things (revised and expanded edition). Basic Books.',
    ],
  },
  {
    id: 'B1',
    route: 2,
    title: 'Neuro-UX as a strategy: design steers perception, behaviour and decision',
    scan: 'Why a design decision is an effect decision, and what that means across a whole service.',
    minutes: 15,
    planRef: 'Einführung in die ganzheitliche Neuro-UX-Strategie: Design nicht nur als Oberfläche, sondern als Steuerung von Wahrnehmung, Verhalten und Entscheidung',
    plain: {
      words: [
        'A design is not only a surface. Every choice steers what people see, what they understand and what they do next.',
        'A Neuro-UX strategy states the effect you want, such as orientation, trust or less overload, and then makes the design choices across all touchpoints serve it.',
      ],
      why: 'Task 3.1 asks for a guiding vision and for strategic decisions across a website, a portal, an app and a chatbot. You work from the effect you want, not from single screens.',
      read: '',
    },
    body: [
      {
        heading: 'Design as steering',
        points: [
          'Each element has an effect on perception, behaviour and decision, whether or not anyone intended it.',
          'A strategy chooses the effect on purpose and then checks that the elements deliver it.',
        ],
      },
      {
        heading: 'Across touchpoints',
        points: [
          'A person moves between channels. If each channel steers differently, people get lost at the changeovers.',
          'A shared effect logic, such as the same meaning for the same colour and the same next step, keeps the journey readable.',
        ],
      },
      {
        heading: 'Responsibility',
        points: [
          'Steering behaviour is a responsibility. The effect has to be one you can explain to the user and defend to the board.',
        ],
      },
    ],
    rules: [
      'Start from the effect you intend (what should people perceive, understand and do?), then choose the design means.',
      'Prefer the same effect logic in every channel over isolated improvements to single screens.',
      'Say why a steering effect is in the user’s interest; if you cannot, it is a risk.',
      'List the assumptions your strategy makes about users. A wrong assumption about how people move between channels, or a design chosen for looks instead of effect, is the most dangerous kind.',
    ],
    sources: [
      'Norman, D. A. (2013). The Design of Everyday Things (revised and expanded edition). Basic Books.',
      'Kahneman, D. (2011). Thinking, Fast and Slow. Farrar, Straus and Giroux.',
    ],
  },
  {
    id: 'B2',
    route: 2,
    title: 'The manager’s role: accountable decisions under uncertainty',
    scan: 'What changes at management level, and why a design decision is an accountable decision, not a matter of taste.',
    minutes: 15,
    planRef: 'Rolle künftiger Fach- und Führungskräfte: Designentscheidungen als verantwortete Wirkentscheidungen statt Geschmacksfragen · Input Level 3 der Feedbackrunde',
    plain: {
      words: [
        'A person who leads UX is accountable for the effect of design decisions. “I like it” is not a reason; an effect, a risk and a priority are.',
        'At this level the conflicts widen. User effect, brand image, effort, risk and economics all pull on one decision, and several departments want different things. Perfect information never arrives, so the decision has to be one you can answer for.',
      ],
      why: 'Block 3.1 asks for three guiding decisions, a governance model and a decision although information is missing. All three are about taking responsibility.',
      read: '',
    },
    body: [
      {
        heading: 'What changes at management level',
        points: [
          'The conflicts widen: user effect, brand image, effort, risk and economics all pull on a decision.',
          'Good decisions balance user interest, feasibility, regulatory requirements, brand impact and resources.',
          'What matters is not perfect information but a prioritisation you can answer for under uncertainty.',
        ],
      },
      {
        heading: 'Who decides',
        points: [
          'When departments want different things (marketing wants activation, compliance wants safety, IT wants standardisation, sales wants closing), someone has to decide on a stated basis. That is a governance question, not a design question.',
          'Governance says who may decide what, who is answerable and how a conflict is settled.',
        ],
      },
      {
        heading: 'The role',
        points: ['Designers and managers who own UX decisions treat them as accountable effect decisions, not as matters of taste.'],
      },
    ],
    rules: [
      'Say what you decide, what you do not know and when you would reverse it.',
      'Name who decides and on what basis whenever departments disagree.',
      'Prefer the decision that can be reversed and that the first results will show within a short time.',
      'Make the effect, the risk and the priority explicit, so the board can challenge them.',
    ],
    sources: [
      'Simon, H. A. (1956). Rational choice and the structure of the environment. Psychological Review, 63(2), 129–138.',
      'Kahneman, D. (2011). Thinking, Fast and Slow. Farrar, Straus and Giroux.',
    ],
  },
];

export const cardById = Object.fromEntries(CARDS.map((c) => [c.id, c])) as Record<Card['id'], Card>;
export const cardsOf = (route: 1 | 2) => CARDS.filter((c) => c.route === route);
