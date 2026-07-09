import { BarChart3, BriefcaseBusiness, HandHeart, Layers3 } from 'lucide-react';
import { imageAssets } from './imageAssets';

export const whatWeDoData = [
  {
    id: '01',
    title: 'Printing',
    icon: BarChart3,
    image: imageAssets.services.whatWeDo.printingCard,
    description:
      'State-of-the-art machinery, technology and accessories combined with qualified personnel, geared towards meeting the most demanding requirements of international markets. We are strengthened with one of the largest printing capacities in Sri Lanka for web printing, sheet-fed printing and finishing.',
  },
  {
    id: '02',
    title: 'Services',
    icon: Layers3,
    image: imageAssets.services.whatWeDo.servicesCard,
    description:
      'Providing IT solutions for evolving business requirements. We help information services enterprises accelerate business outcomes through digital transformation, security services, maintenance, transport services and construction.',
  },
  {
    id: '03',
    title: 'Management & Investment',
    icon: BriefcaseBusiness,
    image: imageAssets.services.whatWeDo.managementInvestmentCard,
    description:
      'As a parent company managing subsidiaries involved in diversified industries, Sumathi Universal manages assets, strengthens business operations and pursues investments in new opportunities.',
  },
  {
    id: '04',
    title: 'CSR',
    icon: HandHeart,
    image: imageAssets.services.whatWeDo.csrCard,
    description:
      'Through the Thilanga Sumathipala Foundation, we work with communities and partners to overcome poverty and suffering while supporting meaningful social development initiatives.',
  },
];