"use client";

import { useEffect, useState } from "react";
import Header from "./header";
import FeaturedCarousel, { type FeaturedSlide } from "./featured-carousel";
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

const GOLF_OUTING_ID = "437fc816-2f25-4da3-8183-d1071cc7d850";

async function getJiwePageData() {
  const { getJiwePage, getHomePage } = await import("@/lib/sanity/queries");
  const [jiwe, homePage] = await Promise.all([getJiwePage(), getHomePage()]);
  return { jiwe, homePage };
}

async function getGolfOuting() {
  const { getNews } = await import("@/lib/sanity/queries");
  const news = await getNews();
  const item =
    news.find((n: any) => n._id === GOLF_OUTING_ID) ||
    news.find((n: any) =>
      (n.title || "").toUpperCase().includes("CHARITY GOLF OUTING")
    );
  return item || null;
}

function JiweKwaJiwe({ data }: JiweKwaJiweProps) {
  const [jiweData, setJiweData] = useState<any>(null);
  const [homePageData, setHomePageData] = useState<any>(null);
  const [golfOuting, setGolfOuting] = useState<any>(null);

  useEffect(() => {
    if (data) {
      setJiweData(data);
    } else {
      getJiwePageData()
        .then(({ jiwe, homePage }) => {
          setJiweData(jiwe);
          setHomePageData(homePage);
        })
        .catch(() => setJiweData(null));
    }
  }, [data]);

  useEffect(() => {
    getGolfOuting()
      .then(setGolfOuting)
      .catch(() => setGolfOuting(null));
  }, []);

  const header = {
    title: jiweData?.headerTitle || jiweData?.header?.title || "Jiwe Kwa Jiwe",
    subtitle: jiweData?.headerSubtitle || jiweData?.header?.subtitle || "",
  };
  const featuredProject = {
    title: jiweData?.featuredProjectTitle || jiweData?.featuredProject?.title || "",
    subtitle: jiweData?.featuredProjectSubtitle || jiweData?.featuredProject?.subtitle || "",
    image: jiweData?.featuredProjectImage || jiweData?.featuredProject?.image,
    bricksRaised: jiweData?.bricksRaised || homePageData?.bricksRaised || 0,
    targetBricks: jiweData?.targetBricks || homePageData?.targetBricks || 0,
  };
  const news = jiweData?.news || [];

  const slides: FeaturedSlide[] = [];

  if (golfOuting) {
    slides.push({
      id: "golf-outing",
      kind: "event",
      title: golfOuting.title || "CHARITY GOLF OUTING",
      date: golfOuting.date,
      category: golfOuting.category,
      description: golfOuting.excerpt,
      image: golfOuting.imageUrl,
      videoUrl: golfOuting.videoUrl,
      registrationUrl: golfOuting.registrationUrl,
      registrationText: golfOuting.registrationText,
    });
  }

  if (featuredProject.title) {
    slides.push({
      id: "featured-project",
      kind: "project",
      title: featuredProject.title,
      subtitle: featuredProject.subtitle,
      image: featuredProject.image,
      bricksRaised: featuredProject.bricksRaised,
      targetBricks: featuredProject.targetBricks,
    });
  }

  return (
    <section className="w-full bg-background">
      <div className="container py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <Header
          title={header.title}
          subtitle={header.subtitle}
          animationIndex={0}
        />

        <FeaturedCarousel slides={slides} />

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
