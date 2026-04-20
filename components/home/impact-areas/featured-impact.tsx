"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface FeaturedImpactProps {
  label: string;
  title: string;
  description: string;
  image: string;
  animationIndex?: number;
}

function FeaturedImpact({
  label,
  title,
  description,
  image,
  animationIndex = 0,
}: FeaturedImpactProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const bottomAnimation = {
    initial: { y: 50, opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 },
    transition: { duration: 0.8, delay: 0.2 + animationIndex * 0.2 },
  };

  return (
    <motion.div
      ref={ref}
      {...bottomAnimation}
      className="relative w-full h-[350px] sm:h-[400px] md:h-[445px] rounded-[24px] overflow-hidden mb-10 sm:mb-12 md:mb-16"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-top"
      />

      <div className="absolute inset-0 bg-black/30 p-6 sm:p-8 md:p-10 flex flex-col justify-end">
        <div className="max-w-[805px]">
          <span className="inline-block px-3 py-1.5 bg-white text-foreground text-sm rounded-[8px] mb-3">
            {label}
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-[40px] leading-tight font-normal text-white mb-2">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-white/80 max-w-[767px]">
            {description}
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 sm:bottom-10 right-8 sm:right-10 flex gap-2">
        <div className="w-2.5 h-1 bg-white rounded-full" />
        <div className="w-1.5 h-1 bg-white/50 rounded-full" />
        <div className="w-1.5 h-1 bg-white/50 rounded-full" />
        <div className="w-1.5 h-1 bg-white/50 rounded-full" />
      </div>
    </motion.div>
  );
}

export default FeaturedImpact;