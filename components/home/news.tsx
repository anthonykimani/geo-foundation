"use client";

import Link from "next/link";
import { motion } from "motion/react";

const newsItems = [
  {
    id: 1,
    title: "Gladys Erude Organization to Host 2026 Memorial Run Honoring Late Radio Icon",
    date: "January 15, 2026",
    excerpt: "The Gladys Erude Organization continues to uphold the legacy of the late Gladys Erude through its annual Gladys Erude Memorial Run...",
    content: "The Gladys Erude Organization continues to uphold the legacy of the late Gladys Erude through its annual Gladys Erude Memorial Run, held in honor of the celebrated radio broadcasting icon. The late Gladys Erude was a respected figure in Kenya's media industry, widely admired for her dedication to radio broadcasting, her philanthropy, and her role as a loving mother. Her passion for community service and positive social impact remains the driving force behind the organization's work. The 2026 Gladys Erude Memorial Run is scheduled to take place in September 2026. Funds raised will be used to: Renovate and improve schools across Kenya, Organize free medical camps for underserved communities, Support and empower women from marginalized communities.",
  },
  {
    id: 2,
    title: "THE GLADYS ERUDE ORGANIZATION HEADS TO KILIFI COUNTY",
    date: "January 10, 2026",
    excerpt: "The Gladys Erude Organization will embark on a vital mission in 2026: the revitalization of St. Michael's School in Kilifi County...",
    content: "The Gladys Erude Organization will embark on a vital mission in 2026: the revitalization of St. Michael's School in Kilifi County - Kaloleni Sub-County. Located in an underserved rural community along the coast, the school is under-resourced yet filled with extraordinary potential. GEO is committed to transforming this learning environment—enhancing facilities, expanding educational resources, and creating greater opportunities for the students who need most. This initiative represents more than infrastructure improvement; it is an investment in hope, opportunity, and the future of an entire community. Join us in making a lasting difference.",
  },
  {
    id: 3,
    title: "GEO MILESTONE 2025 - 501(c)(3) Nonprofit Status Achieved",
    date: "December 20, 2025",
    excerpt: "We are proud to announce that the Gladys Erude Organization has officially been certified as a registered 501(c)(3) nonprofit...",
    content: "We are proud to announce that the Gladys Erude Organization has officially been certified as a registered 501(c)(3) nonprofit organization in the United States and has also secured full nonprofit status in Kenya. This significant milestone marks a new chapter in the organization's mission to empower women and children in underserved communities through education, health programs, economic opportunities, and social support. Key Focus Areas: Women's empowerment, Child education & health initiatives, Community development & leadership training.",
  },
];

function News() {
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
          {newsItems.map((item, index) => (
            <Link key={item.id} href="/gallery">
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