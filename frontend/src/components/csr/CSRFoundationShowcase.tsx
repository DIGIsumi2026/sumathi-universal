import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { csrSectionsData, type CSRSectionItem } from '../../data/csrSectionsData';

function CSRFoundationCard({ section }: { section: CSRSectionItem }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = section.gallery[activeIndex];

  const goNext = () => {
    setActiveIndex((current) =>
      current === section.gallery.length - 1 ? 0 : current + 1
    );
  };

  const goPrev = () => {
    setActiveIndex((current) =>
      current === 0 ? section.gallery.length - 1 : current - 1
    );
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
        <div className="csr-foundation-main-image-wrap">
          <img
            key={activeImage.image}
            src={activeImage.image}
            alt={activeImage.alt}
            className="csr-foundation-main-image"
            draggable={false}
          />
        </div>

        <div className="csr-foundation-thumbnails">
          {section.gallery.map((item, index) => (
            <button
              key={item.image}
              type="button"
              className={`csr-foundation-thumb ${
                index === activeIndex ? 'active' : ''
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show gallery image ${index + 1}`}
            >
              <img src={item.image} alt={item.alt} draggable={false} />
            </button>
          ))}
        </div>

        <div className="csr-foundation-controls">
          <button
            type="button"
            className="csr-foundation-control"
            onClick={goPrev}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

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

          <button
            type="button"
            className="csr-foundation-control next"
            onClick={goNext}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
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