"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";


import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";
import SplashCursor from "@/components/shared/splash-cursor";

function HeroSection() {
  const ref = useRef(null);
  const [avatarList, setAvatarList] = useState<any>(null);

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
                <TextGenerateEffect words="Build a Classroom." className=" text-white" />
                <TextGenerateEffect
                  words="Brick by Brick"
                  delay={0.8}
                  className="font-instrument-serif italic tracking-tight text-teal-brand"
                />
              </h1>
              <motion.p {...bottomAnimation} className="max-w-2xl text-base sm:text-lg md:text-xl text-white/90">
                We believe that sustainable impact is built through transparency, participation, and measurable action one brick at a time.
              </motion.p>
            </div>
            <motion.div
              {...bottomAnimation}
              className="flex flex-col md:flex-row  gap-8"
            >
              <Button
                className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden"
                render={<Link href="/get-involved" />}
              >
                <span className="relative z-10 transition-all duration-500">
                  Join the Movement
                </span>
                <div className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </div>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
