import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      // Home Page Section
      S.listItem()
        .title('Home Page')
        .child(
          S.list()
            .title('Home Page')
            .items([
              S.documentTypeListItem('homePage').title('Home Configuration'),
              S.documentTypeListItem('testimonial').title('Testimonials'),
              S.documentTypeListItem('faq').title('FAQ'),
            ])
        ),

      // About Page Section
      S.listItem()
        .title('About Page')
        .child(
          S.list()
            .title('About Page')
            .items([
              S.documentTypeListItem('aboutPage').title('About Configuration'),
              S.documentTypeListItem('value').title('Values'),
            ])
        ),

      // Team Section (grouped together)
      S.listItem()
        .title('Team')
        .child(
          S.list()
            .title('Team Members')
            .items([
              S.documentTypeListItem('teamMember').title('Team Members'),
              S.documentTypeListItem('boardMember').title('Board Members'),
            ])
        ),

      // Run Page Section
      S.listItem()
        .title('Run Page')
        .child(
          S.list()
            .title('Run Page')
            .items([
              S.documentTypeListItem('runPage').title('Run Configuration'),
              S.documentTypeListItem('stat').title('Impact Stats'),
            ])
        ),

      // Impact Page Section
      S.listItem()
        .title('Impact Page')
        .child(
          S.list()
            .title('Impact Page')
            .items([
              S.documentTypeListItem('impactPage').title('Impact Configuration'),
              S.documentTypeListItem('project').title('Projects'),
              S.documentTypeListItem('impactArea').title('Impact Areas'),
            ])
        ),

      // Jiwe Kwa Jiwe Page Section
      S.listItem()
        .title('Jiwe Kwa Jiwe')
        .child(
          S.list()
            .title('Jiwe Kwa Jiwe')
            .items([
              S.documentTypeListItem('jiwePage').title('Jiwe Configuration'),
              S.documentTypeListItem('news').title('News'),
            ])
        ),

      // Get Involved Page Section
      S.listItem()
        .title('Get Involved')
        .child(
          S.list()
            .title('Get Involved')
            .items([
              S.documentTypeListItem('getInvolvedPage').title('Get Involved Configuration'),
              S.documentTypeListItem('involvementOption').title('Involvement Options'),
              S.documentTypeListItem('donationInfo').title('Donation Info'),
            ])
        ),

      // Gallery Page Section
      S.listItem()
        .title('Gallery')
        .child(
          S.list()
            .title('Gallery')
            .items([
              S.documentTypeListItem('galleryPage').title('Gallery Configuration'),
            ])
        ),

      // Contact Page Section
      S.listItem()
        .title('Contact Page')
        .child(
          S.list()
            .title('Contact Page')
            .items([
              S.documentTypeListItem('contactPage').title('Contact Configuration'),
            ])
        ),

      // Divider
      S.divider(),

      // Site Settings
      S.listItem()
        .title('Site Settings')
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.documentTypeListItem('siteSettings').title('Site Settings'),
              S.documentTypeListItem('socialLink').title('Social Links'),
            ])
        ),
    ])