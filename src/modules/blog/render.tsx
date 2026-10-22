import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import { mdxComponents } from "./components/mdx-components";

const prettyCode: PrettyCodeOptions = {
  // Both themes are emitted as CSS variables; globals.css picks one based on data-theme.
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
  defaultLang: "plaintext",
};

/** Compiled once per post and cached (MDX + Shiki are expensive). */
export async function PostBody({ source }: { source: string }) {
  "use cache";
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: ["heading-anchor"] } }],
            [rehypePrettyCode, prettyCode],
          ],
        },
      }}
    />
  );
}
