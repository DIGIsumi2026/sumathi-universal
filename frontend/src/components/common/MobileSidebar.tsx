import { useEffect, useRef, type ComponentType, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import '../../styles/components/mobileSidebar.css';

type NavigationLink = { label: string; path: string };
type SocialLink = { label: string; href: string; Icon: ComponentType<{ size?: number }> };
type MobileSidebarProps = {
  open: boolean;
  active: boolean;
  onClose: () => void;
  onExitComplete: () => void;
  headerRef: RefObject<HTMLElement | null>;
  toggleRef: RefObject<HTMLButtonElement | null>;
  links: NavigationLink[];
  socials: SocialLink[];
  contact: { email: string; phone: string; phoneHref: string };
};

const mobileMenuVariants: Variants = {
  closed: (reduce: boolean) => ({
    opacity: 0, y: reduce ? 0 : -10, scale: reduce ? 1 : 0.988,
    transition: reduce ? { duration: 0 } : {
      duration: 0.24, ease: [0.4, 0, 1, 1], staggerChildren: 0.015, staggerDirection: -1,
    },
  }),
  open: (reduce: boolean) => ({
    opacity: 1, y: 0, scale: 1,
    transition: reduce ? { duration: 0 } : {
      duration: 0.34, ease: [0.22, 1, 0.36, 1], delayChildren: 0.02, staggerChildren: 0.03,
    },
  }),
};

const itemVariants: Variants = {
  closed: (reduce: boolean) => ({
    opacity: 0, y: reduce ? 0 : 5,
    transition: { duration: reduce ? 0 : 0.14, ease: [0.4, 0, 1, 1] },
  }),
  open: (reduce: boolean) => ({
    opacity: 1, y: 0,
    transition: { duration: reduce ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] },
  }),
};

const contactVariants: Variants = {
  ...itemVariants,
  open: (reduce: boolean) => ({
    opacity: 1, y: 0,
    transition: { duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] },
  }),
};

const socialVariants: Variants = {
  closed: (reduce: boolean) => ({
    opacity: 0, y: reduce ? 0 : 4, scale: reduce ? 1 : 0.94,
    transition: { duration: reduce ? 0 : 0.14 },
  }),
  open: (reduce: boolean) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: reduce ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function MobileSidebar({ open, active, onClose, onExitComplete, headerRef, toggleRef, links, socials, contact }: MobileSidebarProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !headerRef.current) return;
    const previousOverflow = document.body.style.overflow;
    const hadActiveClass = document.body.classList.contains('sidebar-active');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('sidebar-active');

    // Disable the page around the header while keeping the logo and toggle usable.
    const siblings = new Map<HTMLElement, boolean>();
    let branch: HTMLElement = headerRef.current;
    while (branch.parentElement) {
      for (const sibling of branch.parentElement.children) {
        if (sibling instanceof HTMLElement && sibling !== branch && !sibling.hasAttribute('data-mobile-menu-backdrop')) {
          siblings.set(sibling, sibling.inert);
          sibling.inert = true;
        }
      }
      if (branch.parentElement === document.body) break;
      branch = branch.parentElement;
    }

    const focusable = () => Array.from(headerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ) ?? []).filter(element => element.getClientRects().length && !element.closest('[inert]'));
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        toggleRef.current?.focus({ preventScroll: true });
      } else if (event.key === 'Tab') {
        const targets = focusable();
        const first = targets[0];
        const last = targets[targets.length - 1];
        if (event.shiftKey && (document.activeElement === first || !headerRef.current?.contains(document.activeElement))) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !headerRef.current?.contains(document.activeElement))) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const containFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        toggleRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', containFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (!hadActiveClass) document.body.classList.remove('sidebar-active');
      siblings.forEach((wasInert, element) => { element.inert = wasInert; });
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', containFocus);
    };
  }, [active, headerRef, onClose, toggleRef]);

  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true });
  }, [open]);

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu-backdrop"
              className="mobile-menu-backdrop"
              data-mobile-menu-backdrop
              data-lenis-prevent
              aria-hidden="true"
              onClick={() => { onClose(); toggleRef.current?.focus({ preventScroll: true }); }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: reduceMotion ? 0 : 0.22 } }}
              exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.18 } }}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
      <AnimatePresence custom={reduceMotion} onExitComplete={onExitComplete}>
        {open && (
          <motion.div
            key="mobile-navigation"
            ref={panelRef}
            id="mobile-navigation"
            className="mobile-sidebar"
            data-lenis-prevent
            custom={reduceMotion}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <nav className="mobile-sidebar-links" aria-label="Mobile navigation">
              {links.map(({ label, path }) => (
                <motion.div key={path} className="mobile-sidebar-item" custom={reduceMotion} variants={itemVariants}>
                  <NavLink to={path} end={path === '/'} onClick={onClose} className={({ isActive }) => `mobile-sidebar-link${isActive ? ' is-active' : ''}`}>
                    <span>{label}</span>
                  </NavLink>
                </motion.div>
              ))}
              <motion.div className="mobile-sidebar-contact" custom={reduceMotion} variants={contactVariants}>
                {contact.email && <a href={`mailto:${contact.email}`}><Mail size={17} aria-hidden="true" /><span>{contact.email}</span></a>}
                {contact.phone && <a href={contact.phoneHref}><Phone size={17} aria-hidden="true" /><span>{contact.phone}</span></a>}
              </motion.div>
              {socials.length > 0 && (
                <motion.div className="mobile-sidebar-socials" custom={reduceMotion} variants={socialVariants} aria-label="Social media links">
                  {socials.map(({ label, href, Icon }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}><Icon size={19} /></a>
                  ))}
                </motion.div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
