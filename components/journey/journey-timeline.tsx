"use client";

import { useRef } from "react";
import { motion } from "motion/react";

interface Milestone {
  day: number;
  label: string;
  icon: string;
  color: string;
}

const MILESTONES: Milestone[] = [
  { day: 1, label: "Joined Movement", icon: "🏃", color: "from-blue-600 to-blue-400" },
  { day: 7, label: "10KM Reached", icon: "🏅", color: "from-emerald-600 to-emerald-400" },
  { day: 14, label: "Brick Specialist", icon: "🧱", color: "from-purple-600 to-purple-400" },
  { day: 21, label: "Kilifi Architect", icon: "📐", color: "from-amber-600 to-amber-400" },
  { day: 30, label: "Race Day", icon: "🎯", color: "from-red-600 to-red-400" },
];

function JourneyTimeline({ currentDay }: { currentDay: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-4">
        Journey Timeline
      </p>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {MILESTONES.map((m) => {
          const unlocked = currentDay >= m.day;
          return (
            <motion.div
              key={m.day}
              whileHover={{ y: -4 }}
              className={`shrink-0 w-56 rounded-xl border overflow-hidden transition-opacity ${
                unlocked ? "border-border" : "border-border opacity-50"
              }`}
            >
              <div
                className={`h-28 flex items-center justify-center bg-gradient-to-br ${m.color}`}
              >
                <span className="text-4xl">{m.icon}</span>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  Day {m.day}
                </p>
                <p className="text-sm font-bold text-foreground mt-1">{m.label}</p>
                <span
                  className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    unlocked
                      ? "bg-emerald-500/20 text-emerald-500"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {unlocked ? "Unlocked" : "Locked"}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default JourneyTimeline;
