"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8 } from "@/constants/img";
import { Button } from "@/components/ui/button";

const galleryImages = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8];

const newsItems = [
  {
    id: 1,
    title: "Gladys Erude Organization to Host 2026 Memorial Run",
    date: "January 15, 2026",
    category: "News",
    image: galleryImages[0].src,
    content: `The Gladys Erude Organization continues to uphold the legacy of the late Gladys Erude through its annual Gladys Erude Memorial Run, held in honor of the celebrated radio broadcasting icon.

The late Gladys Erude was a respected figure in Kenya's media industry, widely admired for her dedication to radio broadcasting, her philanthropy, and her role as a loving mother. Her passion for community service and positive social impact remains the driving force behind the organization's work.

The 2026 Gladys Erude Memorial Run is scheduled to take place in September 2026. The event brings together individuals, organizations, and well-wishers who share a common goal of giving back to society and transforming lives.

Funds raised from this year's memorial run will be used to:
- Renovate and improve schools across Kenya
- Organize free medical camps for underserved communities
- Support and empower women from marginalized and underserved communities

The Gladys Erude Organization is calling upon well-wishers, partners, and the general public to donate and support this noble cause.`,
  },
  {
    id: 2,
    title: "THE GLADYS ERUDE ORGANIZATION HEADS TO KILIFI COUNTY",
    date: "January 10, 2026",
    category: "Project",
    image: galleryImages[1].src,
    content: `The Gladys Erude Organization will embark on a vital mission in 2026: the revitalization of St. Michael's School in Kilifi County - Kaloleni Sub-County.

Located in an underserved rural community along the coast, the school is under-resourced yet filled with extraordinary potential. GEO is committed to transforming this learning environment—enhancing facilities, expanding educational resources, and creating greater opportunities for the students who need it most.

This initiative represents more than infrastructure improvement; it is an investment in hope, opportunity, and the future of an entire community.

Join us in making a lasting difference.`,
  },
  {
    id: 3,
    title: "GEO MILESTONE 2025 - 501(c)(3) Nonprofit Status Achieved",
    date: "December 20, 2025",
    category: "Milestone",
    image: galleryImages[2].src,
    content: `We are proud to announce that the Gladys Erude Organization has officially been certified as a registered 501(c)(3) nonprofit organization in the United States and has also secured full nonprofit status in Kenya.

This significant milestone marks a new chapter in the organization's mission to empower women and children in underserved communities through education, health programs, economic opportunities, and social support.

"This certification not only legitimizes our work on an international scale, but it also opens the door to broader partnerships, grants, and impact," said Victor Erude, Founder and Executive Director. "We are more committed than ever to transforming lives across borders."

With dual certification, the Gladys Erude Organization is now fully equipped to operate and fundraise globally, enabling donors and partners in the U.S. to make tax-deductible contributions, while expanding on-the-ground impact in Kenyan communities.

Key Focus Areas:
- Women's empowerment
- Child education & health initiatives
- Community development & leadership training`,
  },
  {
    id: 4,
    title: "Memorial Run 2025 a Great Success",
    date: "September 2025",
    category: "Event",
    image: galleryImages[3].src,
    content: `We are proud to share that the Gladys Erude Memorial Run at Tigoi Primary School was a great success!

As the Organizing Board, we extend our heartfelt gratitude to everyone who made this event truly memorable. Your support and participation helped us honor the legacy of Gladys Erude in a meaningful and impactful way.

A special thank you goes to:
- The dedicated nurses who generously volunteered their time to run a free medical camp for the local community
- The school management and teachers of Tigoi Primary School for their unwavering support
- The residents of Tigoi for their warm hospitality and encouragement
- AFC Leopards – Sabatia Branch, for their active and spirited participation
- Our valued donors, whose contributions helped bring the event to life
- Our esteemed partner, Hasbah Kenya Limited, for their generous donation of sanitary towels to all teenage girls in the area

We are truly grateful to everyone who came together to make this event a success. We look forward to welcoming you again next year for another inspiring and impactful Gladys Erude Memorial Run.

With gratitude,
The Organizing Board`,
  },
  {
    id: 5,
    title: "Free Medical Camp Success",
    date: "2024",
    category: "Health",
    image: galleryImages[4].src,
    content: `The dedicated nurses ran a free medical camp for the local community at Tigoi Primary School.

This initiative is part of GEO's commitment to providing essential health services to underserved communities. The medical camp provided free health screenings, consultations, and medications to local residents.

We thank all the medical professionals who volunteered their time and expertise to make this event a success.`,
  },
  {
    id: 6,
    title: "Hasbah Kenya Partnership",
    date: "2024",
    category: "Partner",
    image: galleryImages[5].src,
    content: `Hasbah Kenya Limited made a generous donation of sanitary towels to all teenage girls in the Tigoi area.

This partnership exemplifies the kind of corporate social responsibility that GEO seeks to build. Together with partners like Hasbah Kenya, we can make a real difference in the lives of young women in underserved communities.

Thank you to Hasbah Kenya Limited for your support.`,
  },
];

function GalleryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const newsItem = newsItems.find((item) => item.id === id) || newsItems[0];

  const currentIndex = newsItems.findIndex((item) => item.id === id);
  const prevId = currentIndex > 0 ? newsItems[currentIndex - 1].id : null;
  const nextId = currentIndex < newsItems.length - 1 ? newsItems[currentIndex + 1].id : null;

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
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1.5 bg-primary text-white text-xs rounded mb-4">
                  {newsItem.category}
                </span>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-4">
                  {newsItem.title}
                </h1>

                <p className="text-sm text-muted-foreground mb-6">{newsItem.date}</p>

                <div className="prose prose-lg text-muted-foreground">
                  {newsItem.content.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-8 border-t border-gray-200">
                {prevId ? (
                  <Link href={`/gallery/${prevId}`}>
                    <Button variant="outline">← Previous</Button>
                  </Link>
                ) : (
                  <Button variant="outline" disabled>← Previous</Button>
                )}

                {nextId ? (
                  <Link href={`/gallery/${nextId}`}>
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