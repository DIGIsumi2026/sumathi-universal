import { lazy, Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavigationBar from './components/common/NavigationBar';
import ScrollToTop from './components/common/ScrollToTop';
import CustomScrollbar from './components/common/CustomScrollbar';
import ScrollController from './components/common/ScrollController';
import Footer from './components/common/Footer';
import Preloader from './components/common/Preloader';
import PremiumCursor from './components/common/PremiumCursor';
import Home from './pages/Home';

// Secondary pages — lazy-loaded so they are split into separate chunks
// and their JS (including Three.js components) is not part of the initial bundle.
const About = lazy(() => import('./pages/About'));
const Management = lazy(() => import('./pages/Management'));
const CSR = lazy(() => import('./pages/Csr'));
const Contact = lazy(() => import('./pages/Contact'));

function RouteReady({ routeKey, onReady }: { routeKey: string; onReady: (key: string) => void }) {
  useEffect(() => {
    onReady(routeKey);
  }, [routeKey, onReady]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const [readyKey, setReadyKey] = useState<string | null>(null);
  const [completedKey, setCompletedKey] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const isPreloading = completedKey !== location.key;
  const finishLoading = useCallback(() => setCompletedKey(location.key), [location.key]);

  return (
    <>
      {isPreloading && (
        <Preloader
          key={location.key}
          pageReady={readyKey === location.key}
          contentRef={pageRef}
          onComplete={finishLoading}
        />
      )}

      {/* Page content is always rendered so it is visible blurred behind the overlay */}
      <div
        inert={isPreloading}
        aria-busy={isPreloading}
        style={{
          filter: isPreloading ? 'blur(6px)' : 'none',
          transition: 'filter 0.5s ease',
          pointerEvents: isPreloading ? 'none' : 'auto',
          userSelect: isPreloading ? 'none' : 'auto',
        }}
      >
        <ScrollController />
        <PremiumCursor />
        <NavigationBar />
        <ScrollToTop />
        <CustomScrollbar />

        <div ref={pageRef}>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/management" element={<Management />} />
              <Route path="/csr" element={<CSR />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <RouteReady routeKey={location.key} onReady={setReadyKey} />
          </Suspense>
        </div>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
