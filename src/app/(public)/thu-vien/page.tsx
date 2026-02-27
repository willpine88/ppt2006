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
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl font-bold text-nostalgia-secondary mb-2 text-center">
        Thư Viện Ảnh
      </h1>
      <p className="text-center text-nostalgia-text/60 mb-10">
        Những khoảnh khắc đáng nhớ từ thời đi học đến hiện tại
      </p>

      {/* Filter by class */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <span className="px-4 py-2 rounded-full text-sm font-semibold bg-nostalgia-primary text-white">
          Tất cả
        </span>
        {classes.map((c: { slug: string; name: string }) => (
          <span
            key={c.slug}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-white border border-nostalgia-accent/30 text-nostalgia-text/70"
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
              className="break-inside-avoid bg-white rounded-xl overflow-hidden shadow-sm border border-nostalgia-accent/15"
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
                    <p className="text-sm text-nostalgia-text/70">{img.caption}</p>
                  )}
                  {img.year && (
                    <p className="text-xs text-nostalgia-text/50 mt-1">{img.year}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-nostalgia-accent/5 rounded-xl p-10 text-center border border-nostalgia-accent/15">
          <p className="font-serif text-xl text-nostalgia-secondary mb-2">
            Chưa có ảnh nào
          </p>
          <p className="text-sm text-nostalgia-text/60">
            Thư viện ảnh đang được xây dựng. Hãy gửi ảnh kỷ niệm cho BTC để
            cùng nhau lưu giữ kỷ niệm nhé!
          </p>
        </div>
      )}
    </div>
  );
}
