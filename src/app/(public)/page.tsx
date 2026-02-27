import Link from "next/link";
import { CountdownTimer } from "@/components/public/countdown-timer";

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-32 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-nostalgia-accent/10 to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-nostalgia-primary mb-4">
            THPT Phạm Phú Thứ — Đà Nẵng
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-nostalgia-secondary leading-tight mb-6">
            Hội Khoá 20 Năm
          </h1>
          <p className="text-lg md:text-xl text-nostalgia-text/70 mb-4">
            Niên khoá 2003 — 2006
          </p>
          <div className="inline-block bg-white/60 backdrop-blur rounded-2xl px-8 py-6 shadow-sm mb-10">
            <CountdownTimer />
          </div>
          <p className="text-nostalgia-text/60 mb-8 max-w-2xl mx-auto">
            20 năm — một chặng đường dài. Hãy cùng nhau trở về, gặp lại bạn bè,
            thầy cô, và sống lại những kỷ niệm đẹp nhất của tuổi học trò.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/su-kien"
              className="inline-block bg-nostalgia-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-nostalgia-primary/90 transition-colors"
            >
              Xem chi tiết sự kiện
            </Link>
            <Link
              href="/lien-he"
              className="inline-block border-2 border-nostalgia-primary text-nostalgia-primary px-8 py-3 rounded-full font-semibold hover:bg-nostalgia-primary/10 transition-colors"
            >
              Liên hệ Ban tổ chức
            </Link>
          </div>
        </div>
      </section>

      {/* Quick info cards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "7 Lớp — 1 Gia Đình",
              desc: "Từ 12A1 đến 12A7, tất cả chúng ta đều là con của trường Phạm Phú Thứ.",
              href: "/lop/12a1",
              cta: "Xem các lớp",
            },
            {
              title: "Ngày Hội Ngộ",
              desc: "24/05/2026 — Một ngày đặc biệt để gặp lại bạn bè sau 20 năm xa cách.",
              href: "/su-kien",
              cta: "Xem lịch trình",
            },
            {
              title: "Thư Viện Ảnh",
              desc: "Những bức ảnh kỷ niệm từ thời đi học đến hiện tại. Cùng chia sẻ nhé!",
              href: "/thu-vien",
              cta: "Xem thư viện",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block bg-white rounded-xl p-6 shadow-sm border border-nostalgia-accent/20 hover:shadow-md hover:border-nostalgia-primary/30 transition-all"
            >
              <h3 className="font-serif text-xl font-bold text-nostalgia-secondary mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-nostalgia-text/60 mb-4 leading-relaxed">
                {card.desc}
              </p>
              <span className="text-sm font-semibold text-nostalgia-primary group-hover:underline">
                {card.cta} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Memory timeline teaser */}
      <section className="bg-nostalgia-secondary/5 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-nostalgia-secondary mb-4">
            Bạn còn nhớ không?
          </h2>
          <p className="text-nostalgia-text/60 mb-10 max-w-2xl mx-auto">
            Ba năm cấp 3 (2003-2006) với bao nhiêu kỷ niệm đẹp...
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {[
              { year: "2003", text: "Ngày đầu tiên bước chân vào trường. Mọi thứ đều mới mẻ và bỡ ngỡ." },
              { year: "2004-2005", text: "Những ngày tháng vui nhất — học hành, bạn bè, và cả những trận bóng đá giờ ra chơi." },
              { year: "2006", text: "Mùa chia tay. Tấm bằng tốt nghiệp, nước mắt, và lời hẹn gặp lại." },
            ].map((item) => (
              <div key={item.year} className="bg-white rounded-xl p-5 shadow-sm border border-nostalgia-accent/15">
                <span className="font-serif text-2xl font-bold text-nostalgia-primary">
                  {item.year}
                </span>
                <p className="text-sm text-nostalgia-text/60 mt-2 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
