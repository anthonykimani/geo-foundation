"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Img1, Img2, Img3, Img4, GeoTeamAtPrimarySchool, GeoTeamWithPrincipal, GeoOnTheGround, GeoKidsReceiveAid, GeoGroupPhotoBannerBg } from "@/constants/img";
import { heroSection } from "@/data/pages/home";

const TARGET_BRICKS = heroSection.targetBricks;

const heroImages = [
  { src: Img1, alt: "GEO community work" },
  { src: Img2, alt: "GEO team in action" },
  { src: Img3, alt: "GEO event" },
  { src: Img4, alt: "GEO project" },
  { src: GeoTeamAtPrimarySchool, alt: "GEO team at primary school" },
  { src: GeoTeamWithPrincipal, alt: "GEO team with principal" },
  { src: GeoOnTheGround, alt: "GEO on the ground" },
  { src: GeoKidsReceiveAid, alt: "GEO kids receive aid" },
  { src: GeoGroupPhotoBannerBg, alt: "GEO group photo" },
];

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
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState(0);
  const [bricksRaised, setBricksRaised] = useState(heroSection.bricksRaised);

  const progressPercentage = Math.min(
    (bricksRaised / TARGET_BRICKS) * 100,
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

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("/api/donations");
        if (res.ok) {
          const data = await res.json();
          if (data.totalBricks > 0) {
            setBricksRaised(data.totalBricks);
          }
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, []);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const bottomAnimation = {
    initial: { y: "20%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.8 },
  };

  return (
    <section ref={ref} className="relative overflow-hidden">
      <Carousel
        className="w-full h-screen"
        opts={{
          loop: true,
        }}
        autoplay={true}
        autoplayDelay={5000}
        setApi={setApi}
      >
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="relative w-full h-screen">
              <div className="absolute inset-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover object-top"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="relative h-full container pt-28 sm:pt-40 md:pt-52 2xl:pb-20 pb-10 flex items-center">
                <div className="flex flex-col max-w-xl gap-6 sm:gap-8">
                  <div className="relative flex flex-col text-left items-start sm:gap-6 gap-4">
                    <h1>
                      <TextGenerateEffect
                        words="Make an Impact"
                        className="text-white whitespace-nowrap"
                      />
                    </h1>
                    <h1>
                      <TextGenerateEffect
                        words="Brick by Brick"
                        delay={0.8}
                        className="font-instrument-serif italic tracking-tight text-teal-brand"
                      />
                    </h1>
                    <motion.p
                      {...bottomAnimation}
                      className="max-w-2xl text-base sm:text-lg md:text-xl text-white/90"
                    >
                      We believe that sustainable impact is built through
                      transparency, participation, and measurable action one brick
                      at a time.
                    </motion.p>
                  </div>

                  <motion.div {...bottomAnimation} className="mt-4">
                    <div className="relative w-full h-[41px] bg-white/20 rounded-[55px] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{
                          duration: 1.5,
                          delay: 0.5,
                          ease: "easeOut",
                        }}
                        className="absolute top-0 left-0 h-full bg-primary rounded-[32px]"
                      />
                    </div>

                    <div className="flex justify-between text-sm sm:text-base text-white/90 mb-2">
                      <span>
                        <AnimatedNumber
                          value={bricksRaised}
                          inView={inView}
                        />{" "}
                        Bricks Raised
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
                      <Button className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden">
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}

export default HeroSection;