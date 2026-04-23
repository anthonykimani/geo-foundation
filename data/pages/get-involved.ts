import { Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8 } from "@/constants/img";
import { contacts, generalEmail } from "../organization/contact";

export { contacts, generalEmail };

export interface InvolvementCard {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  variant: "primary" | "secondary" | "outline";
  animationIndex: number;
}

export const involvementCards: InvolvementCard[] = [
  {
    image: Img2.src,
    title: "Make a Donation",
    description: "Support our mission to empower women and children in underserved communities across Kenya. All donations are tax-deductible.",
    buttonText: "Donate Now",
    variant: "primary",
    animationIndex: 0,
  },
  {
    image: Img3.src,
    title: "Join the Memorial Run",
    description: "Participate in our annual 5K run. Every step helps build classrooms for children in need.",
    buttonText: "Register",
    variant: "secondary",
    animationIndex: 1,
  },
  {
    image: Img5.src,
    title: "Boots on the Ground",
    description: "Submit your manifest to logistics. We require organizers, physical laborers, and digital strategists.",
    buttonText: "Submit Application",
    variant: "secondary",
    animationIndex: 2,
  },
  {
    image: Img7.src,
    title: "Corporate Sponsorship",
    description: "Fund entire milestones. Sponsors receive ledger credits and permanent physical plaques on the structure.",
    buttonText: "Request Deal Book",
    variant: "secondary",
    animationIndex: 3,
  },
  {
    image: Img3.src,
    title: "Become a Partner",
    description: "Partner with us to expand our impact. We welcome corporations, NGOs, and government agencies.",
    buttonText: "Contact Us",
    variant: "secondary",
    animationIndex: 4,
  },
  {
    image: Img6.src,
    title: "Spread the Word",
    description: "Share our mission with your network. Help us reach more communities that need support.",
    buttonText: "Share",
    variant: "outline",
    animationIndex: 5,
  },
];

export const shareText = "Support the Gladys Erude Organization! Together we can empower women and children in underserved communities across Kenya. Join us in making a difference. #GEO #Charity #Kenya";
export const shareUrl = "https://gladyserudeorganization.org";

export const getInvolvedCta = {
  title: "Ready to Make a Difference?",
  description: "Your support helps us empower women and children in underserved communities across Kenya.",
  buttonText: "Donate Now",
};