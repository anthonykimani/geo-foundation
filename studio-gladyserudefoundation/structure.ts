import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      // ========================================
      // HOME PAGE - Hub that uses many schemas
      // ========================================
      S.listItem()
        .title('Home Page')
        .child(
          S.list()
            .title('Home Page')
            .items([
              S.listItem()
                .title('Home Configuration')
                .child(
                  S.list()
                    .title('Home Configuration')
                    .items([
                      S.documentTypeListItem('homePage').title('Hero, Countdown, Stats'),
                    ])
                ),

              S.listItem()
                .title('Team')
                .child(
                  S.list()
                    .title('Team')
                    .items([
                      S.documentTypeListItem('teamMember').title('Team Members'),
                      S.documentTypeListItem('boardMember').title('Board Members'),
                    ])
                ),

              S.documentTypeListItem('testimonial').title('Testimonials'),
              S.documentTypeListItem('news').title('News'),
              S.documentTypeListItem('impactArea').title('Impact Areas'),
              S.documentTypeListItem('faq').title('FAQ'),
              S.documentTypeListItem('value').title('Values'),
            ])
        ),

      // ========================================
      // PAGES - Individual page configurations
      // ========================================
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              // Run Page
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

              // Impact Page
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

              // Jiwe Kwa Jiwe
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

              // Get Involved
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

              // Gallery
              S.listItem()
                .title('Gallery')
                .child(
                  S.list()
                    .title('Gallery')
                    .items([
                      S.documentTypeListItem('galleryPage').title('Gallery Configuration'),
                      S.documentTypeListItem('news').title('News'),
                    ])
                ),

              // About Page
              S.listItem()
                .title('About Page')
                .child(
                  S.list()
                    .title('About Page')
                    .items([
                      S.documentTypeListItem('aboutPage').title('About Configuration'),
                      S.documentTypeListItem('value').title('Values'),
                      S.documentTypeListItem('teamMember').title('Team Members'),
                      S.documentTypeListItem('boardMember').title('Board Members'),
                    ])
                ),

              // Contact
              S.listItem()
                .title('Contact Page')
                .child(
                  S.list()
                    .title('Contact Page')
                    .items([
                      S.documentTypeListItem('contactPage').title('Contact Configuration'),
                      S.documentTypeListItem('boardMember').title('Board Members'),
                    ])
                ),
            ])
        ),

      // Divider
      S.divider(),

      // ========================================
      // SITE SETTINGS - Global configuration
      // ========================================
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