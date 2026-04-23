import { Img11, Img15, Img17, Img5, Img6, Img7, Img8, Img9 } from "@/constants/img";

export interface ImpactItem {
  label: string;
  title: string;
  description?: string;
  image: string;
}

export const impactAreasData = {
  header: {
    title: "Our Impact Areas",
    subtitle: "Some of the notable projects we've undertaken",
  },
  featuredImpact: {
    label: "FEATURED",
    title: "Kapsagawat Primary School",
    description: "Sanitary pads were provided to over 200 girls at both schools in partnership with the Centre for Advocacy on the Rights of Youth Africa, while seniors received free medical checks.",
    image: Img9.src,
  },
  impacts: [
    {
      label: "Education",
      title: "Tigoi Primary School",
      image: Img5.src,
    },
    {
      label: "Healthcare",
      title: "Free Medical Camp",
      image: Img6.src,
    },
    {
      label: "Women",
      title: "Hasbah Kenya Partnership",
      description: "Sanitary pad distribution to teenage girls",
      image: Img7.src,
    },
    {
      label: "Community",
      title: "Memorial Run 2025",
      image: Img8.src,
    },
  ],
};