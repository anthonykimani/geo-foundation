export default {
  name: 'jiwePage',
  title: 'Jiwe Kwa Jiwe Page',
  type: 'document',
  preview: {
    select: {
      title: 'currentBricks',
    },
  },
  fields: [
    {
      name: 'howItWorks',
      title: 'How It Works',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'number', title: 'Number', type: 'string'},
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'description', title: 'Description', type: 'text'},
      ]}],
    },
    {
      name: 'milestones',
      title: 'Milestones',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'description', title: 'Description', type: 'text'},
        {name: 'target', title: 'Target', type: 'number'},
      ]}],
    },
    {name: 'featuredProjectTitle', title: 'Featured Project Title', type: 'string'},
    {name: 'featuredProjectSubtitle', title: 'Featured Project Subtitle', type: 'string'},
    {name: 'bricksRaised', title: 'Bricks Raised', type: 'number'},
    {name: 'targetBricks', title: 'Target Bricks', type: 'number'},
    {name: 'featuredProjectImage', title: 'Featured Project Image', type: 'image', options: {hotspot: true}},
    {
      name: 'news',
      title: 'News',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'label', title: 'Label', type: 'string'},
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'date', title: 'Date', type: 'string'},
        {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
      ]}],
    },
    {name: 'ctaTitle', title: 'CTA Title', type: 'string'},
    {name: 'ctaDescription', title: 'CTA Description', type: 'text'},
    {name: 'donateText', title: 'Donate Text', type: 'string'},
    {name: 'registerText', title: 'Register Text', type: 'string'},
    {name: 'contactText', title: 'Contact Text', type: 'string'},
    {name: 'googleFormUrl', title: 'Google Form URL', type: 'url'},
    {name: 'currentBricks', title: 'Current Bricks', type: 'number'},
  ],
}