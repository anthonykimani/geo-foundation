"use client";

import { motion } from "motion/react";
import LevelBadge from "./level-badge";
import BadgeDisplay from "./badge-display";
import type { Level } from "@/lib/journey";

interface DashboardHeroProps {
  name: string;
  level: Level;
  streak: number;
  totalKm: number;
  badges: string[];
}

function DashboardHero({ name, level, streak, totalKm, badges }: DashboardHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-primary-foreground shrink-0">
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{name}</h1>
            <LevelBadge level={level} />
          </div>
          <div className="flex items-center gap-3 mt-1">
            {streak > 0 && (
              <span className="text-sm font-bold text-orange-500">
                🔥 {streak} {streak === 1 ? "day" : "days"} streak
              </span>
            )}
            <span className="text-sm text-muted-foreground">
              {totalKm.toFixed(1)} km total
            </span>
          </div>
          <div className="mt-2">
            <BadgeDisplay unlocked={badges} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardHero;
