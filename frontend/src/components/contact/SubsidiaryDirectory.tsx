import { useEffect, useState } from 'react';
import { ChevronRight, Mail, PhoneCall } from 'lucide-react';
import { contactSubsidiariesData } from '../../data/contactSubsidiariesData';

export default function SubsidiaryDirectory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);

    return () => {
      window.removeEventListener('resize', checkScreen);
    };
  }, []);

  const handleItemClick = (index: number) => {
    setActiveIndex((current) => {
      if (isMobile && current === index) return index;
      return index;
    });
  };

  return (
    <section className="subsidiary-directory-section">
      <div className="subsidiary-directory-accordion">
        {contactSubsidiariesData.map((group, index) => {
          const isActive = activeIndex === index;

          return (
            <article
              key={group.id}
              className={`subsidiary-accordion-item ${
                isActive ? 'active' : ''
              }`}
              onMouseEnter={() => {
                if (!isMobile) setActiveIndex(index);
              }}
            >
              <button
                type="button"
                className="subsidiary-accordion-trigger"
                onClick={() => handleItemClick(index)}
                aria-expanded={isActive}
              >
                <img
                  src={group.image}
                  alt={group.title}
                  className="subsidiary-accordion-image"
                  draggable={false}
                />

                <div className="subsidiary-accordion-overlay" />

                <div className="subsidiary-accordion-collapsed-title">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{group.shortTitle}</strong>
                </div>

                <div className="subsidiary-accordion-content">
                  <div className="subsidiary-accordion-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <h3>{group.title}</h3>

                  <p>{group.description}</p>

                  <div className="subsidiary-company-list">
                    {group.companies.map((company) => (
                      <div className="subsidiary-company-card" key={company.name}>
                        <h4>{company.name}</h4>

                        <div className="subsidiary-company-actions">
                          <a href={`tel:${company.phoneHref}`}>
                            <PhoneCall size={15} />
                            {company.phone}
                          </a>

                          <a href={`mailto:${company.email}`}>
                            <Mail size={15} />
                            {company.email}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}