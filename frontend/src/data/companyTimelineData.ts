import { image } from 'framer-motion/m';
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
  color: string;
  companies: CompanyTimelineCompany[];
};

const fallbackLogo = imageAssets.companyTimeline.rabbitSolutions.logo;
const fallbackBackground = imageAssets.companyTimeline.rabbitSolutions.background;

export const companyTimelineCategories: CompanyTimelineCategory[] = [
  {
    id: 'technology-it',
    category: 'Technology & IT',
    color: '#0511F2',
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
          address: '65, Ananda Rajakaruna Mawatha, Colombo 10, Sri Lanka.',
        },
        shortDescription:
          'Rabbit Solutions creates smart technology solutions, custom software, and scalable digital products that help businesses and start-ups grow through continuous innovation.',
        fullDescription:
          'Formed to create a smart world through continuous innovation, Rabbit Solutions was established to provide clever technology solutions. Over the years, the company has helped many businesses and start-ups grow and gain strong momentum in their respective industries. Using deep industry expertise and the latest IT advancements, the company delivers custom solutions and products that perfectly fit the needs and behaviour of users. The company also specialises in the development of reliable and scalable software for any operating system, browser, and device.',
        services: [
          'Custom Software Development',
          'Web Application Development',
          'Mobile Application Development',
          'Scalable Digital Products',
          'Business Technology Solutions',
          'IT Consulting',
        ],
      },
    ],
  },
  {
    id: 'printing',
    category: 'Printing',
    color: '#F2059F',
    companies: [
      {
        id: 'sumathi-printers',
        name: 'Sumathi Printers',
        logo: imageAssets.companyTimeline.sumathiPrinters.logo,
        background: imageAssets.companyTimeline.sumathiPrinters.background,
        contact: {
          website: 'www.sumathiprinters.lk',
          email: 'info@sumathiprinters.lk',
          phone: '+(94) 77 42 6900 ',
          address: 'Sri Lanka.',
        },
        shortDescription:
          'Sumathi Printers delivers professional printing solutions for commercial, publication, packaging, and corporate requirements.',
        fullDescription:
          'Sumathi Printers represents the printing arm of the group, providing reliable and high-quality printing solutions for businesses, publications, packaging needs, and corporate communication materials.',
        services: [
          'Commercial Printing',
          'Publication Printing',
          'Packaging Printing',
          'Corporate Printing',
          'Premium Print Solutions',
        ],
      },
      {
        id: 'napco',
        name: 'NAPCO',
        logo: imageAssets.companyTimeline.napco.logo,
        background: imageAssets.companyTimeline.napco.background,
        contact: {
          website: 'www.napco.lk',
          email: 'info@napco.lk',
          phone: '+94 XX XXX XXXX',
          address: 'Sri Lanka.',
        },
        shortDescription:
          'NAPCO supports the printing and publishing ecosystem with specialised printing and production services.',
        fullDescription:
          'NAPCO operates within the group printing category, supporting specialised printing, publishing, production, and related business requirements.',
        services: [
          'Print Production',
          'Publishing Support',
          'Specialised Printing',
          'Business Print Services',
        ],
      },
    ],
  },
  {
    id: 'security-services',
    category: 'Security & Services',
    color: '#2E2C73',
    companies: [
      {
        id: 'octagon-force',
        name: 'Octagon Force',
        logo: fallbackLogo,
        background: fallbackBackground,
        contact: {
          website: 'www.octagonforce.lk',
          email: 'info@octagonforce.lk',
          phone: '+94 XX XXX XXXX',
          address: 'Sri Lanka.',
        },
        shortDescription:
          'Octagon Force provides security and operational support services for businesses and institutions.',
        fullDescription:
          'Octagon Force focuses on security and support services, helping organisations maintain safer, organised, and well-managed operational environments.',
        services: [
          'Security Services',
          'Operational Support',
          'Facility Support',
          'Corporate Security',
        ],
      },
      {
        id: 'octagon-engineering',
        name: 'Octagon Engineering',
        logo: fallbackLogo,
        background: fallbackBackground,
        contact: {
          website: 'www.octagonengineering.lk',
          email: 'info@octagonengineering.lk',
          phone: '+94 XX XXX XXXX',
          address: 'Sri Lanka.',
        },
        shortDescription:
          'Octagon Engineering delivers engineering and technical solutions for modern infrastructure and business needs.',
        fullDescription:
          'Octagon Engineering represents the technical service capability of the group, offering engineering, maintenance, infrastructure, and system support services.',
        services: [
          'Engineering Services',
          'Technical Maintenance',
          'Infrastructure Support',
          'System Solutions',
        ],
      },
    ],
  },
  {
    id: 'renewable-energy',
    category: 'Renewable Energy',
    color: '#F29727',
    companies: [
      {
        id: 'sumi-shakthi',
        name: 'Sumi Shakthi',
        logo: fallbackLogo,
        background: fallbackBackground,
        contact: {
          website: 'www.sumishakthi.lk',
          email: 'info@sumishakthi.lk',
          phone: '+94 XX XXX XXXX',
          address: 'Sri Lanka.',
        },
        shortDescription:
          'Sumi Shakthi supports renewable energy development through sustainable power generation initiatives.',
        fullDescription:
          'Sumi Shakthi operates within the renewable energy sector, contributing to sustainable energy production and environmentally responsible development.',
        services: [
          'Renewable Energy',
          'Sustainable Power',
          'Energy Development',
          'Green Energy Solutions',
        ],
      },
      {
        id: 'sujala-shakthi',
        name: 'Sujala Shakthi',
        logo: fallbackLogo,
        background: fallbackBackground,
        contact: {
          website: 'www.sujalashakthi.lk',
          email: 'info@sujalashakthi.lk',
          phone: '+94 XX XXX XXXX',
          address: 'Sri Lanka.',
        },
        shortDescription:
          'Sujala Shakthi contributes to the group’s renewable energy portfolio with sustainable energy initiatives.',
        fullDescription:
          'Sujala Shakthi is part of the renewable energy category, supporting long-term sustainability, responsible power generation, and environmental value creation.',
        services: [
          'Sustainable Energy',
          'Power Generation',
          'Renewable Projects',
          'Environmental Energy Solutions',
        ],
      },
    ],
  },
  {
    id: 'architecture',
    category: 'Architecture',
    color: '#727373',
    companies: [
      {
        id: 'suko',
        name: 'SUKO',
        logo: fallbackLogo,
        background: fallbackBackground,
        contact: {
          website: 'www.suko.lk',
          email: 'info@suko.lk',
          phone: '+94 XX XXX XXXX',
          address: 'Sri Lanka.',
        },
        shortDescription:
          'SUKO provides architectural and design solutions with a focus on functional, modern, and sustainable spaces.',
        fullDescription:
          'SUKO represents the architecture and design category of the group, focusing on architecture, interior design, space planning, and project-related design solutions.',
        services: [
          'Architecture',
          'Interior Design',
          'Space Planning',
          'Landscape Design',
          'Project Design Support',
        ],
      },
    ],
  },
  {
    id: 'hospitality',
    category: 'Hospitality',
    color: '#BF7D2C',
    companies: [
      {
        id: 'sumathi-hospitality',
        name: 'Sumathi Hospitality',
        logo: fallbackLogo,
        background: fallbackBackground,
        contact: {
          website: 'www.sumathihospitality.lk',
          email: 'info@sumathihospitality.lk',
          phone: '+94 XX XXX XXXX',
          address: 'Sri Lanka.',
        },
        shortDescription:
          'Sumathi Hospitality manages hospitality-focused ventures that create quality service experiences.',
        fullDescription:
          'Sumathi Hospitality represents the hospitality interests of the group, focusing on service quality, guest experience, and hospitality business operations.',
        services: [
          'Hospitality Management',
          'Guest Services',
          'Food & Beverage Operations',
          'Service Experience',
        ],
      },
      {
        id: 'butlers-park-street',
        name: 'Butlers Park Street',
        logo: fallbackLogo,
        background: fallbackBackground,
        contact: {
          website: 'www.butlersparkstreet.lk',
          email: 'info@butlersparkstreet.lk',
          phone: '+94 XX XXX XXXX',
          address: 'Sri Lanka.',
        },
        shortDescription:
          'Butlers Park Street operates within the hospitality and food service space with a focus on premium experiences.',
        fullDescription:
          'Butlers Park Street is part of the hospitality category, offering food, beverage, and lifestyle-focused customer experiences.',
        services: [
          'Food & Beverage',
          'Hospitality Service',
          'Customer Experience',
          'Lifestyle Dining',
        ],
      },
    ],
  },
  {
    id: 'trading-commerce',
    category: 'Trading & Commerce',
    color: '#030A8C',
    companies: [
      {
        id: 'sumathi-universal-trading',
        name: 'Sumathi Universal Trading',
        logo: fallbackLogo,
        background: fallbackBackground,
        contact: {
          website: 'www.sumathiuniversaltrading.lk',
          email: 'info@sumathiuniversaltrading.lk',
          phone: '+94 XX XXX XXXX',
          address: 'Sri Lanka.',
        },
        shortDescription:
          'Sumathi Universal Trading focuses on imports, distribution, procurement, and commerce-related business operations.',
        fullDescription:
          'Sumathi Universal Trading supports the group’s trading and commerce activities through import, distribution, procurement, warehousing, and business supply solutions.',
        services: [
          'Imports',
          'Distribution',
          'Procurement',
          'Warehousing',
          'Business Trading',
        ],
      },
      {
        id: 'thi-lk',
        name: 'THi.lk',
        logo: fallbackLogo,
        background: fallbackBackground,
        contact: {
          website: 'www.thi.lk',
          email: 'info@thi.lk',
          phone: '+94 XX XXX XXXX',
          address: 'Sri Lanka.',
        },
        shortDescription:
          'THi.lk supports the trading and commerce category through digital commerce and online business solutions.',
        fullDescription:
          'THi.lk operates within the trading and commerce ecosystem, supporting online commerce, retail, product visibility, and digital marketplace-related activities.',
        services: [
          'Online Commerce',
          'Digital Retail',
          'Product Distribution',
          'E-Commerce Support',
        ],
      },
    ],
  },
  {
    id: 'events-entertainment',
    category: 'Events & Entertainment',
    color: '#BF9445',
    companies: [
      {
        id: 'sumathi-entertainment',
        name: 'Sumathi Entertainment',
        logo: fallbackLogo,
        background: fallbackBackground,
        contact: {
          website: 'www.sumathientertainment.lk',
          email: 'info@sumathientertainment.lk',
          phone: '+94 XX XXX XXXX',
          address: 'Sri Lanka.',
        },
        shortDescription:
          'Sumathi Entertainment supports entertainment, media, and event-related business activities within the group.',
        fullDescription:
          'Sumathi Entertainment represents the group’s entertainment arm, focusing on events, productions, media experiences, and entertainment-related ventures.',
        services: [
          'Entertainment',
          'Event Production',
          'Media Support',
          'Creative Projects',
        ],
      },
      {
        id: 'sumathi-films',
        name: 'Sumathi Films',
        logo: fallbackLogo,
        background: fallbackBackground,
        contact: {
          website: 'www.sumathifilms.lk',
          email: 'info@sumathifilms.lk',
          phone: '+94 XX XXX XXXX',
          address: 'Sri Lanka.',
        },
        shortDescription:
          'Sumathi Films contributes to the entertainment category through film and media-related productions.',
        fullDescription:
          'Sumathi Films focuses on film, media, and creative entertainment activities, supporting the group’s presence in the entertainment sector.',
        services: [
          'Film Production',
          'Media Projects',
          'Creative Entertainment',
          'Content Support',
        ],
      },
      {
        id: 'sumathi-awards',
        name: 'Sumathi Awards',
        logo: fallbackLogo,
        background: fallbackBackground,
        contact: {
          website: 'www.sumathiawards.lk',
          email: 'info@sumathiawards.lk',
          phone: '+94 XX XXX XXXX',
          address: 'Sri Lanka.',
        },
        shortDescription:
          'Sumathi Awards celebrates excellence in entertainment, media, and creative performance.',
        fullDescription:
          'Sumathi Awards is a key recognition platform connected to the group’s entertainment and media legacy, celebrating creative achievements and industry excellence.',
        services: [
          'Awards Events',
          'Media Recognition',
          'Entertainment Events',
          'Creative Industry Support',
        ],
      },
    ],
  },
  {
    id: 'ventures',
    category: 'Ventures',
    color: '#06732C',
    companies: [
      {
        id: 'sumathi-ventures',
        name: 'Sumathi Ventures',
        logo: fallbackLogo,
        background: fallbackBackground,
        contact: {
          website: 'www.sumathiventures.lk',
          email: 'info@sumathiventures.lk',
          phone: '+94 XX XXX XXXX',
          address: 'Sri Lanka.',
        },
        shortDescription:
          'Sumathi Ventures focuses on strategic investments, partnerships, and new business opportunities.',
        fullDescription:
          'Sumathi Ventures represents the group’s venture and partnership interests, focusing on strategic investments, new opportunities, and business expansion initiatives.',
        services: [
          'Strategic Investments',
          'Business Ventures',
          'Partnerships',
          'New Business Development',
        ],
      },
    ],
  },
];