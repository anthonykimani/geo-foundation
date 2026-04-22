"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";

interface NewsItem {
  label: string;
  title: string;
  date: string;
  image: string;
}

interface NewsCardProps {
  news: NewsItem;
  animationIndex?: number;
}

function NewsCard({ news, animationIndex = 0 }: NewsCardProps) {
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
      className="bg-[#f6f6f6] dark:bg-white/5 rounded-[24px] overflow-hidden"
    >
      <div className="relative w-full h-[200px] sm:h-[250px]">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 sm:p-6 space-y-3">

        <h3 className="text-xl sm:text-2xl font-normal text-foreground">
          {news.title}
        </h3>

        <p className="text-sm sm:text-base text-muted-foreground">{news.date}</p>
      </div>
    </motion.div>
  );
}

export default NewsCard;