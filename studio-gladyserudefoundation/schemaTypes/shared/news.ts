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
    {name: 'videoUrl', title: 'Video (YouTube/Vimeo URL)', type: 'url', description: 'Replaces image when set'},
    {name: 'gallery', title: 'Gallery Images', type: 'array', of: [{type: 'object', fields: [
      {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
      {name: 'caption', title: 'Caption', type: 'string'},
    ]}]},
    {name: 'excerpt', title: 'Excerpt', type: 'text'},
    {name: 'content', title: 'Content', type: 'array', of: [{type: 'block'}]},
  ],
}