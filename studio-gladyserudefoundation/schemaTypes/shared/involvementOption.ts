export default {
  name: 'involvementOption',
  title: 'Involvement Option',
  type: 'document',
  preview: {
    select: {
      title: 'title',
    },
  },
  fields: [
    {name: 'imageUrl', title: 'Image', type: 'image'},
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'description', title: 'Description', type: 'text'},
    {name: 'buttonText', title: 'Button Text', type: 'string'},
    {name: 'buttonUrl', title: 'Button URL / Trigger', type: 'string', description: 'URL (https://, mailto:), path (/contact), or trigger (#volunteer, #sponsor, #share). Leave empty for donation modal.'},
    {name: 'variant', title: 'Variant', type: 'string', options: {list: [{title: 'Primary', value: 'primary'}, {title: 'Secondary', value: 'secondary'}, {title: 'Outline', value: 'outline'}]}},
    {name: 'animationIndex', title: 'Animation Index', type: 'number'},
  ],
}