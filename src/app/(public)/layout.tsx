import type { Metadata } from "next";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";

export const metadata: Metadata = {
  title: {
    default: "Hội Khoá 20 Năm — THPT Phạm Phú Thứ (2006)",
    template: "%s | Hội Khoá PPT 2006",
  },
  description:
    "Website hội khoá 20 năm trường THPT Phạm Phú Thứ, Đà Nẵng — Niên khoá 2003-2006. Ngày hội ngộ: 24/05/2026.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-nostalgia-bg text-nostalgia-text font-sans">
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
}
