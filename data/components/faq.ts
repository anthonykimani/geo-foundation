export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData = {
  header: {
    label: "Frequently asked questions",
    title: "Got questions?\nWe've got answers!",
    subtitle: "Discover answers to common questions about our events, processes, and more. We're happy to help!",
  },
  tabs: [{ label: "General" }],
  faqs: [
    {
      question: "How Does the $1 = 1 Brick Model Work?",
      answer: "Every dollar you donate directly funds the purchase of one physical brick for our classroom construction project at St. Micheal's Primary School in Kilifi County, Kenya. We negotiate bulk pricing with local suppliers to maximize your impact, and every brick is accounted for in our public ledger. Once the classroom is complete, donors receive a digital certificate showing exactly how many bricks they contributed.",
    },
    {
      question: "How Is Donation Transparency Ensured?",
      answer: "We publish quarterly impact reports detailing every shilling spent — from brick purchases and contractor payments to community program costs. Our finances are independently audited by a third-party firm, and we share real-time construction updates via photo galleries, GPS-tagged progress maps, and live video walkthroughs on our website and social media channels.",
    },
    {
      question: "Can I Track My Brick Contribution?",
      answer: "Yes. After donating, you'll receive a unique contribution ID that lets you track your bricks through our online dashboard. You'll see when your bricks were purchased, delivered to the site, and laid in the wall. For donations of $50 or more, we also offer the option to have your name or a short message engraved on a commemorative plaque inside the completed classroom.",
    },
    {
      question: "How Does the 5km Run Convert to Bricks?",
      answer: "The annual Gladys Erude Memorial Run is both a fundraiser and awareness campaign. Your registration fee covers event costs, while every additional dollar you raise or donate goes straight to bricks. Corporate sponsors often match runner donations brick-for-brick, meaning a single participant can generate hundreds of bricks. Last year's run funded over 12,000 bricks — roughly 20% of the classroom walls.",
    },
    {
      question: "Are Corporate Partnerships Available?",
      answer: "Absolutely. We offer structured partnership tiers for businesses, from local Kenyan enterprises to international organizations. Partners receive branding on construction signage, recognition in our annual report, team volunteer days at the build site, and custom impact dashboards tracking their contribution. Contact us at partnerships@gladyserudeorganization.org to discuss co-branded campaigns or employee giving programs.",
    },
    {
      question: "Where Is the Classroom Being Built?",
      answer: "The classroom is being constructed at St. Micheal's Primary School in Kilifi County, Coastal Kenya — the same community where Gladys Erude was born and raised. The school currently serves over 400 children but lacks adequate learning spaces, with some classes held outdoors under trees. Our goal is to build a durable, weather-resistant classroom that will serve the community for decades.",
    },
    {
      question: "How Can I Volunteer?",
      answer: "We welcome volunteers both locally and internationally. On-site opportunities include assisting with classroom construction, teaching literacy workshops, or helping with our women's microfinance programs. Remote volunteers can support us with grant writing, graphic design, social media management, or translation services. All volunteers undergo a brief orientation, and international placements include accommodation coordination. Apply through our volunteer form or email volunteer@gladyserudeorganization.org.",
    },
  ],
};