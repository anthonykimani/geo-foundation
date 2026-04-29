"use client";

import { useState } from "react";
import Header from "./header";
import FeaturedImpact from "./featured-impact";
import ImpactCard from "./impact-card";
import Pagination from "./pagination";
import { impactAreasData } from "@/data/components/impact-areas";

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

function ImpactAreas({ data }: ImpactAreasProps) {
  const content = data || impactAreasData;
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