export const ROUTES = {
  home: '/',

  aboutStory: '/about/story',
  aboutValues: '/about/values',
  aboutPartners: '/about/partners',

  operatorIntroduce: '/operator/introduce',
  operatorOrganization: '/operator/organization',
  operatorHistory: '/operator/history',
  operatorApply: '/operator/apply',

  eventsIntroduce: '/events/introduce',
  eventsUpcoming: '/events/upcoming',
  eventsArchive: '/events/archive',
  eventsArchiveSlug: '/events/archive/:slug',

  clubs: '/clubs',
  clubsPre: '/clubs/pre',
  clubsIntro: '/clubs/intro',
  clubsApply: '/clubs/apply',
  clubsSlug: '/clubs/:slug',

  joinMembership: '/join/membership',
  joinPremium: '/join/premium',
  joinBenefitsLegacy: '/join/benefits',
  joinPartnership: '/join/partnership',

  community: '/community',
  communityFaq: '/community/faq',
  communitySns: '/community/sns',

  privacy: '/privacy',
  terms: '/terms',

  notFound: '*',
} as const