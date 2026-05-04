"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProjectDetails from "@/components/impact/project-details";
import ProjectProgress from "@/components/impact/project-progress";
import ProjectCard from "@/components/impact/project-card";
import DonationModal from "@/components/shared/donation-modal";
import { HeartIcon } from "@phosphor-icons/react";
import { getImageUrl } from "@/lib/sanity";

async function getProjectsData() {
  const { getProjects } = await import("@/lib/sanity/queries");
  return getProjects();
}

function ProjectPage() {
  const params = useParams();
  const id = params.id as string;
  const [projects, setProjects] = useState<any[]>([]);
  const [donateOpen, setDonateOpen] = useState(false);

  useEffect(() => {
    getProjectsData()
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  const project = projects.find((p) => p._id === id || p.id?.toString() === id) || projects[0];

  if (!project) {
    return (
      <main className="min-h-screen bg-background pt-20">
        <div className="container px-4 py-12 text-center">
          <p className="text-muted-foreground">Project not found.</p>
        </div>
      </main>
    );
  }

  const relatedProjects = projects.filter((p) => p._id !== project._id).slice(0, 3);

  return (
    <main className="min-h-screen bg-background pt-20">
      <section className="py-8 md:py-12">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-full lg:sticky lg:top-24 rounded-lg overflow-hidden">
              {project.imageUrl ? (
                <Image
                  src={getImageUrl(project.imageUrl) || ""}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="flex flex-col gap-8 justify-between">
              <ProjectDetails
                title={project.title}
                description={project.description}
                tag={project.status || "Active"}
              />

              <div className="h-px bg-gray-200" />

              <ProjectProgress raised={project.raised || 0} goal={project.goal || 0} />

              <div className="flex items-center gap-8 py-2">
                <span className="text-sm text-muted-foreground">
                  {project.donations || 0} Donations
                </span>
                <span className="text-sm text-muted-foreground">
                  {project.likes || 0} Likes
                </span>
                <span className="text-sm text-muted-foreground ml-auto">{project.date}</span>
              </div>

              <div className="h-px bg-gray-200" />

              <div className="flex flex-col sm:flex-row gap-4 pt-2 px-4 sm:px-0">
                <Button className="flex-1 bg-primary text-white hover:bg-primary/90 h-14 px-8 gap-2 text-lg" onClick={() => setDonateOpen(true)}>
                  <HeartIcon size={24} weight="fill" className="text-white" />
                  Donate
                </Button>

                <Button variant="outline" className="flex-1 h-12 px-6">
                  Share
                </Button>
              </div>
            </div>
          </div>

          <DonationModal open={donateOpen} onOpenChange={setDonateOpen} />
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

          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground text-center mb-8">
              Related Campaigns
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((rel, index) => (
                <ProjectCard key={rel._id || index} project={rel} animationIndex={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProjectPage;