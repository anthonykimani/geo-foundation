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

async function getJiweKwaJiweData() {
  const { getJiwePage } = await import("@/lib/sanity/queries");
  return getJiwePage();
}

function JiweKwaJiwe({ data }: JiweKwaJiweProps) {
  const [jiweData, setJiweData] = useState<any>(null);

  useEffect(() => {
    if (data) {
      setJiweData(data);
    } else {
      getJiweKwaJiweData()
        .then(setJiweData)
        .catch(() => setJiweData(null));
    }
  }, [data]);

  const content = jiweData || {
    header: {
      title: "Jiwe Kwa Jiwe",
      subtitle: "Track the classroom build in real time",
    },
    featuredProject: {
      title: "Kapsagawat Primary School Construction",
      subtitle: "Clear construction targets and progress reports.",
      bricksRaised: 400000,
      targetBricks: 660000,
    },
    news: [],
  };

  return (
    <section className="w-full bg-background">
      <div className="container py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <Header
          title={content.header.title}
          subtitle={content.header.subtitle}
          animationIndex={0}
        />

        <FeaturedProject
          project={content.featuredProject}
          animationIndex={1}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(content.news || []).map((newsItem: any, index: number) => (
            <NewsCard key={newsItem._id || index} news={newsItem} animationIndex={2 + index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default JiweKwaJiwe;