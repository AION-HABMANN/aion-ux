"use client";

// Phone-style chat surface, reused by Stop 1, Stop 2, Stop 4 and Stop 5.
// It renders messages only — the caller owns the conversation logic.

export interface Bubble {
  role: "user" | "system";
  text: string;
  /** Rendered as a quiet aside rather than a speech bubble. */
  aside?: boolean;
}

export function ChatFrame({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="mx-auto w-full max-w-md rounded-card border border-navy/15 bg-white">
      <div className="flex items-center gap-2 border-b border-navy/10 px-4 py-3">
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-purple"
        />
        <span className="text-sm font-semibold text-navy">CityHelp Voice</span>
        <span className="ml-auto text-xs text-navy/50">{label}</span>
      </div>
      {children}
    </div>
  );
}

export function ChatLog({
  bubbles,
  typing = false,
  emptyHint,
}: {
  bubbles: Bubble[];
  typing?: boolean;
  emptyHint?: string;
}) {
  return (
    <div
      className="min-h-[16rem] space-y-3 overflow-y-auto bg-lilac/40 px-4 py-4 sm:max-h-[26rem]"
      role="log"
      aria-live="polite"
      aria-label="Conversation with CityHelp"
    >
      {bubbles.length === 0 && emptyHint && (
        <p className="py-8 text-center text-sm text-navy/50">{emptyHint}</p>
      )}

      {bubbles.map((b, i) => {
        if (b.aside) {
          return (
            <p
              key={i}
              className="animate-fade-in px-1 text-center text-xs italic text-navy/55"
            >
              {b.text}
            </p>
          );
        }
        const isUser = b.role === "user";
        return (
          <div
            key={i}
            className={`flex animate-fade-in ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={[
                "max-w-[85%] rounded-card border px-3 py-2 text-sm leading-relaxed",
                isUser
                  ? "border-purple bg-purple text-white"
                  : "border-navy/15 bg-white text-navy",
              ].join(" ")}
            >
              <span className="sr-only">{isUser ? "You said: " : "CityHelp said: "}</span>
              {b.text}
            </div>
          </div>
        );
      })}

      {typing && (
        <div className="flex justify-start">
          <div
            className="rounded-card border border-navy/15 bg-white px-3 py-2"
            aria-label="CityHelp is responding"
          >
            <span className="flex gap-1" aria-hidden="true">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-navy/40" />
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-navy/40 [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-navy/40 [animation-delay:0.4s]" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
