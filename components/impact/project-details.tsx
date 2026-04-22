"use client";

import { motion } from "motion/react";

interface ProjectDetailsProps {
  title: string;
  description: string;
  tag?: string;
}

function ProjectDetails({ title, description, tag }: ProjectDetailsProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl md:text-3xl font-normal text-foreground leading-tight">
        {title}
      </h1>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      {tag && (
        <span className="inline-flex items-center px-3 py-1.5 bg-primary text-white text-xs rounded w-fit truncate max-w-full">
          {tag}
        </span>
      )}
    </div>
  );
}

export default ProjectDetails;