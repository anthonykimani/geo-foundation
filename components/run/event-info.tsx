"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { getImageUrl } from "@/lib/sanity";

async function getRunPageData() {
  const { getRunPage } = await import("@/lib/sanity/queries");
  return getRunPage();
}

function EventInfo() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getRunPageData()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const title = data?.eventDetailsTitle || "Event Details";
  const description = data?.eventDetailsDescription || [];
  const hashtags = data?.runHashtags || "#GERun2025";
  const eventImage = data?.eventImage;
  const eventImageUrl = getImageUrl(eventImage);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
              {title}
            </h2>
            {description.map((paragraph: string, index: number) => (
              <p
                key={index}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
                dangerouslySetInnerHTML={{
                  __html: paragraph.replace(
                    /St\. Michael's School in Kilifi County/g,
                    "<strong>St. Michael's School in Kilifi County</strong>"
                  ),
                }}
              />
            ))}
            <p className="text-lg text-primary font-medium">
              {hashtags}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden"
          >
            {eventImageUrl ? (
              <Image
                src={eventImageUrl}
                alt="Run Event"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default EventInfo;