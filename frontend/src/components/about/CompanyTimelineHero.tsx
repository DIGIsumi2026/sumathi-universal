import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Mail,
  Phone,
  X,
} from 'lucide-react';
import {
  companyTimelineCategories,
  CompanyTimelineCategory,
} from '../../data/companyTimelineData';

export default function CompanyTimelineHero() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeCompanyIndex, setActiveCompanyIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const timelineRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  const activeCategory = companyTimelineCategories[activeCategoryIndex];

  const activeCompany = useMemo(() => {
    return activeCategory.companies[activeCompanyIndex] ?? null;
  }, [activeCategory, activeCompanyIndex]);

  const rabbitFallback = companyTimelineCategories[0].companies[0];

  const displayCompany = activeCompany ?? rabbitFallback;

  const hasMultipleCompanies = activeCategory.companies.length > 1;

  const handleCategorySelect = (index: number) => {
    setActiveCategoryIndex(index);
    setActiveCompanyIndex(0);
    setIsExpanded(false);
  };

  const handleNextCompany = () => {
    if (!hasMultipleCompanies) return;

    setActiveCompanyIndex((current) =>
      current === activeCategory.companies.length - 1 ? 0 : current + 1
    );
    setIsExpanded(false);
  };

  const handlePrevCompany = () => {
    if (!hasMultipleCompanies) return;

    setActiveCompanyIndex((current) =>
      current === 0 ? activeCategory.companies.length - 1 : current - 1
    );
    setIsExpanded(false);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    isDragging.current = true;
    dragStartX.current = event.clientX;
    scrollStartX.current = timeline.scrollLeft;

    timeline.setPointerCapture(event.pointerId);
    timeline.classList.add('is-dragging');
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const timeline = timelineRef.current;
    if (!timeline || !isDragging.current) return;

    const distance = event.clientX - dragStartX.current;
    timeline.scrollLeft = scrollStartX.current - distance;
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    isDragging.current = false;
    timeline.classList.remove('is-dragging');

    if (timeline.hasPointerCapture(event.pointerId)) {
      timeline.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section className="company-timeline-hero">
      <AnimatePresence mode="wait">
        <motion.div
          key={displayCompany.background}
          className="company-timeline-bg"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={displayCompany.background}
            alt={displayCompany.name}
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      <div className="company-timeline-overlay" />
      <div className="company-timeline-glow company-timeline-glow-one" />
      <div className="company-timeline-glow company-timeline-glow-two" />

      <div className="company-timeline-content">
        <motion.div
          className="company-timeline-active-card"
          initial={{ opacity: 0, x: -44 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="company-timeline-logo-box">
            <AnimatePresence mode="wait">
              <motion.img
                key={displayCompany.logo}
                src={displayCompany.logo}
                alt={`${displayCompany.name} logo`}
                initial={{ opacity: 0, y: 16, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                draggable={false}
              />
            </AnimatePresence>
          </div>

          <div className="company-timeline-contact">
            <span>Contact Details</span>

            <a href={`https://${displayCompany.contact.website}`} target="_blank">
              <ExternalLink size={15} />
              {displayCompany.contact.website}
            </a>

            <a href={`mailto:${displayCompany.contact.email}`}>
              <Mail size={15} />
              {displayCompany.contact.email}
            </a>

            <a href={`tel:${displayCompany.contact.phone}`}>
              <Phone size={15} />
              {displayCompany.contact.phone}
            </a>
          </div>

          <div className="company-timeline-description">
            <span>Short Description</span>
            <p>{displayCompany.shortDescription}</p>
          </div>

          <button
            type="button"
            className="company-timeline-expand-btn"
            onClick={() => setIsExpanded((current) => !current)}
          >
            {isExpanded ? 'Close Details' : 'Expand'}
          </button>
        </motion.div>

        <motion.div
          className="company-timeline-main-copy"
          initial={{ opacity: 0, x: 44 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>Active Company</span>

          <AnimatePresence mode="wait">
            <motion.h2
              key={displayCompany.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {displayCompany.name}
            </motion.h2>
          </AnimatePresence>

          <p>
            Background image, company logo, contact details and company
            description change according to the selected category/company.
          </p>

          {hasMultipleCompanies && (
            <div className="company-timeline-company-controls">
              <button type="button" onClick={handlePrevCompany}>
                <ChevronLeft size={18} />
                Previous
              </button>

              <small>
                {activeCompanyIndex + 1} / {activeCategory.companies.length}
              </small>

              <button type="button" onClick={handleNextCompany}>
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {!activeCompany && (
            <div className="company-timeline-coming-soon">
              Company media and details for this category will be added later.
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="company-timeline-expanded-panel"
            initial={{ opacity: 0, y: 38, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 28, height: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="company-timeline-expanded-inner">
              <button
                type="button"
                className="company-timeline-expanded-close"
                onClick={() => setIsExpanded(false)}
                aria-label="Close company details"
              >
                <X size={18} />
              </button>

              <div>
                <span>Company Details</span>
                <h3>{displayCompany.name}</h3>
                <p>{displayCompany.fullDescription}</p>
              </div>

              <div>
                <span>Key Services</span>
                <ul>
                  {displayCompany.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="company-timeline-bottom">
        <div
          ref={timelineRef}
          className="company-timeline-track-scroll"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onPointerLeave={(event) => {
            if (isDragging.current) {
              stopDragging(event);
            }
          }}
        >
          <div className="company-timeline-track">
            <div className="company-timeline-line" />

            {companyTimelineCategories.map(
              (item: CompanyTimelineCategory, index: number) => {
                const isActive = index === activeCategoryIndex;
                const isTop = index % 2 === 0;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`company-timeline-point ${
                      isActive ? 'active' : ''
                    } ${isTop ? 'point-top' : 'point-bottom'}`}
                    onClick={() => handleCategorySelect(index)}
                  >
                    <span className="company-timeline-category-name">
                      {item.category}
                    </span>
                    <span className="company-timeline-marker" />
                  </button>
                );
              }
            )}
          </div>
        </div>

        <span className="company-timeline-drag-hint">
          Click + drag timeline
        </span>
      </div>
    </section>
  );
}