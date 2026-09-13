import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router keeps the browser's scroll position across route changes by
// default, so navigating to a new page can land the visitor mid-page instead
// of at the top. This resets scroll to the top on every route change.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
