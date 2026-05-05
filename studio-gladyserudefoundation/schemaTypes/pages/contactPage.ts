export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  preview: {
    select: {
      title: 'generalEmail',
    },
  },
  fields: [
    {
      name: 'contacts',
      title: 'Contacts',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'name', title: 'Name', type: 'string'},
        {name: 'phone', title: 'Phone', type: 'string'},
        {name: 'email', title: 'Email', type: 'string'},
        {name: 'country', title: 'Country', type: 'string'},
      ]}],
    },
    {name: 'generalEmail', title: 'General Email', type: 'string'},
    {name: 'mailingAddress', title: 'Mailing Address', type: 'string'},
  ],
}