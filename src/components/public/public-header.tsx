"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Trang chủ" },
  { href: "/ve-chung-toi", label: "Về chúng tôi" },
  { href: "/su-kien", label: "Sự kiện" },
  { href: "/lop/12a1", label: "Các lớp" },
  { href: "/thu-vien", label: "Thư viện ảnh" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-nostalgia-bg/80 backdrop-blur-xl border-b border-nostalgia-border/60">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="font-serif text-xl font-bold text-nostalgia-primary tracking-wide">
          PPT 2006
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-nostalgia-text/70 hover:text-nostalgia-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-nostalgia-text/70"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-nostalgia-border/40 bg-nostalgia-bg/95 backdrop-blur-xl">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm text-nostalgia-text/70 hover:text-nostalgia-primary hover:bg-nostalgia-card/50 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
