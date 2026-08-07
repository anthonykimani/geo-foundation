"use client";

import { useEffect, useState } from "react";
import Header from "./header";
import FeaturedCarousel, { type FeaturedSlide } from "./featured-carousel";
import NewsCard from "./news-card";

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
  news: NewsItem[];
}

interface JiweKwaJiweProps {
  data?: JiweKwaJiweData;
}

const GOLF_OUTING_ID = "437fc816-2f25-4da3-8183-d1071cc7d850";

async function getJiwePageData() {
  const { getJiwePage } = await import("@/lib/sanity/queries");
  return getJiwePage();
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
  const [golfOuting, setGolfOuting] = useState<any>(null);

  useEffect(() => {
    if (data) {
      setJiweData(data);
    } else {
      getJiwePageData()
        .then(setJiweData)
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
  const news = jiweData?.news || [];

  const slides: FeaturedSlide[] = [];

  if (golfOuting) {
    slides.push({
      id: "golf-outing",
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
