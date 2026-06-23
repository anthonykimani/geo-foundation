"use client";

import type { Level } from "@/lib/journey";

const LEVEL_STYLES: Record<Level, { bg: string; text: string; glow: string }> = {
  Beginner: { bg: "bg-[#6b7280]/20", text: "text-[#6b7280]", glow: "" },
  Active: { bg: "bg-[#3b82f6]/20", text: "text-[#3b82f6]", glow: "" },
  Runner: { bg: "bg-[#8b5cf6]/20", text: "text-[#8b5cf6]", glow: "" },
  Champion: {
    bg: "bg-[#f59e0b]/20",
    text: "text-[#f59e0b]",
    glow: "shadow-[0_0_10px_rgba(245,158,11,0.5)]",
  },
};

function LevelBadge({ level }: { level: Level }) {
  const style = LEVEL_STYLES[level];
  return (
    <span
      className={`inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded ${style.bg} ${style.text} ${style.glow}`}
    >
      {level}
    </span>
  );
}

export default LevelBadge;
