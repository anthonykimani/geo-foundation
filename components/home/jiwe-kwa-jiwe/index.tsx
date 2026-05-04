"use client";

import { useEffect, useState } from "react";
import Header from "./header";
import FeaturedProject from "./featured-project";
import NewsCard from "./news-card";

interface Project {
  title: string;
  subtitle: string;
  bricksRaised: number;
  targetBricks: number;
  image?: any;
}

interface NewsItem {
  label: string;
  title: string;
  date: string;
  image?: any;
}

interface JiweKwaJiweData {
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

async function getDonationData() {
  try {
    const res = await fetch("/api/donations");
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error("Error fetching donations:", error);
  }
  return { totalBricks: 0 };
}

function JiweKwaJiwe({ data }: JiweKwaJiweProps) {
  const [jiweData, setJiweData] = useState<any>(null);
  const [bricksRaised, setBricksRaised] = useState(0);

  useEffect(() => {
    if (data) {
      setJiweData(data);
    } else {
      Promise.all([getJiwePageData(), getDonationData()])
        .then(([jiwe, donations]) => {
          setJiweData(jiwe);
          if (donations.totalBricks > 0) {
            setBricksRaised(donations.totalBricks);
          }
        })
        .catch(() => setJiweData(null));
    }
  }, [data]);

  const header = jiweData?.header || { title: "Jiwe Kwa Jiwe", subtitle: "Track the classroom build in real time" };
  const featuredProject = {
    ...(jiweData?.featuredProject || {}),
    bricksRaised: bricksRaised || jiweData?.bricksRaised || 0,
    targetBricks: jiweData?.targetBricks || 12000,
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