"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";
import { Button } from "@/components/ui/button";
import { event } from "@/data/pages/run";

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

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground font-instrument-serif italic tracking-tight text-navy">
        {value}
      </span>
      <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mt-2">
        {label}
      </span>
    </div>
  );
}

function Countdown({ targetDate = event.date }: CountdownProps) {
  const [time, setTime] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeRemaining(targetDate));
    const timer = setInterval(() => {
      setTime(getTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="w-full bg-background py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-foreground text-white text-sm font-medium mb-6">
            Upcoming Event
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-[56px] leading-tight font-normal text-foreground font-sans mb-4">
            <TextGenerateEffect words={event.title} />
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {event.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 mb-12"
        >
          <CountdownUnit value={time.days} label="Days" />
          <CountdownUnit value={time.hours} label="Hours" />
          <CountdownUnit value={time.minutes} label="Minutes" />
          <CountdownUnit value={time.seconds} label="Seconds" />
        </motion.div>

        <motion.div>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 mb-12">
            <div>
              <p className="text-lg font-medium text-foreground">
                {event.dateFormatted}
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">{event.time}</p>
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">
                {event.location}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <Link href="/run">
            <Button className="rounded-full h-12 px-8 bg-foreground text-white hover:bg-foreground/90">
              Register Now
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" className="rounded-full h-12 px-8">
              Learn More
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Countdown;