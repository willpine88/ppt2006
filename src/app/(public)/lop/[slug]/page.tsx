export const runtime = 'edge';

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getClassBySlug, getAlumniByClass, getClasses } from "@/lib/reunion-data";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cls = await getClassBySlug(params.slug);
  if (!cls) return { title: "Không tìm thấy lớp" };
  return {
    title: `Lớp ${cls.name}`,
    description: `Trang kỷ niệm lớp ${cls.name} — THPT Phạm Phú Thứ, niên khoá 2003-2006.`,
  };
}

export default async function ClassPage({ params }: Props) {
  const cls = await getClassBySlug(params.slug);
  if (!cls) notFound();

  const [alumni, allClasses] = await Promise.all([
    getAlumniByClass(cls.id),
    getClasses(),
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 md:py-28">
      {/* Class nav */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {allClasses.map((c: { slug: string; name: string }) => (
          <Link
            key={c.slug}
            href={`/lop/${c.slug}`}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              c.slug === params.slug
                ? "bg-gradient-to-r from-nostalgia-primary to-nostalgia-secondary text-nostalgia-bg"
                : "bg-nostalgia-card border border-nostalgia-border/60 text-nostalgia-text/50 hover:border-nostalgia-primary/40 hover:text-nostalgia-primary"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <h1 className="font-serif text-4xl md:text-6xl font-bold text-nostalgia-cream mb-2 text-center">
        Lớp {cls.name}
      </h1>

      {cls.homeroom_teacher && (
        <p className="text-center text-nostalgia-text/40 mb-2">
          GVCN: {cls.homeroom_teacher}
        </p>
      )}

      {cls.description && (
        <p className="text-center text-nostalgia-text/50 mb-10 max-w-2xl mx-auto text-sm">
          {cls.description}
        </p>
      )}

      {/* Class photo */}
      {cls.class_photo_url && (
        <div className="mb-12">
          <img
            src={cls.class_photo_url}
            alt={`Ảnh lớp ${cls.name}`}
            className="w-full rounded-xl border border-nostalgia-border/60"
          />
        </div>
      )}

      {/* Alumni list */}
      <h2 className="font-serif text-2xl font-bold text-nostalgia-primary mb-6">
        Danh Sách Thành Viên
        {cls.student_count && (
          <span className="text-base font-normal text-nostalgia-muted ml-2">
            ({cls.student_count} bạn)
          </span>
        )}
      </h2>

      {alumni.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {alumni.map((a: { id: string; full_name: string; nickname?: string; current_city?: string; occupation?: string }) => (
            <div
              key={a.id}
              className="bg-nostalgia-card rounded-xl p-4 border border-nostalgia-border/60"
            >
              <p className="font-semibold text-nostalgia-cream text-sm">
                {a.full_name}
              </p>
              {a.nickname && (
                <p className="text-xs text-nostalgia-text/30">
                  &quot;{a.nickname}&quot;
                </p>
              )}
              {(a.current_city || a.occupation) && (
                <p className="text-xs text-nostalgia-muted mt-1">
                  {[a.occupation, a.current_city].filter(Boolean).join(" — ")}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-nostalgia-card rounded-xl p-8 text-center border border-nostalgia-border/60">
          <p className="text-sm text-nostalgia-text/40 italic">
            Danh sách thành viên đang được cập nhật. Nếu bạn là cựu HS lớp{" "}
            {cls.name}, hãy liên hệ BTC để bổ sung thông tin nhé!
          </p>
        </div>
      )}
    </div>
  );
}
