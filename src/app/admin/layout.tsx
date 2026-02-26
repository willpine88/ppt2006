"use client";

import Sidebar from "@/components/admin/Sidebar";
import { MessageCircle } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50/80">
            <Sidebar />
            <main className="ml-[260px] transition-all duration-300">
                <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
                    {children}
                </div>
            </main>

            {/* Support Button */}
            <a
                href="https://t.me/cmssupport10xsolution"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-5 right-5 z-50 group"
                title="Hỗ trợ kỹ thuật"
            >
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full pl-3 pr-3 py-2 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 opacity-60 hover:opacity-100">
                    <MessageCircle size={14} className="text-gray-400 group-hover:text-blue-500 transition-colors shrink-0" />
                    <span className="text-[11px] text-gray-400 group-hover:text-gray-600 font-medium transition-colors hidden sm:inline">
                        Hỗ trợ
                    </span>
                </div>
            </a>
        </div>
    );
}
