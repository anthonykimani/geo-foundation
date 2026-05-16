"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/impact/project-card";
import { Button } from "@/components/ui/button";
import { DonationModal } from "@/components/shared/donation-modal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { HeartIcon } from "@phosphor-icons/react";

async function getPageData() {
  const { getProjects, getImpactPage } = await import("@/lib/sanity/queries");
  const [projects, impactPage] = await Promise.all([
    getProjects(),
    getImpactPage(),
  ]);
  return { projects, impactPage };
}

function extractYear(dateStr: string): string | null {
  const match = dateStr?.match(/\b(20\d{2})\b/);
  return match ? match[1] : null;
}

export default function ProjectsPage() {
  const [data, setData] = useState<any>(null);
  const [donateOpen, setDonateOpen] = useState(false);

  useEffect(() => {
    getPageData()
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

  const { projects, impactPage } = data;
  const cta = impactPage || {};

  const grouped: Record<string, any[]> = {};
  projects.forEach((p: any) => {
    const year = extractYear(p.date) || "Unknown";
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(p);
  });

  const years = Object.keys(grouped).sort((a, b) => {
    if (a === "Unknown") return 1;
    if (b === "Unknown") return -1;
    return Number(b) - Number(a);
  });

  const defaultYear = years[0] || "";

  return (
    <main className="min-h-screen bg-background pt-20">
      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-foreground mb-6">
              Our Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparent and accountable use of your donations across every
              initiative we undertake.
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No active projects yet. Check back soon!</p>
            </div>
          ) : (
            <Accordion
              type="single"
              defaultValue={defaultYear}
              collapsible
              className="space-y-4"
            >
              {years.map((year) => (
                <AccordionItem
                  key={year}
                  value={year}
                  className="border rounded-xl overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-xl font-medium">
                      {year === "Unknown" ? "Earlier" : year}
                    </span>
                    <span className="text-sm text-muted-foreground ml-auto mr-4">
                      {grouped[year].length} project
                      {grouped[year].length !== 1 ? "s" : ""}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {grouped[year].map((project: any, index: number) => (
                        <ProjectCard
                          key={project._id || index}
                          project={project}
                          animationIndex={index}
                          linkPrefix="/projects"
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
            {cta.ctaTitle || "Make a Difference Today"}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {cta.ctaDescription ||
              "Your donation directly impacts the lives of women and children in underserved communities."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setDonateOpen(true)}
              className="inline-flex items-center justify-center text-lg px-8 py-5 bg-primary text-white rounded-full hover:bg-primary/90 gap-2"
            >
              <HeartIcon size={24} weight="fill" className="text-white" />
              {cta.donateText || "Donate Now"}
            </button>
            {cta.gofundmeUrl && (
              <a
                href={cta.gofundmeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-lg px-8 py-5 border-2 border-primary text-primary rounded-full hover:bg-primary/5"
              >
                GoFundMe
              </a>
            )}
            <Link
              href={cta.getInvolvedHref || "/get-involved"}
            >
              <span className="inline-flex items-center justify-center text-lg px-8 py-5 border-2 border-primary text-primary rounded-full hover:bg-primary/5 cursor-pointer">
                Get Involved
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
