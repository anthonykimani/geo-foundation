"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

async function getRunPageData() {
  const { getRunPage } = await import("@/lib/sanity/queries");
  return getRunPage();
}

function EventHighlights() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getRunPageData()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const eventHighlights = data?.eventHighlights || [];

  if (eventHighlights.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container px-4 sm:px-6 md:px-8 lg:px-[100px] max-w-[1440px] mx-auto">
        {eventHighlights.map((highlight: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={index === 0 ? "mb-8" : index === 1 ? "bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-8" : "text-center"}
          >
            {highlight.title && (
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-6">
                {highlight.title}
              </h2>
            )}
            {index === 0 ? (
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {(highlight.content || []).join(" ")}
              </p>
            ) : index === 1 ? (
              <>
                <h3 className="text-xl font-medium text-foreground mb-4">
                  {highlight.title}
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {(highlight.content || []).map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p className="text-lg text-muted-foreground mb-4">
                  {(highlight.content || [])[0]}
                </p>
                <p className="text-lg font-medium text-foreground">
                  {(highlight.content || [])[1]}
                </p>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default EventHighlights;