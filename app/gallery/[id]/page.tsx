"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/sanity";

async function getNewsData() {
  const { getNews } = await import("@/lib/sanity/queries");
  return getNews();
}

function GalleryDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewsData()
      .then(setNews)
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-20">
        <div className="container px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  const currentIndex = news.findIndex((item) => item._id === id || item.id?.toString() === id);
  const newsItem = news[currentIndex] || news[0];
  
  const prevItem = currentIndex > 0 ? news[currentIndex - 1] : null;
  const nextItem = currentIndex < news.length - 1 ? news[currentIndex + 1] : null;

  const imageUrl = getImageUrl(newsItem?.imageUrl);

  return (
    <main className="min-h-screen bg-background pt-20">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <Link href="/gallery">
            <Button variant="ghost" className="mb-6">
              ← Back to News
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-[300px] md:h-[400px] lg:h-full rounded-2xl overflow-hidden"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={newsItem.title}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1.5 bg-primary text-white text-xs rounded mb-4">
                  {newsItem.category || "News"}
                </span>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-4">
                  {newsItem.title}
                </h1>

                <p className="text-sm text-muted-foreground mb-6">{newsItem.date}</p>

                <div className="prose prose-lg text-muted-foreground">
                  {newsItem.excerpt?.split('\n').map((paragraph: string, idx: number) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-8 border-t border-gray-200">
                {prevItem ? (
                  <Link href={`/gallery/${prevItem._id || prevItem.id}`}>
                    <Button variant="outline">← Previous</Button>
                  </Link>
                ) : (
                  <Button variant="outline" disabled>← Previous</Button>
                )}

                {nextItem ? (
                  <Link href={`/gallery/${nextItem._id || nextItem.id}`}>
                    <Button variant="outline">Next →</Button>
                  </Link>
                ) : (
                  <Button variant="outline" disabled>Next →</Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default GalleryDetailPage;