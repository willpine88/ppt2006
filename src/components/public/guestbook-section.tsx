"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface GuestbookEntry {
  id: string;
  author_name: string;
  class_name?: string;
  message: string;
  created_at: string;
}

export function GuestbookSection() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    supabase
      .from("guestbook")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setEntries(data);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSending(true);
    try {
      const { error } = await supabase.from("guestbook").insert({
        author_name: name.trim(),
        class_name: className.trim() || null,
        message: message.trim(),
      });
      if (!error) {
        setSent(true);
        setName("");
        setClassName("");
        setMessage("");
      }
    } catch {
      // silent
    } finally {
      setSending(false);
    }
  }

  return (
    <section>
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-nostalgia-cream mb-3 text-center">
        Sổ Lưu Bút Online
      </h2>
      <p className="text-center text-nostalgia-text/40 text-sm mb-10">
        Viết vài dòng gửi bạn cũ, thầy cô nhé! (Lời nhắn sẽ hiển thị sau khi
        được BTC duyệt)
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-nostalgia-card rounded-xl p-6 border border-nostalgia-border/60 mb-10 max-w-lg mx-auto"
      >
        {sent && (
          <div className="bg-nostalgia-accent/10 text-nostalgia-primary text-sm rounded-lg p-3 mb-4 border border-nostalgia-accent/20">
            Gửi thành công! Lời nhắn sẽ hiển thị sau khi được duyệt.
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-nostalgia-text/50 mb-1">
              Họ tên *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-nostalgia-bg border border-nostalgia-border rounded-lg px-3 py-2.5 text-sm text-nostalgia-text focus:outline-none focus:ring-2 focus:ring-nostalgia-primary/30 focus:border-nostalgia-primary/40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-nostalgia-text/50 mb-1">
              Lớp
            </label>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full bg-nostalgia-bg border border-nostalgia-border rounded-lg px-3 py-2.5 text-sm text-nostalgia-text focus:outline-none focus:ring-2 focus:ring-nostalgia-primary/30 focus:border-nostalgia-primary/40"
            >
              <option value="">-- Chọn lớp --</option>
              {["12A1", "12A2", "12A3", "12A4", "12A5", "12A6", "12A7"].map(
                (c) => (
                  <option key={c} value={c}>{c}</option>
                )
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-nostalgia-text/50 mb-1">
              Lời nhắn *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full bg-nostalgia-bg border border-nostalgia-border rounded-lg px-3 py-2.5 text-sm text-nostalgia-text focus:outline-none focus:ring-2 focus:ring-nostalgia-primary/30 focus:border-nostalgia-primary/40 resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-gradient-to-r from-nostalgia-primary to-nostalgia-secondary text-nostalgia-bg rounded-full py-3 text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {sending ? "Đang gửi..." : "Gửi lời nhắn"}
          </button>
        </div>
      </form>

      {/* Entries */}
      {entries.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-nostalgia-card rounded-xl p-5 border border-nostalgia-border/60"
            >
              <p className="text-sm text-nostalgia-text/60 leading-relaxed italic">
                &ldquo;{entry.message}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-nostalgia-text/30">
                <span className="font-semibold text-nostalgia-primary">
                  {entry.author_name}
                </span>
                {entry.class_name && <span>— {entry.class_name}</span>}
                <span className="ml-auto">
                  {new Date(entry.created_at).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
