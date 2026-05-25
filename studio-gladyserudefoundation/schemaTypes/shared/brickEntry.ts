export default {
  name: 'brickEntry',
  title: 'Brick Entry',
  type: 'document',
  preview: {
    select: {
      title: 'donorName',
      subtitle: 'source',
    },
  },
  fields: [
    {name: 'donorName', title: 'Donor / Source', type: 'string'},
    {name: 'amount', title: 'Amount', type: 'number'},
    {name: 'currency', title: 'Currency', type: 'string', options: {list: ['USD', 'KES']}},
    {name: 'source', title: 'Source', type: 'string', options: {list: [
      {title: 'GoFundMe', value: 'gofundme'},
      {title: 'Manual / Offline', value: 'manual'},
      {title: 'Run / Event', value: 'run'},
      {title: 'Other', value: 'other'},
    ]}},
    {name: 'date', title: 'Date', type: 'date'},
    {name: 'notes', title: 'Notes', type: 'text'},
  ],
}
