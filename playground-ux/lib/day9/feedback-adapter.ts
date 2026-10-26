/**
 * BUILD_PROMPT §12 — optional AI feedback.
 * The default implementation is a rule-based stub. The app must work fully
 * with no API key: `getFeedback` never throws and never awaits a network call
 * unless NEXT_PUBLIC_FEEDBACK_MODE === 'llm' AND a route handler is present.
 */

export type Rubric = 'impact-statement' | 'residual-risk' | 'capstone-section' | 'justification';

export interface Feedback {
  accepted: boolean;
  /** Shown to the learner. Never generic, never an apology. */
  message: string;
  tone: 'accepted' | 'nudge';
}

const FEATURE_WORDS = [
  'button',
  'screen',
  'page',
  'interface',
  'ui',
  'dashboard',
  'menu',
  'layout',
  'design',
  'colour',
  'color',
  'bar',
  'widget',
  'component',
];

const CONSEQUENCE_WORDS = [
  'feel',
  'feels',
  'felt',
  'believe',
  'believes',
  'trust',
  'assume',
  'expect',
  'stop',
  'stops',
  'quit',
  'return',
  'come back',
  'give up',
  'notice',
  'decide',
  'decides',
  'remember',
  'forget',
  'ignore',
  'motivat',
  'confiden',
  'discourag',
];

function hasAny(text: string, words: string[]): boolean {
  const lower = text.toLowerCase();
  return words.some((w) => lower.includes(w));
}

/** Rule-based implementation — the default, and the only one that ships. */
function ruleBased(answer: string, rubric: Rubric): Feedback {
  const text = answer.trim();
  const words = text.split(/\s+/).filter(Boolean).length;

  if (rubric === 'impact-statement') {
    if (words < 6) {
      return {
        accepted: false,
        tone: 'nudge',
        message: 'That is a fragment. Finish the sentence — what actually happens to the user?',
      };
    }
    const namesConsequence = hasAny(text, CONSEQUENCE_WORDS);
    const namesFeature = hasAny(text, FEATURE_WORDS);
    if (!namesConsequence && namesFeature) {
      return {
        accepted: false,
        tone: 'nudge',
        message:
          "That describes the interface. What happens inside the user's head next Tuesday, when nothing is due?",
      };
    }
    if (!namesConsequence) {
      return {
        accepted: false,
        tone: 'nudge',
        message:
          'This states a fact about the product. Say what it costs the user — a feeling, a decision, or a behaviour.',
      };
    }
    return {
      accepted: true,
      tone: 'accepted',
      message: 'Impact statement logged. It names a consequence, not a feature.',
    };
  }

  if (rubric === 'residual-risk') {
    if (words < 5) {
      return {
        accepted: false,
        tone: 'nudge',
        message: 'One clause is not a risk. Name what could go wrong and who it lands on.',
      };
    }
    return {
      accepted: true,
      tone: 'accepted',
      message: 'Risk recorded. You are keeping this one on purpose.',
    };
  }

  if (rubric === 'justification') {
    if (words < 5) {
      return {
        accepted: false,
        tone: 'nudge',
        message: 'Four short fields, not four words. This one still reads as a placeholder.',
      };
    }
    return { accepted: true, tone: 'accepted', message: 'Justification recorded.' };
  }

  // capstone-section
  if (words < 25) {
    return {
      accepted: false,
      tone: 'nudge',
      message: `${words} words. A board reads a paragraph, not a heading — this section needs the argument in it.`,
    };
  }
  return {
    accepted: true,
    tone: 'accepted',
    message: 'Section written. It goes into the brief exactly as you wrote it.',
  };
}

/**
 * Second implementation, active only when NEXT_PUBLIC_FEEDBACK_MODE === 'llm'.
 * It posts to /api/feedback, which you supply. Any failure falls back silently
 * to the rule-based verdict, so the app never depends on it.
 */
async function viaLlm(answer: string, rubric: Rubric): Promise<Feedback> {
  const fallback = ruleBased(answer, rubric);
  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ answer, rubric }),
    });
    if (!res.ok) return fallback;
    const data = (await res.json()) as Partial<Feedback>;
    if (typeof data.message !== 'string' || typeof data.accepted !== 'boolean') return fallback;
    return {
      accepted: data.accepted,
      message: data.message,
      tone: data.accepted ? 'accepted' : 'nudge',
    };
  } catch {
    return fallback;
  }
}

export async function getFeedback(answer: string, rubric: Rubric): Promise<Feedback> {
  if (process.env.NEXT_PUBLIC_FEEDBACK_MODE === 'llm') return viaLlm(answer, rubric);
  return ruleBased(answer, rubric);
}

/** Synchronous variant for inline validation that must not wait on a promise. */
export const checkNow = ruleBased;
