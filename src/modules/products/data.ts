// Digital products. Payments and file delivery are handled by Lemon Squeezy:
// create the product there, then paste its checkout link into `checkoutUrl` and set status "available".
// Until then, "coming-soon" products show a waitlist form that adds people to the newsletter list.

export type Product = {
  slug: string;
  title: string;
  kind: "E-book" | "Template" | "Course" | "Toolkit";
  status: "available" | "coming-soon";
  /** Price in USD. Displayed as-is; the real charge is set in Lemon Squeezy. */
  price: number;
  tagline: string;
  description: string;
  /** What the buyer gets. */
  includes: string[];
  /** Who it's for — helps the right people buy and the wrong people skip. */
  forWho: string[];
  checkoutUrl?: string;
  accent: string;
  faqs: { q: string; a: string }[];
};

const commonFaqs = [
  { q: "How do I get it after paying?", a: "You'll receive an email with your download link immediately after checkout." },
  { q: "Can I pay from Pakistan?", a: "Yes — checkout accepts international cards. The price is shown in USD." },
  { q: "Do you offer refunds?", a: "Yes. If it doesn't help you, email me within 14 days for a full refund." },
];

export const products: Product[] = [
  {
    slug: "dotnet-clean-architecture-starter-kit",
    title: ".NET Clean Architecture Starter Kit",
    kind: "Template",
    status: "coming-soon",
    price: 29,
    tagline: "A production-ready ASP.NET Core solution template — skip a week of setup on your next project.",
    description:
      "The project structure I use for real enterprise systems: Domain, Application, Infrastructure and API layers wired together with EF Core, validation, logging, error handling and tests — ready to clone and build on.",
    includes: [
      "Complete ASP.NET Core solution with 4-layer Clean Architecture",
      "EF Core setup with migrations and repository / unit of work",
      "Validation, global error handling and structured logging",
      "Background service and email queue examples",
      "Unit and integration test projects",
      "Step-by-step PDF guide explaining every decision",
    ],
    forWho: [
      ".NET developers starting a new API or SaaS backend",
      "Teams that want a consistent structure across projects",
      "Developers learning Clean Architecture from a real example",
    ],
    accent: "from-blue-500 to-violet-600",
    faqs: [
      { q: "Which .NET version?", a: "The latest LTS version of .NET at release, with updates for future versions." },
      ...commonFaqs,
    ],
  },
  {
    slug: "developer-side-income-playbook",
    title: "Developer Side-Income Playbook",
    kind: "E-book",
    status: "coming-soon",
    price: 15,
    tagline: "From first freelance client to your first digital product — a step-by-step guide for developers.",
    description:
      "The in-depth version of the free starter kit: how to choose your niche, find clients, price your work, get paid internationally and build products that sell while you sleep.",
    includes: [
      "E-book (PDF) with step-by-step chapters",
      "Proposal and outreach message templates",
      "Pricing calculator spreadsheet",
      "90-day action plan checklist",
    ],
    forWho: [
      "Developers with a job who want a second income stream",
      "Freelancers who want better clients and higher rates",
      "Anyone in Pakistan wanting to earn in dollars",
    ],
    accent: "from-violet-500 to-fuchsia-500",
    faqs: commonFaqs,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
