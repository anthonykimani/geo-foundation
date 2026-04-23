"use client";

import { useState } from "react";
import Header from "./header";
import FeaturedImpact from "./featured-impact";
import ImpactCard from "./impact-card";
import Pagination from "./pagination";
import {
  Img11,
  Img15,
  Img17,
  Img5,
  Img6,
  Img7,
  Img8,
  Img9,
} from "@/constants/img";

export interface ImpactItem {
  label: string;
  title: string;
  description?: string;
  image: string;
}

export interface ImpactAreasData {
  header: {
    title: string;
    subtitle: string;
  };
  featuredImpact: ImpactItem;
  impacts: ImpactItem[];
}

interface ImpactAreasProps {
  data?: ImpactAreasData;
}

const defaultData: ImpactAreasData = {
  header: {
    title: "Our Impact Areas",
    subtitle: "Some of the notable projects we've undertaken",
  },
  featuredImpact: {
    label: "FEATURED",
    title: "Kapsagawat Primary School",
    description:
      "Sanitary pads were provided to over 200 girls at both schools in partnership with the Centre for Advocacy on the Rights of Youth Africa, while seniors received free medical checks.",
    image: Img9.src,
  },
  impacts: [
    {
      label: "Kapsagawat",
      title: "Community Sports Initiatives",
      image: Img11.src,
    },
    {
      label: "Tigoi",
      title: "Youth Empowerment Programs",
      image: Img17.src,
    },
    {
      label: "Tigoi",
      title: "Environmental Awareness Campaigns",
      image: Img15.src,
    },
  ],
};

function ImpactAreas({ data }: ImpactAreasProps) {
  const content = data || defaultData;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  return (
    <section className="w-full bg-background">
      <div className="container py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <Header
          title={content.header.title}
          subtitle={content.header.subtitle}
          animationIndex={0}
        />

        <FeaturedImpact
          label={content.featuredImpact.label}
          title={content.featuredImpact.title}
          description={content.featuredImpact.description || ""}
          image={content.featuredImpact.image}
          animationIndex={1}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.impacts.slice(0, 3).map((impact, index) => (
            <ImpactCard
              key={index}
              label={impact.label}
              title={impact.title}
              image={impact.image}
              animationIndex={2 + index}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}

export default ImpactAreas;