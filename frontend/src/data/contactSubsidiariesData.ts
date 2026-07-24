import { imageAssets } from './imageAssets';

export type ContactSubsidiaryCompany = {
  name: string;
  phone: string;
  phoneHref: string;
  email: string;
};

export type ContactSubsidiaryGroup = {
  id: string;
  title: string;
  shortTitle: string;
  image: string;
  description: string;
  companies: ContactSubsidiaryCompany[];
};

export const contactSubsidiariesData: ContactSubsidiaryGroup[] = [
  {
    id: 'printing-packaging',
    title: 'Printing & Packaging',
    shortTitle: 'Printing',
    image: imageAssets.contact.subsidiaries.printingPackaging,
    description:
      'Professional printing, packaging, publication, and commercial production services.',
    companies: [
      {
        name: 'Sumathi Printers',
        phone: '+(94) 11 291 0015',
        phoneHref: '+94112910015',
        email: 'info@sumathiuniversal.com',
      },
      {
        name: 'Napco',
        phone: '+(94) 11 291 0015',
        phoneHref: '+94112910015',
        email: 'info@napco.lk',
      },
    ],
  },
  {
    id: 'engineering-security',
    title: 'Engineering & Security',
    shortTitle: 'Engineering',
    image: imageAssets.contact.subsidiaries.engineeringSecurity,
    description:
      'Engineering, facility, technical maintenance, and security service operations.',
    companies: [
      {
        name: 'Octagon Engineering',
        phone: '+(94) 112 344 444',
        phoneHref: '+94112344444',
        email: 'sales@octagon.lk',
      },
      {
        name: 'Octagon Force',
        phone: '+(94) 112 344 444',
        phoneHref: '+94112344444',
        email: 'info@octagonforce.com',
      },
    ],
  },
  {
    id: 'technology-trading',
    title: 'Technology & Trading',
    shortTitle: 'Technology',
    image: imageAssets.contact.subsidiaries.technologyTrading,
    description:
      'Technology solutions, software services, digital transformation, trading, and commerce.',
    companies: [
      {
        name: 'Rabbit Solutions',
        phone: '+(94) 11 211 8130',
        phoneHref: '+94112118130',
        email: 'info@rabbit.lk',
      },
      {
        name: 'Sumathi Universal Trading',
        phone: '+(94) 112 421 294',
        phoneHref: '+94112421294',
        email: 'info@sut.lk',
      },
    ],
  },
];