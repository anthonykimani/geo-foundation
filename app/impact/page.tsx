"use client";

import { useState } from "react";
import Link from "next/link";
import { Img1, Img2, Img3, Img4, Img5 } from "@/constants/img";
import Hero from "@/components/impact/hero";
import StatsBanner from "@/components/impact/stats-banner";
import ProjectCard from "@/components/impact/project-card";
import { Button } from "@/components/ui/button";
import { DonationModal } from "@/components/shared/donation-modal";

const stats = [
  { value: "21,165+", label: "TOTAL RAISED (USD)" },
  { value: "3", label: "ACTIVE PROJECTS" },
  { value: "500+", label: "STUDENTS IMPACTED" },
];

const projects = [
  {
    id: 1,
    title: "St. Michael's School - Kilifi County",
    description: "Revitalizing education in an underserved rural community along the coast. GEO is committed to transforming this learning environment—enhancing facilities, expanding educational resources, and creating greater opportunities for students.",
    raised: 8000,
    goal: 15000,
    date: "September 2026",
    author: "GEO",
    image: Img5.src,
  },
  {
    id: 2,
    title: "Tigoi Primary School - Vihiga County",
    description: "Ongoing improvements to support over 400 students with better learning facilities.",
    raised: 10000,
    goal: 15000,
    date: "Ongoing",
    author: "GEO",
    image: Img1.src,
  },
  {
    id: 3,
    title: "Free Medical Camps",
    description: "Providing free health screenings and medical outreach to underserved communities.",
    removed: true,
    raised: 3215,
    goal: 5000,
    date: "2024",
    author: "GEO",
    image: Img2.src,
  },
];

function ImpactPage() {
  const [donateOpen, setDonateOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background pt-20">
      <Hero />
      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} />
      <StatsBanner stats={stats} />

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
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90"
            >
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