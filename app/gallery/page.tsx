"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import TestimonialCard from "@/components/home/testimonials/testimonial-card";
import { Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8 } from "@/constants/img";

const galleryImages = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8];

const newsItems = [
  {
    id: 1,
    title: "Gladys Erude Organization to Host 2026 Memorial Run",
    date: "January 15, 2026",
    category: "News",
    image: galleryImages[0].src,
    excerpt: "The Gladys Erude Organization continues to uphold the legacy of the late Gladys Erude through its annual Memorial Run...",
  },
  {
    id: 2,
    title: "GEO HEADS TO KILIFI COUNTY",
    date: "January 10, 2026",
    category: "Project",
    image: galleryImages[1].src,
    excerpt: "The Gladys Erude Organization will embark on a vital mission: the revitalization of St. Michael's School...",
  },
  {
    id: 3,
    title: "501(c)(3) Nonprofit Status Achieved",
    date: "December 20, 2025",
    category: "Milestone",
    image: galleryImages[2].src,
    excerpt: "We are proud to announce that the Gladys Erude Organization has officially been certified as a registered 501(c)(3)...",
  },
  {
    id: 4,
    title: "Memorial Run 2025 a Great Success",
    date: "September 2025",
    category: "Event",
    image: galleryImages[3].src,
    excerpt: "We are proud to share that the Gladys Erude Memorial Run at Tigoi Primary School was a great success!",
  },
  {
    id: 5,
    title: "Free Medical Camp Success",
    date: "2024",
    category: "Health",
    image: galleryImages[4].src,
    excerpt: "The dedicated nurses ran a free medical camp for the local community at Tigoi Primary School.",
  },
  {
    id: 6,
    title: "Hasbah Kenya Partnership",
    date: "2024",
    category: "Partner",
    image: galleryImages[5].src,
    excerpt: "Hasbah Kenya Limited donated sanitary towels to all teenage girls in the area.",
  },
];

function GalleryPage() {
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
            <TextGenerateEffect words="News & Updates" />
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest news, events, and milestones from the Gladys Erude Organization
          </p>
        </motion.div>

        <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/gallery/${item.id}`}>
                  <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-[200px] w-full">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs rounded">
                        {item.category}
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
        </div>
      </section>
    </main>
  );
}

export default GalleryPage;