"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import ProjectDetails from "./project-details";
import ProjectProgress from "./project-progress";

interface ProjectCardData {
  id: number;
  title: string;
  description: string;
  raised: number;
  goal: number;
  date: string;
  author: string;
  image: string;
  tag?: string;
}

interface ProjectCardProps {
  project: ProjectCardData;
  animationIndex?: number;
}

function ProjectCard({ project, animationIndex = 0 }: ProjectCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const bottomAnimation = {
    initial: { y: 50, opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 },
    transition: { duration: 0.8, delay: 0.2 + animationIndex * 0.2 },
  };

  return (
    <Link href={`/impact/${project.id}`}>
      <motion.div
        ref={ref}
        {...bottomAnimation}
        className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col h-full"
      >
        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[311px] flex-shrink-0">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
        </div>

        <div className="p-4 sm:p-6 flex flex-col flex-grow">
          <ProjectDetails
            title={project.title}
            description={project.description}
            tag={project.tag}
          />

          <div className="mt-auto pt-4">
            <ProjectProgress raised={project.raised} goal={project.goal} />
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-muted-foreground">by {project.author}</span>
            <span className="text-xs text-muted-foreground">{project.date}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default ProjectCard;