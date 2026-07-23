import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { csrSectionsData, type CSRSectionItem } from '../../data/csrSectionsData';

function CSRFoundationCard({ section }: { section: CSRSectionItem }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const activeImage = section.gallery[activeIndex];

  const goNext = useCallback(() => {
    setActiveIndex((current) =>
      current === section.gallery.length - 1 ? 0 : current + 1
    );
  }, [section.gallery.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? section.gallery.length - 1 : current - 1
    );
  }, [section.gallery.length]);

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;

      setIsDesktop(width >= 1025);
      setIsMobile(width <= 768);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);

    return () => {
      window.removeEventListener('resize', checkScreen);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setIsZoomOpen(false);
    }
  }, [isDesktop]);

  /* mobile only autoplay */
  useEffect(() => {
    if (!isMobile || section.gallery.length <= 1 || isZoomOpen) return;

    const autoplay = window.setInterval(() => {
      goNext();
    }, 3600);

    return () => {
      window.clearInterval(autoplay);
    };
  }, [isMobile, section.gallery.length, isZoomOpen, goNext]);

  useEffect(() => {
    if (!isZoomOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.classList.add('csr-zoom-active');
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsZoomOpen(false);
      }

      if (event.key === 'ArrowRight') {
        goNext();
      }

      if (event.key === 'ArrowLeft') {
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('csr-zoom-active');
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZoomOpen, goNext, goPrev]);

  const visibleThumbnails = useMemo(() => {
    const galleryLength = section.gallery.length;

    if (galleryLength <= 3) {
      return section.gallery.map((item, index) => ({
        item,
        realIndex: index,
      }));
    }

    return [-1, 0, 1].map((offset) => {
      const realIndex = (activeIndex + offset + galleryLength) % galleryLength;

      return {
        item: section.gallery[realIndex],
        realIndex,
      };
    });
  }, [activeIndex, section.gallery]);

  const openZoom = () => {
    if (!isDesktop) return;
    setIsZoomOpen(true);
  };

  const closeZoom = () => {
    setIsZoomOpen(false);
  };

  return (
    <article
      className="csr-foundation-card"
      style={
        {
          '--csr-accent': section.accentColor,
          backgroundImage: `url(${section.outerBg})`,
        } as React.CSSProperties
      }
    >
      <div
        className="csr-foundation-left"
        style={{ backgroundImage: `url(${section.leftBg})` }}
      >
        <div className="csr-foundation-logo-wrap">
          <img
            src={section.logo}
            alt={section.label}
            className="csr-foundation-logo"
            draggable={false}
          />
        </div>

        <div className="csr-foundation-copy">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div
        className="csr-foundation-gallery"
        style={{ backgroundImage: `url(${section.galleryBg})` }}
      >
        <button
          type="button"
          className={`csr-foundation-main-image-wrap ${
            isDesktop ? 'zoom-enabled' : ''
          }`}
          onClick={openZoom}
          aria-label={isDesktop ? 'Zoom active CSR image' : activeImage.alt}
        >
          <img
            key={activeImage.image}
            src={activeImage.image}
            alt={activeImage.alt}
            className="csr-foundation-main-image"
            draggable={false}
          />
        </button>

        <div className="csr-foundation-thumbnails">
          {visibleThumbnails.map(({ item, realIndex }) => (
            <button
              key={`${item.image}-${realIndex}`}
              type="button"
              className={`csr-foundation-thumb ${
                realIndex === activeIndex ? 'active' : ''
              }`}
              onClick={() => setActiveIndex(realIndex)}
              aria-label={`Show gallery image ${realIndex + 1}`}
            >
              <img src={item.image} alt={item.alt} draggable={false} />
            </button>
          ))}
        </div>

        <div className="csr-foundation-controls">
          {!isMobile && (
            <button
              type="button"
              className="csr-foundation-control"
              onClick={goPrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <div className="csr-foundation-dots">
            {section.gallery.map((item, index) => (
              <button
                key={item.image}
                type="button"
                className={index === activeIndex ? 'active' : ''}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to gallery image ${index + 1}`}
              />
            ))}
          </div>

          {!isMobile && (
            <button
              type="button"
              className="csr-foundation-control next"
              onClick={goNext}
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      </div>

      {isDesktop && isZoomOpen && (
        <div
          className="csr-foundation-zoom-modal"
          role="dialog"
          aria-modal="true"
          aria-label="CSR image preview"
          onClick={closeZoom}
        >
          <button
            type="button"
            className="csr-foundation-zoom-close"
            onClick={(event) => {
              event.stopPropagation();
              closeZoom();
            }}
            aria-label="Close zoom image"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            className="csr-foundation-zoom-nav csr-foundation-zoom-prev"
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            aria-label="Previous zoom image"
          >
            <ChevronLeft size={34} />
          </button>

          <img
            key={`zoom-${activeImage.image}`}
            src={activeImage.image}
            alt={activeImage.alt}
            className="csr-foundation-zoom-image"
            draggable={false}
            onClick={(event) => event.stopPropagation()}
          />

          <button
            type="button"
            className="csr-foundation-zoom-nav csr-foundation-zoom-next"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            aria-label="Next zoom image"
          >
            <ChevronRight size={34} />
          </button>
        </div>
      )}
    </article>
  );
}

export default function CSRFoundationShowcase() {
  return (
    <section className="csr-foundation-showcase-section">
      <div className="csr-foundation-showcase-list">
        {csrSectionsData.map((section) => (
          <CSRFoundationCard key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}