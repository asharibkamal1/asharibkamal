import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { GitHubIcon, LinkedInIcon } from "@/shared/ui/brand-icons";

export function AuthorBox() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center">
      <Image
        src={siteConfig.photo}
        alt={siteConfig.name}
        width={720}
        height={417}
        sizes="80px"
        className="size-20 shrink-0 rounded-full object-cover object-[50%_30%]"
      />
      <div className="flex-1">
        <p className="text-sm text-muted">Written by</p>
        <p className="text-lg font-bold">{siteConfig.name}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {siteConfig.role} with 5+ years building enterprise systems. I write about software engineering, AI and
          earning online.{" "}
          <Link href="/about" className="font-medium text-brand-2 hover:underline">
            More about me
          </Link>
        </p>
      </div>
      <div className="flex gap-2">
        <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted hover:text-foreground">
          <LinkedInIcon className="size-4" />
        </a>
        <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted hover:text-foreground">
          <GitHubIcon className="size-4" />
        </a>
      </div>
    </div>
  );
}
