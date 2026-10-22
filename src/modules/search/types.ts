export type SearchItem = {
  type: "post" | "project" | "page";
  title: string;
  description: string;
  href: string;
  keywords?: string;
};
