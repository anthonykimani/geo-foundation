"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";
import { Button } from "@/components/ui/button";

interface StatItem {
  value: string | number;
  label: string;
  variant?: "default" | "primary";
}

interface HeroProps {
  stats?: StatItem[];
  title?: string;
  description?: string;
  primaryButton?: {
    text: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const isPrimary = stat.variant === "primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`text-center px-6 py-4 backdrop-blur-sm rounded-2xl ${
        isPrimary
          ? "bg-primary/10 border border-primary/30"
          : "bg-white/5 border border-white/10"
      }`}
    >
      <p
        className={`text-2xl md:text-3xl lg:text-6xl font-bold font-instrument-serif italic tracking-tight ${
          isPrimary ? "text-primary" : "text-foreground"
        }`}
      >
        {stat.value}
      </p>
      <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-1">
        {stat.label}
      </p>
    </motion.div>
  );
}

function Hero({
  stats = [],
  title = "THE TIGOI PRIMARY CLASSROOM BUILD",
  description = "We are mobilizing the community to construct new permanent educational structures in Kilifi. No more temporary structures. No more weather disruptions. Just a safe, structural environment for learning.",
  primaryButton = { text: "Donate To This Project" },
  secondaryButton = { text: "Join the Journey", href: "/journey" },
}: HeroProps) {
return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-border text-sm font-medium mb-6">
            MASTER CAMPAIGN
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight font-normal text-foreground font-sans mb-8">
            <TextGenerateEffect words={title} />
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>

          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="rounded-full h-12 px-8 bg-primary text-white hover:bg-primary/90">
              {primaryButton.text}
            </Button>
            <Link href={secondaryButton.href}>
              <Button variant="outline" className="rounded-full h-12 px-8">
                {secondaryButton.text}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;