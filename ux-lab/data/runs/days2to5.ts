import type { Item, Script } from "@/components/sim/ModelRun";
import { tt } from "@/lib/lang";

/** Model runs of Days 2 to 5 (UX-STANDARD 2.21): one scripted scene per day, in the lab of the card named in the comment. Every run is an illustration, not data. */

/* ------------------------------------------------------------------ Day 2 · A2 · the scan path */

const LINES = [290, 270, 285, 250, 290, 275, 160, 285, 270, 240, 280];

export function day2Run(version: string): Script {
  if (version === "scan") {
    const rows: [string, string][] = [
      [tt("Date", "Datum"), "12 Mar"],
      [tt("Place", "Ort"), tt("Online", "Online")],
      [tt("Fee", "Preis"), "349 EUR"],
      [tt("Level", "Niveau"), tt("Beginner", "Einsteiger")],
    ];
    const items: Item[] = [
      { k: "box", x: 30, y: 14, w: 330, h: 252, tone: "mute", fill: false },
      { k: "box", x: 45, y: 28, w: 200, h: 30, label: tt("Course: UX basics", "Kurs: UX-Grundlagen"), tone: "acc", size: 14 },
      ...rows.map(([a, b], i): Item => ({ k: "box", x: 45, y: 74 + i * 38, w: 300, h: 28, label: `${a}: ${b}`, tone: i === 2 ? "sig" : "mute", size: 12 })),
      { k: "box", x: 45, y: 232, w: 120, h: 26, label: tt("Book", "Buchen"), tone: "acc", size: 13 },
      { k: "path", pts: [[60, 43], [75, 88], [75, 164], [100, 245]], tone: "acc", at: 1 },
      { k: "dot", x: 60, y: 43, n: "1", at: 0 },
      { k: "dot", x: 75, y: 88, n: "2", at: 1 },
      { k: "dot", x: 75, y: 164, n: "3", at: 2, tone: "sig" },
      { k: "dot", x: 100, y: 245, n: "4", at: 3 },
      { k: "text", x: 392, y: 70, t: tt("What the eye finds", "Was das Auge findet"), bold: true, size: 13 },
      { k: "text", x: 392, y: 96, t: tt("Heading: at once", "Überschrift: sofort"), at: 0 },
      { k: "text", x: 392, y: 118, t: tt("Labels guide it down", "Labels führen nach unten"), at: 1 },
      { k: "text", x: 392, y: 140, t: tt("Fee found: fixation 3", "Preis gefunden: Fixation 3"), at: 2, tone: "sig", bold: true },
      { k: "text", x: 392, y: 162, t: tt("Next step is visible", "Nächster Schritt ist sichtbar"), at: 3 },
    ];
    return {
      title: tt("The scan path on a page built for scanning", "Der Blickpfad auf einer scanbaren Seite"),
      intro: tt("The model scans the page the way people scan: it looks for the fee.", "Das Modell überfliegt die Seite, wie Menschen es tun: Es sucht den Preis."),
      steps: [
        { say: tt("The eye lands on the heading: it is the largest, strongest shape.", "Das Auge landet auf der Überschrift: Sie ist die größte, stärkste Form."), meter: { label: tt("Fixations", "Fixationen"), value: "1" } },
        { say: tt("Short labels with their values invite a quick run down the page.", "Kurze Labels mit ihren Werten laden zu einem schnellen Lauf nach unten ein."), meter: { label: tt("Fixations", "Fixationen"), value: "2" } },
        { say: tt("The fee has its own row and label, so it is found on the third look.", "Der Preis hat eine eigene Zeile und ein Label, also wird er beim dritten Blick gefunden."), meter: { label: tt("Fixations", "Fixationen"), value: "3" } },
        { say: tt("The Book button is the next stop: the page shows what to do.", "Die Schaltfläche Buchen ist der nächste Halt: Die Seite zeigt, was zu tun ist."), meter: { label: tt("Fixations", "Fixationen"), value: "4" } },
      ],
      items,
      summary: tt(
        "Four stops to the fee and the next step. Eyetracking of 232 users found that people read text-heavy pages in an F-shaped pattern and rarely read everything (Nielsen 2006); headings and short labels give the eye places to land. This path is scripted, not recorded.",
        "Vier Stationen bis zum Preis und zum nächsten Schritt. Eyetracking mit 232 Nutzern zeigte, dass Menschen textlastige Seiten F-förmig lesen und selten alles lesen (Nielsen 2006); Überschriften und kurze Labels geben dem Auge Landeplätze. Dieser Pfad ist geskriptet, nicht aufgezeichnet.",
      ),
    };
  }
  const items: Item[] = [
    { k: "box", x: 30, y: 14, w: 330, h: 252, tone: "mute", fill: false },
    ...LINES.map((w, i): Item => ({ k: "box", x: 45, y: 40 + i * 19, w, h: 8, tone: i === 5 ? "rust" : "mute" })),
    { k: "path", pts: [[50, 44], [335, 44]], tone: "acc", at: 1 },
    { k: "path", pts: [[50, 82], [225, 82]], tone: "acc", at: 2 },
    { k: "path", pts: [[50, 120], [50, 158], [50, 196]], tone: "acc", at: 3 },
    { k: "dot", x: 50, y: 44, n: "1", at: 0 },
    { k: "dot", x: 335, y: 44, n: "2", at: 1 },
    { k: "dot", x: 50, y: 82, n: "3", at: 2 },
    { k: "dot", x: 225, y: 82, n: "4", at: 2 },
    { k: "dot", x: 50, y: 120, n: "5", at: 3 },
    { k: "dot", x: 50, y: 158, n: "6", at: 3 },
    { k: "dot", x: 50, y: 196, n: "7", at: 3 },
    { k: "text", x: 392, y: 70, t: tt("The fee sits here", "Hier steht der Preis"), bold: true, size: 13, tone: "rust", at: 4 },
    { k: "arrow", x1: 388, y1: 76, x2: 250, y2: 134, tone: "rust", at: 4 },
    { k: "text", x: 392, y: 100, t: tt("Never fixated.", "Nie fixiert."), at: 4, tone: "rust" },
  ];
  return {
    title: tt("The scan path on a dense block", "Der Blickpfad auf einem dichten Textblock"),
    intro: tt("The model looks for the fee in a block of text, the way people skim.", "Das Modell sucht den Preis in einem Textblock, so wie Menschen überfliegen."),
    steps: [
      { say: tt("The eye lands on the first line, top left.", "Das Auge landet auf der ersten Zeile, oben links."), meter: { label: tt("Fixations", "Fixationen"), value: "1" } },
      { say: tt("It runs along the whole first line: this is where people read most.", "Es läuft die ganze erste Zeile entlang: Hier lesen Menschen am meisten."), meter: { label: tt("Fixations", "Fixationen"), value: "2" } },
      { say: tt("It drops and reads a shorter second stretch.", "Es fällt nach unten und liest ein kürzeres zweites Stück."), meter: { label: tt("Fixations", "Fixationen"), value: "4" } },
      { say: tt("Then it slides down the left edge and skips the middle.", "Dann gleitet es den linken Rand hinunter und überspringt die Mitte."), meter: { label: tt("Fixations", "Fixationen"), value: "7" } },
      { say: tt("The fee sat in the middle of a line and was never seen.", "Der Preis stand mitten in einer Zeile und wurde nie gesehen."), meter: { label: tt("Found the fee", "Preis gefunden"), value: tt("no", "nein") } },
    ],
    items,
    summary: tt(
      "Seven stops and the fee is still missed. Eyetracking of 232 users found a dominant F-shaped pattern on text-heavy pages: a full first line, a shorter second line, then the left edge (Nielsen 2006). Compare the version built for scanning. This path is scripted, not recorded.",
      "Sieben Stationen und der Preis wird trotzdem verpasst. Eyetracking mit 232 Nutzern zeigte ein vorherrschendes F-Muster auf textlastigen Seiten: eine volle erste Zeile, eine kürzere zweite, dann der linke Rand (Nielsen 2006). Vergleichen Sie die scanbare Version. Dieser Pfad ist geskriptet, nicht aufgezeichnet.",
    ),
  };
}

/* ------------------------------------------------------------------ Day 3 · A2 · functional against decorative colour */

export function day3Run(version: string): Script {
  const fn = version === "function";
  const stripes: Item[] = [0, 1, 2].map((i): Item => ({ k: "box", x: 45, y: 82 + i * 46, w: 10, h: 36, tone: fn ? (i === 1 ? "rust" : "mute") : (["acc", "sig", "gold"] as const)[i] }));
  const rowLabel = [tt("Order 118 · delivered", "Bestellung 118 · geliefert"), tt("Order 119 · late: act now", "Bestellung 119 · verspätet: jetzt handeln"), tt("Order 120 · in transit", "Bestellung 120 · unterwegs")];
  const items: Item[] = [
    { k: "box", x: 30, y: 14, w: 380, h: 252, tone: "mute", fill: false },
    fn ? { k: "box", x: 45, y: 26, w: 350, h: 36, label: tt("My orders", "Meine Bestellungen"), tone: "mute", size: 13 } : { k: "box", x: 45, y: 26, w: 350, h: 36, label: tt("Spring sale: 20% off", "Frühlingsaktion: 20 % Rabatt"), tone: "gold", size: 14 },
    ...[0, 1, 2].map((i): Item => ({ k: "box", x: 58, y: 82 + i * 46, w: 337, h: 36, label: rowLabel[i], tone: fn && i === 1 ? "rust" : "mute", size: 12 })),
    ...stripes,
    ...(fn ? [{ k: "box", x: 300, y: 134, w: 88, h: 20, label: tt("Reorder", "Nachbestellen"), tone: "acc", size: 11 } as Item] : []),
  ];
  const dots: Item[] = fn
    ? [
        { k: "dot", x: 55, y: 146, n: "1", at: 0, tone: "rust" },
        { k: "dot", x: 340, y: 144, n: "2", at: 1 },
      ]
    : [
        { k: "dot", x: 220, y: 44, n: "1", at: 0, tone: "gold" },
        { k: "dot", x: 50, y: 100, n: "2", at: 1 },
        { k: "dot", x: 50, y: 192, n: "3", at: 1 },
        { k: "dot", x: 50, y: 146, n: "4", at: 2, tone: "rust" },
      ];
  const rightTitle: Item = { k: "text", x: 436, y: 70, t: fn ? tt("One colour, one meaning", "Eine Farbe, eine Bedeutung") : tt("Colour as decoration", "Farbe als Dekoration"), bold: true, size: 13 };
  return {
    title: fn ? tt("Where the eye goes when colour has a job", "Wohin das Auge geht, wenn Farbe eine Aufgabe hat") : tt("Where the eye goes when colour only decorates", "Wohin das Auge geht, wenn Farbe nur dekoriert"),
    intro: tt("The model looks for the late order the way the eye does: colour first, words second.", "Das Modell sucht die verspätete Bestellung, wie das Auge es tut: erst Farbe, dann Worte."),
    steps: fn
      ? [
          { say: tt("Only the late order is red, so it stands out before any word is read.", "Nur die verspätete Bestellung ist rot, sie fällt auf, bevor ein Wort gelesen wird."), meter: { label: tt("Stops", "Stationen"), value: "1" } },
          { say: tt("The only blue shape is the action: the next look goes to Reorder.", "Die einzige blaue Form ist die Aktion: Der nächste Blick geht zu Nachbestellen."), meter: { label: tt("Stops", "Stationen"), value: "2" } },
        ]
      : [
          { say: tt("The biggest, brightest patch gets the first look: the sale banner, not the task.", "Der größte, hellste Fleck bekommt den ersten Blick: das Banner, nicht die Aufgabe."), meter: { label: tt("Stops", "Stationen"), value: "1" } },
          { say: tt("Three stripes in three colours: all equally strong, so nothing stands out and the eye visits them one by one.", "Drei Streifen in drei Farben: alle gleich stark, nichts sticht heraus, und das Auge besucht sie nacheinander."), meter: { label: tt("Stops", "Stationen"), value: "3" } },
          { say: tt("The late order is found last: it looks like the others.", "Die verspätete Bestellung wird zuletzt gefunden: Sie sieht aus wie die anderen."), meter: { label: tt("Stops", "Stationen"), value: "4" } },
        ],
    items: [...items, ...dots, rightTitle],
    summary: tt(
      "In search experiments a single item that differs in colour pops out at once, whatever the number of items; when many items are coloured, nothing pops out (Treisman and Gelade 1980). So a colour only works as a signal when it is rare and keeps one meaning. This path is scripted, not recorded.",
      "In Suchexperimenten springt ein einzelnes Element mit abweichender Farbe sofort ins Auge, unabhängig von der Zahl der Elemente; sind viele Elemente farbig, springt keines hervor (Treisman und Gelade 1980). Farbe wirkt also nur als Signal, wenn sie selten ist und eine Bedeutung behält. Dieser Pfad ist geskriptet, nicht aufgezeichnet.",
    ),
  };
}

/* ------------------------------------------------------------------ Day 4 · A2 · Hick's law */

const T = (n: number) => 0.2 + 0.15 * Math.log2(n + 1);

export function day4Run(version: string): Script {
  const ns = [2, 3, 4, 6, 8, 12];
  const mine = version === "three" ? 3 : 12;
  const items: Item[] = [
    { k: "text", x: 40, y: 34, t: "T = a + b · log₂(n + 1)", bold: true, size: 15 },
    { k: "text", x: 40, y: 54, t: tt("a = 0.2 s, b = 0.15 s per bit: illustrative values", "a = 0,2 s, b = 0,15 s pro Bit: Beispielwerte"), size: 11, tone: "mute" },
    { k: "arrow", x1: 60, y1: 244, x2: 620, y2: 244, tone: "mute" },
    ...ns.flatMap((n, i): Item[] => {
      const h = T(n) * 220;
      const x = 80 + i * 90;
      const tone = n === mine ? "acc" : "mute";
      return [
        { k: "box", x, y: 244 - h, w: 54, h, tone, at: i },
        { k: "text", x: x + 27, y: 262, t: `n = ${n}`, anchor: "middle", size: 12, at: i },
        { k: "text", x: x + 27, y: 238 - h, t: `${T(n).toFixed(2)} s`, anchor: "middle", size: 12, bold: true, at: i },
      ];
    }),
  ];
  return {
    title: tt("How the time to choose grows with the number of options", "Wie die Zeit zum Wählen mit der Zahl der Optionen wächst"),
    intro: tt("The model adds options one at a time and reads off the time to choose among them.", "Das Modell fügt Optionen nacheinander hinzu und liest die Zeit zum Wählen ab."),
    steps: ns.map((n, i) => ({
      say:
        i === 0
          ? tt("Two options: the baseline.", "Zwei Optionen: die Ausgangslage.")
          : n === 12
          ? tt(`Twelve options. Six times as many as two, but the time is not six times longer: it grows with the logarithm.${mine === 12 ? " This is the version in the lab." : ""}`, `Zwölf Optionen. Sechsmal so viele wie zwei, aber die Zeit ist nicht sechsmal länger: Sie wächst mit dem Logarithmus.${mine === 12 ? " Das ist die Version im Lab." : ""}`)
          : n === 3
          ? tt(`Three options.${mine === 3 ? " This is the version in the lab." : ""} Each option adds a little, and the first ones add the most.`, `Drei Optionen.${mine === 3 ? " Das ist die Version im Lab." : ""} Jede Option kostet etwas, und die ersten kosten am meisten.`)
          : tt(`${n} options: the curve flattens, but the time keeps rising.`, `${n} Optionen: Die Kurve flacht ab, aber die Zeit steigt weiter.`),
      meter: { label: tt("Time to choose", "Zeit zum Wählen"), value: `${T(n).toFixed(2)} s` },
    })),
    items,
    summary: tt(
      "Hick (1952) and Hyman (1953): the time to choose among equally likely options grows with the logarithm of their number, so every extra option costs time, with less and less per option. The constants here are for the picture only; on a real pass page reading and comparing add much more.",
      "Hick (1952) und Hyman (1953): Die Zeit zum Wählen zwischen gleich wahrscheinlichen Optionen wächst mit dem Logarithmus ihrer Zahl; jede zusätzliche Option kostet Zeit, immer weniger pro Option. Die Konstanten hier dienen nur dem Bild; auf einer echten Tarifseite kommen Lesen und Vergleichen dazu.",
    ),
  };
}

/* ------------------------------------------------------------------ Day 5 · A1 · Fitts's law */

const FT = (id: number) => 0.1 + 0.15 * id;

export function day5Run(): Script {
  const id1 = Math.log2(180 / 30 + 1);
  const id2 = Math.log2(60 / 110 + 1);
  const items: Item[] = [
    { k: "box", x: 40, y: 12, w: 170, h: 256, tone: "mute", fill: false },
    { k: "box", x: 52, y: 28, w: 40, h: 22, label: tt("Pay", "Zahlen"), tone: "rust", size: 11, at: 1, out: 3 },
    { k: "box", x: 70, y: 198, w: 130, h: 46, label: tt("Pay", "Zahlen"), tone: "sig", size: 14, at: 2 },
    { k: "dot", x: 180, y: 250, n: "", r: 9, tone: "ink" },
    { k: "text", x: 126, y: 262, t: tt("thumb", "Daumen"), size: 10, tone: "mute", anchor: "middle" },
    { k: "arrow", x1: 176, y1: 244, x2: 80, y2: 56, tone: "rust", at: 1, out: 3, dash: true },
    { k: "arrow", x1: 176, y1: 244, x2: 150, y2: 226, tone: "sig", at: 2 },
    { k: "text", x: 240, y: 46, t: tt("Small and far: W = 30 px, D = 180 px", "Klein und weit: W = 30 px, D = 180 px"), size: 12, at: 1, hi: [1], tone: "rust", bold: true },
    { k: "text", x: 240, y: 66, t: `ID = log₂(D/W + 1) = ${id1.toFixed(2)} bit`, size: 12, at: 1, hi: [1] },
    { k: "text", x: 240, y: 96, t: tt("Large and near: W = 110 px, D = 60 px", "Groß und nah: W = 110 px, D = 60 px"), size: 12, at: 2, hi: [2], tone: "sig", bold: true },
    { k: "text", x: 240, y: 116, t: `ID = log₂(D/W + 1) = ${id2.toFixed(2)} bit`, size: 12, at: 2, hi: [2] },
    { k: "text", x: 240, y: 156, t: tt("Movement time MT = a + b · ID", "Bewegungszeit MT = a + b · ID"), size: 13, bold: true, at: 3 },
    { k: "box", x: 240, y: 170, w: FT(id1) * 600, h: 24, tone: "rust", at: 3, label: `${FT(id1).toFixed(2)} s`, size: 12 },
    { k: "box", x: 240, y: 204, w: FT(id2) * 600, h: 24, tone: "sig", at: 3, label: `${FT(id2).toFixed(2)} s`, size: 12 },
    { k: "text", x: 240, y: 252, t: tt("a = 0.1 s, b = 0.15 s per bit: illustrative values", "a = 0,1 s, b = 0,15 s pro Bit: Beispielwerte"), size: 11, tone: "mute", at: 3 },
  ];
  return {
    title: tt("Reaching a Pay button with the thumb", "Mit dem Daumen eine Zahlen-Schaltfläche erreichen"),
    intro: tt("The model moves a thumb from the bottom right to a Pay button, once to a small far button and once to a large near one.", "Das Modell bewegt einen Daumen von unten rechts zu einer Zahlen-Schaltfläche, einmal zu einer kleinen weiten und einmal zu einer großen nahen."),
    steps: [
      { say: tt("The thumb rests at the bottom right, where it holds the phone.", "Der Daumen ruht unten rechts, wo er das Telefon hält.") },
      { say: tt("A small button far away: the thumb must travel far and stop on a small target. High difficulty.", "Eine kleine Schaltfläche weit weg: Der Daumen muss weit reisen und auf einem kleinen Ziel anhalten. Hohe Schwierigkeit."), meter: { label: tt("Difficulty", "Schwierigkeit"), value: `${id1.toFixed(1)} bit` } },
      { say: tt("A large button close to the thumb: a short move and an easy target. Low difficulty.", "Eine große Schaltfläche nah am Daumen: eine kurze Bewegung und ein leichtes Ziel. Geringe Schwierigkeit."), meter: { label: tt("Difficulty", "Schwierigkeit"), value: `${id2.toFixed(1)} bit` } },
      { say: tt("The model turns difficulty into time. Same task, but the second button is reached in about a third of the time.", "Das Modell macht aus Schwierigkeit Zeit. Dieselbe Aufgabe, aber die zweite Schaltfläche ist in etwa einem Drittel der Zeit erreicht."), meter: { label: tt("Time saved", "Zeit gespart"), value: `${(FT(id1) - FT(id2)).toFixed(2)} s` } },
    ],
    items,
    summary: tt(
      "Fitts (1954): the time to reach a target grows with the distance and shrinks with the target's width. The form used here, ID = log₂(D/W + 1), is the Shannon formulation that MacKenzie and Buxton (1992) preferred because it never goes negative. The constants are for the picture only.",
      "Fitts (1954): Die Zeit, ein Ziel zu erreichen, wächst mit der Entfernung und sinkt mit der Breite des Ziels. Die hier verwendete Form, ID = log₂(D/W + 1), ist die Shannon-Formulierung, die MacKenzie und Buxton (1992) bevorzugten, weil sie nie negativ wird. Die Konstanten dienen nur dem Bild.",
    ),
  };
}
