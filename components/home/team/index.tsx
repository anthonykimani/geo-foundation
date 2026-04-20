"use client";

import Header from "./header";
import TeamCard from "./team-card";
import { SmileyWomenImg, WomenPosingImg, GirlsTogetherImg } from "@/constants/img";

export interface TeamMember {
  name: string;
  title: string;
  image: string;
  linkedin?: string;
  twitter?: string;
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

const defaultData: TeamData = {
  header: {
    label: "TEAM",
    title: "The Hearts Behind The Mission",
  },
  members: [
    {
      name: "CHRISPIN NG'ANG'A",
      title: "Co-Organizer",
      image: SmileyWomenImg.src,
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "ROY ODUOR",
      title: "Co-Organizer",
      image: WomenPosingImg.src,
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "MAX ERUDE",
      title: "Co-Organizer",
      image: GirlsTogetherImg.src,
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "TONY ERUDE",
      title: "Co-Organizer",
      image: WomenPosingImg.src,
      linkedin: "#",
      twitter: "#",
    },
  ],
};

function Team({ data }: TeamProps) {
  const content = data || defaultData;

  return (
    <section className="w-full bg-background">
      <div className="container py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <Header
          label={content.header.label}
          title={content.header.title}
          animationIndex={0}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {content.members.map((member, index) => (
            <TeamCard key={index} member={member} animationIndex={1 + index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;