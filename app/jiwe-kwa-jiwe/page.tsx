"use client";

import { useEffect, useState } from "react";
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
import { HeartIcon } from "@phosphor-icons/react";
import { urlFor } from "@/lib/sanity";

async function getJiwePageData() {
  const { getJiwePage } = await import("@/lib/sanity/queries");
  return getJiwePage();
}

function JiweKwaJiwePage() {
  const [data, setData] = useState<any>(null);
  const [donateOpen, setDonateOpen] = useState(false);

  useEffect(() => {
    getJiwePageData()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-background pt-20">
        <div className="container px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  const stats = [
    { value: (data.bricksRaised || 0).toLocaleString(), label: "Bricks Raised", variant: "primary" as const },
    { value: (data.targetBricks || 660000).toLocaleString(), label: "Target Bricks", variant: "default" as const },
    { value: "100%", label: "Transparent", variant: "default" as const },
  ];

  const featuredProject = {
    title: data.featuredProjectTitle || "THE TIGOI PRIMARY CLASSROOM BUILD",
    subtitle: data.featuredProjectSubtitle || "We are mobilizing the community to construct new permanent educational structures in Kilifi.",
    bricksRaised: data.bricksRaised || 0,
    targetBricks: data.targetBricks || 660000,
    image: data.featuredProjectImage,
  };

  return (
    <main className="min-h-screen bg-background pt-20">
      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} />
      <Hero stats={stats} />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <HowItWorks steps={data.howItWorks || []} />
            <Milestones 
              milestones={data.milestones || []} 
              currentBricks={data.currentBricks || 0} 
            />
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
            {(data.news || []).map((item: any, index: number) => (
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
            {data.ctaTitle || "Make a Difference"}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {data.ctaDescription || "Help us build the future of education in Kilifi County."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => setDonateOpen(true)}
              className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-5 gap-2"
            >
              <HeartIcon size={24} weight="fill" className="text-primary" />
              {data.donateText || "Donate Now"}
            </Button>
            <a 
              href={data.googleFormUrl || "https://forms.google.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary hover:bg-gray-100 px-6 py-2 rounded-full transition-colors inline-flex items-center"
            >
              {data.registerText || "Register"}
            </a>
            <Link 
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-2 rounded-full transition-colors inline-flex items-center"
            >
              {data.contactText || "Contact Us"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default JiweKwaJiwePage;