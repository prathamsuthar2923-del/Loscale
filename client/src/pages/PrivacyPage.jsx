import { Link } from 'react-router-dom';
import SectionHeading from '../components/ui/SectionHeading';

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-28 md:px-10">
      <SectionHeading eyebrow="Legal" title="Privacy Policy" description="Last updated: September 2026" />

      <div className="mt-12 space-y-10 text-black/70">
        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">1. Introduction</h2>
          <p>
            LO SCALE is a full-service digital marketing agency. This Privacy Policy explains what
            information we collect through this website and while delivering our marketing services, how we
            use it, and the choices you have.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">2. Information We Collect</h2>
          <p>When you contact us or use this website, we may collect:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Contact details you submit through our contact form (name, email, subject, project details).</li>
            <li>Basic usage data (pages visited, browser/device type) via standard analytics tools.</li>
            <li>
              Information shared during an active engagement, such as access to ad accounts, analytics
              platforms, or brand assets required to deliver campaigns.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Respond to inquiries and prepare proposals.</li>
            <li>Plan, run, and report on marketing campaigns for our clients.</li>
            <li>Improve this website and our services.</li>
            <li>Meet legal and accounting obligations.</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">4. Sharing of Information</h2>
          <p>
            We do not sell personal information. We may share information with trusted third-party platforms
            necessary to deliver our services — such as advertising, analytics, and email platforms — and
            only to the extent required to perform the work agreed with a client.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">5. Data Retention</h2>
          <p>
            We retain contact and campaign-related information for as long as needed to provide our services
            and to meet legal, tax, or reporting obligations, after which it is deleted or anonymized.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">6. Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information at any time
            by reaching out through our{' '}
            <Link to="/contact" className="text-black underline underline-offset-2 hover:no-underline">
              contact page
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">7. Data Security</h2>
          <p>
            We take reasonable technical and organizational measures to protect the information we hold
            against unauthorized access, loss, or misuse.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in our practices or legal
            requirements. The &quot;Last updated&quot; date above will reflect the most recent revision.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-black">9. Contact</h2>
          <p>
            For any privacy-related questions, please reach out through our{' '}
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
