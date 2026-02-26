import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "10x Solution CMS",
  description: "Hệ thống quản trị nội dung — 10x Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
