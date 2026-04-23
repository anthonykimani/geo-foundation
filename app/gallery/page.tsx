"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/shared/text-generate-effect";
import TestimonialCard from "@/components/home/testimonials/testimonial-card";
import { newsItems, pageTitle, pageDescription } from "@/data/pages/gallery";

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
            <TextGenerateEffect words={pageTitle} />
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {pageDescription}
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