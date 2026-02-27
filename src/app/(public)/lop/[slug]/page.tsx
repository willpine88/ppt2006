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
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Class nav */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {allClasses.map((c: { slug: string; name: string }) => (
          <Link
            key={c.slug}
            href={`/lop/${c.slug}`}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              c.slug === params.slug
                ? "bg-nostalgia-primary text-white"
                : "bg-white border border-nostalgia-accent/30 text-nostalgia-text/70 hover:border-nostalgia-primary/40"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <h1 className="font-serif text-4xl font-bold text-nostalgia-secondary mb-2 text-center">
        Lớp {cls.name}
      </h1>

      {cls.homeroom_teacher && (
        <p className="text-center text-nostalgia-text/60 mb-2">
          GVCN: {cls.homeroom_teacher}
        </p>
      )}

      {cls.description && (
        <p className="text-center text-nostalgia-text/70 mb-8 max-w-2xl mx-auto">
          {cls.description}
        </p>
      )}

      {/* Class photo */}
      {cls.class_photo_url && (
        <div className="mb-10">
          <img
            src={cls.class_photo_url}
            alt={`Ảnh lớp ${cls.name}`}
            className="w-full rounded-xl shadow-md"
          />
        </div>
      )}

      {/* Alumni list */}
      <h2 className="font-serif text-2xl font-bold text-nostalgia-primary mb-6">
        Danh Sách Thành Viên
        {cls.student_count && (
          <span className="text-base font-normal text-nostalgia-text/50 ml-2">
            ({cls.student_count} bạn)
          </span>
        )}
      </h2>

      {alumni.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {alumni.map((a: { id: string; full_name: string; nickname?: string; current_city?: string; occupation?: string }) => (
            <div
              key={a.id}
              className="bg-white rounded-lg p-4 border border-nostalgia-accent/15"
            >
              <p className="font-semibold text-nostalgia-secondary">
                {a.full_name}
              </p>
              {a.nickname && (
                <p className="text-xs text-nostalgia-text/50">
                  &quot;{a.nickname}&quot;
                </p>
              )}
              {(a.current_city || a.occupation) && (
                <p className="text-xs text-nostalgia-text/50 mt-1">
                  {[a.occupation, a.current_city].filter(Boolean).join(" — ")}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-nostalgia-accent/5 rounded-xl p-6 text-center border border-nostalgia-accent/15">
          <p className="text-sm text-nostalgia-text/60 italic">
            Danh sách thành viên đang được cập nhật. Nếu bạn là cựu HS lớp{" "}
            {cls.name}, hãy liên hệ BTC để bổ sung thông tin nhé!
          </p>
        </div>
      )}
    </div>
  );
}
