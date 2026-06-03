"use client";

import { useState, useEffect } from "react";

export default function Countdown({
  targetDateTime,
}: {
  targetDateTime?: string | null;
}) {
  if (!targetDateTime) return null;
  const target = new Date(targetDateTime).getTime();

  const [timeLeft, setTimeLeft] = useState<{
    d: number;
    h: number;
    m: number;
    s: number;
  } | null>(null);

  useEffect(() => {
    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!timeLeft) return null;

  const items = [
    { value: timeLeft.d, label: "d" },
    { value: timeLeft.h, label: "h" },
    { value: timeLeft.m, label: "m" },
    { value: timeLeft.s, label: "s" },
  ];

  return (
    <div className="flex items-center gap-3 sm:gap-5">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-3 sm:gap-5">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tabular-nums leading-none">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-xs sm:text-sm text-white/60 mt-1 uppercase tracking-widest">
              {item.label}
            </span>
          </div>
          {i < items.length - 1 && (
            <span className="text-3xl sm:text-5xl md:text-6xl font-bold text-white/40 leading-none">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
