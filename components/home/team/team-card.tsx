"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { LinkedinLogoIcon, TwitterLogoIcon } from "@phosphor-icons/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface TeamMember {
  name: string;
  title: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  bio?: string;
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
      className="flex flex-col items-center p-4"
    >
      <div className="relative w-full aspect-square rounded-full overflow-hidden mb-4 max-w-[180px]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="text-center space-y-1">
        <h3 className="text-lg font-medium text-foreground">{member.name}</h3>
        <p className="text-sm text-primary">{member.title}</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="link" className="text-sm text-muted-foreground h-auto p-0">
              View Profile
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="center">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
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