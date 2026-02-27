import type { Metadata } from "next";
import { getGalleryImages, getClasses } from "@/lib/reunion-data";

export const metadata: Metadata = {
  title: "Thư viện ảnh",
  description: "Thư viện ảnh kỷ niệm — THPT Phạm Phú Thứ, niên khoá 2003-2006.",
};

export default async function GalleryPage() {
  const [images, classes] = await Promise.all([
    getGalleryImages(),
    getClasses(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
      <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-nostalgia-muted mb-4 border border-nostalgia-border rounded-full px-3 py-1">
        Thư viện
      </span>
      <h1 className="font-serif text-4xl md:text-6xl font-bold text-nostalgia-cream mb-2">
        Thư Viện Ảnh
      </h1>
      <p className="text-nostalgia-text/40 mb-10">
        Những khoảnh khắc đáng nhớ từ thời đi học đến hiện tại
      </p>

      {/* Filter by class */}
      <div className="flex flex-wrap gap-2 mb-10">
        <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-nostalgia-primary to-nostalgia-secondary text-nostalgia-bg">
          Tất cả
        </span>
        {classes.map((c: { slug: string; name: string }) => (
          <span
            key={c.slug}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-nostalgia-card border border-nostalgia-border/60 text-nostalgia-text/50"
          >
            {c.name}
          </span>
        ))}
      </div>

      {images.length > 0 ? (
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img: { id: string; image_url: string; caption?: string; year?: string }) => (
            <div
              key={img.id}
              className="break-inside-avoid bg-nostalgia-card rounded-xl overflow-hidden border border-nostalgia-border/60"
            >
              <img
                src={img.image_url}
                alt={img.caption || "Ảnh kỷ niệm"}
                className="w-full"
                loading="lazy"
              />
              {(img.caption || img.year) && (
                <div className="p-3">
                  {img.caption && (
                    <p className="text-sm text-nostalgia-text/50">{img.caption}</p>
                  )}
                  {img.year && (
                    <p className="text-xs text-nostalgia-muted mt-1">{img.year}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-nostalgia-card rounded-xl p-12 text-center border border-nostalgia-border/60">
          <p className="font-serif text-xl text-nostalgia-cream mb-2">
            Chưa có ảnh nào
          </p>
          <p className="text-sm text-nostalgia-text/40">
            Thư viện ảnh đang được xây dựng. Hãy gửi ảnh kỷ niệm cho BTC để
            cùng nhau lưu giữ kỷ niệm nhé!
          </p>
        </div>
      )}
    </div>
  );
}
