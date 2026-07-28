import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import NavigationBar from './components/common/NavigationBar';
import ScrollToTop from './components/common/ScrollToTop';
import ScrollController from './components/common/ScrollController';
import Footer from './components/common/Footer';
//import Preloader from './components/common/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import Management from './pages/Management';
import CSR from './pages/CSR';
import Contact from './pages/Contact';

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      
      <div className={`transition-all duration-500 ${isLoading ? 'blur-sm pointer-events-none select-none' : 'blur-none'}`}>
        <ScrollController />
        <NavigationBar />
        <ScrollToTop/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/management" element={<Management/>} />
          <Route path="/csr" element={<CSR />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer/>
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