import { Img1, Img2, Img3, Img4, Img5 } from "@/constants/img";
import { organizationStats } from "../organization/stats";

export { organizationStats };

export interface Project {
  id: number;
  title: string;
  description: string;
  raised: number;
  goal: number;
  date: string;
  author: string;
  image: string;
  removed?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "St. Michael's School - Kilifi County",
    description: "Revitalizing education in an underserved rural community along the coast. GEO is committed to transforming this learning environment—enhancing facilities, expanding educational resources, and creating greater opportunities for students.",
    raised: 8000,
    goal: 15000,
    date: "September 2026",
    author: "GEO",
    image: Img5.src,
  },
  {
    id: 2,
    title: "Tigoi Primary School - Vihiga County",
    description: "Ongoing improvements to support over 400 students with better learning facilities.",
    raised: 10000,
    goal: 15000,
    date: "Ongoing",
    author: "GEO",
    image: Img1.src,
  },
  {
    id: 3,
    title: "Free Medical Camps",
    description: "Providing free health screenings and medical outreach to underserved communities.",
    removed: true,
    raised: 3215,
    goal: 5000,
    date: "2024",
    author: "GEO",
    image: Img2.src,
  },
];

export const impactCta = {
  title: "Make a Difference Today",
  description: "Your donation directly impacts the lives of women and children in underserved communities. Every contribution brings us closer to our goal of transforming education across Kenya.",
  donateText: "Donate Now",
  gofundmeUrl: "https://gofund.me/323c458f",
  getInvolvedHref: "/get-involved",
};