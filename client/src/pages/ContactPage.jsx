import ContactForm from '../components/sections/ContactForm';
import SectionHeading from '../components/ui/SectionHeading';

export default function ContactPage() {
  return (
    <div className="pt-16">
      <div className="mx-auto max-w-3xl px-6 pt-12 md:px-10">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Scale Together"
          description="Reach out and tell us about your goals — we'll follow up shortly."
          align="center"
        />
      </div>
      <ContactForm />
    </div>
  );
}
