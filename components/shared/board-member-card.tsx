"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { getImageUrl } from "@/lib/sanity";

interface BoardMemberCardProps {
  id?: string;
  name: string;
  image?: string | any;
  title?: string;
  bio?: string;
  animationIndex?: number;
  linkPrefix?: string;
}

function BoardMemberCard({
  id,
  name,
  image,
  title,
  bio,
  animationIndex = 0,
  linkPrefix = "/contact",
}: BoardMemberCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const bottomAnimation = {
    initial: { y: 30, opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 },
    transition: { duration: 0.4, delay: animationIndex * 0.05 },
  };

  const imageSrc = getImageUrl(image);

  const cardContent = (
    <motion.div
      ref={ref}
      {...bottomAnimation}
      className="w-full rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm"
    >
      <div className="relative w-full h-[280px] overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-4xl text-gray-400">{name.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-base font-semibold text-foreground mb-1">{name}</p>
        {title && (
          <p className="text-sm text-muted-foreground">{title}</p>
        )}
        {bio && (
          <p className="text-xs text-muted-foreground/60 mt-2 line-clamp-2">{bio}</p>
        )}
      </div>
    </motion.div>
  );

  if (id && linkPrefix) {
    return <Link href={`${linkPrefix}/${id}`}>{cardContent}</Link>;
  }

  return cardContent;
}

export default BoardMemberCard;
