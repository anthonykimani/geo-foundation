export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  preview: {
    select: {
      title: 'missionTitle',
    },
  },
  fields: [
    {name: 'missionTitle', title: 'Mission Title', type: 'string'},
    {name: 'missionContent', title: 'Mission Content', type: 'text'},
    {name: 'whyWeAreInspiredTitle', title: 'Why We Are Inspired Title', type: 'string'},
    {
      name: 'whyWeAreInspiredContent',
      title: 'Why We Are Inspired Content',
      type: 'array',
      of: [{type: 'text'}],
    },
    {name: 'howWeWorkTitle', title: 'How We Work Title', type: 'string'},
    {name: 'howWeWorkContent', title: 'How We Work Content', type: 'text'},
    {name: 'ctaTitle', title: 'CTA Title', type: 'string'},
    {name: 'ctaDescription', title: 'CTA Description', type: 'text'},
    {name: 'ctaButtonText', title: 'CTA Button Text', type: 'string'},
    {name: 'ctaHref', title: 'CTA URL', type: 'string'},
    {name: 'organizationName', title: 'Organization Name', type: 'string'},
    {name: 'organizationSubtitle', title: 'Organization Subtitle', type: 'string'},
    {name: 'heroImage', title: 'Hero Image', type: 'image', options: {hotspot: true}},
  ],
}