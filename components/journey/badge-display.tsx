"use client";

import { BADGES } from "@/lib/journey";

function BadgeDisplay({ unlocked }: { unlocked: string[] }) {
  const all = Object.entries(BADGES);

  if (all.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {all.map(([key, badge]) => {
        const has = unlocked.includes(key);
        return (
          <span
            key={key}
            title={badge.name}
            className={`text-lg transition-opacity ${has ? "opacity-100" : "opacity-25 grayscale"}`}
          >
            {badge.icon}
          </span>
        );
      })}
    </div>
  );
}

export default BadgeDisplay;
