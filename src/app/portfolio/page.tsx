import {
  ExperienceTimeline,
  ProfileHero,
  projects,
  ProjectsGrid,
  SkillsSection,
  StatsRow,
  TestimonialsSection,
} from "@/modules/portfolio";
import { breadcrumbSchema, JsonLd, pageMetadata } from "@/modules/seo";
import { Container, SectionHeading } from "@/shared/ui/primitives";

export const metadata = pageMetadata({
  title: "Portfolio — Senior .NET Engineer",
  description:
    "Portfolio of Asharib Kamal: SaaS products like AppraisalKaro, plus enterprise .NET work on FBR systems, insurance and ERP platforms. Skills, experience and case studies.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <ProfileHero
        heading={
          <>
            Senior <span className="text-gradient">.NET Engineer</span> building enterprise systems & SaaS products
          </>
        }
        intro="5+ years designing and delivering enterprise-grade .NET applications for government tax systems, insurance and industrial ERP — secure, scalable and maintainable solutions that handle real-world complexity."
      />
      <StatsRow />

      <Container className="py-24" id="projects">
        <SectionHeading
          eyebrow="Projects"
          title="Products & case studies"
          description="My own products, and the enterprise systems I've helped build. Client work is described without confidential details."
        />
        <ProjectsGrid projects={projects} />
      </Container>

      <ExperienceTimeline />
      <SkillsSection />
      <TestimonialsSection />

      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }])} />
    </>
  );
}
