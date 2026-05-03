import { 
  RoyTeamImg, 
  EmilyTeamImg, 
  AlexTeamImg, 
  MaxTeamImg, 
  BryonTeamImg, 
  JuliusTeamImg, 
  ValentineTeamImg,
  GeoLogo 
} from "@/constants/img";
import { VictorTeamImg } from "../images";
import JacksonTeamImg from "@/public/img/jackson.jpg";

export interface TeamMember {
  name: string;
  title: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  bio?: string;
}

export interface BoardMember {
  name: string;
  image: string;
  title?: string;
  bio?: string;
}

export interface Value {
  title: string;
  description: string;
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

export const boardMembers: BoardMember[] = [
  { name: "Dr. Victor Erude Lidaywa", image: VictorTeamImg.src, title: "Chairperson", bio: "CEO and President of The Gladys Erude Organization. CEO and Founder of AGE Rehab and Med Fitness in the United States. Driven by a deep altruistic commitment to caring for and empowering marginalized communities in honor of his mother, Gladys Erude. He resides in Illinois, USA." },
  { name: "Rev. Byron Erude", image: BryonTeamImg.src, title: "Board Member", bio: "Eastlands Coordinator, Kenya Youth for Christ, bringing expertise in event planning and management with a strong background in youth ministry. Passionate about positively impacting and changing the trajectory of a child's life by giving them the education they deserve. He resides in Nairobi, Kenya." },
  { name: "Julius Ngombo", image: JuliusTeamImg.src, title: "Board Member", bio: "Journalist with management experience at ITA Management Services (Quarry Department). Committed to serving God through serving others, with a strong passion for empowering youth and women in Kenya. His work is guided by integrity, compassion, and a desire for positive community impact. He is based in Mombasa, Kenya." },
  { name: "Max K Erude", image: MaxTeamImg.src, title: "Executive Secretary", bio: "Executive Secretary of The Gladys Erude Organization. Data science professional with experience in healthcare and insurance, specializing in data-driven strategy and analytics. Dedicated to uplifting communities and honoring the legacy of his mother, Gladys Erude. He resides in Texas, USA." },
  { name: "Silvester Erude", image: GeoLogo.src, title: "Treasurer", bio: "Treasurer of the Gladys Erude Organization with a background in education and instructional design. Upper Hill School Alum from Nairobi. Works with the finance team at GEO to keep things grounded and moving in the right direction. Based in Illinois, USA with his wife and two kids." },
  { name: "Jackson Adembesa, Eng.", image: JacksonTeamImg.src, title: "Board Member", bio: "Kenyan entrepreneur and business leader with a strong footprint across East and Central Africa. CEO of Tocil Limited and Managing Director of Kenzam Engineering Company Limited. Chairman of the Kapsabet Old Boys Association (KOBA). Known for resilience, visionary thinking, and execution, championing transformative projects that create economic value while fostering regional collaboration." },
  { name: "Chrispin Ng'ang'a", image: GeoLogo.src, title: "Board Member", bio: "Graduate of the University of Victoria with a degree in Engineering (M.Sc. Eng.). Based in Canada, serves as a Board Member focusing on initiatives that empower and support communities in Kenya." },
  { name: "Roy Oduor", image: RoyTeamImg.src, title: "Board Member", bio: "Forensic toxicologist at Quest Diagnostics, specializing in Federally regulated workplace drug testing. Expert in immunoassay screening, confirmation and interpretation of complex metabolic profiles. Committed to turning empathy into action, providing unwavering support to those who need it most. Driven to make a difference one dedicated action at a time. He resides in Kansas, USA." },
  { name: "Alex Gonzo", image: AlexTeamImg.src, title: "Board Member", bio: "Entrepreneur and Businessman building scalable ventures across healthcare, transportation, consumer products and digital platforms. His journey is rooted in persistence and growth, making a difference in the community at large." },
  { name: "Tony Erude Kirigano", image: GeoLogo.src, title: "Board Member", bio: "Ground Operations Officer in the aviation industry with 17 years experience. Applies the same discipline to building schools in Kenya - every project is planned, tracked, and delivered with zero tolerance for waste or delay. Co-founded the Gladys Adisa Erude Foundation in Kenya to honor his mother and ensure every donation is managed locally, transparently, and in direct partnership with communities." },
  { name: "Martha Valentine Masila", image: ValentineTeamImg.src, title: "Board Member", bio: "Trained hotelier and entrepreneur. Serves on the board to ensure every project meets the highest standards of dignity, service, and sustainability. Her background in hospitality shapes the Organization's approach: beneficiaries are not just recipients, they are guests deserving of respect, comfort, and care." },
  { name: "Emily Sang", image: EmilyTeamImg.src, title: "Board Member", bio: "Urban development and governance consultant strengthening public institutions and advancing sustainable development in Kenya. Provides strategic advisory support on governance reform, urban systems improvement, and institutional capacity strengthening. Strong commitment to youth and professional empowerment reflects the vision of GEO. She lives in Nairobi, Kenya." },
  { name: "Gloria Miseri", image: GeoLogo.src, title: "Board Member", bio: "Accountant by profession and entrepreneur. Dedicated, longstanding board member playing a key role in GEO's operations in Kenya. She resides in Nairobi, Kenya." },
];

export const values: Value[] = [
  { title: "Equality", description: "We believe that everyone should have equitable access to essential life sustaining services." },
  { title: "Integrity", description: "We have a deep passion for the mission and transparency is at the forefront of what we do. We are fair with colleagues, partners, and to those we serve." },
  { title: "Respect", description: "We value all people equally regardless of tribe, race, sex, religion, or gender." },
];