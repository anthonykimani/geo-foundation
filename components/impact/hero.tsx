"use client";

import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight font-normal text-foreground font-sans mb-8">
            <TextGenerateEffect words={title || "PROVEN TRANSPARENCY. MEASURABLE IMPACT."} />
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            {subtitle ||
              "Every transaction on this platform is verifiable. Explore the direct conversion of community effort into physical infrastructure across multiple sectors."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;