import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { getCategory, getPost, postStaticParams } from "@/modules/blog";

export const alt = "Article by Asharib Kamal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return postStaticParams();
}

// Per-article social share card.
export default async function PostOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const category = post ? getCategory(post.category)?.name : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #070912 0%, #151a2e 60%, #2a1a4a 100%)",
          color: "#eef0fa",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a78bfa", textTransform: "uppercase", letterSpacing: 4 }}>
          {category ?? "Blog"}
        </div>
        <div style={{ display: "flex", fontSize: post && post.title.length > 60 ? 60 : 72, fontWeight: 800, lineHeight: 1.1 }}>
          {post?.title ?? siteConfig.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              background: "linear-gradient(100deg, #60a5fa, #a78bfa, #e879f9)",
            }}
          >
            AK
          </div>
          <div style={{ display: "flex" }}>
            {siteConfig.name} · {siteConfig.domain}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
