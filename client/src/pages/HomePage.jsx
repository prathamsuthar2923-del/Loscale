import useFetch from '../hooks/useFetch';
import settingsApi from '../api/settings.api';
import Hero from '../components/sections/Hero';
import WhoWeAre from '../components/sections/WhoWeAre';
import Stats from '../components/sections/Stats';
import WorksPreview from '../components/sections/WorksPreview';
import GoalsRow from '../components/sections/GoalsRow';
import ServicesScrollHighlight from '../components/sections/ServicesScrollHighlight';
import TeamSection from '../components/sections/TeamSection';
import PricingSection from '../components/sections/PricingSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import SuccessStoriesSection from '../components/sections/SuccessStoriesSection';
// Latest Insights / blog section is intentionally disabled for now —
// "currently we no need latest insight section so comment it out". It also
// defaults to `false` in SiteSettings, so even re-enabling this import would
// still respect the admin-panel toggle.
// import LatestInsights from '../components/sections/LatestInsights';
import CtaBand from '../components/sections/CtaBand';
import ContactForm from '../components/sections/ContactForm';

// Every section below is individually gated by the site-wide visibility
// toggles managed from Admin → Site Settings ("toggle for all section").
// While settings are still loading, everything defaults to visible so the
// page doesn't flash empty on first paint.
export default function HomePage() {
  const { data: settings } = useFetch(() => settingsApi.getPublic(), []);
  const sections = settings?.sections || {};
  const show = (key) => sections[key] !== false;

  return (
    <>
      {show('hero') && <Hero />}
      {show('whoWeAre') && <WhoWeAre />}
      {show('stats') && <Stats />}
      {show('works') && <WorksPreview />}
      {show('goalsRow') && <GoalsRow />}
      {show('services') && <ServicesScrollHighlight />}
      {show('team') && <TeamSection />}
      {show('pricing') && <PricingSection />}
      {show('testimonials') && <TestimonialsSection />}
      {show('successStories') && <SuccessStoriesSection />}
      {/* {show('latestInsights') && <LatestInsights />} */}
      {show('ctaBand') && <CtaBand />}
      <ContactForm />
    </>
  );
}
