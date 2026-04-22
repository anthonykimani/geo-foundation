"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import TestimonialCard from "./testimonial-card";
import { Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8 } from "@/constants/img";

export interface Testimonial {
  quote: string;
  detail: string;
  author: string;
  image: string;
}

export interface TestimonialsData {
  header: {
    title: string;
    subtitle: string;
  };
  testimonials: Testimonial[];
}

interface TestimonialsProps {
  data?: TestimonialsData;
}

const defaultData: TestimonialsData = {
  header: {
    title: "Real stories, real impact",
    subtitle:
      "Discover how the Glady's Erude Foundation has transformed lives and the community through real experiences",
  },
  testimonials: [
    {
      quote: "They are helpful and always dependable.",
      detail:
        "GEO Foundation has given me peace of mind knowing my family receives the support they need without any hassle.",
      author: "Lila Patel",
      image: Img1.src,
    },
    {
      quote: "GEO foundation has been a game-changer for me!",
      detail:
        "I could afford to raise school fees for my education but the foundation helped me",
      author: "James Porter",
      image: Img2.src,
    },
    {
      quote: "I love how transparent it is",
      detail: "Our Community couldn't afford",
      author: "James Porter",
      image: Img3.src,
    },
    {
      quote: "Amazing community support",
      detail:
        "The foundation helped build a new classroom for our village children.",
      author: "Mary Atieno",
      image: Img4.src,
    },
    {
      quote: "Education for all",
      detail:
        "My children can now go to school thanks to the scholarship program.",
      author: "John Ochieng",
      image: Img5.src,
    },
    {
      quote: "Life-changing impact",
      detail:
        "The medical outreach saved my mother's life. Forever grateful!",
      author: "Sarah Wanjiku",
      image: Img6.src,
    },
    {
      quote: "Empowering youth",
      detail:
        "The youth programs gave me skills for my career.",
      author: "David Kiprop",
      image: Img7.src,
    },
    {
      quote: "Clean water access",
      detail:
        "The water project improved our village's health significantly.",
      author: "Grace Akinyi",
      image: Img8.src,
    },
  ],
};

function Testimonials({ data }: TestimonialsProps) {
  const content = data || defaultData;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const cardWidth = 507;
  const gap = 24;

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scrollTo = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "right" 
        ? cardWidth + gap 
        : -(cardWidth + gap);
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleDotClick = (index: number) => {
    if (scrollRef.current) {
      const scrollPosition = index * (cardWidth + gap);
      scrollRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  const totalDots = content.testimonials.length;

  return (
    <section className="w-full bg-background overflow-hidden">
      <div className="py-8 sm:py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 sm:mb-12 md:mb-16 px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-360 mx-auto"
        >
          <div className="max-w-[541px]">
            <h1 className="text-3xl sm:text-4xl md:text-[56px] leading-tight font-normal text-foreground font-sans">
              <TextGenerateEffect words={content.header.title} />
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mt-2">
              {content.header.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => scrollTo("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] bg-white border border-border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CaretLeftIcon size={20} />
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalDots, 8) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-1 rounded-full transition-all ${
                    index === currentIndex 
                      ? "w-8 bg-[#7b7b7b]" 
                      : "w-3 bg-[#7b7b7b]/50"
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={() => scrollTo("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] bg-white border border-border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CaretRightIcon size={20} />
            </button>
          </div>
        </motion.div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-snap-x snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] pl-4 sm:pl-6 md:pl-8 lg:pl-[100px] pr-0"
          style={{ 
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {content.testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 snap-start"
              style={{ width: cardWidth }}
            >
              <TestimonialCard
                quote={testimonial.quote}
                detail={testimonial.detail}
                author={testimonial.author}
                image={testimonial.image}
                animationIndex={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;