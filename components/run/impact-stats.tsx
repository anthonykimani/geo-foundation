"use client";

import { motion } from "motion/react";

function ImpactStats() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 MD:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-4">
            Our Impact Over The Years
          </h2>
          <p className="text-lg text-muted-foreground">
            Over the past three years, the GEM Run has raised a total of $21,165
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-primary/10 rounded-xl p-6 text-center"
          >
            <p className="text-3xl font-bold text-primary mb-2">2022</p>
            <p className="text-2xl font-bold text-foreground">$10,000</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-primary/10 rounded-xl p-6 text-center"
          >
            <p className="text-3xl font-bold text-primary mb-2">2023</p>
            <p className="text-2xl font-bold text-foreground">$6,520</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-primary/10 rounded-xl p-6 text-center"
          >
            <p className="text-3xl font-bold text-primary mb-2">2024</p>
            <p className="text-2xl font-bold text-foreground">$4,645</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-primary rounded-xl p-6 text-center"
          >
            <p className="text-3xl font-bold text-white mb-2">2026 Goal</p>
            <p className="text-2xl font-bold text-white">$8,000</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg text-muted-foreground">
            Our goal for 2026 is $8,000 – funds that will go directly toward enhancing educational facilities at Tigoi Primary School.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default ImpactStats;