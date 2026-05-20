export default {
  name: 'boardMember',
  title: 'Board Member',
  type: 'document',
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
    },
  },
  fields: [
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'imageUrl', title: 'Image', type: 'image'},
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'bio', title: 'Short Bio', type: 'text', description: 'Brief bio shown on listing cards'},
    {name: 'description', title: 'Full Description', type: 'text', description: 'Extended description shown on detail page'},
    {name: 'year', title: 'Year', type: 'string', options: {list: [
      {title: '2026', value: '2026'},
      {title: '2025', value: '2025'},
      {title: '2024', value: '2024'},
    ]}},
    {name: 'section', title: 'Section', type: 'string', options: {list: [
      {title: 'Board Members', value: 'board'},
      {title: 'Members', value: 'members'},
      {title: 'Volunteers', value: 'volunteers'},
    ]}},
  ],
}