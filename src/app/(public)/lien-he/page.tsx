import type { Metadata } from "next";
import { GuestbookSection } from "@/components/public/guestbook-section";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ ban tổ chức hội khoá 20 năm THPT Phạm Phú Thứ.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 md:py-28">
      <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-nostalgia-muted mb-4 border border-nostalgia-border rounded-full px-3 py-1">
        Liên hệ
      </span>
      <h1 className="font-serif text-4xl md:text-6xl font-bold text-nostalgia-cream mb-12">
        Liên Hệ
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <div>
          <h2 className="font-serif text-xl font-bold text-nostalgia-primary mb-4">
            Ban Tổ Chức
          </h2>
          <p className="text-sm text-nostalgia-text/40 leading-relaxed mb-6">
            Nếu bạn có thắc mắc, muốn đóng góp ý kiến, hoặc cần thêm thông tin
            về ngày hội khoá, hãy liên hệ với chúng tôi qua các kênh bên dưới.
          </p>
          <div className="space-y-3">
            <div className="bg-nostalgia-card rounded-xl p-4 border border-nostalgia-border/60">
              <span className="text-[10px] uppercase tracking-[0.2em] text-nostalgia-muted font-semibold">
                Email
              </span>
              <p className="text-sm text-nostalgia-text/60 mt-1">
                hoikhoa2006.ppt@gmail.com
              </p>
            </div>
            <div className="bg-nostalgia-card rounded-xl p-4 border border-nostalgia-border/60">
              <span className="text-[10px] uppercase tracking-[0.2em] text-nostalgia-muted font-semibold">
                Facebook
              </span>
              <p className="text-sm text-nostalgia-text/60 mt-1">
                Hội khoá 2006 — THPT Phạm Phú Thứ
              </p>
            </div>
            <div className="bg-nostalgia-card rounded-xl p-4 border border-nostalgia-border/60">
              <span className="text-[10px] uppercase tracking-[0.2em] text-nostalgia-muted font-semibold">
                Zalo Group
              </span>
              <p className="text-sm text-nostalgia-text/60 mt-1">
                Liên hệ BTC để được thêm vào nhóm
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl font-bold text-nostalgia-primary mb-4">
            Góp Ý & Đề Xuất
          </h2>
          <p className="text-sm text-nostalgia-text/40 leading-relaxed mb-4">
            Bạn có ý tưởng hay cho ngày hội khoá? Hãy gửi cho BTC biết nhé!
          </p>
          <div className="bg-nostalgia-card rounded-xl p-5 border border-nostalgia-border/60">
            <p className="text-sm text-nostalgia-text/40 italic">
              Form góp ý sẽ được cập nhật sớm. Trong lúc chờ đợi, bạn có thể
              gửi email hoặc nhắn tin qua Facebook/Zalo.
            </p>
          </div>
        </div>
      </div>

      {/* Guestbook */}
      <GuestbookSection />
    </div>
  );
}
