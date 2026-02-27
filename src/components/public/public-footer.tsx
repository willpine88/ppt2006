import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="bg-nostalgia-card border-t border-nostalgia-border/60 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-lg font-bold text-nostalgia-primary mb-3">
              Hội Khoá 20 Năm
            </h3>
            <p className="text-sm text-nostalgia-text/50 leading-relaxed">
              THPT Phạm Phú Thứ, Đà Nẵng
              <br />
              Niên khoá 2003 — 2006
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-nostalgia-muted">
              Liên kết
            </h4>
            <ul className="space-y-2 text-sm text-nostalgia-text/50">
              <li><Link href="/ve-chung-toi" className="hover:text-nostalgia-primary transition-colors">Về chúng tôi</Link></li>
              <li><Link href="/su-kien" className="hover:text-nostalgia-primary transition-colors">Sự kiện</Link></li>
              <li><Link href="/thu-vien" className="hover:text-nostalgia-primary transition-colors">Thư viện ảnh</Link></li>
              <li><Link href="/lien-he" className="hover:text-nostalgia-primary transition-colors">Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-nostalgia-muted">
              Ngày hội ngộ
            </h4>
            <p className="text-3xl font-serif font-bold bg-gradient-to-r from-nostalgia-primary to-nostalgia-secondary bg-clip-text text-transparent">
              24 / 05 / 2026
            </p>
            <p className="text-sm text-nostalgia-text/50 mt-2">
              Hẹn gặp lại tất cả các bạn!
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-nostalgia-border/40 text-center text-xs text-nostalgia-text/30">
          &copy; 2026 Hội Khoá PPT 2006. Made with love by cựu học sinh.
        </div>
      </div>
    </footer>
  );
}
