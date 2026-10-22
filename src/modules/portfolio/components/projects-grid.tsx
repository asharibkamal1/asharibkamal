"use client";

import { useState } from "react";
import { cn } from "@/shared/ui/primitives";
import type { Project } from "../types";
import { ProjectCard } from "./sections";

const filters = [
  { id: "all", label: "All" },
  { id: "product", label: "My Products" },
  { id: "case-study", label: "Enterprise Work" },
] as const;

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("all");
  const visible = active === "all" ? projects : projects.filter((p) => p.kind === active);

  return (
    <>
      <div role="tablist" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={active === f.id}
            onClick={() => setActive(f.id)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === f.id
                ? "border-transparent bg-foreground text-background"
                : "border-border bg-surface text-muted hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
