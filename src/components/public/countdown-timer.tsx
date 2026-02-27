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
      <span className="text-4xl md:text-6xl font-serif font-bold text-nostalgia-primary">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs md:text-sm text-nostalgia-text/60 mt-1 uppercase tracking-wider">
        {label}
      </span>
    </div>
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
      <div className="flex gap-6 md:gap-10 justify-center py-4">
        {["Ngày", "Giờ", "Phút", "Giây"].map((l) => (
          <TimeBox key={l} value={0} label={l} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-6 md:gap-10 justify-center py-4">
      <TimeBox value={time.days} label="Ngày" />
      <span className="text-4xl md:text-6xl font-serif text-nostalgia-accent self-start">:</span>
      <TimeBox value={time.hours} label="Giờ" />
      <span className="text-4xl md:text-6xl font-serif text-nostalgia-accent self-start">:</span>
      <TimeBox value={time.minutes} label="Phút" />
      <span className="text-4xl md:text-6xl font-serif text-nostalgia-accent self-start">:</span>
      <TimeBox value={time.seconds} label="Giây" />
    </div>
  );
}
