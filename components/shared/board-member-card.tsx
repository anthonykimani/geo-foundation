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
      className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group bg-gray-100"
    >
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-base font-semibold text-white mb-1">{name}</p>
        {title && (
          <p className="text-sm text-white/80 line-clamp-2">{title}</p>
        )}
        {bio && (
          <p className="text-xs text-white/60 mt-2 line-clamp-2">{bio}</p>
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
