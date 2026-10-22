"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { initialFormState } from "@/shared/lib/forms";
import { BotGuard } from "@/shared/ui/bot-guard";
import { cn } from "@/shared/ui/primitives";
import { sendContactMessage } from "../actions";
import { budgets, projectTypes } from "../options";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-brand-2 aria-[invalid=true]:border-red-500";

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-red-500">
      {error}
    </p>
  );
}

export function ContactForm({ className }: { className?: string }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialFormState);
  const errors = state.fieldErrors ?? {};
  const values = state.values ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className={cn("rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center", className)}>
        <CheckCircle2 className="mx-auto size-10 text-emerald-500" />
        <p className="mt-4 text-lg font-semibold">Message sent</p>
        <p className="mt-1 text-muted">{state.message}</p>
      </div>
    );
  }

  const describedBy = (name: string) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form action={formAction} noValidate className={cn("relative space-y-5 rounded-2xl border border-border bg-surface p-6 sm:p-8", className)}>
      <BotGuard />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Your name
          </label>
          <input id="name" name="name" defaultValue={values.name} autoComplete="name" required className={inputClass} aria-invalid={!!errors.name} aria-describedby={describedBy("name")} />
          <FieldError id="name-error" error={errors.name} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input id="email" name="email" defaultValue={values.email} type="email" autoComplete="email" required className={inputClass} aria-invalid={!!errors.email} aria-describedby={describedBy("email")} />
          <FieldError id="email-error" error={errors.email} />
        </div>
        <div>
          <label htmlFor="projectType" className="mb-1.5 block text-sm font-medium">
            Project type
          </label>
          <select key={values.projectType} id="projectType" name="projectType" required defaultValue={values.projectType ?? ""} className={inputClass} aria-invalid={!!errors.projectType} aria-describedby={describedBy("projectType")}>
            <option value="" disabled>
              Choose one…
            </option>
            {projectTypes.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <FieldError id="projectType-error" error={errors.projectType} />
        </div>
        <div>
          <label htmlFor="budget" className="mb-1.5 block text-sm font-medium">
            Budget <span className="font-normal text-muted">(optional)</span>
          </label>
          <select key={values.budget} id="budget" name="budget" defaultValue={values.budget ?? ""} className={inputClass} aria-invalid={!!errors.budget}>
            <option value="">Prefer not to say</option>
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <FieldError id="budget-error" error={errors.budget} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          About your project
        </label>
        <textarea
          id="message"
          name="message"
          defaultValue={values.message}
          rows={6}
          required
          placeholder="What are you building, what's the timeline, and what does success look like?"
          className={cn(inputClass, "resize-y")}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
        />
        <FieldError id="message-error" error={errors.message} />
      </div>
      <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className={cn("text-sm", state.status === "error" ? "text-red-500" : "text-muted")}>
          {state.status === "error" ? state.message : "Your details are only used to reply to you."}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="bg-gradient-brand inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white shadow-lg shadow-brand-2/25 transition-all hover:brightness-110 disabled:opacity-70"
        >
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
