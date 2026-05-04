"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { LinkedinLogoIcon, TwitterLogoIcon } from "@phosphor-icons/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getImageUrl } from "@/lib/sanity";

interface TeamCardProps {
  member: {
    _id?: string;
    name: string;
    title: string;
    image?: string | any;
    linkedin?: string;
    twitter?: string;
    bio?: string;
  };
  animationIndex?: number;
}

function TeamCard({ member, animationIndex = 0 }: TeamCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const bottomAnimation = {
    initial: { y: 20, opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 },
    transition: { duration: 0.3 },
  };

  const imageUrl = getImageUrl(member.image);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <motion.div
          ref={ref}
          {...bottomAnimation}
          className="flex flex-col items-center p-4 cursor-pointer group"
        >
          <div className="relative w-full aspect-square rounded-full overflow-hidden mb-4 max-w-[180px] group-hover:scale-105 transition-transform duration-300">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs">No image</span>
              </div>
            )}
          </div>

          <div className="text-center space-y-1">
            <h3 className="text-lg font-medium text-foreground">{member.name}</h3>
            <p className="text-sm text-primary">{member.title}</p>
          </div>

          <div className="flex items-center gap-4 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <LinkedinLogoIcon size={16} />
              </a>
            )}
            {member.twitter && (
              <a
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <TwitterLogoIcon size={16} />
              </a>
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click to view profile
          </p>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="center">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={member.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <div>
              <h4 className="font-medium text-foreground">{member.name}</h4>
              <p className="text-sm text-primary">{member.title}</p>
            </div>
          </div>
          {member.bio && (
            <p className="text-sm text-muted-foreground">{member.bio}</p>
          )}
          <div className="flex items-center gap-3 pt-2">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <LinkedinLogoIcon size={18} />
              </a>
            )}
            {member.twitter && (
              <a
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <TwitterLogoIcon size={18} />
              </a>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default TeamCard;