import { imageAssets } from './imageAssets';

export type CompanyTimelineCompany = {
  id: string;
  name: string;
  logo: string;
  background: string;
  contact: {
    website: string;
    email: string;
    phone: string;
  };
  shortDescription: string;
  fullDescription: string;
  services: string[];
};

export type CompanyTimelineCategory = {
  id: string;
  category: string;
  companies: CompanyTimelineCompany[];
};

export const companyTimelineCategories: CompanyTimelineCategory[] = [
  {
    id: 'technology-it',
    category: 'Technology & IT',
    companies: [
      {
        id: 'rabbit-solutions',
        name: 'Rabbit Solutions',
        logo: imageAssets.companyTimeline.rabbitSolutions.logo,
        background: imageAssets.companyTimeline.rabbitSolutions.background,
        contact: {
          website: 'www.rabbit.lk',
          email: 'info@rabbit.lk',
          phone: '+94 XX XXX XXXX',
        },
        shortDescription:
          'Rabbit Solutions delivers technology-driven digital solutions for modern business transformation.',
        fullDescription:
          'Rabbit Solutions represents the Technology & IT arm of the group, focusing on digital transformation, software solutions, business systems, and technology services that support modern organizations with scalable and efficient digital infrastructure.',
        services: [
          'Software Development',
          'ERP Solutions',
          'Digital Transformation',
          'Cloud-Based Systems',
          'Business Automation',
          'Technology Consulting',
        ],
      },
    ],
  },
  {
    id: 'printing',
    category: 'Printing',
    companies: [],
  },
  {
    id: 'security-services',
    category: 'Security & Services',
    companies: [],
  },
  {
    id: 'renewable-energy',
    category: 'Renewable Energy',
    companies: [],
  },
  {
    id: 'architecture',
    category: 'Architecture',
    companies: [],
  },
  {
    id: 'hospitality',
    category: 'Hospitality',
    companies: [],
  },
  {
    id: 'trading-commerce',
    category: 'Trading & Commerce',
    companies: [],
  },
  {
    id: 'events-entertainment',
    category: 'Events & Entertainment',
    companies: [],
  },
  {
    id: 'ventures-partnerships',
    category: 'Ventures',
    companies: [],
  },
];