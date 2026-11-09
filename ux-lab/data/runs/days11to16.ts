import type { Item, Script } from "@/components/sim/ModelRun";
import { tt } from "@/lib/lang";

/** Model runs of Days 11 to 16 (UX-STANDARD 2.21): one scripted scene per day. Every run is an illustration, not data. */

/* ------------------------------------------------------------------ Day 11 · A2 · a voice dialogue on a time line */

export function day11Run(): Script {
  const X = (t: number) => 50 + t * 70; // seconds -> px
  const items: Item[] = [
    { k: "arrow", x1: 40, y1: 250, x2: 620, y2: 250, tone: "mute" },
    ...[0, 1, 2, 3, 4, 5, 6, 7].map((t): Item => ({ k: "text", x: X(t), y: 268, t: `${t} s`, anchor: "middle", size: 10.5, tone: "mute" })),
    { k: "text", x: 12, y: 74, t: tt("Person", "Person"), size: 11, bold: true },
    { k: "text", x: 12, y: 150, t: tt("System", "System"), size: 11, bold: true },
    { k: "text", x: 12, y: 218, t: tt("With the six requirements", "Mit den sechs Anforderungen"), size: 11, bold: true, tone: "sig", at: 4 },
    { k: "box", x: X(0), y: 52, w: 2.2 * 70, h: 36, label: tt("“Set a timer for ten minutes”", "„Stell einen Timer auf zehn Minuten“"), tone: "acc", size: 11, at: 0 },
    { k: "box", x: X(2.2), y: 128, w: 1.8 * 70, h: 36, label: tt("silence", "Stille"), tone: "rust", dash: true, size: 12, at: 1 },
    { k: "arrow", x1: X(3.2), y1: 118, x2: X(3.2), y2: 242, tone: "rust", dash: true, at: 1 },
    { k: "text", x: X(3.2) + 6, y: 112, t: tt("1 s: the flow of thought breaks", "1 s: Der Gedankenfluss reißt"), size: 10.5, tone: "rust", bold: true, at: 1 },
    { k: "box", x: X(4), y: 128, w: 1.6 * 70, h: 36, label: tt("“Timer: fifty minutes”", "„Timer: fünfzig Minuten“"), tone: "rust", size: 10.5, at: 2 },
    { k: "box", x: X(5.8), y: 52, w: 1.1 * 70, h: 36, label: tt("“No, ten!”", "„Nein, zehn!“"), tone: "acc", size: 11, at: 3 },
    { k: "box", x: X(2.4), y: 204, w: 36, h: 32, label: "♪", tone: "sig", size: 14, at: 4 },
    { k: "box", x: X(3), y: 204, w: 1.9 * 70, h: 32, label: tt("“Ten minutes. Start?”", "„Zehn Minuten. Starten?“"), tone: "sig", size: 10.5, at: 4 },
  ];
  return {
    title: tt("One voice request on a time line", "Eine Sprachanfrage auf der Zeitachse"),
    intro: tt("The model lays one request on a time line: who speaks when, and how long the person waits.", "Das Modell legt eine Anfrage auf eine Zeitachse: Wer spricht wann, und wie lange wartet die Person."),
    steps: [
      { say: tt("The person asks for a ten-minute timer. It takes about two seconds to say.", "Die Person bittet um einen Zehn-Minuten-Timer. Das Sagen dauert etwa zwei Sekunden."), meter: { label: tt("Waiting", "Wartezeit"), value: "0 s" } },
      { say: tt("The system says nothing for almost two seconds. Past one second the person starts to doubt that anyone heard.", "Das System sagt fast zwei Sekunden nichts. Nach einer Sekunde zweifelt die Person, ob jemand zugehört hat."), meter: { label: tt("Waiting", "Wartezeit"), value: "1.8 s" } },
      { say: tt("Then it answers with a wrong number and no question. The person has to notice the mistake by listening.", "Dann antwortet es mit einer falschen Zahl und ohne Rückfrage. Die Person muss den Fehler beim Zuhören bemerken."), meter: { label: tt("Waiting", "Wartezeit"), value: "1.8 s" } },
      { say: tt("The person corrects it. The repair costs more time than a short question would have.", "Die Person korrigiert. Die Reparatur kostet mehr Zeit als eine kurze Rückfrage."), meter: { label: tt("Time lost", "Verlorene Zeit"), value: "≈ 4 s" } },
      { say: tt("With the requirements: a short sound at once says “heard”, and the system repeats what it understood and asks.", "Mit den Anforderungen: Ein kurzer Ton sagt sofort „gehört“, und das System wiederholt, was es verstanden hat, und fragt nach."), meter: { label: tt("Waiting", "Wartezeit"), value: "0.2 s" } },
    ],
    items,
    summary: tt(
      "Nielsen's response-time limits: about 0.1 s feels instant, about 1 s keeps the person's flow of thought, about 10 s is the limit for keeping attention (Nielsen 1993). The times here are made up to show the shape of the problem; the six requirements are the card's own list.",
      "Nielsens Grenzen für Antwortzeiten: etwa 0,1 s wirken sofortig, etwa 1 s erhalten den Gedankenfluss, etwa 10 s sind die Grenze für die Aufmerksamkeit (Nielsen 1993). Die Zeiten hier sind erfunden, um die Form des Problems zu zeigen; die sechs Anforderungen sind die Liste der Karte.",
    ),
  };
}

/* ------------------------------------------------------------------ Day 12 · A3 · keyboard and focus through a form */

export function day12Run(): Script {
  const rect = (x: number, y: number, w: number, h: number, label: string): Item => ({ k: "box", x, y, w, h, label, tone: "mute", size: 12 });
  const ring = (x: number, y: number, w: number, h: number, step: number): Item => ({ k: "box", x: x - 4, y: y - 4, w: w + 8, h: h + 8, tone: "acc", fill: false, at: step, out: step + 1 });
  const items: Item[] = [
    { k: "box", x: 30, y: 12, w: 330, h: 256, tone: "mute", fill: false },
    rect(44, 22, 130, 20, tt("Skip to the form", "Zum Formular springen")),
    rect(44, 70, 300, 30, tt("Name", "Name")),
    rect(44, 112, 300, 30, tt("E-mail", "E-Mail")),
    rect(44, 154, 300, 30, tt("Address", "Adresse")),
    rect(44, 214, 130, 34, tt("Pay", "Zahlen")),
    ring(44, 22, 130, 20, 0),
    ring(44, 70, 300, 30, 1),
    ring(44, 112, 300, 30, 2),
    ring(44, 154, 300, 30, 3),
    ring(44, 214, 130, 34, 4),
    { k: "dot", x: 190, y: 32, n: "1", at: 0, out: 1 },
    { k: "dot", x: 358, y: 85, n: "2", at: 1, out: 2 },
    { k: "dot", x: 358, y: 127, n: "3", at: 2, out: 3 },
    { k: "dot", x: 358, y: 169, n: "4", at: 3, out: 4 },
    { k: "dot", x: 190, y: 231, n: "5", at: 4, out: 5 },
    { k: "box", x: 80, y: 70, w: 230, h: 110, label: tt("Newsletter pop-up", "Newsletter-Pop-up"), sub: tt("no close button, no Esc", "kein Schließen, kein Esc"), tone: "rust", at: 5 },
    { k: "path", pts: [[200, 160], [240, 160], [240, 100], [200, 100], [200, 160]], tone: "rust", at: 5 },
    { k: "text", x: 390, y: 40, t: tt("What the standard asks", "Was der Standard verlangt"), bold: true, size: 13 },
    { k: "text", x: 390, y: 70, t: tt("2.4.1 Bypass Blocks (A)", "2.4.1 Blöcke umgehen (A)"), size: 12, at: 0, hi: [0] },
    { k: "text", x: 390, y: 94, t: tt("2.4.3 Focus Order (A)", "2.4.3 Fokusreihenfolge (A)"), size: 12, at: 1, hi: [1, 2, 3] },
    { k: "text", x: 390, y: 118, t: tt("2.4.7 Focus Visible (AA)", "2.4.7 Fokus sichtbar (AA)"), size: 12, at: 4, hi: [4] },
    { k: "text", x: 390, y: 142, t: tt("2.1.2 No Keyboard Trap (A)", "2.1.2 Keine Tastaturfalle (A)"), size: 12, at: 5, hi: [5], tone: "rust", bold: true },
  ];
  return {
    title: tt("Tabbing through a form", "Mit Tab durch ein Formular"),
    intro: tt("The model uses only the Tab key on a checkout form, the way a person who cannot use a mouse does.", "Das Modell benutzt nur die Tab-Taste in einem Bestellformular, so wie eine Person, die keine Maus nutzen kann."),
    steps: [
      { say: tt("First Tab: a skip link. It lets the person jump over repeated blocks such as menus.", "Erster Tab: ein Sprunglink. Er lässt die Person wiederholte Blöcke wie Menüs überspringen."), meter: { label: "Tab", value: "1" } },
      { say: tt("The focus ring is on Name. The order follows the reading order.", "Der Fokusrahmen liegt auf Name. Die Reihenfolge folgt der Leserichtung."), meter: { label: "Tab", value: "2" } },
      { say: tt("E-mail next: each field gets the focus in the order the eye would take.", "Als Nächstes E-Mail: Jedes Feld bekommt den Fokus in der Reihenfolge, die das Auge nehmen würde."), meter: { label: "Tab", value: "3" } },
      { say: tt("Address: the person always knows where they are, because the ring is drawn clearly.", "Adresse: Die Person weiß immer, wo sie ist, weil der Rahmen klar gezeichnet ist."), meter: { label: "Tab", value: "4" } },
      { say: tt("Pay. The whole form took five Tab presses, with a visible focus all the way.", "Zahlen. Das ganze Formular brauchte fünf Tab-Tastendrücke, mit sichtbarem Fokus auf dem ganzen Weg."), meter: { label: "Tab", value: "5" } },
      { say: tt("Now a pop-up opens that cannot be closed by keyboard. Focus circles inside it and the person cannot get out.", "Nun öffnet sich ein Pop-up, das sich per Tastatur nicht schließen lässt. Der Fokus kreist darin, und die Person kommt nicht heraus."), meter: { label: "Tab", value: "∞" } },
    ],
    items,
    summary: tt(
      "The numbers are criteria of the Web Content Accessibility Guidelines (WCAG 2.2): bypass blocks, focus order and no keyboard trap are Level A, a visible focus is Level AA. The form is made up; the path is scripted, not a user test.",
      "Die Nummern sind Kriterien der Web Content Accessibility Guidelines (WCAG 2.2): Blöcke umgehen, Fokusreihenfolge und keine Tastaturfalle sind Level A, ein sichtbarer Fokus ist Level AA. Das Formular ist erfunden; der Pfad ist geskriptet, kein Nutzertest.",
    ),
  };
}

/* ------------------------------------------------------------------ Day 13 · A2 · stimuli piling up */

export function day13Run(version: string): Script {
  const all = [
    tt("Autoplay video", "Video mit Autoplay"),
    tt("Chat bubble", "Chat-Blase"),
    tt("Cookie banner", "Cookie-Banner"),
    tt("Carousel", "Karussell"),
    tt("Newsletter pop-up", "Newsletter-Pop-up"),
    tt("Countdown", "Countdown"),
    tt("News ticker", "Nachrichtenticker"),
    tt("Badge: 3 new", "Badge: 3 neu"),
    tt("Moving banner", "Bewegtes Banner"),
  ];
  const n = version === "over" ? 9 : version === "some" ? 4 : 1;
  const stim = all.slice(0, n);
  const slots: [number, number][] = [[40, 24], [40, 100], [40, 176], [40, 236], [410, 24], [410, 100], [410, 176], [410, 236], [225, 24]];
  const items: Item[] = [
    { k: "box", x: 30, y: 12, w: 580, h: 256, tone: "mute", fill: false },
    { k: "box", x: 220, y: 104, w: 200, h: 78, label: tt("Your delivery window", "Ihr Lieferfenster"), sub: tt("the task", "die Aufgabe"), tone: "sig", size: 14 },
    ...stim.map((t, i): Item => ({ k: "box", x: slots[i][0], y: slots[i][1], w: 190, h: i === 3 || i === 7 ? 22 : 54, label: t, tone: "rust", size: 11, at: i })),
    ...stim.map((_, i): Item => ({ k: "arrow", x1: slots[i][0] + 95, y1: slots[i][1] + 27, x2: 320, y2: 143, tone: "rust", dash: true, at: i, hi: [i, stim.length] })),
  ];
  return {
    title: tt("How many things pull at the eye", "Wie viele Dinge am Auge ziehen"),
    intro: tt("The model puts the task in the middle of a page and adds the other things one at a time.", "Das Modell setzt die Aufgabe in die Mitte einer Seite und fügt die anderen Dinge nacheinander hinzu."),
    steps: [
      ...stim.map((t, i) => ({
        say: tt(`${t} appears. It competes with the task for the same attention.`, `${t} erscheint. Es konkurriert mit der Aufgabe um dieselbe Aufmerksamkeit.`),
        meter: { label: tt("Competing with the task", "Konkurrieren mit der Aufgabe"), value: String(i + 1) },
      })),
      {
        say:
          n === 1
            ? tt("One extra item: the task still stands out. A calm page keeps the number of competing things small.", "Ein zusätzliches Element: Die Aufgabe sticht weiter heraus. Eine ruhige Seite hält die Zahl der konkurrierenden Dinge klein.")
            : tt(`${n} things compete with one task. Every one is a reason to look away, and some of them move or change by themselves.`, `${n} Dinge konkurrieren mit einer Aufgabe. Jedes ist ein Grund wegzuschauen, und manche bewegen oder verändern sich von selbst.`),
        meter: { label: tt("Competing with the task", "Konkurrieren mit der Aufgabe"), value: String(n) },
      },
    ],
    items,
    summary: tt(
      "No number says how much is too much for a person: that depends on the person and the moment. What a standard does say: moving, blinking or updating content that starts by itself and lasts more than five seconds needs a way to pause, stop or hide it (WCAG 2.2.2). The page is made up; this is a design effect, not a simulation of any condition.",
      "Keine Zahl sagt, wie viel für einen Menschen zu viel ist: Das hängt von der Person und dem Moment ab. Was ein Standard sagt: Bewegte, blinkende oder sich aktualisierende Inhalte, die von selbst starten und länger als fünf Sekunden laufen, brauchen eine Möglichkeit zum Pausieren, Stoppen oder Ausblenden (WCAG 2.2.2). Die Seite ist erfunden; dies ist ein Designeffekt, keine Simulation irgendeiner Beeinträchtigung.",
    ),
  };
}

/* ------------------------------------------------------------------ Day 14 · A2 · motion to photon */

export function day14Run(): Script {
  const W = 25; // px per ms
  const stages: [string, number][] = [
    [tt("Sensors", "Sensoren"), 2],
    [tt("Tracking", "Tracking"), 6],
    [tt("Rendering", "Rendern"), 8],
    [tt("Display", "Anzeige"), 4],
  ];
  let t = 0;
  const bars: Item[] = stages.map(([name, ms], i): Item => {
    const x = 60 + t * W;
    t += ms;
    return { k: "box", x, y: 70, w: ms * W - 4, h: 44, label: name, sub: `${ms} ms`, tone: "acc", size: 11, at: i };
  });
  const items: Item[] = [
    { k: "text", x: 60, y: 44, t: tt("Head turns", "Kopf dreht sich"), size: 12, bold: true },
    { k: "arrow", x1: 60, y1: 52, x2: 60, y2: 66, tone: "ink" },
    ...bars,
    { k: "box", x: 60 + 20 * W, y: 70, w: 25 * W - 4, h: 44, label: tt("Extra work: busy scene", "Mehr Arbeit: volle Szene"), sub: "+25 ms", tone: "rust", size: 11, at: 5 },
    { k: "text", x: 60 + 10 * W, y: 150, t: tt("20 ms: the picture follows the head", "20 ms: Das Bild folgt dem Kopf"), size: 12, anchor: "middle", tone: "sig", bold: true, at: 4, out: 5 },
    { k: "text", x: 60 + 22 * W, y: 150, t: tt("45 ms: the picture lags behind", "45 ms: Das Bild hinkt hinterher"), size: 12, anchor: "middle", tone: "rust", bold: true, at: 5 },
    { k: "box", x: 60, y: 176, w: 220, h: 60, tone: "sig", at: 4, out: 5 },
    { k: "dot", x: 170, y: 206, r: 12, n: "", tone: "sig", at: 4, out: 5 },
    { k: "text", x: 170, y: 252, t: tt("Hint sits on the valve", "Hinweis sitzt auf dem Ventil"), anchor: "middle", size: 11, at: 4, out: 5 },
    { k: "box", x: 320, y: 176, w: 280, h: 60, tone: "rust", at: 5 },
    { k: "dot", x: 430, y: 206, r: 12, n: "", tone: "mute", at: 5 },
    { k: "dot", x: 478, y: 198, r: 8, n: "", tone: "rust", at: 5 },
    { k: "text", x: 460, y: 252, t: tt("Hint slides off the valve", "Hinweis rutscht vom Ventil"), anchor: "middle", size: 11, tone: "rust", at: 5 },
  ];
  return {
    title: tt("From head turn to picture", "Vom Kopfdrehen zum Bild"),
    intro: tt("The model follows one head turn through the four stages that end in a new picture, and adds up the time.", "Das Modell folgt einer Kopfdrehung durch die vier Stufen bis zum neuen Bild und addiert die Zeit."),
    steps: [
      { say: tt("The sensors in the headset notice the turn.", "Die Sensoren im Headset bemerken die Drehung."), meter: { label: tt("Total", "Summe"), value: "2 ms" } },
      { say: tt("The system works out where the head now points.", "Das System berechnet, wohin der Kopf nun zeigt."), meter: { label: tt("Total", "Summe"), value: "8 ms" } },
      { say: tt("It draws the picture for that direction.", "Es zeichnet das Bild für diese Richtung."), meter: { label: tt("Total", "Summe"), value: "16 ms" } },
      { say: tt("The display shows it. The picture is a little behind the head, as it always is.", "Die Anzeige zeigt es. Das Bild liegt ein wenig hinter dem Kopf, wie immer."), meter: { label: tt("Total", "Summe"), value: "20 ms" } },
      { say: tt("In a calm scene the delay is small enough that the world seems to stay where it is.", "In einer ruhigen Szene ist die Verzögerung klein genug, dass die Welt an ihrem Ort zu bleiben scheint."), meter: { label: tt("Total", "Summe"), value: "20 ms" } },
      { say: tt("In a busy scene the drawing takes longer. The hint trails the valve it points at, and the world seems to swim.", "In einer vollen Szene dauert das Zeichnen länger. Der Hinweis hinkt dem Ventil hinterher, auf das er zeigt, und die Welt scheint zu schwimmen."), meter: { label: tt("Total", "Summe"), value: "45 ms" } },
    ],
    items,
    summary: tt(
      "About 20 ms from head movement to picture is the figure that headset makers often give as the target for a stable image; it is an industry rule of thumb, not a sharp line, and studies also report effects of lower lags. Prediction can hide part of the delay. The stage times here are made up.",
      "Etwa 20 ms von der Kopfbewegung bis zum Bild ist die Zahl, die Headset-Hersteller oft als Ziel für ein stabiles Bild nennen; es ist eine Faustregel der Branche, keine scharfe Grenze, und Studien berichten auch Effekte bei geringeren Verzögerungen. Vorhersage kann einen Teil der Verzögerung verbergen. Die Stufenzeiten hier sind erfunden.",
    ),
  };
}

/* ------------------------------------------------------------------ Day 15 · A1 · from raw gaze to heat map */

const RAW: [number, number][] = [
  [88, 58], [92, 62], [86, 64], [91, 57], [198, 70], [203, 74], [196, 68], [200, 72],
  [108, 150], [112, 155], [105, 148], [111, 152], [228, 168], [232, 172], [226, 166], [231, 171],
  [230, 204], [233, 208], [228, 202], [232, 206], [106, 160], [110, 163], [104, 157], [109, 161],
];

export function day15Run(): Script {
  const fix: [number, number, number][] = [[90, 60, 240], [200, 71, 180], [108, 152, 300], [230, 170, 220], [230, 205, 260], [107, 160, 200]];
  const items: Item[] = [
    { k: "box", x: 30, y: 14, w: 290, h: 252, tone: "mute", fill: false },
    { k: "box", x: 50, y: 34, w: 250, h: 50, label: tt("Headline", "Überschrift"), tone: "mute", size: 11 },
    { k: "box", x: 50, y: 100, w: 120, h: 100, label: tt("Image", "Bild"), tone: "mute", size: 11 },
    { k: "box", x: 190, y: 150, w: 110, h: 40, label: tt("Price", "Preis"), tone: "mute", size: 11 },
    { k: "box", x: 190, y: 196, w: 110, h: 36, label: tt("Button", "Schaltfläche"), tone: "mute", size: 11 },
    ...RAW.map(([x, y]): Item => ({ k: "dot", x, y, r: 2.6, tone: "ink", at: 0, out: 2 })),
    ...fix.map(([x, y, ms], i): Item => ({ k: "dot", x, y, r: 12, n: String(i + 1), tone: "acc", at: 1, out: 3 })),
    { k: "path", pts: fix.map(([x, y]) => [x, y] as [number, number]), tone: "acc", at: 2, out: 3 },
    ...fix.map(([x, y], i): Item => ({ k: "dot", x, y, r: 12, n: String(i + 1), tone: "acc", at: 2, out: 3 })),
    ...fix.map(([x, y, ms]): Item => ({ k: "dot", x, y, r: 6 + ms / 14, tone: "rust", at: 3 })),
    { k: "text", x: 350, y: 40, t: tt("Dwell per area", "Verweildauer pro Bereich"), bold: true, size: 13, at: 4 },
    { k: "box", x: 350, y: 52, w: 250, h: 26, label: tt("Headline 0.42 s · 2 fixations", "Überschrift 0,42 s · 2 Fixationen"), tone: "mute", size: 11, at: 4 },
    { k: "box", x: 350, y: 84, w: 250, h: 26, label: tt("Image 0.50 s · 2 fixations", "Bild 0,50 s · 2 Fixationen"), tone: "mute", size: 11, at: 4 },
    { k: "box", x: 350, y: 116, w: 250, h: 26, label: tt("Price 0.22 s · 1 fixation", "Preis 0,22 s · 1 Fixation"), tone: "mute", size: 11, at: 4 },
    { k: "box", x: 350, y: 148, w: 250, h: 26, label: tt("Button 0.26 s · 1 fixation", "Schaltfläche 0,26 s · 1 Fixation"), tone: "mute", size: 11, at: 4 },
    { k: "box", x: 350, y: 196, w: 250, h: 56, label: tt("Looking at the price", "Den Preis ansehen"), sub: tt("is not understanding it", "heißt nicht, ihn zu verstehen"), tone: "gold", size: 12, at: 4 },
  ];
  return {
    title: tt("From raw gaze points to a heat map", "Von rohen Blickpunkten zur Heatmap"),
    intro: tt("The model takes the raw output of an eye tracker and turns it into the pictures a report shows, one step at a time.", "Das Modell nimmt die Rohausgabe eines Eye-Trackers und macht daraus Schritt für Schritt die Bilder, die ein Bericht zeigt."),
    steps: [
      { say: tt("Raw gaze samples: many tiny points, dozens per second. Nobody can read a story from them yet.", "Rohe Blickdaten: viele winzige Punkte, Dutzende pro Sekunde. Eine Geschichte lässt sich daraus noch nicht lesen."), meter: { label: tt("Samples", "Messpunkte"), value: String(RAW.length) } },
      { say: tt("Points that stay close together for a while are merged into fixations: places where the eye rested, each with a duration.", "Punkte, die eine Weile nah beieinander bleiben, werden zu Fixationen zusammengefasst: Orte, an denen das Auge ruhte, jeweils mit einer Dauer."), meter: { label: tt("Fixations", "Fixationen"), value: "6" } },
      { say: tt("Joined in order, the fixations form the scanpath: the route the eye took.", "In Reihenfolge verbunden bilden die Fixationen den Scanpath: die Route des Auges."), meter: { label: tt("Scanpath", "Scanpath"), value: "1 → 6" } },
      { say: tt("Add all the fixations of many people, weighted by duration, and you get the heat map: where the eyes gathered.", "Addiert man die Fixationen vieler Menschen, gewichtet nach Dauer, entsteht die Heatmap: wo sich die Augen sammelten."), meter: { label: tt("Heat map", "Heatmap"), value: tt("built", "erstellt") } },
      { say: tt("Areas of interest turn the picture into numbers. But the numbers say where and how long, not why or whether it was understood.", "Interessenbereiche machen aus dem Bild Zahlen. Aber die Zahlen sagen, wo und wie lange, nicht warum oder ob es verstanden wurde."), meter: { label: tt("Areas", "Bereiche"), value: "4" } },
    ],
    items,
    summary: tt(
      "Fixations are the stretches where the eye is relatively still, typically a few hundred milliseconds (Rayner 1998); algorithms such as the dispersion-threshold method (Salvucci and Goldberg 2000) find them in the raw samples. Everything after that is a summary of where people looked. The data here are made up.",
      "Fixationen sind die Phasen, in denen das Auge relativ ruhig ist, typischerweise einige hundert Millisekunden (Rayner 1998); Algorithmen wie die Dispersionsschwellen-Methode (Salvucci und Goldberg 2000) finden sie in den Rohdaten. Alles danach ist eine Zusammenfassung dessen, wohin Menschen schauten. Die Daten hier sind erfunden.",
    ),
  };
}

/* ------------------------------------------------------------------ Day 16 · A2 · one test session on a time line */

export function day16Run(): Script {
  const X = (m: number) => 50 + m * 70;
  const ev: [number, string, string, string][] = [
    [0.7, tt("Orientation", "Orientierung"), tt("Looks around, cannot find the start", "Schaut sich um, findet den Start nicht"), tt("Log the time, the place, the words said.", "Zeit, Ort und gesagte Worte notieren.")],
    [2.0, tt("Presence", "Präsenz"), tt("Reaches out, then pulls the hand back", "Greift aus, zieht die Hand zurück"), tt("Log the moment the illusion breaks.", "Den Moment festhalten, in dem die Illusion bricht.")],
    [3.2, tt("Overload", "Überlastung"), tt("Goes quiet, slows down", "Wird still, wird langsamer"), tt("Log it, then ask about load afterwards.", "Notieren, danach nach der Belastung fragen.")],
    [4.4, tt("Error robustness", "Fehlerrobustheit"), tt("A gesture is not recognised", "Eine Geste wird nicht erkannt"), tt("Log what the system did, and what the person did next.", "Notieren, was das System tat und was die Person danach tat.")],
    [5.6, tt("Acceptance", "Akzeptanz"), tt("Asks: how long will this take?", "Fragt: Wie lange dauert das noch?"), tt("Ask afterwards: would you use this again?", "Danach fragen: Würden Sie das wieder nutzen?")],
    [6.8, tt("Transfer", "Transfer"), tt("Tries the step on the real machine", "Probiert den Schritt an der echten Maschine"), tt("Check whether it carries over to the real task.", "Prüfen, ob es sich auf die echte Aufgabe übertragen lässt.")],
  ];
  const items: Item[] = [
    { k: "arrow", x1: 40, y1: 150, x2: 625, y2: 150, tone: "mute" },
    { k: "text", x: 40, y: 172, t: tt("minutes of the session", "Minuten der Sitzung"), size: 10.5, tone: "mute" },
    ...[0, 1, 2, 3, 4, 5, 6, 7, 8].map((m): Item => ({ k: "text", x: X(m), y: 144, t: String(m), anchor: "middle", size: 10, tone: "mute" })),
    ...ev.flatMap(([m, name, what, log], i): Item[] => [
      { k: "dot", x: X(m), y: 150, r: 8, n: String(i + 1), tone: "acc", at: i },
      { k: "text", x: X(m), y: i % 2 === 0 ? 124 : 176, t: name, anchor: "middle", size: 11.5, bold: true, at: i, hi: [i] },
      { k: "box", x: 40, y: 196, w: 580, h: 60, tone: "acc", at: i, out: i + 1 },
      { k: "text", x: 54, y: 218, t: what, size: 12.5, bold: true, at: i, out: i + 1 },
      { k: "text", x: 54, y: 240, t: log, size: 12, at: i, out: i + 1 },
    ]),
  ];
  return {
    title: tt("One test session, six things to catch", "Eine Testsitzung, sechs Dinge zum Festhalten"),
    intro: tt("The model lays an eight-minute test of an immersive prototype on a time line and shows where each of the six criteria turns up.", "Das Modell legt einen achtminütigen Test eines immersiven Prototyps auf eine Zeitachse und zeigt, wo jedes der sechs Kriterien auftaucht."),
    steps: ev.map(([, name, what], i) => ({
      say: tt(`${name}: ${what}.`, `${name}: ${what}.`),
      meter: { label: tt("Caught", "Erfasst"), value: `${i + 1} / 6` },
    })),
    items,
    summary: tt(
      "The six criteria arrive one after the other and at different moments, so they are caught by observing during the session and asking after it. Standard questionnaires exist for some of them, for example the Simulator Sickness Questionnaire (Kennedy et al. 1993) for discomfort and NASA-TLX (Hart and Staveland 1988) for workload. The session here is made up.",
      "Die sechs Kriterien treten nacheinander und zu verschiedenen Zeitpunkten auf; man erfasst sie durch Beobachten während der Sitzung und Fragen danach. Für einige gibt es Standardfragebögen, zum Beispiel den Simulator Sickness Questionnaire (Kennedy et al. 1993) für Unwohlsein und NASA-TLX (Hart und Staveland 1988) für die Arbeitsbelastung. Die Sitzung hier ist erfunden.",
    ),
  };
}
