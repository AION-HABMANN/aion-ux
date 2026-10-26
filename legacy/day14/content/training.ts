import type { Category } from './categories';

/**
 * Training Ground practice items.
 *
 * CRITICAL: every scenario here is deliberately drawn from a domain that none
 * of the graded cases touch. Nothing in this file may leak an observation that
 * BuildVision (technical service), HealthSpace (health and prevention),
 * IndustryXR (industrial training/maintenance/support) or the Transfer Project
 * are graded on.
 */

export const VERDICTS = [
  'Genuine added value',
  'Demonstration effect only',
  'Overload risk',
] as const;

export type Verdict = (typeof VERDICTS)[number];

export type PracticeItem = {
  id: string;
  domain: string;
  title: string;
  scenario: string[];
  /** At most ONE item in this file may use model-viewer, and only for an AR object. */
  model?: { src: string; alt: string; fallback: string; poster?: string };
  reveal: {
    verdict: Verdict;
    what: string;
    who: 'User' | 'Organisation' | 'Both';
    whoDetail: string;
    category: Category;
    categoryWhy: string;
    fix: {
      before: { label: string; elements: string[]; note: string };
      after: { label: string; elements: string[]; note: string };
    };
  };
};

export const PRACTICE_ITEMS: PracticeItem[] = [
  {
    id: 'museum-labels',
    domain: 'Museum',
    title: 'AR labels in a museum gallery',
    scenario: [
      'A museum gives visitors an AR headset for a gallery of twelve paintings.',
      'Each painting carries five floating labels at once: title, date, technique, restoration history, and a related work.',
      'Visitors report that they enjoyed it but cannot say what any single painting was about.',
    ],
    reveal: {
      verdict: 'Overload risk',
      what:
        'Sixty simultaneous labels are placed into a room where the exhibit itself is the thing to look at. The overlay competes with the artwork rather than supporting it, and nothing establishes what to read first.',
      who: 'User',
      whoDetail:
        'The visitor carries the cost directly: attention is spent sorting labels instead of looking, and recall drops.',
      category: 'Cognitive Load',
      categoryWhy:
        'The content is defensible; the number of simultaneous stimuli and the absence of perceptual guidance are not.',
      fix: {
        before: {
          label: 'Before — everything at once',
          elements: ['Title', 'Date', 'Technique', 'Restoration', 'Related work'],
          note: 'Five anchored labels per painting, all visible on approach, none prioritised.',
        },
        after: {
          label: 'After — one anchor, depth on request',
          elements: ['Title', '+ more'],
          note: 'One label on approach; the remaining four open on demand, one at a time.',
        },
      },
    },
  },
  {
    id: 'retail-appliance',
    domain: 'Retail',
    title: 'AR product explainer at a shop counter',
    scenario: [
      'A shop places a counter appliance on a plinth with a tablet mounted beside it.',
      'Pointing the tablet at the appliance anchors two labels: where the water tank sits and where the filter is changed.',
      'These are the two questions staff answer most often, and the labels sit on the parts themselves.',
    ],
    model: {
      src: '/models/retail-product.glb',
      alt: 'A small retail counter appliance with two anchored AR labels',
      fallback: '/fallback/retail-product.svg',
    },
    reveal: {
      verdict: 'Genuine added value',
      what:
        'The overlay answers the two questions that actually get asked, anchored to the parts they refer to. A customer no longer has to map a diagram in a manual onto the object in front of them.',
      who: 'Both',
      whoDetail:
        'The customer gets the answer at the object; the shop recovers staff time that went into repeating it.',
      category: 'User Value',
      categoryWhy:
        'The advantage comes from anchoring, which a printed sheet cannot provide — not from the novelty of using AR.',
      fix: {
        before: {
          label: 'Before — printed spec sheet',
          elements: ['Spec sheet', 'Diagram', 'Object'],
          note: 'The customer reads a diagram, then maps it onto the object themselves.',
        },
        after: {
          label: 'After — two anchored labels',
          elements: ['Water tank', 'Filter'],
          note: 'Two labels on the parts, no mapping step, nothing else competing.',
        },
      },
    },
  },
  {
    id: 'airport-wayfinding',
    domain: 'Air travel',
    title: 'AR wayfinding glasses at an airport',
    scenario: [
      'An airport lends AR glasses that draw a coloured path across the terminal floor to the gate.',
      'Collection and return desks are located before security and after baggage claim.',
      'Average wear time in the trial was four minutes; the terminal already has overhead signage every thirty metres.',
    ],
    reveal: {
      verdict: 'Demonstration effect only',
      what:
        'The path is impressive and works, but the journey to borrow and return the device is longer than the journey it guides, and the existing signage already solves the same problem.',
      who: 'Organisation',
      whoDetail:
        'Passengers lose little; the airport carries device logistics, cleaning, and support for an advantage it already had.',
      category: 'Feasibility',
      categoryWhy:
        'Nothing about the concept fails — the operating model around it does not hold at terminal scale.',
      fix: {
        before: {
          label: 'Before — lent hardware',
          elements: ['Collect device', 'Wear', 'Return device'],
          note: 'Three steps of overhead around four minutes of guidance.',
        },
        after: {
          label: 'After — the passenger’s own phone',
          elements: ['Open pass', 'Follow path'],
          note: 'Same anchored path, no hardware to hand out, and it survives past the trial.',
        },
      },
    },
  },
  {
    id: 'architecture-review',
    domain: 'Architecture',
    title: 'VR walkthrough in a client review',
    scenario: [
      'An architecture studio ends each client review with a ten-minute VR walkthrough of the proposed interior.',
      'Clients repeatedly ask to move a wall after walking the space — a change they never requested from the floor plan.',
      'The studio reports fewer late-stage change requests since introducing it.',
    ],
    reveal: {
      verdict: 'Genuine added value',
      what:
        'Standing inside the space surfaces a judgement about scale and sightlines that a plan drawing cannot produce. The change requests move earlier, where they are cheap.',
      who: 'Both',
      whoDetail:
        'The client makes a better-informed decision; the studio avoids rework that would otherwise land late.',
      category: 'User Value',
      categoryWhy:
        'The value comes specifically from presence and scale — precisely what the flat medium loses.',
      fix: {
        before: {
          label: 'Before — plan drawings only',
          elements: ['Floor plan', 'Elevation', 'Render'],
          note: 'Three flat views; the client judges scale by imagining it.',
        },
        after: {
          label: 'After — plans plus one walkthrough',
          elements: ['Floor plan', 'Walkthrough'],
          note: 'The drawings stay for detail; the walkthrough answers the question they cannot.',
        },
      },
    },
  },
  {
    id: 'geology-field-trip',
    domain: 'Higher education',
    title: 'VR field trip for a geology course',
    scenario: [
      'A university replaces one inaccessible field site with a VR reconstruction of the same rock formation.',
      'Students can walk the formation and measure the same features they would measure on site.',
      'The reconstruction was built once, from a survey the department already owned.',
    ],
    reveal: {
      verdict: 'Genuine added value',
      what:
        'The alternative is not a cheaper field trip — it is no field trip at all. The immersive version delivers the observation task for a cohort that could not otherwise reach the site.',
      who: 'User',
      whoDetail:
        'Students gain access to an exercise that was previously unavailable to them, including those who cannot travel.',
      category: 'Economic Viability',
      categoryWhy:
        'A one-time build against a recurring, otherwise impossible trip is what makes this defensible year after year.',
      fix: {
        before: {
          label: 'Before — the site is skipped',
          elements: ['Lecture slides', 'Photographs'],
          note: 'The measurement exercise is described but never performed.',
        },
        after: {
          label: 'After — reconstruction reused each year',
          elements: ['Walk the formation', 'Take measurements'],
          note: 'One build, reused per cohort, with the exercise intact.',
        },
      },
    },
  },
  {
    id: 'running-coach',
    domain: 'Amateur sport',
    title: 'AR glasses for recreational runners',
    scenario: [
      'A running app projects pace, heart rate, cadence, split time, elevation, and a route arrow into the runner’s field of view.',
      'All six read-outs are visible continuously for the whole run.',
      'Testers describe the first kilometre as motivating and the rest as tiring to look at.',
    ],
    reveal: {
      verdict: 'Overload risk',
      what:
        'Six continuous read-outs sit in the visual field during an activity whose main safety requirement is seeing the path. Nothing recedes when it stops being relevant.',
      who: 'User',
      whoDetail:
        'The runner absorbs both the strain and the safety cost of a permanently occupied field of view.',
      category: 'Overload',
      categoryWhy:
        'The data is individually useful; presenting all of it simultaneously and permanently is what creates the problem.',
      fix: {
        before: {
          label: 'Before — six permanent read-outs',
          elements: ['Pace', 'HR', 'Cadence', 'Split', 'Elevation', 'Route'],
          note: 'Everything visible for the entire run, competing with the path ahead.',
        },
        after: {
          label: 'After — one live value, rest on demand',
          elements: ['Pace', 'Route (at turns)'],
          note: 'One value stays; the route appears only near a turn; the other four are reviewed afterwards.',
        },
      },
    },
  },
  {
    id: 'all-hands-meeting',
    domain: 'Internal communication',
    title: 'Spatial meeting room for a 40-person all-hands',
    scenario: [
      'A company moves its monthly all-hands into a spatial meeting room where everyone appears as an avatar.',
      'The meeting is one presenter speaking for forty minutes, followed by written questions.',
      'Attendance falls by a third after the second month; several people join from the fallback video link instead.',
    ],
    reveal: {
      verdict: 'Demonstration effect only',
      what:
        'The format is broadcast: one speaker, one direction, no spatial interaction. Presence adds setup cost without changing anything about how the meeting works.',
      who: 'Both',
      whoDetail:
        'Employees pay in friction and drop out; the organisation loses reach on the one meeting meant to reach everyone.',
      category: 'Acceptance',
      categoryWhy:
        'The technology performs as intended — people opt out of it, which is the signal that matters here.',
      fix: {
        before: {
          label: 'Before — the whole meeting in the room',
          elements: ['Avatar setup', '40 min broadcast', 'Written Q&A'],
          note: 'A one-directional format wrapped in a spatial one.',
        },
        after: {
          label: 'After — broadcast flat, small groups spatial',
          elements: ['Video broadcast', 'Spatial breakout (8 people)'],
          note: 'The spatial room is kept for the part that is genuinely multi-directional.',
        },
      },
    },
  },
  {
    id: 'estate-kiosk',
    domain: 'Real estate',
    title: 'VR viewing kiosk in a branch office',
    scenario: [
      'An estate agency installs a VR kiosk in its branch window so passers-by can tour listed apartments.',
      'Three of forty current listings have been scanned; the rest show a placeholder room.',
      'Staff say most walk-in questions are about price, availability, and the neighbourhood.',
    ],
    reveal: {
      verdict: 'Demonstration effect only',
      what:
        'The kiosk answers a question few walk-ins are asking, and can only answer it for seven percent of the stock. What is on display is mostly the placeholder.',
      who: 'Organisation',
      whoDetail:
        'The agency funds scanning and kiosk upkeep while its most common enquiries stay unaddressed.',
      category: 'Maturity',
      categoryWhy:
        'The technology works; the content pipeline behind it is nowhere near ready for the catalogue it must cover.',
      fix: {
        before: {
          label: 'Before — kiosk over the whole catalogue',
          elements: ['3 real tours', '37 placeholders'],
          note: 'Coverage is the constraint, and it is visible to every passer-by.',
        },
        after: {
          label: 'After — one segment, fully covered',
          elements: ['New-build tours (complete)'],
          note: 'One segment scanned end to end, so what is offered is what exists.',
        },
      },
    },
  },
  {
    id: 'school-evacuation',
    domain: 'School safety',
    title: 'VR fire-evacuation drill in a school',
    scenario: [
      'A school runs its annual evacuation briefing as a VR walkthrough of its own corridors filling with smoke.',
      'Pupils practise choosing a route when the nearest staircase is unusable.',
      'The physical drill still takes place; the VR session prepares for it.',
    ],
    reveal: {
      verdict: 'Genuine added value',
      what:
        'The decision being trained — re-routing under degraded visibility — cannot be rehearsed in a physical drill without creating the very hazard it prepares for.',
      who: 'User',
      whoDetail:
        'Pupils rehearse a decision they would otherwise only encounter for the first time in an emergency.',
      category: 'User Value',
      categoryWhy:
        'The value is in rehearsing an unsafe condition safely, which is the one thing the physical drill cannot offer.',
      fix: {
        before: {
          label: 'Before — briefing plus clear-corridor drill',
          elements: ['Slides', 'Walk to assembly point'],
          note: 'The route is practised only under ideal conditions.',
        },
        after: {
          label: 'After — briefing, VR re-route, physical drill',
          elements: ['Slides', 'VR re-route', 'Physical drill'],
          note: 'The degraded case is added without replacing the real drill.',
        },
      },
    },
  },
  {
    id: 'home-cooking',
    domain: 'Consumer app',
    title: 'AR cooking assistant in a home kitchen',
    scenario: [
      'A recipe app projects timers, ingredient quantities, technique videos, a shopping list, and nutrition data into the kitchen.',
      'All five panels float around the worktop for the duration of the recipe.',
      'Users report reaching for their phone to check the actual step.',
    ],
    reveal: {
      verdict: 'Overload risk',
      what:
        'Five persistent panels surround a workspace where the user’s hands and eyes are already committed. The current step — the one thing needed continuously — is not distinguishable from the four things that are not.',
      who: 'User',
      whoDetail:
        'The cook ends up using a second device to recover the step the immersive layer buried.',
      category: 'Orientation',
      categoryWhy:
        'Users can no longer tell where they are in the sequence, which is an orientation failure before it is a content one.',
      fix: {
        before: {
          label: 'Before — five floating panels',
          elements: ['Timer', 'Quantities', 'Video', 'Shopping list', 'Nutrition'],
          note: 'All five persist for the whole recipe, with no current-step marker.',
        },
        after: {
          label: 'After — current step, timer when running',
          elements: ['Step 3 of 7', 'Timer'],
          note: 'The step is always answerable; the timer appears only while counting; the rest moves out of the cooking flow.',
        },
      },
    },
  },
];

export const LEVELS = [
  { min: 0, label: 'Explorer' },
  { min: 60, label: 'Analyst' },
  { min: 140, label: 'Architect' },
] as const;

export const XP_PER_ATTEMPT = 10;
export const XP_BONUS_VERDICT = 5;
export const XP_BONUS_CATEGORY = 5;
export const XP_MAX = 200;
