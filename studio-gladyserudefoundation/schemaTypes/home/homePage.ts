export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  preview: {
    select: {
      title: 'scrollText',
    },
  },
  fields: [
    {name: 'scrollText', title: 'Scroll Text', type: 'string'},
    {name: 'bricksRaised', title: 'Bricks Raised', type: 'number'},
    {name: 'targetBricks', title: 'Target Bricks', type: 'number'},
    {name: 'targetDate', title: 'Countdown Target Date', type: 'string'},
    {name: 'countdownTitle', title: 'Countdown Title', type: 'string'},
    {name: 'heroBackgroundImage', title: 'Hero Background Image', type: 'image', options: {hotspot: true}},
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'number', title: 'Number', type: 'string'},
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'description', title: 'Description', type: 'text'},
      ]}],
    },
    {name: 'newsSectionTitle', title: 'News Section Title', type: 'string'},
    {name: 'newsSectionSubtitle', title: 'News Section Subtitle', type: 'string'},
    {name: 'aboutImage', title: 'About Section Image', type: 'image', options: {hotspot: true}},
    {
      name: 'news',
      title: 'Home News Items',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'date', title: 'Date', type: 'string'},
        {name: 'excerpt', title: 'Excerpt', type: 'text'},
        {name: 'content', title: 'Content', type: 'text'},
        {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
      ]}],
    },
  ],
}