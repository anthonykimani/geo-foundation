export default {
  name: 'getInvolvedPage',
  title: 'Get Involved Page',
  type: 'document',
  preview: {
    select: {
      title: 'ctaTitle',
    },
  },
  fields: [
    {name: 'ctaTitle', title: 'CTA Title', type: 'string'},
    {name: 'ctaDescription', title: 'CTA Description', type: 'text'},
    {name: 'ctaButtonText', title: 'CTA Button Text', type: 'string'},
    {name: 'shareText', title: 'Share Text', type: 'text'},
    {name: 'shareUrl', title: 'Share URL', type: 'url'},
    {name: 'googleFormUrl', title: 'Google Form URL', type: 'url'},
    {
      name: 'cards',
      title: 'Involvement Cards',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'description', title: 'Description', type: 'text'},
        {name: 'buttonText', title: 'Button Text', type: 'string'},
        {name: 'buttonUrl', title: 'Button URL', type: 'url'},
        {name: 'variant', title: 'Variant', type: 'string', options: {list: [{title: 'Primary', value: 'primary'}, {title: 'Secondary', value: 'secondary'}, {title: 'Outline', value: 'outline'}]}},
        {name: 'image', title: 'Card Image', type: 'image', options: {hotspot: true}},
      ]}],
    },
  ],
}