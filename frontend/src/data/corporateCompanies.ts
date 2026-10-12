import { imageAssets } from '../assets/imageAssets';
export type CorporateCompanyPreview = {
    image?: string;
    title: string;
    subtitle?: string;
    description?: string;
    metric?: string;
};

export type CorporateCompany = {
    id: string;
    name: string;
    logo: string;
    href?: string | null;
    accent?: {
        from: string;
        to: string;
    };
    preview?: CorporateCompanyPreview | null;
    categoryId: string;
    category: string;
    color: string;
    contact: {
        website: string;
        email: string;
        phone: string;
        address: string;
    };
    contactListing?: {
        phone: string;
        phoneHref: string;
        email: string;
    };
    shortDescription: string;
    fullDescription: string;
    services: string[];
};
// Set href to the published website URL to enable a tile, its plus icon and preview.
// Keep href null for companies without a published website; preview copy is ready for future links.
// Sketch order, with Rabbit Solutions retained from the existing company directory.
// Company descriptions, services and contact details are maintained in this directory.
export const corporateCompanies: CorporateCompany[] = [
    {
        id: 'sumathi-ventures',
        name: 'Sumathi Ventures',
        logo: imageAssets.companyShowcase['sumathi-ventures'].logo,
        categoryId: 'ventures',
        category: 'Ventures',
        color: '#06732C',
        contact: {
            website: 'www.sumathiventures.com',
            email: 'info@sumathiventures.com',
            phone: '+94 11 269 7106',
            address: 'No.758, Baseline Road, Colombo 09.',
        },
        shortDescription: 'Sumathi Ventures focuses on strategic investments, partnerships, and new business opportunities.',
        fullDescription: 'Founded in 2020, Sumathi Ventures, under the leadership of experienced businessman Mr. Thilanga Sumathipala, aims to establish a sustainable business model that benefits society while ensuring profitability. Leveraging intellectual property, practices, and resources of potential partners, Sumathi Ventures combines them with its financial capital and local market presence through structures like joint ventures, BOOT, and PPPs to achieve mutually beneficial business outcomes. \n Sumathi Ventures forges strategic partnerships with top-tier global firms across Manufacturing & Agriculture (Industry Pillar), Infrastructure, Real Estate Development, Power and Energy, Financial Services (Commerce Pillar), and Hardware and Software Information Technology Solutions (Technology Pillar).',
        services: [
            'Strategic Investments',
            'Business Ventures',
            'Partnerships',
            'New Business Development',
        ],
        href: "https://sumathiventures.com/",
        preview: {
            image: imageAssets.companyShowcase['sumathi-ventures'].preview,
            metric: "Sumathi Ventures",
            title: "A Foundation Strengthened by Unity",
            description: "Using modern, up-to-date technology to build sustainable businesses that create long-term value for stakeholders and society."
        },
        accent: { from: "#118b8d", to: "#18334d" }
    },
    {
        id: 'octagon-engineering',
        contactListing: { "phone": "+94 112 344 444", "phoneHref": "+94112344444", "email": "sales@octagon.lk" },
        name: 'Octagon Engineering',
        logo: imageAssets.companyShowcase['octagon-engineering'].logo,
        categoryId: 'security-services',
        category: 'Security & Services',
        color: '#2E2C73',
        contact: {
            website: 'www.octagon.lk',
            email: 'sales@octagon.lk',
            phone: '+94 11 234 4444',
            address: '445 Sirimavo Bandaranaike Mawatha, Colombo 14.',
        },
        shortDescription: 'Octagon Engineering delivers engineering and technical solutions for modern infrastructure and business needs.',
        fullDescription: 'Octagon Engineering represents the technical service capability of the group, offering engineering, maintenance, infrastructure and system support services.',
        services: [
            'Engineering Services',
            'Technical Maintenance',
            'Infrastructure Support',
            'System Solutions',
        ],
        href: "https://octagon.lk/",
        preview: {
            image: imageAssets.companyShowcase['octagon-engineering'].preview,
            metric: "70+",
            title: "Years of Experience",
            description: "Reliable engineering solutions built on experience and precision."
        },
        accent: { from: "#b68b3a", to: "#173957" }
    },
    {
        id: 'sumathi-universal-trading',
        contactListing: { "phone": "+94 112 421 294", "phoneHref": "+94112421294", "email": "info@sut.lk" },
        name: 'Sumathi Universal Trading',
        logo: imageAssets.companyShowcase['sumathi-universal-trading'].logo,
        categoryId: 'trading-commerce',
        category: 'Trading & Commerce',
        color: '#030A8C',
        accent: { from: '#030A8C', to: '#6d46ff' },
        contact: {
            website: 'www.sumathiuniversaltrading.lk',
            email: 'info@sumathiuniversaltrading.lk',
            phone: '+94 112 421 294',
            address: '445, Sirimavo Bandaranaike Mawatha, Colombo 14.',
        },
        shortDescription: 'Sumathi Universal Trading focuses on imports, distribution, procurement, and commerce-related business operations.',
        fullDescription: 'Sumathi Universal Trading, established in 2018, is geared towards becoming a premier trading entity within the group. It’s primary objective is to serve as the trading arm of the Holding Company, overseeing direct imports of specialized products for distribution. Additionally, it is tasked with managing procurement activities across the group’s subsidiaries and offering warehousing services. \n  All merchandise imported and retailed by SUT is marketed through various platforms including Daraz, Facebook Marketplace, and promoted via Facebook and Instagram. Our product range encompasses a diverse array, spanning from stationary and essential items to office furniture, tires, air conditioners, generators and beyond.',
        services: [
            'Imports',
            'Distribution',
            'Procurement',
            'Warehousing',
            'Business Trading',
        ],
        href: null,
        preview: {
            metric: "Trading & Commerce",
            title: "Sumathi Universal Trading",
            description: "Sumathi Universal Trading focuses on imports, distribution, procurement, and commerce-related business operations."
        }
    },
    {
        id: 'octagon-force',
        contactListing: { "phone": "+94 112 344 444", "phoneHref": "+94112344444", "email": "info@octagonforce.com" },
        name: 'Octagon Force',
        logo: imageAssets.companyShowcase['octagon-force'].logo,
        categoryId: 'security-services',
        category: 'Security & Services',
        color: '#2E2C73',
        contact: {
            website: 'www.octagonforce.com',
            email: 'info@octagonforce.lk',
            phone: '+94 11 242 1294',
            address: '445 Sirimavo Bandaranaike Mawatha, Colombo 14.',
        },
        shortDescription: 'Octagon Force provides security and operational support services for businesses and institutions.',
        fullDescription: 'Octagon Force focuses on security and support services, helping organisations maintain safer, organised, and well managed operational environments.',
        services: [
            'Security Services',
            'Operational Support',
            'Facility Support',
            'Corporate Security',
        ],
        href: "https://octagonforce.com/",
        preview: {
            image: imageAssets.companyShowcase['octagon-force'].preview,
            metric: "06+",
            title: "Deployment sectors",
            description: "Professional security, cleaning, logistics, transport, and facility support solutions delivered with discipline and reliability."
        },
        accent: { from: "#c79a2b", to: "#10182d" }
    },
    {
        id: 'sujala-shakthi',
        name: 'Sujala Shakthi',
        logo: imageAssets.companyShowcase['sujala-shakthi'].logo,
        categoryId: 'renewable-energy',
        category: 'Renewable Energy',
        color: '#F29727',
        accent: { from: '#F29727', to: '#6d46ff' },
        contact: {
            website: 'www.sujalashakthi.lk',
            email: 'info@sujalashakthi.lk',
            phone: '+94 112 697 106',
            address: 'No.02, Dr.Milina Sumathipala Mawatha, Colombo 10, Sri Lanka.',
        },
        shortDescription: 'Sujala Shakthi contributes to the group’s renewable energy portfolio with sustainable energy initiatives.',
        fullDescription: 'Sujala Shakthi is the pioneering renewable energy arm of the Group, dedicated to generating clean, reliable and sustainable power through hydroelectric energy. The company laid the foundation for long-term commitment to environmental sustainability and energy innovation. Its success has since paved the way for the Group expansion into large-scale solar energy through Energy. Committed to operational excellence and responsible resource management, Sujala Shakthi contributes to  renewable energy landscape by delivering environmentally friendly power solutions while supporting the nation transition towards a greener, more sustainable future.',
        services: [
            'Sustainable Energy',
            'Power Generation',
            'Renewable Projects',
            'Environmental Energy Solutions',
        ],
        href: null,
        preview: {
            metric: "Renewable Energy",
            title: "Sujala Shakthi",
            description: "Sujala Shakthi contributes to the group\u2019s renewable energy portfolio with sustainable energy initiatives."
        }
    },
    {
        id: 'sumathi-entertainment',
        name: 'Sumathi Entertainment',
        logo: imageAssets.companyShowcase['sumathi-entertainment'].logo,
        categoryId: 'events-entertainment',
        category: 'Events & Entertainment',
        color: '#BF9445',
        accent: { from: '#BF9445', to: '#6d46ff' },
        contact: {
            website: 'www.sumathieventainment.lk',
            email: 'info@sumathientertainment.lk',
            phone: '+94 112 697 106',
            address: 'No.02, Dr.Milina Sumathipala Mawatha, Colombo 10.',
        },
        shortDescription: 'Sumathi Entertainment supports entertainment, media, and event-related business activities within the group.',
        fullDescription: 'Manages events across all group subsidiaries film releases, cultural programs, religious festivals, corporate workshops, and sports tournaments. Released the spiritual film "Gauthama Buddha Matha" in December 2024.',
        services: [
            'Entertainment',
            'Event Production',
            'Media Support',
            'Creative Projects',
        ],
        href: null,
        preview: {
            metric: "Events & Entertainment",
            title: "Sumathi Entertainment",
            description: "Sumathi Entertainment supports entertainment, media, and event-related business activities within the group."
        }
    },
    {
        id: 'thi-lk',
        name: 'THi.lk',
        logo: imageAssets.companyShowcase['thi-lk'].logo,
        categoryId: 'trading-commerce',
        category: 'Trading & Commerce',
        color: '#030A8C',
        contact: {
            website: 'www.thi.lk',
            email: 'info@thi.lk',
            phone: '+94 11 291 0015',
            address: '445, Sirimavo Bandaranaike Mawatha, Colombo 14.',
        },
        shortDescription: 'THi.lk supports the trading and commerce category through digital commerce and online business solutions.',
        fullDescription: 'THi.lk is a trusted Sri Lankan consumer electronics and technology retailer committed to delivering innovative, high quality products backed by reliable service and customer centric solutions. As the latest digital venture of Sumathi Universal Holdings, THi brings together globally recognized technology brands on a single platform, offering customers a convenient and dependable online shopping experience. \n Our product portfolio features a carefully curated selection of internationally renowned brands, spanning televisions, home appliances, computing devices, mobile accessories, office equipment, networking solutions and lifestyle technology.',
        services: [
            'Online Commerce',
            'Digital Retail',
            'Product Distribution',
            'E-Commerce Support',
        ],
        href: "https://thi.lk/",
        preview: {
            image: imageAssets.companyShowcase['thi-lk'].preview,
            metric: "THi.lk",
            title: "Tech Without Limits",
            description: "A trusted Sri Lankan online electronics store offering authentic global brands, competitive prices, secure payments, island-wide delivery, and reliable after-sales service."
        },
        accent: { from: "#d2008b", to: "#34236f" }
    },
    {
        id: 'napco',
        contactListing: { "phone": "+94 71 653 2112", "phoneHref": "+94112910015", "email": "info@napco.lk" },
        name: 'NAPCO',
        logo: imageAssets.companyShowcase['napco'].logo,
        categoryId: 'printing',
        category: 'Printing',
        color: '#F2059F',
        contact: {
            website: 'www.napco.lk',
            email: 'info@napco.lk',
            phone: '+94 112 910 015',
            address: 'No. 17, Fathima Mawatha, Off Makola Road, Kiribathgoda.',
        },
        shortDescription: 'NAPCO supports the printing and publishing ecosystem with specialised printing and production services.',
        fullDescription: 'A comprehensive directory and commercial printing solution established by a consortium of leading Sri Lankan printers. Originally serving Sri Lanka Telecom, Napco has expanded into high-quality commercial printing and packaging.',
        services: [
            'Print Production',
            'Publishing Support',
            'Specialised Printing',
            'Business Print Services',
        ],
        href: "https://napco.lk/",
        preview: {
            image: imageAssets.companyShowcase['napco'].preview,
            metric: "17+",
            title: "Years of Excellence",
            description: "NAPCO provides comprehensive printing solutions across industries including telecommunications, apparel, education, FMCG, media, banking and financial services."
        },
        accent: { from: "#d42b36", to: "#17385b" }
    },
    {
        id: 'sumathi-hospitality',
        name: 'Sumathi Hospitality',
        logo: imageAssets.companyShowcase['sumathi-hospitality'].logo,
        categoryId: 'hospitality',
        category: 'Hospitality',
        color: '#BF7D2C',
        accent: { from: '#BF7D2C', to: '#6d46ff' },
        contact: {
            website: 'www.sumathihospitality.lk',
            email: 'info@sumathihospitality.lk',
            phone: '+94 112 697 106',
            address: 'No.02, Dr.Milina Sumathipala Mawatha, Colombo 10.',
        },
        shortDescription: 'Sumathi Hospitality manages hospitality-focused ventures that create quality service experiences.',
        fullDescription: 'Sumathi Hospitality was established to oversee the growth and management of various ventures, including restaurants, resto-bars, student hostels, and city hotel projects within the property holding portfolio. Additionally, we have partnerships with three hotels to further enrich our offerings. Our Park Street location, a resto-bar, exemplifies our endeavors, offering live music, craft cocktails, and stylish amenities.',
        services: [
            'Hospitality Management',
            'Guest Services',
            'Food & Beverage Operations',
            'Service Experience',
        ],
        href: null,
        preview: {
            metric: "Hospitality",
            title: "Sumathi Hospitality",
            description: "Sumathi Hospitality manages hospitality-focused ventures that create quality service experiences."
        }
    },
    {
        id: 'sumathi-printers',
        contactListing: { "phone": "+94 77 642 6900", "phoneHref": "+94776426900", "email": "info@sumathiuniversal.com" },
        name: 'Sumathi Printers',
        logo: imageAssets.companyShowcase['sumathi-printers'].logo,
        categoryId: 'printing',
        category: 'Printing',
        color: '#F2059F',
        contact: {
            website: 'www.sumathiprinters.lk',
            email: 'info@sumathiprinters.lk',
            phone: '+94 77 42 6900 ',
            address: '445 Sirimavo Bandaranaike Mawatha, Colombo 14.',
        },
        shortDescription: 'Sumathi Printers delivers professional printing solutions for commercial, publication, packaging, and corporate requirements.',
        fullDescription: 'With decades of experience in the printing industry, Sumathi Printers is a trusted provider of high-quality commercial and publication printing solutions in Sri Lanka. Combining advanced printing technology with skilled craftsmanship, the company delivers precision, consistency, and reliability across every project. From large-scale publications to premium corporate printing, Sumathi Printers is committed to helping businesses, institutions, and publishers bring their ideas to life with exceptional quality and timely service.',
        services: [
            'Commercial Printing',
            'Publication Printing',
            'Packaging Printing',
            'Corporate Printing',
            'Premium Print Solutions',
        ],
        href: "https://www.sumathiprinters.lk/",
        preview: {
            image: imageAssets.companyShowcase['sumathi-printers'].preview,
            metric: "Since 1984",
            title: "Printing & Publishing Excellence",
            description: "Premium printing, publishing, packaging and finishing solutions crafted with precision, consistency and professional care."
        },
        accent: { from: "#b62632", to: "#153c62" }
    },
    {
        id: 'suko',
        name: 'SUKO',
        logo: imageAssets.companyShowcase['suko'].logo,
        categoryId: 'architecture',
        category: 'Architecture',
        color: '#727373',
        accent: { from: '#727373', to: '#6d46ff' },
        contact: {
            website: 'www.suko.lk',
            email: 'info@suko.lk',
            phone: '+94 112 697 106',
            address: '445 Sirimavo Bandaranaike Mawatha, Colombo 14.',
        },
        shortDescription: 'SUKO provides architectural and design solutions with a focus on functional, modern, and sustainable spaces.',
        fullDescription: 'At Suko, we handle a diverse range of projects, including landscape design, interior design and architectural endeavors. Our approach involves engaging with clients to understand their project requirements thoroughly and establish clear objectives. We utilize advanced design software to create meticulous plans, drawings and blueprints. Collaboration with engineers, contractors and other professionals is integral to ensuring project feasibility and compliance with regulatory standards.',
        services: [
            'Architecture',
            'Interior Design',
            'Space Planning',
            'Landscape Design',
            'Project Design Support',
        ],
        href: null,
        preview: {
            metric: "Architecture",
            title: "SUKO",
            description: "SUKO provides architectural and design solutions with a focus on functional, modern, and sustainable spaces."
        }
    },
    {
        id: 'sumathi-films',
        name: 'Sumathi Films',
        logo: imageAssets.companyShowcase['sumathi-films'].logo,
        categoryId: 'events-entertainment',
        category: 'Events & Entertainment',
        color: '#BF9445',
        accent: { from: '#BF9445', to: '#6d46ff' },
        contact: {
            website: 'www.sumathieventainment.lk',
            email: 'info@sumathifilms.lk',
            phone: '+94 112 697 106',
            address: 'No.02, Dr.Milina Sumathipala Mawatha, Colombo 10.',
        },
        shortDescription: 'Sumathi Films contributes to the entertainment category through film and media-related productions.',
        fullDescription: 'Over 40 years in Sri Lankan cinema. Award winning productions include Ganga Addara (21 national awards, 1980), Uppalawanna (Buddhist Film Festivals, London & Singapore), and Duwata Mawak Misa produced by Thilanga Sumathipala.',
        services: [
            'Film Production',
            'Media Projects',
            'Creative Entertainment',
            'Content Support',
        ],
        href: null,
        preview: {
            metric: "Events & Entertainment",
            title: "Sumathi Films",
            description: "Sumathi Films contributes to the entertainment category through film and media-related productions."
        }
    },
    {
        id: 'sumi-shakthi',
        name: 'Sumi Shakthi',
        logo: imageAssets.companyShowcase['sumi-shakthi'].logo,
        categoryId: 'renewable-energy',
        category: 'Renewable Energy',
        color: '#F29727',
        accent: { from: '#F29727', to: '#6d46ff' },
        contact: {
            website: 'www.sumishakthi.lk',
            email: 'info@sumishakthi.lk',
            phone: '+94 112 697 106',
            address: 'No.02, Dr.Milina Sumathipala Mawatha, Colombo 10, Sri Lanka.',
        },
        shortDescription: 'Sumi Shakthi supports renewable energy development through sustainable power generation initiatives.',
        fullDescription: 'Dedicated to advancing solar power generation, Sumi Shakthi was founded in 2017 specializing in renewable energy and energy storage solutions for domestic, commercial and industrial requirements. This initiative effectively contributes power to the national grid, showcasing our commitment to sustainable energy solutions. Sumi Shakthi is well positioned to contribute towards the future renewable energy requirement of the nation while providing customers with customized solar solutions.',
        services: [
            'Renewable Energy',
            'Sustainable Power',
            'Energy Development',
            'Green Energy Solutions',
        ],
        href: null,
        preview: {
            metric: "Renewable Energy",
            title: "Sumi Shakthi",
            description: "Sumi Shakthi supports renewable energy development through sustainable power generation initiatives."
        }
    },
    {
        id: 'sumathi-awards',
        name: 'Sumathi Awards',
        logo: imageAssets.companyShowcase['sumathi-awards'].logo,
        categoryId: 'events-entertainment',
        category: 'Events & Entertainment',
        color: '#BF9445',
        contact: {
            website: 'www.sumathiawards.lk',
            email: 'info@sumathiawards.lk',
            phone: '+94 112 697 106',
            address: 'No.02, Dr.Milina Sumathipala Mawatha, Colombo 10.',
        },
        shortDescription: 'Sumathi Awards celebrates excellence in entertainment, media, and creative performance.',
        fullDescription: 'In 1995 Mr.Thilanga Sumathipala, in together with the National Youth Council, founded the “Sumathi Awards” to fill the void left by television awards; a total of 32 awards were presented, categorized into four sections: Best Awards, Popular Awards, Commercial Awards, and Merit Awards. \n The Sumathi Awards is an esteemed recognition presented annually by the Sumathi Group of Companies, Sri Lanka, honoring outstanding individuals within the country’s television industry. These awards acknowledge the remarkable contributions made by recipients to Sri Lanka’s teledrama sector and television programming landscape.',
        services: [
            'Awards Events',
            'Media Recognition',
            'Entertainment Events',
            'Creative Industry Support',
        ],
        href: "https://sumathiawards.lk/",
        preview: {
            image: imageAssets.companyShowcase['sumathi-awards'].preview,
            metric: "Sumathi Awards",
            title: "\u0DB4\u0DD4\u0D82\u0DA0\u0DD2 \u0DAD\u0DD2\u0DBB\u0DBA\u0DDA \u0DB8\u0DC4\u0DCF \u0D9A\u0DBD\u0DCF \u0DB8\u0D82\u0D9C\u0DBD\u0DCA\u200D\u0DBA",
            description: "Held since 1995, \u201CSumathi Awards\u201D has become one of the most influential and prestigious television festival in Sri Lanka recognizing the creativity, talent, innovation and entertainment."
        },
        accent: { from: "#d2a24c", to: "#6c1731" }
    },
    {
        id: 'butlers-park-street',
        name: 'Butlers Park Street',
        logo: imageAssets.companyShowcase['butlers-park-street'].logo,
        categoryId: 'hospitality',
        category: 'Hospitality',
        color: '#BF7D2C',
        accent: { from: '#BF7D2C', to: '#6d46ff' },
        contact: {
            website: 'www.butlersparkstreet.lk',
            email: 'info@butlersparkstreet.lk',
            phone: '+94 74 256 2191',
            address: '33B, Park Street, Colombo 02.',
        },
        shortDescription: 'Butlers Park Street operates within the hospitality and food service space with a focus on premium experiences.',
        fullDescription: 'Butlers is a contemporary dining destination that brings together exceptional cuisine, warm hospitality, and a welcoming atmosphere. Designed as a place for families, friends and professionals to connect, the restaurant offers a carefully curated menu featuring local favorites and international specialties, prepared with fresh ingredients and a commitment to quality. With a focus on taste, comfort, and customer satisfaction, Butlers has established itself as a preferred destination for quality dining.',
        services: [
            'Food & Beverage',
            'Hospitality Service',
            'Customer Experience',
            'Lifestyle Dining',
        ],
        href: null,
        preview: {
            metric: "Hospitality",
            title: "Butlers Park Street",
            description: "Butlers Park Street operates within the hospitality and food service space with a focus on premium experiences."
        }
    },
    {
        id: 'rabbit-solutions',
        contactListing: { "phone": "+94 11 211 8130", "phoneHref": "+94112118130", "email": "info@rabbit.lk" },
        name: 'Rabbit Solutions',
        logo: imageAssets.companyShowcase['rabbit-solutions'].logo,
        categoryId: 'technology-it',
        category: 'Technology & IT',
        color: '#0511F2',
        accent: { from: '#0511F2', to: '#6d46ff' },
        contact: {
            website: 'www.rabbit.lk',
            email: 'info@rabbit.lk',
            phone: '+94 11 211 8130',
            address: '65, Ananda Rajakaruna Mawatha, Colombo 10, Sri Lanka.',
        },
        shortDescription: 'Rabbit Solutions creates smart technology solutions, custom software, and scalable digital products that help businesses and start-ups grow through continuous innovation.',
        fullDescription: 'Formed to create a smart world through continuous innovation, Rabbit Solutions was established to provide clever technology solutions. Over the years, the company has helped many businesses and start-ups grow and gain strong momentum in their respective industries. Using deep industry expertise and the latest IT advancements, the company delivers custom solutions and products that perfectly fit the needs and behaviour of users. The company also specialises in the development of reliable and scalable software for any operating system, browser, and device.',
        services: [
            'Custom Software Development',
            'Web Application Development',
            'Mobile Application Development',
            'Scalable Digital Products',
            'Business Technology Solutions',
            'IT Consulting',
        ],
        href: 'www.rabbit.lk',
        preview: {
            image: imageAssets.companyShowcase['rabbit-solutions'].preview,
            metric: "Technology & IT",
            title: "Rabbit Solutions",
            description: "Rabbit Solutions creates smart technology solutions, custom software, and scalable digital products that help businesses and start-ups grow through continuous innovation."
        }
    }
];
export function getCorporateCompany(id: string): CorporateCompany {
    const company = corporateCompanies.find(company => company.id === id);
    if (!company)
        throw new Error(`Unknown company: ${id}`);
    return company;
}
// Preserve the existing contact-page listing where it differs from company contact details.
export function getCorporateContact(id: string) {
    const company = getCorporateCompany(id);
    return {
        name: company.name,
        ...(company.contactListing ?? {
            phone: company.contact.phone,
            phoneHref: company.contact.phone.replace(/[^+\d]/g, ''),
            email: company.contact.email,
        }),
    };
}

export function getCorporateCompanyPreview(company: CorporateCompany): CorporateCompanyPreview {
    return company.preview ?? {
        title: company.name,
        metric: company.category,
        description: company.shortDescription,
    };
}
