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
          phone: '+94 77 42 6900 ',
          address: '445 Sirimavo Bandaranaike Mawatha, Colombo 14.',
        },
        shortDescription:
          'Sumathi Printers delivers professional printing solutions for commercial, publication, packaging, and corporate requirements.',
        fullDescription:
          'With decades of experience in the printing industry, Sumathi Printers is a trusted provider of high-quality commercial and publication printing solutions in Sri Lanka. Combining advanced printing technology with skilled craftsmanship, the company delivers precision, consistency, and reliability across every project. From large-scale publications to premium corporate printing, Sumathi Printers is committed to helping businesses, institutions, and publishers bring their ideas to life with exceptional quality and timely service.',
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
          phone: '+94 112 910 015',
          address: 'No. 17, Fathima Mawatha, Off Makola Road, Kiribathgoda.',
        },
        shortDescription:
          'NAPCO supports the printing and publishing ecosystem with specialised printing and production services.',
        fullDescription:
          'A comprehensive directory and commercial printing solution established by a consortium of leading Sri Lankan printers. Originally serving Sri Lanka Telecom, Napco has expanded into high-quality commercial printing and packaging.',
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
        logo: imageAssets.companyTimeline.force.logo,
        background:imageAssets.companyTimeline.force.background,
        contact: {
          website: 'www.octagonforce.com',
          email: 'info@octagonforce.lk',
          phone: '+94 11 242 1294',
          address: '445 Sirimavo Bandaranaike Mawatha, Colombo 14.',
        },
        shortDescription:
          'Octagon Force provides security and operational support services for businesses and institutions.',
        fullDescription:
          'Octagon Force focuses on security and support services, helping organisations maintain safer, organised, and well managed operational environments.',
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
        logo: imageAssets.companyTimeline.engineerig.logo,
        background:imageAssets.companyTimeline.engineerig.background,
        contact: {
          website: 'www.octagon.lk',
          email: 'sales@octagon.lk',
          phone: '+94 11 234 4444',
          address: '445 Sirimavo Bandaranaike Mawatha, Colombo 14.',
        },
        shortDescription:
          'Octagon Engineering delivers engineering and technical solutions for modern infrastructure and business needs.',
        fullDescription:
          'Octagon Engineering represents the technical service capability of the group, offering engineering, maintenance, infrastructure and system support services.',
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
        logo: imageAssets.companyTimeline.sumishakthi.logo,
        background: imageAssets.companyTimeline.sumishakthi.background,
        contact: {
          website: 'www.sumishakthi.lk',
          email: 'info@sumishakthi.lk',
          phone: '+94 112 697 106',
          address: 'No.02, Dr.Milina Sumathipala Mawatha, Colombo 10, Sri Lanka.',
        },
        shortDescription:
          'Sumi Shakthi supports renewable energy development through sustainable power generation initiatives.',
        fullDescription:
          'Dedicated to advancing solar power generation, Sumi Shakthi was founded in 2017 specializing in renewable energy and energy storage solutions for domestic, commercial and industrial requirements. This initiative effectively contributes power to the national grid, showcasing our commitment to sustainable energy solutions. Sumi Shakthi is well positioned to contribute towards the future renewable energy requirement of the nation while providing customers with customized solar solutions.',
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
        logo: imageAssets.companyTimeline.sujalashakthi.logo,
        background: imageAssets.companyTimeline.sujalashakthi.background,
        contact: {
          website: 'www.sujalashakthi.lk',
          email: 'info@sujalashakthi.lk',
          phone: '+94 112 697 106',
          address: 'No.02, Dr.Milina Sumathipala Mawatha, Colombo 10, Sri Lanka.',
        },
        shortDescription:
          'Sujala Shakthi contributes to the group’s renewable energy portfolio with sustainable energy initiatives.',
        fullDescription:
          'Sujala Shakthi is the pioneering renewable energy arm of the Group, dedicated to generating clean, reliable and sustainable power through hydroelectric energy. The company laid the foundation for long-term commitment to environmental sustainability and energy innovation. Its success has since paved the way for the Group expansion into large-scale solar energy through Energy. Committed to operational excellence and responsible resource management, Sujala Shakthi contributes to  renewable energy landscape by delivering environmentally friendly power solutions while supporting the nation transition towards a greener, more sustainable future.',
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
        logo: imageAssets.companyTimeline.suko.logo,
        background: imageAssets.companyTimeline.suko.background,
        contact: {
          website: 'www.suko.lk',
          email: 'info@suko.lk',
          phone: '+94 112 697 106',
          address: '445 Sirimavo Bandaranaike Mawatha, Colombo 14.',
        },
        shortDescription:
          'SUKO provides architectural and design solutions with a focus on functional, modern, and sustainable spaces.',
        fullDescription:
          'At Suko, we handle a diverse range of projects, including landscape design, interior design and architectural endeavors. Our approach involves engaging with clients to understand their project requirements thoroughly and establish clear objectives. We utilize advanced design software to create meticulous plans, drawings and blueprints. Collaboration with engineers, contractors and other professionals is integral to ensuring project feasibility and compliance with regulatory standards.',
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
        logo: imageAssets.companyTimeline.hospitality.logo,
        background: imageAssets.companyTimeline.hospitality.background,
        contact: {
          website: 'www.sumathihospitality.lk',
          email: 'info@sumathihospitality.lk',
          phone: '+94 112 697 106',
          address: 'No.02, Dr.Milina Sumathipala Mawatha, Colombo 10.',
        },
        shortDescription:
          'Sumathi Hospitality manages hospitality-focused ventures that create quality service experiences.',
        fullDescription:
          'Sumathi Hospitality was established to oversee the growth and management of various ventures, including restaurants, resto-bars, student hostels, and city hotel projects within the property holding portfolio. Additionally, we have partnerships with three hotels to further enrich our offerings. Our Park Street location, a resto-bar, exemplifies our endeavors, offering live music, craft cocktails, and stylish amenities.',
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
        logo: imageAssets.companyTimeline.butlers.logo,
        background: imageAssets.companyTimeline.butlers.background,
        contact: {
          website: 'www.butlersparkstreet.lk',
          email: 'info@butlersparkstreet.lk',
          phone: '+94 74 256 2191',
          address: '33B, Park Street, Colombo 02.',
        },
        shortDescription:
          'Butlers Park Street operates within the hospitality and food service space with a focus on premium experiences.',
        fullDescription:
          'Butlers is a contemporary dining destination that brings together exceptional cuisine, warm hospitality, and a welcoming atmosphere. Designed as a place for families, friends and professionals to connect, the restaurant offers a carefully curated menu featuring local favorites and international specialties, prepared with fresh ingredients and a commitment to quality. With a focus on taste, comfort, and customer satisfaction, Butlers has established itself as a preferred destination for quality dining.',
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
        logo: imageAssets.companyTimeline.trading.logo,
        background: imageAssets.companyTimeline.trading.background,
        contact: {
          website: 'www.sumathiuniversaltrading.lk',
          email: 'info@sumathiuniversaltrading.lk',
          phone: '+94 112 421 294',
          address: '445, Sirimavo Bandaranaike Mawatha, Colombo 14.',
        },
        shortDescription:
          'Sumathi Universal Trading focuses on imports, distribution, procurement, and commerce-related business operations.',
        fullDescription:
          'Sumathi Universal Trading, established in 2018, is geared towards becoming a premier trading entity within the group. It’s primary objective is to serve as the trading arm of the Holding Company, overseeing direct imports of specialized products for distribution. Additionally, it is tasked with managing procurement activities across the group’s subsidiaries and offering warehousing services. \n  All merchandise imported and retailed by SUT is marketed through various platforms including Daraz, Facebook Marketplace, and promoted via Facebook and Instagram. Our product range encompasses a diverse array, spanning from stationary and essential items to office furniture, tires, air conditioners, generators and beyond.',
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
        logo: imageAssets.companyTimeline.thi.logo,
        background: imageAssets.companyTimeline.thi.background,
        contact: {
          website: 'www.thi.lk',
          email: 'info@thi.lk',
          phone: '+94 11 291 0015',
          address: '445, Sirimavo Bandaranaike Mawatha, Colombo 14.',
        },
        shortDescription:
          'THi.lk supports the trading and commerce category through digital commerce and online business solutions.',
        fullDescription:
          'THi.lk is a trusted Sri Lankan consumer electronics and technology retailer committed to delivering innovative, high quality products backed by reliable service and customer centric solutions. As the latest digital venture of Sumathi Universal Holdings, THi brings together globally recognized technology brands on a single platform, offering customers a convenient and dependable online shopping experience. \n Our product portfolio features a carefully curated selection of internationally renowned brands, spanning televisions, home appliances, computing devices, mobile accessories, office equipment, networking solutions and lifestyle technology.',
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
        logo: imageAssets.companyTimeline.entertainment.logo,
        background:imageAssets.companyTimeline.entertainment.background,
        contact: {
          website: 'www.sumathieventainment.lk',
          email: 'info@sumathientertainment.lk',
          phone: '+94 112 697 106',
          address: 'No.02, Dr.Milina Sumathipala Mawatha, Colombo 10.',
        },
        shortDescription:
          'Sumathi Entertainment supports entertainment, media, and event-related business activities within the group.',
        fullDescription:
          'Manages events across all group subsidiaries film releases, cultural programs, religious festivals, corporate workshops, and sports tournaments. Released the spiritual film "Gauthama Buddha Matha" in December 2024.',
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
        logo: imageAssets.companyTimeline.films.logo,
        background: imageAssets.companyTimeline.films.background,
        contact: {
          website: 'www.sumathieventainment.lk',
          email: 'info@sumathifilms.lk',
          phone: '+94 112 697 106',
          address: 'No.02, Dr.Milina Sumathipala Mawatha, Colombo 10.',
        },
        shortDescription:
          'Sumathi Films contributes to the entertainment category through film and media-related productions.',
        fullDescription:
          'Over 40 years in Sri Lankan cinema. Award winning productions include Ganga Addara (21 national awards, 1980), Uppalawanna (Buddhist Film Festivals, London & Singapore), and Duwata Mawak Misa produced by Thilanga Sumathipala.',
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
        logo: imageAssets.companyTimeline.awards.logo,
        background: imageAssets.companyTimeline.awards.background,
        contact: {
          website: 'www.sumathiawards.lk',
          email: 'info@sumathiawards.lk',
          phone: '+94 112 697 106',
          address: 'No.02, Dr.Milina Sumathipala Mawatha, Colombo 10.',
        },
        shortDescription:
          'Sumathi Awards celebrates excellence in entertainment, media, and creative performance.',
        fullDescription:
          'In 1995 Mr.Thilanga Sumathipala, in together with the National Youth Council, founded the “Sumathi Awards” to fill the void left by television awards; a total of 32 awards were presented, categorized into four sections: Best Awards, Popular Awards, Commercial Awards, and Merit Awards. \n The Sumathi Awards is an esteemed recognition presented annually by the Sumathi Group of Companies, Sri Lanka, honoring outstanding individuals within the country’s television industry. These awards acknowledge the remarkable contributions made by recipients to Sri Lanka’s teledrama sector and television programming landscape.',
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
        logo: imageAssets.companyTimeline.ventures.logo,
        background: imageAssets.companyTimeline.ventures.background,
        contact: {
          website: 'www.sumathiventures.com',
          email: 'info@sumathiventures.com',
          phone: '+94 11 269 7106',
          address: 'No.758, Baseline Road, Colombo 09.',
        },
        shortDescription:
          'Sumathi Ventures focuses on strategic investments, partnerships, and new business opportunities.',
        fullDescription:
          'Founded in 2020, Sumathi Ventures, under the leadership of experienced businessman Mr. Thilanga Sumathipala, aims to establish a sustainable business model that benefits society while ensuring profitability. Leveraging intellectual property, practices, and resources of potential partners, Sumathi Ventures combines them with its financial capital and local market presence through structures like joint ventures, BOOT, and PPPs to achieve mutually beneficial business outcomes. \n Sumathi Ventures forges strategic partnerships with top-tier global firms across Manufacturing & Agriculture (Industry Pillar), Infrastructure, Real Estate Development, Power and Energy, Financial Services (Commerce Pillar), and Hardware and Software Information Technology Solutions (Technology Pillar).',
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