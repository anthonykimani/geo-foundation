"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import DonationModal from "@/components/shared/donation-modal";
import { HeartIcon } from "@phosphor-icons/react";

interface Project {
  title: string;
  subtitle: string;
  bricksRaised: number;
  targetBricks: number;
  image: string;
}

interface FeaturedProjectProps {
  project: Project;
  animationIndex?: number;
}

function AnimatedNumber({
  value,
  inView,
}: {
  value: number;
  inView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * value);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, inView]);

  return <span>{displayValue.toLocaleString()}</span>;
}

function FeaturedProject({ project, animationIndex = 0 }: FeaturedProjectProps) {
  const ref = useRef(null);
  const [donateOpen, setDonateOpen] = useState(false);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const bottomAnimation = {
    initial: { y: 50, opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 },
    transition: { duration: 0.8, delay: 0.2 + animationIndex * 0.2 },
  };

  const progressPercentage = Math.min(
    (project.bricksRaised / project.targetBricks) * 100,
    100
  );

  return (
    <motion.div ref={ref} {...bottomAnimation} className="mb-10 sm:mb-12 md:mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0">
        <div className="relative w-full h-[380px] md:h-[400px] lg:h-[680px] rounded-[24px] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain"
          />
        </div>

        <div className="bg-[#f6f6f6] dark:bg-white/5 p-6 sm:p-8 md:p-10 lg:p-10 rounded-r-[24px] flex flex-col justify-between">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-[40px] leading-tight font-normal text-foreground">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {project.subtitle}
            </p>
          </div>

          <div className="">
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-foreground">
                <AnimatedNumber value={project.bricksRaised} inView={inView} /> Bricks
                Raised
              </span>
              <span className="text-foreground">
                {project.targetBricks.toLocaleString()} Targeted Bricks
              </span>
            </div>

            <div className="relative w-full h-[41px] bg-[#efeaea] dark:bg-white/10 rounded-[55px] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full bg-[#ea3c58] rounded-[32px]"
              />
            </div>
          </div>
          <Button
            onClick={() => setDonateOpen(true)}
            className="bg-primary text-white rounded-full text-lg px-8 py-6 gap-2"
          >
            <HeartIcon size={24} weight="fill" className="text-white" />
            Donate
          </Button>
          <DonationModal open={donateOpen} onOpenChange={setDonateOpen} />
        </div>
      </div>
    </motion.div>
  );
}

export default FeaturedProject;