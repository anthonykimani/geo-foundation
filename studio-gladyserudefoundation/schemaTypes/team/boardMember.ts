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
    {name: 'gallery', title: 'Gallery Images', type: 'array', of: [{type: 'object', fields: [
      {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
      {name: 'caption', title: 'Caption', type: 'string'},
    ]}]},
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'bio', title: 'Short Bio', type: 'text', description: 'Brief bio shown on listing cards'},
    {name: 'description', title: 'Full Description', type: 'text', description: 'Extended description shown on detail page'},
    {name: 'orderRank', title: 'Order', type: 'string', hidden: true},
    {name: 'year', title: 'Year', type: 'string', options: {list: [
      {title: 'NYAYO', value: 'NYAYO'},
      {title: 'SIMBA', value: 'SIMBA'},
      {title: 'SHUJAA', value: 'SHUJAA'},
    ]}},
    {name: 'section', title: 'Section', type: 'string', options: {list: [
      {title: 'Board Members', value: 'board'},
      {title: 'Team Members', value: 'members'},
      {title: 'Volunteers', value: 'volunteers'},
    ]}},
  ],
}