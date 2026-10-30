"use client";

import clsx from "clsx";
import { useState } from "react";
import { AppScreen, TaskLab } from "@/components/sim/TaskLab";
import type { LabCtx } from "@/components/sim/TaskLab";
import { tt } from "@/lib/lang";

/**
 * Day 2 · the working products of the study cards (UX-STANDARD 2.16): Brightwater, a made-up leisure centre with a pool, a gym and courses, so no task is answered
 * here. Each lab gives one task and two to four versions of the same site to use, with time, wrong taps and stress tests (components/sim/TaskLab.tsx).
 */
const ACC = "#0E7490";
const Brand = "Brightwater";
const Done = ({ text }: { text: string }) => (
  <AppScreen brand={Brand} color={ACC}><p className="text-[15px] font-bold">{tt("✓ Done")}</p><p>{text}</p></AppScreen>
);
const Item = ({ onClick, children, className }: { onClick: () => void; children: React.ReactNode; className?: string }) => (
  <button type="button" onClick={onClick} className={clsx("block w-full rounded border px-2 py-1.5 text-left", className ?? "border-[#CBD5E1] bg-white")}>{children}</button>
);

/* ------------------------------------------------------------------ A1 · from the provider's side or the user's side */

function Home({ ctx, side }: { ctx: LabCtx; side: "provider" | "user" }) {
  const [path, setPath] = useState<string[]>([]);
  if (ctx.finished) return <Done text={tt("Swim booked: Saturday 09:00, lane swimming")} />;
  const slots = (
    <div className="space-y-1">
      <p className="font-semibold">{tt("Lane swimming · choose a time")}</p>
      {[tt("Saturday 07:00"), tt("Saturday 09:00"), tt("Saturday 18:00")].map((t) => <Item key={t} onClick={() => (t.includes("09:00") ? ctx.done(tt("Booked Saturday 09:00")) : ctx.miss(tt(`Picked ${t}`)))}>{t}</Item>)}
    </div>
  );
  if (side === "user")
    return (
      <AppScreen brand={Brand} color={ACC}>
        {path.length === 0 ? (
          <>
            <p className="text-[15px] font-bold">{tt("What would you like to do?")}</p>
            <Item onClick={() => { setPath(["swim"]); ctx.hit(tt("Book a swim")); }} className="border-[#0E7490] bg-[#ECFEFF] font-semibold">{tt("🏊 Book a swim")}</Item>
            <Item onClick={() => ctx.miss(tt("Opening hours"))}>{tt("🕘 See opening hours")}</Item>
            <Item onClick={() => ctx.miss(tt("Join a course"))}>{tt("📅 Join a course")}</Item>
            <p className="pt-2 text-[11px] text-[#475569]">{tt("About us · Departments · Contact")}</p>
          </>
        ) : slots}
      </AppScreen>
    );
  const tree: Record<string, string[]> = {
    "": [tt("Management"), tt("Aquatics Department"), tt("Facility Management"), tt("Customer Office"), tt("Sports Science"), tt("Events & Partnerships")],
    [tt("Customer Office")]: [tt("Opening times"), tt("Online Services"), tt("Lost and found"), tt("Complaints")],
    [tt("Online Services")]: [tt("Membership portal"), tt("Bookings"), tt("Newsletter")],
    [tt("Bookings")]: [tt("Courses"), tt("Swim"), tt("Rooms")],
  };
  const right = [tt("Customer Office"), tt("Online Services"), tt("Bookings"), tt("Swim")];
  const level = path.length;
  const here = level === 0 ? "" : path[level - 1];
  return (
    <AppScreen brand={Brand} color={ACC}>
      {level === 0 && <p className="rounded bg-[#F1F5F9] p-2 text-[11.5px]">{tt("A word from the management: Brightwater is proud to present its new organisational structure, with six departments serving you.")}</p>}
      {level > 0 && <button type="button" onClick={() => setPath((p) => p.slice(0, -1))} className="text-[11px] underline">{tt("← Back")}</button>}
      {here === tt("Swim") ? slots : (
        <div className="space-y-1">
          <p className="text-[11px] text-[#475569]">{level === 0 ? tt("Departments") : here}</p>
          {(tree[here] ?? []).map((x) => (
            <Item key={x} onClick={() => {
              if (x === right[level]) { setPath((p) => [...p, x]); ctx.hit(tt(`Opened ${x}`)); }
              else ctx.miss(tt(`Opened ${x}`));
            }}>{x}</Item>
          ))}
        </div>
      )}
    </AppScreen>
  );
}

export function SideLab() {
  return (
    <TaskLab
      label={tt("The same Brightwater start page, built from the provider's side and from the user's side · a working product · Case assumption, example company")}
      point={tt("Both sites hold the same content. The first is built from how the centre is organised; the second from what visitors come to do. Only the second can be used without knowing the organisation. Try to book in both.")}
      task={tt("You are Ana. Book lane swimming for Saturday at 09:00.")}
      versions={[
        { id: "provider", label: tt("From the provider's side"), render: (ctx) => <Home ctx={ctx} side="provider" />, insight: tt("In plain words: the menu shows six departments and the page opens with a word from the management. Ana has to guess which department does bookings. The swim is four levels down: Customer Office, Online Services, Bookings, Swim.") },
        { id: "user", label: tt("From the user's side"), render: (ctx) => <Home ctx={ctx} side="user" />, insight: tt("In plain words: the page asks what Ana wants to do and offers the three things most visitors come for, in her own words. The departments still exist; they are simply not the way in.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · a dense block or a page built for scanning */

function Course({ ctx, kind }: { ctx: LabCtx; kind: "dense" | "scan" }) {
  const [confirm, setConfirm] = useState(false);
  if (ctx.finished) return <Done text={tt("Booked: swimming for beginners, from Tuesday 6 May, 18:00")} />;
  const book = () => { setConfirm(true); ctx.hit(tt("Found the booking")); };
  return (
    <AppScreen brand={Brand} color={ACC}>
      {kind === "dense" ? (
        <p className="text-[11.5px] leading-relaxed" onClick={(e) => { if ((e.target as HTMLElement).tagName !== "BUTTON") ctx.miss(tt("Searched in the text")); }}>
          {tt("Swimming for beginners is one of our most popular offers and is aimed at adults who would like to learn to swim in a relaxed atmosphere. Our qualified instructors work in small groups and take the time each participant needs. The course runs for eight weeks on Tuesdays at 18:00 from 6 May, and places can be")}{" "}
          <button type="button" onClick={book} className="text-[#0E7490] underline">{tt("booked online")}</button>{" "}
          {tt("or at the Customer Office during opening times. Please bring swimwear and a towel; showers are available. Members receive a reduction. The course takes place in the teaching pool, which is heated. If you have health questions, please ask your doctor before the course.")}
        </p>
      ) : (
        <>
          <p className="text-[16px] font-bold">{tt("Swimming for beginners")}</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 text-[12.5px]">
            <dt className="text-[#475569]">{tt("Starts")}</dt><dd className="font-semibold">{tt("Tuesday 6 May")}</dd>
            <dt className="text-[#475569]">{tt("When")}</dt><dd className="font-semibold">{tt("Tuesdays, 18:00, 8 weeks")}</dd>
            <dt className="text-[#475569]">{tt("Where")}</dt><dd className="font-semibold">{tt("Teaching pool, heated")}</dd>
          </dl>
          <button type="button" onClick={book} className="w-full rounded-lg py-2.5 font-bold text-white" style={{ background: ACC }}>{tt("Book a place")}</button>
          <p className="text-[11px] text-[#475569]">{tt("For adults who would like to learn to swim in a relaxed atmosphere. Small groups, qualified instructors. Bring swimwear and a towel.")}</p>
        </>
      )}
      {confirm && (
        <div className="space-y-1 rounded bg-[#ECFEFF] p-2">
          <p>{tt("Book swimming for beginners, from 6 May?")}</p>
          <button type="button" onClick={() => ctx.done(tt("Booked the course"))} className="rounded px-3 py-1 font-semibold text-white" style={{ background: ACC }}>{tt("Confirm")}</button>
        </div>
      )}
    </AppScreen>
  );
}

export function ScanLab() {
  return (
    <TaskLab
      label={tt("One Brightwater course page as a dense block and as a page built for scanning · a working product · Case assumption, example company")}
      point={tt("People scan before they read. On a dense block the eye skims the top and the left edge and misses what is in the middle; with a heading, short labelled facts and a clear button, the scan lands on what matters.")}
      task={tt("You are Felix. Find out when the beginners' swimming course starts, and book a place.")}
      versions={[
        { id: "dense", label: tt("A dense block"), render: (ctx) => <Course ctx={ctx} kind="dense" />, insight: tt("In plain words: the eye goes across the first line, a little across the second, then down the left edge. The date and the booking link sit in the middle of the block, so a scan misses them and Felix may think the course cannot be booked online.") },
        { id: "scan", label: tt("Built for scanning"), render: (ctx) => <Course ctx={ctx} kind="scan" />, insight: tt("In plain words: the heading, three short facts with a label each, and one strong button. The scan lands on the title, the facts and the button in that order. The full description is still there, below.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · contrast, grouping and structure */

type Means = { contrast: boolean; grouping: boolean; structure: boolean };
function Offers({ ctx, m }: { ctx: LabCtx; m: Means }) {
  const [open, setOpen] = useState<string | null>(null);
  if (ctx.finished) return <Done text={tt("Booked: aqua fitness, Thursday 19:00")} />;
  const fac = [tt("Sauna"), tt("Pool"), tt("Gym")];
  const cou = [tt("Aqua fitness"), tt("Yoga"), tt("Swim school")];
  const random = ["#FDE68A", "#BFDBFE", "#FBCFE8", "#BBF7D0", "#DDD6FE", "#FED7AA"];
  const box = (x: string, i: number, group: "f" | "c") => (
    <div key={x} className={clsx("rounded border p-2", m.grouping ? (group === "f" ? "border-[#94A3B8] bg-[#F1F5F9]" : "border-[#0E7490] bg-[#ECFEFF]") : "border-transparent")} style={m.grouping ? undefined : { background: random[(i + (group === "c" ? 3 : 0)) % 6] }}>
      <button type="button" onClick={() => { setOpen(x); (x === tt("Aqua fitness") ? ctx.hit : ctx.miss)(tt(`Opened ${x}`)); }} className="font-semibold">{x}</button>
      {open === x && group === "c" && (
        <div className="mt-1">
          <p className="text-[11px]">{tt("Thursdays 19:00")}</p>
          <button type="button" onClick={() => (x === tt("Aqua fitness") ? ctx.done(tt("Booked aqua fitness")) : ctx.miss(tt(`Booked ${x}`)))} className={clsx("mt-1 rounded px-2 py-0.5 text-[11.5px]", m.contrast ? "bg-[#0E7490] font-bold text-white" : "border border-[#D4D4D4] text-[#737373]")}>{tt("Book")}</button>
        </div>
      )}
    </div>
  );
  const all = [...fac.map((x, i) => box(x, i, "f")), ...cou.map((x, i) => box(x, i, "c"))];
  const scattered = [all[4], all[0], all[5], all[2], all[3], all[1]];
  return (
    <AppScreen brand={Brand} color={ACC}>
      <p className="text-[14px] font-bold">{tt("Offers")}</p>
      {m.structure ? (
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1"><p className="text-[11px] font-semibold uppercase text-[#475569]">{tt("Facilities")}</p>{all.slice(0, 3)}</div>
          <div className="space-y-1"><p className="text-[11px] font-semibold uppercase text-[#475569]">{tt("Courses")}</p>{all.slice(3)}</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1.5">{scattered.map((b, i) => <div key={i} className={i % 2 ? "mt-4" : ""}>{b}</div>)}</div>
      )}
    </AppScreen>
  );
}

export function GuideLab() {
  const v = (id: string, label: string, m: Means, insight: string) => ({ id, label, render: (ctx: LabCtx) => <Offers ctx={ctx} m={m} />, insight });
  return (
    <TaskLab
      label={tt("A Brightwater offers page with and without contrast, grouping and structure · a working product · Case assumption, example company")}
      point={tt("Contrast makes one thing stand out, grouping shows what belongs together, and structure gives an order the eye can follow. Together they are visual guidance; without them every box competes with every other.")}
      task={tt("You are Ana. Book the aqua fitness course.")}
      versions={[
        v("none", tt("No guidance"), { contrast: false, grouping: false, structure: false }, tt("In plain words: six boxes in six colours, scattered, and a pale Book button. Ana reads every box and still has to look for where to act.")),
        v("contrast", tt("Contrast only"), { contrast: true, grouping: false, structure: false }, tt("In plain words: once she finds the course, the Book button is the strongest thing on the page. Finding the course is still a search.")),
        v("group", tt("Grouping and structure"), { contrast: false, grouping: true, structure: true }, tt("In plain words: facilities and courses each share one frame and one column, so she reads two groups instead of six things; the Book button is still pale.")),
        v("all", tt("All three"), { contrast: true, grouping: true, structure: true }, tt("In plain words: two labelled columns give her eye a path, the course is in its group, and the Book button stands out. Guidance does the searching for her.")),
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · crowded, balanced, sparse */

function Start({ ctx, kind }: { ctx: LabCtx; kind: "crowded" | "balanced" | "sparse" }) {
  const [menu, setMenu] = useState(false);
  const [visit, setVisit] = useState(false);
  if (ctx.finished) return <Done text={tt("Pool today: 06:30 to 21:00")} />;
  const hours = <button type="button" onClick={() => ctx.done(tt("Found today's pool hours"))} className="underline">{tt("Pool today: 06:30 to 21:00")}</button>;
  if (kind === "crowded")
    return (
      <AppScreen brand={Brand} color={ACC}>
        <button type="button" onClick={() => ctx.miss(tt("Tapped the banner"))} className="w-full rounded bg-[#9333EA] py-2 font-bold text-white">{tt("SUMMER PARTY · DJ · FOAM POOL")}</button>
        <div className="grid grid-cols-3 gap-1">
          {[tt("News"), tt("Gym"), tt("Sauna"), tt("Kids"), tt("Shop"), tt("Jobs"), tt("Events"), tt("Spa"), tt("Café"), tt("Partners"), tt("Press"), tt("Gift cards")].map((x, i) => (
            <button key={x} type="button" onClick={() => ctx.miss(tt(`Opened ${x}`))} className="rounded py-2 text-[10.5px]" style={{ background: ["#FEF3C7", "#DBEAFE", "#FCE7F3", "#DCFCE7"][i % 4] }}>{x}</button>
          ))}
        </div>
        <p className="text-[10.5px] text-[#475569]">{tt("Welcome to Brightwater! Opening hours vary by facility and season; see the facility pages, the notice board and the hours box below for details. Our team is happy to help.")} <span className="text-[10.5px]">{hours}</span></p>
      </AppScreen>
    );
  if (kind === "balanced")
    return (
      <AppScreen brand={Brand} color={ACC}>
        <p className="text-[14px] font-bold">{tt("Today at Brightwater")}</p>
        <div className="rounded bg-[#ECFEFF] p-2 text-[12.5px] font-semibold">{hours}<br /><span className="font-normal text-[#475569]">{tt("Gym 06:00 to 22:00 · Sauna 12:00 to 21:00")}</span></div>
        {[tt("Book a swim"), tt("Join a course"), tt("Memberships")].map((x) => <Item key={x} onClick={() => ctx.miss(tt(`Opened ${x}`))}>{x}</Item>)}
        <p className="text-[11px] text-[#475569]">{tt("News: the sauna reopens on Monday.")}</p>
      </AppScreen>
    );
  return (
    <AppScreen brand={Brand} color={ACC}>
      <div className="flex h-44 items-end rounded-lg bg-gradient-to-br from-[#0E7490] to-[#164E63] p-3 text-[20px] font-light text-white">{tt("Feel the water.")}</div>
      <button type="button" onClick={() => { setMenu((m) => !m); ctx.hit(tt("Opened the menu")); }} className="rounded border border-[#0E7490] px-3 py-1 text-[#0E7490]">{tt("☰ Menu")}</button>
      {menu && (
        <div className="space-y-1">
          {[tt("Discover"), tt("Visit"), tt("Members")].map((x) => <Item key={x} onClick={() => (x === tt("Visit") ? (setVisit(true), ctx.hit(tt("Opened Visit"))) : ctx.miss(tt(`Opened ${x}`)))}>{x}</Item>)}
          {visit && <div className="pl-3">{[tt("Getting here"), tt("Opening hours"), tt("Prices")].map((x) => <Item key={x} onClick={() => (x === tt("Opening hours") ? ctx.done(tt("Found the hours after three taps")) : ctx.miss(tt(`Opened ${x}`)))}>{x}</Item>)}</div>}
        </div>
      )}
    </AppScreen>
  );
}

export function DensityLab() {
  return (
    <TaskLab
      label={tt("The Brightwater start page at three densities · a working product · Case assumption, example company")}
      point={tt("Too much at once and everything competes: orientation is lost and the load rises. Too little and people tap a lot to reach anything. A calm, ordered page also looks more trustworthy, before anyone has used it.")}
      task={tt("You are Felix. Find out until when the pool is open today.")}
      versions={[
        { id: "crowded", label: tt("Crowded"), render: (ctx) => <Start ctx={ctx} kind="crowded" />, insight: tt("In plain words: a banner, twelve boxes and a paragraph at once. Felix does not know where to look; today's hours hide at the end of the text. The centre seems a little chaotic, before he has read a word.") },
        { id: "balanced", label: tt("Balanced"), render: (ctx) => <Start ctx={ctx} kind="balanced" />, insight: tt("In plain words: today's hours, three tasks and one news item. Felix sees what matters today at once. The page looks calm and well run.") },
        { id: "sparse", label: tt("Sparse"), render: (ctx) => <Start ctx={ctx} kind="sparse" />, insight: tt("In plain words: one large photo and a Menu button. It looks elegant, but Felix has to open the menu and tap twice more to find the hours. Less is not always clearer.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · the contrast ratio of the main action */

const lum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a: string, b: string) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

function CourseCard({ ctx, fill, label }: { ctx: LabCtx; fill: string; label: string }) {
  if (ctx.finished) return <Done text={tt("Booked: aqua fitness, Tuesday 18:30")} />;
  const r = ratio(fill, label);
  return (
    <AppScreen brand={Brand} color={ACC}>
      <p className="text-[14px] font-bold">{tt("Aqua fitness · Tuesday 18:30")}</p>
      <p className="text-[12px] text-[#475569]">{tt("45 minutes · pool 2 · 8 places left")}</p>
      <div className="grid grid-cols-3 gap-2 pt-1">
        <button type="button" onClick={() => ctx.miss(tt("Tapped Details"))} className="rounded border border-[#CBD5E1] bg-white py-2 text-[12px] text-[#334155]">{tt("Details")}</button>
        <button type="button" onClick={() => ctx.miss(tt("Tapped Share"))} className="rounded border border-[#CBD5E1] bg-white py-2 text-[12px] text-[#334155]">{tt("Share")}</button>
        <button type="button" onClick={() => ctx.done(tt("Tapped Book"))} className="rounded py-2 text-[13px] font-bold" style={{ background: fill, color: label }}>
          {r < 4.5 ? (
            <svg width="40" height="18" viewBox="0 0 40 18" role="img" aria-label={tt("Book")} className="mx-auto block"><text x="20" y="14" textAnchor="middle" fontSize="13" fontWeight="700" fill={label}>{tt("Book")}</text></svg>
          ) : (
            tt("Book")
          )}
        </button>
      </div>
      <p className="rounded bg-[#F1F5F9] px-2 py-1 font-mono text-[11px] text-[#334155]">
        {tt(`Inspector · Book: ${label} on ${fill} = ${r.toFixed(1)} to 1 (WCAG 2.2 asks for at least 4.5 to 1 for the text and 3 to 1 for the button itself)`)}
      </p>
    </AppScreen>
  );
}

export function ContrastLab() {
  return (
    <TaskLab
      label={tt("The Brightwater Book button at three contrast ratios, with a ratio readout · a working product · Case assumption, example company")}
      point={tt("Contrast is a number you can measure: WCAG 2.2 asks for at least 4.5 to 1 between normal text and its background, and 3 to 1 for the parts of controls that people need to see. The Inspector line shows the ratio of the Book button; try the task, then switch on the bright-light and older-eyes tests.")}
      task={tt("You are Ana, on a train with the sun on your phone. Book the aqua fitness course.")}
      stresses={["sun", "eyes", "cvd"]}
      versions={[
        { id: "pale", label: tt("Pale button"), render: (ctx) => <CourseCard ctx={ctx} fill="#B7E4EF" label="#FFFFFF" />, insight: tt("In plain words: the label is almost as light as the button, about 1.4 to 1. In a quiet room Ana can still find it; in sunlight the button fades into the card, and she taps Share or Details first.") },
        { id: "brand", label: tt("Brand blue button"), render: (ctx) => <CourseCard ctx={ctx} fill="#0E7490" label="#FFFFFF" />, insight: tt("In plain words: white on the brand blue is about 5.4 to 1, above the 4.5 to 1 that WCAG asks for. The button is the strongest thing in its row, also in bright light.") },
        { id: "dark", label: tt("Dark button"), render: (ctx) => <CourseCard ctx={ctx} fill="#164E63" label="#FFFFFF" />, insight: tt("In plain words: white on dark teal is about 9.1 to 1. It is found fastest and survives the older-eyes test; the price is that the brand colour is darker than in the logo.") },
      ]}
    />
  );
}
