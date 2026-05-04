export default {
  name: 'galleryPage',
  title: 'Gallery Page',
  type: 'document',
  preview: {
    select: {
      title: 'pageTitle',
    },
  },
  fields: [
    {name: 'pageTitle', title: 'Page Title', type: 'string'},
    {name: 'pageDescription', title: 'Page Description', type: 'text'},
    {
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'title', title: 'Image Title', type: 'string'},
        {name: 'description', title: 'Description', type: 'string'},
        {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
      ]}],
    },
  ],
}