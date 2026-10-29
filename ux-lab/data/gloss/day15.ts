import type { GlossEntry } from "@/data/glossary";

/**
 * Day 15 · the plain-language glossary entries for the terms Day 15 adds (CLAUDE.md #19). Attention, hypothesis, neuro-UX and the decision under uncertainty are
 * explained on earlier days and not repeated.
 */
export const GLOSSARY_D15: GlossEntry[] = [
  { id: "eye-tracking", title: "Eye-tracking", match: ["eye-tracking", "eye tracking"], plain: "Measuring where a person looks, usually with infrared light and a camera, and recording it so it can be replayed and analysed.", from: "Duchowski 2017" },
  { id: "fixation", title: "Fixation", match: ["fixation", "fixations"], plain: "A short pause of the eye on one spot, usually a fraction of a second; most of what we take in, we take in during fixations.", from: "Holmqvist et al. 2011" },
  { id: "saccade", title: "Saccade", match: ["saccade", "saccades"], plain: "The fast jump of the eye from one fixation to the next; during it, we hardly see anything.", from: "Holmqvist et al. 2011" },
  { id: "scanpath", title: "Scanpath", match: ["scanpath", "scanpaths", "gaze path"], plain: "The order of fixations and jumps across a page: where someone looked first, next and last.", from: "Holmqvist et al. 2011" },
  { id: "heatmap", title: "Heatmap", match: ["heatmap", "heatmaps"], plain: "A picture that colours a page by how long or how often people looked at each part, added up over people; it loses the order and the individual.", from: "Holmqvist et al. 2011" },
  { id: "aoi", title: "Area of interest", match: ["area of interest", "areas of interest"], plain: "A part of a page marked before the analysis, for example the price or a button, so the time and order of looks at it can be counted." },
  { id: "eye-mind", title: "Eye-mind assumption", match: ["eye-mind"], plain: "The working assumption that what the eye fixates is what the mind is processing; it holds roughly, and says nothing about whether it was understood or liked.", from: "Just & Carpenter 1980" },
  { id: "think-aloud", title: "Retrospective think-aloud", match: ["retrospective think-aloud", "think-aloud"], plain: "Showing people their own recording after a test and asking them to say what they were thinking; it adds the why that the gaze cannot give." },
  { id: "neurofeedback", title: "Neurofeedback", match: ["neurofeedback"], plain: "Showing people a signal of their own brain activity, usually from EEG, so they can learn to change it; used in therapy and research, with mixed evidence.", from: "Sitaram et al. 2017" },
  { id: "eeg", title: "EEG", match: ["EEG", "electroencephalography"], plain: "Measuring the brain's electrical activity through sensors on the scalp; cheap headbands do it roughly and are disturbed by movement and muscles." },
  { id: "bci", title: "Brain-computer interface (BCI)", match: ["brain-computer interface", "brain-computer interfaces", "BCI"], plain: "A system that turns brain signals into commands for a computer, for example to type without moving; today mostly medical and research use.", from: "Wolpaw et al. 2002" },
  { id: "neurodata", title: "Neurodata", match: ["neurodata"], plain: "Information produced directly by the brain and nervous system; regulators treat it as high-risk personal data.", from: "ICO 2023" },
  { id: "validity", title: "Validity", match: ["validity"], plain: "Whether a measure really measures what it claims to, for example whether a “concentration score” shows concentration and not just movement." },
  { id: "evidence-grade", title: "Evidence grade", match: ["evidence grade", "insight maturity"], plain: "A label for how sure a finding is, from a first hint to a result that held up again, so that only robust findings drive decisions." },
];
