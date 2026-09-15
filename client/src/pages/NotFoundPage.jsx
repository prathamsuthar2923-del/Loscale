import Seo from '../components/seo';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <Seo title="Page Not Found" noindex />
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">404</p>
      <h1 className="giant mt-4 font-semibold text-black" style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)' }}>
        Page not found
      </h1>
      <p className="mt-4 text-lg text-black/60">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Button to="/" variant="accent" className="mt-8">
        Back to Home
      </Button>
    </section>
  );
}
