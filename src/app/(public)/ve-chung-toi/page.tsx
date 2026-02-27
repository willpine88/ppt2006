import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description: "Giới thiệu trường THPT Phạm Phú Thứ, Đà Nẵng và niên khoá 2003-2006.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 md:py-28">
      <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-nostalgia-muted mb-4 border border-nostalgia-border rounded-full px-3 py-1">
        Về chúng tôi
      </span>
      <h1 className="font-serif text-4xl md:text-6xl font-bold text-nostalgia-cream mb-12">
        Về Chúng Tôi
      </h1>

      {/* School intro */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-nostalgia-primary mb-4">
          Trường THPT Phạm Phú Thứ
        </h2>
        <div className="space-y-4 text-nostalgia-text/50 leading-relaxed text-sm md:text-base">
          <p>
            Trường THPT Phạm Phú Thứ toạ lạc tại thành phố Đà Nẵng, là một trong
            những ngôi trường có bề dày truyền thống giáo dục của thành phố.
            Trường mang tên nhà yêu nước Phạm Phú Thứ (1821-1882) — một danh nhân
            lỗi lạc của đất Quảng.
          </p>
          <p>
            Niên khoá 2003-2006 là một thế hệ đặc biệt, với 7 lớp từ 12A1 đến 12A7,
            hàng trăm học sinh đã cùng nhau trải qua 3 năm cấp 3 đầy kỷ niệm.
          </p>
        </div>
      </section>

      {/* Classes */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-nostalgia-primary mb-6">
          Niên Khoá 2003 — 2006
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["12A1", "12A2", "12A3", "12A4", "12A5", "12A6", "12A7"].map(
            (cls) => (
              <a
                key={cls}
                href={`/lop/${cls.toLowerCase()}`}
                className="block text-center bg-nostalgia-card rounded-xl p-5 border border-nostalgia-border/60 hover:border-nostalgia-primary/40 transition-all"
              >
                <span className="font-serif text-xl font-bold text-nostalgia-text/60 hover:text-nostalgia-primary transition-colors">
                  {cls}
                </span>
              </a>
            )
          )}
        </div>
      </section>

      {/* Organizing committee */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-nostalgia-primary mb-4">
          Ban Tổ Chức
        </h2>
        <p className="text-nostalgia-text/50 mb-6 text-sm md:text-base leading-relaxed">
          Hội khoá 20 năm được tổ chức bởi các cựu học sinh nhiệt huyết đến từ
          tất cả 7 lớp, với mong muốn kết nối lại mọi người sau 20 năm xa cách.
        </p>
        <div className="bg-nostalgia-card rounded-xl p-6 border border-nostalgia-border/60">
          <p className="text-sm text-nostalgia-text/40 italic">
            Thông tin chi tiết ban tổ chức sẽ được cập nhật sớm. Vui lòng liên hệ qua
            trang{" "}
            <a href="/lien-he" className="text-nostalgia-primary underline">
              Liên hệ
            </a>{" "}
            để biết thêm.
          </p>
        </div>
      </section>

      {/* Teachers tribute */}
      <section>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-nostalgia-primary mb-4">
          Thầy Cô Của Chúng Ta
        </h2>
        <p className="text-nostalgia-text/50 leading-relaxed text-sm md:text-base">
          Tri ân các thầy cô đã dạy dỗ chúng ta trong suốt 3 năm cấp 3.
          Danh sách thầy cô chủ nhiệm và bộ môn sẽ được cập nhật — nếu bạn nhớ
          thông tin, hãy gửi cho ban tổ chức nhé!
        </p>
      </section>
    </div>
  );
}
