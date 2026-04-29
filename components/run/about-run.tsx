"use client";

import { motion } from "motion/react";
import { aboutRun } from "@/data/pages/run";

function AboutRun() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
            {aboutRun.title}
          </h2>
          {aboutRun.description.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg text-muted-foreground leading-relaxed mb-6"
            >
              {paragraph}
            </p>
          ))}
          <p className="text-lg text-primary font-medium">
            {aboutRun.hashtags}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutRun;