import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/supabase";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Không tìm thấy bài viết" };
  return {
    title: post.title,
    description: post.excerpt || `${post.title} — Hội Khoá PPT 2006`,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 md:py-28">
      <Link
        href="/tin-tuc"
        className="text-sm text-nostalgia-primary hover:text-nostalgia-secondary transition-colors mb-8 inline-block"
      >
        &larr; Quay lại tin tức
      </Link>

      {post.featured_image && (
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full rounded-xl mb-8 border border-nostalgia-border/60"
        />
      )}

      <h1 className="font-serif text-3xl md:text-5xl font-bold text-nostalgia-cream mb-4">
        {post.title}
      </h1>

      <p className="text-sm text-nostalgia-muted mb-10">
        {new Date(post.created_at).toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div
        className="prose prose-invert prose-sm max-w-none text-nostalgia-text/60 leading-relaxed [&_a]:text-nostalgia-primary [&_a]:underline [&_h2]:text-nostalgia-cream [&_h2]:font-serif [&_h3]:text-nostalgia-cream [&_h3]:font-serif [&_strong]:text-nostalgia-text/80 [&_blockquote]:border-nostalgia-border [&_blockquote]:text-nostalgia-text/40"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />
    </div>
  );
}
