import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env') })

const client = createClient({
  projectId: 'v180y67k',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

// ============================================================
// SITE SETTINGS
// ============================================================
const siteSettings = {
  organizationName: "THE GLADYS ERUDE ORGANIZATION",
  organizationDescription: "Empowering women and children in underserved communities across Kenya through education, health programs, and community development.",
  generalEmail: "info@gladyserudeorganization.org",
  mailingAddress: "gemrunkenya@gmail.com",
  googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdGsGAGpe9EdCwEcHmC2ugxYRHq9EUsaPs5NLffPOtvs57IHw/viewform",
}

// ============================================================
// STATS
// ============================================================
const stats = [
  { value: "21,165+", label: "TOTAL RAISED (USD)", variant: "default", type: "organization" },
  { value: "3", label: "ACTIVE PROJECTS", variant: "default", type: "organization" },
  { value: "500+", label: "STUDENTS IMPACTED", variant: "default", type: "organization" },
  { value: "21,165+", label: "Total Raised", variant: "primary", type: "jiwe" },
  { value: "501(c)(3)", label: "Certified", variant: "primary", type: "jiwe" },
  { value: "2026", label: "Year", variant: "default", type: "jiwe" },
  { value: "8,000", label: "2026 Target", variant: "default", type: "jiwe" },
]

// ============================================================
// SOCIAL LINKS
// ============================================================
const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/thegladyserudeorganization", icon: "facebook", platform: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/thegladyserudeorganization", icon: "instagram", platform: "instagram" },
  { label: "TikTok", href: "https://www.tiktok.com/@g.e.o_01", icon: "tiktok", platform: "tiktok" },
  { label: "YouTube", href: "https://youtube.com/@GladysErudeOrganization", icon: "youtube", platform: "youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/the-gladys-erude-organization-geo", icon: "linkedin", platform: "linkedin" },
]

// ============================================================
// TEAM MEMBERS
// ============================================================
const teamMembers = [
  { name: "Victor E Lidaywa", title: "Chairperson", bio: "Victor brings over 20 years of leadership experience in community development.", linkedin: "#", twitter: "#" },
  { name: "Roy Oduor", title: "Co-Organizer", bio: "Roy is a passionate community organizer dedicated to youth empowerment.", linkedin: "#", twitter: "#" },
  { name: "Emily Sang", title: "Co-Organizer", bio: "Emily leads our women's empowerment programs.", linkedin: "#", twitter: "#" },
  { name: "Alex Gonzo", title: "Co-Organizer", bio: "Alex manages our partnerships and fundraising strategies.", linkedin: "#", twitter: "#" },
  { name: "Maxwell Erude", title: "Co-Organizer", bio: "Maxwell oversees our operations in Kenya.", linkedin: "#", twitter: "#" },
  { name: "Byron Erude", title: "Country Coordinator Kenya", bio: "Byron serves as our primary liaison in Kenya.", linkedin: "#", twitter: "#" },
  { name: "Julius Ngombo", title: "Board Member", bio: "Julius brings expertise in finance and resource management.", linkedin: "#", twitter: "#" },
  { name: "Valentine Masila", title: "Board Member", bio: "Valentine leads our healthcare initiatives.", linkedin: "#", twitter: "#" },
]

// ============================================================
// BOARD MEMBERS
// ============================================================
const boardMembers = [
  { name: "Dr. Victor Erude Lidaywa", title: "Chairperson", bio: "CEO and President of The Gladys Erude Organization." },
  { name: "Rev. Byron Erude", title: "Board Member", bio: "Eastlands Coordinator, Kenya Youth for Christ." },
  { name: "Julius Ngombo", title: "Board Member", bio: "Journalist with management experience." },
  { name: "Max K Erude", title: "Executive Secretary", bio: "Data science professional." },
  { name: "Silvester Erude", title: "Treasurer", bio: "Background in education and instructional design." },
  { name: "Jackson Adembesa, Eng.", title: "Board Member", bio: "CEO of Tocil Limited." },
  { name: "Chrispin Ng'ang'a", title: "Board Member", bio: "Graduate of the University of Victoria." },
  { name: "Roy Oduor", title: "Board Member", bio: "Forensic toxicologist at Quest Diagnostics." },
  { name: "Alex Gonzo", title: "Board Member", bio: "Entrepreneur and Businessman." },
  { name: "Tony Erude Kirigano", title: "Board Member", bio: "Ground Operations Officer in aviation." },
  { name: "Martha Valentine Masila", title: "Board Member", bio: "Trained hotelier and entrepreneur." },
  { name: "Emily Sang", title: "Board Member", bio: "Urban development and governance consultant." },
  { name: "Gloria Miseri", title: "Board Member", bio: "Accountant by profession." },
]

// ============================================================
// VALUES
// ============================================================
const values = [
  { title: "Equality", description: "We believe that everyone should have equitable access to essential life sustaining services." },
  { title: "Integrity", description: "We have a deep passion for the mission and transparency is at the forefront." },
  { title: "Respect", description: "We value all people equally regardless of tribe, race, sex, religion, or gender." },
]

// ============================================================
// NEWS
// ============================================================
const newsItems = [
  { id: 1, title: "GEO Team Visits St. Michael's Primary School", date: "May 2026", category: "Project", excerpt: "Our team visited St. Michael's Primary School in Kilifi." },
  { id: 2, title: "Meeting with St. Michael's School Principal", date: "May 2026", category: "Partnership", excerpt: "GEO team met with the school principal." },
  { id: 3, title: "School Repainting Project Underway", date: "May 2026", category: "Project", excerpt: "The school repainting project is in full swing." },
  { id: 4, title: "Children Receive Educational Aid", date: "April 2026", category: "Community", excerpt: "GEO distributed educational supplies." },
  { id: 5, title: "Victor Erude Engages with Local Children", date: "April 2026", category: "Team", excerpt: "Our chairperson spent time with local children." },
  { id: 6, title: "Donation Drive Collects Essential Supplies", date: "April 2026", category: "Donation", excerpt: "Thanks to our generous donors." },
  { id: 7, title: "GEO Awards Prizes to Memorial Run Participants", date: "2025", category: "Event", excerpt: "Participants received commemorative t-shirts." },
  { id: 8, title: "Gladys Erude Organization to Host 2026 Memorial Run", date: "January 15, 2026", category: "News", excerpt: "Upholding the legacy of the late Gladys Erude." },
  { id: 9, title: "GEO HEADS TO KILIFI COUNTY", date: "January 10, 2026", category: "Project", excerpt: "Embarking on a vital mission." },
  { id: 10, title: "501(c)(3) Nonprofit Status Achieved", date: "December 20, 2025", category: "Milestone", excerpt: "Officially certified as a registered nonprofit." },
  { id: 11, title: "Memorial Run 2025 a Great Success", date: "September 2025", category: "Event", excerpt: "The memorial run was a great success!" },
  { id: 12, title: "Free Medical Camp Success", date: "2024", category: "Health", excerpt: "Free medical camp for the local community." },
  { id: 13, title: "Hasbah Kenya Partnership", date: "2024", category: "Partner", excerpt: "Donated sanitary towels to teenage girls." },
]

// ============================================================
// PROJECTS
// ============================================================
const projects = [
  { id: 1, title: "St. Michael's School - Kilifi County", description: "Revitalizing education in an underserved rural community along the coast.", raised: 8000, goal: 15000, date: "September 2026", author: "GEO", location: "Kilifi County", status: "active" },
  { id: 2, title: "Tigoi Primary School - Vihiga County", description: "Ongoing improvements to support over 400 students.", raised: 10000, goal: 15000, date: "Ongoing", author: "GEO", location: "Vihiga County", status: "active" },
  { id: 3, title: "Free Medical Camps", description: "Providing free health screenings and medical outreach.", raised: 3215, goal: 5000, date: "2024", author: "GEO", location: "Various", status: "paused" },
]

// ============================================================
// PAGE: HOME
// ============================================================
const homePage = {
  scrollText: "SCROLL TO EXPLORE",
  bricksRaised: 1500,
  targetBricks: 15000,
  targetDate: "2026-09-05T08:00:00",
  countdownTitle: "NEXT EVENT: SEP 05, 2026 | KILIFI, KENYA",
  features: [
    { number: "01", title: "Transparency", description: "Every Brick donated is tracked in real time" },
    { number: "02", title: "Community Participation", description: "Donors, runners, and partners build together." },
    { number: "03", title: "Measurable Impact", description: "Clear construction targets and progress reports." },
    { number: "04", title: "Sustainable Structure", description: "From event to year-round fundraising ecosystem." },
  ],
  newsSectionTitle: "Latest News",
  newsSectionSubtitle: "Stay updated with the latest from the Gladys Erude Organization",
}

// ============================================================
// PAGE: ABOUT
// ============================================================
const aboutPage = {
  missionTitle: "Our Mission",
  missionContent: "By 2030, GEO aims to empower at least 10,000 women and children in underserved communities across Kenya by providing access to essential services such as education, healthcare, and economic opportunities. Founded in 2022, GEO is a non-profit organization registered in the United States with active partnerships in Kenya.",
  whyWeAreInspiredTitle: "Why We Are Inspired",
  whyWeAreInspiredContent: [
    "Respected Kenyan journalist and community advocate, Gladys Adisa Erude, died in August 2021 after a battle with cancer. Gladys was born in Tigoi, Vihiga County, where she attended Tigoi Primary School and Lugulu Girls High School.",
    "Through GEO, her six sons seek to uphold their mother's dedication to children's education and women's empowerment.",
  ],
  howWeWorkTitle: "How We Work",
  howWeWorkContent: "We work with affiliated partners, local and civic leaders to identify challenges and opportunities in focus regions of Kenya.",
  ctaTitle: "Join the Movement",
  ctaDescription: "Be part of something bigger. Together we can make a lasting impact on communities across Kenya.",
  ctaButtonText: "Get Involved",
  ctaHref: "/get-involved",
  organizationName: "THE GLADYS ERUDE ORGANIZATION",
  organizationSubtitle: "Empowering communities through education, healthcare, and sustainable development across Kenya.",
}

// ============================================================
// PAGE: RUN
// ============================================================
const runPage = {
  eventTitle: "Annual 5km Run",
  eventSubtitle: "Join us for our annual charity run! Every step helps build classrooms for children in need.",
  date: "2026-09-05T08:00:00",
  displayDate: "SEP 05, 2026 | KILIFI, KENYA",
  dateFormatted: "Sept 5th, 2026",
  time: "8:00 AM",
  location: "St Micheal Primary School",
  locationShort: "Kilifi",
  badgeText: "NEXT EVENT",
  heroTitle: "THE",
  heroHighlight: "5KM = 1 BRICK",
  heroSubtitle: "CHALLENGE",
  heroDescription: "You don't need money to build a school. You just need momentum. Register for the annual run, hook up your tracker, and let the Engine convert your mileage into physical structural blocks.",
  eventDetailsTitle: "Gladys Erude Memorial Run 2026",
  eventDetailsDescription: [
    "We are excited to invite you to our Annual Gladys Erude Memorial 5K Run/Walk, a special event dedicated to supporting improvements of schools across Kenya.",
    "This year, funds raised will support St. Michael's School in Kilifi County.",
    "If you can't join us for the run/walk, you can still contribute to this worthy cause.",
  ],
  hashtags: "Pamoja! Dreams are made by action. #GladysErude5K #RunWalkForACause",
  eventHighlights: [
    { title: "Gladys Erude Memorial Run 2025", content: ["We are proud to share that the Gladys Erude Memorial Run at Tigoi Primary School was a great success!"] },
    { title: "A special thank you goes to:", content: ["The dedicated nurses who generously volunteered their time", "The school management and teachers of Tigoi Primary School", "Our valued donors and partners"] },
    { title: "", content: ["We are truly grateful to everyone who came together.", "With gratitude, The Organizing Board"] },
  ],
  impactStatsTitle: "Our Impact Over The Years",
  impactStatsSubtitle: "Over the past four years, the GEM Run has raised a total of $30,390",
  years: [
    { year: "2022", amount: "$10,000", isGoal: false },
    { year: "2023", amount: "$6,520", isGoal: false },
    { year: "2024", amount: "$4,645", isGoal: false },
    { year: "2025", amount: "$9,225", isGoal: false },
    { year: "2026 Goal", amount: "$8,000", isGoal: true },
  ],
  goalDescription: "Our goal for 2026 is $8,000 – funds that will go directly toward enhancing educational facilities.",
  getInvolvedTitle: "Get Involved",
  getInvolvedDescription: "The 2026 event will take place at St. Michael's Primary School on September 6th.",
  cards: [
    { title: "Take Part in the 5K Run", description: "If you are a keen runner or simply want to experience the fun, please take part. Entry is free.", buttonText: "Register Now", buttonUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdGsGAGpe9EdCwEcHmC2ugxYRHq9EUsaPs5NLffPOtvs57IHw/viewform" },
    { title: "Become a Partner", description: "Local businesses, community groups and government agencies are welcome.", buttonText: "Contact Us", buttonUrl: "/contact" },
    { title: "Make a Donation", description: "GEO will raise funds to stage this community event.", buttonText: "Donate", buttonUrl: "https://gofund.me/323c458f" },
  ],
  aboutRunTitle: "About the GEM Run",
  aboutRunDescription: [
    "Following the success of the inaugural 5 km Gladys Erude Memorial Run (GEM Run) held in 2022, the event has since grown into an annual flagship initiative.",
    "This vibrant community event blends fun, fitness, and free medical screenings while raising funds to support infrastructure improvements in schools.",
    "The GEM Run is organized by the Gladys Erude Organization (GEO), a non-profit founded in 2022.",
  ],
  runHashtags: "Pamoja! Dreams are made by action. #GladysErude5K #RunWalkForACause #CharityRun",
  registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdGsGAGpe9EdCwEcHmC2ugxYRHq9EUsaPs5NLffPOtvs57IHw/viewform",
}

// ============================================================
// PAGE: IMPACT
// ============================================================
const impactPage = {
  ctaTitle: "Make a Difference Today",
  ctaDescription: "Your donation directly impacts the lives of women and children in underserved communities. Every contribution brings us closer to our goal of transforming education across Kenya.",
  donateText: "Donate Now",
  gofundmeUrl: "https://gofund.me/323c458f",
  getInvolvedHref: "/get-involved",
}

// ============================================================
// PAGE: JIWE KWA JIWE
// ============================================================
const jiwePage = {
  howItWorks: [
    { number: "1", title: "Donate or Run", description: "Every $1 donated equals 1 brick. Every 5KM tracked equals 1 brick." },
    { number: "2", title: "The Engine Converts", description: "Your actions are directly verified and converted into logical units." },
    { number: "3", title: "We Build Physical Impact", description: "Once milestones are hit, logistics deploy. Progress is documented transparently." },
  ],
  milestones: [
    { title: "Phase 1: Ground Breaking", description: "First 4,000 Bricks secured.", target: 4000 },
    { title: "Phase 2: Central Structure", description: "Expansion target. 8,000 Bricks total.", target: 8000 },
    { title: "Phase 3: Completion", description: "Final enclosure. 12,000 Bricks total.", target: 12000 },
  ],
  featuredProjectTitle: "St. Michael's School - Kilifi County",
  featuredProjectSubtitle: "Revitalizing education in an underserved coastal community.",
  bricksRaised: 1500,
  targetBricks: 8000,
  news: [
    { label: "News", title: "Annual 5km Run", date: "Nov 28, 2026" },
    { label: "News", title: "Hasbah Kenya Donation", date: "April 28, 2026" },
    { label: "News", title: "GEO Wins Charity Award 2026", date: "Jan 28, 2026" },
    { label: "News", title: "Phase 2 Complete", date: "Dec 15, 2025" },
  ],
  ctaTitle: "Join the Movement",
  ctaDescription: "Be part of something bigger. Together we can make a lasting impact on communities across Kenya.",
  donateText: "Donate",
  registerText: "Register",
  contactText: "Contact",
  currentBricks: 1500,
}

// ============================================================
// PAGE: GET INVOLVED
// ============================================================
const getInvolvedPage = {
  ctaTitle: "Ready to Make a Difference?",
  ctaDescription: "Your support helps us empower women and children in underserved communities across Kenya.",
  ctaButtonText: "Donate Now",
  shareText: "Support the Gladys Erude Organization! Together we can empower women and children in underserved communities across Kenya. Join us in making a difference. #GEO #Charity #Kenya",
  shareUrl: "https://gladyserudeorganization.org",
}

// ============================================================
// PAGE: CONTACT
// ============================================================
const contactPage = {
  contacts: [
    { name: "Victor E Lidaywa", phone: "+1 (555) 123-4567", email: "victor@gladyserude.org", country: "USA" },
    { name: "Byron Erude", phone: "+254 712 345 678", email: "byron@gladyserude.org", country: "Kenya" },
  ],
  generalEmail: "info@gladyserudeorganization.org",
  mailingAddress: "P.O. Box 12345, Nairobi, Kenya",
}

// ============================================================
// PAGE: GALLERY
// ============================================================
const galleryPage = {
  pageTitle: "Gallery & News",
  pageDescription: "Stay updated with the latest news and events from the Gladys Erude Organization.",
}

// ============================================================
// INVOLVEMENT OPTIONS
// ============================================================
const involvementOptions = [
  { title: "Make a Donation", description: "Support our mission to empower women and children.", buttonText: "Donate Now", variant: "primary", animationIndex: 0 },
  { title: "Join the Memorial Run", description: "Participate in our annual 5K run.", buttonText: "Register", variant: "secondary", animationIndex: 1 },
  { title: "Boots on the Ground", description: "Submit your manifest to logistics.", buttonText: "Submit Application", variant: "secondary", animationIndex: 2 },
  { title: "Corporate Sponsorship", description: "Fund entire milestones.", buttonText: "Request Deal Book", variant: "secondary", animationIndex: 3 },
  { title: "Become a Partner", description: "Partner with us to expand our impact.", buttonText: "Contact Us", variant: "secondary", animationIndex: 4 },
  { title: "Spread the Word", description: "Share our mission with your network.", buttonText: "Share", variant: "outline", animationIndex: 5 },
]

// ============================================================
// DONATION INFO
// ============================================================
const donationInfo = {
  title: "To Support Us",
  description: "Your donation directly impacts the lives of women and children in underserved communities.",
  mpesaPaybill: "522522",
  mpesaAccount: "1332946089",
  bankName: "Kenya Commercial Bank",
  bankAccount: "1332946089",
  bankAccountName: "GLADYS ADISA ERUDE FOUNDATION",
  gofundmeUrl: "https://gofund.me/323c458f",
}

// ============================================================
// FAQ
// ============================================================
const faqData = {
  headerLabel: "Frequently asked questions",
  headerTitle: "Got questions?\nWe've got answers!",
  headerSubtitle: "Discover answers to common questions about our events, processes, and more.",
  tabsLabel: "General",
  faqs: [
    { question: "How Does the $1 = 1 Brick Model Work?", answer: "Every dollar you donate directly funds the purchase of one physical brick for our classroom construction project." },
    { question: "How Is Donation Transparency Ensured?", answer: "We publish quarterly impact reports. Our finances are independently audited." },
    { question: "Can I Track My Brick Contribution?", answer: "Yes. After donating, you'll receive a unique contribution ID." },
    { question: "How Does the 5km Run Convert to Bricks?", answer: "Your registration fee covers event costs, while every additional dollar goes straight to bricks." },
    { question: "Are Corporate Partnerships Available?", answer: "Absolutely. We offer structured partnership tiers." },
    { question: "Where Is the Classroom Being Built?", answer: "St. Micheal's Primary School in Kilifi County, Coastal Kenya." },
    { question: "How Can I Volunteer?", answer: "We welcome volunteers both locally and internationally." },
  ],
}

// ============================================================
// IMPACT AREAS
// ============================================================
const impactAreas = {
  headerTitle: "Our Impact Areas",
  headerSubtitle: "Some of the notable projects we've undertaken",
  featuredLabel: "FEATURED",
  featuredTitle: "Kapsagawat Primary School",
  featuredDescription: "Sanitary pads were provided to over 200 girls at both schools in partnership with CAROYA.",
  impacts: [
    { label: "Education", title: "Tigoi Primary School" },
    { label: "Healthcare", title: "Free Medical Camp" },
    { label: "Women", title: "Hasbah Kenya Partnership" },
    { label: "Community", title: "Memorial Run 2025" },
  ],
}

// ============================================================
// MIGRATION FUNCTIONS
// ============================================================

async function migrateSiteSettings() {
  await client.create({ _type: 'siteSettings', ...siteSettings })
  console.log('Site settings migration done')
}

async function migrateStats() {
  for (const s of stats) {
    await client.create({ _type: 'stat', ...s })
  }
  console.log('Stats migration done')
}

async function migrateSocialLinks() {
  for (const link of socialLinks) {
    await client.create({ _type: 'socialLink', ...link })
  }
  console.log('Social links migration done')
}

async function migrateTeamMembers() {
  for (const member of teamMembers) {
    await client.create({ _type: 'teamMember', ...member })
  }
  console.log('Team members migration done')
}

async function migrateBoardMembers() {
  for (const member of boardMembers) {
    await client.create({ _type: 'boardMember', ...member })
  }
  console.log('Board members migration done')
}

async function migrateValues() {
  for (const v of values) {
    await client.create({ _type: 'value', ...v })
  }
  console.log('Values migration done')
}

async function migrateHomePage() {
  await client.create({ _type: 'homePage', ...homePage })
  console.log('Home page migration done')
}

async function migrateAboutPage() {
  await client.create({ _type: 'aboutPage', ...aboutPage })
  console.log('About page migration done')
}

async function migrateRunPage() {
  await client.create({ _type: 'runPage', ...runPage })
  console.log('Run page migration done')
}

async function migrateImpactPage() {
  await client.create({ _type: 'impactPage', ...impactPage })
  console.log('Impact page migration done')
}

async function migrateJiwePage() {
  await client.create({ _type: 'jiwePage', ...jiwePage })
  console.log('Jiwe page migration done')
}

async function migrateGetInvolvedPage() {
  await client.create({ _type: 'getInvolvedPage', ...getInvolvedPage })
  console.log('Get Involved page migration done')
}

async function migrateContactPage() {
  await client.create({ _type: 'contactPage', ...contactPage })
  console.log('Contact page migration done')
}

async function migrateGalleryPage() {
  await client.create({ _type: 'galleryPage', ...galleryPage })
  console.log('Gallery page migration done')
}

async function migrateNews() {
  for (const item of newsItems) {
    await client.create({ _type: 'news', ...item })
  }
  console.log('News migration done')
}

async function migrateProjects() {
  for (const p of projects) {
    await client.create({ _type: 'project', ...p, removed: p.status === 'paused' })
  }
  console.log('Projects migration done')
}

async function migrateInvolvementOptions() {
  for (const opt of involvementOptions) {
    await client.create({ _type: 'involvementOption', ...opt })
  }
  console.log('Involvement options migration done')
}

async function migrateDonationInfo() {
  await client.create({ _type: 'donationInfo', ...donationInfo })
  console.log('Donation info migration done')
}

async function migrateFAQ() {
  await client.create({ _type: 'faq', ...faqData })
  console.log('FAQ migration done')
}

async function migrateImpactAreas() {
  await client.create({ _type: 'impactArea', ...impactAreas })
  console.log('Impact areas migration done')
}

async function main() {
  console.log('Starting migration...')
  
  if (!process.env.SANITY_TOKEN) {
    console.error('Please set SANITY_TOKEN environment variable')
    process.exit(1)
  }
  
  try {
    // Global Settings
    await migrateSiteSettings()
    await migrateStats()
    await migrateSocialLinks()
    
    // Team
    await migrateTeamMembers()
    await migrateBoardMembers()
    await migrateValues()
    
    // Pages
    await migrateHomePage()
    await migrateAboutPage()
    await migrateRunPage()
    await migrateImpactPage()
    await migrateJiwePage()
    await migrateGetInvolvedPage()
    await migrateContactPage()
    await migrateGalleryPage()
    
    // Content
    await migrateNews()
    await migrateProjects()
    
    // Components
    await migrateInvolvementOptions()
    await migrateDonationInfo()
    await migrateFAQ()
    await migrateImpactAreas()
    
    console.log('Migration complete!')
  } catch (e) {
    console.error('Migration failed:', e)
    process.exit(1)
  }
}

main()