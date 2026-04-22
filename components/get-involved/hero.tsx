"use client";

import { motion } from "motion/react";

function Hero() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-foreground">
            THE MOVEMENT
          </h1>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            There are exactly 6 ways to fuel the Brick Engine. Pick your trajectory.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;