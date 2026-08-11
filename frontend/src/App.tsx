import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavigationBar from './components/common/NavigationBar';
import ScrollToTop from './components/common/ScrollToTop';
import CustomScrollbar from './components/common/CustomScrollbar';
import ScrollController from './components/common/ScrollController';
import Footer from './components/common/Footer';
import Preloader from './components/common/Preloader';
import PremiumCursor from './components/common/PremiumCursor';
import Home from './pages/Home';
import About from './pages/About';
import Management from './pages/Management';
import CSR from './pages/Csr';
import Contact from './pages/Contact';

function AppContent() {
  const location = useLocation();
  const [isPreloading, setIsPreloading] = useState(false);

  useEffect(() => {
    setIsPreloading(true);
    const timer = setTimeout(() => {
      setIsPreloading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Preloader sits as a fixed overlay on top of the live page — no unmounting */}
      {isPreloading && <Preloader />}

      {/* Page content is always rendered so it is visible blurred behind the overlay */}
      <div
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

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/management" element={<Management />} />
          <Route path="/csr" element={<CSR />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
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