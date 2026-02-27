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
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl font-bold text-nostalgia-secondary mb-2 text-center">
        Ngày Hội Khoá
      </h1>
      <p className="text-center text-nostalgia-text/60 mb-10">
        Chủ nhật, 24 tháng 5 năm 2026
      </p>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-nostalgia-accent/20 mb-12">
        <CountdownTimer />
      </div>

      {/* Info cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {[
          { label: "Địa điểm", value: "Sẽ được thông báo" },
          { label: "Dress code", value: "Áo trắng học sinh (nếu còn vừa 😄) hoặc trang phục lịch sự" },
          { label: "Chi phí", value: "Sẽ được thông báo" },
          { label: "Liên hệ", value: "Xem trang Liên hệ" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-nostalgia-accent/5 rounded-xl p-4 border border-nostalgia-accent/15"
          >
            <span className="text-xs uppercase tracking-wider text-nostalgia-primary font-semibold">
              {item.label}
            </span>
            <p className="text-sm text-nostalgia-text/80 mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Schedule */}
      <h2 className="font-serif text-2xl font-bold text-nostalgia-secondary mb-6">
        Lịch Trình Dự Kiến
      </h2>

      <div className="space-y-0">
        {schedule.map((item: { id: string; time: string; title: string; description?: string }, i: number) => (
          <div key={item.id} className="flex gap-4">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-nostalgia-primary shrink-0 mt-1.5" />
              {i < schedule.length - 1 && (
                <div className="w-px flex-1 bg-nostalgia-accent/30" />
              )}
            </div>
            <div className="pb-8">
              <span className="text-sm font-bold text-nostalgia-primary">
                {item.time}
              </span>
              <h3 className="font-semibold text-nostalgia-secondary">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm text-nostalgia-text/60 mt-1">
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
