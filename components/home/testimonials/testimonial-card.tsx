"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface TestimonialCardProps {
  quote: string;
  detail: string;
  author: string;
  image: string;
  animationIndex?: number;
}

function TestimonialCard({
  quote,
  detail,
  author,
  image,
  animationIndex = 0,
}: TestimonialCardProps) {
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
      className="bg-[#f6f6f6] rounded-[24px] overflow-hidden h-full"
    >
      <div className="relative w-full aspect-[507/335] shrink-0">
        <Image src={image} alt={author} fill className="object-cover" />
      </div>

      <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
        <h3 className="text-lg sm:text-xl font-medium text-foreground">{quote}</h3>
        <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">{detail}</p>
        <p className="text-sm sm:text-base text-foreground">- {author}</p>
      </div>
    </motion.div>
  );
}

export default TestimonialCard;