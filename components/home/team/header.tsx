"use client";

import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";

interface HeaderProps {
  label: string;
  title: string;
  animationIndex?: number;
}

function Header({ label, title, animationIndex = 0 }: HeaderProps) {
  const bottomAnimation = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, delay: 0.2 + animationIndex * 0.2 },
  };

  return (
    <motion.div {...bottomAnimation} className="text-center mb-8 sm:mb-12 md:mb-16">
      <span className="inline-block px-4 py-2 rounded-full border border-navy text-navy text-sm font-medium mb-4">
        {label}
      </span>
      <h1>
        <TextGenerateEffect
          words={title}
          className="text-3xl sm:text-4xl md:text-[56px] leading-tight font-normal text-foreground font-sans"
        />
      </h1>
    </motion.div>
  );
}

export default Header;