export const eventInfo = {
  date: "2026-09-05T07:00:00",
  displayDate: "SEP 05, 2026 | TIGOI, KENYA",
  location: "Tigoi, Kenya",
};

export const route = {
  distance: "5KM",
  name: "The 5KM Route",
};

export interface EventHighlight {
  title: string;
  content: string[];
}

export const eventHighlights: EventHighlight[] = [
  {
    title: "Gladys Erude Memorial Run 2025",
    content: [
      "We are proud to share that the Gladys Erude Memorial Run at Tigoi Primary School was a great success! As the Organizing Board, we extend our heartfelt gratitude to everyone who made this event truly memorable. Your support and participation helped us honor the legacy of Gladys Erude in a meaningful and impactful way.",
    ],
  },
  {
    title: "A special thank you goes to:",
    content: [
      "The dedicated nurses who generously volunteered their time to run a free medical camp for the local community",
      "The school management and teachers of Tigoi Primary School for their unwavering support",
      "The residents of Tigoi for their warm hospitality and encouragement",
      "AFC Leopards – Sabatia Branch, for their active and spirited participation",
      "Our valued donors, whose contributions helped bring the event to life",
      "Our esteemed partner, Hasbah Kenya Limited, for their generous donation of sanitary towels to all teenage girls in the area",
    ],
  },
  {
    title: "",
    content: [
      "We are truly grateful to everyone who came together to make this event a success. We look forward to welcoming you again next year for another inspiring and impactful Gladys Erude Memorial Run.",
      "With gratitude, The Organizing Board",
    ],
  },
];

export const registrationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdGsGAGpe9EdCwEcHmC2ugxYRHq9EUsaPs5NLffPOtvs57IHw/viewform";