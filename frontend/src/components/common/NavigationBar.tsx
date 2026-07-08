import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Menu, X } from 'lucide-react';
import { imageAssets } from '../../data/imageAssets';
import '../../styles/components/navigationBar.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
];

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.header
          key={isScrolled ? 'scroll-navbar' : 'default-navbar'}
          className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-default'}`}
          initial={
            isScrolled
              ? { y: -90, opacity: 0, scale: 0.92, borderRadius: '0 0 80px 80px' }
              : { y: -30, opacity: 0 }
          }
          animate={
            isScrolled
              ? { y: 0, opacity: 1, scale: 1, borderRadius: '999px' }
              : { y: 0, opacity: 1 }
          }
          exit={{ y: -60, opacity: 0 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="navbar-inner">
            <NavLink to="/" className="navbar-logo">
            <img src={imageAssets.brand.companyLogo} alt="Company Logo" />
          </NavLink>

            <nav className="navbar-links">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="navbar-actions">
              {!isScrolled && (
                <div className="navbar-socials">
                  <a href="#" aria-label="Facebook">
                    <Facebook size={18} />
                  </a>
                  <a href="#" aria-label="Instagram">
                    <Instagram size={18} />
                  </a>
                  <a href="#" aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                </div>
              )}

              <button
                className="navbar-menu-btn"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </motion.header>
      </AnimatePresence>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="sidebar-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="sidebar-close"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <X size={26} />
              </button>

              <img
                src={imageAssets.brand.companyLogo}
                alt="Company Logo"
                className="sidebar-logo"
              />

              <div className="sidebar-links">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              <div className="sidebar-socials">
                <a href="#" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationBar;