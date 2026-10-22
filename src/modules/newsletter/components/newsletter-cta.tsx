import { Gift, Mail } from "lucide-react";
import { cn } from "@/shared/ui/primitives";
import { newsletterConfig } from "../config";
import { SubscribeForm } from "./subscribe-form";

/** Gradient signup card used on the home page, blog and article pages. */
export function NewsletterCta({ source, className }: { source: string; className?: string }) {
  const { leadMagnet } = newsletterConfig;
  return (
    <section className={cn("bg-gradient-brand relative overflow-hidden rounded-3xl p-8 text-white sm:p-12", className)}>
      <div className="grid-pattern absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            <Mail className="size-3.5" /> {newsletterConfig.name}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance">Build skills. Ship products. Earn online.</h2>
          <p className="mt-3 text-white/85">{newsletterConfig.pitch}</p>
        </div>
        <div>
          <p className="mb-3 flex items-start gap-2 text-sm text-white/90">
            <Gift className="mt-0.5 size-4 shrink-0" />
            <span>
              Get the free <strong>{leadMagnet.title}</strong> when you join.
            </span>
          </p>
          <SubscribeForm source={source} buttonLabel="Join free" onDark />
        </div>
      </div>
    </section>
  );
}
