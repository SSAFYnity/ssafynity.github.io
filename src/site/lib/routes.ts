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

export const SITE_ORIGIN = 'https://ssafynity.github.io'

const FILE_PATH_PATTERN = /\/[^/]+\.[a-z0-9]+$/i

export function normalizeSitePath(pathname: string) {
  if (!pathname || pathname === '/') {
    return '/'
  }

  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`

  if (FILE_PATH_PATTERN.test(normalizedPath)) {
    return normalizedPath
  }

  return normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`
}

export function toAbsoluteSiteUrl(pathname: string) {
  return `${SITE_ORIGIN}${normalizeSitePath(pathname)}`
}
