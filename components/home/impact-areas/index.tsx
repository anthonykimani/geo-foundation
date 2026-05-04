"use client";

import { useState, useEffect } from "react";
import Header from "./header";
import FeaturedImpact from "./featured-impact";
import ImpactCard from "./impact-card";
import Pagination from "./pagination";

export interface ImpactItem {
  label: string;
  title: string;
  description?: string;
  image?: any;
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

async function getImpactAreasData() {
  const { getImpactAreas } = await import("@/lib/sanity/queries");
  return getImpactAreas();
}

function ImpactAreas({ data }: ImpactAreasProps) {
  const [impactData, setImpactData] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (data) {
      setImpactData(data);
    } else {
      getImpactAreasData()
        .then(setImpactData)
        .catch(() => setImpactData(null));
    }
  }, [data]);

  const content = impactData || {
    header: {
      title: "Our Impact",
      subtitle: "See how we're making a difference in communities across Kenya."
    },
    featuredImpact: {
      label: "Featured",
      title: "Education",
      description: "Building classrooms and providing scholarships for underserved children."
    },
    impacts: []
  };

  const totalPages = 3;

  return (
    <section className="w-full bg-background">
      <div className="container py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <Header
          title={content.header?.title || "Our Impact"}
          subtitle={content.header?.subtitle || ""}
          animationIndex={0}
        />

        <FeaturedImpact
          label={content.featuredImpact?.label || "Featured"}
          title={content.featuredImpact?.title || ""}
          description={content.featuredImpact?.description || ""}
          image={content.featuredImpact?.image}
          animationIndex={1}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(content.impacts || []).slice(0, 3).map((impact: any, index: number) => (
            <ImpactCard
              key={impact._id || index}
              label={impact.label || ""}
              title={impact.title || ""}
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