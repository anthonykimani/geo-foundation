// ============================================================
// SHARED - Reusable across multiple pages
// ============================================================
import news from './shared/news'
import project from './shared/project'
import testimonial from './shared/testimonial'
import faq from './shared/faq'
import impactArea from './shared/impactArea'
import donationInfo from './shared/donationInfo'
import involvementOption from './shared/involvementOption'
import value from './shared/value'
import stat from './shared/stat'

// ============================================================
// SITE - Global settings
// ============================================================
import siteSettings from './site/siteSettings'
import socialLink from './site/socialLink'

// ============================================================
// TEAM - Organization people
// ============================================================
import teamMember from './team/teamMember'
import boardMember from './team/boardMember'

// ============================================================
// PAGES - Website page configurations
// ============================================================
import homePage from './home/homePage'
import aboutPage from './pages/aboutPage'
import runPage from './pages/runPage'
import impactPage from './pages/impactPage'
import jiwePage from './pages/jiwePage'
import getInvolvedPage from './pages/getInvolvedPage'
import contactPage from './pages/contactPage'
import galleryPage from './pages/galleryPage'

export const schemaTypes = [
  // Site Settings
  siteSettings,
  socialLink,
  stat,

  // Team
  teamMember,
  boardMember,
  value,

  // Pages
  homePage,
  aboutPage,
  runPage,
  impactPage,
  jiwePage,
  getInvolvedPage,
  contactPage,
  galleryPage,

  // Shared/Components
  news,
  project,
  faq,
  impactArea,
  testimonial,
  involvementOption,
  donationInfo,
]