"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import VideoEmbed from "@/components/shared/video-embed";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { getImageUrl } from "@/lib/sanity";
import { trackEvent } from "@/lib/track";

export interface FeaturedSlide {
  id: string;
  title: string;
  description?: string;
  category?: string;
  date?: string;
  image?: any;
  videoUrl?: string;
  registrationUrl?: string;
  registrationText?: string;
}

interface FeaturedCarouselProps {
  slides: FeaturedSlide[];
}

function FeaturedCarousel({ slides }: FeaturedCarouselProps) {
  const ref = useRef(null);
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState(0);

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
                      {slide.category && (
                        <span className="inline-block px-3 py-1.5 bg-primary text-white text-xs rounded mb-4">
                          {slide.category}
                        </span>
                      )}
                      <h2 className="text-2xl sm:text-3xl md:text-[40px] leading-tight font-normal text-foreground">
                        {slide.title}
                      </h2>
                      {slide.date && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {slide.date}
                        </p>
                      )}
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          About the Event
                        </h3>
                        <div className="space-y-4">
                          {slide.description
                            ?.split("\n")
                            .filter((paragraph: string) => paragraph.trim())
                            .map((paragraph: string, idx: number) => (
                              <p
                                key={idx}
                                className="text-base sm:text-lg text-muted-foreground"
                              >
                                {paragraph}
                              </p>
                            ))}
                        </div>
                      </div>
                    </div>

                    {slide.registrationUrl ? (
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
                    ) : null}
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
    </motion.div>
  );
}

export default FeaturedCarousel;
