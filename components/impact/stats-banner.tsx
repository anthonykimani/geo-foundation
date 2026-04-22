"use client";

import { motion } from "motion/react";

interface StatItem {
  value: string | number;
  label: string;
}

interface StatsBannerProps {
  stats?: StatItem[];
}

function StatsBanner({ stats = [] }: StatsBannerProps) {
  const defaultStats = [
    { value: "0", label: "TOTAL BRICKS DEPLOYED" },
    { value: "4", label: "ACTIVE REGIONAL PROJECTS" },
    { value: "1,200+", label: "STUDENTS IMPACTED" },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <section className="py-10">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <div className="flex flex-wrap justify-around gap-8 p-10 bg-white/5 backdrop-blur-sm rounded-[24px] border border-white/10">
          {displayStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-instrument-serif italic tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsBanner;