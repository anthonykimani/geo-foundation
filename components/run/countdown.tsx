"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";

interface CountdownProps {
  targetDate?: string;
}

function getTimeRemaining(targetDate: string) {
  const total = new Date(targetDate).getTime() - new Date().getTime();
  
  if (total <= 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return {
    days: days.toString().padStart(2, "0"),
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
}

const defaultConfig = {
  title: "Gladys Erude Memorial Run",
  subtitle: "Join us for our annual 5K charity run! Every step helps build classrooms for children in need.",
  targetDate: "2026-09-06T07:00:00",
};

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground font-instrument-serif italic tracking-tight">
        {value}
      </span>
      <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mt-2">
        {label}
      </span>
    </div>
  );
}

function RunCountdown({ targetDate = defaultConfig.targetDate }: CountdownProps) {
  const [time, setTime] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary text-white text-sm font-medium mb-6">
            Upcoming Event
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-[56px] leading-tight font-normal text-foreground font-sans mb-4">
            <TextGenerateEffect words={defaultConfig.title} />
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {defaultConfig.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 mb-12"
        >
          <CountdownUnit value={time.days} label="Days" />
          <CountdownUnit value={time.hours} label="Hours" />
          <CountdownUnit value={time.minutes} label="Minutes" />
          <CountdownUnit value={time.seconds} label="Seconds" />
        </motion.div>
      </div>
    </section>
  );
}

export default RunCountdown;