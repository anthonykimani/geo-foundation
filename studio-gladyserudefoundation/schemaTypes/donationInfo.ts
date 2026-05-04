export default {
  name: 'donationInfo',
  title: 'Donation Info',
  type: 'document',
  preview: {
    select: {
      title: 'title',
    },
  },
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'description', title: 'Description', type: 'text'},
    {name: 'mpesaPaybill', title: 'M-Pesa Paybill', type: 'string'},
    {name: 'mpesaAccount', title: 'M-Pesa Account', type: 'string'},
    {name: 'bankName', title: 'Bank Name', type: 'string'},
    {name: 'bankAccount', title: 'Bank Account', type: 'string'},
    {name: 'bankAccountName', title: 'Bank Account Name', type: 'string'},
    {name: 'gofundmeUrl', title: 'GoFundMe URL', type: 'url'},
  ],
}