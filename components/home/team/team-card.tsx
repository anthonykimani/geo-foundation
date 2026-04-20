"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { LinkedinLogoIcon, TwitterLogoIcon } from "@phosphor-icons/react";

interface TeamMember {
  name: string;
  title: string;
  image: string;
  linkedin?: string;
  twitter?: string;
}

interface TeamCardProps {
  member: TeamMember;
  animationIndex?: number;
}

function TeamCard({ member, animationIndex = 0 }: TeamCardProps) {
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
      className="flex flex-col items-center"
    >
      <div className="relative w-full aspect-square rounded-full overflow-hidden mb-4 max-w-[224px]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="text-center space-y-1">
        <h3 className="text-lg font-medium text-foreground">{member.name}</h3>
        <p className="text-sm text-[#236bf4]">{member.title}</p>
        <p className="text-sm text-muted-foreground">View Profile</p>
      </div>

      <div className="flex items-center gap-4 mt-3">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
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
          >
            <TwitterLogoIcon size={16} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default TeamCard;