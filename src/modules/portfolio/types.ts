export type Stat = { value: string; label: string };

export type SkillGroup = { title: string; skills: string[] };

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  tech: string[];
  current?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  kind: "product" | "case-study";
  status: string;
  tagline: string;
  description: string;
  role: string;
  tags: string[];
  link?: string;
  /** Tailwind gradient stops used for the project cover */
  accent: string;
  highlights: string[];
  problem?: string;
};

export type Service = {
  title: string;
  description: string;
  icon: "server" | "rocket" | "refresh" | "building";
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  linkedin?: string;
};
