import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description: "Giới thiệu trường THPT Phạm Phú Thứ, Đà Nẵng và niên khoá 2003-2006.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl font-bold text-nostalgia-secondary mb-8 text-center">
        Về Chúng Tôi
      </h1>

      {/* School intro */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl font-bold text-nostalgia-primary mb-4">
          Trường THPT Phạm Phú Thứ
        </h2>
        <div className="prose prose-sm max-w-none text-nostalgia-text/80 leading-relaxed space-y-4">
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
      <section className="mb-12">
        <h2 className="font-serif text-2xl font-bold text-nostalgia-primary mb-4">
          Niên Khoá 2003 — 2006
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["12A1", "12A2", "12A3", "12A4", "12A5", "12A6", "12A7"].map(
            (cls) => (
              <a
                key={cls}
                href={`/lop/${cls.toLowerCase()}`}
                className="block text-center bg-white rounded-lg p-4 shadow-sm border border-nostalgia-accent/20 hover:border-nostalgia-primary/40 hover:shadow-md transition-all"
              >
                <span className="font-serif text-xl font-bold text-nostalgia-secondary">
                  {cls}
                </span>
              </a>
            )
          )}
        </div>
      </section>

      {/* Organizing committee */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl font-bold text-nostalgia-primary mb-4">
          Ban Tổ Chức
        </h2>
        <p className="text-nostalgia-text/70 mb-6">
          Hội khoá 20 năm được tổ chức bởi các cựu học sinh nhiệt huyết đến từ
          tất cả 7 lớp, với mong muốn kết nối lại mọi người sau 20 năm xa cách.
        </p>
        <div className="bg-white rounded-xl p-6 border border-nostalgia-accent/20">
          <p className="text-sm text-nostalgia-text/60 italic">
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
        <h2 className="font-serif text-2xl font-bold text-nostalgia-primary mb-4">
          Thầy Cô Của Chúng Ta
        </h2>
        <p className="text-nostalgia-text/70 leading-relaxed">
          Tri ân các thầy cô đã dạy dỗ chúng ta trong suốt 3 năm cấp 3.
          Danh sách thầy cô chủ nhiệm và bộ môn sẽ được cập nhật — nếu bạn nhớ
          thông tin, hãy gửi cho ban tổ chức nhé!
        </p>
      </section>
    </div>
  );
}
