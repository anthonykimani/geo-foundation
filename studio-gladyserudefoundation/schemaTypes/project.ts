export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
    },
  },
  fields: [
    {name: 'id', title: 'ID', type: 'number'},
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'description', title: 'Description', type: 'text'},
    {name: 'raised', title: 'Raised', type: 'number'},
    {name: 'goal', title: 'Goal', type: 'number'},
    {name: 'date', title: 'Date', type: 'string'},
    {name: 'author', title: 'Author', type: 'string'},
    {name: 'imageUrl', title: 'Image', type: 'image'},
    {name: 'location', title: 'Location', type: 'string'},
    {name: 'status', title: 'Status', type: 'string', options: {list: [{title: 'Active', value: 'active'}, {title: 'Completed', value: 'completed'}, {title: 'Paused', value: 'paused'}]}},
    {name: 'removed', title: 'Removed', type: 'boolean'},
  ],
}