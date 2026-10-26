import { LESSON_TEXTS } from "@/components/sim/lessonText";
import type { Blk, Card, Item, PPage } from "@/components/sim/PlatformSim";
import { tt } from "@/lib/lang";

/**
 * The content of a real learning platform for the case platforms of Days 7 to 16 (DL-STANDARD v1.8, section 4, user request 2026-10-22: "the case platforms read like real
 * digital learning platforms, not one line of text"). One made-up course ("Negotiation basics", the same course and lessons as before) with what a real course page has: a promise,
 * the facts of the course, what you can do afterwards, the syllabus, the teacher, reviews and questions; a catalogue of further courses that each open a page; a help centre and an
 * account page; lessons with an example and key points. Days 3 to 6 keep `lessonText.ts` and `platformKit.ts` as they are.
 *
 * Rules: the platform's own flaw that the day's plan names (a small font, hard language, a missing progress bar, many menu entries) is set by the day and never repaired here; the kit
 * takes the day's font size and, where the plan names hard language, a `hard` register. No figure about learners, results, ratings or prices (section 1: no figure the plan does not
 * print); the names, the teacher and the reviews are made up and the footer says so.
 */
export type Look = { size?: number; leading?: number; hard?: boolean };

const pick = (look: Look, plain: string, hard: string) => (look.hard ? hard : plain);

export const COURSE_NAME = () => tt("Negotiation basics", "Verhandlungsgrundlagen");

/** The footer line of a platform: the company, the usual links as text, and the note that the people are made up. */
export const footerOf = (name: string) =>
  tt(`© ${name} GmbH · Imprint · Privacy · Terms of use · Simulation: the names, the teacher and the reviews are made up`, `© ${name} GmbH · Impressum · Datenschutz · Nutzungsbedingungen · Simulation: Die Namen, die Trainerin und die Bewertungen sind erfunden`);

/* ------------------------------------------------------------------ the course page */

/** The top of the course page: the promise and the facts of the course. `n` is the number of lessons the day's platform has. */
export function courseHero(look: Look, n: number, button?: { label: string; go: string }): Blk[] {
  return [
    {
      t: "hero",
      kicker: tt("Communication · Self-paced course", "Kommunikation · Kurs im eigenen Tempo"),
      title: COURSE_NAME(),
      text: pick(
        look,
        tt("Prepare a negotiation, open with a clear offer and close with an agreement both sides can keep. The course works with situations from everyday work: a supplier price, a project deadline, a salary talk.", "Bereiten Sie eine Verhandlung vor, eröffnen Sie mit einem klaren Angebot und schließen Sie mit einer Einigung, die beide Seiten halten können. Der Kurs arbeitet mit Situationen aus dem Arbeitsalltag: ein Lieferantenpreis, eine Projektfrist, ein Gehaltsgespräch."),
        tt("This course is designed to enable participants to systematically prepare negotiation processes, to formulate initial positions in a manner conducive to the realisation of their objectives and to bring about consensual outcomes which are sustainable for all parties involved, with reference to representative scenarios from the professional context.", "Dieser Kurs ist darauf ausgerichtet, die Teilnehmenden in die Lage zu versetzen, Verhandlungsprozesse systematisch vorzubereiten, Ausgangspositionen in einer der Zielerreichung förderlichen Weise zu formulieren und für sämtliche Beteiligten tragfähige konsensuale Ergebnisse herbeizuführen, unter Bezugnahme auf repräsentative Szenarien aus dem beruflichen Kontext."),
      ),
      button,
      size: look.size,
    },
    { t: "meta", items: [tt(`${n} lessons`, `${n} Lektionen`), tt("Self-paced", "Im eigenen Tempo"), tt("Certificate of completion", "Teilnahmezertifikat"), tt("English and German", "Deutsch und Englisch")], size: look.size },
  ];
}

/** "What you will be able to do", as a real course page lists it. */
export function courseOutcomes(look: Look): Blk[] {
  return [
    { t: "sub", text: tt("What you will be able to do", "Was Sie danach können"), size: look.size },
    {
      t: "list",
      size: look.size,
      items: look.hard
        ? [
            tt("Systematic determination of target and reservation values prior to the commencement of negotiations", "Systematische Bestimmung von Ziel- und Reservationswerten vor Aufnahme der Verhandlungen"),
            tt("Utilisation of anchoring effects in the formulation of initial offers", "Nutzung von Ankereffekten bei der Formulierung von Erstangeboten"),
            tt("Reciprocal exchange of concessions with due regard to their respective valuation", "Reziproker Austausch von Zugeständnissen unter Berücksichtigung ihrer jeweiligen Bewertung"),
            tt("Documentation of negotiated outcomes in a legally robust form", "Dokumentation der Verhandlungsergebnisse in rechtlich belastbarer Form"),
          ]
        : [
            tt("Set a goal and a limit before the talk starts", "Vor dem Gespräch ein Ziel und eine Grenze festlegen"),
            tt("Make the first offer and know why it matters", "Das erste Angebot machen und wissen, warum es zählt"),
            tt("Give something only when you get something back", "Nur etwas geben, wenn Sie etwas zurückbekommen"),
            tt("Confirm the agreement in writing on the same day", "Die Einigung noch am selben Tag schriftlich bestätigen"),
          ],
    },
  ];
}

/** The teacher, the reviews and the questions: the lower half of a course page. */
export function courseAbout(look: Look): Blk[] {
  return [
    { t: "sub", text: tt("Your trainer", "Ihre Trainerin"), size: look.size },
    {
      t: "person",
      name: "Dr. Katrin Albers",
      role: tt("Negotiation trainer and former purchasing manager", "Verhandlungstrainerin und frühere Einkaufsleiterin"),
      text: pick(
        look,
        tt("Katrin negotiated with suppliers for many years before she began to train purchasing and sales teams. In this course she shows the steps she uses herself, with the mistakes she made on the way.", "Katrin hat viele Jahre mit Lieferanten verhandelt, bevor sie begann, Einkaufs- und Vertriebsteams zu schulen. In diesem Kurs zeigt sie die Schritte, die sie selbst nutzt, mit den Fehlern, die sie unterwegs gemacht hat."),
        tt("Following many years of operational responsibility in strategic procurement, Dr. Albers has been engaged in the qualification of purchasing and sales personnel, whereby the methodological approaches presented herein are derived from her professional practice.", "Nach langjähriger operativer Verantwortung im strategischen Einkauf ist Dr. Albers in der Qualifizierung von Einkaufs- und Vertriebspersonal tätig, wobei die hier dargestellten methodischen Ansätze aus ihrer Berufspraxis abgeleitet sind."),
      ),
      size: look.size,
    },
    {
      t: "quotes",
      title: tt("What learners say", "Was Teilnehmende sagen"),
      size: look.size,
      items: [
        { who: "Jonas Becker", role: tt("Purchasing, logistics company", "Einkauf, Logistikunternehmen"), text: tt("The lesson on the first offer changed how I open supplier talks. I now say my number first.", "Die Lektion zum ersten Angebot hat verändert, wie ich Lieferantengespräche eröffne. Ich nenne jetzt zuerst meine Zahl.") },
        { who: "Aylin Demir", role: tt("Project lead, IT services", "Projektleiterin, IT-Dienstleister"), text: tt("Short lessons I could do between two meetings. The part about handling a no was the most useful for me.", "Kurze Lektionen, die ich zwischen zwei Meetings machen konnte. Der Teil zum Umgang mit einem Nein war für mich am nützlichsten.") },
      ],
    },
    {
      t: "faq",
      title: tt("Questions about the course", "Fragen zum Kurs"),
      size: look.size,
      items: [
        { q: tt("Do I need any prior knowledge?", "Brauche ich Vorwissen?"), a: pick(look, tt("No. The course starts with what a negotiation is and builds up from there.", "Nein. Der Kurs beginnt damit, was eine Verhandlung ist, und baut darauf auf."), tt("No prerequisite qualifications are required; the curriculum is structured progressively, commencing with the conceptual foundations of negotiation theory.", "Es werden keine Vorqualifikationen vorausgesetzt; das Curriculum ist progressiv aufgebaut und beginnt mit den konzeptionellen Grundlagen der Verhandlungstheorie.")) },
        { q: tt("Can I pause and come back later?", "Kann ich pausieren und später weitermachen?"), a: pick(look, tt("Yes. You can open the lessons in any order and as often as you like.", "Ja. Sie können die Lektionen in beliebiger Reihenfolge und so oft öffnen, wie Sie möchten."), tt("Interruption of participation is permissible at any time; access to the lesson units is not subject to any sequential restriction.", "Eine Unterbrechung der Teilnahme ist jederzeit zulässig; der Zugriff auf die Lektionseinheiten unterliegt keiner sequenziellen Beschränkung.")) },
        { q: tt("How do I get the certificate?", "Wie erhalte ich das Zertifikat?"), a: pick(look, tt("Open every lesson of the course. The certificate then appears under your account.", "Öffnen Sie jede Lektion des Kurses. Das Zertifikat erscheint dann unter Ihrem Konto."), tt("The issuance of the certificate of participation is contingent upon the complete processing of all lesson units comprised in the course.", "Die Ausstellung der Teilnahmebescheinigung setzt die vollständige Bearbeitung sämtlicher im Kurs enthaltenen Lektionseinheiten voraus.")) },
        { q: tt("Who answers questions about the content?", "Wer beantwortet Fragen zum Inhalt?"), a: pick(look, tt("Write to the trainer through the help page. She answers on working days.", "Schreiben Sie der Trainerin über die Hilfeseite. Sie antwortet an Werktagen."), tt("Enquiries pertaining to the content are to be submitted via the designated contact form and will be processed by the trainer on working days.", "Inhaltliche Anfragen sind über das vorgesehene Kontaktformular einzureichen und werden von der Trainerin an Werktagen bearbeitet.")) },
      ],
    },
  ];
}

/* ------------------------------------------------------------------ the catalogue */

type Other = { id: string; title: () => string; tag: () => string; text: () => string; by: string; learn: () => string[]; parts: () => string[] };

const OTHERS: Other[] = [
  {
    id: "c1",
    title: () => tt("Giving feedback that lands", "Feedback, das ankommt"),
    tag: () => tt("Communication", "Kommunikation"),
    text: () => tt("Say what you saw, what it did and what you would like instead, so a colleague can act on it.", "Sagen Sie, was Sie gesehen haben, was es bewirkt hat und was Sie sich stattdessen wünschen, damit eine Kollegin damit arbeiten kann."),
    by: "Markus Wendt",
    learn: () => [tt("Describe behaviour instead of judging a person", "Verhalten beschreiben statt eine Person zu bewerten"), tt("Ask for feedback without getting defensive", "Um Feedback bitten, ohne in die Defensive zu gehen"), tt("Agree on one next step", "Einen nächsten Schritt vereinbaren")],
    parts: () => [tt("Why feedback goes wrong", "Warum Feedback schiefgeht"), tt("The three parts of a feedback", "Die drei Teile eines Feedbacks"), tt("Receiving feedback", "Feedback annehmen"), tt("Practice: a difficult talk", "Übung: ein schwieriges Gespräch")],
  },
  {
    id: "c2",
    title: () => tt("Running a short meeting", "Ein kurzes Meeting leiten"),
    tag: () => tt("Collaboration", "Zusammenarbeit"),
    text: () => tt("Plan a meeting with a goal, keep it on track and end it with decisions everyone can find later.", "Planen Sie ein Meeting mit einem Ziel, halten Sie es auf Kurs und beenden Sie es mit Entscheidungen, die alle später wiederfinden."),
    by: "Sabine Krüger",
    learn: () => [tt("Write an agenda that states the goal", "Eine Agenda schreiben, die das Ziel nennt"), tt("Bring a drifting discussion back", "Eine abschweifende Diskussion zurückholen"), tt("Close with owners and dates", "Mit Verantwortlichen und Terminen abschließen")],
    parts: () => [tt("Do we need this meeting?", "Brauchen wir dieses Meeting?"), tt("The agenda", "Die Agenda"), tt("Leading the talk", "Das Gespräch leiten"), tt("Notes and next steps", "Notizen und nächste Schritte")],
  },
  {
    id: "c3",
    title: () => tt("Writing clear e-mails", "Klare E-Mails schreiben"),
    tag: () => tt("Communication", "Kommunikation"),
    text: () => tt("Put the request in the first line, keep one topic per mail and make it easy to answer.", "Stellen Sie die Bitte in die erste Zeile, bleiben Sie bei einem Thema pro Mail und machen Sie das Antworten leicht."),
    by: "Markus Wendt",
    learn: () => [tt("Write a subject line that says what you need", "Eine Betreffzeile schreiben, die sagt, was Sie brauchen"), tt("Shorten a long mail without losing the point", "Eine lange Mail kürzen, ohne den Punkt zu verlieren"), tt("Choose the right tone for the reader", "Den passenden Ton für die Leserin wählen")],
    parts: () => [tt("The first line", "Die erste Zeile"), tt("One mail, one topic", "Eine Mail, ein Thema"), tt("Tone and politeness", "Ton und Höflichkeit"), tt("Before you press send", "Bevor Sie auf Senden drücken")],
  },
  {
    id: "c4",
    title: () => tt("Planning project work", "Projektarbeit planen"),
    tag: () => tt("Project management", "Projektmanagement"),
    text: () => tt("Break a project into steps, see what depends on what and notice early when a deadline slips.", "Zerlegen Sie ein Projekt in Schritte, sehen Sie, was wovon abhängt, und bemerken Sie früh, wenn eine Frist rutscht."),
    by: "Dr. Katrin Albers",
    learn: () => [tt("Turn a goal into work packages", "Ein Ziel in Arbeitspakete übersetzen"), tt("Find the steps that decide the end date", "Die Schritte finden, die das Enddatum bestimmen"), tt("Report a delay before it becomes a crisis", "Eine Verzögerung melden, bevor sie zur Krise wird")],
    parts: () => [tt("From goal to work packages", "Vom Ziel zu Arbeitspaketen"), tt("Dependencies", "Abhängigkeiten"), tt("A simple plan", "Ein einfacher Plan"), tt("When things slip", "Wenn etwas rutscht")],
  },
];

/** The further courses of the catalogue: page key suffix and title (page keys are `${prefix}${id}`, as `catalogPages` builds them). */
export const otherCourses = () => OTHERS.map((o) => ({ id: o.id, title: o.title(), text: o.text() }));

/** The catalogue as cards: the course of the case first, then the other courses, each opening its own page (`${prefix}c1` …). */
export function catalogCards(look: Look, courseGo: string, prefix = "cat"): Blk {
  const cards: Card[] = [
    { title: COURSE_NAME(), tag: tt("Communication", "Kommunikation"), text: tt("Prepare a negotiation, open with a clear offer and close with an agreement.", "Eine Verhandlung vorbereiten, mit einem klaren Angebot eröffnen und mit einer Einigung abschließen."), by: "Dr. Katrin Albers", meta: tt("Enrolled", "Eingeschrieben"), go: courseGo },
    ...OTHERS.map((o) => ({ title: o.title(), tag: o.tag(), text: o.text(), by: o.by, go: `${prefix}${o.id}` })),
  ];
  return { t: "cards", items: cards, size: look.size };
}

/** One page per further course: the promise, what you learn, the parts, and a button to put it on the wish list. */
export function catalogPages(look: Look, back: { go: string; label: string }, prefix = "cat", section?: string): Record<string, PPage> {
  const out: Record<string, PPage> = {};
  for (const o of OTHERS) {
    out[`${prefix}${o.id}`] = {
      title: o.title(),
      crumb: o.title(),
      section,
      blocks: [
        { t: "hero", kicker: `${o.tag()} · ${o.by}`, title: o.title(), text: o.text(), size: look.size },
        { t: "meta", items: [tt(`${o.parts().length} parts`, `${o.parts().length} Teile`), tt("Self-paced", "Im eigenen Tempo"), tt("Certificate of completion", "Teilnahmezertifikat")], size: look.size },
        { t: "sub", text: tt("What you will learn", "Was Sie lernen"), size: look.size },
        { t: "list", items: o.learn(), size: look.size },
        { t: "sub", text: tt("Course content", "Kursinhalt"), size: look.size },
        { t: "list", items: o.parts(), size: look.size },
        { t: "note", title: tt("Interested in this course?", "Interesse an diesem Kurs?"), text: tt("Your team lead approves new courses. Put it on your wish list and the request goes to them.", "Ihre Teamleitung gibt neue Kurse frei. Setzen Sie ihn auf Ihre Wunschliste, dann geht die Anfrage an sie."), button: { label: tt("Add to my wish list", "Auf meine Wunschliste"), msg: tt("Added to your wish list. Your team lead has been asked to approve it.", "Auf Ihre Wunschliste gesetzt. Ihre Teamleitung wurde um Freigabe gebeten.") } },
        { t: "links", items: [{ label: back.label, go: back.go }], size: look.size },
      ],
    };
  }
  return out;
}

/* ------------------------------------------------------------------ help and account */

/** A help centre: questions a platform's users really ask, and a contact form. */
export function helpPage(look: Look, section?: string, extra: Blk[] = []): PPage {
  return {
    title: tt("Help", "Hilfe"),
    crumb: tt("Help", "Hilfe"),
    section,
    blocks: [
      { t: "h", text: tt("Help centre", "Hilfe-Center") },
      { t: "p", text: pick(look, tt("Find an answer below, or write to us.", "Finden Sie unten eine Antwort oder schreiben Sie uns."), tt("Prior to the submission of an enquiry, users are requested to consult the following frequently asked questions.", "Vor dem Einreichen einer Anfrage werden die Nutzenden gebeten, die nachstehenden häufig gestellten Fragen zu konsultieren.")), size: look.size },
      ...extra,
      {
        t: "faq",
        size: look.size,
        items: [
          { q: tt("I forgot my password", "Ich habe mein Passwort vergessen"), a: pick(look, tt("On the sign-in page, choose “Forgot password”. We send you a link to set a new one.", "Wählen Sie auf der Anmeldeseite „Passwort vergessen“. Wir senden Ihnen einen Link, um ein neues festzulegen."), tt("The reset of the access credentials is effected via the function “Forgot password”, whereupon a link for the definition of a new password is transmitted.", "Die Zurücksetzung der Zugangsdaten erfolgt über die Funktion „Passwort vergessen“, woraufhin ein Link zur Festlegung eines neuen Passworts übermittelt wird.")) },
          { q: tt("How do I change my e-mail address?", "Wie ändere ich meine E-Mail-Adresse?"), a: pick(look, tt("Open your account, change the address and press “Save”.", "Öffnen Sie Ihr Konto, ändern Sie die Adresse und drücken Sie „Speichern“."), tt("Modifications of the stored e-mail address may be undertaken in the account area and become effective upon saving.", "Änderungen der hinterlegten E-Mail-Adresse können im Kontobereich vorgenommen werden und werden mit dem Speichern wirksam.")) },
          { q: tt("Where do I find my certificate?", "Wo finde ich mein Zertifikat?"), a: pick(look, tt("When you have opened every lesson of a course, the certificate appears in your account.", "Wenn Sie jede Lektion eines Kurses geöffnet haben, erscheint das Zertifikat in Ihrem Konto."), tt("Certificates are made available in the account area upon complete processing of the respective course.", "Zertifikate werden nach vollständiger Bearbeitung des jeweiligen Kurses im Kontobereich bereitgestellt.")) },
          { q: tt("Can my employer see my answers?", "Kann mein Arbeitgeber meine Antworten sehen?"), a: pick(look, tt("No. Your team lead sees which courses you are enrolled in, not your answers.", "Nein. Ihre Teamleitung sieht, in welche Kurse Sie eingeschrieben sind, nicht Ihre Antworten."), tt("The disclosure of individual responses to the employer does not take place; solely the enrolment status is visible to the responsible supervisor.", "Eine Offenlegung individueller Antworten gegenüber dem Arbeitgeber findet nicht statt; lediglich der Einschreibestatus ist für die zuständige Führungskraft einsehbar.")) },
        ],
      },
      { t: "sub", text: tt("Write to us", "Schreiben Sie uns"), size: look.size },
      { t: "form", fields: [tt("Subject", "Betreff"), tt("Your message", "Ihre Nachricht")], button: tt("Send", "Senden"), msg: tt("Thank you. We answer on working days.", "Danke. Wir antworten an Werktagen.") },
    ],
  };
}

/** An account page: the profile and the notifications. */
export function accountPage(look: Look, section?: string): PPage {
  return {
    title: tt("Account", "Konto"),
    crumb: tt("Account", "Konto"),
    section,
    blocks: [
      { t: "h", text: tt("My account", "Mein Konto") },
      { t: "person", name: "Mia Berg", role: tt("Project manager · mia.berg@example.com", "Projektmanagerin · mia.berg@example.com"), text: tt(`Enrolled in: ${COURSE_NAME()}`, `Eingeschrieben in: ${COURSE_NAME()}`), size: look.size },
      {
        t: "tabs",
        tabs: [
          { label: tt("Profile", "Profil"), fields: [tt("Name", "Name"), tt("E-mail", "E-Mail"), tt("Job title", "Funktion"), tt("Department", "Abteilung")] },
          { label: tt("Notifications", "Benachrichtigungen"), fields: [tt("Weekly summary by e-mail", "Wöchentliche Zusammenfassung per E-Mail"), tt("Reminder time", "Uhrzeit der Erinnerung")] },
          { label: tt("Language", "Sprache"), fields: [tt("Language of the platform", "Sprache der Plattform")] },
        ],
        button: tt("Save", "Speichern"),
        msg: tt("Saved.", "Gespeichert."),
      },
    ],
  };
}

/* ------------------------------------------------------------------ lessons */

/** For each of the eight lessons of `lessonText.ts`: a second paragraph, an example from work, and three key points. */
const MORE = (): { more: string; example: string; points: string[] }[] => [
  {
    more: tt("You will meet the same small cases again and again: a supplier who wants a higher price, a colleague who needs your team for a project, a customer who asks for a discount. Each lesson takes one step of a negotiation and practises it on such a case.", "Sie begegnen immer wieder denselben kleinen Fällen: ein Lieferant, der einen höheren Preis will, eine Kollegin, die Ihr Team für ein Projekt braucht, ein Kunde, der nach einem Rabatt fragt. Jede Lektion nimmt einen Schritt einer Verhandlung und übt ihn an einem solchen Fall."),
    example: tt("Mia, a project manager, needs two developers from another team for four weeks. She will use this course to prepare the talk with their team lead.", "Mia, eine Projektmanagerin, braucht für vier Wochen zwei Entwickler aus einem anderen Team. Mit diesem Kurs bereitet sie das Gespräch mit deren Teamleitung vor."),
    points: [tt("A negotiation has steps you can prepare", "Eine Verhandlung hat Schritte, die Sie vorbereiten können"), tt("Each lesson practises one step", "Jede Lektion übt einen Schritt"), tt("The examples come from everyday work", "Die Beispiele kommen aus dem Arbeitsalltag")],
  },
  {
    more: tt("Many people avoid negotiating because they think it means a fight. In practice most negotiations at work are between people who will work together again. That is why it pays to look for an agreement that both sides can live with.", "Viele Menschen vermeiden es zu verhandeln, weil sie an einen Streit denken. In der Praxis finden die meisten Verhandlungen bei der Arbeit zwischen Menschen statt, die wieder zusammenarbeiten werden. Deshalb lohnt es sich, nach einer Einigung zu suchen, mit der beide Seiten leben können."),
    example: tt("The other team lead does not want to lose two developers. But she would like Mia's team to test her new tool. Both sides now have something to offer.", "Die andere Teamleiterin will keine zwei Entwickler verlieren. Aber sie hätte gern, dass Mias Team ihr neues Tool testet. Beide Seiten haben jetzt etwas anzubieten."),
    points: [tt("Negotiating is a conversation, not a fight", "Verhandeln ist ein Gespräch, kein Streit"), tt("Ask what matters most to the other side", "Fragen Sie, was der anderen Seite am wichtigsten ist"), tt("Look for an agreement both can keep", "Suchen Sie eine Einigung, die beide halten können")],
  },
  {
    more: tt("The first number sets the frame of the talk. If the other side names a low price first, every later offer is measured against it. A first offer should therefore be ambitious but still something you can explain.", "Die erste Zahl setzt den Rahmen des Gesprächs. Nennt die andere Seite zuerst einen niedrigen Preis, wird jedes spätere Angebot daran gemessen. Ein erstes Angebot sollte deshalb ehrgeizig sein, aber noch begründbar."),
    example: tt("Mia opens with: “I need two developers for four weeks.” If she had asked “Could you spare someone?”, the answer would probably have been one developer for two weeks.", "Mia eröffnet mit: „Ich brauche zwei Entwickler für vier Wochen.“ Hätte sie gefragt „Könntest du jemanden entbehren?“, wäre die Antwort wahrscheinlich ein Entwickler für zwei Wochen gewesen."),
    points: [tt("The first number pulls the talk toward it", "Die erste Zahl zieht das Gespräch zu sich"), tt("Make your offer ambitious but explainable", "Machen Sie Ihr Angebot ehrgeizig, aber begründbar"), tt("Say your number before you hear theirs", "Nennen Sie Ihre Zahl, bevor Sie deren hören")],
  },
  {
    more: tt("Write down three things before the talk: what you hope for, the point at which you would rather walk away, and what you will do if there is no agreement. The last one is your fallback; the better it is, the calmer you can negotiate.", "Schreiben Sie vor dem Gespräch drei Dinge auf: was Sie hoffen, ab welchem Punkt Sie lieber gehen würden und was Sie tun, wenn es keine Einigung gibt. Das Letzte ist Ihre Rückfalloption; je besser sie ist, desto ruhiger können Sie verhandeln."),
    example: tt("Mia's goal is two developers for four weeks. Her limit is one developer for three weeks. Her fallback is to move one feature to the next release.", "Mias Ziel sind zwei Entwickler für vier Wochen. Ihre Grenze ist ein Entwickler für drei Wochen. Ihre Rückfalloption ist, eine Funktion ins nächste Release zu verschieben."),
    points: [tt("Write your goal and your limit down", "Schreiben Sie Ziel und Grenze auf"), tt("Know what you do without an agreement", "Wissen Sie, was Sie ohne Einigung tun"), tt("A good fallback makes you calmer", "Eine gute Rückfalloption macht Sie ruhiger")],
  },
  {
    more: tt("A concession is something you give. Give it only in exchange for something, and say what you expect in return in the same sentence. Look for things that cost you little but are worth a lot to the other side.", "Ein Zugeständnis ist etwas, das Sie geben. Geben Sie es nur im Tausch gegen etwas und sagen Sie im selben Satz, was Sie dafür erwarten. Suchen Sie nach Dingen, die Sie wenig kosten, der anderen Seite aber viel wert sind."),
    example: tt("Mia says: “If you lend me two developers, my team tests your new tool next month.” The test costs her team two afternoons and saves the other team a week.", "Mia sagt: „Wenn du mir zwei Entwickler leihst, testet mein Team nächsten Monat dein neues Tool.“ Der Test kostet ihr Team zwei Nachmittage und spart dem anderen Team eine Woche."),
    points: [tt("Never give without getting", "Nie geben, ohne zu bekommen"), tt("Name the exchange in one sentence", "Nennen Sie den Tausch in einem Satz"), tt("Offer what is cheap for you and valuable for them", "Bieten Sie an, was für Sie günstig und für die anderen wertvoll ist")],
  },
  {
    more: tt("When you hear a no, ask what exactly does not work. Often one detail is the problem: the timing, the amount, or who has to agree. Change that detail and ask again.", "Wenn Sie ein Nein hören, fragen Sie, was genau nicht passt. Oft ist ein Detail das Problem: der Zeitpunkt, die Menge oder wer zustimmen muss. Ändern Sie dieses Detail und fragen Sie noch einmal."),
    example: tt("The team lead says no. Mia asks why. The answer: the first week is the team's release week. Mia offers to start one week later, and the answer becomes yes.", "Die Teamleiterin sagt Nein. Mia fragt, warum. Die Antwort: Die erste Woche ist die Release-Woche des Teams. Mia bietet an, eine Woche später zu beginnen, und die Antwort wird ein Ja."),
    points: [tt("A no is usually about one detail", "Ein Nein betrifft meist ein Detail"), tt("Ask what exactly does not work", "Fragen Sie, was genau nicht passt"), tt("Change the detail and ask again", "Ändern Sie das Detail und fragen Sie erneut")],
  },
  {
    more: tt("At the end, repeat the agreement in your own words and ask whether it is right. Then send a short written summary the same day: who does what, by when. It prevents two people from remembering two different agreements.", "Wiederholen Sie am Ende die Einigung in eigenen Worten und fragen Sie, ob sie stimmt. Schicken Sie dann noch am selben Tag eine kurze schriftliche Zusammenfassung: wer was bis wann tut. So erinnern sich nicht zwei Menschen an zwei verschiedene Einigungen."),
    example: tt("Mia writes: “As agreed: two developers from the 14th for four weeks; my team tests your tool in the week of the 20th.” The team lead replies: “Correct.”", "Mia schreibt: „Wie besprochen: zwei Entwickler ab dem 14. für vier Wochen; mein Team testet dein Tool in der Woche ab dem 20.“ Die Teamleiterin antwortet: „Stimmt.“"),
    points: [tt("Say the agreement back", "Sprechen Sie die Einigung zurück"), tt("Write it down the same day", "Schreiben Sie sie am selben Tag auf"), tt("Who does what, by when", "Wer tut was bis wann")],
  },
  {
    more: tt("The five steps fit on one page: goal and limit, first offer, exchange, handling the no, written confirmation. Use the page before your next real talk and fill it in in five minutes.", "Die fünf Schritte passen auf eine Seite: Ziel und Grenze, erstes Angebot, Tausch, Umgang mit dem Nein, schriftliche Bestätigung. Nutzen Sie die Seite vor Ihrem nächsten echten Gespräch und füllen Sie sie in fünf Minuten aus."),
    example: tt("Mia keeps the page in her notebook. Before the next talk, about a budget for her team, she fills it in on the train.", "Mia hat die Seite in ihrem Notizbuch. Vor dem nächsten Gespräch, über ein Budget für ihr Team, füllt sie sie im Zug aus."),
    points: [tt("Five steps on one page", "Fünf Schritte auf einer Seite"), tt("Prepare before every real talk", "Bereiten Sie jedes echte Gespräch vor"), tt("Practise on small cases first", "Üben Sie zuerst an kleinen Fällen")],
  },
];

/**
 * Lesson pages with a real lesson's parts: the lesson's place in the course, the text, a second paragraph, an example from work and three key points, then "Next" and "Back".
 * `extra` adds the day's own parts (a task, a finish button) after the key points. `plainOnly` keeps a lesson to its text where the day's plan makes the lesson's form the clue.
 */
export function richLessonPages(n: number, o: { prefix?: string; size?: number; leading?: number; back: string; extra?: (i: number) => Blk[]; section?: string; plainOnly?: boolean; /** Leave out "Lesson i of n" where showing the learner's place is the option's change (Day 9). */ noPlace?: boolean }): Record<string, PPage> {
  const p = o.prefix ?? "lesson";
  const texts = LESSON_TEXTS();
  const more = MORE();
  const out: Record<string, PPage> = {};
  for (let i = 0; i < n; i++) {
    const links: Item[] = [];
    if (i + 1 < n) links.push({ label: tt(`Next: ${texts[i + 1].title}`, `Weiter: ${texts[i + 1].title}`), go: `${p}${i + 1}` });
    links.push({ label: tt("Back to the course", "Zurück zum Kurs"), go: o.back });
    const body: Blk[] = o.plainOnly
      ? [{ t: "p", text: `${texts[i].text} ${more[i].more}`, size: o.size, leading: o.leading }]
      : [
          { t: "p", text: texts[i].text, size: o.size, leading: o.leading },
          { t: "p", text: more[i].more, size: o.size, leading: o.leading },
          { t: "note", title: tt("Example from work", "Beispiel aus dem Arbeitsalltag"), text: more[i].example },
          { t: "sub", text: tt("Key points", "Das Wichtigste"), size: o.size },
          { t: "list", items: more[i].points, size: o.size },
        ];
    out[`${p}${i}`] = {
      title: texts[i].title,
      crumb: texts[i].title,
      section: o.section,
      blocks: [...(o.noPlace ? [] : [{ t: "sub", text: tt(`${COURSE_NAME()} · Lesson ${i + 1} of ${n}`, `${COURSE_NAME()} · Lektion ${i + 1} von ${n}`), size: o.size } as Blk]), { t: "h", text: texts[i].title }, ...body, ...(o.extra ? o.extra(i) : []), { t: "links", items: links, size: o.size }],
    };
  }
  return out;
}

/** The syllabus of the course as modules that open the lessons, ticked once visited. Lesson keys follow `richLessonPages`. */
export function courseOutline(n: number, look: Look, o: { prefix?: string; sub?: (i: number) => string | undefined; doneKey?: (i: number) => string | undefined; track?: boolean } = {}): Blk {
  const p = o.prefix ?? "lesson";
  const titles = LESSON_TEXTS().map((l) => l.title);
  const item = (i: number): Item => ({ label: `${i + 1}. ${titles[i]}`, go: `${p}${i}`, track: o.track ?? true, sub: o.sub?.(i), doneKey: o.doneKey?.(i) });
  const idx = Array.from({ length: n }, (_, i) => i);
  const split = Math.ceil(n / 2);
  const modules =
    n <= 3
      ? [{ title: tt("Module 1 · Getting ready", "Modul 1 · Vorbereitung"), items: idx.map(item) }]
      : [
          { title: tt("Module 1 · Getting ready", "Modul 1 · Vorbereitung"), text: tt("What a negotiation is, and how to prepare your offer.", "Was eine Verhandlung ist und wie Sie Ihr Angebot vorbereiten."), items: idx.slice(0, split).map(item) },
          { title: tt("Module 2 · In the talk", "Modul 2 · Im Gespräch"), text: tt("Giving and taking, a no, and the close.", "Geben und Nehmen, ein Nein und der Abschluss."), items: idx.slice(split).map(item) },
        ];
  return { t: "outline", modules, size: look.size };
}

/* ------------------------------------------------------------------ the shell every platform has */

/** The course page: its promise and facts, the lesson list the version shows (`list`), what you learn, the trainer, reviews and questions. */
export function coursePageOf(look: Look, n: number, list: Blk[], section = "course"): PPage {
  return { title: COURSE_NAME(), section, blocks: [...courseHero(look, n), ...list, ...courseOutcomes(look), ...courseAbout(look)] };
}

/** The pages around the course: a catalogue whose first card opens `course`, the further courses, the help centre and the account. */
export function shellPages(look: Look, course = "course"): Record<string, PPage> {
  return {
    catalog: { title: tt("Catalogue", "Katalog"), crumb: tt("Catalogue", "Katalog"), section: "catalog", blocks: [{ t: "h", text: tt("Course catalogue", "Kurskatalog") }, { t: "p", text: tt("All courses your company offers. Open one to read more.", "Alle Kurse, die Ihr Unternehmen anbietet. Öffnen Sie einen, um mehr zu lesen."), size: look.size }, catalogCards(look, course)] },
    ...catalogPages(look, { go: "catalog", label: tt("Back to the catalogue", "Zurück zum Katalog") }, "cat", "catalog"),
    help: helpPage(look, "help"),
    account: accountPage(look, "account"),
  };
}

/** The menu entries of the shell, added after a platform's own entries. */
export const shellNav = () => [{ label: tt("Catalogue", "Katalog"), go: "catalog" }, { label: tt("Help", "Hilfe"), go: "help" }, { label: tt("Account", "Konto"), go: "account" }];
