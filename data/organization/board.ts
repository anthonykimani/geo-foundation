import { AlexTeamImg, BryonTeamImg, EmilyTeamImg, GeoLogo, JuliusTeamImg, MaxTeamImg, RoyTeamImg, ValentineTeamImg } from "@/constants/img";

export interface BoardMember {
  name: string;
  image: string;
}

export interface Value {
  title: string;
  description: string;
}

export const boardMembers: BoardMember[] = [
  { name: "Victor E Lidaywa", image: GeoLogo.src },
  { name: "Alex Gonzo", image: AlexTeamImg.src },
  { name: "Byron Erude", image: BryonTeamImg.src },
  { name: "Chrispin Ng'ang'a", image: GeoLogo.src },
  { name: "Emily Sang", image: EmilyTeamImg.src },
  { name: "Gloria Miseri", image: GeoLogo.src },
  { name: "Julius Ngombo", image: JuliusTeamImg.src },
  { name: "Maxwell Erude", image: MaxTeamImg.src },
  { name: "Purity Chepkirui", image: GeoLogo.src },
  { name: "Roy Oduor", image: RoyTeamImg.src },
  { name: "Silvester Erude", image: GeoLogo.src },
  { name: "Tony K. Erude", image: GeoLogo.src },
  { name: "Valentine Masila", image: ValentineTeamImg.src },
];

export const values: Value[] = [
  { title: "Equality", description: "We believe that everyone should have equitable access to essential life sustaining services." },
  { title: "Integrity", description: "We have a deep passion for the mission and transparency is at the forefront of what we do. We are fair with colleagues, partners, and to those we serve." },
  { title: "Respect", description: "We value all people equally regardless of tribe, race, sex, religion, or gender." },
];