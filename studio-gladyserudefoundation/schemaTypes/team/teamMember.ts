export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
    },
  },
  fields: [
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'imageUrl', title: 'Image', type: 'image'},
    {name: 'linkedin', title: 'LinkedIn URL', type: 'url'},
    {name: 'twitter', title: 'Twitter URL', type: 'url'},
    {name: 'bio', title: 'Bio', type: 'text'},
    {name: 'type', title: 'Type', type: 'string', options: {list: [{title: 'Staff', value: 'staff'}, {title: 'Board', value: 'board'}]}},
  ],
}