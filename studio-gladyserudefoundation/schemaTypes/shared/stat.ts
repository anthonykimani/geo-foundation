export default {
  name: 'stat',
  title: 'Stat',
  type: 'document',
  preview: {
    select: {
      title: 'label',
      subtitle: 'value',
    },
  },
  fields: [
    {name: 'value', title: 'Value', type: 'string'},
    {name: 'label', title: 'Label', type: 'string'},
    {name: 'variant', title: 'Variant', type: 'string', options: {list: [{title: 'Primary', value: 'primary'}, {title: 'Default', value: 'default'}]}},
    {name: 'type', title: 'Type', type: 'string', options: {list: [{title: 'Organization', value: 'organization'}, {title: 'Jiwe', value: 'jiwe'}]}},
  ],
}