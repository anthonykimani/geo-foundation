"use client";

import { useState } from "react";
import Link from "next/link";
import Hero from "@/components/impact/hero";
import StatsBanner from "@/components/impact/stats-banner";
import ProjectCard from "@/components/impact/project-card";
import ImpactAreas from "@/components/home/impact-areas";
import { Button } from "@/components/ui/button";
import { DonationModal } from "@/components/shared/donation-modal";
import { HeartIcon } from "@phosphor-icons/react";
import { projects, organizationStats, impactCta } from "@/data/pages/impact";

function ImpactPage() {
  const [donateOpen, setDonateOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background pt-20">
      <Hero />
      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} />
      <StatsBanner stats={organizationStats} />
      
      <ImpactAreas />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground">
                Our Projects
              </h2>
              <p className="text-muted-foreground mt-2">
                Transparent and accountable use of your donations
              </p>
            </div>
            <Link href="/get-involved">
              <Button>Start a Project</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => !p.removed).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
            Make a Difference Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your donation directly impacts the lives of women and children in underserved communities.
            Every contribution brings us closer to our goal of transforming education across Kenya.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setDonateOpen(true)}
              className="inline-flex items-center justify-center text-lg px-8 py-5 bg-primary text-white rounded-full hover:bg-primary/90 gap-2"
            >
              <HeartIcon size={24} weight="fill" className="text-white" />
              Donate Now
            </button>
            <a
              href="https://gofund.me/323c458f"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-md hover:bg-primary/5"
            >
              GoFundMe
            </a>
            <Link href="/get-involved">
              <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-md hover:bg-primary/5"
              >Get Involved</button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ImpactPage;