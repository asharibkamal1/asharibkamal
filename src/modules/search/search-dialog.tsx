"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, FolderKanban, Link2, Package, Search } from "lucide-react";
import { cn } from "@/shared/ui/primitives";
import type { SearchItem } from "./types";

const typeMeta = {
  post: { label: "Article", icon: FileText },
  product: { label: "Product", icon: Package },
  project: { label: "Project", icon: FolderKanban },
  page: { label: "Page", icon: Link2 },
} as const;

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Every word in the query must appear somewhere; whole-word title matches rank highest. */
function rank(items: SearchItem[], query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return items.slice(0, 8);
  return items
    .map((item) => {
      const title = item.title.toLowerCase();
      const rest = `${item.description} ${item.keywords ?? ""}`.toLowerCase();
      let score = 0;
      for (const w of words) {
        const wordStart = new RegExp(`(^|[^a-z0-9])${escapeRe(w)}`);
        if (wordStart.test(title)) score += 4;
        else if (title.includes(w)) score += 2;
        else if (rest.includes(w)) score += 1;
        else return null;
      }
      return { item, score };
    })
    .filter((x): x is { item: SearchItem; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((x) => x.item);
}

export function SearchDialog() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<SearchItem[] | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(() => (items ? rank(items, query) : []), [items, query]);

  function open() {
    dialogRef.current?.showModal();
    setQuery("");
    setActive(0);
    if (!items) {
      fetch("/search.json")
        .then((r) => r.json())
        .then(setItems)
        .catch(() => setItems([]));
    }
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function go(href: string) {
    dialogRef.current?.close();
    router.push(href);
  }

  // Ctrl/Cmd+K or "/" opens search from anywhere.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const typing = e.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        open();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Search"
        className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-surface px-3 text-sm text-muted transition-colors hover:text-foreground"
      >
        <Search className="size-4" />
        <span className="hidden xl:inline">Search</span>
        <kbd className="hidden rounded border border-border px-1.5 font-mono text-[10px] whitespace-nowrap xl:inline">Ctrl K</kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Search the site"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
        className="m-auto mt-[12vh] w-[min(640px,calc(100%-2rem))] rounded-2xl border border-border bg-surface p-0 text-foreground shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-5 shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((i) => Math.min(i + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter" && results[active]) {
                e.preventDefault();
                go(results[active].href);
              }
            }}
            placeholder="Search articles, projects, pages…"
            aria-label="Search query"
            aria-controls="search-results"
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
          />
          <kbd className="rounded border border-border px-1.5 font-mono text-[10px] text-muted">Esc</kbd>
        </div>
        <ul id="search-results" role="listbox" className="max-h-[60vh] overflow-y-auto p-2">
          {items === null && <li className="p-6 text-center text-sm text-muted">Loading…</li>}
          {items !== null && results.length === 0 && (
            <li className="p-6 text-center text-sm text-muted">No results for &ldquo;{query}&rdquo;</li>
          )}
          {results.map((r, i) => {
            const { icon: Icon, label } = typeMeta[r.type];
            return (
              <li key={r.href} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  onClick={() => go(r.href)}
                  onMouseEnter={() => setActive(i)}
                  className={cn("flex w-full items-start gap-3 rounded-xl p-3 text-left", i === active && "bg-surface-2")}
                >
                  <Icon className="mt-0.5 size-4 shrink-0 text-brand-2" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{r.title}</span>
                    <span className="block truncate text-sm text-muted">{r.description}</span>
                  </span>
                  <span className="shrink-0 text-xs text-muted">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </dialog>
    </>
  );
}
