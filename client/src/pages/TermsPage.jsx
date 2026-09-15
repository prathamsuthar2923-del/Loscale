import { Link } from 'react-router-dom';
import Seo from '../components/seo';
import SectionHeading from '../components/ui/SectionHeading';

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-28 md:px-10">
      <Seo title="Terms of Service" description="Terms of Service governing your use of the LO SCALE website and digital marketing services." path="/terms" />
      <SectionHeading eyebrow="Legal" title="Terms of Service" description="Last updated: September 2026" />

      <div className="mt-12 space-y-10 text-black/70">
        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">1. About These Terms</h2>
          <p>
            These Terms of Service govern your use of the LO SCALE website and the digital marketing
            services we provide, including performance marketing, SEO, social media management, conversion
            rate optimization, content marketing, and marketing automation. By engaging LO SCALE or using
            this website, you agree to these terms.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">2. Our Services</h2>
          <p>
            LO SCALE provides digital marketing strategy, creative, and execution services on a project or
            retainer basis, as agreed in a separate proposal or statement of work with each client. Specific
            deliverables, timelines, and pricing are defined per engagement and are not altered by the
            general content of this website.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">3. Client Responsibilities</h2>
          <p>
            Campaign performance depends on timely access to accounts, brand assets, approvals, and accurate
            information from the client. Delays in providing these may affect timelines and results, and LO
            SCALE is not responsible for delays caused by factors outside our control.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">4. Performance &amp; Results</h2>
          <p>
            While we apply data-driven strategy and industry best practice to every campaign, digital
            marketing results depend on numerous external factors — market conditions, platform algorithm
            changes, competition, and client-side execution — and specific outcomes cannot be guaranteed.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">5. Intellectual Property</h2>
          <p>
            Creative assets, strategy documents, and campaign materials produced for a client become the
            client&apos;s property upon full payment, unless otherwise agreed in writing. LO SCALE retains
            the right to showcase completed work in its portfolio and marketing materials unless a client
            requests confidentiality.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">6. Payments</h2>
          <p>
            Fees, billing cycles, and payment terms are set out in each client&apos;s proposal or contract.
            Late payments may result in a pause of active services until accounts are brought current.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">7. Limitation of Liability</h2>
          <p>
            LO SCALE&apos;s liability for any claim arising from our services is limited to the fees paid
            for the specific service giving rise to the claim. We are not liable for indirect, incidental,
            or consequential damages, including lost revenue or lost business opportunities.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">8. Changes to These Terms</h2>
          <p>
            We may update these Terms of Service from time to time to reflect changes in our services or
            legal requirements. Continued use of our website or services after an update constitutes
            acceptance of the revised terms.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">9. Contact</h2>
          <p>
            Questions about these terms can be sent to us through our{' '}
            <Link to="/contact" className="text-black underline underline-offset-2 hover:no-underline">
              contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
