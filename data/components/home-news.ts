export interface HomeNewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export const homeNewsItems: HomeNewsItem[] = [
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

export const homeNewsSection = {
  title: "Latest News",
  subtitle: "Stay updated with the latest from the Gladys Erude Organization",
};