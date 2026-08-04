import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Menu, X } from 'lucide-react';
import { imageAssets } from '../../data/imageAssets';
import '../../styles/components/navigationBar.css';

const WhatsappIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  {label: 'Management', path:'/management'},
  { label: 'CSR', path: '/csr' },
  { label: 'Contact', path: '/contact' },
];

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/share/1KtpK2xGdT/?mibextid=wwXIfr', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/sumathi_universal?igsh=NnB6OWJjZmlwcnA3', Icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/sumathi-universal/', Icon: Linkedin },
];

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollNav, setShowScrollNav] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const lastScrollY = useRef(0);
  const hideScrollNavTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (sidebarOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.classList.add('sidebar-active');
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('sidebar-active');
      if (scrollY) {
        window.scrollTo(0, -parseInt(scrollY || '0', 10));
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('sidebar-active');
      if (scrollY) {
        window.scrollTo(0, -parseInt(scrollY || '0', 10));
      }
    };
  }, [sidebarOpen]);

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
                {navLinks.map((link) =>
                  link.label === 'Contact' ? (
                    <NavLink
                      key={link.label}
                      to={link.path}
                      className="nav-contact-btn"
                    >
                      {link.label}
                    </NavLink>
                  ) : (
                    <NavLink
                      key={link.label}
                      to={link.path}
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                      }
                    >
                      <span>{link.label}</span>
                    </NavLink>
                  )
                )}
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
            onClick={() => setSidebarOpen(false)}
          >
            <motion.div
              className="sidebar-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
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
                {navLinks.map((link) =>
                  link.label === 'Contact' ? (
                    <NavLink
                      key={link.label}
                      to={link.path}
                      onClick={() => setSidebarOpen(false)}
                      className="nav-contact-btn"
                      style={{ marginTop: '20px', alignSelf: 'center' }}
                    >
                      {link.label}
                    </NavLink>
                  ) : (
                    <NavLink
                      key={link.label}
                      to={link.path}
                      onClick={() => setSidebarOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  )
                )}
              </div>

              <div className="sidebar-socials">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a key={label} href={href} aria-label={label}>
                    <Icon size={20} />
                  </a>
                ))}
                <a href="https://wa.me/94716824520" aria-label="WhatsApp">
                  <WhatsappIcon size={20} />
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
