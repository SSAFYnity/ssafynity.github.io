import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HomePage from '@/pages/index'
import AboutStoryPage from '@/pages/about/story'
import AboutValuesPage from '@/pages/about/values'
import AboutPartnersPage from '@/pages/about/partners'
import TeamIntroPage from '@/pages/team/intro'
import TeamOrganizationPage from '@/pages/team/organization'
import TeamHistoryPage from '@/pages/team/history'
import TeamApplyPage from '@/pages/team/apply'
import EventsUpcomingPage from '@/pages/events/upcoming'
import EventsArchivePage from '@/pages/events/archive'
import EventsApplyPage from '@/pages/events/apply'
import ClubsPage from '@/pages/clubs/index'
import ClubDetailPage from '@/pages/clubs/detail'
import ClubsBenefitsPage from '@/pages/clubs/benefits'
import ClubsApplyPage from '@/pages/clubs/apply'
import JoinMembershipPage from '@/pages/join/membership'
import JoinBenefitsPage from '@/pages/join/benefits'
import JoinInquiryPage from '@/pages/join/inquiry'
import CommunityPage from '@/pages/community'
import CommunityFaqPage from '@/pages/community/faq'
import CommunitySnsPage from '@/pages/community/sns'
import PrivacyPage from '@/pages/privacy'
import TermsPage from '@/pages/terms'
import NotFoundPage from '@/pages/not-found'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about/story" element={<AboutStoryPage />} />
        <Route path="/about/values" element={<AboutValuesPage />} />
        <Route path="/about/partners" element={<AboutPartnersPage />} />
        <Route path="/team/intro" element={<TeamIntroPage />} />
        <Route path="/team/organization" element={<TeamOrganizationPage />} />
        <Route path="/team/history" element={<TeamHistoryPage />} />
        <Route path="/team/apply" element={<TeamApplyPage />} />
        <Route path="/events/upcoming" element={<EventsUpcomingPage />} />
        <Route path="/events/archive" element={<EventsArchivePage />} />
        <Route path="/events/apply" element={<EventsApplyPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/clubs/benefits" element={<ClubsBenefitsPage />} />
        <Route path="/clubs/apply" element={<ClubsApplyPage />} />
        <Route path="/clubs/:slug" element={<ClubDetailPage />} />
        <Route path="/join/membership" element={<JoinMembershipPage />} />
        <Route path="/join/benefits" element={<JoinBenefitsPage />} />
        <Route path="/join/inquiry" element={<JoinInquiryPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/faq" element={<CommunityFaqPage />} />
        <Route path="/community/sns" element={<CommunitySnsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </main>
      <Footer />
      </div>
    </BrowserRouter>
  )
}
