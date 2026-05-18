"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";
import GalleryGrid from "@/components/gallery/gallery-grid";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FacebookLogoIcon, TwitterLogoIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { getImageUrl } from "@/lib/sanity";
import { galleryImages } from "@/data/pages/gallery";

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

  function extractYear(dateStr: string): string | null {
    const match = dateStr?.match(/\b(20\d{2})\b/);
    return match ? match[1] : null;
  }

  const grouped: Record<string, any[]> = {};
  (news || []).forEach((item: any) => {
    const year = extractYear(item.date) || "Unknown";
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(item);
  });

  const years = Object.keys(grouped).sort((a, b) => {
    if (a === "Unknown") return 1;
    if (b === "Unknown") return -1;
    return Number(b) - Number(a);
  });

  const defaultYear = years[0] || "";

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
            <Accordion
              type="single"
              defaultValue={defaultYear}
              collapsible
              className="space-y-4"
            >
              {years.map((year) => (
                <AccordionItem
                  key={year}
                  value={year}
                  className="border rounded-xl overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="text-xl font-medium">
                      {year === "Unknown" ? "Earlier" : year}
                    </span>
                    <span className="text-sm text-muted-foreground ml-auto mr-4">
                      {grouped[year].length} article
                      {grouped[year].length !== 1 ? "s" : ""}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 [&_a]:no-underline">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {grouped[year].map((item: any, index: number) => (
                        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <Link href={`/gallery/${item._id || item.id}`}>
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

                          <div className="flex items-center gap-1 px-6 pb-4">
                            <span className="text-xs text-muted-foreground mr-1">Share:</span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const articleUrl = `${window.location.origin}/gallery/${item._id || item.id}`;
                                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`, "_blank");
                              }}
                              className="inline-flex items-center justify-center size-7 rounded-full hover:bg-muted transition-colors"
                              aria-label="Share on Facebook"
                            >
                              <FacebookLogoIcon className="size-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const articleUrl = `${window.location.origin}/gallery/${item._id || item.id}`;
                                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(item.title)}`, "_blank");
                              }}
                              className="inline-flex items-center justify-center size-7 rounded-full hover:bg-muted transition-colors"
                              aria-label="Share on Twitter"
                            >
                              <TwitterLogoIcon className="size-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const articleUrl = `${window.location.origin}/gallery/${item._id || item.id}`;
                                window.open(`https://wa.me/?text=${encodeURIComponent(`${item.title} ${articleUrl}`)}`, "_blank");
                              }}
                              className="inline-flex items-center justify-center size-7 rounded-full hover:bg-muted transition-colors"
                              aria-label="Share on WhatsApp"
                            >
                              <WhatsappLogoIcon className="size-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-foreground mb-4">
              Photo Gallery
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through moments captured from our events, projects, and community engagements.
            </p>
          </motion.div>

          <GalleryGrid images={galleryImages} />
        </div>
      </section>
    </main>
  );
}