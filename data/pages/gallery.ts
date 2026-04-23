import { Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8 } from "@/constants/img";

export const galleryImages = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8];

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
}

export const newsItems: NewsItem[] = [
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

export const pageTitle = "News & Updates";
export const pageDescription = "Stay updated with the latest news, events, and milestones from the Gladys Erude Organization";