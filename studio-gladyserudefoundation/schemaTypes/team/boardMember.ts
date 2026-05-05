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
    {name: 'bio', title: 'Bio', type: 'text'},
  ],
}