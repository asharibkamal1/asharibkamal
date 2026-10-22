import Link from "next/link";
import { ArrowUpRight, Lock, ShoppingCart } from "lucide-react";
import { SubscribeForm } from "@/modules/newsletter";
import { Badge, Card, cn } from "@/shared/ui/primitives";
import type { Product } from "./data";

export function formatPrice(price: number) {
  return `$${price}`;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-brand-2/50 hover:shadow-xl hover:shadow-brand-2/10"
    >
      <div className={cn("relative flex h-44 flex-col justify-end bg-gradient-to-br p-6 text-white", product.accent)}>
        <div className="grid-pattern absolute inset-0 opacity-25" aria-hidden="true" />
        <span className="relative text-xs font-semibold uppercase tracking-wider text-white/80">{product.kind}</span>
        <span className="relative mt-1 text-2xl font-extrabold leading-tight">{product.title}</span>
        {product.status === "coming-soon" && (
          <span className="absolute right-4 top-4 rounded-full bg-black/25 px-2.5 py-0.5 text-xs font-medium backdrop-blur">
            Coming soon
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex-1 leading-relaxed text-muted">{product.tagline}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-2">
            {product.status === "available" ? "Get it" : "Join waitlist"}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Price + checkout button, or a waitlist form while the product is being made. */
export function BuyBox({ product }: { product: Product }) {
  const available = product.status === "available" && product.checkoutUrl;
  return (
    <Card className="p-6">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-4xl font-extrabold">{formatPrice(product.price)}</span>
        <Badge>{product.kind}</Badge>
      </div>
      {available ? (
        <>
          <a
            href={product.checkoutUrl}
            className="bg-gradient-brand mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-base font-semibold text-white shadow-lg shadow-brand-2/25 transition-all hover:brightness-110"
          >
            <ShoppingCart className="size-5" /> Buy now
          </a>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
            <Lock className="size-3.5" /> Secure checkout · Instant download
          </p>
        </>
      ) : (
        <>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            This product is in the works. Join the waitlist to get a launch discount and be first to know.
          </p>
          <SubscribeForm source={`waitlist:${product.slug}`} buttonLabel="Join waitlist" className="mt-4" />
        </>
      )}
    </Card>
  );
}
