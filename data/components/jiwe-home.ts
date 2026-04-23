import { Img14, Img13, Img4 } from "@/constants/img";

export interface JiweHomeProject {
  title: string;
  subtitle: string;
  bricksRaised: number;
  targetBricks: number;
  image: string;
}

export interface JiweHomeNews {
  label: string;
  title: string;
  date: string;
  image: string;
}

export const jiweHomeData = {
  header: {
    title: "Jiwe Kwa Jiwe",
    subtitle: "Track the classroom build in real time",
  },
  featuredProject: {
    title: "St. Micheal's Primary School Construction",
    subtitle: "Join us in making a lasting impact—be part of our Gladys Erude 5K Run as we come together to restore hope and rebuild a dilapidated school (St Michael's Primary, Kilifi county). Whether you choose to donate, volunteer, or participate, your support will help create a better learning environment for children in need. Let's run with purpose and give back to the next generation. Pamoja! Dreams are made by action.",
    bricksRaised: 500,
    targetBricks: 12000,
    image: Img14.src,
  },
  news: [
    { label: "News name here", title: "Annual 5km Run", date: "Nov 28, 2026", image: Img14.src },
    { label: "News name here", title: "Community Highlights", date: "April 28, 2026", image: Img13.src },
    { label: "News name here", title: "GEO Wins Charity Award 2026", date: "Jan 28, 2026", image: Img4.src },
  ],
};