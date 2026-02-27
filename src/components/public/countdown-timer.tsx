"use client";

import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2026-05-24T08:00:00+07:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <span className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold bg-gradient-to-b from-nostalgia-primary via-nostalgia-secondary to-nostalgia-accent bg-clip-text text-transparent drop-shadow-lg">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] md:text-xs text-nostalgia-muted mt-2 uppercase tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="text-3xl md:text-5xl lg:text-6xl font-serif text-nostalgia-accent/40 self-start mt-1 md:mt-2">
      :
    </span>
  );
}

export function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(calcTimeLeft());
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) {
    return (
      <div className="flex gap-4 md:gap-8 justify-center py-4">
        {["Ngày", "Giờ", "Phút", "Giây"].map((l) => (
          <TimeBox key={l} value={0} label={l} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 md:gap-6 lg:gap-8 justify-center items-start py-4">
      <TimeBox value={time.days} label="Ngày" />
      <Separator />
      <TimeBox value={time.hours} label="Giờ" />
      <Separator />
      <TimeBox value={time.minutes} label="Phút" />
      <Separator />
      <TimeBox value={time.seconds} label="Giây" />
    </div>
  );
}
