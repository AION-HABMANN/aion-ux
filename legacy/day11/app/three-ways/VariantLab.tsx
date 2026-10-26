"use client";

import { useState } from "react";
import { VariantAFlow, VariantBFlow, VariantCFlow } from "./VariantFlows";
import PropertyPanel from "@/components/PropertyPanel";
import { PERSONA_NOTES, PERSONA_VERDICT, VARIANTS, VARIANT_ORDER } from "@/lib/variants";
import type { UserPersona, VariantId } from "@/lib/types";

const PERSONAS: UserPersona[] = ["tech_savvy", "elderly_first_time"];

export default function VariantLab() {
  const [variant, setVariant] = useState<VariantId>("A");
  const [persona, setPersona] = useState<UserPersona>("tech_savvy");

  const profile = VARIANTS[variant];
  const verdict = PERSONA_VERDICT[persona];
  const isBest = verdict.best === variant;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="aion-label">The task, in three builds</p>
          <div className="mt-2 flex flex-wrap gap-2" role="tablist" aria-label="Build variants">
            {VARIANT_ORDER.map((id) => {
              const v = VARIANTS[id];
              const active = id === variant;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setVariant(id)}
                  className={`aion-chip text-xs ${active ? "aion-chip-active" : ""} ${
                    PERSONA_VERDICT[persona].best === id && !active
                      ? "border-purple/60"
                      : ""
                  }`}
                >
                  {v.name}
                  <span className="ml-1.5 hidden sm:inline opacity-80">
                    · {v.subtitle.split(" — ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="aion-label">Who is this user?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {PERSONAS.map((p) => {
              const active = p === persona;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPersona(p)}
                  aria-pressed={active}
                  className={`aion-chip text-xs ${active ? "aion-chip-active" : ""}`}
                >
                  {PERSONA_VERDICT[p].label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <p className="mb-3 text-sm font-medium text-navy">
            Task: book a Bürgeramt appointment.
          </p>
          {variant === "A" && <VariantAFlow key="A" />}
          {variant === "B" && <VariantBFlow key="B" />}
          {variant === "C" && <VariantCFlow key="C" />}
        </div>

        <div className="space-y-4">
          <PropertyPanel
            variant={profile}
            highlight={{ best: isBest, note: PERSONA_NOTES[persona][variant] }}
          />
          <div className="aion-card-soft">
            <p className="aion-label">For this user</p>
            <p className="mt-2 text-sm leading-relaxed text-navy/85">
              <span className="font-semibold text-navy">
                {verdict.label} → {VARIANTS[verdict.best].name}.
              </span>{" "}
              {verdict.note}
            </p>
            <p className="mt-2 text-xs text-navy/55">
              Same ratings, different winner. Flip the user and watch the answer move.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
