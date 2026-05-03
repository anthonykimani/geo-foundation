import { Img1, Img2, Img3, Img4, Img5 } from "@/constants/img";
import { jiweStats } from "../organization/stats";

export { jiweStats };

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export interface Milestone {
  title: string;
  description: string;
  target: number;
}

export interface FeaturedProject {
  title: string;
  subtitle: string;
  bricksRaised: number;
  targetBricks: number;
  image: string;
}

export interface JiweNewsItem {
  label: string;
  title: string;
  date: string;
  image: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: "1",
    title: "Donate or Run",
    description: "Every $1 donated equals 1 brick. Every 5KM tracked equals 1 brick.",
  },
  {
    number: "2",
    title: "The Engine Converts",
    description: "Your actions are directly verified and converted into logical units pushing the master counter.",
  },
  {
    number: "3",
    title: "We Build Physical Impact",
    description: "Once milestones are hit, logistics deploy. Progress is documented and published transparently.",
  },
];

export const milestones: Milestone[] = [
  {
    title: "Phase 1: Ground Breaking",
    description: "First 4,000 Bricks secured.",
    target: 4000,
  },
  {
    title: "Phase 2: Central Structure",
    description: "Expansion target. 8,000 Bricks total.",
    target: 8000,
  },
  {
    title: "Phase 3: Completion",
    description: "Final enclosure. 12,000 Bricks total.",
    target: 12000,
  },
];

export const featuredProject: FeaturedProject = {
  title: "St. Michael's School - Kilifi County",
  subtitle: "Revitalizing education in an underserved coastal community.",
  bricksRaised: 21165,
  targetBricks: 8000,
  image: Img5.src,
};

export const jiweNews: JiweNewsItem[] = [
  { label: "News", title: "Annual 5km Run", date: "Nov 28, 2026", image: Img1.src },
  { label: "News", title: "Here Hasbah Kenya Iimited donated 32 cartons of sanitary towels for school girls of age, to be distributed during the 4th annual Gem run held at Tigoi primary school", date: "April 28, 2026", image: Img2.src },
  { label: "News", title: "GEO Wins Charity Award 2026", date: "Jan 28, 2026", image: Img3.src },
  { label: "News", title: "Phase 2 Complete", date: "Dec 15, 2025", image: Img4.src },
];

export const currentBricks = 1500;

export const jiweCta = {
  title: "Join the Movement",
  description: "Be part of something bigger. Together we can make a lasting impact on communities across Kenya.",
  donateText: "Donate",
  registerText: "Register",
  contactText: "Contact",
};