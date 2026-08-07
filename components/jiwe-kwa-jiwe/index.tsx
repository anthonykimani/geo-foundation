"use client";

import { useEffect, useState } from "react";
import Header from "./header";
import FeaturedProject from "./featured-project";
import NewsCard from "./news-card";

export interface Project {
  title: string;
  subtitle: string;
  bricksRaised: number;
  targetBricks: number;
  image?: any;
}

export interface NewsItem {
  label: string;
  title: string;
  date: string;
  image?: any;
}

export interface JiweKwaJiweData {
  header: {
    title: string;
    subtitle: string;
  };
  featuredProject: Project;
  news: NewsItem[];
}

interface JiweKwaJiweProps {
  data?: JiweKwaJiweData;
}

async function getJiwePageData() {
  const { getJiwePage } = await import("@/lib/sanity/queries");
  return getJiwePage();
}

function JiweKwaJiwe({ data }: JiweKwaJiweProps) {
  const [jiweData, setJiweData] = useState<any>(null);

  useEffect(() => {
    if (data) {
      setJiweData(data);
    } else {
      getJiwePageData()
        .then(setJiweData)
        .catch(() => setJiweData(null));
    }
  }, [data]);

  const header = {
    title: jiweData?.ctaTitle || "Jiwe Kwa Jiwe",
    subtitle: jiweData?.ctaDescription || "Track the classroom build in real time",
  };

  const featuredProject = {
    title: jiweData?.featuredProjectTitle || "",
    subtitle: jiweData?.featuredProjectSubtitle || "",
    bricksRaised: jiweData?.bricksRaised || 0,
    targetBricks: jiweData?.targetBricks || 0,
    image: jiweData?.featuredProjectImage || null,
  };

  const news = jiweData?.news || [];

  return (
    <section className="w-full bg-background">
      <div className="container py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <Header
          title={header.title}
          subtitle={header.subtitle}
          animationIndex={0}
        />

        <FeaturedProject
          project={featuredProject}
          animationIndex={1}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((newsItem: any, index: number) => (
            <NewsCard key={newsItem._id || index} news={newsItem} animationIndex={2 + index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default JiweKwaJiwe;