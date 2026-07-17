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
  address: string;
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
        phone: '+94 11 211 8130',
        address:
          '65, Ananda Rajakaruna Mawatha, Colombo 10, Sri Lanka.',
      },

      shortDescription:
        'Rabbit Solutions provides innovative technology solutions, custom software, and scalable digital products that help businesses and start-ups grow.',

      fullDescription:
        'Formed to create a smart world through continuous innovation, Rabbit Solutions was established to provide intelligent technology solutions. Over the years, the company has helped many businesses and start-ups grow and gain strong momentum in their respective industries. Using deep industry expertise and the latest IT advancements, Rabbit Solutions delivers custom solutions and products that perfectly fit the needs and behaviour of users. The company also specialises in developing reliable and scalable software for any operating system, browser, and device.',

      services: [
        'Custom Software Development',
        'Web Application Development',
        'Mobile Application Development',
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