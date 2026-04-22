"use client";

import { motion } from "motion/react";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface HowItWorksProps {
  steps?: Step[];
  title?: string;
}

function HowItWorks({
  steps = [],
  title = "HOW IT WORKS",
}: HowItWorksProps) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-8">
        {title}
      </h2>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold">
              {step.number}
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;