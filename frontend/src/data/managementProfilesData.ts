import { imageAssets } from './imageAssets';

export type ManagementProfile = {
  id: string;
  name: string;
  role: string;
  qualification?: string;
  image: string;
  paragraphs: string[];
};

export const managementProfiles: ManagementProfile[] = [
  {
    id: 'thilanga-sumathipala',
    name: 'Mr. Thilanga Sumathipala',
    role: 'Chairman',
    image: imageAssets.management.thilanga,
    paragraphs: [
      'The Chairman of Sumathi Universal (Pvt) Ltd., Mr. Thilanga Sumathipala is a business professional known for his strategic vision and unwavering passion. Beginning his career as an active member of the Sumathipala family business, as a co-founder of the Sumathi Group of Companies and the founder of the Thilanga Sumathipala Foundation, he now leads a vast array of companies ranging from Printing, Hospitality, Commerce, Energy, and Technology & Entertainment to Leisure. He also played a pivotal role in making the Sumathi Awards an integral landmark in the Sri Lankan calendar by conceptualising and leading the National Television Awards ceremony since its inception.',
      'Qualified in Photolithography and Graphic Reproduction from the London College of Printing, UK, Mr. Sumathipala also attended Yokohama University through The Association for Overseas Technical Scholarship of Japan to advance his entrepreneurial skills. He helped oversee the creation of partnerships between the media, advertising agencies, and advertisers in Sri Lanka during his time as the President of the International Advertising Association. A founder of the Ingrin Institute of Printing & Graphics, he helped create a centre of excellence in the printing and graphics industry of Sri Lanka.',
      'His driven and disciplined mindset has led him to serve as President, Director, and Member of many esteemed institutes and organizations such as the International Cricket Council, Asian Cricket Council, and the Board of Control for Cricket in Sri Lanka. He was responsible for spearheading the completion of the Rangiri Dambulla International Cricket Stadium in 167 days and for the restructuring and relaunch of the BCCSL’s new logo and name change as Sri Lanka Cricket in 2004.',
      'Mr. Sumathipala was instrumental as the Chairman of Sri Lanka Telecom PLC and Mobitel, where he transformed SLT from a corporation to a listed company in the Colombo Stock Exchange. During his tenure, SLT acquired a 100% stake in Mobitel, and Mobitel transformed from a TDMA system to a GSM EDGE network. He also spearheaded the listing of a USD 100 million corporate bond on the Singapore Stock Exchange, the first listed international instrument from Sri Lanka.',
      'Along with his immense business insights, Mr. Sumathipala entered the political field as a Member of the Western Provincial Council. He has since served the nation as the Deputy Speaker of Parliament as well as State Minister of Technology and Innovation.',
      'His quest for self-development led him to Harvard University and Harvard Business School for the Senior Executive programme Building New Ventures. He also studied Driving Government Performance at the Harvard University John F. Kennedy School of Government. In Sri Lanka, he completed a Post Graduate Diploma in Public Management at the University of Colombo, followed by a Master’s in Public Administration. In 2014, he served as a distinguished Professor on Leadership for Transformation at Keimyung University, Republic of Korea, and is currently reading for his PhD at Beijing University of Foreign Studies, China.',
      'With over three decades of expertise in making businesses future ready, Mr. Sumathipala continues to extend his knowledge to place Sri Lanka on the global map.',
    ],
  },
  {
    id: 'udhantha-sumathipala',
    name: 'Mr. Udhantha Sumathipala',
    role: 'Executive Director',
    qualification: 'BSc in Architectural Science from Curtin University, Perth, Australia.',
    image: imageAssets.management.udhantha,
    paragraphs: [
      'Holding a bachelor’s degree in Architectural Science from Curtin University in Perth, Australia, Mr. Udhantha Sumathipala’s charisma is defined by his dedication and go getter personality. His constant quest for innovation makes him an invaluable member of Sumathi Universal (Pvt) Ltd.',
      'He is the oldest son of Mr. Thilanga Sumathipala and was awarded university colours for outstanding achievements from the University of Limkokwing. In 2018, he joined Sumathi Universal (Pvt) Ltd. as an Executive Director and currently leads the subsidiary companies of SUMI. His alma mater was the distinguished Royal College, Colombo.',
    ],
  },
  {
    id: 'samadara-sumathipala',
    name: 'Mrs. Samadara Sumathipala',
    role: 'Director',
    image: imageAssets.management.samadara,
    paragraphs: [
      'As a Director of Sumathi Universal (Pvt) Ltd., Mrs. Samadara Sumathipala is a strategic, forward thinking individual with strong temperament. Her role in the organisation is vital as she uses her passion, grit, and dedication to ensure success in every aspect of the business. Mrs. Sumathipala has played a key role in many successful endeavours that the group has embarked on.',
      'The beloved wife of Mr. Thilanga Sumathipala, it is she who determines the opportunities to stimulate business growth and makes sensible leadership decisions with utmost integrity.',
    ],
  },
  {
    id: 'sajantha-sumathipala',
    name: 'Mr. Sajantha Sumathipala',
    role: 'Director',
    qualification:
      'BSc. Hons. in International Management & Business from the University of Plymouth, England.',
    image: imageAssets.management.sajantha,
    paragraphs: [
      'Second son of Mr. Thilanga Sumathipala. He climbed the ranks from Sumathi Printers and NAPCO Pvt Ltd. to become a Segment Director, joining the holding company board in 2020.',
      'His alma mater was Royal College, Colombo.',
    ],
  },
  {
    id: 'dulantha-sumathipala',
    name: 'Mr. Dulantha Sumathipala',
    role: 'Director',
    qualification:
      'BSc. Hons. in International Management & Business from the University of Plymouth, England.',
    image: imageAssets.management.dulantha,
    paragraphs: [
      'Hard work and the utmost dedication are what drives Mr. Dulantha Sumathipala. As a young, enthusiastic Manager, he climbed the ranks of the company to become a Segment Director. He commenced his journey at Sumathi Printers and NAPCO Pvt Ltd. and in 2020 went on to become a Director at the holding company, Sumathi Universal (Pvt) Ltd.',
      'He is the Second son of Mr. Thilanga Sumathipala and holds a BSc. Hons. in International Management & Business from the University of Plymouth, England. His alma mater was the distinguished Royal College Colombo.',
    ],
  },
];