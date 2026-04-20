"use client";

import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";

interface HeaderProps {
  title: string;
  subtitle: string;
  animationIndex?: number;
}

function Header({ title, subtitle, animationIndex = 0 }: HeaderProps) {
  const bottomAnimation = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, delay: 0.2 + animationIndex * 0.2 },
  };

  return (
    <motion.div {...bottomAnimation} className="mb-8 sm:mb-12 md:mb-16 text-center">
      <h1>
        <TextGenerateEffect
          words={title}
          className="text-3xl sm:text-4xl md:text-[56px] leading-tight font-normal text-foreground font-sans"
        />
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-muted-foreground mt-2">
        {subtitle}
      </p>
    </motion.div>
  );
}

export default Header;