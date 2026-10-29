"use client";

import type { ReactNode } from "react";
import { Box, FaintPrint } from "@/components/day15/gaze";
import type { Aoi, Fix } from "@/components/day15/gaze";
import { tt } from "@/lib/lang";

/**
 * Day 15 · the drawn screens of the study cards (CLAUDE.md #52): Tessel, a made-up bank with an app and a website, so no task is answered here. The transfer page is
 * drawn on the 13:10 gaze stage (components/day15/gaze.tsx) with a recording of Mara made up for the lesson; the phones show three consent screens and the
 * measures as thumbnails. Labels of a made-up product; no amounts or currencies.
 */
const BRAND = "#0F5E4C";
const INK = "#1D2733";

/** Tessel's "Send money" page on the gaze stage. */
export function TesselPage({ dim }: { dim?: boolean }) {
  return (
    <div className="absolute inset-0 text-[11px] leading-snug" style={{ color: INK, opacity: dim ? 0.55 : 1 }}>
      <Box x={0} y={0} w={100} h={9} bg={BRAND} className="flex items-center justify-between px-3 text-white"><span className="font-bold">Tessel</span><span className="text-[10px] opacity-90">{tt("Accounts · Cards · Help · Log out")}</span></Box>
      <Box x={4} y={12} w={60} h={8} className="text-[16px] font-bold">{tt("Send money")}</Box>
      <Box x={4} y={23} w={56} h={10} className="rounded border border-[#C9D3DD] px-2 py-1"><span className="text-[10px] text-[#55606E]">{tt("Recipient")}</span><br />{tt("Ana Ruiz")}</Box>
      <Box x={4} y={36} w={56} h={10} className="rounded border border-[#C9D3DD] px-2 py-1"><span className="text-[10px] text-[#55606E]">{tt("Account number")}</span><br />•••• 4417</Box>
      <Box x={4} y={49} w={56} h={10} className="rounded border border-[#C9D3DD] px-2 py-1"><span className="text-[10px] text-[#55606E]">{tt("Amount")}</span><br />250.00</Box>
      <Box x={4} y={62} w={56} h={9} className="text-[10px] text-[#55606E]">{tt("Instant transfers carry a fee unless your account plan includes them; see plan conditions, section 4.2.")}</Box>
      <Box x={4} y={76} w={24} h={9} bg={BRAND} className="flex items-center justify-center rounded font-semibold text-white">{tt("Continue")}</Box>
      <Box x={66} y={23} w={30} h={36} bg="#B45309" className="rounded-lg p-2 text-white"><b>{tt("New: the Gold card")}</b><br />{tt("Earn points on every purchase.")}<br /><span className="mt-1 inline-block rounded bg-white px-1.5 text-[#B45309]">{tt("Apply now")}</span></Box>
      <Box x={66} y={64} w={30} h={8} className="text-[10px] underline">{tt("Help with transfers")}</Box>
    </div>
  );
}

/** Mara's recording on the transfer page (Case assumption). Fixation 8 is the long look at the fee line. */
export const TESSEL_FIXES: Fix[] = [
  { x: 14, y: 16, ms: 220 },
  { x: 15, y: 28, ms: 260 },
  { x: 76, y: 32, ms: 340 },
  { x: 80, y: 44, ms: 300 },
  { x: 14, y: 41, ms: 240 },
  { x: 14, y: 54, ms: 380 },
  { x: 20, y: 64, ms: 420 },
  { x: 38, y: 66, ms: 1450 },
  { x: 50, y: 65, ms: 520 },
  { x: 82, y: 40, ms: 260 },
  { x: 16, y: 80, ms: 300 },
];
export const TESSEL_AOIS = (): Aoi[] => [
  { id: "title", name: tt("Title"), x: 4, y: 12, w: 60, h: 8 },
  { id: "form", name: tt("Form fields"), x: 4, y: 23, w: 56, h: 36 },
  { id: "fee", name: tt("Fee line"), x: 4, y: 61, w: 56, h: 11 },
  { id: "continue", name: tt("Continue"), x: 4, y: 75, w: 24, h: 11 },
  { id: "ad", name: tt("Gold card advert"), x: 66, y: 23, w: 30, h: 36 },
  { id: "help", name: tt("Help link"), x: 66, y: 63, w: 30, h: 10 },
];

export function Phone({ children, label, title = "Tessel" }: { children: ReactNode; label: string; title?: string }) {
  return (
    <div role="img" aria-label={label} className="mx-auto w-full max-w-[280px] select-none">
      <div className="overflow-hidden rounded-[28px] border-[6px] border-[#1F2730] bg-white shadow-md">
        <div className="flex items-center justify-between px-4 pt-1.5 text-[10px] font-semibold text-white" style={{ background: BRAND }}>
          <span>10:24</span>
          <span aria-hidden>▂▄▆ ◔</span>
        </div>
        <div className="px-4 pb-2.5 pt-1 text-[13px] font-bold text-white" style={{ background: BRAND }}>{title}</div>
        <div className="min-h-[260px] space-y-2 p-3 text-[12px] leading-snug" style={{ color: INK }}>{children}</div>
      </div>
    </div>
  );
}

/** Three consent screens for the same study: hidden, clear, clear with limits. */
export function ConsentMock({ kind }: { kind: "hidden" | "clear" | "limits" }) {
  if (kind === "hidden")
    return (
      <Phone label={tt("A Tessel app update screen with a large Continue button and a pre-ticked box in small grey print")} title={tt("What's new")}>
        <p className="text-[15px] font-bold">{tt("A smarter Tessel ✨")}</p>
        <p>{tt("Faster transfers, a fresh look and more.")}</p>
        <div className="rounded bg-[#0F5E4C] py-2 text-center font-semibold text-white">{tt("Continue")}</div>
        <FaintPrint label={tt("Small grey print, pre-ticked: I agree that interaction and camera-based attention data may be used to improve services and for personalised offers.")} lines={[tt("☑ I agree that interaction and camera-based attention data"), tt("may be used to improve services and for personalised offers.")]} />
      </Phone>
    );
  if (kind === "clear")
    return (
      <Phone label={tt("A Tessel study invitation that says what is recorded, who sees it, and offers Yes and No as equal buttons")} title={tt("Help us test")}>
        <p className="font-bold">{tt("Would you take part in a 20-minute test?")}</p>
        <ul className="list-disc space-y-0.5 pl-4 text-[11px]">
          <li>{tt("We record where you look on two screens, with an eye-tracker in our lab.")}</li>
          <li>{tt("Only the research team sees the recording.")}</li>
          <li>{tt("It is deleted after 3 months.")}</li>
        </ul>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="rounded border border-[#0F5E4C] py-1.5 text-center font-semibold text-[#0F5E4C]">{tt("No, thanks")}</div>
          <div className="rounded bg-[#0F5E4C] py-1.5 text-center font-semibold text-white">{tt("Yes, I'll join")}</div>
        </div>
      </Phone>
    );
  return (
    <Phone label={tt("The same invitation, adding what Tessel will not infer, that saying no changes nothing, and how to withdraw")} title={tt("Help us test")}>
      <p className="font-bold">{tt("Would you take part in a 20-minute test?")}</p>
      <ul className="list-disc space-y-0.5 pl-4 text-[11px]">
        <li>{tt("We record where you look on two screens, in our lab. Only the research team sees it; deleted after 3 months.")}</li>
        <li><b>{tt("We will not")}</b> {tt("use it to judge your mood, health or creditworthiness, or for offers.")}</li>
        <li>{tt("Saying no changes nothing about your account. You can stop at any time.")}</li>
      </ul>
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="rounded border border-[#0F5E4C] py-1.5 text-center font-semibold text-[#0F5E4C]">{tt("No, thanks")}</div>
        <div className="rounded bg-[#0F5E4C] py-1.5 text-center font-semibold text-white">{tt("Yes, I'll join")}</div>
      </div>
    </Phone>
  );
}

/** Thumbnails of the three measures in card A5. */
export function MeasureThumb({ kind }: { kind: "lab" | "webcam" | "eeg" }) {
  const body =
    kind === "lab" ? (
      <>
        <div className="text-[18px]">👁️‍🗨️</div>
        <p>{tt("Lab test · 10 volunteers · transfer page")}</p>
      </>
    ) : kind === "webcam" ? (
      <>
        <div className="text-[18px]">📷</div>
        <p>{tt("Webcam gaze for all app users · advert attention")}</p>
      </>
    ) : (
      <>
        <div className="text-[18px]">🧠</div>
        <p>{tt("EEG stress study · university partner")}</p>
      </>
    );
  return (
    <div aria-hidden className="flex h-[92px] flex-col items-center justify-center gap-1 rounded-lg border border-line bg-white p-2 text-center text-[11px] text-ink">
      {body}
    </div>
  );
}
