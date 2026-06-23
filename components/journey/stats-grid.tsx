"use client";

import { motion } from "motion/react";

interface StatsGridProps {
  points: number;
  nextLevelPoints: number;
  bricks: number;
  daysToRace: number;
}

function StatsGrid({ points, nextLevelPoints, bricks, daysToRace }: StatsGridProps) {
  const progress = nextLevelPoints > 0 ? Math.min((points / nextLevelPoints) * 100, 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl bg-card p-5 border border-border"
      >
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">
          EXP Points
        </p>
        <p className="text-3xl font-bold text-foreground">{points}</p>
        <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-2xl bg-card p-5 border border-border"
      >
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">
          Bricks Earned
        </p>
        <p className="text-3xl font-bold text-foreground">{bricks}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {bricks === 1 ? "1 brick" : `${bricks} bricks`} toward the campaign
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-2xl bg-card p-5 border border-border"
      >
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">
          Race Countdown
        </p>
        <p className="text-3xl font-bold text-foreground">{daysToRace}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {daysToRace === 1 ? "1 day" : `${daysToRace} days`} to race day
        </p>
      </motion.div>
    </div>
  );
}

export default StatsGrid;
