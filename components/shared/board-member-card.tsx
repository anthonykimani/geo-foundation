"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface BoardMemberCardProps {
  name: string;
  image: string;
  title?: string;
  bio?: string;
  animationIndex?: number;
}

function BoardMemberCard({
  name,
  image,
  title,
  bio,
  animationIndex = 0,
}: BoardMemberCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const bottomAnimation = {
    initial: { y: 30, opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 },
    transition: { duration: 0.4, delay: animationIndex * 0.05 },
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <motion.div
          ref={ref}
          {...bottomAnimation}
          className="relative w-full aspect-square rounded-[20px] overflow-hidden cursor-pointer group"
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-sm font-medium text-white truncate">{name}</p>
            {title && (
              <p className="text-xs text-white/70 truncate">{title}</p>
            )}
          </div>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="center">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={image}
                alt={name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{name}</h4>
              {title && (
                <p className="text-sm text-primary">{title}</p>
              )}
            </div>
          </div>
          {bio && (
            <p className="text-sm text-muted-foreground">{bio}</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default BoardMemberCard;