// Public API of the portfolio module — pages import only from here.
import { projects } from "./data";

export * from "./data";
export type * from "./types";
export { ProfileHero } from "./components/profile-hero";
export { ProjectsGrid } from "./components/projects-grid";
export {
  ExperienceTimeline,
  ProjectCard,
  ServicesGrid,
  SkillsSection,
  StatsRow,
  TestimonialsSection,
} from "./components/sections";

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
