import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Menu, X } from 'lucide-react';
import { imageAssets } from '../../data/imageAssets';
import '../../styles/components/navigationBar.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  {label: 'Management', path:'/management'},
  { label: 'CSR', path: '/csr' },
  { label: 'Contact', path: '/contact' },
];

const socialLinks = [
  { label: 'Facebook', href: '#', Icon: Facebook },
  { label: 'Instagram', href: '#', Icon: Instagram },
  { label: 'LinkedIn', href: '#', Icon: Linkedin },
];

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollNav, setShowScrollNav] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const lastScrollY = useRef(0);
  const hideScrollNavTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const threshold = 80;
      const scrollingUp = currentY < lastScrollY.current;

      if (currentY <= threshold) {
        setIsScrolled(false);
        setShowScrollNav(false);
        if (hideScrollNavTimer.current) {
          clearTimeout(hideScrollNavTimer.current);
          hideScrollNavTimer.current = null;
        }
      } else {
        setIsScrolled(true);

        if (scrollingUp) {
          setShowScrollNav(true);
          if (hideScrollNavTimer.current) {
            clearTimeout(hideScrollNavTimer.current);
          }
          hideScrollNavTimer.current = setTimeout(() => {
            setShowScrollNav(false);
            hideScrollNavTimer.current = null;
          }, 2800);
        } else {
          setShowScrollNav(false);
          if (hideScrollNavTimer.current) {
            clearTimeout(hideScrollNavTimer.current);
            hideScrollNavTimer.current = null;
          }
        }
      }

      lastScrollY.current = currentY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideScrollNavTimer.current) {
        clearTimeout(hideScrollNavTimer.current);
      }
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {(!isScrolled || showScrollNav) && (
        <motion.header
          key={isScrolled ? 'scroll-navbar' : 'default-navbar'}
          className={`navbar ${isScrolled ? 'navbar-scrolled navbar-scroll-visible' : 'navbar-default'}`}
          initial={
            isScrolled
              ? { y: -20, opacity: 0, scale: 0.98, borderRadius: '999px' }
              : { y: -30, opacity: 0 }
          }
          animate={
            isScrolled
              ? { y: 0, opacity: 1, scale: 1, borderRadius: '999px' }
              : { y: 0, opacity: 1 }
          }
          exit={{ y: -20, opacity: 0 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="navbar-shell">
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
                <button
                  className="navbar-menu-btn"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open sidebar"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>

            <div className="header-social-links" aria-label="Social media links">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  className="header-social-link"
                  href={href}
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </motion.header>
        )}
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
                {socialLinks.map(({ label, href, Icon }) => (
                  <a key={label} href={href} aria-label={label}>
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationBar;
