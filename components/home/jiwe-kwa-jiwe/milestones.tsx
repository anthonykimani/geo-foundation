"use client";

import { motion } from "motion/react";

interface Milestone {
  title: string;
  description: string;
  target: number;
}

interface MilestonesProps {
  milestones?: Milestone[];
  currentBricks?: number;
  title?: string;
}

function Milestones({
  milestones = [],
  currentBricks = 0,
  title = "PROJECT MILESTONES",
}: MilestonesProps) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-8">
        {title}
      </h2>

      <div className="space-y-8">
        {milestones.map((milestone, index) => {
          const progress = Math.min((currentBricks / milestone.target) * 100, 100);
          const isComplete = progress >= 100;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-foreground font-medium">
                  {milestone.title}
                </span>
                <span
                  className={`text-sm font-medium ${
                    isComplete ? "text-teal-brand" : "text-muted-foreground"
                  }`}
                >
                  {progress.toFixed(1)}%
                </span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {milestone.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Milestones;