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
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link
        href="/tin-tuc"
        className="text-sm text-nostalgia-primary hover:underline mb-6 inline-block"
      >
        &larr; Quay lại tin tức
      </Link>

      {post.featured_image && (
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full rounded-xl mb-6 shadow-sm"
        />
      )}

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-nostalgia-secondary mb-4">
        {post.title}
      </h1>

      <p className="text-sm text-nostalgia-text/50 mb-8">
        {new Date(post.created_at).toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div
        className="prose prose-sm max-w-none text-nostalgia-text/80 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />
    </div>
  );
}
