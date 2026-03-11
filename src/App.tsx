import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ROUTES } from '@/lib/routes'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import HomePage from '@/pages/index'

import AboutStoryPage from '@/pages/about/story'
import AboutValuesPage from '@/pages/about/values'
import AboutPartnersPage from '@/pages/about/partners'

import TeamIntroPage from '@/pages/operator/intro'
import TeamOrganizationPage from '@/pages/operator/organization'
import TeamHistoryPage from '@/pages/operator/history'
import TeamApplyPage from '@/pages/operator/apply'

import EventsUpcomingPage from '@/pages/events/upcoming'
import EventsArchivePage from '@/pages/events/archive'
import EventsArchiveDetailPage from '@/pages/events/archive-detail'
import EventsIntroducePage from '@/pages/events/introduce'

import ClubsPage from '@/pages/clubs/index'
import ClubsPrePage from '@/pages/clubs/pre'
import ClubDetailPage from '@/pages/clubs/detail'
import ClubsBenefitsPage from '@/pages/clubs/intro'
import ClubsApplyPage from '@/pages/clubs/apply'

import JoinMembershipPage from '@/pages/join/membership'
import JoinPremiumPage from '@/pages/join/premium'
import JoinPartnershipPage from '@/pages/join/partnership'

import CommunityPage from '@/pages/community'
import CommunityFaqPage from '@/pages/community/faq'
import CommunitySnsPage from '@/pages/community/sns'

import PrivacyPage from '@/pages/privacy'
import TermsPage from '@/pages/terms'

import NotFoundPage from '@/pages/not-found'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path={ROUTES.home} element={<HomePage />} />

            <Route path={ROUTES.aboutStory} element={<AboutStoryPage />} />
            <Route path={ROUTES.aboutValues} element={<AboutValuesPage />} />
            <Route path={ROUTES.aboutPartners} element={<AboutPartnersPage />} />

            <Route path={ROUTES.operatorIntroduce} element={<TeamIntroPage />} />
            <Route path={ROUTES.operatorOrganization} element={<TeamOrganizationPage />} />
            <Route path={ROUTES.operatorHistory} element={<TeamHistoryPage />} />
            <Route path={ROUTES.operatorApply} element={<TeamApplyPage />} />

            <Route path={ROUTES.eventsIntroduce} element={<EventsIntroducePage />} />
            <Route path={ROUTES.eventsUpcoming} element={<EventsUpcomingPage />} />
            <Route path={ROUTES.eventsArchive} element={<EventsArchivePage />} />
            <Route path={ROUTES.eventsArchiveSlug} element={<EventsArchiveDetailPage />} />

            <Route path={ROUTES.clubs} element={<ClubsPage />} />
            <Route path={ROUTES.clubsPre} element={<ClubsPrePage />} />
            <Route path={ROUTES.clubsIntro} element={<ClubsBenefitsPage />} />
            <Route path={ROUTES.clubsApply} element={<ClubsApplyPage />} />
            <Route path={ROUTES.clubsSlug} element={<ClubDetailPage />} />

            <Route path={ROUTES.joinMembership} element={<JoinMembershipPage />} />
            <Route path={ROUTES.joinPremium} element={<JoinPremiumPage />} />
            <Route path={ROUTES.joinBenefitsLegacy} element={<JoinPremiumPage />} />
            <Route path={ROUTES.joinPartnership} element={<JoinPartnershipPage />} />

            <Route path={ROUTES.community} element={<CommunityPage />} />
            <Route path={ROUTES.communityFaq} element={<CommunityFaqPage />} />
            <Route path={ROUTES.communitySns} element={<CommunitySnsPage />} />

            <Route path={ROUTES.privacy} element={<PrivacyPage />} />
            <Route path={ROUTES.terms} element={<TermsPage />} />

            <Route path={ROUTES.notFound} element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
