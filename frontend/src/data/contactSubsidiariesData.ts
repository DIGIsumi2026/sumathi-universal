import { imageAssets } from '../assets/imageAssets';
import { getCorporateContact } from './corporateCompanies';

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
      'Professional printing, packaging, publication and commercial production services.',
    companies: [
      getCorporateContact('sumathi-printers'),
      getCorporateContact('napco'),
    ],
  },
  {
    id: 'engineering-security',
    title: 'Engineering & Security',
    shortTitle: 'Engineering',
    image: imageAssets.contact.subsidiaries.engineeringSecurity,
    description:
      'Engineering, facility, technical maintenance and security service operations.',
    companies: [
      getCorporateContact('octagon-engineering'),
      getCorporateContact('octagon-force'),
    ],
  },
  {
    id: 'technology-trading',
    title: 'Technology & Trading',
    shortTitle: 'Technology',
    image: imageAssets.contact.subsidiaries.technologyTrading,
    description:
      'Technology solutions, software services, digital transformation, trading and commerce.',
    companies: [
      getCorporateContact('rabbit-solutions'),
      getCorporateContact('sumathi-universal-trading'),
    ],
  },
];