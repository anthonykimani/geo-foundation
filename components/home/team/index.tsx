"use client";

import Header from "./header";
import TeamCard from "./team-card";
import { teamData } from "@/data/organization/team";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface TeamMember {
  name: string;
  title: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  bio?: string;
}

export interface TeamData {
  header: {
    label: string;
    title: string;
  };
  members: TeamMember[];
}

interface TeamProps {
  data?: TeamData;
}

function Team({ data }: TeamProps) {
  const content = data || teamData;

  return (
    <section className="w-full bg-background">
      <div className="container py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <Header
          label={content.header.label}
          title={content.header.title}
          animationIndex={0}
        />

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {content.members.map((member, index) => (
                <CarouselItem
                  key={member.name}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <TeamCard member={member} animationIndex={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-4 md:-translate-x-12" />
            <CarouselNext className="right-0 translate-x-4 md:translate-x-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default Team;