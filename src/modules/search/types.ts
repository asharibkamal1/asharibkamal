export type SearchItem = {
  type: "post" | "product" | "project" | "page";
  title: string;
  description: string;
  href: string;
  keywords?: string;
};
