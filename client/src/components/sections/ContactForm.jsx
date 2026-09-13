import { useState } from 'react';
import contactApi from '../../api/contact.api';

const initialForm = { fullName: '', email: '', subject: '', description: '' };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.description.trim()) {
      setError('Please fill in your name, email, and a short description.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setError('');
    try {
      await contactApi.submit(form);
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24 md:px-10">
      <div className="mb-12 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">Get in touch</p>
        <h2 className="giant font-semibold text-black" style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}>
          Let&apos;s Talk
        </h2>
        <p className="mt-4 text-lg text-black/60">
          Tell us a bit about your project and we&apos;ll get back to you shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-black">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="w-full border-b border-black/20 bg-transparent py-3 text-black outline-none transition-colors focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-black">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@company.com"
              className="w-full border-b border-black/20 bg-transparent py-3 text-black outline-none transition-colors focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-black">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            className="w-full border-b border-black/20 bg-transparent py-3 text-black outline-none transition-colors focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-medium text-black">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={form.description}
            onChange={handleChange}
            placeholder="Tell us about your project, goals, and timeline..."
            className="w-full resize-none border-b border-black/20 bg-transparent py-3 text-black outline-none transition-colors focus:border-accent"
          />
        </div>

        {status === 'error' && error && <p className="text-sm text-red-600">{error}</p>}
        {status === 'success' && (
          <p className="text-sm text-green-700">
            Thanks — your message has been sent. We&apos;ll be in touch soon.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  );
}
