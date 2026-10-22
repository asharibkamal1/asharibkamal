"use client";

import { useActionState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { initialFormState } from "@/shared/lib/forms";
import { BotGuard } from "@/shared/ui/bot-guard";
import { cn } from "@/shared/ui/primitives";
import { subscribe } from "../actions";

export function SubscribeForm({
  source,
  buttonLabel = "Subscribe",
  onDark = false,
  className,
}: {
  /** Where the signup happened, e.g. "home", "blog-post" — useful for analytics. */
  source: string;
  buttonLabel?: string;
  /** Use light-on-gradient styling. */
  onDark?: boolean;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(subscribe, initialFormState);

  if (state.status === "success") {
    return (
      <p
        role="status"
        className={cn(
          "flex items-start gap-2 rounded-xl border px-4 py-3 text-sm font-medium",
          onDark ? "border-white/30 bg-white/15 text-white" : "border-emerald-500/40 bg-emerald-500/10",
          className,
        )}
      >
        <CheckCircle2 className="mt-0.5 size-4 shrink-0" /> {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className={cn("relative", className)} noValidate>
      <BotGuard />
      <input type="hidden" name="source" value={source} />
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${source}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={state.values?.email}
          placeholder="you@example.com"
          aria-invalid={state.fieldErrors?.email ? true : undefined}
          aria-describedby={`msg-${source}`}
          className={cn(
            "h-11 w-full flex-1 rounded-full border px-5 text-sm outline-none transition-colors",
            onDark
              ? "border-white/30 bg-white/15 text-white placeholder:text-white/70 focus:border-white"
              : "border-border bg-surface placeholder:text-muted focus:border-brand-2",
          )}
        />
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all disabled:opacity-70",
            onDark ? "bg-white text-slate-900 hover:bg-white/90" : "bg-gradient-brand text-white shadow-lg shadow-brand-2/25 hover:brightness-110",
          )}
        >
          {pending ? <Loader2 className="size-4 animate-spin" /> : null}
          {buttonLabel}
          {!pending && <ArrowRight className="size-4" />}
        </button>
      </div>
      <p
        id={`msg-${source}`}
        aria-live="polite"
        className={cn("mt-2 min-h-5 text-xs", state.status === "error" ? (onDark ? "text-white" : "text-red-500") : onDark ? "text-white/75" : "text-muted")}
      >
        {state.status === "error" ? state.message : "Free. No spam. Unsubscribe anytime."}
      </p>
    </form>
  );
}
