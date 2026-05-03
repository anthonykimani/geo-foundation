"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";
import { Img8 } from "@/constants/img";
import { homeFeatures } from "@/data/pages/home";

function AboutHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const bottomAnimation = (index: number) => ({
    initial: { y: 50, opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 },
    transition: { duration: 0.8, delay: 0.2 + index * 0.2 },
  });

  return (
    <section ref={ref} className="w-full min-h-screen bg-background">
      <div className="container py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          {...bottomAnimation(0)}
          className="space-y-4 sm:space-y-6 mb-10 sm:mb-12 md:mb-16"
        >
          <Link href="/about">
            <Button
              variant="outline"
              className="rounded-full h-10.75 px-5 border-navy text-navy hover:bg-navy hover:text-white"
            >
              ABOUT US
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            <div>
              <h1 className="leading-tight md:leading-[0.7]">
                <TextGenerateEffect
                  words="Empowering Communities Through Education & Collective Action"
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] leading-0 font-normal text-foreground font-sans"
                />
              </h1>
            </div>

            <div className="space-y-4 sm:space-y-6 flex flex-col justify-around">
              <p className="text-base sm:text-lg text-muted-foreground">
                The Gladys Erude Organization is a community-driven nonprofit
                dedicated to expanding access to quality education through
                infrastructure development, health awareness initiatives, and
                youth empowerment programs.
              </p>

              <p className="text-base sm:text-lg text-foreground">
                We believe that sustainable impact is built through transparency,
                participation, and measurable action — one brick at a time.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...bottomAnimation(1)}
          className="relative w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[445px] mb-10 sm:mb-12 md:mb-16 overflow-hidden rounded-[24px]"
        >
          <Image
            src={Img8}
            alt="Gladys Erude Organization"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          {...bottomAnimation(2)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {homeFeatures.map((feature, index) => (
            <motion.div
              key={index}
              {...bottomAnimation(3 + index)}
              className="space-y-2"
            >
              <span className="text-lg sm:text-xl md:text-2xl font-normal text-navy">
                {feature.number}
              </span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-normal text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-tight">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default AboutHero;
