"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { getImageUrl } from "@/lib/sanity";

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

async function getRunPageData() {
  const { getRunPage } = await import("@/lib/sanity/queries");
  return getRunPage();
}

function Hero() {
  const [data, setData] = useState<any>(null);
  const [time, setTime] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    getRunPageData()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  useEffect(() => {
    if (!data?.date) return;
    setMounted(true);
    setTime(getTimeRemaining(data.date));
    const timer = setInterval(() => {
      setTime(getTimeRemaining(data.date));
    }, 1000);
    return () => clearInterval(timer);
  }, [data?.date]);

  const badgeText = data?.badgeText || "5KM Run";
  const displayDate = data?.displayDate || "";
  const eventTitle = data?.eventTitle || "Run for Education";
  const heroHighlight = data?.heroHighlight || "Brick by Brick";
  const heroSubtitle = data?.heroSubtitle || "Building Futures";
  const heroDescription = data?.heroDescription || "";
  const heroImage = data?.heroImage;
  const heroImageUrl = getImageUrl(heroImage);
  const dateFormatted = data?.dateFormatted || "";
  const timeValue = data?.time || "";
  const locationShort = data?.locationShort || "";

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
              {badgeText}: {displayDate}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-tight font-normal text-foreground font-sans text-left">
              {eventTitle}
              <br />
              <span className="text-primary">{heroHighlight}</span>
              <br />
              {heroSubtitle}
            </h1>

            <p className="text-lg text-muted-foreground mt-8 max-w-[500px] leading-relaxed">
              {heroDescription}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-start items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 mt-10"
            >
              {mounted && (
                <>
                  <CountdownUnit value={time.days} label="Days" />
                  <CountdownUnit value={time.hours} label="Hours" />
                  <CountdownUnit value={time.minutes} label="Minutes" />
                  <CountdownUnit value={time.seconds} label="Seconds" />
                </>
              )}
            </motion.div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="text-lg font-medium text-foreground">{dateFormatted}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Time</p>
                  <p className="text-lg font-medium text-foreground">{timeValue}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="text-lg font-medium text-foreground">{locationShort}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-[680px] md:h-[800px] lg:h-[1080px] rounded-xl overflow-hidden"
          >
            {heroImageUrl ? (
              <Image
                src={heroImageUrl}
                alt="5KM Run"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;