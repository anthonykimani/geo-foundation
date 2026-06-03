export default {
  name: 'comingSoonPage',
  title: 'Coming Soon Page',
  type: 'document',
  preview: {
    select: {
      title: 'heading',
    },
  },
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    {
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'launchDateTime',
      title: 'Launch Date & Time',
      description: 'When the countdown should end (e.g. 2026-06-04T16:00:00+03:00)',
      type: 'string',
    },
  ],
}
