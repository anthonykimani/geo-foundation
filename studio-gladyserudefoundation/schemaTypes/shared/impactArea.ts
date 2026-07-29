export default {
  name: 'impactArea',
  title: 'Impact Area',
  type: 'document',
  preview: {
    select: {
      title: 'headerTitle',
    },
  },
  fields: [
    {name: 'headerTitle', title: 'Header Title', type: 'string'},
    {name: 'headerSubtitle', title: 'Header Subtitle', type: 'string'},
    {name: 'featuredLabel', title: 'Featured Label', type: 'string'},
    {name: 'featuredTitle', title: 'Featured Title', type: 'string'},
    {name: 'featuredDescription', title: 'Featured Description', type: 'text'},
    {name: 'featuredImageUrl', title: 'Featured Image', type: 'image'},
    {name: 'featuredVideoUrl', title: 'Featured Video (YouTube/Vimeo URL)', type: 'url', description: 'Replaces featured image when set'},
    {
      name: 'impacts',
      title: 'Impacts',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'label', title: 'Label', type: 'string'},
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'description', title: 'Description', type: 'string'},
        {name: 'imageUrl', title: 'Impact Image', type: 'image'},
        {name: 'videoUrl', title: 'Impact Video (YouTube/Vimeo URL)', type: 'url', description: 'Replaces impact image when set'},
      ]}],
    },
  ],
}