import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Seo from '../components/seo';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';

const SITE_URL = 'https://loscaledigital.com';
const PAGE_PATH = '/digital-marketing-agency-ahmedabad';

const services = [
  {
    title: 'Performance Marketing (Paid Ads)',
    description: 'Google and Meta campaigns built around ROI targets, not impressions.',
  },
  {
    title: 'SEO',
    description: 'Technical, on-page, and content SEO that compounds instead of chasing algorithm updates.',
  },
  {
    title: 'Social Media Marketing & Management',
    description:
      'Consistent, on-brand presence across platforms, run by a dedicated team, not a freelancer juggling ten other clients.',
  },
  {
    title: 'Advertising & Branding',
    description: 'Creative and campaign strategy that makes your brand memorable, not just visible.',
  },
  {
    title: 'Conversion Rate Optimization & Web Design',
    description: 'Turning the traffic you already have into more leads and sales.',
  },
  {
    title: 'Content Marketing & Copywriting',
    description: "Content built to rank and convert, in a voice that's actually yours.",
  },
  {
    title: 'Marketing Automation',
    description: 'CRM and ad-follow-up systems so no lead falls through the cracks.',
  },
];

// Plain-text answers power the FAQPage schema below; the fourth answer is
// rendered separately in JSX so it can carry a real <Link> to /contact.
const faqs = [
  {
    question: 'What makes LO SCALE one of the best digital marketing agencies in Ahmedabad?',
    answer:
      'We combine every core digital channel — SEO, paid ads, social, content, and CRO — under one team, so your strategy stays coordinated instead of fragmented across vendors. We report in plain numbers: traffic, leads, and revenue, not just engagement.',
  },
  {
    question: 'Does LO SCALE work with businesses outside Ahmedabad too?',
    answer:
      "Yes — while we're based in Ahmedabad and know the local market well, we work with brands across India who want the same coordinated approach to growth.",
  },
  {
    question: 'What digital marketing services does LO SCALE offer in Ahmedabad?',
    answer:
      'Performance marketing (paid ads), SEO, social media management, conversion rate optimization, content marketing, and marketing automation.',
  },
  {
    question: 'How do I get started?',
    answer:
      "Reach out through our contact page and tell us about your business — we'll walk you through how we'd approach your growth.",
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

// TODO: Replace every *_PLACEHOLDER value below with LO SCALE's real
// Ahmedabad business details before this page goes live. Do not deploy with
// placeholder address/phone/hours still in place — search engines and users
// will see whatever is here.
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}${PAGE_PATH}`,
  name: 'LO SCALE',
  url: `${SITE_URL}${PAGE_PATH}`,
  image: `${SITE_URL}/og-default.jpg`,
  telephone: 'PHONE_PLACEHOLDER', // TODO: real Ahmedabad business phone number, e.g. "+91-XXXXXXXXXX"
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Remote Work', // TODO: street address / building / area
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '382481', // TODO: real postal code
    addressCountry: 'IN',
  },
  openingHours: '10:00 AM To 7:00 PM', // TODO: e.g. "Mo-Fr 09:00-18:00"
  areaServed: 'Ahmedabad',
};

export default function DigitalMarketingAgencyAhmedabadPage() {
  return (
    <>
      <Seo
        title="Digital Marketing Agency in Ahmedabad"
        description="LO SCALE is a digital marketing agency in Ahmedabad offering SEO, social media, paid ads, and branding. See why local brands choose us."
        path={PAGE_PATH}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="mx-auto max-w-5xl px-6 pb-10 pt-32 md:px-10 md:pt-44">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">Ahmedabad</p>
        <h1 className="giant font-semibold text-black" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}>
          Digital Marketing Agency in Ahmedabad
        </h1>
        <p className="mt-8 max-w-3xl text-lg text-black/70 md:text-xl">
          LO SCALE is a digital marketing agency based in Ahmedabad, working with local and national brands
          who want more than vanity metrics. Whether you&apos;re searching for a digital marketing company in
          Ahmedabad to handle everything end-to-end, or a social media marketing agency to sharpen one
          specific channel, we build strategy around real business outcomes — leads, sales, and growth you
          can actually measure.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <SectionHeading
          eyebrow="What we do"
          title="Full-funnel digital marketing services"
        />
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="border-t border-black/10 pt-8">
              <h3 className="text-2xl font-semibold text-black">{service.title}</h3>
              <p className="mt-3 text-black/60">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-black/10">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
          <SectionHeading eyebrow="Why Ahmedabad" title="Why Ahmedabad businesses choose LO SCALE" />
          <p className="mt-8 max-w-3xl text-lg text-black/70">
            We&apos;re based in Ahmedabad, which means we understand this market — the industries here, the
            competitive landscape, and what actually moves the needle for a local business versus a
            copy-pasted national playbook. One team, one strategy, one point of accountability — instead of a
            paid-ads freelancer, an SEO consultant, and a social media intern all pulling in different
            directions.
          </p>
        </div>
      </section>

      <section className="border-t border-black/10">
        <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <div className="mt-12 divide-y divide-black/10">
            {faqs.map((faq, i) => (
              <details key={faq.question} className="group py-6" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-black">
                  {faq.question}
                  <span className="shrink-0 text-2xl font-light text-black/40 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 pr-10 text-black/60">
                  {i === faqs.length - 1 ? (
                    <>
                      Reach out through our{' '}
                      <Link to="/contact" className="text-black underline underline-offset-2 hover:no-underline">
                        contact page
                      </Link>{' '}
                      and tell us about your business — we&apos;ll walk you through how we&apos;d approach
                      your growth.
                    </>
                  ) : (
                    faq.answer
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 py-20 text-center md:px-10 md:py-28">
          <h2 className="giant font-semibold text-black" style={{ fontSize: 'clamp(1.9rem, 4.6vw, 3rem)' }}>
            Looking for a marketing agency in Ahmedabad that actually moves your numbers?
          </h2>
          <Button to="/contact" variant="accent">
            Get in touch
          </Button>
        </div>
      </section>
    </>
  );
}
