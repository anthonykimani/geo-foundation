export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  preview: {
    select: {
      title: 'headerTitle',
    },
  },
  fields: [
    {name: 'headerLabel', title: 'Header Label', type: 'string'},
    {name: 'headerTitle', title: 'Header Title', type: 'text'},
    {name: 'headerSubtitle', title: 'Header Subtitle', type: 'text'},
    {name: 'tabsLabel', title: 'Tabs Label', type: 'string'},
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'question', title: 'Question', type: 'string'},
        {name: 'answer', title: 'Answer', type: 'text'},
      ]}],
    },
  ],
}