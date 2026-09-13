import { useEffect } from 'react';

// Thin progress bar across the very top of the page that fills as the
// visitor scrolls down — a small "smooth scrolling" polish detail carried
// over from the original design.
export default function ScrollProgressBar() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    function update() {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      bar.style.width = `${isFinite(scrolled) ? scrolled : 0}%`;
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return <div id="scroll-progress" />;
}
