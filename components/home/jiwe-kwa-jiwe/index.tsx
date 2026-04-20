"use client";

import Header from "./header";
import FeaturedProject from "./featured-project";
import NewsCard from "./news-card";
import {
  Img1,
  Img12,
  Img2,
  Img3,
  Img4,
  Img13,
  Img14
} from "@/constants/img";

export interface Project {
  title: string;
  subtitle: string;
  bricksRaised: number;
  targetBricks: number;
  image: string;
}

export interface NewsItem {
  label: string;
  title: string;
  date: string;
  image: string;
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

const defaultData: JiweKwaJiweData = {
  header: {
    title: "Jiwe Kwa Jiwe",
    subtitle: "Track the classroom build in real time",
  },
  featuredProject: {
    title: "Kapsagawat Primary School Construction",
    subtitle: "Clear construction targets and progress reports.",
    bricksRaised: 400000,
    targetBricks: 660000,
    image: Img12.src,
  },
  news: [
    {
      label: "News name here",
      title: "Annual 5km Run",
      date: "Nov 28, 2026",
      image: Img14.src,
    },
    {
      label: "News name here",
      title: "Community Highlights",
      date: "April 28, 2026",
      image: Img13.src,
    },
    {
      label: "News name here",
      title: "GEO Wins Charity Award 2026",
      date: "Jan 28, 2026",
      image: Img4.src,
    },
  ],
};

function JiweKwaJiwe({ data }: JiweKwaJiweProps) {
  const content = data || defaultData;

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
          {content.news.map((newsItem, index) => (
            <NewsCard key={index} news={newsItem} animationIndex={2 + index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default JiweKwaJiwe;