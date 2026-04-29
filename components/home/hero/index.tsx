"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";
import SplashCursor from "@/components/shared/splash-cursor";
import { heroSection } from "@/data/components/countdown";

const BRICKS_RAISED = heroSection.bricksRaised;
const TARGET_BRICKS = heroSection.targetBricks;

function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
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
  }, [inView, value]);

  return <span>{displayValue.toLocaleString()}</span>;
}

function HeroSection() {
  const ref = useRef(null);
  const [avatarList, setAvatarList] = useState<any>(null);
  const [inView, setInView] = useState(false);

  const progressPercentage = Math.min(
    (BRICKS_RAISED / TARGET_BRICKS) * 100,
    100
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/page-data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAvatarList(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const bottomAnimation = {
    initial: { y: "20%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.8 },
  };

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0 -z-1 pointer-events-none">
        <SplashCursor
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1440}
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
        />
      </div>
      <div className="relative hero-section-img h-screen bg-cover bg-center sm:bg-center w-full pt-28 sm:pt-40 md:pt-52 2xl:pb-20 pb-10">
        <div className="container relative z-10">
          <div className="flex flex-col max-w-xl gap-6 sm:gap-8">
            <div className="relative flex flex-col text-left items-start sm:gap-6 gap-4">
              <h1>
                <TextGenerateEffect words="Make an Impact" className="text-white whitespace-nowrap" />

              </h1>
              <h1><TextGenerateEffect
                words="Brick by Brick"
                delay={0.8}
                className="font-instrument-serif italic tracking-tight text-teal-brand "
              /></h1>
              <motion.p {...bottomAnimation} className="max-w-2xl text-base sm:text-lg md:text-xl text-white/90">
                We believe that sustainable impact is built through transparency, participation, and measurable action one brick at a time.
              </motion.p>
            </div>

            <motion.div {...bottomAnimation} className="mt-4">
              <div className="relative w-full h-[41px] bg-white/20 rounded-[55px] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-primary rounded-[32px]"
                />
              </div>

              <div className="flex justify-between text-sm sm:text-base text-white/90 mb-2">
                <span>
                  <AnimatedNumber value={BRICKS_RAISED} inView={inView} /> Bricks Raised
                </span>
                <span>
                  {TARGET_BRICKS.toLocaleString()} Targeted Bricks
                </span>
              </div>

            </motion.div>

            <motion.div
              {...bottomAnimation}
              className="flex flex-col md:flex-row gap-8"
            >
              <Link href="/get-involved">
              <Button
                className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden"
              >
                <span className="relative z-10 transition-all duration-500">
                  Join the Movement
                </span>
                <div className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </div>
              </Button>
            </Link>
            </motion.div>


          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;