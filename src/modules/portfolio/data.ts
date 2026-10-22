// Portfolio content. Edit this file to update the portfolio, home and hire-me pages.
import type { Experience, Project, Service, SkillGroup, Stat, Testimonial } from "./types";

export const stats: Stat[] = [
  { value: "5+", label: "Years building .NET systems" },
  { value: "4", label: "Companies & industries" },
  { value: "2", label: "Products launched" },
  { value: "3", label: "Industries: tax, insurance, manufacturing" },
];

export const skillGroups: SkillGroup[] = [
  { title: "Languages", skills: ["C#", "JavaScript", "SQL"] },
  { title: "Frameworks", skills: [".NET Core", "ASP.NET MVC", "ASP.NET Web Forms", ".NET Framework", "Entity Framework Core"] },
  { title: "Architecture", skills: ["Clean Architecture", "Microservices", "REST APIs", "Background Services", "Integrations"] },
  { title: "Data & Reporting", skills: ["SQL Server", "Oracle", "RDLC Reports", "Crystal Reports"] },
  { title: "DevOps & Tools", skills: ["Git", "Azure", "CI/CD", "Azure DevOps", "Visual Studio"] },
  { title: "Apps", skills: ["Full-Stack Web", "Desktop (WinForms)", "SaaS Products"] },
];

export const experience: Experience[] = [
  {
    company: "PRAL",
    role: "Software Engineer (.NET)",
    period: "Feb 2024 — Present",
    current: true,
    summary:
      "Leading full-stack .NET development on FBR systems — delivering enterprise applications from scratch to production while mentoring junior developers and managing technical delivery.",
    tech: [".NET Core", "Clean Architecture", "Microservices", "SQL Server", "Oracle"],
  },
  {
    company: "Daewoo Express Pakistan",
    role: "Deputy Manager — .NET Developer",
    period: "Jan 2023 — Feb 2024",
    summary:
      "Developed and maintained .NET solutions for FBR IRIS and POS components — APIs, integrations and system enhancements.",
    tech: ["ASP.NET", "REST APIs", "Integrations", "SQL Server"],
  },
  {
    company: "Carbon8 Private Ltd.",
    role: "Senior Software Developer (.NET)",
    period: "2022 — 2023",
    summary:
      "Worked on an enterprise insurance system — enhancing the .NET desktop application, resolving production issues and building a modern ASP.NET MVC web portal.",
    tech: ["ASP.NET MVC", "WinForms", "SQL Server"],
  },
  {
    company: "Cloud Support",
    role: "Junior Software Developer (.NET)",
    period: "2019 — 2022",
    summary:
      "Started as an intern and grew into a Junior .NET Developer, building ERP solutions for steel and flour mills deployed across multiple production sites.",
    tech: ["ASP.NET Web Forms", "SQL Server", "RDLC"],
  },
];

export const projects: Project[] = [
  {
    slug: "appraisalkaro",
    title: "AppraisalKaro",
    kind: "product",
    status: "Launching soon",
    tagline: "Online employee appraisal & performance review software — appraisals without Excel.",
    description:
      "A focused SaaS that moves the yearly appraisal off spreadsheets: build a form once, launch a review cycle, and let automatic reminders, live tracking and one-click PDF/Excel reports do the rest. Built for companies of 10–500 employees.",
    role: "Founder & Developer",
    tags: ["SaaS", "HR Tech", "Product"],
    link: "https://appraisalkaro.com/",
    accent: "from-blue-500 to-violet-500",
    highlights: [
      "Template builder for ratings, goals and comments — reusable every cycle",
      "Self-review + manager review side by side",
      "Automatic reminders and a live progress dashboard",
      "One-click branded PDF appraisals and full Excel export",
    ],
    problem:
      "Small and mid-size companies still run appraisals over email and Excel — HR spends weeks chasing forms, fixing broken formulas and merging files.",
  },
  {
    slug: "fuel-relief-sms-helper",
    title: "9771 Fuel Relief SMS Helper",
    kind: "product",
    status: "Live",
    tagline: "A bilingual (English / اردو) tool that formats fuel-relief registration SMS correctly.",
    description:
      "A free public utility that helps people build the exact 9771 registration and token SMS — CNIC, vehicle number, province and registration date — then opens their SMS app pre-filled. It stores nothing and sends nothing on its own.",
    role: "Founder & Developer",
    tags: ["Public Utility", "Bilingual", "Web App"],
    link: "https://fuelreliefsms.vercel.app/",
    accent: "from-violet-500 to-fuchsia-500",
    highlights: [
      "English and Urdu interface",
      "Guided form that builds the SMS in the correct format",
      "One-tap 'Send SMS' and copy buttons, monthly quota guide",
      "Privacy-first: no data stored, no backend calls",
    ],
    problem:
      "Many people's registration SMS failed because of formatting mistakes. A simple guided form removes the guesswork.",
  },
  {
    slug: "fbr-enterprise-systems",
    title: "FBR Enterprise Systems",
    kind: "case-study",
    status: "Production",
    tagline: "National-scale tax systems built with .NET Core, clean architecture and microservices.",
    description:
      "Full-stack development of enterprise applications for FBR systems — from design to production — with a focus on security, scalability and maintainability under real-world load.",
    role: "Software Engineer (.NET) · PRAL",
    tags: [".NET Core", "Microservices", "SQL Server", "Oracle"],
    accent: "from-sky-500 to-blue-600",
    highlights: [
      "Delivered systems from scratch to production",
      "Clean Architecture and service-based design",
      "Mentored junior developers and owned technical delivery",
    ],
  },
  {
    slug: "fbr-iris-pos-integrations",
    title: "FBR IRIS & POS Integrations",
    kind: "case-study",
    status: "Production",
    tagline: "APIs and integrations connecting business systems with FBR IRIS and POS.",
    description:
      "Built and maintained .NET APIs, integrations and enhancements for FBR IRIS and point-of-sale components in a large transport company.",
    role: ".NET Developer · Daewoo Express",
    tags: ["ASP.NET", "REST APIs", "Integrations"],
    accent: "from-indigo-500 to-violet-600",
    highlights: ["REST API design and integration", "Reliable production enhancements", "Business-critical uptime"],
  },
  {
    slug: "insurance-management-system",
    title: "Enterprise Insurance System",
    kind: "case-study",
    status: "Production",
    tagline: "Desktop app enhancements plus a modern ASP.NET MVC web portal for a large insurer.",
    description:
      "Enhanced a .NET desktop application, resolved production issues, and built a new ASP.NET MVC web portal to bring key workflows online.",
    role: "Senior Software Developer · Carbon8",
    tags: ["ASP.NET MVC", "WinForms", "SQL Server"],
    accent: "from-fuchsia-500 to-pink-500",
    highlights: ["Legacy desktop modernisation", "New web portal", "Production support"],
  },
  {
    slug: "industrial-erp",
    title: "Industrial ERP — Steel & Flour Mills",
    kind: "case-study",
    status: "Production",
    tagline: "ERP modules and reporting deployed across multiple production sites.",
    description:
      "Built ERP features for steel and flour mills with ASP.NET Web Forms, SQL Server and RDLC reporting, and handled deployments at multiple sites.",
    role: "Junior Developer · Cloud Support",
    tags: ["Web Forms", "SQL Server", "RDLC"],
    accent: "from-blue-600 to-cyan-500",
    highlights: ["ERP modules for mill operations", "Operational reports in RDLC", "Multi-site deployments"],
  },
];

export const services: Service[] = [
  {
    title: ".NET Web Apps & APIs",
    description: "Secure, scalable ASP.NET Core applications and REST APIs built with Clean Architecture.",
    icon: "server",
  },
  {
    title: "SaaS / MVP Building",
    description: "Turn your idea into a launched product — scoped, built and shipped, like AppraisalKaro.",
    icon: "rocket",
  },
  {
    title: "Legacy Modernisation",
    description: "Upgrade Web Forms, WinForms or old .NET Framework apps to modern .NET and the web.",
    icon: "refresh",
  },
  {
    title: "ERP & Business Systems",
    description: "Custom ERP modules, reporting (RDLC/Crystal), POS and tax integrations.",
    icon: "building",
  },
];

// Paste LinkedIn recommendations here. The section stays hidden until at least one exists.
export const testimonials: Testimonial[] = [];
