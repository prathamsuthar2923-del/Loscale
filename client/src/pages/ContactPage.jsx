import ContactForm from '../components/sections/ContactForm';
import Seo from '../components/seo';

export default function ContactPage() {
  return (
    <div className="pt-16">
      <Seo title="Contact" description="Get in touch with LO SCALE to start your project." path="/contact" />
      <ContactForm />
    </div>
  );
}
