import type { Metadata } from "next";
import Link from "next/link";
import { getReunionPosts } from "@/lib/reunion-data";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Tin tức cập nhật về hội khoá 20 năm THPT Phạm Phú Thứ.",
};

export default async function NewsPage() {
  const posts = await getReunionPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 md:py-28">
      <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-nostalgia-muted mb-4 border border-nostalgia-border rounded-full px-3 py-1">
        Tin tức
      </span>
      <h1 className="font-serif text-4xl md:text-6xl font-bold text-nostalgia-cream mb-2">
        Tin Tức
      </h1>
      <p className="text-nostalgia-text/40 mb-10">
        Cập nhật mới nhất về hội khoá
      </p>

      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post: { id: string; slug: string; title: string; excerpt?: string; featured_image?: string; created_at: string }) => (
            <Link
              key={post.id}
              href={`/tin-tuc/${post.slug}`}
              className="group block bg-nostalgia-card rounded-xl overflow-hidden border border-nostalgia-border/60 hover:border-nostalgia-primary/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row">
                {post.featured_image && (
                  <div className="sm:w-48 sm:shrink-0">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-48 sm:h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h2 className="font-serif text-lg font-bold text-nostalgia-cream group-hover:text-nostalgia-primary transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-nostalgia-text/40 mt-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <p className="text-xs text-nostalgia-muted mt-3">
                    {new Date(post.created_at).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-nostalgia-card rounded-xl p-12 text-center border border-nostalgia-border/60">
          <p className="font-serif text-xl text-nostalgia-cream mb-2">
            Chưa có tin tức
          </p>
          <p className="text-sm text-nostalgia-text/40">
            Tin tức về hội khoá sẽ được cập nhật sớm. Hãy quay lại sau nhé!
          </p>
        </div>
      )}
    </div>
  );
}
