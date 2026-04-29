export const event = {
  title: "Annual 5km Run",
  subtitle: "Join us for our annual charity run! Every step helps build classrooms for children in need.",
  date: "2026-09-05T07:00:00",
  displayDate: "SEP 05, 2026 | KILIFI, KENYA",
  dateFormatted: "Sept 5th, 2026",
  time: "7:00 AM",
  location: "St Micheal Primary School",
  locationShort: "Kilifi",
};

export const eventInfo = {
  date: "2026-09-05T07:00:00",
  displayDate: "SEP 05, 2026 | KILIFI, KENYA",
  location: "Kilifi, Kenya",
};

export const route = {
  distance: "5KM",
  name: "The 5KM Route",
};

export const heroSection = {
  badgeText: "NEXT EVENT",
  title: "THE",
  highlight: "5KM = 1 BRICK",
  subtitle: "CHALLENGE",
  description:
    "You don't need money to build a school. You just need momentum. Register for the annual run, hook up your tracker, and let the Engine convert your mileage into physical structural blocks.",
};

export const eventDetails = {
  title: "Gladys Erude Memorial Run 2026",
  description: [
    "We are excited to invite you to our Annual Gladys Erude Memorial 5K Run/Walk, a special event dedicated to supporting improvements of schools across Kenya. Bring your friends and family for a day of fun, fitness, and making a real difference.",
    "This year, funds raised will support St. Michael's School in Kilifi County - an underserved rural community along the coast. Your participation will help enhance facilities, expand educational resources, and create greater opportunities for students who need it most.",
    "If you can't join us for the run/walk, you can still contribute to this worthy cause. Every donation, no matter the size, brings us closer to our goal. Your support is invaluable!",
  ],
  hashtags: "Pamoja! Dreams are made by action. #GladysErude5K #RunWalkForACause",
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

export const impactStats = {
  title: "Our Impact Over The Years",
  subtitle: "Over the past three years, the GEM Run has raised a total of $21,165",
  years: [
    { year: "2022", amount: "$10,000", isGoal: false },
    { year: "2023", amount: "$6,520", isGoal: false },
    { year: "2024", amount: "$4,645", isGoal: false },
    { year: "2026 Goal", amount: "$8,000", isGoal: true },
  ],
  goalDescription:
    "Our goal for 2026 is $8,000 – funds that will go directly toward enhancing educational facilities at Tigoi Primary School.",
};

export const getInvolved = {
  title: "Get Involved",
  description:
    "The 2026 event will take place at Tigoi Primary School on 6th September. You are invited to get involved as a participant, community partner, corporate partner, government partner or by donating.",
  cards: [
    {
      title: "Take Part in the 5K Run",
      description:
        "If you are a keen runner or simply want to experience the fun and fresh air, please take part in the memorial run. Entry is free.",
      buttonText: "Register Now",
      buttonUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdGsGAGpe9EdCwEcHmC2ugxYRHq9EUsaPs5NLffPOtvs57IHw/viewform",
    },
    {
      title: "Become a Partner",
      description:
        "Local businesses, community groups and government agencies are welcome to enquire about how they could become an event partner.",
      buttonText: "Contact Us",
      buttonUrl: "/contact",
    },
    {
      title: "Make a Donation",
      description:
        "GEO will raise funds to stage this community event and carry out targeted improvements to local school buildings.",
      buttonText: "Donate",
      buttonUrl: "https://gofund.me/323c458f",
    },
  ],
};

export const aboutRun = {
  title: "About the GEM Run",
  description: [
    "Following the success of the inaugural 5 km Gladys Erude Memorial Run (GEM Run) held in 2022 at Tigoi Primary School, the event has since grown into an annual flagship initiative. Each year, this event brings together the community as a celebration of health, unity, and purpose.",
    "This vibrant community event blends fun, fitness, and free medical screenings while raising funds to support infrastructure improvements in schools across educational facilities in Vihiga and Nandi Counties, Western Kenya.",
    "The GEM Run is organized by the Gladys Erude Organization (GEO), a non-profit founded in 2022 and registered in the United States, with an affiliate presence in Kenya. GEO's initiative aligns with our core mission to empower women and children in underserved communities by providing essential, life-sustaining services.",
  ],
  hashtags:
    "Pamoja! Dreams are made by action. #GladysErude5K #RunWalkForACause #RenovateTigoiPrimary #CharityRun",
};

export const donationInfo = {
  title: "To Support Us",
  description:
    "Your donation directly impacts the lives of women and children in underserved communities across Kenya. Every contribution brings us closer to our goal of transforming education and providing essential services.",
  alternativePayments: {
    title: "Alternative Payment Methods",
    mpesa: {
      paybill: "522522",
      account: "1332946089",
    },
    bank: {
      name: "Kenya Commercial Bank",
      account: "1332946089",
      accountName: "GLADYS ADISA ERUDE FOUNDATION",
    },
    gofundme: "https://gofund.me/323c458f",
  },
};

export const registrationUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdGsGAGpe9EdCwEcHmC2ugxYRHq9EUsaPs5NLffPOtvs57IHw/viewform";