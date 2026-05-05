export default {
  name: 'news',
  title: 'News',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
    },
  },
  fields: [
    {name: 'id', title: 'ID', type: 'number'},
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}},
    {name: 'date', title: 'Date', type: 'string'},
    {name: 'category', title: 'Category', type: 'string'},
    {name: 'imageUrl', title: 'Image', type: 'image'},
    {name: 'excerpt', title: 'Excerpt', type: 'text'},
    {name: 'content', title: 'Content', type: 'array', of: [{type: 'block'}]},
  ],
}