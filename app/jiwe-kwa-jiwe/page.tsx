"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { Img1, Img2, Img3, Img4, Img5 } from "@/constants/img";
import Hero from "@/components/jiwe-kwa-jiwe/hero";
import HowItWorks from "@/components/jiwe-kwa-jiwe/how-it-works";
import Milestones from "@/components/jiwe-kwa-jiwe/milestones";
import FeaturedProject from "@/components/jiwe-kwa-jiwe/featured-project";
import NewsCard from "@/components/jiwe-kwa-jiwe/news-card";
import { Button } from "@/components/ui/button";
import { DonationModal } from "@/components/shared/donation-modal";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdGsGAGpe9EdCwEcHmC2ugxYRHq9EUsaPs5NLffPOtvs57IHw/viewform";

const stats = [
  { value: "21,165+", label: "Total Raised" },
  { value: "501(c)(3)", label: "Certified", variant: "primary" as const },
  { value: "2026", label: "Year" },
  { value: "8,000", label: "2026 Target" },
];

const howItWorksSteps = [
  {
    number: "1",
    title: "Donate or Run",
    description: "Every $1 donated equals 1 brick. Every 5KM tracked equals 1 brick.",
  },
  {
    number: "2",
    title: "The Engine Converts",
    description: "Your actions are directly verified and converted into logical units pushing the master counter.",
  },
  {
    number: "3",
    title: "We Build Physical Impact",
    description: "Once milestones are hit, logistics deploy. Progress is documented and published transparently.",
  },
];

const milestones = [
  {
    title: "Phase 1: Ground Breaking",
    description: "First 4,000 Bricks secured.",
    target: 4000,
  },
  {
    title: "Phase 2: Central Structure",
    description: "Expansion target. 8,000 Bricks total.",
    target: 8000,
  },
  {
    title: "Phase 3: Completion",
    description: "Final enclosure. 12,000 Bricks total.",
    target: 12000,
  },
];

const featuredProject = {
  title: "St. Michael's School - Kilifi County",
  subtitle: "Revitalizing education in an underserved coastal community.",
  bricksRaised: 21165,
  targetBricks: 8000,
  image: Img5.src,
};

const news = [
  { label: "News", title: "Annual 5km Run", date: "Nov 28, 2026", image: Img1.src },
  { label: "News", title: "Community Highlights", date: "April 28, 2026", image: Img2.src },
  { label: "News", title: "GEO Wins Charity Award 2026", date: "Jan 28, 2026", image: Img3.src },
  { label: "News", title: "Phase 2 Complete", date: "Dec 15, 2025", image: Img4.src },
];

function JiweKwaJiwePage() {
  const [donateOpen, setDonateOpen] = useState(false);
  const completion = Math.min((15420 / 660000) * 100, 100);

  return (
    <main className="min-h-screen bg-background pt-20">
      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} />
      <Hero stats={stats} />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <HowItWorks steps={howItWorksSteps} />
            <Milestones milestones={milestones} currentBricks={15420} />
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
            {news.map((item, index) => (
              <Link key={index} href="/gallery">
                <NewsCard news={item} animationIndex={index} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-primary">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1240px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-white mb-4">
            Join the Movement
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Be part of something bigger. Together we can make a lasting impact on communities across Kenya.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => setDonateOpen(true)}
              className="bg-white text-primary hover:bg-gray-100"
            >
              Donate
            </Button>
            <a 
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary hover:bg-gray-100 px-6 py-2 rounded-full transition-colors inline-flex items-center"
            >
              Register
            </a>
            <Link 
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-2 rounded-full transition-colors inline-flex items-center"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default JiweKwaJiwePage;