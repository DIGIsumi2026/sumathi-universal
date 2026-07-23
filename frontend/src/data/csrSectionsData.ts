import { imageAssets } from './imageAssets';

export type CSRGalleryImage = {
  image: string;
  alt: string;
};

export type CSRSectionItem = {
  id: string;
  label: string;
  logo: string;
  outerBg: string;
  leftBg: string;
  galleryBg: string;
  accentColor: string;
  paragraphs: string[];
  gallery: CSRGalleryImage[];
};

export const csrSectionsData: CSRSectionItem[] = [
  {
    id: 'milina-matha',
    label: 'Milina Matha Foundation',
    logo: imageAssets.csr.milinaMatha.logo,
    outerBg: imageAssets.csr.milinaMatha.outerBg,
    leftBg: imageAssets.csr.milinaMatha.leftBg,
    galleryBg: imageAssets.csr.milinaMatha.galleryBg,
    accentColor: '#D4A64A',
    paragraphs: [
      'Following the demise of his beloved mother in 2017, Sumathipala established the "Milina Matha Foundation" in commemoration of her exemplary and benevolent life, and it through this Foundation that the legacy of the late Mrs. Sumathipala PhD is continued by her children, through projects designed and implemented provide educational assistance, and support for the dissemination and elevation of Buddhist teachings across the land.',
      'Activities include acknowledging and promoting the quality of Buddhist teaching in the Daham Schools, awarding scholarships for university candidates & students who have excelled at GCE O/L & A/L as well as annual donations of school books and educational needs of children of the staff of the Sumathi Universal Group of Companies.',
    ],
    gallery: [
      {
        image: imageAssets.csr.milinaMatha.gallery[0],
        alt: 'Milina Matha Foundation scholarship presentation',
      },
      {
        image: imageAssets.csr.milinaMatha.gallery[1],
        alt: 'Milina Matha Foundation group ceremony',
      },
    ],
  },
];