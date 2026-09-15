import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ui/ScrollToTop';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WorksPage from './pages/WorksPage';
import WorkDetailPage from './pages/WorkDetailPage';
import ServicesPage from './pages/ServicesPage';
import DigitalMarketingAgencyAhmedabadPage from './pages/DigitalMarketingAgencyAhmedabadPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';

import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminServicesPage from './pages/admin/AdminServicesPage';
import AdminWorksPage from './pages/admin/AdminWorksPage';
import AdminWorkEditPage from './pages/admin/AdminWorkEditPage';
import AdminPricingPage from './pages/admin/AdminPricingPage';
import AdminTeamPage from './pages/admin/AdminTeamPage';
import AdminTestimonialsPage from './pages/admin/AdminTestimonialsPage';
import AdminSuccessStoriesPage from './pages/admin/AdminSuccessStoriesPage';
import AdminSubmissionsPage from './pages/admin/AdminSubmissionsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public site */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/works/:slug" element={<WorkDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route
            path="/digital-marketing-agency-ahmedabad"
            element={<DigitalMarketingAgencyAhmedabadPage />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="works" element={<AdminWorksPage />} />
          <Route path="works/new" element={<AdminWorkEditPage />} />
          <Route path="works/:id" element={<AdminWorkEditPage />} />
          <Route path="pricing" element={<AdminPricingPage />} />
          <Route path="team" element={<AdminTeamPage />} />
          <Route path="testimonials" element={<AdminTestimonialsPage />} />
          <Route path="success-stories" element={<AdminSuccessStoriesPage />} />
          <Route path="submissions" element={<AdminSubmissionsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </>
  );
}
