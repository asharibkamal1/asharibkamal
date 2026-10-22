// "Tools I use" page content. Only list tools you genuinely use.
// To earn commission, paste your affiliate URL into `affiliateUrl` — the page then marks the link
// as sponsored and shows the disclosure automatically.

export type Resource = {
  name: string;
  description: string;
  /** Why you personally use it — this sentence is what makes people click. */
  why: string;
  url: string;
  affiliateUrl?: string;
  free?: boolean;
};

export type ResourceGroup = { title: string; description: string; items: Resource[] };

export const resourceGroups: ResourceGroup[] = [
  {
    title: "Development",
    description: "What I write and ship code with every day.",
    items: [
      {
        name: "Visual Studio",
        description: "Full IDE for C# and .NET.",
        why: "Still the best debugger and refactoring tools for large .NET solutions.",
        url: "https://visualstudio.microsoft.com/",
        free: true,
      },
      {
        name: "Git & GitHub",
        description: "Version control and code hosting.",
        why: "Every project — work and personal — lives in Git from day one.",
        url: "https://github.com/",
        free: true,
      },
      {
        name: "Azure DevOps",
        description: "Boards, repos and CI/CD pipelines.",
        why: "Reliable pipelines for enterprise .NET deployments.",
        url: "https://azure.microsoft.com/products/devops",
      },
      {
        name: "SQL Server",
        description: "Microsoft's relational database.",
        why: "The database behind most of the enterprise systems I've built.",
        url: "https://www.microsoft.com/sql-server",
      },
    ],
  },
  {
    title: "Building this website",
    description: "The stack behind asharibkamal.com.",
    items: [
      {
        name: "Next.js",
        description: "React framework for fast, SEO-friendly websites.",
        why: "Static pages that load instantly and rank well, with server features when I need them.",
        url: "https://nextjs.org/",
        free: true,
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS framework.",
        why: "Lets me design responsive pages quickly without fighting CSS files.",
        url: "https://tailwindcss.com/",
        free: true,
      },
      {
        name: "Vercel",
        description: "Hosting for Next.js sites.",
        why: "Push to GitHub and the site is live in a minute — the free tier covers a personal site.",
        url: "https://vercel.com/",
        free: true,
      },
    ],
  },
  {
    title: "Online business",
    description: "Tools for the newsletter, email and selling digital products.",
    items: [
      {
        name: "Kit (ConvertKit)",
        description: "Email newsletter platform for creators.",
        why: "Powers my newsletter and delivers the free starter kit automatically.",
        url: "https://kit.com/",
        free: true,
      },
      {
        name: "Resend",
        description: "Email API for developers.",
        why: "Sends contact-form messages from this site with a few lines of code.",
        url: "https://resend.com/",
        free: true,
      },
      {
        name: "Lemon Squeezy",
        description: "Sell digital products with taxes handled for you.",
        why: "Acts as merchant of record, so global payments and sales tax are handled for me.",
        url: "https://www.lemonsqueezy.com/",
      },
    ],
  },
];

export const hasAffiliateLinks = resourceGroups.some((g) => g.items.some((i) => i.affiliateUrl));
