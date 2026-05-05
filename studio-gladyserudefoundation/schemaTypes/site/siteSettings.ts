export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  preview: {
    select: {
      title: 'organizationName',
    },
  },
  fields: [
    {name: 'organizationName', title: 'Organization Name', type: 'string'},
    {name: 'organizationDescription', title: 'Organization Description', type: 'text'},
    {name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}},
    {name: 'favicon', title: 'Favicon', type: 'image'},
    {name: 'generalEmail', title: 'General Email', type: 'string'},
    {name: 'mailingAddress', title: 'Mailing Address', type: 'string'},
    {name: 'googleFormUrl', title: 'Google Form URL', type: 'url'},
  ],
}