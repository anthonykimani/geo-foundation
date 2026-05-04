"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

async function getRunPageData() {
  const { getRunPage } = await import("@/lib/sanity/queries");
  return getRunPage();
}

function ImpactStats() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getRunPageData()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const impactStats = data || {
    impactStatsTitle: "Our Impact",
    impactStatsSubtitle: "See how your support makes a difference.",
    years: [],
    goalDescription: "Help us reach our goal."
  };

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-4">
            {impactStats.impactStatsTitle || "Our Impact"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {impactStats.impactStatsSubtitle || "See how your support makes a difference."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {(impactStats.years || []).map((yearData: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={
                yearData.isGoal
                  ? "bg-primary rounded-xl p-6 text-center"
                  : "bg-primary/10 rounded-xl p-6 text-center"
              }
            >
              <p
                className={
                  yearData.isGoal
                    ? "text-3xl font-bold text-white mb-2"
                    : "text-3xl font-bold text-primary mb-2"
                }
              >
                {yearData.year}
              </p>
              <p
                className={
                  yearData.isGoal
                    ? "text-2xl font-bold text-white"
                    : "text-2xl font-bold text-foreground"
                }
              >
                {yearData.amount}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg text-muted-foreground">
            {impactStats.goalDescription || "Help us reach our goal."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default ImpactStats;