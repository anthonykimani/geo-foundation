export default {
  name: 'value',
  title: 'Organization Value',
  type: 'document',
  preview: {
    select: {
      title: 'title',
    },
  },
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'description', title: 'Description', type: 'text'},
  ],
}