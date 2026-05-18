"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { FacebookLogoIcon, TwitterLogoIcon, WhatsappLogoIcon } from "@phosphor-icons/react";

interface NewsItem {
  _id?: string;
  id?: string | number;
  title: string;
  category?: string;
  date?: string;
  excerpt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageUrl?: any;
}

interface GalleryDetailClientProps {
  newsItem: NewsItem | null;
  prevItem: NewsItem | null;
  nextItem: NewsItem | null;
  imageUrl: string | null;
}

export default function GalleryDetailClient({
  newsItem,
  prevItem,
  nextItem,
  imageUrl,
}: GalleryDetailClientProps) {
  if (!newsItem) {
    return (
      <main className="min-h-screen bg-background pt-20">
        <div className="container px-4 py-12 text-center">
          <Link href="/gallery">
            <Button variant="ghost" className="mb-6">
              ← Back to News
            </Button>
          </Link>
          <p className="text-muted-foreground">News item not found.</p>
        </div>
      </main>
    );
  }

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
                  {newsItem.excerpt?.split("\n").map((paragraph: string, idx: number) => (
                    <p key={idx} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-6">
                  <span className="text-xs text-muted-foreground">Share:</span>
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
                    }}
                    className="inline-flex items-center justify-center size-9 rounded-full border border-border bg-input/30 hover:bg-input/50 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <FacebookLogoIcon className="size-4" />
                  </button>
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(newsItem.title)}`, "_blank");
                    }}
                    className="inline-flex items-center justify-center size-9 rounded-full border border-border bg-input/30 hover:bg-input/50 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <TwitterLogoIcon className="size-4" />
                  </button>
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      window.open(`https://wa.me/?text=${encodeURIComponent(`${newsItem.title} ${url}`)}`, "_blank");
                    }}
                    className="inline-flex items-center justify-center size-9 rounded-full border border-border bg-input/30 hover:bg-input/50 transition-colors"
                    aria-label="Share on WhatsApp"
                  >
                    <WhatsappLogoIcon className="size-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-8 border-t border-gray-200">
                {prevItem ? (
                  <Link href={`/gallery/${prevItem._id || prevItem.id}`}>
                    <Button variant="outline">← Previous</Button>
                  </Link>
                ) : (
                  <Button variant="outline" disabled>
                    ← Previous
                  </Button>
                )}

                {nextItem ? (
                  <Link href={`/gallery/${nextItem._id || nextItem.id}`}>
                    <Button variant="outline">Next →</Button>
                  </Link>
                ) : (
                  <Button variant="outline" disabled>
                    Next →
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
