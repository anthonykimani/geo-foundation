import { RoyTeamImg, EmilyTeamImg, AlexTeamImg, MaxTeamImg, BryonTeamImg, JuliusTeamImg, ValentineTeamImg } from "@/constants/img";
import { VictorTeamImg } from "@/data/images";

export interface TeamMember {
  name: string;
  title: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  bio?: string;
}

export const teamData = {
  header: {
    label: "TEAM",
    title: "The Hearts Behind The Mission",
  },
  members: [
    {
      name: "Victor E Lidaywa",
      title: "Chairperson",
      image: VictorTeamImg.src,
      linkedin: "#",
      twitter: "#",
      bio: "Victor brings over 20 years of leadership experience in community development and nonprofit management. He has spearheaded numerous educational initiatives across East Africa.",
    },
    {
      name: "Roy Oduor",
      title: "Co-Organizer",
      image: RoyTeamImg.src,
      linkedin: "#",
      twitter: "#",
      bio: "Roy is a passionate community organizer who has dedicated his career to youth empowerment and education. He coordinates our annual memorial run events.",
    },
    {
      name: "Emily Sang",
      title: "Co-Organizer",
      image: EmilyTeamImg.src,
      linkedin: "#",
      twitter: "#",
      bio: "Emily leads our women's empowerment programs and has successfully launched several microfinance initiatives for underserved communities.",
    },
    {
      name: "Alex Gonzo",
      title: "Co-Organizer",
      image: AlexTeamImg.src,
      linkedin: "#",
      twitter: "#",
      bio: "Alex manages our partnerships and fundraising strategies, bringing extensive experience in corporate social responsibility.",
    },
    {
      name: "Maxwell Erude",
      title: "Co-Organizer",
      image: MaxTeamImg.src,
      linkedin: "#",
      twitter: "#",
      bio: "Maxwell oversees our operations in Kenya, working closely with local schools and community leaders to ensure project success.",
    },
    {
      name: "Byron Erude",
      title: "Country Coordinator Kenya",
      image: BryonTeamImg.src,
      linkedin: "#",
      twitter: "#",
      bio: "Byron serves as our primary liaison in Kenya, coordinating all on-ground activities and maintaining relationships with local partners.",
    },
    {
      name: "Julius Ngombo",
      title: "Board Member",
      image: JuliusTeamImg.src,
      linkedin: "#",
      twitter: "#",
      bio: "Julius brings expertise in finance and resource management, ensuring transparent and efficient use of donor funds.",
    },
    {
      name: "Valentine Masila",
      title: "Board Member",
      image: ValentineTeamImg.src,
      linkedin: "#",
      twitter: "#",
      bio: "Valentine leads our healthcare initiatives and has organized numerous medical camps serving rural communities.",
    },
  ] as TeamMember[],
};