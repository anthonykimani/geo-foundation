"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

async function getNewsData() {
  const { getNews } = await import("@/lib/sanity/queries");
  return getNews();
}

function News() {
  const [newsItems, setNewsItems] = useState<any[]>([]);

  useEffect(() => {
    getNewsData()
      .then(setNewsItems)
      .catch(() => setNewsItems([]));
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-4">
            Latest News
          </h2>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest from the Gladys Erude Organization
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.slice(0, 3).map((item: any, index: number) => (
            <Link key={item._id || index} href="/gallery">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <p className="text-sm text-primary mb-2">{item.date}</p>
                <h3 className="text-lg font-medium text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.excerpt}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default News;