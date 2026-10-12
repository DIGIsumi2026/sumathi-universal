import { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { imageAssets } from '../../assets/imageAssets';
import '../../styles/components/navigationBar.css';
import MobileSidebar from './MobileSidebar';
import { siteContact } from '../../data/siteContact';

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
  { label: 'Facebook', href: 'https://www.facebook.com/share/1KtpK2xGdT/?mibextid=wwXIfr', Icon: Facebook, cursorColor: 'facebook' },
  { label: 'Instagram', href: 'https://www.instagram.com/sumathi_universal?igsh=NnB6OWJjZmlwcnA3', Icon: Instagram, cursorColor: 'instagram' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/sumathi-universal/', Icon: Linkedin, cursorColor: 'linkedin' },
];

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollNav, setShowScrollNav] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const lastScrollY = useRef(0);
  const hideScrollNavTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 1024px)').matches);
  const [menuPresent, setMenuPresent] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuOpenRef = useRef(sidebarOpen);
  menuOpenRef.current = sidebarOpen;
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const closeMobileMenu = useCallback(() => setSidebarOpen(false), []);
  const finishMobileExit = useCallback(() => {
    if (!menuOpenRef.current) setMenuPresent(false);
  }, []);

  useEffect(() => { closeMobileMenu(); }, [location.key, closeMobileMenu]);

  useEffect(() => {
    const breakpoint = window.matchMedia('(max-width: 1024px)');
    const updateLayout = () => {
      setIsMobile(breakpoint.matches);
      isHoveredRef.current = false;
      setIsHovered(false);
      lastScrollY.current = window.scrollY;
      if (hideScrollNavTimer.current) clearTimeout(hideScrollNavTimer.current);
      if (!breakpoint.matches) {
        setShowScrollNav(window.scrollY > 80);
        setSidebarOpen(false);
        setMenuPresent(false);
      }
    };
    breakpoint.addEventListener('change', updateLayout);
    return () => breakpoint.removeEventListener('change', updateLayout);
  }, []);

  const isHoveredRef = useRef(false);

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
          if (!isHoveredRef.current) {
            hideScrollNavTimer.current = setTimeout(() => {
              if (!isHoveredRef.current && !menuOpenRef.current) {
                setShowScrollNav(false);
              }
              hideScrollNavTimer.current = null;
            }, 2800);
          }
        } else {
          if (!isHoveredRef.current) {
            setShowScrollNav(false);
            if (hideScrollNavTimer.current) {
              clearTimeout(hideScrollNavTimer.current);
              hideScrollNavTimer.current = null;
            }
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

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsHovered(true);
    if (hideScrollNavTimer.current) {
      clearTimeout(hideScrollNavTimer.current);
      hideScrollNavTimer.current = null;
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
    
    // Hide immediately on hover out if we are scrolled down
    if (isScrolled && !menuOpenRef.current) {
      setShowScrollNav(false);
    }
  };

  return (
    <>
      <AnimatePresence mode={isMobile ? 'sync' : 'wait'}>
        {(!isScrolled || showScrollNav || isHovered || (isMobile && menuPresent)) && (
        <motion.header
          key={isScrolled ? 'scroll-navbar' : 'default-navbar'}
          ref={headerRef}
          role={isMobile && menuPresent ? 'dialog' : undefined}
          aria-modal={isMobile && menuPresent ? true : undefined}
          aria-label={isMobile && menuPresent ? 'Main navigation' : undefined}
          data-lenis-prevent={isMobile && menuPresent ? true : undefined}
          className={`navbar ${isScrolled ? 'navbar-scrolled navbar-scroll-visible' : 'navbar-default'}${isMobile ? ' mobile-navigation-enabled' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          initial={
            isMobile && reduceMotion ? false : isScrolled
              ? { y: -20, opacity: 0, scale: 0.98, borderRadius: '999px' }
              : { y: -30, opacity: 0 }
          }
          animate={
            isScrolled
              ? { y: 0, opacity: 1, scale: 1, borderRadius: '999px' }
              : { y: 0, opacity: 1 }
          }
          exit={{ y: isMobile && reduceMotion ? 0 : -20, opacity: 0 }}
          transition={{
            duration: isMobile && reduceMotion ? 0 : 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="navbar-shell">
            <div className="navbar-inner">
              <NavLink to="/" className="navbar-logo" data-cursor-type="precise">
                <img src={imageAssets.brand.companyLogo} alt="Sumathi Universal" />
              </NavLink>

              <nav className="navbar-links">
                {navLinks.map((link) =>
                  link.label === 'Contact' ? (
                    <NavLink
                      key={link.label}
                      to={link.path}
                      className="nav-contact-btn"
                      data-cursor-type="button"
                      data-cursor-text="Contact"
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
                      data-cursor-type="precise"
                    >
                      <span>{link.label}</span>
                    </NavLink>
                  )
                )}
              </nav>

              <div className="navbar-actions">
                <button
                  ref={menuButtonRef}
                  type="button"
                  className="navbar-menu-btn"
                  onClick={() => {
                    if (!sidebarOpen) {
                      setMenuPresent(true);
                      if (hideScrollNavTimer.current) clearTimeout(hideScrollNavTimer.current);
                    }
                    setSidebarOpen(!sidebarOpen);
                  }}
                  aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={sidebarOpen}
                  aria-controls="mobile-navigation"
                  data-cursor-type="precise"
                >
                  <span className={`navbar-menu-icon${sidebarOpen ? ' is-open' : ''}`} aria-hidden="true"><span /><span /><span /></span>
                </button>
              </div>
            </div>

            <div className="header-social-links" aria-label="Social media links">
              {socialLinks.map(({ label, href, Icon, cursorColor }) => (
                <a
                  key={label}
                  className="header-social-link"
                  href={href}
                  aria-label={label}
                  data-cursor-type="social"
                  data-cursor-text={label}
                  data-cursor-color={cursorColor}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <MobileSidebar
              open={isMobile && sidebarOpen}
              active={isMobile && menuPresent}
              onClose={closeMobileMenu}
              onExitComplete={finishMobileExit}
              headerRef={headerRef}
              toggleRef={menuButtonRef}
              links={navLinks}
              contact={siteContact}
              socials={[...socialLinks, { label: 'WhatsApp', href: 'https://wa.me/94716824520', Icon: WhatsappIcon }]}
            />
          </div>
        </motion.header>
        )}
      </AnimatePresence>


    </>
  );
};

export default NavigationBar;
