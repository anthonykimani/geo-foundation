export default {
  name: 'impactPage',
  title: 'Impact Page',
  type: 'document',
  preview: {
    select: {
      title: 'ctaTitle',
    },
  },
  fields: [
    {name: 'ctaTitle', title: 'CTA Title', type: 'string'},
    {name: 'ctaDescription', title: 'CTA Description', type: 'text'},
    {name: 'donateText', title: 'Donate Text', type: 'string'},
    {name: 'gofundmeUrl', title: 'GoFundMe URL', type: 'url'},
    {name: 'getInvolvedHref', title: 'Get Involved URL', type: 'string'},
    {name: 'projectFormUrl', title: 'Create a Project Form', type: 'file', description: 'Upload a PDF form that users can download to start a project'},
  ],
}