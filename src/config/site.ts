// Single source of truth for brand, links and navigation.
// Change values here — every page, metadata tag and JSON-LD block reads from this file.

// Canonical origin for SEO tags, sitemap and social cards. An explicit NEXT_PUBLIC_SITE_URL wins;
// otherwise use the production domain Vercel is serving (the *.vercel.app URL today, and
// asharibkamal.com automatically once it's added as the production domain in Vercel).
const productionHost =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? (productionHost ? `https://${productionHost}` : "https://asharibkamal.com");

export const siteConfig = {
  name: "Asharib Kamal",
  domain: new URL(siteUrl).host,
  url: siteUrl,
  title: "Asharib Kamal — Senior .NET Engineer, Builder & Writer",
  tagline: "Software engineering, AI and online business — practical guides to build skills and earn online.",
  description:
    "Asharib Kamal is a Senior Software Engineer (.NET Core) from Islamabad with 5+ years building enterprise systems. Practical guides on software engineering, AI, and building online income — plus freelance .NET and SaaS development.",
  role: "Senior Software Engineer (.NET Core)",
  location: "Islamabad, Pakistan",
  email: "asharibkamal1@gmail.com",
  photo: "/images/asharib-kamal.jpg",
  // Set to "/asharib-kamal-cv.pdf" (file in /public) to show Download CV buttons. Keep phone numbers out of it.
  cv: null as string | null,
  social: {
    linkedin: "https://www.linkedin.com/in/asharibkamal/",
    github: "https://github.com/asharibkamal1",
  },
  nav: [
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Products", href: "/products" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Hire Me", href: "/hire-me" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
