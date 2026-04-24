"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import Hero from "@/components/jiwe-kwa-jiwe/hero";
import HowItWorks from "@/components/jiwe-kwa-jiwe/how-it-works";
import Milestones from "@/components/jiwe-kwa-jiwe/milestones";
import FeaturedProject from "@/components/jiwe-kwa-jiwe/featured-project";
import NewsCard from "@/components/jiwe-kwa-jiwe/news-card";
import { Button } from "@/components/ui/button";
import { DonationModal } from "@/components/shared/donation-modal";
import { googleFormUrl } from "@/data/forms";
import { 
  jiweStats, 
  howItWorksSteps, 
  milestones, 
  featuredProject, 
  jiweNews, 
  currentBricks,
  jiweCta 
} from "@/data/pages/jiwe-kwa-jiwe";

function JiweKwaJiwePage() {
  const [donateOpen, setDonateOpen] = useState(false);
  const completion = Math.min((currentBricks / 660000) * 100, 100);

  return (
    <main className="min-h-screen bg-background pt-20">
      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} />
      <Hero stats={jiweStats} />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <HowItWorks steps={howItWorksSteps} />
            <Milestones milestones={milestones} currentBricks={currentBricks} />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-white/5">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <FeaturedProject project={featuredProject} animationIndex={0} />
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-8">
            LATEST UPDATES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jiweNews.map((item, index) => (
              <Link key={index} href="/gallery">
                <NewsCard news={item} animationIndex={index} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-primary">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[1240px] max-w-[1240px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-white mb-4">
            {jiweCta.title}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {jiweCta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => setDonateOpen(true)}
              className="bg-white text-primary hover:bg-gray-100"
            >
              {jiweCta.donateText}
            </Button>
            <a 
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary hover:bg-gray-100 px-6 py-2 rounded-full transition-colors inline-flex items-center"
            >
              {jiweCta.registerText}
            </a>
            <Link 
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-2 rounded-full transition-colors inline-flex items-center"
            >
              {jiweCta.contactText}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default JiweKwaJiwePage;