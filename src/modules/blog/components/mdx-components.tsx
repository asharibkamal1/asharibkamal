import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/shared/ui/primitives";
import { CodeBlock } from "./code-block";

const calloutStyles = {
  info: { icon: Info, className: "border-brand-1/40 bg-brand-1/10" },
  tip: { icon: Lightbulb, className: "border-emerald-500/40 bg-emerald-500/10" },
  warning: { icon: AlertTriangle, className: "border-amber-500/40 bg-amber-500/10" },
};

/** Usage in MDX: <Callout type="tip" title="Pro tip">Text</Callout> */
function Callout({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof calloutStyles;
  title?: string;
  children: ReactNode;
}) {
  const { icon: Icon, className } = calloutStyles[type];
  return (
    <aside className={cn("not-prose my-6 flex gap-3 rounded-xl border p-4 text-[0.95rem] leading-relaxed", className)}>
      <Icon className="mt-0.5 size-5 shrink-0" />
      <div className="[&>p]:m-0 [&>p+p]:mt-2">
        {title && <p className="font-semibold">{title}</p>}
        {children}
      </div>
    </aside>
  );
}

function A({ href = "", children, ...props }: ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function Table(props: ComponentProps<"table">) {
  return (
    <div className="my-6 overflow-x-auto">
      <table {...props} className="my-0" />
    </div>
  );
}

export const mdxComponents = {
  a: A,
  pre: CodeBlock,
  table: Table,
  Callout,
};
