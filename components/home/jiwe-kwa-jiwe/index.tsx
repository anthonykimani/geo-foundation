"use client";

import Header from "./header";
import FeaturedProject from "./featured-project";
import NewsCard from "./news-card";
import { jiweHomeData } from "@/data/pages/home";
import { useEffect, useState } from "react";

function JiweKwaJiwe() {
  const [project, setProject] = useState(jiweHomeData.featuredProject);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("/api/donations");
        if (res.ok) {
          const data = await res.json();
          if (data.totalBricks > 0) {
            setProject((prev) => ({
              ...prev,
              bricksRaised: data.totalBricks,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, []);

  return (
    <section className="w-full bg-background">
      <div className="container py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <Header
          title={jiweHomeData.header.title}
          subtitle={jiweHomeData.header.subtitle}
          animationIndex={0}
        />

        <FeaturedProject
          project={project}
          animationIndex={1}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jiweHomeData.news.map((newsItem, index) => (
            <NewsCard key={index} news={newsItem} animationIndex={2 + index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default JiweKwaJiwe;