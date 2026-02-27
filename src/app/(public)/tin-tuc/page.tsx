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
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl font-bold text-nostalgia-secondary mb-2 text-center">
        Tin Tức
      </h1>
      <p className="text-center text-nostalgia-text/60 mb-10">
        Cập nhật mới nhất về hội khoá
      </p>

      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post: { id: string; slug: string; title: string; excerpt?: string; featured_image?: string; created_at: string }) => (
            <Link
              key={post.id}
              href={`/tin-tuc/${post.slug}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-nostalgia-accent/15 hover:shadow-md transition-all"
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
                  <h2 className="font-serif text-lg font-bold text-nostalgia-secondary group-hover:text-nostalgia-primary transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-nostalgia-text/60 mt-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <p className="text-xs text-nostalgia-text/40 mt-3">
                    {new Date(post.created_at).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-nostalgia-accent/5 rounded-xl p-10 text-center border border-nostalgia-accent/15">
          <p className="font-serif text-xl text-nostalgia-secondary mb-2">
            Chưa có tin tức
          </p>
          <p className="text-sm text-nostalgia-text/60">
            Tin tức về hội khoá sẽ được cập nhật sớm. Hãy quay lại sau nhé!
          </p>
        </div>
      )}
    </div>
  );
}
