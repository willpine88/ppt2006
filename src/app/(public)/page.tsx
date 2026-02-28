import Link from "next/link";
import { CountdownTimer } from "@/components/public/countdown-timer";
import { GuestbookSection } from "@/components/public/guestbook-section";
import { SchoolSceneAnimation } from "@/components/public/school-scene-animation";

export default function LandingPage() {
  return (
    <>
      {/* Animated school scene */}
      <SchoolSceneAnimation />

      {/* Hero */}
      <section className="relative py-16 md:py-24 lg:py-32 text-center px-4 overflow-hidden -mt-8">
        {/* Gradient background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nostalgia-bg to-nostalgia-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-nostalgia-primary/5 via-transparent to-transparent" />

        <div className="relative max-w-5xl mx-auto">
          <span className="inline-block text-[10px] md:text-xs uppercase tracking-[0.4em] text-nostalgia-muted mb-6 border border-nostalgia-border rounded-full px-4 py-1.5">
            Hội khoá
          </span>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6">
            <span className="bg-gradient-to-r from-nostalgia-cream via-nostalgia-primary to-nostalgia-secondary bg-clip-text text-transparent">
              Hội Khoá 20 Năm
            </span>
          </h1>

          <p className="text-base md:text-lg text-nostalgia-text/50 mb-2">
            THPT Phạm Phú Thứ — Đà Nẵng
          </p>
          <p className="text-sm text-nostalgia-muted mb-10">
            Niên khoá 2003 — 2006
          </p>

          {/* Countdown */}
          <div className="mb-10">
            <CountdownTimer />
          </div>

          <p className="text-nostalgia-text/40 mb-10 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            20 năm — một chặng đường dài. Hãy cùng nhau trở về, gặp lại bạn bè,
            thầy cô, và sống lại những kỷ niệm đẹp nhất của tuổi học trò.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/su-kien"
              className="inline-block bg-gradient-to-r from-nostalgia-primary to-nostalgia-secondary text-nostalgia-bg px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity text-sm"
            >
              Xem chi tiết sự kiện
            </Link>
            <Link
              href="/lien-he"
              className="inline-block border border-nostalgia-border text-nostalgia-text/70 px-8 py-3.5 rounded-full font-semibold hover:border-nostalgia-primary/60 hover:text-nostalgia-primary transition-colors text-sm"
            >
              Liên hệ Ban tổ chức
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-nostalgia-border/60 bg-nostalgia-card/50">
        <div className="max-w-4xl mx-auto px-4 py-10 md:py-12">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { number: "7", label: "Lớp" },
              { number: "20", label: "Năm" },
              { number: "100+", label: "Kỷ niệm" },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="font-serif text-4xl md:text-5xl font-bold bg-gradient-to-b from-nostalgia-primary to-nostalgia-accent bg-clip-text text-transparent">
                  {stat.number}
                </span>
                <p className="text-xs md:text-sm text-nostalgia-muted mt-1 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-nostalgia-muted mb-4 border border-nostalgia-border rounded-full px-3 py-1">
            Về chúng tôi
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-nostalgia-cream mb-6">
            Trường THPT Phạm Phú Thứ
          </h2>
          <p className="text-nostalgia-text/50 leading-relaxed max-w-3xl mb-6 text-sm md:text-base">
            Toạ lạc tại thành phố Đà Nẵng, trường mang tên nhà yêu nước Phạm Phú Thứ
            (1821-1882). Niên khoá 2003-2006 với 7 lớp từ 12A1 đến 12A7, hàng trăm học
            sinh đã cùng nhau trải qua 3 năm cấp 3 đầy kỷ niệm.
          </p>
          <Link
            href="/ve-chung-toi"
            className="text-sm text-nostalgia-primary hover:text-nostalgia-secondary transition-colors font-semibold"
          >
            Tìm hiểu thêm &rarr;
          </Link>
        </div>
      </section>

      {/* Classes grid */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-nostalgia-bg via-nostalgia-card/30 to-nostalgia-bg">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-nostalgia-muted mb-4 border border-nostalgia-border rounded-full px-3 py-1">
              Các lớp
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-nostalgia-cream">
              7 Lớp — 1 Gia Đình
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {["12A1", "12A2", "12A3", "12A4", "12A5", "12A6", "12A7"].map(
              (cls) => (
                <Link
                  key={cls}
                  href={`/lop/${cls.toLowerCase()}`}
                  className="group block bg-nostalgia-card rounded-xl p-6 border border-nostalgia-border/60 hover:border-nostalgia-primary/40 transition-all text-center"
                >
                  <span className="font-serif text-2xl md:text-3xl font-bold text-nostalgia-text/60 group-hover:text-nostalgia-primary transition-colors">
                    {cls}
                  </span>
                  <p className="text-xs text-nostalgia-muted mt-2 group-hover:text-nostalgia-text/50 transition-colors">
                    Xem danh sách &rarr;
                  </p>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* Memory timeline */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-nostalgia-muted mb-4 border border-nostalgia-border rounded-full px-3 py-1">
              Ký ức
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-nostalgia-cream">
              Bạn còn nhớ không?
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                year: "2003",
                title: "Ngày đầu tiên",
                text: "Bước chân vào trường cấp 3. Mọi thứ đều mới mẻ và bỡ ngỡ. Những người bạn mới, thầy cô mới, và cả một hành trình phía trước.",
              },
              {
                year: "2004-2005",
                title: "Những ngày vui nhất",
                text: "Học hành, bạn bè, và cả những trận bóng đá giờ ra chơi. Những buổi liên hoan lớp, văn nghệ, thể thao — tuổi trẻ đẹp nhất là đây.",
              },
              {
                year: "2006",
                title: "Mùa chia tay",
                text: "Tấm bằng tốt nghiệp, nước mắt, và lời hẹn gặp lại. Ai cũng hứa sẽ không quên nhau, và 20 năm sau — chúng ta vẫn nhớ.",
              },
            ].map((item) => (
              <div
                key={item.year}
                className="flex gap-6 md:gap-10 items-start"
              >
                <div className="shrink-0 w-20 md:w-28">
                  <span className="font-serif text-3xl md:text-5xl font-bold bg-gradient-to-b from-nostalgia-primary to-nostalgia-accent bg-clip-text text-transparent">
                    {item.year}
                  </span>
                </div>
                <div className="bg-nostalgia-card rounded-xl p-5 md:p-6 border border-nostalgia-border/60 flex-1">
                  <h3 className="font-serif text-lg md:text-xl font-bold text-nostalgia-cream mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-nostalgia-text/50 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event teaser */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-nostalgia-bg via-nostalgia-card/40 to-nostalgia-bg">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-nostalgia-muted mb-4 border border-nostalgia-border rounded-full px-3 py-1">
            Sự kiện
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-nostalgia-cream mb-4">
            Ngày Hội Ngộ
          </h2>
          <p className="text-4xl md:text-6xl font-serif font-bold bg-gradient-to-r from-nostalgia-primary to-nostalgia-secondary bg-clip-text text-transparent mb-6">
            24 / 05 / 2026
          </p>
          <p className="text-nostalgia-text/40 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Một ngày đặc biệt để gặp lại bạn bè sau 20 năm xa cách.
            Cùng nhau ôn lại kỷ niệm, chia sẻ câu chuyện cuộc sống.
          </p>
          <Link
            href="/su-kien"
            className="inline-block bg-gradient-to-r from-nostalgia-primary to-nostalgia-secondary text-nostalgia-bg px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity text-sm"
          >
            Xem lịch trình &rarr;
          </Link>
        </div>
      </section>

      {/* Guestbook */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-nostalgia-muted mb-4 border border-nostalgia-border rounded-full px-3 py-1">
              Lưu bút
            </span>
          </div>
          <GuestbookSection />
        </div>
      </section>
    </>
  );
}
