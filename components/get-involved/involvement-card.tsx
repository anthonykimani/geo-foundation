"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

interface InvolvementCardProps {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  animationIndex?: number;
}

function InvolvementCard({
  icon,
  title,
  description,
  buttonText,
  variant = "primary",
  onClick,
  animationIndex = 0,
}: InvolvementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: animationIndex * 0.1 }}
      viewport={{ once: true }}
      className="p-8 sm:p-10 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex flex-col"
    >
      <div className="text-5xl mb-6">{icon}</div>
      <h3 className="text-xl md:text-2xl font-normal text-foreground mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 flex-grow">{description}</p>
      {variant === "primary" && (
        <Button onClick={onClick} className="w-full bg-primary text-white hover:bg-primary/90">
          {buttonText}
        </Button>
      )}
      {variant === "secondary" && (
        <Button onClick={onClick} variant="outline" className="w-full">
          {buttonText}
        </Button>
      )}
      {variant === "outline" && (
        <Button onClick={onClick} variant="outline" className="w-full">
          {buttonText}
        </Button>
      )}
    </motion.div>
  );
}

export default InvolvementCard;