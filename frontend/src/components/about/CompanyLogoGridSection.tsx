import { useEffect, useState, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { useInView } from 'framer-motion';
import { companyTimelineCategories } from '../../data/companyTimelineData';

const companies = companyTimelineCategories.flatMap((category) =>
  category.companies.map((company) => ({
    id: company.id,
    name: company.name,
    logo: company.logo,
    website: company.contact.website,
    category: category.category,
    color: category.color,
  }))
);

export default function CompanyLogoGridSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.1 });
  const [poppedIndex, setPoppedIndex] = useState<number | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isInView) {
      interval = setInterval(() => {
        setPoppedIndex(Math.floor(Math.random() * companies.length));
      }, 1500); // Change popped logo every 1.5 seconds
    } else {
      setPoppedIndex(null);
    }

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section className="company-logo-grid-section" ref={sectionRef}>
      <div className="company-logo-grid">
        {companies.map((company, index) => (
          <a
            key={company.id}
            href={`https://${company.website}`}
            target="_blank"
            rel="noreferrer"
            className={`company-logo-card ${poppedIndex === index ? 'is-popped' : ''}`}
            style={
              {
                '--logo-brand-color': company.color,
              } as React.CSSProperties
            }
            aria-label={`Visit ${company.name} website`}
          >
            <div className="company-logo-card-media">
              <img src={company.logo} alt={company.name} draggable={false} />
            </div>

            <span className="company-logo-card-link-icon">
              <ExternalLink size={16} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}