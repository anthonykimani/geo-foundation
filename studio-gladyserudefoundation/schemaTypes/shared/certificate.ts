export default {
  name: 'certificate',
  title: 'Certificate / Permit',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      subtitle: 'issuer',
    },
  },
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'issuer', title: 'Issuing Authority', type: 'string'},
    {name: 'year', title: 'Year', type: 'string'},
    {name: 'imageUrl', title: 'Preview Image', type: 'image', description: 'Thumbnail or scan of the certificate'},
    {name: 'fileUrl', title: 'Downloadable Document', type: 'file', description: 'Optional full PDF version'},
    {name: 'description', title: 'Description', type: 'text'},
  ],
}
