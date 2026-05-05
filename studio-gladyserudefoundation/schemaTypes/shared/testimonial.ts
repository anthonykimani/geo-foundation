export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  preview: {
    select: {
      title: 'author',
      subtitle: 'quote',
    },
  },
  fields: [
    {name: 'quote', title: 'Quote', type: 'string'},
    {name: 'detail', title: 'Detail', type: 'text'},
    {name: 'author', title: 'Author', type: 'string'},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
  ],
}