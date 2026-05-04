export default {
  name: 'socialLink',
  title: 'Social Link',
  type: 'document',
  preview: {
    select: {
      title: 'label',
      subtitle: 'platform',
    },
  },
  fields: [
    {name: 'label', title: 'Label', type: 'string'},
    {name: 'href', title: 'URL', type: 'url'},
    {name: 'icon', title: 'Icon', type: 'string'},
    {name: 'platform', title: 'Platform', type: 'string'},
  ],
}