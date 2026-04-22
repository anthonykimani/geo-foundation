"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Img1, Img2, Img3, Img4, Img5 } from "@/constants/img";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProjectDetails from "@/components/impact/project-details";
import ProjectProgress from "@/components/impact/project-progress";
import ProjectCard from "@/components/impact/project-card";
import DonationModal from "@/components/shared/donation-modal";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Asking for Help to Pay SchoolFees",
    description: "My two daughters need funds to pay for their education and I can't afford it.",
    raised: 10000,
    goal: 20000,
    date: "12th July 2023",
    author: "Anna",
    location: "Mombasa, Kenya",
    image: Img5.src,
    tag: "Sponsorships",
    donations: 20,
    likes: 16,
  },
  {
    id: 2,
    title: "Fund a Borehole project to bring water to our community",
    description: "Young Mothers in our area, are having a difficult time fetching water.",
    raised: 120000,
    goal: 2500000,
    date: "12th July 2023",
    author: "Anna",
    location: "Kilifi, Kenya",
    image: Img1.src,
    tag: "Non-profit",
    donations: 150,
    likes: 89,
  },
  {
    id: 3,
    title: "Donate Sanitary Towels to GirlChild Center",
    description: "Young Mothers in our area, are having a difficult time fetching water.",
    raised: 10000,
    goal: 230000,
    date: "12th July 2023",
    author: "Anna",
    location: "Mombasa, Kenya",
    image: Img2.src,
    tag: "Supplies",
    donations: 45,
    likes: 32,
  },
  {
    id: 4,
    title: "Asking for Help to Pay SchoolFees",
    description: "My two daughters need funds to pay for their education and I can't afford it.",
    raised: 10000,
    goal: 20000,
    date: "12th July 2023",
    author: "Anna",
    location: "Mombasa, Kenya",
    image: Img3.src,
    tag: "Sponsorships",
    donations: 20,
    likes: 16,
  },
  {
    id: 5,
    title: "Fund a Borehole project to bring water to our community",
    description: "Young Mothers in our area, are having a difficult time fetching water.",
    raised: 120000,
    goal: 2500000,
    date: "12th July 2023",
    author: "Anna",
    location: "Kilifi, Kenya",
    image: Img4.src,
    tag: "Non-profit",
    donations: 150,
    likes: 89,
  },
  {
    id: 6,
    title: "Donate Sanitary Towels to GirlChild Center",
    description: "Young Mothers in our area, are having a difficult time fetching water.",
    raised: 10000,
    goal: 230000,
    date: "12th July 2023",
    author: "Anna",
    location: "Mombasa, Kenya",
    image: Img5.src,
    tag: "Supplies",
    donations: 45,
    likes: 32,
  },
];

const relatedProjects = [
  {
    id: 1,
    title: "Asking for Help to Pay SchoolFees",
    description: "My two daughters need funds to pay for their education and I can't afford it.",
    raised: 10000,
    goal: 20000,
    date: "12th July 2023",
    author: "Anna",
    image: Img5.src,
  },
  {
    id: 2,
    title: "Fund a Borehole project to bring water to our community",
    description: "Young Mothers in our area, are having a difficult time fetching water.",
    raised: 120000,
    goal: 2500000,
    date: "12th July 2023",
    author: "Anna",
    image: Img1.src,
  },
  {
    id: 3,
    title: "Donate Sanitary Towels to GirlChild Center",
    description: "Young Mothers in our area, are having a difficult time fetching water.",
    raised: 10000,
    goal: 230000,
    date: "12th July 2023",
    author: "Anna",
    image: Img2.src,
  },
];

function ProjectPage() {
  const params = useParams();
  const id = Number(params.id);
  const project = projects.find((p) => p.id === id) || projects[0];
  const [donateOpen, setDonateOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background pt-20">
      <section className="py-8 md:py-12">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
            {/* Image Section */}
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-full lg:sticky lg:top-24 rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="flex flex-col gap-8 justify-between">
              <ProjectDetails
                title={project.title}
                description={project.description}
                tag={project.tag}
              />

              <div className="h-px bg-gray-200" />

              <ProjectProgress raised={project.raised} goal={project.goal} />

              <div className="flex items-center gap-8 py-2">
                <span className="text-sm text-muted-foreground">
                  {project.donations} Donations
                </span>
                <span className="text-sm text-muted-foreground">
                  {project.likes} Likes
                </span>
                <span className="text-sm text-muted-foreground ml-auto">{project.date}</span>
              </div>

              <div className="h-px bg-gray-200" />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2 px-4 sm:px-0">
                <Button className="flex-1 bg-primary text-white hover:bg-primary/90 h-12 px-6 " onClick={() => setDonateOpen(true)}>
                  Donate
                </Button>

                <Button variant="outline" className="flex-1 h-12 px-6">
                  Share
                </Button>
              </div>
            </div>
          </div>

          <DonationModal open={donateOpen} onOpenChange={setDonateOpen} />
          {/* Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList variant="line">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="donations">Donations</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <p className="mt-4 text-sm text-muted-foreground">{project.description}</p>
              </TabsContent>
              <TabsContent value="donations">
                <p className="mt-4 text-sm text-muted-foreground">No donations yet.</p>
              </TabsContent>
              <TabsContent value="comments">
                <p className="mt-4 text-sm text-muted-foreground">No comments yet.</p>
              </TabsContent>
              <TabsContent value="updates">
                <p className="mt-4 text-sm text-muted-foreground">No updates yet.</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Campaigns */}
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground text-center mb-8">
              Related Campaigns
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((rel, index) => (
                <ProjectCard key={index} project={rel} animationIndex={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProjectPage;