"use client";

import { useState } from "react";
import { Check, Link2, MessageCircle } from "lucide-react";
import { LinkedInIcon } from "@/shared/ui/brand-icons";

function XIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
  );
}

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "Share on X", href: `https://x.com/intent/post?url=${u}&text=${t}`, icon: <XIcon /> },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: <LinkedInIcon className="size-4" /> },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, icon: <MessageCircle className="size-4" /> },
  ];
  const btn =
    "inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-brand-2/50 hover:text-foreground";

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm text-muted">Share</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} className={btn}>
          {l.icon}
        </a>
      ))}
      <button
        type="button"
        aria-label={copied ? "Link copied" : "Copy link"}
        className={btn}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {}
        }}
      >
        {copied ? <Check className="size-4 text-emerald-500" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}
