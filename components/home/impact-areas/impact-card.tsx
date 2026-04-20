"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface ImpactCardProps {
  label: string;
  title: string;
  image: string;
  animationIndex?: number;
}

function ImpactCard({
  label,
  title,
  image,
  animationIndex = 0,
}: ImpactCardProps) {
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
      className="relative w-full h-[300px] sm:h-[350px] md:h-[445px] rounded-[24px] overflow-hidden"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 sm:p-6 flex flex-col justify-end">
        <span className="inline-block px-3 py-1.5 bg-white text-foreground text-sm rounded-[8px] w-fit mb-2">
          {label}
        </span>

        <h3 className="text-xl sm:text-2xl font-normal text-white">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}

export default ImpactCard;