import { Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, GeoTeamAtPrimarySchool, GeoTeamWithPrincipal, GeoRepaintsSchool, GeoKidsReceiveAid, VictorAndGeoKids, GeoDonations, GeoTshirtPrizes } from "@/constants/img";

export const galleryImages = [
  Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8,
  GeoTeamAtPrimarySchool, GeoTeamWithPrincipal, GeoRepaintsSchool, GeoKidsReceiveAid, VictorAndGeoKids, GeoDonations, GeoTshirtPrizes
];

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
    title: "GEO Team Visits St. Michael's Primary School",
    date: "May 2026",
    category: "Project",
    image: GeoTeamAtPrimarySchool.src,
    excerpt: "Our team visited St. Michael's Primary School in Kilifi to assess the renovation progress and engage with the school community.",
  },
  {
    id: 2,
    title: "Meeting with St. Michael's School Principal",
    date: "May 2026",
    category: "Partnership",
    image: GeoTeamWithPrincipal.src,
    excerpt: "GEO team met with the school principal to discuss ongoing improvements and future collaboration plans.",
  },
  {
    id: 3,
    title: "School Repainting Project Underway",
    date: "May 2026",
    category: "Project",
    image: GeoRepaintsSchool.src,
    excerpt: "The school repainting project is in full swing, bringing fresh colors and renewed hope to the learning environment.",
  },
  {
    id: 4,
    title: "Children Receive Educational Aid",
    date: "April 2026",
    category: "Community",
    image: GeoKidsReceiveAid.src,
    excerpt: "GEO distributed educational supplies and materials to children in need, supporting their learning journey.",
  },
  {
    id: 5,
    title: "Victor Erude Engages with Local Children",
    date: "April 2026",
    category: "Team",
    image: VictorAndGeoKids.src,
    excerpt: "Our chairperson Victor Erude spent time with local children, listening to their stories and understanding their needs.",
  },
  {
    id: 6,
    title: "Donation Drive Collects Essential Supplies",
    date: "April 2026",
    category: "Donation",
    image: GeoDonations.src,
    excerpt: "Thanks to our generous donors, we collected essential supplies for distribution to underserved communities.",
  },
  {
    id: 7,
    title: "GEO Awards Prizes to Memorial Run Participants",
    date: "2025",
    category: "Event",
    image: GeoTshirtPrizes.src,
    excerpt: "Participants in our annual memorial run received commemorative t-shirts and prizes for their participation.",
  },
  {
    id: 8,
    title: "Gladys Erude Organization to Host 2026 Memorial Run",
    date: "January 15, 2026",
    category: "News",
    image: Img1.src,
    excerpt: "The Gladys Erude Organization continues to uphold the legacy of the late Gladys Erude through its annual Memorial Run...",
  },
  {
    id: 9,
    title: "GEO HEADS TO KILIFI COUNTY",
    date: "January 10, 2026",
    category: "Project",
    image: Img2.src,
    excerpt: "The Gladys Erude Organization will embark on a vital mission: the revitalization of St. Michael's School...",
  },
  {
    id: 10,
    title: "501(c)(3) Nonprofit Status Achieved",
    date: "December 20, 2025",
    category: "Milestone",
    image: Img3.src,
    excerpt: "We are proud to announce that the Gladys Erude Organization has officially been certified as a registered 501(c)(3)...",
  },
  {
    id: 11,
    title: "Memorial Run 2025 a Great Success",
    date: "September 2025",
    category: "Event",
    image: Img4.src,
    excerpt: "We are proud to share that the Gladys Erude Memorial Run at Tigoi Primary School was a great success!",
  },
  {
    id: 12,
    title: "Free Medical Camp Success",
    date: "2024",
    category: "Health",
    image: Img5.src,
    excerpt: "The dedicated nurses ran a free medical camp for the local community at Tigoi Primary School.",
  },
  {
    id: 13,
    title: "Hasbah Kenya Partnership",
    date: "2024",
    category: "Partner",
    image: Img6.src,
    excerpt: "Hasbah Kenya Limited donated sanitary towels to all teenage girls in the area.",
  },
];

export const pageTitle = "News & Updates";
export const pageDescription = "Stay updated with the latest news, events, and milestones from the Gladys Erude Organization";