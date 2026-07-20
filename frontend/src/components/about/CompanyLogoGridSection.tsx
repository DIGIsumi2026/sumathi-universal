import { ExternalLink } from 'lucide-react';
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
  return (
    <section className="company-logo-grid-section">
      <div className="company-logo-grid">
        {companies.map((company) => (
          <a
            key={company.id}
            href={`https://${company.website}`}
            target="_blank"
            rel="noreferrer"
            className="company-logo-card"
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