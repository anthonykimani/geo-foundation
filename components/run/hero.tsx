"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Img4 } from "@/constants/img";

interface HeroProps {
  eventDate?: string;
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
      <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-instrument-serif italic tracking-tight">
        {value}
      </span>
      <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mt-1">
        {label}
      </span>
    </div>
  );
}

function Hero({ eventDate = "SEP 06, 2026 | TIGOI, KENYA" }: HeroProps) {
  const targetDate = "2026-09-06T07:00:00";
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full border border-border text-sm font-medium mb-6">
              NEXT EVENT: {eventDate}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-tight font-normal text-foreground font-sans text-left">
              THE<br />
              <span className="text-primary">5KM = 1 BRICK</span><br />
              CHALLENGE
            </h1>

            <p className="text-lg text-muted-foreground mt-8 max-w-[500px] leading-relaxed">
              You don&apos;t need money to build a school. You just need momentum. Register for the annual run, hook up your tracker, and let the Engine convert your mileage into physical structural blocks.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-start items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 mt-10"
            >
              <CountdownUnit value={time.days} label="Days" />
              <CountdownUnit value={time.hours} label="Hours" />
              <CountdownUnit value={time.minutes} label="Minutes" />
              <CountdownUnit value={time.seconds} label="Seconds" />
            </motion.div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="text-lg font-medium text-foreground">Sept 6th, 2026</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Time</p>
                  <p className="text-lg font-medium text-foreground">7:00 AM</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="text-lg font-medium text-foreground">Tigoi Primary</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden"
          >
            <Image
              src={Img4.src}
              alt="5KM Run"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;