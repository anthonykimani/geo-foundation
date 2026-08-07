"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import DonationModal from "@/components/shared/donation-modal";
import VideoEmbed from "@/components/shared/video-embed";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { HeartIcon } from "@phosphor-icons/react";
import { getImageUrl } from "@/lib/sanity";
import { trackEvent } from "@/lib/track";

export interface FeaturedSlide {
  id: string;
  kind: "event" | "project";
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  image?: any;
  videoUrl?: string;
  bricksRaised?: number;
  targetBricks?: number;
  registrationUrl?: string;
  registrationText?: string;
}

interface FeaturedCarouselProps {
  slides: FeaturedSlide[];
}

function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1500;
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
  }, [value, inView]);

  return <span>{displayValue.toLocaleString()}</span>;
}

function FeaturedCarousel({ slides }: FeaturedCarouselProps) {
  const ref = useRef(null);
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState(0);
  const [donateOpen, setDonateOpen] = useState(false);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (slides.length === 0) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mb-10 sm:mb-12 md:mb-16"
    >
      <Carousel
        opts={{ loop: true }}
        setApi={setApi}
        autoplay={true}
        autoplayDelay={6000}
      >
        <CarouselContent>
          {slides.map((slide) => {
            const imageSrc = getImageUrl(slide.image);
            const isEvent = slide.kind === "event";
            const progressPercentage = isEvent
              ? 0
              : Math.min(
                  ((slide.bricksRaised || 0) / (slide.targetBricks || 1)) * 100,
                  100
                );

            return (
              <CarouselItem key={slide.id} className="basis-full pl-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0">
                  <div className="relative w-full h-[380px] md:h-[400px] lg:h-[680px] rounded-[24px] overflow-hidden">
                    {slide.videoUrl ? (
                      <VideoEmbed
                        url={slide.videoUrl}
                        title={slide.title}
                        background
                      />
                    ) : imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={slide.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>

                  <div className="bg-[#f6f6f6] dark:bg-white/5 p-6 sm:p-8 md:p-10 lg:p-10 rounded-r-[24px] flex flex-col justify-between">
                    <div className="mb-6">
                      <h2 className="text-2xl sm:text-3xl md:text-[40px] leading-tight font-normal text-foreground">
                        {slide.title}
                      </h2>
                      {isEvent && slide.date && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {slide.date}
                        </p>
                      )}
                      <p className="text-base sm:text-lg text-muted-foreground">
                        {isEvent ? slide.description : slide.subtitle}
                      </p>
                    </div>

                    {!isEvent && (
                      <div className="mb-6">
                        <div className="flex justify-between text-sm sm:text-base">
                          <span className="text-foreground">
                            <AnimatedNumber
                              value={slide.bricksRaised || 0}
                              inView={inView}
                            />{" "}
                            Bricks Raised
                          </span>
                          <span className="text-foreground">
                            {(slide.targetBricks || 0).toLocaleString()}{" "}
                            Targeted Bricks
                          </span>
                        </div>

                        <div className="relative w-full h-[41px] bg-[#efeaea] dark:bg-white/10 rounded-[55px] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                            className="absolute top-0 left-0 h-full bg-[#ea3c58] rounded-[32px]"
                          />
                        </div>
                      </div>
                    )}

                    {isEvent && slide.registrationUrl ? (
                      <a
                        href={slide.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackEvent("featured_event_register_click", {
                            title: slide.title,
                          })
                        }
                        className="w-fit"
                      >
                        <Button className="bg-primary text-white rounded-full text-lg px-8 py-6 gap-2">
                          {slide.registrationText || "Register Now"}
                        </Button>
                      </a>
                    ) : (
                      <Button
                        onClick={() => {
                          setDonateOpen(true);
                          trackEvent("featured_project_donate_click", {
                            project: slide.title,
                          });
                        }}
                        className="bg-primary text-white rounded-full text-lg px-8 py-6 gap-2"
                      >
                        <HeartIcon size={24} weight="fill" className="text-white" />
                        Donate
                      </Button>
                    )}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex -left-8" />
        <CarouselNext className="hidden md:flex -right-8" />

        <div className="flex justify-center gap-2 mt-6">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index ? "w-8 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/60"
              }`}
            />
          ))}
        </div>
      </Carousel>

      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} />
    </motion.div>
  );
}

export default FeaturedCarousel;
