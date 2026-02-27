import type { Metadata } from "next";
import { getEventSchedule } from "@/lib/reunion-data";
import { CountdownTimer } from "@/components/public/countdown-timer";

export const metadata: Metadata = {
  title: "Sự kiện",
  description: "Thông tin sự kiện hội khoá 20 năm THPT Phạm Phú Thứ — 24/05/2026.",
};

export default async function EventPage() {
  const schedule = await getEventSchedule();

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 md:py-28">
      <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-nostalgia-muted mb-4 border border-nostalgia-border rounded-full px-3 py-1">
        Sự kiện
      </span>
      <h1 className="font-serif text-4xl md:text-6xl font-bold text-nostalgia-cream mb-2">
        Ngày Hội Khoá
      </h1>
      <p className="text-nostalgia-text/40 mb-10">
        Chủ nhật, 24 tháng 5 năm 2026
      </p>

      <div className="bg-nostalgia-card rounded-2xl p-6 md:p-8 border border-nostalgia-border/60 mb-14">
        <CountdownTimer />
      </div>

      {/* Info cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-14">
        {[
          { label: "Địa điểm", value: "Sẽ được thông báo" },
          { label: "Dress code", value: "Áo trắng học sinh hoặc trang phục lịch sự" },
          { label: "Chi phí", value: "Sẽ được thông báo" },
          { label: "Liên hệ", value: "Xem trang Liên hệ" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-nostalgia-card rounded-xl p-5 border border-nostalgia-border/60"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-nostalgia-muted font-semibold">
              {item.label}
            </span>
            <p className="text-sm text-nostalgia-text/60 mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Schedule */}
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-nostalgia-cream mb-8">
        Lịch Trình Dự Kiến
      </h2>

      <div className="space-y-0">
        {schedule.map((item: { id: string; time: string; title: string; description?: string }, i: number) => (
          <div key={item.id} className="flex gap-4">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-nostalgia-primary shrink-0 mt-1.5 shadow-[0_0_8px_rgba(212,165,116,0.4)]" />
              {i < schedule.length - 1 && (
                <div className="w-px flex-1 bg-nostalgia-border" />
              )}
            </div>
            <div className="pb-8">
              <span className="text-sm font-bold text-nostalgia-primary">
                {item.time}
              </span>
              <h3 className="font-semibold text-nostalgia-cream">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm text-nostalgia-text/40 mt-1">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
