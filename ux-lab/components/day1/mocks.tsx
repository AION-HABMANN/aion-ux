"use client";

import { DARK, LINE, LITE, MID, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Day 1 · the drawn screens of the study cards (CLAUDE.md #52): Nordwind, a made-up travel-booking app, so no task is answered here. Each mock is the same
 * screen in different states; the figure around it (components/day1/diagrams.tsx) says what changes and what it does to the person. Own greys only.
 */

const W = 320;
const H = 210;
const ACC = "#2F5D8A";
const WARN = "#C0392B";

function Phone({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <Svg viewBox={`0 0 ${W} ${H}`} label={label} className="mx-auto h-auto w-full max-w-[420px]">
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="10" fill="#FFFFFF" stroke={LINE} strokeWidth="2" />
      <rect x="1" y="1" width={W - 2} height="24" rx="10" fill={LITE} />
      <Txt x={12} y={17} size={10} bold>
        Nordwind
      </Txt>
      {children}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A1 · the same booking page, designed to look good or to work */

export function BookingMock({ kind }: { kind: "looks" | "works" }) {
  return (
    <Phone label={kind === "looks" ? tt("A Nordwind booking page with a large photo, thin grey text and three equal buttons") : tt("The same booking page with one clear Book button and the dates in large type")}>
      {kind === "looks" ? (
        <g>
          <rect x="12" y="32" width="296" height="86" rx="6" fill={MID} />
          <Txt x={160} y={80} size={14} anchor="middle" bold fill="#FFFFFF">{tt("Discover Lisbon")}</Txt>
          <Txt x={14} y={134} size={7} fill="#9A9A9A">{tt("3 nights · 12 to 15 May · free cancellation until 1 May")}</Txt>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={14 + i * 100} y="150" width="92" height="26" rx="13" fill="#FFFFFF" stroke={MID} />
              <Txt x={60 + i * 100} y={167} size={9} anchor="middle" fill="#777777">{[tt("Details"), tt("Book"), tt("Share")][i]}</Txt>
            </g>
          ))}
        </g>
      ) : (
        <g>
          <rect x="12" y="32" width="296" height="54" rx="6" fill={LITE} />
          <Txt x={22} y={56} size={13} bold>{tt("Lisbon · 3 nights")}</Txt>
          <Txt x={22} y={74} size={10}>{tt("12 to 15 May · free cancellation until 1 May")}</Txt>
          <Txt x={22} y={110} size={12} bold>{tt("Two people · hotel and flight")}</Txt>
          <rect x="14" y="130" width="292" height="36" rx="6" fill={ACC} />
          <Txt x={160} y={153} size={13} anchor="middle" bold fill="#FFFFFF">{tt("Book now")}</Txt>
          <Txt x={160} y={186} size={9} anchor="middle" fill="#555555">{tt("Details · Share")}</Txt>
        </g>
      )}
    </Phone>
  );
}

/* ------------------------------------------------------------------ A2 · where the eye goes: the strongest signal, the goal, or both */

export function AttentionMock({ mode }: { mode: "bottom" | "top" | "both" }) {
  return (
    <Phone label={tt("A Nordwind trip page with a red flashing sale banner at the top and a small link “Change booking” near the bottom; rings show where the eye goes")}>
      <rect x="12" y="32" width="296" height="28" rx="4" fill={WARN} />
      <Txt x={160} y={51} size={11} anchor="middle" bold fill="#FFFFFF">{tt("FLASH SALE · 2 HOURS LEFT")}</Txt>
      <Txt x={14} y={80} size={11} bold>{tt("Your trip: Lisbon, 12 May")}</Txt>
      <rect x="14" y="88" width="230" height="5" rx="2" fill={MID} />
      <rect x="14" y="100" width="200" height="5" rx="2" fill={MID} />
      <rect x="14" y="112" width="215" height="5" rx="2" fill={MID} />
      <Txt x={14} y={150} size={9} fill={ACC}>{tt("Change booking")}</Txt>
      <Txt x={120} y={150} size={9} fill="#777777">{tt("Cancel · Help")}</Txt>
      {(mode === "bottom" || mode === "both") && <circle cx="160" cy="46" r="34" fill="none" stroke="#E67E22" strokeWidth="3" strokeDasharray={mode === "both" ? "5 4" : undefined} />}
      {(mode === "top" || mode === "both") && <ellipse cx="50" cy="147" rx="46" ry="16" fill="none" stroke="#16A085" strokeWidth="3" strokeDasharray={mode === "both" ? "5 4" : undefined} />}
      <Txt x={300} y={196} size={8} anchor="end" fill="#555555">
        {mode === "bottom" ? tt("ring: the strongest signal") : mode === "top" ? tt("ring: what Mia looks for") : tt("two rings: two pulls at once")}
      </Txt>
    </Phone>
  );
}

/* ------------------------------------------------------------------ A3 · the three aims switched on one at a time */

export function AimsMock({ where, one, menu }: { where: boolean; one: boolean; menu: boolean }) {
  return (
    <Phone label={tt("A Nordwind check-in screen whose step line, main button and menu position change with the switches")}>
      {menu ? (
        <g>
          <Txt x={300} y={17} size={10} anchor="end" bold>☰</Txt>
        </g>
      ) : (
        <Txt x={160} y={204} size={8} anchor="middle" fill="#555555">{tt("menu: hidden in the footer")}</Txt>
      )}
      {where ? <Txt x={14} y={42} size={9} fill="#555555">{tt("Check-in · Step 2 of 3 · Seats")}</Txt> : <Txt x={14} y={42} size={9} fill="#BBBBBB">{tt("Check-in")}</Txt>}
      <Txt x={14} y={62} size={12} bold>{tt("Choose your seats")}</Txt>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={14 + (i % 6) * 48} y="74" width="40" height="40" rx="4" fill={i === 2 ? ACC : LITE} />
      ))}
      {one ? (
        <g>
          <rect x="14" y="130" width="292" height="32" rx="6" fill={ACC} />
          <Txt x={160} y={151} size={12} anchor="middle" bold fill="#FFFFFF">{tt("Continue to boarding pass")}</Txt>
          <Txt x={160} y={180} size={9} anchor="middle" fill="#555555">{tt("Skip · Change flight")}</Txt>
        </g>
      ) : (
        [tt("Continue"), tt("Skip"), tt("Change flight"), tt("Extras")].map((l, i) => (
          <g key={l}>
            <rect x={14 + i * 74} y="134" width="66" height="28" rx="5" fill="#FFFFFF" stroke={DARK} />
            <Txt x={47 + i * 74} y={152} size={9} anchor="middle">{l}</Txt>
          </g>
        ))
      )}
    </Phone>
  );
}

/* ------------------------------------------------------------------ A4 · the same payment step in three tones */

export function PayMock({ tone }: { tone: "alarm" | "pressure" | "calm" }) {
  return (
    <Phone label={tt("The Nordwind payment step drawn as an alarm, as pressure, or calm")}>
      <Txt x={14} y={44} size={12} bold>{tt("Payment")}</Txt>
      {tone === "alarm" && (
        <g>
          <rect x="12" y="52" width="296" height="22" rx="4" fill={WARN} />
          <Txt x={20} y={67} size={9} bold fill="#FFFFFF">{tt("⚠ WARNING: check all data carefully!")}</Txt>
          <rect x="12" y="80" width="296" height="22" rx="4" fill="#F5B7B1" />
          <Txt x={20} y={95} size={9} fill="#7B241C">{tt("⚠ Errors may lead to cancellation")}</Txt>
        </g>
      )}
      {tone === "pressure" && (
        <g>
          <rect x="12" y="52" width="296" height="22" rx="4" fill="#F39C12" />
          <Txt x={20} y={67} size={9} bold fill="#FFFFFF">{tt("⏱ Your seat is held for 5 more minutes")}</Txt>
          <Txt x={14} y={95} size={9} bold fill={WARN}>{tt("Only 1 seat left! Others are looking right now.")}</Txt>
        </g>
      )}
      {tone === "calm" && (
        <g>
          <Txt x={14} y={66} size={9} fill="#555555">{tt("Step 3 of 3 · You can still change everything")}</Txt>
          <Txt x={14} y={86} size={9} fill="#1E8449">{tt("🔒 Secure payment · free cancellation until 1 May")}</Txt>
        </g>
      )}
      <rect x="14" y="112" width="292" height="24" rx="4" fill="#FFFFFF" stroke={LINE} />
      <Txt x={22} y={128} size={9} fill="#777777">{tt("Card number")}</Txt>
      <rect x="14" y="146" width="292" height="30" rx="6" fill={tone === "pressure" ? "#E67E22" : ACC} />
      <Txt x={160} y={166} size={11} anchor="middle" bold fill="#FFFFFF">{tone === "pressure" ? tt("PAY NOW!") : tt("Pay")}</Txt>
    </Phone>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the thumbnails of the three SkillFlow start pages */

export function VariantThumb({ kind }: { kind: "A" | "B" | "C" }) {
  const label = kind === "A" ? tt("Variant A: many moving, colourful elements packed together") : kind === "B" ? tt("Variant B: a plain page with a short list of links") : tt("Variant C: one large image and few navigation items");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "A" && (
        <g>
          <rect x="10" y="10" width="180" height="22" rx="4" fill="#8E44AD" />
          {[0, 1, 2, 3].map((i) => <rect key={i} x={10 + i * 46} y="38" width="40" height="12" rx="6" fill={["#F39C12", "#E74C3C", "#16A085", "#3498DB"][i]} />)}
          {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={10 + (i % 3) * 61} y={56 + Math.floor(i / 3) * 24} width="55" height="20" rx="3" fill={LITE} />)}
        </g>
      )}
      {kind === "B" && (
        <g>
          <rect x="10" y="12" width="110" height="8" rx="2" fill={DARK} />
          {[0, 1, 2, 3].map((i) => <rect key={i} x="10" y={30 + i * 16} width="150" height="10" rx="2" fill={LITE} />)}
          <rect x="10" y="96" width="120" height="5" rx="2" fill={MID} />
        </g>
      )}
      {kind === "C" && (
        <g>
          <rect x="10" y="10" width="180" height="62" rx="4" fill="#34495E" />
          <rect x="24" y="30" width="90" height="10" rx="2" fill="#FFFFFF" />
          {[0, 1, 2].map((i) => <rect key={i} x={10 + i * 61} y="80" width="55" height="22" rx="3" fill={MID} />)}
        </g>
      )}
    </Thumb>
  );
}

/* ------------------------------------------------------------------ A5 · the thumbnails of Nordwind's three measures */

export function MeasureThumb({ kind }: { kind: "button" | "steps" | "photos" }) {
  const label = kind === "button" ? tt("One large Book button on the trip page") : kind === "steps" ? tt("A step line, Step 2 of 3, at the top of the check-in") : tt("Large photos at the top of every page");
  return (
    <Thumb label={label}>
      <rect x="2" y="2" width="196" height="106" rx="6" fill="#FFFFFF" stroke={LINE} />
      {kind === "button" && (
        <g>
          {[0, 1, 2].map((i) => <rect key={i} x="12" y={14 + i * 12} width="150" height="6" rx="2" fill={LITE} />)}
          <rect x="12" y="64" width="176" height="28" rx="6" fill={ACC} />
        </g>
      )}
      {kind === "steps" && (
        <g>
          {[0, 1, 2].map((i) => <circle key={i} cx={40 + i * 60} cy="30" r="10" fill={i < 2 ? ACC : LITE} />)}
          <line x1="50" y1="30" x2="90" y2="30" stroke={ACC} strokeWidth="3" />
          <line x1="110" y1="30" x2="150" y2="30" stroke={LITE} strokeWidth="3" />
          {[0, 1, 2].map((i) => <rect key={i} x="12" y={56 + i * 12} width="176" height="6" rx="2" fill={LITE} />)}
        </g>
      )}
      {kind === "photos" && (
        <g>
          <rect x="10" y="10" width="180" height="58" rx="4" fill={MID} />
          {[0, 1].map((i) => <rect key={i} x="12" y={78 + i * 12} width="176" height="6" rx="2" fill={LITE} />)}
        </g>
      )}
    </Thumb>
  );
}
