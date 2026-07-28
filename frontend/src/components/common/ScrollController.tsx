import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollController() {
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // 1. Take manual control over browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Detect hard refresh using the Performance API
    const navEntries = window.performance?.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const isHardRefresh = navEntries && navEntries.length > 0 && navEntries[0].type === 'reload';

    if (isHardRefresh) {
      // Force scroll to very top immediately on refresh
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    // Track and save scroll Y position into sessionStorage tied to the unique location key
    const saveScrollPosition = () => {
      sessionStorage.setItem(`scroll-pos-${location.key}`, window.scrollY.toString());
    };

    window.addEventListener('scroll', saveScrollPosition, { passive: true });
    return () => window.removeEventListener('scroll', saveScrollPosition);
  }, [location.key]);

  useEffect(() => {
    if (navType === 'POP') {
      // 3. Handle Back/Forward Navigation (POP)
      const savedPosition = sessionStorage.getItem(`scroll-pos-${location.key}`);
      if (savedPosition !== null) {
        // Use requestAnimationFrame to ensure the DOM has re-rendered before scrolling
        requestAnimationFrame(() => {
          window.scrollTo({ top: parseInt(savedPosition, 10), behavior: 'instant' });
        });
      }
    } else {
      // 4. Handle standard New Page Navigation (PUSH/REPLACE)
      // Smoothly scroll to the top of the new page
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.key, navType]);

  return null;
}
