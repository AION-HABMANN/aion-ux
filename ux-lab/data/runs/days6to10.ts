import type { Item, Script } from "@/components/sim/ModelRun";
import { tt } from "@/lib/lang";

/** Model runs of Days 6 to 10 (UX-STANDARD 2.21): one scripted scene per day. Every run is an illustration, not data. */

/* ------------------------------------------------------------------ Day 6 · A1 · Gestalt grouping */

export function day6Run(): Script {
  const flat = (i: number) => 50 + i * 49;
  const grp = (i: number) => 60 + Math.floor(i / 4) * 205 + (i % 4) * 36;
  const names = [tt("Dates", "Termine"), tt("Passengers", "Reisende"), tt("Pay", "Zahlen")];
  const tones = ["acc", "sig", "gold"] as const;
  const items: Item[] = [
    ...Array.from({ length: 12 }, (_, i): Item => ({ k: "box", x: flat(i), y: 120, w: 30, h: 30, tone: "mute", at: -1, out: 1 })),
    ...Array.from({ length: 12 }, (_, i): Item => ({ k: "box", x: grp(i), y: 120, w: 30, h: 30, tone: "mute", at: 1, out: 2 })),
    ...Array.from({ length: 12 }, (_, i): Item => ({ k: "box", x: grp(i), y: 120, w: 30, h: 30, tone: tones[Math.floor(i / 4)], at: 2 })),
    ...[0, 1, 2].map((g): Item => ({ k: "box", x: 52 + g * 205, y: 100, w: 154, h: 70, tone: "mute", fill: false, at: 3 })),
    ...[0, 1, 2].map((g): Item => ({ k: "text", x: 129 + g * 205, y: 92, t: names[g], anchor: "middle", bold: true, size: 13, tone: tones[g], at: 3 })),
    { k: "text", x: 320, y: 220, t: tt("Twelve separate items", "Zwölf einzelne Elemente"), anchor: "middle", size: 14, bold: true, at: -1, out: 1 },
    { k: "text", x: 320, y: 220, t: tt("Three groups by distance", "Drei Gruppen durch Abstand"), anchor: "middle", size: 14, bold: true, at: 1, out: 2 },
    { k: "text", x: 320, y: 220, t: tt("Groups by distance and colour", "Gruppen durch Abstand und Farbe"), anchor: "middle", size: 14, bold: true, at: 2, out: 3 },
    { k: "text", x: 320, y: 220, t: tt("Groups by distance, colour and a frame", "Gruppen durch Abstand, Farbe und Rahmen"), anchor: "middle", size: 14, bold: true, at: 3 },
  ];
  return {
    title: tt("How the eye forms groups", "Wie das Auge Gruppen bildet"),
    intro: tt("The model takes twelve equal items and adds one grouping cue at a time.", "Das Modell nimmt zwölf gleiche Elemente und fügt nacheinander je einen Gruppierungshinweis hinzu."),
    steps: [
      { say: tt("Twelve equal items in an even row: no group, so the eye must treat each item on its own.", "Zwölf gleiche Elemente in gleichmäßiger Reihe: keine Gruppe, das Auge muss jedes Element einzeln behandeln."), meter: { label: tt("Units to scan", "Einheiten zum Prüfen"), value: "12" } },
      { say: tt("Proximity: the same items with gaps between every four. The eye sees three groups at once.", "Nähe: dieselben Elemente mit Lücken nach je vier. Das Auge sieht sofort drei Gruppen."), meter: { label: tt("Units to scan", "Einheiten zum Prüfen"), value: "3" } },
      { say: tt("Similarity: one colour per group. The groups hold together more strongly.", "Ähnlichkeit: eine Farbe pro Gruppe. Die Gruppen halten stärker zusammen."), meter: { label: tt("Units to scan", "Einheiten zum Prüfen"), value: "3" } },
      { say: tt("Common region: a frame and a name. Now each group also says what it is for.", "Gemeinsamer Bereich: ein Rahmen und ein Name. Jetzt sagt jede Gruppe auch, wofür sie da ist."), meter: { label: tt("Units to scan", "Einheiten zum Prüfen"), value: "3" } },
    ],
    items,
    summary: tt(
      "Grouping cues are what the Gestalt psychologists described: proximity and similarity (Wertheimer 1923) and, later, common region (Palmer 1992). Three groups instead of twelve items is the saving on a screen: the eye jumps by group, not by item.",
      "Gruppierungshinweise sind das, was die Gestaltpsychologen beschrieben: Nähe und Ähnlichkeit (Wertheimer 1923) und später der gemeinsame Bereich (Palmer 1992). Drei Gruppen statt zwölf Elemente ist der Gewinn auf dem Bildschirm: Das Auge springt von Gruppe zu Gruppe, nicht von Element zu Element.",
    ),
  };
}

/* ------------------------------------------------------------------ Day 7 · A4 · one tone in four situations */

export function day7Run(): Script {
  const msg = tt("Great news, we are on it! 🎉", "Tolle Neuigkeiten, wir kümmern uns! 🎉");
  const cols: { x: number; sit: string; fits: boolean; fix: [string, string] }[] = [
    { x: 24, sit: tt("Order confirmed", "Bestellung bestätigt"), fits: true, fix: ["", ""] },
    { x: 178, sit: tt("Delivery is late", "Lieferung verspätet"), fits: false, fix: [tt("Your order is late.", "Ihre Bestellung ist verspätet."), tt("New date: 14 May.", "Neuer Termin: 14. Mai.")] },
    { x: 332, sit: tt("Payment failed", "Zahlung fehlgeschlagen"), fits: false, fix: [tt("Payment did not go through.", "Zahlung nicht durchgegangen."), tt("Nothing was charged.", "Es wurde nichts abgebucht.")] },
    { x: 486, sit: tt("Account closed", "Konto geschlossen"), fits: false, fix: [tt("Your account is closed.", "Ihr Konto ist geschlossen."), tt("Data is deleted 1 June.", "Daten werden am 1. Juni gelöscht.")] },
  ];
  const items: Item[] = cols.flatMap((c, i): Item[] => [
    { k: "box", x: c.x, y: 30, w: 134, h: 30, label: c.sit, tone: "mute", size: 11 },
    { k: "box", x: c.x, y: 74, w: 134, h: 70, label: msg, tone: "gold", size: 11, at: i },
    { k: "box", x: c.x, y: 156, w: 134, h: 26, label: c.fits ? tt("Fits", "Passt") : tt("Does not fit", "Passt nicht"), tone: c.fits ? "sig" : "rust", size: 12, at: i },
    ...(c.fits
      ? []
      : ([
          { k: "box", x: c.x, y: 196, w: 134, h: 62, tone: "sig", at: 4 },
          { k: "text", x: c.x + 67, y: 218, t: c.fix[0], anchor: "middle", size: 10.5, at: 4 },
          { k: "text", x: c.x + 67, y: 236, t: c.fix[1], anchor: "middle", size: 10.5, at: 4 },
        ] as Item[])),
  ]);
  return {
    title: tt("One cheerful message in four situations", "Eine fröhliche Nachricht in vier Situationen"),
    intro: tt("The model sends the same cheerful message in four situations and asks one question each time: does the feeling fit the moment?", "Das Modell sendet dieselbe fröhliche Nachricht in vier Situationen und fragt jedes Mal: Passt das Gefühl zum Moment?"),
    steps: [
      { say: tt("An order is confirmed: a cheerful tone fits. Nothing to correct.", "Eine Bestellung ist bestätigt: Ein fröhlicher Ton passt. Nichts zu korrigieren."), meter: { label: tt("Fits", "Passt"), value: "1 / 1" } },
      { say: tt("The delivery is late: the same cheer now reads as not taking the problem seriously.", "Die Lieferung ist verspätet: Dieselbe Fröhlichkeit wirkt jetzt, als nähme man das Problem nicht ernst."), meter: { label: tt("Fits", "Passt"), value: "1 / 2" } },
      { say: tt("The payment failed: cheer here feels like a mistake and can raise doubt about the shop.", "Die Zahlung ist fehlgeschlagen: Fröhlichkeit wirkt hier wie ein Fehler und kann Zweifel am Shop wecken."), meter: { label: tt("Fits", "Passt"), value: "1 / 3" } },
      { say: tt("The account is closed: the cheer is worst here, because the moment is a loss for the customer.", "Das Konto ist geschlossen: Hier ist die Fröhlichkeit am schlimmsten, weil der Moment für den Kunden ein Verlust ist."), meter: { label: tt("Fits", "Passt"), value: "1 / 4" } },
      { say: tt("The voice of the brand can stay the same; only the tone follows the situation: plain, calm, with the next step.", "Die Stimme der Marke kann gleich bleiben; nur der Ton folgt der Situation: schlicht, ruhig, mit dem nächsten Schritt."), meter: { label: tt("Fits", "Passt"), value: "4 / 4" } },
    ],
    items,
    summary: tt(
      "Feelings in a product come from tone in the critical moments, and a tone guide sets one voice with a tone that changes with the reader's situation (see the Mailchimp voice and tone guide named in Materi B1). The messages here are made up for the Moss & Pine case.",
      "Gefühle in einem Produkt entstehen aus dem Ton in den kritischen Momenten, und ein Tonleitfaden legt eine Stimme fest, deren Ton sich mit der Situation der Leserin ändert (siehe den Mailchimp-Leitfaden zu Stimme und Ton in Materi B1). Die Nachrichten hier sind für den Fall Moss & Pine erfunden.",
    ),
  };
}

/* ------------------------------------------------------------------ Day 8 · A2 · a journey as an arc */

export function day8Run(): Script {
  const pts: [number, number, string, string][] = [
    [70, 220, tt("Start", "Start"), tt("Goal: plan my kitchen", "Ziel: meine Küche planen")],
    [190, 170, tt("Step 2", "Schritt 2"), tt("Measure the room", "Raum ausmessen")],
    [320, 70, tt("Step 3", "Schritt 3"), tt("Choose appliances: the hard part", "Geräte wählen: der schwere Teil")],
    [450, 150, tt("Step 4", "Schritt 4"), tt("Layout takes shape", "Layout entsteht")],
    [570, 215, tt("Done", "Fertig"), tt("Your kitchen plan", "Ihr Küchenplan")],
  ];
  const items: Item[] = [
    { k: "arrow", x1: 40, y1: 250, x2: 620, y2: 250, tone: "mute" },
    { k: "arrow", x1: 40, y1: 250, x2: 40, y2: 24, tone: "mute" },
    { k: "text", x: 48, y: 36, t: tt("tension", "Spannung"), size: 11, tone: "mute" },
    ...pts.flatMap(([x, y, a, b], i): Item[] => [
      ...(i > 0 ? [{ k: "path", pts: [[pts[i - 1][0], pts[i - 1][1]], [x, y]], tone: "acc", dash: false, at: i } as Item] : []),
      { k: "dot", x, y, n: String(i + 1), at: i, tone: i === 2 ? "rust" : i === 4 ? "sig" : "acc" },
      { k: "text", x, y: y > 140 ? y + 28 : y - 16, t: a, anchor: "middle", size: 12, bold: true, at: i },
      { k: "text", x, y: y > 140 ? y + 43 : y - 1, t: b, anchor: "middle", size: 10.5, tone: "mute", at: i },
    ]),
  ];
  return {
    title: tt("An onboarding replayed as an arc", "Ein Onboarding als Spannungsbogen abgespielt"),
    intro: tt("The model replays a planner journey as a story: where does it start, where does it get hard, where does it end?", "Das Modell spielt eine Planer-Reise als Geschichte ab: Wo beginnt sie, wo wird sie schwer, wo endet sie?"),
    steps: [
      { say: tt("The start names a goal. Without it the steps are just tasks.", "Der Anfang nennt ein Ziel. Ohne es sind die Schritte nur Aufgaben.") },
      { say: tt("Rising action: small steps that each lead somewhere.", "Steigende Handlung: kleine Schritte, die jeweils irgendwohin führen.") },
      { say: tt("The hardest step is the peak. A journey with no peak feels flat; a peak with no help feels like a wall.", "Der schwerste Schritt ist der Höhepunkt. Eine Reise ohne Höhepunkt wirkt flach; ein Höhepunkt ohne Hilfe wirkt wie eine Wand.") },
      { say: tt("After the peak the user sees the result take shape: progress is visible again.", "Nach dem Höhepunkt sieht der Nutzer das Ergebnis entstehen: Der Fortschritt ist wieder sichtbar.") },
      { say: tt("The resolution closes the story: the goal from the start is reached and named.", "Die Auflösung schließt die Geschichte: Das Ziel vom Anfang ist erreicht und benannt.") },
    ],
    items,
    summary: tt(
      "The five parts follow Freytag's pyramid of drama (1863): exposition, rising action, climax, falling action, resolution. It is a model to describe a journey, not a measurement; the case is made up for Lantern Kitchens.",
      "Die fünf Teile folgen Freytags Pyramide des Dramas (1863): Exposition, steigende Handlung, Höhepunkt, fallende Handlung, Auflösung. Es ist ein Modell zur Beschreibung einer Reise, keine Messung; der Fall ist für Lantern Kitchens erfunden.",
    ),
  };
}

/* ------------------------------------------------------------------ Day 9 · A3 · a streak over two weeks */

export function day9Run(): Script {
  const done = (i: number) => i !== 7 && i !== 8;
  const x = (i: number) => 52 + i * 41;
  const items: Item[] = [
    ...Array.from({ length: 14 }, (_, i): Item => ({ k: "text", x: x(i), y: 94, t: String(i + 1), anchor: "middle", size: 10.5, tone: "mute" })),
    ...Array.from({ length: 14 }, (_, i): Item => ({ k: "dot", x: x(i), y: 124, r: 14, n: done(i) ? "✓" : "✕", tone: done(i) ? (i < 7 ? "sig" : "acc") : "rust", at: i < 3 ? 0 : i < 7 ? 1 : i === 7 ? 2 : i === 8 ? 2 : 3 })),
    { k: "text", x: 40, y: 190, t: tt("Streak:", "Serie:"), bold: true, size: 14 },
    { k: "text", x: 110, y: 190, t: "3", bold: true, size: 20, tone: "sig", at: 0, out: 1 },
    { k: "text", x: 110, y: 190, t: "7", bold: true, size: 20, tone: "sig", at: 1, out: 2 },
    { k: "text", x: 110, y: 190, t: "0", bold: true, size: 20, tone: "rust", at: 2, out: 3 },
    { k: "text", x: 110, y: 190, t: "5", bold: true, size: 20, tone: "acc", at: 3 },
    { k: "box", x: 40, y: 212, w: 540, h: 40, tone: "gold", label: tt("Day 7: badge “One week!”", "Tag 7: Abzeichen „Eine Woche!“"), at: 1, out: 2, size: 13 },
    { k: "box", x: 40, y: 212, w: 540, h: 40, tone: "rust", label: tt("Day 8: streak lost. Back to zero.", "Tag 8: Serie verloren. Zurück auf null."), at: 2, out: 3, size: 13 },
    { k: "box", x: 40, y: 212, w: 540, h: 40, tone: "acc", label: tt("Day 14: a new streak, 5 days", "Tag 14: eine neue Serie, 5 Tage"), at: 3, size: 13 },
  ];
  return {
    title: tt("A streak over two weeks", "Eine Serie über zwei Wochen"),
    intro: tt("The model follows one person through fourteen days of a savings app with a streak counter.", "Das Modell begleitet eine Person durch vierzehn Tage einer Spar-App mit Serienzähler."),
    steps: [
      { say: tt("Days 1 to 3: the streak starts. Each day makes the next one harder to skip.", "Tag 1 bis 3: Die Serie beginnt. Jeder Tag macht den nächsten schwerer zu überspringen."), meter: { label: tt("Streak", "Serie"), value: "3" } },
      { say: tt("Days 4 to 7: the streak grows and a badge arrives at one week. The mechanic is working.", "Tag 4 bis 7: Die Serie wächst, und nach einer Woche kommt ein Abzeichen. Die Mechanik funktioniert."), meter: { label: tt("Streak", "Serie"), value: "7" } },
      { say: tt("Days 8 and 9 are missed. The streak falls to zero: seven days of effort seem lost in one day.", "Tag 8 und 9 werden verpasst. Die Serie fällt auf null: Sieben Tage Mühe scheinen an einem Tag verloren."), meter: { label: tt("Streak", "Serie"), value: "0" } },
      { say: tt("Some people start again; some feel the loss and stop. The tool that held them now decides whether they leave.", "Manche beginnen neu; manche spüren den Verlust und hören auf. Das Mittel, das sie hielt, entscheidet nun, ob sie gehen."), meter: { label: tt("Streak", "Serie"), value: "5" } },
    ],
    items,
    summary: tt(
      "A lost streak is framed as a loss, and losses weigh more than equal gains (Kahneman and Tversky 1979), so a break can hurt more than the streak ever pleased. That is a reason to give a way back (a freeze day, a restart), not a measured drop-out rate. The person here is made up.",
      "Eine verlorene Serie wird als Verlust empfunden, und Verluste wiegen schwerer als gleich große Gewinne (Kahneman und Tversky 1979); ein Bruch kann daher mehr schmerzen, als die Serie je erfreute. Das spricht für einen Weg zurück (ein Schontag, ein Neustart), nicht für eine gemessene Abbruchquote. Die Person hier ist erfunden.",
    ),
  };
}

/* ------------------------------------------------------------------ Day 10 · A1 · rule, situation, learning over five sessions */

export function day10Run(): Script {
  const sessions = [tt("Mon, home", "Mo, zu Hause"), tt("Tue, station", "Di, Bahnhof"), tt("Wed, home", "Mi, zu Hause"), tt("Thu, station", "Do, Bahnhof"), tt("Fri, station", "Fr, Bahnhof")];
  const rows: { name: string; tone: "mute" | "acc" | "sig"; cells: string[] }[] = [
    { name: tt("A rule", "Eine Regel"), tone: "mute", cells: Array(5).fill(tt("Delay: 12 min", "Verspätung: 12 Min")) },
    { name: tt("The situation", "Die Situation"), tone: "acc", cells: [tt("Leave later", "Später losgehen"), tt("Platform 4", "Gleis 4"), tt("Leave later", "Später losgehen"), tt("Platform 4", "Gleis 4"), tt("Platform 4", "Gleis 4")] },
    { name: tt("What it learned", "Was es gelernt hat"), tone: "sig", cells: [tt("Delay: 12 min", "Verspätung: 12 Min"), tt("Platform 4", "Gleis 4"), tt("Bus 7 instead?", "Lieber Bus 7?"), tt("Bus 7 instead?", "Lieber Bus 7?"), tt("Bus 7 now", "Bus 7 jetzt")] },
  ];
  const cx = (j: number) => 150 + j * 96;
  const items: Item[] = [
    ...sessions.map((s, j): Item => ({ k: "text", x: cx(j) + 44, y: 38, t: s, anchor: "middle", size: 11, bold: true, at: j })),
    ...rows.flatMap((r, i): Item[] => [
      { k: "text", x: 16, y: 88 + i * 70, t: r.name, size: 12, bold: true, tone: r.tone === "mute" ? "ink" : r.tone },
      ...r.cells.map((c, j): Item => ({ k: "box", x: cx(j), y: 62 + i * 70, w: 88, h: 44, label: c, tone: r.tone, size: 10.5, at: j })),
    ]),
  ];
  return {
    title: tt("The same delay in five sessions", "Dieselbe Verspätung in fünf Sitzungen"),
    intro: tt("The model shows one train delay to the same person in five sessions, handled three ways.", "Das Modell zeigt derselben Person in fünf Sitzungen eine Zugverspätung, auf drei Arten behandelt."),
    steps: [
      { say: tt("Monday at home. The rule shows its fixed text; the situational system tells the person to leave later; the learning system has no history yet.", "Montag zu Hause. Die Regel zeigt ihren festen Text; das situative System rät, später loszugehen; das lernende System hat noch keine Geschichte.") },
      { say: tt("Tuesday at the station. The rule does not change. The situational system switches to the platform. The learning system still copies the platform.", "Dienstag am Bahnhof. Die Regel ändert sich nicht. Das situative System wechselt zum Gleis. Das lernende System übernimmt noch das Gleis.") },
      { say: tt("Wednesday. The person took the bus on Tuesday, and the learning system noticed: it now asks about Bus 7.", "Mittwoch. Die Person nahm am Dienstag den Bus, und das lernende System hat es bemerkt: Es fragt nun nach Bus 7.") },
      { say: tt("Thursday. The learning system keeps its guess. The situational system still follows the place, not the person.", "Donnerstag. Das lernende System behält seine Vermutung. Das situative System folgt weiter dem Ort, nicht der Person.") },
      { say: tt("Friday. The learning system now acts on the habit. If the person changes their habit, it will be wrong until it learns again.", "Freitag. Das lernende System handelt nun nach der Gewohnheit. Ändert die Person ihre Gewohnheit, liegt es falsch, bis es neu gelernt hat.") },
    ],
    items,
    summary: tt(
      "A rule gives the same answer every time, a situational system answers the place and time, a learning system answers the person's history. That is the card's line between rule-based, adaptive and learning; the sessions here are made up for the Northline case.",
      "Eine Regel gibt jedes Mal dieselbe Antwort, ein situatives System antwortet auf Ort und Zeit, ein lernendes System auf die Geschichte der Person. Das ist die Linie der Karte zwischen regelbasiert, adaptiv und lernend; die Sitzungen hier sind für den Fall Northline erfunden.",
    ),
  };
}
