import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="bg-nostalgia-secondary text-nostalgia-cream py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-lg font-bold mb-3">
              Hội Khoá 20 Năm
            </h3>
            <p className="text-sm text-nostalgia-cream/70 leading-relaxed">
              THPT Phạm Phú Thứ, Đà Nẵng
              <br />
              Niên khoá 2003 — 2006
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">
              Liên kết
            </h4>
            <ul className="space-y-2 text-sm text-nostalgia-cream/70">
              <li><Link href="/ve-chung-toi" className="hover:text-white transition-colors">Về chúng tôi</Link></li>
              <li><Link href="/su-kien" className="hover:text-white transition-colors">Sự kiện</Link></li>
              <li><Link href="/thu-vien" className="hover:text-white transition-colors">Thư viện ảnh</Link></li>
              <li><Link href="/lien-he" className="hover:text-white transition-colors">Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">
              Ngày hội ngộ
            </h4>
            <p className="text-2xl font-serif font-bold text-nostalgia-accent">
              24 / 05 / 2026
            </p>
            <p className="text-sm text-nostalgia-cream/70 mt-1">
              Hẹn gặp lại tất cả các bạn!
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-nostalgia-cream/20 text-center text-xs text-nostalgia-cream/50">
          &copy; 2026 Hội Khoá PPT 2006. Made with ♥ by cựu học sinh.
        </div>
      </div>
    </footer>
  );
}
