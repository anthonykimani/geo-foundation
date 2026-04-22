"use client";

import { motion } from "motion/react";

interface ProjectProgressProps {
  raised: number;
  goal: number;
}

function ProjectProgress({ raised, goal }: ProjectProgressProps) {
  const progress = Math.min((raised / goal) * 100, 100);

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          Raised: {raised.toLocaleString()}KES
        </span>
        <span className="text-muted-foreground">
          Goal: {goal.toLocaleString()}KES
        </span>
      </div>

      <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-0 left-0 h-full bg-primary rounded-full"
        />
      </div>

      <span className="text-xs text-muted-foreground">{progress.toFixed(0)}%</span>
    </div>
  );
}

export default ProjectProgress;