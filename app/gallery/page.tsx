"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";
import { getImageUrl } from "@/lib/sanity";

async function getPageData() {
  const { getGalleryPage, getNews } = await import("@/lib/sanity/queries");
  const [galleryPage, news] = await Promise.all([getGalleryPage(), getNews()]);
  return { galleryPage, news };
}

export default function GalleryPage() {
  const [data, setData] = useState<{ galleryPage: any; news: any[] } | null>(null);

  useEffect(() => {
    getPageData()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-background pt-20">
        <div className="container px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  const { galleryPage, news } = data;
  const pageTitle = galleryPage?.pageTitle || "Gallery & News";
  const pageDescription = galleryPage?.pageDescription || "Stay updated with the latest news and events from the Gladys Erude Organization";

  return (
    <main className="min-h-screen bg-background pt-20">
      <section className="py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-foreground mb-6">
            <TextGenerateEffect words={pageTitle} />
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {pageDescription}
          </p>
        </motion.div>

        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          {!news || news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No news items yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item: any, index: number) => (
                <motion.div
                  key={item._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/gallery/${item._id || index + 1}`}>
                    <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative h-[200px] w-full">
                        {(() => {
                          const imgUrl = getImageUrl(item.imageUrl);
                          if (imgUrl) {
                            return <img src={imgUrl} alt={item.title} className="w-full h-full object-cover" />;
                          }
                          return <div className="w-full h-full bg-gray-200 flex items-center justify-center"><span className="text-gray-400">No image</span></div>;
                        })()}
                        <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs rounded">
                          {item.category || "News"}
                        </span>
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-muted-foreground mb-2">{item.date}</p>
                        <h2 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h2>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {item.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}