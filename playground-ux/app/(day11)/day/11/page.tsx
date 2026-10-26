// STOP 0 — Welcome & how to use this.

import Link from "next/link";
import { STOPS } from "@/lib/day11/navigation";

export default function WelcomePage() {
  return (
    <div className="max-w-3xl">
      <p className="aion-label">Stop 0</p>
      <h1 className="mt-1 text-2xl font-semibold leading-tight text-navy sm:text-3xl">
        Welcome — and how to use this
      </h1>

      <div className="mt-6 space-y-4 text-base leading-relaxed text-navy/80">
        <p>
          CityHelp Voice is a made-up voice assistant for a German city. It books
          Bürgeramt appointments, checks the status of an application, and takes
          reports about broken streetlights. It does not exist. Nothing you type here
          reaches a city office, and nothing you say is stored anywhere but your own
          browser.
        </p>
        <p>
          This is a sandbox, not a test. Nothing here is graded, there is no score to
          protect, and you cannot get anything wrong. Poke at it. Say strange things to
          it. The parts that annoy you are the parts you are meant to notice.
        </p>
        <p>
          The point is to <strong>feel</strong> the difference before anyone explains
          it. You will meet moments where CityHelp is genuinely useful, and moments
          where it wastes your time in ways you will recognise from real hotlines. Both
          are on purpose.
        </p>
        <p>
          Afterwards you get words for what you felt: six lenses, three build options,
          and a way to decide where voice belongs at all. Work through the stops in
          order — each one takes a few minutes.
        </p>
      </div>

      <div className="aion-card-soft mt-8">
        <p className="aion-label">The one question behind the whole day</p>
        <p className="mt-2 text-lg font-semibold leading-snug text-navy sm:text-xl">
          When does a voice or AI interface actually help a user — and when does it just
          get in the way?
        </p>
      </div>

      <div className="mt-8">
        <Link href="/day/11/meet-cityhelp/" className="aion-btn">
          Start
        </Link>
      </div>

      <section className="mt-12 border-t border-navy/10 pt-6">
        <h2 className="text-sm font-semibold text-navy">What's ahead</h2>
        <ol className="mt-3 space-y-2">
          {STOPS.filter((s) => s.id > 0).map((stop) => (
            <li key={stop.href} className="flex gap-3 text-sm">
              <span className="w-4 shrink-0 font-semibold text-purple">{stop.id}</span>
              <span>
                <Link
                  href={stop.href}
                  className="font-medium text-navy underline-offset-2 hover:text-purple hover:underline"
                >
                  {stop.label}
                </Link>
                <span className="text-navy/60"> — {stop.blurb}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-xs text-navy/55">
          Your progress and notes are saved in this browser only. You can wipe them any
          time with “Reset my progress” in the sidebar.
        </p>
      </section>
    </div>
  );
}
