// ============================================================
// GLOBAL SETTINGS - Foundation for the entire site
// ============================================================
import siteSettings from './siteSettings'
import stat from './stat'
import socialLink from './socialLink'

// ============================================================
// TEAM - Organization people
// ============================================================
import teamMember from './teamMember'
import boardMember from './boardMember'
import value from './value'

// ============================================================
// PAGES - Website pages
// ============================================================
import homePage from './homePage'
import aboutPage from './aboutPage'
import runPage from './runPage'
import impactPage from './impactPage'
import jiwePage from './jiwePage'
import getInvolvedPage from './getInvolvedPage'
import contactPage from './contactPage'
import galleryPage from './galleryPage'

// ============================================================
// CONTENT - News and Projects
// ============================================================
import news from './news'
import project from './project'

// ============================================================
// COMPONENTS - Reusable UI components
// ============================================================
import faq from './faq'
import impactArea from './impactArea'
import testimonial from './testimonial'

// ============================================================
// FORMS & DONATIONS - Engagement components
// ============================================================
import involvementOption from './involvementOption'
import donationInfo from './donationInfo'

export const schemaTypes = [
  // Global Settings
  siteSettings,
  stat,
  socialLink,

  // Team
  teamMember,
  boardMember,
  value,

  // Pages (top to bottom)
  homePage,
  aboutPage,
  runPage,
  impactPage,
  jiwePage,
  getInvolvedPage,
  contactPage,
  galleryPage,

  // Content
  news,
  project,

  // Components
  faq,
  impactArea,
  testimonial,

  // Forms & Donations
  involvementOption,
  donationInfo,
]